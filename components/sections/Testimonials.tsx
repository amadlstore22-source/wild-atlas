"use client";
import { useState, useEffect, useCallback } from "react";
import { Star, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

const REVIEWS = [
  {
    name: "Katherine L.",
    country: "United Kingdom",
    flag: "GB",
    rating: 5,
    tour: "Toubkal Summit Trek",
    date: "March 2025",
    text: "I cannot recommend this experience highly enough. From the moment our guide met us in Imlil, it was clear we were in expert hands. He knew every stone of that mountain and shared the history of each Berber village with such warmth and pride. Standing on the roof of North Africa at sunrise was the single most powerful moment of my life.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&q=80",
  },
  {
    name: "Marco B.",
    country: "Italy",
    flag: "IT",
    rating: 5,
    tour: "3-Day Sahara Desert Tour",
    date: "November 2024",
    text: "I have travelled to more than 40 countries and the Sahara night was the most extraordinary of all. The silence out there is unlike anything you have ever experienced. We rode camels into Erg Chebbi as the sun turned the dunes to liquid gold. Perfectly organised from start to finish.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&q=80",
  },
  {
    name: "Emily C.",
    country: "United States",
    flag: "US",
    rating: 5,
    tour: "Marrakech Medina Cultural Tour",
    date: "February 2025",
    text: "I had been to Marrakech twice before, always overwhelmed in the medina. This tour changed everything. Our guide took us through the real Marrakech — tea with a spice merchant whose family has had the same stall for 200 years, the tanneries from a private rooftop, lunch in a hidden riad courtyard. Extraordinary.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&q=80",
  },
  {
    name: "Thomas M.",
    country: "Germany",
    flag: "DE",
    rating: 5,
    tour: "Ourika Valley Day Hike",
    date: "April 2025",
    text: "My family, including my 65-year-old mother, had the most perfect day imaginable. The Ourika Valley is stunningly beautiful and our guide had a wonderful talent for reading the pace of the group. The Berber family who hosted our lunch were so generous. We are coming back next year.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&q=80",
  },
  {
    name: "Amelia S.",
    country: "Brazil",
    flag: "BR",
    rating: 5,
    tour: "Mgoun Massif Traverse",
    date: "October 2024",
    text: "Seven days in the Mgoun and I feel like I lived a lifetime. We walked through landscapes that felt completely untouched — gorges of burning red rock, high passes where the wind howled, villages where children had never seen a tourist. If you want a trek that takes you off the tourist trail completely, this is it.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=160&q=80",
  },
];

interface Props { dict: Dictionary }

export default function Testimonials({ dict }: Props) {
  const [idx, setIdx] = useState(0);
  const r = REVIEWS[idx];

  const prev = useCallback(() => setIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length), []);
  const next = useCallback(() => setIdx((i) => (i + 1) % REVIEWS.length), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <section className="py-24 bg-sand overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <h2 className="font-serif text-charcoal font-bold reveal-up"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              {dict.testimonials.title}
            </h2>
            <p className="text-charcoal/45 text-sm mt-2 max-w-xs">
              {dict.testimonials.subtitle}
            </p>
          </div>
          {/* Navigation controls top-right */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-sand-dark bg-white flex items-center justify-center hover:border-forest hover:text-forest transition-all text-charcoal/50"
              aria-label="Previous review"
            >
              <ArrowLeft className="w-4 h-4" weight="bold" />
            </button>
            <span className="text-xs text-charcoal/35 w-8 text-center">{idx + 1}/{REVIEWS.length}</span>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-sand-dark bg-white flex items-center justify-center hover:border-forest hover:text-forest transition-all text-charcoal/50"
              aria-label="Next review"
            >
              <ArrowRight className="w-4 h-4" weight="bold" />
            </button>
          </div>
        </div>

        {/* Main review — horizontal 2-col */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">

          {/* Left: reviewer list */}
          <div className="space-y-2">
            {REVIEWS.map((review, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                  i === idx
                    ? "bg-forest text-white shadow-lg shadow-forest/20"
                    : "bg-white/60 hover:bg-white text-charcoal border border-transparent hover:border-sand-dark"
                }`}
              >
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <div className={`font-semibold text-sm truncate ${i === idx ? "text-white" : "text-charcoal"}`}>
                    {review.name}
                  </div>
                  <div className={`text-xs truncate ${i === idx ? "text-white/60" : "text-charcoal/45"}`}>
                    {review.tour}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: large pull-quote */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-sand-dark/50">
            {/* Stars + date */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-sunset" weight="fill" />
                ))}
              </div>
              <span className="text-charcoal/35 text-sm">{r.date}</span>
            </div>

            {/* The quote — magazine-sized */}
            <blockquote
              className="font-serif text-charcoal/80 leading-relaxed mb-8"
              style={{ fontSize: "clamp(1.05rem, 2vw, 1.25rem)" }}
            >
              &ldquo;{r.text}&rdquo;
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center justify-between pt-6 border-t border-sand-dark flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-11 h-11 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="font-bold text-charcoal text-sm">{r.name}</div>
                  <div className="text-charcoal/40 text-xs">{r.country}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-100 text-green-700 rounded-full text-xs font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {dict.testimonials.verified}
              </div>
            </div>

            {/* Tour chip */}
            <div className="mt-4">
              <span className="inline-block text-xs text-forest font-semibold bg-forest/8 border border-forest/12 px-3 py-1 rounded-full">
                {r.tour}
              </span>
            </div>
          </div>
        </div>

        {/* Dot progress */}
        <div className="flex items-center justify-center gap-1.5 mt-10">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Review ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === idx ? "w-6 h-2 bg-forest" : "w-2 h-2 bg-sand-dark hover:bg-charcoal/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
