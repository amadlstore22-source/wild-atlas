"use client";
import { ShieldCheck, UsersThree, Leaf, ChatCircle, MapTrifold, Star, ArrowRight } from "@phosphor-icons/react";
import { motion } from "motion/react";
import AnimateInView from "@/components/ui/AnimateInView";
import { SITE } from "@/lib/constants";
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
    { num: "01", title: "Choose", body: `Browse ${SITE.tourCount} adventures or ask us to build a custom route.` },
    { num: "02", title: "Inquire", body: `Fill the booking form or WhatsApp us. Reply within ${SITE.responseHours} hours.` },
    { num: "03", title: "Deposit", body: `Secure your spot with a PayPal deposit. ${SITE.depositDays} days free cancellation.` },
    { num: "04", title: "Go", body: "Your guide meets you. Everything else is taken care of." },
  ];

  const STATS = [
    { value: `${SITE.experienceYears}+`, label: dict.ourStory.stat1Label },
    { value: SITE.clientCount, label: dict.ourStory.stat2Label },
    { value: "5.0", label: "Star rating" },
    { value: "100%", label: "Licensed guides" },
  ];

  return (
    <section className="bg-forest text-white overflow-hidden">

      {/* Top: Why grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">

          {/* Left: headline + stats */}
          <div>
            <AnimateInView variant="fade-up">
              <h2 className="font-serif text-white font-bold leading-[1.05] mb-6"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                {dict.whyUs.title}
              </h2>
              <p className="text-white/55 leading-relaxed mb-10 text-sm">
                {dict.whyUs.subtitle}
              </p>
            </AnimateInView>

            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="bg-white/6 border border-white/8 rounded-xl p-4"
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.08 }}
                >
                  <div className="font-serif text-white text-3xl font-bold leading-none mb-1">{s.value}</div>
                  <div className="text-white/40 text-xs">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: 4 reason cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WHY.map((item, i) => (
              <motion.div
                key={item.title}
                className="p-5 rounded-2xl bg-white/5 border border-white/8 hover:border-sunset/35 hover:bg-white/8 transition-all duration-300 group"
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, ease, delay: 0.05 + i * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <div className="w-9 h-9 rounded-xl bg-sunset/12 border border-sunset/18 flex items-center justify-center mb-3.5 group-hover:bg-sunset/22 transition-colors">
                  <item.icon className="w-4.5 h-4.5 text-sunset" weight="duotone" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1.5">{item.title}</h3>
                <p className="text-white/45 text-xs leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/8" />

      {/* Bottom: process timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimateInView variant="fade-in">
          <h3 className="font-serif text-white text-2xl font-bold mb-10 text-center">
            How It Works
          </h3>
        </AnimateInView>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent pointer-events-none" />

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
                <motion.div
                  className="w-10 h-10 rounded-full bg-sunset/15 border border-sunset/30 flex items-center justify-center shrink-0"
                  whileInView={{ borderColor: "rgba(139,94,60,0.6)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                >
                  <span className="font-mono text-sunset text-xs font-bold">{s.num}</span>
                </motion.div>
                <div className="h-px flex-1 bg-white/8 lg:hidden" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-1.5">{s.title}</h4>
              <p className="text-white/40 text-xs leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
