import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { TOURS } from "@/lib/tours";
import MAPS from "@/lib/route-maps.json";

/**
 * On 2026-10-06 every tour page except treks switched from the satellite map
 * to a static route map (components/map/RouteMap.tsx), drawn from data that
 * scripts/build-route-maps.mjs generates. Treks keep the satellite map with 3D
 * terrain (the owner saw a contour-line trek version and rejected it). Nothing
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
const kmBetween = ([lon1, lat1]: LonLat, [lon2, lat2]: LonLat) => {
  const t = Math.PI / 180;
  const h = Math.sin(((lat2 - lat1) * t) / 2) ** 2 + Math.cos(lat1 * t) * Math.cos(lat2 * t) * Math.sin(((lon2 - lon1) * t) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};
const FIX = "Re-run node scripts/build-route-maps.mjs";
const page = () => readFileSync(join(ROOT, "app", "[lang]", "tours", "[slug]", "page.tsx"), "utf8");

describe("route map", () => {
  it("exists for every tour except treks, which keep the satellite map", () => {
    const missing = TOURS.filter((t) => t.category !== "trekking" && !maps[t.slug]).map((t) => t.slug);
    const treks = TOURS.filter((t) => t.category === "trekking" && maps[t.slug]).map((t) => t.slug);
    expect(missing, `${FIX}. No map data for:\n  ${missing.join("\n  ")}`).toEqual([]);
    expect(treks, "Treks keep the satellite map; they must not be in lib/route-maps.json").toEqual([]);
    expect(page(), "the page must pick the satellite map for treks").toMatch(/tour\.category !== "trekking" && hasRouteMap\(tour\.slug\) \?/);
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
    }
    expect(missing).toEqual([]);
  });
});
