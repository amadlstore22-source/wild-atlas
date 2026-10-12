"use client";
import { useEffect, useRef, useState } from "react";
import { MAP_H, MAP_W } from "@/lib/route-map-frame";

type Rect = { x: number; y: number; w: number; h: number };
type Stage = "idle" | "pending" | "overview" | "zooming" | "drawn";

/**
 * Plays the route map in when it scrolls into view: the whole of Morocco with
 * its major cities and the route drawn on it, then a smooth zoom down to the
 * route, then the place names (owner's requests, 2026-10-12). Scrolling the
 * map fully out of view resets it, so it plays again on the way back.
 *
 * The server HTML is the finished map, so with no JavaScript or with reduced
 * motion nothing is hidden or moved. A map already on screen at load shows
 * finished too, and plays the next time it comes back into view. CSS in
 * globals.css, .road-map [data-draw].
 *
 * The zoom is a transform on the map's [data-zoom] group, from the overview
 * rectangle (`from`, in the tour frame's SVG units) to the full panel. Width
 * is interpolated geometrically, so the zoom feels even at every scale instead
 * of rushing the first half, and --rm-z carries the current scale so strokes
 * and the city markers keep their size on screen throughout.
 */
const ZOOM_MS = 2000;
const OVERVIEW_MS = 1500;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

function place(g: SVGGElement, r: Rect) {
  const s = MAP_W / r.w;
  g.setAttribute("transform", `translate(${(-r.x * s).toFixed(2)} ${(-r.y * s).toFixed(2)}) scale(${s.toFixed(5)})`);
  g.style.setProperty("--rm-z", s.toFixed(5));
}
function rest(g: SVGGElement) {
  g.removeAttribute("transform");
  g.style.removeProperty("--rm-z");
}

export default function RouteDraw({ from, children }: { from?: Rect; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const g = el.querySelector<SVGGElement>("[data-zoom]");
    let current: Stage = "idle";
    let raf = 0, timer = 0;
    const go = (s: Stage) => { current = s; setStage(s); };
    const stop = () => { cancelAnimationFrame(raf); clearTimeout(timer); };

    const reset = () => {
      stop();
      if (from && g) place(g, from);
      go("pending");
    };
    const zoom = () => {
      if (!from || !g) { go("drawn"); return; }
      go("zooming");
      const to: Rect = { x: 0, y: 0, w: MAP_W, h: MAP_H };
      const c0 = [from.x + from.w / 2, from.y + from.h / 2], c1 = [to.x + to.w / 2, to.y + to.h / 2];
      const t0 = performance.now();
      const step = (now: number) => {
        const e = ease(Math.min(1, (now - t0) / ZOOM_MS));
        const w = from.w ** (1 - e) * to.w ** e;
        // The centre travels in step with the zoom, so the route stays in view.
        const u = (from.w - w) / (from.w - to.w);
        const cx = c0[0] + (c1[0] - c0[0]) * u, cy = c0[1] + (c1[1] - c0[1]) * u;
        const h = (w * MAP_H) / MAP_W;
        place(g, { x: cx - w / 2, y: cy - h / 2, w, h });
        if (e < 1) raf = requestAnimationFrame(step);
        else { rest(g); go("drawn"); }
      };
      raf = requestAnimationFrame(step);
    };
    const play = () => {
      go("overview");
      timer = window.setTimeout(zoom, OVERVIEW_MS);
    };

    // Below the fold at load: park on the overview until it arrives.
    if (el.getBoundingClientRect().top >= window.innerHeight) reset();

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[entries.length - 1];
        if (!e.isIntersecting) {
          // Fully off screen: rewind, so coming back plays it again.
          if (current !== "pending") reset();
        } else if (e.intersectionRatio >= 0.45 && current === "pending") {
          play();
        }
      },
      { threshold: [0, 0.45] },
    );
    io.observe(el);
    return () => { io.disconnect(); stop(); if (g) rest(g); };
  }, [from]);

  return (
    <div ref={ref} data-draw={stage}>
      {children}
    </div>
  );
}
