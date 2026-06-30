import { Compass, CalendarCheck, Backpack } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface Props {
  dict: Dictionary;
}

const STEPS = [
  { icon: Compass, color: "text-forest", bg: "bg-forest/10" },
  { icon: CalendarCheck, color: "text-atlas-clay", bg: "bg-atlas-clay/10" },
  { icon: Backpack, color: "text-mint-tea", bg: "bg-mint-tea/10" },
] as const;

export default function HowItWorks({ dict }: Props) {
  const steps = [
    { title: dict.howItWorks.step1Title, desc: dict.howItWorks.step1Desc },
    { title: dict.howItWorks.step2Title, desc: dict.howItWorks.step2Desc },
    { title: dict.howItWorks.step3Title, desc: dict.howItWorks.step3Desc },
  ];

  return (
    <section className="py-20 bg-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sunset text-xs font-bold uppercase tracking-widest mb-3">
            {dict.howItWorks.eyebrow}
          </p>
          <h2 className="font-serif text-charcoal font-bold text-3xl sm:text-4xl">
            {dict.howItWorks.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
          {/* Connector line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-9 left-[calc(33.333%+0.5rem)] right-[calc(33.333%+0.5rem)] h-px bg-gradient-to-r from-sand via-sand-dark to-sand"
          />

          {steps.map((step, i) => {
            const { icon: Icon, color, bg } = STEPS[i];
            return (
              <div key={i} className="flex flex-col items-center text-center relative">
                <div
                  className={`w-18 h-18 rounded-2xl ${bg} flex items-center justify-center mb-5 relative z-10 ring-4 ring-bone`}
                >
                  <Icon className={`w-8 h-8 ${color}`} weight="duotone" />
                </div>
                <span className="absolute -top-2 -right-2 md:right-auto md:left-[calc(50%+2rem)] text-7xl font-bold text-charcoal/5 select-none leading-none pointer-events-none">
                  {i + 1}
                </span>
                <h3 className="font-serif text-charcoal font-bold text-xl mb-3">
                  {step.title}
                </h3>
                <p className="text-charcoal/55 text-sm leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
