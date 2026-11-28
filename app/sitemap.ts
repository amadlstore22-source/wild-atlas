import type { MetadataRoute } from "next";
import { TOURS, CATEGORIES } from "@/lib/tours";
import { BLOG_POSTS } from "@/lib/blog";
import { blogPostsFor, blogSlugFor, isTranslated } from "@/lib/blog-i18n";
import BLOG_LASTMOD from "@/lib/blog-lastmod.json";
import { tourSlugFor } from "@/lib/tours-i18n";
import { DESTINATIONS } from "@/lib/destinations";
import { GUIDES } from "@/lib/guides";
import { EVENTS } from "@/lib/events";
import { GALLERY_PHOTOS } from "@/lib/gallery-photos";
import { galleryPreview } from "@/lib/gallery-preview";
import { MARKETS, MARKETS_CHECKED, marketPath } from "@/lib/markets";

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
// 2026-11-20: Toubkal refuge price rise (+€59/night), Azzaden +€33, Paradise
// Valley repriced, 4 destination hubs re-angled to lead with tours, category
// FAQs translated in all 6 locales, flagship tour titles & schema updated.
const CATALOGUE_LASTMOD = new Date("2026-11-20");

export default function sitemap(): MetadataRoute.Sitemap {
  // Legal pages (/terms, /privacy, /cookies) are deliberately left out of the
  // sitemap: they remain linked in the footer and cookie banner, carry no
  // commercial search intent, and carry robots nofollow — keeping them out
  // concentrates crawl budget on tours, hubs and guides.
  const staticRoutes = [
    { path: "", freq: "weekly" as const, priority: 1.0 },
    { path: "/tours", freq: "weekly" as const, priority: 0.9 },
    { path: "/destinations", freq: "monthly" as const, priority: 0.9 },
    { path: "/guides", freq: "monthly" as const, priority: 0.8 },
    { path: "/events", freq: "weekly" as const, priority: 0.8 },
    { path: "/blog", freq: "weekly" as const, priority: 0.7 },
    { path: "/gallery", freq: "monthly" as const, priority: 0.6 },
    { path: "/about", freq: "monthly" as const, priority: 0.7 },
    { path: "/contact", freq: "monthly" as const, priority: 0.7 },
    { path: "/how-we-operate", freq: "monthly" as const, priority: 0.7 },
  ];

  // /gallery renders every frame, so it gets the full list and is the URL
  // Google should associate each photograph with. The homepage embeds the same
  // photos in its gallery section, but declaring all 66 on both would ask
  // Google to pick between two pages for one image. The homepage declares
  // exactly the sample it renders (lib/gallery-preview.ts), no more.
  const allGalleryImages = GALLERY_PHOTOS.map((p) => `${BASE}${p.src}`);
  const homeGalleryImages = galleryPreview(GALLERY_PHOTOS).map((p) => `${BASE}${p.src}`);

  const staticUrls = LOCALES.flatMap((lang) =>
    staticRoutes.map(({ path, freq, priority }) => ({
      url: `${BASE}/${lang}${path}`,
      // Stable lastmod, not new Date(): stamping build time on every static
      // page each deploy teaches Google the dates are noise (same reasoning as
      // CATALOGUE_LASTMOD above). Bump when these pages are meaningfully revised.
      lastModified: CATALOGUE_LASTMOD,
      changeFrequency: freq,
      priority,
      // The other static routes have no images of their own worth declaring.
      ...(path === "/gallery"
        ? { images: allGalleryImages }
        : path === ""
          ? { images: homeGalleryImages }
          : {}),
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
  // A locale still serving the English fallback is left out: that page is
  // noindexed and canonicalises to /en (see isTranslated).
  //
  // Each locale carries its OWN date (2026-11-27). Every locale used to take
  // the English record's updatedAt, and the translated records' updatedAt was
  // almost never bumped, so 439 of 608 translations had changed after the
  // date Google was given; 157 of 704 inspected pages sat in "Crawled -
  // currently not indexed", most last crawled in July/August. The date is
  // now the latest of: the English record, the translated record, and the
  // git date of the translated record's own lines (lib/blog-lastmod.json,
  // written by scripts/build-blog-lastmod.mjs on prebuild).
  const blogDate = (lang: (typeof LOCALES)[number], p: (typeof BLOG_POSTS)[number]): Date => {
    const dates = [p.updatedAt ?? p.publishedAt];
    if (lang !== "en") {
      const local = blogPostsFor(lang).find((x) => x.slug === p.slug);
      if (local) dates.push(local.updatedAt ?? local.publishedAt);
      const fromGit = (BLOG_LASTMOD as Record<string, string>)[`${lang}:${p.slug}`];
      if (fromGit) dates.push(fromGit);
    }
    return new Date(Math.max(...dates.map((d) => Date.parse(d))));
  };
  const blogUrls = LOCALES.flatMap((lang) =>
    BLOG_POSTS.filter((p) => isTranslated(lang, p.slug)).map((p) => ({
      url: `${BASE}/${lang}/blog/${blogSlugFor(lang, p.slug)}`,
      lastModified: blogDate(lang, p),
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
  // One page per source market, each in its own locale only (lib/markets.ts).
  // Dated by when the facts on it were last checked, not by the build.
  const marketUrls = MARKETS.map((m) => ({
    url: `${BASE}${marketPath(m)}`,
    lastModified: new Date(MARKETS_CHECKED),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticUrls,
    ...marketUrls,
    ...tourUrls,
    ...categoryUrls,
    ...destinationUrls,
    ...guideUrls,
    ...eventUrls,
    ...blogUrls,
  ];
}
