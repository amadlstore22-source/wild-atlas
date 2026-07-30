/**
 * Logs enquiries to a Google Sheet via an Apps Script Web App.
 *
 * DESIGN RULE: this must never affect the customer. The sheet is an internal
 * record; email is the delivery mechanism that actually matters. Every failure
 * here — missing config, Google down, bad response, timeout — is swallowed and
 * logged server-side. A booking must never be lost because a spreadsheet was
 * unreachable.
 *
 * Setup lives in docs/ENQUIRY_SHEET_SETUP.md.
 *
 * Env:
 *   SHEET_WEBHOOK_URL     Apps Script /exec URL
 *   SHEET_WEBHOOK_SECRET  shared string, must match the script
 */

export interface EnquiryRecord {
  type: string;
  name: string;
  email: string;
  tour?: string;
  date?: string;
  people?: number;
  subject?: string;
  message?: string;
}

/** Apps Script can be slow to wake. Past this we give up rather than hold the
 *  customer's request open — they are waiting on this response. */
const TIMEOUT_MS = 4000;

export async function logEnquiry(record: EnquiryRecord): Promise<void> {
  const url = process.env.SHEET_WEBHOOK_URL;
  const secret = process.env.SHEET_WEBHOOK_SECRET;

  // Not configured is a normal state, not an error — the site works without it.
  if (!url || !secret) return;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        receivedAt: new Date().toISOString(),
        ...record,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      // Apps Script answers with a 302 to script.googleusercontent.com.
      redirect: "follow",
    });

    if (!res.ok) {
      console.error(`[enquiry-log] sheet rejected the row: ${res.status}`);
    }
  } catch (err) {
    // Includes the timeout. Deliberately does NOT log `record`: it holds the
    // name, email, travel dates, group size and free-text message, and Vercel
    // runtime logs have their own retention and a wider audience than the
    // inbox. The enquiry is already delivered by email before this runs, so the
    // sheet is a convenience copy — enough to know it failed and for which
    // enquiry type, not a reason to spill a customer record into logs.
    console.error(
      `[enquiry-log] could not write to sheet (type=${record.type}, tour=${record.tour || "n/a"}):`,
      err,
    );
  }
}
