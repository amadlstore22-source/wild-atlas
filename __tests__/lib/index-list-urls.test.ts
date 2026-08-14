import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Guards the URL lists in docs/ that get fed to the Google Indexing API.
 *
 * A locale post with a `localizedSlug` is served ONLY at that slug — the
 * English segment is rewritten by proxy.ts and is not a real page. Submitting
 * both forms makes Googlebot crawl a URL whose canonical points elsewhere,
 * which Search Console then reports as "Duplicate, Google chose a different
 * canonical than user". That is exactly what happened to four cost posts in
 * the batches from 31 July - 3 August 2026.
 *
 * all-index-urls.txt cannot drift this way because it is generated from the
 * built sitemap, but the dated batch files are assembled by hand, so nothing
 * else would catch it.
 */

const ROOT = join(__dirname, "..", "..");
const DOCS = join(ROOT, "docs");
const SITE = "https://marrakechecotours.com";

const proxySrc = readFileSync(join(ROOT, "proxy.ts"), "utf-8");

function proxyMap(kind: "BLOG" | "TOUR", locale: string): Record<string, string> {
  const block = proxySrc.match(
    new RegExp(`const ${kind}_SLUGS_${locale.toUpperCase()}[^=]*=\\s*\\{([\\s\\S]*?)\\n\\};`)
  );
  if (!block) return {};
  const out: Record<string, string> = {};
  for (const [, k, v] of block[1].matchAll(/"([^"]+)":\s*"([^"]+)"/g)) out[k] = v;
  return out;
}

const LOCALISED = ["fr", "es", "de", "it"] as const;

// English slug -> true, per locale, for anything that is served at a localised
// URL instead. Those English forms must never appear in a submission list.
const rewritten: Record<string, Set<string>> = {};
for (const loc of LOCALISED) {
  // An entry that maps a slug to itself is not a rewrite: the page really is
  // served at the English segment in that locale (German keeps
  // anti-atlas-trekking-agadir, for instance). Only differing values redirect.
  const changed = (m: Record<string, string>) =>
    Object.entries(m)
      .filter(([from, to]) => from !== to)
      .map(([from]) => from);
  rewritten[loc] = new Set([
    ...changed(proxyMap("BLOG", loc)),
    ...changed(proxyMap("TOUR", loc)),
  ]);
}

function listFiles(): string[] {
  return readdirSync(DOCS).filter((f) => f.endsWith(".txt"));
}

function urlsIn(file: string): string[] {
  return readFileSync(join(DOCS, file), "utf-8")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("http"));
}

/** Lists already sent to Google. Frozen history — do not rewrite them. */
const HISTORICAL = /^(batch-2026-07|batch-2026-08-0[1-4]|remaining-after-|day3-|next-200-|priority-|new-|recrawl-)/;

describe("indexing URL lists", () => {
  it("never submits an English slug that the proxy rewrites to a localised one", () => {
    const offenders: string[] = [];

    for (const file of listFiles()) {
      if (HISTORICAL.test(file)) continue;
      for (const url of urlsIn(file)) {
        const parts = url.replace(SITE, "").replace(/^\//, "").split("/");
        if (parts.length < 3) continue;
        const [loc, section, slug] = parts;
        if (!(loc in rewritten)) continue;
        if (section !== "blog" && section !== "tours") continue;
        if (rewritten[loc].has(slug)) {
          offenders.push(`${file}: /${loc}/${section}/${slug}`);
        }
      }
    }

    expect(
      offenders,
      `These URLs are rewritten by proxy.ts, so Google crawls a page whose\n` +
        `canonical points elsewhere. Submit the localised slug instead:\n  ` +
        offenders.join("\n  ")
    ).toEqual([]);
  });

  it("has no duplicate URLs inside a single list", () => {
    const offenders: string[] = [];
    for (const file of listFiles()) {
      const urls = urlsIn(file);
      const seen = new Set<string>();
      const dupes = new Set<string>();
      for (const u of urls) {
        if (seen.has(u)) dupes.add(u);
        seen.add(u);
      }
      for (const d of dupes) offenders.push(`${file}: ${d}`);
    }
    expect(offenders, `Duplicate URLs waste quota:\n  ${offenders.join("\n  ")}`).toEqual(
      []
    );
  });

  it("only submits the canonical apex host, never www", () => {
    const offenders: string[] = [];
    for (const file of listFiles()) {
      for (const url of urlsIn(file)) {
        if (url.startsWith("https://www.")) offenders.push(`${file}: ${url}`);
      }
    }
    expect(
      offenders,
      `www redirects 308 to the apex, so submitting it wastes a request:\n  ` +
        offenders.join("\n  ")
    ).toEqual([]);
  });
});
