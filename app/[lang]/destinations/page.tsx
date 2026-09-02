import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "../dictionaries";
import { hreflangForPath } from "@/lib/seo/hreflang";
import { destinationsFor } from "@/lib/destinations-i18n";
import { ZelligeBand, ZelligeField } from "@/components/ui/MoroccanMotifs";
import { ogBase } from "@/lib/seo/open-graph";

type LangParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    // Localised: these were hardcoded English, so every locale shared one
    // identical title and snippet despite serving translated content.
    title: dict.seo.destinations.title,
    description: dict.seo.destinations.description,
    openGraph: {
      ...ogBase(lang),
      title: dict.seo.destinations.title,
      description: dict.seo.destinations.description,
      url: `https://marrakechecotours.com/${lang}/destinations`,
    },
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/destinations`,
      languages: hreflangForPath(LOCALES, "/destinations"),
    },
  };
}

const REGION_COLORS: Record<string, string> = {
  "Marrakech-Safi": "#B4472C",
  "Drâa-Tafilalet": "#C97B2B",
  "Fès-Meknès": "#9A5A1E",
  "Tanger-Tétouan-Al Hoceïma": "#2B3A67",
  "Souss-Massa": "#43506B",
  "Béni Mellal-Khénifra": "#5A6B8C",
};

/**
 * The same hues, lightened for text on the card's dark pill.
 *
 * REGION_COLORS are chosen to read on light ground. Printed on the pill's dark
 * plate they measured 1.0-3.3:1 — Tanger's #2B3A67 was 1.02:1, which is
 * invisible. These variants keep each region's hue identity and all clear
 * WCAG AA (4.5:1) against the plate.
 */
const REGION_TEXT_COLORS: Record<string, string> = {
  "Marrakech-Safi": "#EE9C86",
  "Drâa-Tafilalet": "#EFB877",
  "Fès-Meknès": "#DFA45E",
  "Tanger-Tétouan-Al Hoceïma": "#9FB0DC",
  "Souss-Massa": "#A9B6D4",
  "Béni Mellal-Khénifra": "#B3C1DE",
};

export default async function DestinationsPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.destinationsPage;
  const DESTINATIONS = destinationsFor(lang);

  return (
    <div>
      {/* Hero */}
      <div className="relative py-32 tex-emerald overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/gallery/destination-hero-toubkal-snow.jpg"
            alt="Morocco landscapes"
            fill
            className="object-cover opacity-35"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-charcoal/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brass-deep text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {d.eyebrow}
          </p>
          <h1
            className="hero-title font-display font-bold mb-6"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          >
            {d.title}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            {d.subtitle}
          </p>
        </div>
        <ZelligeBand tone="light" height={22} className="absolute bottom-0 left-0 opacity-80" />
      </div>

      {/* Destination grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ZelligeField tone="clay" opacity={0.08} scale={140} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {DESTINATIONS.map((dest) => {
            const color = REGION_COLORS[dest.region] ?? "#2B3A67";
            const pillText = REGION_TEXT_COLORS[dest.region] ?? "#9FB0DC";
            return (
              <Link
                key={dest.slug}
                href={`/${lang}/destinations/${dest.slug}`}
                className="group relative rounded-[4px] overflow-hidden tex-emerald flex flex-col min-h-[340px] hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="absolute inset-0">
                  <Image
                    src={dest.heroImage}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Scrim must stay strong across the whole text block, not just
                      the bottom edge. At via-/30 the subtitle measured 2.55:1 over a
                      sunlit beach — WCAG AA wants 4.5:1 — and the Agadir and Beni
                      Mellal cards were effectively unreadable. */}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/95 from-25% via-indigo-deep/75 via-55% to-transparent" />
                </div>

                <div className="relative mt-auto p-6 z-10">
                  <span
                    className="inline-block text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-0.5 rounded-full mb-3 border backdrop-blur-sm"
                    style={{
                      color: pillText,
                      borderColor: pillText + "66",
                      background: "rgba(12, 16, 34, 0.72)",
                    }}
                  >
                    {dest.region.split("-")[0]}
                  </span>
                  <h2 className="font-display text-white font-bold text-xl leading-tight mb-1 group-hover:text-sand transition-colors [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
                    {dest.name}
                  </h2>
                  <p className="text-white/85 text-sm mb-4 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">{dest.subtitle}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.knownFor.slice(0, 2).map((k, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-white/80 bg-black/35 border border-white/20 rounded-full px-2 py-0.5 leading-tight"
                      >
                        {k.split("—")[0].trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
