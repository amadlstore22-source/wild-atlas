import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { currentConsent, LEGAL_UPDATED, LEGAL_VERSION, LEGAL_VERSION_KEY } from "@/lib/legal-version";
import { CONSENT_KEY } from "@/lib/analytics";

/**
 * Owner, 2026-10-16: after the terms and legal pages are updated, everyone who
 * opens the site has to accept again, returning visitors included.
 *
 * Until then the banner stored only the choice ("all" / "necessary"), so a
 * visitor who accepted once was never asked again, whatever changed in the
 * Terms or the Privacy Policy, and analytics kept running on a consent given
 * to older text. Nothing in the build notices if a legal page's date is
 * edited without the consent version following, so these checks tie the two:
 * the dates live in lib/legal-version.ts, the pages read them from there, and
 * a stored choice counts only under the current version.
 */
const ROOT = join(__dirname, "..", "..");
const read = (p: string) => readFileSync(join(ROOT, p), "utf8");
const store = (data: Record<string, string>) => ({ getItem: (k: string) => data[k] ?? null });
const LOCALES = ["en", "fr", "es", "de", "it", "ar"];

describe("asking again after a legal update", () => {
  it("counts a stored choice only under the current version", () => {
    expect(currentConsent(store({}), CONSENT_KEY)).toBeNull();
    expect(currentConsent(store({ [CONSENT_KEY]: "all" }), CONSENT_KEY), "a choice from before versions existed must be asked again").toBeNull();
    expect(currentConsent(store({ [CONSENT_KEY]: "all", [LEGAL_VERSION_KEY]: "2000-01-01" }), CONSENT_KEY)).toBeNull();
    expect(currentConsent(store({ [CONSENT_KEY]: "necessary", [LEGAL_VERSION_KEY]: LEGAL_VERSION }), CONSENT_KEY)).toBe("necessary");
  });

  it("takes the version from the newest legal page date", () => {
    expect(LEGAL_VERSION).toBe(Object.values(LEGAL_UPDATED).sort().at(-1));
  });

  it("dates every legal page from lib/legal-version.ts, so a new date always re-asks", () => {
    for (const p of ["terms", "privacy", "cookies"]) {
      const src = read(`app/[lang]/${p}/page.tsx`);
      expect(src, `app/[lang]/${p}/page.tsx must use LEGAL_UPDATED.${p}, not its own date string`).toMatch(new RegExp(`const UPDATED = LEGAL_UPDATED\\.${p};`));
    }
  });

  it("records the version with the choice, and gates analytics on it", () => {
    expect(read("components/ui/CookieBanner.tsx")).toMatch(/localStorage\.setItem\(LEGAL_VERSION_KEY, LEGAL_VERSION\)/);
    expect(read("components/ui/CookieBanner.tsx")).toMatch(/currentConsent\(localStorage, STORAGE_KEY\)/);
    expect(read("lib/analytics.ts")).toMatch(/currentConsent\(localStorage, CONSENT_KEY\) === "all"/);
  });

  it("explains the update and lists the stored version in every language", () => {
    const missing: string[] = [];
    for (const l of LOCALES) {
      const d = JSON.parse(read(`dictionaries/${l}.json`));
      for (const k of ["updated", "termsLink", "privacyLink"]) if (!d.cookieBanner?.[k]) missing.push(`${l}: cookieBanner.${k}`);
      if (!read(`app/[lang]/cookies/content/${l}.tsx`).includes(`<dt>${LEGAL_VERSION_KEY}</dt>`)) missing.push(`${l}: cookie policy does not list ${LEGAL_VERSION_KEY}`);
    }
    expect(missing).toEqual([]);
  });
});
