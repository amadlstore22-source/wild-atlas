"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

const ToursMap = dynamic(() => import("./ToursMap"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

function MapSkeleton() {
  return (
    <div
      className="py-20"
      style={{ background: "linear-gradient(180deg,#0D150D 0%,#111711 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="h-2.5 w-28 bg-white/10 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-8 w-64 bg-white/8 rounded-xl mx-auto mb-3 animate-pulse" />
          <div className="h-2.5 w-44 bg-white/6 rounded-full mx-auto" />
        </div>
        <div
          className="rounded-3xl animate-pulse"
          style={{
            height: "clamp(480px, 58vw, 660px)",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        />
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {[80, 96, 88, 72, 104, 76, 88, 90].map((w, i) => (
            <div
              key={i}
              className="h-7 rounded-full animate-pulse"
              style={{ width: w, background: "rgba(255,255,255,0.07)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Defers the map until it is about to enter the viewport.
 *
 * `dynamic(ssr:false)` alone still mounts the component on hydration, so
 * Leaflet's bundle AND the ArcGIS satellite tiles began downloading during
 * initial page load — competing with the hero image for bandwidth. On a
 * throttled mobile connection that pushed homepage LCP to 5.7 s (element
 * render delay 3.3 s) even though TTFB was only 10 ms.
 *
 * The map sits far below the fold, so nothing is lost by waiting until the
 * reader scrolls within 400 px of it. Renders the same skeleton until then, so
 * layout is reserved and CLS stays at 0.
 */
export default function MapWrapper({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const ref = useRef<HTMLDivElement>(null);
  // A browser with no IntersectionObserver can never be told the map scrolled
  // into view, so it starts visible. Decided in the lazy initialiser rather
  // than an effect: setting it from inside the effect rendered the skeleton
  // once first, and React 19 flags the cascading render.
  // HYDRATION: this MUST start false on both server and client.
  //
  // It used to be `typeof IntersectionObserver === "undefined"`, which is true
  // on the server and false in the browser — so the server rendered the map's
  // Suspense boundary while the client's first render produced the skeleton,
  // and React threw "server rendered HTML didn't match the client" on every
  // tour page. A lazy initialiser cannot read a browser-only global for this
  // reason: the first client render has to match the server exactly.
  //
  // The no-IntersectionObserver fallback still works — it is handled in the
  // effect below, which runs only in the browser, after hydration.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // No IntersectionObserver (old browser, some test envs): show it now.
    // This runs post-hydration, so it cannot cause a mismatch.
    if (typeof IntersectionObserver === "undefined") {
      // Fallback for browsers without IntersectionObserver. `visible` cannot be
      // initialised from that global: it is undefined on the server and defined
      // in the browser, so a lazy initialiser would render different trees and
      // throw a hydration mismatch on every page carrying a map.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{visible ? <ToursMap lang={lang} dict={dict} /> : <MapSkeleton />}</div>;
}
