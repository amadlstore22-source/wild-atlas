"use client";
import { useRef } from "react";
import { useMediaQuery, DESKTOP_MOTION_QUERY } from "@/lib/use-media-query";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
import * as m from "motion/react-m";
import { useScroll, useTransform, useReducedMotion } from "motion/react";
import { SITE, TRIPADVISOR } from "@/lib/constants";
import BrassButton from "@/components/ui/BrassButton";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface Props {
  lang: Locale;
  dict: Dictionary;
}

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero({ lang, dict }: Props) {
  const isDesktop = useMediaQuery(DESKTOP_MOTION_QUERY);
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  // Slow parallax drift of the media as you scroll away.
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const parallax = isDesktop && !reduce;

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden bg-indigo-deep">
      {/* Cinematic full-bleed media — video if provided, else slow Ken-Burns photo */}
      <m.div className="absolute inset-0 overflow-hidden" style={parallax ? { y: mediaY } : undefined}>
        {SITE.heroVideo ? (
          <video
            className="absolute inset-0 w-full h-full object-cover object-center"
            poster={SITE.heroPoster}
            autoPlay muted loop playsInline preload="none"
          >
            <source src={SITE.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <div className={`absolute inset-[-6%] ${reduce ? "" : "ken-burns"}`}>
            <Image
              src={SITE.heroPoster}
              alt="Terraced valley and stone villages of Imlil below the snow-capped High Atlas peaks, Morocco"
              fill priority sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        )}
        {/* Warm cinematic scrim — deepen left for text contrast, warm sunset glow bottom */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-deep/85 via-indigo-deep/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/80 via-transparent to-indigo-deep/25" />
      </m.div>

      {/* Content */}
      <m.div
        className="relative z-10 min-h-[100dvh] flex flex-col justify-end pb-20 sm:pb-24 pt-28"
        style={parallax ? { y: contentY, opacity: contentOpacity } : undefined}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-6 hero-rise hero-rise-eyebrow">
              <span className="eyebrow text-brass-glow">{dict.hero.eyebrow}</span>
            </div>

            {/* Headline — Cormorant, 2 lines, brass italic accent */}
            {/* CSS entrance, not Motion: this is the mobile LCP element, and
                `initial={{ opacity: 0 }}` hid it until hydration. See
                .hero-rise in globals.css. */}
            <h1
              className="font-display text-cream font-semibold leading-[1.02] mb-6 hero-rise hero-rise-h1"
              style={{ fontSize: "clamp(3rem, 7vw, 5.75rem)" }}
            >
              {dict.hero.headline1}
              <br />
              <span className="italic text-brass-glow leading-[1.1] pb-1 inline-block">{dict.hero.headline2}</span>
            </h1>

            <p className="text-cream/80 text-lg sm:text-xl leading-relaxed mb-9 max-w-lg hero-rise hero-rise-sub">
              {dict.hero.subheadline}
            </p>

            <div className="flex flex-wrap gap-3.5 items-center hero-rise hero-rise-cta">
              <BrassButton href={`/${lang}/tours`} variant="brass">
                {dict.hero.browseAll}
                <ArrowRight className="w-4 h-4" weight="bold" />
              </BrassButton>
              <a
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[2px] border border-cream/40 text-cream font-semibold hover:bg-cream/10 hover:border-cream/70 transition-all duration-300"
              >
                {dict.hero.planCustom}
              </a>
            </div>
          </div>
        </div>
      </m.div>

      {/* Minimal scroll indicator */}
      <m.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 1 }}
        aria-hidden="true"
      >
        <span className={`w-px h-12 bg-gradient-to-b from-brass-glow/70 to-transparent ${reduce ? "" : "float-soft"}`} />
      </m.div>

      {/* Trust micro-line (single small element, allowed) */}
      <div className="absolute bottom-7 right-5 sm:right-8 z-10 hidden md:flex items-center gap-2 text-cream/70 text-xs">
        <span className="text-brass-glow font-semibold">{TRIPADVISOR.rating.toFixed(1)}★</span>
        <span>{TRIPADVISOR.reviewCount} TripAdvisor reviews</span>
      </div>
    </section>
  );
}
