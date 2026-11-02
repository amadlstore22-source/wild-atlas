/**
 * MET — bookings26 tidy-up   (a THIRD file in the bookings26 script, "tidy")
 *
 * In every month tab: the bookings go in date order, one under the other, and
 * the empty rows between them go below the last booking.
 *
 *   tidyPreview  shows what it WOULD do (in the log at the bottom). Changes nothing.
 *   tidyRun      does it.
 *
 * A tab with a DAY column at the far left (daysRun, further down) is kept in
 * the DAY LAYOUT instead: each booking on the row of its day of the month.
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
const TIDY_DATE_FORMAT = 'ddd, d mmm yyyy';   // the team's own style, as INV_DATE_FORMAT in the invoices file

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

// ═════════════════════════════════════════════════════════════════════════════
// DAY LAYOUT (owner, 2026-10-28): "if a booking is in 13th the info should be
// in the 13th cell". Adds a DAY column at the far left of every month tab:
// the rows under the headers are day 1, 2, 3 … of the month, each booking on
// its own day's row. A second booking on the same day goes in the row right
// under it (owner: "they should be close to each other"), so the DAY column
// shows that day twice and the days after it sit one row lower. A booking
// with no date (or a date outside the month) goes after the last day with
// "?" in DAY. Row 1 (totals) and row 2 (headers) stay where they are.
//
//   daysPreview  shows what it WOULD do (in the log). Changes nothing.
//   daysRun      does it. Once a tab has its DAY column, tidyRun and every
//                new invoice keep it in this layout.
//
// The same safety as tidyRun: whole rows are sorted (never dragged), it
// rehearses on a copy first and checks every cell after. Nothing is deleted.
// If a tab cannot be changed safely its DAY column is taken out again and the
// log says why (empty rows added at the bottom, or a dropdown copied into an
// empty PAYMENT cell, may stay: they hold nothing). bookings26's old 2027 tabs are left as they are (2027 lives in
// "booking 27"). Before daysRun: File → Version history → Name current
// version "Before days", in bookings26 AND in booking 27.
// ═════════════════════════════════════════════════════════════════════════════
function daysPreview() {
  const ss = SpreadsheetApp.getActive();
  const out = ['PREVIEW: nothing was changed.', ''];
  tidyBooks_(ss).forEach(function (book) {
    book.getSheets().forEach(function (tab) {
      if (tab.getName() === TIDY_CHECK_TAB) return;
      const now = tidyPlan_(tab);
      if (!now) return;
      if (!now.day && tidyOldYearTab_(book, ss, tab)) return;
      const plan = now.day ? now : tidyPlan_(tab, { asDays: true });
      out.push(tidyIn_(book, ss) + (now.day ? '' : '[a DAY column would be added at the far left] ') + tidyDescribe_(plan, false));
    });
  });
  Logger.log(out.join('\n\n'));
  ss.toast('Nothing was changed. The plan is in the log under the code.', 'Days preview', 10);
}

function daysRun() {
  const ss = SpreadsheetApp.getActive();
  const out = [];
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    tidyBooks_(ss).forEach(function (book) {
      book.getSheets().slice().forEach(function (tab) {
        if (tab.getName() === TIDY_CHECK_TAB) return;
        const now = tidyPlan_(tab);
        if (!now) return;
        if (!now.day && tidyOldYearTab_(book, ss, tab)) return;
        try {
          if (!now.day) {
            const test = tidyPlan_(tab, { asDays: true });
            if (test.skip) { out.push(tidyIn_(book, ss) + tidyDescribe_(test, true)); return; }
            tidyAddDayColumn_(tab, now.header);
          }
          const done = tidyTab_(book, tab);
          if (done.skip && !now.day) {
            tab.deleteColumn(1);                                    // back as it was
            out.push(tidyIn_(book, ss) + done.line + ' The DAY column was taken out again.');
            return;
          }
          out.push(tidyIn_(book, ss) + done.line);
        } catch (err) {
          throw new Error(tidyIn_(book, ss) + err.message + ' Tabs done before this one: ' + (out.join(' / ') || 'none'));
        }
      });
    });
  } finally {
    lock.releaseLock();
  }
  Logger.log(out.join('\n\n'));
  ss.toast('Done. What changed is in the log under the code.', 'Days', 10);
}

/** A new empty column A headed DAY, styled like the other headers. Every other column moves one to the right. */
function tidyAddDayColumn_(tab, header) {
  tab.insertColumnBefore(1);
  tab.getRange(1, 1, tab.getMaxRows(), 1).clearFormat().clearDataValidations();
  tab.getRange(header, 2).copyTo(tab.getRange(header, 1), SpreadsheetApp.CopyPasteType.PASTE_FORMAT, false);
  tab.getRange(header, 1).setValue('DAY');
  tab.setColumnWidth(1, 48);
}

/** bookings26's own tabs for a year that has its own spreadsheet (its 2027 tabs): left as they are. */
function tidyOldYearTab_(book, ss, tab) {
  if (tidyIn_(book, ss)) return false;
  const m = tidyTabMonth_(tab.getName());
  const years = typeof invYearSheets_ === 'function' ? invYearSheets_() : [];
  return Boolean(m) && years.some(function (y) { return y.year === m.y; });
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
 *
 * A tab laid out by day (DAY column, see daysRun) first gets what the layout
 * needs and changes nothing already there: empty rows added at the bottom
 * when the tab runs short of rows, and the PAYMENT dropdown copied into an
 * empty PAYMENT cell that has none. Its DAY column is rewritten afterwards.
 */
function tidyTab_(ss, tab) {
  const plan = tidyPlan_(tab);
  if (!plan) return null;
  if (plan.skip) return { line: tidyDescribe_(plan, true), moved: 0, skip: plan.skip };
  if (plan.day) {
    if (plan.addRows) tab.insertRowsAfter(tab.getMaxRows(), plan.addRows);
    plan.dropdowns = tidyFillDropdowns_(tab, plan, true);
  }
  if (!plan.moves) {
    if (plan.day) tidyDayLabels_(tab, plan);
    return { line: tidyDescribe_(plan, true), moved: 0, skip: '' };
  }

  // 1. Rehearse on a copy. Its header row is blanked at once, so no other
  //    script mistakes it for a month tab.
  const copy = tab.copyTo(ss).setName(TIDY_CHECK_TAB);
  let rehearsal = '';
  try {
    copy.getRange(plan.header, 1, 1, copy.getMaxColumns()).clearContent();
    const before = tidyRows_(copy, plan);
    if (JSON.stringify(before) !== JSON.stringify(tidyRows_(tab, plan))) {
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
  const before = tidyRows_(tab, plan);
  tidySort_(tab, plan);
  const problem = tidyCheck_(tab, plan, before);
  if (problem) {
    throw new Error(plan.name + ': the check after sorting failed (' + problem + '). Restore the last named version ' +
      '(File → Version history).');
  }
  if (plan.day) tidyDayLabels_(tab, plan);
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
function tidyPlan_(tab, opts) {
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

  // Laid out by day: a DAY column at the far left (daysRun adds it), or
  // daysPreview/daysRun asking what that layout WOULD be (opts.asDays). The
  // DAY column belongs to this file: it never moves and is rewritten each time.
  const hasDayCol = cols.DAY === 1;
  const plan = { tab: tab, name: tab.getName(), header: header, start: header + 1, n: Math.max(lastRow - header, 0), width: width,
    from: hasDayCol ? 2 : 1, day: hasDayCol || Boolean(opts && opts.asDays), days: 0, addRows: 0, dropdowns: 0,
    pay: cols.PAYMENT || 0, rows: [], order: [], moves: 0, skip: '', warnings: [] };
  const tabMonth = tidyTabMonth_(plan.name);
  if (plan.day) {
    if (!tabMonth) { plan.skip = 'its name does not say which month and year it is, so its days are unknown'; return plan; }
    plan.days = new Date(Date.UTC(tabMonth.y, tabMonth.m + 1, 0)).getUTCDate();
  }
  if (!plan.day && plan.n < 1) return plan;

  if (tab.getFrozenRows() > header) plan.skip = 'rows below the headers are frozen';
  else if (tab.getFilter && tab.getFilter()) plan.skip = 'the tab has a filter';
  if (!plan.skip) tidyReadRows_(tab, plan, cols, tabMonth, 0, plan.n);
  if (plan.skip) return plan;

  if (!plan.day) {
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
  } else {
    const slots = tidyDaySlots_(plan, tabMonth);
    // Room for every day, every second booking on a day, and a few empty rows at the bottom.
    const need = slots.length + TIDY_SPARE_ROWS;
    if (need > plan.n) {
      const exist = Math.min(need, tab.getMaxRows() - header);
      if (exist > plan.n) tidyReadRows_(tab, plan, cols, tabMonth, plan.n, exist - plan.n);
      if (plan.skip) return plan;
      for (let r = plan.start + exist; r < plan.start + need; r++) plan.rows.push({ r: r, empty: true });
      plan.addRows = need - exist;
      plan.n = need;
    }
    tidyDayOrder_(plan, slots);
    const short = tidyTotalsShort_(tab, plan);
    if (short) { plan.skip = short; return plan; }
    plan.dropdowns = tidyFillDropdowns_(tab, plan, false);
  }
  plan.moves = plan.order.filter(function (from, to) { return from !== to && !plan.rows[from].empty; }).length;
  return plan;
}

/** Empty rows kept at the bottom, so a new booking always has somewhere to be written before it is sorted into place. */
const TIDY_SPARE_ROWS = 3;
const TIDY_DAY_BG = '#efefef';     // the DAY column
const TIDY_SPARE_BG = '#ffe599';   // a booking whose date is missing or not in the month: "?" in DAY

/**
 * Reads `count` rows from index `first` (0 = the row under the headers) into
 * plan.rows. Sets plan.skip, and stops, on a row it cannot move safely. The
 * DAY column is never read as part of a row.
 */
function tidyReadRows_(tab, plan, cols, tabMonth, first, count) {
  if (count < 1) return;
  const off = plan.from - 1;
  const w = plan.width - off;
  const rc = {};
  Object.keys(cols).forEach(function (k) { if (cols[k] > off) rc[k] = cols[k] - off; });
  const range = tab.getRange(plan.start + first, plan.from, count, w);
  const values = range.getValues();
  const shown = range.getDisplayValues();
  const formulas = range.getFormulasR1C1();
  const notes = range.getNotes();
  const key = [rc['TOUR BOOKED'], rc.DATE, rc.EMAILS].filter(Boolean).map(function (c) { return c - 1; });
  if (range.getMergedRanges().some(function (m) { return m.getNumRows() > 1; })) { plan.skip = 'some cells are merged across rows'; return; }

  for (let i = 0; i < count; i++) {
    const r = plan.start + first + i;
    const filled = function (j) { return values[i][j] !== '' || formulas[i][j] !== ''; };
    const any = values[i].some(function (v, j) { return filled(j) || notes[i][j] !== ''; });
    if (!any) { plan.rows.push({ r: r, empty: true }); continue; }
    const label = tidyLabel_(shown[i], rc);
    if (!key.some(filled)) { plan.skip = 'row ' + r + ' holds something that is not a booking ("' + label + '")'; return; }
    if (tab.isRowHiddenByUser(r)) { plan.skip = 'row ' + r + ' is hidden'; return; }
    // A formula that looks at another row (R[1], R[-2], R5) would point at the
    // wrong booking after sorting. Same-row formulas (R[0], RC) are fine.
    const far = formulas[i].filter(function (f) { return /R\[-?[1-9]\d*\]|R\d/.test(f); })[0];
    if (far) { plan.skip = 'row ' + r + ' has a formula that uses another row (' + far + ')'; return; }

    const ms = rc.DATE ? tidyDateMs_(values[i][rc.DATE - 1]) : null;
    if (ms === null) plan.warnings.push('row ' + r + ' (' + label + '): no date I can read, so it goes ' + (plan.day ? 'after the last day, with "?" in DAY' : 'after the dated bookings'));
    else if (tabMonth) {
      const d = new Date(ms);
      if (d.getUTCFullYear() !== tabMonth.y || d.getUTCMonth() !== tabMonth.m) {
        plan.warnings.push('row ' + r + ' (' + label + '): its date "' + shown[i][rc.DATE - 1] + '" is not in ' +
          TIDY_MONTH_NAMES[tabMonth.m] + ' ' + tabMonth.y + '. Left as typed; check it.');
      }
    }
    plan.rows.push({ r: r, empty: false, ms: ms, label: label, date: ms === null ? '' : shown[i][rc.DATE - 1] });
  }
}

/**
 * Day layout (owner, 2026-10-28: "if a booking is in 13th the info should be
 * in the 13th cell"): the rows under the headers go day 1, day 2 ... to the
 * last day of the month, and the DAY column shows each row's day. A day with
 * two bookings has two rows, one under the other (owner: "they should be
 * close to each other"), so the days after it sit one row lower; the DAY
 * column still says which day each row is. A day with no booking keeps one
 * empty row. Bookings with no date, or a date outside this month, come after
 * the last day with "?" in DAY.
 *
 * Returns the rows in their new order: { day, from } per row, from = the
 * booking's index in plan.rows, or -1 for a day's empty row. Bookings on the
 * same day keep the order they were in, so a later one never jumps above.
 */
function tidyDaySlots_(plan, tabMonth) {
  const byDay = {};
  const odd = [];
  plan.rows.forEach(function (x, i) {
    if (x.empty) return;
    const d = x.ms === null ? null : new Date(x.ms);
    x.day = d && d.getUTCFullYear() === tabMonth.y && d.getUTCMonth() === tabMonth.m ? d.getUTCDate() : 0;
    if (x.day) (byDay[x.day] = byDay[x.day] || []).push(i); else odd.push(i);
  });
  const slots = [];
  for (let d = 1; d <= plan.days; d++) {
    if (!byDay[d]) slots.push({ day: d, from: -1 });
    else byDay[d].forEach(function (i, k) { slots.push({ day: d, from: i, nth: k + 1 }); });
  }
  odd.sort(function (a, b) {
    const ma = plan.rows[a].ms, mb = plan.rows[b].ms;
    if ((ma === null) !== (mb === null)) return ma === null ? 1 : -1;
    return ma !== mb && ma !== null ? ma - mb : a - b;
  });
  odd.forEach(function (i) { slots.push({ day: 0, from: i }); });
  return slots;
}

/** Fills plan.order and plan.labels for the day layout. Empty rows fill the empty days and the bottom, in their old order. */
function tidyDayOrder_(plan, slots) {
  plan.order = new Array(plan.n);
  plan.labels = new Array(plan.n);
  const empties = [];
  plan.rows.forEach(function (x, i) { if (x.empty) empties.push(i); });
  for (let to = 0; to < plan.n; to++) {
    const s = slots[to];
    plan.order[to] = s && s.from >= 0 ? s.from : empties.shift();
    plan.labels[to] = s || null;
  }
}

/**
 * The totals above the headers (=SUM(F3:F100)) only count rows inside their
 * range. A booking moved below a range's last row would silently drop out of
 * the total, so the tab is left alone instead and the log says why.
 */
function tidyTotalsShort_(tab, plan) {
  if (plan.header < 2) return '';
  const fx = [].concat.apply([], tab.getRange(1, 1, plan.header - 1, plan.width).getFormulas());
  let end = Infinity;
  fx.forEach(function (f) {
    const re = /\$?[A-Z]{1,3}\$?(\d+):\$?[A-Z]{1,3}\$?(\d+)/g;
    let m;
    while ((m = re.exec(f))) if (Number(m[1]) <= plan.start) end = Math.min(end, Number(m[2]));
  });
  const last = plan.order.reduce(function (max, from, to) { return plan.rows[from].empty ? max : Math.max(max, plan.start + to); }, 0);
  return last > end ? 'the totals above the headers only add up to row ' + end + ', and a booking would go to row ' + last +
    '. Make the totals reach further down first' : '';
}

/**
 * Empty PAYMENT cells with no dropdown in the rows the layout uses (the
 * dropdowns were set on rows 3-30 only in some tabs, so days 29-31 had
 * none). With write, copies the tab's own PAYMENT dropdown into them; a cell
 * that already has one, or holds a value, is never touched. Returns how many.
 */
function tidyFillDropdowns_(tab, plan, write) {
  if (!plan.pay || plan.n < 1) return 0;
  const n = Math.min(plan.n, tab.getMaxRows() - plan.header);
  if (n < 1) return 0;
  const range = tab.getRange(plan.start, plan.pay, n, 1);
  const rules = range.getDataValidations();
  const values = range.getValues();
  const count = {};
  let best = null, bestN = 0;
  rules.forEach(function (row) {
    const k = tidyRuleKey_(row[0]);
    if (!k) return;
    count[k] = (count[k] || 0) + 1;
    if (count[k] > bestN) { bestN = count[k]; best = row[0]; }
  });
  if (!best) return 0;
  let filled = 0;
  const next = rules.map(function (row, i) {
    if (row[0] || values[i][0] !== '') return [row[0]];
    filled++;
    return [best];
  });
  if (write && filled) range.setDataValidations(next);
  return filled;
}

function tidyRuleKey_(rule) {
  return rule ? JSON.stringify([String(rule.getCriteriaType()), rule.getCriteriaValues()]) : '';
}

/**
 * Writes the DAY column for the rows the layout uses: each row's day (a day
 * with two bookings shows it twice, one under the other), "?" highlighted for
 * a booking without a date in this month, nothing on the empty rows below.
 * Clears the notes an earlier version put on DAY cells.
 */
function tidyDayLabels_(tab, plan) {
  const vals = [], bgs = [], notes = [];
  plan.labels.forEach(function (s) {
    if (s && s.day) { vals.push([s.day]); bgs.push([TIDY_DAY_BG]); notes.push(['']); }
    else if (s) { vals.push(['?']); bgs.push([TIDY_SPARE_BG]); notes.push(['Its date is missing or not in this month. Check the DATE, then run tidyRun.']); }
    else { vals.push(['']); bgs.push([null]); notes.push(['']); }
  });
  tab.getRange(plan.start, 1, plan.n, 1).setValues(vals).setBackgrounds(bgs).setNotes(notes)
    .setHorizontalAlignment('center').setFontWeight('bold');
  SpreadsheetApp.flush();
}

/** Sorts the tab's rows into plan.order with a temporary key column at the far right, then removes it. */
function tidySort_(tab, plan) {
  const keyCol = tab.getMaxColumns() + 1;
  tab.insertColumnAfter(keyCol - 1);
  try {
    const keys = new Array(plan.n);
    plan.order.forEach(function (from, to) { keys[from] = [to]; });
    tab.getRange(plan.start, keyCol, plan.n, 1).setValues(keys);
    // The DAY column (day layout) is left out: it stays put, the rows move past it.
    tab.getRange(plan.start, plan.from, plan.n, keyCol - plan.from + 1).sort({ column: keyCol, ascending: true });
  } finally {
    tab.deleteColumn(keyCol);
  }
  SpreadsheetApp.flush();
}

/** '' if every booking row came out whole and in plan order, else what is wrong. */
function tidyCheck_(tab, plan, before) {
  if (tab.getMaxColumns() !== plan.width) return 'the number of columns changed';
  const after = tidyRows_(tab, plan);
  for (let to = 0; to < plan.n; to++) {
    const from = plan.order[to];
    if (JSON.stringify(after[to]) !== JSON.stringify(before[from])) {
      return 'row ' + (plan.start + to) + ' should hold what was in row ' + (plan.start + from) + ', and it does not';
    }
  }
  return '';
}

/**
 * Everything a row holds, for comparing: value or formula, note and colour of
 * every cell (not the DAY column). In the day layout also each cell's
 * dropdown, so a PAYMENT dropdown that stayed behind stops the change.
 */
function tidyRows_(tab, plan) {
  if (plan.n < 1) return [];
  const range = tab.getRange(plan.start, plan.from, plan.n, plan.width - plan.from + 1);
  const shown = range.getDisplayValues(), formulas = range.getFormulasR1C1();
  const notes = range.getNotes(), colours = range.getBackgrounds();
  const rules = plan.day ? range.getDataValidations() : null;
  return shown.map(function (row, i) {
    return row.map(function (v, j) {
      const cell = [formulas[i][j] || v, notes[i][j], colours[i][j]];
      if (rules) cell.push(tidyRuleKey_(rules[i][j]));
      return cell;
    });
  });
}

function tidyDescribe_(plan, done) {
  const lines = [];
  const bookings = plan.order.filter(function (i) { return !plan.rows[i].empty; });
  if (plan.skip) lines.push(plan.name + ': NOT CHANGED, because ' + plan.skip + '.');
  else if (plan.day) return tidyDescribeDays_(plan, done, bookings);
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

function tidyDescribeDays_(plan, done, bookings) {
  const lines = [];
  const is = done ? 'is' : 'would be';
  if (!bookings.length) lines.push(plan.name + ': no bookings. The DAY column ' + is + ' 1 to ' + plan.days + ' (row ' + plan.start + ' = day 1).');
  else {
    lines.push(plan.name + ': ' + bookings.length + ' booking(s), each on its day\'s row (row ' + plan.start + ' = day 1; a day with two bookings has two rows). ' +
      (plan.moves ? plan.moves + (done ? ' moved' : ' would move') : 'Nothing ' + (done ? 'was' : 'would be') + ' moved') + ':');
    plan.order.forEach(function (from, to) {
      const x = plan.rows[from];
      if (x.empty) return;
      const s = plan.labels[to];
      const where = s && s.day ? 'day ' + s.day + (s.nth > 1 ? ' (booking ' + s.nth + ' that day)' : '') : '"?" (date missing or not in this month)';
      lines.push('  row ' + (plan.start + to) + ', ' + where + ': ' + (x.date || '(no date)') + ' | ' + x.label +
        (x.r !== plan.start + to ? '   (was row ' + x.r + ')' : ''));
    });
  }
  if (plan.addRows) lines.push('  ' + plan.addRows + ' empty row(s) ' + (done ? 'added' : 'would be added') + ' at the bottom.');
  if (plan.dropdowns) lines.push('  The PAYMENT dropdown ' + (done ? 'was' : 'would be') + ' added to ' + plan.dropdowns + ' empty row(s) that had none.');
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

// ═════════════════════════════════════════════════════════════════════════════
// ONE-OFF (2026-10-28): repairDates
// After the first invoice-written booking (INV-2026-049) three date problems
// showed up. This repairs what already went wrong; the scripts no longer do it.
// It changes FORMATS only, except in step 3, which fills an EMPTY cell:
//   1. DEPOSIT DATE cells that hold a date but show it as a raw number
//      (46316.46967) get dd/mm/yyyy back.
//   2. DATE cells written by the invoices file (the row has an INVOICE number)
//      that hold a real date get the team's style, "Tue, 15 Dec 2026".
//   3. Deposit-sheet rows made by the deposit link (they have a Ref) whose
//      Date trip is EMPTY get the date from their booking, found by that Ref.
// Running it twice changes nothing more.
// ═════════════════════════════════════════════════════════════════════════════
function repairDates() {
  const ss = SpreadsheetApp.getActive();
  const out = [];
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    const byRef = {};
    tidyBooks_(ss).forEach(function (book) {
      book.getSheets().forEach(function (tab) {
        const plan = tidyPlan_(tab);
        if (!plan || plan.n < 1) return;
        const head = tab.getRange(plan.header, 1, 1, plan.width).getValues()[0].map(function (h) { return String(h).trim().toUpperCase(); });
        const stamp = head.indexOf('DEPOSIT DATE') + 1, date = head.indexOf('DATE') + 1, inv = head.indexOf('INVOICE') + 1;
        const where = tidyIn_(book, ss) + tab.getName() + ' row ';
        if (stamp) {
          const rg = tab.getRange(plan.start, stamp, plan.n, 1);
          const vals = rg.getValues(), notes = rg.getNotes();
          vals.forEach(function (v, i) {
            if (typeof v[0] === 'number' && v[0] > 40000 && v[0] < 60000 &&
                tab.getRange(plan.start + i, stamp).getNumberFormat() !== 'dd/mm/yyyy') {
              tab.getRange(plan.start + i, stamp).setNumberFormat('dd/mm/yyyy');
              out.push(where + (plan.start + i) + ': DEPOSIT DATE shown as a date again (' + tab.getRange(plan.start + i, stamp).getDisplayValue() + ').');
            }
            const ref = String(notes[i][0]).split('|')[0].trim();
            if (ref && date) byRef[ref] = tab.getRange(plan.start + i, date);
          });
        }
        if (date && inv) {
          const invs = tab.getRange(plan.start, inv, plan.n, 1).getValues();
          const dates = tab.getRange(plan.start, date, plan.n, 1);
          const dv = dates.getValues();
          invs.forEach(function (x, i) {
            if (String(x[0]).trim() === '' || Object.prototype.toString.call(dv[i][0]) !== '[object Date]') return;
            const cell = tab.getRange(plan.start + i, date);
            if (cell.getNumberFormat() === TIDY_DATE_FORMAT) return;
            cell.setNumberFormat(TIDY_DATE_FORMAT);
            out.push(where + (plan.start + i) + ': DATE now shows ' + cell.getDisplayValue() + '.');
          });
        }
      });
    });

    if (typeof depositUrl_ === 'function' && typeof depositTripDate_ === 'function') {
      const dep = SpreadsheetApp.openByUrl(depositUrl_());
      dep.getSheets().forEach(function (tab) {
        if (String(tab.getRange(2, 1).getValue()).trim().toLowerCase() !== 'deposit') return;
        const n = tab.getLastRow() - 2;
        if (n < 1) return;
        const head = tab.getRange(2, 1, 1, tab.getLastColumn()).getValues()[0].map(function (h) { return String(h).trim().toUpperCase(); });
        const refCol = head.indexOf('REF') + 1;
        if (!refCol) return;
        const refs = tab.getRange(3, refCol, n, 1).getValues();
        const shown = tab.getRange(3, 4, n, 1).getDisplayValues();
        refs.forEach(function (r, i) {
          const ref = String(r[0]).trim();
          if (!ref || String(shown[i][0]).trim() !== '' || !byRef[ref]) return;
          const cell = tab.getRange(3 + i, 4);
          depositTripDate_(cell, byRef[ref]);
          out.push('Deposit sheet, ' + tab.getName() + ' row ' + (3 + i) + ': Date trip filled in (' + cell.getDisplayValue() + ').');
        });
      });
    }
  } finally {
    lock.releaseLock();
  }
  if (!out.length) out.push('Nothing needed repairing.');
  Logger.log(out.join('\n'));
  ss.toast('Done. What changed is in the log under the code.', 'Repair dates', 10);
}
