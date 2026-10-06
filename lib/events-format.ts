import type { DateConfidence, TourEvent } from "./events";

/**
 * Rendering rules for event dates.
 *
 * The whole point of `confidence` is that it changes what we are allowed to
 * SAY, not just what we store. A harvest festival whose dates the organisers
 * have not announced must never render as a precise day, because a visitor
 * will book flights against it.
 *
 *   confirmed  -> "25–27 June 2026"      (organiser has published it)
 *   estimated  -> "Early May 2027"       (a window, never a single day)
 *   lunar      -> "Around 8 Feb 2027"    (moon-sighting, ±1 day)
 */

const LOCALE_TAG: Record<string, string> = {
  en: "en-GB",
  fr: "fr-FR",
  es: "es-ES",
  de: "de-DE",
  it: "it-IT",
  ar: "ar-MA",
};

/**
 * Locale -> BCP-47 tag for Intl formatting. Exported because the booking
 * sidebar formats fixed-departure dates too, and a second copy of this map
 * would drift: bare "en" resolves to en-US and renders "Mar 5, 2027" on a site
 * that is British English everywhere else.
 */
export function localeTag(lang: string): string {
  return LOCALE_TAG[lang] ?? "en-GB";
}

function tag(lang: string): string {
  return localeTag(lang);
}

/** "25–27 June 2026", collapsing shared month/year across the range. */
function formatRange(startIso: string, endIso: string, lang: string): string {
  const start = new Date(startIso + "T00:00:00Z");
  const end = new Date(endIso + "T00:00:00Z");
  const l = tag(lang);

  const sameMonth =
    start.getUTCFullYear() === end.getUTCFullYear() &&
    start.getUTCMonth() === end.getUTCMonth();

  if (startIso === endIso) {
    return new Intl.DateTimeFormat(l, {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(start);
  }

  if (sameMonth) {
    const day = new Intl.DateTimeFormat(l, { day: "numeric", timeZone: "UTC" });
    const full = new Intl.DateTimeFormat(l, {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
    return `${day.format(start)}–${full.format(end)}`;
  }

  const short = new Intl.DateTimeFormat(l, {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
  const full = new Intl.DateTimeFormat(l, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return `${short.format(start)} – ${full.format(end)}`;
}

/** Month + year only, for windows we cannot pin to days. */
function formatMonthWindow(startIso: string, endIso: string, lang: string): string {
  const start = new Date(startIso + "T00:00:00Z");
  const end = new Date(endIso + "T00:00:00Z");
  const l = tag(lang);
  const my = new Intl.DateTimeFormat(l, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const m = new Intl.DateTimeFormat(l, { month: "long", timeZone: "UTC" });

  if (
    start.getUTCFullYear() === end.getUTCFullYear() &&
    start.getUTCMonth() === end.getUTCMonth()
  ) {
    return my.format(start);
  }
  return `${m.format(start)}–${my.format(end)}`;
}

export function formatEventDates(event: TourEvent, lang: string): string {
  if (event.confidence === "confirmed") {
    return formatRange(event.startDate, event.endDate, lang);
  }
  // Both estimated and lunar collapse to a month window: naming a day would
  // present an unconfirmed date as a fact.
  return formatMonthWindow(event.startDate, event.endDate, lang);
}

export function confidenceLabel(
  confidence: DateConfidence,
  t: { confirmed: string; estimated: string; lunar: string }
): string {
  return confidence === "confirmed"
    ? t.confirmed
    : confidence === "estimated"
      ? t.estimated
      : t.lunar;
}

/**
 * The <title> for an event page (the layout appends " | Marrakech Eco Tours",
 * 22 characters; Google renders about 65 in all).
 *
 * The year goes in whenever it fits, because people search with it ("festival
 * gnaoua essaouira 2027"). Order: full name + year, short name + year, then
 * the full name, trimmed at its subtitle separator if even that overflows.
 * The date range itself stays out (see the page's generateMetadata).
 */
export const EVENT_TITLE_BUDGET = 65 - 22;
export function eventSerpTitle(event: Pick<TourEvent, "name" | "shortName" | "year">): string {
  const year = String(event.year);
  const withYear = (s: string) => (s.includes(year) ? s : `${s} ${year}`);
  for (const candidate of [withYear(event.name), withYear(event.shortName)]) {
    if (candidate.length <= EVENT_TITLE_BUDGET) return candidate;
  }
  return event.name.length <= EVENT_TITLE_BUDGET ? event.name : event.name.split(/\s*[:—–]\s*/)[0].trim();
}

/**
 * schema.org/Event for an event page, or null when the page must not carry one.
 *
 * Until 2026-10-06 every event page emitted Event markup naming Marrakech Eco
 * Tours as `organizer`, including the Gnaoua festival and the Marathon, which
 * other organisations host. Google defines organizer as "the person or
 * organization that is hosting the event", so that was a false claim on the
 * pages Search Console was reading. Checked against Google's Event guidelines
 * the same day, three kinds of page should carry no Event markup at all:
 *
 *   - our own set departures: "Don't promote non-event products or services
 *     such as 'Trip package: San Diego/LA, 7 nights' as events" is almost
 *     word for word our 8-day / 7-night trip. The tour page's Product markup
 *     already describes it.
 *   - dates that are not confirmed: startDate is required and Google shows it
 *     as a day, so an estimated window (Imilchil "1 Sep") or a lunar date would
 *     become the precise day the page itself refuses to state.
 *   - things nobody hosts (Ramadan, a blossom season), which only reach this
 *     point as estimated or lunar and so fall under the rule above.
 *
 * `performer` and `offers` stay out: the 2027 line-ups and prices are not
 * published, and Google lists both as recommended, not required.
 */
export function eventSchemaFor(event: TourEvent) {
  if (event.departureDates?.length || event.confidence !== "confirmed" || !event.city) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.blurb,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [`https://marrakechecotours.com${event.heroImage}`],
    location: {
      "@type": "Place",
      name: event.city,
      address: { "@type": "PostalAddress", addressLocality: event.city, addressCountry: "MA" },
    },
    // The organiser's own site, which is where the date was confirmed.
    ...(event.sourceUrl ? { sameAs: event.sourceUrl } : {}),
  };
}
