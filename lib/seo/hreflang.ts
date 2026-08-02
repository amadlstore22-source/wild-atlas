import type { Locale } from "@/app/[lang]/dictionaries";

const BASE = "https://marrakechecotours.com";

/** The locale Google falls back to when none of the alternates match the user's
 *  language. Declared here rather than imported from app/[lang]/dictionaries:
 *  that module is "server-only", and importing it would drag the server guard
 *  into every consumer — including the unit tests, which cannot load it. */
const X_DEFAULT_LOCALE = "en" as Locale;

/**
 * Build the `alternates.languages` map for a page, including `x-default`.
 *
 * Every hreflang set needs an x-default entry naming the fallback for users
 * whose language matches none of the alternates — without it a French-Canadian
 * or Japanese visitor gets no signal about which version to serve. It is not a
 * locale, so it can never come from mapping over LOCALES; it has to be added
 * explicitly, which is why nine route groups silently omitted it while the two
 * hand-written object literals had it.
 *
 * `urlFor` returns the path segment for a locale, so callers whose URL differs
 * per locale (blog posts with a localizedSlug) stay correct: each alternate
 * names that locale's real URL rather than the requesting locale's spelling.
 * Pointing alternates at the wrong spelling breaks reciprocity, and Google
 * discards hreflang clusters that do not point back at each other.
 */
export function hreflangLanguages(
  locales: readonly Locale[],
  urlFor: (locale: Locale) => string
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = urlFor(locale);
  }
  languages["x-default"] = urlFor(X_DEFAULT_LOCALE);
  return languages;
}

/**
 * Convenience wrapper for the common case: a path that is identical in every
 * locale apart from the leading /<lang> segment.
 *
 * `path` must start with a slash and must not include the locale, e.g. "/about"
 * or `/tours/${slug}`. Pass "" for a locale home page.
 */
export function hreflangForPath(
  locales: readonly Locale[],
  path: string
): Record<string, string> {
  return hreflangLanguages(locales, (l) => `${BASE}/${l}${path}`);
}
