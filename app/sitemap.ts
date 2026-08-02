import type { MetadataRoute } from "next";
import { TOURS, CATEGORIES } from "@/lib/tours";
import { BLOG_POSTS } from "@/lib/blog";
import { blogSlugFor } from "@/lib/blog-i18n";
import { DESTINATIONS } from "@/lib/destinations";
import { GUIDES } from "@/lib/guides";

const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

const BASE = "https://marrakechecotours.com";

// Stable lastmod for tour/category/destination/guide pages. Using `new Date()`
// stamped every URL with the build time, so the whole catalogue's <lastmod>
// changed on every deploy — Google learns the dates are noise and discounts
// them for crawl scheduling. Bump this only when tour content is meaningfully
// revised, so the signal stays honest.
const CATALOGUE_LASTMOD = new Date("2026-07-24");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", freq: "weekly" as const, priority: 1.0 },
    { path: "/tours", freq: "weekly" as const, priority: 0.9 },
    { path: "/destinations", freq: "monthly" as const, priority: 0.9 },
    { path: "/guides", freq: "monthly" as const, priority: 0.8 },
    { path: "/news", freq: "daily" as const, priority: 0.8 },
    { path: "/blog", freq: "weekly" as const, priority: 0.7 },
    { path: "/about", freq: "monthly" as const, priority: 0.7 },
    { path: "/contact", freq: "monthly" as const, priority: 0.7 },
    { path: "/terms", freq: "yearly" as const, priority: 0.3 },
    { path: "/privacy", freq: "yearly" as const, priority: 0.3 },
    { path: "/cookies", freq: "yearly" as const, priority: 0.3 },
  ];

  const staticUrls = LOCALES.flatMap((lang) =>
    staticRoutes.map(({ path, freq, priority }) => ({
      url: `${BASE}/${lang}${path}`,
      // Stable lastmod, not new Date(): stamping build time on every static
      // page each deploy teaches Google the dates are noise (same reasoning as
      // CATALOGUE_LASTMOD above). Bump when these pages are meaningfully revised.
      lastModified: CATALOGUE_LASTMOD,
      changeFrequency: freq,
      priority,
    }))
  );

  // Tours and categories are now translated per locale and each locale page
  // self-canonicalises with full hreflang alternates (see the tour detail
  // page's `alternates`), so every locale URL is a distinct canonical page and
  // all six belong in the sitemap. Submitting only /en left the fr/es/de/it/ar
  // tour pages discoverable via hreflang alone — slower to get indexed.
  const tourUrls = LOCALES.flatMap((lang) =>
    TOURS.map((t) => ({
      url: `${BASE}/${lang}/tours/${t.slug}`,
      lastModified: CATALOGUE_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }))
  );

  const categoryUrls = LOCALES.flatMap((lang) =>
    CATEGORIES.map((c) => ({
      url: `${BASE}/${lang}/categories/${c.id}`,
      lastModified: CATALOGUE_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  // Blog posts are translated per locale and each locale page self-canonicalises
  // with full hreflang alternates (see app/[lang]/blog/[slug]/page.tsx). Listing
  // only /en left the fr/es/de/it/ar blog URLs — which hreflang points at —
  // absent from the sitemap, and slower to index. Fan out all six, same as tours.
  // blogSlugFor resolves the locale's own URL segment, so a post with a
  // localised slug is submitted under that URL rather than the English one.
  // Submitting the English spelling for a locale that 301s it away would ask
  // Google to crawl a redirect on every deploy.
  const blogUrls = LOCALES.flatMap((lang) =>
    BLOG_POSTS.map((p) => ({
      url: `${BASE}/${lang}/blog/${blogSlugFor(lang, p.slug)}`,
      lastModified: new Date(p.updatedAt ?? p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  // Destinations and guides self-canonicalise per locale too — fan out all six.
  const destinationUrls = LOCALES.flatMap((lang) =>
    DESTINATIONS.map((d) => ({
      url: `${BASE}/${lang}/destinations/${d.slug}`,
      lastModified: CATALOGUE_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }))
  );

  const guideUrls = LOCALES.flatMap((lang) =>
    GUIDES.map((g) => ({
      url: `${BASE}/${lang}/guides/${g.id}`,
      lastModified: CATALOGUE_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

  // The bare root is deliberately absent: it redirects to /en, and a sitemap
  // should list only final canonical URLs. Submitting a redirecting URL is
  // what Search Console reports as "Page with redirect". /en is in staticUrls
  // and carries priority 1.0 already.
  return [
    ...staticUrls,
    ...tourUrls,
    ...categoryUrls,
    ...destinationUrls,
    ...guideUrls,
    ...blogUrls,
  ];
}
