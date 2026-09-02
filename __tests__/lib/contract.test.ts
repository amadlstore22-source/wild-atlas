import { describe, expect, it } from "vitest";
import { renderContractHtml, type ContractInput } from "@/lib/contract";

/**
 * A CONTRACT THAT CONTRADICTS ITSELF IS WORSE THAN NO CONTRACT.
 *
 * This document is sent to a customer before they transfer money, and a second
 * edition is produced in another language. Two failures matter and neither is
 * catchable by typecheck or build:
 *
 *  1. THE TWO EDITIONS DISAGREEING ON A NUMBER. If the Spanish says 850 € and
 *     the English says €800, the customer picks whichever favours them and the
 *     operator has signed both. Both editions read from one set of constants
 *     precisely so this cannot happen; these tests prove it stays that way.
 *
 *  2. LEAKED SOURCE LANGUAGE. The English edition is built by spreading the
 *     Spanish object and overriding the prose — exactly the shape of the bug
 *     that put English itineraries on Spanish tour pages
 *     (locale-english-leak.test.ts). Forget one field and a Spanish paragraph
 *     appears mid-contract.
 *
 * The cancellation clause is also asserted against the site's own published
 * wording: a contract promising different terms from the public page is a
 * dispute the operator loses.
 */

const BASE: ContractInput = {
  reference: "MET-2026-001",
  issued: "2026-09-01",
  clientName: "Andrés Gutiérrez Peña",
  clientEmail: "cliente@example.com",
  travellers: 3,
  tourTitle: "Marrakech a Merzouga",
  departure: "2026-09-20",
  ret: "2026-09-22",
  guideLanguage: "Español",
  days: [{ day: 1, title: "Día uno", body: "Texto del día uno." }],
  accommodation: [{ night: "Noche 1", name: "Luxury Riad Dades", detail: "Cena incluida." }],
  includes: ["Vehículo privado"],
  excludes: ["Almuerzos"],
  total: 85000,
  deposit: 17500,
};

const es = renderContractHtml(BASE);
const en = renderContractHtml({
  ...BASE,
  lang: "en",
  tourTitle: "Marrakech to Merzouga",
  guideLanguage: "Spanish",
  days: [{ day: 1, title: "Day one", body: "Day one text." }],
  accommodation: [{ night: "Night 1", name: "Luxury Riad Dades", detail: "Dinner included." }],
  includes: ["Private vehicle"],
  excludes: ["Lunches"],
});

/** Visible text only — attribute values and CSS are not read by the customer. */
function text(html: string): string {
  const body = html.slice(html.indexOf("<body>"));
  return body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
}

describe("contract money", () => {
  it("never renders a negative balance", () => {
    expect(() => renderContractHtml({ ...BASE, total: 10000, deposit: 20000 })).toThrow(
      /deposit cannot exceed total/,
    );
  });

  it("shows deposit and balance that sum to the total, in both editions", () => {
    // 850 − 175 = 675. The one line a customer checks with a calculator.
    for (const [name, html] of [["es", es], ["en", en]] as const) {
      const t = text(html);
      expect(t, `${name}: total missing`).toMatch(/850/);
      expect(t, `${name}: deposit missing`).toMatch(/175/);
      expect(t, `${name}: balance missing`).toMatch(/675/);
    }
  });

  it("formats currency for the reader's locale", () => {
    // A Spanish contract writing "€850.00" reads as machine-translated on the
    // one page where money matters most.
    expect(text(es)).toContain("850,00 €");
    expect(text(en)).toContain("€850.00");
  });
});

describe("the two editions cannot drift apart", () => {
  it("agree on the reference and both dates", () => {
    for (const html of [es, en]) {
      const t = text(html);
      expect(t).toContain("MET-2026-001");
      expect(t).toMatch(/20 (de )?septiembre|20 September/);
      expect(t).toMatch(/22 (de )?septiembre|22 September/);
    }
  });

  it("both name the same accommodation", () => {
    // Property names are proper nouns and must be byte-identical — this is the
    // thing the customer will look for on arrival.
    for (const html of [es, en]) {
      expect(text(html)).toContain("Luxury Riad Dades");
    }
  });

  it("both promise the same guide language", () => {
    // He rejected the shared tour because one traveller reads no English.
    expect(text(es)).toMatch(/español/i);
    expect(text(en)).toMatch(/Spanish/);
  });
});

describe("no leaked source language", () => {
  it("keeps Spanish structural copy out of the English edition", () => {
    // The English edition spreads the Spanish object and overrides the prose.
    // A forgotten field leaves a Spanish heading or paragraph mid-document.
    const t = text(en);
    for (const word of [
      "Contrato",
      "Viajeros",
      "Alojamiento",
      "Condiciones",
      "Depósito",
      "Organizador",
      "Emitido",
    ]) {
      expect(t, `English contract contains Spanish word "${word}"`).not.toContain(word);
    }
  });

  it("sets the html lang attribute per edition", () => {
    // Screen readers and PDF readers announce the wrong language otherwise.
    expect(es).toContain('<html lang="es">');
    expect(en).toContain('<html lang="en">');
  });
});

describe("terms", () => {
  it("states the site's published cancellation policy, not a different one", () => {
    // dictionaries/{es,en}.json contact.faq4A. A contract promising terms the
    // public page contradicts is a dispute the operator loses.
    expect(text(es)).toMatch(/14 días/);
    expect(text(es)).toMatch(/50 ?%/);
    expect(text(en)).toMatch(/14 days/);
    expect(text(en)).toMatch(/50% fee/);
  });

  it("names which language governs, in both editions", () => {
    // Two signed documents in two languages need one to prevail, or a
    // translation slip becomes a second set of obligations.
    expect(text(es)).toMatch(/prevalece la versión española/);
    expect(text(en)).toMatch(/Spanish version prevails/);
  });

  it("says bank details are sent separately when none are supplied", () => {
    // Never leave a silently blank payment box on a document asking for money.
    expect(text(es)).toMatch(/datos bancarios se envían/);
    expect(text(en)).toMatch(/Bank details are sent/);

    const withBank = renderContractHtml({ ...BASE, paymentInstructions: "IBAN MA00 1234" });
    expect(text(withBank)).toContain("IBAN MA00 1234");
  });

  it("escapes the client name", () => {
    const evil = renderContractHtml({ ...BASE, clientName: "<script>alert(1)</script>" });
    expect(evil).not.toContain("<script>alert(1)</script>");
    expect(evil).toContain("&lt;script&gt;");
  });
});

describe("printability", () => {
  it("is light-only, so it prints as ink on paper", () => {
    // Same defect as the first invoice: a dark palette behind
    // prefers-color-scheme printed pale text on a white background.
    // Match the MEDIA QUERY, not the word: lib/contract.ts explains this very
    // bug in a CSS comment, and a bare substring check flagged the explanation.
    expect(es).not.toMatch(/@media[^{]*prefers-color-scheme/);
    expect(es).not.toMatch(/\[data-theme="dark"\]/);
    expect(es).toContain("print-color-adjust: exact");
  });

  it("keeps signature blocks off a page break", () => {
    expect(es).toContain("break-inside: avoid");
  });
});
