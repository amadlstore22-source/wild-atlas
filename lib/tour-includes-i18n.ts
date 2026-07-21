import type { Locale } from "@/app/[lang]/dictionaries";
import type { Tour } from "./tours";

type TourIncludes = { includes: string[]; excludes: string[] };

async function loadLocale(locale: Locale): Promise<Record<string, TourIncludes> | null> {
  switch (locale) {
    case "fr":
      return (await import("./tour-includes.fr")).TOUR_INCLUDES;
    case "es":
      return (await import("./tour-includes.es")).TOUR_INCLUDES;
    case "de":
      return (await import("./tour-includes.de")).TOUR_INCLUDES;
    case "it":
      return (await import("./tour-includes.it")).TOUR_INCLUDES;
    case "ar":
      return (await import("./tour-includes.ar")).TOUR_INCLUDES;
    default:
      return null;
  }
}

/**
 * Tour titles/descriptions/itineraries stay English-only by design (see the
 * tour-detail page's canonical-to-/en comment), but includes/excludes are
 * short UI-adjacent line items rather than marketing prose, so they get the
 * same per-locale treatment as destinations/guides. Falls back to the
 * tour's own English includes/excludes when a locale file is missing an
 * entry or the locale is English.
 */
export async function tourIncludesFor(locale: Locale, tour: Tour): Promise<TourIncludes> {
  const table = await loadLocale(locale);
  const entry = table?.[tour.slug];
  return entry ?? { includes: tour.includes, excludes: tour.excludes };
}
