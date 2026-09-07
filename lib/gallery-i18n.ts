import type { Locale } from "@/app/[lang]/dictionaries";
import { GALLERY_PHOTOS, type GalleryPhotoData } from "./gallery-photos";
import { GALLERY_ALT_FR } from "./gallery-alt.fr";
import { GALLERY_ALT_ES } from "./gallery-alt.es";
import { GALLERY_ALT_DE } from "./gallery-alt.de";
import { GALLERY_ALT_IT } from "./gallery-alt.it";
import { GALLERY_ALT_AR } from "./gallery-alt.ar";

/**
 * Resolve the gallery photo list for a locale.
 *
 * Only the alt text is per-locale. `src`, `group` and `span` are identical
 * everywhere, so the locale files are Record<src, alt> maps overlaid onto the
 * one canonical array rather than six copies of it — six copies would mean six
 * places to edit when a photo is added, and five ways for the order to drift
 * apart unnoticed.
 *
 * WHY THIS EXISTS. Every gallery image carried its English alt string in all
 * six locales. That is three separate problems, none of which fails a build:
 *
 *   - a screen reader on /ar/gallery announced 66 English descriptions inside
 *     an otherwise Arabic page
 *   - the gallery page's ImageObject schema published English descriptions on
 *     every locale, so structured data disagreed with the page's own language
 *   - Google Images had nothing to match a French or Arabic image query
 *     against, on a page whose entire purpose is its images
 *
 * A missing entry falls back to the English string rather than throwing: a
 * newly added photo shows English alt text until it is translated, which is
 * worse than a translation and better than an empty alt or a crash. The test
 * suite fails on any gap, so the fallback is a safety net and not the plan.
 */
const ALT_BY_LOCALE: Record<Locale, Record<string, string> | null> = {
  en: null, // the canonical strings already live on GALLERY_PHOTOS
  fr: GALLERY_ALT_FR,
  es: GALLERY_ALT_ES,
  de: GALLERY_ALT_DE,
  it: GALLERY_ALT_IT,
  ar: GALLERY_ALT_AR,
};

export function galleryPhotosFor(lang: Locale): GalleryPhotoData[] {
  const alts = ALT_BY_LOCALE[lang];
  if (!alts) return GALLERY_PHOTOS;
  return GALLERY_PHOTOS.map((p) => {
    const alt = alts[p.src];
    return alt ? { ...p, alt } : p;
  });
}

/** The alt map for a locale, for tests and for anything that needs to check
 *  coverage without materialising the whole list. */
export function galleryAltMapFor(lang: Locale): Record<string, string> | null {
  return ALT_BY_LOCALE[lang];
}
