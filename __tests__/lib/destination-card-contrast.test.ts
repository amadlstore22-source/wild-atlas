import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * THE DESTINATION CARDS SHIPPED WITH TEXT NOBODY COULD READ.
 *
 * The cards lay text over a photo with a gradient scrim. The scrim was
 * `from-indigo-deep/90 via-indigo-deep/30 to-indigo-deep/15` — full strength
 * only at the very bottom edge, while the text block sat above it in the /30
 * band. Over a dark photo that works. Over Agadir's sunlit beach and Beni
 * Mellal's pale sky it did not:
 *
 *   subtitle  text-white/55  measured 2.55:1
 *   tags      text-white/50  measured 2.99:1
 *   pill      #B4472C on a 12% tint of itself   4.42:1
 *
 * WCAG AA wants 4.5:1 for body text. The owner reported it from screenshots,
 * not from a tool — which is the point: nothing in the build catches it. The
 * page renders, the classes are valid, TypeScript is happy, and the text is
 * simply invisible.
 *
 * A second, subtler fault came from the first fix: putting the ORIGINAL dark
 * region colours on the new dark pill plate made contrast worse (1.02:1 for
 * Tanger), because REGION_COLORS is designed for light ground. Hence the
 * separate REGION_TEXT_COLORS map, which this test pins.
 *
 * IF THIS FAILS: recompute the colour rather than lowering the threshold. The
 * ratios here are the accessibility floor, not a style preference.
 */

const PAGE = path.resolve(__dirname, "..", "..", "app", "[lang]", "destinations", "page.tsx");
const src = fs.readFileSync(PAGE, "utf8");

/** Relative luminance, WCAG 2.x. */
function luminance(hex: string): number {
  const ch = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * What sits behind the pill text: indigo-deep at 72% over the brightest photo
 * we would realistically ship. Deliberately the worst case — a dark photo is
 * always easier.
 */
const PILL_PLATE = "#3A3D4A";
const AA_BODY = 4.5;

/** Pull an object literal's hex values out of the page source. */
function hexesIn(constName: string): { region: string; hex: string }[] {
  const block = src.match(new RegExp(`const ${constName}[^{]*\\{([^}]*)\\}`, "s"));
  if (!block) return [];
  return [...block[1].matchAll(/"([^"]+)":\s*"(#[0-9A-Fa-f]{6})"/g)].map((m) => ({
    region: m[1],
    hex: m[2],
  }));
}

describe("destination card legibility", () => {
  it("every region pill colour clears WCAG AA against the pill plate", () => {
    const colours = hexesIn("REGION_TEXT_COLORS");
    expect(colours.length, "REGION_TEXT_COLORS is missing or empty").toBeGreaterThan(0);

    const failures = colours
      .map(({ region, hex }) => ({ region, hex, ratio: contrast(hex, PILL_PLATE) }))
      .filter((c) => c.ratio < AA_BODY)
      .map((c) => `${c.region} ${c.hex} = ${c.ratio.toFixed(2)}:1`);

    expect(
      failures,
      failures.length === 0
        ? ""
        : `Pill text fails WCAG AA (${AA_BODY}:1) against the plate ${PILL_PLATE}:\n  ` +
            failures.join("\n  ") +
            `\n\nLighten the colour in REGION_TEXT_COLORS — do not lower this threshold, ` +
            `and do not reuse REGION_COLORS, which is designed for light ground.`,
    ).toEqual([]);
  });

  it("every region has a text colour, not just a brand colour", () => {
    // A region present in REGION_COLORS but missing here falls back to the
    // default blue and silently loses its identity.
    const brand = hexesIn("REGION_COLORS").map((c) => c.region);
    const text = new Set(hexesIn("REGION_TEXT_COLORS").map((c) => c.region));
    const missing = brand.filter((r) => !text.has(r));
    expect(
      missing,
      missing.length === 0 ? "" : `No REGION_TEXT_COLORS entry for: ${missing.join(", ")}`,
    ).toEqual([]);
  });

  it("the card scrim stays strong across the text block, not just the edge", () => {
    // The original `via-indigo-deep/30` is what made the text unreadable.
    // Anything below /60 in the via stop puts us back there.
    const via = src.match(/via-indigo-deep\/(\d+)/);
    expect(via, "card scrim gradient not found").toBeTruthy();
    const strength = Number(via![1]);
    expect(
      strength,
      `Card scrim mid-stop is via-indigo-deep/${strength}. It was /30 when the ` +
        `subtitle measured 2.55:1 over a sunlit beach. Keep it at /60 or above.`,
    ).toBeGreaterThanOrEqual(60);
  });

  it("body text on the card is not faint", () => {
    // text-white/55 and /50 were the measured failures. Anything under /70
    // over a photo is a readability risk.
    const faint = [...src.matchAll(/text-white\/(\d+)/g)]
      .map((m) => Number(m[1]))
      .filter((n) => n < 70);
    expect(
      faint,
      faint.length === 0
        ? ""
        : `Card text at text-white/${faint.join(", /")} — too faint over a photo. ` +
            `The subtitle at /55 measured 2.55:1 against a 4.5:1 requirement.`,
    ).toEqual([]);
  });
});
