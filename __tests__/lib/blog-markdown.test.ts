import { describe, expect, it } from "vitest";
import { foldWrappedLines } from "@/lib/blog-markdown";

/**
 * Found on the live site 2026-10-03: posts are hard-wrapped at ~90 columns and
 * the blog renderer turned EVERY line into its own <p>. "That difference is"
 * closed one paragraph and "the entire reason one trip fits…" opened the next,
 * on 300+ posts in six languages. A bullet's wrapped second line also closed
 * the <ul>. Build and typecheck pass on this; only reading the page shows it.
 */
describe("foldWrappedLines", () => {
  it("joins a hard-wrapped paragraph into one line", () => {
    expect(
      foldWrappedLines("Distance. Zagora is 360 km; Merzouga is 560 km. That difference is\nthe entire reason one trip fits in two days.")
    ).toEqual(["Distance. Zagora is 360 km; Merzouga is 560 km. That difference is the entire reason one trip fits in two days."]);
  });

  it("keeps a blank line as a paragraph break", () => {
    expect(foldWrappedLines("First para.\n\nSecond para.")).toEqual(["First para.", "", "Second para."]);
  });

  it("folds an indented continuation into its bullet", () => {
    expect(foldWrappedLines("- **Grand taxi**: roughly 400-700 MAD return,\n  with the driver waiting.\n- **Hire car**: paved road.")).toEqual([
      "- **Grand taxi**: roughly 400-700 MAD return, with the driver waiting.",
      "- **Hire car**: paved road.",
    ]);
  });

  it("never merges headings, tables or numbered items", () => {
    const src = "## Heading\nText under it\n| a | b |\n|---|---|\n1. one\n2. two";
    expect(foldWrappedLines(src)).toEqual(["## Heading", "Text under it", "| a | b |", "|---|---|", "1. one", "2. two"]);
  });

  it("keeps bold pseudo-list lines apart after a finished sentence", () => {
    expect(foldWrappedLines("**Mountains**: Cold, snow above 2,000 m.\n**Marrakech city**: Cool and pleasant.")).toEqual([
      "**Mountains**: Cold, snow above 2,000 m.",
      "**Marrakech city**: Cool and pleasant.",
    ]);
  });

  it("still joins a sentence that wraps onto a bold phrase", () => {
    expect(foldWrappedLines("A realistic all-in total for two is\n**2,400-3,600 MAD**.")).toEqual([
      "A realistic all-in total for two is **2,400-3,600 MAD**.",
    ]);
  });
});
