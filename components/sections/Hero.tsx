"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MagnifyingGlass, ArrowRight } from "@phosphor-icons/react";
import { motion, useScroll, useTransform } from "motion/react";
import { CATEGORIES } from "@/lib/tours";
import { SITE } from "@/lib/constants";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface Props {
  lang: Locale;
  dict: Dictionary;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({ lang, dict }: Props) {
  const [search, setSearch] = useState("");
  const [origin, setOrigin] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const ORIGIN_TABS = [
    { label: dict.hero.allTours, value: "" },
    { label: dict.hero.fromMarrakech, value: "marrakech" },
    { label: dict.hero.fromAgadir, value: "agadir" },
  ];

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (origin) params.set("origin", origin);
    router.push(`/${lang}/tours${params.toString() ? "?" + params.toString() : ""}`);
  }

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-hidden bg-charcoal">
      {/* Full-bleed background */}
      <div className="absolute inset-0 overflow-hidden">
        {SITE.heroVideo ? (
          <video
            className="absolute inset-0 w-full h-full object-cover object-center"
            poster={SITE.heroPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          >
            <source src={SITE.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <motion.div
            className="absolute inset-[-10%]"
            style={isDesktop ? { y: imgY, scale: imgScale } : undefined}
          >
            <Image
              src={SITE.heroPoster}
              alt="Morocco Atlas Mountains landscape"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col justify-end pb-16 pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">

            {/* Headline */}
            <motion.h1
              className="font-serif text-white font-bold leading-[1.05] mb-5"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)" }}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.1 }}
            >
              {dict.hero.headline1}
              <br />
              <span className="text-sunset italic">{dict.hero.headline2}</span>
            </motion.h1>

            <motion.p
              className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.25 }}
            >
              {dict.hero.subheadline}
            </motion.p>

            {/* Search bar */}
            <motion.form
              onSubmit={handleSearch}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1.5 mb-6 flex flex-col sm:flex-row gap-1.5 max-w-xl shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
            >
              <div className="relative sm:w-44 shrink-0">
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full h-full px-4 py-3 rounded-xl bg-white/12 text-white text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:bg-white/20 transition-colors"
                >
                  {ORIGIN_TABS.map((o) => (
                    <option key={o.value} value={o.value} className="text-charcoal bg-white">
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="h-px sm:h-auto sm:w-px bg-white/15 shrink-0" />

              <div className="relative flex-1">
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/55" weight="bold" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={dict.hero.searchPlaceholder}
                  className="w-full pl-9 pr-4 py-3 bg-transparent text-white placeholder:text-white/55 text-sm focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-sunset text-white font-bold text-sm hover:bg-orange-500 active:scale-[0.98] transition-all shrink-0"
              >
                {dict.hero.searchBtn}
              </button>
            </motion.form>

            {/* Category pills */}
            <motion.div
              className="flex flex-wrap gap-2 mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.55 }}
            >
              {CATEGORIES.slice(0, 5).map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease, delay: 0.6 + i * 0.07 }}
                >
                  <Link
                    href={`/${lang}/categories/${cat.id}`}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/85 text-xs font-medium hover:bg-white/18 hover:border-white/30 active:scale-[0.97] transition-all"
                  >
                    {cat.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 items-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.75 }}
            >
              <Link
                href={`/${lang}/tours`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-sunset text-white font-bold text-sm hover:bg-orange-500 active:scale-[0.98] transition-all shadow-xl shadow-sunset/25"
              >
                {dict.hero.browseAll}
                <ArrowRight className="w-4 h-4" weight="bold" />
              </Link>
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/12 hover:border-white/50 transition-all"
              >
                {dict.hero.planCustom}
              </Link>
            </motion.div>

            {/* Star trust line */}
            <motion.div
              className="flex flex-wrap items-center gap-2 mt-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease, delay: 0.9 }}
            >
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map((i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-[#FFB800]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
                <span className="text-white/90 text-xs font-bold ml-1.5">4.7</span>
              </div>
              <span className="text-white/25 text-xs">·</span>
              <span className="text-white/60 text-xs">{SITE.clientCount} happy travelers</span>
              <span className="text-white/25 text-xs">·</span>
              <span className="text-white/60 text-xs">Some of Morocco&apos;s finest guides</span>
              <span className="text-white/25 text-xs">·</span>
              <span className="text-white/60 text-xs">No hidden fees</span>
            </motion.div>
          </div>

          {/* Trust strip */}
          <motion.div
            className="mt-14 pt-6 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 1.0 }}
          >
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { value: String(SITE.tourCount), label: "Tours & Experiences" },
                { value: SITE.clientCount, label: "Travellers" },
                { value: `${SITE.experienceYears}+ yrs`, label: "Guiding Heritage" },
                { value: "4.7", label: "Star Rating" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  className="flex items-baseline gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 1.05 + i * 0.08 }}
                >
                  <span className="font-serif text-white text-xl font-bold">{s.value}</span>
                  <span className="text-white/65 text-xs font-medium">{s.label}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-white/30 text-[10px] mt-3 font-medium tracking-wide">
              Tour count and availability vary by season and conditions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
