/**
 * Published competitor prices, used to keep our own pricing honest.
 *
 * WHY THIS EXISTS
 * Prices drift. Someone edits a tour, a rate looks fine in isolation, and the
 * tour quietly ends up either above the market or so far below it that the
 * margin is gone. These figures let a test catch both automatically
 * (__tests__/lib/price-floor.test.ts).
 *
 * WHAT THESE NUMBERS ARE
 * Per-person prices in EUR, published openly on each operator's own tour page
 * and verified in August 2026. Prices are facts, not protected content — none
 * of these operators' copy, layout or structure is reproduced anywhere in this
 * codebase, and the numbers are used only as a yardstick for our own.
 *
 * THE FLOOR
 * Our price must not sit more than MAX_UNDERCUT below the cheapest comparable
 * competitor. Undercutting is fine and intended; undercutting by a third is
 * giving the trip away, and on a 3-day desert tour the modelled cost base
 * (~€527 fixed + ~€154 per head) leaves little room for it.
 *
 * KEEPING THIS CURRENT
 * Re-check the source pages roughly twice a year. If an operator has moved,
 * update the table and re-run the tests — a competitor cutting prices can put
 * us above the market without us touching anything.
 */

export interface CompetitorTour {
  /** Our tour slug this benchmarks. */
  slug: string;
  /** Operator name, for test output that says who we are being compared to. */
  operator: string;
  /** Public URL of the page these prices came from. */
  source: string;
  /** When the prices were last verified against that page. */
  verified: string;
  /** Why this is a fair comparison — same trip, same length, same start point. */
  basis: string;
  /** False when the rival's product is no longer the same shape as ours
   *  (e.g. a shared minibus seat against our private tour). Excluded from
   *  the price floor rather than deleted, so the reasoning is not lost. */
  comparable?: boolean;
  /** Per-person EUR price, keyed by group size. */
  prices: Record<number, number>;
}

/**
 * Our price may sit at most this far below the cheapest comparable competitor.
 * 0.15 = never more than 15% under.
 */
export const MAX_UNDERCUT = 0.15;

/**
 * We should also not be *above* the market on a like-for-like trip by more than
 * we can justify. Raised from 2% to 40% on 2026-08-09, when the operator moved
 * to a deliberate premium position: +50% solo, +25% at two, tapering to +6% at
 * six. That puts us roughly 35% above the cheapest benchmarked rival at solo
 * and ~13% at two.
 *
 * That is a pricing DECISION, not a bug, and the justification is real -
 * licensed Berber guides from one family, no middleman, published tier tables
 * rather than "contact us for a quote". The check is kept rather than deleted
 * so a genuine mistake (a mistyped tier, a rival cutting prices hard) still
 * surfaces; it now catches anything beyond the intended band.
 */
export const MAX_PREMIUM = 0.4;

export const COMPETITOR_PRICES: CompetitorTour[] = [
  {
    slug: "sahara-3day-marrakech",
    operator: "Marrakech Desert Trips",
    source: "https://www.marrakech-desert-trips.com/tours/marrakech-desert-tours-3-days/",
    verified: "2026-08",
    basis: "3-day private Marrakech→Merzouga, same route, same vehicle class",
    prices: { 1: 790, 2: 435, 3: 365, 4: 325, 5: 295, 6: 265, 7: 245, 10: 215, 14: 195 },
  },
  {
    slug: "sahara-3day-marrakech",
    operator: "Sahara Desert Trips",
    source: "https://saharadeserttrips.com/pricing/",
    verified: "2026-08",
    // Their own caveat: "prices are just a demonstration to have an idea about
    // our pricing range". Indicative rather than a firm tariff, so it informs
    // the floor but should not be treated as a committed competitor quote.
    basis: "3-day private Marrakech→Merzouga (operator calls these indicative)",
    prices: { 2: 450, 3: 350, 4: 300 },
  },
  {
    slug: "marrakech-to-fes-3day",
    operator: "Marrakech Desert Trips",
    source: "https://www.marrakech-desert-trips.com/tours/marrakech-to-fes-desert-tour/",
    verified: "2026-08",
    basis: "3-day private Marrakech→Fes via the desert, same length and endpoints",
    prices: { 1: 1135, 2: 635, 3: 545, 4: 495, 5: 465, 6: 415, 7: 395, 10: 345, 14: 315 },
  },
  {
    slug: "erg-chegaga-3day-marrakech",
    operator: "Marrakech Desert Trips",
    source: "https://www.marrakech-desert-trips.com/tours/3-days-marrakech-to-erg-chigaga-desert-tour/",
    verified: "2026-08",
    basis: "3-day private Marrakech→Erg Chigaga, same dune sea",
    prices: { 1: 940, 2: 510, 3: 385, 4: 325, 5: 285 },
  },
  {
    slug: "erg-chegaga-3day-agadir",
    operator: "Marrakech Desert Trips",
    source: "https://www.marrakech-desert-trips.com/tours/3-days-agadir-to-erg-chigaga-desert-tour/",
    verified: "2026-08",
    basis: "3-day private Agadir→Erg Chigaga, same start point",
    prices: { 1: 895, 2: 525, 3: 395, 4: 315, 5: 285 },
  },
  {
    slug: "agadir-to-fes-4day",
    operator: "Marrakech Desert Trips",
    source: "https://www.marrakech-desert-trips.com/tours/4-days-agadir-to-merzouga-desert-tour/",
    verified: "2026-08",
    basis: "4-day private circuit from Agadir — nearest equivalent length and start",
    prices: { 1: 1145, 2: 630, 3: 525, 4: 465, 5: 395, 6: 360, 7: 340, 10: 325, 14: 295 },
  },
  {
    slug: "family-desert-4day-marrakech",
    operator: "Marrakech Desert Trips",
    source: "https://www.marrakech-desert-trips.com/tours/marrakech-to-merzouga-desert-tour-4-days/",
    verified: "2026-08",
    basis: "4-day private Marrakech→Merzouga, same route and length",
    prices: { 1: 895, 2: 495, 3: 425, 4: 385, 5: 365, 6: 325, 7: 305, 10: 295, 14: 265 },
  },
  {
    slug: "toubkal-summit-sahara-5day",
    operator: "Marrakech Desert Trips",
    source: "https://www.marrakech-desert-trips.com/tours/toubkal-summit-and-sahara-desert-trek-5-days/",
    verified: "2026-08",
    basis: "5-day Toubkal trek + Sahara, the same combined trip",
    prices: { 1: 1055, 2: 715, 3: 505, 4: 435, 5: 415, 6: 405, 7: 395, 10: 365, 14: 345 },
  },
  {
    slug: "zagora-2day-marrakech",
    operator: "Marrakech Desert Trips",
    source: "https://www.marrakech-desert-trips.com/shared-marrakech-desert-tours/",
    verified: "2026-08",
    // NOT COMPARABLE since our Zagora tour became private (2026-08). This €69
    // is a seat on a shared minibus; ours is now a private vehicle and guide,
    // so the two are different products and holding our price to it would sell
    // below cost. Kept for the record — replace when a private 2-day Zagora
    // quote is verified.
    comparable: false,
    basis: "2-day shared Marrakech→Zagora, per seat (shared, so no group tiers)",
    prices: { 1: 69 },
  },
];

/** Every competitor entry benchmarking a given tour. */
export function competitorsFor(slug: string): CompetitorTour[] {
  // `comparable: false` entries are kept for the record but excluded here, so
  // both the floor check and cheapestCompetitor() ignore rivals whose product
  // is no longer the same shape as ours.
  return COMPETITOR_PRICES.filter((c) => c.slug === slug && c.comparable !== false);
}

/**
 * The lowest competitor price at a given group size, across every operator
 * benchmarking this tour. The floor is measured against the CHEAPEST rival
 * rather than an average: 15% under the mean can still be 30% under the
 * cheapest option a customer will actually find.
 */
export function cheapestCompetitor(
  slug: string,
  people: number,
): { price: number; operator: string } | null {
  let best: { price: number; operator: string } | null = null;
  for (const c of competitorsFor(slug)) {
    const p = c.prices[people];
    if (p === undefined) continue;
    if (!best || p < best.price) best = { price: p, operator: c.operator };
  }
  return best;
}
