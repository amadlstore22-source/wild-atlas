import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Every WhatsApp CTA must report a conversion, because WhatsApp is where a
 * large share of enquiries actually happen and the click is the only signal
 * the site ever gets — once the visitor leaves for WhatsApp there is no
 * referrer, no form submission, and no row in the enquiry sheet. An untracked
 * CTA is an enquiry that, as far as Analytics and Google Ads are concerned,
 * never happened. Ads then optimises bidding against incomplete conversion
 * data, spending on clicks it believes do not convert.
 *
 * THIS HAS NOW BITTEN TWICE. ContactLinks.tsx was created precisely to fix it
 * the first time -- its own docblock records "8 CTAs in total" that were
 * missing tracking -- and by 2026-09-08 the CTA on /how-we-operate had
 * regressed to a plain <a>, because a new page is written by copying the
 * markup of an old one and nothing checked.
 *
 * Nothing else catches this. A plain <a href="https://wa.me/..."> is valid
 * TSX, renders correctly, is visually identical to the tracked component, and
 * works perfectly for the customer. Only the absence of an event in GA4 --
 * which nobody looks at per-CTA -- would ever reveal it.
 *
 * The rule: a wa.me href must sit on <WhatsAppLink> (which tracks by default)
 * or on an element whose own onClick calls trackConversion. Catalogue-wide
 * over every component and route, deliberately: both occurrences were on pages
 * nobody was editing at the time.
 */

const ROOTS = ["components", "app"];

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (p.endsWith(".tsx") || p.endsWith(".ts")) out.push(p);
  }
  return out;
}

/** A wa.me href, whether written literally or built by whatsappUrl(). */
const HREF = /href=\{?[`"']?[^`"'\n]*wa\.me|href=\{whatsappUrl/g;

/** How far past the href to look for the element's own onClick. Generous:
 *  className and framer-motion props often sit between the two. */
const ELEMENT_SCAN = 900;

describe("WhatsApp CTAs report a conversion", () => {
  const files = ROOTS.flatMap((r) => walk(join(__dirname, "..", "..", r)));

  it("finds the WhatsApp CTAs", () => {
    const total = files.reduce(
      (n, f) => n + (readFileSync(f, "utf-8").match(HREF)?.length ?? 0),
      0,
    );
    // If this drops to zero the regex has stopped matching and the suite below
    // would pass vacuously.
    expect(total).toBeGreaterThan(5);
  });

  it("no WhatsApp CTA is an untracked plain link", () => {
    const untracked: string[] = [];

    for (const file of files) {
      const src = readFileSync(file, "utf-8");
      for (const m of src.matchAll(HREF)) {
        const tagStart = src.lastIndexOf("<", m.index!);
        const tagName = /^<([A-Za-z][\w.]*)/.exec(src.slice(tagStart, tagStart + 40))?.[1];

        // <WhatsAppLink> tracks by default -- that is the whole point of it.
        if (tagName === "WhatsAppLink") continue;

        // A plain <a> (or motion <m.a>) is fine only if it tracks itself.
        const element = src.slice(tagStart, tagStart + ELEMENT_SCAN);
        if (/trackConversion\(\s*["']whatsapp["']\s*\)/.test(element)) continue;

        const line = src.slice(0, m.index!).split("\n").length;
        const rel = file.slice(file.indexOf("wild-atlas") + 11).replace(/\\/g, "/");
        untracked.push(`${rel}:${line}  <${tagName ?? "?"}>`);
      }
    }

    expect(
      untracked,
      `These WhatsApp CTAs open a chat without reporting a conversion, so the\n` +
        `enquiry is invisible to GA4 and to Google Ads bidding -- and WhatsApp\n` +
        `leaves no other trace, unlike the contact form which writes a row to\n` +
        `the enquiry sheet. Use <WhatsAppLink> from components/ui/ContactLinks\n` +
        `(it tracks by default) rather than a plain <a>:\n  ` +
        untracked.join("\n  "),
    ).toEqual([]);
  });
});
