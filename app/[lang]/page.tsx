import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import CategoryGrid from "@/components/sections/CategoryGrid";
import FeaturedTours from "@/components/sections/FeaturedTours";
import WhyUs from "@/components/sections/WhyUs";
import OurStory from "@/components/sections/OurStory";
import MapWrapper from "@/components/map/MapWrapper";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import CTABanner from "@/components/sections/CTABanner";
import NewsTeaserSection from "@/components/sections/NewsTeaserSection";
import NewsSectionSkeleton from "@/components/sections/NewsSectionSkeleton";
import { getDictionary, hasLocale } from "./dictionaries";
type LangParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: "Marrakech Eco Tours — Trekking, Desert Tours & Cultural Excursions in Morocco",
    description: dict.hero.subheadline,
    openGraph: {
      title: "Marrakech Eco Tours — Morocco Adventures",
      description: dict.hero.subheadline,
      images: [{ url: "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1200&q=80" }],
    },
    alternates: {
      languages: {
        en: "/en",
        fr: "/fr",
        es: "/es",
        de: "/de",
        it: "/it",
        ar: "/ar",
      },
    },
  };
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Marrakech Eco Tours",
  url: "https://marrakechecotours.com",
  description:
    "Expert-guided adventure tours in Morocco — trekking, Sahara desert tours, imperial cities, cultural excursions, and day trips from Marrakech and Agadir.",
  email: "hello@marrakechecotours.com",
  telephone: "+212600000000",
  address: {
    "@type": "PostalAddress",
    addressCountry: "MA",
    addressLocality: "Marrakech",
  },
  areaServed: "Worldwide",
  priceRange: "$$",
};

export default async function HomePage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero lang={lang} dict={dict} />
      <TrustBar dict={dict} />
      <OurStory dict={dict} lang={lang} />
      <CategoryGrid dict={dict} />
      <FeaturedTours lang={lang} dict={dict} />
      <WhyUs dict={dict} />
      <MapWrapper lang={lang} />
      <Testimonials dict={dict} />
      <Suspense fallback={<NewsSectionSkeleton />}>
        <NewsTeaserSection lang={lang} dict={dict} />
      </Suspense>
      <Gallery dict={dict} />
      <CTABanner lang={lang} dict={dict} />
    </>
  );
}
