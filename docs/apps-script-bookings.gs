/**
 * MET — invoices → bookings26   (add as a NEW FILE in the bookings26 script)
 *
 * Every time an invoice is made on the computer (npm run invoice), the booking
 * is written into bookings26 by itself:
 *   - in the month tab of the DEPARTURE date (November26, DECEMBRE26, ...),
 *     in the spreadsheet for that year (2027 departures go to "booking 27",
 *     see invYearSheets_);
 *   - each piece in its own column, found by its header in row 2:
 *       TOUR BOOKED, DATE, EMAILS (email — phone), CLIENTE (number of people),
 *       DEPOSIT, AMOUNT LEFT, PICK UP - DROP OFF, accomodation (camp / hotel /
 *       restaurant booked);
 *   - plus two columns it adds at the far right if missing: INVOICE (the
 *     invoice number) and TRIP DETAILS (client name + everything promised).
 *
 * YOUR DATA AND THE DEPOSIT AUTOMATION ARE SAFE:
 *   - A new booking goes only into a completely empty row (no value, no
 *     formula). It never writes over a booking, a total or a note.
 *   - New columns are added only to the right of everything you use.
 *   - PAYMENT, DRIVER and DEPOSIT DATE are never written. The deposit script
 *     runs only when YOU change PAYMENT, so nothing here can set it off.
 *   - Re-sending an invoice updates its own row (found by INVOICE), never a
 *     second row, and changes a cell only if it is empty or still holds what
 *     this script wrote. Anything the team typed is kept.
 *   - Once PAYMENT has any value, DEPOSIT and AMOUNT LEFT are never changed.
 *   - Then the month tab is put back in date order by the "tidy" file (whole
 *     rows, checked cell by cell), so the booking sits by its date. If the
 *     tab cannot be sorted safely, the booking stays where it was written.
 *   - In a tab laid out by day (DAY column, see daysRun in the tidy file) the
 *     booking goes straight onto its day's row: the 13th on the row marked 13.
 *     If that day already has a booking, it goes in the row right under it
 *     (the days after it move down one row; the DAY column shows each day).
 *   - A trip cancelled in MET Desk is MARKED, never deleted: its row is struck
 *     through and a CANCELLED column says when, by which credit note and why;
 *     its Deposit sheet row is struck through too. No value changes (see
 *     invCancel_).
 *
 * WHY: on INV-2026-033 (26 Oct 2026) the camp promised to the client
 * was only on the PDF. The team never saw it and took the family to the wrong
 * camp.
 *
 * SETUP (once):
 *   1. bookings26 → Extensions → Apps Script → "+" next to Files → Script →
 *      name it "invoices". Paste this whole file. Your deposit script stays as
 *      it is.
 *   2. Put the secret between the quotes on the INVOICE_SECRET line: the same
 *      value as SHEET_WEBHOOK_SECRET in the website's .env.local file.
 *   3. Deploy → New deployment → type "Web app" → Execute as: Me, Who has
 *      access: Anyone → Deploy → allow access. Copy the Web app URL.
 *   4. In .env.local add:  BOOKINGS_WEBHOOK_URL=<that URL>
 * Test first on a copy (File → Make a copy) if you want: the copy gets its own
 * Web app URL, and the next invoice lands there instead.
 */

const INVOICE_SECRET = 'PASTE-THE-SECRET-HERE';   // ← same value as SHEET_WEBHOOK_SECRET in .env.local
const INV_HEADER_ROW = 2;
const INV_DATE_FORMAT = 'ddd, d mmm yyyy';   // "Tue, 15 Dec 2026", as in the team's own rows
const INV_MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const INV_MONTHS_FR = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];

function doPost(e) {
  let data;
  try { data = JSON.parse(e.postData.contents); } catch (err) { return invOut_({ ok: false, error: 'not JSON' }); }
  if (INVOICE_SECRET.indexOf('PASTE') === 0) return invOut_({ ok: false, error: 'INVOICE_SECRET is not set in the script' });
  if (data.secret !== INVOICE_SECRET) return invOut_({ ok: false, error: 'wrong secret' });
  if (data.kind !== 'invoice' && data.kind !== 'cancel') return invOut_({ ok: false, error: 'not an invoice' });
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    return invOut_(data.kind === 'cancel' ? invCancel_(ss, data) : invPlace_(ss, data));
  } catch (err) {
    return invOut_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return invOut_({ ok: true, service: 'MET invoices → bookings26', method: 'POST only' });
}

function invPlace_(ss, data) {
  if (!data.number) return { ok: false, error: 'no invoice number' };
  if (!data.departure) return { ok: false, error: 'no departure date, so no month tab to put it in' };
  const when = new Date(data.departure + 'T12:00:00');

  // A re-sent invoice is found wherever it is (this file or a year's own
  // spreadsheet); a new one goes to the spreadsheet for its departure year.
  let book, tab, row, cols, updated = false;
  const found = invFindInvoice_(invAllBooks_(ss), data.number);
  if (found) {
    book = found.book; tab = found.tab; row = found.row; cols = found.cols; updated = true;
  } else {
    book = invBookFor_(ss, when.getFullYear());
    tab = invMonthTab_(book, when) || invMakeMonthTab_(book, when);
    if (!tab) return { ok: false, error: 'no month tab for ' + data.departure + ' in ' + book.getName() + ' and none to copy' };
    cols = invColumns_(tab);
    if (!cols) return { ok: false, error: tab.getName() + ' in ' + book.getName() + ' has no TOUR BOOKED header in row ' + INV_HEADER_ROW };
    row = invDayRow_(tab, when) || invFreeRow_(tab);
  }
  invEnsureCols_(tab, cols);

  // What this script last wrote in this row, kept as a note on the INVOICE
  // cell. On a re-send a cell is changed ONLY if it is empty or still holds
  // that value: anything the team typed over it is theirs and is kept.
  const invoiceCell = tab.getRange(row, cols.INVOICE);
  let mine = {};
  try { mine = JSON.parse(invoiceCell.getNote() || '{}'); } catch (err) { mine = {}; }
  const kept = [];
  const key = function (v) { return Object.prototype.toString.call(v) === '[object Date]' ? 'd:' + v.toDateString() : String(v); };
  const set = function (name, col, value) {
    if (!col) return false;
    const cell = tab.getRange(row, col);
    const now = cell.getValue();
    if (updated && now !== '' && key(now) !== mine[name]) { kept.push(name); return false; }
    cell.setValue(value);
    mine[name] = key(value);
    return true;
  };

  // Once PAYMENT has any value the money is the team's: DEPOSIT and AMOUNT
  // LEFT are never changed again, so the deposit automation only ever reads
  // amounts the team has confirmed. PAYMENT, DRIVER and DEPOSIT DATE are
  // never written at all.
  const paymentSet = cols.PAYMENT && String(tab.getRange(row, cols.PAYMENT).getValue()).trim() !== '';

  set('tour', cols['TOUR BOOKED'], data.tour || '');
  const wroteDate = set('date', cols.DATE, when);
  set('emails', cols.EMAILS, [data.clientEmail, data.clientPhone].filter(String).join(' — '));
  set('people', invAny_(cols, ['CLIENTE', 'GUESTS', 'PAX']), Number(data.people) || '');
  if (!paymentSet) {
    set('deposit', cols.DEPOSIT, Number(data.depositEur || 0));
    set('left', invAny_(cols, ['AMOUNT LEFT', 'BALANCE']), Number(data.balanceEur || 0));
  }
  set('pickup', invAny_(cols, ['PICK UP - DROP OFF', 'PICK UP', 'PICKUP']), data.pickup || '');
  set('accom', invAny_(cols, ['ACCOMODATION', 'ACCOMMODATION', 'CAMP / ACCOMMODATION']), data.suppliers || '');
  set('details', cols['TRIP DETAILS'], ['Client: ' + (data.clientName || ''), data.details || ''].filter(String).join(' | '));
  invoiceCell.setValue(data.number).setNote(JSON.stringify(mine));
  // The date this script wrote gets the style the team types ("Tue, 15 Dec
  // 2026"). INV-2026-049 (2026-10-28) landed as "12/15/2026" because the row
  // already had another date format and only a General cell was restyled.
  // A date the team typed over is theirs: its format is left alone.
  if (wroteDate) {
    tab.getRange(row, cols.DATE).setNumberFormat(INV_DATE_FORMAT);
  }

  // Put the tab back in date order (the "tidy" file), so the booking sits
  // among the others by its date rather than at the bottom. The booking is
  // already written: if the tab cannot be sorted safely it simply stays here.
  let sorted = '';
  if (typeof tidyTab_ === 'function') {
    try {
      const t = tidyTab_(book, tab);
      sorted = !t ? '' : t.skip ? 'not sorted: ' + t.skip : t.moved ? 'sorted' : '';
      const now = invFindInvoice_([book], data.number);
      if (now) row = now.row;
    } catch (err) {
      sorted = 'SORT CHECK FAILED: ' + err.message;
    }
  }
  return { ok: true, file: book.getName(), tab: tab.getName(), row: row, updated: updated, kept: kept, moneyLocked: Boolean(updated && paymentSet), sorted: sorted };
}

/**
 * A trip cancelled in MET Desk (owner, 2026-11-02: "do the cancelled"). Until
 * then a cancelled trip kept its row looking like any other, and the team
 * only knew if someone told them. Now its row is KEPT, with everything the
 * team typed, and marked so nobody runs it:
 *   - a CANCELLED column (added at the far right if missing) says when, by
 *     which credit note, and why;
 *   - the row's text is struck through. Values, colours, dropdowns and notes
 *     are not touched, and the amounts stay as they are: clear AMOUNT LEFT
 *     by hand if nothing more will be collected;
 *   - if its deposit is in the Deposit sheet (the logistics view), that row
 *     is struck through too, with a note. Its amount stays: the money did
 *     arrive, and the month total must keep adding up to what was received.
 * Nothing is deleted. Sending the same cancellation again changes nothing.
 * An invoice that never reached bookings26 has no row to mark: found false.
 */
function invCancel_(ss, data) {
  if (!data.number) return { ok: false, error: 'no invoice number' };
  if (!data.creditNote) return { ok: false, error: 'no credit note number' };
  const found = invFindInvoice_(invAllBooks_(ss), data.number);
  if (!found) return { ok: true, found: false };
  const tab = found.tab, row = found.row, cols = found.cols;
  if (!cols.CANCELLED) {
    const c = tab.getLastColumn() + 1;
    tab.getRange(INV_HEADER_ROW, c).setValue('CANCELLED').setFontWeight('bold');
    cols.CANCELLED = c;
  }

  // The DAY column of a tab laid out by day holds the day numbers, not this
  // booking: it is left as it is.
  const first = String(tab.getRange(INV_HEADER_ROW, 1).getValue()).trim().toUpperCase() === 'DAY' ? 2 : 1;
  tab.getRange(row, first, 1, tab.getLastColumn() - first + 1).setFontLine('line-through');
  const text = 'CANCELLED ' + (data.cancelledOn || '') + ' by ' + data.creditNote + (data.reason ? ': ' + data.reason : '');
  const cell = tab.getRange(row, cols.CANCELLED);
  const typed = String(cell.getValue()).trim();
  if (typed === '' || typed.indexOf('CANCELLED ') === 0) cell.setValue(text);   // what the team typed there stays
  cell.setFontLine('none').setFontWeight('bold').setFontColor('#cc0000');

  const deposit = invCancelDeposit_(tab, row, cols, data);
  return { ok: true, found: true, file: found.book.getName(), tab: tab.getName(), row: row, deposit: deposit };
}

/**
 * The Deposit sheet row of a cancelled trip, found by the Ref the deposit
 * file keeps in the DEPOSIT DATE note: struck through, with a note. 'none'
 * when no deposit was ever added for this booking.
 */
function invCancelDeposit_(tab, row, cols, data) {
  if (!cols['DEPOSIT DATE'] || typeof depositUrl_ !== 'function') return 'none';
  const ref = String(tab.getRange(row, cols['DEPOSIT DATE']).getNote()).split('|')[0].trim();
  if (!ref) return 'none';
  const dep = SpreadsheetApp.openByUrl(depositUrl_());
  const tabs = dep.getSheets().filter(isDepositTab_);
  for (let t = 0; t < tabs.length; t++) {
    const col = depositCols_(tabs[t], false).REF;
    const n = tabs[t].getLastRow() - 2;
    if (!col || n < 1) continue;
    const refs = tabs[t].getRange(3, col, n, 1).getValues();
    for (let i = 0; i < refs.length; i++) {
      if (refs[i][0] !== ref) continue;
      tabs[t].getRange(3 + i, 1, 1, GUESTS).setFontLine('line-through');
      tabs[t].getRange(3 + i, 2).setNote('Trip CANCELLED ' + (data.cancelledOn || '') + ' (' + data.number + ' cancelled by ' + data.creditNote + '). The deposit did arrive, so it stays in the total.');
      return 'struck';
    }
  }
  return 'not found';
}

/**
 * Years whose bookings live in their own spreadsheet (owner, 2026-10-28:
 * 2027 departures go to "booking 27", not bookings26). The links live in a
 * private file of the live project that defines
 *   const YEAR_SHEETS = { 2027: 'https://docs.google.com/spreadsheets/d/…' };
 * never in this repo. Without it, everything stays in this spreadsheet.
 */
function invYearSheets_() {
  const map = typeof YEAR_SHEETS === 'object' && YEAR_SHEETS ? YEAR_SHEETS : {};
  return Object.keys(map)
    .filter(function (y) { return String(map[y]).indexOf('https://') === 0; })
    .map(function (y) { return { year: Number(y), url: map[y] }; });
}

/** The spreadsheet a departure year's bookings go to: its own, or this one. */
function invBookFor_(ss, year) {
  const own = invYearSheets_().filter(function (s) { return s.year === year; })[0];
  return own ? SpreadsheetApp.openByUrl(own.url) : ss;
}

/** This spreadsheet and every year's own spreadsheet. */
function invAllBooks_(ss) {
  return [ss].concat(invYearSheets_().map(function (s) { return SpreadsheetApp.openByUrl(s.url); }));
}

/** Column numbers by UPPERCASE header in row 2. */
function invColumns_(tab) {
  const width = tab.getLastColumn();
  if (width < 1 || tab.getLastRow() < INV_HEADER_ROW) return null;
  const cols = {};
  tab.getRange(INV_HEADER_ROW, 1, 1, width).getValues()[0].forEach(function (h, i) {
    const k = String(h).trim().toUpperCase();
    if (k && !cols[k]) cols[k] = i + 1;
  });
  return cols['TOUR BOOKED'] ? cols : null;
}

function invAny_(cols, names) {
  for (let i = 0; i < names.length; i++) if (cols[names[i]]) return cols[names[i]];
  return 0;
}

/** Adds INVOICE / TRIP DETAILS / CAMP / ACCOMMODATION headers at the far right if missing. */
function invEnsureCols_(tab, cols) {
  const add = function (name) {
    const c = tab.getLastColumn() + 1;
    tab.getRange(INV_HEADER_ROW, c).setValue(name).setFontWeight('bold');
    cols[name] = c;
  };
  if (!invAny_(cols, ['ACCOMODATION', 'ACCOMMODATION', 'CAMP / ACCOMMODATION'])) add('CAMP / ACCOMMODATION');
  if (!cols.INVOICE) add('INVOICE');
  if (!cols['TRIP DETAILS']) add('TRIP DETAILS');
}

/** The row already holding this invoice number, in any month tab of these spreadsheets. */
function invFindInvoice_(books, number) {
  for (let b = 0; b < books.length; b++) {
    const tabs = books[b].getSheets();
    for (let t = 0; t < tabs.length; t++) {
      const cols = invColumns_(tabs[t]);
      if (!cols || !cols.INVOICE) continue;
      const n = tabs[t].getLastRow() - INV_HEADER_ROW;
      if (n < 1) continue;
      const vals = tabs[t].getRange(INV_HEADER_ROW + 1, cols.INVOICE, n, 1).getValues();
      for (let i = 0; i < vals.length; i++) {
        if (String(vals[i][0]).trim() === number) return { book: books[b], tab: tabs[t], row: INV_HEADER_ROW + 1 + i, cols: cols };
      }
    }
  }
  return null;
}

/** First row after the last booking whose every cell is empty (no value, no formula). */
function invFreeRow_(tab) {
  const width = tab.getMaxColumns();
  const last = Math.max(tab.getLastRow(), INV_HEADER_ROW);
  const n = last - INV_HEADER_ROW;
  let r = INV_HEADER_ROW + 1;
  if (n > 0) {
    const cols = invColumns_(tab);
    const tours = tab.getRange(INV_HEADER_ROW + 1, cols['TOUR BOOKED'], n, 1).getValues();
    for (let i = tours.length - 1; i >= 0; i--) if (String(tours[i][0]).trim() !== '') { r = INV_HEADER_ROW + 2 + i; break; }
  }
  for (; r <= tab.getMaxRows(); r++) {
    const rg = tab.getRange(r, 1, 1, width);
    const empty = rg.getValues()[0].every(function (v) { return v === ''; }) &&
      rg.getFormulas()[0].every(function (f) { return f === ''; });
    if (empty) return r;
  }
  tab.insertRowAfter(tab.getMaxRows());
  return tab.getMaxRows();
}

/**
 * A tab laid out by day (a DAY column at the far left, see daysRun in the
 * tidy file): the row marked with the departure day if it is empty, else the
 * first empty row below the days (the tidy file then moves it up, under that
 * day's other booking). 0 for any other tab. The DAY column itself is not
 * part of a row: it holds the day numbers.
 */
function invDayRow_(tab, when) {
  if (String(tab.getRange(INV_HEADER_ROW, 1).getValue()).trim().toUpperCase() !== 'DAY') return 0;
  const width = tab.getMaxColumns();
  const n = tab.getMaxRows() - INV_HEADER_ROW;
  if (n < 1) { tab.insertRowAfter(tab.getMaxRows()); return tab.getMaxRows(); }
  const days = tab.getRange(INV_HEADER_ROW + 1, 1, n, 1).getValues();
  const body = tab.getRange(INV_HEADER_ROW + 1, 2, n, width - 1);
  const values = body.getValues(), formulas = body.getFormulas();
  const free = function (i) {
    return values[i].every(function (v) { return v === ''; }) && formulas[i].every(function (f) { return f === ''; });
  };
  let below = -1, lastLabel = -1;
  for (let i = 0; i < n; i++) {
    const d = days[i][0];
    if (d !== '') lastLabel = i;
    if (Number(d) === when.getDate() && free(i)) return INV_HEADER_ROW + 1 + i;
  }
  for (let i = lastLabel + 1; i < n && below < 0; i++) if (free(i)) below = i;
  if (below >= 0) return INV_HEADER_ROW + 1 + below;
  tab.insertRowAfter(tab.getMaxRows());
  return tab.getMaxRows();
}

/** "November26", "DECEMBRE26", "octobre26"... */
function invMonthTab_(ss, d) {
  const yy = String(d.getFullYear()).slice(2);
  const want = [invNorm_(INV_MONTHS_EN[d.getMonth()] + yy), invNorm_(INV_MONTHS_FR[d.getMonth()] + yy)];
  return ss.getSheets().filter(function (s) { return want.indexOf(invNorm_(s.getName())) >= 0; })[0] || null;
}

/** A missing month tab: an empty copy of the latest month tab (same dropdowns and colours). */
function invMakeMonthTab_(ss, d) {
  const template = ss.getSheets().filter(function (s) { return invColumns_(s); }).pop();
  if (!template) return null;
  const tab = template.copyTo(ss).setName(INV_MONTHS_EN[d.getMonth()] + String(d.getFullYear()).slice(2));
  const rows = tab.getMaxRows() - INV_HEADER_ROW;
  if (rows > 0) {
    const body = tab.getRange(INV_HEADER_ROW + 1, 1, rows, tab.getMaxColumns());
    body.clearContent();   // the COPY only
    body.clearNote();
  }
  return tab;
}

function invNorm_(s) {
  return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '').toLowerCase();
}

function invOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
