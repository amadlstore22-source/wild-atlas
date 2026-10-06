import MAPS from "@/lib/route-maps.json";
import LAND from "@/lib/route-map-land.json";
import { MAP_H, MAP_W, projector, type Frame, type LonLat } from "@/lib/route-map-frame";
import RouteDraw from "./RouteDraw";

/**
 * Static route map: Morocco, the route along its real roads, and every stop
 * named. Replaced the satellite map (MapLibre + Esri imagery) on every tour
 * except treks on 2026-10-06, by the owner's choice: the satellite view showed
 * numbered pins on brown terrain with no names, so a reader could not tell
 * where the trip went. Plain SVG rendered on the server: no map library, tiles
 * or WebGL.
 *
 * Treks keep the satellite map with 3D terrain. A contour-line close-up was
 * built for them and rejected by the owner the same day ("not as I pictured
 * it"): at a trek's scale the lines read as noise.
 *
 * Data from scripts/build-route-maps.mjs. Day trips show the drive there and
 * back; tours that happen in town show one dot, and the page adds an "Open in
 * Google Maps" link for the exact meeting point.
 */

type Leg = { mode: "road" | "foot"; coords: LonLat[] };
type MapData = { frame: Frame; km: number; legs: Leg[]; offRoad: { from: LonLat; to: LonLat }[] };
const maps = MAPS as unknown as Record<string, MapData>;
const land = LAND as unknown as Record<string, LonLat[][]>;

export const hasRouteMap = (slug: string) => Boolean(maps[slug]);

const W = MAP_W, H = MAP_H;
// Label sizes are viewBox units. Phones show the 900-wide SVG at ~350px, so
// globals.css (.road-map) roughly doubles them below 640px; collisions are
// checked at that larger size so a layout that clears on a phone clears on a
// desktop too.
const LABEL_MOBILE = 24;
const CHAR_W = 0.74; // average uppercase advance + letter-spacing, in em

export interface RegionNames {
  atlantic: string;
  mediterranean: string;
  highAtlas: string;
  middleAtlas: string;
  antiAtlas: string;
  sahara: string;
}
const REGIONS: { key: keyof RegionNames; lon: number; lat: number; sea?: boolean }[] = [
  { key: "atlantic", lon: -10.25, lat: 32.15, sea: true },
  { key: "mediterranean", lon: -3.6, lat: 35.62, sea: true },
  { key: "highAtlas", lon: -6.75, lat: 31.62 },
  { key: "middleAtlas", lon: -4.6, lat: 33.25 },
  { key: "antiAtlas", lon: -8.15, lat: 29.95 },
  { key: "sahara", lon: -4.7, lat: 29.95 },
];

interface Props {
  slug: string;
  /** Where the route starts: the meeting point, or the city a day trip leaves from. */
  start: { name: string; lat: number; lng: number };
  /** Stops in route order (localised names): extraStops before each day's stop. */
  stops: { name: string; lat: number; lng: number }[];
  ariaLabel: string;
  kmLabel: string;
  footLabel: string;
  offRoadLabel: string;
  credit: string;
  regions: RegionNames;
  numberLocale: string;
}

const kmBetween = (a: LonLat, b: LonLat) => {
  const t = Math.PI / 180;
  const h = Math.sin(((b[1] - a[1]) * t) / 2) ** 2 + Math.cos(a[1] * t) * Math.cos(b[1] * t) * Math.sin(((b[0] - a[0]) * t) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};

export default function RouteMap(props: Props) {
  const { slug, start, stops, ariaLabel, kmLabel, footLabel, offRoadLabel, credit, regions, numberLocale } = props;
  const data = maps[slug];
  if (!data) return null;
  const { frame } = data;
  const px = projector(frame);
  const f = (n: number) => Math.round(n * 10) / 10;
  const path = (pts: LonLat[], close = false) =>
    pts.map((p, i) => { const [x, y] = px(p); return `${i ? "L" : "M"}${f(x)} ${f(y)}`; }).join("") + (close ? "Z" : "");

  // One labelled dot per place: a loop back to the start, or a second night in
  // the same town, is the same dot as the first visit.
  const places: { name: string; p: LonLat; origin: boolean }[] = [];
  for (const [i, s] of [start, ...stops].entries()) {
    const p: LonLat = [s.lng, s.lat];
    if (places.some((q) => kmBetween(q.p, p) < 2)) continue;
    places.push({ name: s.name, p, origin: i === 0 });
  }
  const inFrame = (p: LonLat) => p[0] >= frame.lon0 && p[0] <= frame.lon1 && p[1] >= frame.lat0 && p[1] <= frame.lat1;

  // --- labels: greedy placement --------------------------------------------------
  type Box = { x0: number; y0: number; x1: number; y1: number };
  const taken: Box[] = places.filter((pl) => inFrame(pl.p)).map((pl) => { const [x, y] = px(pl.p); return { x0: x - 9, y0: y - 9, x1: x + 9, y1: y + 9 }; });
  const outside = (b: Box) => b.x0 < 4 || b.y0 < 4 || b.x1 > W - 4 || b.y1 > H - 4;
  const overlap = (b: Box) =>
    taken.reduce((sum, t) => sum + Math.max(0, Math.min(b.x1, t.x1) - Math.max(b.x0, t.x0)) * Math.max(0, Math.min(b.y1, t.y1) - Math.max(b.y0, t.y0)), 0);
  const hit = (b: Box) => outside(b) || overlap(b) > 0;
  const fs = LABEL_MOBILE;

  const labels = places.filter((pl) => inFrame(pl.p)).sort((a, b) => Number(b.origin) - Number(a.origin)).map((pl) => {
    const [x, y] = px(pl.p);
    const w = pl.name.length * fs * CHAR_W;
    // Beside the dot first, then above/below, then the four diagonals.
    const side = (dir: 1 | -1, dy: number) => ({
      tx: x + dir * 14, ty: y + dy + fs * 0.35, anchor: dir === 1 ? "start" : "end",
      box: dir === 1
        ? { x0: x + 12, y0: y + dy - fs * 0.6, x1: x + 14 + w, y1: y + dy + fs * 0.5 }
        : { x0: x - 14 - w, y0: y + dy - fs * 0.6, x1: x - 12, y1: y + dy + fs * 0.5 },
    });
    const centred = (up: boolean) => up
      ? { tx: x, ty: y - 16, anchor: "middle", box: { x0: x - w / 2, y0: y - 16 - fs * 0.85, x1: x + w / 2, y1: y - 12 } }
      : { tx: x, ty: y + 16 + fs * 0.75, anchor: "middle", box: { x0: x - w / 2, y0: y + 12, x1: x + w / 2, y1: y + 18 + fs * 0.8 } };
    const options = [side(1, 0), side(-1, 0), centred(true), centred(false), side(-1, -fs), side(-1, fs), side(1, -fs), side(1, fs)];
    // Nothing free: a cluster of camps a few km apart (seen on the 15-day
    // traverse) printed names on top of each other. Keep the dot and drop the
    // name, except for the start, which takes the least-overlapping slot.
    const free = options.find((o) => !hit(o.box));
    const pick = free ?? (pl.origin
      ? options.filter((o) => !outside(o.box)).sort((a, b) => overlap(a.box) - overlap(b.box))[0] ?? options[0]
      : undefined);
    if (pick) taken.push(pick.box);
    return { ...pl, x, y, tx: pick?.tx, ty: pick?.ty, anchor: pick?.anchor };
  });

  // Region names are context, not content: only where they fit clear of the labels.
  const regionLabels = REGIONS.flatMap((r) => {
    if (!inFrame([r.lon, r.lat])) return [];
    const [x, y] = px([r.lon, r.lat]);
    const text = regions[r.key];
    const w = text.length * 26 * 0.5;
    const box = { x0: x - w / 2, y0: y - 22, x1: x + w / 2, y1: y + 8 };
    if (hit(box)) return [];
    taken.push(box);
    return [{ x, y, text, sea: Boolean(r.sea) }];
  });

  const hasFoot = data.legs.some((l) => l.mode === "foot");
  const clip = `rm-clip-${slug}`;

  return (
    <figure className="road-map overflow-hidden rounded-[4px]">
      <RouteDraw>
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel} direction="ltr" className="block h-auto w-full">
          <defs>
            <clipPath id={clip}><rect width={W} height={H} /></clipPath>
          </defs>
          <g clipPath={`url(#${clip})`}>
            {Object.entries(land).map(([country, rings]) => (
              <path key={country} className={country === "Morocco" ? "land" : "land land--near"} d={rings.map((r) => path(r, true)).join("")} />
            ))}
            {regionLabels.map((r) => (
              <text key={r.text} className={r.sea ? "region region--sea" : "region"} x={f(r.x)} y={f(r.y)} textAnchor="middle">{r.text}</text>
            ))}
            {data.legs.filter((l) => l.mode === "road").map((l, i) => <path key={`g${i}`} className="route-glow" d={path(l.coords)} />)}
            {data.legs.map((l, i) => (
              <path key={i} className={l.mode === "foot" ? "route route--foot" : "route"} d={path(l.coords)} pathLength={l.mode === "road" ? 1 : undefined} />
            ))}
            {data.offRoad.map((o, i) => (
              // On the camel trek the stretch past the road end is walked, not driven.
              <path key={`o${i}`} className={hasFoot ? "route route--foot" : "route route--offroad"} d={path([o.from, o.to])} />
            ))}
          </g>
          {labels.map((l) => (
            <g key={l.name} className={l.origin ? "stop stop--origin" : "stop"}>
              <circle cx={f(l.x)} cy={f(l.y)} r={l.origin ? 7 : 5.5} />
              {l.tx !== undefined && l.ty !== undefined ? (
                <text x={f(l.tx)} y={f(l.ty)} textAnchor={l.anchor as "start" | "end" | "middle"}>{l.name}</text>
              ) : (
                <title>{l.name}</title>
              )}
            </g>
          ))}
        </svg>
      </RouteDraw>
      <figcaption className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-3 text-xs">
        <span className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {data.km > 0 && (
            <span className="font-semibold text-cream">{kmLabel.replace("{km}", new Intl.NumberFormat(numberLocale).format(data.km))}</span>
          )}
          {hasFoot && (
            <span className="inline-flex items-center gap-2 text-cream/75">
              <svg width="26" height="6" aria-hidden><line x1="1" y1="3" x2="25" y2="3" stroke="#FBF8F3" strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" /></svg>
              {footLabel}
            </span>
          )}
          {data.offRoad.length > 0 && !hasFoot && (
            <span className="inline-flex items-center gap-2 text-cream/75">
              <svg width="26" height="6" aria-hidden><line x1="1" y1="3" x2="25" y2="3" stroke="#E0A85E" strokeWidth="2" strokeDasharray="4 4" /></svg>
              {offRoadLabel}
            </span>
          )}
        </span>
        <span className="text-cream/55">{credit}</span>
      </figcaption>
    </figure>
  );
}
