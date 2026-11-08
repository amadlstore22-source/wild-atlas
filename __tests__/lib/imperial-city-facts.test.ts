import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

/**
 * Three history and landmark errors on the imperial-cities pages, all live in
 * six languages until 2026-11-07, found while writing the imperial cities
 * route guide for the Clarity AI report ("cultural city interpretation":
 * AI answers quote heritage facts from pages like ours word for word).
 *
 * 1. The 5-day (Marrakech) and 6-day (Agadir) imperial cities tours listed
 *    "Hassan II Mosque in Rabat" as a highlight. The mosque is in Casablanca
 *    (day 5 of the same tour says so). Rabat's monument on day 4 is the
 *    Hassan Tower.
 * 2. The same tours called the Hassan II Mosque "the world's largest mosque
 *    outside of Saudi Arabia". Wikipedia (Hassan II Mosque): "the second
 *    largest mosque in Africa and one of the largest mosques in the world".
 *    Djamaa el Djazaïr in Algiers (2019) is the third largest in the world.
 * 3. The Meknes guide called Moulay Ismail "founder of the Alaouite dynasty".
 *    Wikipedia (Meknes): Moulay Rashid ruled 1666-1672, and "upon Rashid's
 *    death in 1672, Moulay Isma'il became sultan".
 *
 * Nothing caught them: valid TypeScript, every page builds, and only a reader
 * who knows the history notices. The test scans every tour and blog file in
 * every locale, not just the ones fixed, because the same sentences were
 * copied between tours.
 */

const LIB = path.resolve(__dirname, "../../lib");
// Tours, blog, destinations and the map labels all repeated these claims.
const SOURCES = [
  ...readdirSync(LIB)
    .filter((f) => /^(blog|tours|destinations)(\.[a-z]{2})?(\.part\d)?\.ts$|^map-places-i18n\.ts$/.test(f))
    .map((f) => path.join(LIB, f)),
  path.join(LIB, "seo/category-faq.ts"),
  path.resolve(LIB, "../components/map/ToursMap.tsx"),
].map((p) => ({ file: path.basename(p), text: readFileSync(p, "utf8") }));

function sentences(text: string): string[] {
  return text.split(/(?<=[.!?؟])\s+|\n/);
}

const CHECKS: { name: string; fix: string; re: RegExp }[] = [
  {
    name: "Hassan II Mosque placed in Rabat",
    fix: "The Hassan II Mosque is in Casablanca. In Rabat it is the Hassan Tower.",
    re: /Hassan II Mosque in Rabat|Mosquée Hassan II à Rabat|Mezquita Hassan II en Rabat|Moschea Hassan II a Rabat|Hassan-II\.-Moschee in Rabat|مسجد الحسن الثاني في الرباط/i,
  },
  {
    name: "Hassan II Mosque called the largest outside Saudi Arabia",
    fix: 'Say "one of the largest mosques in the world" (second largest in Africa).',
    re: /largest mosque outside|plus grande mosquée hors|mayor mezquita del mundo fuera|più grande moschea del mondo fuori|größte Moschee außerhalb|أكبر مسجد في العالم خارج/i,
  },
  {
    // 4. Added 2026-11-08 (owner: "soften"). 58 places in six languages said
    //    Fes el-Bali is THE world's largest car-free urban area. Wikipedia
    //    (Fez, Morocco): "one of the world's largest and oldest urban
    //    pedestrian zones (car-free areas)".
    name: "Fes called the world's largest car-free urban area",
    fix: 'Say "one of the world\'s largest car-free urban areas" (and the same in each locale).',
    re: /(?<!one of )the largest car-free|(?<!one of the )world's largest car-free|la plus grande (zone|ville|médina)[^.]{0,30}sans voiture|le plus grand espace urbain sans voiture|"Plus grande zone urbaine|la mayor (zona|ciudad|medina)[^.]{0,20}sin coches|(die|das) größte autofreie|"Größte autofreie|la più grande (zona|area|città|medina)[^.]{0,40}(senza auto|priva di auto|pedonale)|أكبر (منطقة|مدينة)[^.]{0,20}خالية من السيارات/i,
  },
  {
    name: "Moulay Ismail called founder of the Alaouite dynasty",
    fix: "Moulay Ismail was an Alaouite sultan, not the founder (Moulay Rashid ruled before him).",
    re: /(Ismail|Ismaïl|إسماعيل)[^.]{0,40}(founder of the Alaouite|fondateur de la dynastie alaouite|fundador de la dinastía alauí|Begründer der Alawiden|fondatore della dinastia alawide|مؤسس الدولة العلوية)/i,
  },
];

describe("imperial cities: landmark and history facts", () => {
  for (const c of CHECKS) {
    it(`no page repeats: ${c.name}`, () => {
      const bad: string[] = [];
      for (const { file, text } of SOURCES) {
        for (const s of sentences(text)) {
          if (c.re.test(s)) bad.push(`${file}: ${s.trim().slice(0, 160)}`);
        }
      }
      expect(bad, `${c.fix}\nFix these sentences:\n  `).toEqual([]);
    });
  }
});
