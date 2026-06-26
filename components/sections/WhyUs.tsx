"use client";
import { ShieldCheck, UsersThree, Leaf, ChatCircle, MapTrifold, Star, ArrowRight } from "@phosphor-icons/react";
import { motion } from "motion/react";
import AnimateInView from "@/components/ui/AnimateInView";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
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

  interface StatItem {
    label: string;
    static?: string;
    animate?: { to: number; suffix?: string; decimals?: number };
  }
  const STATS: StatItem[] = [
    { animate: { to: SITE.experienceYears, suffix: "+" }, label: dict.ourStory.stat1Label },
    { static: SITE.clientCount, label: dict.ourStory.stat2Label },
    { animate: { to: 5, suffix: "", decimals: 1 }, label: "Star rating" },
    { animate: { to: 100, suffix: "%" }, label: "Licensed guides" },
  ];

  return (
    <section
      className="text-white overflow-hidden"
      style={{ background: "linear-gradient(160deg, #2d3a22 0%, #3a4a2c 40%, #4B5D3A 100%)" }}
    >

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
              <p className="text-white/70 leading-relaxed mb-10 text-sm">
                {dict.whyUs.subtitle}
              </p>
            </AnimateInView>

            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="rounded-xl p-4 border border-white/15"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.08 }}
                >
                  <div className="font-serif text-white text-3xl font-bold leading-none mb-1">
                    {s.animate
                      ? <AnimatedNumber to={s.animate.to} suffix={s.animate.suffix} decimals={s.animate.decimals} />
                      : s.static
                    }
                  </div>
                  <div className="text-white/60 text-xs">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: 4 reason cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY.map((item, i) => (
              <motion.div
                key={item.title}
                className="p-6 rounded-2xl border border-white/15 transition-all duration-300 group"
                style={{ background: "rgba(255,255,255,0.07)" }}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, ease, delay: 0.05 + i * 0.1 }}
                whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.13)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0"
                     style={{ background: "rgba(139,94,60,0.25)", border: "1px solid rgba(139,94,60,0.45)" }}>
                  <item.icon className="w-5 h-5 text-[#d4956a]" weight="duotone" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{item.title}</h3>
                <p className="text-white/65 text-xs leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Bottom: process timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimateInView variant="fade-in">
          <h3 className="font-serif text-white text-2xl font-bold mb-10 text-center">
            How It Works
          </h3>
        </AnimateInView>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

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
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(139,94,60,0.22)", border: "1px solid rgba(139,94,60,0.5)" }}
                  whileInView={{ borderColor: "rgba(139,94,60,0.75)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                >
                  <span className="font-mono text-[#d4956a] text-xs font-bold">{s.num}</span>
                </motion.div>
                <div className="h-px flex-1 bg-white/12 lg:hidden" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-1.5">{s.title}</h4>
              <p className="text-white/60 text-xs leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
