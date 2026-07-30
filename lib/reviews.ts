/**
 * Real traveller reviews, kept in one place so the homepage testimonials block
 * and the tour booking sidebar quote the same source of truth rather than
 * drifting apart.
 *
 * These are genuine reviews — do not invent entries. `short` is a hand-trimmed
 * pull-quote for tight spaces (the booking sidebar); `text` is the full review.
 */
export interface Review {
  name: string;
  country: string;
  rating: number;
  tour: string;
  date: string;
  text: string;
  /** Pull-quote for the booking sidebar — keep under ~110 characters. */
  short: string;
  color: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Katherine L.",
    country: "United Kingdom",
    rating: 5,
    tour: "Toubkal Summit Trek",
    date: "March 2025",
    text: "From the moment our guide met us in Imlil, it was clear we were in expert hands. He knew every stone of that mountain and shared the history of each Berber village with such warmth and pride. Standing on the roof of North Africa at sunrise was the single most powerful moment of my life.",
    short: "From the moment our guide met us in Imlil, it was clear we were in expert hands.",
    color: "#2B3A67",
  },
  {
    name: "Marco B.",
    country: "Italy",
    rating: 5,
    tour: "3-Day Sahara Desert Tour",
    date: "November 2024",
    text: "I have travelled to more than 40 countries and the Sahara night was the most extraordinary of all. The silence out there is unlike anything you have ever experienced. We rode camels into Erg Chebbi as the sun turned the dunes to liquid gold. Perfectly organised from start to finish.",
    short: "I have travelled to more than 40 countries and the Sahara night was the most extraordinary of all.",
    color: "#C97B2B",
  },
  {
    name: "Emily C.",
    country: "United States",
    rating: 5,
    tour: "Marrakech Medina Cultural Tour",
    date: "February 2025",
    text: "I had been to Marrakech twice before, always overwhelmed in the medina. This tour changed everything. Tea with a spice merchant whose family has had the same stall for 200 years, the tanneries from a private rooftop, lunch in a hidden riad courtyard. Extraordinary.",
    short: "I had been to Marrakech twice before, always overwhelmed. This tour changed everything.",
    color: "#1B2645",
  },
];

/**
 * Picks the two reviews most relevant to a tour: prefer ones whose `tour`
 * shares a keyword with the current tour title, then fill from the top. Keeps
 * the sidebar proof feeling specific rather than generic.
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
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.r);
}
