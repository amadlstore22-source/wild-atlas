import { describe, expect, it } from "vitest";
import type { LegalCtx, LegalDoc } from "@/components/legal/LegalPage";
import privacyEn from "@/app/[lang]/privacy/content/en";
import privacyFr from "@/app/[lang]/privacy/content/fr";
import privacyEs from "@/app/[lang]/privacy/content/es";
import privacyDe from "@/app/[lang]/privacy/content/de";
import privacyIt from "@/app/[lang]/privacy/content/it";
import privacyAr from "@/app/[lang]/privacy/content/ar";
import termsEn from "@/app/[lang]/terms/content/en";
import termsFr from "@/app/[lang]/terms/content/fr";
import termsEs from "@/app/[lang]/terms/content/es";
import termsDe from "@/app/[lang]/terms/content/de";
import termsIt from "@/app/[lang]/terms/content/it";
import termsAr from "@/app/[lang]/terms/content/ar";
import cookiesEn from "@/app/[lang]/cookies/content/en";
import cookiesFr from "@/app/[lang]/cookies/content/fr";
import cookiesEs from "@/app/[lang]/cookies/content/es";
import cookiesDe from "@/app/[lang]/cookies/content/de";
import cookiesIt from "@/app/[lang]/cookies/content/it";
import cookiesAr from "@/app/[lang]/cookies/content/ar";

/**
 * Until 2026-10-03 the privacy, terms and cookie pages existed only in English,
 * so 15 URLs under /fr, /es, /de, /it and /ar served English text with a
 * translated lang attribute and the same title in every locale — duplicate
 * content the live crawl flagged. They are now one content file per language.
 *
 * The risk that creates: someone edits the English Terms (a new section, a
 * changed deposit rule) and the five translations silently keep the old text.
 * The Terms say English prevails, but a reader in Lyon reads the French. This
 * test fails when a locale's sections drift from English, or when a locale
 * still carries the English title.
 */
type Make = (ctx: LegalCtx) => LegalDoc;
// Italian legal usage keeps the English loanword "Cookie Policy" as the page title.
const SAME_TITLE_OK = new Set(["cookies/it"]);
const DOCS: Record<string, Record<string, Make>> = {
  privacy: { en: privacyEn, fr: privacyFr, es: privacyEs, de: privacyDe, it: privacyIt, ar: privacyAr },
  terms: { en: termsEn, fr: termsFr, es: termsEs, de: termsDe, it: termsIt, ar: termsAr },
  cookies: { en: cookiesEn, fr: cookiesFr, es: cookiesEs, de: cookiesDe, it: cookiesIt, ar: cookiesAr },
};

describe("legal pages are translated in every locale", () => {
  for (const [page, byLocale] of Object.entries(DOCS)) {
    const en = byLocale.en({ lang: "en", mail: null });
    for (const [loc, make] of Object.entries(byLocale)) {
      if (loc === "en") continue;
      it(`${page} (${loc}) has the English section list and its own title`, () => {
        const doc = make({ lang: loc, mail: null });
        expect(
          doc.sections.map((s) => s.id),
          `${page}/${loc} sections differ from English. Add or remove the same sections in app/[lang]/${page}/content/${loc}.tsx`
        ).toEqual(en.sections.map((s) => s.id));
        if (!SAME_TITLE_OK.has(`${page}/${loc}`)) {
          expect(doc.title, `${page}/${loc} still uses the English title`).not.toBe(en.title);
        }
        expect(doc.metaDescription, `${page}/${loc} still uses the English meta description`).not.toBe(en.metaDescription);
        const untranslated = doc.sections.filter((s, i) => s.title === en.sections[i].title && s.title !== "Contact");
        expect(untranslated.map((s) => s.id), `${page}/${loc} section titles still in English`).toEqual([]);
      });
    }
  }
});
