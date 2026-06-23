"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { Mountains, Compass, UsersThree, Leaf } from "@phosphor-icons/react";
import { SITE } from "@/lib/constants";
import type { Locale } from "@/app/[lang]/dictionaries";

const ease = [0.22, 1, 0.36, 1] as const;

const MILESTONES = [
  {
    year: "1980s",
    title: "A Father's Footsteps",
    body: "Our father was among the first generation of licensed Berber mountain guides in the High Atlas. Long before tourism existed in the region, he was leading small groups through Toubkal, Ourika, and the Aït Benhaddou valley — building trust with travellers one route at a time.",
  },
  {
    year: "2010",
    title: "The Next Generation Takes Over",
    body: "We grew up on these trails. In 2010, we formalised what had always been a family calling — registering officially and building on everything our father taught us, while expanding the range of routes and the standard of service.",
  },
  {
    year: "2015",
    title: "The Sahara Route Opens",
    body: "We extended south, building our first Erg Chebbi desert camp partnership with a Berber family near Merzouga. The 3-day Marrakech–Sahara circuit became our most-requested trip within a year.",
  },
  {
    year: "2018",
    title: "Agadir Base Established",
    body: "Demand from the Atlantic coast led us to open a second base in Agadir — unlocking the Anti-Atlas, Paradise Valley, and Souss-Massa routes for travellers who didn't want to start from Marrakech.",
  },
  {
    year: "Now",
    title: `${SITE.tourCount} Routes, One Standard`,
    body: `Today we run ${SITE.tourCount} tours across six categories and six languages. The routes have grown. The standard hasn't moved. Every trip is one we'd take our own families on — because many of them, we already have.`,
  },
];

const VALUES = [
  { Icon: Mountains, title: "Local first", body: "Guides born and raised in the landscapes they lead." },
  { Icon: Compass, title: "Honest itineraries", body: "What you see is what you get — no hidden extras, no detours to souvenir shops." },
  { Icon: UsersThree, title: "Small groups", body: "Private departures and true small groups. Never a bus tour in disguise." },
  { Icon: Leaf, title: "Leave no trace", body: "Pack-in, pack-out on every trek. We partner with local cleanup crews in the Atlas." },
];

export default function AboutStory({ lang }: { lang: Locale }) {
  void lang;

  return (
    <>
      {/* ── Origin story split ── */}
      <section className="py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Image side */}
            <motion.div
              className="relative rounded-3xl overflow-hidden min-h-[560px]"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

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
                    <div className="text-charcoal/50 text-[11px] leading-snug mt-0.5">{v.body}</div>
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
              <p className="text-sunset text-xs font-bold uppercase tracking-[0.2em] mb-5">Where we come from</p>
              <h2 className="font-serif text-charcoal font-bold leading-[1.08] mb-8" style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)" }}>
                We didn&apos;t start a tour company.<br />
                We shared what we already knew.
              </h2>

              <div className="space-y-5 text-charcoal/65 leading-relaxed">
                <p>
                  This didn&apos;t start with us. Our father was one of the first licensed Berber mountain guides in the High Atlas — leading trekkers through Toubkal and the Atlas valleys long before Morocco had a formal tourism industry. He learned by walking, and he taught us the same way.
                </p>
                <p>
                  We grew up on these trails. In 2010, we took over and built on what he gave us — adding routes, adding rigor, building a proper operation. But the principle was already there: know the land deeply, treat every guest like family, never cut corners where safety or honesty is concerned.
                </p>
                <p>
                  Over the years since, we&apos;ve expanded from Toubkal to the Sahara, from Marrakech to Agadir, from one guide to a full team of licensed professionals. Every single one of us grew up walking the routes we now lead.
                </p>
                <p className="font-semibold text-charcoal/80">
                  That&apos;s not a marketing line. It&apos;s a family legacy.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24" style={{ background: "linear-gradient(180deg, #f9f7f3 0%, #ffffff 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sunset text-xs font-bold uppercase tracking-[0.2em] mb-3">Our journey</p>
            <h2 className="font-serif text-charcoal font-bold" style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)" }}>
              How We Got Here
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-[28px] top-4 bottom-4 w-px bg-gradient-to-b from-forest/30 via-forest/20 to-transparent hidden sm:block" />

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
                    <h3 className="font-serif text-charcoal font-bold text-lg mb-2">{m.title}</h3>
                    <p className="text-charcoal/60 text-sm leading-relaxed">{m.body}</p>
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
