import { describe, it, expect } from "vitest";
import { TOURS, type Tour } from "@/lib/tours";
import { TOURS as TOURS_FR } from "@/lib/tours.fr";
import { TOURS as TOURS_ES } from "@/lib/tours.es";
import { TOURS as TOURS_DE } from "@/lib/tours.de";
import { TOURS as TOURS_IT } from "@/lib/tours.it";
import { TOURS as TOURS_AR } from "@/lib/tours.ar";

/**
 * THE PURCHASE SUMMARY WAS IN ENGLISH ON EVERY NON-ENGLISH TOUR PAGE.
 *
 * THE INCIDENT (found 2026-09-19, investigating why tour pages do not convert).
 *
 * 590 bullets across 35 of 48 tours were byte-identical to English in
 * fr/de/it/ar, and 70 in es. They are `includes`, `excludes` and `highlights`
 * -- the "What's included / not included" lists that render directly beneath
 * the price box. A French buyer read a fully French page whose receipt said:
 *
 *     Camel trek at sunset
 *     Lunches / Drinks / Tips / Entry fees
 *
 * That is the last block a customer reads before deciding to pay.
 *
 * WHY NOTHING CAUGHT IT. locale-english-leak.test.ts guards precisely this
 * failure and has since the Spanish-itinerary incident -- but it skips strings
 * under MIN_LEN = 25 characters, because short strings are legitimately
 * identical across languages ("Marrakech", "4x4", "Erg Chebbi", "UNESCO").
 * Every one of these 590 strings is under 25 characters. "Tips" is four.
 * The threshold that stops that test drowning in false positives is exactly
 * the threshold that hid these, so it passed, typecheck passed, the build
 * passed, and 288 prerendered pages shipped an English receipt in five
 * languages.
 *
 * WHAT THIS ASSERTS. No locale bullet in `includes`, `excludes` or
 * `highlights` may be byte-identical to its English counterpart -- at ANY
 * length. This is the complement of locale-english-leak.test.ts: that test
 * owns long prose, this one owns short list items, and the two together leave
 * no gap at the 25-character boundary.
 *
 * It is safe to check short strings HERE, where the long test could not,
 * because the comparison is positional and field-scoped: a bullet is only
 * compared against the English bullets of the SAME tour's SAME field. A place
 * name that is legitimately identical is not a bullet; it lives in `stop.name`
 * or inside prose, neither of which this test reads. ALLOWED below carries the
 * handful of real exceptions.
 *
 * IF THIS FAILS: translate the bullet in the locale catalogue named in the
 * message. Do not add it to ALLOWED unless the word is genuinely identical in
 * that language -- and note that "identical in French" is not the same as
 * "we have not translated it yet".
 */

const CATALOGUES: [string, Tour[]][] = [
  ["fr", TOURS_FR],
  ["es", TOURS_ES],
  ["de", TOURS_DE],
  ["it", TOURS_IT],
  ["ar", TOURS_AR],
];

const FIELDS = ["highlights", "includes", "excludes"] as const;

/**
 * Bullets that are correctly identical to English in a given language.
 * Keyed by locale so "Transfer" being right in German does not excuse it in
 * Arabic. Empty today: every string the audit found was a real leak.
 */
const ALLOWED: Record<string, Set<string>> = {
  fr: new Set(),
  es: new Set(),
  de: new Set(),
  it: new Set(),
  ar: new Set(),
};

describe("tour bullets are translated in every locale", () => {
  const en = new Map(TOURS.map((t) => [t.slug, t]));

  for (const [lang, tours] of CATALOGUES) {
    it(`${lang} serves no English bullet`, () => {
      const leaks: string[] = [];

      for (const tour of tours) {
        const base = en.get(tour.slug);
        if (!base) continue;

        for (const field of FIELDS) {
          const localised = tour[field] ?? [];
          const english = base[field] ?? [];
          for (const value of localised) {
            if (typeof value !== "string") continue;
            if (ALLOWED[lang].has(value)) continue;
            if (english.includes(value)) {
              leaks.push(`${tour.slug}.${field}: "${value}"`);
            }
          }
        }
      }

      expect(
        leaks,
        `lib/tours.${lang}.ts serves English in the purchase summary:\n  ` +
          leaks.join("\n  ") +
          `\n\nThese render under the price box, where the customer decides ` +
          `whether to pay. 590 of them shipped because ` +
          `locale-english-leak.test.ts skips strings under 25 characters. ` +
          `Translate them in lib/tours.${lang}.ts — ALLOWED is for words that ` +
          `are genuinely identical in ${lang}, not for a pending translation.`,
      ).toEqual([]);
    });
  }
});
