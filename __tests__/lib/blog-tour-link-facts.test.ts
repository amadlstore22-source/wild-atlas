import { describe, it, expect } from "vitest";
import { blogPostsFor } from "@/lib/blog-i18n";
import { toursFor } from "@/lib/tours-i18n";
import { TOURS } from "@/lib/tours";

/**
 * A blog link that sells a tour must describe the tour it links to.
 *
 * Found 2026-10-01 while answering "Is Agadir in the Sahara?" (position 12 in
 * Search Console): "Sahara from Agadir" — the page Google sends Agadir
 * desert searches to — said "[Two days to Zagora](/en/tours/sahara-2day-agadir)
 * ... smaller dunes than Erg Chebbi", in all six languages. The tour actually
 * goes Agadir -> Tata -> Foum Zguid -> Erg Chegaga, which its own page calls
 * the largest, most remote dune field in Morocco. So the article undersold the
 * product and promised a destination it does not visit, to exactly the
 * readers about to book. Nothing checked prose against the tour it links.
 *
 * Two checks, every post in every locale:
 *  1. A link whose label names a desert destination goes to a tour whose own
 *     title, description or itinerary names that destination.
 *  2. "from €N per person for two" beside a tour link equals that tour's
 *     two-person tier (groupPricing minPeople 2, in EUR).
 *
 * Fix a failure by correcting the prose to match the tour (lib/tours*.ts is
 * what is sold), not by editing the tour to match a sentence.
 */

const LOCALES = ["en", "fr", "es", "de", "it", "ar"] as const;

// Destination names as they are written in each script.
const PLACES: Record<string, RegExp> = {
  Zagora: /zagora|زاكورة/i,
  Merzouga: /merzouga|مرزوكة/i,
  "Erg Chebbi": /erg[\s-]?chebbi|الشبي/i,
  "Erg Chegaga": /erg[\s-]?ch[ei]g(a|u)ga|شغاغة/i,
};

const LINK = /\[([^\]]+)\]\(\/(?:en|fr|es|de|it|ar)\/tours\/([a-z0-9-]+)\)/g;

// The tour's own words in the post's locale AND in English: translated tours
// spell places their own way (Arabic has more than one spelling of Zagora), and
// the English record is the reference that always uses the Latin names.
function tourText(lang: (typeof LOCALES)[number], slug: string): string | null {
  const t = toursFor(lang).find((x) => x.slug === slug || x.localizedSlug === slug);
  if (!t) return null;
  const en = TOURS.find((x) => x.slug === t.slug);
  return [t, en].filter(Boolean).flatMap((x) => [x!.title, x!.shortDescription, x!.description, ...(x!.itinerary ?? []).map((d) => `${d.title} ${d.description}`)]).join(" ");
}

function texts(lang: (typeof LOCALES)[number]) {
  return blogPostsFor(lang).flatMap((p) => [
    { where: `${lang}/${p.slug} (content)`, text: p.content },
    ...(p.faq ?? []).map((f, i) => ({ where: `${lang}/${p.slug} (faq ${i + 1})`, text: f.a })),
  ]);
}

describe("blog links describe the tour they link to", () => {
  it("a destination named in a link label is on that tour's route", () => {
    const failures: string[] = [];
    for (const lang of LOCALES) {
      for (const { where, text } of texts(lang)) {
        for (const [, label, slug] of text.matchAll(LINK)) {
          const named = Object.entries(PLACES).filter(([, re]) => re.test(label));
          if (!named.length) continue;
          const tour = tourText(lang, slug);
          if (!tour) continue; // unknown slugs are internal-links.test.ts's job
          for (const [place, re] of named) {
            if (!re.test(tour)) failures.push(`${where}: "[${label}]" -> ${slug}, which never goes to ${place}`);
          }
        }
      }
    }
    expect(failures, `Link labels promise a destination the tour does not visit. Reword the label to the tour's real destination (see its itinerary in lib/tours*.ts):\n  ${failures.join("\n  ")}`).toEqual([]);
  });

  it("'from €N per person for two' matches the linked tour's two-person price", () => {
    const failures: string[] = [];
    const PRICE = /\[[^\]]+\]\(\/en\/tours\/([a-z0-9-]+)\)[^.[\]]{0,40}?from €([\d,]+) per person for two/g;
    for (const { where, text } of texts("en")) {
      for (const [, slug, shown] of text.matchAll(PRICE)) {
        const tour = TOURS.find((t) => t.slug === slug);
        const two = tour?.groupPricing?.find((g) => g.minPeople === 2)?.price;
        if (two == null) continue;
        if (Number(shown.replace(/,/g, "")) !== two) failures.push(`${where}: ${slug} shown €${shown}, tour's two-person price is €${two}`);
      }
    }
    expect(failures, `Update the prose to the tour's groupPricing (minPeople: 2):\n  ${failures.join("\n  ")}`).toEqual([]);
  });
});
