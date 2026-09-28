/**
 * A date in the page's own language. Every caller used to hardcode "en-GB",
 * so German, French and Arabic pages printed English month names.
 * `ar-MA` keeps Latin digits, as the rest of the Arabic site does; English
 * stays British ("30 July 2026"), as it was before this was localised.
 */
export const intlLocale = (lang: string) => (lang === "ar" ? "ar-MA" : lang === "en" ? "en-GB" : lang);

export function formatDate(iso: string, lang: string, month: "long" | "short" = "long"): string {
  try {
    return new Date(iso).toLocaleDateString(intlLocale(lang), { day: "numeric", month, year: "numeric" });
  } catch {
    return "";
  }
}
