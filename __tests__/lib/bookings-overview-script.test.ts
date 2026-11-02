import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";

/**
 * docs/apps-script-bookings-overview.gs fills the owner's new "Sheet12" tab in
 * bookings26 with a live year overview (2026-11-01, owner: "how many bookings
 * we had, how much money circulated"). bookings26 is the sheet the logistics
 * team plans from, and three scripts already run on it. Each one finds its tabs
 * by content, not by name:
 *   - tidy treats any tab with "TOUR BOOKED" and "DATE" in its first rows as a
 *     booking tab and SORTS it;
 *   - the deposit and invoice scripts take a tab with "TOUR BOOKED" in row 2 as
 *     a month tab, and the invoice script copies the LAST such tab as the
 *     template for a new month.
 * An overview that printed those labels would be sorted, synced or copied as a
 * month. And the month tabs do not share a layout: DEPOSIT DATE, INVOICE and a
 * helper column sit in different places, and CLIENTE is sometimes "2 people".
 * A formula built for one tab's letters would silently sum the wrong column on
 * another. The owner's rule for this sheet: "do not lose any data".
 *
 * This runs the real script against an in-memory copy of the real layouts.
 */
type Cell = { v: unknown; f: string; note: string };

class Range {
  constructor(public sh: Sheet, public r: number, public c: number, public nr = 1, public nc = 1) {}
  private each(fn: (cell: Cell, i: number, j: number) => void) {
    for (let i = 0; i < this.nr; i++) for (let j = 0; j < this.nc; j++) fn(this.sh.cell(this.r + i, this.c + j), i, j);
    return this;
  }
  getValues() { const out: unknown[][] = []; for (let i = 0; i < this.nr; i++) { out.push([]); for (let j = 0; j < this.nc; j++) out[i].push(this.sh.cell(this.r + i, this.c + j).v); } return out; }
  setValues(v: unknown[][]) { return this.each((c, i, j) => { c.v = v[i][j]; c.f = ""; }); }
  setValue(v: unknown) { return this.each((c) => { c.v = v; c.f = ""; }); }
  setFormulas(f: string[][]) { return this.each((c, i, j) => { c.f = f[i][j]; c.v = ""; }); }
  setFormula(f: string) { return this.each((c) => { c.f = f; c.v = ""; }); }
  setNote(n: string) { return this.each((c) => { c.note = n; }); }
  getNote() { return this.sh.cell(this.r, this.c).note; }
  setBackground() { return this; } setFontWeight() { return this; } setFontColor() { return this; }
  setFontStyle() { return this; } setFontSize() { return this; } setNumberFormat() { return this; }
  setHorizontalAlignment() { return this; } setWrap() { return this; } setBorder() { return this; }
}

class Sheet {
  grid: Cell[][] = [];
  constructor(public name: string) {}
  cell(r: number, c: number) {
    while (this.grid.length < r) this.grid.push([]);
    const row = this.grid[r - 1];
    while (row.length < c) row.push({ v: "", f: "", note: "" });
    return row[c - 1];
  }
  getName() { return this.name; }
  setName(n: string) { this.name = n; return this; }
  getRange(r: number, c: number, nr = 1, nc = 1) { return new Range(this, r, c, nr, nc); }
  getLastRow() { let l = 0; this.grid.forEach((row, i) => { if (row.some((c) => c.v !== "" || c.f !== "")) l = i + 1; }); return l; }
  getLastColumn() { let l = 0; for (const row of this.grid) row.forEach((c, i) => { if (c.v !== "" || c.f !== "") l = Math.max(l, i + 1); }); return l; }
  clear() { this.grid.forEach((row) => row.forEach((c) => { c.v = ""; c.f = ""; })); return this; }
  setColumnWidth() {} setFrozenRows() {}
  rows(values: unknown[][]) { values.forEach((row, i) => row.forEach((v, j) => { this.cell(i + 1, j + 1).v = v; })); return this; }
}

class Spreadsheet {
  sheets: Sheet[] = [];
  toasts: string[] = [];
  getSheets() { return this.sheets.slice(); }
  toast(m: string) { this.toasts.push(m); }
}

function load(ss: Spreadsheet) {
  const src = readFileSync(path.resolve(__dirname, "../../docs/apps-script-bookings-overview.gs"), "utf8");
  const ctx: Record<string, unknown> = {
    SpreadsheetApp: { getActive: () => ss, flush: () => {}, BorderStyle: { SOLID: "solid" } },
  };
  vm.createContext(ctx);
  vm.runInContext(src + "\nthis.overviewBuild = overviewBuild;", ctx);
  return ctx.overviewBuild as () => void;
}

// The real headers (row 2) of the four 2026 tabs, as read on 2026-11-01.
const HEAD = {
  septembre26: ["DAY", "TOUR BOOKED", "DATE", "EMAILS", "CLIENTE", "PAYMENT", "DEPOSIT", "AMOUNT LEFT ", "PICK UP - DROP OFF", "DRIVER", "accomodation", "", "DEPOSIT DATE"],
  October26: ["DAY", "TOUR BOOKED", "DATE", "EMAILS", "CLIENTE", "PAYMENT", "DEPOSIT", "AMOUNT LEFT ", "PICK UP - DROP OFF", "DRIVER", "accomodation", "", "", "DEPOSIT DATE"],
  November26: ["DAY", "TOUR BOOKED", "DATE", "EMAILS", "CLIENTE", "PAYMENT", "DEPOSIT", "AMOUNT LEFT ", "PICK UP - DROP OFF", "DRIVER", "accomodation", "", "DEPOSIT DATE", "INVOICE", "TRIP DETAILS"],
  // A tab laid out differently, to prove each tab gets its own letters.
  DECEMBRE26: ["TOUR BOOKED", "DATE", "PAYMENT", "CLIENTE", "EMAILS", "AMOUNT LEFT", "DEPOSIT"],
};

function build() {
  const ss = new Spreadsheet();
  for (const [name, head] of Object.entries(HEAD)) {
    ss.sheets.push(new Sheet(name).rows([["", "", "", "", "", "", 100, 200], head, ["1", "Agafay dinner", "Fri, 4 Sept 2026", "x@example.com", "2 people", "PAYMEN ON ARRIVAL", 0, 60]]));
  }
  ss.sheets.push(new Sheet("MAY27").rows([[], HEAD.November26]));   // an old 2027 tab: not 2026
  ss.sheets.push(new Sheet("Sheet12"));
  return ss;
}
// Filled cells only: reading past the edge pads the in-memory grid with blanks.
const snapshot = (sh: Sheet) =>
  JSON.stringify(sh.grid.flatMap((row, r) => row.map((c, k) => [r, k, c.v, c.f, c.note]).filter((x) => x[2] !== "" || x[3] !== "" || x[4] !== "")));
const formulas = (sh: Sheet) => sh.grid.flat().map((c) => c.f).filter(Boolean);

describe("bookings26 year overview script", () => {
  it("writes only to Sheet12, renames it, and leaves every month tab untouched", () => {
    const ss = build();
    const before = ss.sheets.filter((s) => s.name !== "Sheet12").map(snapshot);
    load(ss)();
    const after = ss.sheets.filter((s) => s.name !== "Overview 2026").map(snapshot);
    expect(after).toEqual(before);
    expect(ss.sheets.map((s) => s.name)).toContain("Overview 2026");
  });

  it("reads each month from that tab's own columns, and skips other years", () => {
    const ss = build();
    load(ss)();
    const f = formulas(ss.sheets.find((s) => s.name === "Overview 2026")!).join("\n");
    // November26: TOUR BOOKED B, CLIENTE E, DEPOSIT G, AMOUNT LEFT H, from row 3.
    expect(f).toContain("'November26'!B3:B");
    expect(f).toContain("'November26'!G3:G");
    expect(f).toContain("'November26'!H3:H");
    expect(f).toContain("'November26'!E3:E");
    // DECEMBRE26 has its own layout: TOUR BOOKED A, CLIENTE D, AMOUNT LEFT F, DEPOSIT G.
    expect(f).toContain("'DECEMBRE26'!A3:A");
    expect(f).toContain("'DECEMBRE26'!D3:D");
    expect(f).toContain("'DECEMBRE26'!F3:F");
    expect(f).not.toContain("'DECEMBRE26'!B3:B");
    // The 2027 tab is not part of the 2026 year.
    expect(f).not.toContain("MAY27");
    // Months in calendar order: September first.
    const labels = f.match(/="(\w+ 2026)"/g);
    expect(labels?.slice(0, 4)).toEqual(['="September 2026"', '="October 2026"', '="November 2026"', '="December 2026"']);
  });

  it("never prints a label the other scripts use to recognise a booking tab", () => {
    const ss = build();
    load(ss)();
    const tab = ss.sheets.find((s) => s.name === "Overview 2026")!;
    const words = tab.grid.flat().map((c) => String(c.v).trim().toUpperCase());
    expect(words).not.toContain("TOUR BOOKED");
    expect(words).not.toContain("DATE");
    expect(words).not.toContain("PAYMENT");
    expect(words).not.toContain("DEPOSIT");
  });

  it("refuses a Sheet12 that already holds the owner's data, and changes nothing", () => {
    const ss = build();
    ss.sheets.find((s) => s.name === "Sheet12")!.rows([["my notes"]]);
    const before = ss.sheets.map(snapshot);
    expect(() => load(ss)()).toThrow(/not empty and was not written by this script/);
    expect(ss.sheets.map(snapshot)).toEqual(before);
    expect(ss.sheets.map((s) => s.name)).toContain("Sheet12");
  });

  it("can be re-run over its own overview", () => {
    const ss = build();
    const run = load(ss);
    run();
    const first = snapshot(ss.sheets.find((s) => s.name === "Overview 2026")!);
    run();
    expect(snapshot(ss.sheets.find((s) => s.name === "Overview 2026")!)).toEqual(first);
  });
});
