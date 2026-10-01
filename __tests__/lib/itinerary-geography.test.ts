import { describe, it, expect } from "vitest";
import { TOURS } from "@/lib/tours";

/**
 * An itinerary day must not route through a pass that is not on its road.
 *
 * Found 2026-10-01 while answering Agadir desert questions. Two Agadir tours
 * sent their clients "over the Tizi n'Tichka pass" on the way back to Agadir:
 *  - merzouga-3day-agadir day 3: "through Rissani, Tazarine ... back over the
 *    Tizi n'Tichka pass and down to Agadir", sold as 560 km / 9 h. Going over
 *    Tichka means going via Marrakech: 836 km and ~15 h. The road it actually
 *    describes (Tazarine, Agdz, Taliouine) measures ~680 km / ~12.5 h.
 *  - desert-4day-agadir day 4: "Ouarzazate -> Aït Ben Haddou -> Tizi n'Tichka
 *    -> Agadir ... through Marrakech and over the Anti-Atlas". Its own 360 km
 *    figure only fits the direct road via Tazenakht and Taliouine.
 * The same audit found Marrakech -> Midelt via Aït Ben Haddou and the Ziz
 * Valley sold as 340 km / 6 h; it is ~640 km / ~11 h (OSRM, cross-checked
 * against Errachidia -> Midelt 138 km).
 *
 * Tizi n'Tichka is the pass on the N9 between Marrakech and Ouarzazate, so a
 * day that crosses it starts or ends on the Marrakech side of the High Atlas:
 * Marrakech itself, or the valleys just south of it that join the N9 without
 * entering the city (Imlil, Asni, Ourika). Imlil -> Aït Ben Haddou is a real
 * Tichka day; Ouarzazate -> Agadir is not. Fix a failure by naming the road
 * the day really takes, and re-measure its driving and distance.
 */
describe("itinerary geography", () => {
  // Places on the Marrakech (north) side of the pass.
  const NORTH_SIDE = /marrak|imlil|asni|ourika|tahanaout/i;
  it("every day that crosses Tizi n'Tichka has one end on the Marrakech side", () => {
    const failures: string[] = [];
    for (const t of TOURS) {
      for (const d of t.itinerary ?? []) {
        const text = `${d.title} ${d.description ?? ""}`;
        if (/tichka/i.test(text) && !NORTH_SIDE.test(text)) {
          failures.push(`${t.slug} day ${d.day}: "${d.title}" crosses Tizi n'Tichka with neither end on the Marrakech side`);
        }
      }
    }
    expect(failures, `Tizi n'Tichka is only on the Marrakech-Ouarzazate road (N9):\n  ${failures.join("\n  ")}`).toEqual([]);
  });
});
