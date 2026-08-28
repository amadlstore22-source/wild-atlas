import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarBlank, Clock, ArrowLeft, ArrowRight, Tag } from "@phosphor-icons/react/dist/ssr";
import { BLOG_POSTS } from "@/lib/blog";
import { blogPostsFor, getBlogPostFor, blogRegionsFor, blogSlugFor } from "@/lib/blog-i18n";
import JsonLd from "@/components/seo/JsonLd";
import FaqSection from "@/components/seo/FaqSection";
import ZelligeDivider from "@/components/ui/ZelligeDivider";
import { buildFaqSchema } from "@/lib/seo/schema";
import { hreflangLanguages } from "@/lib/seo/hreflang";
import BlogWeather from "@/components/blog/BlogWeather";
import RelatedTourCards from "@/components/blog/RelatedTourCards";
import WhyBookWithUs from "@/components/ui/WhyBookWithUs";
import { getDictionary, hasLocale } from "../../dictionaries";
import { ogBase } from "@/lib/seo/open-graph";
type BlogParams = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  // Emit the localised segment per locale where one exists, so the page is
  // prerendered at the URL it is actually served from. Posts without a
  // localizedSlug keep the English segment in every locale.
  return BLOG_POSTS.flatMap((p) =>
    (["en", "fr", "es", "de", "it", "ar"] as const).map((lang) => ({
      lang,
      slug: blogSlugFor(lang, p.slug),
    }))
  );
}

export async function generateMetadata({ params }: BlogParams): Promise<Metadata> {
  const { slug, lang } = await params;
  if (!hasLocale(lang)) return {};
  const post = getBlogPostFor(lang, slug);
  if (!post) return {};
  const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;
  return {
    // Some seoTitles already carry "| Marrakech Eco Tours"; strip it so the
    // layout template appends the brand exactly once (no double suffix).
    title: (post.seoTitle ?? post.title).replace(/\s*\|\s*Marrakech Eco Tours\s*$/, ""),
    description: post.seoDescription ?? post.excerpt,
    openGraph: {
      ...ogBase(lang),
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.heroImage }],
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      images: [post.heroImage],
    },
    // Post bodies are now translated per locale, so each locale gets its own
    // canonical URL and full hreflang alternates rather than collapsing to /en.
    //
    // Both are built from post.slug via blogSlugFor rather than from the
    // requested `slug`: a locale may serve this post under a localised segment,
    // and each hreflang entry must name that locale's real URL. Using the
    // incoming segment would point every alternate at whichever spelling the
    // visitor happened to arrive on, breaking hreflang reciprocity — Google
    // discards clusters that do not point back at each other.
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/blog/${blogSlugFor(lang, post.slug)}`,
      languages: hreflangLanguages(
        LOCALES,
        (l) => `https://marrakechecotours.com/${l}/blog/${blogSlugFor(l, post.slug)}`
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
  const posts = blogPostsFor(lang);
  const post = getBlogPostFor(lang, slug);
  if (!post) notFound();
  const dict = await getDictionary(lang);
  const regions = blogRegionsFor(lang);

  const postIndex = posts.findIndex((p) => p.slug === slug);
  const prev = postIndex > 0 ? posts[postIndex - 1] : null;
  const next = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;

  const relatedPosts = posts.filter(
    (p) => p.slug !== slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
  ).slice(0, 3);

  const postUrl = `https://marrakechecotours.com/${lang}/blog/${slug}`;
  const publisher = {
    "@type": "Organization",
    "@id": "https://marrakechecotours.com/#organization",
    name: "Marrakech Eco Tours",
    url: "https://marrakechecotours.com",
    logo: {
      "@type": "ImageObject",
      url: "https://marrakechecotours.com/icon.png",
      width: 512,
      height: 512,
    },
  };

  // BlogPosting + breadcrumbs, plus FAQPage when the post carries Q&A. The FAQ
  // block is what competes for People Also Ask placements.
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      "@id": `${postUrl}#article`,
      mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
      url: postUrl,
      headline: post.title.slice(0, 110),
      description: post.seoDescription ?? post.excerpt,
      image: { "@type": "ImageObject", url: post.heroImage },
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      inLanguage: lang,
      keywords: post.tags.join(", "),
      wordCount: post.content.trim().split(/\s+/).length,
      timeRequired: `PT${post.readTime}M`,
      articleSection: post.category,
      author: post.author
        ? { "@type": "Organization", name: post.author.name, url: "https://marrakechecotours.com" }
        : publisher,
      publisher,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${postUrl}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `https://marrakechecotours.com/${lang}` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `https://marrakechecotours.com/${lang}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
      ],
    },
  ];

  if (post.faq?.length) {
    graph.push(buildFaqSchema(post.faq, `${postUrl}#faq`));
  }

  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  function escHtml(s: string) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // Inline markdown: bold, then links. Escaping happens first, so the regexes
  // only ever see already-safe text and the captured URL can't smuggle markup.
  function inline(s: string) {
    return escHtml(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '<a href="$2">$1</a>');
  }

  // ![alt](/path.jpg) with an optional "caption" after the path.
  // The path is restricted to a leading slash for the same reason links are:
  // it cannot become an external or javascript: URL.
  // ![alt](/path.jpg "caption") — the path must start with a slash, for the
  // same reason inline links are restricted: it can never become an external
  // host or a javascript: URL from authored content.
  const IMG_LINE = /^!\[([^\]]*)\]\((\/[^)\s]+)(?:\s+"([^"]*)")?\)\s*$/;

  const isTableRow = (l: string) => l.trimStart().startsWith("|");
  // A separator row (|---|---|) marks the line above as the header.
  const isTableDivider = (l: string) => /^\s*\|[\s|:-]+\|\s*$/.test(l) && l.includes("-");
  const cells = (l: string) =>
    l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());

  /**
   * SECURITY CONTRACT — READ BEFORE CHANGING THE INPUT SOURCE.
   *
   * This renderer interpolates its input into HTML with NO escaping, and the
   * result goes to dangerouslySetInnerHTML below. It is safe today for exactly
   * one reason: `post.content` is authored in this repository (lib/blog.ts) and
   * reviewed like code. It is trusted input, not user input.
   *
   * The moment content arrives from anywhere else — a CMS, an import script, a
   * fetch, form submissions, translated strings from an API — this becomes
   * stored XSS on every reader of that post. If that day comes, either escape
   * the text nodes here or switch to a sanitising renderer; do not simply point
   * new data at it.
   */
  function renderMarkdown(source: string): string {
  const lines = source.trim().split("\n");
  const htmlParts: string[] = [];
  let inList = false;
  const closeList = () => {
    if (inList) { htmlParts.push("</ul>"); inList = false; }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      closeList();
      htmlParts.push(`<h2>${inline(line.slice(3))}</h2>`);
    } else if (line.startsWith("### ")) {
      closeList();
      htmlParts.push(`<h3>${inline(line.slice(4))}</h3>`);
    } else if (line.startsWith("- ")) {
      if (!inList) { htmlParts.push("<ul>"); inList = true; }
      htmlParts.push(`<li>${inline(line.slice(2))}</li>`);
    } else if (line.trim() === "") {
      closeList();
    } else if (isTableRow(line)) {
      closeList();
      // Consume the whole table block in one pass.
      const block: string[] = [];
      while (i < lines.length && isTableRow(lines[i])) block.push(lines[i++]);
      i--; // step back; the for-loop increments
      const hasHeader = block.length > 1 && isTableDivider(block[1]);
      const body = block.filter((r) => !isTableDivider(r));
      const rows = body.map(cells);
      const head = hasHeader ? rows.shift() : undefined;
      const thead = head
        ? `<thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead>`
        : "";
      const tbody = `<tbody>${rows
        .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`)
        .join("")}</tbody>`;
      htmlParts.push(`<div class="table-scroll"><table>${thead}${tbody}</table></div>`);
    } else {
      closeList();
      htmlParts.push(`<p>${inline(line)}</p>`);
    }
  }
  closeList();
    return htmlParts.join("\n");
  }

  // A post can place the live-conditions widget mid-article with a [[WEATHER]]
  // line. The renderer is string-based, so a React component cannot be woven
  // into its output — instead we split the source on the token and render the
  // segments either side of the widget.
  // `\r?$` matters: lib/blog.ts is CRLF, so a bare `$` would never match.
  /**
   * Inline images: ![alt](/gallery/file.jpg "optional caption") on its own line.
   *
   * WHY THIS IS SPLIT INTO REACT RATHER THAN EMITTED AS HTML
   * The obvious implementation is an <img> tag inside renderMarkdown's output
   * string. That was written and thrown away, because a raw <img> inside
   * dangerouslySetInnerHTML BYPASSES the Next image optimizer entirely — no
   * AVIF, no WebP, no per-device resizing. next.config.ts configures all three,
   * and the gallery averages 238 KB per JPEG, so four images in an article
   * would ship roughly 1 MB of unoptimised bytes on a site whose LCP is already
   * 3.0 s against a 2.5 s threshold. The feature would have worsened the exact
   * metric it exists to serve.
   *
   * So images are split out the same way [[WEATHER]] is, and each renders
   * through <Image>: AVIF/WebP negotiation, correct srcset, lazy below the fold.
   *
   * width/height are given explicitly rather than using `fill`, so the browser
   * reserves the box before the bytes arrive — that is what holds CLS at zero
   * in a flowing article. `fill` needs a sized parent and would reintroduce the
   * shift this avoids.
   */
  type Block =
    | { kind: "html"; html: string }
    | { kind: "img"; alt: string; src: string; caption?: string };

  function toBlocks(markdown: string): Block[] {
    const out: Block[] = [];
    let buffer: string[] = [];
    const flush = () => {
      const text = buffer.join("\n").trim();
      if (text) out.push({ kind: "html", html: renderMarkdown(text) });
      buffer = [];
    };
    for (const line of markdown.split("\n")) {
      const m = line.trim().match(IMG_LINE);
      if (m) {
        flush();
        out.push({ kind: "img", alt: m[1] ?? "", src: m[2], caption: m[3] });
      } else {
        buffer.push(line);
      }
    }
    flush();
    return out;
  }

  const blocks = post.content.split(/^\[\[WEATHER\]\]\r?$/m).map(toBlocks);

  return (
    <>
      <JsonLd data={jsonLd} />
      <div>
        <div className="relative h-[55vh] min-h-[360px] overflow-hidden">
          <Image src={post.heroImage} alt={post.title} fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/80 via-indigo-deep/30 to-indigo-deep/15" />
          <div className="absolute inset-0 flex flex-col justify-end max-w-4xl mx-auto px-4 sm:px-6 pb-12 w-full left-0 right-0">
            <nav className="flex items-center gap-2 text-white/60 text-sm mb-5 flex-wrap">
              <Link href={`/${lang}/blog`} className="hover:text-white transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> {dict.blog.pageTitle}
              </Link>
              {post.region && post.region !== "root" && (() => {
                const region = regions.find((r) => r.id === post.region);
                return region ? (
                  <><span className="text-white/30">›</span><span className="text-white/70">{region.icon} {region.label}</span></>
                ) : null;
              })()}
            </nav>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-4 w-fit ${CATEGORY_COLORS[post.category]}`}>{post.category}</span>
            <h1 className="hero-title font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4">{post.title}</h1>
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
              {blocks.map((segment, i) => (
                <div key={i}>
                  {segment.map((block, j) =>
                    block.kind === "html" ? (
                      <div
                        key={j}
                        className="blog-prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: block.html }}
                      />
                    ) : (
                      <figure key={j} className="my-8">
                        {/* Sized, not `fill`: the box is reserved before the
                            bytes arrive, so the article never shifts. 1600 is
                            the width the gallery is optimised to; `sizes` caps
                            the request at the real column width so mobile does
                            not download a desktop variant. */}
                        <Image
                          src={block.src}
                          alt={block.alt}
                          width={1600}
                          height={1067}
                          sizes="(max-width: 1024px) 100vw, 768px"
                          className="w-full h-auto rounded-[4px]"
                        />
                        {block.caption && (
                          <figcaption className="mt-2 text-sm text-ink-soft italic">
                            {block.caption}
                          </figcaption>
                        )}
                      </figure>
                    ),
                  )}
                  {/* Widget sits between segments only, never after the last one. */}
                  {i < blocks.length - 1 && post.weatherRegion && (
                    <BlogWeather region={post.weatherRegion} dict={dict} />
                  )}
                </div>
              ))}

              {/* Khatam-star divider marks the shift from the article body to
                  the Q&A — a genuine major-section break, only when an FAQ
                  follows. Keeps the motif meaningful, not decorative. */}
              {post.faq && post.faq.length > 0 && (
                <>
                  <ZelligeDivider className="!my-8" />
                  <FaqSection faq={post.faq} />
                </>
              )}

              {/* Editorial → money page. The reader has finished the article and
                  had their objections answered; this is the conversion moment. */}
              {post.relatedTours && post.relatedTours.length > 0 && (
                <RelatedTourCards slugs={post.relatedTours} lang={lang} dict={dict} />
              )}

              {/* Placed after the tour cards, not before: the reader has just
                  seen a specific trip and price, and the objection that follows
                  is "why these people". Answering it earlier, with nothing
                  concrete on screen yet, is a claim about no one in particular. */}
              <WhyBookWithUs dict={dict} lang={lang} />

              <div className="mt-10 pt-8 border-t border-sand-dark flex flex-wrap gap-2">
                <Tag className="w-4 h-4 text-ink-muted mt-0.5" />
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-sand rounded-full text-xs text-ink-soft font-medium">{tag}</span>
                ))}
              </div>
            </article>

            <aside className="space-y-6">
              <div className="bg-forest rounded-[4px] p-6 text-white">
                <h3 className="font-display text-xl font-bold mb-2">{dict.tourDetail.planYourTrip}</h3>
                <p className="text-white/85 text-sm mb-5 leading-relaxed">{dict.tourDetail.sidebarDesc}</p>
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
                          <Image src={related.heroImage} alt={related.title} fill sizes="64px" className="object-cover" />
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
