import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "../dictionaries";
import { hreflangForPath } from "@/lib/seo/hreflang";
import { toursFor, categoriesFor, tourSlugFor } from "@/lib/tours-i18n";
import ToursClient from "./ToursClient";
import JsonLd from "@/components/seo/JsonLd";
import { collectionPageDocument } from "@/lib/seo/schema";
import { toListItem } from "@/lib/tours";
import { MAP_PLACE_MATCH, goesToPlace } from "@/lib/map-tours";
import { MAP_PLACE_NAME_EN, MAP_PLACE_TEXT } from "@/lib/map-places-i18n";

type ToursPageProps = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string; origin?: string; cat?: string; diff?: string; dur?: string; price?: string; place?: string }>;
};

export async function generateMetadata({ params, searchParams }: ToursPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  // Filter params (origin/cat/diff/dur/price/q) produce thin, duplicate slices
  // of the same tour set. Canonical points at clean /tours; noindex the filtered
  // variants so facet combinations (e.g. ?origin=agadir) don't get indexed.
  const { q, origin, cat, diff, dur, price, place } = await searchParams;
  const isFiltering = Boolean(q || origin || cat || diff || dur || price || place);
  // Read from the dictionary so each locale gets its own title and snippet.
  // These were hardcoded English, so /fr/tours served French content under an
  // English <title> and all six locales competed on one identical string --
  // the same defect already fixed on /about, which this page had kept.
  const dict = await getDictionary(lang);
  return {
    title: dict.seo.tours.title,
    description: dict.seo.tours.description,
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/tours`,
      // The six locale index pages are translations of one another, not
      // duplicates. Without hreflang Google has to guess, and it reported
      // picking its own canonical for pages in this family.
      languages: hreflangForPath(LOCALES, "/tours"),
    },
    ...(isFiltering && { robots: { index: false, follow: true } }),
  };
}

export default async function ToursPage({ params, searchParams }: ToursPageProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { q = "", origin = "", cat = "", diff = "", dur = "", price = "", place = "" } = await searchParams;

  const tours = toursFor(lang);
  // ?place= comes from the homepage map's "See all tours here": the tours
  // that go to that place, matched exactly as the map panel matches them.
  const placeFilter = MAP_PLACE_MATCH[place]
    ? {
        id: place,
        name: MAP_PLACE_TEXT[lang]?.[place]?.name ?? MAP_PLACE_NAME_EN[place] ?? place,
        slugs: tours.filter((t) => goesToPlace(t, place)).map((t) => t.slug),
      }
    : undefined;
  const schema = collectionPageDocument({
    lang,
    path: `/${lang}/tours`,
    name: dict.seo.tours.title,
    description: dict.seo.tours.description,
    items: tours.map((t) => ({ name: t.title, path: `/${lang}/tours/${tourSlugFor(lang, t.slug)}` })),
  });

  return (
    <>
    <JsonLd data={schema} />
    <ToursClient
      lang={lang}
      dict={dict}
      tours={tours.map(toListItem)}
      categories={categoriesFor(lang)}
      initialSearch={q}
      initialOrigin={origin}
      initialCategory={cat}
      initialDifficulty={diff}
      initialDuration={dur}
      initialPrice={price}
      placeFilter={placeFilter}
    />
    </>
  );
}
