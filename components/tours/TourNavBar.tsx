"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Dictionary } from "@/app/[lang]/dictionaries";

export default function TourNavBar({ dict }: { dict: Dictionary }) {
  const SECTIONS = [
    { id: "tour-overview",   label: dict.tourDetail.overview },
    { id: "tour-itinerary",  label: dict.tourDetail.itinerary },
    { id: "tour-included",   label: dict.tourDetail.whatsIncluded },
    { id: "tour-book",       label: dict.tourDetail.book },
  ];
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");
  // Like the WhatsApp button: the left rail slides away when the user stops
  // scrolling and returns the moment they scroll again.
  const [scrolling, setScrolling] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolling(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setScrolling(false), 1800);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

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
            {/* Desktop: a compact rail flush to the LEFT EDGE of the screen,
                vertically centred. The content column is centred (max-w-7xl),
                so the far-left edge is always empty on desktop — the rail can
                never collide with page content. Flat right side + left-flush
                rounding makes it read as anchored to the edge, not floating. */}
            <motion.nav
              aria-label="Tour sections"
              className={`hidden xl:block fixed left-0 top-1/2 z-30 -translate-y-1/2 ${scrolling ? "" : "pointer-events-none"}`}
              initial={{ opacity: 0, x: -100 }}
              // Slide off the left edge + fade when the user stops scrolling,
              // then hover brings it fully back for interaction.
              animate={{ opacity: scrolling ? 0.72 : 0, x: scrolling ? 0 : -100 }}
              whileHover={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="flex flex-col gap-0.5 rounded-r-[6px] border-y border-r border-rule/70 bg-surface-raised/80 backdrop-blur-md py-2.5 pl-3 pr-2.5 shadow-[6px_8px_30px_rgba(31,26,22,0.12)]">
                {SECTIONS.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <li key={s.id}>
                      <button
                        onClick={() => scrollTo(s.id)}
                        aria-current={isActive ? "true" : undefined}
                        className={`group relative flex w-full items-center gap-2.5 rounded-[3px] py-2 pl-2.5 pr-4 text-left text-sm transition-colors ${
                          isActive
                            ? "text-indigo font-semibold"
                            : "text-ink-muted font-medium hover:text-indigo"
                        }`}
                      >
                        {/* Saffron tick marks the active section. */}
                        <span
                          aria-hidden
                          className={`h-0.5 rounded-full transition-all ${
                            isActive ? "w-4 bg-saffron" : "w-2 bg-rule group-hover:w-3 group-hover:bg-ink-faint"
                          }`}
                        />
                        {s.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>

            {/* Below xl there is no room for a left rail, so fall back to a slim
                horizontal bar tucked under the header. */}
            <motion.nav
              aria-label="Tour sections"
              className="xl:hidden fixed top-16 lg:top-20 left-0 right-0 z-30 bg-surface/85 backdrop-blur-md border-b border-rule/70"
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
