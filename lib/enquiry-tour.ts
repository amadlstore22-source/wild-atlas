import { SITE } from "@/lib/constants";
import { perPersonPrice, type Tour } from "@/lib/tours";
import { toursFor } from "@/lib/tours-i18n";

/**
 * Which tour a booking enquiry is about, for the owner's inbox (2026-11-08).
 *
 * The booking form sends only the tour's title, and the email used to repeat
 * it alone: "Marrakech to Merzouga — 3-Day Desert Tour". Several trips exist
 * both as a private tour and as a shared one with a similar name, so the owner
 * could not tell which one the visitor had asked about, and quoted a client
 * for the wrong kind of trip. The title is looked up here (in any of the six
 * languages) so the email can say PRIVATE or SHARED, link the page the
 * visitor was on, and give the price that page showed for their group.
 */

const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;
type Locale = (typeof LOCALES)[number];

/** BookingSidebar appends this when the one-day summit option is ticked. */
export const ONE_DAY_SUFFIX = " (ONE-DAY SUMMIT: refuge full)";

export interface EnquiryTour {
  /** The English record: type and prices are the same in every language. */
  tour: Tour;
  /** The language whose title the form sent, for the page link. */
  locale: Locale;
  /** The page's own URL segment in that language. */
  pageSlug: string;
  oneDay: boolean;
}

let index: Map<string, { id: string; locale: Locale; pageSlug: string }> | null = null;

function titleIndex() {
  if (index) return index;
  index = new Map();
  for (const locale of LOCALES) {
    for (const t of toursFor(locale)) {
      // English first: a title shared by two languages links the English page.
      if (!index.has(t.title)) index.set(t.title, { id: t.id, locale, pageSlug: t.localizedSlug ?? t.slug });
    }
  }
  return index;
}

/** The tour a form's title names, or null for anything that is not one of ours. */
export function findEnquiryTour(title: string): EnquiryTour | null {
  if (!title) return null;
  const oneDay = title.endsWith(ONE_DAY_SUFFIX);
  const base = oneDay ? title.slice(0, -ONE_DAY_SUFFIX.length) : title;
  const hit = titleIndex().get(base);
  if (!hit) return null;
  const tour = toursFor("en").find((t) => t.id === hit.id);
  if (!tour) return null;
  return { tour, locale: hit.locale, pageSlug: hit.pageSlug, oneDay };
}

/** "PRIVATE" or "SHARED": tours without a type are sold private. */
export function tourKind(t: Tour): "PRIVATE" | "SHARED" {
  return t.tourType === "shared" ? "SHARED" : "PRIVATE";
}

const eur = (n: number) => `€${n.toLocaleString("en-GB", { maximumFractionDigits: 2 })}`;

/**
 * The lines the owner's email adds under the tour's name, and the short tag
 * for its subject and the enquiry sheet. Unknown titles say so rather than
 * guess.
 */
export function enquiryTourInfo(title: string, people: number): { tag: string; lines: string[] } {
  const found = findEnquiryTour(title);
  if (!found) return { tag: "", lines: ["Tour type: UNKNOWN (not one of our tour titles; ask the client)"] };
  const { tour, locale, pageSlug, oneDay } = found;
  const kind = tourKind(tour);
  const lines = [
    kind === "SHARED"
      ? "Tour type: SHARED (joins a group; priced per seat)"
      : "Tour type: PRIVATE (only their group, own vehicle and guide)",
  ];
  if (tour.title !== title.replace(ONE_DAY_SUFFIX, "")) lines.push(`In English: ${tour.title}`);
  lines.push(`Tour page: ${SITE.url}/${locale}/tours/${pageSlug}`);
  if (oneDay) {
    lines.push("Option ticked: ONE-DAY SUMMIT (the refuge is full), so quote the one-day summit price, not the price below.");
  }
  const pp = perPersonPrice(tour, people);
  lines.push(`Website price for ${people}: ${eur(pp)} per person (${eur(pp * people)} total)`);
  return { tag: kind, lines };
}
