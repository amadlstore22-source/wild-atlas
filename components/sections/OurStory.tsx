"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { motion } from "motion/react";
import { SITE } from "@/lib/constants";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
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

          {/* Left: image */}
          <motion.div
            className="relative rounded-3xl overflow-hidden min-h-[560px]"
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease }}
          >
            <Image
              src="https://images.unsplash.com/photo-1597662786834-8eea85ad4841?w=900&q=85"
              alt="Berber guides leading a trek through the High Atlas Mountains"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

            {/* Floating stat */}
            <motion.div
              className="absolute bottom-6 left-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease, delay: 0.45 }}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-5 shadow-2xl">
                <div className="font-serif text-forest text-4xl font-bold leading-none">
                  <AnimatedNumber to={SITE.experienceYears} suffix="+" duration={1.8} />
                </div>
                <div className="text-charcoal/55 text-sm mt-1">Years guiding the Atlas</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: editorial text */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease }}
          >
            <p className="text-sunset text-xs font-bold uppercase tracking-[0.2em] mb-5">
              {dict.ourStory.eyebrow}
            </p>
            <h2
              className="font-serif text-charcoal font-bold leading-[1.05] mb-8"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)" }}
            >
              {dict.ourStory.title}
            </h2>

            <p className="text-charcoal/65 leading-relaxed text-lg mb-6">
              {dict.ourStory.body1}
            </p>
            <p className="text-charcoal/55 leading-relaxed mb-10">
              {dict.ourStory.body2}
            </p>

            <Link
              href={`/${lang}/about`}
              className="inline-flex items-center gap-2 text-forest font-bold text-sm hover:gap-4 transition-all duration-300 group border-b-2 border-forest/20 hover:border-forest pb-0.5"
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
