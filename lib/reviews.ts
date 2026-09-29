/**
 * Traveller reviews shown on the site (homepage testimonials, booking-sidebar
 * quotes) and emitted as Review structured data on the tour they describe.
 *
 * EMPTY ON PURPOSE since 2026-09-29. The three entries that lived here
 * ("Katherine L.", "Marco B.", "Emily C.") were never real: they came from the
 * five placeholder testimonials in the site template (initial commit 724169c,
 * each with an Unsplash stock portrait), and a later commit edited two "from
 * 5→4 stars with realistic minor criticism". They were published for three
 * months as genuine, including as named Review schema to Google. Fake reviews
 * break Google's Terms ("creating fake ... content, including fake reviews"),
 * the UK DMCC Act 2024 and the EU Omnibus Directive. The owner had them removed.
 *
 * Rules for adding one (fake-reviews.test.ts enforces the checkable parts):
 *  - It must be a real guest's own words, and `source` must say where it came
 *    from and how permission was given ("email from guest, 2026-10-04").
 *  - NOT copied from Tripadvisor: its terms forbid reproducing reviews "by any
 *    automated means or any manual process" without written permission. Show
 *    those through Tripadvisor's own widget instead.
 *  - No stock photos, no edited ratings, no composites.
 */
export interface Review {
  name: string;
  country: string;
  rating: number;
  tour: string;
  /**
   * The slug of the tour this traveller ACTUALLY took.
   *
   * `tour` above is a display label and is matched by keyword, which is fine
   * for choosing a pull-quote but far too loose to attribute authorship in
   * structured data: "3-Day Sahara Desert Tour" keyword-matches eleven
   * different desert tours, and naive string containment resolves it to
   * `merzouga-3day-agadir` — a trip from a different city.
   *
   * Review schema names a real person and a real rating, so it may only be
   * emitted on the one page describing the trip they went on. This field is
   * that page, stated explicitly rather than inferred.
   */
  tourSlug: string;
  /**
   * The city this traveller departed from, cross-checked against the tour's
   * own `origin`.
   *
   * Titles alone cannot separate the two Sahara trips: "3-Day Sahara Desert
   * Tour" appears verbatim inside BOTH "Marrakech to Merzouga — 3-Day Desert
   * Tour" and "Agadir to Merzouga — 3-Day Sahara Desert Tour", so every
   * text-similarity check scores them equally and a misattribution between
   * them is invisible. The departure city is the one field that distinguishes
   * them, so it is stated rather than inferred and asserted in
   * review-schema.test.ts.
   */
  origin: "marrakech" | "agadir";
  date: string;
  text: string;
  /** Pull-quote for the booking sidebar — keep under ~110 characters. */
  short: string;
  color: string;
  /** Where this review came from and how the guest agreed to its use. */
  source: string;
}

export const REVIEWS: Review[] = [];

/**
 * Picks the reviews genuinely relevant to a tour: ones whose `tour` shares a
 * keyword with the current tour title.
 *
 * Returns an empty array when nothing matches, and callers must handle that.
 * This used to `.slice(0, count)` an unfiltered list, so a zero-scoring tour
 * still rendered the top review — an Ouzoud waterfalls day trip showed a
 * Toubkal summit quote, on 23 of 46 tour pages. Attaching a real traveller's
 * words to a trip they did not take is the opposite of the trust signal the
 * block exists to give, so no proof is better than borrowed proof.
 */
/** Departure cities and filler that appear in most tour titles — matching on
 *  them would score every Marrakech-departing trek against a Marrakech medina
 *  review, which is not the kind of relevance we want. */
const GENERIC_TITLE_WORDS = new Set(["marrakech", "marrakesh", "agadir", "morocco", "moroccan", "tours"]);

export function reviewsForTour(tourTitle: string, count = 2): Review[] {
  const words = tourTitle
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((w) => w.length > 4 && !GENERIC_TITLE_WORDS.has(w));
  const scored = REVIEWS.map((r) => {
    const hay = r.tour.toLowerCase();
    return { r, score: words.reduce((n, w) => n + (hay.includes(w) ? 1 : 0), 0) };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.r);
}
