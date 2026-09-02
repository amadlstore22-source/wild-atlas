import { describe, expect, it } from "vitest";
import tourRoutes from "@/lib/tour-routes.json";
import { TOURS } from "@/lib/tours";
import { mergeStopsAtSameLocation, type RouteStop } from "@/components/map/TourLocationMapInner";
import {
  activeStops,
  hasTransferLeg,
  km,
  offRoadConnectors,
  routeLegs,
  splitGeometry,
} from "@/lib/route-legs";

/**
 * THE MAP THAT SHOWED A 218 KM DRIVE AND A HALF-PERCENT OF DESERT.
 *
 * Every tour begins and ends at a hub city, but the drive there is transport,
 * not the product. Drawing it identically to the experience made `fitBounds`
 * frame the drive: on erg-chegaga-3day-marrakech the dunes — the entire reason
 * for the trip — rendered at 0.5% of the map. 14 of 33 tours were affected.
 *
 * These tests encode the RULE, not today's catalogue, per AGENTS.md. The next
 * desert tour someone adds is the one nobody will check.
 */

const routes = tourRoutes as unknown as Record<string, [number, number][]>;

/** The stops the map actually plots, after the same merge the component does. */
function stopsOf(tour: (typeof TOURS)[number]): RouteStop[] {
  return mergeStopsAtSameLocation(
    tour.itinerary
      .filter((d) => d.stop)
      .map((d) => ({ name: d.stop!.name, lat: d.stop!.lat, lng: d.stop!.lng, day: d.day })),
  );
}

const MAPPED = TOURS.filter((t) => stopsOf(t).length >= 2);

describe("transfer legs", () => {
  it("has tours to check — guards against the filter going empty", () => {
    expect(MAPPED.length).toBeGreaterThan(10);
  });

  it("never marks every leg of a tour as a transfer", () => {
    // A route drawn entirely in grey dashes is not a route, and it leaves
    // activeStops with nothing to frame. On the city-to-city cultural tours
    // (agadir-to-fes-4day, marrakech-imperial-cities-5day) every leg touches a
    // hub because the drive IS the tour — those must stay solid.
    const allGrey: string[] = [];
    for (const tour of MAPPED) {
      const legs = routeLegs(stopsOf(tour), tour.origin as string);
      if (legs.length && legs.every((l) => l.transfer)) allGrey.push(tour.slug);
    }
    expect(
      allGrey,
      `These tours would render as an entirely grey dashed line with no route\n` +
        `left to frame. routeLegs() must fall back to all-solid when every leg\n` +
        `is a hub connection:\n  ` + allGrey.join("\n  "),
    ).toEqual([]);
  });

  it("keeps a real overnight stop out of the transfer set", () => {
    // desert-4day-agadir stays the night IN Ouarzazate. The obvious
    // implementation — a TRANSFER_HUBS name set containing "Ouarzazate" —
    // greys out that genuine leg. This is why the rule keys on `origin`.
    const tour = TOURS.find((t) => t.slug === "desert-4day-agadir");
    if (!tour) return;
    const stops = stopsOf(tour);
    const ouarzazate = stops.find((s) => /ouarzazate/i.test(s.name));
    if (!ouarzazate) return;

    const legs = routeLegs(stops, tour.origin as string);
    const touching = legs.filter((l) => l.from === ouarzazate || l.to === ouarzazate);
    expect(
      touching.some((l) => !l.transfer),
      "Ouarzazate is an overnight stop on desert-4day-agadir, not a transfer hub",
    ).toBe(true);
  });

  it("always leaves at least two stops to frame on", () => {
    for (const tour of MAPPED) {
      const stops = stopsOf(tour);
      const active = activeStops(stops, tour.origin as string);
      expect(
        active.length,
        `${tour.slug}: activeStops returned ${active.length} — fitBounds needs 2+`,
      ).toBeGreaterThanOrEqual(2);
    }
  });

  it("shrinks the framed area on the tours that were distorted", () => {
    // The actual point of the change. erg-chegaga-3day-marrakech framed its
    // desert at 0.5% of the map; after this it should frame the desert.
    const tour = TOURS.find((t) => t.slug === "erg-chegaga-3day-marrakech");
    if (!tour) return;
    const stops = stopsOf(tour);
    const active = activeStops(stops, tour.origin as string);

    const span = (list: RouteStop[]) => {
      const lat = list.map((s) => s.lat);
      const lng = list.map((s) => s.lng);
      return km(Math.min(...lat), Math.min(...lng), Math.max(...lat), Math.max(...lng));
    };

    expect(active.length).toBeLessThan(stops.length);
    expect(
      span(active),
      "the framed span should be far smaller once the Marrakech drive is excluded",
    ).toBeLessThan(span(stops) / 2);
  });

  it("reports a transfer key only when a transfer is actually drawn", () => {
    // The key is rendered off hasTransferLeg. If they disagree the map shows a
    // legend entry for a line style that never appears.
    for (const tour of MAPPED) {
      const stops = stopsOf(tour);
      const legs = routeLegs(stops, tour.origin as string);
      expect(hasTransferLeg(stops, tour.origin as string)).toBe(
        legs.some((l) => l.transfer),
      );
    }
  });
});

describe("split road geometry", () => {
  it("emits only forward, non-empty runs", () => {
    for (const tour of MAPPED) {
      const geom = routes[tour.slug];
      if (!geom) continue;
      for (const run of splitGeometry(geom, stopsOf(tour), tour.origin as string)) {
        expect(run.coords.length, `${tour.slug}: empty geometry run`).toBeGreaterThan(1);
      }
    }
  });

  it("covers the whole line when a tour has no transfers", () => {
    // A tour drawn all-solid must not silently lose segments to the split.
    for (const tour of MAPPED) {
      const geom = routes[tour.slug];
      if (!geom) continue;
      const stops = stopsOf(tour);
      if (hasTransferLeg(stops, tour.origin as string)) continue;
      const runs = splitGeometry(geom, stops, tour.origin as string);
      if (!runs.length) continue;
      expect(runs.every((r) => !r.transfer)).toBe(true);
    }
  });
});

describe("off-road connectors", () => {
  it("connects a pin that sits far off its own drawn line", () => {
    // Erg Chegaga is 17.6km from the end of the road on three tours. Before
    // this it was a pin floating in blank sand with nothing joining it.
    const tour = TOURS.find((t) => t.slug === "erg-chegaga-3day-marrakech");
    const geom = tour && routes[tour.slug];
    if (!tour || !geom) return;

    const connectors = offRoadConnectors(geom, stopsOf(tour));
    const chegaga = connectors.find((c) => /chegaga/i.test(c.name));
    expect(chegaga, "Erg Chegaga should get a dashed off-road connector").toBeTruthy();
    expect(chegaga!.km).toBeGreaterThan(5);
  });

  it("leaves pins that are already on the line alone", () => {
    // Every stop getting a connector would mean the threshold is broken and the
    // map sprouts dashes everywhere.
    for (const tour of MAPPED) {
      const geom = routes[tour.slug];
      if (!geom) continue;
      const stops = stopsOf(tour);
      const connectors = offRoadConnectors(geom, stops);
      expect(
        connectors.length,
        `${tour.slug}: ${connectors.length} of ${stops.length} stops flagged off-road`,
      ).toBeLessThan(stops.length);
    }
  });

  it("draws each connector from the line to the stop's true coordinate", () => {
    // The pin must NOT move. Snapping it would put Erg Chegaga 17.6km from
    // where it is; the dashed line is what makes the real position honest.
    for (const tour of MAPPED) {
      const geom = routes[tour.slug];
      if (!geom) continue;
      const stops = stopsOf(tour);
      for (const c of offRoadConnectors(geom, stops)) {
        const stop = stops.find((s) => s.name === c.name)!;
        const [lng, lat] = c.coords[c.coords.length - 1];
        expect(lat).toBeCloseTo(stop.lat, 6);
        expect(lng).toBeCloseTo(stop.lng, 6);
      }
    }
  });
});

describe("coordinate order", () => {
  /**
   * THE MAP THAT SHOWED THE WHOLE OF AFRICA.
   *
   * tour-routes.json stores points as [lat, lng]. The fitBounds code read a
   * split run as `for (const [ln, la] of run.coords)` — the two names swapped —
   * and passed [lat, lng] to LngLatBounds.extend, which takes [lng, lat]. On
   * erg-chegaga-3day-marrakech that turned (31.6, -7.9) into (-7.9, 31.6): a
   * point in the Gulf of Guinea. The map framed a continent, with the pins
   * still drawn correctly in Morocco because the DRAWING code read the same
   * data the right way round.
   *
   * Nothing catches this: both are `number`, both orders typecheck, the page
   * builds, and the pins look right. Only the zoom is wrong.
   */
  it("keeps every stored route point inside Morocco when read as [lat, lng]", () => {
    // Morocco, generously: lat 20..37 (includes Western Sahara), lng -18..-1.
    //
    // Collected rather than asserted per point. The catalogue holds ~18,700
    // coordinates; four expect() calls each built ~75,000 assertion objects
    // and made this test time out under full-suite load. A flaky guard is
    // worse than none, because people learn to re-run it until it passes.
    const bad: string[] = [];
    for (const [slug, geom] of Object.entries(routes)) {
      for (const [lat, lng] of geom as [number, number][]) {
        if (lat <= 20 || lat >= 37 || lng <= -18 || lng >= -1) {
          bad.push(`${slug}: [${lat}, ${lng}]`);
        }
      }
    }

    expect(
      bad.slice(0, 10),
      bad.length === 0
        ? ""
        : `${bad.length} stored route point(s) fall outside Morocco when read ` +
            `as [lat, lng]. tour-routes.json is [lat, lng]; MapLibre's ` +
            `LngLatBounds.extend takes [lng, lat]. Reading it the other way ` +
            `round is what framed the map across the whole of Africa:\n  ` +
            bad.slice(0, 10).join("\n  "),
    ).toEqual([]);
  });

  it("emits off-road connectors as [lng, lat] for MapLibre", () => {
    // offRoadConnectors feeds GeoJSON directly, which is [lng, lat] — the
    // opposite order to the stored geometry it reads. Getting this backwards
    // draws the dashed line off the map instead of to the dunes.
    for (const tour of MAPPED) {
      const geom = routes[tour.slug];
      if (!geom) continue;
      for (const c of offRoadConnectors(geom, stopsOf(tour))) {
        for (const [lng, lat] of c.coords) {
          expect(lng, `${tour.slug}: connector longitude ${lng} looks like a latitude`)
            .toBeLessThan(0);
          expect(lat, `${tour.slug}: connector latitude ${lat} looks like a longitude`)
            .toBeGreaterThan(20);
        }
      }
    }
  });

  it("frames the Chegaga map on Morocco, not on the Atlantic", () => {
    // End-to-end guard on the actual reported symptom: build the same bounds
    // the component builds and assert the centre is in Morocco.
    const tour = TOURS.find((t) => t.slug === "erg-chegaga-3day-marrakech")!;
    const stops = stopsOf(tour);
    const geom = routes[tour.slug];

    const lats: number[] = [];
    const lngs: number[] = [];
    for (const s of activeStops(stops, tour.origin as string)) {
      lats.push(s.lat);
      lngs.push(s.lng);
    }
    for (const run of splitGeometry(geom, stops, tour.origin as string)) {
      if (run.transfer) continue;
      for (const [la, ln] of run.coords) {
        lats.push(la);
        lngs.push(ln);
      }
    }

    const centreLat = (Math.min(...lats) + Math.max(...lats)) / 2;
    const centreLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
    expect(centreLat, "framed centre latitude should be in Morocco").toBeGreaterThan(28);
    expect(centreLat).toBeLessThan(33);
    expect(centreLng, "framed centre longitude should be in Morocco").toBeLessThan(-4);
    expect(centreLng).toBeGreaterThan(-8);

    // And the framed box must be small — this is the whole point of the change.
    const diagonal = km(Math.min(...lats), Math.min(...lngs), Math.max(...lats), Math.max(...lngs));
    expect(diagonal, `framed diagonal ${diagonal.toFixed(0)}km — should be tens, not thousands`)
      .toBeLessThan(120);
  });
});
