import { describe, expect, it } from "vitest";
import { TOURS } from "@/lib/tours";

/**
 * Tour briefs now quote the private price ladder as prose: "€690 for one
 * traveller, €380 each for two, ..." (eleven tours by 24 Nov 2026, the 3-day
 * Sahara and the 4-day desert grand tour the latest). Prose does not move when
 * groupPricing does. That exact failure already shipped in the blog: eight
 * cost posts in six languages quoted pre-reprice figures (EUR 225 for a tour
 * that cost EUR 380) and nothing failed, because a number inside a string is
 * valid TypeScript and the page builds -- see blog-price-rot.test.ts.
 *
 * The rule here: any euro amount of EUR 50 or more in an English brief must be
 * one of that tour's own prices (a groupPricing rung, `price`, or
 * `depositAmount`). Smaller amounts are left alone on purpose: they are lunch
 * budgets (EUR 12-15), the Atlas Studios ticket (~EUR 7) and the shared-tour
 * deposits (EUR 17 / 21), none of which live in the price ladder.
 *
 * Only English is checked. tour-brief-locale-numbers already forces every
 * translation to carry the same numbers >= 100 as the English brief, so a
 * stale ladder in French or Arabic fails there, and fixing English here is
 * the first half of fixing all six.
 */

/** "€1,350" / "€ 690" / "690 €" -> 1350 / 690 / 690. */
function euroAmounts(text: string): number[] {
  const out: number[] = [];
  const re = /€\s?(\d{1,3}(?:[,.   ]\d{3})+|\d+)|(\d{1,3}(?:[,.   ]\d{3})+|\d+)\s?€/g;
  for (const m of text.matchAll(re)) out.push(Number((m[1] ?? m[2]).replace(/[,.   ]/g, "")));
  return out;
}

describe("tour briefs", () => {
  it("quote only prices the tour actually charges", () => {
    const stale: string[] = [];
    for (const t of TOURS) {
      const real = new Set<number>([
        ...(t.groupPricing ?? []).map((g) => g.price),
        t.price,
        ...(t.depositAmount ? [t.depositAmount] : []),
      ]);
      for (const p of t.brief ?? []) {
        for (const n of euroAmounts(p)) {
          if (n >= 50 && !real.has(n)) stale.push(`${t.slug}: brief says €${n}; ladder is ${[...real].sort((a, b) => b - a).join(" / ")}`);
        }
      }
    }
    expect(
      stale,
      `These briefs quote a price the tour no longer charges, usually because\n` +
        `groupPricing changed and the prose did not. Rewrite the figure in the\n` +
        `English brief and in all five translations (tours.<lang>.ts):\n  ` +
        stale.join("\n  "),
    ).toEqual([]);
  });

  it("the euro parser reads the formats the briefs use", () => {
    expect(euroAmounts("€1,350 solo, €760 for two")).toEqual([1350, 760]);
    expect(euroAmounts("889 € pour un voyageur seul, 1 350 € à deux")).toEqual([889, 1350]);
    expect(euroAmounts("budget roughly €12–15 a meal")).toEqual([12]);
  });
});
