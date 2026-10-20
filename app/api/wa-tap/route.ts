import { NextRequest, NextResponse } from "next/server";
import { limitByIp } from "@/lib/rate-limit";
import { isCrossOrigin } from "@/lib/request-origin";
import { isSitePath, isWaButton } from "@/lib/whatsapp-taps";

/**
 * Anonymous count of taps on WhatsApp links, for every visitor (see
 * lib/whatsapp-taps.ts for why it records the tap and nothing about the
 * person). Rows go to the "WhatsApp taps" tab of the enquiry sheet.
 *
 * Same shape as app/api/click: the secret travels as `clickSecret`, so a copy
 * of the sheet script older than this feature rejects the row instead of
 * writing a blank enquiry. Only the script in docs/ENQUIRY_SHEET_SETUP.md
 * that knows kind "whatsapp" writes it.
 */
const TIMEOUT_MS = 4000;

export async function POST(req: NextRequest) {
  if (isCrossOrigin(req)) return new NextResponse(null, { status: 403 });
  // The limiter's IP map is in memory and never persisted or logged.
  if (limitByIp(req, "wa-tap", 60, 60 * 60 * 1000)) return new NextResponse(null, { status: 429 });

  let body: { lang?: unknown; path?: unknown; button?: unknown };
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const { path, button } = body;
  // Only a real site path and a known button name are recorded, so the sheet
  // cannot be filled with arbitrary text by anyone replaying the endpoint.
  if (!isSitePath(path) || !isWaButton(button)) return new NextResponse(null, { status: 400 });
  // The language is the path's first segment; the client's claim is not trusted.
  const lang = path.split("/")[1];

  const url = process.env.SHEET_WEBHOOK_URL;
  const secret = process.env.SHEET_WEBHOOK_SECRET;
  if (url && secret) {
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "whatsapp", clickSecret: secret, at: new Date().toISOString(), lang, path, button }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
        redirect: "follow",
      });
    } catch (err) {
      console.error("[wa-tap] could not write to sheet:", err);
    }
  }
  return new NextResponse(null, { status: 204 });
}
