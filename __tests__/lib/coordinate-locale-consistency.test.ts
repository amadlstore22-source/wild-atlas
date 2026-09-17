import { describe, expect, it } from "vitest";
import { TOURS } from "@/lib/tours";
import { TOURS as TOURS_FR } from "@/lib/tours.fr";
import { TOURS as TOURS_ES } from "@/lib/tours.es";
import { TOURS as TOURS_DE } from "@/lib/tours.de";
import { TOURS as TOURS_IT } from "@/lib/tours.it";
import { TOURS as TOURS_AR } from "@/lib/tours.ar";
import type { Tour } from "@/lib/tours";

/**
 * ONE PLACE, ONE COORDINATE — ACROSS EVERY LOCALE FILE.
 *
 * THE INCIDENT (found 2026-09-17 while fixing the Toubkal map).
 *
 * Coordinates are duplicated by hand into all six catalogues. Nothing checked
 * that the copies agreed, and they had drifted badly:
 *
 *   Erg Chegaga        stored 36.5 km from the actual dune field, on 3 tours
 *   sahara-2day-agadir meetingPoint in 5 LOCALE files read "Erg Chegaga,
 *                      Western Sahara" at 158.7 km from Chegaga — while the
 *                      English file correctly said "Agadir — your hotel or
 *                      riad". Five language versions told customers to meet
 *                      in the desert instead of at their Agadir hotel, and
 *                      named a territory the tour does not enter.
 *   Toubkal Refuge     2.4 km from the real refuge, on every Toubkal tour
 *   Erg Chebbi         three different coordinates, up to 4.3 km apart
 *   Azzaden day 1      at 3,210 m — a ridge, not the valley floor the day
 *                      actually ends on (Azib Tamsoult, 2,203 m)
 *   Fes, Midelt,
 *   Dades, Ouarzazate  two coordinates each, 0.9–2.9 km apart
 *
 * WHY NOTHING CAUGHT IT. Every value is a valid number, every page renders,
 * and map-accuracy.test.ts checks precision and meeting-point sanity against
 * the ENGLISH catalogue only — so a locale file that disagreed with English,
 * or two English entries that disagreed with each other, both passed. The pin
 * lands somewhere plausible-looking on satellite imagery and only someone who
 * knows the ground can tell. Our own customer spotted the Toubkal one.
 *
 * WHAT THIS ASSERTS. Any stop name used more than once anywhere in the six
 * catalogues must resolve to exactly one coordinate. It deliberately compares
 * across locale files, which is the axis map-accuracy does not cover.
 *
 * IF THIS FAILS: pick the correct coordinate — verify it, do not guess — and
 * apply it in ALL SIX files. Two genuinely different places must not share a
 * name; rename one instead of relaxing this.
 */

const CATALOGUES: [string, Tour[]][] = [
  ["en", TOURS],
  ["fr", TOURS_FR],
  ["es", TOURS_ES],
  ["de", TOURS_DE],
  ["it", TOURS_IT],
  ["ar", TOURS_AR],
];

type Point = { name: string; lat: number; lng: number };

/** Every named point in a catalogue: itinerary stops, extras, meeting points. */
function pointsOf(tours: Tour[]): Point[] {
  const out: Point[] = [];
  for (const t of tours) {
    for (const d of t.itinerary ?? []) {
      for (const e of d.extraStops ?? []) out.push(e);
      if (d.stop) out.push(d.stop);
    }
    if (t.meetingPoint) out.push(t.meetingPoint);
  }
  return out;
}

describe("Coordinates are consistent across locales", () => {
  it("every stop name resolves to exactly one coordinate", () => {
    const byName = new Map<string, Map<string, Set<string>>>();

    for (const [lang, tours] of CATALOGUES) {
      for (const p of pointsOf(tours)) {
        const key = `${p.lat},${p.lng}`;
        if (!byName.has(p.name)) byName.set(p.name, new Map());
        const coords = byName.get(p.name)!;
        if (!coords.has(key)) coords.set(key, new Set());
        coords.get(key)!.add(lang);
      }
    }

    const conflicts: string[] = [];
    for (const [name, coords] of byName) {
      if (coords.size < 2) continue;
      const detail = [...coords]
        .map(([c, langs]) => `${c} (${[...langs].join(",")})`)
        .join("  vs  ");
      conflicts.push(`${name}: ${detail}`);
    }

    expect(
      conflicts,
      `The same place is pinned in two different spots:\n  ` +
        conflicts.join("\n  ") +
        `\n\nA coordinate is duplicated by hand into all six catalogues and ` +
        `nothing else compares them. Verify the correct position (OSM, and ` +
        `sanity-check the elevation against the DEM) and apply it in every ` +
        `file — a pin in the wrong valley is a factual error about the tour.`,
    ).toEqual([]);
  });

  it("no locale meeting point contradicts the English one", () => {
    const en = new Map(TOURS.map((t) => [t.slug, t.meetingPoint]));
    const drift: string[] = [];

    for (const [lang, tours] of CATALOGUES) {
      if (lang === "en") continue;
      for (const t of tours) {
        const base = en.get(t.slug);
        if (!base || !t.meetingPoint) continue;
        // Names are translated; coordinates must not be.
        if (t.meetingPoint.lat !== base.lat || t.meetingPoint.lng !== base.lng) {
          drift.push(
            `[${lang}] ${t.slug}: ${t.meetingPoint.lat},${t.meetingPoint.lng} ` +
              `vs en ${base.lat},${base.lng} ("${t.meetingPoint.name}")`,
          );
        }
      }
    }

    expect(
      drift,
      `A locale pins the meeting point somewhere the English page does not:\n  ` +
        drift.join("\n  ") +
        `\n\nThis shipped: five locales sent sahara-2day-agadir customers to ` +
        `"Erg Chegaga, Western Sahara", 158.7 km away, while /en/ correctly ` +
        `said "Agadir — your hotel or riad". Where a customer is told to be ` +
        `is not a translatable field.`,
    ).toEqual([]);
  });
});
