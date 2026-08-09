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

  it("keeps the stated group size consistent with the minimum", () => {
    for (const tour of withMin) {
      const first = Number(tour.groupSize.match(/^(\d+)/)?.[1]);
      expect(first, `${tour.slug}: groupSize says ${tour.groupSize}`).toBe(
        tour.minPeople,
      );
    }
  });
});
