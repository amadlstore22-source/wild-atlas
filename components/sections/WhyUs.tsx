"use client";
import { UsersThree, Leaf, ChatCircle, MapTrifold } from "@phosphor-icons/react";
import { motion } from "motion/react";
import AnimateInView from "@/components/ui/AnimateInView";
import { SITE } from "@/lib/constants";
import { STATS } from "@/lib/stats";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface Props { dict: Dictionary }

const ease = [0.22, 1, 0.36, 1] as const;

export default function WhyUs({ dict }: Props) {
  const WHY = [
    { icon: MapTrifold, title: dict.whyUs.certified.title, body: dict.whyUs.certified.desc },
    { icon: UsersThree, title: dict.whyUs.smallGroups.title, body: dict.whyUs.smallGroups.desc },
    { icon: Leaf, title: dict.whyUs.eco.title, body: dict.whyUs.eco.desc },
    { icon: ChatCircle, title: dict.whyUs.responsive.title, body: dict.whyUs.responsive.desc.replace("{hours}", String(SITE.responseHours)) },
  ];

  const STEPS = [
    { num: "01", title: "Choose", body: `Browse ${STATS.tourCount} adventures or ask us to build a custom route.` },
    { num: "02", title: "Inquire", body: `Fill the enquiry form or WhatsApp us. Reply within ${SITE.responseHours} hours.` },
    { num: "03", title: "Deposit", body: `Secure your spot with a PayPal deposit. ${SITE.depositDays} days free cancellation.` },
    { num: "04", title: "Go", body: "Your guide meets you. Everything else is taken care of." },
  ];

  return (
    <section className="tex-indigo text-cream tadelakt overflow-hidden">

      {/* Top: Why grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 md:pt-32 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

          {/* Left: headline */}
          <div>
            <AnimateInView variant="fade-up">
              <p className="eyebrow mb-4">
                {dict.whyUs.eyebrow}
              </p>
              <h2 className="font-bold text-cream leading-[1.08] tracking-[-0.015em] mb-6"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
                {dict.whyUs.title}
              </h2>
              <p className="text-cream/75 leading-relaxed">
                {dict.whyUs.subtitle}
              </p>
            </AnimateInView>
          </div>

          {/* Right: 4 reason cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY.map((item, i) => (
              <motion.div
                key={item.title}
                className="p-6 rounded-[3px] border border-saffron/20 transition-all duration-300 group"
                style={{ background: "rgba(255,255,255,0.06)" }}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, ease, delay: 0.05 + i * 0.1 }}
                whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.11)" }}
              >
                <div className="w-10 h-10 rounded-[3px] bg-saffron/15 border border-saffron/35 flex items-center justify-center mb-4 shrink-0">
                  <item.icon className="w-5 h-5 text-brass-glow" weight="duotone" />
                </div>
                <h3 className="font-semibold text-cream text-sm mb-2">{item.title}</h3>
                <p className="text-cream/70 text-xs leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-saffron/15" />

      {/* Bottom: process timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimateInView variant="fade-in">
          <h3 className="font-display text-cream text-2xl font-bold mb-10 text-center">
            How It Works
          </h3>
        </AnimateInView>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-saffron/30 to-transparent pointer-events-none" />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-[3px] bg-saffron/15 border border-saffron/40 flex items-center justify-center shrink-0">
                  <span className="font-body text-brass-glow text-xs font-bold">{s.num}</span>
                </div>
                <div className="h-px flex-1 bg-white/12 lg:hidden" />
              </div>
              <h4 className="font-semibold text-cream text-sm mb-1.5">{s.title}</h4>
              <p className="text-cream/65 text-xs leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
