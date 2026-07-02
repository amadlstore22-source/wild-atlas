import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import AnimateInView from "@/components/ui/AnimateInView";
import GalleryLightbox from "@/components/ui/GalleryLightbox";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=800&q=85", alt: "Jbel Toubkal summit — highest peak in North Africa", span: "col-span-1 row-span-2" },
  { src: "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=800&q=85", alt: "Erg Chebbi golden dunes at sunset, Merzouga Sahara Morocco" },
  { src: "https://images.unsplash.com/photo-1685311572420-513619470404?w=800&q=85", alt: "Camel caravan at rest in the Sahara desert" },
  { src: "https://images.unsplash.com/photo-1722180862276-970599009d51?w=800&q=85", alt: "Marrakech medina — iconic architecture and ancient streets" },
  { src: "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=800&q=85", alt: "Fes tanneries colourful dye vats Morocco", span: "col-span-1 row-span-2" },
  { src: "https://images.unsplash.com/photo-1565985482571-03a42ea59d80?w=800&q=85", alt: "Essaouira blue fishing boats Atlantic coast Morocco" },
  { src: "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=800&q=85", alt: "The blue-washed streets of Chefchaouen in the Rif Mountains" },
  { src: "https://images.unsplash.com/photo-1597662786834-8eea85ad4841?w=800&q=85", alt: "Berber stone-built village below snow-capped Atlas peaks, High Atlas Morocco" },
  { src: "https://images.unsplash.com/photo-1443904364754-fb9a64fe19e5?w=800&q=85", alt: "Winding mountain road ascending through the High Atlas range, Morocco" },
  { src: "https://images.unsplash.com/photo-1585213303822-f19214012600?w=800&q=85", alt: "Ouzoud waterfalls cascading through forested gorge scenery, Morocco" },
  { src: "https://images.unsplash.com/photo-1670406071586-d6c619eab22b?w=800&q=85", alt: "Dramatic rocky Dadès Gorge landscape with layered sandstone cliffs, Morocco", span: "col-span-1 row-span-2" },
];

interface Props {
  dict: Dictionary;
  lang?: Locale;
}

export default function Gallery({ dict, lang = "en" }: Props) {
  return (
    <section id="gallery" className="py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateInView variant="fade-up" className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-sunset text-sm font-semibold uppercase tracking-widest">
              {dict.gallery.eyebrow}
            </span>
            <h2 className="font-serif text-charcoal text-4xl lg:text-5xl font-bold mt-2">
              {dict.gallery.title}
            </h2>
            <p className="text-charcoal/60 mt-3 max-w-lg">
              {dict.gallery.subtitle}
            </p>
          </div>
          <Link
            href={`/${lang}/tours`}
            className="flex items-center gap-2 text-forest font-semibold hover:gap-3 transition-all group shrink-0 pb-1"
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
