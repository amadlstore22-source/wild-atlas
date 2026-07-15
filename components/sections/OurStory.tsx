"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { motion } from "motion/react";
import { ArchImage } from "@/components/ui/MoroccanMotifs";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

interface Props {
  dict: Dictionary;
  lang?: Locale;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function OurStory({ dict, lang = "en" }: Props) {
  return (
    <section className="py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: the ONE arch of the whole design — Lahsen / the guides,
              framed like a riad doorway. Emotional centre of the site. */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease }}
          >
            <ArchImage className="h-[520px] lg:h-[600px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1597662786834-8eea85ad4841?w=900&q=85"
                alt="Berber guides leading a trek through the High Atlas Mountains"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/45 via-transparent to-transparent" />
            </ArchImage>
          </motion.div>

          {/* Right: editorial text */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease }}
          >
            <p className="eyebrow mb-5">
              {dict.ourStory.eyebrow}
            </p>
            <h2
              className="font-bold text-ink leading-[1.08] mb-8"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.25rem)" }}
            >
              {dict.ourStory.title}
            </h2>

            <p className="text-ink-soft leading-relaxed text-lg mb-6">
              {dict.ourStory.body1}
            </p>
            <p className="text-ink-muted leading-relaxed mb-10">
              {dict.ourStory.body2}
            </p>

            <Link
              href={`/${lang}/about`}
              className="inline-flex items-center gap-2 text-indigo font-bold text-sm hover:gap-4 transition-all duration-300 group border-b-2 border-indigo/20 hover:border-indigo pb-0.5"
            >
              {dict.ourStory.meetTeam}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" weight="bold" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
