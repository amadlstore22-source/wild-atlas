import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import RouteMap from "@/components/map/RouteMap";
import MAPS from "@/lib/route-maps.json";
import { TOURS } from "@/lib/tours";

/**
 * Every stop on a road map is named. Labels are placed greedily, and a stop
 * whose every slot is taken keeps its dot and silently loses its name. On
 * 2026-10-16 the Erg Chebbi camp, the whole point of the Toubkal-and-Sahara
 * tour, rendered as an anonymous dot at the map's east edge: its left-hand
 * slots collided with the long "Jbel Toubkal Summit" and "Aït Ben Haddou"
 * labels, and the slots above and below ran off the frame. The page built and
 * looked like a map. Only a dot sitting within a few km of another named
 * place (two camps in one valley) may go unnamed: there is no room for both.
 */
const maps = MAPS as unknown as Record<string, { legs: unknown[] }>;
const REGIONS = { atlantic: "Atlantic Ocean", mediterranean: "Mediterranean Sea", highAtlas: "High Atlas", middleAtlas: "Middle Atlas", antiAtlas: "Anti-Atlas", sahara: "Sahara" };
const kmBetween = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) =>
  Math.hypot(a.lat - b.lat, (a.lng - b.lng) * Math.cos((a.lat * Math.PI) / 180)) * 111;

describe("route map labels", () => {
  it("names every stop that has room of its own", () => {
    const problems: string[] = [];
    for (const t of TOURS) {
      if (!maps[t.slug]?.legs.length) continue;
      const stops = t.itinerary.flatMap((d) => [...(d.extraStops ?? []), ...(d.stop ? [d.stop] : [])]);
      const start = { name: t.meetingPoint.name.split(/,| — /)[0], lat: t.meetingPoint.lat, lng: t.meetingPoint.lng };
      const html = renderToStaticMarkup(
        <RouteMap slug={t.slug} start={start} stops={stops} ariaLabel="" kmLabel="{km}" footLabel="" offRoadLabel=""
          credit="" regions={REGIONS} numberLocale="en" />,
      );
      // Unnamed stops render as <g class="stop"><circle/><title>name</title></g>.
      const unnamed = [...html.matchAll(/<g class="stop"><circle[^>]*><\/circle><title>([^<]*)<\/title><\/g>/g)].map((m) => m[1]);
      const all = [start, ...stops];
      for (const name of unnamed) {
        const s = all.find((x) => x.name === name)!;
        const crowded = all.some((o) => o !== s && o.name !== name && kmBetween(o, s) < 8);
        if (!crowded) problems.push(`${t.slug}: "${name}" has a dot but no name`);
      }
    }
    expect(problems, `Label placement in components/map/RouteMap.tsx found no slot for:\n  ${problems.join("\n  ")}`).toEqual([]);
  });
});
