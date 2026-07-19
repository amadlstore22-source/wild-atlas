import { NextRequest, NextResponse } from "next/server";
import { SITE } from "@/lib/constants";
import { logEnquiry } from "@/lib/enquiry-log";
import { limitByIp } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sized for the real worst case: a family or group comparing several tours will
// legitimately send multiple enquiries in one sitting, and shared connections
// (a hotel, an office, a phone network behind CGNAT) put many visitors on one
// IP. 5/hour turned out to lock out genuine users, so this errs toward letting
// customers through — scripted abuse still hits the wall long before this.
const LIMIT = 15;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function sanitize(val: unknown, maxLen = 500): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, maxLen).replace(/[\r\n]{3,}/g, "\n\n");
}

/**
 * Accept an ISO date only if it is real and plausibly a future departure.
 * Anything else returns "" so the enquiry is treated as undated — a wrong date
 * should not lose us the booking.
 */
function validDate(val: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) return "";
  const d = new Date(`${val}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return "";
  // Round today down to UTC midnight so "today" is always allowed.
  const now = new Date();
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const twoYears = today + 730 * 86_400_000;
  return d.getTime() >= today && d.getTime() <= twoYears ? val : "";
}

export async function POST(req: NextRequest) {
  try {
    const limited = limitByIp(req, "contact", LIMIT, WINDOW_MS);
    if (limited) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later, or reach us on WhatsApp." },
        { status: 429, headers: { "Retry-After": String(limited.retryAfter) } },
      );
    }

    const body = await req.json();
    const type = sanitize(body.type, 20);
    const name = sanitize(body.name, 100);
    const email = sanitize(body.email, 200);
    const subject = sanitize(body.subject, 200);
    const message = sanitize(body.message, 2000);
    const tour = sanitize(body.tour, 200);
    // The picker sets min/max, but that is client-side and trivially bypassed.
    // A date in the past or absurdly far out is noise, not an enquiry — drop it
    // and treat the request as undated rather than rejecting the whole message.
    const date = validDate(sanitize(body.date, 20));
    const people = Math.max(1, Math.min(100, Number(body.people) || 1));

    if (!name || !email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      // Never tell the visitor "sent" when nothing was delivered — a dropped
      // booking inquiry is lost revenue. Surface a real error so the form shows
      // its fallback (WhatsApp/email) instead of a false success.
      console.error("[contact] RESEND_API_KEY is not configured — inquiry NOT delivered");
      return NextResponse.json(
        { error: "Email service unavailable. Please reach us on WhatsApp or by email." },
        { status: 503 },
      );
    }

    {
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
          to: [SITE.emailInbox],
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

      // "Confirm availability" implied the date might not be free. We run private
      // departures, so the date is the customer's to choose — the reply is about
      // finalising details, not checking a schedule.
      const hrs = SITE.responseHours;
      const confirmationBody =
        type === "booking"
          ? `Hi ${name},\n\nThank you for your booking inquiry for "${tour}".\n\nWe've received your request${date ? ` for ${date}` : ""} and one of our guides will get back to you within ${hrs} hours to confirm your dates and go through the details.\n\nWe run private departures, so we build the trip around the dates you want.\n\nFor faster responses, you can also reach us on WhatsApp.\n\nBest regards,\nThe Marrakech Eco Tours Team`
          : `Hi ${name},\n\nThank you for getting in touch with Marrakech Eco Tours.\n\nWe've received your message and will reply to ${email} within ${hrs} hours. For urgent inquiries, WhatsApp is the fastest way to reach us.\n\nBest regards,\nThe Marrakech Eco Tours Team`;

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

    // Internal record, written after the emails so it can never delay or block
    // delivery. logEnquiry swallows all its own failures by design.
    await logEnquiry({ type, name, email, tour, date, people, subject, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unhandled error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
