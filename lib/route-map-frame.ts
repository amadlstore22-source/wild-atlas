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

export function frameFor(points: LonLat[]): Frame {
  let lon0 = Math.min(...points.map((p) => p[0])), lon1 = Math.max(...points.map((p) => p[0]));
  let lat0 = Math.min(...points.map((p) => p[1])), lat1 = Math.max(...points.map((p) => p[1]));
  const kx = Math.cos((((lat0 + lat1) / 2) * Math.PI) / 180);
  const padX = Math.max(0.6, (lon1 - lon0) * 0.16), padY = Math.max(0.45, (lat1 - lat0) * 0.16);
  lon0 -= padX; lon1 += padX; lat0 -= padY; lat1 += padY;
  const minSpan = 3.2;
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
