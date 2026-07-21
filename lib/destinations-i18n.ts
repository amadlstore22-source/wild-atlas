import type { Locale } from "@/app/[lang]/dictionaries";
import { DESTINATIONS as DESTINATIONS_EN, type Destination } from "./destinations";
import { DESTINATIONS as DESTINATIONS_FR } from "./destinations.fr";
import { DESTINATIONS as DESTINATIONS_ES } from "./destinations.es";
import { DESTINATIONS as DESTINATIONS_DE } from "./destinations.de";
import { DESTINATIONS as DESTINATIONS_IT } from "./destinations.it";
import { DESTINATIONS as DESTINATIONS_AR } from "./destinations.ar";

const BY_LOCALE: Record<Locale, Destination[]> = {
  en: DESTINATIONS_EN,
  fr: DESTINATIONS_FR,
  es: DESTINATIONS_ES,
  de: DESTINATIONS_DE,
  it: DESTINATIONS_IT,
  ar: DESTINATIONS_AR,
};

export function destinationsFor(locale: Locale): Destination[] {
  return BY_LOCALE[locale] ?? DESTINATIONS_EN;
}

export function getDestinationFor(locale: Locale, slug: string): Destination | undefined {
  return destinationsFor(locale).find((d) => d.slug === slug);
}
