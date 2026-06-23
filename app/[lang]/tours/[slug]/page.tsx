import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TOURS, getTour, DIFFICULTY_COLORS } from "@/lib/tours";
import { Clock, UsersThree, CheckCircle, XCircle, MapPin, CaretRight } from "@phosphor-icons/react/dist/ssr";
import BookingSidebar from "@/components/tours/BookingSidebar";
import TourGallery from "@/components/tours/TourGallery";
import TourItinerary from "@/components/tours/TourItinerary";
import RelatedTours from "@/components/tours/RelatedTours";
import { getDictionary, hasLocale } from "../../dictionaries";
type TourParams = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  return TOURS.flatMap((t) =>
    ["en", "fr", "es", "de", "it", "ar"].map((lang) => ({ lang, slug: t.slug }))
  );
}

export async function generateMetadata({ params }: TourParams): Promise<Metadata> {
  const { slug, lang } = await params;
  const tour = getTour(slug);
  if (!tour) return {};
  const LOCALES = ["en", "fr", "es", "de", "it", "ar"];
  return {
    title: tour.seoTitle ?? `${tour.title} — Marrakech Eco Tours`,
    description: tour.seoDescription ?? tour.shortDescription,
    openGraph: { title: tour.title, description: tour.shortDescription, images: [{ url: tour.heroImage }] },
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
  const tour = getTour(slug);
  if (!tour) notFound();
  const dict = await getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.shortDescription,
    touristType: "Adventure",
    offers: { "@type": "Offer", price: tour.price, priceCurrency: "USD", availability: "https://schema.org/InStock" },
    provider: { "@type": "TravelAgency", name: "Marrakech Eco Tours", url: "https://marrakechecotours.com" },
    image: tour.gallery,
    duration: tour.duration,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <div className="relative h-[60vh] min-h-[420px] bg-cover bg-center flex items-end">
        <Image src={tour.heroImage} alt={tour.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link href={`/${lang}`} className="hover:text-white transition-colors">{dict.common.home}</Link>
            <CaretRight className="w-4 h-4" />
            <Link href={`/${lang}/tours`} className="hover:text-white transition-colors">{dict.nav.tours}</Link>
            <CaretRight className="w-4 h-4" />
            <span className="text-white capitalize">{tour.category}</span>
          </nav>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium capitalize">{tour.category}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${DIFFICULTY_COLORS[tour.difficulty]}`}>{tour.difficulty}</span>
          </div>
          <h1 className="font-serif text-white text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight max-w-3xl">{tour.title}</h1>
          <div className="flex flex-wrap gap-6 mt-4 text-white/70 text-sm">
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

            <section>
              <h2 className="font-serif text-charcoal text-3xl font-bold mb-4">{dict.tourDetail.overview}</h2>
              <p className="text-charcoal/70 text-lg leading-relaxed mb-6">{tour.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tour.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2 p-3 rounded-xl bg-sand/50">
                    <CheckCircle className="w-5 h-5 text-forest shrink-0 mt-0.5" />
                    <span className="text-charcoal/80 text-sm">{h}</span>
                  </div>
                ))}
              </div>
            </section>

            <TourItinerary itinerary={tour.itinerary} />

            <section>
              <h2 className="font-serif text-charcoal text-3xl font-bold mb-6">{dict.tourDetail.whatsIncluded}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-forest mb-3 text-sm uppercase tracking-widest">{dict.tourDetail.included}</h3>
                  <ul className="space-y-2">
                    {tour.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-charcoal/70">
                        <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal/50 mb-3 text-sm uppercase tracking-widest">{dict.tourDetail.notIncluded}</h3>
                  <ul className="space-y-2">
                    {tour.excludes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-charcoal/50">
                        <XCircle className="w-4 h-4 text-charcoal/30 shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingSidebar tour={tour} />
              <div className="mt-4 bg-forest rounded-2xl p-5 text-white">
                <h3 className="font-serif text-base font-bold mb-2">{dict.tourDetail.planYourTrip}</h3>
                <p className="text-white/70 text-xs mb-3 leading-relaxed">{dict.tourDetail.sidebarDesc}</p>
                <Link href={`/${lang}/contact`} className="block text-center px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-colors">
                  {dict.tourDetail.planCustomTrip}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedTours currentSlug={tour.slug} category={tour.category} />
    </>
  );
}
