import type { MetadataRoute } from "next";
import { TOURS, CATEGORIES } from "@/lib/tours";
import { BLOG_POSTS } from "@/lib/blog";
import { DESTINATIONS } from "@/lib/destinations";
import { GUIDES } from "@/lib/guides";
import { LOCALES } from "@/app/[lang]/dictionaries";

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
  ];

  const staticUrls = LOCALES.flatMap((lang) =>
    staticRoutes.map(({ path, freq, priority }) => ({
      url: `${BASE}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: freq,
      priority,
    }))
  );

  const tourUrls = LOCALES.flatMap((lang) =>
    TOURS.map((t) => ({
      url: `${BASE}/${lang}/tours/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }))
  );

  const categoryUrls = LOCALES.flatMap((lang) =>
    CATEGORIES.map((c) => ({
      url: `${BASE}/${lang}/categories/${c.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const blogUrls = LOCALES.flatMap((lang) =>
    BLOG_POSTS.map((p) => ({
      url: `${BASE}/${lang}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  const destinationUrls = LOCALES.flatMap((lang) =>
    DESTINATIONS.map((d) => ({
      url: `${BASE}/${lang}/destinations/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }))
  );

  const guideUrls = LOCALES.flatMap((lang) =>
    GUIDES.map((g) => ({
      url: `${BASE}/${lang}/guides/${g.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))
  );

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
