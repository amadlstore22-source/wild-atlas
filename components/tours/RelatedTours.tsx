import TourCard from "@/components/ui/TourCard";
import type { Category, Tour } from "@/lib/tours";
import { toursFor } from "@/lib/tours-i18n";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

/**
 * Picks up to 4 tours to cross-link from a tour page.
 *
 * The old version showed only the first three same-category tours, which
 * (a) trapped crawl authority inside one category silo and (b) meant tours
 * near the end of the array were never linked to at all — a direct cause of
 * "Discovered, currently not indexed" in Search Console. This version scores
 * every other tour by relevance (same category, then same origin, then same
 * difficulty) and then rotates the pick by a hash of the current slug, so each
 * tour surfaces a *different* slice of its neighbours. Across all 40 tour
 * pages that spreads inbound internal links over the whole catalogue instead
 * of concentrating them on three pages.
 */
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function pickRelated(all: Tour[], current: Tour): Tour[] {
  const others = all.filter((t) => t.slug !== current.slug);

  const score = (t: Tour) =>
    (t.category === current.category ? 100 : 0) +
    (t.origin === current.origin ? 20 : 0) +
    (t.difficulty === current.difficulty ? 5 : 0);

  // Sort by relevance, tie-break by a slug-seeded rotation so the same three
  // tours don't win on every page in the category. The rotation also folds in
  // each candidate's own index so that, summed across all tour pages, every
  // tour lands in some page's top slots — no tour is left with zero inbound
  // internal links (which is what strands a page as "Discovered, not indexed").
  const seed = hash(current.slug);
  const ranked = others
    .map((t) => ({ t, s: score(t), r: (hash(t.slug) * 7 + seed) % 997 }))
    .sort((a, b) => b.s - a.s || a.r - b.r)
    .map((x) => x.t);

  // Guarantee at least one out-of-category pick so authority crosses silos:
  // if the top 4 are all the same category, swap the 4th for the best
  // different-category tour.
  const top = ranked.slice(0, 4);
  if (top.length === 4 && top.every((t) => t.category === current.category)) {
    const crossSilo = ranked.find((t) => t.category !== current.category);
    if (crossSilo) top[3] = crossSilo;
  }
  return top;
}

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
  const all = toursFor(lang);
  const current = all.find((t) => t.slug === currentSlug);
  if (!current) return null;

  const related = pickRelated(all, current);
  if (!related.length) return null;

  const categoryLabel = (dict.categories as unknown as Record<string, string>)[category] ?? category;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-charcoal text-3xl font-bold mb-8">
          {dict.tourDetail.moreCategoryAdventures.replace("{category}", categoryLabel)}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((tour) => (
            <TourCard key={tour.id} tour={tour} lang={lang} dict={dict} />
          ))}
        </div>
      </div>
    </section>
  );
}
