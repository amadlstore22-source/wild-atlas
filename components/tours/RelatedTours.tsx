import TourCard from "@/components/ui/TourCard";
import type { Category } from "@/lib/tours";
import { getToursByCategoryFor } from "@/lib/tours-i18n";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

export default function RelatedTours({
  currentSlug,
  category,
  lang,
  dict,
}: {
  currentSlug: string;
  category: Category;
  lang: Locale;
  dict: Dictionary;
}) {
  const related = getToursByCategoryFor(lang, category)
    .filter((t) => t.slug !== currentSlug)
    .slice(0, 3);

  if (!related.length) return null;

  const categoryLabel = (dict.categories as unknown as Record<string, string>)[category] ?? category;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-charcoal text-3xl font-bold mb-8">
          {dict.tourDetail.moreCategoryAdventures.replace("{category}", categoryLabel)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((tour) => (
            <TourCard key={tour.id} tour={tour} lang={lang} dict={dict} />
          ))}
        </div>
      </div>
    </section>
  );
}
