// Regenerate the site's Open Graph share card (public/og-image.jpg) on an
// AUTHENTIC first-party photo instead of stock. 1200x630 — the standard OG /
// Twitter summary_large_image size. Composites an SVG overlay (brand wordmark,
// tagline, TripAdvisor 5.0/122 badge, headline, services line) over a real
// Toubkal summit panorama, with a legibility gradient.
//
// Run:  node scripts/build_og_image.mjs
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BG = path.join(ROOT, "public/gallery/toubkal-summit-panorama-high-atlas.jpg");
const OUT = path.join(ROOT, "public/og-image.jpg");

const W = 1200;
const H = 630;

// Brand palette (from the site): deep indigo ink, cream, brass, TripAdvisor green.
const INK = "#1B2A4A";
const CREAM = "#F7F3EA";
const BRASS = "#C9A24B";
const TA_GREEN = "#00AA6C";

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const headline1 = "Experience the real Morocco";
const headline2 = "beyond the tourist trail.";
const services = "Atlas trekking · Sahara nights · cultural excursions — from Marrakech & Agadir";

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="${INK}" stop-opacity="0.35"/>
      <stop offset="45%" stop-color="${INK}" stop-opacity="0.15"/>
      <stop offset="78%" stop-color="${INK}" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="${INK}" stop-opacity="0.92"/>
    </linearGradient>
  </defs>

  <!-- Legibility scrim over the photo -->
  <rect width="${W}" height="${H}" fill="url(#scrim)"/>

  <!-- Brand wordmark, top-left -->
  <g transform="translate(64, 74)">
    <rect x="0" y="-26" width="40" height="40" rx="9" fill="${BRASS}"/>
    <path d="M8 6 L18 -12 L24 -2 L30 -14 L34 6 Z" fill="${INK}"/>
    <text x="54" y="-2" font-family="Georgia, 'Times New Roman', serif" font-size="30" font-weight="700" fill="${CREAM}">Marrakech Eco Tours</text>
    <text x="55" y="20" font-family="Georgia, serif" font-size="13" letter-spacing="3" fill="${CREAM}" opacity="0.82">CERTIFIED BERBER GUIDES · SINCE 2010</text>
  </g>

  <!-- TripAdvisor rating badge, top-right -->
  <g transform="translate(${W - 292}, 54)">
    <rect x="0" y="0" width="228" height="52" rx="26" fill="${CREAM}"/>
    <text x="26" y="34" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="${INK}">5.0</text>
    <g transform="translate(74, 18)">
      ${[0, 1, 2, 3, 4].map((i) => `<circle cx="${i * 18 + 8}" cy="8" r="7.5" fill="${TA_GREEN}"/>`).join("")}
    </g>
    <text x="${228 - 24}" y="34" text-anchor="end" font-family="Arial, sans-serif" font-size="19" font-weight="600" fill="${INK}" opacity="0.7">122</text>
  </g>

  <!-- Headline, lower-left -->
  <text x="64" y="470" font-family="Georgia, 'Times New Roman', serif" font-size="62" font-weight="700" fill="${CREAM}">${esc(headline1)}</text>
  <text x="64" y="538" font-family="Georgia, 'Times New Roman', serif" font-size="62" font-weight="700" fill="${CREAM}">${esc(headline2)}</text>

  <!-- Services line -->
  <text x="66" y="582" font-family="Georgia, serif" font-size="21" fill="${CREAM}" opacity="0.9">${esc(services)}</text>
</svg>`;

const overlay = Buffer.from(svg);

const info = await sharp(BG)
  .resize(W, H, { fit: "cover", position: "attention" })
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(OUT);

console.log(`✓ og-image.jpg  (${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB)`);
console.log(`  background: authentic Toubkal summit panorama (first-party photo)`);
