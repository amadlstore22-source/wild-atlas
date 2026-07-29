import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "@phosphor-icons/react/dist/ssr";
import { blogPostsFor } from "@/lib/blog-i18n";
import type { BlogPost } from "@/lib/blog";
import type { Tour } from "@/lib/tours";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

/**
 * Tour → blog "Related Guides" section — the mirror of RelatedTourCards
 * (blog → tour). Its whole job is SEO plumbing: the site has a deep blog, but
 * the money pages (tours) linked to none of it, so topical authority never
 * flowed INTO the pages that convert. This surfaces 3–4 relevant guides on
 * every tour page, which (a) tells Google the tour is the commercial hub of a
 * content cluster, (b) keeps visitors on-site, and (c) answers pre-booking
 * questions that otherwise cause drop-off.
 *
 * Matching: an explicit `tour.relatedPosts` list wins; otherwise posts are
 * scored automatically so every tour gets links without hand-curation.
 *   - blog region matches the tour's area   +25  (atlas↔trek, sahara↔desert…)
 *   - blog category matches tour category    +15
 *   - post slug/title mentions a word from the tour slug +30 each (e.g. a
 *     "toubkal" tour surfaces "toubkal-*" posts)
 * Posts always resolve via blogPostsFor (English fallback per locale), so a
 * locale with untranslated posts still gets links.
 */

// Map a tour to the blog regions that are topically "its area".
function regionsForTour(tour: Tour): string[] {
  const r: string[] = [];
  if (tour.origin === "agadir") r.push("agadir-region", "coast-atlantic");
  if (tour.origin === "marrakech") r.push("imperial-cities");
  if (tour.category === "trekking") r.push("atlas-mountains");
  if (tour.category === "desert") r.push("sahara-south");
  if (tour.category === "cultural") r.push("imperial-cities", "culture" as string);
  return r;
}

// Map a tour category to the blog category vocabulary (they nearly align).
function blogCategoryForTour(tour: Tour): BlogPost["category"] | null {
  switch (tour.category) {
    case "trekking":
      return "trekking";
    case "desert":
      return "desert";
    case "cultural":
      return "culture";
    default:
      return null;
  }
}

function pickGuides(posts: BlogPost[], tour: Tour): BlogPost[] {
  // Explicit curation wins, in the given order.
  if (tour.relatedPosts?.length) {
    const bySlug = new Map(posts.map((p) => [p.slug, p]));
    const chosen = tour.relatedPosts
      .map((slug) => bySlug.get(slug))
      .filter((p): p is BlogPost => p !== undefined);
    if (chosen.length) return chosen.slice(0, 4);
  }

  const regions = new Set(regionsForTour(tour));
  const blogCat = blogCategoryForTour(tour);
  // Distinctive words from the tour slug (drop generic ones) — a "toubkal" or
  // "merzouga" or "ourika" tour should surface posts naming that place.
  const GENERIC = new Set([
    "day", "trip", "tour", "trek", "2day", "3day", "4day", "5day", "6day",
    "from", "the", "and", "marrakech", "agadir", "desert", "valley",
  ]);
  const slugWords = tour.slug
    .split("-")
    .filter((w) => w.length > 3 && !GENERIC.has(w));

  const score = (p: BlogPost) => {
    let s = 0;
    if (p.region && regions.has(p.region)) s += 25;
    if (blogCat && p.category === blogCat) s += 15;
    const hay = (p.slug + " " + p.title).toLowerCase();
    for (const w of slugWords) if (hay.includes(w)) s += 30;
    return s;
  };

  return posts
    .map((p) => ({ p, s: score(p) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 4)
    .map((x) => x.p);
}

export default function RelatedGuides({
  tour,
  lang,
  dict,
}: {
  tour: Tour;
  lang: Locale;
  dict: Dictionary;
}) {
  const posts = blogPostsFor(lang);
  const guides = pickGuides(posts, tour);
  if (guides.length < 2) return null; // not worth a section for 0–1 links

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 gap-4">
          <h2 className="font-display text-charcoal text-3xl font-bold">
            {dict.tourDetail.relatedGuidesHeading}
          </h2>
          <Link
            href={`/${lang}/blog`}
            className="hidden sm:flex items-center gap-2 text-forest font-semibold hover:gap-3 transition-all shrink-0"
          >
            {dict.tourDetail.readMoreGuides}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((post) => (
            <Link
              key={post.slug}
              href={`/${lang}/blog/${post.slug}`}
              className="group bg-card rounded-[4px] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <p className="text-charcoal font-semibold leading-snug group-hover:text-forest transition-colors">
                  {post.title}
                </p>
                <p className="text-ink-muted text-xs mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readTime} {dict.blog.minRead}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
