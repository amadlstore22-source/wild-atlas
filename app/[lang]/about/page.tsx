import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTABanner from "@/components/sections/CTABanner";
import WhyUs from "@/components/sections/WhyUs";
import AboutStory from "@/components/sections/AboutStory";
import GuideProfiles from "@/components/sections/GuideProfiles";
import { getDictionary, hasLocale } from "../dictionaries";
import { SITE } from "@/lib/constants";
import { STATS } from "@/lib/stats";
import { ZelligeField, ArabesqueDivider, ZelligeBand } from "@/components/ui/MoroccanMotifs";
import JsonLd from "@/components/seo/JsonLd";
type LangParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { LOCALES } = await import("../dictionaries");
  return {
    title: "Our Story — Marrakech Eco Tours | Born in the Atlas Mountains",
    description: "Marrakech Eco Tours was founded by Berber guides who grew up in the High Atlas. We run ethical, small-group adventures through Morocco's most remote landscapes — no middlemen, no greenwashing.",
    openGraph: {
      title: "Our Story — Marrakech Eco Tours",
      description: "A team of licensed Berber guides sharing Morocco's wildest places — honestly, sustainably, without the middlemen.",
      url: `https://marrakechecotours.com/${lang}/about`,
      images: [{ url: "https://images.unsplash.com/photo-1548018560-4cb48a8837c1?w=1200&q=80", width: 1200, height: 630, alt: "High Atlas Mountains at sunrise, Morocco" }],
    },
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/about`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `https://marrakechecotours.com/${l}/about`])),
    },
  };
}

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Marrakech Eco Tours",
  description: "Marrakech Eco Tours was founded by certified Berber guides born in the High Atlas Mountains. We offer ethical, small-group trekking and adventure tours across Morocco.",
  url: "https://marrakechecotours.com/en/about",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://marrakechecotours.com/en" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://marrakechecotours.com/en/about" },
    ],
  },
};

export default async function AboutPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <JsonLd data={aboutJsonLd} />
      {/* ── Hero ── */}
      <div className="relative h-[65vh] min-h-[440px] flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1548018560-4cb48a8837c1?w=1920&q=80"
          alt="High Atlas Mountains at sunrise, Morocco"
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
