import { TOURS } from "@/lib/tours";
import { TRIPADVISOR } from "@/lib/constants";

/**
 * Single source of truth for the trust numbers surfaced across the site.
 *
 * The homepage used to repeat 30+/1,000+/5.0/122 across three separate stat
 * bars. Consolidating them here keeps every surface consistent and prevents the
 * count drift that erodes trust. `tourCount` is COMPUTED from the tours array so
 * it can never fall out of sync; category counts derive from the same array.
 *
 * NOTE: this module imports TOURS, so it must only be used from SERVER
 * components — importing it into a client component pulls the whole tour
 * catalogue into the browser bundle.
 */
export const STATS = {
  /** Guides' experience, which predates the 2010 founding. See SITE.guidingHeritageYears. */
  guidingHeritageYears: 30,
  travellers: "1,000+",
  rating: TRIPADVISOR.rating,       // 5.0 — keep TripAdvisor as the rating source
  reviewCount: TRIPADVISOR.reviewCount, // 122
  tourCount: TOURS.length,          // 33, computed — never hand-maintained
} as const;
