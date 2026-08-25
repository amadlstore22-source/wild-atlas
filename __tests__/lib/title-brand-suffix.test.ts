import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..", "..");
const BRAND = "Marrakech Eco Tours";
const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

/**
 * The layout's `title.template` already appends "| Marrakech Eco Tours", so a
 * page that also names the brand in its own title renders it twice:
 * "Leave a Review — Marrakech Eco Tours | Marrakech Eco Tours".
 *
 * That shipped on the review page in all six locales and on the 404 page. It
 * is easy to reintroduce because the brand reads naturally inside a hand-
 * written title, and nothing about it fails typecheck or the build. The tour
 * and blog pages already strip a trailing brand for the same reason.
 */
describe("titles do not repeat the brand", () => {
  it("no dictionary metaTitle carries the brand suffix", () => {
    const offenders: string[] = [];
    for (const loc of LOCALES) {
      const dict = JSON.parse(
        readFileSync(join(ROOT, "dictionaries", `${loc}.json`), "utf8")
      ) as Record<string, Record<string, string> | undefined>;

      for (const [section, body] of Object.entries(dict)) {
        if (!body || typeof body !== "object") continue;
        for (const [key, value] of Object.entries(body)) {
          if (typeof value !== "string") continue;
          if (!/^(metaTitle|title)$/.test(key)) continue;
          if (value.includes(BRAND)) offenders.push(`${loc}.${section}.${key}`);
        }
      }
    }
    expect(
      offenders,
      "These titles name the brand, which the layout template appends again.\n" +
        "Drop the brand from the string:\n  " +
        offenders.join("\n  ")
    ).toEqual([]);
  });
});

/**
 * app/[lang]/review/page.tsx reads dict.review.* with English fallbacks. No
 * dictionary defined the key, so all six locales silently served English and
 * the page's <title> was one of the duplicate titles the metadata audit
 * flagged. Fallbacks make that failure invisible -- the page renders fine.
 */
describe("review page copy is defined for every locale", () => {
  const FIELDS = [
    "metaTitle", "metaDesc", "eyebrow", "heading", "sub",
    "matterTitle", "matterBody", "tripadvisor", "google", "whatsapp", "thanks",
  ];

  for (const loc of LOCALES) {
    it(`${loc} defines every review field`, () => {
      const dict = JSON.parse(
        readFileSync(join(ROOT, "dictionaries", `${loc}.json`), "utf8")
      );
      const missing = FIELDS.filter((f) => !dict.review?.[f]);
      expect(missing, `dictionaries/${loc}.json is missing review.*`).toEqual([]);
    });
  }

  it("non-English review copy is actually translated", () => {
    const en = JSON.parse(
      readFileSync(join(ROOT, "dictionaries", "en.json"), "utf8")
    ).review;

    const same: string[] = [];
    for (const loc of LOCALES.filter((l) => l !== "en")) {
      const d = JSON.parse(
        readFileSync(join(ROOT, "dictionaries", `${loc}.json`), "utf8")
      ).review;
      for (const f of FIELDS) {
        // Brand and proper nouns are legitimately identical; prose is not.
        if (["tripadvisor", "google"].includes(f)) continue;
        if (d?.[f] && d[f] === en[f]) same.push(`${loc}.review.${f}`);
      }
    }
    expect(same, `untranslated review copy:\n  ${same.join("\n  ")}`).toEqual([]);
  });
});

/** The dictionary must not silently drift from the page's fallback values. */
describe("English dictionary matches the page fallbacks", () => {
  it("every review fallback equals the en.json value", () => {
    const page = readFileSync(
      join(ROOT, "app", "[lang]", "review", "page.tsx"),
      "utf8"
    );
    const en = JSON.parse(
      readFileSync(join(ROOT, "dictionaries", "en.json"), "utf8")
    ).review;

    const drift: string[] = [];
    for (const [key, value] of Object.entries(en)) {
      const marker = `${key}: d.${key} ?? "`;
      const at = page.indexOf(marker);
      if (at < 0) continue; // field has no fallback; nothing to compare
      const start = at + marker.length;
      const end = page.indexOf('"', start);
      const fallback = page.slice(start, end);
      if (fallback !== value) drift.push(`${key}: page="${fallback}" dict="${value}"`);
    }
    expect(drift, `review fallback drift:\n  ${drift.join("\n  ")}`).toEqual([]);
  });
});

/** Sanity: no page file hardcodes the brand into its own metadata title. */
describe("page metadata does not hardcode the brand into title", () => {
  function walk(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const p = join(dir, e.name);
      if (e.isDirectory()) return walk(p);
      return e.name === "page.tsx" || e.name === "not-found.tsx" ? [p] : [];
    });
  }

  it("no `title: \"... Marrakech Eco Tours\"` literal in app/", () => {
    const offenders: string[] = [];
    for (const file of walk(join(ROOT, "app"))) {
      const src = readFileSync(file, "utf8");
      // Only a literal assigned straight to `title:` -- seoTitle values are
      // stripped of the suffix at render time and are fine.
      const m = src.match(/\n\s+title: "[^"]*Marrakech Eco Tours[^"]*"/);
      if (m) offenders.push(file.replace(ROOT, "").replace(/\\/g, "/"));
    }
    expect(
      offenders,
      "These files put the brand in a literal title; the layout appends it:\n  " +
        offenders.join("\n  ")
    ).toEqual([]);
  });
});
