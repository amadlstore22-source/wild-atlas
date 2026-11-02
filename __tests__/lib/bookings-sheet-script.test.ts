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
type Cell = { v: unknown; f: string; fmt: string; note: string; line?: string; color?: string };
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
      setFontColor: (col: string) => { cells().flat().forEach((x) => { x.color = col; }); return range; },
      setFontLine: (l: string) => { cells().flat().forEach((x) => { x.line = l; }); return range; },
      getNote: () => this.cell(r, c).note,
      setNote: (n: string) => { this.cell(r, c).note = n; return range; },
      clearContent: () => { cells().flat().forEach((x) => { x.v = ""; x.f = ""; }); return range; },
      clearNote: () => { cells().flat().forEach((x) => { x.note = ""; }); return range; },
    };
    return range;
  }
}
class Spreadsheet { sheets: Sheet[] = []; getSheets() { return this.sheets; } getName() { return "bookings26"; } getId() { return "b26"; } }

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
let depSS: Spreadsheet;
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
  // The Deposit sheet (the logistics view), as the deposit file of the same
  // project leaves it: headers in row 2, the hidden Ref column at H.
  depSS = new Spreadsheet();
  const depTab = new Sheet("October deposit");
  depTab.cell(1, 1).v = 40;
  ["Deposit", "Tour/trek", "Name guest", "Date trip", "Guests", "", "Arrived", "Ref"].forEach((h, i) => { depTab.cell(2, i + 1).v = h; });
  [40, "Zagora 2 days", "ana@example.com", "05/11/2026", 2, "", "20/10/2026", "November26-ab12cd34"].forEach((v, i) => { depTab.cell(3, i + 1).v = v; });
  depSS.sheets.push(depTab);
  const ctx: Record<string, unknown> = {
    SpreadsheetApp: { getActiveSpreadsheet: () => ss, openByUrl: (u: string) => { if (u !== "dep-url") throw new Error("unknown sheet " + u); return depSS; } },
    // the deposit file's helpers (deposits.js in the live project)
    depositUrl_: () => "dep-url",
    isDepositTab_: (t: Sheet) => /dep/i.test(t.getName()),
    depositCols_: (t: Sheet) => ({ REF: t.grid[1].findIndex((c) => String(c.v).toUpperCase() === "REF") + 1 }),
    GUESTS: 5,
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

  // INV-2026-049 (2026-10-28) landed with its date shown as "12/15/2026": the
  // empty row it took already carried a US date format, and only a "General"
  // cell was restyled. The team's own rows read "Tue, 15 Dec 2026".
  it("styles the date it writes like the team's rows, whatever format the empty row had", () => {
    const s = tab("November26");
    s.cell(4, 2).fmt = "M/d/yyyy";
    const r = post(inv);
    expect(r.row).toBe(4);
    expect(s.cell(4, 2).fmt).toBe("ddd, d mmm yyyy");
  });

  it("leaves the format of a date the team typed over alone on a re-send", () => {
    const r = post(inv);
    const s = tab("November26");
    s.cell(r.row!, 2).v = "27/11/2026 (moved)";
    s.cell(r.row!, 2).fmt = "@";
    post(inv);
    expect(s.cell(r.row!, 2).fmt).toBe("@");
  });
});

/**
 * A trip cancelled in MET Desk (owner, 2026-11-02: "do the cancelled"). Before
 * this, a cancelled trip's bookings26 row looked like any other trip, and the
 * Deposit sheet (the logistics guy's list of upcoming tours) still listed it:
 * the team only knew if someone remembered to tell them, and a driver could
 * go to a pick-up for nobody. The row must be marked, never deleted: it holds
 * what the team typed, and the deposit that arrived must stay in the totals.
 */
describe("bookings26 script: a cancelled trip", () => {
  const cancel = (d: Record<string, unknown> = {}) =>
    post({ kind: "cancel", number: "INV-2026-100", creditNote: "CN-2026-001", cancelledOn: "2026-11-05", reason: "client cancelled", ...d }) as unknown as
      { ok: boolean; found?: boolean; tab?: string; row?: number; deposit?: string; error?: string };
  const heads = (s: Sheet) => s.grid[1].map((c) => c.v);

  it("keeps the row and every value, strikes it through and says why in a CANCELLED column", () => {
    const placed = post(inv);
    const s = tab("November26");
    s.cell(placed.row!, 9).v = "Hassan"; // the team assigned a driver
    s.cell(placed.row!, 11).note = "team note";
    const before = s.grid[placed.row! - 1].map((c) => ({ v: c.v, f: c.f, note: c.note, fmt: c.fmt }));
    const r = cancel();
    expect(r).toMatchObject({ ok: true, found: true, tab: "November26", row: placed.row });
    const col = heads(s).indexOf("CANCELLED") + 1;
    expect(col, "CANCELLED is added at the far right").toBe(s.getLastColumn());
    expect(s.cell(placed.row!, col).v).toBe("CANCELLED 2026-11-05 by CN-2026-001: client cancelled");
    expect(s.cell(placed.row!, col).line, "the reason itself stays readable").toBe("none");
    const after = s.grid[placed.row! - 1];
    expect(after.slice(0, before.length).map((c) => ({ v: c.v, f: c.f, note: c.note, fmt: c.fmt })), "no value, formula, note or format changes").toEqual(before);
    expect(after.slice(0, col - 1).every((c) => c.line === "line-through"), "the whole booking is struck through").toBe(true);
    expect(s.grid[2].every((c) => !c.line), "the other booking is untouched").toBe(true);
  });

  it("strikes the deposit row in the Deposit sheet too, keeping its amount in the total", () => {
    const placed = post({ ...inv, departure: "2026-11-05" });
    const s = tab("November26");
    // the deposit file stamped this booking when the team picked DEPOSIT ARRIVED
    const stamp = heads(s).indexOf("DEPOSIT DATE") + 1;
    s.cell(3, stamp).note = "";
    s.cell(placed.row!, stamp).note = "November26-ab12cd34|auto";
    const dep = depSS.sheets[0];
    const values = dep.grid.map((row) => row.map((c) => c.v));
    expect(cancel().deposit).toBe("struck");
    expect(dep.grid[2].slice(0, 5).every((c) => c.line === "line-through")).toBe(true);
    expect(dep.cell(3, 2).note).toMatch(/CANCELLED 2026-11-05 \(INV-2026-100 cancelled by CN-2026-001\)/);
    expect(dep.grid.map((row) => row.map((c) => c.v)), "no amount, name or total changes").toEqual(values);
  });

  it("without a deposit row there is nothing else to mark", () => {
    post(inv);
    expect(cancel().deposit).toBe("none");
    expect(depSS.sheets[0].grid.flat().some((c) => c.line)).toBe(false);
  });

  it("sending the same cancellation again changes nothing", () => {
    post(inv);
    cancel();
    const once = JSON.stringify(ss.sheets.map((s) => s.grid));
    expect(cancel().ok).toBe(true);
    expect(JSON.stringify(ss.sheets.map((s) => s.grid))).toBe(once);
  });

  it("an invoice that never reached bookings26 changes nothing and is not an error", () => {
    const snapshot = JSON.stringify(ss.sheets.map((s) => s.grid));
    expect(cancel({ number: "INV-2026-999" })).toMatchObject({ ok: true, found: false });
    expect(JSON.stringify(ss.sheets.map((s) => s.grid))).toBe(snapshot);
  });

  it("keeps what the team typed in CANCELLED", () => {
    const placed = post(inv);
    cancel();
    const s = tab("November26");
    const col = heads(s).indexOf("CANCELLED") + 1;
    s.cell(placed.row!, col).v = "client moved to March, see Hassan";
    cancel({ creditNote: "CN-2026-002" });
    expect(s.cell(placed.row!, col).v).toBe("client moved to March, see Hassan");
  });

  it("leaves the DAY column of a tab laid out by day alone", () => {
    const s = new Sheet("December26");
    ["DAY", ...HEAD].forEach((h, i) => { s.cell(2, i + 1).v = h; });
    for (let d = 1; d <= 31; d++) s.cell(2 + d, 1).v = d;
    ss.sheets.splice(ss.sheets.indexOf(tab("DECEMBRE26")), 1, s);
    const placed = post({ ...inv, departure: "2026-12-13" });
    expect(placed.row).toBe(15);
    cancel();
    expect(s.cell(15, 1).line, "the day number belongs to the layout").toBeUndefined();
    expect(s.cell(15, 2).line).toBe("line-through");
  });

  it("refuses a cancellation without its credit note, and a wrong secret, changing nothing", () => {
    post(inv);
    const snapshot = JSON.stringify(ss.sheets.map((s) => s.grid));
    expect(cancel({ creditNote: "" }).ok).toBe(false);
    expect(cancel({ secret: "wrong" }).ok).toBe(false);
    expect(JSON.stringify(ss.sheets.map((s) => s.grid))).toBe(snapshot);
  });
});
