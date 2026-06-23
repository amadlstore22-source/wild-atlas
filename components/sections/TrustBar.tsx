import { Star, Users, Leaf, Globe, Certificate } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/lib/constants";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface Props { dict: Dictionary }

export default function TrustBar({ dict }: Props) {
  const SIGNALS = [
    {
      icon: Star,
      value: "5.0",
      label: "5-Star Rated",
      weight: "fill" as const,
      color: "text-sunset",
    },
    {
      icon: Users,
      value: "Private",
      label: dict.trustBar.smallGroups,
      weight: "duotone" as const,
      color: "text-forest",
    },
    {
      icon: Leaf,
      value: "100%",
      label: dict.trustBar.ecoFriendly,
      weight: "duotone" as const,
      color: "text-moss",
    },
    {
      icon: Globe,
      value: `${SITE.countryCount}+`,
      label: dict.trustBar.flexible,
      weight: "duotone" as const,
      color: "text-sky",
    },
    {
      icon: Certificate,
      value: `${SITE.experienceYears}+`,
      label: dict.trustBar.certified,
      weight: "duotone" as const,
      color: "text-forest",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-sand/40 via-white to-sand/30 border-b border-sand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-stretch divide-x divide-sand-dark">
          {SIGNALS.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 px-6 py-4 flex-1 min-w-[160px] group"
            >
              <s.icon className={`w-5 h-5 shrink-0 ${s.color}`} weight={s.weight} />
              <div>
                <div className="font-bold text-charcoal text-sm leading-none">{s.value}</div>
                <div className="text-charcoal/45 text-xs mt-0.5 leading-tight">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
