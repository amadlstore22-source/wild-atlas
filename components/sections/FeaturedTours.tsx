import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import TourCard from "@/components/ui/TourCard";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { getFeaturedToursFor } from "@/lib/tours-i18n";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface Props {
  dict: Dictionary;
  lang?: Locale;
}

// The homepage grid shows six tours. More than six carry `featured: true`, so
// this list pins the order of the shown set — best-selling / most-representative
// first — instead of leaving it to array position. Slugs not listed fall in
// after these, in catalogue order, to backfill if the list ever shrinks.
const FEATURED_ORDER = [
  "toubkal-summit-trek-4day",
  "toubkal-summit-2day-marrakech",
  "sahara-3day-marrakech",
  "desert-4day-marrakech",
  "ourika-valley-day-hike",
  "high-atlas-grand-traverse-15day",
];

export default function FeaturedTours({ dict, lang = "en" }: Props) {
  const tours = getFeaturedToursFor(lang);
  const rank = (slug: string) => {
    const i = FEATURED_ORDER.indexOf(slug);
    return i === -1 ? FEATURED_ORDER.length : i;
  };
  // Six featured tours in a clean 3-column x 2-row grid — no ragged trailing row.
  const featured = [...tours].sort((a, b) => rank(a.slug) - rank(b.slug)).slice(0, 6);

  return (
    <Section tone="plaster" motif>
      <SectionHeader
        eyebrow={dict.featuredTours.eyebrow}
        title={dict.featuredTours.title}
        subtitle={dict.featuredTours.subtitle}
        align="left"
        flourish
        action={
          <Link
            href={`/${lang}/tours`}
            className="inline-flex items-center gap-2 text-indigo text-sm font-semibold hover:gap-3 transition-all group shrink-0"
          >
            {dict.featuredTours.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" weight="bold" />
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((tour, i) => (
          <TourCard key={tour.id} tour={tour} lang={lang} dict={dict} delay={i * 0.08} />
        ))}
      </div>

      <p className="text-center text-xs text-ink-muted mt-8 lg:hidden">
        Showing {featured.length} of {tours.length} tours
      </p>
    </Section>
  );
}
