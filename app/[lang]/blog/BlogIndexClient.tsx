"use client";

import { Suspense, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarBlank, Clock, ArrowRight, MapPin } from "@phosphor-icons/react";
import SearchParamsListener from "@/components/seo/SearchParamsListener";
import type { Dictionary } from "../dictionaries";

/** A post as the index needs it: links and dates resolved on the server. */
export type IndexPost = {
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  heroImage: string;
  category: string;
  region?: string;
  date: string;
  readTime: number;
  author?: string;
};
type Region = { id: string; label: string; icon: string; description: string };
type Category = { id: string; label: string; icon: string };

// Solid, high-contrast badges — these sit over hero photos, so a translucent
// tint with same-hue text disappears on darker images. White text on a solid
// brand color reads on any background.
// Category badges toned to the Moroccan palette — one family (emerald, terracotta,
// zellij blue, brass, olive) so they read as a set rather than clashing brights.
const CATEGORY_COLORS: Record<string, string> = {
  trekking: "bg-indigo text-cream",
  desert: "bg-terracotta text-cream",
  culture: "bg-indigo-deep text-cream",
  tips: "bg-saffron-deep text-cream", // bg-saffron with cream is 3.12:1; deep is 6.06:1
  wildlife: "bg-[#5A6B8C] text-cream",
};

/**
 * The /blog index below the hero. ?category= and ?region= are read in the
 * browser (SearchParamsListener) so the page itself can be prerendered; the
 * unfiltered index, every card included, is in the server HTML as before.
 */
export default function BlogIndexClient({
  lang,
  t,
  pillar,
  posts,
  regions,
  categories,
}: {
  lang: string;
  t: Dictionary["blog"];
  pillar: IndexPost;
  posts: IndexPost[];
  regions: Region[];
  categories: Category[];
}) {
  const [category, setCategory] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const onParams = useCallback((sp: URLSearchParams) => {
    setCategory(sp.get("category"));
    setRegion(sp.get("region"));
  }, []);

  const activeCategory = categories.find((c) => c.id === category) ?? null;
  const activeRegion = regions.find((r) => r.id === region) ?? null;

  const filteredPosts = posts.filter((p) => {
    const matchCat = !activeCategory || p.category === activeCategory.id;
    const matchRegion = !activeRegion || p.region === activeRegion.id;
    return matchCat && matchRegion;
  });

  const isFiltering = activeCategory || activeRegion;
  const [featured, ...rest] = filteredPosts;

  function PostCard({ post }: { post: IndexPost }) {
    const postRegion = post.region ? regions.find((r) => r.id === post.region) : null;
    return (
      <Link href={post.href} className="group bg-card rounded-[4px] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
        <div className="relative h-52 overflow-hidden">
          <Image src={post.heroImage} alt={post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${CATEGORY_COLORS[post.category]}`}>{post.category}</span>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-display text-charcoal font-bold text-lg mb-3 group-hover:text-forest transition-colors leading-snug">{post.title}</h3>
          <p className="text-ink-soft text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-ink-muted mt-auto">
            <span className="flex items-center gap-1">
              {postRegion && postRegion.id !== "root" ? (
                <span className="text-ink-soft">{postRegion.icon} {postRegion.label}</span>
              ) : (
                <><CalendarBlank className="w-3.5 h-3.5" />{post.date}</>
              )}
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime} {t.minRead}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsListener onChange={onParams} />
      </Suspense>

      {!isFiltering && (
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-5">
            <MapPin className="w-4 h-4 text-sunset" />
            <span className="text-sm font-semibold text-ink-soft uppercase tracking-widest">{t.startHere}</span>
          </div>
          <Link href={pillar.href} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[4px] overflow-hidden tex-emerald shadow-xl hover:shadow-2xl transition-shadow">
              <div className="relative h-64 lg:h-auto min-h-[340px]">
                <Image src={pillar.heroImage} alt={pillar.title} fill sizes="(max-width: 1024px) 100vw, 640px" className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 to-transparent lg:bg-none" />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center tex-emerald">
                <span className="inline-flex items-center gap-2 text-brass-glow text-xs font-semibold uppercase tracking-widest mb-4">🇲🇦 {t.completeGuide}</span>
                <h2 className="font-display text-white text-2xl lg:text-4xl font-bold mb-4 group-hover:text-sand transition-colors leading-tight">{pillar.title}</h2>
                <p className="text-white/60 leading-relaxed mb-6 text-sm lg:text-base">{pillar.excerpt}</p>
                <div className="flex items-center gap-3 text-sm text-white/40">
                  <span>{pillar.readTime} {t.minRead}</span>
                  <span>·</span>
                  <span>{pillar.author}</span>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sunset font-semibold text-sm">
                  {t.readGuide} <ArrowRight className="w-4 h-4 arrow-go" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {!isFiltering && (
        <div className="mb-16">
          <h2 className="font-display text-charcoal text-3xl font-bold mb-2">{t.exploreByRegion}</h2>
          <p className="text-ink-soft mb-7 text-sm">{t.exploreByRegionDesc}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {regions.filter((r) => r.id !== "root").map((r) => {
              const count = posts.filter((p) => p.region === r.id).length;
              return (
                <Link key={r.id} href={`/${lang}/blog?region=${r.id}`}
                  className="group flex flex-col items-center text-center p-5 bg-card rounded-[4px] shadow-sm hover:shadow-md hover:border-forest border border-transparent transition">
                  <span className="text-3xl mb-2">{r.icon}</span>
                  <span className="font-semibold text-charcoal text-sm group-hover:text-forest transition-colors leading-snug">{r.label}</span>
                  <span className="text-ink-muted text-xs mt-1">{count} {count !== 1 ? t.articles : t.article}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {activeRegion && (
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="font-display text-charcoal text-3xl font-bold">{activeRegion.icon} {activeRegion.label}</h2>
            <p className="text-ink-soft mt-1 text-sm">{activeRegion.description} · {filteredPosts.length} {filteredPosts.length !== 1 ? t.articles : t.article}</p>
          </div>
          <Link href={`/${lang}/blog`} className="text-sm text-forest font-semibold hover:underline">{t.allRegions}</Link>
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-10">
        <Link href={activeRegion ? `/${lang}/blog?region=${activeRegion.id}` : `/${lang}/blog`}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${!activeCategory ? "bg-forest text-white" : "bg-card border border-sand-dark text-charcoal hover:border-forest hover:text-forest"}`}>
          {t.allTopics}
        </Link>
        {categories.map((cat) => (
          <Link key={cat.id} href={`/${lang}/blog?category=${cat.id}${activeRegion ? `&region=${activeRegion.id}` : ""}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory?.id === cat.id ? "bg-forest text-white" : "bg-card border border-sand-dark text-charcoal hover:border-forest hover:text-forest"}`}>
            {cat.icon} {cat.label}
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-24">
          <p className="text-ink-muted text-lg">{t.noArticles}</p>
          <Link href={`/${lang}/blog`} className="mt-4 inline-block text-forest font-semibold hover:underline">{t.viewAll}</Link>
        </div>
      )}

      {featured && !isFiltering && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-sm font-semibold text-ink-soft uppercase tracking-widest">{t.latestArticles}</span>
          </div>
        </div>
      )}

      {featured && (
        <Link href={featured.href} className="group block mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[4px] overflow-hidden bg-card shadow-md hover:shadow-xl transition-shadow">
            <div className="relative h-64 lg:h-auto min-h-[320px]">
              <Image src={featured.heroImage} alt={featured.title} fill sizes="(max-width: 1024px) 100vw, 640px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 ${CATEGORY_COLORS[featured.category]}`}>{featured.category}</span>
              <h2 className="font-display text-charcoal text-2xl lg:text-3xl font-bold mb-4 group-hover:text-forest transition-colors leading-snug">{featured.title}</h2>
              <p className="text-ink-soft leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-ink-muted">
                {featured.author && <span className="text-ink-soft font-medium">{featured.author}</span>}
                <span className="flex items-center gap-1.5"><CalendarBlank className="w-4 h-4" />{featured.date}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{featured.readTime} {t.minRead}</span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      )}
    </>
  );
}
