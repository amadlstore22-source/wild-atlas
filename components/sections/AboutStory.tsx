"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { Mountains, Compass, UsersThree, Leaf } from "@phosphor-icons/react";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

const ease = [0.22, 1, 0.36, 1] as const;

function milestones(tourCount: number, dict: Dictionary) { return [
  { year: dict.about.milestone1Year, title: dict.about.milestone1Title, body: dict.about.milestone1Body },
  { year: dict.about.milestone2Year, title: dict.about.milestone2Title, body: dict.about.milestone2Body },
  { year: dict.about.milestone3Year, title: dict.about.milestone3Title, body: dict.about.milestone3Body },
  { year: dict.about.milestone4Year, title: dict.about.milestone4Title, body: dict.about.milestone4Body },
  {
    year: dict.about.milestone5Year,
    title: dict.about.milestone5Title.replace("{tourCount}", String(tourCount)),
    body: dict.about.milestone5Body.replaceAll("{tourCount}", String(tourCount)),
  },
]; }

function values(dict: Dictionary) { return [
  { Icon: Mountains, title: dict.about.valueLocalTitle, body: dict.about.valueLocalBody },
  { Icon: Compass, title: dict.about.valueHonestTitle, body: dict.about.valueHonestBody },
  { Icon: UsersThree, title: dict.about.valueGroupsTitle, body: dict.about.valueGroupsBody },
  { Icon: Leaf, title: dict.about.valueTraceTitle, body: dict.about.valueTraceBody },
]; }

export default function AboutStory({ lang, tourCount, dict }: { lang: Locale; tourCount: number; dict: Dictionary }) {
  void lang;
  const MILESTONES = milestones(tourCount, dict);
  const VALUES = values(dict);

  return (
    <>
      {/* ── Origin story split ── */}
      <section className="py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image side */}
            <motion.div
              className="relative rounded-[4px] overflow-hidden min-h-[560px]"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease }}
            >
              <Image
                src="https://images.unsplash.com/photo-1597662786834-8eea85ad4841?w=900&q=85"
                alt="Berber guide leading a group through the High Atlas Mountains"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/75 via-indigo-deep/12 to-transparent" />

              {/* Floating value cards */}
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3">
                {VALUES.map((v, i) => (
                  <motion.div
                    key={v.title}
                    className="bg-white/92 backdrop-blur-sm rounded-xl p-4 shadow-xl"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.08 }}
                  >
                    <v.Icon className="w-5 h-5 text-forest mb-1.5" weight="duotone" />
                    <div className="font-semibold text-charcoal text-xs leading-tight">{v.title}</div>
                    <div className="text-ink-soft text-[11px] leading-snug mt-0.5">{v.body}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="text-brass-deep text-xs font-bold uppercase tracking-[0.2em] mb-5">{dict.about.storyEyebrow}</p>
              <h2 className="font-display text-charcoal font-bold leading-[1.08] mb-8" style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)" }}>
                {dict.about.storyTitle1}<br />
                {dict.about.storyTitle2}
              </h2>

              <div className="space-y-5 text-ink-soft leading-relaxed">
                <p>{dict.about.storyBody1}</p>
                <p>{dict.about.storyBody2}</p>
                <p>{dict.about.storyBody3}</p>
                <p className="font-semibold text-charcoal/80">{dict.about.storyBody4}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24" style={{ background: "linear-gradient(180deg, #f9f7f3 0%, #ffffff 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brass-deep text-xs font-bold uppercase tracking-[0.2em] mb-3">{dict.about.journeyEyebrow}</p>
            <h2 className="font-display text-charcoal font-bold" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}>
              {dict.about.journeyTitle}
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line — draws downward as timeline enters view */}
            <motion.div
              className="absolute left-[28px] top-4 bottom-4 w-px bg-gradient-to-b from-indigo/30 via-forest/20 to-transparent hidden sm:block origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="space-y-10">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  className="flex gap-8 items-start"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, ease, delay: i * 0.07 }}
                >
                  {/* Year bubble */}
                  <div className="shrink-0 w-14 h-14 rounded-full bg-forest flex items-center justify-center shadow-lg shadow-forest/20 z-10">
                    <span className="font-mono text-white text-[10px] font-bold text-center leading-tight px-1">{m.year}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2 pb-2">
                    <h3 className="font-display text-charcoal font-bold text-lg mb-2">{m.title}</h3>
                    <p className="text-ink-soft text-sm leading-relaxed">{m.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
