import { describe, it, expect } from "vitest";
import { TOURS, getTour, DIFFICULTY_COLORS } from "@/lib/tours";

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
