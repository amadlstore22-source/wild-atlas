import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import TourCard from "@/components/ui/TourCard";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
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
    <Section tone="white" motif>
      <SectionHeader
        eyebrow={dict.featuredTours.eyebrow}
        title={dict.featuredTours.title}
        subtitle={dict.featuredTours.subtitle}
        align="left"
        flourish
        action={
          <Link
            href={`/${lang}/tours`}
            className="inline-flex items-center gap-2 text-forest text-sm font-semibold hover:gap-3 transition-all group shrink-0"
          >
            {dict.featuredTours.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" weight="bold" />
          </Link>
        }
      />

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

      <p className="text-center text-xs text-ink-muted mt-8 lg:hidden">
        Showing {Math.min(tours.length, 5)} of {tours.length} tours
      </p>
    </Section>
  );
}
