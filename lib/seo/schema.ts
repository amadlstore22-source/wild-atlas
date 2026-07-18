import type { Faq } from "./types";

const SITE = "https://marrakechecotours.com";

/**
 * FAQPage node WITHOUT `@context`, so it can either be pushed into an existing
 * `@graph` (blog posts) or wrapped for a standalone script (tours, categories).
 *
 * Google requires the same Q&A to be visible on the page. Every caller of this
 * helper must also render <FaqSection> with the same data.
 */
export function buildFaqSchema(faq: Faq[], id?: string) {
  return {
    "@type": "FAQPage",
    ...(id ? { "@id": id } : {}),
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Standalone (script-ready) variant of the above. */
export function faqPageDocument(faq: Faq[]) {
  return { "@context": "https://schema.org", ...buildFaqSchema(faq) };
}

export interface Crumb {
  name: string;
  path: string;
}

/** BreadcrumbList node without `@context`. Paths are absolute, e.g. `/en/tours`. */
export function buildBreadcrumbSchema(crumbs: Crumb[], id?: string) {
  return {
    "@type": "BreadcrumbList",
    ...(id ? { "@id": id } : {}),
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE}${c.path}`,
    })),
  };
}

export function breadcrumbDocument(crumbs: Crumb[]) {
  return { "@context": "https://schema.org", ...buildBreadcrumbSchema(crumbs) };
}
