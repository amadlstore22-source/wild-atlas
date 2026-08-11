import { describe, expect, it } from "vitest";
import { TOURS } from "@/lib/tours";
import { priceIn } from "@/lib/currency-core";

/**
 * The owner's rule, given for the Ourika day hike: one person pays €86, and if
 * they book for two the party pays €160 — €80 each. Book more, pay slightly
 * less each, but the TOTAL always goes up.
 *
 * 21 tours broke that. Ourika charged €86 solo but €40 each for two, so a
 * couple paid €80 — less in total than one person, for more work. A solo
 * traveller could book two seats, pay less, and travel alone.
 *
 * Only the offending tiers were raised rather than imposing one flat ratio:
 * forcing 93% everywhere pushed the multi-day 4x4 tours to double the market
 * and tripped the competitor price floor. The discount curve is per tour; the
 * invariant below is what has to hold everywhere.
 */
describe("group price ladders", () => {
  it("never lets a larger party pay less in total", () => {
    const failures: string[] = [];
    for (const tour of TOURS) {
      const tiers = tour.groupPricing ?? [];
      let best = 0;
      for (const tier of tiers) {
        const total = priceIn(tier.price, "EUR") * tier.minPeople;
        if (total < best) {
          failures.push(
            `${tour.slug}: ${tier.minPeople} pax totals €${total}, below €${best} for a smaller party`
          );
        }
        best = Math.max(best, total);
      }
    }
    expect(failures, `Totals invert:\n  ${failures.join("\n  ")}`).toEqual([]);
  });

  it("never raises the per-person price as the group grows", () => {
    const failures: string[] = [];
    for (const tour of TOURS) {
      const tiers = tour.groupPricing ?? [];
      for (let i = 1; i < tiers.length; i++) {
        if (tiers[i].price > tiers[i - 1].price) {
          failures.push(`${tour.slug}: per-person rises at ${tiers[i].minPeople} pax`);
        }
      }
    }
    expect(failures, `Per-person rises:\n  ${failures.join("\n  ")}`).toEqual([]);
  });

  it("quotes the headline price from the smallest bookable party", () => {
    // Not every ladder starts at 1: the 15-day Grand Traverse has a two-person
    // booking minimum, which is a real operating constraint rather than a gap.
    // What must hold is that the advertised price is the first tier's, so the
    // card and the booking form cannot disagree.
    for (const tour of TOURS) {
      const tiers = tour.groupPricing ?? [];
      expect(tiers.length, `${tour.slug} has no group pricing`).toBeGreaterThan(0);
      expect(tour.price, `${tour.slug} headline price differs from tier 1`).toBe(tiers[0].price);
    }
  });
});
