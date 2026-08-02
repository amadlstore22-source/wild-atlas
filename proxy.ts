import { NextRequest, NextResponse } from "next/server";

/* Localised blog URL segments, English slug -> locale segment.
 *
 * Must stay in sync with `localizedSlug` in lib/blog.<locale>.part*.ts —
 * __tests__/lib/blog.test.ts asserts they match, because a drift here would
 * 301 a live URL into a 404.
 *
 * Arabic is deliberately absent: Arabic-script URLs are percent-encoded to
 * unreadable byte strings when shared, which loses the readability that is the
 * only real benefit of localising the slug in the first place. */
const BLOG_SLUGS_FR: Record<string, string> = {
  "toubkal-2-day-trek-cost": "prix-trek-toubkal-2-jours",
  "toubkal-4-day-trek-cost": "prix-trek-toubkal-4-jours",
  "toubkal-circuit-ifni-lake-cost": "prix-circuit-toubkal-lac-ifni",
  "toubkal-guide-cost": "prix-guide-toubkal",
  "marrakech-to-chefchaouen-tour-cost": "prix-circuit-marrakech-chefchaouen",
  "3-day-sahara-tour-cost-marrakech": "prix-circuit-sahara-3-jours-marrakech",
  "sahara-tour-from-agadir-cost": "prix-circuit-sahara-agadir",
  "family-desert-tour-morocco-cost": "prix-circuit-desert-famille-maroc",
};

const BLOG_SLUGS_ES: Record<string, string> = {
  "toubkal-2-day-trek-cost": "precio-trek-toubkal-2-dias",
  "toubkal-4-day-trek-cost": "precio-trek-toubkal-4-dias",
  "toubkal-circuit-ifni-lake-cost": "precio-circuito-toubkal-lago-ifni",
  "toubkal-guide-cost": "precio-guia-toubkal",
  "marrakech-to-chefchaouen-tour-cost": "precio-tour-marrakech-chefchaouen",
  "3-day-sahara-tour-cost-marrakech": "precio-tour-sahara-3-dias-marrakech",
  "sahara-tour-from-agadir-cost": "precio-tour-sahara-agadir",
  "family-desert-tour-morocco-cost": "precio-tour-desierto-familia-marruecos",
};

const BLOG_SLUGS_DE: Record<string, string> = {
  "toubkal-2-day-trek-cost": "toubkal-trek-2-tage-kosten",
  "toubkal-4-day-trek-cost": "toubkal-trek-4-tage-kosten",
  "toubkal-circuit-ifni-lake-cost": "toubkal-runde-ifni-see-kosten",
  "toubkal-guide-cost": "toubkal-bergfuehrer-kosten",
  "marrakech-to-chefchaouen-tour-cost": "marrakesch-chefchaouen-tour-kosten",
  "3-day-sahara-tour-cost-marrakech": "sahara-tour-3-tage-marrakesch-kosten",
  "sahara-tour-from-agadir-cost": "sahara-tour-agadir-kosten",
  "family-desert-tour-morocco-cost": "familien-wuestentour-marokko-kosten",
};

const BLOG_SLUGS_IT: Record<string, string> = {
  "toubkal-2-day-trek-cost": "prezzo-trek-toubkal-2-giorni",
  "toubkal-4-day-trek-cost": "prezzo-trek-toubkal-4-giorni",
  "toubkal-circuit-ifni-lake-cost": "prezzo-circuito-toubkal-lago-ifni",
  "toubkal-guide-cost": "prezzo-guida-toubkal",
  "marrakech-to-chefchaouen-tour-cost": "prezzo-tour-marrakech-chefchaouen",
  "3-day-sahara-tour-cost-marrakech": "prezzo-tour-sahara-3-giorni-marrakech",
  "sahara-tour-from-agadir-cost": "prezzo-tour-sahara-agadir",
  "family-desert-tour-morocco-cost": "prezzo-tour-deserto-famiglia-marocco",
};

const LOCALES = ["en", "fr", "es", "de", "it", "ar"];
const DEFAULT_LOCALE = "en";

// Search-engine and AI crawlers. Matched loosely on purpose: a false positive
// only means a bot gets English, which is the canonical version anyway.
const CRAWLER_UA =
  /bot|crawler|spider|crawling|googlebot|bingbot|yandex|duckduckbot|baiduspider|slurp|facebookexternalhit|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkshare|w3c_validator|whatsapp|telegram|discord|gptbot|chatgpt|perplexity|claudebot|anthropic|applebot|amazonbot|ccbot/i;

function isCrawler(request: NextRequest): boolean {
  return CRAWLER_UA.test(request.headers.get("user-agent") ?? "");
}

function getLocale(request: NextRequest): string {
  const acceptLang = request.headers.get("accept-language") ?? "";
  for (const segment of acceptLang.split(",")) {
    const lang = segment.trim().split(";")[0].toLowerCase().split("-")[0];
    if (LOCALES.includes(lang)) return lang;
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (host.endsWith(".vercel.app")) {
    const url = new URL(request.url);
    url.host = "marrakechecotours.com";
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }

  // Consolidate the www host onto the bare apex, which every canonical, the
  // sitemap, and all JSON-LD already point to. Without this Googlebot indexes
  // www.* and marrakechecotours.* as separate duplicate URLs. 308 (permanent)
  // so ranking signals consolidate onto the apex.
  if (host.startsWith("www.")) {
    const url = new URL(request.url);
    url.host = host.slice(4);
    url.protocol = "https";
    return NextResponse.redirect(url, 308);
  }

  const { pathname } = request.nextUrl;

  // Redirect guessed/legacy category slugs to a real category so external links
  // (and Googlebot's URL guesses like /categories/imperial) land on a live page
  // instead of a 404. Keys are the bad slug, values the real CATEGORIES id.
  const CATEGORY_ALIASES: Record<string, string> = {
    imperial: "cultural",
    "imperial-cities": "cultural",
    culture: "cultural",
    trek: "trekking",
    trekking: "trekking",
    sahara: "desert",
    "day-trips": "day-tours",
    "day-tour": "day-tours",
  };
  // Posts whose URL segment differs per locale. English slug -> per-locale
  // segment. Only posts published from 2026-08 are listed: older posts are
  // already indexed and ranking under the English slug, and renaming those
  // would trade real positions for a marginal gain.
  //
  // Kept as a literal rather than imported from lib/blog so the edge bundle
  // does not pull in the whole 5,000-line post corpus.
  const BLOG_LOCALIZED_SLUGS: Record<string, Record<string, string>> = {
    fr: BLOG_SLUGS_FR,
    es: BLOG_SLUGS_ES,
    de: BLOG_SLUGS_DE,
    it: BLOG_SLUGS_IT,
  };
  const blogMatch = pathname.match(/^\/([a-z]{2})\/blog\/([^/]+)\/?$/);
  if (blogMatch) {
    const [, loc, slug] = blogMatch;
    const target = BLOG_LOCALIZED_SLUGS[loc]?.[slug];
    if (target && target !== slug) {
      const url = request.nextUrl.clone();
      url.pathname = `/${loc}/blog/${target}`;
      // 301: the localised URL is canonical, so consolidate signals onto it.
      return NextResponse.redirect(url, 301);
    }
  }

  const catMatch = pathname.match(/^\/([a-z]{2})\/categories\/([^/]+)\/?$/);
  if (catMatch) {
    const [, loc, slug] = catMatch;
    const target = CATEGORY_ALIASES[slug];
    if (target && target !== slug) {
      const url = request.nextUrl.clone();
      url.pathname = `/${loc}/categories/${target}`;
      return NextResponse.redirect(url, 301);
    }
  }

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  // Crawlers get the canonical default locale, never an Accept-Language guess.
  // Googlebot commonly sends "Accept-Language: it" or similar, and honouring it
  // meant /tours redirected to /it/tours — which is how 66 Italian URLs ended
  // up indexed against 25 English ones. Real users still get their language.
  const locale = isCrawler(request) ? DEFAULT_LOCALE : getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // 308, not the default 307: routing an unprefixed path to a locale is a
  // permanent decision, and Google only consolidates ranking signals through
  // a permanent redirect. A 307 leaves both URLs as separate candidates.
  return NextResponse.redirect(request.nextUrl, 308);
}

export const config = {
  // Skip Next internals, the API, and any request for a file with an extension
  // (og-image.jpg, icon.svg, the IndexNow key .txt, etc.) so static assets in
  // /public are served directly instead of being swept into the locale redirect.
  matcher: ["/((?!_next|api|.*\\.[\\w]+$).*)"],
};
