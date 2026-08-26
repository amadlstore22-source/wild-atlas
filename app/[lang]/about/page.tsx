import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTABanner from "@/components/sections/CTABanner";
import WhyUs from "@/components/sections/WhyUs";
import AboutStory from "@/components/sections/AboutStory";
import GuideProfiles from "@/components/sections/GuideProfiles";
import { getDictionary, hasLocale } from "../dictionaries";
import { SITE, TRIPADVISOR } from "@/lib/constants";
import { STATS } from "@/lib/stats";
import { ZelligeField, ArabesqueDivider, ZelligeBand } from "@/components/ui/MoroccanMotifs";
import JsonLd from "@/components/seo/JsonLd";
import { hreflangForPath } from "@/lib/seo/hreflang";
import { ogBase } from "@/lib/seo/open-graph";
type LangParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { LOCALES } = await import("../dictionaries");
  const dict = await getDictionary(lang);
  return {
    // Read from the dictionary so each locale gets its own title and snippet.
    // These were hardcoded English, so /fr/about served French content under an
    // English <title> and all six locales competed on one identical string.
    title: dict.seo.about.title,
    description: dict.seo.about.description,
    openGraph: {
      ...ogBase(lang),
      title: dict.seo.about.title,
      description: dict.seo.about.description,
      url: `https://marrakechecotours.com/${lang}/about`,
      images: [{ url: "/gallery/toubkal-summit-guide-thumbs-up.jpg", width: 1200, height: 630, alt: "Marrakech Eco Tours guides at the Toubkal summit marker, High Atlas, Morocco" }],
    },
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/about`,
      languages: hreflangForPath(LOCALES, "/about"),
    },
  };
}

/**
 * The About page is the page an AI assistant reads to answer "who are they?",
 * so it has to identify the same ENTITY the homepage describes rather than
 * describing a page in isolation.
 *
 * It does that with an @graph carrying both the page and the organisation, and
 * the organisation node reuses the homepage's stable @id (#organization). Same
 * @id means the two pages describe ONE entity, so a consumer merges them rather
 * than reconciling two similar businesses.
 *
 * The node is deliberately thin — identity, founding date, contact, sameAs. The
 * homepage node stays the authoritative one with geo, opening hours and the
 * aggregateRating. `aggregateRating` is NOT repeated here: the same 122 reviews
 * asserted on a second URL is the duplicated-review-markup problem already
 * declined for per-tour ratings, and an @id reference does not need it.
 *
 * Every URL is built from `lang`. These were hardcoded to /en, so all six
 * locales published structured data pointing at the English page — the same
 * defect already fixed on this page's <title> and on /[lang]/tours.
 */
function aboutJsonLd(lang: string) {
  const base = `https://marrakechecotours.com/${lang}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        name: "About Marrakech Eco Tours",
        description: "Marrakech Eco Tours was founded by certified Berber guides born in the High Atlas Mountains. We offer ethical, small-group trekking and adventure tours across Morocco.",
        url: `${base}/about`,
        inLanguage: lang,
        mainEntity: { "@id": "https://marrakechecotours.com/#organization" },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: base },
            { "@type": "ListItem", position: 2, name: "About", item: `${base}/about` },
          ],
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://marrakechecotours.com/#organization",
        name: "Marrakech Eco Tours",
        url: "https://marrakechecotours.com",
        description: "Family-run Berber guiding operation. Licensed Moroccan tour operator since 2010, specialising in High Atlas trekking and Sahara desert tours from Marrakech and Agadir.",
        foundingDate: String(SITE.foundedYear),
        telephone: "+212653936003",
        email: SITE.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Marrakech",
          addressCountry: "MA",
        },
        sameAs: [
          "https://instagram.com/met_morocco",
          "https://facebook.com/marrakechecotours",
          TRIPADVISOR.url,
        ],
      },
    ],
  };
}

export default async function AboutPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <JsonLd data={aboutJsonLd(lang)} />
      {/* ── Hero ── */}
      <div className="relative h-[65vh] min-h-[440px] flex items-end">
        <Image
          src="/gallery/toubkal-summit-guide-thumbs-up.jpg"
          alt="Marrakech Eco Tours guides at the Toubkal summit marker, High Atlas, Morocco"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/35 to-indigo-deep/15" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
          <p className="text-brass-deep text-xs font-bold uppercase tracking-[0.2em] mb-4">{dict.about.eyebrow}</p>
          <h1 className="font-bold text-white leading-[1.05] tracking-[-0.02em] mb-4" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
            {dict.about.pageSubtitle}
          </h1>
          <p className="text-white/65 text-lg max-w-xl leading-relaxed">
            {dict.about.introBody}
          </p>
        </div>
        <ZelligeBand tone="light" height={22} className="absolute bottom-0 left-0 opacity-80" />
      </div>

      {/* ── Intro stat bar ── */}
      <div className="bg-forest text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/15">
            {[
              { value: `${SITE.guidingHeritageYears}+`, label: dict.about.statYearsLabel },
              { value: SITE.clientCount, label: dict.about.statTravellersLabel },
              { value: String(STATS.tourCount), label: dict.about.statToursLabel },
              { value: SITE.countryCount, label: dict.about.statCountriesLabel },
            ].map((s) => (
              <div key={s.label} className="text-center px-4 py-2">
                <div className="font-display text-3xl font-bold text-white leading-none">{s.value}</div>
                <div className="text-white/55 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Origin story + animated content ── */}
      <AboutStory lang={lang} tourCount={STATS.tourCount} dict={dict} />

      {/* ── Three pillars ── */}
      <section className="relative py-24 bg-sand/30 overflow-hidden">
        <ZelligeField tone="clay" opacity={0.1} scale={132} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brass-deep text-xs font-bold uppercase tracking-[0.2em] mb-3">{dict.about.differentEyebrow}</p>
            <h2 className="font-display text-charcoal font-bold" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}>
              {dict.about.promiseTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: dict.about.pillar1Num,
                title: dict.about.pillar1Title,
                body: dict.about.pillar1Body,
                image: "https://images.unsplash.com/photo-1533839235388-7368a65d2a88?w=800&q=80",
                alt: "Hiker overlooking the High Atlas mountain valleys, Morocco",
              },
              {
                num: dict.about.pillar2Num,
                title: dict.about.pillar2Title,
                body: dict.about.pillar2Body,
                image: "https://images.unsplash.com/photo-1545167496-31b3aa75296c?w=800&q=80",
                alt: "Travellers and local guides on a camel caravan in the Moroccan Sahara",
              },
              {
                num: dict.about.pillar3Num,
                title: dict.about.pillar3Title,
                body: dict.about.pillar3Body,
                image: "https://images.unsplash.com/photo-1580746738099-1cb74f972feb?w=800&q=80",
                alt: "Colourful spice souk in Marrakech medina, Morocco",
              },
            ].map((p) => (
              <div key={p.num} className="bg-card rounded-[4px] overflow-hidden shadow-sm border border-sand-dark">
                <div className="relative h-52">
                  <Image src={p.image} alt={p.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/60 to-transparent" />
                  <span className="absolute bottom-4 left-5 font-mono text-white/50 text-xs font-bold tracking-widest">{p.num}</span>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-charcoal text-lg font-bold mb-3">{p.title}</h3>
                  <p className="text-ink-soft text-sm leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet the guides ── */}
      <GuideProfiles lang={lang} dict={dict} />

      {/* ── Why Us (existing component) ── */}
      <WhyUs dict={dict} tourCount={STATS.tourCount} />

      {/* ── Pull quote + tours CTA ── */}
      <section className="relative py-24 overflow-hidden">
        <ZelligeField tone="clay" opacity={0.08} scale={140} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ArabesqueDivider className="mb-10" />
          <p className="text-brass-deep text-xs font-bold uppercase tracking-[0.2em] mb-6">{dict.about.promiseEyebrow}</p>
          <blockquote className="font-display text-charcoal font-bold leading-[1.15] mb-8" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            &ldquo;{dict.about.promiseQuote}&rdquo;
          </blockquote>
          <p className="text-ink-soft text-base mb-10 max-w-2xl mx-auto leading-relaxed">
            {dict.about.promiseBody}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${lang}/tours`}
              className="px-8 py-3.5 rounded-full bg-forest text-white font-bold text-sm hover:bg-moss transition-colors shadow-lg shadow-forest/20"
            >
              {dict.about.browseAllTours.replace("{count}", String(STATS.tourCount))}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="px-8 py-3.5 rounded-full border-2 border-charcoal/20 text-charcoal font-bold text-sm hover:border-forest hover:text-forest transition-colors"
            >
              {dict.about.askUsAnything}
            </Link>
          </div>
        </div>
      </section>

      <CTABanner lang={lang} dict={dict} tourCount={STATS.tourCount} />
    </>
  );
}
