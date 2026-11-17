import path from "path";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Google tag hosts, copied from Google's own CSP guide
 * (developers.google.com/tag-platform/security/guides/csp, read 2026-11-17):
 * the "Google Analytics" table WITH advertising features, plus the "Google
 * Ads" table, which covers Conversion, Remarketing and Conversion Linker tags.
 *
 * Until 2026-11-17 the policy allowed plain GA4 only. The Google tag
 * (G-MH5VKPGR38) is linked to a Google Ads account with a "Contact Us"
 * conversion, and from launch its ping to www.google.com/measurement/conversion
 * was blocked, along with stats.g.doubleclick.net and the google.<country>
 * audience image. Nothing failed visibly: the browser drops the request and
 * logs a console error, so ads would have bid without ever seeing an enquiry.
 * The owner is planning to run ads (2026-11-17), so the full Ads set is here.
 */
// CSP cannot wildcard a top-level domain, so each country's Google domain is
// listed by name: the countries Search Console shows visitors from (90 days
// to 2026-11-14). google.com covers the USA and everyone without a local one.
const GOOGLE_COUNTRY_TLDS = [
  "co.ma", "de", "es", "fr", "co.uk", "it", "ch", "at", "be", "ca",
  "nl", "pl", "cz", "se", "dk", "ie", "no", "pt",
];
const GOOGLE_COUNTRY_HOSTS = GOOGLE_COUNTRY_TLDS.map((tld) => `https://*.google.${tld}`);
const GOOGLE_TAG = {
  script: ["https://www.googletagmanager.com", "https://www.googleadservices.com", "https://www.google.com"],
  img: [
    "https://www.googletagmanager.com", "https://*.google-analytics.com", "https://*.google.com",
    "https://*.g.doubleclick.net", "https://www.googleadservices.com", "https://pagead2.googlesyndication.com",
    ...GOOGLE_COUNTRY_HOSTS,
  ],
  connect: [
    "https://www.googletagmanager.com", "https://*.google-analytics.com", "https://*.google.com",
    "https://*.g.doubleclick.net", "https://www.googleadservices.com", "https://pagead2.googlesyndication.com",
    "https://ad.doubleclick.net", ...GOOGLE_COUNTRY_HOSTS,
  ],
  frame: ["https://www.googletagmanager.com"],
};
const hosts = (list: string[]) => list.join(" ");

const securityHeaders = [
  // HSTS: tells browsers to use HTTPS for this host for the next two years,
  // which closes the window where a first plain-HTTP request can be intercepted
  // before the redirect fires. Two years with subdomains is the preload-list
  // requirement; the site is HTTPS-only already, so nothing regresses.
  // Not set in dev, where localhost is served over plain HTTP.
  ...(isDev
    ? []
    : [{
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      }]),
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // React dev mode (Turbopack HMR) requires eval() — allow only in development.
      // Google tag (GA4 + Google Ads, see GOOGLE_TAG above); it only runs after
      // cookie consent. Microsoft Clarity: *.clarity.ms + c.bing.com, per
      // learn.microsoft.com/clarity (clarity-csp). Also loaded only after "Accept all".
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${hosts(GOOGLE_TAG.script)} https://*.clarity.ms`,
      "style-src 'self' 'unsafe-inline'",
      // blob: was added for MapLibre GL, which parsed vector tiles in Web Workers
      // created from a blob URL. MapLibre was removed on 2026-11-15. The entry
      // is kept for now: it has not been checked that Microsoft Clarity's
      // recorder runs without it, and a broken recorder fails silently.
      "worker-src 'self' blob:",
      // Google Analytics and Ads send beacons as GET images (GOOGLE_TAG.img).
      // server.arcgisonline.com serves the satellite tiles of the homepage map
      // (Leaflet, components/map/ToursMap.tsx). Removed on 2026-11-15 because
      // nothing loads them any more: PayPal images, the MapLibre tile hosts
      // (openfreemap, mapterhorn), Pexels (only the stale locale galleries used
      // it) and the three news publishers' image hosts.
      `img-src 'self' data: https://images.unsplash.com https://server.arcgisonline.com ${hosts(GOOGLE_TAG.img)} https://*.clarity.ms https://c.bing.com`,
      "font-src 'self'",
      // GA4 and Ads also send by fetch/beacon (GOOGLE_TAG.connect; the regional
      // GA endpoints and analytics.google.com fall under its wildcards).
      `connect-src 'self' https://*.clarity.ms https://c.bing.com ${hosts(GOOGLE_TAG.connect)} https://server.arcgisonline.com${isDev ? " ws://localhost:* http://localhost:*" : ""}`,
      // Only the Google tag may frame (Google's guide lists googletagmanager.com
      // for both GA4 and Ads). PayPal was listed here and in script-src, but
      // deposits are paid from a link we send, never from a PayPal button.
      `frame-src ${hosts(GOOGLE_TAG.frame)}`,
      "frame-ancestors 'none'",
      // These three do NOT inherit from default-src, so omitting them left real
      // gaps: object-src allows Flash/Java-style plugin embeds, base-uri lets an
      // injected <base> rewrite every relative URL on the page (including the
      // booking form action), and form-action controls where a form may POST.
      // Nothing here uses plugins, a <base> tag, or cross-origin form posts.
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  // No experimental.inlineCss. Tried 2026-11-10 (ee69447), removed 2026-11-15:
  // it gave no measurable LCP gain in the lab, but put ~170 KB of CSS in front
  // of every article (the imperial cities guide's text began 209 KB into a
  // 756 KB page) and copied it again into the RSC payload. Crawlers and AI
  // fetchers that read only the start of a page saw styling, not content.
  images: {
    // Serve modern formats first — AVIF then WebP — falling back to the
    // original for old browsers. Typically 30–50% smaller than JPEG at the
    // same quality, which directly improves LCP on the image-heavy tour and
    // hero pages. Next negotiates per request via the Accept header.
    formats: ["image/avif", "image/webp"],
    // Cache optimised variants for 31 days so repeat views and other users
    // skip re-optimisation (the source images are static).
    minimumCacheTTL: 60 * 60 * 24 * 31,
    // Drop the 2048 and 3840 buckets from the default list. With sizes="100vw"
    // on the heroes, those buckets make Vercel transcode a 4K variant on a cold
    // cache miss before it can respond — which real-user data showed as ~2 s
    // between TTFB (0.85 s) and FCP (2.97 s). No hero on the site renders wider
    // than 1920, so the large buckets only ever cost time.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Static photography served from /public.
        //
        // Vercel serves /public with `Cache-Control: public, max-age=0,
        // must-revalidate`, and next/image DERIVES the optimized image's
        // max-age from the upstream header: per the Next docs, "the expiration
        // of the optimized image is defined by either the minimumCacheTTL or
        // the upstream image Cache-Control header, whichever is larger", and
        // the fix is to set the header on the SOURCE asset (/some-asset.jpg),
        // never on /_next/image itself.
        //
        // So every /_next/image response was going out with max-age=0 too.
        // Measured on the live site: Vercel's own edge reported X-Vercel-Cache:
        // HIT, but the BROWSER was told to revalidate on every view — while
        // hashed JS beside it correctly gets max-age=31536000, immutable. On a
        // page carrying 33 images, a returning visitor re-requested all of them
        // on every navigation. Those are billable edge requests as well as a
        // slower repeat visit.
        //
        // NOT `immutable`: these filenames are stable, not content-hashed, and
        // gallery files have genuinely been replaced in place three times
        // (resizing passes). immutable would pin a stale photograph in every
        // visitor's browser for a year with no way to bust it. A 30-day
        // max-age with a year of stale-while-revalidate gives the same
        // practical hit rate while still letting a replaced file propagate.
        source: "/gallery/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=31536000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
