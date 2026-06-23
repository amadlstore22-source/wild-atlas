import type { MetadataRoute } from "next";
import { TOURS, CATEGORIES } from "@/lib/tours";
import { BLOG_POSTS } from "@/lib/blog";

const BASE = "https://marrakechecotours.com";
const LOCALES = ["en", "fr", "es", "de", "it", "ar"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/tours", "/about", "/contact", "/blog"];

  const staticUrls = LOCALES.flatMap((lang) =>
    staticRoutes.map((route) => ({
      url: `${BASE}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" || route === "/tours" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route === "/tours" ? 0.9 : 0.7,
    }))
  );

  const tourUrls = LOCALES.flatMap((lang) =>
    TOURS.map((t) => ({
      url: `${BASE}/${lang}/tours/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
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

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...staticUrls,
    ...tourUrls,
    ...categoryUrls,
    ...blogUrls,
  ];
}
