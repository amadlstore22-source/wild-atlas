import path from "path";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
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
      isDev
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.paypal.com https://www.paypalobjects.com https://www.googletagmanager.com"
        : "script-src 'self' 'unsafe-inline' https://www.paypal.com https://www.paypalobjects.com https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      // Google Analytics sends hit beacons as GET images to these hosts.
      "img-src 'self' data: https://images.unsplash.com https://images.pexels.com https://www.paypalobjects.com https://server.arcgisonline.com https://i.guim.co.uk https://static01.nyt.com https://www.atlasandboots.com https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.google.co.uk",
      "font-src 'self'",
      // GA4/Ads use fetch/beacon to google-analytics.com & the analytics regional
      // endpoints; googletagmanager.com serves the container.
      isDev
        ? "connect-src 'self' https://api.resend.com https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com ws://localhost:* http://localhost:*"
        : "connect-src 'self' https://api.resend.com https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com",
      "frame-src https://www.paypal.com https://www.sandbox.paypal.com",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
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
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "i.guim.co.uk" },
      { protocol: "https", hostname: "static01.nyt.com" },
      { protocol: "https", hostname: "www.atlasandboots.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
