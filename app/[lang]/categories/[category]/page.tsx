import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { CATEGORIES, getToursByCategory, type Category } from "@/lib/tours";
import TourCard from "@/components/ui/TourCard";
import CTABanner from "@/components/sections/CTABanner";
import { getDictionary, hasLocale } from "../../dictionaries";
type CategoryParams = { params: Promise<{ lang: string; category: string }> };

export async function generateStaticParams() {
  return CATEGORIES.flatMap((c) =>
    ["en", "fr", "es", "de", "it", "ar"].map((lang) => ({ lang, category: c.id }))
  );
}

export async function generateMetadata({ params }: CategoryParams): Promise<Metadata> {
  const { category, lang } = await params;
  const cat = CATEGORIES.find((c) => c.id === category);
  if (!cat) return {};
  const LOCALES = ["en", "fr", "es", "de", "it", "ar"];
  return {
    title: `${cat.label} Adventures in Morocco — Marrakech Eco Tours`,
    description: cat.description,
    openGraph: { title: `${cat.label} — Marrakech Eco Tours`, description: cat.description, images: [{ url: cat.heroImage }] },
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/categories/${category}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `https://marrakechecotours.com/${l}/categories/${category}`])
      ),
    },
  };
}

export default async function CategoryPage({ params }: CategoryParams) {
  const { category, lang } = await params;
  if (!hasLocale(lang)) notFound();
  const cat = CATEGORIES.find((c) => c.id === category);
  if (!cat) notFound();
  const dict = await getDictionary(lang);

  const tours = getToursByCategory(cat.id as Category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${cat.label} Tours Morocco — Marrakech Eco Tours`,
    description: cat.description,
    itemListElement: tours.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://marrakechecotours.com/${lang}/tours/${t.slug}`,
      name: t.title,
    })),
  };

  const toursAvailable = tours.length === 1
    ? dict.tours.toursFound.replace("{count}", String(tours.length))
    : dict.tours.toursFoundPlural.replace("{count}", String(tours.length));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <div className="relative h-[55vh] min-h-[380px] flex items-end">
        <Image src={cat.heroImage} alt={cat.label} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <span className="text-5xl block mb-3">{cat.icon}</span>
          <h1 className="font-display text-white text-6xl lg:text-7xl font-bold leading-tight">{cat.label}</h1>
          <p className="text-white/70 mt-3 text-xl max-w-2xl">{cat.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {tours.length === 0 ? (
          <p className="text-ink-soft text-center py-20">No tours in this category yet — check back soon!</p>
        ) : (
          <>
            <p className="text-ink-soft text-sm mb-8">{toursAvailable}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour) => <TourCard key={tour.id} tour={tour} lang={lang} dict={dict} />)}
            </div>
          </>
        )}
      </div>

      <CTABanner lang={lang} dict={dict} />
    </>
  );
}
