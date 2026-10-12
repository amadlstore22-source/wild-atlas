"use client";
import { Star, Users, Leaf, Shield, Mountains } from "@phosphor-icons/react";
import * as m from "motion/react-m";
import { SITE, TRIPADVISOR } from "@/lib/constants";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface Props { dict: Dictionary }

const ease = [0.22, 1, 0.36, 1] as const;

export default function TrustBar({ dict }: Props) {
  // The rating links to the listing: Clarity recorded a visitor tapping
  // "Valorado con 5.0 / 5" twice on the Spanish homepage, getting nothing,
  // and leaving (2026-10-12). Same fix as TourTrustBar under the tour hero.
  const SIGNALS: { icon: typeof Star; value: string; label: string; weight: "fill" | "duotone"; color: string; href?: string }[] = [
    { icon: Star,      value: TRIPADVISOR.rating.toFixed(1),  label: dict.trustBar.rated.replace("{rating}", TRIPADVISOR.rating.toFixed(1)), weight: "fill",    color: "text-sunset", href: TRIPADVISOR.url },
    { icon: Users,     value: dict.trustBar.maxGroupSize,     label: dict.trustBar.smallGroups, weight: "duotone", color: "text-forest" },
    { icon: Leaf,      value: "100%",                         label: dict.trustBar.ecoFriendly, weight: "duotone", color: "text-moss" },
    { icon: Shield,    value: `${SITE.depositDays} ${dict.trustBar.days}`, label: dict.trustBar.flexible, weight: "duotone", color: "text-forest" },
    { icon: Mountains, value: `${SITE.guidingHeritageYears}+ ${dict.trustBar.years}`, label: dict.trustBar.certified, weight: "duotone", color: "text-sunset" },
  ];

  return (
    <div className="border-b border-sand-dark backdrop-blur-sm bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-stretch divide-x divide-sand-dark">
          {SIGNALS.map((s, i) => {
            const body = (
              <>
                <s.icon className={`w-5 h-5 shrink-0 ${s.color}`} weight={s.weight} />
                <div>
                  <div className="font-bold text-charcoal text-sm leading-none">{s.value}</div>
                  <div className={`text-xs mt-0.5 leading-tight ${s.href ? "text-indigo underline underline-offset-2 group-hover:text-indigo-deep" : "text-ink-muted"}`}>{s.label}</div>
                </div>
              </>
            );
            return (
              <m.div
                key={s.label}
                className="flex items-center gap-3 px-6 py-4 flex-1 min-w-[160px] group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.07 }}
              >
                {s.href ? (
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                    {body}
                  </a>
                ) : (
                  body
                )}
              </m.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
