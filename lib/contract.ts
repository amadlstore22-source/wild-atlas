/**
 * Booking contract (contrato de reserva) — the document a customer signs
 * before transferring money.
 *
 * WHY THIS IS SEPARATE FROM THE INVOICE
 * An invoice says what is owed. A contract says what is being sold, on what
 * terms, and what happens if either side cancels. Andrés Gutiérrez Peña
 * asked for exactly this before making a bank transfer, and listed what it had
 * to contain: itinerary, included services, the named accommodation, the total
 * price, and the booking/cancellation conditions.
 *
 * THE TERMS ARE NOT INVENTED.
 * The cancellation policy is copied verbatim from the site's own FAQ
 * (dictionaries/es.json → contact.faq4A). A contract that contradicts the
 * public website is worse than no contract: the customer can point at the page
 * and the operator has committed to two different things in writing.
 *
 * WRITTEN IN THE LANGUAGE OF THE SALE.
 * The whole negotiation was in Spanish, and a Spanish-speaking guide was a
 * condition of the booking. A contract in English would be unenforceable in
 * spirit — one of the three travellers does not read English, which is the
 * reason the shared tour was declined in the first place.
 */

export interface ContractDay {
  day: number;
  title: string;
  body: string;
}

export type ContractLang = "es" | "en";

export interface ContractInput {
  /** Document language. The Spanish original is the one the client signs. */
  lang?: ContractLang;
  reference: string;
  issued: string;
  clientName: string;
  clientEmail: string;
  travellers: number;
  tourTitle: string;
  departure: string;
  ret: string;
  /** e.g. "Español" — a promise, not a description. */
  guideLanguage: string;
  days: ContractDay[];
  accommodation: { night: string; name: string; detail: string }[];
  includes: string[];
  excludes: string[];
  /** EUR cents. */
  total: number;
  deposit: number;
  /** Left out of the document when empty, with a visible marker. */
  paymentInstructions?: string;
  ice?: string;
  rc?: string;
}

/**
 * Document strings, per language.
 *
 * The Spanish text is the original — it is the language the sale was negotiated
 * in and the version the client signs. The English is a faithful translation
 * for the operator's own file and for travellers who read English. Where the
 * two could ever diverge, Spanish governs, and clause 9 says so in both.
 *
 * The cancellation wording is copied verbatim from the site's own FAQ
 * (dictionaries/es.json and en.json, contact.faq4A) so the contract can never
 * contradict the public page.
 */
const T = {
  es: {
    htmlLang: "es",
    locale: "es-ES",
    docTitle: "Contrato de reserva",
    subtitle: "Operador turístico autorizado",
    issued: (d: string) => `Emitido el ${d}`,
    parties: "Partes contratantes",
    organiser: "Organizador",
    client: "Cliente",
    travellersLine: (n: number) => `${n} viajeros`,
    object: "Objeto del contrato",
    tour: "Circuito",
    departure: "Salida",
    ret: "Regreso",
    travellersK: "Viajeros",
    mode: "Modalidad",
    modePrivate: "Privado",
    guideLang: "Idioma del guía",
    itinerary: "Itinerario",
    accommodation: "Alojamiento",
    services: "Servicios",
    included: "Incluido",
    notIncluded: "No incluido",
    priceHeading: "Precio y forma de pago",
    totalFor: (n: number) => `Precio total (${n} personas)`,
    depositRow: "Depósito a la confirmación",
    balanceRow: "Resto a la llegada",
    bankLabel: "Datos para la transferencia",
    bankSeparate:
      "Los datos bancarios se envían por correo electrónico aparte, por seguridad.",
    conditions: "Condiciones",
    organiserRole: "Organizador",
    clientRole: "Cliente · Fecha",
    footer:
      "Precios en euros. Este documento recoge las condiciones acordadas por correo electrónico y sustituye a cualquier acuerdo previo sobre el mismo viaje. La conformidad del cliente puede expresarse por correo electrónico o mediante firma.",
    terms: (dep: string, bal: string, lang: string) => [
      `<strong>Confirmación.</strong> La reserva queda confirmada en el momento en que se recibe el depósito de ${dep}. El resto, ${bal}, se abona a la llegada, en efectivo o con tarjeta.`,
      `<strong>Cancelación gratuita hasta 14 días antes de la salida.</strong> Las cancelaciones dentro de los 14 días previos están sujetas a una tarifa del 50 %. La no presentación se cobra íntegramente. <em>Estas son las mismas condiciones publicadas en marrakechecotours.com.</em>`,
      `<strong>Idioma.</strong> El conductor-guía habla ${lang} y acompaña al grupo durante los tres días completos. No se trata de una persona distinta en cada tramo.`,
      `<strong>Alojamiento.</strong> Los establecimientos indicados arriba están garantizados. Si por causa de fuerza mayor alguno no estuviera disponible, se sustituirá por otro de categoría igual o superior, previa comunicación al cliente.`,
      `<strong>Vehículo privado.</strong> El grupo viaja solo, sin otros viajeros, durante todo el recorrido.`,
      `<strong>Modificaciones del itinerario.</strong> El itinerario podrá ajustarse únicamente por motivos de seguridad, meteorología o cierre de carreteras. Cualquier cambio se comunicará al cliente y no supondrá reducción de los servicios contratados.`,
      `<strong>Seguro de viaje.</strong> No está incluido y se recomienda encarecidamente. Sugerimos una póliza que cubra cancelación, gastos médicos y evacuación de emergencia.`,
      `<strong>Responsabilidad.</strong> El organizador responde de los servicios descritos en este documento. No responde de gastos derivados de retrasos de vuelos, pérdida de equipaje por terceros ni de circunstancias ajenas a su control.`,
      `<strong>Idioma del contrato.</strong> Este contrato se firma en español. La traducción al inglés se facilita únicamente a título informativo; en caso de discrepancia, prevalece la versión española.`,
    ],
  },
  en: {
    htmlLang: "en",
    locale: "en-GB",
    docTitle: "Booking contract",
    subtitle: "Licensed tour operator",
    issued: (d: string) => `Issued ${d}`,
    parties: "Parties",
    organiser: "Operator",
    client: "Client",
    travellersLine: (n: number) => `${n} travellers`,
    object: "Subject of the contract",
    tour: "Tour",
    departure: "Departure",
    ret: "Return",
    travellersK: "Travellers",
    mode: "Type",
    modePrivate: "Private",
    guideLang: "Guide language",
    itinerary: "Itinerary",
    accommodation: "Accommodation",
    services: "Services",
    included: "Included",
    notIncluded: "Not included",
    priceHeading: "Price and payment",
    totalFor: (n: number) => `Total price (${n} people)`,
    depositRow: "Deposit on confirmation",
    balanceRow: "Balance on arrival",
    bankLabel: "Bank transfer details",
    bankSeparate: "Bank details are sent in a separate email, for security.",
    conditions: "Terms",
    organiserRole: "Operator",
    clientRole: "Client · Date",
    footer:
      "Prices in euro. This document records the terms agreed by email and supersedes any previous agreement covering the same trip. The client may confirm acceptance by email or by signature.",
    terms: (dep: string, bal: string, lang: string) => [
      `<strong>Confirmation.</strong> The booking is confirmed once the deposit of ${dep} is received. The balance of ${bal} is paid on arrival, in cash or by card.`,
      `<strong>Free cancellation up to 14 days before departure.</strong> Cancellations within 14 days are subject to a 50% fee. No-shows are charged in full. <em>These are the same terms published on marrakechecotours.com.</em>`,
      `<strong>Language.</strong> The driver-guide speaks ${lang} and accompanies the group for all three full days. This is not a different person on each leg.`,
      `<strong>Accommodation.</strong> The properties named above are guaranteed. Should one become unavailable through force majeure, it will be replaced by one of equal or higher standard, and the client informed beforehand.`,
      `<strong>Private vehicle.</strong> The group travels alone, with no other travellers, for the whole route.`,
      `<strong>Itinerary changes.</strong> The itinerary may be adjusted only for reasons of safety, weather or road closure. Any change will be communicated to the client and will not reduce the services contracted.`,
      `<strong>Travel insurance.</strong> Not included, and strongly recommended. We suggest a policy covering cancellation, medical expenses and emergency evacuation.`,
      `<strong>Liability.</strong> The operator is responsible for the services described in this document. It is not liable for costs arising from flight delays, baggage lost by third parties, or circumstances beyond its control.`,
      `<strong>Contract language.</strong> This contract is signed in Spanish. The English translation is provided for information only; in the event of any discrepancy, the Spanish version prevails.`,
    ],
  },
} as const;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function eur(cents: number, lang: ContractLang): string {
  const whole = Math.floor(cents / 100).toLocaleString(T[lang].locale);
  const frac = String(cents % 100).padStart(2, "0");
  // Spanish writes "850,00 €"; English "€850.00". Getting this wrong makes the
  // document read as machine-translated on the one page where money matters.
  return lang === "es" ? `${whole},${frac} €` : `€${whole}.${frac}`;
}

function fmt(iso: string, lang: ContractLang): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(T[lang].locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function renderContractHtml(c: ContractInput): string {
  const balance = c.total - c.deposit;
  if (c.deposit > c.total) throw new Error("deposit cannot exceed total");

  const lang: ContractLang = c.lang ?? "es";
  const t = T[lang];
  const money = (cents: number) => eur(cents, lang);
  const date = (iso: string) => fmt(iso, lang);

  const li = (items: string[], cls: string) =>
    items.map((i) => `<li class="${cls}">${esc(i)}</li>`).join("");

  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t.docTitle} ${esc(c.reference)} — Marrakech Eco Tours</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600;700&display=swap">
<style>
  /* Light only — a contract is printed and filed. See lib/invoice.ts for the
     bug this avoids: a dark palette behind prefers-color-scheme printed pale
     text on white paper. */
  :root {
    --ink: #1B2645; --ink-soft: #3A4560; --muted: #6B6558;
    --sand: #F5F1E8; --paper: #FFFFFF; --rule: #DDD5C4; --terracotta: #C97B2B;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; background: var(--sand); color: var(--ink);
    font-family: Inter, -apple-system, "Segoe UI", sans-serif;
    font-size: 14.5px; line-height: 1.6; padding: 28px 16px 56px;
    -webkit-font-smoothing: antialiased;
  }
  .sheet {
    max-width: 780px; margin: 0 auto; background: var(--paper);
    border: 1px solid var(--rule); border-radius: 4px; padding: 44px 48px 40px;
  }
  .masthead { display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; }
  .wordmark {
    font-family: "Cormorant Garamond", Georgia, serif; font-weight: 700;
    font-size: 29px; line-height: 1.1;
  }
  .wordmark span {
    display: block; font-family: Inter, sans-serif; font-size: 9.5px; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase; color: var(--terracotta); margin-top: 6px;
  }
  .docmeta { text-align: right; font-size: 12.5px; color: var(--muted); }
  .docmeta .kind {
    font-size: 9.5px; font-weight: 700; letter-spacing: 0.16em;
    text-transform: uppercase; color: var(--muted);
  }
  .docmeta .num {
    font-size: 18px; font-weight: 700; color: var(--ink);
    font-variant-numeric: tabular-nums; margin: 2px 0 3px;
  }
  .hr { border-bottom: 2px solid var(--ink); margin: 18px 0 26px; }
  h2 {
    font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--muted); margin: 30px 0 12px; padding-bottom: 6px;
    border-bottom: 1px solid var(--rule);
  }
  h2:first-of-type { margin-top: 0; }
  .parties { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
  .party strong { display: block; margin-bottom: 3px; }
  .party div { color: var(--ink-soft); font-size: 13px; }
  .label {
    font-size: 9.5px; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--muted); margin-bottom: 7px;
  }
  .facts { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--rule); }
  .cell { padding: 10px 13px; border-right: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
  .cell:nth-child(3n) { border-right: none; }
  .k { font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
  .v { font-weight: 600; font-size: 13.5px; margin-top: 2px; }
  .day { display: grid; grid-template-columns: 30px 1fr; gap: 14px; margin-bottom: 15px; }
  .daynum {
    width: 26px; height: 26px; border-radius: 50%; background: var(--terracotta);
    color: #fff; font-size: 12px; font-weight: 700; display: flex;
    align-items: center; justify-content: center;
  }
  .day strong { display: block; margin-bottom: 2px; }
  .day p { margin: 0; color: var(--ink-soft); font-size: 13.5px; }
  .acc { border: 1px solid var(--rule); padding: 12px 14px; margin-bottom: 9px; border-radius: 3px; }
  .acc .n { font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
  .acc strong { display: block; margin: 2px 0; }
  .acc span { color: var(--ink-soft); font-size: 13px; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
  ul { list-style: none; margin: 0; padding: 0; }
  li { position: relative; padding-left: 16px; font-size: 13.5px; color: var(--ink-soft); margin-bottom: 6px; }
  li.inc::before { content: ""; position: absolute; left: 0; top: 8px; width: 5px; height: 5px; border-radius: 50%; background: var(--terracotta); }
  li.exc::before { content: ""; position: absolute; left: 0; top: 7.5px; width: 5px; height: 5px; border-radius: 50%; border: 1px solid var(--muted); }
  .money { margin-left: auto; width: 340px; }
  .mrow { display: flex; justify-content: space-between; padding: 7px 0; }
  .mrow .n { font-variant-numeric: tabular-nums; font-weight: 600; }
  .mrow.total { border-top: 1px solid var(--rule); margin-top: 4px; padding-top: 11px; font-size: 16px; font-weight: 700; }
  .mrow.bal { background: var(--sand); margin-top: 8px; padding: 12px 14px; font-weight: 700; border-radius: 3px; }
  ol.terms { margin: 0; padding-left: 20px; }
  ol.terms li { padding-left: 4px; margin-bottom: 9px; font-size: 13.5px; color: var(--ink-soft); }
  ol.terms li::before { content: none; }
  ol.terms strong { color: var(--ink); }
  .pay { padding: 14px 16px; background: var(--sand); border-radius: 3px; font-size: 13.5px; }
  .sign { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 34px; }
  .sigbox { border-top: 1px solid var(--ink); padding-top: 7px; font-size: 12px; color: var(--muted); }
  .sigbox .who { font-weight: 600; color: var(--ink); font-size: 13px; }
  .sigline { height: 44px; }
  footer {
    margin-top: 32px; padding-top: 16px; border-top: 1px solid var(--rule);
    font-size: 11.5px; color: var(--muted); line-height: 1.6;
  }
  a { color: inherit; }

  @page { size: A4; margin: 14mm; }
  @media print {
    body { background: #fff; padding: 0; font-size: 11.5px; }
    .sheet { border: none; padding: 0; max-width: none; }
    h2 { break-after: avoid; }
    .day, .acc, .sign { break-inside: avoid; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }
</style>
</head>
<body>
<div class="sheet">

  <header class="masthead">
    <div class="wordmark">Marrakech Eco Tours<span>${t.subtitle}</span></div>
    <div class="docmeta">
      <div class="kind">${t.docTitle}</div>
      <div class="num">${esc(c.reference)}</div>
      <div>${t.issued(date(c.issued))}</div>
    </div>
  </header>

  <div class="hr"></div>

  <h2>${t.parties}</h2>
  <div class="parties">
    <div class="party">
      <div class="label">${t.organiser}</div>
      <strong>Marrakech Eco Tours</strong>
      <div>Marrakech, Marruecos</div>
      <div>info@marrakechecotours.com</div>
      <div>+212 653 936 003</div>
      <div>marrakechecotours.com</div>
      ${c.ice ? `<div>ICE ${esc(c.ice)}</div>` : ""}
      ${c.rc ? `<div>RC ${esc(c.rc)}</div>` : ""}
    </div>
    <div class="party">
      <div class="label">${t.client}</div>
      <strong>${esc(c.clientName)}</strong>
      <div>${esc(c.clientEmail)}</div>
      <div>${t.travellersLine(c.travellers)}</div>
    </div>
  </div>

  <h2>${t.object}</h2>
  <div class="facts">
    <div class="cell"><div class="k">${t.tour}</div><div class="v">${esc(c.tourTitle)}</div></div>
    <div class="cell"><div class="k">${t.departure}</div><div class="v">${date(c.departure)}</div></div>
    <div class="cell"><div class="k">${t.ret}</div><div class="v">${date(c.ret)}</div></div>
    <div class="cell"><div class="k">${t.travellersK}</div><div class="v">${c.travellers}</div></div>
    <div class="cell"><div class="k">${t.mode}</div><div class="v">${t.modePrivate}</div></div>
    <div class="cell"><div class="k">${t.guideLang}</div><div class="v">${esc(c.guideLanguage)}</div></div>
  </div>

  <h2>${t.itinerary}</h2>
  ${c.days
    .map(
      (d) => `<div class="day">
    <div class="daynum">${d.day}</div>
    <div><strong>${esc(d.title)}</strong><p>${esc(d.body)}</p></div>
  </div>`,
    )
    .join("")}

  <h2>${t.accommodation}</h2>
  ${c.accommodation
    .map(
      (a) => `<div class="acc">
    <div class="n">${esc(a.night)}</div>
    <strong>${esc(a.name)}</strong>
    <span>${esc(a.detail)}</span>
  </div>`,
    )
    .join("")}

  <h2>${t.services}</h2>
  <div class="cols">
    <div><div class="label">${t.included}</div><ul>${li(c.includes, "inc")}</ul></div>
    <div><div class="label">${t.notIncluded}</div><ul>${li(c.excludes, "exc")}</ul></div>
  </div>

  <h2>${t.priceHeading}</h2>
  <div class="money">
    <div class="mrow"><span>${t.totalFor(c.travellers)}</span><span class="n">${money(c.total)}</span></div>
    <div class="mrow"><span>${t.depositRow}</span><span class="n">${money(c.deposit)}</span></div>
    <div class="mrow bal"><span>${t.balanceRow}</span><span class="n">${money(balance)}</span></div>
  </div>

  <div class="pay" style="margin-top:18px">
    <div class="label">${t.bankLabel}</div>
    ${
      c.paymentInstructions
        ? esc(c.paymentInstructions)
        : `<em>${t.bankSeparate}</em>`
    }
  </div>

  <h2>${t.conditions}</h2>
  <ol class="terms">
    ${t.terms(money(c.deposit), money(balance), esc(lang === "es" ? c.guideLanguage.toLowerCase() : c.guideLanguage)).map((x) => `<li>${x}</li>`).join("")}
  </ol>

  <div class="sign">
    <div>
      <div class="sigline"></div>
      <div class="sigbox">
        <div class="who">Marrakech Eco Tours</div>
        ${t.organiserRole} · ${date(c.issued)}
      </div>
    </div>
    <div>
      <div class="sigline"></div>
      <div class="sigbox">
        <div class="who">${esc(c.clientName)}</div>
        ${t.clientRole}
      </div>
    </div>
  </div>

  <footer>
    Marrakech Eco Tours · Marrakech, Marruecos ·
    <a href="https://marrakechecotours.com">marrakechecotours.com</a><br>
    ${t.footer}
  </footer>
</div>
</body>
</html>`;
}
