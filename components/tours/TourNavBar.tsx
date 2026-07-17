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
          <>
            {/* Desktop: vertical rail in the left margin. The page content is a
                centred max-w-7xl column, so this sits in otherwise dead space
                instead of stacking a second bar under the header. Hidden below
                2xl, where the margin is too narrow to hold it without
                colliding with the content. */}
            <motion.nav
              aria-label="Tour sections"
              className="hidden 2xl:block fixed left-6 top-1/2 -translate-y-1/2 z-30"
              initial={{ x: -12, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -12, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="flex flex-col gap-1 border-l border-rule pl-4">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => scrollTo(s.id)}
                      aria-current={active === s.id ? "true" : undefined}
                      className={`group flex items-center gap-2.5 py-1.5 text-left text-sm transition-colors ${
                        active === s.id
                          ? "text-indigo font-semibold"
                          : "text-ink-muted font-medium hover:text-indigo"
                      }`}
                    >
                      {/* Saffron marker doubles as the active indicator. */}
                      <span
                        aria-hidden
                        className={`h-px transition-all ${
                          active === s.id ? "w-4 bg-saffron" : "w-2 bg-rule group-hover:w-3"
                        }`}
                      />
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.nav>

            {/* Below 2xl there is no margin to spare, so fall back to a slim
                horizontal bar tucked under the header. */}
            <motion.nav
              aria-label="Tour sections"
              className="2xl:hidden fixed top-16 lg:top-20 left-0 right-0 z-30 bg-surface/85 backdrop-blur-md border-b border-rule/70"
              initial={{ y: -48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -48, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
                  {SECTIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      aria-current={active === s.id ? "true" : undefined}
                      className={`relative shrink-0 py-3 text-sm transition-colors border-b-2 -mb-px ${
                        active === s.id
                          ? "text-indigo font-semibold border-saffron"
                          : "text-ink-muted font-medium border-transparent hover:text-indigo"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
