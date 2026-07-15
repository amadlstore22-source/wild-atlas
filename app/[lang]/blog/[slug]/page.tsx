import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarBlank, Clock, ArrowLeft, ArrowRight, Tag } from "@phosphor-icons/react/dist/ssr";
import { BLOG_POSTS, BLOG_REGIONS, getBlogPost } from "@/lib/blog";
import { getDictionary, hasLocale } from "../../dictionaries";
type BlogParams = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  return BLOG_POSTS.flatMap((p) =>
    ["en", "fr", "es", "de", "it", "ar"].map((lang) => ({ lang, slug: p.slug }))
  );
}

export async function generateMetadata({ params }: BlogParams): Promise<Metadata> {
  const { slug, lang } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const LOCALES = ["en", "fr", "es", "de", "it", "ar"];
  return {
    title: post.seoTitle ?? `${post.title} | Marrakech Eco Tours`,
    description: post.seoDescription ?? post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [{ url: post.heroImage }], type: "article", publishedTime: post.publishedAt },
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/blog/${slug}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `https://marrakechecotours.com/${l}/blog/${slug}`])
      ),
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  trekking: "bg-indigo/10 text-indigo",
  desert: "bg-terracotta/12 text-terracotta",
  culture: "bg-indigo-deep/10 text-indigo-deep",
  tips: "bg-saffron/15 text-[#9A5A1E]",
  wildlife: "bg-[#5A6B8C]/12 text-[#43506B]",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: BlogParams) {
  const { slug, lang } = await params;
  if (!hasLocale(lang)) notFound();
  const post = getBlogPost(slug);
  if (!post) notFound();
  const dict = await getDictionary(lang);

  const postIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const prev = postIndex > 0 ? BLOG_POSTS[postIndex - 1] : null;
  const next = postIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[postIndex + 1] : null;

  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug !== slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
  ).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "Marrakech Eco Tours" },
    publisher: { "@type": "Organization", name: "Marrakech Eco Tours", logo: { "@type": "ImageObject", url: "https://marrakechecotours.com/logo.png" } },
  };

  function escHtml(s: string) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  const lines = post.content.trim().split("\n");
  const htmlParts: string[] = [];
  let inList = false;
  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (inList) { htmlParts.push("</ul>"); inList = false; }
      htmlParts.push(`<h2>${escHtml(line.slice(3))}</h2>`);
    } else if (line.startsWith("### ")) {
      if (inList) { htmlParts.push("</ul>"); inList = false; }
      htmlParts.push(`<h3>${escHtml(line.slice(4))}</h3>`);
    } else if (line.startsWith("- ")) {
      if (!inList) { htmlParts.push("<ul>"); inList = true; }
      htmlParts.push(`<li>${escHtml(line.slice(2))}</li>`);
    } else if (line.trim() === "") {
      if (inList) { htmlParts.push("</ul>"); inList = false; }
    } else if (line.startsWith("|")) {
      if (inList) { htmlParts.push("</ul>"); inList = false; }
    } else {
      if (inList) { htmlParts.push("</ul>"); inList = false; }
      const escaped = escHtml(line).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      htmlParts.push(`<p>${escaped}</p>`);
    }
  }
  if (inList) htmlParts.push("</ul>");
  const htmlContent = htmlParts.join("\n");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div>
        <div className="relative h-[55vh] min-h-[360px] overflow-hidden">
          <Image src={post.heroImage} alt={post.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/80 via-indigo-deep/30 to-indigo-deep/15" />
          <div className="absolute inset-0 flex flex-col justify-end max-w-4xl mx-auto px-4 sm:px-6 pb-12 w-full left-0 right-0">
            <nav className="flex items-center gap-2 text-white/60 text-sm mb-5 flex-wrap">
              <Link href={`/${lang}/blog`} className="hover:text-white transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> {dict.blog.pageTitle}
              </Link>
              {post.region && post.region !== "root" && (() => {
                const region = BLOG_REGIONS.find((r) => r.id === post.region);
                return region ? (
                  <><span className="text-white/30">›</span><span className="text-white/70">{region.icon} {region.label}</span></>
                ) : null;
              })()}
            </nav>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 w-fit ${CATEGORY_COLORS[post.category]}`}>{post.category}</span>
            <h1 className="font-display text-white text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4">{post.title}</h1>
            <div className="flex items-center gap-5 text-white/60 text-sm flex-wrap">
              {post.author && (
                <span className="flex items-center gap-1.5 text-white/80 font-medium">
                  {post.author.isGuest ? dict.blog.guestPost : dict.blog.by} {post.author.name}
                  {post.author.isGuest && <span className="text-white/40 font-normal">· {dict.blog.guestContributor}</span>}
                </span>
              )}
              <span className="flex items-center gap-1.5"><CalendarBlank className="w-4 h-4" />{formatDate(post.publishedAt)}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime} {dict.blog.minRead}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-14">
            <article className="bg-card rounded-[4px] p-8 sm:p-12 shadow-sm">
              <p className="text-xl text-ink-soft leading-relaxed mb-8 font-medium border-l-4 border-sunset pl-5">{post.excerpt}</p>
              <div className="blog-prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
              <div className="mt-10 pt-8 border-t border-sand-dark flex flex-wrap gap-2">
                <Tag className="w-4 h-4 text-ink-muted mt-0.5" />
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-sand rounded-full text-xs text-ink-soft font-medium">{tag}</span>
                ))}
              </div>
            </article>

            <aside className="space-y-6">
              <div className="bg-forest rounded-[4px] p-6 text-white sticky top-24">
                <h3 className="font-display text-xl font-bold mb-2">{dict.tourDetail.planYourTrip}</h3>
                <p className="text-white/70 text-sm mb-5 leading-relaxed">{dict.tourDetail.sidebarDesc}</p>
                <Link href={`/${lang}/tours`} className="block text-center px-5 py-3 rounded-full bg-sunset text-white font-semibold text-sm hover:bg-emerald-soft transition-colors mb-3">
                  {dict.tourDetail.browseAllTours}
                </Link>
                <Link href={`/${lang}/contact`} className="block text-center px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-colors">
                  {dict.tourDetail.planCustomTrip}
                </Link>
              </div>

              {relatedPosts.length > 0 && (
                <div className="bg-card rounded-[4px] p-6 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-charcoal mb-4">{dict.tourDetail.relatedArticles}</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link key={related.slug} href={`/${lang}/blog/${related.slug}`} className="flex gap-3 group">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                          <Image src={related.heroImage} alt={related.title} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-charcoal text-sm font-semibold group-hover:text-forest transition-colors leading-snug">{related.title}</p>
                          <p className="text-ink-muted text-xs mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {related.readTime} {dict.blog.minRead}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>

          {(prev || next) && (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prev && (
                <Link href={`/${lang}/blog/${prev.slug}`} className="flex items-center gap-4 bg-card rounded-[4px] p-5 shadow-sm hover:shadow-md transition-shadow group">
                  <ArrowLeft className="w-5 h-5 text-ink-muted group-hover:text-forest transition-colors shrink-0" />
                  <div>
                    <p className="text-xs text-ink-muted uppercase tracking-wide mb-1">{dict.tourDetail.previous}</p>
                    <p className="text-charcoal font-semibold text-sm group-hover:text-forest transition-colors leading-snug">{prev.title}</p>
                  </div>
                </Link>
              )}
              {next && (
                <Link href={`/${lang}/blog/${next.slug}`} className="flex items-center gap-4 bg-card rounded-[4px] p-5 shadow-sm hover:shadow-md transition-shadow group sm:ml-auto sm:text-right">
                  <div>
                    <p className="text-xs text-ink-muted uppercase tracking-wide mb-1">{dict.tourDetail.next}</p>
                    <p className="text-charcoal font-semibold text-sm group-hover:text-forest transition-colors leading-snug">{next.title}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-ink-muted group-hover:text-forest transition-colors shrink-0" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
