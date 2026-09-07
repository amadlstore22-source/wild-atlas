"use client";
import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { X, ArrowLeft, ArrowRight, Camera, Play, Pause } from "@phosphor-icons/react";
import * as m from "motion/react-m";
import { AnimatePresence, useReducedMotion } from "motion/react";

export interface GalleryPhoto {
  src: string;
  alt: string;
  span?: string;
}

/** How long each photo holds before the slideshow advances. Long enough to
 *  actually look at a frame and read its caption — a faster cycle turns the
 *  gallery into a flicker reel rather than something you watch. */
const SLIDESHOW_MS = 5000;

interface LightboxProps {
  photos: GalleryPhoto[];
  initialIndex: number;
  onClose: () => void;
  /** Start advancing as soon as the lightbox opens. The gallery page's
   *  "play slideshow" button opens it this way; a click on a photo does not. */
  autoPlay?: boolean;
}

function Lightbox({ photos, initialIndex, onClose, autoPlay = false }: LightboxProps) {
  const [idx, setIdx] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  // Someone who asked the OS for less motion did not ask for a carousel that
  // moves on its own, so autoplay never starts for them. They keep the arrows,
  // the keyboard and the dots.
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(autoPlay && !reduce);

  const prev = useCallback(() => {
    setDirection(-1);
    setIdx((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const next = useCallback(() => {
    setDirection(1);
    setIdx((i) => (i + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      // Space is what people press to pause a slideshow. Only swallow the
      // keypress when it means something here, so it still scrolls elsewhere.
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  // The advance timer. Keyed on `idx` as well as `playing` so that any manual
  // navigation — arrow, dot, keyboard — restarts the interval from zero rather
  // than advancing again a fraction of a second later on the old schedule.
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(next, SLIDESHOW_MS);
    return () => clearTimeout(t);
  }, [playing, idx, next]);

  // Stop the slideshow when the tab is hidden. Left running it burns image
  // decodes and data on a page nobody is looking at, and comes back having
  // silently skipped a dozen frames.
  useEffect(() => {
    if (!playing) return;
    const onVisibility = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [playing]);

  const photo = photos[idx];

  return createPortal(
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/92 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/50 text-xs font-medium tracking-widest select-none">
        {idx + 1} / {photos.length}
      </div>

      {/* Play / pause. Sits opposite Close so the two controls do not crowd. */}
      <button
        onClick={(e) => { e.stopPropagation(); setPlaying((p) => !p); }}
        className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label={playing ? "Pause slideshow" : "Play slideshow"}
      >
        {playing ? <Pause className="w-4 h-4" weight="fill" /> : <Play className="w-4 h-4" weight="fill" />}
      </button>

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Previous photo"
      >
        <ArrowLeft className="w-5 h-5" weight="bold" />
      </button>

      {/* Image */}
      <m.div
        key={idx}
        initial={{ opacity: 0, x: direction * 60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction * -60 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl max-h-[80vh] mx-14 sm:mx-20 rounded-xl overflow-hidden shadow-2xl"
        style={{ aspectRatio: "16/10" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 90vw"
          priority
        />
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-12">
          <div className="flex items-center gap-2">
            <Camera className="w-3.5 h-3.5 text-white/60 shrink-0" />
            <p className="text-white/85 text-sm leading-snug">{photo.alt}</p>
          </div>
        </div>

        {/* Slideshow progress. A moving bar is the only honest way to show how
            long the current frame has left; without it the jump to the next
            photo reads as random. Keyed on idx so it restarts each slide. */}
        {playing && (
          <m.div
            key={`bar-${idx}`}
            className="absolute top-0 left-0 h-[3px] bg-white/70"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: SLIDESHOW_MS / 1000, ease: "linear" }}
          />
        )}
      </m.div>

      {/* Preload the next frame so an advance does not land on an empty box.
          next/image only fetches what is rendered, and the next photo is not
          rendered until the slide has happened.

          This renders it rather than using <link rel="preload">: the optimiser
          serves from /_next/image?url=…&w=…&q=… with content negotiation, so a
          preload of the raw .jpg would fetch a second, different file and
          download the photo twice. Hidden, one frame ahead, same `sizes` as the
          visible image so the browser picks the identical srcset candidate and
          the advance is a cache hit. */}
      <div aria-hidden className="pointer-events-none absolute opacity-0 w-px h-px overflow-hidden">
        <Image
          src={photos[(idx + 1) % photos.length].src}
          alt=""
          width={1200}
          height={750}
          sizes="(max-width: 768px) 100vw, 90vw"
        />
      </div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Next photo"
      >
        <ArrowRight className="w-5 h-5" weight="bold" />
      </button>

      {/* Dot indicators, windowed.

          One dot per photo worked at 38 and breaks at 66: the row runs past
          the viewport edge on a phone and the dots shrink to nothing. Show a
          sliding window around the current frame instead, so the row is a
          fixed width whatever the gallery grows to. The counter above already
          gives the exact position, which is what the full row was really for. */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {(() => {
          const WINDOW = 9;
          const half = Math.floor(WINDOW / 2);
          const start = Math.max(0, Math.min(idx - half, photos.length - WINDOW));
          return photos.slice(start, start + WINDOW).map((_, k) => {
            const i = start + k;
            return (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setDirection(i > idx ? 1 : -1); setIdx(i); }}
                aria-label={`Photo ${i + 1} of ${photos.length}`}
                className="transition-all duration-300"
                style={{
                  width: i === idx ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === idx ? "#fff" : "rgba(255,255,255,0.35)",
                }}
              />
            );
          });
        })()}
      </div>
    </m.div>,
    document.body
  );
}

export default function GalleryLightbox({ photos }: { photos: GalleryPhoto[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      {photos.map((photo, i) => (
        <button
          key={i}
          onClick={() => setOpen(i)}
          className={`relative overflow-hidden rounded-[4px] group cursor-pointer text-left ${photo.span ?? ""}`}
          aria-label={`View photo: ${photo.alt}`}
        >
          <span className="block absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </span>
          <span className="block absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <span className="block absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm opacity-0 scale-75 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100">
            <Camera className="w-3.5 h-3.5 text-white" />
          </span>
          <span className="block absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
            <span className="block text-white text-xs font-medium leading-snug line-clamp-2 drop-shadow-lg">
              {photo.alt}
            </span>
          </span>
        </button>
      ))}

      <AnimatePresence>
        {open !== null && (
          <Lightbox photos={photos} initialIndex={open} onClose={() => setOpen(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * The lightbox on its own, opened by something other than a photo tile.
 *
 * The gallery page's "play slideshow" button sits above the grid rather than
 * inside it, and the page renders its photos in region sections rather than one
 * flat list — so it cannot use GalleryLightbox, whose tiles ARE its trigger.
 * This exposes the viewer alone: the page owns the button, this owns the modal.
 */
export function GallerySlideshow({
  photos,
  open,
  onClose,
  initialIndex = 0,
}: {
  photos: GalleryPhoto[];
  open: boolean;
  onClose: () => void;
  initialIndex?: number;
}) {
  return (
    <AnimatePresence>
      {open && (
        <Lightbox
          photos={photos}
          initialIndex={initialIndex}
          onClose={onClose}
          autoPlay
        />
      )}
    </AnimatePresence>
  );
}
