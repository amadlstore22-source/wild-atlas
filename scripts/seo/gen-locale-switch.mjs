/**
 * Regenerate lib/locale-switch.ts from proxy.ts.
 *
 * locale-switch.ts holds the INVERSE of proxy.ts's slug maps (localised ->
 * English) so the header's language switcher can translate a URL instead of
 * swapping only the /xx/ prefix. Swapping the prefix alone sent every
 * localised page to a hard 404 -- see the docblock in lib/locale-switch.ts.
 *
 * The file said "Generated; see scripts" but no generator existed, so adding
 * three posts left it stale and two suites failed. This is that generator.
 *
 *   node scripts/seo/gen-locale-switch.mjs
 *
 * __tests__/lib/locale-switch.test.ts asserts the output matches proxy.ts, so
 * forgetting to run this fails the build rather than shipping 404s.
 */
import { readFileSync, writeFileSync } from "node:fs";

const proxy = readFileSync("proxy.ts", "utf8");
const LOCALES = ["fr", "es", "de", "it"];

/** Pull one `const NAME: Record<string,string> = { ... }` map out of proxy.ts. */
function readMap(name) {
  const at = proxy.indexOf(`const ${name}`);
  if (at < 0) throw new Error(`missing map ${name} in proxy.ts`);
  const body = proxy.slice(at, proxy.indexOf("\n};", at));
  const out = {};
  for (const m of body.matchAll(/"([^"]+)":\s*"([^"]+)"/g)) out[m[1]] = m[2];
  return out;
}

function invert(map) {
  const out = {};
  for (const [en, local] of Object.entries(map)) out[local] = en;
  return out;
}

function render(title, byLocale) {
  let s = `const ${title}: Record<string, Record<string, string>> = {\n`;
  for (const loc of LOCALES) {
    s += `  ${loc}: {\n`;
    for (const [k, v] of Object.entries(byLocale[loc])) {
      s += `    ${JSON.stringify(k)}: ${JSON.stringify(v)},\n`;
    }
    s += `  },\n`;
  }
  return s + `};\n`;
}

const blogToEn = {}, blogToLocal = {}, tourToEn = {}, tourToLocal = {};
for (const loc of LOCALES) {
  const blog = readMap(`BLOG_SLUGS_${loc.toUpperCase()}`);
  const tour = readMap(`TOUR_SLUGS_${loc.toUpperCase()}`);
  blogToEn[loc] = invert(blog);
  blogToLocal[loc] = blog;
  tourToEn[loc] = invert(tour);
  tourToLocal[loc] = tour;
}

const src = readFileSync("lib/locale-switch.ts", "utf8");

// Replace each generated map in place, leaving the hand-written docblock and
// translatePath() untouched.
function swap(text, name, rendered) {
  const start = text.indexOf(`const ${name}`);
  if (start < 0) throw new Error(`missing ${name} in lib/locale-switch.ts`);
  const end = text.indexOf("\n};", start) + 3;
  return text.slice(0, start) + rendered.trimEnd() + text.slice(end);
}

// Only the two *_TO_EN maps are literals. BLOG_TO_LOCAL and TOUR_TO_LOCAL are
// derived at runtime by invertAll(), so rewriting them here would replace a
// one-line derivation with a duplicate literal — and an earlier version of
// this script did exactly that, producing a syntactically broken file.
let out = src;
out = swap(out, "BLOG_TO_EN", render("BLOG_TO_EN", blogToEn));
out = swap(out, "TOUR_TO_EN", render("TOUR_TO_EN", tourToEn));

writeFileSync("lib/locale-switch.ts", out, "utf8");

const n = LOCALES.reduce((a, l) => a + Object.keys(blogToEn[l]).length, 0);
const t = LOCALES.reduce((a, l) => a + Object.keys(tourToEn[l]).length, 0);
console.log(`regenerated lib/locale-switch.ts — ${n} blog, ${t} tour mappings`);
