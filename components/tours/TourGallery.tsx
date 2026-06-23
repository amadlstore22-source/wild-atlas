"use client";
import { useState } from "react";
import Image from "next/image";
import { X, CaretLeft, CaretRight } from "@phosphor-icons/react";

export default function TourGallery({ images, title }: { images: string[]; title: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  function prev() {
    setLightbox((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
  }
  function next() {
    setLightbox((i) => (i === null ? 0 : (i + 1) % images.length));
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden">
        {images.slice(0, 4).map((src, i) => (
          <div
            key={i}
            onClick={() => setLightbox(i)}
            className={`relative cursor-pointer overflow-hidden hover:opacity-90 transition-opacity ${
              i === 0 ? "col-span-2 row-span-2 h-80" : "h-[152px]"
            }`}
          >
            <Image
              src={src}
              alt={`${title} — photo ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            {i === 3 && images.length > 4 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-xl">+{images.length - 4}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 text-white/70 hover:text-white"
            aria-label="Previous"
          >
            <CaretLeft className="w-10 h-10" />
          </button>
          <div className="relative w-full max-w-4xl h-[70vh] mx-16" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[lightbox]}
              alt={`${title} — photo ${lightbox + 1}`}
              fill
              className="object-contain"
            />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 text-white/70 hover:text-white"
            aria-label="Next"
          >
            <CaretRight className="w-10 h-10" />
          </button>
          <div className="absolute bottom-4 text-white/50 text-sm">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
