"use client";
import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { X, ArrowLeft, ArrowRight, Camera } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";

export interface GalleryPhoto {
  src: string;
  alt: string;
  span?: string;
}

interface LightboxProps {
  photos: GalleryPhoto[];
  initialIndex: number;
  onClose: () => void;
}

function Lightbox({ photos, initialIndex, onClose }: LightboxProps) {
  const [idx, setIdx] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

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
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const photo = photos[idx];

  return createPortal(
    <motion.div
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
      <motion.div
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
      </motion.div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Next photo"
      >
        <ArrowRight className="w-5 h-5" weight="bold" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setDirection(i > idx ? 1 : -1); setIdx(i); }}
            aria-label={`Photo ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width: i === idx ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === idx ? "#fff" : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>
    </motion.div>,
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
          <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm opacity-0 scale-75 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100">
            <Camera className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
            <p className="text-white text-xs font-medium leading-snug line-clamp-2 drop-shadow-lg">
              {photo.alt}
            </p>
          </div>
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
