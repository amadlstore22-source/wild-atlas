/**
 * MET — invoices → bookings26   (add as a NEW FILE in the bookings26 script)
 *
 * Every time an invoice is made on the computer (npm run invoice), the booking
 * is written into bookings26 by itself:
 *   - in the month tab of the DEPARTURE date (November26, DECEMBRE26, ...);
 *   - each piece in its own column, found by its header in row 2:
 *       TOUR BOOKED, DATE, EMAILS (name, email, phone), CLIENTE (people),
 *       DEPOSIT, AMOUNT LEFT, PICK UP - DROP OFF, accomodation (camp / hotel /
 *       restaurant booked);
 *   - plus two columns it adds at the far right if missing: INVOICE (the
 *     invoice number) and TRIP DETAILS (everything promised to the client).
 * PAYMENT and DRIVER are never touched: those are the team's to fill. Writing
 * by script does not fire the deposit script; only your own PAYMENT edits do.
 *
 * Re-sending the same invoice (a new pick-up, a changed deposit) UPDATES its
 * row, found by the INVOICE column. It never adds a second row.
 * It only writes into a row that is completely empty (no value, no formula),
 * so it can never overwrite a booking or a total.
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
const INV_MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const INV_MONTHS_FR = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];

function doPost(e) {
  let data;
  try { data = JSON.parse(e.postData.contents); } catch (err) { return invOut_({ ok: false, error: 'not JSON' }); }
  if (INVOICE_SECRET.indexOf('PASTE') === 0) return invOut_({ ok: false, error: 'INVOICE_SECRET is not set in the script' });
  if (data.secret !== INVOICE_SECRET) return invOut_({ ok: false, error: 'wrong secret' });
  if (data.kind !== 'invoice') return invOut_({ ok: false, error: 'not an invoice' });
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    return invOut_(invPlace_(SpreadsheetApp.getActiveSpreadsheet(), data));
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

  let tab, row, cols, updated = false;
  const found = invFindInvoice_(ss, data.number);
  if (found) {
    tab = found.tab; row = found.row; cols = found.cols; updated = true;
  } else {
    tab = invMonthTab_(ss, when) || invMakeMonthTab_(ss, when);
    if (!tab) return { ok: false, error: 'no month tab for ' + data.departure + ' and none to copy' };
    cols = invColumns_(tab);
    row = invFreeRow_(tab);
  }
  invEnsureCols_(tab, cols);

  const who = [data.clientName, data.clientEmail, data.clientPhone].filter(String).join(' — ');
  const set = function (col, value) { if (col) tab.getRange(row, col).setValue(value); };
  set(cols['TOUR BOOKED'], data.tour || '');
  set(cols.DATE, when);
  set(cols.EMAILS, who);
  set(invAny_(cols, ['CLIENTE', 'GUESTS', 'PAX']), Number(data.people) || '');
  set(cols.DEPOSIT, Number(data.depositEur || 0));
  set(invAny_(cols, ['AMOUNT LEFT', 'BALANCE']), Number(data.balanceEur || 0));
  set(invAny_(cols, ['PICK UP - DROP OFF', 'PICK UP', 'PICKUP']), data.pickup || '');
  set(invAny_(cols, ['ACCOMODATION', 'ACCOMMODATION', 'CAMP / ACCOMMODATION']), data.suppliers || '');
  set(cols.INVOICE, data.number);
  set(cols['TRIP DETAILS'], data.details || '');
  if (cols.DATE && !updated && tab.getRange(row, cols.DATE).getNumberFormat() === 'General') {
    tab.getRange(row, cols.DATE).setNumberFormat('dd/mm/yyyy');
  }
  return { ok: true, tab: tab.getName(), row: row, updated: updated };
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

/** The row already holding this invoice number, in any month tab. */
function invFindInvoice_(ss, number) {
  const tabs = ss.getSheets();
  for (let t = 0; t < tabs.length; t++) {
    const cols = invColumns_(tabs[t]);
    if (!cols || !cols.INVOICE) continue;
    const n = tabs[t].getLastRow() - INV_HEADER_ROW;
    if (n < 1) continue;
    const vals = tabs[t].getRange(INV_HEADER_ROW + 1, cols.INVOICE, n, 1).getValues();
    for (let i = 0; i < vals.length; i++) {
      if (String(vals[i][0]).trim() === number) return { tab: tabs[t], row: INV_HEADER_ROW + 1 + i, cols: cols };
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
