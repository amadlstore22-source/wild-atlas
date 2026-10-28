/**
 * MET — team trips app   (a NEW script in the DEPOSIT sheet, not in bookings26)
 *
 * A phone app for the logistics team. It shows ONLY the trips whose deposit
 * has arrived (the Deposit sheet), sorted by departure date. Tap a client to
 * see everything for that trip: tour, guests, pick-up, camp / accommodation,
 * driver, amount left to collect, contact, trip details, notes. Each trip can
 * be marked DONE once it has run.
 *
 * Where the details come from: the Deposit sheet has the amount, tour, guest,
 * date and guests. The rest (pick-up, camp, driver...) is read from bookings26,
 * matched by the hidden Ref the deposit script writes (or, for deposits typed
 * by hand, by the same EMAILS and departure date). bookings26 is only READ.
 *
 * WHAT IT WRITES: nothing, except when someone taps "Mark as done": the date
 * goes into a "Done" column on that deposit tab (added after your last used
 * column), with a note saying who marked it. "Undo" empties that one cell.
 * It never changes any other cell, never adds or deletes rows, and never
 * touches bookings26. The deposit automation keeps working as before.
 *
 * WHO CAN SEE IT: Google checks it. The app runs as the person opening it, so
 * it only opens for Google accounts that already have access to the Deposit
 * sheet (edit, to mark trips done) and to bookings26 (view is enough). Anyone
 * else who gets the link sees an error, not your clients.
 *
 * SETUP (once):
 *   1. Deposit sheet → Extensions → Apps Script. Paste this file into Code.gs
 *      (replace what is there if it is empty / only "myFunction").
 *   2. "+" next to Files → HTML → name it exactly  Index  → paste
 *      apps-script-team-app.html into it.
 *   3. Put the bookings26 link between the quotes on the BOOKINGS_SHEET_URL line,
 *      and the link of each year that has its own bookings spreadsheet in
 *      YEAR_BOOKINGS_SHEETS (2027 → "booking 27").
 *   4. Deploy → New deployment → type "Web app" →
 *        Execute as: User accessing the web app
 *        Who has access: Anyone with Google account
 *      → Deploy. Copy the Web app URL.
 *   5. On each phone: open the URL in Chrome (signed in with the Google account
 *      that has access to the sheets) → allow access → ⋮ menu → Add to Home
 *      screen.
 */

const BOOKINGS_SHEET_URL = 'PASTE-THE-BOOKINGS26-LINK-HERE';   // ← the bookings26 link
// Years whose bookings live in their own spreadsheet (owner, 2026-10-28), e.g.
//   { 2027: 'https://docs.google.com/spreadsheets/d/…' }
// For those years bookings26's own month tabs are skipped: they still hold
// copies of the same bookings, and two copies would block the EMAILS + date
// match below.
const YEAR_BOOKINGS_SHEETS = {};
const TEAM_TZ = 'Africa/Casablanca';
const TEAM_HEADER_ROW = 2;
const TEAM_DONE_MIN_COL = 10;   // a new Done column never lands before J (G/H are the deposit script's)

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('MET Trips')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover')
    .addMetaTag('mobile-web-app-capable', 'yes')
    .setFaviconUrl('https://marrakechecotours.com/apple-icon.png');
}

/** Everything the app shows. Plain strings and numbers only (no Date objects). */
function teamTrips() {
  const dep = SpreadsheetApp.getActiveSpreadsheet();
  const out = { today: teamIso_(new Date()), user: '', bookings: 'ok', trips: [] };
  try { out.user = Session.getActiveUser().getEmail() || ''; } catch (err) { out.user = ''; }

  let index = null;
  try {
    index = teamBookingsIndex_();
  } catch (err) {
    out.bookings = String(err.message || err).indexOf('UNSET') === 0 ? 'unset' : 'no-access';
  }

  // EVERY deposit tab: past months, this month, and the ones added later.
  // Older tabs were set up by hand, so the header row is found by its names
  // (Deposit, Tour/trek, Name guest, Date trip), not by a fixed cell.
  out.tabs = [];
  dep.getSheets().forEach(function (tab) {
    const L = teamDepositLayout_(tab);
    if (!L) return;
    const c = L.cols;
    const last = tab.getLastRow();
    const w = tab.getLastColumn();
    const tabInfo = { name: tab.getName(), trips: 0 };
    out.tabs.push(tabInfo);
    if (last <= L.headerRow) return;
    const rng = tab.getRange(L.headerRow + 1, 1, last - L.headerRow, w);
    const vals = rng.getValues();
    const disp = rng.getDisplayValues();
    const notes = c.done >= 0 ? tab.getRange(L.headerRow + 1, c.done + 1, last - L.headerRow, 1).getNotes() : null;

    disp.forEach(function (d, i) {
      const tour = String(d[c.tour]).trim();
      if (!tour) return;
      tabInfo.trips++;
      const ref = c.ref >= 0 ? String(d[c.ref]).trim() : '';
      const guest = c.guest >= 0 ? String(d[c.guest]).trim() : '';
      const dateIso = teamDateIso_(vals[i][c.date], d[c.date]);
      let b = null;
      if (index) {
        b = (ref && index.byRef[ref]) || null;
        if (!b && guest && dateIso) {
          const same = index.rows.filter(function (r) { return r.dateIso === dateIso && teamNormEmails_(r.emails) === teamNormEmails_(guest); });
          if (same.length === 1) b = same[0];
        }
      }
      out.trips.push({
        key: teamKey_(c, d),
        tab: tab.getName(),
        row: L.headerRow + 1 + i,
        tour: tour,
        dateIso: dateIso,
        dateText: c.date >= 0 ? String(d[c.date]).trim() : '',
        guest: guest,
        guests: c.guests >= 0 ? String(d[c.guests]).trim() : '',
        deposit: c.deposit >= 0 ? String(d[c.deposit]).trim() : '',
        arrivedIso: c.arrived >= 0 ? teamIso_(vals[i][c.arrived]) : '',
        doneIso: c.done >= 0 ? teamIso_(vals[i][c.done]) || (String(d[c.done]).trim() ? 'yes' : '') : '',
        doneNote: notes ? String(notes[i][0]) : '',
        b: b,
      });
    });
  });
  return out;
}

/**
 * Marks one trip done (done = true) or not done (false). Writes ONE cell in the
 * Done column of that deposit tab. Refuses if the row no longer holds the same
 * trip (the list changed since the phone loaded it).
 */
function teamMarkDone(tabName, row, key, done) {
  const lock = LockService.getDocumentLock();
  lock.waitLock(20000);
  try {
    const tab = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tabName);
    const L = tab ? teamDepositLayout_(tab) : null;
    if (!L) return { ok: false, error: 'That month tab is gone. Refresh the list.' };
    if (row <= L.headerRow || row > tab.getLastRow()) return { ok: false, error: 'The list changed. Refresh and try again.' };
    const w = tab.getLastColumn();
    const c = L.cols;
    const d = tab.getRange(row, 1, 1, w).getDisplayValues()[0];
    if (teamKey_(c, d) !== key) return { ok: false, error: 'The list changed. Refresh and try again.' };

    let col = c.done + 1;
    if (!col) {
      col = Math.max(w + 1, TEAM_DONE_MIN_COL);
      if (tab.getMaxColumns() < col) tab.insertColumnsAfter(tab.getMaxColumns(), col - tab.getMaxColumns());
      tab.getRange(L.headerRow, col).setValue('Done').setFontWeight('bold').setHorizontalAlignment('center');
    }
    const cell = tab.getRange(row, col);
    if (done) {
      let who = '';
      try { who = Session.getActiveUser().getEmail() || ''; } catch (err) { who = ''; }
      const now = new Date();
      cell.setValue(now).setNumberFormat('dd/mm/yyyy')
        .setNote('Marked done in the team app' + (who ? ' by ' + who : '') + ', ' + Utilities.formatDate(now, TEAM_TZ, 'dd/MM/yyyy HH:mm'));
      return { ok: true, doneIso: teamIso_(now) };
    }
    cell.clearContent().clearNote();
    return { ok: true, doneIso: '' };
  } catch (err) {
    const msg = String(err.message || err);
    if (/permission|access|denied/i.test(msg)) return { ok: false, error: 'Your Google account can only view the Deposit sheet. Ask for edit access to mark trips done.' };
    return { ok: false, error: msg };
  } finally {
    lock.releaseLock();
  }
}

// ── bookings26 (read only) ──────────────────────────────────────────────────

const TEAM_KNOWN = {
  'TOUR BOOKED': 'tour', 'DATE': 'date', 'EMAILS': 'emails',
  'CLIENTE': 'pax', 'GUESTS': 'pax', 'PAX': 'pax',
  'PAYMENT': 'payment', 'DEPOSIT': 'deposit', 'AMOUNT LEFT': 'left', 'BALANCE': 'left',
  'PICK UP - DROP OFF': 'pickup', 'PICK UP': 'pickup', 'PICKUP': 'pickup',
  'DRIVER': 'driver',
  'ACCOMODATION': 'accom', 'ACCOMMODATION': 'accom', 'CAMP / ACCOMMODATION': 'accom',
  'INVOICE': 'invoice', 'TRIP DETAILS': 'details', 'DEPOSIT DATE': 'depositDate',
};

/** Every booking row in bookings26, plus a map from the deposit script's Ref to its row. */
function teamBookingsIndex_() {
  if (BOOKINGS_SHEET_URL.indexOf('https://') !== 0) throw new Error('UNSET');
  const years = Object.keys(YEAR_BOOKINGS_SHEETS)
    .filter(function (y) { return String(YEAR_BOOKINGS_SHEETS[y]).indexOf('https://') === 0; });
  const books = [{ ss: SpreadsheetApp.openByUrl(BOOKINGS_SHEET_URL), skipYears: years.map(Number) }]
    .concat(years.map(function (y) { return { ss: SpreadsheetApp.openByUrl(YEAR_BOOKINGS_SHEETS[y]), skipYears: [] }; }));
  const byRef = {};
  const rows = [];
  books.forEach(function (book) { book.ss.getSheets().forEach(function (tab) {
    if (book.skipYears.indexOf(teamTabYear_(tab.getName())) >= 0) return;
    const w = tab.getLastColumn();
    const last = tab.getLastRow();
    if (w < 1 || last <= TEAM_HEADER_ROW) return;
    const headRaw = tab.getRange(TEAM_HEADER_ROW, 1, 1, w).getDisplayValues()[0];
    const head = headRaw.map(function (h) { return String(h).trim().toUpperCase(); });
    const tourCol = head.indexOf('TOUR BOOKED');
    if (tourCol < 0) return;
    const n = last - TEAM_HEADER_ROW;
    const rng = tab.getRange(TEAM_HEADER_ROW + 1, 1, n, w);
    const disp = rng.getDisplayValues();
    const vals = rng.getValues();
    const stamp = head.indexOf('DEPOSIT DATE');
    const notes = stamp >= 0 ? tab.getRange(TEAM_HEADER_ROW + 1, stamp + 1, n, 1).getNotes() : null;

    disp.forEach(function (d, i) {
      if (!String(d[tourCol]).trim()) return;
      const rec = { tab: tab.getName(), row: TEAM_HEADER_ROW + 1 + i, notes: [], extra: [] };
      head.forEach(function (h, j) {
        const v = String(d[j]).trim();
        const field = TEAM_KNOWN[h];
        if (field) {
          if (!rec[field]) rec[field] = v;
          if (field === 'date') rec.dateIso = teamIso_(vals[i][j]);
        } else if (v) {
          if (h) rec.extra.push([String(headRaw[j]).trim(), v]);
          else rec.notes.push(v);                          // a column with no header (column K)
        }
      });
      rows.push(rec);
      if (notes) {
        const ref = String(notes[i][0]).split('|')[0].trim();
        if (ref) byRef[ref] = rec;
      }
    });
  }); });
  return { byRef: byRef, rows: rows };
}

/** "November26" → 2026, "january 27" → 2027, "DECEMBRE26" → 2026; 0 if the name has no year. */
function teamTabYear_(name) {
  const m = String(name).replace(/\s+/g, '').match(/(\d{2})$/);
  return m ? 2000 + Number(m[1]) : 0;
}

// ── small helpers ───────────────────────────────────────────────────────────

/**
 * A deposit tab and where its columns are, or null if the tab is not one.
 * Looks for the header row in the first 6 rows: the row that has a "Deposit…"
 * column AND a "Tour…/Trek…" column. Works for the hand-made older tabs and
 * for the ones the deposit script makes (header in row 2). The Overview tab
 * ("Month | Deposits received | …") has no tour column, so it is skipped.
 */
function teamDepositLayout_(tab) {
  const rows = Math.min(tab.getLastRow(), 6);
  const w = tab.getLastColumn();
  if (rows < 1 || w < 1) return null;
  const top = tab.getRange(1, 1, rows, w).getDisplayValues();
  for (let r = 0; r < rows; r++) {
    const head = top[r].map(function (h) { return String(h).trim().toUpperCase().replace(/\s+/g, ' '); });
    const find = function (re, not) {
      for (let i = 0; i < head.length; i++) if (re.test(head[i]) && !(not && not.test(head[i]))) return i;
      return -1;
    };
    const deposit = find(/^DEPOSIT/, /DATE/);
    const tour = find(/TOUR|TREK|EXCURSION/, /DATE/);
    if (deposit < 0 || tour < 0) continue;
    let guest = find(/NAME|GUEST|CLIENT|EMAIL/, /^GUESTS$|^PAX$|PEOPLE/);
    return {
      headerRow: r + 1,
      cols: {
        deposit: deposit, tour: tour, guest: guest,
        date: find(/DATE/, /ARRIVED|DEPOSIT|DONE/),
        guests: find(/^GUESTS$|^PAX$|PEOPLE|PERSONS/),
        arrived: head.indexOf('ARRIVED'), ref: head.indexOf('REF'), done: head.indexOf('DONE'),
      },
    };
  }
  return null;
}

/**
 * The trip date as yyyy-mm-dd. A real date cell, or text typed as a date in
 * the day-first way the sheets use (12/11/2026, 12-11-26). '' if unknown.
 */
function teamDateIso_(value, text) {
  const iso = teamIso_(value);
  if (iso) return iso;
  const m = String(text || '').trim().match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2}|\d{4})$/);
  if (!m) return '';
  const y = m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3]);
  const d = new Date(y, Number(m[2]) - 1, Number(m[1]), 12);
  return d.getMonth() === Number(m[2]) - 1 ? teamIso_(d) : '';
}

/** Identifies a deposit row: its Ref, or tour + guest + date for rows typed by hand. */
function teamKey_(c, d) {
  const ref = c.ref >= 0 ? String(d[c.ref]).trim() : '';
  const at = function (i) { return i >= 0 ? String(d[i]).trim() : ''; };
  return ref || ['h', at(c.tour), at(c.guest), at(c.date)].join('|');
}

function teamIso_(v) {
  return Object.prototype.toString.call(v) === '[object Date]' && !isNaN(v.getTime()) ? Utilities.formatDate(v, TEAM_TZ, 'yyyy-MM-dd') : '';
}

function teamNormEmails_(s) {
  return String(s).toLowerCase().replace(/\s+/g, '');
}
