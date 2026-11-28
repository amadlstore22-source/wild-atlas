import { describe, expect, it } from "vitest";
import { blogPostsFor } from "@/lib/blog-i18n";

/**
 * THE INCIDENT (found 2026-11-28 while writing the answer boxes). MET's prices
 * moved from USD to EUR on 2026-09-29. The English posts were converted, but
 * the French, Spanish and German versions of "What a Morocco desert tour
 * really costs" and "Merzouga vs Zagora" kept the old dollar figures: a
 * "120–180 $" table on /fr, /es and /de while the English page said
 * "€110–€170" and every tour page priced in euros. Typecheck, build and the
 * existing price tests all passed, because the dollar amounts matched no tour
 * ladder at all; only a reader comparing two languages could see it.
 *
 * Rule: a dollar amount may only appear as a conversion beside a euro figure
 * on the same line (English "£40–63 / €46–74 / $50–80"). Talking about the
 * currency itself ("bring euros, pounds or dollars") has no amount and passes.
 */
const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;
const DOLLAR_AMOUNT = /\$\s?\d|\d\s?\$|\bUS\$|\bUSD\b|\d\s*دولار/;
const EURO = /€|\bEUR\b|يورو/;

describe("blog prices are in euros", () => {
  it("has no dollar amounts except as a conversion next to a euro figure", () => {
    const wrong: string[] = [];
    for (const l of LOCALES)
      for (const p of blogPostsFor(l)) {
        const fields = [p.title, p.excerpt, p.seoTitle ?? "", p.seoDescription ?? "", p.content, ...(p.faq ?? []).flatMap((f) => [f.q, f.a]), p.answer?.text ?? ""];
        for (const line of fields.join("\n").split("\n"))
          if (DOLLAR_AMOUNT.test(line) && !EURO.test(line)) wrong.push(`${l}: ${p.slug}: ${line.trim().slice(0, 120)}`);
      }
    expect(
      wrong,
      "Prices are in euros since 2026-09-29. Replace these dollar amounts with the English page's euro figures:\n  " + wrong.join("\n  "),
    ).toEqual([]);
  });
});
