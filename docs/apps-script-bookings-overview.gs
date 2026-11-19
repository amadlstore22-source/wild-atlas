/**
 * bookings26 — year overview (2026-11-01, owner: "a precise overview of the
 * entire year: how many bookings we had, how much money circulated").
 *
 * Paste as a NEW file "overview" in the bookings26 Apps Script project (next to
 * Code, deposits, tidy, sheets). Run overviewBuild once. It fills the empty tab
 * the owner added ("Sheet12", renamed "Overview 2026") with LIVE formulas that
 * read the 2026 month tabs, so every number updates by itself when a booking is
 * added, changed or deleted. Re-run it only when a month tab is added or
 * renamed.
 *
 * Safety (owner's rule: "do not lose any data"; do not interfere with the
 * deposit or invoice scripts):
 *   - it WRITES only to its own tab, and refuses if that tab holds anything it
 *     did not write (its A1 carries the note OVERVIEW_MARK);
 *   - it only READS the month tabs' header row, to find each column by name;
 *   - the tab never contains the labels "TOUR BOOKED" or "DATE", which is how
 *     the tidy, deposit and invoice scripts recognise a booking tab;
 *   - no triggers, no menus, no edits to any other tab.
 *
 * Amounts are read as euros (the sheet's own row-1 totals treat them the same
 * way). CLIENTE may say "4" or "2 people": the first number counts.
 */

const OVERVIEW_NAMES = ['Overview 2026', 'Sheet12'];
const OVERVIEW_TITLE = 'Overview 2026';
const OVERVIEW_YEAR = 2026;
const OVERVIEW_MARK = 'overview:bookings26 (written by overviewBuild; safe to re-run)';
const OVERVIEW_EURO = '€#,##0.00';

// Tour families, first match wins. "High Atlas & Agafay Day" counts as desert.
const OVERVIEW_FAMILIES = [
  ['Desert (Sahara, Zagora, Agafay)', 'desert|sahara|merzouga|zagora|agafay|chegaga|dune|camel'],
  ['Treks & mountains', 'toubkal|trek|hike|summit|mgoun|azzaden|mountain'],
  ['City, culture & food', 'medina|cultur|food|cooking|city|cities|imperial|fes|chefchaouen'],
  ['Day trips & valleys', 'ourika|ouzoud|essaouira|imlil|valley|waterfall|paradise|day trip|excursion'],
];

// PAYMENT dropdown → how it is counted. Matched on the upper-cased text.
const OVERVIEW_STATUS = [
  ['Paid in full', 'IN FULL'],
  ['Deposit arrived', 'DEPOSIT ARRIVED'],
  ['Made a deposit', 'MADE A DEPOSIT'],
  ['Pay on arrival', 'ON ARRI'],
  ['Nothing yet', 'NOTHING'],
];

// Colours of the sheet's own style (indigo bars, light headers, green totals).
const OV = { bar: '#1f2a44', barText: '#ffffff', head: '#d9d2e9', band: '#f3f0e8', total: '#d9ead3', note: '#666666' };

// The dashboard at the top (2026-11-09, owner: "it needs to have a canva, not
// just lines, with graphs and statistics"). Rows 4-9 hold eight number cards,
// rows 11-42 four charts in a 2 x 2 grid; the tables start at row 44.
const OVERVIEW_DASH = { cardRows: [4, 7], chartRows: [11, 27], tables: 44, chartW: 590, chartH: 315 };
const OVERVIEW_EURO0 = '€#,##0';
// Slice colours, in the order of OVERVIEW_STATUS + "No status chosen" + "Other", and of the families + "Other".
const OVERVIEW_STATUS_COLOURS = ['#38761d', '#6aa84f', '#93c47d', '#f1c232', '#cc4125', '#cccccc', '#999999'];
const OVERVIEW_FAMILY_COLOURS = ['#e69138', '#1f2a44', '#8e7cc3', '#6aa84f', '#cccccc'];

function overviewBuild() {
  const ss = SpreadsheetApp.getActive();
  const tab = overviewTab_(ss);
  const months = overviewMonths_(ss);
  if (!months.length) throw new Error('No ' + OVERVIEW_YEAR + ' month tab with a TOUR BOOKED header was found. Nothing was changed.');

  // Charts and merged cards are not removed by clear(): take them off first,
  // so a re-run never stacks a second set of charts on the first.
  tab.getCharts().forEach(function (c) { tab.removeChart(c); });
  tab.getRange(1, 1, tab.getMaxRows(), tab.getMaxColumns()).breakApart();
  tab.clear();
  tab.setRowHeights(1, tab.getMaxRows(), 21);
  tab.setHiddenGridlines(true);
  tab.getRange(1, 1).setNote(OVERVIEW_MARK);
  if (tab.getName() !== OVERVIEW_TITLE) tab.setName(OVERVIEW_TITLE);

  const W = 11;   // columns A..K
  let r = 1;

  // ---- title
  overviewBar_(tab, r, W, 'MET bookings ' + OVERVIEW_YEAR + ' — the whole year at a glance');
  r++;
  tab.getRange(r, 1).setValue('Live: every number below reads the month tabs (' +
    months.map(function (m) { return m.tab.getName(); }).join(', ') +
    ') and updates by itself. Amounts in euros. Re-run overviewBuild only if a month tab is added.')
    .setFontStyle('italic').setFontColor(OV.note);
  // The dashboard (cards + charts) sits above the tables; it is drawn last,
  // once the tables it reads exist.
  r = OVERVIEW_DASH.tables;

  // ---- monthly table (filled first so the headline figures can point at it)
  const mHead = ['Month', 'Bookings', 'Travellers', 'Deposits taken', 'Balance (amount left)',
    'Total booking value', 'Average per booking', 'Average group size', 'Share of the year'];
  const mStart = r + 12;   // leave room for the headline block
  overviewBar_(tab, mStart, W, 'Month by month');
  overviewHead_(tab, mStart + 1, mHead);
  const first = mStart + 2, last = first + months.length - 1, totalRow = last + 1;
  months.forEach(function (m, i) {
    const row = first + i, c = m.cols, t = m.tab;
    const has = overviewHas_(t, c, m.start);
    tab.getRange(row, 1, 1, 9).setFormulas([[
      '="' + overviewMonthLabel_(m) + '"',
      '=ARRAYFORMULA(SUMPRODUCT(' + has + '))',
      c.CLIENTE ? '=ARRAYFORMULA(SUMPRODUCT(' + has + '*' + overviewPeople_(overviewCol_(t, c.CLIENTE, m.start)) + '))' : '=0',
      '=ARRAYFORMULA(SUMPRODUCT(' + has + '*' + overviewNum_(overviewCol_(t, c.DEPOSIT, m.start)) + '))',
      c['AMOUNT LEFT'] ? '=ARRAYFORMULA(SUMPRODUCT(' + has + '*' + overviewNum_(overviewCol_(t, c['AMOUNT LEFT'], m.start)) + '))' : '=0',
      '=D' + row + '+E' + row,
      '=IF(B' + row + '=0,"",F' + row + '/B' + row + ')',
      '=IF(B' + row + '=0,"",C' + row + '/B' + row + ')',
      '=IF($F$' + totalRow + '=0,"",F' + row + '/$F$' + totalRow + ')',
    ]]);
    if (i % 2) tab.getRange(row, 1, 1, 9).setBackground(OV.band);
  });
  tab.getRange(totalRow, 1, 1, 9).setFormulas([[
    '="Year ' + OVERVIEW_YEAR + '"',
    '=SUM(B' + first + ':B' + last + ')', '=SUM(C' + first + ':C' + last + ')',
    '=SUM(D' + first + ':D' + last + ')', '=SUM(E' + first + ':E' + last + ')',
    '=SUM(F' + first + ':F' + last + ')',
    '=IF(B' + totalRow + '=0,"",F' + totalRow + '/B' + totalRow + ')',
    '=IF(B' + totalRow + '=0,"",C' + totalRow + '/B' + totalRow + ')',
    '=IF(F' + totalRow + '=0,"",1)',
  ]]).setFontWeight('bold').setBackground(OV.total);
  tab.getRange(first, 4, months.length + 1, 4).setNumberFormat(OVERVIEW_EURO);
  tab.getRange(first, 8, months.length + 1, 1).setNumberFormat('0.0');
  tab.getRange(first, 9, months.length + 1, 1).setNumberFormat('0%');
  overviewBox_(tab, mStart + 1, 9, months.length + 2);

  // ---- headline figures (rows r .. r+9), pointing at the monthly totals
  overviewBar_(tab, r, W, 'The year in numbers');
  const T = function (col) { return '$' + col + '$' + totalRow; };
  const months_ = 'A' + first + ':A' + last, values_ = 'F' + first + ':F' + last, counts_ = 'B' + first + ':B' + last;
  const headline = [
    ['Bookings', '=' + T('B'), '0'],
    ['Travellers', '=' + T('C'), '0'],
    ['Total booking value (money circulated)', '=' + T('F'), OVERVIEW_EURO],
    ['Deposits taken', '=' + T('D'), OVERVIEW_EURO],
    ['Balance on the bookings (amount left)', '=' + T('E'), OVERVIEW_EURO],
    ['Average booking value', '=' + T('G'), OVERVIEW_EURO],
    ['Average group size', '=' + T('H'), '0.0'],
    ['Busiest month (most bookings)', '=IF(' + T('B') + '=0,"",INDEX(' + months_ + ',MATCH(MAX(' + counts_ + '),' + counts_ + ',0)))', '@'],
    ['Biggest month (highest value)', '=IF(' + T('F') + '=0,"",INDEX(' + months_ + ',MATCH(MAX(' + values_ + '),' + values_ + ',0)))', '@'],
  ];
  headline.forEach(function (h, i) {
    const row = r + 1 + i;
    tab.getRange(row, 1).setValue(h[0]).setFontWeight('bold');
    tab.getRange(row, 3).setFormula(h[1]).setNumberFormat(h[2]).setFontWeight('bold').setHorizontalAlignment('right');
    if (i % 2) tab.getRange(row, 1, 1, 3).setBackground(OV.band);
  });
  overviewBox_(tab, r + 1, 3, headline.length);

  // ---- payment status (year), right after the monthly table
  r = totalRow + 2;
  const statusHead = r + 1;
  overviewBar_(tab, r, W, 'Payment status (PAYMENT column), whole year');
  overviewHead_(tab, r + 1, ['Status', 'Bookings', 'Deposits taken', 'Balance (amount left)', 'Total value']);
  const S = overviewStack_(months);
  const statusRows = OVERVIEW_STATUS.map(function (s) {
    return [s[0], 'REGEXMATCH(UPPER(TO_TEXT(' + S.pay + ')),"' + s[1] + '")'];
  });
  statusRows.push(['No status chosen', '(LEN(TRIM(TO_TEXT(' + S.pay + ')))=0)']);
  statusRows.forEach(function (s, i) {
    const row = r + 2 + i, mask = S.has + '*' + s[1];
    tab.getRange(row, 1).setValue(s[0]);
    tab.getRange(row, 2, 1, 4).setFormulas([[
      '=ARRAYFORMULA(SUMPRODUCT(' + mask + '))',
      '=ARRAYFORMULA(SUMPRODUCT(' + mask + '*' + overviewNum_(S.dep) + '))',
      '=ARRAYFORMULA(SUMPRODUCT(' + mask + '*' + overviewNum_(S.left) + '))',
      '=C' + row + '+D' + row,
    ]]);
    if (i % 2) tab.getRange(row, 1, 1, 5).setBackground(OV.band);
  });
  const sLast = r + 1 + statusRows.length, sTotal = sLast + 1;
  tab.getRange(sTotal, 1, 1, 5).setFormulas([[
    '="Other (typed text)"',
    '=' + T('B') + '-SUM(B' + (r + 2) + ':B' + sLast + ')',
    '=' + T('D') + '-SUM(C' + (r + 2) + ':C' + sLast + ')',
    '=' + T('E') + '-SUM(D' + (r + 2) + ':D' + sLast + ')',
    '=C' + sTotal + '+D' + sTotal,
  ]]).setFontColor(OV.note);
  tab.getRange(r + 2, 3, statusRows.length + 1, 3).setNumberFormat(OVERVIEW_EURO);
  overviewBox_(tab, r + 1, 5, statusRows.length + 2);

  // ---- tour families (year)
  r = sTotal + 2;
  const familyHead = r + 1;
  overviewBar_(tab, r, W, 'What was booked, by kind of tour (read from the tour name), whole year');
  overviewHead_(tab, r + 1, ['Kind of tour', 'Bookings', 'Travellers', 'Total value', 'Share of value']);
  const low = 'LOWER(TO_TEXT(' + S.tour + '))';
  const hit = OVERVIEW_FAMILIES.map(function (f) { return 'REGEXMATCH(' + low + ',"' + f[1] + '")'; });
  OVERVIEW_FAMILIES.forEach(function (f, i) {
    let mask = S.has + '*' + hit[i];
    for (let j = 0; j < i; j++) mask += '*(1-' + hit[j] + ')';   // first match wins
    const row = r + 2 + i;
    tab.getRange(row, 1).setValue(f[0]);
    tab.getRange(row, 2, 1, 4).setFormulas([[
      '=ARRAYFORMULA(SUMPRODUCT(' + mask + '))',
      '=ARRAYFORMULA(SUMPRODUCT(' + mask + '*' + overviewPeople_(S.people) + '))',
      '=ARRAYFORMULA(SUMPRODUCT(' + mask + '*(' + overviewNum_(S.dep) + '+' + overviewNum_(S.left) + ')))',
      '=IF(' + T('F') + '=0,"",D' + row + '/' + T('F') + ')',
    ]]);
    if (i % 2) tab.getRange(row, 1, 1, 5).setBackground(OV.band);
  });
  const fLast = r + 1 + OVERVIEW_FAMILIES.length, fOther = fLast + 1;
  tab.getRange(fOther, 1, 1, 5).setFormulas([[
    '="Other"',
    '=' + T('B') + '-SUM(B' + (r + 2) + ':B' + fLast + ')',
    '=' + T('C') + '-SUM(C' + (r + 2) + ':C' + fLast + ')',
    '=' + T('F') + '-SUM(D' + (r + 2) + ':D' + fLast + ')',
    '=IF(' + T('F') + '=0,"",D' + fOther + '/' + T('F') + ')',
  ]]).setFontColor(OV.note);
  tab.getRange(r + 2, 4, OVERVIEW_FAMILIES.length + 1, 1).setNumberFormat(OVERVIEW_EURO);
  tab.getRange(r + 2, 5, OVERVIEW_FAMILIES.length + 1, 1).setNumberFormat('0%');
  overviewBox_(tab, r + 1, 5, OVERVIEW_FAMILIES.length + 2);

  // ---- check line: the monthly sums must equal each tab's own row-1 totals
  r = fOther + 2;
  overviewBar_(tab, r, W, 'Check: these should match each month tab\'s own totals in row 1');
  overviewHead_(tab, r + 1, ['Month', 'Deposits (row 1 of the tab)', 'Deposits (here)', 'Amount left (row 1)', 'Amount left (here)', 'Match?']);
  months.forEach(function (m, i) {
    const row = r + 2 + i, src = first + i;
    const g1 = m.cols.DEPOSIT ? overviewRef_(m.tab, 1, m.cols.DEPOSIT) : '""';
    const h1 = m.cols['AMOUNT LEFT'] ? overviewRef_(m.tab, 1, m.cols['AMOUNT LEFT']) : '""';
    tab.getRange(row, 1, 1, 6).setFormulas([[
      '=A' + src, '=' + g1, '=D' + src, '=' + h1, '=E' + src,
      '=IF(AND(ROUND(N(B' + row + '),2)=ROUND(C' + row + ',2),ROUND(N(D' + row + '),2)=ROUND(E' + row + ',2)),"yes","CHECK")',
    ]]);
  });
  tab.getRange(r + 2, 2, months.length, 4).setNumberFormat(OVERVIEW_EURO);
  overviewBox_(tab, r + 1, 6, months.length + 1);

  // ---- layout
  tab.setColumnWidth(1, 300);
  for (let c = 2; c <= 9; c++) tab.setColumnWidth(c, 150);
  tab.setFrozenRows(1);

  // ---- the dashboard: cards and charts, all reading the tables above
  overviewDashboard_(tab, {
    first: first, last: last, totalRow: totalRow, monthHead: mStart + 1,
    statusHead: statusHead, statusLast: sTotal, familyHead: familyHead, familyLast: fOther,
  });
  SpreadsheetApp.flush();
  ss.toast('Overview written to "' + OVERVIEW_TITLE + '" for ' + months.length + ' month tab(s). No other tab was changed.', 'Overview', 10);
}

/**
 * Eight number cards and four charts. Every card is a formula and every chart
 * reads a range of the tables below, so the whole dashboard updates by itself.
 */
function overviewDashboard_(tab, at) {
  const D = OVERVIEW_DASH;
  const T = function (col) { return '$' + col + '$' + at.totalRow; };
  const months = 'A' + at.first + ':A' + at.last;
  const counts = 'B' + at.first + ':B' + at.last, values = 'F' + at.first + ':F' + at.last;
  const cards = [
    ['BOOKINGS', '=' + T('B'), '0'],
    ['TRAVELLERS', '=' + T('C'), '0'],
    ['MONEY CIRCULATED (TOTAL BOOKING VALUE)', '=' + T('F'), OVERVIEW_EURO0],
    ['AVERAGE BOOKING VALUE', '=IF(' + T('B') + '=0,0,' + T('F') + '/' + T('B') + ')', OVERVIEW_EURO0],
    ['DEPOSITS TAKEN', '=' + T('D'), OVERVIEW_EURO0],
    ['BALANCE STILL TO COLLECT', '=' + T('E'), OVERVIEW_EURO0],
    ['BUSIEST MONTH (MOST BOOKINGS)', '=IF(' + T('B') + '=0,"-",INDEX(' + months + ',MATCH(MAX(' + counts + '),' + counts + ',0)))', '@'],
    ['BIGGEST MONTH (HIGHEST VALUE)', '=IF(' + T('F') + '=0,"-",INDEX(' + months + ',MATCH(MAX(' + values + '),' + values + ',0)))', '@'],
  ];
  const spans = [[1, 1], [2, 2], [4, 2], [6, 2]];   // [first column, width]: A, B:C, D:E, F:G
  cards.forEach(function (c, i) {
    const row = D.cardRows[Math.floor(i / 4)], s = spans[i % 4];
    const label = tab.getRange(row, s[0], 1, s[1]), value = tab.getRange(row + 1, s[0], 1, s[1]);
    if (s[1] > 1) { label.merge(); value.merge(); }
    tab.getRange(row, s[0]).setValue(c[0]);
    tab.getRange(row + 1, s[0]).setFormula(c[1]);
    label.setFontSize(9).setFontWeight('bold').setFontColor(OV.note).setBackground(OV.band)
      .setHorizontalAlignment('left').setVerticalAlignment('bottom');
    value.setNumberFormat(c[2]).setFontSize(22).setFontWeight('bold').setFontColor(OV.bar).setBackground(OV.band)
      .setHorizontalAlignment('left').setVerticalAlignment('middle');
    tab.getRange(row, s[0], 2, s[1]).setBorder(true, true, true, true, null, null, '#ffffff', SpreadsheetApp.BorderStyle.SOLID_THICK);
  });
  D.cardRows.forEach(function (row) {
    tab.setRowHeight(row, 24);
    tab.setRowHeight(row + 1, 46);
    tab.setRowHeight(row + 2, 10);
  });

  const col = function (letter, from, to) { return tab.getRange(letter + from + ':' + letter + to); };
  const base = function (builder, row, column, offsetX, title) {
    return builder.setNumHeaders(1)
      .setPosition(row, column, offsetX, 0)
      .setOption('title', title)
      .setOption('titleTextStyle', { color: OV.bar, fontSize: 14, bold: true })
      .setOption('legend', { position: 'bottom' })
      .setOption('backgroundColor', '#ffffff')
      .setOption('width', D.chartW)
      .setOption('height', D.chartH);
  };
  const m = function (letter) { return col(letter, at.monthHead, at.last); };   // header + months, not the Year row

  tab.insertChart(base(tab.newChart().asColumnChart(), D.chartRows[0], 1, 0, 'Bookings and travellers per month')
    .addRange(m('A')).addRange(m('B')).addRange(m('C'))
    .setOption('colors', [OV.bar, '#8e7cc3'])
    .build());
  // setStacked is a column-builder method, so it goes before the generic ones
  // (their documented return type is the plain EmbeddedChartBuilder).
  tab.insertChart(base(tab.newChart().asColumnChart().setStacked(), D.chartRows[0], 4, 10, 'Money per month: deposits taken and balance to collect (€)')
    .addRange(m('A')).addRange(m('D')).addRange(m('E'))
    .setOption('colors', ['#6aa84f', '#f1c232'])
    .setOption('vAxis', { format: OVERVIEW_EURO0 })
    .build());
  tab.insertChart(base(tab.newChart().asPieChart(), D.chartRows[1], 1, 0, 'Payment status (number of bookings)')
    .addRange(col('A', at.statusHead, at.statusLast)).addRange(col('B', at.statusHead, at.statusLast))
    .setOption('pieHole', 0.5)
    .setOption('colors', OVERVIEW_STATUS_COLOURS)
    .setOption('legend', { position: 'right' })
    .build());
  tab.insertChart(base(tab.newChart().asPieChart(), D.chartRows[1], 4, 10, 'What was booked: share of the money, by kind of tour')
    .addRange(col('A', at.familyHead, at.familyLast)).addRange(col('D', at.familyHead, at.familyLast))
    .setOption('pieHole', 0.5)
    .setOption('colors', OVERVIEW_FAMILY_COLOURS)
    .setOption('legend', { position: 'right' })
    .build());
}

/** The owner's empty tab (or the overview it already holds). Refuses anything else. */
function overviewTab_(ss) {
  const tab = ss.getSheets().filter(function (s) { return OVERVIEW_NAMES.indexOf(s.getName()) >= 0; })[0];
  if (!tab) throw new Error('No tab named "Sheet12" or "' + OVERVIEW_TITLE + '". Add an empty tab named Sheet12 and run again. Nothing was changed.');
  const ours = String(tab.getRange(1, 1).getNote()).indexOf('overview:bookings26') === 0;
  if (!ours && tab.getLastRow() > 0) {
    throw new Error('"' + tab.getName() + '" is not empty and was not written by this script, so it was left alone. ' +
      'Empty it (or add a new empty tab named Sheet12) and run again. Nothing was changed.');
  }
  return tab;
}

/** The 2026 month tabs, in calendar order, with each column found by its header name. */
function overviewMonths_(ss) {
  const out = [];
  ss.getSheets().forEach(function (tab) {
    const ym = overviewTabMonth_(tab.getName());
    if (!ym || ym.y !== OVERVIEW_YEAR) return;
    const width = tab.getLastColumn(), rows = Math.min(5, tab.getLastRow());
    if (width < 1 || rows < 1) return;
    const top = tab.getRange(1, 1, rows, width).getValues();
    for (let r = 0; r < top.length; r++) {
      const keys = top[r].map(function (h) { return String(h).trim().toUpperCase(); });
      if (keys.indexOf('TOUR BOOKED') < 0) continue;
      const cols = {};
      keys.forEach(function (k, i) { if (k && !cols[k]) cols[k] = i + 1; });
      if (!cols.DEPOSIT) return;
      out.push({ tab: tab, y: ym.y, m: ym.m, cols: cols, start: r + 2 });
      return;
    }
  });
  return out.sort(function (a, b) { return a.m - b.m; });
}

const OVERVIEW_MONTH_WORDS = [['juin', 5], ['juil', 6], ['jan', 0], ['feb', 1], ['fev', 1], ['mar', 2], ['apr', 3], ['avr', 3],
  ['may', 4], ['mai', 4], ['jun', 5], ['jul', 6], ['aug', 7], ['aou', 7], ['sep', 8], ['oct', 9], ['nov', 10], ['dec', 11]];
const OVERVIEW_MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** "November26" → {y:2026, m:10}; "septembre26", "DECEMBRE26" too. Same rule as the tidy file. */
function overviewTabMonth_(name) {
  const s = String(name).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '').toLowerCase();
  const m = s.match(/^([a-z]+)(\d{2})$/);
  if (!m) return null;
  for (let i = 0; i < OVERVIEW_MONTH_WORDS.length; i++) {
    if (m[1].indexOf(OVERVIEW_MONTH_WORDS[i][0]) === 0) return { y: 2000 + Number(m[2]), m: OVERVIEW_MONTH_WORDS[i][1] };
  }
  return null;
}

function overviewMonthLabel_(m) { return OVERVIEW_MONTH_NAMES[m.m] + ' ' + m.y; }

function overviewLetter_(c) {
  let s = '';
  while (c > 0) { const k = (c - 1) % 26; s = String.fromCharCode(65 + k) + s; c = (c - k - 1) / 26; }
  return s;
}
function overviewQuote_(tab) { return "'" + tab.getName().replace(/'/g, "''") + "'"; }
function overviewCol_(tab, col, start) {
  const L = overviewLetter_(col);
  return overviewQuote_(tab) + '!' + L + start + ':' + L;
}
function overviewRef_(tab, row, col) { return overviewQuote_(tab) + '!' + overviewLetter_(col) + row; }

/** 1 where the row has a tour written in TOUR BOOKED. */
function overviewHas_(tab, cols, start) {
  return '((LEN(TRIM(TO_TEXT(' + overviewCol_(tab, cols['TOUR BOOKED'], start) + ')))>0)*1)';
}

/** A money cell as a number: 1372, "€151.00", "1,372.00", "52$" → 1372, 151, 1372, 52. */
function overviewNum_(range) {
  return 'IFERROR(VALUE(REGEXREPLACE(TO_TEXT(' + range + '),"[^0-9.\\-]","")),0)';
}
/** CLIENTE as a head count: 4, "2 people" → 4, 2. */
function overviewPeople_(range) {
  return 'IFERROR(VALUE(REGEXEXTRACT(TO_TEXT(' + range + '),"\\d+")),0)';
}

/** The year's columns stacked month under month, each month with its own column letters. */
function overviewStack_(months) {
  const stack = function (key) {
    return '{' + months.map(function (m) {
      return m.cols[key] ? overviewCol_(m.tab, m.cols[key], m.start)
        : 'IF(ROW(' + overviewCol_(m.tab, m.cols['TOUR BOOKED'], m.start) + '),"")';
    }).join(';') + '}';
  };
  const tour = stack('TOUR BOOKED');
  return {
    tour: tour,
    has: '((LEN(TRIM(TO_TEXT(' + tour + ')))>0)*1)',
    pay: stack('PAYMENT'),
    dep: stack('DEPOSIT'),
    left: stack('AMOUNT LEFT'),
    people: stack('CLIENTE'),
  };
}

function overviewBar_(tab, row, width, text) {
  tab.getRange(row, 1, 1, width).setBackground(OV.bar);
  tab.getRange(row, 1).setValue(text).setFontColor(OV.barText).setFontWeight('bold').setFontSize(12);
}
function overviewHead_(tab, row, labels) {
  tab.getRange(row, 1, 1, labels.length).setValues([labels]).setFontWeight('bold').setBackground(OV.head).setWrap(true);
}
function overviewBox_(tab, row, width, height) {
  tab.getRange(row, 1, height, width)
    .setBorder(true, true, true, true, true, true, '#999999', SpreadsheetApp.BorderStyle.SOLID);
}
