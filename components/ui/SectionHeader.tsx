import type { ReactNode } from "react";
import { ZelligeStar } from "@/components/ui/MoroccanMotifs";
import AnimateInView from "@/components/ui/AnimateInView";

/**
 * The giga.ai-signature section header: an eyebrow (with an optional Moroccan
 * star flourish) + a big confident headline + an optional subhead. Centered by
 * default; `align="left"` for directory-style sections with a side action.
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
  /** show a small zellige star before the eyebrow */
  flourish?: boolean;
  /** optional right-aligned action (e.g. a "View all" link) — only with align="left" */
  action?: ReactNode;
  className?: string;
  /** on dark section bands, flip text colors to light */
  dark?: boolean;
}) {
  const isCenter = align === "center";
  const titleColor = dark ? "text-white" : "text-ink";
  const subColor = dark ? "text-white/65" : "text-ink-muted";

  const header = (
    <div className={isCenter ? "text-center" : ""}>
      {eyebrow && (
        <p
          className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-sunset mb-4 ${
            isCenter ? "justify-center" : ""
          }`}
        >
          {flourish && <ZelligeStar size={13} className="text-sunset" />}
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-bold ${titleColor} tracking-[-0.02em] leading-[1.08]`}
        style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`${subColor} text-base sm:text-lg leading-relaxed mt-5 ${
            isCenter ? "max-w-2xl mx-auto" : "max-w-xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );

  return (
    <AnimateInView variant="fade-up" className={`mb-14 ${className}`}>
      {action && !isCenter ? (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          {header}
          <div className="shrink-0">{action}</div>
        </div>
      ) : (
        header
      )}
    </AnimateInView>
  );
}
