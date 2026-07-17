import { describe, it, expect } from "vitest";
import { TOURS, CATEGORIES, getTour, DIFFICULTY_COLORS, TOUR_COUNT_BY_CATEGORY } from "@/lib/tours";

describe("TOURS data", () => {
  it("has at least one tour", () => {
    expect(TOURS.length).toBeGreaterThan(0);
  });

  it("every tour has a unique slug", () => {
    const slugs = TOURS.map((t) => t.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it("every tour has a price greater than zero", () => {
    TOURS.forEach((t) => {
      expect(t.price).toBeGreaterThan(0);
    });
  });

  it("every tour deposit is less than its price", () => {
    TOURS.forEach((t) => {
      expect(t.depositAmount).toBeLessThan(t.price);
    });
  });

  it("every tour rating is between 1 and 5", () => {
    TOURS.forEach((t) => {
      expect(t.rating).toBeGreaterThanOrEqual(1);
      expect(t.rating).toBeLessThanOrEqual(5);
    });
  });

  it("every tour has at least one gallery image", () => {
    TOURS.forEach((t) => {
      expect(t.gallery.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("every tour has at least one itinerary day", () => {
    TOURS.forEach((t) => {
      expect(t.itinerary.length).toBeGreaterThanOrEqual(1);
    });
  });
});

describe("getTour", () => {
  it("returns the correct tour by slug", () => {
    const first = TOURS[0];
    const found = getTour(first.slug);
    expect(found).toBeDefined();
    expect(found?.id).toBe(first.id);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getTour("does-not-exist")).toBeUndefined();
  });
});

describe("DIFFICULTY_COLORS", () => {
  it("has an entry for each difficulty level", () => {
    const levels = ["easy", "moderate", "challenging", "expert"] as const;
    levels.forEach((level) => {
      expect(DIFFICULTY_COLORS[level]).toBeTruthy();
    });
  });
});

describe("TOUR_COUNT_BY_CATEGORY", () => {
  // These counts are hardcoded on purpose: deriving them from TOURS would keep a
  // live reference to the array and drag the whole catalogue into any client
  // bundle that imports them. This test is what keeps the literals honest.
  it("tourCountsMatchCatalogue: literals match the real catalogue", () => {
    CATEGORIES.forEach((cat) => {
      const actual = TOURS.filter((t) => t.category === cat.id).length;
      expect(
        TOUR_COUNT_BY_CATEGORY[cat.id],
        `TOUR_COUNT_BY_CATEGORY.${cat.id} is stale — update lib/tours.ts to ${actual}`
      ).toBe(actual);
    });
  });

  it("covers every category and sums to the full catalogue", () => {
    const keys = Object.keys(TOUR_COUNT_BY_CATEGORY).sort();
    expect(keys).toEqual(CATEGORIES.map((c) => c.id).sort());
    const sum = Object.values(TOUR_COUNT_BY_CATEGORY).reduce((a, b) => a + b, 0);
    expect(sum).toBe(TOURS.length);
  });
});
