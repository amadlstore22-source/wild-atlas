/**
 * Cross-check every price a blog post quotes for a tour against that tour's
 * actual price.
 *
 * Blog copy names tours by their URL — [3-day Sahara tour](/en/tours/sahara-3day-marrakech)
 * — and then quotes a euro figure nearby. When a tour is repriced, those figures
 * silently rot: the tour page says one thing and six locales of blog say another,
 * and nothing fails. This finds them.
 *
 * Prices are stored in USD and displayed in EUR (see lib/currency-core.ts), so
 * every stored tier is converted before comparison.
 *
 * Run:  npx tsx scripts/seo/audit-blog-tour-prices.ts
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { TOURS, type Tour } from "../../lib/tours";
import { RATES } from "../../lib/currency-core";

const EUR = RATES.EUR;
const eur = (usd: number) => Math.round(usd * EUR);

/** Every euro figure a tour can legitimately be quoted at. */
function legitimateFigures(tour: Tour): Set<number> {
  const out = new Set<number>();
  const tiers = tour.groupPricing ?? [{ minPeople: 1, price: tour.price }];
  for (const t of tiers) {
    out.add(eur(t.price));
    // Totals are quoted too ("€980 for two").
    out.add(eur(t.price) * t.minPeople);
  }
  out.add(eur(tour.price));
  if (tour.priceMax) out.add(eur(tour.priceMax));
  if (tour.depositAmount) out.add(eur(tour.depositAmount));
  return out;
}

const bySlug = new Map<string, Tour>();
for (const t of TOURS) bySlug.set(t.slug, t);

const blogDir = join(process.cwd(), "lib");
const blogFiles = readdirSync(blogDir).filter(
  (f) => /^blog(\.[a-z]{2})?(\.part\d)?\.ts$/.test(f)
);

// A euro amount: 1.066, 1,066, 1066, 490 — with either separator, or none.
const MONEY = /(?:€\s?|EUR\s?)(\d{1,3}(?:[.,  ]\d{3})*|\d+)|(\d{1,3}(?:[.,  ]\d{3})*|\d+)\s?(?:€|EUR|يورو)/g;
const TOUR_LINK = /\/(?:en|fr|es|de|it|ar)\/tours\/([a-z0-9-]+)/g;

type Hit = { file: string; line: number; slug: string; amount: number; text: string };
const suspect: Hit[] = [];

for (const file of blogFiles) {
  const lines = readFileSync(join(blogDir, file), "utf8").split("\n");
  lines.forEach((line, i) => {
    const slugs = [...line.matchAll(TOUR_LINK)].map((m) => m[1]);
    if (!slugs.length) return;

    const amounts: number[] = [];
    for (const m of line.matchAll(MONEY)) {
      const raw = (m[1] ?? m[2] ?? "").replace(/[.,  ]/g, "");
      const n = Number(raw);
      // Below 50 is almost always a percentage, a MAD figure or a year.
      if (Number.isFinite(n) && n >= 50) amounts.push(n);
    }
    if (!amounts.length) return;

    for (const slug of new Set(slugs)) {
      const tour = bySlug.get(slug);
      if (!tour) continue;
      const ok = legitimateFigures(tour);
      for (const a of amounts) {
        // Tolerate +/-2 EUR: published copy sometimes rounds.
        const near = [...ok].some((v) => Math.abs(v - a) <= 2);
        if (!near) {
          suspect.push({ file, line: i + 1, slug, amount: a, text: line.trim().slice(0, 110) });
        }
      }
    }
  });
}

if (!suspect.length) {
  console.log("No blog price contradicts a tour price.");
  process.exit(0);
}

const byTour = new Map<string, Hit[]>();
for (const h of suspect) {
  if (!byTour.has(h.slug)) byTour.set(h.slug, []);
  byTour.get(h.slug)!.push(h);
}

console.log(`${suspect.length} blog figure(s) do not match any price of the tour they link to.\n`);
for (const [slug, hits] of [...byTour.entries()].sort((a, b) => b[1].length - a[1].length)) {
  const tour = bySlug.get(slug);
  // Every hit was built from a slug that resolved above, so this cannot miss —
  // but the map lookup is still Tour | undefined and skipping is safer than a
  // non-null assertion that would crash the audit if the invariant ever broke.
  if (!tour) continue;
  const tiers = (tour.groupPricing ?? [])
    .map((t) => `${t.minPeople}:${eur(t.price)}`)
    .join("  ");
  console.log(`\n=== ${slug} ===`);
  console.log(`   actual EUR tiers -> ${tiers || eur(tour.price)}`);
  for (const h of hits) {
    console.log(`   ${h.file}:${h.line}  quotes EUR ${h.amount}`);
    console.log(`      ${h.text}`);
  }
}
console.log(`\n${suspect.length} total. Amounts under EUR 50 are ignored (percentages, MAD, years).`);
console.log("Some hits are legitimate — competitor prices, market ranges, other tours' figures.");
console.log("Read each before changing it.");
