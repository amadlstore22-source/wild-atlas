import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "fr", "es", "de", "it", "ar"];
const DEFAULT_LOCALE = "en";

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

  const { pathname } = request.nextUrl;

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon\\.ico|sitemap\\.xml|robots\\.txt|llms\\.txt).*)"],
};
