import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TOURS, DIFFICULTY_COLORS } from "@/lib/tours";
import { getTourFor } from "@/lib/tours-i18n";
import { Clock, UsersThree, CheckCircle, XCircle, MapPin, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import BookingSidebar from "@/components/tours/BookingSidebar";
import TripAdvisorBadge from "@/components/ui/TripAdvisorBadge";
import { TRIPADVISOR } from "@/lib/constants";
import TourGallery from "@/components/tours/TourGallery";
import TourItinerary from "@/components/tours/TourItinerary";
import TourWeather from "@/components/tours/TourWeather";
import RelatedTours from "@/components/tours/RelatedTours";
import TourNavBar from "@/components/tours/TourNavBar";
import JsonLd from "@/components/seo/JsonLd";
import FaqSection from "@/components/seo/FaqSection";
import { faqPageDocument } from "@/lib/seo/schema";
import { Suspense } from "react";
import { getDictionary, hasLocale } from "../../dictionaries";
import { tourIncludesFor } from "@/lib/tour-includes-i18n";
// Import from currency-core, not currency: the latter is "use client" and its
// constants read as undefined during server render.
import { DEFAULT_CURRENCY, CURRENCY_SYMBOL, priceIn } from "@/lib/currency-core";
type TourParams = { params: Promise<{ lang: string; slug: string }> };

/** Tour prices are stored in USD but the site displays EUR by default. Google
 *  compares structured-data prices against the visible page, so the schema must
 *  quote the same currency a visitor actually sees, not the storage unit. */
const schemaPrice = (usd: number) => String(priceIn(usd, DEFAULT_CURRENCY));

/**
 * Tour seoDescription strings end with a hardcoded "From $380." written in the
 * storage currency (USD). That sentence is what Google prints as the meta
 * description, so it advertised a price the page never charges once the site
 * defaulted to EUR. Rewrite it from the same source as every other price rather
 * than hand-editing 32 strings that would drift on the next rate change.
 */
function localisePrice(text: string | undefined, usd: number): string | undefined {
  if (!text) return text;
  const shown = `${CURRENCY_SYMBOL[DEFAULT_CURRENCY]}${priceIn(usd, DEFAULT_CURRENCY).toLocaleString("en-US")}`;
  return text.replace(/\$[\d,]+/g, shown);
}

export async function generateStaticParams() {
  return TOURS.flatMap((t) =>
    ["en", "fr", "es", "de", "it", "ar"].map((lang) => ({ lang, slug: t.slug }))
  );
}

export async function generateMetadata({ params }: TourParams): Promise<Metadata> {
  const { slug, lang } = await params;
  if (!hasLocale(lang)) return {};
  const tour = getTourFor(lang, slug);
  if (!tour) return {};
  const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;
  return {
    title: tour.seoTitle ?? `${tour.title} | Marrakech Eco Tours`,
    description: localisePrice(tour.seoDescription, tour.price) ?? tour.shortDescription,
    openGraph: {
      title: tour.title,
      description: tour.shortDescription,
      images: [{ url: tour.heroImage, width: 1400, height: 900, alt: tour.title }],
    },
    // Tour copy is now translated per locale (title/description/itinerary/
    // includes-excludes), so each locale gets its own canonical URL and full
    // hreflang alternates rather than collapsing to /en.
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/tours/${slug}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `https://marrakechecotours.com/${l}/tours/${slug}`])
      ),
    },
  };
}

export default async function TourDetailPage({ params }: TourParams) {
  const { slug, lang } = await params;
  if (!hasLocale(lang)) notFound();
  const tour = getTourFor(lang, slug);
  if (!tour) notFound();
  const dict = await getDictionary(lang);
  const { includes, excludes } = await tourIncludesFor(lang, tour);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tour.title,
    description: localisePrice(tour.seoDescription, tour.price) ?? tour.shortDescription,
    url: `https://marrakechecotours.com/${lang}/tours/${tour.slug}`,
    image: tour.heroImage,
    brand: { "@type": "Brand", name: "Marrakech Eco Tours" },
    offers: {
      "@type": "Offer",
      priceCurrency: DEFAULT_CURRENCY,
      price: schemaPrice(tour.price),
      availability: "https://schema.org/InStock",
      url: `https://marrakechecotours.com/${lang}/tours/${tour.slug}`,
    },
    // No aggregateRating: we have no per-tour review corpus to substantiate one.
    // Our verifiable rating is business-wide (TripAdvisor, see Organization
    // schema on the homepage), so claiming per-product ratings here would be
    // unsubstantiated review markup. Reinstate only when real per-tour reviews exist.
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.shortDescription,
    touristType: "Adventure",
    offers: { "@type": "Offer", price: schemaPrice(tour.price), priceCurrency: DEFAULT_CURRENCY, availability: "https://schema.org/InStock", url: `https://marrakechecotours.com/${lang}/tours/${tour.slug}` },
    provider: { "@type": "TravelAgency", name: "Marrakech Eco Tours", url: "https://marrakechecotours.com" },
    image: tour.gallery,
    duration: tour.duration,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://marrakechecotours.com/${lang}` },
      { "@type": "ListItem", position: 2, name: "Tours", item: `https://marrakechecotours.com/${lang}/tours` },
      { "@type": "ListItem", position: 3, name: tour.title, item: `https://marrakechecotours.com/${lang}/tours/${tour.slug}` },
    ],
  };

  // FAQPage only when the tour carries hand-written Q&A that also renders
  // visibly below. This previously synthesised four questions from includes/
  // difficulty/price/meetingPoint and emitted them with no on-page counterpart,
  // which is a Google FAQPage guideline violation — schema must mirror content
  // the user can actually see.
  const faqJsonLd = tour.faq?.length ? faqPageDocument(tour.faq) : null;

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}

      <TourNavBar dict={dict} />

      <div className="relative h-[60vh] min-h-[420px] bg-cover bg-center flex items-end">
        <Image src={tour.heroImage} alt={tour.title} fill className="object-cover" priority sizes="100vw" />
        {/* Scrim: darker at the bottom where the title/meta sit, plus a top wash
            so breadcrumbs stay legible on light images (sand, snow). */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/92 via-indigo-deep/55 to-indigo-deep/25" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <nav className="flex items-center gap-2 text-white/65 text-sm mb-4">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">{dict.common.home}</Link>
            <CaretRight className="w-4 h-4" />
            <Link href={`/${lang}/tours`} className="hover:text-white transition-colors">{dict.nav.tours}</Link>
            <CaretRight className="w-4 h-4" />
            <span className="text-white capitalize">{tour.category}</span>
          </nav>
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge className="rounded-[3px] bg-white/20 backdrop-blur-sm text-white border-0 text-sm font-medium capitalize hover:bg-white/25">
              {tour.category}
            </Badge>
            <Badge className={`rounded-[3px] capitalize border-0 shadow-sm ${DIFFICULTY_COLORS[tour.difficulty]}`}>
              {tour.difficulty}
            </Badge>
          </div>
          <h1 className="hero-title font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight max-w-3xl">{tour.title}</h1>
          <div className="flex flex-wrap gap-6 mt-4 text-white/75 text-sm">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{tour.duration}</span>
            <span className="flex items-center gap-1.5"><UsersThree className="w-4 h-4" />{tour.groupSize}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{tour.meetingPoint.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-28 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <TourGallery images={tour.gallery} title={tour.title} />

            <section id="tour-overview" className="scroll-mt-32">
              <h2 className="font-display text-ink text-3xl font-bold mb-4">{dict.tourDetail.overview}</h2>
              <p className="text-ink-soft text-lg leading-relaxed mb-6">{tour.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tour.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2 p-3 rounded-[3px] bg-surface-sunk/50">
                    <CheckCircle className="w-5 h-5 text-indigo shrink-0 mt-0.5" />
                    <span className="text-ink/85 text-sm">{h}</span>
                  </div>
                ))}
              </div>
            </section>

            <div id="tour-itinerary" className="scroll-mt-32">
              <TourItinerary itinerary={tour.itinerary} dict={dict} />
            </div>

            <section id="tour-included" className="scroll-mt-32">
              <h2 className="font-display text-ink text-3xl font-bold mb-6">{dict.tourDetail.whatsIncluded}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-indigo mb-3 text-sm uppercase tracking-widest">{dict.tourDetail.included}</h3>
                  <ul className="space-y-2">
                    {includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                        <CheckCircle className="w-4 h-4 text-indigo shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-ink-soft mb-3 text-sm uppercase tracking-widest">{dict.tourDetail.notIncluded}</h3>
                  <ul className="space-y-2">
                    {excludes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                        <XCircle className="w-4 h-4 text-ink-muted shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {tour.faq && tour.faq.length > 0 && (
              <div id="tour-faq" className="scroll-mt-32">
                <FaqSection faq={tour.faq} />
              </div>
            )}
          </div>

          <div id="tour-book" className="lg:col-span-1 scroll-mt-32">
            <div className="sticky top-24">
              <BookingSidebar tour={tour} lang={lang} dict={dict} />

              {/* Real, verifiable social proof. Business-wide TripAdvisor rating,
                  attributed and linked out so a visitor can check it themselves. */}
              <div className="mt-4 rounded-[4px] border border-rule bg-card p-4">
                <p className="text-xs text-ink-muted mb-2.5 leading-snug">
                  {dict.tourDetail.tripAdvisorLine.replace("{rating}", TRIPADVISOR.rating.toFixed(1))}
                </p>
                <TripAdvisorBadge variant="compact" />
              </div>

              <Suspense fallback={null}>
                <TourWeather tour={tour} dict={dict} />
              </Suspense>
              <div className="mt-4 bg-indigo rounded-[4px] p-5 text-white">
                <h3 className="font-display text-base font-bold mb-2">{dict.tourDetail.planYourTrip}</h3>
                <p className="text-white/75 text-xs mb-3 leading-relaxed">{dict.tourDetail.sidebarDesc}</p>
                <Link href={`/${lang}/contact`} className="block text-center px-4 py-2.5 rounded-[3px] bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-colors">
                  {dict.tourDetail.planCustomTrip}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedTours currentSlug={tour.slug} category={tour.category} lang={lang} dict={dict} />
    </>
  );
}
