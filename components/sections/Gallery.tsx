import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import AnimateInView from "@/components/ui/AnimateInView";
import GalleryLightbox from "@/components/ui/GalleryLightbox";
import { lightboxLabels } from "@/lib/lightbox-labels";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
// The photo list lives in lib/ so app/sitemap.ts can read it as plain data.
// Alt text is per-locale; src/group/span are not. See lib/gallery-i18n.ts.
import { galleryPhotosFor } from "@/lib/gallery-i18n";

interface Props {
  dict: Dictionary;
  lang?: Locale;
}

export default function Gallery({ dict, lang = "en" }: Props) {
  return (
    <section id="gallery" className="bg-surface py-24 md:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateInView variant="fade-up" className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="eyebrow">{dict.gallery.eyebrow}</span>
            <h2 className="font-bold text-ink mt-3" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
              {dict.gallery.title}
            </h2>
            <p className="text-ink-muted mt-4 max-w-lg leading-relaxed">
              {dict.gallery.subtitle}
            </p>
          </div>
          <Link
            href={`/${lang}/tours`}
            className="flex items-center gap-2 text-indigo font-semibold hover:gap-3 transition-all group shrink-0 pb-1"
          >
            {dict.featuredTours.viewAll}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimateInView>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[220px]">
          <GalleryLightbox
            photos={galleryPhotosFor(lang)}
            labels={lightboxLabels(dict.common, {
              play: dict.gallery.slideshow,
              pause: dict.gallery.slideshowStop,
            })}
          />
        </div>
      </div>
    </section>
  );
}
