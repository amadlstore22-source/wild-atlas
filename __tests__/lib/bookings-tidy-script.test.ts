import { describe, it, expect, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";

/**
 * docs/apps-script-bookings-tidy.gs reorders the owner's live bookings26 sheet
 * (2026-10-28, owner: "organize them": bookings in date order, no empty rows
 * between them). That sheet is what the logistics team plans from, and two
 * other scripts hang off it:
 *   - the deposit link keeps its Ref in a NOTE on the DEPOSIT DATE cell. If a
 *     note stayed behind while the row moved, the next PAYMENT change would
 *     remove ANOTHER client's deposit from the Deposit sheet;
 *   - the totals in row 1 sum the rows below. Dragging rows (moveRows) can
 *     shift a range's edges and silently drop bookings from a total, which is
 *     why the script sorts instead.
 * The owner's rule for this sheet: "do not lose any data".
 *
 * This runs the real script against an in-memory sheet whose sort behaves
 * like Google's (whole rows, notes and colours included), and once against a
 * sort that leaves notes behind, to prove the rehearsal catches it before the
 * real tab is touched.
 */
type Rule = { getCriteriaType: () => string; getCriteriaValues: () => unknown[] };
type Cell = { v: unknown; f: string; note: string; bg: string; fmt?: string; dv?: Rule | null };
const blank = (): Cell => ({ v: "", f: "", note: "", bg: "#ffffff" });

class Sheet {
  grid: Cell[][] = [];
  hidden = new Set<number>();
  merges: { r: number; nr: number }[] = [];
  frozen = 0;
  constructor(public ss: Spreadsheet, public name: string, rows = 30, cols = 13) {
    for (let r = 0; r < rows; r++) this.grid.push(Array.from({ length: cols }, blank));
  }
  cell(r: number, c: number) { return this.grid[r - 1][c - 1]; }
  getName() { return this.name; }
  setName(n: string) { this.name = n; return this; }
  getMaxRows() { return this.grid.length; }
  getMaxColumns() { return this.grid[0].length; }
  getLastRow() { let l = 0; this.grid.forEach((row, i) => { if (row.some((c) => c.v !== "" || c.f !== "")) l = i + 1; }); return l; }
  getFrozenRows() { return this.frozen; }
  getFilter() { return null; }
  isRowHiddenByUser(r: number) { return this.hidden.has(r); }
  insertColumnAfter(c: number) { this.grid.forEach((row) => row.splice(c, 0, blank())); }
  insertColumnBefore(c: number) { this.grid.forEach((row) => row.splice(c - 1, 0, blank())); }
  insertRowsAfter(_r: number, k: number) { for (let i = 0; i < k; i++) this.insertRowAfter(); }
  setColumnWidth() {}
  deleteColumn(c: number) { this.grid.forEach((row) => row.splice(c - 1, 1)); }
  copyTo(ss: Spreadsheet) {
    const s = new Sheet(ss, "Copy of " + this.name, 1, 1);
    s.grid = this.grid.map((row) => row.map((c) => ({ ...c })));
    ss.sheets.push(s);
    return s;
  }
  getLastColumn() { let l = 0; for (const row of this.grid) row.forEach((c, i) => { if (c.v !== "" || c.f !== "") l = Math.max(l, i + 1); }); return l; }
  insertRowAfter() { this.grid.push(Array.from({ length: this.getMaxColumns() }, blank)); }
  insertRowBefore(r: number) { this.grid.splice(r - 1, 0, Array.from({ length: this.getMaxColumns() }, blank)); }
  setFrozenRows(n: number) { this.frozen = n; }
  getRange(r: number, c: number, nr = 1, nc = 1) {
    // grows like a real sheet when the invoices file adds a column at the far right
    while (this.grid[0].length < c + nc - 1) this.grid.forEach((row) => row.push(blank()));
    const rows = () => this.grid.slice(r - 1, r - 1 + nr).map((row) => row.slice(c - 1, c - 1 + nc));
    const show = (v: unknown) => (Object.prototype.toString.call(v) === "[object Date]" ? (v as Date).toDateString() : String(v));
    const one = () => this.grid[r - 1][c - 1];
    const range = {
      getValue: () => one().v,
      getDisplayValue: () => show(one().v),
      clearFormat: () => { rows().flat().forEach((x) => { x.bg = "#ffffff"; }); return range; },
      clearDataValidations: () => { rows().flat().forEach((x) => { x.dv = null; }); return range; },
      getDataValidations: () => rows().map((row) => row.map((x) => x.dv ?? null)),
      setDataValidations: (vs: (Rule | null)[][]) => { vs.forEach((row, i) => row.forEach((v, j) => { this.grid[r - 1 + i][c - 1 + j].dv = v; })); return range; },
      setBackgrounds: (vs: (string | null)[][]) => { vs.forEach((row, i) => row.forEach((v, j) => { this.grid[r - 1 + i][c - 1 + j].bg = v ?? "#ffffff"; })); return range; },
      setNotes: (vs: string[][]) => { vs.forEach((row, i) => row.forEach((v, j) => { this.grid[r - 1 + i][c - 1 + j].note = v; })); return range; },
      setHorizontalAlignment: () => range,
      copyTo: (dest: { _one: () => Cell }) => { dest._one().bg = one().bg; },
      _one: one,
      setValue: (v: unknown) => { one().v = v; return range; },
      getNote: () => one().note,
      setNote: (n: string) => { one().note = n; return range; },
      getNumberFormat: () => one().fmt ?? "General",
      setNumberFormat: (f: string) => { one().fmt = f; return range; },
      setFontWeight: () => range,
      getFormulas: () => rows().map((row) => row.map((x) => x.f)),
      getValues: () => rows().map((row) => row.map((x) => x.v)),
      getDisplayValues: () => rows().map((row) => row.map((x) => show(x.v))),
      getFormulasR1C1: () => rows().map((row) => row.map((x) => x.f)),
      getNotes: () => rows().map((row) => row.map((x) => x.note)),
      getBackgrounds: () => rows().map((row) => row.map((x) => x.bg)),
      getMergedRanges: () => this.merges.filter((m) => m.r >= r && m.r < r + nr).map((m) => ({ getNumRows: () => m.nr })),
      setValues: (vs: unknown[][]) => { vs.forEach((row, i) => row.forEach((v, j) => { this.grid[r - 1 + i][c - 1 + j].v = v; })); return range; },
      clearContent: () => { rows().flat().forEach((x) => { x.v = ""; x.f = ""; }); },
      sort: ({ column }: { column: number }) => {
        const block = this.grid.slice(r - 1, r - 1 + nr).map((row) => row.slice(c - 1, c - 1 + nc));
        const sorted = block.slice().sort((a, b) => Number(a[column - c].v) - Number(b[column - c].v));
        sorted.forEach((row, i) => row.forEach((cell, j) => {
          const target = this.grid[r - 1 + i];
          // Google moves the whole cell; the faulty variant leaves notes in place.
          const note = this.ss.sortLeavesNotes ? target[c - 1 + j].note : cell.note;
          target[c - 1 + j] = { ...cell, note };
        }));
      },
    };
    return range;
  }
}
class Spreadsheet {
  sheets: Sheet[] = [];
  sortLeavesNotes = false;
  constructor(public name = "bookings26") {}
  getName() { return this.name; }
  getId() { return this.name; }
  getSheets() { return this.sheets; }
  deleteSheet(s: Sheet) { this.sheets = this.sheets.filter((x) => x !== s); }
  toast() {}
}

const HEAD = ["TOUR BOOKED", "DATE", "EMAILS", "CLIENTE", "PAYMENT", "DEPOSIT", "AMOUNT LEFT", "PICK UP - DROP OFF", "DRIVER", "accomodation", "", "DEPOSIT DATE"];
let ss: Spreadsheet;
let logs: string[];
let ctx: Record<string, unknown>;
const run = (fn: string) => (ctx[fn] as () => void)();
const tab = (n: string) => ss.sheets.find((s) => s.name === n)!;
const snapshot = () => JSON.stringify(ss.sheets.map((s) => [s.name, s.grid]));

function monthTab(name: string, headerRow: number, bookings: [number, unknown[]][]) {
  const s = new Sheet(ss, name);
  HEAD.forEach((h, i) => { s.cell(headerRow, i + 1).v = h; });
  for (const [row, vals] of bookings) vals.forEach((v, j) => { s.cell(row, j + 1).v = v; });
  ss.sheets.push(s);
  return s;
}

beforeEach(() => {
  ss = new Spreadsheet();
  logs = [];
  const nov = monthTab("November26", 2, [
    [9, ["5-Day Southern", "Sat, 14 Nov 2026", "a@example.com", 4, "MADE A DEPOSIT", 570, 1906]],
    [4, ["Shared Merzouga", "Thu, 5 Nov 2026", "b@example.com", 1, "DEPOSIT ARRIVED", 40, 120]],
    [6, ["Agafay dinner", "Fri, 6 Nov 2026", "c@example.com", 5, "DEPOSIT ARRIVED", 75, 75]],
    [5, ["5-day desert", "3 November 2026", "d@example.com", 1, "MADE A DEPOSIT", 1372, 1372]],
  ]);
  // row 1 totals, the deposit link's note, a same-row formula, an owner's colour
  nov.cell(1, 6).f = "=SUM(R[2]C:R[29]C)"; nov.cell(1, 6).v = "2057.00";
  nov.cell(4, 12).v = "28/10/2026"; nov.cell(4, 12).note = "November26-3fc0e7d9|auto";
  nov.cell(9, 8).f = "=R[0]C[-2]+R[0]C[-1]";
  nov.cell(6, 1).bg = "#d9ead3";
  monthTab("april27", 1, [[12, ["Agadir Chegaga", "14-04-2026", "g@example.com", 4, "MADE A DEPOSIT", 248, 992]]]);
  ss.sheets.push(new Sheet(ss, "Notes")); // not a month tab: never touched
  tab("Notes").cell(3, 1).v = "free text";

  const src = readFileSync(path.join(process.cwd(), "docs/apps-script-bookings-tidy.gs"), "utf8");
  ctx = {
    SpreadsheetApp: { getActive: () => ss, flush() {}, CopyPasteType: { PASTE_FORMAT: "format" } },
    LockService: { getDocumentLock: () => ({ waitLock() {}, releaseLock() {} }) },
    Logger: { log: (s: string) => logs.push(s) },
  };
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
});

const rowsOf = (s: Sheet, from: number, to: number) => s.grid.slice(from - 1, to).map((r) => JSON.stringify(r));

describe("bookings26 tidy script", () => {
  it("tidyPreview changes nothing at all", () => {
    const before = snapshot();
    run("tidyPreview");
    expect(snapshot()).toBe(before);
    expect(logs.join("\n")).toContain("would be in date order");
  });

  it("puts bookings in date order from the first row under the headers, each row whole", () => {
    const s = tab("November26");
    const was = { r4: rowsOf(s, 4, 4)[0], r5: rowsOf(s, 5, 5)[0], r6: rowsOf(s, 6, 6)[0], r9: rowsOf(s, 9, 9)[0] };
    const width = s.getMaxColumns();
    const row1 = JSON.stringify(s.grid[0]);
    run("tidyRun");
    // 3 Nov, 5 Nov, 6 Nov, 14 Nov, starting at row 3, every cell, note and colour with its booking
    expect(rowsOf(s, 3, 6)).toEqual([was.r5, was.r4, was.r6, was.r9]);
    expect(s.cell(4, 12).note, "the deposit link's Ref must stay on its own booking").toBe("November26-3fc0e7d9|auto");
    expect(s.cell(4, 3).v).toBe("b@example.com");
    expect(s.cell(6, 8).f, "a same-row formula travels with its row").toBe("=R[0]C[-2]+R[0]C[-1]");
    expect(s.cell(5, 1).bg).toBe("#d9ead3");
    expect(s.grid.slice(6).every((r) => r.every((c) => c.v === "" && c.f === "" && c.note === "")), "only empty rows below").toBe(true);
    expect(JSON.stringify(s.grid[0]), "totals row above the headers untouched").toBe(row1);
    expect(s.getMaxColumns(), "the temporary key column is removed").toBe(width);
    expect(ss.sheets.map((x) => x.name), "the rehearsal copy is deleted").toEqual(["November26", "april27", "Notes"]);
    expect(tab("Notes").cell(3, 1).v).toBe("free text");
  });

  it("handles 2027 tabs with headers in row 1 and flags a date outside the tab's month", () => {
    run("tidyRun");
    expect(tab("april27").cell(2, 3).v).toBe("g@example.com");
    expect(logs.join("\n")).toMatch(/CHECK: row 12 .*14-04-2026.*not in Apr 2027/);
  });

  it("a second run moves nothing", () => {
    run("tidyRun");
    const after = snapshot();
    logs = [];
    run("tidyRun");
    expect(snapshot()).toBe(after);
    expect(logs.join("\n")).toContain("already in order");
  });

  it("leaves a tab alone if a row is not a booking (a label, a stray note)", () => {
    const s = tab("November26");
    s.cell(7, 11).v = "WEEK 2";
    const before = snapshot();
    run("tidyRun");
    expect(JSON.stringify(tab("November26").grid)).toBe(JSON.stringify(JSON.parse(before)[0][1]));
    expect(logs.join("\n")).toContain("November26: NOT CHANGED, because row 7 holds something that is not a booking");
    expect(tab("april27").cell(2, 1).v, "other tabs are still tidied").toBe("Agadir Chegaga");
  });

  it("leaves a tab alone if a formula looks at another row", () => {
    tab("November26").cell(5, 7).f = "=R[-1]C+R[0]C[-1]";
    const before = JSON.stringify(tab("November26").grid);
    run("tidyRun");
    expect(JSON.stringify(tab("November26").grid)).toBe(before);
    expect(logs.join("\n")).toContain("formula that uses another row");
  });

  it("leaves a tab alone if its rows are hidden or merged", () => {
    tab("November26").hidden.add(6);
    tab("april27").merges.push({ r: 12, nr: 2 });
    const before = snapshot();
    run("tidyRun");
    expect(snapshot()).toBe(before);
  });

  it("if the test sort loses a note, the real tab is never touched", () => {
    ss.sortLeavesNotes = true;
    tab("November26").cell(9, 12).note = "November26-ab9549ca|auto"; // on a booking that moves (row 9 → 6)
    const before = JSON.stringify(tab("November26").grid);
    run("tidyRun");
    expect(JSON.stringify(tab("November26").grid)).toBe(before);
    expect(logs.join("\n")).toContain("November26: NOT CHANGED. The test sort failed");
    expect(ss.sheets.some((x) => x.name.startsWith("~tidy")), "rehearsal copy deleted even on failure").toBe(false);
  });

  it("reads the date formats typed in the sheet", () => {
    const ms = ctx.tidyDateMs_ as (v: unknown) => number | null;
    const d = (y: number, m: number, day: number) => Date.UTC(y, m - 1, day);
    expect(ms("Tue, 5 Nov 2026")).toBe(d(2026, 11, 5));
    expect(ms("3 November 2026")).toBe(d(2026, 11, 3));
    expect(ms("Fri, 4 Sept 2026")).toBe(d(2026, 9, 4));
    expect(ms("22Oct 2026")).toBe(d(2026, 10, 22));
    expect(ms("14-04-2026")).toBe(d(2026, 4, 14));
    expect(ms("5/1/27")).toBe(d(2027, 1, 5));
    expect(ms("10/24/2026"), "month first when the day can't be a month").toBe(d(2026, 10, 24));
    expect(ms("mardi 5 juin 2027")).toBe(d(2027, 6, 5));
    expect(ms("5 juillet 2027")).toBe(d(2027, 7, 5));
    expect(ms(new Date(2026, 11, 30))).toBe(d(2026, 12, 30));
    expect(ms("soon")).toBeNull();
    expect(ms("")).toBeNull();
  });
});

/**
 * 2026-10-28, owner: a new invoice "should also be in the correct order not at
 * the bottom after the other bookings". The invoices file writes the booking
 * into the first empty row, then calls the tidy file's tidyTab_ on that month
 * tab. These run both files in one script, as they live in bookings26.
 */
describe("a new invoice lands in date order", () => {
  let post: (d: Record<string, unknown>) => { ok: boolean; tab?: string; row?: number; updated?: boolean; sorted?: string; error?: string };
  beforeEach(() => {
    const invoices = readFileSync(path.join(process.cwd(), "docs/apps-script-bookings.gs"), "utf8").replace("PASTE-THE-SECRET-HERE", "s");
    Object.assign(ctx, {
      SpreadsheetApp: { getActive: () => ss, getActiveSpreadsheet: () => ss, flush() {} },
      ContentService: { createTextOutput: (t: string) => ({ setMimeType: () => JSON.parse(t) }), MimeType: { JSON: "json" } },
    });
    vm.runInContext(invoices, ctx);
    post = (d) => (ctx.doPost as (e: unknown) => ReturnType<typeof post>)({ postData: { contents: JSON.stringify({ secret: "s", kind: "invoice", ...d }) } });
  });
  const inv = { number: "INV-2026-200", clientName: "Test", clientEmail: "new@example.com", clientPhone: "", tour: "Ourika day", departure: "2026-11-04", people: 2, depositEur: "20.00", balanceEur: "80.00" };
  const col = (s: Sheet, name: string) => s.grid[1].findIndex((c) => c.v === name) + 1;

  it("sits between 3 Nov and 5 Nov, and every other booking keeps its own cells", () => {
    const s = tab("November26");
    const connor = JSON.stringify(s.grid[3].slice(0, 12)); // row 4 now: 5 Nov, with the deposit note
    const r = post(inv);
    expect(r).toMatchObject({ ok: true, tab: "November26", row: 4, sorted: "sorted" });
    expect(s.cell(4, 3).v).toBe("new@example.com");
    expect(s.cell(4, col(s, "INVOICE")).v).toBe("INV-2026-200");
    expect(JSON.parse(s.cell(4, col(s, "INVOICE")).note), "the invoice's own record travels with it").toHaveProperty("tour");
    expect(s.cell(3, 3).v).toBe("d@example.com"); // 3 Nov
    expect(JSON.stringify(s.grid[4].slice(0, 12)), "5 Nov booking, deposit note and all, now one row lower").toBe(connor);
    expect(s.cell(5, 12).note).toBe("November26-3fc0e7d9|auto");
    expect(ss.sheets.some((x) => x.name.startsWith("~tidy"))).toBe(false);
  });

  it("a re-sent invoice stays one row and keeps its place", () => {
    post(inv);
    const r = post({ ...inv, people: 3 });
    expect(r).toMatchObject({ ok: true, updated: true, row: 4, sorted: "" });
    const s = tab("November26");
    expect(s.grid.filter((row) => row[col(s, "INVOICE") - 1]?.v === "INV-2026-200")).toHaveLength(1);
  });

  it("if the tab cannot be sorted safely, the invoice still lands and says why", () => {
    const s = tab("November26");
    s.cell(7, 11).v = "WEEK 2";
    const r = post(inv);
    expect(r.ok).toBe(true);
    expect(r.sorted).toMatch(/^not sorted: row 7 holds something that is not a booking/);
    expect(s.cell(r.row!, 3).v).toBe("new@example.com");
  });
});

/**
 * 2026-10-28: the 2027 month tabs had their headers in ROW 1 (made by hand),
 * while the deposit link, the invoices file and the team app read ROW 2. So
 * DEPOSIT ARRIVED did nothing there and invoices for 2027 departures failed.
 * fix2027Tabs adds one empty row on top of such tabs. One-off date
 * corrections live in a private file in the live project (no client names in
 * this repo); here a stand-in fix2027Extra_ drives the same helper.
 */
describe("fix2027Tabs", () => {
  let dep: Spreadsheet;
  beforeEach(() => {
    dep = new Spreadsheet();
    const oct = new Sheet(dep, "October deposit");
    ["Deposit", "Tour/trek", "Name guest", "Date trip"].forEach((h, i) => { oct.cell(2, i + 1).v = h; });
    oct.cell(3, 1).v = 248; oct.cell(3, 2).v = "Agadir Chegaga"; oct.cell(3, 3).v = "Test Client"; oct.cell(3, 4).v = "14-04-2026";
    dep.sheets.push(oct);
    tab("april27").cell(12, 3).v = "Test Client +00 0 00";
    tab("april27").frozen = 1;
    Object.assign(ctx, {
      SpreadsheetApp: { getActive: () => ss, getActiveSpreadsheet: () => ss, openByUrl: () => dep, flush() {} },
      depositUrl_: () => "https://example.com/deposit",
    });
    // stands in for the private one-off file in the live project
    vm.runInContext(`function fix2027Extra_(ss, out) {
      const who = /client/i;
      out.push('bookings26: ' + tidyFixOneDate_(tidyBookingPlaces_(ss), who, '14-04-2026', '14-04-2027'));
      out.push('Deposit sheet: ' + tidyFixOneDate_(tidyDepositPlaces_(SpreadsheetApp.openByUrl(depositUrl_())), who, '14-04-2026', '14-04-2027'));
    }`, ctx);
  });

  it("puts row-1 headers in row 2, leaves 2026 tabs alone, and fixes the year in both sheets", () => {
    const nov = JSON.stringify(tab("November26").grid);
    const apr = tab("april27");
    const rows = apr.grid.map((r) => JSON.stringify(r.map((c) => c.v)));
    run("fix2027Tabs");
    expect(apr.grid[0].every((c) => c.v === ""), "row 1 is the new empty row").toBe(true);
    expect(apr.cell(2, 1).v).toBe("TOUR BOOKED");
    expect(apr.getFrozenRows()).toBe(2);
    expect(apr.cell(13, 1).v, "the booking moved one row down, not sideways").toBe("Agadir Chegaga");
    expect(apr.cell(13, 2).v).toBe("14-04-2027");
    // nothing else in the tab changed: the old rows, one lower
    const now = apr.grid.slice(1).map((r) => JSON.stringify(r.map((c) => c.v)));
    expect(now.filter((r, i) => r !== rows[i]).length, "only the date cell differs").toBe(1);
    expect(dep.sheets[0].cell(3, 4).v).toBe("14-04-2027");
    expect(JSON.stringify(tab("November26").grid)).toBe(nov);
    expect(logs.join("\n")).toContain("april27: headers are now in row 2");
  });

  it("running it twice changes nothing more", () => {
    run("fix2027Tabs");
    const once = snapshot() + JSON.stringify(dep.sheets[0].grid);
    logs = [];
    run("fix2027Tabs");
    expect(snapshot() + JSON.stringify(dep.sheets[0].grid)).toBe(once);
    expect(logs.join("\n")).toContain("Nothing moved");
    expect(logs.join("\n")).toContain("NOT changed (found 0");
  });

  it("does not guess when two rows match", () => {
    tab("april27").cell(14, 1).v = "Second trip"; tab("april27").cell(14, 2).v = "14-04-2026"; tab("april27").cell(14, 3).v = "T. Client";
    run("fix2027Tabs");
    expect(tab("april27").cell(13, 2).v).toBe("14-04-2026");
    expect(logs.join("\n")).toContain("found 2 rows");
  });

  it("after the fix an invoice for an April 2027 departure lands in april27, in date order", () => {
    run("fix2027Tabs");
    const invoices = readFileSync(path.join(process.cwd(), "docs/apps-script-bookings.gs"), "utf8").replace("PASTE-THE-SECRET-HERE", "s");
    Object.assign(ctx, { ContentService: { createTextOutput: (t: string) => ({ setMimeType: () => JSON.parse(t) }), MimeType: { JSON: "json" } } });
    vm.runInContext(invoices, ctx);
    const r = (ctx.doPost as (e: unknown) => { ok: boolean; tab: string; row: number; sorted: string })({ postData: { contents: JSON.stringify({
      secret: "s", kind: "invoice", number: "INV-2027-001", clientEmail: "x@example.com", clientPhone: "", tour: "Day trip", departure: "2027-04-02", people: 2, depositEur: "10.00", balanceEur: "40.00" }) } });
    expect(r).toMatchObject({ ok: true, tab: "april27", row: 3, sorted: "sorted" });
    expect(tab("april27").cell(4, 1).v, "2 Apr goes before the 14 Apr booking").toBe("Agadir Chegaga");
  });
});

/**
 * 2026-10-28, owner: 2027 bookings go to their own spreadsheet ("booking
 * 27"), not bookings26. Its link lives in a private file of the live project
 * (YEAR_SHEETS), never in this repo. bookings26's old 2027 tabs stay as they
 * are and stop receiving new rows.
 */
describe("year spreadsheets (booking 27)", () => {
  let y27: Spreadsheet;
  let post: (d: Record<string, unknown>) => { ok: boolean; file?: string; tab?: string; row?: number; updated?: boolean; sorted?: string; error?: string };
  const Y27 = "https://docs.google.com/spreadsheets/d/y27/edit";
  beforeEach(() => {
    y27 = new Spreadsheet("booking 27");
    const apr = new Sheet(y27, "April27");
    HEAD.forEach((h, i) => { apr.cell(1, i + 1).v = h; });           // headers in ROW 1, as the owner made it
    ["Agadir Chegaga", "14-04-2027", "Test Client +00 0 00", 4, "MADE A DEPOSIT", 248, 992].forEach((v, j) => { apr.cell(14, j + 1).v = v; });
    y27.sheets.push(apr);
    const invoices = readFileSync(path.join(process.cwd(), "docs/apps-script-bookings.gs"), "utf8").replace("PASTE-THE-SECRET-HERE", "s");
    Object.assign(ctx, {
      SpreadsheetApp: { getActive: () => ss, getActiveSpreadsheet: () => ss, openByUrl: (u: string) => { if (u !== Y27) throw new Error("no access"); return y27; }, flush() {} },
      ContentService: { createTextOutput: (t: string) => ({ setMimeType: () => JSON.parse(t) }), MimeType: { JSON: "json" } },
    });
    vm.runInContext(invoices, ctx);
    vm.runInContext(`const YEAR_SHEETS = { 2027: '${Y27}' };`, ctx);
    post = (d) => (ctx.doPost as (e: unknown) => ReturnType<typeof post>)({ postData: { contents: JSON.stringify({ secret: "s", kind: "invoice", ...d }) } });
  });
  const inv = { number: "INV-2027-001", clientEmail: "x@example.com", clientPhone: "", tour: "Day trip", departure: "2027-04-02", people: 2, depositEur: "10.00", balanceEur: "40.00" };

  it("fix2027Tabs and tidyRun also cover booking 27", () => {
    run("fix2027Tabs");
    expect(y27.sheets[0].cell(2, 1).v, "headers moved to row 2 in booking 27").toBe("TOUR BOOKED");
    expect(logs.join("\n")).toContain("booking 27 › April27: headers are now in row 2");
    logs = [];
    run("tidyRun");
    expect(y27.sheets[0].cell(3, 1).v, "the booking sorted up to row 3").toBe("Agadir Chegaga");
    expect(logs.join("\n")).toContain("booking 27 › April27");
  });

  it("a 2027 departure goes to booking 27 in date order; bookings26's old 2027 tab is untouched", () => {
    run("fix2027Tabs");
    const old = JSON.stringify(tab("april27").grid);
    const r = post(inv);
    expect(r).toMatchObject({ ok: true, file: "booking 27", tab: "April27", row: 3, sorted: "sorted" });
    expect(y27.sheets[0].cell(3, 3).v).toBe("x@example.com");
    expect(y27.sheets[0].cell(4, 1).v, "2 Apr goes before the 14 Apr booking").toBe("Agadir Chegaga");
    expect(JSON.stringify(tab("april27").grid), "bookings26's old 2027 tab gets no new rows").toBe(old);
    // re-sending finds it in booking 27, never a second row
    expect(post({ ...inv, people: 3 })).toMatchObject({ ok: true, file: "booking 27", updated: true, row: 3 });
    // a 2026 departure still goes to bookings26
    expect(post({ ...inv, number: "INV-2026-300", departure: "2026-11-04" })).toMatchObject({ ok: true, file: "bookings26", tab: "November26" });
  });

  it("refuses clearly, writing nothing, while booking 27 still has its headers in row 1", () => {
    const before = JSON.stringify(y27.sheets[0].grid);
    const r = post(inv);
    expect(r.ok).toBe(false);
    expect(r.error).toContain("has no TOUR BOOKED header in row 2");
    expect(JSON.stringify(y27.sheets[0].grid)).toBe(before);
  });
});

/**
 * 2026-10-28: the first invoice-written booking (INV-2026-049) showed its date
 * as "12/15/2026", its deposit row came out with an EMPTY Date trip, and a
 * DEPOSIT DATE in the same tab showed as a raw number (46316.46967).
 * repairDates fixes what already went wrong: formats only, plus filling an
 * EMPTY Date trip from the booking its Ref points to. Never a typed value.
 */
describe("repairDates", () => {
  let dep: Spreadsheet;
  beforeEach(() => {
    const nov = tab("November26");
    nov.cell(2, 13).v = "INVOICE";
    nov.cell(9, 13).v = "INV-2026-900";
    nov.cell(9, 2).v = new Date(2026, 10, 14, 12); nov.cell(9, 2).fmt = "M/d/yyyy";   // written by the invoices file
    nov.cell(6, 12).v = 46316.46967;                                                    // a deposit date that lost its format
    dep = new Spreadsheet("Deposit");
    const oct = new Sheet(dep, "October deposit");
    ["Deposit", "Tour/trek", "Name guest", "Date trip", "Guests", "", "Arrived", "Ref"].forEach((h, i) => { oct.cell(2, i + 1).v = h; });
    [40, "Shared Merzouga", "b@example.com", "", 1, "", "28/10/2026", "November26-3fc0e7d9"].forEach((v, i) => { oct.cell(3, i + 1).v = v; });
    [75, "Typed by hand", "z@example.com", "", 5].forEach((v, i) => { oct.cell(4, i + 1).v = v; });  // no Ref: never touched
    dep.sheets.push(oct);
    Object.assign(ctx, {
      SpreadsheetApp: { getActive: () => ss, getActiveSpreadsheet: () => ss, openByUrl: () => dep, flush() {} },
      depositUrl_: () => "https://example.com/deposit",
    });
    // stands in for the deposit file's depositTripDate_ (live project only)
    vm.runInContext("function depositTripDate_(t, s) { t.setValue(s.getValue()); }", ctx);
  });

  it("repairs formats and fills only an empty Date trip that has a Ref", () => {
    const values = JSON.stringify(tab("November26").grid.map((r) => r.map((c) => c.v)));
    run("repairDates");
    const nov = tab("November26");
    expect(nov.cell(6, 12).fmt, "the raw-number deposit date is a date again").toBe("dd/mm/yyyy");
    expect(nov.cell(9, 2).fmt, "the invoice-written date gets the team's style").toBe("ddd, d mmm yyyy");
    expect(nov.cell(5, 2).fmt, "a typed date is left alone").toBeUndefined();
    expect(JSON.stringify(nov.grid.map((r) => r.map((c) => c.v))), "no value in bookings26 changes").toBe(values);
    expect(dep.sheets[0].cell(3, 4).v, "Date trip filled from the booking its Ref points to").toBe("Thu, 5 Nov 2026");
    expect(dep.sheets[0].cell(4, 4).v, "a row without a Ref is never touched").toBe("");
    expect(logs.join("\n")).toContain("October deposit row 3: Date trip filled in");
  });

  it("a second run changes nothing", () => {
    run("repairDates");
    logs = [];
    run("repairDates");
    expect(logs.join("\n")).toContain("Nothing needed repairing.");
  });
});

/**
 * 2026-10-28, owner: "i want each booking to be in the cell that is as the
 * date like is a booking is in 13th the info should be in the 13th cell".
 * Rows 1 (totals) and 2 (headers) are taken, so the owner chose a DAY column
 * at the far left showing 1..31, and for a second booking on the same day an
 * extra row under the last day, highlighted.
 *
 * What can go wrong on the live sheet, and is checked here:
 *   - the new column shifts every other column one to the right: the deposit
 *     link, the invoices file and the team app find columns by header name,
 *     so they must still work (the invoice test below writes through it);
 *   - a booking moved below the totals' range (=SUM(F3:F100)) would silently
 *     drop out of the total, so such a tab must be refused, untouched;
 *   - the PAYMENT dropdowns stop at row 30 in some tabs, so days 29-31 would
 *     have none: they are copied into EMPTY cells only;
 *   - a second booking on a day goes right under the first (owner: "they
 *     should be close to each other") and must never push it off its row.
 */
describe("day layout (DAY column)", () => {
  const PAY = ["MADE A DEPOSIT", "DEPOSIT ARRIVED", "nothing yet"];
  const rule = (list: string[]): Rule => ({ getCriteriaType: () => "VALUE_IN_LIST", getCriteriaValues: () => [list, true] });
  const nov = () => tab("November26");
  // a row's own cells, without the DAY column
  const body = (s: Sheet, r: number) => JSON.stringify(s.grid[r - 1].slice(1).map((c) => [c.v, c.f, c.note, c.bg]));
  const before = (s: Sheet, r: number) => JSON.stringify(s.grid[r - 1].map((c) => [c.v, c.f, c.note, c.bg]));
  let post: (d: Record<string, unknown>) => { ok: boolean; tab?: string; row?: number; sorted?: string; error?: string };

  beforeEach(() => {
    const r = rule(PAY);
    for (let i = 3; i <= 28; i++) nov().cell(i, 5).dv = r;                // like the live tabs: dropdowns stop early
    const invoices = readFileSync(path.join(process.cwd(), "docs/apps-script-bookings.gs"), "utf8").replace("PASTE-THE-SECRET-HERE", "s");
    Object.assign(ctx, {
      SpreadsheetApp: { getActive: () => ss, getActiveSpreadsheet: () => ss, flush() {}, CopyPasteType: { PASTE_FORMAT: "format" } },
      ContentService: { createTextOutput: (t: string) => ({ setMimeType: () => JSON.parse(t) }), MimeType: { JSON: "json" } },
    });
    vm.runInContext(invoices, ctx);
    post = (d) => (ctx.doPost as (e: unknown) => ReturnType<typeof post>)({ postData: { contents: JSON.stringify({ secret: "s", kind: "invoice", ...d }) } });
  });

  it("daysPreview changes nothing and says where each booking would go", () => {
    const was = snapshot();
    run("daysPreview");
    expect(snapshot()).toBe(was);
    const log = logs.join("\n");
    expect(log).toContain("[a DAY column would be added at the far left] November26: 4 booking(s), each on its day's row (row 3 = day 1; a day with two bookings has two rows)");
    expect(log).toContain("row 5, day 3: 3 November 2026");
    expect(log).toContain("row 16, day 14: Sat, 14 Nov 2026");
  });

  it("puts each booking on its day's row, whole, with the DAY column showing 1 to 30", () => {
    const s = nov();
    const was = { d3: before(s, 5), d5: before(s, 4), d6: before(s, 6), d14: before(s, 9) };
    run("daysRun");
    expect(s.cell(2, 1).v).toBe("DAY");
    expect(s.cell(2, 2).v, "every other column moved one to the right").toBe("TOUR BOOKED");
    expect(s.grid.slice(2, 32).map((r) => r[0].v), "row 3 = day 1 … row 32 = day 30").toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    expect(body(s, 5)).toBe(was.d3);
    expect(body(s, 7)).toBe(was.d5);
    expect(body(s, 8)).toBe(was.d6);
    expect(body(s, 16)).toBe(was.d14);
    expect(s.cell(7, 13).note, "the deposit link's Ref stays on its own booking").toBe("November26-3fc0e7d9|auto");
    expect(s.cell(16, 9).f, "a same-row formula travels with its row").toBe("=R[0]C[-2]+R[0]C[-1]");
    expect(s.cell(1, 7).f, "the total moved with its column, nothing else").toBe("=SUM(R[2]C:R[29]C)");
    const bookingsAt = s.grid.map((r, i) => (r[1].v !== "" && i > 1 ? i + 1 : 0)).filter(Boolean);
    expect(bookingsAt, "no booking anywhere else").toEqual([5, 7, 8, 16]);
    expect(ss.sheets.some((x) => x.name.startsWith("~tidy")), "rehearsal copy deleted").toBe(false);
    expect(tab("Notes").cell(3, 1).v).toBe("free text");
  });

  it("copies the PAYMENT dropdown into empty rows that had none, never over a value", () => {
    const s = nov();
    s.cell(10, 1).v = "Private trip"; s.cell(10, 2).v = "30 Nov 2026"; s.cell(10, 3).v = "z@example.com"; s.cell(10, 5).v = "PAID CASH";
    s.cell(10, 5).dv = null;                                       // a booking with a typed value and no dropdown
    run("daysRun");
    expect(s.cell(32, 2).v, "30 Nov on row 32").toBe("Private trip");
    expect(s.cell(32, 6).dv, "a cell holding a value keeps no dropdown").toBeNull();
    expect(s.cell(31, 6).dv, "day 29, beyond the old dropdown range, now has one").not.toBeFalsy();
    expect(logs.join("\n")).toMatch(/The PAYMENT dropdown was added to \d+ empty row\(s\) that had none/);
  });

  /**
   * First version (2026-10-28) put a second booking on the same day in an
   * extra row under day 31. The owner saw December's two 22 Dec bookings
   * twelve rows apart and said "they should be close to each other".
   */
  it("a second booking on the same day goes right under the first; later days move down one row", () => {
    const s = nov();
    ["Second Merzouga", "Thu, 5 Nov 2026", "e@example.com", 2, "MADE A DEPOSIT", 50, 150].forEach((v, j) => { s.cell(12, j + 1).v = v; });
    run("daysRun");
    expect(s.cell(7, 4).v, "the first 5 Nov booking (row 4 before) is on the first day-5 row").toBe("b@example.com");
    expect(s.cell(8, 4).v, "the second 5 Nov booking is right under it").toBe("e@example.com");
    expect([s.cell(7, 1).v, s.cell(8, 1).v], "the DAY column shows 5 twice").toEqual([5, 5]);
    expect(s.cell(9, 1).v).toBe(6);
    expect(s.cell(9, 4).v, "6 Nov one row lower").toBe("c@example.com");
    expect(s.cell(17, 1).v).toBe(14);
    expect(s.cell(17, 4).v).toBe("a@example.com");
    expect(s.cell(33, 1).v, "day 30 is one row lower too").toBe(30);
    expect(s.grid.slice(2, 33).every((r) => r[0].note === "" && r[0].bg === "#efefef"), "rows 3-33: no notes or yellow needed").toBe(true);
    expect(s.cell(34, 1).v, "nothing below the last day").toBe("");
    // a later run must not swap them
    run("daysRun");
    expect(s.cell(7, 4).v).toBe("b@example.com");
    expect(s.cell(8, 4).v).toBe("e@example.com");
  });

  it("a booking with no date I can read goes after the last day, with ? in DAY", () => {
    const s = nov();
    ["Undated trip", "soon", "u@example.com", 2].forEach((v, j) => { s.cell(12, j + 1).v = v; });
    run("daysRun");
    expect(s.cell(33, 4).v).toBe("u@example.com");
    expect(s.cell(33, 1).v).toBe("?");
    expect(s.cell(33, 1).bg).toBe("#ffe599");
    expect(s.cell(33, 1).note).toContain("Check the DATE");
    expect(logs.join("\n")).toContain('no date I can read, so it goes after the last day, with "?" in DAY');
  });

  it("a tab already laid out the old way (second booking under day 31) is pulled together, and old notes cleared", () => {
    run("daysRun");
    const s = nov();
    // what the first version did on the live sheet: a second 5 Nov booking in row 33, with notes
    ["Second Merzouga", "Thu, 5 Nov 2026", "e@example.com", 2].forEach((v, j) => { s.cell(33, j + 2).v = v; });
    s.cell(33, 1).v = 5; s.cell(33, 1).bg = "#ffe599"; s.cell(33, 1).note = "Second booking on day 5 (the first is in row 7).";
    s.cell(7, 1).note = "Another booking on this day is in row 33.";
    run("daysRun");
    expect(s.cell(8, 4).v).toBe("e@example.com");
    expect(s.cell(7, 1).note).toBe("");
    expect(s.grid.slice(2).every((r) => r[0].bg !== "#ffe599"), "no yellow left").toBe(true);
  });

  it("a second run changes nothing", () => {
    run("daysRun");
    const once = snapshot();
    logs = [];
    run("daysRun");
    expect(snapshot()).toBe(once);
    expect(logs.join("\n")).toContain("Nothing was moved");
  });

  it("a new invoice goes straight onto its day's row, a second one on that day right under it", () => {
    run("daysRun");
    const s = nov();
    const r1 = post({ number: "INV-2026-500", clientName: "T", clientEmail: "n1@example.com", clientPhone: "", tour: "Ourika day", departure: "2026-11-04", people: 2, depositEur: "20.00", balanceEur: "80.00" });
    expect(r1).toMatchObject({ ok: true, tab: "November26", row: 6 });
    expect(s.cell(6, 1).v).toBe(4);
    expect(s.cell(6, 4).v).toBe("n1@example.com");
    const r2 = post({ number: "INV-2026-501", clientName: "U", clientEmail: "n2@example.com", clientPhone: "", tour: "Agafay", departure: "2026-11-04", people: 3, depositEur: "30.00", balanceEur: "90.00" });
    expect(r2).toMatchObject({ ok: true, row: 7, sorted: "sorted" });
    expect([s.cell(6, 1).v, s.cell(7, 1).v]).toEqual([4, 4]);
    expect(s.cell(6, 4).v, "the first invoice for that day keeps its row").toBe("n1@example.com");
    expect(s.cell(7, 4).v).toBe("n2@example.com");
    expect(s.cell(8, 4).v, "the 5 Nov booking one row lower, whole").toBe("b@example.com");
    expect(s.cell(8, 13).note, "its deposit Ref went with it").toBe("November26-3fc0e7d9|auto");
    expect(post({ number: "INV-2026-501", clientName: "U", clientEmail: "n2@example.com", clientPhone: "", tour: "Agafay", departure: "2026-11-04", people: 4, depositEur: "30.00", balanceEur: "90.00" }),
      "a re-send updates its own row").toMatchObject({ ok: true, row: 7, updated: true });
  });

  it("refuses a tab whose totals would miss a booking, and leaves it exactly as it was", () => {
    const s = nov();
    s.cell(1, 6).f = "=SUM(F3:F20)";
    ["Late trip", "30 Nov 2026", "y@example.com", 2, "MADE A DEPOSIT", 10, 40].forEach((v, j) => { s.cell(11, j + 1).v = v; });
    const was = JSON.stringify(s.grid);
    run("daysRun");
    expect(JSON.stringify(s.grid)).toBe(was);
    expect(logs.join("\n")).toContain("November26: NOT CHANGED, because the totals above the headers only add up to row 20, and a booking would go to row 32");
  });

  it("if the rehearsal loses a note, the tab is not reordered and the DAY column is taken out again", () => {
    ss.sortLeavesNotes = true;
    const s = nov();
    s.cell(9, 12).note = "November26-ab9549ca|auto";                  // on a booking that moves
    const was = s.grid.map((r) => JSON.stringify(r.map((c) => [c.v, c.f, c.note])));
    run("daysRun");
    expect(s.cell(2, 1).v, "no DAY column").toBe("TOUR BOOKED");
    expect(s.grid.slice(0, was.length).map((r) => JSON.stringify(r.map((c) => [c.v, c.f, c.note]))), "every original row as it was").toEqual(was);
    expect(s.grid.slice(was.length).every((r) => r.every((c) => c.v === "" && c.note === "")), "only empty rows added").toBe(true);
    expect(logs.join("\n")).toMatch(/November26: NOT CHANGED\. The test sort failed .*The DAY column was taken out again\./);
  });

  it("leaves bookings26's old 2027 tabs alone when 2027 has its own spreadsheet", () => {
    const y27 = new Spreadsheet("booking 27");
    const apr = new Sheet(y27, "April27");
    HEAD.forEach((h, i) => { apr.cell(2, i + 1).v = h; });
    ["Agadir Chegaga", "14-04-2027", "t@example.com", 4, "MADE A DEPOSIT", 248, 992].forEach((v, j) => { apr.cell(15, j + 1).v = v; });
    y27.sheets.push(apr);
    Object.assign(ctx, { SpreadsheetApp: { getActive: () => ss, getActiveSpreadsheet: () => ss, openByUrl: () => y27, flush() {}, CopyPasteType: { PASTE_FORMAT: "format" } } });
    vm.runInContext("const YEAR_SHEETS = { 2027: 'https://docs.google.com/spreadsheets/d/y27/edit' };", ctx);
    const old = JSON.stringify(tab("april27").grid);
    run("daysRun");
    expect(JSON.stringify(tab("april27").grid), "bookings26's april27 untouched").toBe(old);
    expect(apr.cell(2, 1).v).toBe("DAY");
    expect(apr.cell(16, 4).v, "14 April on row 16 in booking 27").toBe("t@example.com");
    expect(logs.join("\n")).toContain("booking 27 › April27: 1 booking(s)");
  });
});
