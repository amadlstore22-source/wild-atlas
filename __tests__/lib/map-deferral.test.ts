import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * THE MAP BUNDLE DOWNLOADED ON PAGE LOAD, ON EVERY TOUR PAGE
 *
 * `dynamic(() => import(...), { ssr: false })` defers the SERVER render. It
 * does NOT defer the download: the chunk is requested as soon as the page
 * hydrates. components/map/MapWrapper.tsx learned this on the homepage and
 * records it in its own docblock — "Leaflet's bundle AND the ArcGIS satellite
 * tiles began downloading during initial page load — competing with the hero
 * image for bandwidth".
 *
 * TourLocationMap.tsx was left behind. It had the `dynamic(ssr:false)` half and
 * not the IntersectionObserver half, so all 47 tours x 6 locales downloaded
 * MapLibre GL during initial load — 253 KB transferred, 974 KB unminified, the
 * single largest resource on the page — for a map that sits below the
 * itinerary and the booking sidebar.
 *
 * Measured on the built page (390x844, 4x CPU, Slow 4G, cold cache):
 *
 *     script bytes  582 KB -> 346 KB   (-236 KB)
 *     total bytes  1515 KB -> 1035 KB
 *     requests         80  ->  62
 *
 * Nothing catches this. Both files typecheck, both build, both render a
 * working map, and both look correct in review — the difference is only
 * visible in a network waterfall on a throttled connection.
 *
 * The rule this encodes: a component that dynamically imports a heavy map must
 * ALSO gate the mount behind an IntersectionObserver, or the deferral saves
 * nothing on first load. Asserted across every map wrapper, not just the two
 * that exist today.
 */

const MAP_DIR = join(__dirname, "..", "..", "components", "map");

/** Wrapper = a file that dynamically imports another module with ssr:false. */
function mapWrappers() {
  return readdirSync(MAP_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => ({ file: f, src: readFileSync(join(MAP_DIR, f), "utf-8") }))
    .filter(({ src }) => /dynamic\(/.test(src) && /ssr:\s*false/.test(src));
}

describe("map bundle deferral", () => {
  it("every dynamically imported map is also gated behind an IntersectionObserver", () => {
    const ungated = mapWrappers()
      .filter(({ src }) => !src.includes("IntersectionObserver"))
      .map(({ file }) => file);

    expect(
      ungated,
      `These map wrappers use dynamic(ssr:false) WITHOUT an IntersectionObserver\n` +
        `gate. That combination defers the server render but not the download —\n` +
        `the map chunk (MapLibre GL: 253 KB transferred, 974 KB unminified) is\n` +
        `still requested the moment the page hydrates, competing with the hero\n` +
        `image for bandwidth on a page where the map is below the fold.\n\n` +
        `Copy the pattern from MapWrapper.tsx: hold a ref, observe it with\n` +
        `rootMargin "400px", and render the skeleton until it intersects:\n  ` +
        ungated.join("\n  "),
    ).toEqual([]);
  });

  it("every gated map still renders a sized skeleton while it waits", () => {
    // The gate must not collapse the layout, or deferring the map trades a
    // bandwidth win for a CLS regression — and CLS is currently 0 sitewide.
    const noSkeleton = mapWrappers()
      .filter(({ src }) => src.includes("IntersectionObserver"))
      .filter(({ src }) => !/(h-\[\d+px\]|height:)/.test(src))
      .map(({ file }) => file);

    expect(
      noSkeleton,
      `These map wrappers defer the map but do not reserve its height, so the\n` +
        `page will jump when the map mounts. Measured CLS is currently 0 on\n` +
        `every page; keep it there by giving the placeholder the same height as\n` +
        `the real map:\n  ` + noSkeleton.join("\n  "),
    ).toEqual([]);
  });

  it("the tile preconnects stay outside the visibility gate", () => {
    // Opening the socket early is the entire value of the hint — it is worth
    // ~300 ms of mobile LCP per the comment in TourLocationMap. If the
    // preconnects move inside the `visible ?` branch they only fire once the
    // map is already mounting, which is exactly too late to help.
    const src = readFileSync(join(MAP_DIR, "TourLocationMap.tsx"), "utf-8");
    const gateAt = src.indexOf("visible ?");
    const preconnectAt = src.indexOf('rel="preconnect"');

    expect(
      preconnectAt !== -1 && gateAt !== -1 && preconnectAt < gateAt,
      "The tile preconnect hints have moved inside (or after) the visibility\n" +
        "gate. They must render unconditionally: the point is to open the TLS\n" +
        "connection to the tile hosts BEFORE the deferred bundle asks for a\n" +
        "tile. Inside the gate they fire only once the map is already mounting.",
    ).toBe(true);
  });
});
