import type { MetadataRoute } from "next";
import { TOURS, CATEGORIES } from "@/lib/tours";
import { BLOG_POSTS } from "@/lib/blog";
import { DESTINATIONS } from "@/lib/destinations";
import { GUIDES } from "@/lib/guides";

const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

const BASE = "https://marrakechecotours.com";

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
      lastModified: new Date(),
      changeFrequency: freq,
      priority,
    }))
  );

  // Content pages (tours, blog, destinations, categories) carry English bodies
  // on every locale and canonicalise to /en, so only the canonical English URL
  // belongs in the sitemap. Listing all six would submit known non-canonical
  // duplicates. Restore the per-locale fan-out once bodies are translated.
  const tourUrls = TOURS.map((t) => ({
    url: `${BASE}/en/tours/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const categoryUrls = CATEGORIES.map((c) => ({
    url: `${BASE}/en/categories/${c.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogUrls = BLOG_POSTS.map((p) => ({
    url: `${BASE}/en/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const destinationUrls = DESTINATIONS.map((d) => ({
    url: `${BASE}/en/destinations/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Guide bios are English-only too.
  const guideUrls = GUIDES.map((g) => ({
    url: `${BASE}/en/guides/${g.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...staticUrls,
    ...tourUrls,
    ...categoryUrls,
    ...destinationUrls,
    ...guideUrls,
    ...blogUrls,
  ];
}
