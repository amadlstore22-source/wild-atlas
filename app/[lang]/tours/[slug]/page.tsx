import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TOURS, DIFFICULTY_COLORS, lowestGroupPrice, groupPriceTiers, type Tour } from "@/lib/tours";
import { getTourFor, tourSlugFor } from "@/lib/tours-i18n";
import { Clock, UsersThree, CheckCircle, XCircle, MapPin, CaretRight } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import BookingSidebar from "@/components/tours/BookingSidebar";
import TripAdvisorBadge from "@/components/ui/TripAdvisorBadge";
import { TRIPADVISOR } from "@/lib/constants";
import TourGallery from "@/components/tours/TourGallery";
import TourItinerary from "@/components/tours/TourItinerary";
import TourBrief from "@/components/tours/TourBrief";
import RefugeNotice from "@/components/tours/RefugeNotice";
import DurationChooser from "@/components/tours/DurationChooser";
import TourWeather from "@/components/tours/TourWeather";
import RelatedTours from "@/components/tours/RelatedTours";
import RelatedGuides from "@/components/tours/RelatedGuides";
import RouteMap, { hasRouteMap } from "@/components/map/RouteMap";
import TourLocationMap from "@/components/map/TourLocationMap";
import tourRoutes from "@/lib/tour-routes.json";
import { localeTag } from "@/lib/events-format";
import TourNavBar from "@/components/tours/TourNavBar";
import TourTrustBar from "@/components/tours/TourTrustBar";
import TourGuideBlock from "@/components/tours/TourGuideBlock";
import ZelligeDivider from "@/components/ui/ZelligeDivider";
import JsonLd from "@/components/seo/JsonLd";
import FaqSection from "@/components/seo/FaqSection";
import { faqPageDocument, priceValidUntil, buildAggregateOffer, absoluteUrl, buildReviewNodes } from "@/lib/seo/schema";
import { REVIEWS } from "@/lib/reviews";
import { Suspense } from "react";
import { getDictionary, hasLocale } from "../../dictionaries";
import { tourIncludesFor } from "@/lib/tour-includes-i18n";
// Import from currency-core, not currency: the latter is "use client" and its
// constants read as undefined during server render.
import { DEFAULT_CURRENCY, priceIn } from "@/lib/currency-core";
import { hreflangLanguages } from "@/lib/seo/hreflang";
import { ogBase } from "@/lib/seo/open-graph";
type TourParams = { params: Promise<{ lang: string; slug: string }> };

/*
 * Tour seoDescription strings quote their price in euros, the currency the
 * prices are set in (lib/currency-core.ts), so they are used as written. They
 * were once written in USD and rewritten here at render time; since
 * 2026-09-29 the stored figure IS the euro one, and currency.test.ts checks
 * every description's price against its tour in all six locales.
 */

export async function generateStaticParams() {
  // Each locale is prerendered at its OWN URL segment. Emitting t.slug for every
  // locale would prerender only the English spelling, leaving the localised URL
  // to render on demand — and the sitemap points at the localised one.
  return TOURS.flatMap((t) =>
    (["en", "fr", "es", "de", "it", "ar"] as const).map((lang) => ({
      lang,
      slug: tourSlugFor(lang, t.slug),
    }))
  );
}

export async function generateMetadata({ params }: TourParams): Promise<Metadata> {
  const { slug, lang } = await params;
  if (!hasLocale(lang)) return {};
  const tour = getTourFor(lang, slug);
  if (!tour) return {};
  const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;
  return {
    // seoTitle already ends in "| Marrakech Eco Tours"; strip it so the layout
    // template appends the brand exactly once (was producing a double suffix:
    // "... | Marrakech Eco Tours | Marrakech Eco Tours").
    title: (tour.seoTitle ?? tour.title).replace(/\s*\|\s*Marrakech Eco Tours\s*$/, ""),
    description: tour.seoDescription ?? tour.shortDescription,
    openGraph: {
      ...ogBase(lang),
      title: tour.title,
      description: tour.shortDescription,
      images: [{ url: tour.heroImage, width: 1400, height: 900, alt: tour.title }],
    },
    // Tour copy is now translated per locale (title/description/itinerary/
    // includes-excludes), so each locale gets its own canonical URL and full
    // hreflang alternates rather than collapsing to /en.
    // Built from the RESOLVED tour, not the incoming `slug`: a request may
    // arrive on either spelling, and the canonical must always name this
    // locale's own segment. Each alternate likewise uses that locale's segment,
    // or the cluster points at URLs that redirect and Google discards it.
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/tours/${tourSlugFor(lang, tour.slug)}`,
      languages: hreflangLanguages(
        LOCALES,
        (l) => `https://marrakechecotours.com/${l}/tours/${tourSlugFor(l, tour.slug)}`
      ),
    },
  };
}

/** Departure cities, for the route map's first dot. Coordinates match
 *  scripts/build-route-maps.mjs, which routes day trips from here. */
const ORIGINS: Record<string, { lat: number; lng: number; name: Record<string, string> }> = {
  marrakech: { lat: 31.6295, lng: -7.9811, name: { en: "Marrakech", fr: "Marrakech", es: "Marrakech", de: "Marrakesch", it: "Marrakech", ar: "مراكش" } },
  agadir: { lat: 30.4278, lng: -9.5981, name: { en: "Agadir", fr: "Agadir", es: "Agadir", de: "Agadir", it: "Agadir", ar: "أكادير" } },
  casablanca: { lat: 33.5945, lng: -7.62, name: { en: "Casablanca", fr: "Casablanca", es: "Casablanca", de: "Casablanca", it: "Casablanca", ar: "الدار البيضاء" } },
};

/**
 * Start and stops for the route map, in the order the build script routed them:
 * a tour with stops starts at its meeting point; a day trip with none starts
 * in its city and goes to the meeting place; a tour in town is one dot. The
 * meeting point is named after its city when it is in it ("Marrakech", not
 * "Marrakech — your hotel or riad"), otherwise by its first part ("Imlil Village").
 */
function routeMapPlaces(tour: Tour, lang: string) {
  const origin = ORIGINS[tour.origin];
  // Coordinates from the English tour too; only the label is translated.
  const near = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) =>
    Math.hypot(a.lat - b.lat, (a.lng - b.lng) * Math.cos((a.lat * Math.PI) / 180)) * 111 < 5;
  const mp = { ...(TOURS.find((t) => t.slug === tour.slug) ?? tour).meetingPoint, name: tour.meetingPoint.name };
  const meeting = {
    name: origin && near(mp, origin) ? origin.name[lang] ?? origin.name.en : mp.name.split(/,| — | -- /)[0].trim(),
    lat: mp.lat,
    lng: mp.lng,
  };
  // Positions and order come from the English tour, which the build script
  // routed: five tours per translation carry fewer stops (or none) in their
  // translated itinerary, and the map fell back to a day-trip layout for them.
  // Translated stop NAMES are used where the two lists line up.
  const stopsOf = (t: Tour) => t.itinerary.flatMap((d) => [...(d.extraStops ?? []), ...(d.stop ? [d.stop] : [])]);
  const base = TOURS.find((t) => t.slug === tour.slug) ?? tour;
  const local = stopsOf(tour);
  const baseStops = stopsOf(base);
  const stops = baseStops.map((s, i) => (local.length === baseStops.length ? { ...s, name: local[i].name } : s));
  // Meeting point that IS the first stop under another label: start at the
  // stop (same rule as scripts/build-route-maps.mjs, decided on the English data).
  const baseFirst = baseStops[0];
  if (stops.length && baseFirst && base.meetingPoint.name.split(/,| — | -- /)[0].trim() === baseFirst.name)
    return { start: stops[0], stops: stops.slice(1) };
  if (stops.length) return { start: meeting, stops };
  if (origin && !near(mp, origin)) return { start: { name: origin.name[lang] ?? origin.name.en, lat: origin.lat, lng: origin.lng }, stops: [meeting] };
  return { start: meeting, stops: [] };
}

export default async function TourDetailPage({ params }: TourParams) {
  const { slug, lang } = await params;
  if (!hasLocale(lang)) notFound();
  const tour = getTourFor(lang, slug);
  if (!tour) notFound();
  const dict = await getDictionary(lang);
  const { includes, excludes } = await tourIncludesFor(lang, tour);
  // One value shared by both Offer nodes below, so they cannot drift apart.
  const validUntil = priceValidUntil();
  // The ladder, not the solo rate: see buildAggregateOffer's docblock. Built
  // once and shared by both nodes for the same anti-drift reason as validUntil.
  const cheapest = lowestGroupPrice(tour);
  const tourUrl = `https://marrakechecotours.com/${lang}/tours/${tourSlugFor(lang, tour.slug)}`;
  const offer = buildAggregateOffer({
    low: priceIn(cheapest.price, DEFAULT_CURRENCY),
    high: priceIn(tour.price, DEFAULT_CURRENCY),
    currency: DEFAULT_CURRENCY,
    url: tourUrl,
    validUntil,
    minPeople: cheapest.minPeople > 1 ? cheapest.minPeople : undefined,
    offerCount: groupPriceTiers(tour).length,
    // Fixed departures only: a real seat cap becomes LimitedAvailability, and
    // a real pre-discount rate becomes a strike-through reference price. Both
    // are undefined for every private tour, so their schema is unchanged.
    seatsTotal: tour.fixedDeparture?.seatsTotal,
    listPrice: tour.fixedDeparture?.listPrice
      ? priceIn(tour.fixedDeparture.listPrice, DEFAULT_CURRENCY)
      : undefined,
  });

  // Only reviews whose author actually took THIS tour; undefined otherwise.
  const reviewNodes = buildReviewNodes(REVIEWS, tour.slug);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tour.title,
    description: tour.seoDescription ?? tour.shortDescription,
    url: `https://marrakechecotours.com/${lang}/tours/${tourSlugFor(lang, tour.slug)}`,
    // Absolute: JSON-LD resolves a relative path against schema.org, not us.
    image: absoluteUrl(tour.heroImage),
    brand: { "@type": "Brand", name: "Marrakech Eco Tours" },
    offers: offer,
    // No aggregateRating: we have no per-tour review corpus to substantiate one.
    // Our verifiable rating is business-wide (TripAdvisor, see Organization
    // schema on the homepage), so claiming per-product ratings here would be
    // unsubstantiated review markup. Reinstate only when real per-tour reviews exist.
    //
    // Individual `review` nodes ARE emitted where a genuine, named traveller
    // reviewed THIS tour — Google accepts Review without an aggregate, and
    // these are already visible on the page via BookingSidebar. Matched by
    // tourSlug, never by keyword: see buildReviewNodes.
    ...(reviewNodes ? { review: reviewNodes } : {}),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.shortDescription,
    touristType: "Adventure",
    offers: offer,
    provider: { "@type": "TravelAgency", name: "Marrakech Eco Tours", url: "https://marrakechecotours.com" },
    // Absolute URLs. Google requires image URLs it can fetch and index; a
    // site-relative path is resolved against schema.org's own namespace, not
    // ours, so the images were unreachable.
    image: tour.gallery.map(absoluteUrl),
    // NOT `duration`. schema.org's vocabulary puts `duration` on Event, Movie,
    // MediaObject and friends — never on Trip/TouristTrip — and its range is
    // Duration (ISO 8601), so the free-text "4 days / 3 nights" failed twice
    // over. Confirmed against schemaorg-current-https.jsonld and reported by
    // validator.schema.org as UNKNOWN_FIELD + TYPE_CONVERSION_FAILED on every
    // one of the 47 tours.
    //
    // `itinerary` is the property Trip actually defines, and it carries more
    // than the duration did: the real day-by-day route, with the named stops
    // already stored for the map. Day count is still recoverable from the list
    // length, and the human-readable "4 days / 3 nights" is on the page and in
    // the Product description where it belongs.
    itinerary: {
      "@type": "ItemList",
      numberOfItems: tour.itinerary.length,
      itemListElement: tour.itinerary.map((day, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          // Place, not a bare name: `itinerary` expects ItemList or Place, and
          // days with a verified stop carry real coordinates.
          "@type": "Place",
          name: day.stop?.name ?? day.title,
          ...(day.stop
            ? {
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: day.stop.lat,
                  longitude: day.stop.lng,
                },
              }
            : {}),
        },
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://marrakechecotours.com/${lang}` },
      { "@type": "ListItem", position: 2, name: "Tours", item: `https://marrakechecotours.com/${lang}/tours` },
      { "@type": "ListItem", position: 3, name: tour.title, item: `https://marrakechecotours.com/${lang}/tours/${tourSlugFor(lang, tour.slug)}` },
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
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          className="object-cover"
          sizes="100vw"
          // The LCP element on this route. `priority` alone emitted a preload
          // that still sat at normal priority behind the font preloads —
          // measured Load Delay ~2.0s. fetchPriority tells the browser this
          // is the one image worth fetching first.
          fetchPriority="high"
          loading="eager"
        />
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
            <Badge className={`rounded-[3px] border-0 shadow-sm ${tour.tourType === "private" ? "bg-brass text-charcoal" : "bg-white/85 text-charcoal"}`}>
              {tour.tourType === "private" ? dict.tours.private : dict.tours.shared}
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

      <TourTrustBar dict={dict} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-28 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Refuge treks only, while the Toubkal Refuge is full (lib/refuge.ts). */}
            <RefugeNotice slug={tour.slug} dict={dict} />

            <TourGallery images={tour.gallery} title={tour.title} category={tour.category} origin={tour.origin} />

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

            {/* The brief sits with the route rather than after it: the reader
                has the day-by-day in mind and is now asking which version of
                this trip suits them. It is also the page's only block of real
                indexable prose — see the measurement in TourBrief. */}
            {tour.brief && tour.brief.length > 0 && (
              <TourBrief brief={tour.brief} dict={dict} />
            )}

            {/* Desert trips only: the same dunes at 2, 3 or 4 days. Renders
                nothing for a tour outside lib/duration-ladders.ts. */}
            <DurationChooser slug={tour.slug} lang={lang} dict={dict} />

            {/* Placed straight after the day-by-day: the reader has just
                absorbed the route, so "who actually takes you on it" is the
                natural next question and the strongest thing we can answer
                that a copy-paste competitor cannot. */}
            <TourGuideBlock lang={lang} dict={dict} />

            {/* Khatam-star divider marks the shift from the story (overview +
                day-by-day) to the practical logistics (where you meet, what's
                included). One divider, one meaningful break — per the motif's
                "between major sections only" discipline. */}
            <ZelligeDivider className="!my-2" />

            <section id="tour-location" className="scroll-mt-32">
              <h2 className="font-display text-ink text-3xl font-bold mb-4">{dict.tourDetail.meetingPointHeading}</h2>
              <p className="flex items-center gap-1.5 text-ink-soft mb-4"><MapPin className="w-4 h-4 text-indigo" />{tour.meetingPoint.name}</p>
              {/* Treks keep the satellite map with 3D terrain (owner's choice,
                  2026-10-06, after seeing a contour-line version); every other
                  tour gets the static route map. See RouteMap's docblock. */}
              {tour.category !== "trekking" && hasRouteMap(tour.slug) ? (
                <RouteMap
                  slug={tour.slug}
                  {...routeMapPlaces(tour, lang)}
                  ariaLabel={dict.tourDetail.routeMapAria.replace("{tour}", tour.title)}
                  kmLabel={dict.tourDetail.routeMapKm}
                  footLabel={dict.tourDetail.routeMapFoot}
                  offRoadLabel={dict.tourDetail.mapKeyOffRoad}
                  credit={dict.tourDetail.routeMapCredit}
                  regions={dict.tourDetail.mapRegions}
                  numberLocale={localeTag(lang)}
                />
              ) : (
                <TourLocationMap
                  lat={tour.meetingPoint.lat}
                  lng={tour.meetingPoint.lng}
                  name={tour.meetingPoint.name}
                  /* Waypoints come before the day's endpoint, and the pins are
                     numbered by POSITION ALONG THE ROUTE rather than by day.
                     Numbering by `day` broke as soon as a day carried more than
                     one pin — Imlil and the Toubkal Refuge are both day 1, so
                     both rendered "1" and the walk read as starting twice. */
                  stops={tour.itinerary
                    .flatMap((d) => [
                      ...(d.extraStops ?? []).map((s) => ({ name: s.name, lat: s.lat, lng: s.lng })),
                      ...(d.stop ? [{ name: d.stop.name, lat: d.stop.lat, lng: d.stop.lng }] : []),
                    ])
                    .map((s, i) => ({ ...s, day: i + 1 }))}
                  routeGeometry={(tourRoutes as unknown as Record<string, [number, number][]>)[tour.slug]}
                  origin={tour.origin}
                  /* Relief is offered where the ground IS the product. An audit
                     of all 48 tours found 14 multi-stop routes with no road to
                     snap to, 13 of them trekking — so those pages draw a bare
                     straight line over imagery where a 3,664 m pass looks like a
                     valley floor. The DEM tiles are ~8x the weight of the
                     imagery, so driving tours, which learn nothing from relief,
                     do not load them. */
                  terrain={tour.category === "trekking"}
                  mapKey={{
                    tour: dict.tourDetail.mapKeyTour,
                    transfer: dict.tourDetail.mapKeyTransfer,
                    offRoad: dict.tourDetail.mapKeyOffRoad,
                    terrain3d: dict.tourDetail.mapKeyTerrain3d,
                  }}
                />
              )}
              <p className="mt-3 text-sm">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${tour.meetingPoint.lat},${tour.meetingPoint.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-indigo underline-offset-4 hover:underline"
                >
                  {dict.tourDetail.routeMapGoogle} &rarr;
                </a>
              </p>
            </section>

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
                <h3 className="font-display text-base font-bold text-white mb-2">{dict.tourDetail.planYourTrip}</h3>
                <p className="text-white/75 text-xs mb-3 leading-relaxed">{dict.tourDetail.sidebarDesc}</p>
                <Link href={`/${lang}/contact`} className="block text-center px-4 py-2.5 rounded-[3px] bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-colors">
                  {dict.tourDetail.planCustomTrip}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The sticky booking bar is fixed over the bottom of the viewport on
          mobile, and these trailing sections live outside the main column's
          pb-28 — so without their own bottom padding they scroll underneath
          it. lg:pb-0 because the bar is lg:hidden. Measured 2026-09-29 at
          360px: the bar is 67–132px tall depending on locale and currency (a
          French dirham quote wraps to three lines), so pb-36 (144px) clears
          the tallest; pb-24 left the last cards under it. */}
      <div className="pb-36 lg:pb-0">
        <RelatedGuides tour={tour} lang={lang} dict={dict} />

        <RelatedTours currentSlug={tour.slug} category={tour.category} lang={lang} dict={dict} />
      </div>
    </>
  );
}
