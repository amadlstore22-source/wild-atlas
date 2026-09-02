import type { RouteStop } from "@/components/map/TourLocationMapInner";

/**
 * SPLITTING A ROUTE INTO WHAT YOU TRAVEL AND WHAT YOU'RE DRIVEN THROUGH.
 *
 * THE BUG THIS FIXES, MEASURED ON OUR OWN TOURS
 * Every itinerary starts and ends at a hub city, but nobody walks there — it is
 * a minibus. Drawing that drive identically to the experience made the map lie,
 * and it wrecked the framing, because fitBounds was fitting the drive.
 *
 * Measured across all 33 tours that plot 2+ stops, taking the bounding box of
 * the non-hub stops as a share of the bounding box of everything:
 *
 *   erg-chegaga-3day-marrakech        0.5%   <- the desert filled 1/200th of the map
 *   agadir-to-chefchaouen-5day        2.7%
 *   chegaga-camel-trek-8day           3.9%
 *   agadir-to-fes-4day                4.6%
 *   merzouga-3day-agadir              7.8%
 *   erg-chegaga-3day-agadir           8.1%
 *   mgoun-massif-trek                18.5%
 *   toubkal-summit-sahara-5day       20.2%
 *   desert-4day-agadir               25.1%
 *
 * 14 of 33 tours were affected. On erg-chegaga-3day-marrakech the thing the
 * customer is actually buying — the dunes — rendered at half a percent of the
 * frame while a 218km drive took the rest.
 *
 * WHY `origin` AND NOT A LIST OF CITY NAMES
 * The obvious implementation is a TRANSFER_HUBS name set. Tested against the
 * real data, it mislabels two ways:
 *
 *   - desert-4day-agadir stops overnight IN Ouarzazate. A name set containing
 *     "Ouarzazate" greys out a genuine stop on the itinerary.
 *   - agadir-to-fes-4day passes THROUGH Marrakech as a real destination.
 *
 * `origin` is the field that actually encodes "this is where the tour departs
 * from", so a leg is a transfer when it connects to the origin city — not when
 * it happens to mention a city name that is elsewhere a real stop.
 */

/** Hub coordinates, matching the CITY table in __tests__/lib/map-accuracy.test.ts. */
const ORIGIN_COORDS: Record<string, { lat: number; lng: number }> = {
  marrakech: { lat: 31.6295, lng: -7.9811 },
  agadir: { lat: 30.4278, lng: -9.5981 },
  casablanca: { lat: 33.5731, lng: -7.5898 },
};

/**
 * Within this of the origin city, a stop IS the hub.
 *
 * 25km rather than a name match: "Marrakech", "Marrakech Medina" and an
 * airport pickup are all the same hub for framing purposes, and
 * morocco-highlights-toubkal-sahara-8day ends with exactly that pair. A
 * coordinate test catches all of them and cannot be broken by a rename.
 */
const HUB_RADIUS_KM = 25;

/** Rough km. Same approximation the existing map-accuracy test uses. */
export function km(aLat: number, aLng: number, bLat: number, bLng: number): number {
  return Math.hypot((aLat - bLat) * 111, (aLng - bLng) * 95);
}

export function isHubStop(stop: { lat: number; lng: number }, origin: string): boolean {
  const hub = ORIGIN_COORDS[origin];
  if (!hub) return false;
  return km(stop.lat, stop.lng, hub.lat, hub.lng) <= HUB_RADIUS_KM;
}

export interface Leg {
  from: RouteStop;
  to: RouteStop;
  /** True when this leg only exists to move the group to or from the hub city. */
  transfer: boolean;
}

/**
 * Pair consecutive stops into legs, marking the hub connections as transfers.
 *
 * THE FALLBACK IS LOAD-BEARING, NOT DEFENSIVE PADDING.
 * On the city-to-city cultural tours every single leg touches a hub:
 * agadir-to-fes-4day is Marrakech → Midelt → Fes → Fes, and
 * marrakech-imperial-cities-5day returns to Marrakech at the end. For those the
 * drive IS the product being sold. If we greyed every leg, the whole route would
 * render as a dashed grey line and — worse — `activeBounds` would have nothing
 * to fit and the map would fall back to a zoom-8 country view.
 *
 * So: a tour whose legs are ALL transfers has no transfers. The distinction
 * only means something when there is something else to contrast against.
 */
export function routeLegs(stops: RouteStop[], origin: string): Leg[] {
  if (stops.length < 2) return [];

  const legs: Leg[] = stops.slice(0, -1).map((from, i) => {
    const to = stops[i + 1];
    return {
      from,
      to,
      transfer: isHubStop(from, origin) || isHubStop(to, origin),
    };
  });

  // Every leg a transfer means the drive is the tour. Draw it all solid.
  if (legs.every((l) => l.transfer)) {
    return legs.map((l) => ({ ...l, transfer: false }));
  }

  return legs;
}

/** True when this tour has at least one drawn transfer leg — drives the map key. */
export function hasTransferLeg(stops: RouteStop[], origin: string): boolean {
  return routeLegs(stops, origin).some((l) => l.transfer);
}

/**
 * The stops worth framing on: everything except hub cities we only drive to.
 *
 * Returned in route order. Falls back to the full list when nothing survives,
 * for the same reason routeLegs does.
 */
export function activeStops(stops: RouteStop[], origin: string): RouteStop[] {
  const legs = routeLegs(stops, origin);
  if (!legs.some((l) => l.transfer)) return stops;

  const keep = new Set<RouteStop>();
  for (const leg of legs) {
    if (!leg.transfer) {
      keep.add(leg.from);
      keep.add(leg.to);
    }
  }

  const kept = stops.filter((s) => keep.has(s));
  return kept.length >= 2 ? kept : stops;
}

/**
 * Split the precomputed road geometry into transfer and active runs.
 *
 * The route JSON is one flat polyline with no leg boundaries, so we find each
 * stop's nearest vertex on it and cut there. Nearest-vertex rather than exact
 * match because the stop coordinate is the gazetteer point and the line is
 * OSRM's road-snapped output — they are never byte-identical, and on Erg
 * Chegaga they are 17.6 km apart.
 */
export function splitGeometry(
  geometry: [number, number][],
  stops: RouteStop[],
  origin: string,
): { coords: [number, number][]; transfer: boolean }[] {
  const legs = routeLegs(stops, origin);
  if (!legs.length || geometry.length < 2) return [];

  const nearestIndex = (s: RouteStop) => {
    let best = 0;
    let bestD = Infinity;
    geometry.forEach(([la, ln], i) => {
      const d = km(s.lat, s.lng, la, ln);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best;
  };

  const cuts = stops.map(nearestIndex);

  const out: { coords: [number, number][]; transfer: boolean }[] = [];
  legs.forEach((leg, i) => {
    const a = cuts[i];
    const b = cuts[i + 1];
    // A leg whose endpoints resolve to the same or a reversed vertex carries no
    // drawable geometry — skip rather than emit a zero-length or backwards run.
    if (b <= a) return;
    out.push({ coords: geometry.slice(a, b + 1), transfer: leg.transfer });
  });

  return out;
}

/**
 * OFF-ROAD LEGS: where the road stops and the 4x4 starts.
 *
 * Erg Chegaga has no road to it. OSRM routes to the nearest routable way and
 * stops, leaving the pin 17.6 km out in blank sand with nothing connecting it —
 * which reads as a broken map rather than as a real desert crossing.
 *
 * Measured pin-to-line distances across all 20 tours with prebuilt geometry:
 *   17,619 m  Erg Chegaga            (sahara-2day-agadir, both chegaga 3-days)
 *    6,501 m  Toubkal Refuge         (toubkal-summit-sahara-5day)
 *    5,897 m  Jbel Toubkal Summit    (toubkal-summit-sahara-5day)
 *    4,406 m  Dades Gorges
 *    4,100 m  Erg Chebbi, Merzouga   (5 tours)
 * 15 of 69 pins sat more than 250 m off their own line.
 *
 * We do NOT snap the pin to the line. Moving Erg Chegaga onto the tarmac would
 * make the map tidier and place it 17.6 km from where it actually is. Instead we
 * draw the gap as a dashed connector: the pin stays truthful, and the dashes say
 * "no road here — this is the 4x4 and camel leg", which is a selling point
 * rather than an error.
 */
export const OFF_ROAD_MIN_KM = 1.5;

export function offRoadConnectors(
  geometry: [number, number][],
  stops: RouteStop[],
): { coords: [number, number][]; km: number; name: string }[] {
  if (geometry.length < 2) return [];

  const out: { coords: [number, number][]; km: number; name: string }[] = [];
  for (const s of stops) {
    let best: [number, number] = geometry[0];
    let bestD = Infinity;
    for (const [la, ln] of geometry) {
      const d = km(s.lat, s.lng, la, ln);
      if (d < bestD) {
        bestD = d;
        best = [la, ln];
      }
    }
    if (bestD >= OFF_ROAD_MIN_KM) {
      out.push({
        coords: [
          [best[1], best[0]],
          [s.lng, s.lat],
        ],
        km: bestD,
        name: s.name,
      });
    }
  }
  return out;
}
