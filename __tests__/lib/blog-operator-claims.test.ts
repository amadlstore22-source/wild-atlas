import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { TOURS } from "@/lib/tours";

/**
 * Blog prose must describe the operator as it actually is.
 *
 * Found 2026-10-31 while reading why AI assistants cite other sites for
 * "private vs shared desert tour": our own comparison post said "Every tour
 * we run is private", twice, in six languages, while the catalogue sells
 * shared Merzouga and Zagora departures, and the same post's FAQ spoke of
 * "our shared departures". The camp comparison post said a luxury upgrade
 * costs "about €70 per person per night" and that "most of our desert tours"
 * use shared-bathroom camps; the owner's price is €40 (2026-10-11) and the
 * private Merzouga tours use Sahara Garden, whose tents have a private
 * bathroom. AI assistants quote these posts word for word.
 *
 * Nothing caught it: the sentences are valid TypeScript, the pages build,
 * and only someone who knows the catalogue notices.
 *
 * Fix a failure by correcting the post. If the owner changes the upgrade
 * price, update UPGRADE_EUR with the date and source in this docblock.
 */

const LIB = path.resolve(__dirname, "../../lib");
const POSTS = readdirSync(LIB)
  .filter((f) => /^blog(\.[a-z]{2}\.part\d)?\.ts$/.test(f))
  .map((f) => ({ file: f, text: readFileSync(path.join(LIB, f), "utf8") }));

// "All our tours are private", as each locale has written it.
const ALL_PRIVATE = [
  /every tour we (run|offer|operate) is private/i,
  /all (of )?our tours are private/i,
  /tous nos circuits sont privés/i,
  /alle unsere touren sind privat/i,
  /todos nuestros circuitos son privados/i,
  /tutti i nostri tour sono privati/i,
  /جميع رحلاتنا خاصة|كل رحلاتنا خاصة/,
];

// Owner, 2026-10-11: luxury upgrade on private tours = EUR 40 per person per night.
const UPGRADE_EUR = 40;

describe("blog claims about the operator", () => {
  it("no post says every tour is private while shared tours are sold", () => {
    const shared = TOURS.filter((t) => t.tourType === "shared").map((t) => t.slug);
    expect(shared.length, "the catalogue has shared tours").toBeGreaterThan(0);
    const wrong: string[] = [];
    for (const { file, text } of POSTS) {
      text.split("\n").forEach((line, i) => {
        if (ALL_PRIVATE.some((re) => re.test(line))) wrong.push(`${file}:${i + 1}`);
      });
    }
    expect(
      wrong,
      `We sell shared tours (${shared.join(", ")}), so "all our tours are private" is false.\n` +
        `Say we run both, on these lines:\n  ` +
        wrong.join("\n  "),
    ).toEqual([]);
  });

  it("a link labelled shared goes to a shared tour", () => {
    // Five translations of booking-morocco-tour-direct-vs-platform and
    // morocco-tour-price-group-size said "[a shared Zagora tour](…/zagora-2day-marrakech)
    // at €77": the link went to the PRIVATE tour (€195 each for two) at a
    // price neither tour has had since.
    const type = new Map(TOURS.map((t) => [t.slug, t.tourType]));
    const SHARED = /\b(shared|partagée?s?|geteilte[nrs]?|compartid[oa]s?|condivis[oa])\b|المشتركة/i;
    // The label may not contain "[" or a newline, or it swallows the FAQ text before it.
    const LINK = /\[([^\][\n]+)\]\(\/(?:en|fr|de|es|it|ar)\/tours\/([a-z0-9-]+)\)/g;
    const wrong: string[] = [];
    for (const { file, text } of POSTS) {
      for (const m of text.matchAll(LINK)) {
        const slug = m[2];
        if (!type.has(slug)) continue; // localised slugs are checked by the link tests
        if (SHARED.test(m[1]) && type.get(slug) !== "shared") wrong.push(`${file}: [${m[1]}] -> ${slug}`);
      }
    }
    expect(
      wrong,
      `These links say "shared" but go to a private tour. Point them at the shared tour\n` +
        `or drop the word:\n  ` +
        wrong.join("\n  "),
    ).toEqual([]);
  });

  it(`the camp upgrade is quoted at €${UPGRADE_EUR} per person per night`, () => {
    // "upgrade ... €N per person per night" in the camp comparison post, every locale.
    const wrong: string[] = [];
    for (const { file, text } of POSTS) {
      const s = text.indexOf('slug: "luxury-vs-standard-desert-camp-morocco"');
      if (s < 0) continue;
      const e = text.indexOf('slug: "', s + 10);
      const block = text.slice(s, e < 0 ? undefined : e);
      for (const line of block.split("\n")) {
        if (!/upgrade|surclass|mejora|ترقية/i.test(line)) continue;
        for (const m of line.matchAll(/(?:€\s?(\d+)|(\d+)\s?(?:€|EUR|يورو))[^.|]{0,40}?(?:per person|par personne|pro Person|por persona|a persona|للشخص)[^.|]{0,25}?(?:night|nuit|Nacht|noche|notte|الليلة)/gi)) {
          const n = Number(m[1] ?? m[2]);
          if (n !== UPGRADE_EUR) wrong.push(`${file}: €${n} in "${line.trim().slice(0, 90)}"`);
        }
      }
    }
    expect(
      wrong,
      `Our upgrade on private tours is €${UPGRADE_EUR} per person per night (owner, 2026-10-11).\n` +
        `Correct these:\n  ` +
        wrong.join("\n  "),
    ).toEqual([]);
  });
});
