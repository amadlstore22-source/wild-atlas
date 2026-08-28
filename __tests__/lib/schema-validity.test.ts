import { describe, it, expect } from "vitest";
import { TOURS } from "@/lib/tours";
import { DESTINATIONS } from "@/lib/destinations";
import { absoluteUrl } from "@/lib/seo/schema";

/**
 * TWO STRUCTURED-DATA DEFECTS THAT SHIPPED ON ALL 47 TOURS IN 6 LANGUAGES
 *
 * Found by running the live tour page through validator.schema.org, which
 * reported both against the TouristTrip node:
 *
 *   UNKNOWN_FIELD          duration / TouristTrip
 *   TYPE_CONVERSION_FAILED duration / "4 days / 3 nights" -> Duration
 *
 * 1. `duration` IS NOT A PROPERTY OF Trip/TouristTrip.
 *    Confirmed against schema.org's own machine-readable vocabulary
 *    (schemaorg-current-https.jsonld): schema:duration has domainIncludes
 *    [Audiobook, Episode, Event, MediaObject, Movie, MusicRecording,
 *    MusicRelease, QuantitativeValueDistribution, Schedule, ServicePeriod] —
 *    no Trip. Trip defines exactly: arrivalTime, departureTime, itinerary,
 *    offers, partOfTrip, provider, subTrip, touristType, tripOrigin.
 *    Its range is also Duration (ISO 8601), so the free-text catalogue values
 *    ("4 days / 3 nights", "Half day (4 hours)") failed twice over.
 *    The fix uses `itinerary`, which Trip does define and which carries more
 *    information than the duration did.
 *
 * 2. `image` WAS A SITE-RELATIVE PATH ("/gallery/....jpg").
 *    JSON-LD has no base URL of its own, so a relative image resolves against
 *    the schema.org namespace rather than this site. Google cannot fetch it,
 *    and the image is dropped from any rich result — on a tour catalogue whose
 *    single biggest asset is first-party photography.
 *
 * Nothing in the build catches either one. Both are valid TypeScript, both
 * produce well-formed JSON, both render a perfectly normal page, and
 * `next build` has no opinion about whether a schema.org property exists. Only
 * an external validator sees it.
 *
 * These assertions are catalogue-wide on purpose: the defect was never about
 * one tour, and the next tour added is the one nobody re-validates.
 */

/** Properties schema.org actually defines on Trip / TouristTrip. */
const TRIP_PROPERTIES = new Set([
  "arrivalTime", "departureTime", "itinerary", "offers", "partOfTrip",
  "provider", "subTrip", "touristType", "tripOrigin",
  // Inherited from Thing, and legitimately used on these nodes.
  "name", "description", "image", "url", "@type", "@context", "@id",
]);

describe("structured data validity", () => {
  it("no tour or destination hero image is a relative URL", () => {
    // The rule, not the current data: any path not starting with a scheme is
    // unusable in JSON-LD.
    const relative: string[] = [];

    for (const t of TOURS) {
      if (!/^https?:\/\//i.test(absoluteUrl(t.heroImage))) relative.push(`tour ${t.slug}: ${t.heroImage}`);
      for (const g of t.gallery) {
        if (!/^https?:\/\//i.test(absoluteUrl(g))) relative.push(`tour ${t.slug} gallery: ${g}`);
      }
    }
    for (const d of DESTINATIONS) {
      if (!/^https?:\/\//i.test(absoluteUrl(d.heroImage))) relative.push(`destination ${d.slug}: ${d.heroImage}`);
    }

    expect(
      relative.slice(0, 20),
      `absoluteUrl() failed to produce an absolute URL for these images. A\n` +
        `relative path in JSON-LD resolves against the schema.org namespace,\n` +
        `not this site, so Google cannot fetch the image and drops it from the\n` +
        `rich result:\n  ` + relative.slice(0, 20).join("\n  "),
    ).toEqual([]);
  });

  it("absoluteUrl is idempotent and does not mangle remote URLs", () => {
    // The gallery is first-party today, but some nodes reference remote hosts
    // and a future edit may map this over a mixed list.
    expect(absoluteUrl("/gallery/x.jpg")).toBe("https://marrakechecotours.com/gallery/x.jpg");
    expect(absoluteUrl("gallery/x.jpg")).toBe("https://marrakechecotours.com/gallery/x.jpg");
    expect(absoluteUrl("https://images.unsplash.com/photo-1")).toBe("https://images.unsplash.com/photo-1");
    expect(absoluteUrl(absoluteUrl("/gallery/x.jpg"))).toBe("https://marrakechecotours.com/gallery/x.jpg");
  });

  it("the tour page does not emit `duration` on the TouristTrip node", () => {
    // schema.org does not define duration on Trip, and validator.schema.org
    // reports it as UNKNOWN_FIELD. Asserted against the page source because
    // the node is built inline there.
    const src = require("node:fs").readFileSync(
      require("node:path").join(__dirname, "..", "..", "app", "[lang]", "tours", "[slug]", "page.tsx"),
      "utf-8",
    ) as string;

    const trip = src.slice(src.indexOf('"@type": "TouristTrip"'), src.indexOf("const breadcrumbJsonLd"));

    expect(
      /^\s*duration:/m.test(trip),
      "The TouristTrip node emits `duration` again. schema.org does not define\n" +
        "that property on Trip (it is on Event/Movie/MediaObject and friends),\n" +
        "and its range is Duration — ISO 8601 — so a catalogue string like\n" +
        '"4 days / 3 nights" fails as both an unknown field AND a type\n' +
        "conversion. Use `itinerary`, which Trip does define.",
    ).toBe(false);

    expect(
      trip.includes("itinerary:"),
      "The TouristTrip node has lost its `itinerary`. That is the property\n" +
        "schema.org actually defines for a trip's structure, and it replaced\n" +
        "the invalid `duration`.",
    ).toBe(true);
  });

  it("every tour has itinerary days that can build a valid ItemList", () => {
    // The schema maps over tour.itinerary, so an empty one emits an ItemList
    // with zero items — worse than no property at all.
    const empty = TOURS.filter((t) => t.itinerary.length === 0).map((t) => t.slug);

    expect(
      empty,
      `These tours have no itinerary days, so the TouristTrip node would emit\n` +
        `an empty ItemList — a structural claim that the trip has no stops:\n  ` +
        empty.join("\n  "),
    ).toEqual([]);
  });

  it("itinerary stops carry real coordinates when they carry a stop at all", () => {
    // The Place nodes emit geo only when a stop exists; a stop with a
    // placeholder 0,0 would publish a location in the Gulf of Guinea.
    const bad: string[] = [];
    for (const t of TOURS) {
      for (const d of t.itinerary) {
        if (!d.stop) continue;
        const { lat, lng, name } = d.stop;
        if (!name?.trim()) bad.push(`${t.slug} day ${d.day}: stop has no name`);
        if (lat === 0 || lng === 0) bad.push(`${t.slug} day ${d.day}: placeholder 0 coordinate`);
        // Morocco's bounding box, generously drawn.
        if (lat < 20 || lat > 37 || lng < -18 || lng > -1) {
          bad.push(`${t.slug} day ${d.day} (${name}): ${lat},${lng} is outside Morocco`);
        }
      }
    }

    expect(
      bad.slice(0, 20),
      `These itinerary stops are published as schema.org GeoCoordinates, so a\n` +
        `wrong number is a wrong location claim in structured data:\n  ` +
        bad.slice(0, 20).join("\n  "),
    ).toEqual([]);
  });

  it("only properties schema.org defines on Trip appear on the TouristTrip node", () => {
    // Encodes the general rule that caught `duration`, so the next invented
    // property is caught too.
    const src = require("node:fs").readFileSync(
      require("node:path").join(__dirname, "..", "..", "app", "[lang]", "tours", "[slug]", "page.tsx"),
      "utf-8",
    ) as string;

    const trip = src.slice(src.indexOf('"@type": "TouristTrip"'), src.indexOf("const breadcrumbJsonLd"));
    // Top-level keys only: `key:` at exactly four spaces of indentation.
    const keys = [...trip.matchAll(/^ {4}(\w+):/gm)].map((m) => m[1]);
    const unknown = keys.filter((k) => !TRIP_PROPERTIES.has(k));

    expect(
      unknown,
      `These properties are emitted on the TouristTrip node but schema.org does\n` +
        `not define them on Trip. Google ignores unknown properties, and\n` +
        `validator.schema.org reports them as UNKNOWN_FIELD.\n\n` +
        `Trip defines: ${[...TRIP_PROPERTIES].filter((p) => !p.startsWith("@")).join(", ")}\n\n` +
        `Offenders:\n  ` + unknown.join("\n  "),
    ).toEqual([]);
  });
});
