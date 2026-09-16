import { describe, expect, it } from "vitest";
import { TOURS } from "@/lib/tours";
import { toursFor } from "@/lib/tours-i18n";

/**
 * A CORRECTED FACT MUST PROPAGATE TO EVERY LOCALE — INCLUDING THE FAQ.
 *
 * THE INCIDENT, TWICE OVER.
 *
 * `shared-merzouga-3day-marrakech` said "dinner and breakfast at the camp".
 * Dinner is in fact included on BOTH nights — at the hotel in the Dades and
 * at the desert camp. Read as camp-only, it was quoted that way to a client
 * (Esteban, September 2026), who was told night-one dinner would cost him
 * EUR 8-12 extra. It does not.
 *
 * On 2026-09-13 the `includes` line was corrected in all six locales. The
 * same claim also appears in the tour's own FAQ answer — and there it was
 * corrected in ENGLISH ONLY. So for three days the English page said "both
 * nights" while the Spanish, French, German, Italian and Arabic pages still
 * said "at the desert camp", on the same product, at the same price.
 *
 * It surfaced when a Spanish-speaking enquiry arrived for this exact tour
 * (2026-09-16) and the /es/ page was read before replying.
 *
 * WHY NOTHING CAUGHT IT.
 *   - tsc: every value is a valid string.
 *   - faq-locale-parity.test.ts: checks the NUMBER of questions per locale
 *     and that answers are translated rather than English fallbacks. Five
 *     correctly-translated answers that state the wrong fact pass both.
 *   - The build renders all six pages without complaint.
 *
 * Counting questions proves the arrays are the same shape. It cannot prove
 * they say the same thing. This test asserts the CLAIM.
 *
 * IF THIS FAILS: the meals wording has been changed in one locale and not
 * the others. Fix the wording everywhere rather than relaxing the assertion —
 * a meals claim is a price claim, and a client will quote it back to you.
 */

const LOCALES = ["fr", "es", "de", "it", "ar"] as const;

/** Tours whose meals claim has been verified with the operator. */
const BOTH_NIGHTS_TOURS = ["shared-merzouga-3day-marrakech"] as const;

/**
 * Phrases that mean "both nights" in each locale. The FAQ answer must carry
 * one of them; matching on meaning rather than an exact sentence lets the
 * copy be rewritten without this test becoming a spelling check.
 */
const BOTH_NIGHTS_MARKERS: Record<string, string[]> = {
  en: ["both nights"],
  fr: ["les deux nuits"],
  es: ["las dos noches"],
  de: ["beiden Abenden", "beide Nächte"],
  it: ["entrambe le notti"],
  ar: ["الليلتين"],
};

/**
 * Wording that reads as camp-only. This is the exact shape of the sentence
 * that caused the mis-quote, so it is asserted against directly.
 */
const CAMP_ONLY_MARKERS: Record<string, string[]> = {
  en: ["breakfast at the camp are included", "breakfast at the desert camp are included"],
  fr: ["petit-déjeuner au camp du désert sont inclus"],
  es: ["desayuno en el campamento del desierto sí están incluidos"],
  de: ["Frühstück im Wüstencamp sind enthalten"],
  it: ["colazione al campo nel deserto sono inclusi"],
  ar: ["والفطور في المخيم الصحراوي فمشمولان"],
};

/** The meals line in `includes`, per locale. */
const INCLUDES_MARKERS: Record<string, string[]> = {
  en: ["both nights"],
  fr: ["les deux nuits"],
  es: ["las dos noches"],
  de: ["beiden Abenden", "beide Nächte"],
  it: ["entrambe le notti"],
  ar: ["الليلتين"],
};

const hasAny = (haystack: string, needles: string[]) =>
  needles.some((n) => haystack.includes(n));

describe("Meals claim is consistent across locales", () => {
  it.each(BOTH_NIGHTS_TOURS)(
    "%s: the FAQ says 'both nights' in every locale",
    (slug) => {
      const failures: string[] = [];

      const en = TOURS.find((t) => t.slug === slug);
      expect(en, `${slug} is not in the English catalogue`).toBeTruthy();

      const enFaq = (en!.faq ?? []).map((f) => f.a).join(" ");
      if (!hasAny(enFaq, BOTH_NIGHTS_MARKERS.en)) {
        failures.push(`[en] FAQ does not state that meals cover both nights`);
      }

      for (const lang of LOCALES) {
        const localised = toursFor(lang).find((t) => t.slug === slug);
        if (!localised) {
          failures.push(`[${lang}] tour missing from catalogue`);
          continue;
        }

        const faqText = (localised.faq ?? []).map((f) => f.a).join(" ");

        if (hasAny(faqText, CAMP_ONLY_MARKERS[lang] ?? [])) {
          failures.push(
            `[${lang}] FAQ still says meals are included AT THE CAMP only — ` +
              `this is the wording that mis-quoted a client`,
          );
        }

        if (!hasAny(faqText, BOTH_NIGHTS_MARKERS[lang] ?? [])) {
          failures.push(
            `[${lang}] FAQ never states that dinner and breakfast cover BOTH nights`,
          );
        }
      }

      expect(
        failures,
        `The meals claim has drifted between locales:\n  ${failures.join("\n  ")}\n\n` +
          `Dinner and breakfast are included on BOTH nights — at the hotel in ` +
          `the Dades and at the desert camp. Correct the wording in every ` +
          `locale, not just English.`,
      ).toEqual([]);
    },
  );

  it.each(BOTH_NIGHTS_TOURS)(
    "%s: the includes list says 'both nights' in every locale",
    (slug) => {
      const failures: string[] = [];

      for (const lang of ["en", ...LOCALES] as const) {
        const tour =
          lang === "en"
            ? TOURS.find((t) => t.slug === slug)
            : toursFor(lang).find((t) => t.slug === slug);
        if (!tour) {
          failures.push(`[${lang}] tour missing`);
          continue;
        }

        const includes = (tour.includes ?? []).join(" ");
        if (!hasAny(includes, INCLUDES_MARKERS[lang] ?? [])) {
          failures.push(
            `[${lang}] includes list does not state meals on both nights`,
          );
        }
      }

      expect(
        failures,
        `The includes meals line has drifted:\n  ${failures.join("\n  ")}`,
      ).toEqual([]);
    },
  );
});
