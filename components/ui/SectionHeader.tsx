import type { ReactNode } from "react";
import AnimateInView from "@/components/ui/AnimateInView";

/**
 * Section header: an optional saffron eyebrow (with a small hairline flourish), a
 * large Cormorant Garamond headline, and an optional subhead in Inter. Centered
 * by default; `align="left"` for directory sections with a side action.
 *
 * Eyebrows are used sparingly per the design rules — pass `eyebrow` only where it
 * genuinely helps orient the reader.
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  flourish = false,
  action,
  className = "",
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  /** show a small brass star + hairline before the eyebrow */
  flourish?: boolean;
  action?: ReactNode;
  className?: string;
  /** on emerald / dark bands, flip text colours to light */
  dark?: boolean;
}) {
  const isCenter = align === "center";
  const titleColor = dark ? "text-cream" : "text-ink";
  const subColor = dark ? "text-cream/75" : "text-ink-soft";
  const eyebrowColor = dark ? "text-brass-glow" : "";

  const header = (
    <div className={isCenter ? "text-center" : ""}>
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-5 ${isCenter ? "justify-center" : ""}`}>
          <span className={`eyebrow ${eyebrowColor}`}>{eyebrow}</span>
          {flourish && <span className="h-px w-10 bg-gradient-to-r from-saffron/60 to-transparent" />}
        </div>
      )}
      <h2
        className={`font-display font-bold ${titleColor} leading-[1.05]`}
        style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`${subColor} text-base sm:text-lg leading-relaxed mt-5 ${isCenter ? "max-w-2xl mx-auto" : "max-w-xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );

  return (
    <AnimateInView variant="fade-up" className={`mb-16 ${className}`}>
      {action && !isCenter ? (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          {header}
          <div className="shrink-0">{action}</div>
        </div>
      ) : (
        header
      )}
    </AnimateInView>
  );
}
