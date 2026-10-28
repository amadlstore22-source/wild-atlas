/**
 * MET — bookings26 tidy-up   (a THIRD file in the bookings26 script, "tidy")
 *
 * In every month tab: the bookings go in date order, one under the other, and
 * the empty rows between them go below the last booking.
 *
 *   tidyPreview  shows what it WOULD do (in the log at the bottom). Changes nothing.
 *   tidyRun      does it.
 *
 * The invoices file calls tidyTab_ on the month tab it just wrote to, so every
 * new invoice lands in date order too (2026-10-28, owner: "it should also be in
 * the correct order not at the bottom").
 *
 * NOTHING IS DELETED. No row, no cell, no note, no colour:
 *   - It SORTS each tab's rows (it never drags rows), so the totals in row 1
 *     keep pointing at the same cells, and a whole row (dropdown, colours,
 *     notes, the deposit link's note in DEPOSIT DATE) travels together.
 *   - Before touching a tab it rehearses on a temporary copy and checks that
 *     every booking came out whole. If not, that tab is left exactly as it was.
 *   - After the real sort it checks again, cell by cell.
 *   - A tab it cannot read safely (a row that is not a booking, a formula
 *     that looks at another row, merged or hidden rows, a filter) is left as
 *     it is and named in the log.
 *   - It holds the same lock as the deposit and invoice scripts, so neither
 *     can write while it runs. Their links (the Ref note, the INVOICE column)
 *     move with the booking; neither remembers row numbers.
 *
 * BEFORE tidyRun: File → Version history → Name current version "Before tidy".
 */

const TIDY_MONTHS = [['juin', 5], ['juil', 6], ['jan', 0], ['feb', 1], ['fev', 1], ['mar', 2], ['apr', 3], ['avr', 3],
  ['may', 4], ['mai', 4], ['jun', 5], ['jul', 6], ['aug', 7], ['aou', 7], ['sep', 8], ['oct', 9], ['nov', 10], ['dec', 11]];
const TIDY_MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const TIDY_CHECK_TAB = '~tidy check (deleted automatically)';

function tidyPreview() {
  const ss = SpreadsheetApp.getActive();
  const out = ['PREVIEW: nothing was changed.', ''];
  tidyBooks_(ss).forEach(function (book) {
    book.getSheets().forEach(function (tab) {
      const plan = tidyPlan_(tab);
      if (plan) out.push(tidyIn_(book, ss) + tidyDescribe_(plan, false));
    });
  });
  Logger.log(out.join('\n'));
  ss.toast('Nothing was changed. The plan is in the log under the code.', 'Tidy preview', 10);
}

function tidyRun() {
  const ss = SpreadsheetApp.getActive();
  const out = [];
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    tidyBooks_(ss).forEach(function (book) {
      book.getSheets().slice().forEach(function (tab) {
        if (tab.getName() === TIDY_CHECK_TAB) return;
        try {
          const done = tidyTab_(book, tab);
          if (done) out.push(tidyIn_(book, ss) + done.line);
        } catch (err) {
          throw new Error(tidyIn_(book, ss) + err.message + ' Tabs done before this one: ' + (out.join(' / ') || 'none'));
        }
      });
    });
  } finally {
    lock.releaseLock();
  }
  Logger.log(out.join('\n\n'));
  ss.toast('Done. What changed is in the log under the code.', 'Tidy', 10);
}

/**
 * This spreadsheet, then each year that has its own (see invYearSheets_ in
 * the invoices file: 2027 bookings live in "booking 27").
 */
function tidyBooks_(ss) {
  const years = typeof invYearSheets_ === 'function' ? invYearSheets_() : [];
  return [ss].concat(years.map(function (y) { return SpreadsheetApp.openByUrl(y.url); }));
}

/** "booking 27 › " in front of a log line when it is not this spreadsheet. */
function tidyIn_(book, ss) {
  return book.getId && ss.getId && book.getId() !== ss.getId() ? book.getName() + ' › ' : '';
}

/**
 * Sorts ONE month tab (rehearsal on a copy first, then the real tab, checked
 * cell by cell). The caller holds the document lock. Also called by the
 * invoices file after it writes a booking, so a new invoice lands in date
 * order. Returns null for a tab that is not a month tab, else
 * { line, moved, skip }: skip says why the tab was left as it is. Throws only
 * if the check AFTER the real sort fails.
 */
function tidyTab_(ss, tab) {
  const plan = tidyPlan_(tab);
  if (!plan) return null;
  if (plan.skip || !plan.moves) return { line: tidyDescribe_(plan, true), moved: 0, skip: plan.skip };

  // 1. Rehearse on a copy. Its header row is blanked at once, so no other
  //    script mistakes it for a month tab.
  const copy = tab.copyTo(ss).setName(TIDY_CHECK_TAB);
  let rehearsal = '';
  try {
    copy.getRange(plan.header, 1, 1, copy.getMaxColumns()).clearContent();
    const before = tidyRows_(copy, plan.start, plan.n, plan.width);
    if (JSON.stringify(before) !== JSON.stringify(tidyRows_(tab, plan.start, plan.n, plan.width))) {
      rehearsal = 'the test copy did not match the tab, so it could not be tested';
    } else {
      tidySort_(copy, plan);
      rehearsal = tidyCheck_(copy, plan, before);
    }
  } finally {
    ss.deleteSheet(copy);
  }
  if (rehearsal) {
    const why = 'the test sort failed (' + rehearsal + ')';
    return { line: plan.name + ': NOT CHANGED. ' + why[0].toUpperCase() + why.slice(1) + '.', moved: 0, skip: why };
  }

  // 2. The real tab.
  const aboveRange = plan.header > 1 ? tab.getRange(1, 1, plan.header - 1, plan.width) : null;
  const above = aboveRange ? JSON.stringify(aboveRange.getValues()) : '';
  const aboveShown = aboveRange ? aboveRange.getDisplayValues() : [];
  const before = tidyRows_(tab, plan.start, plan.n, plan.width);
  tidySort_(tab, plan);
  const problem = tidyCheck_(tab, plan, before);
  if (problem) {
    throw new Error(plan.name + ': the check after sorting failed (' + problem + '). Restore the last named version ' +
      '(File → Version history).');
  }
  let line = tidyDescribe_(plan, true);
  // Compare the numbers, not the text: a total can gain a € sign when the
  // first row it adds up changes, with the same value.
  if (aboveRange && JSON.stringify(aboveRange.getValues()) !== above) {
    line += '\n  Note: the totals above the headers changed from ' + tidyNums_(aboveShown) + ' to ' +
      tidyNums_(aboveRange.getDisplayValues()) + ' (a booking that sat below the totals range is now inside it).';
  }
  return { line: line, moved: plan.moves, skip: '' };
}

/**
 * READ ONLY. For a month tab (a row in 1-5 holding TOUR BOOKED and DATE):
 * where its bookings are, their dates, and the order they should be in.
 * Returns null for any other tab.
 */
function tidyPlan_(tab) {
  const width = tab.getMaxColumns();
  const lastRow = tab.getLastRow();
  if (width < 1 || lastRow < 1) return null;
  const top = tab.getRange(1, 1, Math.min(5, lastRow), width).getValues();
  let header = 0, cols = {};
  for (let r = 0; r < top.length && !header; r++) {
    const keys = top[r].map(function (h) { return String(h).trim().toUpperCase(); });
    if (keys.indexOf('TOUR BOOKED') >= 0 && keys.indexOf('DATE') >= 0) {
      header = r + 1;
      keys.forEach(function (k, i) { if (k && !cols[k]) cols[k] = i + 1; });
    }
  }
  if (!header) return null;

  const plan = { tab: tab, name: tab.getName(), header: header, start: header + 1, n: lastRow - header, width: width,
    rows: [], order: [], moves: 0, skip: '', warnings: [] };
  if (plan.n < 1) { plan.n = 0; return plan; }

  const range = tab.getRange(plan.start, 1, plan.n, width);
  const values = range.getValues();
  const shown = range.getDisplayValues();
  const formulas = range.getFormulasR1C1();
  const notes = range.getNotes();
  const key = [cols['TOUR BOOKED'], cols.DATE, cols.EMAILS].filter(Boolean).map(function (c) { return c - 1; });
  const tabMonth = tidyTabMonth_(plan.name);

  if (tab.getFrozenRows() > header) plan.skip = 'rows below the headers are frozen';
  else if (tab.getFilter && tab.getFilter()) plan.skip = 'the tab has a filter';
  else if (range.getMergedRanges().some(function (m) { return m.getNumRows() > 1; })) plan.skip = 'some cells are merged across rows';

  for (let i = 0; i < plan.n && !plan.skip; i++) {
    const r = plan.start + i;
    const filled = function (j) { return values[i][j] !== '' || formulas[i][j] !== ''; };
    const any = values[i].some(function (v, j) { return filled(j) || notes[i][j] !== ''; });
    if (!any) { plan.rows.push({ r: r, empty: true }); continue; }
    const label = tidyLabel_(shown[i], cols);
    if (!key.some(filled)) { plan.skip = 'row ' + r + ' holds something that is not a booking ("' + label + '")'; break; }
    if (tab.isRowHiddenByUser(r)) { plan.skip = 'row ' + r + ' is hidden'; break; }
    // A formula that looks at another row (R[1], R[-2], R5) would point at the
    // wrong booking after sorting. Same-row formulas (R[0], RC) are fine.
    const far = formulas[i].filter(function (f) { return /R\[-?[1-9]\d*\]|R\d/.test(f); })[0];
    if (far) { plan.skip = 'row ' + r + ' has a formula that uses another row (' + far + ')'; break; }

    const ms = cols.DATE ? tidyDateMs_(values[i][cols.DATE - 1]) : null;
    if (ms === null) plan.warnings.push('row ' + r + ' (' + label + '): no date I can read, so it goes after the dated bookings');
    else if (tabMonth) {
      const d = new Date(ms);
      if (d.getUTCFullYear() !== tabMonth.y || d.getUTCMonth() !== tabMonth.m) {
        plan.warnings.push('row ' + r + ' (' + label + '): its date "' + shown[i][cols.DATE - 1] + '" is not in ' +
          TIDY_MONTH_NAMES[tabMonth.m] + ' ' + tabMonth.y + '. Left as typed; check it.');
      }
    }
    plan.rows.push({ r: r, empty: false, ms: ms, label: label, date: ms === null ? '' : shown[i][cols.DATE - 1] });
  }
  if (plan.skip) return plan;

  // Dated bookings by date (same date: the order they were in), then undated
  // ones as they were, then the empty rows.
  const idx = plan.rows.map(function (_, i) { return i; });
  const rank = function (i) { const x = plan.rows[i]; return x.empty ? 2 : x.ms === null ? 1 : 0; };
  idx.sort(function (a, b) {
    const ra = rank(a), rb = rank(b);
    if (ra !== rb) return ra - rb;
    if (ra === 0 && plan.rows[a].ms !== plan.rows[b].ms) return plan.rows[a].ms - plan.rows[b].ms;
    return a - b;
  });
  plan.order = idx;
  plan.moves = idx.filter(function (from, to) { return from !== to && !plan.rows[from].empty; }).length;
  return plan;
}

/** Sorts the tab's rows into plan.order with a temporary key column at the far right, then removes it. */
function tidySort_(tab, plan) {
  const keyCol = tab.getMaxColumns() + 1;
  tab.insertColumnAfter(keyCol - 1);
  try {
    const keys = new Array(plan.n);
    plan.order.forEach(function (from, to) { keys[from] = [to]; });
    tab.getRange(plan.start, keyCol, plan.n, 1).setValues(keys);
    tab.getRange(plan.start, 1, plan.n, keyCol).sort({ column: keyCol, ascending: true });
  } finally {
    tab.deleteColumn(keyCol);
  }
  SpreadsheetApp.flush();
}

/** '' if every booking row came out whole and in plan order, else what is wrong. */
function tidyCheck_(tab, plan, before) {
  if (tab.getMaxColumns() !== plan.width) return 'the number of columns changed';
  const after = tidyRows_(tab, plan.start, plan.n, plan.width);
  for (let to = 0; to < plan.n; to++) {
    const from = plan.order[to];
    if (JSON.stringify(after[to]) !== JSON.stringify(before[from])) {
      return 'row ' + (plan.start + to) + ' should hold what was in row ' + (plan.start + from) + ', and it does not';
    }
  }
  return '';
}

/** Everything a row holds, for comparing: value or formula, note and colour of every cell. */
function tidyRows_(tab, start, n, width) {
  if (n < 1) return [];
  const range = tab.getRange(start, 1, n, width);
  const shown = range.getDisplayValues(), formulas = range.getFormulasR1C1();
  const notes = range.getNotes(), colours = range.getBackgrounds();
  return shown.map(function (row, i) {
    return row.map(function (v, j) { return [formulas[i][j] || v, notes[i][j], colours[i][j]]; });
  });
}

function tidyDescribe_(plan, done) {
  const lines = [];
  const bookings = plan.order.filter(function (i) { return !plan.rows[i].empty; });
  if (plan.skip) lines.push(plan.name + ': NOT CHANGED, because ' + plan.skip + '.');
  else if (!bookings.length) lines.push(plan.name + ': no bookings.');
  else if (!plan.moves) lines.push(plan.name + ': ' + bookings.length + ' booking(s), already in order with no gaps. Nothing ' + (done ? 'was' : 'would be') + ' moved.');
  else {
    lines.push(plan.name + ': ' + bookings.length + ' booking(s) ' + (done ? 'are now' : 'would be') +
      ' in date order from row ' + plan.start + ', with the empty rows below them (' + plan.moves + ' moved):');
    bookings.forEach(function (i, k) {
      const x = plan.rows[i];
      lines.push('  row ' + (plan.start + k) + ': ' + (x.date || '(no date)') + ' | ' + x.label + (x.r !== plan.start + k ? '   (was row ' + x.r + ')' : ''));
    });
  }
  plan.warnings.forEach(function (w) { lines.push('  CHECK: ' + w); });
  return lines.join('\n');
}

function tidyLabel_(shownRow, cols) {
  const pick = function (name) { return cols[name] ? String(shownRow[cols[name] - 1]).replace(/\s+/g, ' ').trim() : ''; };
  const parts = [pick('TOUR BOOKED').slice(0, 40), pick('EMAILS').slice(0, 30)].filter(String);
  return parts.join(' | ') || String(shownRow.filter(String)[0] || '').slice(0, 40);
}

function tidyNums_(rows) {
  return [].concat.apply([], rows).filter(String).join(' / ') || '(empty)';
}

/** "November26" → {y:2026, m:10}; "january 27", "DECEMBRE26", "MAY27" too. */
function tidyTabMonth_(name) {
  const s = String(name).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '').toLowerCase();
  const m = s.match(/^([a-z]+)(\d{2})$/);
  if (!m) return null;
  const month = tidyMonth_(m[1]);
  return month < 0 ? null : { y: 2000 + Number(m[2]), m: month };
}

function tidyMonth_(word) {
  const w = String(word).toLowerCase();
  for (let i = 0; i < TIDY_MONTHS.length; i++) if (w.indexOf(TIDY_MONTHS[i][0]) === 0) return TIDY_MONTHS[i][1];
  return -1;
}

/**
 * A booking date as a number for sorting, or null. Reads real dates and the
 * ways dates are typed in the sheet: "Tue, 5 Nov 2026", "3 November 2026",
 * "22Oct 2026", "14-04-2026", "5/1/27" (day first), "November 3, 2026".
 */
function tidyDateMs_(v) {
  if (Object.prototype.toString.call(v) === '[object Date]') {
    return isNaN(v.getTime()) ? null : Date.UTC(v.getFullYear(), v.getMonth(), v.getDate());
  }
  const s = String(v).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  if (!s) return null;
  let m = s.match(/(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})/);
  if (m) {
    let d = Number(m[1]), mo = Number(m[2]);
    if (mo > 12 && d <= 12) { const t = d; d = mo; mo = t; }
    return tidyMake_(Number(m[3]), mo - 1, d);
  }
  m = s.match(/(\d{1,2})(?:st|nd|rd|th|er)?\s*([a-z]{3,})\.?,?\s*(\d{4}|\d{2}\b)/);
  if (m && tidyMonth_(m[2]) >= 0) return tidyMake_(Number(m[3]), tidyMonth_(m[2]), Number(m[1]));
  m = s.match(/([a-z]{3,})\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/);
  if (m && tidyMonth_(m[1]) >= 0) return tidyMake_(Number(m[3]), tidyMonth_(m[1]), Number(m[2]));
  return null;
}

function tidyMake_(y, m, d) {
  if (y < 100) y += 2000;
  if (m < 0 || m > 11 || d < 1 || d > 31) return null;
  return Date.UTC(y, m, d);
}

// ═════════════════════════════════════════════════════════════════════════════
// ONE-OFF (2026-10-28): fix2027Tabs
// The 2027 month tabs were made by hand with their headers in ROW 1, but the
// deposit link, the invoices file and the team app read headers from ROW 2.
// So DEPOSIT ARRIVED did nothing there and an invoice for a 2027 departure
// failed. This adds ONE empty row above the headers of any month tab whose
// headers are in row 1 (here and in each year's own spreadsheet, such as
// "booking 27"): the same layout as the 2026 tabs. Every row moves one
// down; no cell is changed or deleted. Running it twice does nothing more.
// One-off date corrections the owner confirmed (client names stay out of this
// repo) live in a private file in the live project that defines
// fix2027Extra_(ss, out) and calls tidyFixOneDate_.
// ═════════════════════════════════════════════════════════════════════════════
function fix2027Tabs() {
  const ss = SpreadsheetApp.getActive();
  const out = [];
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    tidyBooks_(ss).forEach(function (book) { book.getSheets().forEach(function (tab) {
      if (tab.getName() === TIDY_CHECK_TAB) return;
      const plan = tidyPlan_(tab);
      if (!plan || plan.header !== 1) return;
      const frozen = tab.getFrozenRows();
      tab.insertRowBefore(1);
      tab.getRange(1, 1, 1, tab.getMaxColumns()).clearFormat();   // the new row only: no header colours
      if (frozen === 1) tab.setFrozenRows(2);
      let line = tidyIn_(book, ss) + tab.getName() + ': headers are now in row 2 (one empty row added on top).';
      if (typeof bookingColumns_ === 'function' && typeof missingArrived_ === 'function') {
        const cols = bookingColumns_(tab, true);                    // read only
        const gap = cols ? missingArrived_(tab, cols.PAYMENT) : 'no PAYMENT column';
        if (gap) line += '\n  CHECK: its PAYMENT dropdown has no "DEPOSIT ARRIVED" (' + gap + '). Add it by hand like in the other tabs.';
      }
      out.push(line);
    }); });
    if (!out.length) out.push('No month tab had its headers in row 1. Nothing moved.');

    if (typeof fix2027Extra_ === 'function') fix2027Extra_(ss, out);
  } finally {
    lock.releaseLock();
  }
  Logger.log(out.join('\n'));
  ss.toast('Done. What changed is in the log under the code.', '2027 tabs', 10);
}

/**
 * Where to look for a booking in bookings26 (month tabs) and in the Deposit
 * sheet (deposit tabs): { tab, start, who, date } column numbers per tab.
 */
function tidyBookingPlaces_(ss) {
  return ss.getSheets().map(function (tab) {
    const plan = tidyPlan_(tab);
    if (!plan) return null;
    const head = tab.getRange(plan.header, 1, 1, plan.width).getValues()[0].map(function (h) { return String(h).trim().toUpperCase(); });
    return { tab: tab, start: plan.start, who: head.indexOf('EMAILS') + 1, date: head.indexOf('DATE') + 1 };
  });
}
function tidyDepositPlaces_(dep) {
  return dep.getSheets().map(function (tab) {
    // deposit tabs: row 2 = Deposit | Tour/trek | Name guest | Date trip
    if (String(tab.getRange(2, 1).getValue()).trim().toLowerCase() !== 'deposit') return null;
    return { tab: tab, start: 3, who: 3, date: 4 };
  });
}

/**
 * Changes ONE date cell from `from` to `to` (both as shown in the sheet), in
 * the single row whose guest cell matches `who`. Changes nothing if no row or
 * more than one row matches. Returns what it did, for the log.
 */
function tidyFixOneDate_(places, who, from, to) {
  const hits = [];
  places.forEach(function (p) {
    if (!p || !p.who || !p.date) return;
    const n = p.tab.getLastRow() - p.start + 1;
    if (n < 1) return;
    const names = p.tab.getRange(p.start, p.who, n, 1).getDisplayValues();
    const dates = p.tab.getRange(p.start, p.date, n, 1).getDisplayValues();
    for (let i = 0; i < n; i++) {
      if (who.test(names[i][0]) && String(dates[i][0]).trim() === from) hits.push({ tab: p.tab, row: p.start + i, col: p.date });
    }
  });
  if (hits.length !== 1) return 'date NOT changed (found ' + hits.length + ' rows matching ' + who + ' and ' + from + ', expected exactly 1).';
  const h = hits[0];
  const cell = h.tab.getRange(h.row, h.col);
  const v = cell.getValue();
  const y = Number(to.slice(-4));
  if (Object.prototype.toString.call(v) === '[object Date]' && /^\d{2}-\d{2}-\d{4}$/.test(to) && to.slice(0, 6) === from.slice(0, 6)) {
    const d = new Date(v.getTime());
    d.setFullYear(y);
    cell.setValue(d);                                               // same cell format
  } else {
    cell.setValue(to);
  }
  return h.tab.getName() + ' row ' + h.row + ' is now ' + cell.getDisplayValue() + '.';
}
