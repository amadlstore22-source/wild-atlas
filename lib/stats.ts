import { TOURS } from "@/lib/tours";
import { TRIPADVISOR } from "@/lib/constants";

/**
 * Single source of truth for the trust numbers surfaced across the site.
 *
 * The homepage used to repeat 30+/1,000+/5.0/122 across three separate stat
 * bars. Consolidating them here keeps every surface consistent and prevents the
 * count drift that erodes trust (the header said "30+" tours while the catalog
 * actually holds 33). `tourCount` is COMPUTED from the tours array so it can
 * never fall out of sync; category counts derive from the same array via filter.
 */
export const STATS = {
  yearsGuiding: 30,
  travellers: "1,000+",
  rating: TRIPADVISOR.rating,       // 5.0 — keep TripAdvisor as the rating source
  reviewCount: TRIPADVISOR.reviewCount, // 122
  tourCount: TOURS.length,          // 33, computed — never hand-maintained
} as const;
