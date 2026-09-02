import { describe, expect, it } from "vitest";
import { TOURS } from "@/lib/tours";
import { TOURS as FR } from "@/lib/tours.fr";
import { TOURS as ES } from "@/lib/tours.es";
import { TOURS as DE } from "@/lib/tours.de";
import { TOURS as IT } from "@/lib/tours.it";
import { TOURS as AR } from "@/lib/tours.ar";

/**
 * TWO TOURS SHIPPED WITH THE SAME id, AND REACT WAS DROPPING ONE OF THEM.
 *
 * `morocco-highlights-toubkal-sahara-8day` and `shared-agafay-dinner-camel-ride`
 * both carried id "47". The tours grid renders <TourCard key={tour.id}>, so
 * React logged:
 *
 *   Encountered two children with the same key, `47`. ... Non-unique keys may
 *   cause children to be duplicated and/or omitted
 *
 * A tour silently missing from the grid is a product nobody can book. It went
 * unnoticed for a long time because the warning only appears in development,
 * and a missing card looks exactly like a filter working correctly.
 *
 * Nothing else catches this: two records with the same id are valid
 * TypeScript, every page builds, and each tour's own URL still works — it is
 * only the LIST that breaks.
 *
 * The locale check exists for a second reason: locale files copy `id` verbatim
 * from the English catalogue, so a renumber applied to lib/tours.ts and not to
 * lib/tours.fr.ts would put the French grid back where it started.
 */

const LOCALES = { fr: FR, es: ES, de: DE, it: IT, ar: AR };

describe("tour ids", () => {
  it("are unique across the catalogue", () => {
    const byId = new Map<string, string[]>();
    for (const t of TOURS) {
      byId.set(t.id, [...(byId.get(t.id) ?? []), t.slug]);
    }
    const dupes = [...byId.entries()]
      .filter(([, slugs]) => slugs.length > 1)
      .map(([id, slugs]) => `id "${id}" is used by: ${slugs.join(", ")}`);

    expect(
      dupes,
      dupes.length === 0
        ? ""
        : `Duplicate tour ids. TourCard uses key={tour.id}, so React will drop\n` +
            `or duplicate one of these cards in the tours grid — a product\n` +
            `nobody can find:\n  ` +
            dupes.join("\n  ") +
            `\n\nGive one of them the next unused id. Do not reuse a gap in the\n` +
            `sequence: a gap is usually a deleted product, and its number may\n` +
            `still be referenced elsewhere.`,
    ).toEqual([]);
  });

  it("match the English catalogue in every locale", () => {
    // id is copied verbatim into the locale files. If a renumber lands in
    // lib/tours.ts alone, the French grid keeps the collision.
    const english = new Map(TOURS.map((t) => [t.slug, t.id]));
    const drift: string[] = [];

    for (const [lc, catalogue] of Object.entries(LOCALES)) {
      for (const t of catalogue) {
        const expected = english.get(t.slug);
        if (expected === undefined) continue; // locale-only tour, nothing to compare
        if (t.id !== expected) {
          drift.push(`${lc}: ${t.slug} has id "${t.id}", English says "${expected}"`);
        }
      }
    }

    expect(
      drift,
      drift.length === 0
        ? ""
        : `Locale tour ids have drifted from the English catalogue:\n  ` +
            drift.join("\n  "),
    ).toEqual([]);
  });

  it("has no duplicate ids within any single locale", () => {
    const problems: string[] = [];
    for (const [lc, catalogue] of Object.entries(LOCALES)) {
      const seen = new Map<string, string[]>();
      for (const t of catalogue) seen.set(t.id, [...(seen.get(t.id) ?? []), t.slug]);
      for (const [id, slugs] of seen) {
        if (slugs.length > 1) problems.push(`${lc}: id "${id}" used by ${slugs.join(", ")}`);
      }
    }
    expect(problems, problems.length === 0 ? "" : problems.join("\n  ")).toEqual([]);
  });
});
