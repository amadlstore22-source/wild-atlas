import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The site's primary action element. Three finishes:
 *   - brass:  solid indigo (the primary CTA; class name kept for compatibility)
 *   - ghost:  indigo hairline outline (secondary)
 *   - emerald: solid indigo (in-content primary on light grounds)
 *
 * Renders as a next/link (internal href), an <a> (external href), or a <button>.
 * Styling lives in globals.css (.btn-brass / .btn-ghost) so it stays consistent.
 */

type Variant = "brass" | "ghost" | "emerald";

const VARIANT_CLASS: Record<Variant, string> = {
  brass: "btn-brass",
  ghost: "btn-ghost",
  emerald:
    "inline-flex items-center justify-center gap-2 rounded-[2px] px-8 py-3.5 font-semibold text-cream bg-indigo hover:bg-indigo-deep transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.985] shadow-[0_6px_20px_rgba(43,58,103,0.22)]",
};

interface Props {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  ariaLabel?: string;
}

export default function BrassButton({
  children,
  variant = "brass",
  href,
  external = false,
  onClick,
  type = "button",
  className = "",
  ariaLabel,
}: Props) {
  const cls = `${VARIANT_CLASS[variant]} ${className}`;

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
