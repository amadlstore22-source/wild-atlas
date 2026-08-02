import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { hreflangLanguages, hreflangForPath } from "@/lib/seo/hreflang";

const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

/**
 * x-default is not a locale, so it can never fall out of mapping over LOCALES —
 * it has to be added deliberately. That is exactly how nine route groups came to
 * omit it while the two hand-written object literals had it: the omission is
 * invisible in review and only shows up in a crawl of the built HTML.
 */
describe("hreflang helper", () => {
  it("emits every locale plus x-default", () => {
    const langs = hreflangForPath(LOCALES, "/tours/example");
    for (const l of LOCALES) {
      expect(langs[l]).toBe(`https://marrakechecotours.com/${l}/tours/example`);
    }
    expect(Object.keys(langs)).toHaveLength(LOCALES.length + 1);
  });

  it("points x-default at the English URL", () => {
    expect(hreflangForPath(LOCALES, "/about")["x-default"]).toBe(
      "https://marrakechecotours.com/en/about"
    );
  });

  it("uses the per-locale URL from urlFor, not the default locale's", () => {
    // Blog posts serve under a localised segment; each alternate must name that
    // locale's own URL or the cluster stops being reciprocal and Google drops it.
    const slugs: Record<string, string> = { fr: "prix-guide-toubkal", en: "toubkal-guide-cost" };
    const langs = hreflangLanguages(
      LOCALES,
      (l) => `https://marrakechecotours.com/${l}/blog/${slugs[l] ?? "toubkal-guide-cost"}`
    );
    expect(langs.fr).toContain("/fr/blog/prix-guide-toubkal");
    expect(langs["x-default"]).toContain("/en/blog/toubkal-guide-cost");
  });

  it("handles a locale root path", () => {
    expect(hreflangForPath(LOCALES, "")["x-default"]).toBe("https://marrakechecotours.com/en");
  });
});

/**
 * Guards the whole app rather than the helper: any page declaring hreflang
 * alternates must include x-default. A new route that hand-rolls
 * `Object.fromEntries(LOCALES.map(...))` would reintroduce the original bug,
 * and no other check in the build would notice.
 */
describe("every route with hreflang declares x-default", () => {
  function pageFiles(dir: string, out: string[] = []): string[] {
    for (const entry of readdirSync(dir)) {
      const p = join(dir, entry);
      if (statSync(p).isDirectory()) pageFiles(p, out);
      else if (entry === "page.tsx" || entry === "layout.tsx") out.push(p);
    }
    return out;
  }

  it("has no languages block missing x-default", () => {
    const appDir = join(__dirname, "..", "..", "app");
    const offenders: string[] = [];

    for (const file of pageFiles(appDir)) {
      const src = readFileSync(file, "utf-8");
      if (!/languages:/.test(src)) continue;
      // Either it routes through the helper (which always adds x-default) or it
      // spells x-default out itself.
      const usesHelper = /hreflang(Languages|ForPath)\s*\(/.test(src);
      const literal = /["']x-default["']\s*:/.test(src);
      if (!usesHelper && !literal) {
        offenders.push(file.split(/[\\/]app[\\/]/)[1] ?? file);
      }
    }

    expect(offenders, `missing x-default in:\n  ${offenders.join("\n  ")}`).toEqual([]);
  });
});
