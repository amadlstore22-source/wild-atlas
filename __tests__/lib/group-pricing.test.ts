import { describe, it, expect } from "vitest";
import { TOURS, groupPriceTiers, perPersonPrice, type Tour } from "@/lib/tours";
import { priceIn } from "@/lib/currency-core";

/**
 * Group pricing: the per-person rate falls as the group grows, because the
 * dominant cost on a private tour (vehicle + driver-guide) is fixed and gets
 * split across more travellers. These tests lock in the properties that must
 * hold for every tour, not just the one they were designed against.
 */
describe("groupPriceTiers", () => {
  const privateTours = TOURS.filter((t) => t.tourType !== "shared");

  it("covers every tour", () => {
    for (const tour of TOURS) {
      expect(groupPriceTiers(tour).length, tour.slug).toBeGreaterThan(0);
    }
  });

  it("starts at 1 person for the headline price", () => {
    for (const tour of TOURS) {
      const tiers = groupPriceTiers(tour);
      expect(tiers[0].minPeople, tour.slug).toBe(1);
      // The advertised "from" price must be what a solo traveller actually pays,
      // otherwise the headline is a price no one can book.
      expect(tiers[0].price, tour.slug).toBe(tour.price);
    }
  });

  it("never increases the per-person price as the group grows", () => {
    for (const tour of TOURS) {
      const tiers = groupPriceTiers(tour);
      for (let i = 1; i < tiers.length; i++) {
        expect(tiers[i].price, `${tour.slug} tier ${i}`).toBeLessThanOrEqual(tiers[i - 1].price);
        expect(tiers[i].minPeople, `${tour.slug} tier ${i}`).toBeGreaterThan(tiers[i - 1].minPeople);
      }
    }
  });

  it("gives a couple a real saving on private tours", () => {
    // The booking sidebar defaults to 2 travellers, so this is the number most
    // visitors see first. If it equals the solo price the discount is invisible.
    for (const tour of privateTours) {
      expect(perPersonPrice(tour, 2), tour.slug).toBeLessThan(perPersonPrice(tour, 1));
    }
  });

  it("does not discount shared departures", () => {
    // A seat on a shared tour costs the same however many people book it —
    // there is no vehicle cost to spread, so a discount is just lost margin.
    for (const tour of TOURS.filter((t) => t.tourType === "shared")) {
      expect(perPersonPrice(tour, 8), tour.slug).toBe(tour.price);
    }
  });

  it("keeps the deepest discount within a sane band", () => {
    for (const tour of privateTours) {
      const solo = perPersonPrice(tour, 1);
      const big = perPersonPrice(tour, 8);
      const off = 1 - big / solo;
      expect(off, `${tour.slug} discount ${(off * 100).toFixed(0)}%`).toBeGreaterThan(0.1);
      expect(off, `${tour.slug} discount ${(off * 100).toFixed(0)}%`).toBeLessThanOrEqual(0.35);
    }
  });

  it("returns a tour's explicit groupPricing untouched when set", () => {
    const custom: Tour = {
      ...TOURS[0],
      groupPricing: [
        { minPeople: 1, price: 100 },
        { minPeople: 5, price: 60 },
      ],
    };
    expect(groupPriceTiers(custom)).toEqual(custom.groupPricing);
    expect(perPersonPrice(custom, 4)).toBe(100);
    expect(perPersonPrice(custom, 5)).toBe(60);
  });
});

describe("3-day Sahara tour pricing", () => {
  const tour = TOURS.find((t) => t.slug === "sahara-3day-marrakech")!;

  it("exists", () => {
    expect(tour).toBeDefined();
  });

  it("shows €320 per person for a solo traveller", () => {
    // Prices are stored in USD and rendered in EUR at 0.92 (lib/currency-core).
    // 348 USD is the value that renders as the €320 headline figure.
    expect(priceIn(perPersonPrice(tour, 1), "EUR")).toBe(320);
  });

  it("comes to about €625 total for two", () => {
    const total = priceIn(perPersonPrice(tour, 2), "EUR") * 2;
    // €624 — the nearest reachable figure, since per-person prices round to
    // whole euros. Range guards against drift, not exactness.
    expect(total).toBeGreaterThanOrEqual(620);
    expect(total).toBeLessThanOrEqual(630);
  });

  it("keeps getting cheaper per person for larger groups", () => {
    const per = [1, 2, 3, 4, 6].map((n) => priceIn(perPersonPrice(tour, n), "EUR"));
    expect(per).toEqual([...per].sort((a, b) => b - a));
    expect(per[0]).toBe(320);
    expect(per[4]).toBeLessThan(260);
  });
});

describe("3-day Sahara itinerary", () => {
  const tour = TOURS.find((t) => t.slug === "sahara-3day-marrakech")!;

  it("runs the Dades / Todra / Alnif loop", () => {
    const titles = tour.itinerary!.map((d) => d.title).join(" | ");
    expect(titles).toContain("Dades");
    expect(titles).toContain("Todra");
    expect(titles).toContain("Alnif");
    expect(titles).toContain("Tazarine");
  });

  it("no longer advertises the old Draa Valley route", () => {
    // The route changed; prose that still says "Draa Valley" would describe a
    // road the tour does not take.
    const prose = [
      tour.description,
      ...(tour.highlights ?? []),
      ...tour.itinerary!.map((d) => d.description),
      tour.seoDescription ?? "",
    ].join(" ");
    expect(prose).not.toMatch(/Draa|Drâa/);
  });

  it("has three days in order", () => {
    expect(tour.itinerary!.map((d) => d.day)).toEqual([1, 2, 3]);
  });
});
