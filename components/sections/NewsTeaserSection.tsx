import Image from "next/image";
import Link from "next/link";
import { fetchNewsArticles, FALLBACK_MOROCCO, FALLBACK_TRAVEL, type NewsArticle } from "@/lib/news";
import { BLOG_POSTS } from "@/lib/blog";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface Props {
  lang: Locale;
  dict: Dictionary;
}

function articleImage(article: NewsArticle): string {
  return article.imageUrl ?? (article.category === "morocco" ? FALLBACK_MOROCCO : FALLBACK_TRAVEL);
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

export default async function NewsTeaserSection({ lang, dict }: Props) {
  let articles = await fetchNewsArticles().catch(() => []);
  const hasFallback = articles.length === 0;

  const featured = hasFallback ? null : articles[0];
  const sideArticles = hasFallback ? [] : articles.slice(1, 3);
  const fallbackPost = hasFallback ? BLOG_POSTS[0] : null;
  const fallbackSide = hasFallback ? BLOG_POSTS.slice(1, 3) : [];

  return (
    <section className="py-20 bg-white border-t border-sand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sunset text-xs font-bold uppercase tracking-[0.2em] mb-3">
              {dict.news.eyebrow}
            </p>
            <h2 className="font-serif text-charcoal font-bold" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
              {dict.news.title}
            </h2>
          </div>
          <Link
            href={`/${lang}/news`}
            className="shrink-0 text-sm font-semibold text-forest hover:text-moss underline underline-offset-4 transition-colors hidden sm:block"
          >
            {dict.news.viewAll} →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {featured ? (
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-2xl overflow-hidden h-72 sm:h-96"
              >
                <Image
                  src={articleImage(featured)}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold text-white mb-3 ${
                      featured.category === "morocco" ? "bg-forest" : "bg-sunset"
                    }`}
                  >
                    {featured.category === "morocco" ? dict.news.morocco : dict.news.travel}
                  </span>
                  <h3 className="font-serif text-white font-bold text-xl sm:text-2xl leading-snug mb-2 line-clamp-2">
                    {featured.title}
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed line-clamp-2 mb-3">
                    {featured.excerpt}
                  </p>
                  <p className="text-white/50 text-xs">
                    {dict.news.source} {featured.source} · {formatDate(featured.publishedAt)}
                  </p>
                </div>
              </a>
            ) : fallbackPost ? (
              <Link
                href={`/${lang}/blog/${fallbackPost.slug}`}
                className="group relative block rounded-2xl overflow-hidden h-72 sm:h-96"
              >
                <Image
                  src={fallbackPost.heroImage}
                  alt={fallbackPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-white font-bold text-xl sm:text-2xl leading-snug mb-2 line-clamp-2">
                    {fallbackPost.title}
                  </h3>
                  <p className="text-white/60 text-xs">{formatDate(fallbackPost.publishedAt)}</p>
                </div>
              </Link>
            ) : null}
          </div>

          <div className="flex flex-col gap-4">
            {hasFallback
              ? fallbackSide.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/${lang}/blog/${post.slug}`}
                    className="group flex gap-4 bg-sand/30 rounded-2xl p-4 hover:bg-sand/50 transition-colors"
                  >
                    <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden">
                      <Image src={post.heroImage} alt={post.title} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-charcoal text-sm font-bold leading-snug line-clamp-2 group-hover:text-forest transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-charcoal/40 text-xs mt-1">{formatDate(post.publishedAt)}</p>
                    </div>
                  </Link>
                ))
              : sideArticles.map((article) => (
                  <a
                    key={article.id}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-4 bg-sand/30 rounded-2xl p-4 hover:bg-sand/50 transition-colors"
                  >
                    <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden">
                      <Image src={articleImage(article)} alt={article.title} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="min-w-0">
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider mb-1 ${article.category === "morocco" ? "text-forest" : "text-sunset"}`}>
                        {article.category === "morocco" ? dict.news.morocco : dict.news.travel}
                      </span>
                      <h4 className="font-serif text-charcoal text-sm font-bold leading-snug line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-charcoal/40 text-xs mt-1">{article.source} · {formatDate(article.publishedAt)}</p>
                    </div>
                  </a>
                ))
            }

            <Link
              href={`/${lang}/news`}
              className="mt-auto text-center py-3 rounded-xl border-2 border-forest/20 text-forest text-sm font-semibold hover:bg-forest hover:text-white transition-all"
            >
              {dict.news.viewAll} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
