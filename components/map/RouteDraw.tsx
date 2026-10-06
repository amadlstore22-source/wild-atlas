"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Draws the road-trip route in when the map scrolls into view.
 *
 * The server HTML shows the route fully drawn, so with no JavaScript, with
 * reduced motion, or when the map is already on screen at load, nothing is
 * hidden. Only a map still below the fold is reset to "pending" and then drawn
 * as it arrives (CSS in globals.css, .road-map [data-draw]).
 */
export default function RouteDraw({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "pending" | "drawn">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    setState("pending");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("drawn");
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} data-draw={state}>
      {children}
    </div>
  );
}
