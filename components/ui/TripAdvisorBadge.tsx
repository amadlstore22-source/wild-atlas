import { TRIPADVISOR } from "@/lib/constants";

/**
 * TripAdvisor owl mark + a filled-bubble rating row.
 * TripAdvisor uses green "bubbles" (circles), not stars.
 */
function OwlMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 322" className={className} aria-hidden="true" fill="currentColor">
      <path d="M256.94 68.4C169.2 68.4 89.6 96.2 25.2 145.6L0 145.6l45.2 49.2A79 79 0 1 0 176 253.8a79 79 0 0 0 161.9 0 79 79 0 1 0 130.8-58.9L512 145.6l-24.6 0C423 96.1 344.7 68.4 256.94 68.4zm-95.6 84.3a54.7 54.7 0 1 1 0 109.4 54.7 54.7 0 0 1 0-109.4zm190.5 0a54.7 54.7 0 1 1 0 109.4 54.7 54.7 0 0 1 0-109.4zM161.3 179a28.4 28.4 0 1 0 0 56.8 28.4 28.4 0 0 0 0-56.8zm190.5 0a28.4 28.4 0 1 0 0 56.8 28.4 28.4 0 0 0 0-56.8z" />
    </svg>
  );
}

function Bubbles({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span
            key={i}
            className="relative inline-block rounded-full"
            style={{ width: size, height: size, background: "#e6e6e6" }}
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{ background: "#00aa6c", clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)` }}
            />
          </span>
        );
      })}
    </span>
  );
}

interface Props {
  /** "full" = card with logo + bubbles + count; "compact" = single-line pill; "dark" = tuned for dark footer */
  variant?: "full" | "compact" | "dark";
  className?: string;
}

export default function TripAdvisorBadge({ variant = "full", className = "" }: Props) {
  const label = `Rated ${TRIPADVISOR.rating.toFixed(1)} out of 5 from ${TRIPADVISOR.reviewCount} reviews on TripAdvisor (as ${TRIPADVISOR.listingName})`;

  if (variant === "compact") {
    return (
      <a
        href={TRIPADVISOR.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-charcoal shadow-sm transition-shadow hover:shadow-md ${className}`}
      >
        <OwlMark className="h-3.5 w-auto text-[#00aa6c]" />
        <Bubbles rating={TRIPADVISOR.rating} size={12} />
        <span className="text-xs font-semibold">
          {TRIPADVISOR.rating.toFixed(1)}
          <span className="ml-1 font-normal text-charcoal/50">({TRIPADVISOR.reviewCount})</span>
        </span>
      </a>
    );
  }

  if (variant === "dark") {
    return (
      <a
        href={TRIPADVISOR.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`group inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors hover:bg-white/10 ${className}`}
      >
        <OwlMark className="h-6 w-auto text-[#00aa6c] shrink-0" />
        <div className="leading-tight">
          <div className="flex items-center gap-2">
            <Bubbles rating={TRIPADVISOR.rating} />
            <span className="text-sm font-bold text-white">{TRIPADVISOR.rating.toFixed(1)}</span>
          </div>
          <div className="mt-0.5 text-xs text-white/50">
            {TRIPADVISOR.reviewCount} reviews on{" "}
            <span className="font-semibold text-white/70 group-hover:text-[#00aa6c] transition-colors">TripAdvisor</span>
          </div>
          <div className="mt-0.5 text-[10px] text-white/30">as {TRIPADVISOR.listingName}</div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={TRIPADVISOR.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`group inline-flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md ${className}`}
    >
      <OwlMark className="h-6 w-auto text-[#00aa6c] shrink-0" />
      <div className="leading-tight">
        <div className="flex items-center gap-2">
          <Bubbles rating={TRIPADVISOR.rating} />
          <span className="text-sm font-bold text-charcoal">{TRIPADVISOR.rating.toFixed(1)}</span>
        </div>
        <div className="mt-0.5 text-xs text-charcoal/55">
          {TRIPADVISOR.reviewCount} reviews on{" "}
          <span className="font-semibold text-charcoal/75 group-hover:text-[#00aa6c] transition-colors">TripAdvisor</span>
        </div>
        <div className="mt-0.5 text-[10px] text-charcoal/40">as {TRIPADVISOR.listingName}</div>
      </div>
    </a>
  );
}
