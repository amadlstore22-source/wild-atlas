import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * The root layout declares a site-wide `robots: { index: true }` default. Next
 * emits its own `noindex` on the 404 page, but the layout's tag is rendered
 * second and wins by document order, so the built 404 carried
 *   <meta name="robots" content="noindex">
 *   <meta name="robots" content="index, follow">
 * — telling Google to index a page that returns 404. Search Console surfaced
 * this as a crawled-and-retained 404 (www.marrakechecotours.com/$).
 *
 * app/not-found.tsx restates noindex so the two tags agree. This guards the
 * fix, because deleting that one export silently reintroduces the contradiction
 * and nothing else in the suite would notice.
 */
describe("the 404 page is not indexable", () => {
  const root = join(__dirname, "..", "..");

  it("declares noindex in app/not-found.tsx", () => {
    const file = join(root, "app", "not-found.tsx");
    expect(existsSync(file), "app/not-found.tsx should exist").toBe(true);
    const src = readFileSync(file, "utf-8");
    expect(src).toMatch(/robots:\s*\{[^}]*index:\s*false/);
  });

  it("emits no indexable robots tag in the built 404", () => {
    const built = join(root, ".next", "server", "app", "_not-found.html");
    if (!existsSync(built)) return; // no build in this environment; skip
    const html = readFileSync(built, "utf-8");
    const tags = [...html.matchAll(/name="robots" content="([^"]*)"/g)].map((m) => m[1]);
    expect(tags.length, "expected at least one robots tag").toBeGreaterThan(0);
    const indexable = tags.filter((t) => /(^|,\s*)index\b/.test(t));
    expect(
      indexable,
      `the 404 must never say index; got: ${tags.join(" | ")}`
    ).toEqual([]);
  });
});
