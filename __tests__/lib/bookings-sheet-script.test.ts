import { describe, it, expect, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";

/**
 * docs/apps-script-bookings.gs runs inside the owner's bookings26 sheet, the
 * sheet the logistics team plans from. It writes invoice data into it by
 * itself, so a bug there could overwrite a real booking or a total. The
 * owner's rule for that sheet: "do not lose any data".
 *
 * This runs the real script against an in-memory bookings26 (month tabs,
 * headers in row 2, existing bookings, a SUM row) and pins what it may and may
 * not do. Born from INV-2026-033, where the camp promised to the client never
 * reached this sheet (see lib/logistics-brief.ts).
 */
type Cell = { v: unknown; f: string; fmt: string; note: string };
class Sheet {
  grid: Cell[][] = [];
  constructor(public name: string, public maxRows = 30, public maxCols = 11) {
    for (let r = 0; r < maxRows; r++) this.grid.push(Array.from({ length: maxCols }, () => ({ v: "", f: "", fmt: "General", note: "" })));
  }
  cell(r: number, c: number) {
    while (this.grid.length < r) this.grid.push(Array.from({ length: this.maxCols }, () => ({ v: "", f: "", fmt: "General", note: "" })));
    for (const row of this.grid) while (row.length < c) row.push({ v: "", f: "", fmt: "General", note: "" });
    this.maxRows = Math.max(this.maxRows, this.grid.length);
    this.maxCols = Math.max(this.maxCols, this.grid[0].length);
    return this.grid[r - 1][c - 1];
  }
  getName() { return this.name; }
  setName(n: string) { this.name = n; return this; }
  getMaxRows() { return this.maxRows; }
  getMaxColumns() { return this.maxCols; }
  getLastRow() { let l = 0; this.grid.forEach((row, i) => { if (row.some((c) => c.v !== "" || c.f !== "")) l = i + 1; }); return l; }
  getLastColumn() { let l = 0; for (const row of this.grid) row.forEach((c, i) => { if (c.v !== "" || c.f !== "") l = Math.max(l, i + 1); }); return l; }
  insertRowAfter() { this.cell(this.maxRows + 1, 1); }
  copyTo(ss: Spreadsheet) { const s = new Sheet(this.name + " copy", this.maxRows, this.maxCols); s.grid = this.grid.map((r) => r.map((c) => ({ ...c }))); ss.sheets.push(s); return s; }
  getRange(r: number, c: number, nr = 1, nc = 1) {
    const cells = () => Array.from({ length: nr }, (_, i) => Array.from({ length: nc }, (_, j) => this.cell(r + i, c + j)));
    const range = {
      getValues: () => cells().map((row) => row.map((x) => x.v)),
      getFormulas: () => cells().map((row) => row.map((x) => x.f)),
      getValue: () => this.cell(r, c).v,
      setValue: (v: unknown) => { this.cell(r, c).v = v; return range; },
      setValues: (vs: unknown[][]) => { vs.forEach((row, i) => row.forEach((v, j) => { this.cell(r + i, c + j).v = v; })); return range; },
      getNumberFormat: () => this.cell(r, c).fmt,
      setNumberFormat: (f: string) => { this.cell(r, c).fmt = f; return range; },
      setFontWeight: () => range,
      getNote: () => this.cell(r, c).note,
      setNote: (n: string) => { this.cell(r, c).note = n; return range; },
      clearContent: () => { cells().flat().forEach((x) => { x.v = ""; x.f = ""; }); return range; },
      clearNote: () => { cells().flat().forEach((x) => { x.note = ""; }); return range; },
    };
    return range;
  }
}
class Spreadsheet { sheets: Sheet[] = []; getSheets() { return this.sheets; } }

const HEAD = ["TOUR BOOKED", "DATE", "EMAILS", "CLIENTE", "PAYMENT", "DEPOSIT", "AMOUNT LEFT", "PICK UP - DROP OFF", "DRIVER", "accomodation"];
function monthTab(name: string, bookings: string[][]) {
  const s = new Sheet(name);
  s.cell(1, 1).v = name.toUpperCase();
  HEAD.forEach((h, i) => { s.cell(2, i + 1).v = h; });
  bookings.forEach((b, i) => b.forEach((v, j) => { s.cell(3 + i, j + 1).v = v; }));
  return s;
}

const SECRET = "test-secret";
let ss: Spreadsheet;
let post: (data: Record<string, unknown>) => { ok: boolean; tab?: string; row?: number; updated?: boolean; error?: string; kept?: string[]; moneyLocked?: boolean };

beforeEach(() => {
  ss = new Spreadsheet();
  const nov = monthTab("November26", [["Zagora 2 days", "05/11/2026", "ana@example.com", "2", "DEPOSIT ARRIVED", "40", "160", "Riad A", "Hassan", "Camp X", "free note in K"]]);
  // the deposit automation's own column, with its stamp and note on the booking
  nov.cell(2, 12).v = "DEPOSIT DATE";
  nov.cell(3, 12).v = "20/10/2026";
  nov.cell(3, 12).note = "November26-ab12cd34|auto";
  // a totals row two rows below the last booking, with a formula and no tour
  nov.cell(5, 6).f = "=SUM(F3:F4)";
  ss.sheets.push(monthTab("October26", []), nov, monthTab("DECEMBRE26", []));
  const src = readFileSync(path.join(process.cwd(), "docs/apps-script-bookings.gs"), "utf8").replace("PASTE-THE-SECRET-HERE", SECRET);
  const ctx: Record<string, unknown> = {
    SpreadsheetApp: { getActiveSpreadsheet: () => ss },
    LockService: { getDocumentLock: () => ({ waitLock() {}, releaseLock() {} }) },
    ContentService: { createTextOutput: (t: string) => ({ t, setMimeType() { return JSON.parse(t); } }), MimeType: { JSON: "json" } },
  };
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  post = (data) => (ctx.doPost as (e: unknown) => ReturnType<typeof post>)({ postData: { contents: JSON.stringify({ secret: SECRET, kind: "invoice", ...data }) } });
});

const inv = {
  number: "INV-2026-100", clientName: "Émilie Test", clientEmail: "emilie@example.com", clientPhone: "+33 6",
  tour: "Lake & Agafay day", departure: "2026-11-26", people: 6, depositEur: "90.00", balanceEur: "360.00",
  pickup: "Parking El Moukef, 11:00", suppliers: "Dinner: Trigados Camp, family table", details: "Included: music and fire show",
};
const tab = (n: string) => ss.sheets.find((s) => s.name === n)!;
const rowOf = (s: Sheet, r: number) => HEAD.map((_, i) => s.cell(r, i + 1).v);

describe("bookings26 script", () => {
  it("places a new invoice in the departure month, one value per column", () => {
    const r = post(inv);
    expect(r).toMatchObject({ ok: true, tab: "November26", updated: false });
    const s = tab("November26");
    expect(r.row).toBe(4); // right after the existing booking
    const [tour, date, emails, pax, payment, dep, left, pickup, driver, accom] = rowOf(s, r.row!);
    expect(tour).toBe("Lake & Agafay day");
    // a real date (made inside the vm, so not `instanceof` this realm's Date)
    expect(Object.prototype.toString.call(date)).toBe("[object Date]");
    expect((date as Date).getDate()).toBe(26);
    expect(emails, "EMAILS holds email and phone only").toBe("emilie@example.com — +33 6");
    expect([pax, dep, left]).toEqual([6, 90, 360]);
    expect(pickup).toBe("Parking El Moukef, 11:00");
    expect(accom).toBe("Dinner: Trigados Camp, family table");
    expect(payment, "PAYMENT is the team's").toBe("");
    expect(driver, "DRIVER is the team's").toBe("");
    const heads = s.grid[1].map((c) => c.v);
    expect(s.cell(r.row!, heads.indexOf("INVOICE") + 1).v).toBe("INV-2026-100");
    expect(s.cell(r.row!, heads.indexOf("TRIP DETAILS") + 1).v).toBe("Client: Émilie Test | Included: music and fire show");
    expect(heads.indexOf("INVOICE"), "new columns go right of DEPOSIT DATE").toBeGreaterThan(heads.indexOf("DEPOSIT DATE"));
    expect(s.cell(r.row!, heads.indexOf("DEPOSIT DATE") + 1).v, "DEPOSIT DATE is the deposit script's").toBe("");
  });

  it("never touches the existing booking, its notes, the deposit stamp or the SUM row", () => {
    const before = JSON.stringify(tab("November26").grid[2]);
    post(inv);
    post({ ...inv, number: "INV-2026-101" });
    const s = tab("November26");
    const after = JSON.parse(JSON.stringify(s.grid[2]));
    const was = JSON.parse(before);
    // the in-memory sheet pads every row with empty cells when a column is
    // added; compare the cells that existed before, and require the new ones empty
    expect(after.slice(0, was.length)).toEqual(was);
    expect(after.slice(was.length).every((c: { v: unknown }) => c.v === "")).toBe(true);
    expect(s.cell(5, 6).f).toBe("=SUM(F3:F4)");
    expect(s.cell(5, 1).v, "the second invoice must skip the formula row").toBe("");
  });

  it("a re-sent invoice updates its own row, never a second one", () => {
    const first = post(inv);
    const s = tab("November26");
    const again = post({ ...inv, depositEur: "120.00", pickup: "Riad Shakho, 8:30" });
    expect(again).toMatchObject({ ok: true, row: first.row, updated: true });
    expect(s.cell(first.row!, 6).v).toBe(120);
    expect(s.cell(first.row!, 8).v).toBe("Riad Shakho, 8:30");
    expect(s.grid.filter((row) => row.some((c) => c.v === "INV-2026-100")).length).toBe(1);
  });

  it("keeps what the team typed over the script's values", () => {
    const first = post(inv);
    const s = tab("November26");
    s.cell(first.row!, 8).v = "Meet at Koutoubia, 10:45"; // the team changed the pick-up
    s.cell(first.row!, 9).v = "Hassan";                   // and assigned a driver
    const again = post({ ...inv, pickup: "Riad Shakho, 8:30", suppliers: "Dinner: Trigados Camp" });
    expect(again.kept).toContain("pickup");
    expect(s.cell(first.row!, 8).v).toBe("Meet at Koutoubia, 10:45");
    expect(s.cell(first.row!, 9).v).toBe("Hassan");
    expect(s.cell(first.row!, 10).v, "an unedited cell still follows the invoice").toBe("Dinner: Trigados Camp");
  });

  it("once PAYMENT is set, DEPOSIT and AMOUNT LEFT are never changed and PAYMENT is never written", () => {
    const first = post(inv);
    const s = tab("November26");
    s.cell(first.row!, 5).v = "DEPOSIT ARRIVED"; // the team marks it; the deposit script copies 90
    const again = post({ ...inv, depositEur: "120.00", balanceEur: "330.00" });
    expect(again.moneyLocked).toBe(true);
    expect([s.cell(first.row!, 5).v, s.cell(first.row!, 6).v, s.cell(first.row!, 7).v]).toEqual(["DEPOSIT ARRIVED", 90, 360]);
  });

  it("finds French month tabs and makes a missing month as an empty copy", () => {
    expect(post({ ...inv, number: "INV-2026-102", departure: "2026-12-24" })).toMatchObject({ tab: "DECEMBRE26", row: 3 });
    const r = post({ ...inv, number: "INV-2026-103", departure: "2027-03-10" });
    expect(r).toMatchObject({ ok: true, tab: "March27", row: 3 });
    expect(tab("March27").cell(2, 1).v).toBe("TOUR BOOKED");
  });

  it("refuses a wrong secret and changes nothing", () => {
    const snapshot = JSON.stringify(ss.sheets.map((s) => s.grid));
    const r = (post as (d: Record<string, unknown>) => { ok: boolean })({ ...inv, secret: "wrong" });
    expect(r.ok).toBe(false);
    expect(JSON.stringify(ss.sheets.map((s) => s.grid))).toBe(snapshot);
  });
});
