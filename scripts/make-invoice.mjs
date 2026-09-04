/**
 * Create an invoice: writes the PDF and records the row in the Google Sheet.
 *
 *   npm run invoice -- --name "Andrés Gutiérrez Peña" \
 *                      --email alejandro@example.com \
 *                      --tour "3-Day Private Sahara Desert Tour" \
 *                      --people 3 --total 850 --deposit 175 \
 *                      --standard 320 \
 *                      --departure 2026-09-20 --return 2026-09-22
 *
 * Amounts are given in EUROS on the command line (--total 850) because that is
 * what the owner is reading off an email, and converted to integer cents
 * internally. See lib/invoice.ts for why cents.
 *
 * The invoice NUMBER is allocated automatically from data/invoices.json, which
 * is the local ledger. Two invoices sharing a number is the one failure a
 * customer will notice, so the number is never typed by hand.
 *
 * PDF rendering uses whichever Chrome or Edge is already installed — no
 * Puppeteer/Playwright dependency, because this runs on the owner's machine
 * and a 300 MB browser download to print one page is not a reasonable ask.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  isTaken,
  nextNumber,
  readLedger,
  record,
  writeLedger,
} from "../lib/doc-ledger.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");


/** Chrome/Edge locations, in preference order. */
const BROWSERS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

function findBrowser() {
  for (const b of BROWSERS) if (fs.existsSync(b)) return b;
  return null;
}

function parseArgs(argv) {
  const out = { extra: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) {
      out[key] = true;
      continue;
    }
    // --extra is repeatable; every other flag takes the last value given.
    if (key === "extra") out.extra.push(next);
    else out[key] = next;
    i++;
  }
  return out;
}

/**
 * "Quad biking:20"      -> flat EUR 20 for the booking
 * "Quad biking:20:pp"   -> EUR 20 per person
 *
 * Split from the RIGHT so a label containing a colon ("Transfer: Imlil") still
 * parses. Getting per-person wrong is a silent doubling or halving of a charge.
 */
function parseExtra(spec) {
  const parts = String(spec).split(":");
  let perPerson = false;
  if (parts.length > 2 && /^(pp|perperson|per-person)$/i.test(parts[parts.length - 1].trim())) {
    perPerson = true;
    parts.pop();
  }
  const amount = parts.pop();
  const label = parts.join(":").trim();
  if (!label) throw new Error(`--extra "${spec}" has no label`);
  return { label, amount: eurosToCents(amount), perPerson };
}

/**
 * Euros → cents, without floating point.
 *
 * `Math.round(8.50 * 100)` happens to work; `Math.round(1.005 * 100)` gives 100,
 * not 101. Parsing the decimal string sidesteps the whole class of error.
 */
function eurosToCents(v) {
  const s = String(v).trim().replace(",", ".").replace(/[€\s]/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(s)) {
    throw new Error(`amount "${v}" must look like 850 or 850.00`);
  }
  const [whole, frac = ""] = s.split(".");
  return Number(whole) * 100 + Number(frac.padEnd(2, "0"));
}

function slug(s) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const required = ["name", "tour", "people", "total"];
  const missing = required.filter((k) => !args[k]);
  if (missing.length || args.help) {
    console.log(`
Create an invoice PDF and record it in the Google Sheet.

Required:
  --name      "Andrés Gutiérrez Peña"
  --tour      "3-Day Private Sahara Desert Tour"
  --people    3
  --total     850           total the customer pays, in euros

Optional:
  --email     alejandro@example.com   omitted from the invoice if not given
  --phone     "+34 692 86 92 45"       client phone/WhatsApp, same treatment
  --deposit   175           default 0
  --standard  320           undiscounted price PER PERSON, to show a discount
  --departure 2026-09-20
  --return    2026-09-22
  --route     "Marrakech → Merzouga"
  --language  Spanish
  --desc      "Private 4x4, Spanish-speaking driver-guide, 2 nights half board"
  --includes  "a|b|c"       pipe-separated
  --excludes  "a|b"
  --payment   "Bank transfer: IBAN ..."
  --ice       002345678000012
  --rc        123456
  --extra     "Quad biking:20:pp"   add-on, repeatable.
                                    "Label:euros"     flat for the booking
                                    "Label:euros:pp"  per person
  --notes     "..."
  --number    MET-2026-007  override the automatic number
  --out       <dir>         default: your Downloads folder
  --no-sheet                write the PDF but do not touch the sheet
  --no-pdf                  record in the sheet only
${missing.length ? `\nMissing: ${missing.map((m) => "--" + m).join(", ")}\n` : ""}`);
    process.exit(missing.length ? 1 : 0);
  }

  // Load the TS modules through the Next-configured tsx/ts runtime if present;
  // otherwise fall back to the compiled JS. Using a dynamic import keeps this
  // script runnable with plain `node` when the loader is available.
  const { renderInvoiceHtml, computeTotals, eur, isPlaceholderEmail } = await import(
    pathToFileURL(path.join(ROOT, "lib", "invoice.ts")).href
  );

  // A fabricated address on a customer document looks authoritative and is
  // wrong. Refuse rather than print it — omitting the line is always better.
  if (isPlaceholderEmail(args.email)) {
    throw new Error(
      `"${args.email}" is a placeholder address, not a real one. Pass the ` +
        `customer's actual email, or omit --email and the line is left off.`,
    );
  }

  const issued = args.issued || new Date().toISOString().slice(0, 10);
  const year = issued.slice(0, 4);
  const ledger = readLedger(ROOT);
  const number = args.number || nextNumber(ledger, "invoice", year);

  // Numbers are never reused, across either series. The check runs BEFORE the
  // PDF is written so a duplicate cannot leave a file on disk that the ledger
  // does not know about.
  if (isTaken(ledger, number)) {
    const held = ledger.documents.find((d) => d.number === number);
    throw new Error(
      `${number} has already been issued to ${held.clientName} ` +
        `(${held.kind}, ${held.issued}). Drop --number to auto-allocate the ` +
        `next free one.`,
    );
  }

  const inv = {
    number,
    issued,
    clientName: args.name,
    clientEmail: args.email,
    clientPhone: args.phone,
    tourTitle: args.tour,
    route: args.route,
    description: args.desc,
    departure: args.departure,
    ret: args.return,
    people: Number(args.people),
    standardPerPerson: args.standard ? eurosToCents(args.standard) : undefined,
    total: eurosToCents(args.total),
    deposit: args.deposit ? eurosToCents(args.deposit) : 0,
    extras: args.extra.length ? args.extra.map(parseExtra) : undefined,
    language: args.language,
    includes: args.includes ? String(args.includes).split("|").filter(Boolean) : undefined,
    excludes: args.excludes ? String(args.excludes).split("|").filter(Boolean) : undefined,
    paymentInstructions: args.payment,
    ice: args.ice,
    rc: args.rc,
    notes: args.notes,
  };

  const totals = computeTotals(inv); // throws on bad money before anything is written

  // ---- PDF -----------------------------------------------------------------
  const outDir = args.out || path.join(os.homedir(), "Downloads");
  const pdfPath = path.join(
    outDir,
    `Invoice_${number}_${slug(inv.clientName)}.pdf`,
  );

  if (!args["no-pdf"]) {
    const browser = findBrowser();
    if (!browser) {
      throw new Error(
        "No Chrome or Edge found to render the PDF. Install one, or pass --no-pdf " +
          "to record the invoice in the sheet only.",
      );
    }
    fs.mkdirSync(outDir, { recursive: true });

    const tmpHtml = path.join(os.tmpdir(), `invoice-${number}-${Date.now()}.html`);
    fs.writeFileSync(tmpHtml, renderInvoiceHtml(inv), "utf8");

    try {
      execFileSync(
        browser,
        [
          "--headless",
          "--disable-gpu",
          "--no-pdf-header-footer",
          `--print-to-pdf=${pdfPath}`,
          pathToFileURL(tmpHtml).href,
        ],
        { stdio: "pipe", timeout: 60_000 },
      );
    } finally {
      fs.rmSync(tmpHtml, { force: true });
    }

    if (!fs.existsSync(pdfPath)) {
      throw new Error(`the browser did not produce ${pdfPath}`);
    }
    console.log(`PDF     ${pdfPath}`);
  }

  // ---- Sheet ---------------------------------------------------------------
  let sheetNote = "skipped (--no-sheet)";
  if (!args["no-sheet"]) {
    // .env.local is not loaded automatically outside Next, so read it here.
    loadEnvLocal(path.join(ROOT, ".env.local"));
    const { logInvoice } = await import(
      pathToFileURL(path.join(ROOT, "lib", "invoice-log.ts")).href
    );
    const res = await logInvoice({
      number,
      issued,
      clientName: inv.clientName,
      clientEmail: inv.clientEmail ?? "",
      tour: inv.tourTitle,
      departure: inv.departure,
      people: inv.people,
      total: totals.total,
      deposit: totals.deposit,
      balance: totals.balance,
      status: totals.deposit > 0 ? "Deposit due" : "Unpaid",
      pdfPath: args["no-pdf"] ? "" : pdfPath,
      notes: inv.notes,
    });
    sheetNote = res.ok
      ? "row appended"
      : `NOT RECORDED — ${res.reason}: ${res.detail}`;
  }
  console.log(`Sheet   ${sheetNote}`);

  // ---- Ledger --------------------------------------------------------------
  // Written last and always, even when the sheet failed: the ledger is what
  // guarantees the next invoice gets a fresh number. Losing it would let two
  // invoices share a number, which is the one error a customer notices.
  record(ledger, {
    kind: "invoice",
    number,
    issued,
    clientName: inv.clientName,
    clientEmail: inv.clientEmail ?? "",
    tour: inv.tourTitle,
    people: inv.people,
    totalCents: totals.total,
    depositCents: totals.deposit,
    balanceCents: totals.balance,
    extras: totals.extras,
    pdfPath: args["no-pdf"] ? null : pdfPath,
    sheet: sheetNote === "row appended",
  });
  writeLedger(ROOT, ledger);

  console.log(`Ledger  data/documents.json (${ledger.documents.length} documents)`);
  console.log(
    `\n${number}  ${inv.clientName}${inv.clientEmail ? ` <${inv.clientEmail}>` : ""}\n` +
      `  total ${eur(totals.total)}   deposit ${eur(totals.deposit)}   balance ${eur(totals.balance)}`,
  );
}

/** Minimal .env.local reader — no dependency, and only the keys we need. */
function loadEnvLocal(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);
    if (!m) continue;
    const [, k, raw] = m;
    if (process.env[k]) continue; // real env wins
    process.env[k] = raw.replace(/^["']|["']$/g, "");
  }
}

main().catch((err) => {
  console.error(`\nInvoice not created: ${err.message}`);
  process.exit(1);
});
