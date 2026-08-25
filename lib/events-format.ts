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

function tag(lang: string): string {
  return LOCALE_TAG[lang] ?? "en-GB";
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
