import { describe, it, expect, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";

/**
 * docs/apps-script-team-app.gs is the logistics team's phone app, bound to the
 * owner's Deposit sheet. It reads bookings26 for the details (pick-up, camp,
 * driver) and writes ONE thing: the "Done" mark. The owner's rule for both
 * sheets is "do not lose any data", and the deposit automation (deposits-link
 * v7) must keep working: it finds its rows by the hidden Ref column and
 * deletes them when a deposit is un-marked.
 *
 * Born from INV-2026-033: the camp promised to the client never
 * reached the team. The app puts the camp first on every trip; this suite pins
 * that the details are joined to the RIGHT booking (by Ref, or for deposits
 * typed by hand by the same EMAILS + date, never by a guess), that nothing but
 * the Done cell is ever written, and that a stale phone cannot mark the wrong
 * row after the deposit script deleted one.
 */
type Cell = { v: unknown; note: string; fmt: string };
const blank = (): Cell => ({ v: "", note: "", fmt: "General" });
const pad = (n: number) => String(n).padStart(2, "0");
const show = (v: unknown) =>
  v instanceof Date ? `${pad(v.getDate())}/${pad(v.getMonth() + 1)}/${v.getFullYear()}` : String(v);

class Sheet {
  grid: Cell[][] = [];
  constructor(public name: string, rows: unknown[][], public maxCols = 12) {
    for (let r = 0; r < 40; r++) this.grid.push(Array.from({ length: maxCols }, blank));
    rows.forEach((row, r) => row.forEach((v, c) => { this.grid[r][c].v = v; }));
  }
  cell(r: number, c: number) {
    while (this.grid[0].length < c) for (const row of this.grid) row.push(blank());
    this.maxCols = Math.max(this.maxCols, this.grid[0].length);
    return this.grid[r - 1][c - 1];
  }
  getName() { return this.name; }
  getMaxColumns() { return this.maxCols; }
  insertColumnsAfter(_after: number, n: number) { this.cell(1, this.maxCols + n); }
  getLastRow() { let l = 0; this.grid.forEach((row, i) => { if (row.some((c) => c.v !== "")) l = i + 1; }); return l; }
  getLastColumn() { let l = 0; for (const row of this.grid) row.forEach((c, i) => { if (c.v !== "") l = Math.max(l, i + 1); }); return l; }
  getRange(r: number | string, c = 1, nr = 1, nc = 1) {
    if (typeof r === "string") { c = r.charCodeAt(0) - 64; r = Number(r.slice(1)); }
    const R = r as number;
    const cells = () => Array.from({ length: nr }, (_, i) => Array.from({ length: nc }, (_, j) => this.cell(R + i, c + j)));
    const range = {
      getValue: () => this.cell(R, c).v,
      getValues: () => cells().map((row) => row.map((x) => x.v)),
      getDisplayValues: () => cells().map((row) => row.map((x) => show(x.v))),
      getNotes: () => cells().map((row) => row.map((x) => x.note)),
      setValue: (v: unknown) => { this.cell(R, c).v = v; return range; },
      setNote: (n: string) => { this.cell(R, c).note = n; return range; },
      setNumberFormat: (f: string) => { this.cell(R, c).fmt = f; return range; },
      setFontWeight: () => range,
      setHorizontalAlignment: () => range,
      clearContent: () => { cells().flat().forEach((x) => { x.v = ""; }); return range; },
      clearNote: () => { cells().flat().forEach((x) => { x.note = ""; }); return range; },
    };
    return range;
  }
}
class Book {
  constructor(public sheets: Sheet[]) {}
  getSheets() { return this.sheets; }
  getSheetByName(n: string) { return this.sheets.find((s) => s.name === n) ?? null; }
}

const day = (s: string) => new Date(`${s}T12:00:00`);
const BOOK_HEAD = ["TOUR BOOKED", "DATE", "EMAILS", "CLIENTE", "PAYMENT", "DEPOSIT", "AMOUNT LEFT", "PICK UP - DROP OFF", "DRIVER", "accomodation", "", "DEPOSIT DATE"];
const DEP_HEAD = ["Deposit", "Tour/trek", "Name guest", "Date trip", "Guests", "", "Arrived", "Ref"];

let deposit: Book, bookings: Book, run: (fn: string, ...a: unknown[]) => any, user: string;
const URL = "https://docs.google.com/spreadsheets/d/test/edit";

function load(bookingsUrl = URL, years: Record<number, [string, Book]> = {}) {
  const yearUrls = Object.fromEntries(Object.entries(years).map(([y, [u]]) => [y, u]));
  const src = readFileSync(path.join(process.cwd(), "docs/apps-script-team-app.gs"), "utf8")
    .replace("PASTE-THE-BOOKINGS26-LINK-HERE", bookingsUrl)
    .replace("const YEAR_BOOKINGS_SHEETS = {};", `const YEAR_BOOKINGS_SHEETS = ${JSON.stringify(yearUrls)};`);
  const ctx: Record<string, unknown> = {
    SpreadsheetApp: {
      getActiveSpreadsheet: () => deposit,
      openByUrl: (u: string) => {
        if (u === URL) return bookings;
        const hit = Object.values(years).find(([url]) => url === u);
        if (hit) return hit[1];
        throw new Error("no access");
      },
    },
    Session: { getActiveUser: () => ({ getEmail: () => user }) },
    LockService: { getDocumentLock: () => ({ waitLock() {}, releaseLock() {} }) },
    Utilities: {
      formatDate: (d: Date, tz: string, f: string) => {
        const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false })
          .formatToParts(d).map((x) => [x.type, x.value]));
        return f.replace("yyyy", p.year).replace("MM", p.month).replace("dd", p.day).replace("HH", p.hour).replace("mm", p.minute);
      },
    },
  };
  vm.createContext(ctx);
  vm.runInContext(src, ctx);
  run = (fn, ...a) => (ctx[fn] as (...x: unknown[]) => unknown)(...a);
}

beforeEach(() => {
  user = "team@example.com";
  const nov = new Sheet("November26", [
    ["NOVEMBER26"],
    BOOK_HEAD,
    ["Agafay dinner", day("2026-11-26"), "ana@example.com — +33 6 12 34 56 78", 6, "DEPOSIT ARRIVED", 90, 360, "Parking El Moukef, 11:00", "Hassan", "Trigados Camp, family table", "vegetarian x2", day("2026-10-20")],
    ["Zagora 2 days", day("2026-11-28"), "bo@example.com", 2, "DEPOSIT ARRIVED", 40, 160, "Riad A", "", "", "", ""],
    ["Zagora 2 days", day("2026-11-28"), "cy@example.com", 2, "DEPOSIT ARRIVED", 40, 160, "Riad B", "", "", "", ""],
  ]);
  nov.cell(3, 12).note = "November26-aa11bb22|auto";
  bookings = new Book([nov]);

  const octDep = new Sheet("October deposit", [
    [580],
    DEP_HEAD,
    [90, "Agafay dinner", "ana@example.com — +33 6 12 34 56 78", day("2026-11-26"), 6, "", day("2026-10-20"), "November26-aa11bb22"],
    [40, "Zagora 2 days", "bo@example.com", day("2026-11-28"), 2],          // typed by hand: no Ref
    [40, "Zagora 2 days", "dd@example.com", day("2026-11-28"), 2],          // no booking with this email
  ]);
  const overview = new Sheet("Overview", [["Deposits by month"], ["Month", "Deposits received", "Number of deposits"], ["October 2026", 580, 3]]);
  deposit = new Book([octDep, overview]);
  load();
});

const snap = (b: Book) => JSON.stringify(b.sheets.map((s) => s.grid));

describe("team app script", () => {
  it("lists every deposit row (not the Overview), with plain JSON only", () => {
    const out = run("teamTrips");
    expect(out.trips.map((t: { guest: string }) => t.guest)).toEqual([
      "ana@example.com — +33 6 12 34 56 78", "bo@example.com", "dd@example.com",
    ]);
    // google.script.run cannot carry Date objects: everything must survive JSON
    expect(JSON.parse(JSON.stringify(out)), "teamTrips must return strings/numbers only").toEqual(out);
    expect(out.trips[0]).toMatchObject({ dateIso: "2026-11-26", arrivedIso: "2026-10-20", guests: "6", deposit: "90" });
  });

  // The owner's first look at the preview read as "only this month's trips".
  // Deposit tabs are by the month the money ARRIVED, so a January trip can sit
  // in the November tab: every deposit tab must be read, whatever the month.
  it("returns trips from every deposit tab and every future month", () => {
    deposit.sheets.splice(1, 0, new Sheet("November deposit", [
      [100], DEP_HEAD,
      [60, "Toubkal 2 days", "ed@example.com", day("2027-01-15"), 3],
      [40, "Ourika day", "fa@example.com", day("2026-12-02"), 2],
    ]));
    const dates = run("teamTrips").trips.map((t: { dateIso: string }) => t.dateIso).sort();
    expect(dates, "a deposit tab or a later month was skipped").toEqual(
      ["2026-11-26", "2026-11-28", "2026-11-28", "2026-12-02", "2027-01-15"],
    );
  });

  // Live on the owner's sheet the app showed only the current month: the older
  // tabs were made by hand (header in row 1, other wording, dates typed as
  // text) and the first version only accepted "Deposit" in cell A2.
  it("reads hand-made older tabs: header in any of the first rows, other wording, typed dates", () => {
    deposit.sheets.unshift(new Sheet("September depo", [
      ["DEPOSITS", "Tour", "Name", "Date"],
      [30, "Ourika day", "gi@example.com", "28/11/2026"],
      [25, "Imlil day", "ha@example.com", "05/12/26"],
    ]));
    const out = run("teamTrips");
    expect(out.tabs.map((t: { name: string }) => t.name), "the Overview tab is not a deposit tab").toEqual(["September depo", "October deposit"]);
    const sept = out.trips.filter((t: { tab: string }) => t.tab === "September depo");
    expect(sept.map((t: { dateIso: string; guest: string; deposit: string; row: number }) => [t.dateIso, t.guest, t.deposit, t.row])).toEqual([
      ["2026-11-28", "gi@example.com", "30", 2], ["2026-12-05", "ha@example.com", "25", 3],
    ]);
    // and marking one done writes its Done header on THAT tab's header row (row 1)
    expect(run("teamMarkDone", "September depo", 2, sept[0].key, true).ok).toBe(true);
    const tab = deposit.sheets[0];
    const col = tab.grid[0].findIndex((c) => c.v === "Done") + 1;
    expect(col).toBeGreaterThanOrEqual(10);
    expect(tab.cell(2, col).v).not.toBe("");
    expect(tab.grid[1].slice(0, 4).map((c) => c.v)).toEqual([30, "Ourika day", "gi@example.com", "28/11/2026"]);
  });

  it("joins the camp, pick-up and driver from bookings26 by the deposit script's Ref", () => {
    const t = run("teamTrips").trips[0];
    expect(t.b).toMatchObject({
      tab: "November26", row: 3, accom: "Trigados Camp, family table", pickup: "Parking El Moukef, 11:00",
      driver: "Hassan", left: "360", pax: "6",
    });
    expect(t.b.notes, "column K (no header) is shown as notes").toEqual(["vegetarian x2"]);
  });

  it("matches a hand-typed deposit only by the same EMAILS and date, never by a guess", () => {
    const [, bo, dd] = run("teamTrips").trips;
    expect(bo.b).toMatchObject({ row: 4, pickup: "Riad A" });
    expect(dd.b, "same tour and date but another client: no details rather than the wrong ones").toBeNull();
  });

  it("marks done by writing ONE cell, never into the deposit script's columns, and undo clears only it", () => {
    const before = snap(deposit);
    const bookingsBefore = snap(bookings);
    const t = run("teamTrips").trips[1];
    expect(run("teamMarkDone", t.tab, t.row, t.key, true)).toMatchObject({ ok: true });

    const tab = deposit.sheets[0];
    const doneCol = tab.grid[1].findIndex((c) => c.v === "Done") + 1;
    expect(doneCol, "Done goes after Arrived/Ref (G/H), from column J").toBeGreaterThanOrEqual(10);
    const changed: string[] = [];
    const was = JSON.parse(before)[0];
    tab.grid.forEach((row, r) => row.forEach((c, i) => {
      const old = was[r]?.[i] ?? { v: "", note: "" };
      if (JSON.stringify(c.v) !== JSON.stringify(old.v) || c.note !== old.note) changed.push(`${r + 1}:${i + 1}`);
    }));
    expect(changed.sort()).toEqual([`2:${doneCol}`, `4:${doneCol}`].sort());
    expect(tab.cell(4, doneCol).note).toContain("team@example.com");
    expect(snap(bookings), "bookings26 is read only").toBe(bookingsBefore);
    expect(run("teamTrips").trips[1].doneIso).not.toBe("");

    expect(run("teamMarkDone", t.tab, t.row, t.key, false)).toMatchObject({ ok: true, doneIso: "" });
    expect(tab.cell(4, doneCol)).toMatchObject({ v: "", note: "" });
  });

  it("refuses when the row moved (the deposit script deleted one) and changes nothing", () => {
    const t = run("teamTrips").trips[2];
    deposit.sheets[0].grid.splice(3, 1);                                   // row 4 deleted: dd@ is now row 4
    deposit.sheets[0].grid.push(Array.from({ length: 12 }, blank));
    const before = snap(deposit);
    const r = run("teamMarkDone", t.tab, t.row - 1, t.key.replace("dd@", "bo@"), true);
    expect(r.ok).toBe(false);
    expect(run("teamMarkDone", t.tab, t.row, t.key, true).ok, "the old row number now points past the data").toBe(false);
    expect(snap(deposit)).toBe(before);
  });

  it("still lists the trips when bookings26 is not linked or not shared", () => {
    load("PASTE-THE-BOOKINGS26-LINK-HERE");
    const unset = run("teamTrips");
    expect(unset.bookings).toBe("unset");
    expect(unset.trips).toHaveLength(3);
    load("https://docs.google.com/spreadsheets/d/other/edit");
    expect(run("teamTrips").bookings).toBe("no-access");
  });
});

/**
 * 2026-10-28, owner: 2027 bookings live in their own spreadsheet ("booking
 * 27"), while bookings26 still holds copies of the same 2027 rows in its old
 * 2027 tabs. If the app read both, a deposit typed by hand would match two
 * bookings (same EMAILS + date) and show none: the join only accepts a single
 * match. So for a year with its own spreadsheet, bookings26's tabs of that
 * year are skipped.
 */
describe("a year with its own bookings spreadsheet", () => {
  it("joins 2027 trips to booking 27 and ignores bookings26's copies", () => {
    const row = ["Family desert 4 days", day("2027-01-05"), "el@example.com", 5, "MADE A DEPOSIT", 280, 1120, "Riad Konouz", "", "Camp X"];
    bookings.sheets.push(new Sheet("january 27", [[""], BOOK_HEAD, row]));               // the old copy
    const y27 = new Book([new Sheet("January 27", [[""], BOOK_HEAD, [...row.slice(0, 9), "Camp from booking 27"]])]);
    deposit.sheets[0].grid[6][0].v = 280;
    ["Family desert 4 days", "el@example.com", day("2027-01-05"), 5].forEach((v, i) => { deposit.sheets[0].grid[6][[1, 2, 3, 4][i]].v = v; });
    load(URL, { 2027: ["https://docs.google.com/spreadsheets/d/y27/edit", y27] });
    const trip = run("teamTrips").trips.find((t: { guest: string }) => t.guest === "el@example.com");
    expect(trip.b, "two copies of the booking would block the EMAILS + date match").not.toBeNull();
    expect(trip.b.tab).toBe("January 27");
    expect(JSON.stringify(trip.b)).toContain("Camp from booking 27");
    // 2026 trips still come from bookings26
    const ana = run("teamTrips").trips.find((t: { guest: string }) => t.guest.startsWith("ana@"));
    expect(ana.b.tab).toBe("November26");
  });
});
