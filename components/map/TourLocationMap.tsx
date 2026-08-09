"use client";
import dynamic from "next/dynamic";
import type { TourLocationMapProps } from "./TourLocationMapInner";

/**
 * Client wrapper. Leaflet touches `window` at module load, so the actual map
 * must not render on the server — but `ssr: false` is only allowed inside a
 * Client Component, not the server-rendered tour page. This thin wrapper is
 * that boundary: it dynamically imports the Leaflet implementation with SSR
 * disabled and shows a sized placeholder until it hydrates.
 */
const TourLocationMapInner = dynamic(() => import("./TourLocationMapInner"), {
  ssr: false,
  loading: () => (
    <div className="h-[340px] w-full rounded-[4px] bg-surface-sunk/50 animate-pulse" />
  ),
});

export default function TourLocationMap(props: TourLocationMapProps) {
  return (
    <>
      {/* Scoped to the routes that actually draw a map. The tile connection is
          worth ~300 ms of mobile LCP when it is opened before the deferred
          Leaflet bundle asks for a tile; in the shared layout the same hint was
          an unused socket on every blog and content page. React hoists these
          into <head>. */}
      <link rel="preconnect" href="https://server.arcgisonline.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://server.arcgisonline.com" />
      <TourLocationMapInner {...props} />
    </>
  );
}

export type { RouteStop } from "./TourLocationMapInner";
