import type { ReactNode } from "react";
import { ZelligeField } from "@/components/ui/MoroccanMotifs";

/**
 * Standard section wrapper — generous whitespace + a consistent max-width
 * container. `tone` drives the white/bone background rhythm used for section
 * separation. `motif` optionally lays a very faint zellige star-and-cross field
 * behind the content so a plain panel gains subtle Moroccan texture.
 */
export default function Section({
  children,
  tone = "white",
  motif = false,
  className = "",
  containerClassName = "",
  id,
}: {
  children: ReactNode;
  tone?: "white" | "bone";
  /** faint tessellated zellige field behind the content */
  motif?: boolean;
  className?: string;
  containerClassName?: string;
  id?: string;
}) {
  const bg = tone === "bone" ? "bg-bone" : "bg-white";
  return (
    <section id={id} className={`relative ${bg} py-24 md:py-32 ${className}`}>
      {motif && <ZelligeField tone="clay" opacity={0.09} scale={132} />}
      <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
