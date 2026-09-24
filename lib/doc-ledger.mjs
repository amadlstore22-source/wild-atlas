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
