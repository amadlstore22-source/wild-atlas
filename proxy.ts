import { NextRequest, NextResponse } from "next/server";

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
