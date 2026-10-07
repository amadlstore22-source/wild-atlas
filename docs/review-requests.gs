/**
 * MET Review requests — Google Apps Script
 *
 * Add this as a SECOND file in the Apps Script project of the "MET Enquiries"
 * spreadsheet (Extensions → Apps Script → + → Script → name it
 * "ReviewRequests"). Do NOT paste it over Code.gs: that file runs the website
 * forms. Adding a file does not touch the published web app, so the forms
 * keep working without republishing.
 *
 * What it does: a "Review requests" tab holds one row per client. Each row
 * gets one personal thank-you email asking for a Tripadvisor review, in the
 * client's language, sent from your Gmail as info@marrakechecotours.com. The
 * "Sent" column is filled in, so nobody is ever emailed twice.
 *
 * Tripadvisor's rules: never offer a reward for a review and never ask only
 * for good ones. The texts below do neither — keep it that way if you edit.
 *
 * Functions to run from the editor (dropdown at the top, then ▶ Run):
 *   reviewSetup         once: creates the tab
 *   reviewSendTest      sends the 3 language versions to YOU, to check them
 *   reviewSendDue       sends every row that is due and not yet sent
 *   reviewTurnOnDaily   optional: runs reviewSendDue by itself every morning
 *   reviewTurnOff       stops the daily run
 */

const REVIEW_SHEET = 'Review requests';
const REVIEW_HEADERS = ['Email', 'Name', 'Language', 'Tour date', 'Sent'];
const REVIEW_FROM = 'info@marrakechecotours.com';
const REVIEW_LINK = 'https://www.tripadvisor.com/UserReviewEdit-g293734-d18455591-Marrakech_Eco_Tours-Marrakech_Marrakech_Safi.html';
/** A row is due this many days after its tour date (empty date = due now). */
const REVIEW_DAYS_AFTER = 2;
/** Free Gmail allows about 100 script emails a day; stay well under it. */
const REVIEW_MAX_PER_RUN = 40;

const REVIEW_SIGNATURE = [
  'MET — Morocco Team',
  'Licensed tour operator · Marrakech Eco Tours',
  '+212 653 936 003 · WhatsApp',
  'info@marrakechecotours.com',
  'marrakechecotours.com · Marrakech, Morocco',
];

const REVIEW_TEXT = {
  en: {
    subject: 'Thank you for travelling with us',
    hello: (name) => (name ? `Hello ${name},` : 'Hello,'),
    paragraphs: [
      'Thank you for choosing Marrakech Eco Tours. It was a pleasure to share a part of Morocco with you, and we hope you came home with good memories.',
      'We are a small, family-run team, and most of our travellers find us through reviews. If you have two minutes, we would be very grateful if you shared your experience on Tripadvisor:',
    ],
    button: 'Write a review on Tripadvisor',
    after: [
      'A few lines about your guide, the route or a moment you remember would help future travellers more than anything we could write ourselves.',
      'If you ever come back to Morocco, or have friends planning a trip, we would be happy to welcome you again.',
    ],
    bye: 'Kind regards,',
  },
  es: {
    subject: 'Gracias por viajar con nosotros',
    hello: (name) => (name ? `Hola, ${name}:` : 'Hola:'),
    paragraphs: [
      'Gracias por elegir Marrakech Eco Tours. Fue un placer compartir con vosotros un pedacito de Marruecos, y esperamos que hayáis vuelto a casa con buenos recuerdos.',
      'Somos un equipo pequeño y familiar, y la mayoría de nuestros viajeros nos encuentran a través de las opiniones. Si tenéis dos minutos, os agradeceríamos mucho que compartierais vuestra experiencia en Tripadvisor:',
    ],
    button: 'Escribir una opinión en Tripadvisor',
    after: [
      'Unas líneas sobre vuestro guía, la ruta o un momento que recordéis ayudarán a otros viajeros mucho más que cualquier cosa que podamos escribir nosotros.',
      'Si algún día volvéis a Marruecos, o tenéis amigos que estén planeando un viaje, estaremos encantados de recibiros de nuevo.',
    ],
    bye: 'Un saludo,',
  },
  fr: {
    subject: "Merci d'avoir voyagé avec nous",
    hello: (name) => (name ? `Bonjour ${name},` : 'Bonjour,'),
    paragraphs: [
      "Merci d'avoir choisi Marrakech Eco Tours. Ce fut un plaisir de partager avec vous un morceau du Maroc, et nous espérons que vous en gardez de beaux souvenirs.",
      'Nous sommes une petite équipe familiale, et la plupart de nos voyageurs nous découvrent grâce aux avis. Si vous avez deux minutes, nous vous serions très reconnaissants de partager votre expérience sur Tripadvisor :',
    ],
    button: 'Laisser un avis sur Tripadvisor',
    after: [
      "Quelques lignes sur votre guide, l'itinéraire ou un moment qui vous a marqué aideront les futurs voyageurs bien plus que tout ce que nous pourrions écrire nous-mêmes.",
      'Si vous revenez un jour au Maroc, ou si des amis préparent un voyage, nous serons ravis de vous accueillir à nouveau.',
    ],
    bye: 'Cordialement,',
  },
};

// ─────────────────────────────────────────────────────────────────────────────

function reviewSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(REVIEW_SHEET) || ss.insertSheet(REVIEW_SHEET);
  sheet.getRange(1, 1, 1, REVIEW_HEADERS.length)
    .setValues([REVIEW_HEADERS])
    .setFontWeight('bold')
    .setBackground('#1a1a2e')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  sheet.setColumnWidth(1, 260);
  sheet.setColumnWidth(2, 160);
  sheet.setColumnWidth(5, 220);
  sheet.getRange('C2:C').setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(['en', 'es', 'fr'], true).build());
  sheet.getRange('D2:D').setNumberFormat('yyyy-mm-dd');
  ss.toast('Tab "' + REVIEW_SHEET + '" is ready. Add one row per client.');
}

/** Sends the English, Spanish and French versions to you only. */
function reviewSendTest() {
  const me = Session.getActiveUser().getEmail() || Session.getEffectiveUser().getEmail();
  ['en', 'es', 'fr'].forEach((lang) => reviewSend_(me, 'Test', lang));
  SpreadsheetApp.getActiveSpreadsheet().toast('3 test emails sent to ' + me + ' — sending as ' + reviewSender_());
}

function reviewSendDue() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REVIEW_SHEET);
  if (!sheet) throw new Error('Run reviewSetup first.');
  const last = sheet.getLastRow();
  if (last < 2) return;

  const rows = sheet.getRange(2, 1, last - 1, REVIEW_HEADERS.length).getValues();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const alreadyAsked = new Set(
    rows.filter((r) => String(r[4]).startsWith('Sent')).map((r) => String(r[0]).trim().toLowerCase()));

  let sent = 0;
  rows.forEach((r, i) => {
    if (sent >= REVIEW_MAX_PER_RUN) return;
    const email = String(r[0]).trim();
    const status = String(r[4]).trim();
    if (!email || status) return;

    const cell = sheet.getRange(i + 2, 5);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      cell.setValue('Skipped: not a valid email');
      return;
    }
    if (alreadyAsked.has(email.toLowerCase())) {
      cell.setValue('Skipped: already asked');
      return;
    }
    if (r[3] instanceof Date) {
      const due = new Date(r[3]);
      due.setHours(0, 0, 0, 0);
      due.setDate(due.getDate() + REVIEW_DAYS_AFTER);
      if (due > today) return; // not yet — the daily run picks it up later
    }

    try {
      reviewSend_(email, String(r[1]).trim(), String(r[2]).trim().toLowerCase());
      cell.setValue('Sent ' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm'));
      alreadyAsked.add(email.toLowerCase());
      sent++;
    } catch (err) {
      cell.setValue('ERROR: ' + err.message);
    }
  });
  if (sent) SpreadsheetApp.getActiveSpreadsheet().toast(sent + ' review request(s) sent.');
}

function reviewTurnOnDaily() {
  reviewTurnOff();
  ScriptApp.newTrigger('reviewSendDue').timeBased().everyDays(1).atHour(10).create();
  SpreadsheetApp.getActiveSpreadsheet().toast('Daily review emails are ON (around 10:00).');
}

function reviewTurnOff() {
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === 'reviewSendDue')
    .forEach((t) => ScriptApp.deleteTrigger(t));
}

// ─────────────────────────────────────────────────────────────────────────────

/** info@ if this Gmail can send as it, otherwise the Gmail address itself. */
function reviewSender_() {
  return GmailApp.getAliases().indexOf(REVIEW_FROM) !== -1 ? REVIEW_FROM : Session.getEffectiveUser().getEmail();
}

function reviewSend_(to, name, lang) {
  const t = REVIEW_TEXT[lang] || REVIEW_TEXT.en;
  const plain = [t.hello(name), '', ...t.paragraphs, '', REVIEW_LINK, '', ...t.after.flatMap((p) => [p, '']),
    t.bye, '', ...REVIEW_SIGNATURE].join('\n');

  const p = (s) => `<p style="margin:0 0 14px">${escape_(s)}</p>`;
  const html =
    `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#1f2433;max-width:560px">` +
    p(t.hello(name)) + t.paragraphs.map(p).join('') +
    `<p style="margin:20px 0 22px"><a href="${REVIEW_LINK}" style="background:#00aa6c;color:#ffffff;` +
    `padding:11px 20px;border-radius:4px;text-decoration:none;font-weight:bold;display:inline-block">${escape_(t.button)}</a></p>` +
    t.after.map(p).join('') + p(t.bye) +
    `<p style="margin:0;color:#4a5068;font-size:13px">${REVIEW_SIGNATURE.map(escape_).join('<br>')}</p></div>`;

  const options = { htmlBody: html, name: 'Marrakech Eco Tours', replyTo: REVIEW_FROM };
  if (reviewSender_() === REVIEW_FROM) options.from = REVIEW_FROM;
  GmailApp.sendEmail(to, t.subject, plain, options);
}

function escape_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
