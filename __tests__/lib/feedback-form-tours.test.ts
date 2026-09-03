import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { TOURS } from "@/lib/tours";

/**
 * THE FEEDBACK FORM HAS THE CATALOGUE BAKED IN, AND GOES STALE IN SILENCE.
 *
 * docs/apps-script-feedback-form.gs builds the post-tour form. Apps Script runs
 * on Google's servers and cannot read lib/tours.ts, so the 48 tours are copied
 * into it as a literal by scripts/build-feedback-form.mjs.
 *
 * That copy is the problem. Add a tour to the site and the form does not know:
 * the new tour gets no prefilled link, appears in no picker, and the first sign
 * of trouble is a client saying they could not find their trip — or worse,
 * quietly picking the wrong one, which corrupts the supplier averages the form
 * exists to produce.
 *
 * Renaming a tour is the subtler version. The picker shows a title nobody
 * recognises, while the stored slug still ties old responses to the right tour.
 *
 * IF THIS FAILS: run `node scripts/build-feedback-form.mjs`, then re-run
 * createForm() in the Apps Script editor so the live form matches. Editing the
 * .gs file by hand puts it straight back out of step with lib/tours.ts.
 */

const GS = path.join(process.cwd(), "docs", "apps-script-feedback-form.gs");

/** Pull the generated literal out of the script without executing it. */
function toursInScript() {
  const src = fs.readFileSync(GS, "utf8");
  const start = src.indexOf("var TOURS = [");
  const end = src.indexOf("];", start);
  expect(start, "TOURS block missing from the Apps Script file").toBeGreaterThan(-1);

  const body = src.slice(start, end);
  const out: { slug: string; title: string; cat: string; days: number }[] = [];
  const re = /\{ slug: "([^"]+)", title: "([^"]+)", cat: "([^"]+)", origin: "([^"]+)", days: (\d+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) {
    out.push({ slug: m[1], title: m[2], cat: m[3], days: Number(m[5]) });
  }
  return out;
}

describe("feedback form script copies", () => {
  /**
   * THE SCRIPT EXISTS TWICE, AND THE WRONG COPY IS EASY TO PASTE.
   *
   * .gs is Apps Script's own extension, but no editor opens it on click, so a
   * .js twin exists purely to be readable. Both are written by
   * scripts/build-feedback-form.mjs on every run.
   *
   * The failure mode is quiet and expensive: someone edits one file, opens the
   * other, and pastes a version of the script that does not match the tests —
   * building a form with a stale tour list and no sign anything is wrong.
   *
   * IF THIS FAILS: run `node scripts/build-feedback-form.mjs`. Never edit
   * either file by hand.
   */
  it("keeps the .gs and .js copies byte-identical", () => {
    const gs = fs.readFileSync(GS, "utf8");
    const js = fs.readFileSync(
      path.join(process.cwd(), "docs", "apps-script-feedback-form.js"),
      "utf8",
    );
    expect(
      js === gs,
      `docs/apps-script-feedback-form.js has drifted from the .gs original
` +
        `(${js.length} bytes vs ${gs.length}). Whichever you paste into Apps
` +
        `Script, one of them is stale.

` +
        `Run: node scripts/build-feedback-form.mjs`,
    ).toBe(true);
  });
});

describe("feedback form tour list", () => {
  it("offers every tour on the site", () => {
    const inScript = new Set(toursInScript().map((t) => t.slug));
    const missing = TOURS.filter((t) => !inScript.has(t.slug)).map((t) => t.slug);

    expect(
      missing,
      missing.length === 0
        ? ""
        : `These tours exist on the site but not in the feedback form, so a\n` +
            `client who took one has no link and cannot find it in the picker:\n  ` +
            missing.join("\n  ") +
            `\n\nRun: node scripts/build-feedback-form.mjs\n` +
            `Then re-run createForm() in the Apps Script editor.`,
    ).toEqual([]);
  });

  it("offers no tour that has been removed from the site", () => {
    const live = new Set(TOURS.map((t) => t.slug));
    const stale = toursInScript()
      .map((t) => t.slug)
      .filter((s) => !live.has(s));

    expect(
      stale,
      stale.length === 0
        ? ""
        : `The feedback form still offers tours that no longer exist:\n  ` +
            stale.join("\n  ") +
            `\n\nRun: node scripts/build-feedback-form.mjs`,
    ).toEqual([]);
  });

  it("shows the same titles the site shows", () => {
    // The picker is the fallback path, so its labels have to be the words a
    // client recognises from the page they booked on.
    const bySlug = new Map(TOURS.map((t) => [t.slug, t.title]));
    const drift = toursInScript()
      .filter((t) => bySlug.has(t.slug) && bySlug.get(t.slug) !== t.title)
      .map((t) => `${t.slug}\n      form: ${t.title}\n      site: ${bySlug.get(t.slug)}`);

    expect(
      drift,
      drift.length === 0
        ? ""
        : `Tour titles have drifted between the site and the feedback form:\n  ` +
            drift.join("\n  ") +
            `\n\nRun: node scripts/build-feedback-form.mjs`,
    ).toEqual([]);
  });

  it("puts every tour in a bucket the branching can reach", () => {
    // The picker routes on category + days + origin. A tour whose category is
    // not one of the four the form asks about is unreachable: it would sit on
    // a page no answer leads to.
    const ASKED = new Set(["desert", "trekking", "cultural", "day-tours"]);
    const unreachable = toursInScript()
      .filter((t) => !ASKED.has(t.cat) || !t.days)
      .map((t) => `${t.slug} (cat "${t.cat}", days ${t.days})`);

    expect(
      unreachable,
      unreachable.length === 0
        ? ""
        : `These tours sit on a page the picker cannot route to:\n  ` +
            unreachable.join("\n  ") +
            `\n\nEither map the category into one of the four the form asks\n` +
            `about (see build-feedback-form.mjs, which folds "hiking" into\n` +
            `"trekking"), or add a new branch in CATEGORY_LABELS.`,
    ).toEqual([]);
  });
});
