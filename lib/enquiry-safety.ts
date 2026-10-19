import { toursFor } from "@/lib/tours-i18n";

/**
 * What the contact route may repeat back in the confirmation email it sends to
 * the address typed into the form (security audit, 2026-10-19).
 *
 * That email is the one message a stranger can aim at someone else, and it
 * used to repeat the typed name and tour verbatim, so "name: Visit
 * http://scam.example" became a branded email from noreply@marrakechecotours.com
 * to any inbox. Typecheck and build were both happy with it; only reading the
 * route showed it.
 */

const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

/** BookingSidebar appends this when the one-day summit option is ticked. */
const ONE_DAY_SUFFIX = " (ONE-DAY SUMMIT: refuge full)";

let titles: Set<string> | null = null;
function tourTitles(): Set<string> {
  titles ??= new Set(LOCALES.flatMap((l) => toursFor(l).map((t) => t.title)));
  return titles;
}

/** True only for one of our own tour titles, in any language. */
export function isRealTourTitle(tour: string): boolean {
  if (!tour) return false;
  const base = tour.endsWith(ONE_DAY_SUFFIX) ? tour.slice(0, -ONE_DAY_SUFFIX.length) : tour;
  return tourTitles().has(base);
}

// A link, an address or markup has no business in a greeting.
const LINKISH = /https?:|www\.|@|<|>|\/\/|\b[a-z0-9-]+\.(?:com|net|org|io|ru|xyz|top|info|biz|co|me|ly|link|site|online|app|click|shop|live)\b/i;

/** The visitor's name if it is safe to greet them with, otherwise "". */
export function safeGreetingName(name: string): string {
  const n = name.trim();
  if (!n || n.length > 60 || LINKISH.test(n)) return "";
  return n;
}
