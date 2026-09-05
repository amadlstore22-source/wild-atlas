import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { TOURS } from "@/lib/tours";

/**
 * `agadir-to-fes-4day` shipped with ZERO inbound links from body prose. It
 * appeared in six `relatedTours` arrays and four `locale-switch` slug maps, so
 * every existing check passed: the tour rendered, the sitemap listed it, the
 * hreflang audit found all six locales, and `internal-links.test.ts` was happy
 * because every link it *did* have resolved. Nothing tested the reverse
 * direction — whether anything links TO it.
 *
 * `relatedTours` renders as a sidebar widget. Google discounts boilerplate
 * navigation heavily, so a tour reachable only that way has effectively no
 * internal votes. The tour sat in Search Console's "Discovered — currently not
 * indexed" bucket: Google knew the URL and declined to spend crawl budget on
 * it. On a domain under four months old with no backlink profile, internal
 * linking is the only PageRank the site controls, and this page got none of it.
 *
 * The cost is direct. It is a commercial page — a one-way Agadir-to-Fes trip
 * quoted at €324 pp for six — that no search engine had reason to rank, while
 * `sahara-3day-marrakech` next to it carried 229 inbound links.
 *
 * The fix was a "Getting to Fes" section in the Fes medina guide, which also
 * closed a real content gap: the site's authority page on Fes explained the
 * tanneries, the madrasas and the souks, and never said how to reach the city.
 *
 * Scoped catalogue-wide on purpose. `orphan-posts.test.ts` covers blog posts
 * and this gap was invisible precisely because tours were never checked — the
 * money pages had less protection than the articles pointing at them.
 */

const ROOT = process.cwd();

/** Source files whose prose can carry an internal link. */
function sourceFiles(): string[] {
  const out: string[] = [];
  const skip = new Set(["node_modules", ".next", ".git", "__tests__", "scripts", "public"]);
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!skip.has(entry.name)) walk(path.join(dir, entry.name));
      } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
        out.push(path.join(dir, entry.name));
      }
    }
  };
  walk(ROOT);
  return out;
}

describe("every tour has inbound internal links", () => {
  it("no tour is reachable only through relatedTours boilerplate", () => {
    const files = sourceFiles();
    const corpus = files
      .map((f) => {
        try {
          return fs.readFileSync(f, "utf8");
        } catch {
          return "";
        }
      })
      .join("\n");

    const orphans: string[] = [];
    for (const tour of TOURS) {
      // A real link: /tours/<slug> or /<locale>/tours/<slug> in an href or a
      // markdown link. Deliberately NOT `relatedTours: ["slug"]`, which is the
      // sidebar widget that hid this defect in the first place.
      const link = new RegExp(`/(?:[a-z]{2}/)?tours/${tour.slug}(?![\\w-])`, "g");
      const hits = corpus.match(link) ?? [];
      if (hits.length === 0) orphans.push(tour.slug);
    }

    expect(
      orphans,
      "These tours have no inbound prose link, so nothing on the site votes for\n" +
        "them and Google has no internal signal to rank them. A `relatedTours`\n" +
        "entry does NOT count — it renders as a sidebar widget that search\n" +
        "engines discount. Link each from an article already discussing its\n" +
        "route or region, the way the Fes medina guide links the two Fes tours:\n  " +
        orphans.join("\n  "),
    ).toEqual([]);
  });
});
