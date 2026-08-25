import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * A page must show the same photo in every language.
 *
 * This caught a real miss: the photo pass that added 23 of the owner's own
 * photos edited only lib/blog.ts and lib/tours.ts, so fr/es/de/it/ar kept the
 * OLD heroes -- including blog-hero-sahara-dunes-golden.jpg, the very image the
 * work existed to stop reusing. 22 pages x 5 locales = 110 pages still served
 * the duplicates, and non-English is exactly where the indexing gap is worst.
 *
 * heroImage is not translatable content, so English is the source of truth and
 * every locale must match it byte for byte.
 */

const LOCALES = ["fr", "es", "de", "it", "ar"] as const;
const ROOT = join(__dirname, "..", "..");

const SETS: { label: string; en: string; locale: (l: string) => string }[] = [
  { label: "tours", en: "tours.ts", locale: (l) => `tours.${l}.ts` },
  { label: "blog", en: "blog.ts", locale: (l) => `blog.${l}.part2.ts` },
];

/** slug -> record body, bounded to a single record. */
function blocks(file: string): Map<string, string> {
  const src = readFileSync(join(ROOT, "lib", file), "utf8");
  const marks = [...src.matchAll(/\n {4}slug: "([^"]+)"/g)];
  const out = new Map<string, string>();
  marks.forEach((m, i) => {
    const end = i + 1 < marks.length ? marks[i + 1].index! : src.length;
    out.set(m[1], src.slice(m.index!, end));
  });
  return out;
}

function hero(body: string | undefined): string | null {
  if (!body) return null;
  const m = body.match(/\n {4}heroImage: "([^"]+)"/);
  return m ? m[1] : null;
}

describe("hero images are identical across locales", () => {
  for (const set of SETS) {
    const EN = blocks(set.en);

    for (const loc of LOCALES) {
      const file = set.locale(loc);
      const exists = existsSync(join(ROOT, "lib", file));

      it.skipIf(!exists)(`${set.label}/${loc} matches English`, () => {
        const L = blocks(file);
        const drift: string[] = [];
        for (const [slug, body] of EN) {
          const en = hero(body);
          const tr = hero(L.get(slug));
          if (en && tr && en !== tr) drift.push(`${slug}: ${tr} != ${en}`);
        }
        expect(drift, `heroImage drift in ${file}`).toEqual([]);
      });
    }
  }
});

describe("every referenced gallery image exists on disk", () => {
  // A locale file pointing at a deleted photo renders a broken hero in that
  // language only, which is easy to ship and hard to notice.
  const onDisk = new Set(readdirSync(join(ROOT, "public", "gallery")));

  const files = readdirSync(join(ROOT, "lib")).filter(
    (f) => /^(blog|tours)/.test(f) && f.endsWith(".ts")
  );

  for (const f of files) {
    it(`${f} references only existing files`, () => {
      const src = readFileSync(join(ROOT, "lib", f), "utf8");
      const missing = [...src.matchAll(/"\/gallery\/([^"]+)"/g)]
        .map((m) => m[1])
        .filter((n) => !onDisk.has(n));
      expect([...new Set(missing)], `missing files referenced by ${f}`).toEqual([]);
    });
  }
});
