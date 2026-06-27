import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "../../dictionaries";
import { DESTINATIONS, getDestination } from "@/lib/destinations";
import { TOURS } from "@/lib/tours";
import TourCard from "@/components/ui/TourCard";
import type { Locale } from "@/app/[lang]/dictionaries";

type PageParams = { params: Promise<{ lang: string; dest: string }> };

export async function generateStaticParams() {
  const locales = ["en", "fr", "es", "de", "it", "ar"];
  return locales.flatMap((lang) =>
    DESTINATIONS.map((d) => ({ lang, dest: d.slug }))
  );
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang, dest } = await params;
  const destination = getDestination(dest);
  if (!destination) return {};
  return {
    title: destination.seoTitle,
    description: destination.seoDescription,
    openGraph: {
      title: destination.seoTitle,
      description: destination.seoDescription,
      url: `https://marrakechecotours.com/${lang}/destinations/${dest}`,
      images: [{ url: destination.heroImage, width: 1400, height: 900, alt: destination.name }],
    },
    alternates: { canonical: `https://marrakechecotours.com/${lang}/destinations/${dest}` },
  };
}

const SEASON_STARS = (rating: number) =>
  ["★", "★★", "★★★", "★★★★", "★★★★★"][rating - 1] ?? "★";

export default async function DestinationPage({ params }: PageParams) {
  const { lang, dest } = await params;
  if (!hasLocale(lang)) notFound();

  const destination = getDestination(dest);
  if (!destination) notFound();

  const relatedTours = TOURS.filter(
    (t) =>
      destination.relatedCategories.includes(t.category) ||
      destination.relatedOrigins.includes(t.origin)
  ).slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.name,
    description: destination.about,
    url: `https://marrakechecotours.com/${lang}/destinations/${dest}`,
    image: destination.heroImage,
    geo: {
      "@type": "GeoCoordinates",
      latitude: destination.lat,
      longitude: destination.lng,
    },
    touristType: ["Adventure tourist", "Cultural tourist", "Eco tourist"],
    includesAttraction: destination.highlights.map((h) => ({
      "@type": "TouristAttraction",
      name: h.title,
      description: h.desc,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: destination.faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const locale = lang as Locale;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />

      <div className="min-h-screen">
        {/* Hero */}
        <div className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
          <Image
            src={destination.heroImage}
            alt={`${destination.name} — ${destination.subtitle}`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            {/* Breadcrumb */}
            <nav className="text-white/40 text-xs mb-6 flex items-center gap-2" aria-label="Breadcrumb">
              <Link href={`/${lang}`} className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href={`/${lang}/destinations`} className="hover:text-white transition-colors">Destinations</Link>
              <span>/</span>
              <span className="text-white/70">{destination.name}</span>
            </nav>

            <p className="text-sunset text-xs font-bold uppercase tracking-[0.18em] mb-3">
              {destination.region}
            </p>
            <h1
              className="font-serif text-white font-bold leading-tight mb-3"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)" }}
            >
              {destination.name}
            </h1>
            <p className="text-white/65 text-xl max-w-xl leading-relaxed">{destination.subtitle}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-14">

            {/* Left: main content */}
            <div>
              {/* About */}
              <section className="mb-14">
                <h2 className="font-serif text-charcoal text-2xl font-bold mb-5">
                  About {destination.name}
                </h2>
                <p className="text-charcoal/70 leading-relaxed text-lg">{destination.about}</p>
              </section>

              {/* Known for */}
              <section className="mb-14">
                <h2 className="font-serif text-charcoal text-2xl font-bold mb-5">
                  What {destination.name} is Known For
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {destination.knownFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 bg-sand/30 rounded-xl border border-sand-dark/60">
                      <span className="text-sunset mt-0.5 shrink-0 font-bold">✦</span>
                      <span className="text-charcoal/75 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Highlights */}
              <section className="mb-14">
                <h2 className="font-serif text-charcoal text-2xl font-bold mb-6">
                  Highlights
                </h2>
                <div className="space-y-6">
                  {destination.highlights.map((h, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal mb-1.5">{h.title}</h3>
                        <p className="text-charcoal/65 text-sm leading-relaxed">{h.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Best season */}
              <section className="mb-14">
                <h2 className="font-serif text-charcoal text-2xl font-bold mb-6">
                  Best Time to Visit
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {destination.seasons.map((s) => (
                    <div key={s.name} className="rounded-2xl border border-sand-dark p-4 bg-white">
                      <div className="text-2xl mb-2">{s.emoji}</div>
                      <div className="font-semibold text-charcoal text-sm mb-1">{s.name}</div>
                      <div className="text-sunset text-sm mb-2 leading-none">
                        {SEASON_STARS(s.rating)}
                      </div>
                      <p className="text-charcoal/55 text-xs leading-relaxed">{s.note}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Travel tips */}
              <section className="mb-14">
                <h2 className="font-serif text-charcoal text-2xl font-bold mb-5">
                  Insider Travel Tips
                </h2>
                <ul className="space-y-3">
                  {destination.travelTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-charcoal/70 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-forest/12 border border-forest/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-forest text-[10px] font-bold">{i + 1}</span>
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </section>

              {/* FAQs */}
              <section className="mb-14">
                <h2 className="font-serif text-charcoal text-2xl font-bold mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3">
                  {destination.faqs.map((faq) => (
                    <details key={faq.q} className="bg-white rounded-2xl border border-sand-dark group">
                      <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-charcoal hover:text-forest transition-colors list-none text-sm">
                        {faq.q}
                        <span className="text-charcoal/40 group-open:rotate-45 transition-transform text-lg ml-4 shrink-0">+</span>
                      </summary>
                      <div className="px-5 pb-5 text-charcoal/65 text-sm leading-relaxed">{faq.a}</div>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            {/* Right: sticky sidebar */}
            <div>
              <div className="sticky top-24 space-y-4">
                {/* Quick info card */}
                <div className="bg-white rounded-2xl border border-sand-dark shadow-sm p-6">
                  <h3 className="font-serif text-charcoal font-bold text-lg mb-4">Quick Info</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-charcoal/40 text-xs uppercase tracking-widest font-semibold mb-0.5">Region</dt>
                      <dd className="text-charcoal font-medium">{destination.region}</dd>
                    </div>
                    <div>
                      <dt className="text-charcoal/40 text-xs uppercase tracking-widest font-semibold mb-0.5">Best Season</dt>
                      <dd className="text-charcoal font-medium">
                        {destination.seasons
                          .filter((s) => s.rating >= 4)
                          .map((s) => s.name)
                          .join(" & ")}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-charcoal/40 text-xs uppercase tracking-widest font-semibold mb-0.5">Categories</dt>
                      <dd className="flex flex-wrap gap-1.5 mt-1">
                        {destination.relatedCategories.map((cat) => (
                          <Link
                            key={cat}
                            href={`/${locale}/categories/${cat}`}
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-forest/8 text-forest border border-forest/15 rounded-full hover:bg-forest/16 transition-colors capitalize"
                          >
                            {cat.replace("-", " ")}
                          </Link>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* CTA */}
                <div className="bg-forest rounded-2xl p-6 text-white">
                  <h3 className="font-serif font-bold text-lg mb-2">
                    Ready to explore {destination.name}?
                  </h3>
                  <p className="text-white/65 text-sm mb-5 leading-relaxed">
                    Our certified local guides are available for private and small-group tours year-round.
                  </p>
                  <Link
                    href={`/${locale}/contact`}
                    className="block text-center py-3 rounded-xl bg-white text-forest font-bold text-sm hover:bg-sand transition-colors mb-2"
                  >
                    Plan My Trip
                  </Link>
                  <a
                    href={`https://wa.me/212653936003?text=${encodeURIComponent(`Hi! I'm interested in exploring ${destination.name} with a local guide. Can you help?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366]/20 text-[#25D366] font-semibold text-sm hover:bg-[#25D366]/30 transition-colors border border-[#25D366]/30"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>

                {/* Nearby destinations */}
                <div className="bg-white rounded-2xl border border-sand-dark p-6">
                  <h3 className="font-semibold text-charcoal text-sm mb-3">Explore More Destinations</h3>
                  <ul className="space-y-2">
                    {DESTINATIONS.filter((d) => d.slug !== dest)
                      .slice(0, 4)
                      .map((d) => (
                        <li key={d.slug}>
                          <Link
                            href={`/${locale}/destinations/${d.slug}`}
                            className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-forest transition-colors group"
                          >
                            <span className="text-forest/40 group-hover:text-forest transition-colors text-xs">→</span>
                            <span>{d.name}</span>
                            <span className="text-charcoal/30 text-xs ml-auto">{d.subtitle.split(" ").slice(0, 2).join(" ")}</span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Related tours */}
          {relatedTours.length > 0 && (
            <section className="mt-4 pt-14 border-t border-sand-dark">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-sunset text-xs font-bold uppercase tracking-[0.18em] mb-2">Guided Adventures</p>
                  <h2 className="font-serif text-charcoal text-3xl font-bold">
                    Tours in & Around {destination.name}
                  </h2>
                </div>
                <Link
                  href={`/${locale}/tours`}
                  className="hidden sm:inline-flex items-center gap-1.5 text-forest font-semibold text-sm hover:text-moss transition-colors border-b border-forest/25 hover:border-forest pb-0.5"
                >
                  View all tours →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTours.map((tour, i) => (
                  <TourCard key={tour.id} tour={tour} lang={locale} delay={i * 0.07} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
