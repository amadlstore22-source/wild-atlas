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
      // React dev mode (Turbopack HMR) requires eval() — allow only in development
      isDev
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.paypal.com https://www.paypalobjects.com"
        : "script-src 'self' 'unsafe-inline' https://www.paypal.com https://www.paypalobjects.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://images.unsplash.com https://images.pexels.com https://www.paypalobjects.com https://server.arcgisonline.com https://i.guim.co.uk https://static01.nyt.com https://www.atlasandboots.com",
      "font-src 'self'",
      isDev
        ? "connect-src 'self' https://api.resend.com ws://localhost:* http://localhost:*"
        : "connect-src 'self' https://api.resend.com",
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
