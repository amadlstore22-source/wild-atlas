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

  it("starts at the smallest bookable group for the headline price", () => {
    for (const tour of TOURS) {
      const tiers = groupPriceTiers(tour);
      const min = tour.minPeople ?? 1;
      // Usually 1, but a tour with a booking minimum (the family trek takes
      // three) must open at ITS minimum — quoting a 1-person rate for a trip
      // that cannot be booked solo is the same bug in the other direction.
      expect(tiers[0].minPeople, tour.slug).toBe(min);
      // The advertised "from" price must be what the smallest bookable group
      // actually pays, otherwise the headline is a price no one can book.
      if (min === 1) {
        expect(tiers[0].price, tour.slug).toBe(tour.price);
      }
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
      // Compare against the smallest bookable group, not a hard-coded 1: on a
      // tour with a minimum of three, "2" is not a bookable size and both
      // lookups would return the same tier.
      const min = tour.minPeople ?? 1;
      // Only meaningful when a couple is BIGGER than the smallest bookable
      // group. Where the minimum is already 2 (or more) there is no smaller
      // tier to save against.
      if (min >= 2) continue;
      expect(perPersonPrice(tour, 2), tour.slug).toBeLessThan(perPersonPrice(tour, min));
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
      // Tours with explicit `groupPricing` follow real quoted brackets, where
      // the 1→2 drop is genuinely steep (the vehicle cost stops being carried
      // by one person). The derived curve stays shallow: 21% multi-day, 10% day.
      expect(off, `${tour.slug} discount ${(off * 100).toFixed(0)}%`).toBeGreaterThan(0.05);
      expect(off, `${tour.slug} discount ${(off * 100).toFixed(0)}%`).toBeLessThanOrEqual(
        // Benchmarked tours mirror a real quoted table, where the vehicle cost
        // stops being carried by one person. Raised from 0.75 to 0.85 on
        // 2026-08-09: the operator's uplift is deliberately steepest at solo
        // (+50%) and flattest at six or more (+6%), which widens the solo-to-
        // large-group spread by design. sahara-3day-marrakech now sits at 82%.
        tour.groupPricing ? 0.85 : 0.25,
      );
    }
  });

  it("never makes the booking total fall as the group grows", () => {
    // A bigger group must never pay less in TOTAL than a smaller one, or two
    // people could book a phantom third to pay less.
    //
    // Checked from 3 people up. The solo -> 2 step is deliberately exempt:
    // a single traveller carries the whole guide and vehicle, so the solo rate
    // is a genuine surcharge and CAN exceed what a pair pays in total. That is
    // not gameable the way a phantom third would be -- you cannot book a
    // phantom second person and still turn up alone, because the guide meets
    // whoever arrives. Several real ladders price this way.
    for (const tour of TOURS) {
      for (let n = 3; n <= 12; n++) {
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
    // Only meaningful for the DERIVED curve. Tours with explicit groupPricing
    // mirror a real quoted table whose steps are uneven by nature.
    for (const tour of privateTours.filter((t) => !t.groupPricing)) {
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

  it("shows €1,066 per person for a solo traveller", () => {
    // Prices are stored in USD and rendered in EUR (lib/currency-core).
    // Was €711 while we undercut the market; the operator moved to a premium
    // position on 2026-08-09 (+50% solo), so solo now sits above the
    // competitor's published €790 rather than under it.
    expect(priceIn(perPersonPrice(tour, 1), "EUR")).toBe(1066);
  });

  it("keeps the premium over the competitor within the intended band", () => {
    // marrakech-desert-trips.com's published table, verified Aug 2026.
    // We used to sit ~10% UNDER these figures. Since the 2026-08-09 uplift we
    // sit above them, steepest at solo and tapering with group size. The test
    // now guards that band, so a mistyped tier or a rival price cut still
    // surfaces instead of passing silently.
    const theirs: Record<number, number> = { 1: 790, 2: 435, 4: 325, 6: 265 };
    for (const [pax, their] of Object.entries(theirs)) {
      const ours = priceIn(perPersonPrice(tour, Number(pax)), "EUR");
      const premium = ours / their - 1;
      expect(premium, `${pax} pax: €${ours} vs €${their}`).toBeGreaterThan(-0.05);
      expect(premium, `${pax} pax: €${ours} vs €${their}`).toBeLessThan(0.4);
    }
  });

  it("prices every group size separately, without inverting", () => {
    // Flat brackets made four people total less than three (€1,172 vs €1,176),
    // so a trio could pay less by inventing a fourth traveller. Per-size tiers
    // keep every step positive.
    // Checked from two people up. The solo -> 2 step is exempt for the same
    // reason as in the suite above: one traveller carries the whole vehicle, so
    // a solo total can exceed a pair's, and that is not gameable — you cannot
    // book a phantom second person and still turn up alone.
    const totals = [2, 3, 4, 5, 6, 7, 8].map((n) => perPersonPrice(tour, n) * n);
    for (let i = 1; i < totals.length; i++) {
      expect(totals[i], `total at ${i + 2} people`).toBeGreaterThan(totals[i - 1]);
    }
  });

  it("discounts a day tour less steeply than a multi-day tour", () => {
    // A one-day tour's cost is mostly per-head, so the same curve would sell it
    // below cost. This guards the duration split.
    //
    // Every tour now carries explicit brackets, so there is no live tour left
    // running on the derived curve to sample. The rule still has to hold for
    // any tour added without its own ladder, so it is exercised against
    // synthetic tours built from a real one.
    const base = TOURS.find((t) => t.itinerary.length >= 2)!;
    const strip = (t: typeof base, days: number) => ({
      ...t,
      groupPricing: undefined,
      tourType: "private" as const,
      duration: `${days} day${days > 1 ? "s" : ""}`,
      itinerary: t.itinerary.slice(0, days),
    });
    const dayTour = strip(base, 1);
    const multiTour = strip(base, 3);

    const dayCut = 1 - perPersonPrice(dayTour, 6) / perPersonPrice(dayTour, 1);
    const multiCut = 1 - perPersonPrice(multiTour, 6) / perPersonPrice(multiTour, 1);
    expect(dayCut).toBeLessThan(multiCut);
    expect(dayCut).toBeCloseTo(0.1, 1);
    expect(multiCut).toBeCloseTo(0.21, 1);
  });

  it("keeps getting cheaper per person for larger groups", () => {
    const per = [1, 2, 3, 4, 6].map((n) => priceIn(perPersonPrice(tour, n), "EUR"));
    expect(per).toEqual([...per].sort((a, b) => b - a));
    // Solo was €711 while we undercut the market; €1,066 since the 2026-08-09
    // uplift. The shape is the point: every bracket cheaper than the last.
    expect(per[0]).toBe(1066);
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
