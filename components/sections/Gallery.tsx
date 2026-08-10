import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import AnimateInView from "@/components/ui/AnimateInView";
import GalleryLightbox from "@/components/ui/GalleryLightbox";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

// Photographs from our own trips, shot by us and by our guides on departures we
// ran. Every frame here is first-party: the summit shots are our own clients on
// the Toubkal pyramid, the camps are ours, the guide is one of ours.
//
// Three entries used to be images already carrying the rest of the site (one of
// them a medina doorway captioned as Sahara dunes), and the last was an external
// Unsplash file — a stock photo of a place we run trips to, loaded from someone
// else's CDN. Both were replaced: the point of this section is that these are
// real trips, and a stock reel undercuts the claim it is making.
const PHOTOS = [
  { src: "/gallery/toubkal-national-park-peak-clouds.jpg", alt: "Jbel Toubkal massif under dramatic cloud, Toubkal National Park, High Atlas Morocco", span: "col-span-1 row-span-2" },
  { src: "/gallery/toubkal-summit-group-pyramid.jpg", alt: "Our trekkers at the summit pyramid of Jbel Toubkal, 4,167 m, High Atlas Morocco" },
  { src: "/gallery/trek-camp-golden-hour-valley.jpg", alt: "Our trek camp pitched above a High Atlas valley at golden hour, Morocco" },
  { src: "/gallery/imlil-mule-trail-toubkal-behind.jpg", alt: "Riding the mule trail out of Imlil with the snow-covered Toubkal ridge behind, Morocco" },
  { src: "/gallery/toubkal-trail-turquoise-pool-waterfall.jpg", alt: "Turquoise natural pool and waterfall on the Imlil to Sidi Chamharouch trail, Toubkal, Morocco", span: "col-span-1 row-span-2" },
  { src: "/gallery/berber-guide-waterfall-portrait.jpg", alt: "One of our certified Berber mountain guides at a High Atlas waterfall, Morocco" },
  { src: "/gallery/trek-camp-high-valley-dawn.jpg", alt: "Berber tents at our high-mountain trek camp at first light, High Atlas Morocco" },
  { src: "/gallery/imlil-village-green-valley.jpg", alt: "Imlil village terraced into its green High Atlas valley below the Toubkal peaks, Morocco" },
  { src: "/gallery/imlil-berber-village-kittens.jpg", alt: "Kittens on the stone steps of a Berber village in the High Atlas, Morocco" },
  { src: "/gallery/imlil-valley-night-stars.jpg", alt: "Imlil valley at night — village lights and stars below the High Atlas, Morocco" },
  { src: "/gallery/trek-winter-ascent-snow-traverse.jpg", alt: "Our group traversing a snow slope on a winter ascent in the High Atlas, Morocco", span: "col-span-1 row-span-2" },
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
