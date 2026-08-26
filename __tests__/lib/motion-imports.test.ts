import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * The `motion` component cannot be tree-shaken below 34kb, so the app renders
 * the slim `m` component and loads features once through <MotionProvider>
 * (LazyMotion + domAnimation). That saves ~22kb of JavaScript on every page.
 *
 * The arrangement has one sharp edge. An `m` component with no LazyMotion
 * ancestor renders INERT: its `initial={{ opacity: 0 }}` is applied and its
 * `animate` never runs, so the element stays invisible forever. The homepage
 * ships 44 elements that start at opacity:0 (the TrustBar row, the WhyUs cards,
 * the CategoryGrid tiles), and every one of them would silently disappear.
 *
 * Worse, re-introducing a plain `motion` import anywhere undoes the saving for
 * the WHOLE app -- the full component gets pulled back into the shared chunk --
 * while everything still looks and behaves correctly. There is no visual symptom
 * to notice, and `next build` is perfectly happy either way.
 *
 * LazyMotion offers a `strict` prop that throws when a `motion` component
 * renders inside it, but it throws in the BROWSER, at runtime, turning a missed
 * import into a blank page for a real visitor mid-booking. This suite enforces
 * the same rule at build time, where the cost is a failed CI run.
 *
 * Catalogue-wide by design: the risk is not the sixteen files converted today,
 * it is the seventeenth component someone adds next month by copying an old one.
 */

const ROOTS = ["app", "components"];

/** Every .tsx file under app/ and components/. */
function tsxFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) tsxFiles(path, out);
    else if (entry.endsWith(".tsx")) out.push(path);
  }
  return out;
}

const FILES = ROOTS.flatMap((r) => tsxFiles(r)).map((path) => ({
  path: path.replace(/\\/g, "/"),
  src: readFileSync(path, "utf8"),
}));

// `import { motion } from "motion/react"` in any form, including alongside
// hooks: import { motion, useScroll } from "motion/react".
const FULL_MOTION_IMPORT = /import\s*\{[^}]*\bmotion\b[^}]*\}\s*from\s*["']motion\/react["']/;

describe("Motion bundle discipline", () => {
  it("no component imports the full `motion` component", () => {
    const offenders = FILES.filter((f) => FULL_MOTION_IMPORT.test(f.src)).map((f) => f.path);

    expect(
      offenders,
      `These files import the full \`motion\` component, which cannot be\n` +
        `tree-shaken below 34kb and re-inflates the shared bundle for every\n` +
        `page. Import the slim component instead:\n\n` +
        `    import * as m from "motion/react-m";\n\n` +
        `and render <m.div> rather than <motion.div>. Hooks (useScroll,\n` +
        `useSpring, useInView, useReducedMotion) and AnimatePresence stay on\n` +
        `"motion/react" -- they are already tree-shakeable.\n\nOffenders:\n  ` +
        offenders.join("\n  "),
    ).toEqual([]);
  });

  it("no JSX still renders <motion.*>", () => {
    // Catches a half-finished conversion: the import was changed but the tags
    // were not, which fails typecheck -- or the reverse, which does not.
    const offenders = FILES.filter(
      (f) => /<motion\./.test(f.src) && !f.path.endsWith("MotionProvider.tsx"),
    ).map((f) => f.path);

    expect(
      offenders,
      `These files still render <motion.*> tags. Rename them to <m.*> to match\n` +
        `the slim import:\n  ` + offenders.join("\n  "),
    ).toEqual([]);
  });

  it("MotionProvider wraps the app exactly once, in the root layout", () => {
    const layout = FILES.find((f) => f.path.endsWith("app/[lang]/layout.tsx"));
    expect(layout, "app/[lang]/layout.tsx not found").toBeTruthy();
    expect(
      layout!.src.includes("<MotionProvider>"),
      `app/[lang]/layout.tsx no longer renders <MotionProvider>. Every <m.*>\n` +
        `in the app needs a LazyMotion ancestor; without one they render inert\n` +
        `and the 44 elements that start at opacity:0 never become visible.`,
    ).toBe(true);
  });

  it("MotionProvider loads domAnimation, and only upgrades to domMax if needed", () => {
    const provider = FILES.find((f) => f.path.endsWith("ui/MotionProvider.tsx"));
    expect(provider, "MotionProvider.tsx not found").toBeTruthy();

    // domMax (+25kb) is only warranted by pan/drag gestures or layout
    // animations. If nobody uses those, domAnimation (+15kb) is 10kb cheaper.
    const usesLayoutOrDrag = FILES.some((f) =>
      /^\s*(layout|layoutId|drag|dragConstraints|dragElastic)(=|\s*\/?>|\s*$)/m.test(f.src),
    );

    if (!usesLayoutOrDrag) {
      expect(
        provider!.src.includes("domAnimation"),
        `Nothing in the codebase uses layout animations or drag gestures, so\n` +
          `MotionProvider should load domAnimation (+15kb), not domMax (+25kb).`,
      ).toBe(true);
    } else {
      expect(
        provider!.src.includes("domMax"),
        `Something now uses a layout animation or drag gesture. Those need\n` +
          `domMax; with only domAnimation loaded they silently do nothing.`,
      ).toBe(true);
    }
  });
});
