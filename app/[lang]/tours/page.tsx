import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "../dictionaries";
import { hreflangForPath } from "@/lib/seo/hreflang";
import { toursFor, categoriesFor } from "@/lib/tours-i18n";
import ToursClient from "./ToursClient";

type ToursPageProps = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string; origin?: string; cat?: string; diff?: string; dur?: string; price?: string }>;
};

export async function generateMetadata({ params, searchParams }: ToursPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  // Filter params (origin/cat/diff/dur/price/q) produce thin, duplicate slices
  // of the same tour set. Canonical points at clean /tours; noindex the filtered
  // variants so facet combinations (e.g. ?origin=agadir) don't get indexed.
  const { q, origin, cat, diff, dur, price } = await searchParams;
  const isFiltering = Boolean(q || origin || cat || diff || dur || price);
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
  const { q = "", origin = "", cat = "", diff = "", dur = "", price = "" } = await searchParams;

  return (
    <ToursClient
      lang={lang}
      dict={dict}
      tours={toursFor(lang)}
      categories={categoriesFor(lang)}
      initialSearch={q}
      initialOrigin={origin}
      initialCategory={cat}
      initialDifficulty={diff}
      initialDuration={dur}
      initialPrice={price}
    />
  );
}
