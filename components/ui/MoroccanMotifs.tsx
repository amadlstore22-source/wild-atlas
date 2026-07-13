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
  tone = "clay",
  height = 22,
  fade = true,
}: {
  className?: string;
  tone?: "clay" | "forest" | "sand" | "light";
  height?: number;
  /** fade the band into its horizontal edges (default) — off for short centred strips */
  fade?: boolean;
}) {
  const strokes: Record<string, [string, number]> = {
    clay: ["#B85C38", 0.6],
    forest: ["#46583A", 0.55],
    sand: ["#8A8278", 0.6],
    light: ["#FFFFFF", 0.75],
  };
  const [stroke, opacity] = strokes[tone] ?? strokes.clay;
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
  tone = "clay",
  opacity = 0.09,
  scale = 120,
}: {
  className?: string;
  tone?: "clay" | "forest" | "sand" | "light";
  opacity?: number;
  scale?: number;
}) {
  const colors: Record<string, string> = {
    clay: "#B85C38",
    forest: "#46583A",
    sand: "#8A8278",
    light: "#FFFFFF", // for use on dark grounds
  };
  const stroke = colors[tone] ?? colors.clay;

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
 * A fine arabesque line divider — a short star-and-cross strip centred between
 * two hairlines, used <=2x per page as a refined section transition.
 */
export function ArabesqueDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-sunset/50 sm:w-28" />
      <ZelligeBand tone="clay" height={22} fade={false} className="w-36 sm:w-52 shrink-0" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-sunset/50 sm:w-28" />
    </div>
  );
}
