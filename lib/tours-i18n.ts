import type { Locale } from "@/app/[lang]/dictionaries";
import { TOURS as TOURS_EN, type Tour } from "./tours";
import { TOURS as TOURS_FR } from "./tours.fr";
import { TOURS as TOURS_ES } from "./tours.es";
import { TOURS as TOURS_DE } from "./tours.de";
import { TOURS as TOURS_IT } from "./tours.it";
import { TOURS as TOURS_AR } from "./tours.ar";
import { CATEGORIES as CATEGORIES_EN, type Category } from "./tours";
import { CATEGORIES as CATEGORIES_FR } from "./categories.fr";
import { CATEGORIES as CATEGORIES_ES } from "./categories.es";
import { CATEGORIES as CATEGORIES_DE } from "./categories.de";
import { CATEGORIES as CATEGORIES_IT } from "./categories.it";
import { CATEGORIES as CATEGORIES_AR } from "./categories.ar";

const TOURS_BY_LOCALE: Record<Locale, Tour[]> = {
  en: TOURS_EN,
  fr: TOURS_FR,
  es: TOURS_ES,
  de: TOURS_DE,
  it: TOURS_IT,
  ar: TOURS_AR,
};

type CategoryEntry = {
  id: Category;
  label: string;
  icon: string;
  description: string;
  heroImage: string;
};

const CATEGORIES_BY_LOCALE: Record<Locale, CategoryEntry[]> = {
  en: CATEGORIES_EN,
  fr: CATEGORIES_FR,
  es: CATEGORIES_ES,
  de: CATEGORIES_DE,
  it: CATEGORIES_IT,
  ar: CATEGORIES_AR,
};

/** EN tours by slug — the base every locale is layered on top of. */
const EN_BY_SLUG = new Map(TOURS_EN.map((t) => [t.slug, t]));

/**
 * Locale tours, with the EN record as a fallback for any field the translation
 * omits.
 *
 * This used to return the locale array wholesale. That silently dropped every
 * non-editorial field the translator did not copy: `tourType` was set on all 40
 * EN tours but missing from all five locale files, so `tour.tourType ===
 * "private"` was false everywhere and **24 private tours were badged "Shared"
 * in fr/es/de/it/ar** — a factually wrong claim about the product on 5 of 6
 * language versions.
 *
 * Merging per field means a missing translation degrades to the English value
 * instead of to `undefined`, and any future field added to EN cannot vanish
 * from the other locales. Editorial fields the translator DID provide still win.
 */
function mergeWithEn(list: Tour[]): Tour[] {
  return list.map((t) => {
    const en = EN_BY_SLUG.get(t.slug);
    if (!en) return t;
    // Start from the EN record so every field is present and correctly typed,
    // then overlay only the keys the translation actually supplies.
    const merged: Tour = { ...en };
    for (const key of Object.keys(t) as (keyof Tour)[]) {
      const value = t[key];
      if (value !== undefined && value !== null && value !== "") {
        (merged as Record<keyof Tour, unknown>)[key] = value;
      }
    }
    return merged;
  });
}

const TOURS_MERGED: Record<Locale, Tour[]> = {
  en: TOURS_EN,
  fr: mergeWithEn(TOURS_BY_LOCALE.fr),
  es: mergeWithEn(TOURS_BY_LOCALE.es),
  de: mergeWithEn(TOURS_BY_LOCALE.de),
  it: mergeWithEn(TOURS_BY_LOCALE.it),
  ar: mergeWithEn(TOURS_BY_LOCALE.ar),
};

export function toursFor(locale: Locale): Tour[] {
  return TOURS_MERGED[locale] ?? TOURS_EN;
}

export function getTourFor(locale: Locale, slug: string): Tour | undefined {
  return toursFor(locale).find((t) => t.slug === slug);
}

export function getFeaturedToursFor(locale: Locale): Tour[] {
  return toursFor(locale).filter((t) => t.featured);
}

export function getToursByCategoryFor(locale: Locale, category: Category): Tour[] {
  const tours = toursFor(locale);
  if (category === "day-tours") {
    return tours.filter((t) => t.category === "day-tours" || t.isDayTour);
  }
  return tours.filter((t) => t.category === category);
}

export function categoriesFor(locale: Locale): CategoryEntry[] {
  return CATEGORIES_BY_LOCALE[locale] ?? CATEGORIES_EN;
}

export function getCategoryFor(locale: Locale, id: Category): CategoryEntry | undefined {
  return categoriesFor(locale).find((c) => c.id === id);
}
