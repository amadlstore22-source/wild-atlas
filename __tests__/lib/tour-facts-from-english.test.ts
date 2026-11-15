import { describe, expect, it } from "vitest";
import { TOURS } from "@/lib/tours";
import { FACT_KEYS, toursFor } from "@/lib/tours-i18n";

/**
 * Photos, prices and flags are facts, not translations, and every language
 * must show the English ones.
 *
 * Found 2026-11-15 on the live site. The five locale files
 * (lib/tours.<locale>.ts) each carry their own copy of every non-text field,
 * and mergeWithEn() let that copy win. English had been updated many times
 * since the copies were made, so in fr/es/de/it/ar:
 *
 *   - 33 of 48 tours showed a different gallery from the English page: 184
 *     photos against 205, and 30 Unsplash/Pexels stock photos where English
 *     had long since replaced all but 13 with the owner's own.
 *   - 2 tours (zagora-2day-marrakech, merzouga-stargazing-desert-tour) showed
 *     a different main photo.
 *   - toubkal-summit-2day-marrakech, the most-searched tour on the site, was
 *     on the English homepage's featured list and missing from the other five.
 *
 * Nothing caught it. Every value was valid TypeScript and every page built.
 * hero-image-locale-sync.test.ts passed the whole time: it reads the source
 * text with a pattern that expects `heroImage: "..."` on one line, and the two
 * drifted values sit on the line after the key, so it skipped exactly the
 * records that were wrong. No test compared tour galleries at all.
 *
 * So this test does not read source text. It asks the merged catalogue, which
 * is what the pages render, and it covers every tour in every locale rather
 * than the ones touched today.
 */

const LOCALES = ["fr", "es", "de", "it", "ar"] as const;

describe("tour facts come from English in every locale", () => {
  it("no locale shows a different photo, price or flag from English", () => {
    const drift: string[] = [];
    for (const lang of LOCALES) {
      const catalogue = toursFor(lang);
      for (const en of TOURS) {
        const localised = catalogue.find((t) => t.slug === en.slug);
        if (!localised) continue;
        for (const key of FACT_KEYS) {
          if (JSON.stringify(localised[key]) !== JSON.stringify(en[key])) {
            drift.push(`${en.slug} [${lang}] ${key}`);
          }
        }
      }
    }
    expect(
      drift,
      `These fields differ from English on the rendered page. They are facts,\n` +
        `not translations: add the key to FACT_KEYS in lib/tours-i18n.ts so the\n` +
        `merge always reads it from lib/tours.ts.\n  ` +
        drift.join("\n  "),
    ).toEqual([]);
  });

  it("translated text still comes from the locale file", () => {
    // Guards the other direction: reading facts from English must not turn
    // the translated pages back into English ones.
    const untranslated: string[] = [];
    for (const lang of LOCALES) {
      const catalogue = toursFor(lang);
      const same = TOURS.filter((en) => {
        const localised = catalogue.find((t) => t.slug === en.slug);
        return localised && localised.description === en.description;
      });
      if (same.length > 0) {
        untranslated.push(`${lang}: ${same.map((t) => t.slug).join(", ")}`);
      }
    }
    expect(
      untranslated,
      `These tours render the English description in a translated locale.\n` +
        `Either the translation is missing from lib/tours.<locale>.ts or the\n` +
        `merge is dropping text fields:\n  ` +
        untranslated.join("\n  "),
    ).toEqual([]);
  });
});
