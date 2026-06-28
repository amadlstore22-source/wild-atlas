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
import ActivityScenes from "@/components/sections/ActivityScenes";
import GuideProfiles from "@/components/sections/GuideProfiles";
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
      url: `https://marrakechecotours.com/${lang}`,
      images: [{ url: "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=1200&q=80", width: 1200, height: 630, alt: "Marrakech Eco Tours — trekking in the Atlas Mountains" }],
    },
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}`,
      languages: {
        en: "https://marrakechecotours.com/en",
        fr: "https://marrakechecotours.com/fr",
        es: "https://marrakechecotours.com/es",
        de: "https://marrakechecotours.com/de",
        it: "https://marrakechecotours.com/it",
        ar: "https://marrakechecotours.com/ar",
        "x-default": "https://marrakechecotours.com/en",
      },
    },
  };
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "LocalBusiness"],
  name: "Marrakech Eco Tours",
  url: "https://marrakechecotours.com",
  logo: "https://marrakechecotours.com/logo.png",
  description:
    "Expert-guided adventure tours in Morocco — trekking, Sahara desert tours, imperial cities, cultural excursions, and day trips from Marrakech and Agadir.",
  email: "hello@marrakechecotours.com",
  telephone: "+212653936003",
  address: {
    "@type": "PostalAddress",
    addressCountry: "MA",
    addressLocality: "Marrakech",
    addressRegion: "Marrakech-Safi",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 31.6295,
    longitude: -7.9811,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "08:00",
    closes: "20:00",
  },
  areaServed: "Worldwide",
  priceRange: "$$",
  currenciesAccepted: "EUR",
  paymentAccepted: "PayPal",
  inLanguage: ["en", "fr", "es", "de", "it", "ar"],
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
      <FeaturedTours lang={lang} dict={dict} />
      <WhyUs dict={dict} />
      <CategoryGrid dict={dict} />
      <ActivityScenes lang={lang} />
      <Testimonials dict={dict} />
      <GuideProfiles lang={lang} />
      <OurStory dict={dict} lang={lang} />
      <MapWrapper lang={lang} />
      <Gallery dict={dict} />
      <Suspense fallback={<NewsSectionSkeleton />}>
        <NewsTeaserSection lang={lang} dict={dict} />
      </Suspense>
      <CTABanner lang={lang} dict={dict} />
    </>
  );
}
