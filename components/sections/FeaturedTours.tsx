import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import TourCard from "@/components/ui/TourCard";
import AnimateInView from "@/components/ui/AnimateInView";
import { getFeaturedTours } from "@/lib/tours";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface Props {
  dict: Dictionary;
  lang?: Locale;
}

export default function FeaturedTours({ dict, lang = "en" }: Props) {
  const tours = getFeaturedTours();
  const [hero, ...rest] = tours;

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateInView variant="fade-up" className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="font-serif text-charcoal font-bold"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              {dict.featuredTours.title}
            </h2>
            <p className="text-charcoal/45 text-sm mt-1.5">
              Handpicked by our guides. Updated every season.
            </p>
          </div>
          <Link
            href={`/${lang}/tours`}
            className="inline-flex items-center gap-2 text-forest text-sm font-semibold hover:gap-3 transition-all group shrink-0"
          >
            {dict.featuredTours.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" weight="bold" />
          </Link>
        </AnimateInView>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:grid-rows-2">
          {hero && (
            <div className="lg:row-span-2">
              <TourCard tour={hero} lang={lang} dict={dict} featured={true} delay={0} />
            </div>
          )}
          {rest.slice(0, 4).map((tour, i) => (
            <TourCard key={tour.id} tour={tour} lang={lang} dict={dict} delay={0.1 + i * 0.1} />
          ))}
        </div>

        <p className="text-center text-xs text-charcoal/35 mt-8 lg:hidden">
          Showing {Math.min(tours.length, 5)} of {tours.length} tours
        </p>
      </div>
    </section>
  );
}
