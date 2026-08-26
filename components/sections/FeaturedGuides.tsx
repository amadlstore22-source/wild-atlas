import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "@phosphor-icons/react/dist/ssr";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { blogPostsFor, blogSlugFor } from "@/lib/blog-i18n";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface Props {
  dict: Dictionary;
  lang: Locale;
}

/**
 * Three of our own guides, on the homepage.
 *
 * The blog is 80 posts deep in six languages and was reachable from the
 * homepage only through the nav: NewsTeaserSection shows *external* news and
 * falls back to blog posts only when that feed fails — so on a good day the
 * homepage's only editorial links pointed off-site.
 *
 * These four are pinned rather than taken by date because they are the posts
 * that answer a question someone asks before booking: how hard is it, what
 * does it cost, which desert, what do I pack. Newest-first would surface
 * whatever was written last, which is not the same thing.
 */
const PINNED = [
  "how-to-climb-toubkal-complete-guide",
  "3-day-sahara-tour-cost-marrakech",
  "merzouga-vs-zagora-which-desert-tour",
  "what-to-pack-desert-tour-morocco",
];

export default function FeaturedGuides({ dict, lang }: Props) {
  const posts = blogPostsFor(lang);
  const picked = PINNED.map((slug) => posts.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );
  // Backfill from the catalogue if a pinned slug is ever renamed, so the
  // section never renders a short or empty grid.
  const seen = new Set(picked.map((p) => p.slug));
  const guides = [...picked, ...posts.filter((p) => !seen.has(p.slug))].slice(0, 3);

  if (guides.length === 0) return null;

  return (
    <Section tone="cream">
      <SectionHeader
        eyebrow={dict.featuredGuides.eyebrow}
        title={dict.featuredGuides.title}
        subtitle={dict.featuredGuides.subtitle}
        align="left"
        flourish
        action={
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-indigo text-sm font-semibold hover:gap-3 transition-all group shrink-0"
          >
            {dict.featuredGuides.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" weight="bold" />
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guides.map((post) => (
          <Link
            key={post.slug}
            href={`/${lang}/blog/${blogSlugFor(lang, post.slug)}`}
            className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-sand-deep/40 hover:border-indigo/30 hover:shadow-lg transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={post.heroImage}
                // Every other blog card on the site (blog index, RelatedGuides,
                // NewsSection, the post hero) uses post.title. This one alone
                // shipped alt="", so the homepage's three featured guides were
                // the only blog images Google could not associate with their
                // subject.
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex flex-col flex-1 p-5">
              <h3 className="font-display text-ink text-lg font-bold leading-snug group-hover:text-indigo transition-colors">
                {post.title}
              </h3>
              <p className="text-ink-muted text-sm mt-2 leading-relaxed line-clamp-3 flex-1">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-1.5 text-ink-muted text-xs mt-4">
                <Clock className="w-3.5 h-3.5" weight="bold" />
                {post.readTime} {dict.featuredGuides.minRead}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
