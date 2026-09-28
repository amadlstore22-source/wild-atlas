/**
 * The one "Morocco from <country>" page each locale has (lib/markets.ts).
 * Kept apart from the page content because the header's language switcher
 * imports it: pulling lib/markets.ts into the client bundle would ship every
 * page's copy to every visitor. Arabic has no market page.
 */
export const MARKET_SLUG_BY_LANG: Partial<Record<string, string>> = {
  de: "deutschland-oesterreich-schweiz",
  fr: "france",
  es: "espana",
  it: "italia",
  en: "uk",
};
