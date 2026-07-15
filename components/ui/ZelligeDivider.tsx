/**
 * ZelligeDivider — the khatam (8-point star), the foundational zellige unit,
 * flanked by two structural hairlines. This is the ONLY place ornament appears
 * in the design system. Place between major sections only (max 5 per page). Do
 * not tile it, nest it in cards, or use it as a background.
 *
 * The glyph is two superimposed squares (one rotated 45°) — the construction
 * that generates the classic Moroccan star-and-cross. Inline SVG, CSP-safe.
 */
export default function ZelligeDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`zellige-divider ${className}`} role="separator" aria-hidden="true">
      <span className="zellige-rule" />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" stroke="currentColor" strokeWidth="1" />
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          stroke="currentColor"
          strokeWidth="1"
          transform="rotate(45 12 12)"
        />
      </svg>
      <span className="zellige-rule" />
    </div>
  );
}
