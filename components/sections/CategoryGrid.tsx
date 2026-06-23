"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
import { motion } from "motion/react";
import AnimateInView from "@/components/ui/AnimateInView";
import CategoryAnimation from "@/components/sections/CategoryAnimation";
import { CATEGORIES, TOURS } from "@/lib/tours";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface Props {
  dict: Dictionary;
  lang?: Locale;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function CategoryGrid({ dict, lang = "en" }: Props) {
  const countByCategory = CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
    acc[cat.id] = TOURS.filter((t) => t.category === cat.id).length;
    return acc;
  }, {});

  const visibleCategories = CATEGORIES.filter((cat) => (countByCategory[cat.id] ?? 0) > 0);
  if (visibleCategories.length === 0) return null;

  const [hero, tall, ...rest] = visibleCategories;

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <AnimateInView variant="fade-up" className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-serif text-charcoal font-bold"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
              {dict.categories.subtitle.split(" — ")[0]}
            </h2>
            <p className="text-charcoal/50 mt-2 max-w-sm text-sm leading-relaxed">
              {dict.categories.title}
            </p>
          </div>
          <Link
            href={`/${lang}/tours`}
            className="inline-flex items-center gap-2 text-forest text-sm font-semibold hover:gap-3 transition-all group shrink-0"
          >
            {dict.featuredTours.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" weight="bold" />
          </Link>
        </AnimateInView>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[280px] lg:auto-rows-[300px]">

          {/* Cell 1: Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease, delay: 0 }}
            className="sm:col-span-2 lg:col-span-2"
          >
            <Link
              href={`/${lang}/categories/${hero.id}`}
              className="group relative overflow-hidden rounded-2xl w-full h-full block"
            >
              <Image
                src={hero.heroImage}
                alt={hero.label}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-forest/25 to-transparent" />
              {/* Centered animation illustration */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-44 h-44 opacity-90 drop-shadow-lg">
                  <CategoryAnimation id={hero.id} />
                </div>
              </div>
              <div className="absolute inset-0 p-7 flex flex-col justify-end">
                <div className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
                  {countByCategory[hero.id] ?? 0} {dict.nav.tours.toLowerCase()}
                </div>
                <h3 className="font-serif text-white font-bold leading-tight mb-2"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                  {hero.label}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed max-w-xs mb-4">
                  {hero.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sunset text-sm font-bold group-hover:gap-2.5 transition-all duration-300">
                  {dict.common.learnMore} <ArrowRight className="w-3.5 h-3.5" weight="bold" />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Cell 2: Tall right */}
          {tall && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className="lg:row-span-2"
            >
              <Link
                href={`/${lang}/categories/${tall.id}`}
                className="group relative overflow-hidden rounded-2xl w-full h-full block"
              >
                <Image
                  src={tall.heroImage}
                  alt={tall.label}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-36 h-36 opacity-90 drop-shadow-lg">
                    <CategoryAnimation id={tall.id} />
                  </div>
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1.5">
                    {countByCategory[tall.id] ?? 0} {dict.nav.tours.toLowerCase()}
                  </div>
                  <h3 className="font-serif text-white font-bold text-xl leading-tight mb-1.5">
                    {tall.label}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-3 line-clamp-2">
                    {tall.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sunset text-xs font-bold group-hover:gap-2 transition-all duration-300">
                    {dict.common.learnMore} <ArrowRight className="w-3 h-3" weight="bold" />
                  </span>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Cells 3-5: smaller bottom row */}
          {rest.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.65, ease, delay: 0.15 + i * 0.08 }}
            >
              <Link
                href={`/${lang}/categories/${cat.id}`}
                className="group relative overflow-hidden rounded-2xl w-full h-full block"
              >
                <Image
                  src={cat.heroImage}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-12">
                  <div className="w-32 h-32 opacity-90 drop-shadow-lg">
                    <CategoryAnimation id={cat.id} />
                  </div>
                </div>
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
                    {countByCategory[cat.id] ?? 0} {dict.nav.tours.toLowerCase()}
                  </div>
                  <h3 className="font-serif text-white font-bold text-lg leading-tight mb-2">
                    {cat.label}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sunset text-xs font-bold opacity-0 group-hover:opacity-100 group-hover:gap-2 transition-all duration-300">
                    {dict.common.learnMore} <ArrowRight className="w-3 h-3" weight="bold" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
