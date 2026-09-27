import { NextRequest, NextResponse } from "next/server";
import { blogPostsFor } from "@/lib/blog-i18n";
import { getTourFor } from "@/lib/tours-i18n";
import { limitByIp } from "@/lib/rate-limit";
import { isCrossOrigin } from "@/lib/request-origin";
// Type-only: dictionaries.ts is `server-only`, which the test runner cannot load.
import type { Locale } from "@/app/[lang]/dictionaries";

const LANGS: readonly string[] = ["en", "fr", "es", "de", "it", "ar"] satisfies Locale[];
const isLang = (l: string): l is Locale => LANGS.includes(l);

/**
 * Anonymous count of clicks on the blog trip box, for every visitor.
 *
 * GA4's blog_trip_box_click only fires after "Accept all", so it undercounts
 * by however many readers choose "Necessary only". This records the click
 * itself and nothing about the person: date, locale, post, tour. No cookie,
 * no IP, no identifier is stored or read, which is what lets it run without
 * consent (see "Cookieless Measurement" in the cookie policy).
 *
 * Rows go to the "Trip box clicks" tab of the enquiry sheet. The secret is
 * sent as `clickSecret`, NOT `secret`, on purpose: the enquiry script from
 * before this feature checks `data.secret`, so it rejects these instead of
 * appending them to the enquiries tab as blank "Contact" rows. Only the
 * updated script in docs/ENQUIRY_SHEET_SETUP.md accepts them.
 */
const TIMEOUT_MS = 4000;

export async function POST(req: NextRequest) {
  if (isCrossOrigin(req)) return new NextResponse(null, { status: 403 });
  // The limiter's IP map is in memory and never persisted or logged.
  if (limitByIp(req, "click", 60, 60 * 60 * 1000)) return new NextResponse(null, { status: 429 });

  let body: { lang?: unknown; post?: unknown; tour?: unknown };
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const { lang, post, tour } = body;
  // Only real post/tour pairs are recorded, so the sheet cannot be filled
  // with junk by anyone replaying the endpoint.
  if (
    typeof lang !== "string" || !isLang(lang) ||
    typeof post !== "string" || typeof tour !== "string" ||
    !blogPostsFor(lang).some((p) => p.slug === post) ||
    !getTourFor(lang, tour)
  ) {
    return new NextResponse(null, { status: 400 });
  }

  const url = process.env.SHEET_WEBHOOK_URL;
  const secret = process.env.SHEET_WEBHOOK_SECRET;
  if (url && secret) {
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "click", clickSecret: secret, at: new Date().toISOString(), lang, post, tour }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
        redirect: "follow",
      });
    } catch (err) {
      console.error("[click] could not write to sheet:", err);
    }
  }
  return new NextResponse(null, { status: 204 });
}
