import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import CategoryGrid from "@/components/sections/CategoryGrid";
import FeaturedTours from "@/components/sections/FeaturedTours";
import ActivityScenes from "@/components/sections/ActivityScenes";
import WhyUs from "@/components/sections/WhyUs";
import MapWrapper from "@/components/map/MapWrapper";
import Testimonials from "@/components/sections/Testimonials";
import OurStory from "@/components/sections/OurStory";
import Gallery from "@/components/sections/Gallery";
import CTABanner from "@/components/sections/CTABanner";
import HowItWorks from "@/components/sections/HowItWorks";
import NewsTeaserSection from "@/components/sections/NewsTeaserSection";
import NewsSectionSkeleton from "@/components/sections/NewsSectionSkeleton";
import TrailConditions from "@/components/sections/TrailConditions";
import { SITE } from "@/lib/constants";
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
      // TODO: Replace with a real photo at /og-image.jpg once available (currently stock photo)
      images: [{ url: "https://marrakechecotours.com/og-image.jpg", width: 1200, height: 630, alt: "Marrakech Eco Tours — trekking the High Atlas with certified Berber guides" }],
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
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": "https://marrakechecotours.com/#organization",
      name: "Marrakech Eco Tours",
      url: "https://marrakechecotours.com",
      logo: "https://marrakechecotours.com/logo.png",
      description: "Small-group eco-conscious tours in Morocco led by certified Berber guides. Atlas trekking, Sahara desert nights, cultural excursions. Departing from Marrakech and Agadir.",
      foundingDate: "2010",
      telephone: "+212653936003",
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Marrakech",
        addressCountry: "MA",
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
      sameAs: [
        "https://instagram.com/met_morocco",
        "https://facebook.com/marrakechecotours",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        reviewCount: "1000",
        bestRating: "5",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://marrakechecotours.com/#website",
      url: "https://marrakechecotours.com",
      name: "Marrakech Eco Tours",
      publisher: { "@id": "https://marrakechecotours.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://marrakechecotours.com/en/tours?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
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
      <FeaturedTours lang={lang} dict={dict} />
      <TrustBar dict={dict} />
      <HowItWorks dict={dict} />
      <CategoryGrid dict={dict} lang={lang} />
      <ActivityScenes lang={lang} />
      <WhyUs dict={dict} />
      <Testimonials dict={dict} />
      <OurStory dict={dict} lang={lang} />
      <MapWrapper lang={lang} />
      <Suspense fallback={null}>
        <TrailConditions />
      </Suspense>
      <Gallery dict={dict} />
      <Suspense fallback={<NewsSectionSkeleton />}>
        <NewsTeaserSection lang={lang} dict={dict} />
      </Suspense>
      <CTABanner lang={lang} dict={dict} />
    </>
  );
}
