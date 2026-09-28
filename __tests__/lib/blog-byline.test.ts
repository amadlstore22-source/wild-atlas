import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { BLOG_BYLINE } from "@/lib/team";
import { getGuideFor } from "@/lib/guides-i18n";
import type { Locale } from "@/app/[lang]/dictionaries";

/**
 * Every article said "By MET Team" and marked the author up as an
 * Organization. On 2026-09-28 the owner named the five guides to credit; two
 * of them already have profile pages (lib/guides.ts), so the byline links to
 * them and the schema names them as Persons.
 *
 * The trap this guards: the first draft linked "Mohamed" on /ar to a profile
 * titled "محمد آيت إدار" -- one man, two spellings, on the same page. It built
 * and rendered fine. The name shown must be the profile's own first name in
 * that locale.
 *
 * Also here: every date on the blog was formatted with a hardcoded "en-GB", so
 * German, French and Arabic articles printed English month names.
 */
const LANGS: Locale[] = ["en", "fr", "de", "es", "it", "ar"];
const ROOT = join(__dirname, "..", "..");

describe("blog byline", () => {
  it("names the five guides in the owner's order", () => {
    expect(BLOG_BYLINE.map((m) => m.name)).toEqual(["Yassine", "Aziz", "Hassan", "Mohamed", "Smail"]);
  });

  it("links only to guide profiles that exist in every locale, under the same name", () => {
    for (const m of BLOG_BYLINE.filter((x) => x.guideId)) {
      for (const lang of LANGS) {
        const g = getGuideFor(lang, m.guideId!);
        expect(g, `${m.guideId} missing in ${lang}`).toBeDefined();
        // Byline and profile must name one person, not two spellings of him:
        // the short name shown must be the profile's first name in that locale.
        const shown = lang === "ar" ? m.ar : m.name;
        expect(g!.name.split(" ")[0], `${m.guideId} in ${lang}`).toBe(shown);
      }
    }
  });

  it("is what the article page renders and marks up", () => {
    const src = readFileSync(join(ROOT, "app", "[lang]", "blog", "[slug]", "page.tsx"), "utf8");
    expect(src).toContain("<TeamByline lang={lang} />");
    expect(src).toMatch(/BLOG_BYLINE\.map\(\(m\) => \(\{\s*"@type": "Person"/);
  });

  it("has a translated 'updated' label in every dictionary", () => {
    for (const lang of LANGS) {
      const d = JSON.parse(readFileSync(join(ROOT, "dictionaries", `${lang}.json`), "utf8"));
      expect(d.blog.updated, lang).toBeTruthy();
    }
  });
});

describe("dates are formatted in the page's language", () => {
  it("nothing hardcodes en-GB date formatting", () => {
    const hits: string[] = [];
    const walk = (dir: string) => {
      for (const f of readdirSync(dir)) {
        const p = join(dir, f);
        if (statSync(p).isDirectory()) walk(p);
        else if (p.endsWith(".tsx") && readFileSync(p, "utf8").includes('toLocaleDateString("en-GB"')) hits.push(p);
      }
    };
    walk(join(ROOT, "app"));
    walk(join(ROOT, "components"));
    expect(hits, "use lib/format-date.ts").toEqual([]);
  });
});
