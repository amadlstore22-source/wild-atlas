import TourCard from "@/components/ui/TourCard";
import { getToursByCategory, type Category } from "@/lib/tours";

export default function RelatedTours({
  currentSlug,
  category,
}: {
  currentSlug: string;
  category: Category;
}) {
  const related = getToursByCategory(category)
    .filter((t) => t.slug !== currentSlug)
    .slice(0, 3);

  if (!related.length) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-charcoal text-3xl font-bold mb-8">
          More {category.charAt(0).toUpperCase() + category.slice(1)} Adventures
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
