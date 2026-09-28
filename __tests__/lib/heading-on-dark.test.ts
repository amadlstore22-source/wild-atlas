import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

/**
 * A heading inside a dark box must set its own light colour.
 *
 * globals.css gives h1-h3 a default colour, `:where(h1, h2, h3) { color:
 * var(--color-ink) }`. Because the rule targets the heading itself, it beats
 * anything the heading would otherwise INHERIT, so `text-white` on the parent
 * <div> does not reach the heading. The result is near-black type on indigo:
 * contrast 1.56, where 3:1 is the floor for large text.
 *
 * Found 2026-09-28 by PageSpeed (accessibility 97 on every blog, tour, guide
 * and destination page), not by any build or test: "Plan Your Morocco Trip"
 * on the blog and tour sidebars, the blog-index CTA, the destination CTA and
 * the legacy-guide story box were all barely visible, and the page looks
 * "fine" in code review because the parent plainly says text-white.
 *
 * Heuristic: an <h1>-<h3> whose className has no colour utility, opened
 * within four lines of a text-white / text-cream container.
 */
const SIZE = /^text-(xs|sm|base|lg|xl|[2-9]xl|left|right|center|balance|pretty|\[[\d.]+(rem|px|em)\])$/;

function tsxFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return /node_modules|\.next/.test(p) ? [] : tsxFiles(p);
    return p.endsWith(".tsx") ? [p] : [];
  });
}

describe("headings on dark boxes", () => {
  it("set their own light colour instead of relying on inheritance", () => {
    const offenders: string[] = [];
    for (const file of [...tsxFiles("app"), ...tsxFiles("components")]) {
      const lines = fs.readFileSync(file, "utf8").split(/\r?\n/);
      lines.forEach((line, i) => {
        const m = line.match(/<h[123]\b[^>]*className=["{`]+([^"`}]*)/);
        if (!m) return;
        const hasColour =
          m[1].split(/\s+/).some((c) => {
            const bare = c.replace(/^!/, "").replace(/^[a-z-]+:/, "");
            return bare.startsWith("text-") && !SIZE.test(bare);
          }) || /hero-title|style=\{\{[^}]*color/.test(line);
        if (hasColour) return;
        const context = lines.slice(Math.max(0, i - 4), i).join(" ");
        if (/text-white|text-cream/.test(context)) offenders.push(`${file}:${i + 1}`);
      });
    }
    expect(offenders, "add text-white (or another light colour) to these headings").toEqual([]);
  });
});
