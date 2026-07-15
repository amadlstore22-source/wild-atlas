import type { ReactNode } from "react";

/**
 * Standard section wrapper — generous whitespace, a consistent max-width
 * container, and a `tone` that drives the plaster / sand / indigo background
 * rhythm (replacing flat white). `motif` adds the subtle tadelakt plaster grain
 * behind the content — structural tooth, not decorative wallpaper.
 */
export default function Section({
  children,
  tone = "plaster",
  motif = false,
  className = "",
  containerClassName = "",
  id,
}: {
  children: ReactNode;
  tone?: "plaster" | "sand" | "emerald" | "cream";
  motif?: boolean;
  className?: string;
  containerClassName?: string;
  id?: string;
}) {
  const toneClass =
    tone === "sand"
      ? "tex-sand"
      : tone === "emerald"
        ? "tex-indigo text-cream"
        : tone === "cream"
          ? "bg-card"
          : "tex-plaster";

  return (
    <section id={id} className={`relative ${toneClass} ${motif ? "tadelakt" : ""} py-24 md:py-32 ${className}`}>
      <div className={`relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
