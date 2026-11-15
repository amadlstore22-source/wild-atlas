import { blogPostsFor, isTranslated } from "@/lib/blog-i18n";
import type { BlogPost } from "@/lib/blog";
import type { Category } from "@/lib/tours";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { GuideGrid } from "@/components/tours/RelatedGuides";

/**
 * Our own guides, on the category page that sells the trips they are about.
 *
 * Search Console, 90 days to 2026-11-12: the desert guides earned 254 clicks
 * and 13,780 impressions, while every category page together had 0 clicks and
 * 26 impressions. /categories/desert and /categories/cultural were one
 * sentence, a grid of cards and the FAQ, and linked to none of those guides.
 * The competitors' pages that rank for "desert tours from Marrakech" and
 * "imperial cities tour" carry the comparison (which desert, how many days,
 * private or shared) on the page itself.
 *
 * The comparison already exists here, in the guides. This block puts it one
 * tap from the list of tours, and it makes the category page the hub of its
 * own subject for search engines instead of a page nothing points into.
 *
 * Slugs are English post slugs, in the order to show them: the "which trip"
 * questions first, practical ones after. A guide that has no translation in
 * the page's language is left out rather than shown in English.
 * __tests__/lib/category-guides.test.ts checks every slug is a real post.
 */
export const CATEGORY_GUIDES: Partial<Record<Category, string[]>> = {
  desert: [
    "agafay-vs-merzouga-vs-zagora",
    "3-day-vs-4-day-sahara-tour-marrakech",
    "private-vs-shared-desert-tour-morocco",
    "how-much-does-a-morocco-desert-tour-cost",
    "erg-chebbi-vs-erg-chegaga",
    "luxury-vs-standard-desert-camp-morocco",
    "morocco-desert-in-winter-guide",
    "what-to-pack-desert-tour-morocco",
  ],
  cultural: [
    "morocco-imperial-cities-route-guide",
    "fes-medina-travel-guide",
    "volubilis-roman-ruins-guide",
    "meknes-moulay-idriss-guide",
    "marrakech-to-fes-road-trip-guide",
    "marrakech-to-chefchaouen-tour-cost",
    "chefchaouen-complete-travel-guide",
    "marrakech-medina-complete-guide",
  ],
};

export function categoryGuidesFor(lang: Locale, category: Category): BlogPost[] {
  const slugs = CATEGORY_GUIDES[category] ?? [];
  const bySlug = new Map(blogPostsFor(lang).map((p) => [p.slug, p]));
  return slugs
    .filter((slug) => isTranslated(lang, slug))
    .map((slug) => bySlug.get(slug))
    .filter((p): p is BlogPost => p !== undefined);
}

export default function CategoryGuides({
  category,
  lang,
  dict,
}: {
  category: Category;
  lang: Locale;
  dict: Dictionary;
}) {
  const guides = categoryGuidesFor(lang, category);
  if (guides.length < 2) return null; // not worth a section for 0–1 links

  return (
    <section className="mt-20">
      <GuideGrid
        guides={guides}
        heading={dict.featuredGuides.title}
        moreLabel={dict.featuredGuides.viewAll}
        lang={lang}
        dict={dict}
      />
    </section>
  );
}
