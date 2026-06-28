"use client";
import { useState, useEffect, useCallback } from "react";
import { Star, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import AnimateInView from "@/components/ui/AnimateInView";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const REVIEWS = [
  {
    name: "Katherine L.",
    country: "United Kingdom",
    flag: "GB",
    rating: 5,
    tour: "Toubkal Summit Trek",
    date: "March 2025",
    source: "Direct",
    text: "I cannot recommend this experience highly enough. From the moment our guide met us in Imlil, it was clear we were in expert hands. He knew every stone of that mountain and shared the history of each Berber village with such warmth and pride. Standing on the roof of North Africa at sunrise was the single most powerful moment of my life.",
    color: "#4B5D3A",
  },
  {
    name: "Marco B.",
    country: "Italy",
    flag: "IT",
    rating: 5,
    tour: "3-Day Sahara Desert Tour",
    date: "November 2024",
    source: "Direct",
    text: "I have travelled to more than 40 countries and the Sahara night was the most extraordinary of all. The silence out there is unlike anything you have ever experienced. We rode camels into Erg Chebbi as the sun turned the dunes to liquid gold. Perfectly organised from start to finish.",
    color: "#8B5E3C",
  },
  {
    name: "Emily C.",
    country: "United States",
    flag: "US",
    rating: 5,
    tour: "Marrakech Medina Cultural Tour",
    date: "February 2025",
    source: "Direct",
    text: "I had been to Marrakech twice before, always overwhelmed in the medina. This tour changed everything. Our guide took us through the real Marrakech — tea with a spice merchant whose family has had the same stall for 200 years, the tanneries from a private rooftop, lunch in a hidden riad courtyard. Extraordinary.",
    color: "#2C5F6A",
  },
  {
    name: "Thomas M.",
    country: "Germany",
    flag: "DE",
    rating: 4,
    tour: "Ourika Valley Day Hike",
    date: "April 2025",
    source: "Direct",
    text: "The Ourika Valley is genuinely stunning and our guide read the pace of the group well — my 65-year-old mother kept up without any trouble. The Berber family lunch was the highlight. One small note: the pickup was about 20 minutes late, which ate into our time at the waterfall. Still a wonderful day and we would book again.",
    color: "#5A4A6F",
  },
  {
    name: "Amelia S.",
    country: "Brazil",
    flag: "BR",
    rating: 4,
    tour: "Mgoun Massif Traverse",
    date: "October 2024",
    source: "Direct",
    text: "Seven days in the Mgoun and the landscapes are unlike anything I have ever seen — gorges of red rock, high passes in the howling wind, villages that feel untouched by modern life. The guiding was excellent. I'm giving four stars rather than five because the pre-departure information pack was thin; I had to ask separately for the gear list. Once on the trail, everything was outstanding.",
    color: "#7A3D3D",
  },
];

interface Props { dict: Dictionary }

const ease = [0.22, 1, 0.36, 1] as const;

export default function Testimonials({ dict }: Props) {
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const r = REVIEWS[idx];

  const prev = useCallback(() => {
    setDirection(-1);
    setIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setIdx((i) => (i + 1) % REVIEWS.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Auto-advance every 6 s, pause on hover
  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(() => {
      setDirection(1);
      setIdx((i) => (i + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(id);
  }, [isHovered]);

  return (
    <section
      className="py-24 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimateInView variant="fade-up" className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <h2 className="font-serif text-charcoal font-bold"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              {dict.testimonials.title}
            </h2>
            <p className="text-charcoal/45 text-sm mt-2 max-w-xs">
              {dict.testimonials.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-sand-dark bg-white flex items-center justify-center text-charcoal/50"
              whileHover={{ borderColor: "#4B5D3A", color: "#4B5D3A", scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous review"
            >
              <ArrowLeft className="w-4 h-4" weight="bold" />
            </motion.button>
            <span className="text-xs text-charcoal/35 w-8 text-center">{idx + 1}/{REVIEWS.length}</span>
            <motion.button
              onClick={next}
              className="w-10 h-10 rounded-full border border-sand-dark bg-white flex items-center justify-center text-charcoal/50"
              whileHover={{ borderColor: "#4B5D3A", color: "#4B5D3A", scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next review"
            >
              <ArrowRight className="w-4 h-4" weight="bold" />
            </motion.button>
          </div>
        </AnimateInView>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">

          {/* Left: reviewer list */}
          <div className="space-y-2">
            {REVIEWS.map((review, i) => (
              <motion.button
                key={i}
                onClick={() => { setDirection(i > idx ? 1 : -1); setIdx(i); }}
                className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 ${
                  i === idx
                    ? "bg-forest text-white shadow-lg shadow-forest/20"
                    : "bg-white/60 hover:bg-white text-charcoal border border-transparent hover:border-sand-dark"
                }`}
                animate={{
                  backgroundColor: i === idx ? "#4B5D3A" : "rgba(255,255,255,0.6)",
                  color: i === idx ? "#fff" : "#111111",
                }}
                transition={{ duration: 0.25 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div
                  className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: review.color }}
                  aria-hidden="true"
                >
                  {review.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <div className={`font-semibold text-sm truncate ${i === idx ? "text-white" : "text-charcoal"}`}>
                    {review.name}
                  </div>
                  <div className={`text-xs truncate ${i === idx ? "text-white/60" : "text-charcoal/45"}`}>
                    {review.tour}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: animated review card */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={idx}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.4, ease }}
                className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-sand-dark/50"
              >
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <div className="flex">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-sunset" weight="fill" />
                    ))}
                  </div>
                  <span className="text-charcoal/35 text-sm">{r.date}</span>
                </div>

                <blockquote
                  className="font-serif text-charcoal/80 leading-relaxed mb-8"
                  style={{ fontSize: "clamp(1.05rem, 2vw, 1.25rem)" }}
                >
                  &ldquo;{r.text}&rdquo;
                </blockquote>

                <div className="flex items-center justify-between pt-6 border-t border-sand-dark flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-base"
                      style={{ backgroundColor: r.color }}
                      aria-hidden="true"
                    >
                      {r.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-bold text-charcoal text-sm">{r.name}</div>
                      <div className="text-charcoal/40 text-xs">{r.country}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-100 text-green-700 rounded-full text-xs font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {dict.testimonials.verified}
                    </div>
                    <div className="px-3 py-1.5 bg-charcoal/5 border border-charcoal/10 text-charcoal/50 rounded-full text-xs font-medium">
                      {r.source}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="inline-block text-xs text-forest font-semibold bg-forest/8 border border-forest/12 px-3 py-1 rounded-full">
                    {r.tour}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dot progress + auto-play bar */}
        <div className="flex flex-col items-center gap-3 mt-10">
          <div className="flex items-center gap-1.5">
            {REVIEWS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => { setDirection(i > idx ? 1 : -1); setIdx(i); }}
                aria-label={`Review ${i + 1}`}
                animate={{
                  width: i === idx ? 24 : 8,
                  backgroundColor: i === idx ? "#4B5D3A" : "#D8C9AC",
                }}
                transition={{ duration: 0.3 }}
                className="h-2 rounded-full"
              />
            ))}
          </div>

          {/* Auto-play progress bar */}
          <div className="w-28 h-0.5 rounded-full overflow-hidden bg-sand-dark/40">
            <div
              key={`${idx}-${isHovered}`}
              className={`h-full bg-forest rounded-full autoplay-bar${isHovered ? " paused" : ""}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
