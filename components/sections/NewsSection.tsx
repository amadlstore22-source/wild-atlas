import Image from "next/image";
import Link from "next/link";
import { fetchNewsArticles, type NewsArticle, FALLBACK_MOROCCO, FALLBACK_TRAVEL } from "@/lib/news";
import { BLOG_POSTS } from "@/lib/blog";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface Props {
  lang: Locale;
  dict: Dictionary;
  showViewAll?: boolean;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

function articleImage(article: NewsArticle): string {
  return article.imageUrl ?? (article.category === "morocco" ? FALLBACK_MOROCCO : FALLBACK_TRAVEL);
}

export default async function NewsSection({ lang, dict, showViewAll = true }: Props) {
  let articles: NewsArticle[] = [];
  try {
    articles = await fetchNewsArticles();
  } catch {
    articles = [];
  }

  const hasFallback = articles.length === 0;
  const fallbackPosts = BLOG_POSTS.slice(0, 6);

  return (
    <section className="py-20 bg-sand/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-sunset text-xs font-bold uppercase tracking-[0.2em] mb-3">
              {dict.news.eyebrow}
            </p>
            <h2 className="font-display text-charcoal font-bold" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}>
              {hasFallback ? dict.blog.latestArticles : dict.news.title}
            </h2>
            <p className="text-ink-soft mt-2 text-sm max-w-xl">
              {hasFallback ? dict.blog.pageSubtitle : dict.news.subtitle}
            </p>
          </div>
          {showViewAll && (
            <Link
              href={hasFallback ? `/${lang}/blog` : `/${lang}/news`}
              className="shrink-0 text-sm font-semibold text-forest hover:text-moss underline underline-offset-4 transition-colors"
            >
              {dict.news.viewAll} →
            </Link>
          )}
        </div>

        {/* No "feed unavailable" banner. Morocco travel news is intermittent, so
            an empty feed is the normal case rather than a fault, and the section
            already swaps its heading/subtitle to present our own articles as the
            intended content. Announcing a failure the visitor cannot act on just
            made a working fallback look broken. */}

        {hasFallback ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fallbackPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/${lang}/blog/${post.slug}`}
                className="group bg-card rounded-[4px] overflow-hidden shadow-sm border border-sand-dark hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.heroImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-ink-muted mb-2">{formatDate(post.publishedAt)}</p>
                  <h3 className="font-display text-charcoal font-bold text-base leading-snug line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-ink-soft text-sm line-clamp-3">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card rounded-[4px] overflow-hidden shadow-sm border border-sand-dark hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={articleImage(article)}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white ${
                      article.category === "morocco" ? "bg-forest" : "bg-sunset"
                    }`}
                  >
                    {article.category === "morocco" ? dict.news.morocco : dict.news.travel}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-ink-muted mb-2">
                    {dict.news.source} <span className="font-semibold">{article.source}</span>
                    {" · "}{formatDate(article.publishedAt)}
                  </p>
                  <h3 className="font-display text-charcoal font-bold text-base leading-snug line-clamp-2 mb-2 group-hover:text-forest transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-ink-soft text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
