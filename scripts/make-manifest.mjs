/**
 * Create a group manifest: an operational sheet for the guide, and a formal
 * passenger list for authorities or an insurer.
 *
 *   npm run manifest -- --booking bookings/elodie-frotey.json \
 *                       --names "Elodie Frotey|Fanny Frotey|..." \
 *                       --pickup "Riad X, 12 Derb Y, Medina" \
 *                       --pickup-time "08:15"
 *
 * WHY THIS EXISTS ALONGSIDE make-contract.mjs. A contract is the commercial
 * agreement between the operator and the lead traveller; it names one person
 * and a headcount. Neither of those is what a guide needs at 8am with ten
 * people on a pavement, and neither is what a checkpoint asks for. The
 * contract deliberately does not carry a passenger list, so this does.
 *
 * TWO DOCUMENTS, ONE COMMAND, because they are read by different people in
 * different situations and merging them serves neither:
 *
 *   OPERATIONS  what the guide carries. Names with tick-boxes, the pickup
 *               point and time, dietary notes, emergency numbers. Designed to
 *               be used standing up, so it is large and uncluttered.
 *   PASSENGERS  the formal list. Numbered, with ruled columns for passport
 *               number and nationality that are filled IN BY HAND on the day,
 *               because we do not hold passport data and should not.
 *
 * ON NOT STORING PASSPORT NUMBERS. The formal sheet prints empty ruled boxes
 * rather than fields this script could populate. Collecting passport numbers
 * into a JSON file on a laptop is a data-protection liability with no
 * operational benefit: the guide can read them off the documents on the day,
 * which is when they are actually needed and where they already are.
 *
 * Rendering matches lib/contract.ts exactly — same palette, same fonts, same
 * headless Chrome/Edge — so the three documents look like one company's
 * paperwork rather than three tools' output.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { pathToFileURL } from "node:url";

/** Chrome/Edge locations, in preference order. Same list as the other two. */
const BROWSERS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) {
      out[key] = true;
      continue;
    }
    out[key] = next;
    i++;
  }
  return out;
}

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );

function slug(s) {
  return String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

const eur = (cents) =>
  `€${(cents / 100).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const longDate = (iso) => {
  const d = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/** Shared chrome so both sheets are unmistakably the same company. */
const HEAD = (title) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(title)} — Marrakech Eco Tours</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600;700&display=swap">
<style>
  /* Light only, for the same reason the contract is: these are printed and
     carried. A dark palette behind prefers-color-scheme printed pale text
     onto white paper. */
  :root {
    --ink: #1B2645; --ink-soft: #3A4560; --muted: #6B6558;
    --sand: #F5F1E8; --paper: #FFFFFF; --rule: #DDD5C4; --terracotta: #C97B2B;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; background: var(--sand); color: var(--ink);
    font-family: Inter, -apple-system, "Segoe UI", sans-serif;
    font-size: 14.5px; line-height: 1.6; padding: 28px 16px 40px;
    -webkit-font-smoothing: antialiased;
  }
  .sheet {
    max-width: 780px; margin: 0 auto; background: var(--paper);
    border: 1px solid var(--rule); border-radius: 4px; padding: 40px 44px 36px;
  }
  header { display: flex; justify-content: space-between; align-items: flex-start;
    gap: 24px; border-bottom: 2px solid var(--ink); padding-bottom: 16px; }
  h1 { margin: 0; font-family: "Cormorant Garamond", Georgia, serif;
    font-weight: 700; font-size: 27px; line-height: 1.1; }
  .eyebrow { display: block; font-family: Inter, sans-serif; font-size: 9.5px;
    font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--terracotta); margin-top: 6px; }
  .docmeta { text-align: right; font-size: 12.5px; color: var(--muted); white-space: nowrap; }
  .docmeta strong { color: var(--ink); }
  h2 { font-size: 10px; font-weight: 700; letter-spacing: 0.16em;
    text-transform: uppercase; color: var(--muted); margin: 26px 0 10px; }
  .facts { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px 28px; margin-top: 18px; }
  .fact { display: flex; justify-content: space-between; gap: 12px;
    border-bottom: 1px solid var(--rule); padding: 7px 0; font-size: 13.5px; }
  .fact span:first-child { color: var(--muted); }
  .fact span:last-child { font-weight: 600; text-align: right; }
  table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
  th { text-align: left; font-size: 9.5px; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--muted); padding: 0 8px 7px 0;
    border-bottom: 1.5px solid var(--ink); }
  td { padding: 9px 8px 9px 0; border-bottom: 1px solid var(--rule); vertical-align: middle; }
  .num { color: var(--muted); width: 26px; font-variant-numeric: tabular-nums; }
  .tick { width: 30px; }
  .box { display: inline-block; width: 15px; height: 15px;
    border: 1.5px solid var(--ink-soft); border-radius: 2px; }
  .rule-cell { border-bottom: 1px solid var(--rule); height: 30px; }
  .callout { background: var(--sand); border-left: 3px solid var(--terracotta);
    padding: 12px 16px; margin-top: 14px; font-size: 13px; }
  .callout strong { display: block; margin-bottom: 2px; }
  footer { margin-top: 26px; padding-top: 14px; border-top: 1px solid var(--rule);
    font-size: 11.5px; color: var(--muted); display: flex;
    justify-content: space-between; gap: 16px; }
  @page { size: A4; margin: 12mm; }
</style>
</head>
<body><div class="sheet">`;

const FOOT = (ref) => `
  <footer>
    <span>Marrakech Eco Tours · Licensed Tour Operator · Marrakech, Morocco</span>
    <span>+212 653 936 003 · ${esc(ref)}</span>
  </footer>
</div></body></html>`;

function operationsHtml(m) {
  const rows = m.names
    .map(
      (n, i) => `<tr>
      <td class="num">${i + 1}</td>
      <td>${esc(n)}</td>
      <td class="tick"><span class="box"></span></td>
    </tr>`,
    )
    .join("");

  const notes = [
    m.dietary && `<div class="callout"><strong>Dietary</strong>${esc(m.dietary)}</div>`,
    m.notes && `<div class="callout"><strong>Notes</strong>${esc(m.notes)}</div>`,
  ]
    .filter(Boolean)
    .join("");

  return `${HEAD("Group manifest")}
  <header>
    <div>
      <h1>Group Manifest</h1>
      <span class="eyebrow">Guide operations sheet</span>
    </div>
    <div class="docmeta">
      <strong>${esc(m.reference)}</strong><br>
      ${esc(longDate(m.departure))}
    </div>
  </header>

  <div class="facts">
    <div class="fact"><span>Tour</span><span>${esc(m.tourTitle)}</span></div>
    <div class="fact"><span>Travellers</span><span>${m.names.length}</span></div>
    <div class="fact"><span>Lead traveller</span><span>${esc(m.clientName)}</span></div>
    <div class="fact"><span>Guide language</span><span>${esc(m.guideLanguage)}</span></div>
    <div class="fact"><span>Pickup</span><span>${esc(m.pickup || "TO CONFIRM")}</span></div>
    <div class="fact"><span>Pickup time</span><span>${esc(m.pickupTime || "TO CONFIRM")}</span></div>
    <div class="fact"><span>Balance due on the day</span><span>${eur(m.balance)}</span></div>
    <div class="fact"><span>Payment</span><span>${m.balance > 0 ? "Collect from lead traveller" : "Settled"}</span></div>
  </div>

  ${notes}

  <h2>Headcount — tick on departure and on return</h2>
  <table>
    <thead><tr><th></th><th>Name</th><th>✓</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>

  <div class="callout" style="margin-top:20px">
    <strong>Before leaving Marrakech</strong>
    Count heads against this list. Confirm everyone has water, sun protection
    and footwear they can walk in. Confirm the lead traveller has the balance.
  </div>
  <div class="callout">
    <strong>Before leaving the valley</strong>
    Count heads again. The waterfalls are where groups separate.
  </div>
${FOOT(m.reference)}`;
}

function passengersHtml(m) {
  const rows = m.names
    .map(
      (n, i) => `<tr>
      <td class="num">${i + 1}</td>
      <td>${esc(n)}</td>
      <td class="rule-cell"></td>
      <td class="rule-cell"></td>
    </tr>`,
    )
    .join("");

  return `${HEAD("Passenger list")}
  <header>
    <div>
      <h1>Passenger List</h1>
      <span class="eyebrow">Official record</span>
    </div>
    <div class="docmeta">
      <strong>${esc(m.reference)}</strong><br>
      ${esc(longDate(m.departure))}
    </div>
  </header>

  <div class="facts">
    <div class="fact"><span>Operator</span><span>Marrakech Eco Tours</span></div>
    <div class="fact"><span>Tour</span><span>${esc(m.tourTitle)}</span></div>
    <div class="fact"><span>Date of travel</span><span>${esc(longDate(m.departure))}</span></div>
    <div class="fact"><span>Total passengers</span><span>${m.names.length}</span></div>
  </div>

  <h2>Passengers</h2>
  <table>
    <thead>
      <tr><th></th><th>Full name</th><th>Passport / ID no.</th><th>Nationality</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>

  <div class="callout" style="margin-top:20px">
    <strong>Completed on the day</strong>
    Passport numbers and nationalities are written in by hand at pickup. We do
    not hold or store passport data, so those columns are deliberately blank.
  </div>

  <div style="margin-top:34px; display:flex; gap:40px; font-size:12.5px; color:var(--muted)">
    <div style="flex:1">
      <div style="border-bottom:1px solid var(--ink-soft); height:34px"></div>
      Guide — name and signature
    </div>
    <div style="flex:1">
      <div style="border-bottom:1px solid var(--ink-soft); height:34px"></div>
      Date
    </div>
  </div>
${FOOT(m.reference)}`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help || !args.booking || !args.names) {
    console.log(`
Create a group manifest: a guide operations sheet and a formal passenger list.

Required:
  --booking      path to the booking JSON (same file make-contract.mjs uses)
  --names        "Name One|Name Two|Name Three"   pipe-separated

Optional:
  --pickup       "Riad Name, 12 Derb Something, Medina"
  --pickup-time  "08:15"
  --dietary      "2 vegetarian"
  --notes        "One traveller is 9 years old"
  --reference    override the automatic MAN-YYYY-NNN
  --out          output directory (default: your Downloads folder)
`);
    process.exit(args.help ? 0 : 1);
  }

  const booking = JSON.parse(fs.readFileSync(path.resolve(args.booking), "utf8"));
  const names = String(args.names)
    .split("|")
    .map((n) => n.trim())
    .filter(Boolean);

  if (!names.length) throw new Error("--names produced no names");

  /**
   * A headcount mismatch is the one error that matters here: the vehicle and
   * the lunch are booked against `travellers`, so a manifest listing a
   * different number means somebody is left on a pavement or a seat is paid
   * for and empty. Refuse rather than print it.
   */
  if (booking.travellers && names.length !== booking.travellers) {
    throw new Error(
      `--names has ${names.length} name(s) but the booking says ` +
        `${booking.travellers} traveller(s).\n` +
        `The vehicle and the lunch are booked against the booking figure, so ` +
        `this mismatch is a real operational problem, not a typo to print ` +
        `around. Fix whichever is wrong first.`,
    );
  }

  const reference =
    args.reference || `MAN-${new Date().getFullYear()}-${String(Date.now() % 1000).padStart(3, "0")}`;

  const m = {
    reference,
    names,
    clientName: booking.clientName,
    tourTitle: booking.tourTitle,
    departure: booking.departure,
    guideLanguage: booking.guideLanguage || "English",
    balance: (booking.total ?? 0) - (booking.deposit ?? 0),
    pickup: args.pickup,
    pickupTime: args["pickup-time"],
    dietary: args.dietary,
    notes: args.notes,
  };

  const outDir = args.out ? path.resolve(args.out) : path.join(os.homedir(), "Downloads");
  fs.mkdirSync(outDir, { recursive: true });

  const browser = BROWSERS.find((b) => fs.existsSync(b));
  if (!browser) throw new Error("No Chrome or Edge found to render the PDF.");

  const editions = [
    { kind: "Manifest", html: operationsHtml(m) },
    { kind: "PassengerList", html: passengersHtml(m) },
  ];

  for (const ed of editions) {
    const tmp = path.join(os.tmpdir(), `manifest-${reference}-${ed.kind}-${Date.now()}.html`);
    fs.writeFileSync(tmp, ed.html, "utf8");
    const pdf = path.join(outDir, `${ed.kind}_${reference}_${slug(booking.clientName)}.pdf`);
    try {
      execFileSync(
        browser,
        ["--headless", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${pdf}`, pathToFileURL(tmp).href],
        { stdio: "pipe", timeout: 60_000 },
      );
    } finally {
      fs.rmSync(tmp, { force: true });
    }
    if (!fs.existsSync(pdf)) throw new Error(`browser did not produce ${pdf}`);
    console.log(`${ed.kind.padEnd(14)} ${pdf}`);
  }

  console.log(`\n${reference}  ${booking.clientName}  ${names.length} travellers`);
  if (!args.pickup || !args["pickup-time"]) {
    console.log(
      `\nNOTE: pickup ${!args.pickup ? "point " : ""}${!args.pickup && !args["pickup-time"] ? "and " : ""}` +
        `${!args["pickup-time"] ? "time " : ""}not given — the sheet prints "TO CONFIRM".`,
    );
  }
}

main();
