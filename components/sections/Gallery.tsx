import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera } from "@phosphor-icons/react/dist/ssr";
import AnimateInView from "@/components/ui/AnimateInView";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1611859836043-a9177f500a27?w=800&q=85", alt: "Jbel Toubkal summit — highest peak in North Africa", span: "col-span-1 row-span-2" },
  { src: "https://images.unsplash.com/photo-1617374128851-c84e37dc9f37?w=800&q=85", alt: "Erg Chebbi golden dunes at sunset, Merzouga Sahara Morocco" },
  { src: "https://images.unsplash.com/photo-1685311572420-513619470404?w=800&q=85", alt: "Camel caravan at rest in the Sahara desert" },
  { src: "https://images.unsplash.com/photo-1722180862276-970599009d51?w=800&q=85", alt: "Marrakech medina — iconic architecture and ancient streets" },
  { src: "https://images.unsplash.com/photo-1767936925033-9a5b59925613?w=800&q=85", alt: "Fes tanneries colourful dye vats Morocco", span: "col-span-1 row-span-2" },
  { src: "https://images.unsplash.com/photo-1565985482571-03a42ea59d80?w=800&q=85", alt: "Essaouira blue fishing boats Atlantic coast Morocco" },
  { src: "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=800&q=85", alt: "The blue-washed streets of Chefchaouen in the Rif Mountains" },
  { src: "/gallery/IMG_20260616_142350.jpg", alt: "Imlil valley village with mosque minaret among walnut trees, High Atlas Morocco" },
  { src: "/gallery/IMG_20260616_142428.jpg", alt: "Snow-dusted Toubkal peak above a Berber village, seen from a traditional riad terrace" },
  { src: "/gallery/IMG_20260630_142847.jpg", alt: "Atlas mountain waterfall cascading through dark volcanic rock faces, High Atlas Morocco" },
  { src: "/gallery/IMG_20260630_142912.jpg", alt: "Blue-hour view of a Berber village below snow-capped High Atlas peaks near Toubkal", span: "col-span-1 row-span-2" },
];

interface Props {
  dict: Dictionary;
  lang?: Locale;
}

export default function Gallery({ dict, lang = "en" }: Props) {
  return (
    <section className="py-24">
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
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${photo.span ?? ""}`}
            >
              <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm opacity-0 scale-75 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100">
                <Camera className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
                <p className="text-white text-xs font-medium leading-snug line-clamp-2 drop-shadow-lg">
                  {photo.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
