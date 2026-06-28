import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarBlank, Clock, ArrowRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import { BLOG_POSTS, BLOG_CATEGORIES, BLOG_REGIONS, type BlogPost, type BlogRegion } from "@/lib/blog";
import { getDictionary, hasLocale } from "../dictionaries";
type LangParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.blog.pageTitle,
    description: dict.blog.pageSubtitle,
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/blog`,
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  trekking: "bg-forest/10 text-forest",
  desert: "bg-sunset/10 text-orange-700",
  culture: "bg-purple-100 text-purple-700",
  tips: "bg-blue-100 text-blue-700",
  wildlife: "bg-green-100 text-green-700",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPage({
  params,
  searchParams,
}: LangParams & { searchParams: Promise<{ category?: string; region?: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const { category, region } = await searchParams;

  const activeCategory = BLOG_CATEGORIES.find((c) => c.id === category) ?? null;
  const activeRegion = BLOG_REGIONS.find((r) => r.id === region) ?? null;

  const pillarPost = BLOG_POSTS.find((p) => p.slug === "morocco-ultimate-adventure-travel-guide")!;
  const nonPillarPosts = BLOG_POSTS.filter((p) => p.slug !== "morocco-ultimate-adventure-travel-guide");

  const filteredPosts = nonPillarPosts.filter((p) => {
    const matchCat = !activeCategory || p.category === activeCategory.id;
    const matchRegion = !activeRegion || p.region === (activeRegion.id as BlogRegion);
    return matchCat && matchRegion;
  });

  const isFiltering = activeCategory || activeRegion;
  const [featured, ...rest] = filteredPosts;

  function PostCard({ post }: { post: BlogPost }) {
    const postRegion = post.region ? BLOG_REGIONS.find((r) => r.id === post.region) : null;
    return (
      <Link href={`/${lang}/blog/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
        <div className="relative h-52 overflow-hidden">
          <Image src={post.heroImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${CATEGORY_COLORS[post.category]}`}>{post.category}</span>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-serif text-charcoal font-bold text-lg mb-3 group-hover:text-forest transition-colors leading-snug">{post.title}</h3>
          <p className="text-charcoal/60 text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-charcoal/40 mt-auto">
            <span className="flex items-center gap-1">
              {postRegion && postRegion.id !== "root" ? (
                <span className="text-charcoal/50">{postRegion.icon} {postRegion.label}</span>
              ) : (
                <><CalendarBlank className="w-3.5 h-3.5" />{formatDate(post.publishedAt)}</>
              )}
            </span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime} {dict.blog.minRead}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-[55vh] min-h-[380px] flex items-end">
        <Image src="https://images.unsplash.com/photo-1560789590-ee4cc7125967?w=1920&q=80" alt="Morocco travel" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <h1 className="font-serif text-white text-6xl lg:text-7xl font-bold leading-tight">{dict.blog.pageTitle}</h1>
          <p className="text-white/70 mt-3 text-xl">{dict.blog.pageSubtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {!isFiltering && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="w-4 h-4 text-sunset" />
              <span className="text-sm font-semibold text-charcoal/50 uppercase tracking-widest">{dict.blog.startHere}</span>
            </div>
            <Link href={`/${lang}/blog/${pillarPost.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-charcoal shadow-xl hover:shadow-2xl transition-shadow">
                <div className="relative h-64 lg:h-auto min-h-[340px]">
                  <Image src={pillarPost.heroImage} alt={pillarPost.title} fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 to-transparent lg:bg-none" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-charcoal">
                  <span className="inline-flex items-center gap-2 text-sunset text-xs font-semibold uppercase tracking-widest mb-4">🇲🇦 {dict.blog.completeGuide}</span>
                  <h2 className="font-serif text-white text-2xl lg:text-4xl font-bold mb-4 group-hover:text-sand transition-colors leading-tight">{pillarPost.title}</h2>
                  <p className="text-white/60 leading-relaxed mb-6 text-sm lg:text-base">{pillarPost.excerpt}</p>
                  <div className="flex items-center gap-3 text-sm text-white/40">
                    <span>{pillarPost.readTime} {dict.blog.minRead}</span>
                    <span>·</span>
                    <span>{pillarPost.author?.name}</span>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sunset font-semibold text-sm group-hover:gap-3 transition-all">
                    {dict.blog.readGuide} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {!isFiltering && (
          <div className="mb-16">
            <h2 className="font-serif text-charcoal text-3xl font-bold mb-2">{dict.blog.exploreByRegion}</h2>
            <p className="text-charcoal/50 mb-7 text-sm">{dict.blog.exploreByRegionDesc}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {BLOG_REGIONS.filter((r) => r.id !== "root").map((r) => {
                const count = nonPillarPosts.filter((p) => p.region === r.id).length;
                return (
                  <Link key={r.id} href={`/${lang}/blog?region=${r.id}`}
                    className="group flex flex-col items-center text-center p-5 bg-white rounded-2xl shadow-sm hover:shadow-md hover:border-forest border border-transparent transition-all">
                    <span className="text-3xl mb-2">{r.icon}</span>
                    <span className="font-semibold text-charcoal text-sm group-hover:text-forest transition-colors leading-snug">{r.label}</span>
                    <span className="text-charcoal/40 text-xs mt-1">{count} {count !== 1 ? dict.blog.articles : dict.blog.article}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {activeRegion && (
          <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="font-serif text-charcoal text-3xl font-bold">{activeRegion.icon} {activeRegion.label}</h2>
              <p className="text-charcoal/50 mt-1 text-sm">{activeRegion.description} · {filteredPosts.length} {filteredPosts.length !== 1 ? dict.blog.articles : dict.blog.article}</p>
            </div>
            <Link href={`/${lang}/blog`} className="text-sm text-forest font-semibold hover:underline">{dict.blog.allRegions}</Link>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mb-10">
          <Link href={activeRegion ? `/${lang}/blog?region=${activeRegion.id}` : `/${lang}/blog`}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${!activeCategory ? "bg-forest text-white" : "bg-white border border-sand-dark text-charcoal hover:border-forest hover:text-forest"}`}>
            {dict.blog.allTopics}
          </Link>
          {BLOG_CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/${lang}/blog?category=${cat.id}${activeRegion ? `&region=${activeRegion.id}` : ""}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory?.id === cat.id ? "bg-forest text-white" : "bg-white border border-sand-dark text-charcoal hover:border-forest hover:text-forest"}`}>
              {cat.icon} {cat.label}
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-charcoal/40 text-lg">{dict.blog.noArticles}</p>
            <Link href={`/${lang}/blog`} className="mt-4 inline-block text-forest font-semibold hover:underline">{dict.blog.viewAll}</Link>
          </div>
        )}

        {featured && !isFiltering && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-sm font-semibold text-charcoal/50 uppercase tracking-widest">{dict.blog.latestArticles}</span>
            </div>
          </div>
        )}

        {featured && (
          <Link href={`/${lang}/blog/${featured.slug}`} className="group block mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow">
              <div className="relative h-64 lg:h-auto min-h-[320px]">
                <Image src={featured.heroImage} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 ${CATEGORY_COLORS[featured.category]}`}>{featured.category}</span>
                <h2 className="font-serif text-charcoal text-2xl lg:text-3xl font-bold mb-4 group-hover:text-forest transition-colors leading-snug">{featured.title}</h2>
                <p className="text-charcoal/60 leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-charcoal/40">
                  {featured.author && <span className="text-charcoal/60 font-medium">{featured.author.name}</span>}
                  <span className="flex items-center gap-1.5"><CalendarBlank className="w-4 h-4" />{formatDate(featured.publishedAt)}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{featured.readTime} {dict.blog.minRead}</span>
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

        <div className="mt-20 bg-forest rounded-3xl p-10 text-center text-white">
          <h2 className="font-serif text-3xl font-bold mb-3">{dict.blog.readyTitle}</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">{dict.blog.readyDesc}</p>
          <Link href={`/${lang}/tours`} className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-sunset text-white font-semibold hover:bg-orange-600 transition-colors">
            {dict.blog.browseAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
