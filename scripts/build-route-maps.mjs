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
// Legs are "road" (OSRM along real roads) or "foot". Only the camel trek and
// the two Toubkal-and-Sahara tours have foot legs (the rule is at the loop
// below), drawn as straight dashed lines camp to camp because there is no road
// to snap to. A stop the road cannot reach gets a
// dashed `offRoad` connector from the nearest road point when it is over 10 km
// away (in practice the ~22 km 4x4 run to Erg Chegaga; the Erg Chebbi camp,
// ~4 km into the dunes, is a few pixels at this scale). `km` is road distance.
//
// Sources: OSRM public demo server (OpenStreetMap, ODbL; credited under the
// map) and Natural Earth 1:10m, Morocco's point-of-view edition (public
// domain). The map opens on the whole of Morocco before zooming to the route
// (RouteDraw), so the outline must be the country as Morocco draws it: the
// southern provinces included, with no line across them. The default Natural
// Earth file splits them off as a separate "Western Sahara". Raw downloads and the OSRM
// cache live in C:/Users/cash/wild-atlas-research/geo/, outside the repo.
//
//   node scripts/build-route-maps.mjs        (re-run when a tour's stops change)
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url, { alias: { "@": process.cwd() } });
const { TOURS } = await jiti.import("../lib/tours.ts");
const { frameFor } = await jiti.import("../lib/route-map-frame.ts");
const { VIA_PLACES, viaInTitle } = await jiti.import("../lib/route-map-via.ts");

const RAW = "C:/Users/cash/wild-atlas-research/geo";
const NE_URL = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries_mar.geojson";
const OSRM = "https://router.project-osrm.org/route/v1/driving/";
// Wide enough for the opening whole-Morocco view (OVERVIEW in route-map-frame.ts).
const BOX = { lon0: -24, lon1: 5.5, lat0: 18.5, lat1: 38.5 };
const COUNTRIES = ["Morocco", "Algeria", "Mauritania", "Spain", "Portugal"];
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
const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’`]/g, "'").toLowerCase();
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
const nePath = `${RAW}/ne_10m_admin_0_countries_mar.geojson`;
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

// How far a point is from the nearest road OSRM knows, cached with the routes.
async function offRoadBy(p) {
  const key = `nearest:${p.join(",")}`;
  if (cache[key] === undefined) {
    const json = await (await fetch(`https://router.project-osrm.org/nearest/v1/driving/${p.join(",")}`)).json();
    cache[key] = json.code === "Ok" ? json.waypoints[0].distance / 1000 : 0;
    writeFileSync(cacheFile, JSON.stringify(cache));
    await sleep(1500);
  }
  return cache[key];
}

// --- tours -----------------------------------------------------------------------
const out = {};
// Trekking tours that are mostly road trips get this map rather than a trek
// map (scripts/build-trek-maps.mjs): their walk is the Toubkal ascent, a day or
// two inside a week of driving, drawn on foot like the camel trek.
const ROAD_SCALE_TREKS = ["toubkal-summit-sahara-5day", "morocco-highlights-toubkal-sahara-8day"];
for (const t of TOURS) {
  if (t.category === "trekking" && !ROAD_SCALE_TREKS.includes(t.slug)) continue;
  const meeting = [t.meetingPoint.lng, t.meetingPoint.lat];
  const stopList = t.itinerary.flatMap((d) => [...(d.extraStops ?? []), ...(d.stop ? [d.stop] : [])]);
  // Waypoints in driving order: each day's stops, with the places its title
  // names routed through (lib/route-map-via.ts). Until 2026-10-15 only the
  // overnight stops were routed, and OSRM took its own shortest road between
  // them: "Marrakech → Tizi n'Tichka → Aït Ben Haddou → Midelt" was drawn
  // through Beni Mellal (620 km against the itinerary's 860), and the 3-day
  // Sahara loop came home the way it went out instead of by Alnif and Tazarine.
  const via = [];
  const stops = [];
  // The itinerary day each stop is reached on, to tell walking days from driving ones.
  const stopDay = [];
  for (const d of t.itinerary) {
    const dayStops = [...(d.extraStops ?? []), ...(d.stop ? [d.stop] : [])];
    const { before, after } = viaInTitle(d.title, dayStops.map((s) => s.name));
    // Not a place already stood on: the last point, today's stops, or the
    // stop the day starts from under another name. "Dades Valley → Todra" the
    // morning after a night at the "Dades Valley" stop (Boumalne) starts there;
    // routing it to the gorge point drew a 25 km spike up the gorge and back.
    const lastStop = [...t.itinerary.slice(0, t.itinerary.indexOf(d))].reverse().find((x) => x.stop)?.stop;
    const keep = (id) => {
      const p = [VIA_PLACES[id].lon, VIA_PLACES[id].lat];
      const prev = stops.length ? stops[stops.length - 1] : meeting;
      if (lastStop && kmBetween(prev, [lastStop.lng, lastStop.lat]) < 1 && VIA_PLACES[id].match.test(norm(lastStop.name))) return false;
      return kmBetween(p, prev) > 4 && dayStops.every((s) => kmBetween(p, [s.lng, s.lat]) > 4);
    };
    const add = (ids) => {
      for (const id of ids.filter(keep)) {
        stops.push([VIA_PLACES[id].lon, VIA_PLACES[id].lat]); stopDay.push(d);
        if (!via.includes(id)) via.push(id);
      }
    };
    add(before);
    for (const s of dayStops) { stops.push([s.lng, s.lat]); stopDay.push(d); }
    add(after);
  }
  const city = CITY[t.origin];
  // When the meeting point IS the first stop under another label, starting at
  // both draws a spike out and back. The page applies the same rule.
  const sameAsFirst = stops.length && t.meetingPoint.name.split(/,| — | -- /)[0].trim() === stopList[0].name;
  let wps, wpDay;
  if (stops.length) [wps, wpDay] = sameAsFirst ? [stops, stopDay] : [[meeting, ...stops], [null, ...stopDay]];
  else if (city && kmBetween(city, meeting) > 5) [wps, wpDay] = [[city, meeting, city], [null, null, null]];
  else [wps, wpDay] = [[meeting], [null]];
  // Day trips come back the same day. The shared ones list only the
  // destination as a stop, so without this they were drawn (and counted) one
  // way: 160 km for Ouzoud against 320 km for the private trip.
  if (t.category === "day-tours" && wps.length > 1 && kmBetween(wps[wps.length - 1], wps[0]) > 5) { wps.push(wps[0]); wpDay.push(null); }
  const kept = wps.map((p, i) => i === 0 || kmBetween(p, wps[i - 1]) > 1);
  wps = wps.filter((_, i) => kept[i]);
  wpDay = wpDay.filter((_, i) => kept[i]);

  const onFoot = t.slug.includes("camel-trek") || ROAD_SCALE_TREKS.includes(t.slug);
  const legs = [], offRoad = [];
  let km = 0, run = [];
  // On a tour that walks, the road has to meet the walk: where a road leg
  // starts or ends at a point off the road (the Erg Chebbi camp, ~4 km into
  // the dunes) the gap is drawn dashed, not left open. Elsewhere only the
  // 4x4 runs over 10 km are drawn; shorter ones are a few pixels at road scale.
  const offRoadKm = onFoot ? 1.5 : 10;
  const flush = async () => {
    if (run.length < 2) { run = []; return; }
    const r = await osrm(run);
    km += r.km;
    legs.push({ mode: "road", coords: rdp(r.coords, 0.002).map(rnd(4)) });
    run.forEach((p, i) => { if (kmBetween(r.snapped[i], p) > offRoadKm) offRoad.push({ from: rnd(4)(r.snapped[i]), to: rnd(4)(p) }); });
    run = [];
  };
  for (let i = 1; i < wps.length; i++) {
    const [a, b] = [wps[i - 1], wps[i]];
    // Walked: a short hop (Imlil -> the refuge, the camel ride out of the Erg
    // Chebbi camp), or a walkable leg into a day with no driving. Until
    // 2026-10-16 it was any hop under 40 km, which drew two ~45 km camel days
    // of the Chegaga trek as roads and the 34 km drive from the Dades to the
    // Todra as a walk.
    const d = kmBetween(a, b);
    const walkingDay = wpDay[i] && !wpDay[i].driving;
    if (onFoot && (d < 15 || (walkingDay && d < 60))) {
      await flush();
      legs.push({ mode: "foot", coords: [a, b].map(rnd(4)) });
    } else if (!onFoot && d < 120 && Math.max(await offRoadBy(a), await offRoadBy(b)) > 6) {
      // Into or out of a camp no road reaches (Erg Chegaga: 9.7 km from a
      // stray desert track, ~22 km from a road that goes anywhere; the Erg
      // Chebbi camp, at 4 km, stays a road stop): the 4x4 crosses open desert,
      // drawn dashed point to point. Routed by OSRM it went the long way round by the Zagora and Foum
      // Zguid roads, and the Chegaga tour from Marrakech showed 1,410 km.
      await flush();
      offRoad.push({ from: rnd(4)(a), to: rnd(4)(b) });
    } else {
      if (!run.length) run.push(a);
      run.push(b);
    }
  }
  await flush();

  const frame = frameFor([...wps, ...legs.flatMap((l) => l.coords), ...offRoad.flatMap((o) => [o.from, o.to])]);
  out[t.slug] = { frame: Object.fromEntries(Object.entries(frame).map(([k, v]) => [k, +v.toFixed(4)])), km: Math.round(km / 10) * 10, legs, offRoad, ...(via.length ? { via } : {}) };
  console.log(`${t.slug}: ${legs.map((l) => l.mode[0]).join("") || "dot"}, ${out[t.slug].km} km road${offRoad.length ? `, ${offRoad.length} off-road` : ""}`);
}
writeFileSync("lib/route-maps.json", JSON.stringify(out) + "\n");
console.log(`\nlib/route-maps.json: ${Object.keys(out).length} tours`);
