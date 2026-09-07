import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { GALLERY_PHOTOS, GALLERY_GROUP_ORDER } from "@/lib/gallery-photos";
import { galleryPhotosFor, galleryAltMapFor } from "@/lib/gallery-i18n";
import type { Locale } from "@/app/[lang]/dictionaries";

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

describe("lightbox control labels", () => {
  /**
   * The lightbox is a modal that traps the page, and its five controls are
   * the whole interface for anyone using a screen reader. All five were
   * hardcoded English on every locale — including Arabic — while three of
   * them (close, previous, next) had sat translated in `common` the entire
   * time with nothing passing them.
   *
   * Nothing catches this: an aria-label is a plain string, so a hardcoded one
   * typechecks, renders and passes every visual review. Only someone browsing
   * in Arabic with a screen reader would ever have found it.
   */
  const CONTROL_KEYS = ["close", "previous", "next", "photoPosition", "viewPhoto"] as const;

  it("every locale carries all five control labels", () => {
    const failures: string[] = [];
    for (const lang of LOCALES) {
      const c = dict(lang).common ?? {};
      for (const key of CONTROL_KEYS) {
        const v = c[key];
        if (typeof v !== "string" || v.trim() === "") {
          failures.push(`${lang}: common.${key} is ${JSON.stringify(v)}`);
        }
      }
    }
    expect(
      failures,
      `These are the accessible names of the lightbox controls. A missing one\n` +
        `falls back to English, which is what this test exists to stop:\n  ` +
        failures.join("\n  ")
    ).toEqual([]);
  });

  it("placeholder labels keep their placeholders", () => {
    const failures: string[] = [];
    for (const lang of LOCALES) {
      const c = dict(lang).common ?? {};
      if (!String(c.photoPosition).includes("{n}")) failures.push(`${lang}: photoPosition has no {n}`);
      if (!String(c.photoPosition).includes("{total}")) failures.push(`${lang}: photoPosition has no {total}`);
      if (!String(c.viewPhoto).includes("{alt}")) failures.push(`${lang}: viewPhoto has no {alt}`);
    }
    expect(
      failures,
      `The lightbox does .replace() on these. Without the placeholder the\n` +
        `number or the photo description never appears in the accessible name:\n  ` +
        failures.join("\n  ")
    ).toEqual([]);
  });

  it("no lightbox aria-label is a hardcoded string literal", () => {
    // The regression itself: catch a plain-string aria-label coming back.
    const src = readFileSync("components/ui/GalleryLightbox.tsx", "utf8");
    const literals = [...src.matchAll(/aria-label="([^"]+)"/g)].map((m) => m[1]);
    expect(
      literals,
      `aria-label must come from the labels prop so it can be translated.\n` +
        `These are hardcoded and will render English in all six locales:\n  ` +
        literals.join("\n  ")
    ).toEqual([]);
  });

  it("both galleries pass labels to the lightbox", () => {
    // A lightbox rendered without the prop silently falls back to English —
    // exactly the state the homepage gallery was in.
    for (const file of [
      "components/sections/Gallery.tsx",
      "components/sections/GalleryPageContent.tsx",
    ]) {
      const src = readFileSync(file, "utf8");
      expect(
        src.includes("<GalleryLightbox") && src.includes("labels="),
        `${file} renders a lightbox without a labels prop, so its controls are English`
      ).toBe(true);
    }
  });
});

describe("gallery alt text localisation", () => {
  /**
   * Every gallery image carried its English alt string in all six locales.
   * Nothing failed: an alt is a plain string, so English text on /ar/gallery
   * typechecks, renders, and passes any visual review. What it actually cost:
   * a screen reader on the Arabic page announced 66 English descriptions, the
   * page's ImageObject schema published English descriptions under an Arabic
   * `inLanguage`, and Google Images had nothing to match a non-English query
   * against — on a page whose entire purpose is its images.
   *
   * galleryPhotosFor() falls back to English for a missing entry rather than
   * throwing, so a newly added photo degrades instead of crashing. This test
   * is what stops that fallback from becoming the permanent state.
   */
  const TRANSLATED: Locale[] = ["fr", "es", "de", "it", "ar"];

  it("every locale translates every photo", () => {
    const failures: string[] = [];
    for (const lang of TRANSLATED) {
      const map = galleryAltMapFor(lang);
      if (!map) {
        failures.push(`${lang}: no alt map at all`);
        continue;
      }
      for (const photo of GALLERY_PHOTOS) {
        const alt = map[photo.src];
        if (typeof alt !== "string" || alt.trim() === "") {
          failures.push(`${lang}: ${photo.src} has no translation`);
        }
      }
    }
    expect(
      failures,
      `These photos fall back to English alt text in a non-English page. Add\n` +
        `each to lib/gallery-alt.<locale>.ts:\n  ` + failures.join("\n  ")
    ).toEqual([]);
  });

  it("no locale carries an entry for a photo that no longer exists", () => {
    // A renamed file leaves an orphan key that silently does nothing, and the
    // photo it was meant for quietly reverts to English.
    const known = new Set(GALLERY_PHOTOS.map((p) => p.src));
    const orphans: string[] = [];
    for (const lang of TRANSLATED) {
      const map = galleryAltMapFor(lang) ?? {};
      for (const src of Object.keys(map)) {
        if (!known.has(src)) orphans.push(`${lang}: ${src}`);
      }
    }
    expect(
      orphans,
      `These alt entries name photos that are not in GALLERY_PHOTOS, so they\n` +
        `are dead and the photo they were written for now renders English:\n  ` +
        orphans.join("\n  ")
    ).toEqual([]);
  });

  it("translations are not English copies", () => {
    const failures: string[] = [];
    for (const lang of TRANSLATED) {
      const map = galleryAltMapFor(lang) ?? {};
      for (const photo of GALLERY_PHOTOS) {
        if (map[photo.src] === photo.alt) {
          failures.push(`${lang}: ${photo.src} is identical to English`);
        }
      }
    }
    expect(
      failures,
      `An alt string identical to English is an untranslated paste:\n  ` +
        failures.join("\n  ")
    ).toEqual([]);
  });

  it("Arabic alt text is actually in Arabic script", () => {
    // The clearest signal a translation was skipped, same reasoning as
    // faq-locale-parity: Latin script in the Arabic file is a paste.
    const map = galleryAltMapFor("ar") ?? {};
    const latin = GALLERY_PHOTOS.filter((p) => !/[؀-ۿ]/.test(map[p.src] ?? "")).map(
      (p) => p.src
    );
    expect(
      latin,
      `These Arabic alt strings contain no Arabic script:\n  ` + latin.join("\n  ")
    ).toEqual([]);
  });

  it("galleryPhotosFor returns the same photos in the same order for every locale", () => {
    // Only alt may differ. If src, group, span or the ordering drift, the grid
    // and the sitemap stop agreeing about what is on the page.
    const en = galleryPhotosFor("en");
    for (const lang of TRANSLATED) {
      const localised = galleryPhotosFor(lang);
      expect(localised.length, `${lang} has a different photo count`).toBe(en.length);
      localised.forEach((p, i) => {
        expect(p.src, `${lang} photo ${i} src drifted`).toBe(en[i].src);
        expect(p.group, `${lang} photo ${i} group drifted`).toBe(en[i].group);
        expect(p.span, `${lang} photo ${i} span drifted`).toBe(en[i].span);
      });
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

  it("every photo the hero reel names exists in the gallery", () => {
    // The hero cycles a hand-picked reel declared in app/[lang]/gallery/page.tsx
    // and resolves each entry against GALLERY_PHOTOS to get its alt text. A
    // renamed or removed file makes that lookup fail — the page's throw turns
    // it into a build error rather than a silently broken hero, but only once
    // someone builds. This names the offender at test time instead.
    const page = readFileSync("app/[lang]/gallery/page.tsx", "utf8");
    const block = page.match(/const HERO_REEL = \[([\s\S]*?)\] as const;/);
    expect(block, "HERO_REEL not found — was it renamed?").toBeTruthy();

    const reel = [...block![1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
    expect(reel.length, "HERO_REEL is empty").toBeGreaterThan(0);

    const known = new Set(GALLERY_PHOTOS.map((p) => p.src));
    const missing = reel.filter((src) => !known.has(src));
    expect(
      missing,
      `HERO_REEL names photos that are not in GALLERY_PHOTOS, so the gallery\n` +
        `page throws on render:\n  ` + missing.join("\n  ")
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
