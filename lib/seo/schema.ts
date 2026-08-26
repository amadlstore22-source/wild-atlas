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

/**
 * `priceValidUntil` for Offer nodes, as an ISO date one year from build time.
 *
 * Google lists this as a recommended Offer property and may stop showing a
 * price it considers stale. It is deliberately derived from the build date
 * rather than hardcoded: a fixed date silently expires and then reads as a
 * *worse* signal than omitting the field, and nothing would fail loudly when
 * it did. Every deploy re-stamps it, so it stays valid for as long as the site
 * is maintained.
 */
export function priceValidUntil(from: Date = new Date()) {
  const until = new Date(from);
  until.setFullYear(until.getFullYear() + 1);
  return until.toISOString().slice(0, 10);
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

/**
 * AggregateOffer spanning a tour's whole per-person price ladder.
 *
 * A plain `Offer` carrying `tour.price` quotes the SOLO rate — the most
 * expensive per-person figure a tour has. That was defensible while the pages
 * advertised "From EUR650", but the meta descriptions now lead with the group
 * rate ("From EUR260 pp for 6+"), and a single `price` cannot be true of both.
 * Google cross-checks structured-data prices against the visible page, so the
 * node has to describe the RANGE the page actually sells, not one end of it.
 *
 * `lowPrice` therefore comes from lowestGroupPrice() — the same helper the
 * booking sidebar and the listing cards use — so schema, card and sidebar can
 * never disagree. Listing cards previously showed tour.price and advertised
 * EUR1,800 for a trek a group of five pays EUR695 for; that bug is the reason
 * lowestGroupPrice() exists, and reading tour.price here would reintroduce it
 * in the one place a human reviewer never sees.
 *
 * Prices arrive already converted to the display currency: callers pass the
 * output of priceIn(), because the ladder is stored in USD and shown in EUR.
 */
export function buildAggregateOffer(opts: {
  low: number;
  high: number;
  currency: string;
  url: string;
  validUntil: string;
  /** Group size that unlocks `low`; omitted when the ladder is flat. */
  minPeople?: number;
}) {
  const { low, high, currency, url, validUntil, minPeople } = opts;
  // A flat ladder (shared seats, or a single-tier tour) has nothing to
  // aggregate. Emitting AggregateOffer with lowPrice === highPrice is legal but
  // tells Google nothing, so fall back to the simpler node it understands best.
  if (low === high) {
    return {
      "@type": "Offer",
      price: String(low),
      priceCurrency: currency,
      priceValidUntil: validUntil,
      availability: "https://schema.org/InStock",
      url,
    };
  }
  return {
    "@type": "AggregateOffer",
    lowPrice: String(low),
    highPrice: String(high),
    priceCurrency: currency,
    priceValidUntil: validUntil,
    availability: "https://schema.org/InStock",
    url,
    // eligibleQuantity states the group size that unlocks lowPrice, so the
    // "for 6+" qualifier in the meta description is machine-readable too. IE is
    // the UN/CEFACT code for "count of persons".
    ...(minPeople ? { eligibleQuantity: { "@type": "QuantitativeValue", minValue: minPeople, unitCode: "IE" } } : {}),
  };
}
