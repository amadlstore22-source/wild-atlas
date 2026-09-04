import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

/**
 * Chrome does not treat an element with opacity:0 as a Largest Contentful Paint
 * candidate at all. It only becomes one on the first frame that paints it
 * visible — so a hero headline that fades in from 0 makes LCP wait for the
 * animation instead of the document.
 *
 * This bit twice. The first version animated the H1 with Motion and
 * `initial={{ opacity: 0 }}`, so the headline was absent from the server HTML
 * and LCP waited on the whole JS pipeline: 6.8s on mobile, 6,075ms of it render
 * delay. That was fixed by moving to CSS keyframes — but the keyframes still
 * said `from { opacity: 0 }`, so Chrome still refused the first paint and
 * mobile LCP sat at 4.9s with 4,125ms render delay, load delay and load time
 * both 0 (PageSpeed, 2026-08-16). Same defect, one layer down.
 *
 * Nothing catches this. The page builds, the H1 is in the HTML, the animation
 * looks right to a human, every test passes, and Lighthouse reports a number
 * with no indication that a CSS property is what set it.
 *
 * 0.06 is imperceptible against the hero scrim over a 0.9s ease but is a
 * non-zero opacity, so the first paint counts. The H1 also carries no
 * animation-delay: `both` applies the from-state during the delay, so any
 * delay is dead time in which the LCP element is still near-invisible.
 *
 * See debugbear.com/blog/opacity-animation-poor-lcp.
 */

const CSS = fs.readFileSync(path.join(process.cwd(), "app", "globals.css"), "utf8");

function block(re: RegExp): string {
  const m = CSS.match(re);
  return m ? m[0] : "";
}

describe("hero entrance animation stays LCP-eligible", () => {
  it("starts the hero-rise keyframe at a non-zero opacity", () => {
    const kf = block(/@keyframes hero-rise\s*\{[\s\S]*?\n\}/);
    expect(kf, "@keyframes hero-rise not found").not.toBe("");

    const from = kf.match(/from\s*\{[^}]*\}/)?.[0] ?? "";
    const opacity = from.match(/opacity:\s*([\d.]+)/)?.[1];

    expect(opacity, "the from-state must set an explicit opacity").toBeDefined();
    // The whole point: 0 removes the element from LCP consideration in Chrome.
    expect(Number(opacity)).toBeGreaterThan(0);
    // And it must still be invisible to a human, or this is just a visual change.
    expect(Number(opacity)).toBeLessThanOrEqual(0.1);
  });

  it("gives the H1 no animation-delay", () => {
    const h1 = block(/\.hero-rise-h1\s*\{[^}]*\}/);
    expect(h1, ".hero-rise-h1 rule not found").not.toBe("");
    // `both` holds the from-state through the delay, so a delay on the LCP
    // element is time it spends near-invisible for no visual gain.
    expect(h1).not.toMatch(/animation-delay/);
  });

  it("keeps the reduced-motion escape hatch fully opaque", () => {
    // Users with prefers-reduced-motion get no animation, so they must land on
    // opacity 1 outright rather than being left at the 0.06 from-state.
    const reduced = CSS.match(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{[\s\S]*?\.hero-rise[^}]*\}/,
    )?.[0];
    expect(reduced, "no reduced-motion rule for .hero-rise").toBeTruthy();
    expect(reduced).toMatch(/opacity:\s*1/);
  });
});
