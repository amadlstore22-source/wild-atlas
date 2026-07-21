import type { Locale } from "@/app/[lang]/dictionaries";
import { GUIDES as GUIDES_EN, type Guide } from "./guides";
import { GUIDES as GUIDES_FR } from "./guides.fr";
import { GUIDES as GUIDES_ES } from "./guides.es";
import { GUIDES as GUIDES_DE } from "./guides.de";
import { GUIDES as GUIDES_IT } from "./guides.it";
import { GUIDES as GUIDES_AR } from "./guides.ar";

const BY_LOCALE: Record<Locale, Guide[]> = {
  en: GUIDES_EN,
  fr: GUIDES_FR,
  es: GUIDES_ES,
  de: GUIDES_DE,
  it: GUIDES_IT,
  ar: GUIDES_AR,
};

export function guidesFor(locale: Locale): Guide[] {
  return BY_LOCALE[locale] ?? GUIDES_EN;
}

export function getGuideFor(locale: Locale, id: string): Guide | undefined {
  return guidesFor(locale).find((g) => g.id === id);
}
