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
 *  - A review the guest first wrote on Tripadvisor may be quoted ONLY with that
 *    guest's own permission: Tripadvisor's terms forbid reproducing reviews
 *    "by any automated means or any manual process" without written
 *    permission, but the guest owns their words. Set `writtenOn:
 *    "tripadvisor"`; such reviews are shown to people but never emitted as
 *    Review schema, because Google forbids marking up reviews collected on
 *    another site ("Don't aggregate reviews or ratings from other websites").
 *  - Quote faithfully. A shortened text ends in "…" and cuts at a sentence.
 *  - No stock photos, no edited ratings, no composites. A guest with no
 *    public name is described ("A couple from Switzerland"), never invented.
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
  /**
   * Where the guest originally wrote it. "tripadvisor" reviews are shown on
   * the page but never become Review structured data (see buildReviewNodes).
   */
  writtenOn: "tripadvisor" | "direct";
}

/**
 * 2026-11-15: five Tripadvisor reviews from October–November 2026, added at the
 * owner's request after each guest agreed to our quoting them. Texts are
 * Tripadvisor's English rendering of the guest's review where the original
 * was in another language (noted in `source`). `country` is left empty when
 * the reviewer gave none: the cards then show only the trip.
 */
export const REVIEWS: Review[] = [
  {
    name: "Anja",
    country: "Germany",
    rating: 5,
    tour: "Erg Chegaga, 3 days from Marrakech",
    tourSlug: "erg-chegaga-3day-marrakech",
    origin: "marrakech",
    date: "October 2026",
    text:
      "The private 3-day desert tour from Marrakech to Erg Chigaga with our driver Mohamed and our guide Aziz was an unforgettable experience for our entire family (my husband and my sons 6, 12, and 15 years old). Even though the drive took several hours, it was already a highlight in itself. … The next day we continued via 4x4 off-road through M'Hamid El Ghizlane (lunch break) to a luxurious desert camp. …",
    short: "An unforgettable experience for our entire family",
    color: "#24408E",
    source: "Guest's Tripadvisor review of 2026-11-01 (written in German), quoted with the guest's permission given to the owner, 2026-11-15",
    writtenOn: "tripadvisor",
  },
  {
    name: "A couple",
    country: "",
    rating: 5,
    tour: "Marrakech to Merzouga, 3-day private tour",
    tourSlug: "sahara-3day-marrakech",
    origin: "marrakech",
    date: "October 2026",
    text:
      "A highly recommended experience! Mohamed was an excellent guide and driver: kind, attentive, and always willing to help us. He made us feel comfortable and safe throughout the entire tour, sharing stories and interesting facts about the places we visited. It is appreciated to find someone who enjoys their work and makes you enjoy the trip. Thank you very much for everything!",
    short: "Mohamed was an excellent guide and driver: kind, attentive, and always willing to help us.",
    color: "#C97B2B",
    source: "Guests' Tripadvisor review of 2026-11-11 (written in Spanish), quoted with the guests' permission given to the owner, 2026-11-15; private tour confirmed by the owner",
    writtenOn: "tripadvisor",
  },
  {
    name: "Phil W",
    country: "",
    rating: 5,
    tour: "Agafay desert sunset & dinner",
    tourSlug: "agafay-desert-sunset",
    origin: "marrakech",
    date: "November 2026",
    text:
      "I want to say this was a fantastic excursion for my birthday. We loved every bit of it and Jamila was a fantastic host, who dealt with our queries perfectly. The trip is one we will remember, thank you",
    short: "We loved every bit of it and Jamila was a fantastic host",
    color: "#B4472C",
    source: "Guest's Tripadvisor review of 2026-11-13 (written in English), quoted with the guest's permission given to the owner, 2026-11-15; private Agafay evening confirmed by the owner",
    writtenOn: "tripadvisor",
  },
  {
    name: "M. Rodriguez",
    country: "Spain",
    rating: 5,
    tour: "Marrakech medina tour",
    tourSlug: "marrakech-medina-cultural-tour",
    origin: "marrakech",
    date: "October 2026",
    text:
      "We took a half-day tour of Marrakech with Abdel and we loved it; he was very professional and very pleasant.",
    short: "We loved it; he was very professional and very pleasant.",
    color: "#24408E",
    source: "Guest's Tripadvisor review of 2026-10-12 (written in Spanish), quoted with the guest's permission given to the owner, 2026-11-15; medina tour confirmed by the owner",
    writtenOn: "tripadvisor",
  },
  {
    name: "A couple from Switzerland",
    // The name already says where they are from.
    country: "",
    rating: 5,
    tour: "Mgoun crossing",
    tourSlug: "mgoun-massif-trek",
    origin: "marrakech",
    date: "October 2026",
    text:
      "Very good organization. Responds quickly, very attentive to customers. Nothing to complain about. I highly recommend this agency.",
    short: "Very good organization. Responds quickly, very attentive to customers.",
    color: "#C97B2B",
    source: "Guests' Tripadvisor review of 2026-10-10 (written in French), quoted with the guests' permission given to the owner, 2026-11-15",
    writtenOn: "tripadvisor",
  },
];

/**
 * The reviews written by guests who took THIS tour (matched on tourSlug).
 *
 * Returns an empty array when there are none, and callers must handle that.
 * History: an unfiltered `.slice(0, count)` once put a Toubkal summit quote on
 * an Ouzoud day trip (23 of 46 tour pages); the keyword match that replaced it
 * still let a review of the Marrakech Erg Chegaga trip appear on the Agadir
 * one, and matched nothing on translated pages, whose titles are not English
 * (2026-11-15). The slug is the one field that says which trip a guest took.
 */
export function reviewsForTour(tourSlug: string, count = 2): Review[] {
  return REVIEWS.filter((r) => r.tourSlug === tourSlug).slice(0, count);
}
