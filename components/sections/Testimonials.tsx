"use client";
import { Star } from "@phosphor-icons/react";
import { motion } from "motion/react";
import AnimateInView from "@/components/ui/AnimateInView";
import TripAdvisorBadge from "@/components/ui/TripAdvisorBadge";
import { TRIPADVISOR } from "@/lib/constants";
import type { Dictionary } from "@/app/[lang]/dictionaries";

/** Three full reviews shown at once — let people actually read them, rather than
 *  hiding six behind a fiddly carousel. Avatar tints drawn from the cold palette. */
const REVIEWS = [
  {
    name: "Katherine L.",
    country: "United Kingdom",
    rating: 5,
    tour: "Toubkal Summit Trek",
    date: "March 2025",
    text: "From the moment our guide met us in Imlil, it was clear we were in expert hands. He knew every stone of that mountain and shared the history of each Berber village with such warmth and pride. Standing on the roof of North Africa at sunrise was the single most powerful moment of my life.",
    color: "#2B3A67",
  },
  {
    name: "Marco B.",
    country: "Italy",
    rating: 5,
    tour: "3-Day Sahara Desert Tour",
    date: "November 2024",
    text: "I have travelled to more than 40 countries and the Sahara night was the most extraordinary of all. The silence out there is unlike anything you have ever experienced. We rode camels into Erg Chebbi as the sun turned the dunes to liquid gold. Perfectly organised from start to finish.",
    color: "#C97B2B",
  },
  {
    name: "Emily C.",
    country: "United States",
    rating: 5,
    tour: "Marrakech Medina Cultural Tour",
    date: "February 2025",
    text: "I had been to Marrakech twice before, always overwhelmed in the medina. This tour changed everything. Tea with a spice merchant whose family has had the same stall for 200 years, the tanneries from a private rooftop, lunch in a hidden riad courtyard. Extraordinary.",
    color: "#1B2645",
  },
];

interface Props { dict: Dictionary }

export default function Testimonials({ dict }: Props) {
  return (
    <section className="bg-surface tadelakt overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimateInView variant="fade-up" className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">{dict.testimonials.eyebrow}</p>
          <h2 className="font-bold text-ink" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
            {dict.testimonials.title}
          </h2>
          <p className="text-ink-muted mt-3">{dict.testimonials.subtitle}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <TripAdvisorBadge variant="full" />
            <a
              href={TRIPADVISOR.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-indigo underline underline-offset-4 decoration-indigo/30 hover:decoration-indigo transition-colors"
            >
              Read all {TRIPADVISOR.reviewCount} reviews →
            </a>
          </div>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.blockquote
              key={r.name}
              className="bg-card rounded-[4px] p-7 border border-rule flex flex-col shadow-[var(--shadow-riad-sm)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: r.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-saffron" weight="fill" />
                  ))}
                </div>
                <span className="text-ink-muted text-xs">{r.date}</span>
              </div>

              <p className="font-display text-ink/85 leading-relaxed mb-6 text-[1.05rem] flex-1">
                &ldquo;{r.text}&rdquo;
              </p>

              <footer className="flex items-center gap-3 pt-5 border-t border-rule">
                <div
                  className="w-10 h-10 rounded-[3px] shrink-0 flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: r.color }}
                  aria-hidden="true"
                >
                  {r.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-ink text-sm truncate">{r.name}</div>
                  <div className="text-ink-muted text-xs truncate">{r.country} · {r.tour}</div>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
