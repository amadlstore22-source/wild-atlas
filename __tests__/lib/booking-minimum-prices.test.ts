import { describe, it, expect } from "vitest";
import { toursFor } from "@/lib/tours-i18n";
import { groupPriceTiers } from "@/lib/tours";

/**
 * A tour with a booking minimum must never advertise a price for a party
 * smaller than that minimum.
 *
 * Found 2026-11-07: family-atlas-4day-trek starts at three people (€276 each)
 * and its booking box correctly opens at three, but its Google description
 * said "From €554" in all six locales: the 1-person rate, kept in the ladder
 * for reference, that nobody can book. The tour page's AggregateOffer said
 * highPrice 554 for the same reason (it read tour.price, the solo rate).
 * A family of three saw €554 in the search result and €276 on the page.
 *
 * Nothing caught it: the figure is a real number from the ladder, the page
 * builds, and the booking box hides the unbookable tiers, so the page itself
 * looked right. Only the snippet and the structured data were wrong.
 *
 * Rule: in every locale, a tour's seoDescription only quotes euro figures
 * that some bookable party size actually pays.
 */

const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

function euroFigures(s = ""): number[] {
  const out: number[] = [];
  for (const m of s.matchAll(/€\s?(\d[\d.,\s]*\d|\d)|(\d[\d.,\s]*\d|\d)\s?€/g)) {
    const raw = (m[1] ?? m[2]).replace(/[.,\s]/g, "");
    out.push(Number(raw));
  }
  return out;
}

describe("tours with a booking minimum", () => {
  it("never quote a price only a smaller party would pay", () => {
    const bad: string[] = [];
    for (const loc of LOCALES) {
      for (const t of toursFor(loc)) {
        const min = t.minPeople ?? 1;
        if (min <= 1) continue;
        const bookable = new Set(groupPriceTiers(t).map((x) => x.price));
        const unbookable = (t.groupPricing ?? [])
          .filter((x) => x.minPeople < min && !bookable.has(x.price))
          .map((x) => x.price);
        const quoted = euroFigures(t.seoDescription).filter((p) => unbookable.includes(p));
        if (quoted.length) bad.push(`${loc}/${t.slug}: €${quoted.join(", €")} (minimum ${min} people)`);
      }
    }
    expect(
      bad,
      `These descriptions quote a rate for a party below the tour's booking\n` +
        `minimum, which nobody can book. Quote the 6+ rate with its qualifier\n` +
        `("From €225 pp for 6+") or the rate at the minimum instead:\n  `,
    ).toEqual([]);
  });
});
