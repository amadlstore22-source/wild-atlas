import { describe, expect, it } from "vitest";
import { TOURS } from "@/lib/tours";

/**
 * Guards the two defects that made the tour maps read as inaccurate.
 *
 * Neither was a rendering bug. `meetingPoint` renders under the heading "Where
 * You'll Meet" with a pin, and on 18 multi-day tours it had been filled in with
 * the tour's DESTINATION -- sahara-3day-marrakech told Marrakech customers to
 * meet in Merzouga, 550 km away. Separately, 21 coordinate values were stored
 * at 0-1 decimal places, Fes worst at "34.033, -5".
 */

const CITY: Record<string, { lat: number; lng: number }> = {
  marrakech: { lat: 31.6295, lng: -7.9811 },
  agadir: { lat: 30.4278, lng: -9.5981 },
};

/** Rough km between two points. Good enough at this scale. */
function km(aLat: number, aLng: number, bLat: number, bLng: number) {
  return Math.hypot((aLat - bLat) * 111, (aLng - bLng) * 95);
}

/**
 * Treks that genuinely begin at a trailhead rather than with a city pickup.
 * For these the meeting point is correctly far from the origin city.
 */
const TRAILHEAD_STARTS = new Set([
  "mgoun-massif-trek",
  "anti-atlas-trekking-agadir",
  "high-atlas-grand-traverse-15day",
]);

describe("tour meeting points", () => {
  it("puts multi-day city departures in their origin city, not at the destination", () => {
    const wrong: string[] = [];

    for (const tour of TOURS) {
      const city = CITY[tour.origin as string];
      if (!city) continue;
      if (TRAILHEAD_STARTS.has(tour.slug)) continue;
      if (!/\bdays?\b/i.test(tour.duration)) continue;
      if (!tour.duration.includes("days")) continue;

      const d = km(tour.meetingPoint.lat, tour.meetingPoint.lng, city.lat, city.lng);
      if (d > 60) {
        wrong.push(`${tour.slug}: meets ${d.toFixed(0)} km from ${tour.origin} (${tour.meetingPoint.name})`);
      }
    }

    expect(wrong, `Meeting points far from their departure city:\n  ${wrong.join("\n  ")}`).toEqual([]);
  });

  it("never stores a coordinate with fewer than two decimal places", () => {
    // One decimal place is ~5.5 km of error, enough to put a trailhead on the
    // wrong side of a ridge.
    //
    // Two documented exceptions, both deep-desert features with no published
    // coordinate precise enough to improve on: Oulilimt, a High Atlas
    // shepherds' settlement, and Oued Naam, a wadi in the Chegaga sand sea.
    // Inventing a position for either would replace a roughly right pin with a
    // confidently wrong one, which is worse.
    const UNSOURCEABLE = ["Oulilimt", "Oued Naam"];
    const vague: string[] = [];

    for (const tour of TOURS) {
      const points = [
        { ...tour.meetingPoint, label: `${tour.slug} meetingPoint` },
        ...(tour.itinerary ?? [])
          .filter((d) => d.stop)
          .map((d) => ({ ...d.stop!, label: `${tour.slug} day ${d.day} ${d.stop!.name}` })),
      ];

      for (const p of points) {
        if (UNSOURCEABLE.some((u) => p.label.includes(u))) continue;
        const dp = (v: number) => (String(v).split(".")[1] ?? "").length;
        if (Math.min(dp(p.lat), dp(p.lng)) < 2) {
          vague.push(`${p.label}: ${p.lat}, ${p.lng}`);
        }
      }
    }

    expect(vague, `Coordinates too imprecise to pin:\n  ${vague.join("\n  ")}`).toEqual([]);
  });

  it("stores Fes at its real position, not a longitude of exactly -5", () => {
    // "34.033, -5" appeared in six tours and sat ~5 km from the city centre.
    const fes = TOURS.flatMap((t) =>
      (t.itinerary ?? []).filter((d) => d.stop?.name === "Fes").map((d) => d.stop!)
    );
    expect(fes.length).toBeGreaterThan(0);
    for (const s of fes) {
      expect(km(s.lat, s.lng, 34.0433, -5.0033)).toBeLessThan(3);
    }
  });
});
