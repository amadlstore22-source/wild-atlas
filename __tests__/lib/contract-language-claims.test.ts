import { describe, expect, it } from "vitest";

import { renderContractHtml, type ContractLang } from "@/lib/contract";

/**
 * A CONTRACT MUST NOT STATE FACTS ABOUT ITSELF THAT ARE FALSE.
 *
 * THE INCIDENT. Every edition ended with a governing-language clause reading
 * "This contract is signed in Spanish. The English translation is provided
 * for information only; in the event of any discrepancy, the Spanish version
 * prevails." It was written when the operator sold in Spanish and English
 * only, and back then it was true.
 *
 * It then printed, verbatim, on a contract for a French family whose trip was
 * quoted, negotiated and agreed entirely in French — a booking for which NO
 * Spanish edition was ever generated. The document handed to the client
 * asserted the existence of a governing original that did not exist, and
 * subordinated the only text he had actually read to it.
 *
 * WHY NOTHING CAUGHT IT. The clause is a hardcoded string in a template
 * literal. It is valid TypeScript, the PDF renders perfectly, the arithmetic
 * is right, and every other clause is correct. Only somebody reading clause 9
 * of a French document and knowing there was no Spanish one would notice —
 * which is exactly what happened, after the PDF had been generated.
 *
 * THE FIX was to delete the clause from all three editions rather than
 * reword it per language. A term that describes the document's own
 * provenance has to be re-checked against reality on every sale, and there is
 * no benefit to the client that justifies that risk.
 *
 * WHAT THIS ASSERTS: no edition claims to be a translation of, or subordinate
 * to, an edition in another language. Reintroduce any such clause and this
 * fails. Assertion is deliberately catalogue-wide over every supported
 * language rather than scoped to French, because the incident's cause was a
 * string that was true for the languages it was written for and false for the
 * one added later.
 */

const LANGS: ContractLang[] = ["es", "en", "fr"];

/** A minimal but complete booking. Prose is irrelevant to what is asserted. */
function booking(lang: ContractLang) {
  return {
    lang,
    reference: "CON-TEST-001",
    issued: "2026-09-23",
    clientName: "Test Client",
    clientEmail: "test@example.com",
    travellers: 4,
    tourTitle: "Test tour",
    departure: "2026-10-21",
    ret: "2026-10-24",
    guideLanguage: "French",
    days: [
      { day: 1, title: "One", body: "Body one." },
      { day: 2, title: "Two", body: "Body two." },
      { day: 3, title: "Three", body: "Body three." },
      { day: 4, title: "Four", body: "Body four." },
    ],
    accommodation: [{ night: "Night 1", name: "Hotel", detail: "Detail." }],
    includes: ["Included item"],
    excludes: ["Excluded item"],
    total: 139600,
    deposit: 30700,
  };
}

function text(lang: ContractLang): string {
  return renderContractHtml(booking(lang))
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
}

/**
 * Phrases that only appear in a clause subordinating one edition to another.
 * Each is the operative half of the wording that shipped, in the three
 * languages the document is produced in.
 */
const SUBORDINATING = [
  "signed in Spanish",
  "Spanish version prevails",
  "provided for information only",
  "se firma en español",
  "prevalece la versión española",
  "a título informativo",
  "est signé en",
  "fait foi",
];

describe("contract governing-language claims", () => {
  for (const lang of LANGS) {
    it(`the ${lang} edition does not subordinate itself to another language`, () => {
      const body = text(lang);
      const found = SUBORDINATING.filter((p) => body.includes(p));

      expect(
        found,
        `The ${lang} contract contains wording that describes it as a\n` +
          `translation of, or subordinate to, an edition in another language:\n  ` +
          found.join("\n  ") +
          `\n\nThis shipped once already: a French client received a contract\n` +
          `stating it was "signed in Spanish" when no Spanish edition of his\n` +
          `booking existed. Delete the clause. A contract should not make\n` +
          `claims about its own provenance that have to be re-verified on\n` +
          `every sale.`,
      ).toEqual([]);
    });
  }

  it("still renders the substantive terms it is supposed to carry", () => {
    /* GUARDS THE ABOVE. Deleting every term would also pass the assertion
       above, and silently ship a contract with no conditions at all. These
       are the clauses that protect both sides and must survive. */
    const body = text("fr");
    for (const required of [
      "Annulation gratuite", // cancellation policy
      "Assurance voyage", // insurance not included
      "Véhicule privé", // the thing being sold
      "Hébergement", // accommodation guarantee
    ]) {
      expect(
        body.includes(required),
        `The French contract no longer contains "${required}". The\n` +
          `governing-language clause was removed deliberately; the rest of\n` +
          `the terms were not.`,
      ).toBe(true);
    }
  });
});
