import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
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
  return {
    title: "All Tours — Marrakech Eco Tours | Morocco Adventures",
    description: "Browse 30+ guided tours across Morocco — trekking, Sahara desert, cultural, and day tours from Marrakech and Agadir.",
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/tours`,
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
