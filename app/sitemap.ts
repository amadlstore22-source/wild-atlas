import type { MetadataRoute } from "next";
import { TOURS, CATEGORIES } from "@/lib/tours";
import { BLOG_POSTS } from "@/lib/blog";
import { blogSlugFor } from "@/lib/blog-i18n";
import { tourSlugFor } from "@/lib/tours-i18n";
import { DESTINATIONS } from "@/lib/destinations";
import { GUIDES } from "@/lib/guides";
import { EVENTS } from "@/lib/events";
import { GALLERY_PHOTOS } from "@/lib/gallery-photos";

const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

const BASE = "https://marrakechecotours.com";

// Absolute URL for a site-relative image path. Image sitemaps ignore relative
// paths, so every entry has to carry the origin.
const img = (p?: string): string[] | undefined =>
  p ? [p.startsWith("http") ? p : `${BASE}${p}`] : undefined;

// Stable lastmod for tour/category/destination/guide pages. Using `new Date()`
// stamped every URL with the build time, so the whole catalogue's <lastmod>
// changed on every deploy — Google learns the dates are noise and discounts
// them for crawl scheduling. Bump this only when tour content is meaningfully
// revised, so the signal stays honest.
const CATALOGUE_LASTMOD = new Date("2026-08-26");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", freq: "weekly" as const, priority: 1.0 },
    { path: "/tours", freq: "weekly" as const, priority: 0.9 },
    { path: "/destinations", freq: "monthly" as const, priority: 0.9 },
    { path: "/guides", freq: "monthly" as const, priority: 0.8 },
    { path: "/events", freq: "weekly" as const, priority: 0.8 },
    { path: "/news", freq: "daily" as const, priority: 0.8 },
    { path: "/blog", freq: "weekly" as const, priority: 0.7 },
    { path: "/about", freq: "monthly" as const, priority: 0.7 },
    { path: "/contact", freq: "monthly" as const, priority: 0.7 },
    { path: "/how-we-operate", freq: "monthly" as const, priority: 0.7 },
    { path: "/terms", freq: "yearly" as const, priority: 0.3 },
    { path: "/privacy", freq: "yearly" as const, priority: 0.3 },
    { path: "/cookies", freq: "yearly" as const, priority: 0.3 },
  ];

  // The gallery lives on the homepage rather than a page of its own, so its
  // frames are declared against `/{lang}` -- the URL that actually embeds them.
  // Capped at the first 24: all 66 are within Google's 1,000-per-page limit,
  // but a list that long buries the frames the grid opens with.
  const galleryImages = GALLERY_PHOTOS.slice(0, 24).map((p) => `${BASE}${p.src}`);

  const staticUrls = LOCALES.flatMap((lang) =>
    staticRoutes.map(({ path, freq, priority }) => ({
      url: `${BASE}/${lang}${path}`,
      // Stable lastmod, not new Date(): stamping build time on every static
      // page each deploy teaches Google the dates are noise (same reasoning as
      // CATALOGUE_LASTMOD above). Bump when these pages are meaningfully revised.
      lastModified: CATALOGUE_LASTMOD,
      changeFrequency: freq,
      priority,
      // Only the homepage carries the gallery; the other static routes have no
      // images of their own worth declaring here.
      ...(path === "" ? { images: galleryImages } : {}),
    }))
  );

  // Tours and categories are now translated per locale and each locale page
  // self-canonicalises with full hreflang alternates (see the tour detail
  // page's `alternates`), so every locale URL is a distinct canonical page and
  // all six belong in the sitemap. Submitting only /en left the fr/es/de/it/ar
  // tour pages discoverable via hreflang alone — slower to get indexed.
  // tourSlugFor resolves the locale's own URL segment, same reasoning as the
  // blog below: submitting the English spelling for a locale that 308s it away
  // asks Google to crawl a redirect on every deploy.
  const tourUrls = LOCALES.flatMap((lang) =>
    TOURS.map((t) => ({
      url: `${BASE}/${lang}/tours/${tourSlugFor(lang, t.slug)}`,
      lastModified: CATALOGUE_LASTMOD,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      images: img(t.heroImage),
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
      images: img(p.heroImage),
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

  // Event pages carry dates, so they change more often than the catalogue.
  // lastModified stays CATALOGUE_LASTMOD until an event's own data is edited;
  // bumping it on every deploy would teach Google the dates are noise.
  const eventUrls = LOCALES.flatMap((lang) =>
    EVENTS.map((e) => ({
      url: `${BASE}/${lang}/events/${e.slug}`,
      lastModified: CATALOGUE_LASTMOD,
      changeFrequency: "weekly" as const,
      priority: 0.7,
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
    ...eventUrls,
    ...blogUrls,
  ];
}
