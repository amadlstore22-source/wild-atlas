import TourCard from "@/components/ui/TourCard";
import { getTourFor } from "@/lib/tours-i18n";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface Props {
  slugs: string[];
  lang: Locale;
  dict: Dictionary;
  title?: string;
}

/**
 * Turns a post's `relatedTours` slugs into real cards. Unknown slugs are
 * dropped rather than thrown: a typo should shorten the list, not 500 the
 * article. The blog test suite asserts every slug resolves, so an empty
 * result here means the data changed without the test being run.
 */
export default function RelatedTourCards({ slugs, lang, dict, title }: Props) {
  const tours = slugs.map((slug) => getTourFor(lang, slug)).filter((t) => t !== undefined);
  if (tours.length === 0) return null;

  return (
    <section className="mt-12 pt-10 border-t border-rule">
      <h2 className="font-display text-ink text-3xl font-bold mb-2">{title ?? dict.blog.relatedToursTitle}</h2>
      <p className="text-ink-soft mb-6">{dict.blog.relatedToursSubtitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} lang={lang} dict={dict} />
        ))}
      </div>
    </section>
  );
}
