/**
 * Invoice records: the data shape, the money maths, and the HTML document.
 *
 * WHY THIS IS A MODULE AND NOT A HAND-EDITED FILE
 * The first invoice (MET-2026-001, Andrés Gutiérrez Peña) was a one-off HTML
 * file edited by hand. Two defects came straight out of that: a CSS typo
 * (`--warn-fg: #E5B madeleine;`) that silently killed a colour, and a dark
 * palette inherited from the sender's OS that printed pale text on white paper
 * — a near-blank invoice. Neither is possible when the document is generated.
 *
 * MONEY IS INTEGER CENTS, NEVER FLOATS.
 * `0.1 + 0.2 === 0.30000000000000004`. An invoice that renders €849.99 for a
 * €850.00 booking is a document a customer can dispute, so every amount is a
 * whole number of cents and only formatted at the edge.
 */

export interface InvoiceInput {
  /** Sequential number, e.g. "MET-2026-002". */
  number: string;
  /** ISO date the invoice is issued. */
  issued: string;
  clientName: string;
  /**
   * Optional. An enquiry does not always carry one, and inventing a
   * plausible-looking address is worse than leaving it out: the document
   * reads as authoritative and is wrong. Omitted from the invoice when absent.
   */
  clientEmail?: string;
  /**
   * Client's phone / WhatsApp, as they gave it. Printed under "Billed to" so
   * the driver has a contact number on the document itself, which matters most
   * for same-day pick-ups. Omitted when absent, like clientEmail.
   */
  clientPhone?: string;
  /** Free text, e.g. "3-Day Private Sahara Desert Tour". */
  tourTitle: string;
  /** e.g. "Marrakech → Merzouga". */
  route?: string;
  /** Human description under the line item. */
  description?: string;
  departure?: string;
  ret?: string;
  people: number;
  /** Undiscounted per-person price in EUR cents. Omit if there is no discount. */
  standardPerPerson?: number;
  /** What the customer actually pays, total, in EUR cents. */
  total: number;
  /** Deposit in EUR cents. 0 means none. */
  deposit: number;
  /**
   * Priced add-ons shown as their own rows: a quad upgrade, a private
   * transfer, an extra night. Each carries its own amount in EUR cents.
   *
   * `perPerson: true` multiplies by the traveller count and labels the row
   * accordingly; a flat charge (one transfer for the group) leaves it false.
   * Rolling extras into the tour price instead would show the customer a
   * single unexplained total.
   */
  extras?: { label: string; amount: number; perPerson?: boolean }[];
  language?: string;
  includes?: string[];
  excludes?: string[];
  /** Bank/PayPal line. Left blank deliberately until the owner supplies it. */
  paymentInstructions?: string;
  /** Moroccan company identifiers, when available. */
  ice?: string;
  rc?: string;
  notes?: string;
}

export interface InvoiceTotals {
  standardTotal: number | null;
  discount: number | null;
  /** The tour itself, before extras. */
  subtotal: number;
  /** Each extra resolved to its final amount. */
  extras: { label: string; amount: number }[];
  extrasTotal: number;
  total: number;
  deposit: number;
  balance: number;
  perPerson: number;
}

/** All money in cents. Guards the arithmetic the document depends on. */
export function computeTotals(inv: InvoiceInput): InvoiceTotals {
  if (!Number.isInteger(inv.total) || inv.total < 0) {
    throw new Error(`total must be a non-negative integer in cents, got ${inv.total}`);
  }
  if (!Number.isInteger(inv.deposit) || inv.deposit < 0) {
    throw new Error(`deposit must be a non-negative integer in cents, got ${inv.deposit}`);
  }
  // NOTE: the deposit-vs-total check happens AFTER extras are resolved, below.
  // Checking it here would reject a valid deposit that only exceeds the base
  // tour price because extras had not been added yet.
  if (!Number.isInteger(inv.people) || inv.people < 1) {
    throw new Error(`people must be a positive integer, got ${inv.people}`);
  }

  const standardTotal =
    inv.standardPerPerson != null ? inv.standardPerPerson * inv.people : null;

  // Only call it a discount when it actually is one. A "standard" price below
  // the charged price would otherwise render as a negative discount, i.e. a
  // surcharge presented as a saving.
  const discount =
    standardTotal != null && standardTotal > inv.total ? standardTotal - inv.total : null;

  // Extras are resolved BEFORE the deposit check below, because they change
  // the total the deposit is compared against.
  const extras = (inv.extras ?? []).map((e) => {
    if (!Number.isInteger(e.amount) || e.amount < 0) {
      throw new Error(`extra "${e.label}" must be a non-negative integer in cents`);
    }
    return {
      label: e.perPerson ? `${e.label} (${inv.people} × ${eur(e.amount)})` : e.label,
      amount: e.perPerson ? e.amount * inv.people : e.amount,
    };
  });
  const extrasTotal = extras.reduce((n, e) => n + e.amount, 0);
  const grand = inv.total + extrasTotal;

  if (inv.deposit > grand) {
    throw new Error(`deposit (${inv.deposit}) cannot exceed total (${grand})`);
  }

  return {
    standardTotal,
    discount,
    subtotal: inv.total,
    extras,
    extrasTotal,
    total: grand,
    deposit: inv.deposit,
    balance: grand - inv.deposit,
    // Rounded for display only; the total is authoritative.
    perPerson: Math.round(grand / inv.people),
    };
}

/**
 * Is this a stand-in address rather than a real customer's?
 *
 * THE INCIDENT: an enquiry arrived without an email, and the invoice was
 * generated with "katrin.vogelsang@example.com" — a fabricated address on a
 * document about to be sent to a real person. It renders identically to a real
 * one, so nothing catches it by eye.
 *
 * RFC 2606 reserves example.com/.org/.net and .test/.invalid/.localhost
 * precisely so they can never belong to anyone. Anything landing on one is a
 * placeholder by definition, not a judgement call.
 */
export function isPlaceholderEmail(email?: string): boolean {
  if (!email) return false;
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain) return false;
  return (
    /^(example|test|invalid|localhost)$/.test(domain) ||
    /^example\.(com|org|net)$/.test(domain) ||
    /\.(test|invalid|localhost|example)$/.test(domain) ||
    domain === "test.com"
  );
}

/** Cents → "€850.00". The site renders EUR, so invoices do too. */
export function eur(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  return `${sign}€${Math.floor(abs / 100).toLocaleString("en-GB")}.${String(abs % 100).padStart(2, "0")}`;
}

/** Minimal HTML escape. Client names carry apostrophes and accents. */
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * The invoice document.
 *
 * DELIBERATELY LIGHT-ONLY. The first version carried the site's dark palette
 * behind `prefers-color-scheme`, which is right for a web page and wrong for a
 * document: generated from a dark-mode machine it produced a near-black page,
 * and its print rule forced a white background while leaving the pale ink, so
 * printing gave white text on white paper. An invoice is always ink on paper.
 */
export function renderInvoiceHtml(inv: InvoiceInput): string {
  const t = computeTotals(inv);
  const hasDiscount = t.discount != null && t.discount > 0;

  const row = (label: string, value: string, cls = "") =>
    `<div class="srow ${cls}"><span>${label}</span><span class="num">${value}</span></div>`;

  const list = (items: string[] | undefined, cls: string) =>
    (items ?? []).map((i) => `<li class="${cls}">${esc(i)}</li>`).join("");

  const meta = (label: string, value: string) =>
    `<div class="cell"><div class="k">${label}</div><div class="v">${esc(value)}</div></div>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Invoice ${esc(inv.number)} — Marrakech Eco Tours</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600;700&display=swap">
<style>
  /* Light only, on purpose — see renderInvoiceHtml's docblock. */
  :root {
    --ink: #1B2645;
    --ink-soft: #3A4560;
    --muted: #6B6558;
    --sand: #F5F1E8;
    --paper: #FFFFFF;
    --rule: #DDD5C4;
    --terracotta: #C97B2B;
    --ok-bg: #EDF5EE;
    --ok-fg: #2C5F3A;
    --warn-bg: #FBF0E2;
    --warn-fg: #8A5316;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; background: var(--sand); color: var(--ink);
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 15px; line-height: 1.55; padding: 28px 16px 56px;
    -webkit-font-smoothing: antialiased;
  }
  .sheet {
    max-width: 760px; margin: 0 auto; background: var(--paper);
    border: 1px solid var(--rule); border-radius: 4px; padding: 40px 44px 36px;
  }
  .masthead { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; }
  .wordmark {
    font-family: "Cormorant Garamond", Georgia, serif; font-weight: 700;
    font-size: 30px; line-height: 1.1; letter-spacing: -0.01em;
  }
  .wordmark span {
    display: block; font-family: Inter, sans-serif; font-size: 9.5px;
    font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--terracotta); margin-top: 6px;
  }
  .docmeta { text-align: right; font-size: 12.5px; color: var(--muted); }
  .docmeta .kind {
    font-size: 9.5px; font-weight: 700; letter-spacing: 0.16em;
    text-transform: uppercase; color: var(--muted);
  }
  .docmeta .num {
    font-size: 19px; font-weight: 700; color: var(--ink);
    font-variant-numeric: tabular-nums; margin: 2px 0 3px;
  }
  .hr { border-bottom: 2px solid var(--ink); margin: 18px 0 24px; }
  .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-bottom: 26px; }
  .label {
    font-size: 9.5px; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--muted); margin-bottom: 7px;
  }
  .party strong { display: block; margin-bottom: 3px; }
  .party div { color: var(--ink-soft); font-size: 13.5px; }
  .grid { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--rule); }
  .cell { padding: 10px 12px; border-right: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
  .cell:nth-child(4n) { border-right: none; }
  .k { font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
  .v { font-weight: 600; font-size: 13.5px; margin-top: 2px; }
  h2.sec {
    font-size: 9.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--muted); margin: 26px 0 10px;
  }
  table { width: 100%; border-collapse: collapse; }
  thead th {
    font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--muted); text-align: right; padding: 0 0 8px; border-bottom: 1px solid var(--rule);
  }
  thead th:first-child { text-align: left; }
  td { padding: 12px 0; border-bottom: 1px solid var(--rule); vertical-align: top; }
  td.n { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; padding-left: 14px; }
  .item { font-weight: 600; }
  .item small { display: block; font-weight: 400; color: var(--muted); font-size: 12.5px; margin-top: 3px; line-height: 1.5; }
  .was { color: var(--muted); text-decoration: line-through; }
  .summary { margin-left: auto; width: 320px; margin-top: 18px; }
  .srow { display: flex; justify-content: space-between; gap: 16px; padding: 7px 0; font-size: 14px; }
  .srow .num { font-variant-numeric: tabular-nums; font-weight: 600; }
  .srow.discount { color: var(--terracotta); }
  .srow.total { border-top: 1px solid var(--rule); margin-top: 4px; padding-top: 11px; font-size: 16px; font-weight: 700; }
  .srow.balance {
    background: var(--sand); margin-top: 8px; padding: 12px 14px;
    font-size: 16px; font-weight: 700; border-radius: 3px;
  }
  .pill {
    display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: 0.09em;
    text-transform: uppercase; padding: 2px 7px; border-radius: 999px; margin-left: 7px;
    vertical-align: 1px;
  }
  .pill.ok { background: var(--ok-bg); color: var(--ok-fg); }
  .pill.warn { background: var(--warn-bg); color: var(--warn-fg); }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 30px; }
  ul { list-style: none; margin: 0; padding: 0; }
  li { position: relative; padding-left: 16px; font-size: 13px; color: var(--ink-soft); margin-bottom: 6px; line-height: 1.5; }
  li.inc::before { content: ""; position: absolute; left: 0; top: 7px; width: 5px; height: 5px; border-radius: 50%; background: var(--terracotta); }
  li.exc::before { content: ""; position: absolute; left: 0; top: 6.5px; width: 5px; height: 5px; border-radius: 50%; border: 1px solid var(--muted); }
  .pay { margin-top: 28px; padding: 14px 16px; background: var(--sand); border-radius: 3px; font-size: 13px; }
  .pay .label { margin-bottom: 5px; }
  footer {
    margin-top: 30px; padding-top: 16px; border-top: 1px solid var(--rule);
    font-size: 11.5px; color: var(--muted); line-height: 1.6;
  }
  a { color: inherit; }

  @page { size: A4; margin: 14mm; }
  @media print {
    body { background: #fff; padding: 0; font-size: 12.5px; }
    .sheet { border: none; padding: 0; max-width: none; }
    /* Without this Chrome drops every background fill and the totals block
       loses the emphasis the document is laid out around. */
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }
</style>
</head>
<body>
<div class="sheet">
  <header class="masthead">
    <div class="wordmark">Marrakech Eco Tours<span>Licensed Moroccan tour operator</span></div>
    <div class="docmeta">
      <div class="kind">Invoice</div>
      <div class="num">${esc(inv.number)}</div>
      <div>Issued ${fmtDate(inv.issued)}</div>
    </div>
  </header>

  <div class="hr"></div>

  <div class="parties">
    <div class="party">
      <div class="label">From</div>
      <strong>Marrakech Eco Tours</strong>
      <div>Marrakech, Morocco</div>
      <div>info@marrakechecotours.com</div>
      <div>+212 653 936 003</div>
      <div>marrakechecotours.com</div>
      ${inv.ice ? `<div>ICE ${esc(inv.ice)}</div>` : ""}
      ${inv.rc ? `<div>RC ${esc(inv.rc)}</div>` : ""}
    </div>
    <div class="party">
      <div class="label">Billed to</div>
      <strong>${esc(inv.clientName)}</strong>
      ${inv.clientEmail ? `<div>${esc(inv.clientEmail)}</div>` : ""}
      ${inv.clientPhone ? `<div>${esc(inv.clientPhone)}</div>` : ""}
      <div>${inv.people} traveller${inv.people === 1 ? "" : "s"}</div>
    </div>
  </div>

  <h2 class="sec">Trip</h2>
  <div class="grid">
    ${meta("Tour", inv.tourTitle)}
    ${inv.route ? meta("Route", inv.route) : ""}
    ${inv.departure ? meta("Departure", fmtDate(inv.departure)) : ""}
    ${inv.ret ? meta("Return", fmtDate(inv.ret)) : ""}
    ${meta("Travellers", String(inv.people))}
    ${inv.language ? meta("Language", inv.language) : ""}
  </div>

  <h2 class="sec">Details</h2>
  <table>
    <thead>
      <tr><th>Description</th><th>Per person</th><th>Amount</th></tr>
    </thead>
    <tbody>
      <tr>
        <td class="item">${esc(inv.tourTitle)}
          ${inv.description ? `<small>${esc(inv.description)}</small>` : ""}
        </td>
        <td class="n ${hasDiscount ? "was" : ""}">${
          inv.standardPerPerson != null
            ? eur(inv.standardPerPerson)
            : eur(Math.round(t.subtotal / inv.people))
        }</td>
        <td class="n ${hasDiscount ? "was" : ""}">${
          t.standardTotal != null ? eur(t.standardTotal) : eur(t.subtotal)
        }</td>
      </tr>
      ${t.extras
        .map(
          (e) => `<tr>
        <td class="item">${esc(e.label)}</td>
        <td class="n"></td>
        <td class="n">${eur(e.amount)}</td>
      </tr>`,
        )
        .join("")}
      ${
        hasDiscount
          ? `<tr>
        <td class="item">Agreed rate — ${inv.people} traveller${inv.people === 1 ? "" : "s"}
          <small>Negotiated rate, confirmed by email. Itinerary and inclusions unchanged.</small>
        </td>
        <td class="n">${eur(Math.round(t.subtotal / inv.people))}</td>
        <td class="n">${eur(t.subtotal)}</td>
      </tr>`
          : ""
      }
    </tbody>
  </table>

  <div class="summary">
    ${
      t.standardTotal != null
        ? row(`Standard rate (${inv.people} × ${eur(inv.standardPerPerson!)})`, eur(t.standardTotal))
        : ""
    }
    ${hasDiscount ? row("Discount applied", `−${eur(t.discount!)}`, "discount") : ""}
    ${
      // Only worth showing when extras exist — otherwise Subtotal and Total are
      // the same number twice, which reads as a rendering fault.
      t.extras.length
        ? row("Tour subtotal", eur(t.subtotal)) +
          row("Extras", eur(t.extrasTotal))
        : ""
    }
    ${row("Total", eur(t.total), "total")}
    ${
      t.deposit > 0
        ? row(`Deposit <span class="pill ok">To confirm</span>`, eur(t.deposit))
        : ""
    }
    ${row(`Balance on arrival <span class="pill warn">Cash or card</span>`, eur(t.balance), "balance")}
  </div>

  ${
    (inv.includes?.length ?? 0) + (inv.excludes?.length ?? 0) > 0
      ? `<div class="cols">
    <div>${inv.includes?.length ? `<div class="label">Included</div><ul>${list(inv.includes, "inc")}</ul>` : ""}</div>
    <div>${inv.excludes?.length ? `<div class="label">Not included</div><ul>${list(inv.excludes, "exc")}</ul>` : ""}</div>
  </div>`
      : ""
  }

  <div class="pay">
    <div class="label">Payment</div>
    ${
      inv.paymentInstructions
        ? esc(inv.paymentInstructions)
        : `<em>[payment instructions — bank transfer details or PayPal link]</em>`
    }
  </div>

  ${inv.notes ? `<div class="pay"><div class="label">Notes</div>${esc(inv.notes)}</div>` : ""}

  <footer>
    Marrakech Eco Tours · Marrakech, Morocco · <a href="https://marrakechecotours.com">marrakechecotours.com</a><br>
    Prices in euro. This invoice confirms the agreed rate for the trip described above.
  </footer>
</div>
</body>
</html>`;
}
