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
      // Multi-day tours go to 21% off at six (fixed vehicle cost to spread);
      // single-day tours stop at 10% (mostly per-head cost). Deeper than this
      // would cut profit per booking faster than it can plausibly win volume —
      // see the cost model in docs/PRICING.md.
      expect(off, `${tour.slug} discount ${(off * 100).toFixed(0)}%`).toBeGreaterThan(0.05);
      expect(off, `${tour.slug} discount ${(off * 100).toFixed(0)}%`).toBeLessThanOrEqual(0.25);
    }
  });

  it("never makes the booking total fall as the group grows", () => {
    // A bigger group must never pay less in TOTAL than a smaller one, or two
    // people could book a phantom third to pay less.
    for (const tour of TOURS) {
      for (let n = 2; n <= 12; n++) {
        const prev = perPersonPrice(tour, n - 1) * (n - 1);
        const now = perPersonPrice(tour, n) * n;
        expect(now, `${tour.slug} at ${n} people`).toBeGreaterThanOrEqual(prev);
      }
    }
  });

  it("keeps the cost of adding one more traveller reasonably smooth", () => {
    // Tier boundaries make the marginal cost of joining lumpy. Left unchecked
    // it swung from €130 to €262 on the Sahara tour, so a group of five got
    // the worst deal of any size for no reason anyone could explain.
    for (const tour of privateTours) {
      const marginal: number[] = [];
      for (let n = 2; n <= 6; n++) {
        marginal.push(perPersonPrice(tour, n) * n - perPersonPrice(tour, n - 1) * (n - 1));
      }
      const lo = Math.min(...marginal);
      const hi = Math.max(...marginal);
      // The first traveller added is legitimately the priciest (they trigger
      // the smallest discount), so compare the 3rd-6th only.
      const tail = marginal.slice(1);
      const spread = Math.max(...tail) / Math.min(...tail);
      expect(spread, `${tour.slug} marginal spread ${lo}–${hi}`).toBeLessThan(1.6);
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

  it("prices two travellers below the market rate", () => {
    // €596 for the pair (€298 each). The published competitor table charges
    // €435pp — €870 for the same trip — so we stay ~31% under while giving a
    // couple a visible saving rather than a token 2.5%.
    const total = priceIn(perPersonPrice(tour, 2), "EUR") * 2;
    expect(total).toBeGreaterThanOrEqual(580);
    expect(total).toBeLessThanOrEqual(610);
    expect(total).toBeLessThan(870);
  });

  it("discounts a day tour less steeply than a multi-day tour", () => {
    // A one-day tour's cost is mostly per-head, so the same curve would sell
    // it below cost. Guards the duration split itself.
    const dayTour = TOURS.find((t) => t.tourType !== "shared" && t.itinerary.length === 1)!;
    const dayCut = 1 - perPersonPrice(dayTour, 6) / perPersonPrice(dayTour, 1);
    const multiCut = 1 - perPersonPrice(tour, 6) / perPersonPrice(tour, 1);
    expect(dayCut).toBeLessThan(multiCut);
    expect(dayCut).toBeCloseTo(0.1, 1);
    expect(multiCut).toBeCloseTo(0.21, 1);
  });

  it("keeps getting cheaper per person for larger groups", () => {
    const per = [1, 2, 3, 4, 6].map((n) => priceIn(perPersonPrice(tour, n), "EUR"));
    expect(per).toEqual([...per].sort((a, b) => b - a));
    expect(per[0]).toBe(320);
    expect(per[4]).toBeLessThan(300);
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
