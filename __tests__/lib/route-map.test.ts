import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { TOURS } from "@/lib/tours";
import { existsSync } from "node:fs";
import MAPS from "@/lib/route-maps.json";
import TREKS from "@/lib/trek-maps.json";

/**
 * On 2026-10-06 every tour page except treks switched from the satellite map
 * to a static route map (components/map/RouteMap.tsx), drawn from data that
 * scripts/build-route-maps.mjs generates. On 2026-10-12 treks moved to it too,
 * in a trek version (relief, real trails, peaks and passes) built by
 * scripts/build-trek-maps.mjs into lib/trek-maps.json. Nothing
 * in the build notices when the data goes stale or wrong, and each of these was
 * a real defect while it was being built:
 *
 *   - a tour added, or its stops changed, without re-running the script: the
 *     page shows no map, or a trip the itinerary no longer describes;
 *   - the route starting at the first overnight stop instead of the meeting
 *     point (lib/tour-routes.json, the satellite map's data, does exactly
 *     that), which erases the first day's drive out of Marrakech or Agadir;
 *   - shared day trips drawn one way only, so the map said 160 km for Ouzoud
 *     where the private trip said 320 km;
 *   - five tours per translation carrying fewer stops in their translated
 *     itinerary, so translated pages drew a different, incomplete trip;
 *   - the OpenStreetMap credit missing from a locale (ODbL requires it).
 */
const ROOT = join(__dirname, "..", "..");
type LonLat = [number, number];
const maps = MAPS as unknown as Record<string, { km: number; legs: { mode: string; coords: LonLat[] }[] }>;
type Frame = { lon0: number; lon1: number; lat0: number; lat1: number };
const treks = TREKS as unknown as Record<string, { frame: Frame; km: number; legs: { mode: string; coords: LonLat[] }[]; relief: string }>;
const kmBetween = ([lon1, lat1]: LonLat, [lon2, lat2]: LonLat) => {
  const t = Math.PI / 180;
  const h = Math.sin(((lat2 - lat1) * t) / 2) ** 2 + Math.cos(lat1 * t) * Math.cos(lat2 * t) * Math.sin(((lon2 - lon1) * t) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};
const FIX = "Re-run node scripts/build-route-maps.mjs";
const page = () => readFileSync(join(ROOT, "app", "[lang]", "tours", "[slug]", "page.tsx"), "utf8");

describe("route map", () => {
  it("exists for every tour, once", () => {
    const missing = TOURS.filter((t) => !maps[t.slug] && !treks[t.slug]).map((t) => t.slug);
    const both = TOURS.filter((t) => maps[t.slug] && treks[t.slug]).map((t) => t.slug);
    expect(missing, `${FIX} (or build-trek-maps.mjs for a trek). No map data for:\n  ${missing.join("\n  ")}`).toEqual([]);
    expect(both, "A tour is either a road map or a trek map; it is in both JSON files").toEqual([]);
    expect(page(), "the page must use the route map wherever there is data").toMatch(/\{hasRouteMap\(tour\.slug\) \?/);
  });

  /**
   * Trek maps were checked by eye against OpenStreetMap when built, and that
   * check found the tour data's own stop positions 1-12 km off for 11 stops
   * (Tizi Oussem, Amsouzart, Bou Tharar...), which drew dots beside the trail
   * instead of on it. Where a trek's route is walked on mapped trails end to
   * end, every stop in view must sit on it.
   */
  it("treks: relief image present, and stops on the walked route", () => {
    const problems: string[] = [];
    for (const [slug, m] of Object.entries(treks)) {
      if (!existsSync(join(ROOT, "public", m.relief))) problems.push(`${slug}: missing ${m.relief}`);
      const t = TOURS.find((x) => x.slug === slug);
      if (!t) { problems.push(`${slug}: no such tour`); continue; }
      if (!m.legs.length || m.legs.some((l) => l.mode !== "trail")) continue;
      const pts = m.legs.flatMap((l) => l.coords);
      const inFrame = (s: { lat: number; lng: number }) => s.lng >= m.frame.lon0 && s.lng <= m.frame.lon1 && s.lat >= m.frame.lat0 && s.lat <= m.frame.lat1;
      for (const s of t.itinerary.flatMap((d) => [...(d.extraStops ?? []), ...(d.stop ? [d.stop] : [])]).filter(inFrame)) {
        const near = Math.min(...pts.map((c) => kmBetween(c, [s.lng, s.lat])));
        if (near > 1) problems.push(`${slug}: ${s.name} is ${near.toFixed(1)} km from the route`);
      }
    }
    expect(problems, `Re-run node scripts/build-trek-maps.mjs, or move the stop in lib/tours.ts (all locales) to its OSM position:\n  ${problems.join("\n  ")}`).toEqual([]);
  });

  it("passes every stop and starts where the tour starts", () => {
    const problems: string[] = [];
    for (const t of TOURS) {
      const m = maps[t.slug];
      if (!m || !m.legs.length) continue;
      const pts = m.legs.flatMap((l) => l.coords);
      const stops = t.itinerary.flatMap((d) => [...(d.extraStops ?? []), ...(d.stop ? [d.stop] : [])]);
      if (stops.length && kmBetween(pts[0], [t.meetingPoint.lng, t.meetingPoint.lat]) > 15)
        problems.push(`${t.slug}: route starts ${Math.round(kmBetween(pts[0], [t.meetingPoint.lng, t.meetingPoint.lat]))} km from the meeting point`);
      for (const s of stops) {
        const near = Math.min(...pts.map((c) => kmBetween(c, [s.lng, s.lat])));
        // 30 km: the Erg Chegaga camp is ~22 km of open desert from the last road.
        if (near > 30) problems.push(`${t.slug}: route passes ${Math.round(near)} km from ${s.name}`);
      }
    }
    expect(problems, `${FIX}:\n  ${problems.join("\n  ")}`).toEqual([]);
  });

  it("brings day trips back to where they started", () => {
    const oneWay = TOURS.filter((t) => t.category === "day-tours").filter((t) => {
      const pts = (maps[t.slug]?.legs ?? []).flatMap((l) => l.coords);
      return pts.length > 1 && kmBetween(pts[0], pts[pts.length - 1]) > 10;
    }).map((t) => t.slug);
    expect(oneWay, `${FIX}. These day trips are drawn (and counted) one way:\n  ${oneWay.join("\n  ")}`).toEqual([]);
  });

  it("takes stop positions from the English tour, and credits OpenStreetMap in every locale", () => {
    expect(page(), "routeMapPlaces must read stop positions from the English TOURS entry").toMatch(/const baseStops = stopsOf\(base\)/);
    const missing: string[] = [];
    for (const l of ["en", "fr", "es", "de", "it", "ar"]) {
      const d = JSON.parse(readFileSync(join(ROOT, "dictionaries", `${l}.json`), "utf8"));
      if (!d.tourDetail?.routeMapCredit?.includes("OpenStreetMap")) missing.push(`${l}: tourDetail.routeMapCredit`);
      if (!d.tourDetail?.routeMapKm?.includes("{km}")) missing.push(`${l}: tourDetail.routeMapKm needs {km}`);
      for (const k of ["routeMapFoot", "routeMapGoogle", "routeMapAria"]) if (!d.tourDetail?.[k]) missing.push(`${l}: tourDetail.${k}`);
      if (!d.tourDetail?.routeMapTrekCredit?.includes("OpenStreetMap") || !d.tourDetail?.routeMapTrekCredit?.includes("Mapterhorn")) missing.push(`${l}: tourDetail.routeMapTrekCredit must credit OpenStreetMap and Mapterhorn`);
      if (!d.tourDetail?.routeMapKmFoot?.includes("{km}")) missing.push(`${l}: tourDetail.routeMapKmFoot needs {km}`);
    }
    expect(missing).toEqual([]);
  });
});
