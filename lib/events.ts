import { TOURS } from "./tours";

/**
 * Festival and seasonal departures.
 *
 * WHY THIS FILE IS SHAPED THIS WAY
 *
 * Most Moroccan festival dates are NOT fixed. Three different mechanisms move
 * them, and conflating them puts wrong dates on a booking page:
 *
 *   - `confirmed`  the organiser has published the date. Safe to state flatly.
 *   - `estimated`  the festival is tied to a harvest or a season and the
 *                  organiser has not announced yet. We show a WINDOW, never a
 *                  precise day, and the UI says the date is not yet confirmed.
 *   - `lunar`      Ramadan, Eid and the moussems follow the Hijri calendar and
 *                  in Morocco are fixed by the Ministry of Endowments' own moon
 *                  sighting. They can shift a day either way even the week
 *                  before, so we never present them as exact.
 *
 * This distinction is enforced by __tests__/lib/events.test.ts, which fails if
 * an `estimated` or `lunar` event carries a single-day date, or if a
 * `confirmed` event has no source URL.
 *
 * Two verification notes worth keeping, because both aggregator summaries were
 * WRONG when checked against the organisers' own sites in Aug 2026:
 *   - Gnaoua: aggregators said "24-26 June 2027". festival-gnaoua.net says
 *     25-27 June 2026, 27th edition.
 *   - Marrakech Marathon: aggregators said "31 Jan 2027, 37th edition".
 *     marrakechmarathon.com says Sunday 25 January 2026, 36th edition.
 * Always re-check `sourceUrl` before publishing a new season.
 */

export type DateConfidence = "confirmed" | "estimated" | "lunar";

export type EventRegion =
  | "marrakech"
  | "atlas-mountains"
  | "sahara-south"
  | "coast-atlantic"
  | "imperial-cities";

export interface TourEvent {
  slug: string;
  name: string;
  /** Short label for cards and chips, e.g. "Rose Festival". */
  shortName: string;
  region: EventRegion;
  /** ISO date (YYYY-MM-DD). For a window, the first day. */
  startDate: string;
  /** ISO date. Equal to startDate only when confidence is "confirmed". */
  endDate: string;
  confidence: DateConfidence;
  /**
   * Required whenever confidence is "confirmed" — the organiser's own page,
   * not an aggregator. Aggregators were wrong twice out of two when checked.
   */
  sourceUrl?: string;
  /** Shown verbatim when the date is not confirmed. */
  dateNote?: string;
  year: number;
  blurb: string;
  /** What actually happens, for people deciding whether to plan a trip round it. */
  description: string;
  /** Slugs from lib/tours.ts that we run against this event. */
  tourSlugs: string[];
  heroImage: string;
  /** Recommended booking lead time in weeks — festivals fill accommodation. */
  bookAheadWeeks: number;
}

export const EVENTS: TourEvent[] = [
  {
    slug: "gnaoua-world-music-festival-essaouira",
    name: "Gnaoua and World Music Festival, Essaouira",
    shortName: "Gnaoua Festival",
    region: "coast-atlantic",
    // The 27th edition (25-27 June 2026) has now passed and the organisers
    // have not yet announced 2027, so this drops to `estimated` on the June
    // window it has held for years. Promote back to `confirmed` — with the
    // exact dates and this same sourceUrl — the moment festival-gnaoua.net
    // publishes the 28th edition.
    startDate: "2027-06-01",
    endDate: "2027-06-30",
    confidence: "estimated",
    sourceUrl: "https://www.festival-gnaoua.net/en/home/",
    dateNote:
      "The organisers announce each edition a few months ahead and have not yet published 2027 dates. The festival has been held in late June for years — the 27th edition ran 25–27 June 2026.",
    year: 2027,
    blurb:
      "Three days of Gnaoua trance music on the Atlantic, in a walled town that empties of cars and fills with drums.",
    description:
      "Maalems — Gnaoua master musicians — play open stages across Essaouira, alongside jazz and world-music guests who improvise with them. It is free, it is outdoors, and the medina stays awake until dawn. Accommodation in Essaouira sells out months ahead, so a day trip from Marrakech is often the more realistic way to see it.",
    tourSlugs: ["shared-essaouira-day-trip", "agadir-to-essaouira-day-trip"],
    heroImage: "/gallery/jemaa-el-fna-dusk-rooftop.jpg",
    bookAheadWeeks: 40,
  },
  {
    slug: "marrakech-international-marathon",
    name: "Marrakech International Marathon",
    shortName: "Marrakech Marathon",
    region: "marrakech",
    // 37th edition, confirmed on marrakechmarathon.com: "Sunday 31 Jan 2027".
    // A single-day range is correct here precisely BECAUSE it is confirmed —
    // the one-day rule in events.test.ts applies only to unconfirmed events.
    startDate: "2027-01-31",
    endDate: "2027-01-31",
    confidence: "confirmed",
    sourceUrl: "https://marrakechmarathon.com/",
    year: 2027,
    blurb:
      "The 37th edition runs the ramparts and palm groves in the cool of a Marrakech January.",
    description:
      "A full and half marathon through the old city walls, the Palmeraie and the avenues of Gueliz, with around 15,000 runners. January is the coolest running month and also prime Toubkal winter-trekking season, so a race weekend pairs naturally with a couple of days in the Atlas either side.",
    tourSlugs: ["marrakech-medina-cultural-tour", "ourika-valley-day-hike"],
    heroImage: "/gallery/jemaa-el-fna-dusk-rooftop.jpg",
    bookAheadWeeks: 10,
  },
  {
    slug: "rose-festival-kelaat-mgouna",
    name: "Rose Festival, Kelaat M'Gouna",
    shortName: "Rose Festival",
    region: "sahara-south",
    startDate: "2027-05-01",
    endDate: "2027-05-14",
    confidence: "estimated",
    dateNote:
      "The festival follows the rose harvest, so the organisers confirm dates only a few weeks ahead. It has fallen in the first two weeks of May every recent year — the 2026 edition ran 7–10 May.",
    year: 2027,
    blurb:
      "The Dades valley harvests its damask roses, and Kelaat M'Gouna throws a three-day party in the petals.",
    description:
      "The valley floor between Kelaat M'Gouna and Boumalne Dades grows damask roses for rose water and oil. When the harvest peaks the town holds a moussem: floats, Ait Atta dancing, a rose queen, and souks selling the season's distillate. It sits directly on the Marrakech-to-Sahara road, so a desert tour timed right passes through the harvest.",
    tourSlugs: ["shared-merzouga-3day-marrakech", "sahara-3day-marrakech"],
    heroImage: "/gallery/kasbah-palm-oasis-draa.jpg",
    bookAheadWeeks: 20,
  },
  {
    slug: "imilchil-marriage-moussem",
    name: "Imilchil Marriage Moussem",
    shortName: "Imilchil Moussem",
    region: "atlas-mountains",
    startDate: "2027-09-01",
    endDate: "2027-09-30",
    confidence: "estimated",
    dateNote:
      "Set by the Ait Haddidou community and tied to the late-summer herding calendar rather than a fixed date. It is usually held in September; the exact days are announced locally, often only weeks ahead.",
    year: 2027,
    blurb:
      "A High Atlas moussem where Ait Haddidou families gather to trade, celebrate and, by tradition, to betroth.",
    description:
      "Held on the plateau near Imilchil at around 2,200 m, the moussem is first a livestock and goods fair for the surrounding Ait Haddidou villages, and second the betrothal gathering it is famous for. It is remote — the approach is a long mountain drive — and it is a working community event rather than a show, which is exactly why it is worth the effort.",
    tourSlugs: ["atlas-mountains-3day-trek", "high-atlas-grand-traverse-15day"],
    heroImage: "/gallery/high-atlas-terraced-fields-sunrise.jpg",
    bookAheadWeeks: 10,
  },
  {
    slug: "ramadan-and-eid-al-fitr",
    name: "Ramadan and Eid al-Fitr",
    shortName: "Ramadan",
    region: "marrakech",
    startDate: "2027-02-08",
    endDate: "2027-03-10",
    confidence: "lunar",
    dateNote:
      "Morocco fixes Ramadan and Eid by local moon sighting through the Ministry of Endowments and Islamic Affairs, so the start and end can move by a day in either direction — sometimes announced only the evening before.",
    year: 2027,
    blurb:
      "The rhythm of the country changes: quiet days, and cities that come alive after sunset.",
    description:
      "Travel during Ramadan is entirely possible and can be the most memorable time to visit, but the day runs differently. Many restaurants close until sunset, museums and offices keep shorter hours, and the medina wakes properly after the iftar cannon. Trekking is unaffected — our guides plan food and water around it — and the Atlas villages break the fast together in a way visitors rarely get to see.",
    tourSlugs: ["marrakech-medina-cultural-tour", "toubkal-summit-2day-marrakech"],
    heroImage: "/gallery/berber-guesthouse-group-dinner.jpg",
    bookAheadWeeks: 6,
  },
  {
    slug: "almond-blossom-anti-atlas",
    name: "Almond Blossom Season, Anti-Atlas",
    shortName: "Almond Blossom",
    region: "sahara-south",
    startDate: "2027-02-01",
    endDate: "2027-03-15",
    confidence: "estimated",
    dateNote:
      "A season, not a date. Blossom timing shifts with winter rainfall and altitude — lower Anti-Atlas valleys turn first, higher villages up to three weeks later.",
    year: 2027,
    blurb:
      "The Anti-Atlas terraces turn white and pink for a few weeks before the heat arrives.",
    description:
      "Between the winter rains and the spring heat, the almond terraces around Tafraoute and the Ameln valley flower against pink granite. It is the best walking weather of the year in the Anti-Atlas — warm days, cold nights — and the quietest time on the trails. Tafraoute holds an almond blossom festival most years, though its dates are set locally.",
    tourSlugs: ["anti-atlas-trekking-agadir"],
    heroImage: "/gallery/high-atlas-terraced-fields-sunrise.jpg",
    bookAheadWeeks: 6,
  },
];

/** Events whose window has not yet closed, soonest first. */
export function upcomingEvents(now: Date = new Date()): TourEvent[] {
  const today = now.toISOString().slice(0, 10);
  return EVENTS.filter((e) => e.endDate >= today).sort((a, b) =>
    a.startDate.localeCompare(b.startDate)
  );
}

export function getEvent(slug: string): TourEvent | undefined {
  return EVENTS.find((e) => e.slug === slug);
}

/** Events that run one of the given tour's departures. */
export function eventsForTour(tourSlug: string): TourEvent[] {
  return EVENTS.filter((e) => e.tourSlugs.includes(tourSlug));
}

/** Resolve an event's tour slugs to real tours, dropping any that no longer exist. */
export function toursForEvent(event: TourEvent) {
  return event.tourSlugs
    .map((slug) => TOURS.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
}
