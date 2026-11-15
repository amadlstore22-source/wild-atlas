import { describe, expect, it } from "vitest";
import { TOURS } from "@/lib/tours";

/**
 * A tour page must not contradict itself about dinners or rooms.
 *
 * Found 2026-11-15 on the 5-day imperial cities tour, live in six languages.
 * The day plan marked dinner on days 1, 2 and 4. The "not included" list, and
 * the tour's own FAQ, said "Lunches and dinners". The inclusions said "4
 * nights riad accommodation" while every night of the day plan said "Hotel".
 * A buyer comparing the three could not tell what the price covered, and this
 * is the page for a trip that costs EUR 1,150 for two.
 *
 * The owner settled it the same day: dinner is included, and the room is a
 * riad or a hotel depending on availability. The 5-day tour now says so.
 *
 * Nothing caught it: every string was valid, the page built, and the three
 * statements sit in three different sections of the page. This test reads the
 * whole catalogue, because the same sentences were copied between tours.
 *
 * PENDING_OWNER lists five sister tours that still carry the contradiction.
 * The owner's answer was given for the 5-day tour only, so they wait for the
 * same confirmation rather than being changed on a guess. When one is fixed,
 * the last test below fails until its slug is removed from the list.
 */

const PENDING_OWNER = new Set([
  "marrakech-to-fes-3day",
  "marrakech-to-chefchaouen-4day",
  "agadir-to-fes-4day",
  "agadir-to-chefchaouen-5day",
  "agadir-imperial-cities-6day",
]);

function contradictions(tour: (typeof TOURS)[number]): string[] {
  const out: string[] = [];
  const dinnerDays = tour.itinerary.filter((d) => /\bD\b/.test(d.meals ?? "")).length;
  // "Dinner in Fes on day 3" names its exception; "Lunches and dinners" does not.
  const blanketDinner = tour.excludes.some((e) => /dinner/i.test(e) && !/dinners? (in|on|at)\b/i.test(e));
  if (blanketDinner && dinnerDays > 0) {
    out.push(`"not included" lists dinners, but the day plan marks dinner on ${dinnerDays} day(s)`);
  }
  const includes = tour.includes.join(" ");
  const hotelNights = tour.itinerary.filter((d) => d.stay === "Hotel").length;
  if (/riad/i.test(includes) && !/hotel/i.test(includes) && hotelNights > 0) {
    out.push(`the inclusions promise a riad, but ${hotelNights} night(s) of the day plan say "Hotel"`);
  }
  return out;
}

describe("a tour does not contradict itself about dinners or rooms", () => {
  it("the day plan agrees with what is and is not included", () => {
    const bad = TOURS.filter((t) => !PENDING_OWNER.has(t.slug)).flatMap((t) =>
      contradictions(t).map((c) => `${t.slug}: ${c}`),
    );
    expect(
      bad,
      `These tours say two different things on one page. Ask the owner which is\n` +
        `true, then make the day plan (meals, stay), the includes, the excludes\n` +
        `and the FAQ agree in all six languages:\n  ` +
        bad.join("\n  "),
    ).toEqual([]);
  });

  it("the pending list holds only tours that still need the owner's answer", () => {
    const resolved = [...PENDING_OWNER].filter((slug) => {
      const tour = TOURS.find((t) => t.slug === slug);
      return !tour || contradictions(tour).length === 0;
    });
    expect(
      resolved,
      `These tours no longer contradict themselves (or no longer exist).\n` +
        `Remove them from PENDING_OWNER so the rule protects them:\n  ` +
        resolved.join("\n  "),
    ).toEqual([]);
  });
});
