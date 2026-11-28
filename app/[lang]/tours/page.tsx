import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "../dictionaries";
import { pickDict } from "@/lib/dict-slice";
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
};

// PRERENDERED (2026-11-27). This page used to read searchParams on the
// server, which made it render on every request (no-store, never cached).
// The filters (?q, origin, cat, diff, dur, price, place) are now read in the
// browser by ToursClient. Filtered URLs are still kept out of the index:
// proxy.ts sends "X-Robots-Tag: noindex, follow" for them, since a
// prerendered page cannot vary its <meta robots> by query string.

export async function generateMetadata({ params }: ToursPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
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
  };
}

export default async function ToursPage({ params }: ToursPageProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const tours = toursFor(lang);
  // ?place= comes from the homepage map's "See all tours here": the tours
  // that go to that place, matched exactly as the map panel matches them.
  // Every place is resolved here so the browser only looks one up.
  const places = Object.fromEntries(
    Object.keys(MAP_PLACE_MATCH).map((id) => [
      id,
      {
        name: MAP_PLACE_TEXT[lang]?.[id]?.name ?? MAP_PLACE_NAME_EN[id] ?? id,
        slugs: tours.filter((t) => goesToPlace(t, id)).map((t) => t.slug),
      },
    ])
  );
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
      dict={pickDict(dict, "categories", "common", "featuredTours", "hero", "tours")}
      tours={tours.map(toListItem)}
      categories={categoriesFor(lang)}
      places={places}
    />
    </>
  );
}
