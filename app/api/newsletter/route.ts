import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/constants";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Marrakech Eco Tours <noreply@marrakechecotours.com>",
          to: [SITE.email],
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
