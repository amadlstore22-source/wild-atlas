"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { TourLocationMapProps } from "./TourLocationMapInner";

/**
 * Client wrapper. MapLibre GL touches `window` at module load, so the actual
 * map must not render on the server — but `ssr: false` is only allowed inside a
 * Client Component, not the server-rendered tour page. This thin wrapper is
 * that boundary: it dynamically imports the map implementation with SSR
 * disabled and shows a sized placeholder until it hydrates.
 *
 * WHY THE INTERSECTION OBSERVER, TOO
 * `dynamic(ssr:false)` defers the SERVER render, not the download: the chunk
 * is still requested as soon as the page hydrates. Measured on the live tour
 * page (390x844, 4x CPU, Slow 4G), that meant a 253 KB MapLibre chunk —
 * 974 KB unminified, the single largest resource on the page — downloading
 * while the hero image was still arriving, for a map that sits below the
 * itinerary and the booking sidebar.
 *
 * components/map/MapWrapper.tsx already learned this on the homepage and
 * gates its map the same way; this file was left behind, so every tour page
 * in six languages paid the cost. Same 400px rootMargin, so the map is
 * already loading before the reader reaches it.
 */
const TourLocationMapInner = dynamic(() => import("./TourLocationMapInner"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

/** Same height as the real map, so reserving it keeps CLS at 0. */
function MapSkeleton() {
  return <div className="h-[340px] w-full rounded-[4px] bg-surface-sunk/50 animate-pulse" />;
}

export default function TourLocationMap(props: TourLocationMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  // A browser with no IntersectionObserver can never be told the map scrolled
  // into view, so it starts visible. Decided in the lazy initialiser rather
  // than an effect, matching MapWrapper: setting it from inside the effect
  // renders the skeleton once first and React 19 flags the cascading render.
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

  return (
    <div ref={ref}>
      {/* Scoped to the routes that actually draw a map. The tile connection is
          worth ~300 ms of mobile LCP when it is opened before the deferred
          map bundle asks for a tile; in the shared layout the same hint was
          an unused socket on every blog and content page. React hoists these
          into <head>.

          These stay OUTSIDE the `visible` gate on purpose: opening the socket
          early is the whole point, and it costs a connection, not a download.
          Two hosts: Esri serves the satellite imagery, OpenFreeMap the vector
          labels and glyphs drawn over it. */}
      <link rel="preconnect" href="https://server.arcgisonline.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://server.arcgisonline.com" />
      <link rel="preconnect" href="https://tiles.openfreemap.org" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://tiles.openfreemap.org" />
      {visible ? <TourLocationMapInner {...props} /> : <MapSkeleton />}
    </div>
  );
}

export type { RouteStop } from "./TourLocationMapInner";
