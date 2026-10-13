import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;
const read = (p: string) => readFileSync(join(ROOT, p), "utf8");

/**
 * How MET is actually paid (owner, 2026-10): deposit by PayPal or bank
 * transfer, balance in cash (EUR/MAD) or by bank transfer, NEVER by card; and
 * since 2026-10-13 every refund is made less the transfer fees.
 *
 * Until then the Terms (6 languages), the Contact FAQ and the Spanish
 * contract all said the balance could be paid "by card", and the Terms had a
 * stricter cancellation ladder (no refund inside 7 days) than the contract,
 * the FAQ and "How we operate" (50% inside 14 days). A client reading two of
 * our documents got two different answers. Nothing fails a build over prose.
 */
describe("payment and refund terms say what we do", () => {
  const CARD_OK = /(do not accept|n[’']acceptons pas|no aceptamos|nehmen wir nicht|non accettiamo|لا نقبل)/i;
  const CARD = /(by card|or card|par carte|con tarjeta|mit karte|con carta|بالبطاقة)/i;

  it("no page or document offers card payment", () => {
    const bad: string[] = [];
    const check = (where: string, text: string) => {
      for (const line of text.split("\n")) if (CARD.test(line) && !CARD_OK.test(line)) bad.push(`${where}: ${line.trim().slice(0, 120)}`);
    };
    for (const l of LOCALES) {
      check(`terms/${l}`, read(`app/[lang]/terms/content/${l}.tsx`));
      const d = JSON.parse(read(`dictionaries/${l}.json`));
      check(`${l}.json contact.faq2A`, d.contact.faq2A);
      check(`${l}.json howWeOperate.moneyBody`, d.howWeOperate.moneyBody);
    }
    check("lib/contract.ts", read("lib/contract.ts"));
    expect(bad, `The balance is cash (EUR/MAD) or bank transfer, never card:\n  ${bad.join("\n  ")}`).toEqual([]);
  });

  it("the Terms use the same cancellation ladder as the contract and FAQ, and the refund fee rule", () => {
    const en = read("app/[lang]/terms/content/en.tsx");
    expect(en).toContain("Less than 14 days before departure");
    expect(en).not.toContain("7 days or less");
    expect(en).toContain("less transfer fees");
    const contract = read("lib/contract.ts");
    expect(contract).toContain("Refunds are made less transfer fees");
    for (const l of LOCALES) {
      const terms = read(`app/[lang]/terms/content/${l}.tsx`);
      expect(terms, `terms/${l} still has the old 8-13 day tier`).not.toMatch(/8[–-]13|8 à 13|entre 8 y 13|da 8 a 13|من 8 إلى 13/);
    }
  });
});
