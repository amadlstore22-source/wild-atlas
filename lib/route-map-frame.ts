/**
 * Framing and projection for the static route map (components/map/RouteMap.tsx).
 * scripts/build-route-maps.mjs stores each tour's frame from frameFor(), and
 * the component projects with projector(), so the two cannot disagree.
 *
 * Frames are at least ~3.2° across, so the coast and the mountain ranges give
 * a route its context, padded around the route and widened to the 3:2 panel.
 */
export type LonLat = [number, number];
export interface Frame { lon0: number; lon1: number; lat0: number; lat1: number }

/** The map's SVG size in viewBox units (3:2). */
export const MAP_W = 900;
export const MAP_H = 600;
const ASPECT = MAP_W / MAP_H;

/**
 * Treks are framed close: the trail, the valleys and the peaks either side are
 * the point, so the frame is the walk plus a margin, at least ~0.16° (~15 km)
 * across, instead of the road trips' 3.2°.
 */
export const TREK_FRAMING = { minPad: 0.025, minSpan: 0.16 };

export function frameFor(points: LonLat[], { minPad = 0.6, minSpan = 3.2 }: { minPad?: number; minSpan?: number } = {}): Frame {
  let lon0 = Math.min(...points.map((p) => p[0])), lon1 = Math.max(...points.map((p) => p[0]));
  let lat0 = Math.min(...points.map((p) => p[1])), lat1 = Math.max(...points.map((p) => p[1]));
  const kx = Math.cos((((lat0 + lat1) / 2) * Math.PI) / 180);
  const padX = Math.max(minPad, (lon1 - lon0) * 0.16), padY = Math.max(minPad * 0.75, (lat1 - lat0) * 0.16);
  lon0 -= padX; lon1 += padX; lat0 -= padY; lat1 += padY;
  if (lon1 - lon0 < minSpan) { const c = (lon0 + lon1) / 2; lon0 = c - minSpan / 2; lon1 = c + minSpan / 2; }
  const spanX = (lon1 - lon0) * kx, spanY = lat1 - lat0;
  if (spanX / spanY < ASPECT) {
    const add = (spanY * ASPECT) / kx - (lon1 - lon0);
    lon0 -= add / 2; lon1 += add / 2;
  } else {
    const add = spanX / ASPECT - spanY;
    lat0 -= add / 2; lat1 += add / 2;
  }
  return { lon0, lon1, lat0, lat1 };
}

/**
 * lon/lat -> SVG x/y for a frame: equirectangular, scaled by the cosine of the
 * frame's middle latitude, fitted to MAP_W.
 */
export function projector(frame: Frame) {
  const kx = Math.cos((((frame.lat0 + frame.lat1) / 2) * Math.PI) / 180);
  const K = MAP_W / ((frame.lon1 - frame.lon0) * kx);
  return ([lon, lat]: LonLat): [number, number] => [(lon - frame.lon0) * kx * K, (frame.lat1 - lat) * K];
}

/**
 * The opening view: the whole of Morocco, from Cap Spartel to Lagouira
 * (Natural Earth, Morocco's own edition). RouteDraw starts here and zooms to
 * the tour's frame when the map scrolls into view.
 */
export const OVERVIEW: Frame = frameFor([[-17.1, 20.77], [-1.03, 35.93]]);

/**
 * The OVERVIEW rectangle in a tour frame's SVG units, widened to the panel's
 * 3:2 so the zoom never distorts. The tour map is drawn once in its own frame;
 * the zoom is a transform from this rectangle to (0, 0, MAP_W, MAP_H).
 */
export function overviewRect(frame: Frame): { x: number; y: number; w: number; h: number } {
  const px = projector(frame);
  const [x0, y0] = px([OVERVIEW.lon0, OVERVIEW.lat1]);
  const [x1, y1] = px([OVERVIEW.lon1, OVERVIEW.lat0]);
  let w = x1 - x0, h = y1 - y0;
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  if (w / h < ASPECT) w = h * ASPECT; else h = w / ASPECT;
  const r = (n: number) => Math.round(n * 10) / 10;
  return { x: r(cx - w / 2), y: r(cy - h / 2), w: r(w), h: r(h) };
}
