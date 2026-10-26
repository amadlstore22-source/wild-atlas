import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { buildBrief, parseSuppliers, sheetColumns, type BriefInput } from "@/lib/logistics-brief";

/**
 * THE INCIDENT (INV-2026-033, 26 Oct 2026): the invoice
 * promised dinner at Trigados Camp with a reserved family table, live music
 * and a fire show. Those promises existed only on the client's PDF. The
 * Invoices sheet the logistics team reads had no column for them, and the
 * Apps Script silently dropped the notes field we did send. The driver took
 * the family to another camp; they reached Trigados after it was full, ate a
 * cold dinner and missed both shows. The client asked for 50% back.
 *
 * Nothing caught it: the PDF was right, the sheet row was "right" for the
 * columns it had, and the gap was between two systems. These tests pin the
 * three things that close it:
 *   1. make-invoice refuses to run without --suppliers;
 *   2. every named supplier, the pick-up and every promise reach the brief and
 *      the sheet columns;
 *   3. the Apps Script really has those columns and writes them, both on a
 *      new row and when an invoice is re-sent.
 */
const ollivier: BriefInput = {
  number: "INV-2026-033",
  clientName: "Émilie Test",
  clientPhone: "+33 6 00 00 00 00",
  tourTitle: "Private Day Trip — Lalla Takerkoust Lake & Agafay Desert",
  departure: "2026-10-26",
  ret: "2026-10-26",
  people: 6,
  language: "French",
  pickup: "Parking El Moukef, 11:00",
  suppliers: parseSuppliers("Lunch: Menzah La Floride (lake view)|Dinner: Trigados Camp, reserved family table|Camel ride ~1h at sunset"),
  includes: ["Live Berber music and fire show", "Mineral water all day"],
  notes: "Family of 6, 4 children. No quad or buggy.",
};

describe("logistics brief", () => {
  it("names every supplier, the pick-up and every promise", () => {
    const brief = buildBrief(ollivier);
    for (const s of [...ollivier.suppliers, ...ollivier.includes!, "Parking El Moukef, 11:00", "+33 6 00 00 00 00", "French", "No quad or buggy"]) {
      expect(brief, `the brief must mention "${s}"`).toContain(s);
    }
    expect(brief).toContain("Mon, 26 Oct 2026");
  });

  it("flags a missing pick-up instead of leaving it blank", () => {
    expect(buildBrief({ ...ollivier, pickup: undefined })).toContain("Pick-up: TO CONFIRM WITH CLIENT");
  });

  it("puts the suppliers and promises in the sheet columns", () => {
    const c = sheetColumns(ollivier);
    expect(c.pickup).toBe("Parking El Moukef, 11:00");
    expect(c.suppliers).toContain("Trigados Camp, reserved family table");
    expect(c.details).toContain("Live Berber music and fire show");
    expect(sheetColumns({ ...ollivier, suppliers: ["standard"] }).suppliers).toBe("Standard partners");
  });
});

describe("the sheet script writes the logistics columns", () => {
  const gs = readFileSync(path.join(process.cwd(), "docs/apps-script.gs"), "utf8");
  it("has the three columns, after the original twelve", () => {
    const headers = gs.match(/const INVOICE_HEADERS = \[([\s\S]*?)\];/)![1];
    expect(headers.indexOf("'PDF'")).toBeLessThan(headers.indexOf("'Pickup'"));
    for (const h of ["'Pickup'", "'Suppliers booked'", "'Trip details'"]) expect(headers).toContain(h);
  });
  it("writes them on a new row and on a re-sent invoice", () => {
    const add = gs.slice(gs.indexOf("function addInvoice_"), gs.indexOf("function doGet"));
    expect(add.match(/data\.suppliers/g)?.length, "addInvoice_ must write data.suppliers twice: update + append").toBeGreaterThanOrEqual(2);
    expect(add).toContain("data.pickup");
    expect(add).toContain("data.details");
  });
});

describe("make-invoice refuses without --suppliers", () => {
  it("exits with an error naming the flag", () => {
    const r = spawnSync(process.execPath, ["scripts/make-invoice.mjs", "--name", "Test", "--tour", "T", "--people", "1", "--total", "10", "--no-sheet", "--no-pdf"], {
      cwd: process.cwd(),
      encoding: "utf8",
    });
    expect(r.status).not.toBe(0);
    expect(r.stdout + r.stderr).toContain("--suppliers");
  });
});
