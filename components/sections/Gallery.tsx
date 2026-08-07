import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import AnimateInView from "@/components/ui/AnimateInView";
import GalleryLightbox from "@/components/ui/GalleryLightbox";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

// Authentic photos from our own Toubkal treks (shot on the Imlil → Sidi
// Chamharouch trail in Toubkal National Park) are mixed with regional stock so
// the gallery reads as real trips, not a stock reel.
const PHOTOS = [
  { src: "/gallery/toubkal-national-park-peak-clouds.jpg", alt: "Jbel Toubkal massif under dramatic cloud, Toubkal National Park, High Atlas Morocco", span: "col-span-1 row-span-2" },
  { src: "/gallery/category-hero-medina-doorway.jpg", alt: "Erg Chebbi golden dunes at sunset, Merzouga Sahara Morocco" },
  { src: "/gallery/blog-what-to-pack-desert-tour-morocco.jpg", alt: "Camel caravan at rest in the Sahara desert" },
  { src: "/gallery/blog-best-time-to-visit-morocco.jpg", alt: "Marrakech medina — iconic architecture and ancient streets" },
  { src: "/gallery/toubkal-trail-turquoise-pool-waterfall.jpg", alt: "Turquoise natural pool and waterfall on the Imlil to Sidi Chamharouch trail, Toubkal, Morocco", span: "col-span-1 row-span-2" },
  { src: "/gallery/blog-essaouira-day-trip-from-agadir.jpg", alt: "Essaouira blue fishing boats Atlantic coast Morocco" },
  { src: "/gallery/blog-chefchaouen-complete-travel-guide.jpg", alt: "The blue-washed streets of Chefchaouen in the Rif Mountains" },
  { src: "/gallery/imlil-village-green-valley.jpg", alt: "Imlil village terraced into its green High Atlas valley below the Toubkal peaks, Morocco" },
  { src: "/gallery/imlil-berber-village-kittens.jpg", alt: "Kittens on the stone steps of a Berber village in the High Atlas, Morocco" },
  { src: "/gallery/imlil-valley-night-stars.jpg", alt: "Imlil valley at night — village lights and stars below the High Atlas, Morocco" },
  { src: "https://images.unsplash.com/photo-1670406071586-d6c619eab22b?w=800&q=85", alt: "Dramatic rocky Dadès Gorge landscape with layered sandstone cliffs, Morocco", span: "col-span-1 row-span-2" },
];

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
          <GalleryLightbox photos={PHOTOS} />
        </div>
      </div>
    </section>
  );
}
