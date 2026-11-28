import { formatDate } from "@/lib/format-date";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { BlogPost } from "@/lib/blog";
import { blogPostsFor, blogCategoriesFor, blogRegionsFor, blogSlugFor } from "@/lib/blog-i18n";
import { ZelligeBand, ZelligeField } from "@/components/ui/MoroccanMotifs";
import { getDictionary, hasLocale, LOCALES } from "../dictionaries";
import { hreflangForPath } from "@/lib/seo/hreflang";
import JsonLd from "@/components/seo/JsonLd";
import { collectionPageDocument } from "@/lib/seo/schema";
import BlogIndexClient, { type IndexPost } from "./BlogIndexClient";
type LangParams = { params: Promise<{ lang: string }> };

// PRERENDERED (2026-11-27). This page read ?category= and ?region= on the
// server, which made it render on every request (no-store, never cached).
// The filters now run in the browser (BlogIndexClient); every card is still
// in the server HTML. Filtered URLs stay out of the index through the
// "X-Robots-Tag: noindex, follow" header that proxy.ts adds for them, since a
// prerendered page cannot vary its <meta robots> by query string.
export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.blog.pageTitle,
    description: dict.blog.pageSubtitle,
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/blog`,
      languages: hreflangForPath(LOCALES, "/blog"),
    },
  };
}

const PILLAR = "morocco-ultimate-adventure-travel-guide";

export default async function BlogPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang;
  const dict = await getDictionary(lang);

  const posts = blogPostsFor(lang);
  const toIndex = (p: BlogPost): IndexPost => ({
    slug: p.slug,
    href: `/${lang}/blog/${blogSlugFor(locale, p.slug)}`,
    title: p.title,
    excerpt: p.excerpt,
    heroImage: p.heroImage,
    category: p.category,
    region: p.region,
    date: formatDate(p.publishedAt, lang),
    readTime: p.readTime,
    author: p.author?.name,
  });
  const pillarPost = posts.find((p) => p.slug === PILLAR)!;
  const nonPillarPosts = posts.filter((p) => p.slug !== PILLAR);

  const schema = collectionPageDocument({
    lang: locale,
    path: `/${locale}/blog`,
    name: dict.blog.pageTitle,
    items: blogPostsFor(locale).map((p) => ({ name: p.title, path: `/${locale}/blog/${blogSlugFor(locale, p.slug)}` })),
  });

  return (
    <div>
      <JsonLd data={schema} />
      <div className="relative h-[55vh] min-h-[380px] flex items-end">
        <Image
          src="/gallery/destination-hero-toubkal-snow.jpg"
          alt="Morocco travel"
          fill
          sizes="100vw"
          className="object-cover"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/82 via-indigo-deep/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <h1 className="hero-title font-display text-6xl lg:text-7xl font-bold leading-tight">{dict.blog.pageTitle}</h1>
          <p className="text-white/70 mt-3 text-xl">{dict.blog.pageSubtitle}</p>
        </div>
        <ZelligeBand tone="light" height={22} className="absolute bottom-0 left-0 opacity-80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ZelligeField tone="clay" opacity={0.08} scale={140} />

        <BlogIndexClient
          lang={lang}
          t={dict.blog}
          pillar={toIndex(pillarPost)}
          posts={nonPillarPosts.map(toIndex)}
          regions={blogRegionsFor(lang)}
          categories={blogCategoriesFor(lang)}
        />

        <div className="mt-20 bg-forest rounded-[4px] p-10 text-center text-white">
          <h2 className="font-display text-3xl font-bold text-white mb-3">{dict.blog.readyTitle}</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">{dict.blog.readyDesc}</p>
          <Link href={`/${lang}/tours`} className="btn-brass">
            {dict.blog.browseAll} <ArrowRight className="w-4 h-4 arrow-go" />
          </Link>
        </div>
      </div>
    </div>
  );
}
