import { describe, expect, it } from "vitest";
import { TOURS } from "@/lib/tours";
import { toursFor } from "@/lib/tours-i18n";

/**
 * A tour page must not contradict itself about dinners or rooms.
 *
 * Found 2026-11-15 on the 5-day imperial cities tour and five sister tours
 * (Fes 3-day, Chefchaouen 4-day, Agadir to Fes, Agadir to Chefchaouen, Agadir
 * imperial 6-day), live in six languages. The day plan marked dinner on most
 * nights. The "not included" list, and the tour's own FAQ, said "Lunches and
 * dinners". The inclusions said "N nights riad accommodation" while every
 * night of the day plan said "Hotel". A buyer comparing the three could not
 * tell what the price covered, on trips that cost EUR 1,150 for two.
 *
 * The owner settled it the same day: dinner is included every night, and the
 * room is a riad or a hotel depending on availability. All six tours now say
 * so in the inclusions, the exclusions, the day plan and the FAQ.
 *
 * Nothing caught it: every string was valid, the page built, and the three
 * statements sit in three different sections of the page. This test reads the
 * whole catalogue, because the same sentences were copied between tours, and
 * it reads the meal marks in every language, because a day plan corrected in
 * English only would leave the other five saying the old thing.
 */

const LOCALES = ["fr", "es", "de", "it", "ar"] as const;

function contradictions(tour: (typeof TOURS)[number]): string[] {
  const out: string[] = [];
  const dinnerDays = tour.itinerary.filter((d) => /\bD\b/.test(d.meals ?? "")).length;
  // "Dinner in Fes on day 3" would name its exception; "Lunches and dinners" does not.
  const blanketDinner = tour.excludes.some((e) => /dinner/i.test(e) && !/dinners? (in|on|at)\b/i.test(e));
  if (blanketDinner && dinnerDays > 0) {
    out.push(`"not included" lists dinners, but the day plan marks dinner on ${dinnerDays} day(s)`);
  }
  const includes = tour.includes.join(" ");
  const hotelNights = tour.itinerary.filter((d) => d.stay === "Hotel").length;
  if (/riad/i.test(includes) && !/hotel/i.test(includes) && hotelNights > 0) {
    out.push(`the inclusions promise a riad, but ${hotelNights} night(s) of the day plan say "Hotel"`);
  }
  // "Breakfast and dinner daily" means every night that has a stay has a dinner.
  if (tour.includes.some((i) => /breakfast and dinner daily/i.test(i))) {
    const missing = tour.itinerary.filter((d) => d.stay && !/\bD\b/.test(d.meals ?? "")).map((d) => d.day);
    if (missing.length) out.push(`"Breakfast and dinner daily", but day(s) ${missing.join(", ")} have a night's stay and no dinner mark`);
  }
  return out;
}

describe("a tour does not contradict itself about dinners or rooms", () => {
  it("the day plan agrees with what is and is not included", () => {
    const bad = TOURS.flatMap((t) => contradictions(t).map((c) => `${t.slug}: ${c}`));
    expect(
      bad,
      `These tours say two different things on one page. Ask the owner which is\n` +
        `true, then make the day plan (meals, stay), the includes, the excludes\n` +
        `and the FAQ agree in all six languages:\n  ` +
        bad.join("\n  "),
    ).toEqual([]);
  });

  it("every language marks the same meals on the same days as English", () => {
    const drift: string[] = [];
    for (const lang of LOCALES) {
      const catalogue = toursFor(lang);
      for (const en of TOURS) {
        const localised = catalogue.find((t) => t.slug === en.slug);
        if (!localised) continue;
        en.itinerary.forEach((day, i) => {
          // One tour writes its meals out in words, translated; only the
          // letter marks (B, L, D) can be compared between languages.
          if (!/^[BLD](,[BLD])*$/.test(day.meals ?? "")) return;
          const other = localised.itinerary[i];
          if (other && (other.meals ?? "") !== (day.meals ?? "")) {
            drift.push(`${en.slug} [${lang}] day ${day.day}: "${other.meals ?? ""}" vs "${day.meals ?? ""}" in English`);
          }
        });
      }
    }
    expect(
      drift,
      `The meal marks (B, L, D) are facts, not translations. Copy the English\n` +
        `value into lib/tours.<locale>.ts for:\n  ` +
        drift.join("\n  "),
    ).toEqual([]);
  });
});
