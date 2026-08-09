import { describe, it, expect } from "vitest";
import { GUIDES } from "@/lib/guides";
import { TOURS } from "@/lib/tours";

/**
 * `routesLed` maps a guide to the tours they lead, and the tour page uses it to
 * name the actual guide rather than making a generic claim about the family.
 *
 * Four of the six entries pointed at slugs that had never existed
 * ("mgoun-massif-traverse-7day", "fes-medina-full-day-tour", and two more), so
 * the mapping resolved to nothing and any feature built on it would have
 * silently rendered no guide at all. Nothing failed loudly, which is exactly
 * why this test exists: a renamed or retired tour must break the build, not
 * quietly strip the credibility block off a booking page.
 */
describe("guide route assignments", () => {
  const slugs = new Set(TOURS.map((t) => t.slug));

  it("every routesLed slug matches a real tour", () => {
    const dangling: string[] = [];

    for (const guide of GUIDES) {
      for (const slug of guide.routesLed) {
        if (!slugs.has(slug)) dangling.push(`${guide.id} → ${slug}`);
      }
    }

    expect(
      dangling,
      `routesLed entries with no matching tour:\n  ${dangling.join("\n  ")}`,
    ).toEqual([]);
  });

  it("guides who lead routes are not marked legacy", () => {
    // A legacy guide is honoured on the guides page but no longer leads trips,
    // so naming one on a live tour page would misrepresent who turns up.
    const wrong = GUIDES.filter((g) => g.isLegacy && g.routesLed.length > 0).map((g) => g.id);
    expect(wrong, `legacy guides still assigned routes: ${wrong.join(", ")}`).toEqual([]);
  });
});
