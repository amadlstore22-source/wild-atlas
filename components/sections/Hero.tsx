"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MagnifyingGlass, ArrowRight } from "@phosphor-icons/react";
import { motion } from "motion/react";
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
  const router = useRouter();

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
    <section className="relative min-h-[100dvh] overflow-hidden bg-charcoal">
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
          <div className="absolute inset-[-8%] hero-ken-burns">
            <Image
              src={SITE.heroPoster}
              alt="Morocco Atlas Mountains landscape"
              fill
              priority
              className="object-cover object-center"
              sizes="110vw"
            />
          </div>
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
                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" weight="bold" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={dict.hero.searchPlaceholder}
                  className="w-full pl-9 pr-4 py-3 bg-transparent text-white placeholder:text-white/40 text-sm focus:outline-none"
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
          </div>

          {/* Trust strip */}
          <motion.div
            className="mt-14 pt-6 border-t border-white/10 flex flex-wrap gap-x-8 gap-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease, delay: 1.0 }}
          >
            {[
              { value: `${SITE.tourCount}+`, label: "Adventures" },
              { value: SITE.clientCount, label: "Travellers" },
              { value: `${SITE.countryCount}+`, label: "Countries" },
              { value: "5.0", label: "Star Rating" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="flex items-baseline gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 1.05 + i * 0.08 }}
              >
                <span className="font-serif text-white text-xl font-bold">{s.value}</span>
                <span className="text-white/45 text-xs font-medium">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
