import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

/**
 * Interaction pass, 2026-10-20. Three defects that typecheck, the unit tests
 * and next build all passed, because none of them is visible in a desktop
 * screenshot of an English page:
 *
 * 1. Sticky hover on phones. Tailwind v4 already wraps `hover:` utilities in
 *    `@media (hover: hover)`, but the hand-written `.btn-brass:hover` and
 *    `.btn-ghost:hover` in globals.css were not. On a phone :hover sticks after
 *    a tap, so the site's main "Book" button stayed lifted and dark until the
 *    visitor tapped somewhere else.
 *
 * 2. Arrows pointing backwards on /ar. Of 36 arrow icons, 6 handled dir="rtl".
 *    Every "View all →", "Learn more →" and "← Back" on the Arabic pages
 *    pointed into the text instead of the reading direction.
 *
 * 3. `transition-all` everywhere (43 uses). It animated layout (`gap` on 17
 *    "view all" links re-flowed the line every frame), and on the WhyUs cards it
 *    fought Motion: Motion writes transform/background each frame and the CSS
 *    transition re-eased every write, so the hover lagged behind the pointer.
 *
 * Catalogue-wide on purpose: the next component someone adds is where these
 * come back.
 */
const ROOT = join(__dirname, "..", "..");

function tsxFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === "node_modules" ? [] : tsxFiles(p);
    return p.endsWith(".tsx") ? [p] : [];
  });
}
const FILES = [...tsxFiles(join(ROOT, "components")), ...tsxFiles(join(ROOT, "app"))].map((p) => ({
  path: relative(ROOT, p).replace(/\\/g, "/"),
  src: readFileSync(p, "utf8"),
}));

describe("hand-written hover never sticks on touch screens", () => {
  it("every :hover rule in globals.css that moves or recolours sits inside a hover media query", () => {
    // Comments mention ":hover" in prose; scrollbar thumbs only exist under a mouse.
    const css = readFileSync(join(ROOT, "app", "globals.css"), "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/::-webkit-scrollbar[^{]*\{[^}]*\}/g, "");
    // Remove the blocks that are correctly gated, then look for what is left.
    const ungated = css.replace(/@media\s*\(hover:\s*hover\)[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, "");
    const offenders = [...ungated.matchAll(/([^{}]*:hover[^{]*)\{([^}]*)\}/g)]
      .filter(([, , body]) => /\b(transform|translate|background|box-shadow)\s*:/.test(body))
      .map(([, sel]) => sel.trim());
    expect(offenders, `Wrap these in @media (hover: hover) and (pointer: fine), or a tap leaves them stuck on phones:\n  ${offenders.join("\n  ")}`).toEqual([]);
  });
});

describe("arrows point the reading direction on Arabic pages", () => {
  // Positional controls: previous/next in a gallery or between posts sit on a
  // physical side of the screen, so they are not mirrored with the text.
  const POSITIONAL = new Set(["components/ui/GalleryLightbox.tsx", "components/tours/TourGallery.tsx", "app/[lang]/blog/[slug]/page.tsx:prevnext"]);

  it("every link arrow carries arrow-go / arrow-back / dir-flip or an rtl: variant", () => {
    const bad: string[] = [];
    for (const f of FILES) {
      if (POSITIONAL.has(f.path)) continue;
      for (const m of f.src.matchAll(/<(ArrowRight|ArrowLeft|ArrowUpRight|CaretRight)\b([\s\S]*?)\/>/g)) {
        const attrs = m[2];
        if (/arrow-go|arrow-back|dir-flip|rtl:/.test(attrs)) continue;
        // The blog's previous/next-post pair is positional (see above).
        if (f.path === "app/[lang]/blog/[slug]/page.tsx" && /group-hover:text-forest/.test(attrs)) continue;
        bad.push(`${f.path}: <${m[1]}${attrs.slice(0, 60)}…`);
      }
    }
    expect(bad, `Add className "arrow-go" (forward), "arrow-back" (back) or "dir-flip" (chevron) so it mirrors on dir="rtl":\n  ${bad.join("\n  ")}`).toEqual([]);
  });
});

describe("transitions name what they animate", () => {
  // shadcn primitive kept as shipped; it is not used on a page.
  const ALLOWED = new Set(["components/ui/badge.tsx"]);

  it("no transition-all, and no hover animation of gap", () => {
    const bad = FILES.filter((f) => !ALLOWED.has(f.path))
      .flatMap((f) => [...f.src.matchAll(/transition-all|(?:group-)?hover:gap-[\w.[\]]+/g)].map((m) => `${f.path}: ${m[0]}`));
    expect(bad, `Use Tailwind's \`transition\` (colour, opacity, shadow, transform) or transition-[prop], and nudge an arrow with .arrow-go instead of animating gap:\n  ${bad.join("\n  ")}`).toEqual([]);
  });
});
