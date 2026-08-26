import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Both events pages styled themselves with a --color-clay-* / --color-sand-<n>
 * / --color-terracotta-600 scale that does not exist. The real palette in
 * app/globals.css is a different scale entirely: --color-ink, --color-ink-soft,
 * --color-ink-muted for text, --color-sand and --color-sand-dark for surfaces
 * and rules, --color-terracotta for the accent.
 *
 * A `var()` pointing at an undefined custom property makes the whole
 * declaration invalid at computed-value time. It does NOT fall back to a
 * sensible default -- the declaration drops out and the element inherits
 * whatever its ancestor had. So every heading, paragraph, border and panel
 * background on both events pages rendered in an inherited colour rather than
 * the intended one, at lower contrast than designed, live, from the day the
 * feature shipped.
 *
 * Nothing caught it and nothing could have: `var(--anything)` is valid CSS,
 * Tailwind passes arbitrary values through untouched, typecheck sees a string,
 * and `next build` is perfectly happy. The pages look plausible in a
 * screenshot. The only way to notice is to compare a token against the
 * stylesheet by hand.
 *
 * Catalogue-wide over app/ and components/ deliberately: the events pages were
 * simply where it was found, and any new component that invents a token from a
 * scale that "looks like" the palette fails the same way.
 */

const ROOTS = ["app", "components"];
const GLOBALS = "app/globals.css";

/** Custom properties actually defined anywhere in the stylesheet. */
function definedTokens(): Set<string> {
  const css = readFileSync(GLOBALS, "utf8");
  const out = new Set<string>();
  // Matches a definition (`--x: value`), not a use (`var(--x)`).
  for (const m of css.matchAll(/(--[\w-]+)\s*:/g)) out.add(m[1]);
  return out;
}

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) sourceFiles(path, out);
    else if (/\.(tsx|ts|css)$/.test(entry)) out.push(path);
  }
  return out;
}

describe("CSS custom properties", () => {
  it("every var(--token) referenced in JSX is defined in globals.css", () => {
    const defined = definedTokens();
    // Sanity check: if this ever comes back tiny, the parser broke and the
    // whole suite would pass vacuously.
    expect(defined.size, "parsed no tokens from globals.css").toBeGreaterThan(20);

    const missing: string[] = [];
    for (const path of ROOTS.flatMap((r) => sourceFiles(r))) {
      if (path.replace(/\\/g, "/").endsWith(GLOBALS)) continue;
      const src = readFileSync(path, "utf8");
      for (const m of src.matchAll(/var\((--[\w-]+)\s*(?:,[^)]*)?\)/g)) {
        const token = m[1];
        // A var() with its own fallback -- var(--x, #fff) -- is safe by design.
        if (m[0].includes(",")) continue;
        if (!defined.has(token)) {
          const where = `${path.replace(/\\/g, "/")}: ${token}`;
          if (!missing.includes(where)) missing.push(where);
        }
      }
    }

    expect(
      missing,
      `These files reference CSS custom properties that app/globals.css never\n` +
        `defines. An undefined var() invalidates the whole declaration, so the\n` +
        `element silently inherits its ancestor's colour instead -- no build\n` +
        `error, no visual error you would notice without comparing to the\n` +
        `stylesheet. Use a token from the real palette (--color-ink,\n` +
        `--color-ink-soft, --color-ink-muted, --color-ink-faint, --color-sand,\n` +
        `--color-sand-dark, --color-bone, --color-terracotta) or add the new\n` +
        `token to globals.css:\n  ` + missing.join("\n  "),
    ).toEqual([]);
  });
});
