import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SITE, TRIPADVISOR } from "@/lib/constants";

/**
 * THE TRIPADVISOR LISTING NAME IS A DISCLOSURE, NOT A LABEL
 *
 * Every rating on this site — the hero, the trust bar, the footer, every
 * booking sidebar, and the `aggregateRating` in the homepage LocalBusiness
 * schema — comes from ONE TripAdvisor listing. Until Aug 2026 that listing
 * traded as "Morocco Tours With Locals" while the site called itself Marrakech
 * Eco Tours, so TripAdvisorBadge printed an "as <listing name>" line. That line
 * was the honest part: quoting 5.0 from 122 reviews earned under a different
 * name, without saying so, is how real social proof starts looking borrowed.
 *
 * It also mattered for structured data. The homepage emits
 * `LocalBusiness { name: "Marrakech Eco Tours", aggregateRating: ... }`, and
 * Google's review-snippet policy expects the reviewed entity to be the one
 * named. A rating collected under a different trading name is exactly the
 * mismatch that policy targets — the same reasoning that keeps aggregateRating
 * OFF the individual tour pages, where no per-tour review corpus exists.
 *
 * The owner renamed the listing to match the brand, so the disclosure is now
 * redundant ("Marrakech Eco Tours — as Marrakech Eco Tours"). The badge
 * therefore decides by COMPARING the two names rather than by deleting the
 * markup or flipping a flag: if either name ever changes again, the disclosure
 * returns on its own. Deleting it would have made a future divergence silent,
 * and silence is the failure mode this whole file guards against.
 *
 * None of this is caught by typecheck or build: every value is a valid string
 * and every page renders either way.
 */

const ROOT = join(__dirname, "..", "..");
const BADGE = readFileSync(join(ROOT, "components", "ui", "TripAdvisorBadge.tsx"), "utf-8");

/** The listing is identified by its numeric TripAdvisor id, not its slug. */
const LISTING_ID = "d18455591";

describe("TripAdvisor identity", () => {
  it("points at the listing the ratings actually come from", () => {
    // The slug in a TripAdvisor URL is cosmetic — the id is what resolves. If
    // the id ever changes, the rating and review count below stopped belonging
    // to the linked page.
    for (const [field, url] of [
      ["url", TRIPADVISOR.url],
      ["writeReviewUrl", TRIPADVISOR.writeReviewUrl],
    ] as const) {
      expect(
        url.includes(LISTING_ID),
        `TRIPADVISOR.${field} no longer contains the listing id ${LISTING_ID}.\n` +
          `The rating (${TRIPADVISOR.rating}) and review count ` +
          `(${TRIPADVISOR.reviewCount}) shown across the site belong to that\n` +
          `listing — pointing elsewhere makes every rating on the site unsourced.`,
      ).toBe(true);
    }
  });

  it("uses the same listing for reading and writing reviews", () => {
    const id = (u: string) => /-(d\d+)-/.exec(u)?.[1];
    expect(
      id(TRIPADVISOR.writeReviewUrl),
      "The 'write a review' link points at a different listing than the one the\n" +
        "site quotes its rating from, so reviews would land on the wrong page.",
    ).toBe(id(TRIPADVISOR.url));
  });

  it("keeps the URL slug consistent with the listing name", () => {
    // Not cosmetic: a slug naming the old brand on a page that no longer uses
    // it is the visible half of a stale rename, and it is what a reader sees in
    // the status bar before clicking.
    const slug = TRIPADVISOR.listingName.replace(/[^A-Za-z0-9]+/g, "_");
    expect(
      TRIPADVISOR.url.includes(slug),
      `TRIPADVISOR.url does not contain "${slug}", so the link slug and\n` +
        `listingName ("${TRIPADVISOR.listingName}") disagree. TripAdvisor\n` +
        `resolves on the id so the link still works, but the URL advertises a\n` +
        `name the site no longer uses.`,
    ).toBe(true);
  });

  it("shows the 'as <listing>' disclosure only when the names differ", () => {
    // The rule, not the current answer: today the names match and the line is
    // hidden. Both halves must stay conditional so a future divergence
    // re-enables it without anyone remembering to.
    expect(
      BADGE.includes("showListingName"),
      "TripAdvisorBadge no longer decides the disclosure by comparison. If the\n" +
        "line was deleted outright, a future rename of either the site or the\n" +
        "listing would quietly quote a rating earned under another name with no\n" +
        "disclosure at all.",
    ).toBe(true);

    expect(
      /listingName[\s\S]{0,120}SITE\.name|SITE\.name[\s\S]{0,120}listingName/.test(BADGE),
      "TripAdvisorBadge does not compare TRIPADVISOR.listingName against\n" +
        "SITE.name. That comparison is what makes the disclosure self-managing.",
    ).toBe(true);

    // Every rendered occurrence must be behind the gate, not just the first.
    const rendered = [...BADGE.matchAll(/as \{TRIPADVISOR\.listingName\}/g)].length;
    const gated = [...BADGE.matchAll(/showListingName \? \(/g)].length;
    expect(
      gated,
      `TripAdvisorBadge renders the listing name ${rendered} time(s) but only\n` +
        `${gated} are behind the showListingName gate, so one variant still\n` +
        `prints "as Marrakech Eco Tours" under the same brand name.`,
    ).toBe(rendered);
  });

  it("matches the name the homepage schema attaches the rating to", () => {
    // The homepage emits LocalBusiness { name, aggregateRating } using this
    // listing's numbers. Google's review-snippet policy expects the reviewed
    // entity to be the one named — the same reasoning that keeps
    // aggregateRating off tour pages, which have no review corpus of their own.
    const home = readFileSync(join(ROOT, "app", "[lang]", "page.tsx"), "utf-8");
    if (!home.includes("aggregateRating")) return;

    expect(
      TRIPADVISOR.listingName.trim().toLowerCase(),
      "The homepage attaches an aggregateRating to a LocalBusiness named\n" +
        `"${SITE.name}", but the reviews come from a listing trading as\n` +
        `"${TRIPADVISOR.listingName}". That is the entity mismatch Google's\n` +
        "review-snippet policy targets. Either rename the listing, or make the\n" +
        "difference explicit on the page — do not let it be silent.",
    ).toBe(SITE.name.trim().toLowerCase());
  });

  it("still states a real, sourced rating rather than a rounded boast", () => {
    expect(TRIPADVISOR.rating).toBeGreaterThan(0);
    expect(TRIPADVISOR.rating).toBeLessThanOrEqual(5);
    expect(
      TRIPADVISOR.reviewCount,
      "reviewCount is zero or missing, but the site renders it beside a star\n" +
        "rating in the hero, footer and every booking sidebar.",
    ).toBeGreaterThan(0);
  });
});
