"use client";
import { Star, Users, Leaf, Globe, Certificate } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { SITE } from "@/lib/constants";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface Props { dict: Dictionary }

const ease = [0.22, 1, 0.36, 1] as const;

export default function TrustBar({ dict }: Props) {
  const SIGNALS = [
    { icon: Star,        value: "4.7",              label: "Rated 4.7 / 5",          weight: "fill" as const,    color: "text-sunset" },
    { icon: Users,       value: "Private",           label: dict.trustBar.smallGroups, weight: "duotone" as const, color: "text-forest" },
    { icon: Leaf,        value: "100%",              label: dict.trustBar.ecoFriendly, weight: "duotone" as const, color: "text-moss" },
    { icon: Globe,       value: SITE.countryCount,       label: dict.trustBar.flexible, weight: "duotone" as const, color: "text-sky" },
    { icon: Certificate, value: `${SITE.experienceYears}+`, label: dict.trustBar.certified, weight: "duotone" as const, color: "text-forest" },
  ];

  return (
    <div className="border-b border-sand-dark backdrop-blur-sm bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-stretch divide-x divide-sand-dark">
          {SIGNALS.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex items-center gap-3 px-6 py-4 flex-1 min-w-[160px] group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.07 }}
            >
              <s.icon className={`w-5 h-5 shrink-0 ${s.color}`} weight={s.weight} />
              <div>
                <div className="font-bold text-charcoal text-sm leading-none">{s.value}</div>
                <div className="text-charcoal/45 text-xs mt-0.5 leading-tight">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
