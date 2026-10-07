import { describe, it, expect } from "vitest";
import { TOURS } from "@/lib/tours";
import { DESTINATIONS } from "@/lib/destinations";
import { toursFor } from "@/lib/tours-i18n";
import { toursForDestination, scoreTourForDestination } from "@/lib/destination-tours";

/**
 * Destination pages listed "any tour in a related category or from a related
 * origin", first six in catalogue order. Found 2026-10-07: the Essaouira page
 * listed neither Essaouira trip, the Sahara page had one desert tour among
 * Toubkal, Ourika and Agafay, Fes and Chefchaouen had no Fes or Chefchaouen
 * tour, and the Agadir page led with Marrakech day trips.
 *
 * The pages built and rendered; only a reader noticed that the tours below
 * "Essaouira" were in other places.
 */
const LANGS = ["en", "fr", "es", "de", "it", "ar"] as const;

describe("destination page tours", () => {
  it("lists the tours that actually go to the destination first", () => {
    const problems: string[] = [];
    for (const d of DESTINATIONS) {
      const listed = toursForDestination(TOURS, d);
      const going = TOURS.filter((t) => scoreTourForDestination(t, d) >= 3);
      const expected = Math.min(going.length, 6);
      const listedGoing = listed.filter((t) => scoreTourForDestination(t, d) >= 3).length;
      if (listedGoing < expected) {
        problems.push(`${d.slug}: lists ${listedGoing} tours that go there, ${going.length} exist`);
      }
      if (going.length === 0) problems.push(`${d.slug}: no tour matches as going there — check VISITS`);
    }
    expect(problems, `Destination pages must lead with tours that go there:\n  ${problems.join("\n  ")}`).toEqual([]);
  });

  it("the Essaouira page lists both Essaouira trips, the Agadir page the Agadir one", () => {
    const essaouira = DESTINATIONS.find((d) => d.slug === "essaouira")!;
    const agadir = DESTINATIONS.find((d) => d.slug === "agadir")!;
    for (const lang of LANGS) {
      const tours = toursFor(lang);
      const e = toursForDestination(tours, essaouira).map((t) => t.slug);
      expect(e, `${lang} essaouira`).toEqual(expect.arrayContaining(["shared-essaouira-day-trip", "agadir-to-essaouira-day-trip"]));
      expect(toursForDestination(tours, agadir).map((t) => t.slug), `${lang} agadir`).toContain("agadir-to-essaouira-day-trip");
    }
  });

  it("every locale lists the same tours in the same order", () => {
    for (const d of DESTINATIONS) {
      const en = toursForDestination(toursFor("en"), d).map((t) => t.slug);
      for (const lang of LANGS) {
        expect(toursForDestination(toursFor(lang), d).map((t) => t.slug), `${lang} ${d.slug}`).toEqual(en);
      }
    }
  });
});
