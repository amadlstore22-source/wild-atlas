import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { MAP_PLACE_MATCH, goesToPlace, mapToursFor } from "@/lib/map-tours";
import { toursFor } from "@/lib/tours-i18n";
import { MAP_CATEGORY_TEXT, MAP_PLACE_NAME_EN, MAP_PLACE_TEXT } from "@/lib/map-places-i18n";
import type { Locale } from "@/app/[lang]/dictionaries";

const LOCALES: Locale[] = ["en", "fr", "es", "de", "it", "ar"];
const ROOT = process.cwd();
const MAP = readFileSync(join(ROOT, "components/map/ToursMap.tsx"), "utf8");
const PLACE_IDS = [...MAP.matchAll(/^\s+id: "([^"]+)",$/gm)].map((m) => m[1]);

/**
 * Homepage map panels (components/map/ToursMap.tsx), 2026-10-13.
 *
 * A Clarity recording showed a visitor open three places over three minutes
 * and leave without seeing a tour: the panel had no tours. The first version
 * of the fix ranked by the destination pages' score, where 3 also means
 * "starts nearby, same category", and listed the Marrakech medina tour under
 * Chefchaouen.
 *
 * The same day the owner found the panel photos broken or wrong: six were
 * Unsplash stock links, two of them dead, and "Fes" showed a café elsewhere.
 * None of this fails a build; the panel is client-only and renders on a click.
 */
describe("homepage map panels", () => {
  it("every place lists at least one tour, and only tours that go there", () => {
    const wrong: string[] = [];
    expect(PLACE_IDS.length).toBeGreaterThan(0);
    for (const id of PLACE_IDS) if (!MAP_PLACE_MATCH[id]) wrong.push(`${id}: no entry in MAP_PLACE_MATCH`);
    // The panel once looked tours up by destSlug, the parent destination page:
    // Tafraoute showed Agadir's tours, Rabat showed Fes's, Toubkal none.
    const lookups = [...MAP.matchAll(/tours=\{tours\[selected\.(\w+)\]/g)].map((m) => m[1]);
    expect(lookups.length).toBeGreaterThan(0);
    for (const k of lookups) if (k !== "id") wrong.push(`ToursMap looks tours up by selected.${k}; MAP_PLACE_MATCH is keyed by id`);
    for (const lang of LOCALES) {
      const tours = toursFor(lang);
      const byPlace = mapToursFor(lang);
      for (const id of PLACE_IDS) {
        const rows = byPlace[id] ?? [];
        if (!rows.length) wrong.push(`${lang}/${id}: no tours at all`);
        for (const r of rows) {
          const t = tours.find((x) => r.href === `/${lang}/tours/${x.localizedSlug ?? x.slug}`);
          if (!t) wrong.push(`${lang}/${id}: ${r.href} is not a tour URL in this locale`);
          else if (!goesToPlace(t, id)) wrong.push(`${lang}/${id}: ${t.slug} does not go there`);
        }
      }
    }
    expect(wrong, `Fix MAP_PLACE_MATCH in lib/map-tours.ts:\n  ${wrong.join("\n  ")}`).toEqual([]);
  });

  it("use the site's own photos, and every one exists", () => {
    const images = [...MAP.matchAll(/\bimage: "([^"]+)"/g)].map((m) => m[1]);
    expect(images.length).toBe(PLACE_IDS.length);
    const bad = images.filter((p) => !p.startsWith("/gallery/") || !existsSync(join(ROOT, "public", p)));
    expect(bad, `Map panel photos must be files in public/gallery, opened and checked, not stock links:\n  ${bad.join("\n  ")}`).toEqual([]);
  });

  /**
   * The map's names and descriptions were English on all six locales until
   * 2026-10-13. Each locale now carries its own text per place; a place added
   * to the map without its translations falls back to English silently.
   */
  it("every place is translated in every locale, and every category label exists", () => {
    const missing: string[] = [];
    const english = new Map(
      [...MAP.matchAll(/id: "([^"]+)",\s*name:[\s\S]*?known: \[([\s\S]*?)\],/g)].map((m) => [m[1], (m[2].match(/"[^"]+"/g) ?? []).length]),
    );
    expect(english.size).toBe(PLACE_IDS.length);
    for (const lang of LOCALES.filter((l) => l !== "en")) {
      const text = MAP_PLACE_TEXT[lang] ?? {};
      for (const id of PLACE_IDS) {
        const t = text[id];
        if (!t?.name || !t.subtitle || !t.description) missing.push(`${lang}/${id}: missing`);
        else if (t.known.length !== english.get(id)) missing.push(`${lang}/${id}: ${t.known.length} "known for" lines, English has ${english.get(id)}`);
      }
    }
    const slugs = new Set([...MAP.matchAll(/^\s+slug: "([^"]+)",$/gm)].map((m) => m[1]));
    for (const lang of LOCALES) for (const slug of slugs) if (!MAP_CATEGORY_TEXT[lang]?.[slug]) missing.push(`${lang}: no category text for ${slug}`);
    expect(missing, `Add them to lib/map-places-i18n.ts:\n  ${missing.join("\n  ")}`).toEqual([]);
  });

  /**
   * "Browse … tours" on a map panel went to the destination page; the owner
   * wanted the tours (2026-10-13). It now opens /tours?place=<id>, which the
   * tours page filters with the same goesToPlace() as the panel.
   */
  it("the panel button opens the tours page filtered to that place", () => {
    expect(MAP).toContain("href={`/${lang}/tours?place=${dest.id}`}");
    expect(MAP).not.toMatch(/href=\{`\/\$\{lang\}\/destinations\/\$\{dest\.destSlug\}`\}/);
    const page = readFileSync(join(ROOT, "app/[lang]/tours/page.tsx"), "utf8");
    expect(page).toMatch(/goesToPlace\(t, place\)/);
    const names = Object.fromEntries([...MAP.matchAll(/id: "([^"]+)",\s*name: "([^"]+)",/g)].map((m) => [m[1], m[2]]));
    expect(MAP_PLACE_NAME_EN, "lib/map-places-i18n.ts MAP_PLACE_NAME_EN must match the map's English names").toEqual(names);
  });
});
