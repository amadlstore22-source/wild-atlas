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

export function toursFor(locale: Locale): Tour[] {
  return TOURS_BY_LOCALE[locale] ?? TOURS_EN;
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
