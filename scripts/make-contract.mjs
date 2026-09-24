/**
 * Create a booking contract: writes the PDF(s) and allocates a CON number.
 *
 *   npm run contract -- --booking bookings/alejandro.json
 *
 * WHY A JSON FILE AND NOT FLAGS
 * A contract carries a day-by-day itinerary, named accommodation, and two
 * lists of services. That is not something to type on a command line without
 * mistakes, and it is the same data every time the trip is sold — so it lives
 * in a file that can be copied and edited.
 *
 * NUMBERING
 * Allocated from data/documents.json in the CON series, separate from
 * invoices. The previous version hardcoded `reference: "MET-2026-001"` in the
 * script, which meant the next contract would silently reuse it.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { renderContractHtml } from "../lib/contract.ts";
import {
  isTaken,
  nextNumber,
  readLedger,
  record,
  writeLedger,
} from "../lib/doc-ledger.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const BROWSERS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
];

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith("--")) continue;
    const key = argv[i].slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) out[key] = true;
    else {
      out[key] = next;
      i++;
    }
  }
  return out;
}

function slug(s) {
  return String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

const args = parseArgs(process.argv.slice(2));

if (!args.booking || args.help) {
  console.log(`
Create a booking contract PDF and record it in the ledger.

  --booking   path to the booking JSON (required)
  --number    override the automatic CON number
  --reissue   re-render an existing number for the SAME client (e.g. after
              correcting a clause). Refuses if the name does not match.
  --out       output directory (default: your Downloads folder)
  --en-only   English edition only
  --es-only   Spanish edition only
  --fr-only   French edition only

The booking JSON needs: clientName, travellers, tourTitle, departure, ret,
guideLanguage, days[], accommodation[], includes[], excludes[], total, deposit.
Amounts in EUR cents. See bookings/ for a worked example.

LANGUAGE. The base fields are the language the sale was negotiated in; set
"primaryLang" to name it ("es" if absent). Add an "en"/"fr"/"es" block to
write a second edition, which overrides prose only — dates, money and the
reference are shared, so two editions cannot contradict each other on
anything a client would dispute. The primary edition is the one that governs.
`);
  process.exit(args.booking ? 0 : 1);
}

const bookingPath = path.resolve(ROOT, args.booking);
if (!fs.existsSync(bookingPath)) {
  throw new Error(`no booking file at ${bookingPath}`);
}
const booking = JSON.parse(fs.readFileSync(bookingPath, "utf8"));

for (const field of ["clientName", "travellers", "tourTitle", "total"]) {
  if (booking[field] === undefined) {
    throw new Error(`booking file is missing "${field}"`);
  }
}

const issued = booking.issued || new Date().toISOString().slice(0, 10);
const ledger = readLedger(ROOT);
const number = args.number || nextNumber(ledger, "contract", issued.slice(0, 4));

if (isTaken(ledger, number)) {
  const held = ledger.documents.find((d) => d.number === number);
  /**
   * --reissue RE-RENDERS ONE CLIENT'S OWN CONTRACT under its existing
   * number. It is for correcting a document already generated — a wrong
   * clause, a corrected date — where issuing a second number would leave the
   * client holding two contracts for one trip and unsure which binds.
   *
   * It is NOT a way to reuse a number on a different booking: the name must
   * match, checked here and again in the ledger, which keeps the original
   * issue date and counts the reissues.
   */
  const sameClient =
    String(held.clientName).trim().toLowerCase() ===
    String(booking.clientName).trim().toLowerCase();

  if (!args.reissue) {
    throw new Error(
      `${number} has already been issued to ${held.clientName} ` +
        `(${held.kind}, ${held.issued}). Drop --number to auto-allocate, ` +
        `or pass --reissue to re-render this same client's contract.`,
    );
  }
  if (!sameClient) {
    throw new Error(
      `refusing to reissue ${number}: it belongs to ${held.clientName}, not ` +
        `${booking.clientName}. Reissuing is for re-rendering one client's ` +
        `own contract.`,
    );
  }
}

/**
 * WHICH EDITIONS TO WRITE.
 *
 * The base fields of the booking file are the PRIMARY language — the one the
 * sale was negotiated in — and `en`/`fr`/`es` blocks override its prose for a
 * secondary edition. `primaryLang` names the base; it defaults to "es"
 * because every booking written before French was supported was Spanish, so
 * the old files stay correct without being touched.
 *
 * This replaced a version that hardcoded Spanish as the base and English as
 * the only alternative. A trip quoted entirely in French then produced a
 * contract the client could not read. The same release also deleted the
 * governing-language clause, which asserted the contract "is signed in
 * Spanish" on documents where no Spanish edition existed at all.
 */
const primary = booking.primaryLang ?? "es";
const only = ["en", "es", "fr"].find((l) => args[`${l}-only`]);

const editions = [];
for (const lang of [primary, "es", "en", "fr"]) {
  if (editions.some((e) => e.lang === lang)) continue;
  if (only && lang !== only) continue;
  // A secondary edition is written only when the booking supplies its prose.
  if (lang !== primary && !booking[lang]) continue;
  editions.push({ lang, ...booking, ...(booking[lang] ?? {}) });
}

const outDir = args.out ? path.resolve(args.out) : path.join(os.homedir(), "Downloads");
fs.mkdirSync(outDir, { recursive: true });

const browser = BROWSERS.find((b) => fs.existsSync(b));
if (!browser) throw new Error("No Chrome or Edge found to render the PDF.");

const written = [];
for (const doc of editions) {
  // Per-language override blocks are merged above; strip them so they never
  // reach the renderer as stray fields.
  const { es: _es, en: _en, fr: _fr, primaryLang: _p, ...clean } = doc;
  const html = renderContractHtml({ ...clean, reference: number, issued });

  const tmp = path.join(os.tmpdir(), `contract-${number}-${doc.lang}-${Date.now()}.html`);
  fs.writeFileSync(tmp, html, "utf8");

  const name = { en: "Contract", es: "Contrato", fr: "Contrat" }[doc.lang];
  const pdf = path.join(outDir, `${name}_${number}_${slug(booking.clientName)}.pdf`);
  try {
    execFileSync(
      browser,
      [
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        `--print-to-pdf=${pdf}`,
        pathToFileURL(tmp).href,
      ],
      { stdio: "pipe", timeout: 60_000 },
    );
  } finally {
    fs.rmSync(tmp, { force: true });
  }

  if (!fs.existsSync(pdf)) throw new Error(`browser did not produce ${pdf}`);
  written.push(pdf);
  console.log(
    `${{ en: "English", es: "Spanish", fr: "French " }[doc.lang]}  ${pdf}`,
  );
}

record(ledger, {
  kind: "contract",
  number,
  issued,
  clientName: booking.clientName,
  clientEmail: booking.clientEmail ?? "",
  tour: booking.tourTitle,
  people: booking.travellers,
  totalCents: booking.total,
  depositCents: booking.deposit ?? 0,
  balanceCents: booking.total - (booking.deposit ?? 0),
  languages: editions.map((e) => e.lang),
  pdfPath: written[0] ?? null,
  bookingFile: path.relative(ROOT, bookingPath).replace(/\\/g, "/"),
}, { replace: Boolean(args.reissue) });
writeLedger(ROOT, ledger);

console.log(`Ledger    data/documents.json (${ledger.documents.length} documents)`);
console.log(`\n${number}  ${booking.clientName}  ${booking.travellers} travellers`);
