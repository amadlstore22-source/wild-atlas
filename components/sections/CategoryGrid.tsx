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
    <section className="tex-sand py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <AnimateInView variant="fade-up" className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="eyebrow mb-4 block">{dict.categories.subtitle.split(" — ")[0]}</span>
            <h2 className="font-display font-bold text-ink leading-[1.05]" style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)" }}>
              {dict.categories.title}
            </h2>
          </div>
          <Link
            href={`/${lang}/tours`}
            className="inline-flex items-center gap-2 text-indigo text-sm font-semibold hover:gap-3 transition-all group shrink-0"
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
              className="group relative overflow-hidden rounded-[4px] w-full h-full block ring-1 ring-rule"
            >
              <Image
                src={hero.heroImage}
                alt={hero.label}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo/25 to-transparent" />
              <div className="absolute top-0 right-0 w-36 h-36 pointer-events-none opacity-80">
                <CategoryAnimation id={hero.id} />
              </div>
              <div className="absolute inset-0 p-7 flex flex-col justify-end">
                <div className="text-cream/65 text-xs font-semibold uppercase tracking-widest mb-2">
                  {countByCategory[hero.id] ?? 0} {dict.nav.tours.toLowerCase()}
                </div>
                <h3 className="font-display text-cream font-semibold leading-tight mb-2"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                  {hero.label}
                </h3>
                <p className="text-cream/70 text-sm leading-relaxed max-w-xs mb-4">
                  {hero.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-brass-glow text-sm font-semibold group-hover:gap-2.5 transition-all duration-300">
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
                className="group relative overflow-hidden rounded-[4px] w-full h-full block ring-1 ring-rule"
              >
                <Image
                  src={tall.heroImage}
                  alt={tall.label}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/25 to-transparent" />
                <div className="absolute top-0 right-0 w-28 h-28 pointer-events-none opacity-80">
                  <CategoryAnimation id={tall.id} />
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="text-cream/65 text-xs font-semibold uppercase tracking-widest mb-1.5">
                    {countByCategory[tall.id] ?? 0} {dict.nav.tours.toLowerCase()}
                  </div>
                  <h3 className="font-display text-cream font-semibold text-xl leading-tight mb-1.5">
                    {tall.label}
                  </h3>
                  <p className="text-cream/65 text-xs leading-relaxed mb-3 line-clamp-2">
                    {tall.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-brass-glow text-xs font-semibold group-hover:gap-2 transition-all duration-300">
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
                className="group relative overflow-hidden rounded-[4px] w-full h-full block ring-1 ring-rule"
              >
                <Image
                  src={cat.heroImage}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/10 to-transparent" />
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-80">
                  <CategoryAnimation id={cat.id} />
                </div>
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="text-cream/70 text-xs font-semibold uppercase tracking-widest mb-1">
                    {countByCategory[cat.id] ?? 0} {dict.nav.tours.toLowerCase()}
                  </div>
                  <h3 className="font-display text-cream font-semibold text-lg leading-tight mb-2">
                    {cat.label}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-brass-glow text-xs font-semibold opacity-0 group-hover:opacity-100 group-hover:gap-2 transition-all duration-300">
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
