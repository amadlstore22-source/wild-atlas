import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import CTABanner from "@/components/sections/CTABanner";
import GalleryPageContent from "@/components/sections/GalleryPageContent";
import GalleryHeroSlideshow from "@/components/sections/GalleryHeroSlideshow";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { GALLERY_PHOTOS } from "@/lib/gallery-photos";
// Alt text is per-locale, and it is what the ImageObject schema publishes
// as each image's description — English there on /ar/gallery is structured
// data disagreeing with the page's own language. See lib/gallery-i18n.ts.
import { galleryPhotosFor } from "@/lib/gallery-i18n";
import { STATS } from "@/lib/stats";
import { ZelligeBand } from "@/components/ui/MoroccanMotifs";
import JsonLd from "@/components/seo/JsonLd";
import { hreflangForPath } from "@/lib/seo/hreflang";
import { ogBase } from "@/lib/seo/open-graph";

type LangParams = { params: Promise<{ lang: string }> };

/**
 * The frames the hero cycles through, and the first of them is the OG card.
 *
 * Hand-picked rather than sliced off GALLERY_PHOTOS: a hero is a wide, dark
 * slot with a headline across it, and most of the catalogue is portrait or
 * pale — a light frame puts white text on white sky. These eight are all
 * landscape, all carry their subject away from the lower-left where the title
 * sits, and between them they cover the four regions the page is divided into,
 * so the hero previews the whole page rather than one corner of it.
 *
 * Kept short on purpose. The hero mounts a window of these at full viewport
 * width; a reel of all 66 would put a tick row off the edge of a phone screen
 * and pull far more image data than an opening screen justifies.
 */
const HERO_REEL = [
  "/gallery/camel-caravan-sunset-riders.jpg",
  "/gallery/volubilis-arch-of-caracalla-across-ruins.jpg",
  "/gallery/toubkal-national-park-peak-clouds.jpg",
  "/gallery/fes-kairaouine-minaret-lit-dusk.jpg",
  "/gallery/atlantic-coast-sea-arch-cliff.jpg",
  "/gallery/merzouga-erg-chebbi-dune-ridge-wide.jpg",
  "/gallery/rabat-hassan-esplanade-columns-walker.jpg",
  "/gallery/trek-camp-golden-hour-valley.jpg",
] as const;

/** Resolved against the real photo list so the alt text stays the one that was
 *  written from the frame, and a renamed file fails the build here rather than
 *  rendering a hero with a broken image. */
const HERO_PHOTOS = HERO_REEL.map((src) => {
  const photo = GALLERY_PHOTOS.find((p) => p.src === src);
  if (!photo) throw new Error(`HERO_REEL references a photo that is not in GALLERY_PHOTOS: ${src}`);
  return photo;
});

const HERO = HERO_PHOTOS[0];

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
function galleryJsonLd(lang: Locale, title: string, description: string) {
  const photos = galleryPhotosFor(lang);
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
    image: photos.slice(0, 60).map((p) => ({
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

  // The hero reel resolved for this locale: same eight frames, this locale's
  // alt text. HERO_REEL names them by src, so the lookup is against the
  // localised list rather than the English constant.
  const localised = galleryPhotosFor(lang);
  const heroPhotos = HERO_REEL.map((src) => {
    const photo = localised.find((p) => p.src === src);
    if (!photo) throw new Error(`HERO_REEL references a photo that is not in GALLERY_PHOTOS: ${src}`);
    return photo;
  });

  return (
    <>
      <JsonLd data={galleryJsonLd(lang, dict.seo.gallery.title, dict.seo.gallery.description)} />

      {/* ── Hero: the photographs, already playing ──
          The page opens on the work itself. A gallery that opens on a still
          frame with a "play" button under it asks the visitor to do something
          before the page does anything. */}
      <GalleryHeroSlideshow photos={heroPhotos}>
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
      </GalleryHeroSlideshow>

      {/* ── Grouped grids ── */}
      <section className="bg-surface py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryPageContent dict={dict} lang={lang} />

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
