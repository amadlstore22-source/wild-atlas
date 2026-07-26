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
  // `simplified` runs Douglas–Peucker server-side: it keeps the road's shape
  // (every bend that matters at map zoom) while cutting the point count ~50×,
  // taking the shipped JSON from megabytes to tens of kilobytes.
  const url = `${OSRM}${coords}?overview=simplified&geometries=geojson`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OSRM ${res.status} for ${coords}`);
  const json = await res.json();
  if (json.code !== "Ok" || !json.routes?.[0]) throw new Error(`OSRM: ${json.code}`);
  // geojson coords are [lng,lat]; Leaflet wants [lat,lng]. Round to 5 dp (~1 m)
  // to keep the JSON small.
  return json.routes[0].geometry.coordinates.map(([lng, lat]) => [
    +lat.toFixed(5),
    +lng.toFixed(5),
  ]);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const tours = parseTours();
  const out = {};
  for (const [slug, stops] of Object.entries(tours)) {
    if (!ROAD_TOURS.has(slug) || stops.length < 2) continue;
    // For the combo, drop the very first (summit) point so the road route starts
    // from Imlil/Aït Ben Haddou rather than dragging a road line up the mountain.
    const routeStops = slug === "toubkal-summit-sahara-5day" ? stops.slice(1) : stops;
    try {
      const geom = await routeFor(routeStops);
      out[slug] = geom;
      console.log(`✓ ${slug}: ${geom.length} points (${routeStops.length} stops)`);
    } catch (e) {
      console.error(`✗ ${slug}: ${e.message}`);
    }
    await sleep(1200); // be gentle on the public demo server
  }
  writeFileSync(OUT, JSON.stringify(out) + "\n");
  console.log(`\nWrote ${OUT} with ${Object.keys(out).length} routes.`);
}

main();
