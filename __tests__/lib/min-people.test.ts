import { describe, it, expect } from "vitest";
import { TOURS, groupPriceTiers, lowestGroupPrice, perPersonPrice } from "@/lib/tours";

/**
 * A tour with a booking minimum must never quote a group size it cannot take.
 *
 * The family trek is sold to families and takes three or more, but the tier
 * ladder always started at 1, so the page advertised 1- and 2-person rates
 * that could not be booked. `groupSize` is display text and drives nothing, so
 * the minimum lives in `minPeople` and is enforced in groupPriceTiers() —
 * which every price surface reads from.
 */
describe("booking minimums", () => {
  const withMin = TOURS.filter((t) => (t.minPeople ?? 1) > 1);

  it("has at least one tour with a minimum (guards the fixture)", () => {
    expect(withMin.length).toBeGreaterThan(0);
  });

  it("never offers a tier below the minimum", () => {
    for (const tour of withMin) {
      const min = tour.minPeople!;
      for (const tier of groupPriceTiers(tour)) {
        expect(tier.minPeople, `${tour.slug} tier`).toBeGreaterThanOrEqual(min);
      }
    }
  });

  it("opens exactly at the minimum, never above it", () => {
    for (const tour of withMin) {
      expect(groupPriceTiers(tour)[0].minPeople, tour.slug).toBe(tour.minPeople);
    }
  });

  it("never advertises a 'from' price for an unbookable group", () => {
    for (const tour of withMin) {
      expect(lowestGroupPrice(tour).minPeople, tour.slug).toBeGreaterThanOrEqual(
        tour.minPeople!,
      );
    }
  });

  it("quotes the minimum's rate for any smaller number", () => {
    // perPersonPrice must not fall back to a cheaper phantom tier.
    for (const tour of withMin) {
      const min = tour.minPeople!;
      const atMin = perPersonPrice(tour, min);
      expect(perPersonPrice(tour, 1), tour.slug).toBe(atMin);
      expect(perPersonPrice(tour, min - 1), tour.slug).toBe(atMin);
    }
  });

  it("a private tour with no minimum says it starts at one person", () => {
    // Owner, 2026-10-20: "no minimum number on private tours". The cards said
    // "2-15 people" while the price ladder sold a 1-person rate, so a solo
    // traveller read the card as "not for me". price-locale-parity holds the
    // translations to the same digits.
    const bad = TOURS.filter((t) => t.tourType === "private" && (t.minPeople ?? 1) === 1)
      .filter((t) => /^\d/.test(t.groupSize) && !/^1\D/.test(t.groupSize))
      .map((t) => `${t.slug}: "${t.groupSize}"`);
    expect(bad, `Private tours have no minimum; start groupSize at 1 (or set minPeople if this tour really has one):\n  ${bad.join("\n  ")}`).toEqual([]);
  });

  it("keeps the stated group size consistent with the minimum", () => {
    for (const tour of withMin) {
      const first = Number(tour.groupSize.match(/^(\d+)/)?.[1]);
      expect(first, `${tour.slug}: groupSize says ${tour.groupSize}`).toBe(
        tour.minPeople,
      );
    }
  });
});
