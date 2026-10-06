// Data for the static route map on tour pages (components/map/RouteMap.tsx).
//
//   lib/route-maps.json     { [slug]: { frame, km, legs: [{ mode, coords }], offRoad: [{ from, to }] } }
//   lib/route-map-land.json { [country]: rings }   coastline + borders, clipped to Morocco's box
//
// Every tour except trekking, which keeps the satellite map with 3D terrain
// (owner's choice, 2026-10-06, after seeing a contour-line trek version).
//   - multi-day tours: the meeting point, then each stop in itinerary order
//     (extraStops before the day's stop, as on the satellite map);
//   - day trips with no overnight stop: origin city -> the place -> back;
//   - tours that happen in town (medina walk, food tour, surf lesson): one dot,
//     plus the page's "Open in Google Maps" link for the exact meeting point.
//
// Legs are "road" (OSRM along real roads) or "foot". Only the camel trek has
// foot legs: stops under 40 km apart, drawn as straight dashed lines camp to
// camp because there is no road to snap to. A stop the road cannot reach gets a
// dashed `offRoad` connector from the nearest road point when it is over 10 km
// away (in practice the ~22 km 4x4 run to Erg Chegaga; the Erg Chebbi camp,
// ~4 km into the dunes, is a few pixels at this scale). `km` is road distance.
//
// Sources: OSRM public demo server (OpenStreetMap, ODbL; credited under the
// map) and Natural Earth 1:50m (public domain). Raw downloads and the OSRM
// cache live in C:/Users/cash/wild-atlas-research/geo/, outside the repo.
//
//   node scripts/build-route-maps.mjs        (re-run when a tour's stops change)
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url, { alias: { "@": process.cwd() } });
const { TOURS } = await jiti.import("../lib/tours.ts");
const { frameFor } = await jiti.import("../lib/route-map-frame.ts");

const RAW = "C:/Users/cash/wild-atlas-research/geo";
const NE_URL = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson";
const OSRM = "https://router.project-osrm.org/route/v1/driving/";
const BOX = { lon0: -11.5, lon1: 0.5, lat0: 28.2, lat1: 36.6 };
const COUNTRIES = ["Morocco", "Algeria", "Spain", "Portugal"];
const CITY = { marrakech: [-7.9811, 31.6295], agadir: [-9.5981, 30.4278] };
mkdirSync(RAW, { recursive: true });

// --- helpers ---------------------------------------------------------------------
const kmBetween = (a, b) => {
  const t = Math.PI / 180;
  const h = Math.sin(((b[1] - a[1]) * t) / 2) ** 2 + Math.cos(a[1] * t) * Math.cos(b[1] * t) * Math.sin(((b[0] - a[0]) * t) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};
function rdp(pts, eps) {
  if (pts.length < 3) return pts;
  const [a, b] = [pts[0], pts[pts.length - 1]];
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  let idx = 0, max = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x, y] = pts[i];
    const d = len < 1e-12 ? Math.hypot(x - a[0], y - a[1])
      : Math.abs((b[1] - a[1]) * x - (b[0] - a[0]) * y + b[0] * a[1] - b[1] * a[0]) / len;
    if (d > max) { max = d; idx = i; }
  }
  if (max <= eps) return [a, b];
  return [...rdp(pts.slice(0, idx + 1), eps).slice(0, -1), ...rdp(pts.slice(idx), eps)];
}
const rnd = (n) => ([x, y]) => [+x.toFixed(n), +y.toFixed(n)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --- land (clipped to BOX with Sutherland-Hodgman) --------------------------------
function clipRing(ring) {
  const inside = [(p) => p[0] >= BOX.lon0, (p) => p[0] <= BOX.lon1, (p) => p[1] >= BOX.lat0, (p) => p[1] <= BOX.lat1];
  const cut = [
    (a, b) => [BOX.lon0, a[1] + ((BOX.lon0 - a[0]) / (b[0] - a[0])) * (b[1] - a[1])],
    (a, b) => [BOX.lon1, a[1] + ((BOX.lon1 - a[0]) / (b[0] - a[0])) * (b[1] - a[1])],
    (a, b) => [a[0] + ((BOX.lat0 - a[1]) / (b[1] - a[1])) * (b[0] - a[0]), BOX.lat0],
    (a, b) => [a[0] + ((BOX.lat1 - a[1]) / (b[1] - a[1])) * (b[0] - a[0]), BOX.lat1],
  ];
  let out = ring;
  for (let e = 0; e < 4 && out.length; e++) {
    const input = out; out = [];
    for (let i = 0; i < input.length; i++) {
      const cur = input[i], prev = input[(i + input.length - 1) % input.length];
      if (inside[e](cur)) { if (!inside[e](prev)) out.push(cut[e](prev, cur)); out.push(cur); }
      else if (inside[e](prev)) out.push(cut[e](prev, cur));
    }
  }
  return out;
}
const nePath = `${RAW}/ne_50m_admin_0_countries.geojson`;
if (!existsSync(nePath)) writeFileSync(nePath, await (await fetch(NE_URL)).text());
const world = JSON.parse(readFileSync(nePath, "utf8"));
const land = {};
for (const name of COUNTRIES) {
  const feat = world.features.find((f) => f.properties.ADMIN === name);
  const polys = feat.geometry.type === "Polygon" ? [feat.geometry.coordinates] : feat.geometry.coordinates;
  const rings = polys.flatMap((poly) => poly.map(clipRing)).filter((r) => r.length >= 3)
    .map((r) => rdp(r, 0.008).map(rnd(3))).filter((r) => r.length >= 3);
  if (rings.length) land[name] = rings;
}
writeFileSync("lib/route-map-land.json", JSON.stringify(land) + "\n");

// --- OSRM, cached ---------------------------------------------------------------------
const cacheFile = `${RAW}/osrm-route-maps.json`;
const cache = existsSync(cacheFile) ? JSON.parse(readFileSync(cacheFile, "utf8")) : {};
async function osrm(pts) {
  const key = pts.map((p) => p.join(",")).join(";");
  if (cache[key]) return cache[key];
  let json;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      json = await (await fetch(`${OSRM}${key}?overview=full&geometries=geojson`)).json();
      if (json.code !== "Ok") throw new Error(json.code);
      break;
    } catch (e) {
      if (attempt === 4) throw e;
      await sleep(attempt * 3000);
    }
  }
  cache[key] = { km: json.routes[0].distance / 1000, coords: json.routes[0].geometry.coordinates, snapped: json.waypoints.map((w) => w.location) };
  writeFileSync(cacheFile, JSON.stringify(cache));
  await sleep(1500);
  return cache[key];
}

// --- tours -----------------------------------------------------------------------
const out = {};
for (const t of TOURS) {
  if (t.category === "trekking") continue;
  const meeting = [t.meetingPoint.lng, t.meetingPoint.lat];
  const stopList = t.itinerary.flatMap((d) => [...(d.extraStops ?? []), ...(d.stop ? [d.stop] : [])]);
  const stops = stopList.map((s) => [s.lng, s.lat]);
  const city = CITY[t.origin];
  // When the meeting point IS the first stop under another label, starting at
  // both draws a spike out and back. The page applies the same rule.
  const sameAsFirst = stops.length && t.meetingPoint.name.split(/,| — | -- /)[0].trim() === stopList[0].name;
  let wps;
  if (stops.length) wps = sameAsFirst ? stops : [meeting, ...stops];
  else if (city && kmBetween(city, meeting) > 5) wps = [city, meeting, city];
  else wps = [meeting];
  // Day trips come back the same day. The shared ones list only the
  // destination as a stop, so without this they were drawn (and counted) one
  // way: 160 km for Ouzoud against 320 km for the private trip.
  if (t.category === "day-tours" && wps.length > 1 && kmBetween(wps[wps.length - 1], wps[0]) > 5) wps.push(wps[0]);
  wps = wps.filter((p, i, a) => i === 0 || kmBetween(p, a[i - 1]) > 1);

  const onFoot = t.slug.includes("camel-trek");
  const legs = [], offRoad = [];
  let km = 0, run = [];
  const flush = async () => {
    if (run.length < 2) { run = []; return; }
    const r = await osrm(run);
    km += r.km;
    legs.push({ mode: "road", coords: rdp(r.coords, 0.002).map(rnd(4)) });
    run.forEach((p, i) => { if (kmBetween(r.snapped[i], p) > 10) offRoad.push({ from: rnd(4)(r.snapped[i]), to: rnd(4)(p) }); });
    run = [];
  };
  for (let i = 1; i < wps.length; i++) {
    const [a, b] = [wps[i - 1], wps[i]];
    if (onFoot && kmBetween(a, b) < 40) {
      await flush();
      legs.push({ mode: "foot", coords: [a, b].map(rnd(4)) });
    } else {
      if (!run.length) run.push(a);
      run.push(b);
    }
  }
  await flush();

  const frame = frameFor([...wps, ...legs.flatMap((l) => l.coords), ...offRoad.flatMap((o) => [o.from, o.to])]);
  out[t.slug] = { frame: Object.fromEntries(Object.entries(frame).map(([k, v]) => [k, +v.toFixed(4)])), km: Math.round(km / 10) * 10, legs, offRoad };
  console.log(`${t.slug}: ${legs.map((l) => l.mode[0]).join("") || "dot"}, ${out[t.slug].km} km road${offRoad.length ? `, ${offRoad.length} off-road` : ""}`);
}
writeFileSync("lib/route-maps.json", JSON.stringify(out) + "\n");
console.log(`\nlib/route-maps.json: ${Object.keys(out).length} tours`);
