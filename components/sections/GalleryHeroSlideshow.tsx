"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import type { GalleryPhotoData } from "@/lib/gallery-photos";

/**
 * The gallery page's hero: the photographs themselves, cycling on their own.
 *
 * The page opens on the work rather than on a button that offers to show it —
 * a gallery whose first frame is a static image with "play" underneath asks
 * the visitor to do something before the page does anything.
 *
 * Implementation notes that are not obvious:
 *
 *  - Every slide is mounted and stacked; only opacity moves. Swapping the
 *    `src` of one <img> makes the browser fetch mid-transition and the hero
 *    flashes empty on a slow connection. Stacked layers cross-fade against a
 *    frame that is already decoded.
 *  - Only a window of slides is mounted at a time, not all of them. Mounting
 *    every frame would put that many <img> tags in the hero and, with `priority`
 *    on the first, would have the browser preloading a large slice of the
 *    gallery before anything below the fold renders.
 *  - The first slide alone carries `priority`. It is the page's LCP element;
 *    the rest must not compete with it for early bandwidth.
 *  - useReducedMotion holds it on the first frame. Someone who asked the OS for
 *    less motion gets a still hero, not a cross-fading one, and no controls
 *    appear that exist only to start motion.
 *  - It pauses when the tab is hidden. A hero cycling in a background tab
 *    decodes images nobody is looking at.
 */

/** Time each frame holds before the cross-fade to the next one begins. */
const HOLD_MS = 4500;
/** Length of the cross-fade itself. Slow enough to read as a dissolve. */
const FADE_MS = 1200;
/** How many slides are mounted around the current one. Three is enough to
 *  cover the outgoing frame, the incoming frame, and the one after it. */
const WINDOW = 3;

export default function GalleryHeroSlideshow({
  photos,
  children,
}: {
  photos: GalleryPhotoData[];
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused || photos.length < 2) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % photos.length), HOLD_MS);
    return () => clearTimeout(t);
  }, [idx, reduce, paused, photos.length]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Which slides to keep in the DOM: the current one and its neighbours,
  // wrapping at both ends so the cycle has no seam.
  const mounted = new Set<number>();
  for (let d = -1; d < WINDOW - 1; d++) {
    mounted.add((idx + d + photos.length) % photos.length);
  }

  return (
    <div className="relative h-[62vh] min-h-[420px] flex items-end overflow-hidden">
      {photos.map((photo, i) =>
        mounted.has(i) ? (
          <div
            key={photo.src}
            className="absolute inset-0"
            style={{
              opacity: i === idx ? 1 : 0,
              transition: `opacity ${FADE_MS}ms ease-in-out`,
            }}
            // The visible frame is the one being described; the rest are
            // decorative duplicates of content already listed below.
            aria-hidden={i !== idx}
          >
            <Image
              src={photo.src}
              alt={i === idx ? photo.alt : ""}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ) : null
      )}

      {/* Same scrim as the other page heroes, so the title stays legible
          whatever the frame underneath is doing. */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/35 to-indigo-deep/15" />

      {children}

      {/* Progress ticks, one per frame in the reel. The reel is deliberately
          short (see HERO_REEL in the page) — a tick row for all 66 photos
          would run off a phone screen, which is the same overflow the
          lightbox dots had to be windowed to avoid. Not clickable: the grid
          below is where choosing a photo happens. */}
      {!reduce && photos.length > 1 && (
        <div className="absolute bottom-6 right-4 sm:right-6 lg:right-8 flex items-center gap-1.5">
          {photos.map((p, i) => (
            <span
              key={p.src}
              className="block rounded-full transition-all duration-500"
              style={{
                width: i === idx ? 18 : 5,
                height: 5,
                background: i === idx ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
