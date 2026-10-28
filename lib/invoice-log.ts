/**
 * Records an invoice as a row in the Invoices tab of the enquiry spreadsheet.
 *
 * Deliberately mirrors lib/enquiry-log.ts: same Apps Script Web App, same
 * shared secret, same "never break the caller" rule. The difference is the
 * `kind: "invoice"` discriminator, which the script uses to pick the tab.
 *
 * WHY A SEPARATE TAB AND NOT MORE COLUMNS
 * An invoice carries amount, deposit, balance and paid-status; an enquiry
 * carries message, travel date and group size. Sharing one tab leaves half the
 * columns blank on every row and makes both impossible to filter or total.
 *
 * UNLIKE THE ENQUIRY LOG, A FAILURE HERE IS REPORTED.
 * logEnquiry swallows everything because a customer is waiting on the response
 * and the enquiry is already delivered by email. This runs from a local script
 * with nobody waiting, and a silently unrecorded invoice is exactly the gap
 * this system exists to close — so the caller is told, and decides.
 */

export interface InvoiceRecord {
  number: string;
  issued: string;
  clientName: string;
  clientEmail: string;
  tour: string;
  departure?: string;
  people: number;
  /** EUR cents. */
  total: number;
  deposit: number;
  balance: number;
  status?: string;
  pdfPath?: string;
  notes?: string;
  /** For the logistics team (see lib/logistics-brief.ts). The Apps Script
   *  writes these to the Pickup / Suppliers booked / Trip details columns. */
  pickup?: string;
  suppliers?: string;
  details?: string;
  clientPhone?: string;
}

/**
 * Places the booking in the logistics team's own sheet, bookings26: the month
 * tab of the departure, one value per column (docs/apps-script-bookings.gs).
 *
 * Separate from logInvoice because it is a different spreadsheet with its own
 * Apps Script web app. The team plans from bookings26, not from the Invoices
 * tab, which is why the camp promised on INV-2026-033 never reached them.
 * Same secret as the Invoices log; the URL is BOOKINGS_WEBHOOK_URL.
 */
export async function logBooking(record: InvoiceRecord): Promise<LogResult & { tab?: string; row?: number; updated?: boolean; kept?: string[]; moneyLocked?: boolean; sorted?: string }> {
  const url = process.env.BOOKINGS_WEBHOOK_URL;
  const secret = process.env.SHEET_WEBHOOK_SECRET;
  if (!url || !secret) {
    return {
      ok: false,
      reason: "unconfigured",
      detail: "BOOKINGS_WEBHOOK_URL is not set. See docs/INVOICE_SHEET_SETUP.md (bookings26).",
    };
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        kind: "invoice",
        ...record,
        depositEur: (record.deposit / 100).toFixed(2),
        balanceEur: (record.balance / 100).toFixed(2),
        totalEur: (record.total / 100).toFixed(2),
      }),
      // The sheet waits up to 30 s for the lock, then writes and sorts the
      // month tab (a rehearsal copy plus the real sort). Giving up earlier
      // would report "not placed" for a booking that did land, and invite a
      // second copy typed by hand.
      signal: AbortSignal.timeout(90_000),
      redirect: "follow",
    });
    if (!res.ok) return { ok: false, reason: "http", detail: `bookings26 returned ${res.status}` };
    const text = await res.text();
    let j: { ok?: boolean; error?: string; tab?: string; row?: number; updated?: boolean; kept?: string[]; moneyLocked?: boolean; sorted?: string } = {};
    try { j = JSON.parse(text); } catch { return { ok: false, reason: "rejected", detail: text.slice(0, 200) }; }
    if (!j.ok) return { ok: false, reason: "rejected", detail: j.error ?? text.slice(0, 200) };
    return { ok: true, tab: j.tab, row: j.row, updated: j.updated, kept: j.kept, moneyLocked: j.moneyLocked, sorted: j.sorted };
  } catch (err) {
    return { ok: false, reason: "network", detail: err instanceof Error ? err.message : String(err) };
  }
}

const TIMEOUT_MS = 10_000;

export interface LogResult {
  ok: boolean;
  /** Why it did not record. "unconfigured" is a normal state, not a fault. */
  reason?: "unconfigured" | "http" | "network" | "rejected";
  detail?: string;
}

export async function logInvoice(record: InvoiceRecord): Promise<LogResult> {
  const url = process.env.SHEET_WEBHOOK_URL;
  const secret = process.env.SHEET_WEBHOOK_SECRET;

  if (!url || !secret) {
    return {
      ok: false,
      reason: "unconfigured",
      detail:
        "SHEET_WEBHOOK_URL / SHEET_WEBHOOK_SECRET are not set. See docs/ENQUIRY_SHEET_SETUP.md.",
    };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        kind: "invoice",
        receivedAt: new Date().toISOString(),
        ...record,
        // Sent as decimal strings so the sheet stores money as a number a
        // person can sum, rather than cents nobody will remember to divide.
        totalEur: (record.total / 100).toFixed(2),
        depositEur: (record.deposit / 100).toFixed(2),
        balanceEur: (record.balance / 100).toFixed(2),
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      redirect: "follow",
    });

    if (!res.ok) {
      return { ok: false, reason: "http", detail: `sheet returned ${res.status}` };
    }

    // Apps Script answers 200 with {ok:false} when the secret is wrong, so a
    // 200 alone does not prove the row landed.
    const text = await res.text();
    if (/"ok"\s*:\s*false/.test(text)) {
      return { ok: false, reason: "rejected", detail: text.slice(0, 200) };
    }

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      reason: "network",
      detail: err instanceof Error ? err.message : String(err),
    };
  }
}
