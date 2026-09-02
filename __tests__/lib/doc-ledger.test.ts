import { describe, expect, it } from "vitest";
import { SERIES, isTaken, nextNumber, record } from "@/lib/doc-ledger.mjs";

/**
 * TWO CLIENTS WERE ISSUED THE SAME REFERENCE.
 *
 * Andrés Gutiérrez Peña and Katrin Vogelsang both received MET-2026-001. The
 * ledger had been cleared during development, numbering restarted at 001, and
 * nothing objected — a duplicated invoice number is the one error a customer
 * notices immediately, and it makes the operator's records unusable.
 *
 * A second, quieter fault sat alongside it: contract numbers were a string
 * literal in the generator script (`reference: "MET-2026-001"`) and were
 * recorded nowhere at all. The next contract would have reused that number
 * without any step in the process noticing.
 *
 * WHY TWO SERIES
 * Invoices and contracts are numbered separately, as an accountant expects:
 * INV-2026-001 and CON-2026-001 can both exist for one booking. What must never
 * exist is two INV-2026-001.
 *
 * These tests pin the numbering rules, because the ledger is a gitignored local
 * file — there is no remote copy to fall back on if it goes wrong.
 */

type Doc = {
  kind: string;
  number: string;
  clientName: string;
  issued?: string;
  /** Stamped by record(); absent on fixtures built by hand. */
  recordedAt?: string;
};
const ledgerOf = (documents: Doc[]) => ({ documents });

describe("document series", () => {
  it("keeps invoices and contracts in separate series", () => {
    expect(SERIES.invoice).toBe("INV");
    expect(SERIES.contract).toBe("CON");
    expect(SERIES.invoice).not.toBe(SERIES.contract);
  });

  it("lets one booking hold the same position in both series", () => {
    // Andrés has INV-2026-001 and CON-2026-001. That is correct.
    const l = ledgerOf([
      { kind: "invoice", number: "INV-2026-001", clientName: "A" },
      { kind: "contract", number: "CON-2026-001", clientName: "A" },
    ]);
    expect(nextNumber(l, "invoice", "2026")).toBe("INV-2026-002");
    expect(nextNumber(l, "contract", "2026")).toBe("CON-2026-002");
  });

  it("rejects an unknown kind rather than inventing a prefix", () => {
    expect(() => nextNumber(ledgerOf([]), "receipt", "2026")).toThrow(/unknown document kind/);
  });
});

describe("numbering", () => {
  it("starts at 001 for an empty series", () => {
    expect(nextNumber(ledgerOf([]), "invoice", "2026")).toBe("INV-2026-001");
  });

  it("continues from the HIGHEST existing number, not the count", () => {
    // Counting entries would return 003 here and collide with the existing one.
    const l = ledgerOf([
      { kind: "invoice", number: "INV-2026-001", clientName: "A" },
      { kind: "invoice", number: "INV-2026-003", clientName: "C" },
    ]);
    expect(nextNumber(l, "invoice", "2026")).toBe("INV-2026-004");
  });

  it("restarts each year", () => {
    const l = ledgerOf([{ kind: "invoice", number: "INV-2026-009", clientName: "A" }]);
    expect(nextNumber(l, "invoice", "2027")).toBe("INV-2027-001");
  });

  it("ignores the other series when counting", () => {
    // Twelve contracts must not push the next invoice to 013.
    const l = ledgerOf(
      Array.from({ length: 12 }, (_, i) => ({
        kind: "contract",
        number: `CON-2026-${String(i + 1).padStart(3, "0")}`,
        clientName: "X",
      })),
    );
    expect(nextNumber(l, "invoice", "2026")).toBe("INV-2026-001");
  });

  it("pads to three digits so numbers sort correctly", () => {
    expect(nextNumber(ledgerOf([]), "invoice", "2026")).toMatch(/-\d{3}$/);
  });
});

describe("never reissuing a number", () => {
  it("detects a number already held, in either series", () => {
    const l = ledgerOf([
      { kind: "invoice", number: "INV-2026-001", clientName: "Andrés" },
    ]);
    expect(isTaken(l, "INV-2026-001")).toBe(true);
    expect(isTaken(l, "INV-2026-002")).toBe(false);
  });

  it("refuses to record a duplicate, and names who holds it", () => {
    // The failure this whole module exists for. The error must say WHO already
    // has the number, because the operator's next question is always that.
    const l = ledgerOf([
      { kind: "invoice", number: "INV-2026-001", clientName: "Andrés Gutiérrez Peña" },
    ]);
    expect(() =>
      record(l, { kind: "invoice", number: "INV-2026-001", clientName: "Katrin Vogelsang" }),
    ).toThrow(/Andrés Gutiérrez Peña/);
  });

  it("refuses an entry with no number at all", () => {
    expect(() => record(ledgerOf([]), { kind: "invoice", clientName: "X" })).toThrow(
      /needs a number/,
    );
  });

  it("appends a good entry and leaves the next number free", () => {
    const l = ledgerOf([]);
    record(l, { kind: "invoice", number: "INV-2026-001", clientName: "A" });
    expect(l.documents).toHaveLength(1);
    expect(nextNumber(l, "invoice", "2026")).toBe("INV-2026-002");
  });

  it("stamps when the record was written", () => {
    // Without this the ledger cannot be reconciled against the sheet later.
    const l = ledgerOf([]);
    record(l, { kind: "invoice", number: "INV-2026-001", clientName: "A" });
    expect(l.documents[0].recordedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });
});
