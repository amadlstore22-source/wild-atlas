import path from "path";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

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
      // Google Tag Manager / gtag.js (GA4 + Google Ads conversion tracking) loads
      // from googletagmanager.com; it only runs after cookie consent.
      // Microsoft Clarity: *.clarity.ms + c.bing.com, per learn.microsoft.com/clarity
      // (clarity-csp). Also loaded only after "Accept all".
      isDev
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.clarity.ms"
        : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.clarity.ms",
      "style-src 'self' 'unsafe-inline'",
      // blob: was added for MapLibre GL, which parsed vector tiles in Web Workers
      // created from a blob URL. MapLibre was removed on 2026-11-15. The entry
      // is kept for now: it has not been checked that Microsoft Clarity's
      // recorder runs without it, and a broken recorder fails silently.
      "worker-src 'self' blob:",
      // Google Analytics sends hit beacons as GET images to these hosts.
      // server.arcgisonline.com serves the satellite tiles of the homepage map
      // (Leaflet, components/map/ToursMap.tsx). Removed on 2026-11-15 because
      // nothing loads them any more: PayPal images, the MapLibre tile hosts
      // (openfreemap, mapterhorn), Pexels (only the stale locale galleries used
      // it) and the three news publishers' image hosts.
      "img-src 'self' data: https://images.unsplash.com https://server.arcgisonline.com https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.google.co.uk https://*.clarity.ms https://c.bing.com",
      "font-src 'self'",
      // GA4/Ads use fetch/beacon to google-analytics.com & the analytics regional
      // endpoints; googletagmanager.com serves the container.
      isDev
        ? "connect-src 'self' https://*.clarity.ms https://c.bing.com https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://server.arcgisonline.com ws://localhost:* http://localhost:*"
        : "connect-src 'self' https://*.clarity.ms https://c.bing.com https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://server.arcgisonline.com",
      // No page embeds a frame. PayPal was listed here and in script-src, but
      // deposits are paid from a link we send, never from a PayPal button.
      "frame-src 'none'",
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
