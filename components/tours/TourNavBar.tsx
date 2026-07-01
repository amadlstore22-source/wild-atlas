"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const SECTIONS = [
  { id: "tour-overview",   label: "Overview" },
  { id: "tour-itinerary",  label: "Itinerary" },
  { id: "tour-included",   label: "What's Included" },
  { id: "tour-book",       label: "Book" },
];

export default function TourNavBar() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const visObs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    visObs.observe(sentinel);

    const sectionEls = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const activeObs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    sectionEls.forEach((el) => activeObs.observe(el));

    return () => {
      visObs.disconnect();
      activeObs.disconnect();
    };
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <>
      <div ref={sentinelRef} className="h-px w-full" aria-hidden="true" />
      <AnimatePresence>
        {visible && (
          <motion.nav
            aria-label="Tour sections"
            className="fixed top-16 lg:top-20 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-b border-sand-dark shadow-sm"
            initial={{ y: -48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -48, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2.5">
                {SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      active === s.id
                        ? "bg-forest text-white"
                        : "text-charcoal/60 hover:text-forest hover:bg-sand/60"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
