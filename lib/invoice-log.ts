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
