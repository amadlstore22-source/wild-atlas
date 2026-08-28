import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * 170 KB OF ARABIC FONTS PRELOADED ON EVERY NON-ARABIC PAGE
 *
 * next/font emits a `<link rel="preload" as="font">` for every weight of every
 * font declared in a module, at the highest fetch priority the browser has. It
 * does that from MODULE SCOPE — it cannot see that the Arabic variable is
 * applied only when `isRtl`, because that decision happens later, inside the
 * component.
 *
 * So five weights of IBM Plex Sans Arabic (300/400/500/600/700) were preloaded
 * on /en, /fr, /es, /de and /it — five locales that never draw one Arabic
 * glyph. Measured on the live site before the fix:
 *
 *     /en  8 font preloads     /fr  8      /es  8      /de  8      /it  8
 *     of which 5 were Arabic = 174,340 bytes
 *
 * Those bytes competed with the LCP hero image for bandwidth on a throttled
 * mobile connection, where the measured LCP was 5,252 ms against a 2,500 ms
 * "good" threshold and the page spent 4,551 ms blank after the HTML arrived.
 *
 * Nothing catches this. It is valid TypeScript, every page renders correctly,
 * the fonts are genuinely used somewhere on the site, and the only symptom is
 * a slow page — which no test measures. It took reading the rendered <head>
 * against the generated @font-face rules to see it at all.
 *
 * preload:false keeps the @font-face rules and drops only the <link> hint, so
 * /ar still gets the font — the browser fetches it on demand when it hits text
 * that needs it. Verified after the fix: 8 -> 3 preloads, all five Arabic
 * hashes gone from /en, and /ar still carrying all 25 Arabic @font-face rules.
 *
 * This asserts on the SOURCE rather than the build output so it runs in the
 * normal `vitest run` with no build step. The rule it encodes: a font that is
 * only conditionally applied must not be preloaded unconditionally.
 */

const LAYOUT = join(__dirname, "..", "..", "app", "[lang]", "layout.tsx");

describe("font preloading", () => {
  it("the Arabic font is not preloaded, because five of six locales never use it", () => {
    const src = readFileSync(LAYOUT, "utf-8");

    const call = src.slice(
      src.indexOf("IBM_Plex_Sans_Arabic({"),
      src.indexOf("});", src.indexOf("IBM_Plex_Sans_Arabic({")),
    );

    expect(
      call.length > 0,
      "The IBM_Plex_Sans_Arabic({...}) call could not be found in the layout.\n" +
        "If the Arabic font moved, move this assertion with it — the underlying\n" +
        "rule still applies to whatever declares it.",
    ).toBe(true);

    expect(
      /preload:\s*false/.test(call),
      "The Arabic font has lost `preload: false`. That re-adds a\n" +
        "<link rel=preload as=font> for all five Arabic weights — ~170 KB — to\n" +
        "EVERY page of /en, /fr, /es, /de and /it, at the highest fetch priority\n" +
        "the browser has, on locales that never render an Arabic glyph. Those\n" +
        "bytes compete directly with the LCP hero image.\n\n" +
        "next/font emits preload tags from module scope, so it cannot see that\n" +
        "the --font-arabic variable is applied only when isRtl. Dropping the\n" +
        "preload does NOT break Arabic: the @font-face rules still ship and the\n" +
        "browser fetches the file when it meets text that needs it.",
    ).toBe(true);
  });

  it("the Arabic font is still declared and still applied to RTL pages", () => {
    // The other half of the rule. `preload: false` is correct; deleting the
    // font, or detaching it from the <html> className, would "fix" the preload
    // count by breaking Arabic typography instead.
    const src = readFileSync(LAYOUT, "utf-8");

    expect(
      src.includes("IBM_Plex_Sans_Arabic"),
      "The Arabic font is gone entirely. Arabic pages will fall back to a\n" +
        "system font. preload:false was the fix, not removal.",
    ).toBe(true);

    expect(
      /isRtl\s*\?[^:]*ibmPlexArabic\.variable/.test(src),
      "The Arabic font variable is no longer applied to the <html> element on\n" +
        "RTL pages, so /ar renders in a fallback face. It must stay gated on\n" +
        "isRtl (applied for Arabic, absent otherwise) — that gating is exactly\n" +
        "why preloading it on every locale was waste.",
    ).toBe(true);
  });

  it("only fonts used by every locale are preloaded", () => {
    // Encodes the general rule rather than today's font list, so the next font
    // added is covered too.
    const src = readFileSync(LAYOUT, "utf-8");

    // Only the ternary's TRUE branch — the part that runs on some locales and
    // not others. Anchoring loosely on `isRtl ? ... foo.variable` matches
    // backwards across the whole template literal and picks up the
    // unconditional fonts sitting before it, which are correctly preloaded.
    const conditional = [...src.matchAll(/isRtl\s*\?[^:]*?(\w+)\.variable[^:]*?:/g)].map((m) => m[1]);

    const notPreloaded: string[] = [];
    for (const varName of conditional) {
      // Find the declaration for this font and check it opted out.
      const decl = new RegExp(`const ${varName}\\s*=\\s*\\w+\\(\\{[\\s\\S]*?\\n\\}\\);`);
      const block = src.match(decl)?.[0] ?? "";
      if (block && !/preload:\s*false/.test(block)) notPreloaded.push(varName);
    }

    expect(
      notPreloaded,
      `These fonts are applied CONDITIONALLY (only on some locales) but are\n` +
        `still preloaded on every page. next/font emits the preload tag from\n` +
        `module scope, so a conditional className cannot suppress it — the\n` +
        `bytes ship to every locale regardless. Add \`preload: false\`:\n  ` +
        notPreloaded.join("\n  "),
    ).toEqual([]);
  });
});
