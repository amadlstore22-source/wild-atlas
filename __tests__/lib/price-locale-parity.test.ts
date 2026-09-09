import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * A tour must cost the same in every language.
 *
 * Commit 88b7095 (9 Aug 2026), "Apply the price uplift", raised prices across
 * the desert tours and day trips -- in lib/tours.ts only. Each locale
 * catalogue carries its own `price:` for all 48 tours, and lib/tours-i18n.ts
 * merges per FIELD, so the stale locale number overrode the uplifted English
 * one on that locale's pages. It shipped and stayed live for a month.
 *
 * What a customer saw, on the deployed site, on the same tour:
 *
 *   /en/tours/zagora-2day-marrakech             EUR 360 solo
 *   /fr/tours/circuit-zagora-2-jours-marrakech  EUR  62 en solo
 *
 * 36 of 48 tours undercharged in fr/es/de/it/ar, the worst by 83%. Nothing
 * caught it: both numbers are valid TypeScript, every page builds, every
 * locale renders, and the two figures only contradict each other if somebody
 * opens two language versions side by side. A visitor can switch language and
 * screenshot the cheaper price.
 *
 * Read from source rather than through tours-i18n: the merge is exactly what
 * hides the problem, since a locale that OMITS a field correctly inherits
 * English. The bug is a locale that SETS a different number, which is only
 * visible in the file itself.
 */

const LIB = join(process.cwd(), "lib");
const EN = "tours.ts";
const LOCALES = ["tours.fr.ts", "tours.es.ts", "tours.de.ts", "tours.it.ts", "tours.ar.ts"];

type Entry = { price?: string; depositAmount?: string; minPeople?: string; tiers: Record<string, string> };

/** Line-based on purpose: a regex spanning a whole tour object drifts across
 *  entries on a 4,000-line catalogue and silently compares the wrong tour. */
function scan(file: string): Record<string, Entry> {
  const out: Record<string, Entry> = {};
  let slug: string | null = null;
  for (const line of readFileSync(join(LIB, file), "utf8").split(/\r?\n/)) {
    const s = /^\s*slug: "([^"]+)",/.exec(line);
    if (s) {
      slug = s[1];
      out[slug] ??= { tiers: {} };
      continue;
    }
    if (!slug) continue;
    const f = /^\s*(price|depositAmount|minPeople): (\d+),\s*$/.exec(line);
    if (f) {
      out[slug][f[1] as "price" | "depositAmount" | "minPeople"] = f[2];
      continue;
    }
    const t = /^\s*\{ minPeople: (\d+), price: (\d+) \},\s*$/.exec(line);
    if (t) out[slug].tiers[t[1]] = t[2];
  }
  return out;
}

describe("tour prices are identical in every locale", () => {
  const en = scan(EN);

  it("finds tours to compare", () => {
    expect(Object.keys(en).length).toBeGreaterThan(40);
  });

  it("no locale sets a price that differs from English", () => {
    const drift: string[] = [];

    for (const file of LOCALES) {
      const loc = scan(file);
      for (const [slug, entry] of Object.entries(loc)) {
        const base = en[slug];
        if (!base) continue; // locale-only tour: nothing to compare against

        for (const field of ["price", "depositAmount", "minPeople"] as const) {
          const mine = entry[field];
          const theirs = base[field];
          // Omitted in the locale is correct -- tours-i18n falls back to EN.
          if (mine === undefined || theirs === undefined) continue;
          if (mine !== theirs) {
            drift.push(`${file} ${slug}.${field}: ${mine} (en: ${theirs})`);
          }
        }

        for (const [minPeople, price] of Object.entries(entry.tiers)) {
          const theirs = base.tiers[minPeople];
          if (theirs === undefined) continue;
          if (price !== theirs) {
            drift.push(`${file} ${slug} tier ${minPeople}+: ${price} (en: ${theirs})`);
          }
        }
      }
    }

    expect(
      drift,
      `These locales charge a different price than English for the same tour.\n` +
        `A visitor who switches language sees a different number for the same\n` +
        `trip. Copy the English figure into the locale catalogue -- English is\n` +
        `the side price changes are applied to, and the side\n` +
        `lib/competitor-prices.ts is benchmarked against:\n  ` +
        drift.join("\n  "),
    ).toEqual([]);
  });
});
