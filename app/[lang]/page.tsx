import type { Metadata } from "next";
import { formatPrice } from "@/lib/currency-core";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import CategoryGrid from "@/components/sections/CategoryGrid";
import FeaturedTours from "@/components/sections/FeaturedTours";
import FeaturedGuides from "@/components/sections/FeaturedGuides";
import WhyUs from "@/components/sections/WhyUs";
import MapWrapper from "@/components/map/MapWrapper";
import Testimonials from "@/components/sections/Testimonials";
import OurStory from "@/components/sections/OurStory";
import Gallery from "@/components/sections/Gallery";
import CTABanner from "@/components/sections/CTABanner";
import NewsTeaserSection from "@/components/sections/NewsTeaserSection";
import NewsSectionSkeleton from "@/components/sections/NewsSectionSkeleton";
import { SITE, TRIPADVISOR } from "@/lib/constants";
import { STATS } from "@/lib/stats";
import ZelligeDivider from "@/components/ui/ZelligeDivider";
import JsonLd from "@/components/seo/JsonLd";
import { getDictionary, hasLocale } from "./dictionaries";
import { categoriesFor } from "@/lib/tours-i18n";
import { ogBase } from "@/lib/seo/open-graph";
import { TOURS, lowestGroupPrice } from "@/lib/tours";
type LangParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: {
      // Localised, and shortened from 81 characters. Google truncates SERP
      // titles around 60, so the old version lost "& Cultural Excursions in
      // Morocco" on every result. The description was already localised.
      absolute: dict.seo.home.title,
    },
    // Not hero.subheadline: that is visible display copy and runs to 187
    // characters in French and Spanish, so the homepage snippet was cut
    // mid-sentence. seo.home.description is written for the SERP instead.
    description: dict.seo.home.description,
    openGraph: {
      ...ogBase(lang),
      title: dict.seo.home.title,
      // Not hero.subheadline: that is visible display copy and runs to 187
    // characters in French and Spanish, so the homepage snippet was cut
    // mid-sentence. seo.home.description is written for the SERP instead.
    description: dict.seo.home.description,
      url: `https://marrakechecotours.com/${lang}`,
      // Branded share card on an authentic first-party photo (a real Toubkal
      // summit panorama). Regenerate with: node scripts/build_og_image.mjs
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

// Cheapest per-person group rate to the dearest solo rate, in euros, the
// currency the catalogue is priced in (lib/currency-core.ts). Derived, not
// typed, so a price change cannot leave the schema quoting a range the site
// no longer offers.
const PRICE_RANGE = (() => {
  const lo = Math.min(...TOURS.map((t) => lowestGroupPrice(t).price));
  const hi = Math.max(...TOURS.map((t) => t.price));
  return `${formatPrice(lo, "EUR")}–${formatPrice(hi, "EUR")} per person`;
})();

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // TravelAgency: Google asks for the most specific LocalBusiness subtype
      // (developers.google.com/search/docs/appearance/structured-data/local-business).
      // This was plain LocalBusiness only so it could carry an aggregateRating;
      // see the note where that property used to be.
      "@type": "TravelAgency",
      "@id": "https://marrakechecotours.com/#organization",
      name: "Marrakech Eco Tours",
      url: "https://marrakechecotours.com",
      logo: {
        "@type": "ImageObject",
        url: "https://marrakechecotours.com/icon.png",
        width: 512,
        height: 512,
      },
      image: "https://marrakechecotours.com/icon.png",
      description: "Small-group eco-conscious tours in Morocco led by certified Berber guides. Atlas trekking, Sahara desert nights, cultural excursions. Departing from Marrakech and Agadir.",
      foundingDate: "2010",
      telephone: "+212653936003",
      email: SITE.email,
      address: { "@type": "PostalAddress", ...SITE.postalAddress },
      geo: { "@type": "GeoCoordinates", ...SITE.geo },
      // Computed from the catalogue so it cannot drift from the real prices.
      priceRange: PRICE_RANGE,
      areaServed: { "@type": "Country", name: "Morocco" },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "20:00",
      },
      sameAs: [
        "https://instagram.com/met_morocco",
        "https://facebook.com/marrakechecotours",
        TRIPADVISOR.url,
        /* Atlas Pedals is deliberately NOT here. `sameAs` asserts
           "another official page of THIS organisation"; it is a separate
           brand with its own domain and its own structured data
           declaring its own identity, so claiming it would tell Google
           two organisations are one. The footer link carries the
           referral without the false claim. */
      ],
      /* NO aggregateRating, deliberately (removed 2026-09-28). It used to
         quote the TripAdvisor listing's 5.0 / 122 reviews. Google's review
         snippet guidelines rule that out twice: "Don't aggregate reviews or
         ratings from other websites", and a LocalBusiness/Organization that
         controls reviews about itself is "ineligible for star review
         feature". So it could never show stars, and it carried manual-action
         risk. The rating stays VISIBLE on the page (TripAdvisor badge), which
         is where it earns trust; it just is not structured data. */
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
      <JsonLd data={websiteJsonLd} />
      <Hero lang={lang} dict={dict} />
      <TrustBar dict={dict} />
      <OurStory dict={dict} lang={lang} />
      <FeaturedTours lang={lang} dict={dict} />
      <ZelligeDivider />
      <CategoryGrid dict={dict} lang={lang} categories={categoriesFor(lang)} />
      <WhyUs dict={dict} tourCount={STATS.tourCount} />
      <Testimonials dict={dict} />
      <ZelligeDivider />
      <MapWrapper lang={lang} dict={dict} />
      <FeaturedGuides dict={dict} lang={lang} />
      <Gallery dict={dict} lang={lang} />
      <Suspense fallback={<NewsSectionSkeleton />}>
        <NewsTeaserSection lang={lang} dict={dict} />
      </Suspense>
      <CTABanner lang={lang} dict={dict} tourCount={STATS.tourCount} />
    </>
  );
}
