import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { GALLERY_PHOTOS, GALLERY_GROUP_ORDER } from "@/lib/gallery-photos";

/**
 * The /gallery page reads sixteen strings out of `dict.gallery` and two out of
 * `dict.seo.gallery`, in six locales. `Dictionary` is inferred from
 * dictionaries/en.json alone (app/[lang]/dictionaries.ts), so a key present in
 * English and missing from the other five is invisible to every check the
 * project runs: tsc types it from en.json and passes, the page renders, and
 * `undefined` is a valid React child that prints nothing.
 *
 * The result is a French or Arabic gallery page with blank section headings
 * and a blank intro, shipped and unnoticed. That is the same defect class as
 * faq-locale-parity and the hardcoded-English <title> fixed on /about — both
 * of which reached production for exactly this reason.
 *
 * Also guarded here: every photo carries a `group`, and every group has photos.
 * The page renders one section per entry in GALLERY_GROUP_ORDER and filters the
 * list by group, so a photo added with a typo'd group silently disappears from
 * the page while still being counted in the "66 photographs" line and still
 * being declared in the sitemap — an image submitted to Google against a URL
 * that does not display it.
 */

const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

/** Every `dict.gallery.*` key the gallery page and the homepage section read. */
const GALLERY_KEYS = [
  // homepage section
  "eyebrow",
  "title",
  "subtitle",
  // gallery page
  "pageTitle",
  "pageIntro",
  "photoCount",
  "slideshow",
  "slideshowStop",
  "viewAllTours",
  "groupAtlas",
  "groupAtlasBlurb",
  "groupDesert",
  "groupDesertBlurb",
  "groupCities",
  "groupCitiesBlurb",
  "groupCoast",
  "groupCoastBlurb",
] as const;

function dict(lang: string): Record<string, any> {
  return JSON.parse(readFileSync(`dictionaries/${lang}.json`, "utf8"));
}

describe("gallery page strings", () => {
  it("every locale carries every gallery key, non-empty", () => {
    const failures: string[] = [];
    for (const lang of LOCALES) {
      const g = dict(lang).gallery ?? {};
      for (const key of GALLERY_KEYS) {
        const v = g[key];
        if (typeof v !== "string" || v.trim() === "") {
          failures.push(`${lang}: gallery.${key} is ${JSON.stringify(v)}`);
        }
      }
    }
    expect(
      failures,
      `The gallery page renders these strings directly. A missing one prints\n` +
        `nothing — tsc types Dictionary from en.json only, so it cannot catch a\n` +
        `key that exists in English and not elsewhere. Add each to its locale:\n  ` +
        failures.join("\n  ")
    ).toEqual([]);
  });

  it("every locale carries seo.gallery title and description", () => {
    const failures: string[] = [];
    for (const lang of LOCALES) {
      const seo = dict(lang).seo?.gallery;
      if (!seo?.title?.trim()) failures.push(`${lang}: seo.gallery.title missing`);
      if (!seo?.description?.trim()) failures.push(`${lang}: seo.gallery.description missing`);
    }
    expect(
      failures,
      `Without these the page falls back to an undefined <title>, and all six\n` +
        `locales compete on one string — the defect already fixed on /about:\n  ` +
        failures.join("\n  ")
    ).toEqual([]);
  });

  it("photoCount carries the {count} placeholder in every locale", () => {
    const failures: string[] = [];
    for (const lang of LOCALES) {
      const s = dict(lang).gallery?.photoCount ?? "";
      if (!s.includes("{count}")) failures.push(`${lang}: ${JSON.stringify(s)}`);
    }
    expect(
      failures,
      `The page does photoCount.replace("{count}", …). Without the placeholder\n` +
        `the number never appears and the line reads as a bare noun:\n  ` +
        failures.join("\n  ")
    ).toEqual([]);
  });

  it("translations are not English copies", () => {
    // Arabic is the clearest signal, same reasoning as faq-locale-parity: a
    // Latin-script heading there is an untranslated paste, not a translation.
    const ar = dict("ar").gallery;
    const en = dict("en").gallery;
    for (const key of ["pageTitle", "groupAtlas", "groupDesert", "groupCities", "groupCoast"]) {
      expect(ar[key], `gallery.${key} is identical in Arabic and English`).not.toBe(en[key]);
      expect(
        /[؀-ۿ]/.test(ar[key]),
        `gallery.${key} in Arabic has no Arabic script: ${JSON.stringify(ar[key])}`
      ).toBe(true);
    }
  });
});

describe("gallery photo grouping", () => {
  it("every photo has a group the page renders", () => {
    const orphans = GALLERY_PHOTOS.filter(
      (p) => !GALLERY_GROUP_ORDER.includes(p.group)
    ).map((p) => `${p.src} -> ${JSON.stringify(p.group)}`);
    expect(
      orphans,
      `These photos have a group no section renders, so they are invisible on\n` +
        `/gallery while still being declared to Google in the sitemap. Use one\n` +
        `of: ${GALLERY_GROUP_ORDER.join(", ")}\n  ` +
        orphans.join("\n  ")
    ).toEqual([]);
  });

  it("every rendered group has at least one photo", () => {
    const empty = GALLERY_GROUP_ORDER.filter(
      (g) => !GALLERY_PHOTOS.some((p) => p.group === g)
    );
    expect(
      empty,
      `These groups render a heading and blurb with an empty grid under them:\n  ` +
        empty.join("\n  ")
    ).toEqual([]);
  });

  it("no photo is listed twice", () => {
    const seen = new Map<string, number>();
    for (const p of GALLERY_PHOTOS) seen.set(p.src, (seen.get(p.src) ?? 0) + 1);
    const dupes = [...seen.entries()].filter(([, n]) => n > 1).map(([s, n]) => `${s} x${n}`);
    expect(
      dupes,
      `A duplicated src renders the same photo twice in the grid and twice in\n` +
        `the slideshow, with no error:\n  ` + dupes.join("\n  ")
    ).toEqual([]);
  });

  it("every photo has non-empty alt text", () => {
    const bare = GALLERY_PHOTOS.filter((p) => !p.alt || p.alt.trim().length < 20).map(
      (p) => `${p.src}: ${JSON.stringify(p.alt)}`
    );
    expect(
      bare,
      `Alt text is the caption the lightbox shows, the description in the page's\n` +
        `ImageObject schema, and what Google Images reads. These are missing or\n` +
        `too short to describe a photograph:\n  ` + bare.join("\n  ")
    ).toEqual([]);
  });
});
