import { describe, expect, it } from "vitest";
import { splitMarkdownLinks, stripMarkdownLinks } from "@/lib/localize-href";
import { buildFaqSchema } from "@/lib/seo/schema";

/**
 * FAQ answers are authored with markdown links — "[Merzouga vs Zagora](/en/blog/…)"
 * — but <FaqSection> printed `item.a` as plain text. Until 2026-10-03, 357 blog
 * answers and 49 tour answers showed readers the raw brackets and URL, and the
 * links in them never existed as links. The same raw syntax went into FAQPage
 * JSON-LD. Typecheck and build both pass on this: it is valid text.
 */
describe("FAQ answers render their markdown links", () => {
  it("turns [label](/path) into a link segment and keeps the surrounding text", () => {
    const segs = splitMarkdownLinks("See [Merzouga vs Zagora](/en/blog/merzouga-vs-zagora-which-desert-tour) first.");
    expect(segs).toEqual([
      { text: "See " },
      { text: "Merzouga vs Zagora", href: "/en/blog/merzouga-vs-zagora-which-desert-tour" },
      { text: " first." },
    ]);
  });

  it("points an English tour slug in a French answer at the French URL", () => {
    const [, link] = splitMarkdownLinks("Voir [le trek](/fr/tours/toubkal-summit-trek-4day).");
    expect(link.href).toBe("/fr/tours/trek-sommet-toubkal-4-jours");
  });

  it("rejects protocol-relative links", () => {
    expect(splitMarkdownLinks("[x](//evil.example.com)")).toEqual([{ text: "[x](//evil.example.com)" }]);
  });

  it("keeps link syntax out of FAQPage JSON-LD", () => {
    const schema = buildFaqSchema([{ q: "Q?", a: "Read [the guide](/en/blog/x) now." }]);
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe("Read the guide now.");
    expect(stripMarkdownLinks("no links here")).toBe("no links here");
  });
});
