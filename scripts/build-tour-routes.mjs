// Precompute road-snapped route geometry for the driving tours, at BUILD time,
// so the map can draw the real road a vehicle takes instead of a straight line
// through the mountains. The production CSP blocks runtime calls to any routing
// host (connect-src is 'self' + Resend only), so this MUST be precomputed and
// shipped as static data — never fetched in the browser.
//
// Output: lib/tour-routes.json  ->  { [slug]: [[lat,lng], ...] }
//
// Only ROAD tours are routed (desert, cultural, and the driving legs of the
// combo). Pure trekking tours are intentionally omitted: their route is an
// off-road mountain trail with no road for OSRM to snap to, so a gentle straight
// line between camps is the honest representation and the map falls back to it.
//
// Usage:  node scripts/build-tour-routes.mjs
// Re-run whenever a road tour's itinerary stops change.

import { readFileSync, writeFileSync } from "node:fs";

const OSRM = "https://router.project-osrm.org/route/v1/driving/";
const OUT = "lib/tour-routes.json";

// Slugs whose route follows real roads. Everything else keeps straight lines.
const ROAD_TOURS = new Set([
  "sahara-3day-marrakech",
  "marrakech-to-fes-3day",
  "sahara-2day-agadir",
  "marrakech-to-chefchaouen-4day",
  "marrakech-imperial-cities-5day",
  "zagora-2day-marrakech",
  "erg-chegaga-3day-marrakech",
  "desert-4day-marrakech",
  "merzouga-3day-agadir",
  "zagora-2day-agadir",
  "erg-chegaga-3day-agadir",
  "desert-4day-agadir",
  "agadir-to-fes-4day",
  "agadir-to-chefchaouen-5day",
  "agadir-imperial-cities-6day",
  "family-desert-4day-marrakech",
  "merzouga-stargazing-desert-tour",
  // combo: the first two stops are the Toubkal foot-summit; the rest is driving.
  // We route from stop 2 (summit area / Imlil) onward so the desert leg snaps to
  // roads while the mountain leg stays a straight line to the summit.
  "toubkal-summit-sahara-5day",
]);

// Extract, per tour, its ordered stop coordinates from the English source.
function parseTours() {
  const src = readFileSync("lib/tours.ts", "utf8");
  const lines = src.split("\n");
  const tours = {};
  let slug = null;
  for (const l of lines) {
    const ms = l.match(/slug:\s*"([^"]+)"/);
    if (ms && !l.includes("slug: string")) {
      slug = ms[1];
      tours[slug] = [];
    }
    const mp = l.match(/stop:\s*\{\s*name:\s*"([^"]+)",\s*lat:\s*(-?[\d.]+),\s*lng:\s*(-?[\d.]+)/);
    if (mp && slug) tours[slug].push({ name: mp[1], lat: +mp[2], lng: +mp[3] });
  }
  return tours;
}

async function routeFor(stops) {
  // OSRM wants lng,lat pairs; we pass every stop as a waypoint so the polyline
  // threads through each overnight town in order.
  const coords = stops.map((s) => `${s.lng},${s.lat}`).join(";");
  // overview=full, not simplified. `simplified` runs Douglas-Peucker
  // server-side and collapses a 1,000 km desert route to ~80 points, which
  // renders the Tizi n'Tichka switchbacks and the gorge roads as straight cuts
  // across the mountains. Full keeps the real road shape; the cost is a larger
  // JSON that is still only built once and shipped as static data.
  const url = `${OSRM}${coords}?overview=full&geometries=geojson`;

  // The public OSRM demo server rate-limits and drops connections under load.
  // Without retries a transient failure silently drops a tour's route from the
  // output file, and the map falls back to a straight line with nothing to say
  // it did. Three attempts with a widening pause.
  let json;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`OSRM ${res.status}`);
      json = await res.json();
      if (json.code !== "Ok" || !json.routes?.[0]) throw new Error(`OSRM: ${json.code}`);
      break;
    } catch (err) {
      if (attempt === 3) throw err;
      await new Promise((r) => setTimeout(r, attempt * 3000));
    }
  }
  // geojson coords are [lng,lat]; Leaflet wants [lat,lng]. Round to 5 dp (~1 m)
  // to keep the JSON small.
  return json.routes[0].geometry.coordinates.map(([lng, lat]) => [
    +lat.toFixed(5),
    +lng.toFixed(5),
  ]);
}


// Douglas-Peucker, run locally on the full-detail geometry.
//
// overview=full gives ~1 m precision and a 3.9 MB JSON, all of which is
// imported into the tour page and serialised into its HTML payload. The map
// tops out near zoom 13, where one screen pixel is about 15 m, so detail finer
// than ~33 m is invisible weight. This keeps every bend that renders -- the
// Tichka switchbacks survive -- at 8% of the points.
const TOLERANCE = 0.0003; // degrees, ~33 m

function perpendicularDistance([px, py], [ax, ay], [bx, by]) {
  if (ax === bx && ay === by) return Math.hypot(px - ax, py - ay);
  const t = Math.max(0, Math.min(1,
    ((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / ((bx - ax) ** 2 + (by - ay) ** 2)));
  return Math.hypot(px - (ax + t * (bx - ax)), py - (ay + t * (by - ay)));
}

function simplify(points, tolerance = TOLERANCE) {
  if (points.length < 3) return points;
  let maxDist = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const d = perpendicularDistance(points[i], points[0], points[points.length - 1]);
    if (d > maxDist) { maxDist = d; index = i; }
  }
  if (maxDist > tolerance) {
    const left = simplify(points.slice(0, index + 1), tolerance);
    const right = simplify(points.slice(index), tolerance);
    return left.slice(0, -1).concat(right);
  }
  return [points[0], points[points.length - 1]];
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const tours = parseTours();
  // Start from what is already on disk rather than an empty object. A failed
  // fetch used to drop that tour's route from the output entirely, so one bad
  // run could silently downgrade several maps to straight lines. Now a failure
  // leaves the previous geometry in place.
  let out = {};
  try {
    out = JSON.parse(readFileSync(OUT, "utf8"));
  } catch {
    out = {};
  }
  for (const [slug, stops] of Object.entries(tours)) {
    if (!ROAD_TOURS.has(slug) || stops.length < 2) continue;
    // For the combo, drop the very first (summit) point so the road route starts
    // from Imlil/Aït Ben Haddou rather than dragging a road line up the mountain.
    const routeStops = slug === "toubkal-summit-sahara-5day" ? stops.slice(1) : stops;
    try {
      const full = await routeFor(routeStops);
      const geom = simplify(full);
      out[slug] = geom;
      console.log(`✓ ${slug}: ${geom.length} points from ${full.length} (${routeStops.length} stops)`);
    } catch (e) {
      console.error(`✗ ${slug}: ${e.message}`);
    }
    await sleep(1200); // be gentle on the public demo server
  }
  writeFileSync(OUT, JSON.stringify(out) + "\n");
  console.log(`\nWrote ${OUT} with ${Object.keys(out).length} routes.`);
}

main();
