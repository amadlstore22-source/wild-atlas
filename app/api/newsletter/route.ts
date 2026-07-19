import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/constants";
import { limitByIp } from "@/lib/rate-limit";
import { isCrossOrigin } from "@/lib/request-origin";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// This route mails the address it is given, so it stays tighter than the
// contact form — but nobody legitimately subscribes 3 times, and shared IPs
// mean several real visitors can arrive from one address.
const LIMIT = 8;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req: NextRequest) {
  try {
    // This route mails an arbitrary address, so a cross-origin caller could use
    // it to send our branded mail to anyone. Refused before the rate limiter.
    if (isCrossOrigin(req)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const limited = limitByIp(req, "newsletter", LIMIT, WINDOW_MS);
    if (limited) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(limited.retryAfter) } },
      );
    }

    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error("[newsletter] RESEND_API_KEY is not configured — subscriber NOT captured");
      return NextResponse.json(
        { error: "Subscription service unavailable. Please try again later." },
        { status: 503 },
      );
    }

    {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Marrakech Eco Tours <noreply@marrakechecotours.com>",
          to: [SITE.emailInbox],
          subject: `New newsletter subscriber: ${email}`,
          text: `A new visitor subscribed to the newsletter.\n\nEmail: ${email}\n\nAdd to your mailing list.`,
        }),
      });

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Marrakech Eco Tours <noreply@marrakechecotours.com>",
          to: [email],
          reply_to: SITE.email,
          subject: "Welcome — you're on the list",
          text: `Hi there,\n\nThanks for subscribing to the Marrakech Eco Tours newsletter. We'll send you occasional travel tips, seasonal highlights from the Atlas Mountains and Sahara, and exclusive tour offers.\n\nNo spam. Unsubscribe anytime by replying to this email.\n\nBest,\nThe Marrakech Eco Tours Team`,
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] unhandled error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
