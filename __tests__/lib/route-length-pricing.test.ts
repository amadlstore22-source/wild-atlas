import { describe, it, expect } from "vitest";
import { TOURS, type Tour } from "@/lib/tours";

/**
 * The 4-day Marrakech desert Grand Tour (desert-4day-marrakech) was cheaper per
 * person than the 3-day Marrakech–Merzouga tour (sahara-3day-marrakech) at four
 * and five travellers: €274 against €295, and €245 against €260. The 4-day trip
 * drives the same loop and adds a day and a hotel night in Ouarzazate. The owner
 * spotted it on 2026-10-11 while quoting a family both options side by side.
 *
 * The cause: the 3-day ladder is the owner's own price list, but the 4-day one
 * was scaled from a single confirmed rate with a curve averaged across other
 * tours, which discounted big groups much harder. Each ladder is valid on its
 * own; only setting them side by side shows the inversion. Nothing else catches
 * it: typecheck, build and every other test passed.
 *
 * PAIRS lists tours where the longer one covers the shorter one's route and
 * adds days, so it must cost more at every bookable group size. Add a pair only
 * once the owner has confirmed both ladders. Do not add pairs whose routes
 * differ (Erg Chegaga is remote and priced higher on purpose).
 */
const PAIRS: [shorter: string, longer: string][] = [["sahara-3day-marrakech", "desert-4day-marrakech"]];

const perPerson = (t: Tour, n: number) =>
  [...(t.groupPricing ?? [])].filter((g) => g.minPeople <= n).sort((a, b) => b.minPeople - a.minPeople)[0]?.price;

describe("a longer trip on the same route never costs less per person", () => {
  for (const [shortSlug, longSlug] of PAIRS) {
    it(`${longSlug} costs more than ${shortSlug} at every group size`, () => {
      const short = TOURS.find((t) => t.slug === shortSlug)!;
      const long = TOURS.find((t) => t.slug === longSlug)!;
      expect(short, `${shortSlug} not found`).toBeTruthy();
      expect(long, `${longSlug} not found`).toBeTruthy();
      const inverted = [];
      for (let n = 1; n <= 10; n++) {
        const s = perPerson(short, n);
        const l = perPerson(long, n);
        if (s !== undefined && l !== undefined && l <= s) inverted.push(`${n} people: ${longSlug} €${l} vs ${shortSlug} €${s}`);
      }
      expect(
        inverted,
        `The longer trip is not dearer at these group sizes. Raise the longer tour's tiers\n` +
          `(or confirm both ladders with the owner):\n  ` + inverted.join("\n  "),
      ).toEqual([]);
    });
  }
});
