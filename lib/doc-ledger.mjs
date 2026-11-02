/**
 * The document ledger: what has been issued, and what number comes next.
 *
 * WHY THIS EXISTS
 * Two clients were issued MET-2026-001. The ledger had been cleared during
 * development, numbering restarted at 001, and nothing noticed — a duplicated
 * invoice number is the one error a customer spots immediately.
 *
 * Separately, contract numbers were hardcoded in the generator script and
 * recorded nowhere at all, so the next contract would have reused whatever
 * string happened to be in the file.
 *
 * TWO SERIES, NOT ONE
 * An invoice and a contract are different documents and are numbered
 * separately, the way an accountant expects:
 *
 *   INV-2026-001   invoices
 *   CON-2026-001   contracts
 *
 * They can legitimately share a sequence position — Andrés's booking has
 * both INV-2026-001 and CON-2026-001 — because they are different series. What
 * must never happen is two invoices sharing INV-2026-001.
 *
 * THE FILE IS THE SOURCE OF TRUTH AND IT IS NOT IN GIT
 * data/documents.json holds customer names and amounts, so it is gitignored.
 * That makes it the one piece of state that only exists on this machine.
 * `nextNumber` therefore also scans what is ALREADY in the ledger rather than
 * trusting a stored counter, so a hand-edit or a partial restore cannot silently
 * reissue a number.
 */
import fs from "node:fs";
import path from "node:path";

/** Document kinds, and the prefix each series uses. */
export const SERIES = {
  invoice: "INV",
  contract: "CON",
  quote: "QUO",
};

export function ledgerPath(root) {
  return path.join(root, "data", "documents.json");
}

export function readLedger(root) {
  const p = ledgerPath(root);
  if (!fs.existsSync(p)) return { documents: [] };
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(p, "utf8"));
  } catch (err) {
    throw new Error(
      `data/documents.json is not valid JSON (${err.message}). Fix it rather ` +
        `than deleting it — deleting restarts numbering and can reissue a ` +
        `number already given to a customer.`,
    );
  }
  if (!Array.isArray(parsed.documents)) {
    throw new Error("data/documents.json has no `documents` array");
  }
  return parsed;
}

export function writeLedger(root, ledger) {
  const p = ledgerPath(root);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(ledger, null, 2) + "\n", "utf8");
}

/**
 * The next free number in a series, e.g. "INV-2026-003".
 *
 * Derived by scanning every number already recorded for that series and year,
 * never from a stored counter: a counter and a list can disagree, and when they
 * do the list is what the customer is holding.
 */
export function nextNumber(ledger, kind, year) {
  const prefix = SERIES[kind];
  if (!prefix) throw new Error(`unknown document kind "${kind}"`);

  const head = `${prefix}-${year}-`;
  let max = 0;
  for (const d of ledger.documents) {
    if (typeof d.number !== "string" || !d.number.startsWith(head)) continue;
    const n = Number(d.number.slice(head.length));
    if (Number.isFinite(n) && n > max) max = n;
  }
  return `${head}${String(max + 1).padStart(3, "0")}`;
}

/** True when this exact number has already been issued. */
export function isTaken(ledger, number) {
  return ledger.documents.some((d) => d.number === number);
}

/**
 * Record a document. Refuses to reuse a number rather than overwrite silently:
 * the duplicate is the failure, and a loud one is recoverable.
 */
export function record(ledger, entry, { replace = false } = {}) {
  if (!entry.number) throw new Error("a ledger entry needs a number");

  const existing = ledger.documents.findIndex((d) => d.number === entry.number);

  if (existing !== -1) {
    /**
     * `replace` is for RE-RENDERING one document, not for reusing its
     * number on a different booking. The caller (scripts/make-invoice.mjs
     * --reissue) has already checked that the client name matches; this
     * second check is here because a ledger that trusts its callers stops
     * being a ledger.
     */
    const held = ledger.documents[existing];
    if (!replace) {
      throw new Error(
        `${entry.number} has already been issued (to ${
          held.clientName ?? "an earlier client"
        }). Numbers are never reused.`,
      );
    }
    if (
      String(held.clientName).trim().toLowerCase() !==
      String(entry.clientName).trim().toLowerCase()
    ) {
      throw new Error(
        `refusing to replace ${entry.number}: it belongs to ${held.clientName}, ` +
          `not ${entry.clientName}.`,
      );
    }

    /* Keep the ORIGINAL issue record visible. An invoice that has been
       re-sent has a history, and overwriting it without trace is how a
       ledger stops being able to answer "what did we send them?". */
    ledger.documents[existing] = {
      ...held,
      ...entry,
      recordedAt: new Date().toISOString(),
      firstRecordedAt: held.firstRecordedAt ?? held.recordedAt,
      reissues: (held.reissues ?? 0) + 1,
    };
    return ledger;
  }

  ledger.documents.push({ recordedAt: new Date().toISOString(), ...entry });
  return ledger;
}

/**
 * Who the invoice is billed to, as lines: the entity's name first.
 *
 * `arg` is the --bill-to value: "Name|address|registration|signatory".
 * "none" drops a billed entity the ledger holds. Not given on a --reissue,
 * the ledger's entity is KEPT: a "balance paid" reissue that forgot the flag
 * would otherwise turn a company's invoice back into a personal one without
 * anyone noticing (INV-2026-040, a group billed to the firm paying for it).
 */
export function billToFor(held, arg) {
  if (arg === true) throw new Error('--bill-to needs a value: "Company|Address|Registration no.|Represented by ..."');
  if (typeof arg === "string") {
    if (arg.trim().toLowerCase() === "none") return undefined;
    const lines = arg.split("|").map((s) => s.trim()).filter(Boolean);
    if (!lines.length) throw new Error("--bill-to is empty");
    return lines;
  }
  return Array.isArray(held?.billTo) && held.billTo.length ? held.billTo : undefined;
}

/**
 * Whether this run may write the booking into bookings26.
 *
 * bookings26 finds a re-sent invoice by the number in its INVOICE column and
 * updates that row; when no row carries the number it adds a NEW one. A
 * booking the team typed by hand has no number there, so reissuing it would
 * put the same trip in the sheet twice. INV-2026-040 (a 9 Nov group) is
 * exactly that: issued on 18 Oct, before bookings26 was automated (27 Oct),
 * and typed in by the team with the INVOICE cell empty.
 *
 * So a reissue goes to bookings26 only when the ledger records that this
 * script placed the invoice there (`bookingsPlaced`), or when the owner
 * passes --bookings after putting the invoice number in the row.
 */
export function bookingsDecision({ reissue, held, force }) {
  if (!reissue) return { send: true };
  if (force) return { send: true, why: "--bookings" };
  if (held?.bookingsPlaced) return { send: true, why: "placed by this script before" };
  return {
    send: false,
    why:
      "this invoice was never placed in bookings26 by this script (typed by " +
      "hand, or issued before the automation), so sending it would add a " +
      "second row for the same booking. If its row there shows the invoice " +
      "number in the INVOICE column, run again with --bookings to update it.",
  };
}
