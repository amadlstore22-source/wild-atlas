import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/constants";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(val: unknown, maxLen = 500): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, maxLen).replace(/[\r\n]{3,}/g, "\n\n");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const type = sanitize(body.type, 20);
    const name = sanitize(body.name, 100);
    const email = sanitize(body.email, 200);
    const subject = sanitize(body.subject, 200);
    const message = sanitize(body.message, 2000);
    const tour = sanitize(body.tour, 200);
    const date = sanitize(body.date, 20);
    const people = Math.max(1, Math.min(100, Number(body.people) || 1));

    if (!name || !email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const emailBody =
        type === "booking"
          ? `New booking inquiry for ${tour}:\n\nName: ${name}\nEmail: ${email}\nDate: ${date || "flexible"}\nPeople: ${people}`
          : `New contact message:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || "General"}\n\nMessage:\n${message}`;

      const adminRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Marrakech Eco Tours Contact <noreply@marrakechecotours.com>",
          to: [SITE.email],
          subject:
            type === "booking"
              ? `Booking Inquiry: ${tour} from ${name}`
              : `Contact: ${subject || "General message"} from ${name}`,
          text: emailBody,
          reply_to: email,
        }),
      });
      if (!adminRes.ok) {
        const detail = await adminRes.text().catch(() => "");
        console.error("[contact] Resend admin error", adminRes.status, detail);
      }

      const confirmationBody =
        type === "booking"
          ? `Hi ${name},\n\nThank you for your booking inquiry for "${tour}".\n\nWe've received your request and one of our guides will get back to you within 24 hours to confirm availability and next steps.\n\nFor faster responses, you can also reach us on WhatsApp.\n\nBest regards,\nThe Marrakech Eco Tours Team`
          : `Hi ${name},\n\nThank you for getting in touch with Marrakech Eco Tours.\n\nWe've received your message and will reply to ${email} within 24 hours. For urgent inquiries, WhatsApp is the fastest way to reach us.\n\nBest regards,\nThe Marrakech Eco Tours Team`;

      const confirmRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Marrakech Eco Tours <noreply@marrakechecotours.com>",
          to: [email],
          subject:
            type === "booking"
              ? `We received your booking inquiry — ${tour}`
              : "We received your message — Marrakech Eco Tours",
          text: confirmationBody,
          reply_to: SITE.email,
        }),
      });
      if (!confirmRes.ok) {
        const detail = await confirmRes.text().catch(() => "");
        console.error("[contact] Resend confirmation error", confirmRes.status, detail);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unhandled error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
