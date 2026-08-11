import { describe, expect, it } from "vitest";
import { TOURS } from "@/lib/tours";
import { toursFor } from "@/lib/tours-i18n";

/**
 * mergeWithEn() overlays a locale's `faq` array wholesale rather than merging
 * item by item, so adding a question to the English record leaves the other
 * five locales on the old array — English showing ten questions and French
 * four, on the same tour, with FAQPage schema emitted from whichever the page
 * rendered.
 *
 * This has now bitten three times (tourType, includes/excludes, faq). The
 * assertion is deliberately catalogue-wide rather than scoped to the tours
 * touched today.
 */

const LOCALES = ["fr", "es", "de", "it", "ar"] as const;

describe("FAQ parity across locales", () => {
  it("every locale carries the same number of questions as English", () => {
    const failures: string[] = [];
    for (const lang of LOCALES) {
      const catalogue = toursFor(lang);
      for (const en of TOURS) {
        const localised = catalogue.find((t) => t.slug === en.slug);
        if (!localised) continue;
        const enCount = en.faq?.length ?? 0;
        const locCount = localised.faq?.length ?? 0;
        if (enCount !== locCount) {
          failures.push(`${en.slug} [${lang}]: ${locCount} vs ${enCount} in English`);
        }
      }
    }
    expect(failures, `FAQ count drift:\n  ${failures.join("\n  ")}`).toEqual([]);
  });

  it("localised answers are actually translated, not English fallbacks", () => {
    // Arabic is the clearest signal — a Latin-script answer there is a
    // fallback, not a translation.
    const catalogue = toursFor("ar");
    for (const en of TOURS) {
      const ar = catalogue.find((t) => t.slug === en.slug);
      if (!ar?.faq?.length || !en.faq?.length) continue;
      expect(
        ar.faq[0].q,
        `${en.slug} shows the English question in Arabic`
      ).not.toBe(en.faq[0].q);
    }
  });
});

describe("internal links inside localised FAQ answers", () => {
  it("point at the locale's own slug and resolve to a real tour", () => {
    // A French page linking /en/tours/... is a redirect at best; linking an
    // English slug under /fr/ is a 404. Four such links were already live on
    // chegaga-camel-trek-8day before this check existed.
    const failures: string[] = [];
    for (const lang of LOCALES) {
      const catalogue = toursFor(lang);
      const valid = new Set(catalogue.map((t) => t.localizedSlug ?? t.slug));
      for (const tour of catalogue) {
        for (const f of tour.faq ?? []) {
          for (const m of f.a.matchAll(/\]\(\/([a-z]{2})\/tours\/([a-z0-9-]+)\)/g)) {
            if (m[1] !== lang) {
              failures.push(`${tour.slug} [${lang}] links to /${m[1]}/`);
            } else if (!valid.has(m[2])) {
              failures.push(`${tour.slug} [${lang}] dead link: ${m[2]}`);
            }
          }
        }
      }
    }
    expect(failures, `broken FAQ links:\n  ${failures.join("\n  ")}`).toEqual([]);
  });
});
