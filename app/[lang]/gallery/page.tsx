import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import CTABanner from "@/components/sections/CTABanner";
import GalleryPageContent from "@/components/sections/GalleryPageContent";
import { getDictionary, hasLocale } from "../dictionaries";
import { GALLERY_PHOTOS } from "@/lib/gallery-photos";
import { STATS } from "@/lib/stats";
import { ZelligeBand } from "@/components/ui/MoroccanMotifs";
import JsonLd from "@/components/seo/JsonLd";
import { hreflangForPath } from "@/lib/seo/hreflang";
import { ogBase } from "@/lib/seo/open-graph";

type LangParams = { params: Promise<{ lang: string }> };

/** The frame that fronts the page and its OG card. Chosen rather than taken
 *  from GALLERY_PHOTOS[0]: the first entry is a portrait Toubkal shot, and a
 *  hero slot and an OG card are both wide. */
const HERO = {
  src: "/gallery/camel-caravan-sunset-riders.jpg",
  alt: "Our guests riding the camel caravan into the sunset across the Erg Chebbi dunes, Merzouga Morocco",
};

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { LOCALES } = await import("../dictionaries");
  const dict = await getDictionary(lang);
  return {
    title: dict.seo.gallery.title,
    description: dict.seo.gallery.description,
    openGraph: {
      ...ogBase(lang),
      title: dict.seo.gallery.title,
      description: dict.seo.gallery.description,
      url: `https://marrakechecotours.com/${lang}/gallery`,
      images: [{ url: HERO.src, width: 1200, height: 630, alt: HERO.alt }],
    },
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/gallery`,
      languages: hreflangForPath(LOCALES, "/gallery"),
    },
  };
}

/**
 * ImageGallery with an ImageObject per photograph.
 *
 * This is the schema type Google documents for a page whose subject is its
 * images, and each ImageObject carries the same alt text the page renders as
 * its caption — so the description a crawler reads is the one a screen reader
 * hears, not a second parallel set of strings that can drift.
 *
 * `contentUrl` is absolute: a relative path in structured data is resolved
 * against the page URL by some consumers and dropped by others.
 *
 * Deliberately NOT repeating the organisation node here. The homepage owns
 * #organization and the About page references it by @id; a third copy would be
 * the duplicated-entity problem those two already avoid.
 */
function galleryJsonLd(lang: string, title: string, description: string) {
  const base = `https://marrakechecotours.com/${lang}`;
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: title,
    description,
    url: `${base}/gallery`,
    inLanguage: lang,
    isPartOf: { "@id": "https://marrakechecotours.com/#organization" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: base },
        { "@type": "ListItem", position: 2, name: title, item: `${base}/gallery` },
      ],
    },
    // Capped at 60. The page carries 66 and Google's guidance is that a very
    // long ItemList adds bytes to every crawl without adding understanding;
    // the sitemap already declares the images independently.
    image: GALLERY_PHOTOS.slice(0, 60).map((p) => ({
      "@type": "ImageObject",
      contentUrl: `https://marrakechecotours.com${p.src}`,
      description: p.alt,
    })),
  };
}

export default async function GalleryPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <JsonLd data={galleryJsonLd(lang, dict.seo.gallery.title, dict.seo.gallery.description)} />

      {/* ── Hero ── */}
      <div className="relative h-[55vh] min-h-[380px] flex items-end">
        <Image
          src={HERO.src}
          alt={HERO.alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/35 to-indigo-deep/15" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
          <p className="text-brass-deep text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {dict.gallery.eyebrow}
          </p>
          <h1
            className="font-bold text-white leading-[1.05] tracking-[-0.02em] mb-4"
            style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)" }}
          >
            {dict.gallery.pageTitle}
          </h1>
          <p className="text-white/65 text-lg max-w-2xl leading-relaxed">
            {dict.gallery.pageIntro}
          </p>
          <p className="text-white/45 text-sm mt-5 font-medium tracking-wide">
            {/* Derived from the array, never hardcoded: a literal count would be
                wrong in six dictionaries the next time a photo is added. */}
            {dict.gallery.photoCount.replace("{count}", String(GALLERY_PHOTOS.length))}
          </p>
        </div>
        <ZelligeBand tone="light" height={22} className="absolute bottom-0 left-0 opacity-80" />
      </div>

      {/* ── Grouped grids + slideshow ── */}
      <section className="bg-surface py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryPageContent dict={dict} />

          <div className="mt-16 pt-10 border-t border-sand-dark flex justify-center">
            <Link
              href={`/${lang}/tours`}
              className="flex items-center gap-2 text-indigo font-semibold hover:gap-3 transition-all group"
            >
              {dict.gallery.viewAllTours}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <CTABanner lang={lang} dict={dict} tourCount={STATS.tourCount} />
    </>
  );
}
