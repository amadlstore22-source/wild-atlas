import type { Metadata } from "next";
import type { Locale } from "@/app/[lang]/dictionaries";

/**
 * Open Graph fields that must survive on every page.
 *
 * Next does NOT deep-merge `openGraph` from a layout into a page: a page that
 * declares its own `openGraph` object REPLACES the layout's wholesale. Every
 * tour, blog post, destination and category page declares one to set its own
 * share image, so all of them silently dropped `og:type` and `og:site_name`
 * that the layout defines -- 380 of 962 built pages shipped with no og:type.
 *
 * `og:locale` was missing everywhere, including the layout. Without it,
 * Facebook, WhatsApp and LinkedIn guess the language of a shared link, and
 * five of our six locales are non-English. WhatsApp sharing matters a lot for
 * a Morocco tour business.
 *
 * Spread `ogBase(lang)` first in a page's `openGraph`, then add page-specific
 * fields:
 *
 *   openGraph: { ...ogBase(lang), title, description, images: [...] }
 */

/** Open Graph locale codes. og:locale wants language_TERRITORY, not a bare code. */
const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
  de: "de_DE",
  it: "it_IT",
  ar: "ar_MA", // Moroccan Arabic — the audience is Morocco, not the Gulf
};

export const SITE_NAME = "Marrakech Eco Tours";

/**
 * The fields every page shares. `type` defaults to "website"; pass "article"
 * for blog posts so they render as articles rather than generic pages.
 */
export function ogBase(
  lang: string,
  type: "website" | "article" = "website"
): NonNullable<Metadata["openGraph"]> {
  const locale = OG_LOCALE[lang as Locale] ?? OG_LOCALE.en;
  return {
    type,
    siteName: SITE_NAME,
    locale,
    // Tell crawlers the same page exists in the other languages. Paired with
    // the hreflang alternates each page already sets in `alternates`.
    alternateLocale: Object.values(OG_LOCALE).filter((l) => l !== locale),
  };
}
