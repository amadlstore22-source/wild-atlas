import { useId, type ReactNode } from "react";

/**
 * Restrained Moroccan decorative motifs — inline SVG only (respects the strict
 * CSP; no external assets). Used sparingly as accents on a clean, spacious canvas.
 *
 * The geometry is the authentic khatam (8-pointed star) construction: two
 * overlapping squares, one rotated 45°, points at 45° intervals — the same unit
 * that, repeated on a grid, produces the classic Moroccan zellige star-and-cross
 * border band. See ZelligeBand / ZelligeField below.
 */

/* ------------------------------------------------------------------ */
/*  Shared geometry — a single khatam (8-pointed star) as SVG points.  */
/* ------------------------------------------------------------------ */

/**
 * Vertices of an 8-pointed star (khatam) centered at (cx,cy). 16 points that
 * alternate between outer radius `outer` and inner radius `inner`. Rotated so a
 * flat pair of points sits on the vertical/horizontal axes (the traditional
 * upright zellige orientation).
 */
function khatamPoints(cx: number, cy: number, outer: number, inner: number): string {
  const pts: string[] = [];
  // Start at the top point; step every 22.5° (16 vertices).
  for (let i = 0; i < 16; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI / 8) * i - Math.PI / 2; // -90° so a point is up
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return pts.join(" ");
}

/** Zellige 8-pointed star (khatam). Static. Tiny accent mark or faint watermark. */
export function ZelligeStar({
  className = "",
  size = 16,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      {/* outer/inner ratio ~0.55 → the balanced traditional khatam, not a spiky octagram */}
      <polygon points={khatamPoints(50, 50, 48, 26)} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  ZelligeBand — the authentic star-and-cross border, tiled.          */
/* ------------------------------------------------------------------ */

/**
 * One repeat unit of the classic zellige star-and-cross border, drawn as line
 * art on a 60×60 tile. A full khatam sits in the centre; connector diamonds sit
 * on the mid-edges so the unit repeats horizontally into a continuous frieze.
 */
function bandTileSVG(stroke: string, strokeOpacity: number): string {
  const T = 60; // tile size
  const c = T / 2;
  const star = khatamPoints(c, c, 26, 14);
  const d = 6.5;
  const diamond = (x: number, y: number) =>
    `${x},${y - d} ${x + d},${y} ${x},${y + d} ${x - d},${y}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${T}" height="${T}" viewBox="0 0 ${T} ${T}">
  <g fill="none" stroke="${stroke}" stroke-opacity="${strokeOpacity}" stroke-width="1.25" stroke-linejoin="round">
    <polygon points="${star}"/>
    <polygon points="${diamond(0, c)}"/>
    <polygon points="${diamond(T, c)}"/>
    <line x1="${c - 13}" y1="${c}" x2="6.5" y2="${c}"/>
    <line x1="${c + 13}" y1="${c}" x2="${T - 6.5}" y2="${c}"/>
  </g>
</svg>`;
}

function encodeSVG(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg)
    .replace(/%20/g, " ")
    .replace(/%3D/g, "=")
    .replace(/%3A/g, ":")
    .replace(/%2F/g, "/")
    .replace(/%22/g, "'")}`;
}

/**
 * A horizontal zellige border band — a seamlessly tiling strip of the
 * star-and-cross motif. Use in place of a plain 1px section rule.
 */
export function ZelligeBand({
  className = "",
  tone = "brass",
  height = 22,
  fade = true,
}: {
  className?: string;
  tone?: "clay" | "forest" | "sand" | "brass" | "light";
  height?: number;
  /** fade the band into its horizontal edges (default) — off for short centred strips */
  fade?: boolean;
}) {
  const strokes: Record<string, [string, number]> = {
    clay: ["#B4472C", 0.55],
    forest: ["#2B3A67", 0.5],
    sand: ["#9A9088", 0.55],
    brass: ["#C97B2B", 0.7],
    light: ["#FBF8F3", 0.7],
  };
  const [stroke, opacity] = strokes[tone] ?? strokes.brass;
  const uri = encodeSVG(bandTileSVG(stroke, opacity));
  const fadeMask = fade
    ? "linear-gradient(to right, transparent, black 12%, black 88%, transparent)"
    : undefined;
  return (
    <div
      aria-hidden="true"
      className={`w-full ${className}`}
      style={{
        height,
        backgroundImage: `url("${uri}")`,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "center",
        backgroundSize: `auto ${height}px`,
        maskImage: fadeMask,
        WebkitMaskImage: fadeMask,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  ZelligeField — a faint tessellated star field as a background art. */
/* ------------------------------------------------------------------ */

/**
 * A very faint, seamlessly tiling star-and-cross field for section backgrounds.
 * Absolutely positioned; sits behind content at low opacity so a plain white or
 * bone panel gains subtle Moroccan texture without fighting the content.
 */
export function ZelligeField({
  className = "",
  tone = "brass",
  opacity = 0.09,
  scale = 120,
}: {
  className?: string;
  tone?: "clay" | "forest" | "sand" | "brass" | "light";
  opacity?: number;
  scale?: number;
}) {
  const colors: Record<string, string> = {
    clay: "#B4472C",
    forest: "#2B3A67",
    sand: "#9A9088",
    brass: "#C97B2B",
    light: "#FBF8F3", // for use on dark grounds
  };
  const stroke = colors[tone] ?? colors.brass;

  const T = 120;
  const centre = khatamPoints(T / 2, T / 2, 30, 16);
  const corner = (cx: number, cy: number) => khatamPoints(cx, cy, 30, 16);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${T}" height="${T}" viewBox="0 0 ${T} ${T}">
  <g fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linejoin="round">
    <polygon points="${centre}"/>
    <polygon points="${corner(0, 0)}"/>
    <polygon points="${corner(T, 0)}"/>
    <polygon points="${corner(0, T)}"/>
    <polygon points="${corner(T, T)}"/>
  </g>
</svg>`;
  const uri = encodeSVG(svg);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        opacity,
        backgroundImage: `url("${uri}")`,
        backgroundRepeat: "repeat",
        backgroundSize: `${scale}px ${scale}px`,
      }}
    />
  );
}

/**
 * A fine zellij line divider — a short star-and-cross strip centred between two
 * brass hairlines, flanked by small stars. Used <=2x per page as a refined
 * section transition.
 */
export function ArabesqueDivider({
  className = "",
  tone = "brass",
}: {
  className?: string;
  tone?: "clay" | "forest" | "sand" | "brass" | "light";
}) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-brass/60 sm:w-28" />
      <ZelligeStar size={12} className="text-brass shrink-0" />
      <ZelligeBand tone={tone} height={22} fade={false} className="w-32 sm:w-48 shrink-0" />
      <ZelligeStar size={12} className="text-brass shrink-0" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-brass/60 sm:w-28" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ArchImage — a horseshoe / keyhole-arch masked media container.     */
/* ------------------------------------------------------------------ */

/**
 * Clips its children (an Image or video) into the iconic Moroccan pointed
 * horseshoe arch. The silhouette: straight sides rising, shoulders curving
 * inward, meeting at a gentle ogee point at the crown. Pure inline SVG clip
 * path — CSP-safe, scales to any aspect ratio.
 */
export function ArchImage({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  // Stable across server + client (Math.random would cause a hydration mismatch
  // and can break the clip-path reference).
  const rawId = useId();
  const id = `arch-${rawId.replace(/:/g, "")}`;
  return (
    <div className={`relative ${className}`}>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            {/* Horseshoe arch: square base, straight sides to ~38%, shoulders
                curve in, meeting at a soft point at top-centre. */}
            <path d="M0,1 L0,0.42 C0,0.19 0.16,0.04 0.34,0.02 C0.42,0.005 0.46,0 0.5,0 C0.54,0 0.58,0.005 0.66,0.02 C0.84,0.04 1,0.19 1,0.42 L1,1 Z" />
          </clipPath>
        </defs>
      </svg>
      <div style={{ clipPath: `url(#${id})` }} className="absolute inset-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ArchDivider — an arch-shaped section transition (SVG top edge).    */
/* ------------------------------------------------------------------ */

/**
 * A section transition shaped like a repeating scalloped arcade — the crown of
 * a riad courtyard. Renders as a full-width SVG whose fill matches the section
 * ABOVE, so the section below appears to rise through a row of arches. Place at
 * the very top of the lower section.
 */
export function ArchDivider({
  className = "",
  fill = "#FBF8F3",
  flip = false,
}: {
  className?: string;
  /** colour of the section ABOVE (the arch openings reveal the section below) */
  fill?: string;
  /** flip vertically for a bottom-edge scallop */
  flip?: boolean;
}) {
  return (
    <div className={`w-full leading-[0] ${className}`} aria-hidden="true" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[56px] md:h-[72px]">
        {/* A row of horseshoe arches cut out of the upper section's fill. */}
        <path
          fill={fill}
          d="M0,0 L1200,0 L1200,80 L0,80 Z M0,80 C0,44 34,20 75,20 C90,20 100,10 100,0 L100,0 C100,10 110,20 125,20 C166,20 200,44 200,80 Z"
        />
        <path
          fill={fill}
          d="M0,80 C0,44 40,18 100,18 C160,18 200,44 200,80 C200,44 240,18 300,18 C360,18 400,44 400,80 C400,44 440,18 500,18 C560,18 600,44 600,80 C600,44 640,18 700,18 C760,18 800,44 800,80 C800,44 840,18 900,18 C960,18 1000,44 1000,80 C1000,44 1040,18 1100,18 C1160,18 1200,44 1200,80 L1200,0 L0,0 Z"
        />
      </svg>
    </div>
  );
}
