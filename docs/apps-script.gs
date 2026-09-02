/**
 * MET Enquiries + Invoices — Google Apps Script
 *
 * Paste this over the WHOLE contents of the Apps Script editor for the
 * "MET Enquiries" spreadsheet, then follow the steps in
 * docs/INVOICE_SHEET_SETUP.md to republish it.
 *
 * Two things this adds over the previous version:
 *   1. An "Invoices" tab, with its own columns and a duplicate guard.
 *   2. A fix to the duplicate-highlight rule, which watched column F
 *      (Departure) and therefore flagged every two customers who wanted the
 *      same travel date as duplicates. It now watches column D (Email).
 */

// ─────────────────────────────────────────────────────────────────────────────
// SECRET
//
// Must match SHEET_WEBHOOK_SECRET in .env.local and in Vercel.
//
// Rotate this if it has ever been pasted into an email, a chat, or a support
// thread. Anyone holding it can append rows (they cannot read the sheet).
// Changing it here means changing it in BOTH places, then republishing.
// ─────────────────────────────────────────────────────────────────────────────
const SECRET = 'PUT-YOUR-SECRET-HERE';

const ENQUIRY_HEADERS = [
  'Received', 'Type', 'Name', 'Email', 'Tour',
  'Departure', 'People', 'Subject', 'Message', 'Status', 'Notes',
];

const INVOICE_HEADERS = [
  'Issued', 'Invoice', 'Name', 'Email', 'Tour', 'Departure',
  'People', 'Total EUR', 'Deposit EUR', 'Balance EUR', 'Status', 'PDF',
];

// ═════════════════════════════════════════════════════════════════════════════
// STEP A — run ONCE from the editor: pick "setup" in the dropdown, click Run.
// Safe to re-run: it rebuilds headers and formatting without deleting rows.
// ═════════════════════════════════════════════════════════════════════════════
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  setupEnquiries_(ss);
  setupInvoices_(ss);
  ss.rename('MET Enquiries');
}

function setupEnquiries_(ss) {
  const sheet = ss.getSheets()[0];
  if (sheet.getName() === 'Sheet1') sheet.setName('Enquiries');

  sheet.getRange(1, 1, 1, ENQUIRY_HEADERS.length)
    .setValues([ENQUIRY_HEADERS])
    .setFontWeight('bold')
    .setBackground('#1a1a2e')
    .setFontColor('#ffffff');

  sheet.setFrozenRows(1);
  if (!sheet.getFilter()) {
    sheet.getRange(1, 1, sheet.getMaxRows(), ENQUIRY_HEADERS.length).createFilter();
  }

  const newRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('New')
    .setBackground('#f8d7da')
    .setRanges([sheet.getRange('J:J')])
    .build();

  // FIXED: this watched column F (Departure), so two different customers
  // asking about the same week were highlighted as duplicates — which is
  // normal demand, not an error. A real duplicate is the same EMAIL twice.
  const dupeRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($D1<>"", COUNTIF($D:$D,$D1)>1)')
    .setBackground('#ffe0b2')
    .setRanges([sheet.getRange('D:D')])
    .build();

  sheet.setConditionalFormatRules([newRule, dupeRule]);
  sheet.autoResizeColumns(1, ENQUIRY_HEADERS.length);
}

function setupInvoices_(ss) {
  const sheet = ss.getSheetByName('Invoices') || ss.insertSheet('Invoices');

  sheet.getRange(1, 1, 1, INVOICE_HEADERS.length)
    .setValues([INVOICE_HEADERS])
    .setFontWeight('bold')
    .setBackground('#1a1a2e')
    .setFontColor('#ffffff');

  sheet.setFrozenRows(1);
  if (!sheet.getFilter()) {
    sheet.getRange(1, 1, sheet.getMaxRows(), INVOICE_HEADERS.length).createFilter();
  }

  // Money as money, so SUM works and nothing renders as text.
  sheet.getRange('H:J').setNumberFormat('#,##0.00');
  sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd');
  sheet.getRange('F:F').setNumberFormat('yyyy-mm-dd');

  // Anything not yet marked Paid stands out — that is the money you are owed.
  const unpaid = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($B1<>"", $K1<>"Paid")')
    .setBackground('#fff3cd')
    .setRanges([sheet.getRange('A2:L')])
    .build();

  const paid = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Paid')
    .setBackground('#d4edda')
    .setRanges([sheet.getRange('K:K')])
    .build();

  sheet.setConditionalFormatRules([unpaid, paid]);
  sheet.autoResizeColumns(1, INVOICE_HEADERS.length);
}

// ═════════════════════════════════════════════════════════════════════════════
// STEP B — receives enquiries and invoices from marrakechecotours.com
// ═════════════════════════════════════════════════════════════════════════════
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.secret !== SECRET) {
      return json_({ ok: false, error: 'bad secret' });
    }

    return data.kind === 'invoice' ? addInvoice_(data) : addEnquiry_(data);

  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function addEnquiry_(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  sheet.appendRow([
    new Date(data.receivedAt || Date.now()),
    data.type === 'booking' ? 'Booking' : 'Contact',
    data.name || '',
    data.email || '',
    data.tour || '',
    data.date || 'flexible',
    data.people || '',
    data.subject || '',
    data.message || '',
    'New',
    '',
  ]);
  return json_({ ok: true });
}

function addInvoice_(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Invoices');
  if (!sheet) {
    // Better a clear error than silently appending invoices to the enquiry tab,
    // where the columns mean entirely different things.
    return json_({ ok: false, error: 'no sheet named "Invoices" — run setup()' });
  }

  // Never write the same invoice twice. Re-running the command after a network
  // wobble would otherwise duplicate the row, and a duplicated invoice number
  // is the one error a customer notices.
  if (data.number) {
    const existing = sheet.getRange('B:B').getValues();
    for (var i = 0; i < existing.length; i++) {
      if (existing[i][0] === data.number) {
        return json_({ ok: true, note: 'already recorded' });
      }
    }
  }

  sheet.appendRow([
    data.issued ? new Date(data.issued) : new Date(),
    data.number || '',
    data.clientName || '',
    data.clientEmail || '',
    data.tour || '',
    data.departure ? new Date(data.departure) : '',
    data.people || '',
    Number(data.totalEur || 0),
    Number(data.depositEur || 0),
    Number(data.balanceEur || 0),
    data.status || 'Unpaid',
    data.pdfPath || '',
  ]);
  return json_({ ok: true });
}

/**
 * Answers browser visits. The site only ever uses doPost — this exists purely
 * so opening the URL shows a status instead of a scary "doGet not found".
 */
function doGet() {
  return json_({ ok: true, service: 'MET enquiry + invoice log', method: 'POST only' });
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
