// Data for the trek maps (components/map/RouteMap.tsx, trek mode).
//
//   lib/trek-maps.json             { [slug]: { frame, km, legs, offRoad, trails, pois, relief } }
//   public/maps/relief/<slug>.webp  shaded relief for the frame
//
// Owner, 2026-10-12: treks get the same map as the other tours (dark, the zoom
// in from the whole of Morocco), but showing the real paths, the terrain and
// the names of places. This replaces the satellite map on trek pages.
//
//   - route: walked along the OpenStreetMap trail network between the
//     itinerary's stops and the passes the day titles name (PLANS below), with
//     a shortest-path search over the trails themselves. A public foot router
//     was tried first and sent Imlil → Toubkal Refuge round a 191 km detour (a
//     gap in its graph on the Mizane trail), so the routing is done here, on the
//     raw ways. Legs with no mapped trail are drawn straight and dashed, and
//     counted as approximate.
//   - trails: every footpath, mule track and road in the frame, faint, so the
//     route reads as one line through the real network.
//   - pois: named peaks with their height, the passes on the route, refuges.
//   - relief: hillshade from Mapterhorn's terrarium DEM tiles, rendered to the
//     frame's own equirectangular grid so it lines up with the SVG exactly.
//
// Sources: OpenStreetMap via Overpass (ODbL; credited under the map), and
// Mapterhorn (attribution under the map). Raw downloads in
// C:/Users/cash/wild-atlas-research/geo/osm and geo/dem, outside the repo.
//
//   node scripts/build-trek-maps.mjs
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import sharp from "sharp";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url, { alias: { "@": process.cwd() } });
const { TOURS } = await jiti.import("../lib/tours.ts");
const { frameFor, TREK_FRAMING } = await jiti.import("../lib/route-map-frame.ts");

const GEO = "C:/Users/cash/wild-atlas-research/geo";
const RELIEF_W = 1350, RELIEF_H = 900;
mkdirSync(`${GEO}/dem`, { recursive: true });
mkdirSync("public/maps/relief", { recursive: true });

// --- places the itineraries walk through (OpenStreetMap positions) ----------------
// Passes and summits come from the OSM nodes of the same name, checked by hand
// against each day's title. The tour's own stops are read from lib/tours.ts.
const P = {
  imlil: [-7.9169, 31.1369],
  refuge: [-7.937584, 31.063483],
  summit: [-7.91494, 31.05983], // Jbel Toubkal, 4,167 m
  sidiChamharouch: [-7.91189, 31.09778], // the shrine (historic=tomb)
  tiziMzik: [-7.95111, 31.12367], // 2,480 m
  tiziAguelzim: [-7.94067, 31.08826], // 3,540 m
  azibTamsoult: [-7.96795, 31.09745], // Refuge Tamsoult
  tiziOudite: [-7.95735, 31.14068], // Tizi n'Oudite, 2,220 m
  tiziOussem: [-7.9736, 31.11855],
  aguersioual: [-7.92475, 31.16052],
  tiziTamatert: [-7.88878, 31.14821], // 2,302 m
  tachedirt: [-7.84377, 31.15589],
  tiziLikemt: [-7.82704, 31.13092], // 3,625 m
  azibLikemt: [-7.8126, 31.11187],
  tiziOuouraine: [-7.81217, 31.06001], // Tizi n'Ououraine, 3,120 m ("Tizi n'Ourai")
  amsouzart: [-7.83254, 31.01563],
  lakeIfni: [-7.88349, 31.03143], // Lac d'Ifni, centre of the lake
  tiziOuanoums: [-7.9319, 31.05038], // 3,680 m
  ouanoukrim: [-7.9458, 31.04154], // Ras Ouanoukrim, 4,083 m
  timesguida: [-7.94713, 31.03649], // 4,088 m
  // Tacheddirt -> Ourika: over Tizi n'Tachedirt (3,172 m) and down to Iabassene,
  // the published Tacheddirt-Setti Fatma line (fastestknowntime.com route
  // "Tachedirt To Setti Fadma"); the transfer to Marrakech starts there.
  tiziTachedirt: [-7.80689, 31.16427],
  ourika: [-7.78111, 31.18315], // Iabassene
  // M'Goun massif. The trek's stops are the tour's own, except where they sat
  // kilometres from the OSM feature of the same name (moved in lib/tours.ts).
  tabant: [-6.4561, 31.6558], // the meeting point, Ait Bouguemez
  aitImi: [-6.40592, 31.65283],
  tiziAitImi: [-6.38255, 31.61], // Tizi n'Ait Imi, 2,905 m in OSM
  tarkeddit: [-6.51576, 31.53153], // Refuge de Tarkeddite
  mgoun: [-6.44415, 31.50909], // Jebel M'Goun, 4,071 m in OSM
  mgounGorge: [-6.32, 31.47], // the tour's "Tessaout Gorge" stop
  boutharar: [-6.12217, 31.38948],
  // 15-day traverse stops with no OSM match, as the tour gives them.
  aitBougmez: [-6.447, 31.644],
  magdaz: [-6.26, 31.47],
  oulilimt: [-6.36, 31.5],
  tafraoute: [-8.9762, 29.7231],
  azzaden: [-7.9736, 31.11855], // the valley's main village, Tizi Oussem
};

// Walking order per trek, in the day titles' own order. `region` names the OSM
// download the route is searched on; `straight` treks have no mapped route to
// follow (the 15-day traverse crosses ~150 km of "remote valleys" the itinerary
// does not name), so their legs are drawn stop to stop, dashed.
const PLANS = {
  "toubkal-summit-2day-marrakech": { region: "toubkal", walk: ["imlil", "sidiChamharouch", "refuge", "summit", "refuge", "imlil"] },
  "toubkal-summit-trek-4day": { region: "toubkal", walk: ["imlil", "sidiChamharouch", "refuge", "summit", "refuge", "imlil"] },
  "toubkal-three-peaks-4000m-3day": { region: "toubkal", walk: ["imlil", "sidiChamharouch", "refuge", "timesguida", "ouanoukrim", "refuge", "summit", "refuge", "imlil"] },
  "toubkal-aguelzim-pass-3day": { region: "toubkal", walk: ["imlil", "tiziMzik", "azibTamsoult", "tiziAguelzim", "refuge", "summit", "refuge", "sidiChamharouch", "imlil"] },
  "toubkal-circuit-ifni-lake-6day": { region: "toubkal", walk: ["imlil", "tiziTamatert", "tachedirt", "tiziLikemt", "azibLikemt", "tiziOuouraine", "amsouzart", "lakeIfni", "tiziOuanoums", "refuge", "summit", "refuge", "sidiChamharouch", "imlil"] },
  "azzaden-valley-2day-trek": { region: "toubkal", walk: ["imlil", "tiziMzik", "tiziOussem", "tiziOudite", "aguersioual", "imlil"] },
  "atlas-mountains-3day-trek": { region: "toubkal", walk: ["imlil", "azzaden", "imlil", "tiziTamatert", "tachedirt", "tiziTachedirt", "ourika"] },
  "family-atlas-4day-trek": { region: "toubkal", walk: ["imlil", "tiziTamatert", "tachedirt", "tiziTachedirt", "ourika"] },
  "mgoun-massif-trek": { region: "mgoun", walk: ["tabant", "aitImi", "tiziAitImi", "tarkeddit", "mgoun", "mgounGorge", "boutharar"] },
  // The traverse's middle days ("over the western passes", "remote valleys")
  // name no places for ~150 km, so it is walked on the trail graph where both
  // ends are in a downloaded massif and drawn straight between them.
  "high-atlas-grand-traverse-15day": { region: ["mgoun", "toubkal"], walk: ["aitBougmez", "tarkeddit", "mgoun", "mgounGorge", "magdaz", "oulilimt", "azzaden", "tachedirt", "refuge", "summit", "refuge", "imlil"] },
  // Anti-Atlas: day loops from Tafraoute with no named route, so the map shows
  // the area around Tafraoute (relief, trails, peaks) and no invented line.
  "anti-atlas-trekking-agadir": { region: "tafraoute", walk: [], area: [-8.9762, 29.7231] },
};

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
const inFrame = (f, [x, y]) => x >= f.lon0 && x <= f.lon1 && y >= f.lat0 && y <= f.lat1;

// --- OSM regions: a walkable graph, and the features to name -----------------------
const TRAIL = new Set(["path", "footway", "track", "bridleway", "steps"]);
const regions = {};
function region(name) {
  if (regions[name]) return regions[name];
  const els = JSON.parse(readFileSync(`${GEO}/osm/${name}.json`, "utf8")).elements;
  const node = new Map();
  for (const e of els) if (e.type === "node") node.set(e.id, [e.lon, e.lat]);
  const adj = new Map();
  const link = (a, b, w) => { if (!adj.has(a)) adj.set(a, []); adj.get(a).push([b, w]); };
  const ways = [];
  for (const e of els) {
    const hw = e.type === "way" && e.tags?.highway;
    if (!hw) continue;
    const ids = e.nodes.filter((id) => node.has(id));
    ways.push({ trail: TRAIL.has(hw), coords: ids.map((id) => node.get(id)) });
    for (let i = 1; i < ids.length; i++) {
      const w = kmBetween(node.get(ids[i - 1]), node.get(ids[i]));
      link(ids[i - 1], ids[i], w); link(ids[i], ids[i - 1], w);
    }
  }
  const isFeat = (t) => t && t.name && (t.natural === "peak" || t.mountain_pass === "yes" || t.natural === "saddle");
  const centre = (e) => {
    if (e.type === "node") return [e.lon, e.lat];
    const pts = (e.nodes ?? []).map((id) => node.get(id)).filter(Boolean);
    return pts.length ? [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length] : null;
  };
  const feats = els.filter((e) => isFeat(e.tags)).map((e) => ({ tags: e.tags, p: centre(e) })).filter((f) => f.p);
  const water = els.filter((e) => e.type === "way" && e.tags?.natural === "water").map((e) => e.nodes.map((id) => node.get(id)).filter(Boolean));
  regions[name] = { node, adj, ways, water, feats };
  return regions[name];
}

function nearestNode(r, p) {
  let best = null, bd = Infinity;
  for (const [id, q] of r.node) { if (!r.adj.has(id)) continue; const d = kmBetween(p, q); if (d < bd) { bd = d; best = id; } }
  return { id: best, km: bd };
}

// A* over the trail graph, by distance. A binary heap: the Toubkal graph has
// ~170,000 nodes.
function route(r, a, b) {
  const s = nearestNode(r, a), t = nearestNode(r, b);
  const goal = r.node.get(t.id);
  const g = new Map([[s.id, 0]]), prev = new Map();
  const heap = [];
  const push = (f, id) => { heap.push([f, id]); let i = heap.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (heap[p][0] <= heap[i][0]) break; [heap[p], heap[i]] = [heap[i], heap[p]]; i = p; } };
  const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let i = 0; for (;;) { const l = 2 * i + 1, rr = l + 1; let m = i; if (l < heap.length && heap[l][0] < heap[m][0]) m = l; if (rr < heap.length && heap[rr][0] < heap[m][0]) m = rr; if (m === i) break; [heap[m], heap[i]] = [heap[i], heap[m]]; i = m; } } return top; };
  push(kmBetween(r.node.get(s.id), goal), s.id);
  const closed = new Set();
  while (heap.length) {
    const [, u] = pop();
    if (u === t.id) break;
    if (closed.has(u)) continue;
    closed.add(u);
    for (const [v, w] of r.adj.get(u) ?? []) {
      const nd = g.get(u) + w;
      if (nd < (g.get(v) ?? Infinity)) { g.set(v, nd); prev.set(v, u); push(nd + kmBetween(r.node.get(v), goal), v); }
    }
  }
  if (!g.has(t.id)) return null;
  const ids = [t.id];
  while (ids[0] !== s.id) ids.unshift(prev.get(ids[0]));
  return { km: g.get(t.id), coords: ids.map((id) => r.node.get(id)), snap: [s.km, t.km] };
}

// --- relief ------------------------------------------------------------------------
const tileXY = (lon, lat, z) => {
  const n = 2 ** z, la = (lat * Math.PI) / 180;
  return [((lon + 180) / 360) * n, ((1 - Math.log(Math.tan(la) + 1 / Math.cos(la)) / Math.PI) / 2) * n];
};
async function demTile(z, x, y) {
  const file = `${GEO}/dem/${z}-${x}-${y}.webp`;
  if (!existsSync(file)) {
    const res = await fetch(`https://tiles.mapterhorn.com/${z}/${x}/${y}.webp`);
    if (!res.ok) throw new Error(`DEM ${z}/${x}/${y}: ${res.status}`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  }
  const { data, info } = await sharp(readFileSync(file)).raw().toBuffer({ resolveWithObject: true });
  const size = info.width, ch = info.channels, el = new Float32Array(size * size);
  for (let i = 0; i < size * size; i++) el[i] = data[i * ch] * 256 + data[i * ch + 1] + data[i * ch + 2] / 256 - 32768;
  return { size, el };
}
async function relief(slug, frame) {
  const pxPerDeg = RELIEF_W / (frame.lon1 - frame.lon0);
  const z = Math.min(12, Math.max(6, Math.ceil(Math.log2((pxPerDeg * 360) / 512))));
  const [tx0, ty0] = tileXY(frame.lon0, frame.lat1, z).map(Math.floor);
  const [tx1, ty1] = tileXY(frame.lon1, frame.lat0, z).map(Math.floor);
  const tiles = new Map();
  for (let x = tx0; x <= tx1; x++) for (let y = ty0; y <= ty1; y++) tiles.set(`${x},${y}`, await demTile(z, x, y));
  const size = tiles.values().next().value.size;
  const elev = (lon, lat) => {
    const [fx, fy] = tileXY(lon, lat, z);
    const t = tiles.get(`${Math.floor(fx)},${Math.floor(fy)}`);
    if (!t) return 0;
    const px = Math.min(size - 1.001, (fx - Math.floor(fx)) * size), py = Math.min(size - 1.001, (fy - Math.floor(fy)) * size);
    const x0 = Math.floor(px), y0 = Math.floor(py), dx = px - x0, dy = py - y0;
    const at = (x, y) => t.el[Math.min(size - 1, y) * size + Math.min(size - 1, x)];
    return at(x0, y0) * (1 - dx) * (1 - dy) + at(x0 + 1, y0) * dx * (1 - dy) + at(x0, y0 + 1) * (1 - dx) * dy + at(x0 + 1, y0 + 1) * dx * dy;
  };
  const W = RELIEF_W, H = RELIEF_H;
  const E = new Float32Array(W * H);
  let lo = Infinity, hi = -Infinity;
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
    const v = elev(frame.lon0 + ((i + 0.5) / W) * (frame.lon1 - frame.lon0), frame.lat1 - ((j + 0.5) / H) * (frame.lat1 - frame.lat0));
    E[j * W + i] = v; lo = Math.min(lo, v); hi = Math.max(hi, v);
  }
  // Metres per pixel, for a true slope.
  const kx = Math.cos((((frame.lat0 + frame.lat1) / 2) * Math.PI) / 180);
  const mx = ((frame.lon1 - frame.lon0) * 111320 * kx) / W, my = ((frame.lat1 - frame.lat0) * 110540) / H;
  const az = (315 * Math.PI) / 180, alt = (40 * Math.PI) / 180;
  const at = (x, y) => E[Math.max(0, Math.min(H - 1, y)) * W + Math.max(0, Math.min(W - 1, x))];
  const out = Buffer.alloc(W * H * 3);
  // Palette: the route map's navy, lifted on sunlit slopes, paler on the tops.
  const deep = [13, 20, 42], lit = [78, 96, 146], top = [156, 166, 196];
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
    const dzdx = (at(i + 1, j) - at(i - 1, j)) / (2 * mx), dzdy = (at(i, j + 1) - at(i, j - 1)) / (2 * my);
    const slope = Math.atan(1.5 * Math.hypot(dzdx, dzdy));
    const aspect = Math.atan2(dzdy, -dzdx);
    let shade = Math.sin(alt) * Math.cos(slope) + Math.cos(alt) * Math.sin(slope) * Math.cos(az - Math.PI / 2 - aspect);
    shade = Math.max(0, Math.min(1, shade)) ** 1.2;
    const h = hi > lo ? (E[j * W + i] - lo) / (hi - lo) : 0;
    const o = (j * W + i) * 3;
    for (let c = 0; c < 3; c++) {
      const base = deep[c] + (lit[c] - deep[c]) * shade;
      out[o + c] = Math.round(base + (top[c] - base) * Math.max(0, h - 0.8) * 1.5 * shade);
    }
  }
  await sharp(out, { raw: { width: W, height: H, channels: 3 } }).webp({ quality: 62 }).toFile(`public/maps/relief/${slug}.webp`);
  return { href: `/maps/relief/${slug}.webp`, z, lo: Math.round(lo), hi: Math.round(hi) };
}

// --- names -------------------------------------------------------------------------
// OSM names here mix Latin, Arabic and Tifinagh in one tag ("Imlil ⵉⵎⵍⵉⵍ
// إمليل"). Keep the Latin part for every locale; name:ar for Arabic pages.
const latin = (t) => {
  const pick = [t["name:en"], t["name:fr"], t.name].find((n) => n && /[A-Za-z]/.test(n)) ?? t.name;
  return pick.replace(/[؀-ۿⴰ-⵿].*$/, "").replace(/’/g, "'").trim();
};

// --- treks --------------------------------------------------------------------------
// Each leg is walked on the trail graph of the OSM region that holds both ends.
// A leg no downloaded region covers, or with no trail between its ends, is
// drawn straight and dashed ("foot"), and the trek's distance is then left off
// the caption rather than printed from straight lines.
const regionBox = (r) => {
  if (!r.box) {
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const [x, y] of r.node.values()) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    r.box = { lon0: x0, lon1: x1, lat0: y0, lat1: y1 };
  }
  return r.box;
};
const out = {};
for (const [slug, plan] of Object.entries(PLANS)) {
  const tour = TOURS.find((t) => t.slug === slug);
  if (!tour) throw new Error(`${slug}: not in lib/tours.ts`);
  const regs = (Array.isArray(plan.region) ? plan.region : [plan.region]).map(region);
  const pts = plan.walk.map((k) => { if (!P[k]) throw new Error(`${slug}: unknown place ${k}`); return P[k]; });
  const legs = [];
  let km = 0, approximate = false, run = [];
  const flush = () => { if (run.length > 1) legs.push({ mode: "trail", coords: rdp(run, 0.00006).map(rnd(5)) }); run = []; };
  for (let i = 1; i < pts.length; i++) {
    const [a, b] = [pts[i - 1], pts[i]];
    const r = regs.find((g) => inFrame(regionBox(g), a) && inFrame(regionBox(g), b));
    const res = r && !plan.straight ? route(r, a, b) : null;
    if (res && res.snap.every((s) => s <= 0.8) && res.km < kmBetween(a, b) * 4) {
      km += res.km;
      run.push(...(run.length ? res.coords.slice(1) : res.coords));
      console.log(`   ${plan.walk[i - 1]} -> ${plan.walk[i]}: ${res.km.toFixed(1)} km`);
    } else {
      flush();
      approximate = true;
      legs.push({ mode: "foot", coords: [a, b].map(rnd(5)) });
      console.log(`   ${plan.walk[i - 1]} -> ${plan.walk[i]}: straight (${kmBetween(a, b).toFixed(1)} km as the crow flies)`);
    }
  }
  flush();
  const all = legs.flatMap((l) => l.coords);
  const frame = all.length
    ? frameFor(all, TREK_FRAMING)
    : frameFor([[plan.area[0] - 0.09, plan.area[1] - 0.06], [plan.area[0] + 0.09, plan.area[1] + 0.06]], TREK_FRAMING);
  const line = legs.filter((l) => l.mode === "trail").flatMap((l) => l.coords);

  // Faint network: trails and roads in the frame, simplified, short stubs
  // dropped. Not on the regional-scale traverse, where it would be a smear.
  const trails = [], roads = [], water = [];
  // Detail scales with the frame: a 0.6-degree map is drawn at a third of the
  // scale of a 0.2-degree one, so it gets a third of the detail.
  const k = Math.max(1, (frame.lon1 - frame.lon0) / 0.2);
  if (frame.lon1 - frame.lon0 < 0.7) for (const r of regs) {
    for (const w of r.ways) {
      const c = w.coords.filter((p) => inFrame(frame, p));
      if (c.length < 2) continue;
      let len = 0; for (let i = 1; i < c.length; i++) len += kmBetween(c[i - 1], c[i]);
      if (len < (w.trail ? 0.25 : 0.4) * k) continue;
      (w.trail ? trails : roads).push(rdp(c, 0.00018 * k).map(rnd(4)));
    }
    water.push(...r.water.filter((w) => w.length > 3 && w.some((p) => inFrame(frame, p))).map((w) => rdp(w, 0.0001).map(rnd(4))));
  }

  // Names: the passes the route crosses, and the peaks in view, the ones on the
  // route first, then the highest, at most 7, no two within ~1.2 km (scaled
  // with the frame on the traverse).
  const nearRoute = (p, k) => line.some((q) => kmBetween(p, q) < k);
  const spacing = Math.max(1.2, (frame.lon1 - frame.lon0) * 12);
  const peaks = [], passes = [];
  for (const r of regs) for (const f of r.feats) {
    if (!inFrame(frame, f.p)) continue;
    const t = f.tags, ele = Number.parseInt(t.ele ?? "", 10) || undefined, name = latin(t);
    if (!name || /^\d/.test(name) || /^tizi$/i.test(name) || /avion|moteur|summit/i.test(name)) continue;
    const poi = { name, ar: t["name:ar"], ele, p: rnd(5)(f.p) };
    if (t.natural === "peak" && ele && !/^tizi/i.test(name)) peaks.push({ ...poi, onRoute: nearRoute(f.p, 0.25) });
    else if (t.natural !== "peak" && nearRoute(f.p, 0.3)) passes.push({ kind: "pass", ...poi });
  }
  peaks.sort((a, b) => Number(b.onRoute) - Number(a.onRoute) || b.ele - a.ele);
  const keep = [];
  for (const p of peaks) if (keep.length < 7 && !keep.some((q) => kmBetween(q.p, p.p) < spacing)) keep.push(p);
  const pois = [...keep.map(({ onRoute, ...p }) => ({ kind: "peak", ...p })), ...passes];

  const rel = await relief(slug, frame);
  out[slug] = {
    frame: Object.fromEntries(Object.entries(frame).map(([k, v]) => [k, +v.toFixed(5)])),
    km: approximate ? 0 : Math.round(km),
    trek: true,
    legs,
    offRoad: [],
    trails, roads, water, pois,
    relief: rel.href,
  };
  console.log(`${slug}: ${approximate ? "approximate" : `${km.toFixed(1)} km on foot`}, ${legs.length} legs, ${trails.length} trails, ${roads.length} roads, ${pois.length} names, relief z${rel.z} ${rel.lo}-${rel.hi} m`);
}
writeFileSync("lib/trek-maps.json", JSON.stringify(out) + "\n");
console.log(`\nlib/trek-maps.json: ${Object.keys(out).length} treks, ${(JSON.stringify(out).length / 1024).toFixed(0)} KB`);
