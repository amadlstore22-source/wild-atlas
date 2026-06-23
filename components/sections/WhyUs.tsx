import { ShieldCheck, UsersThree, Leaf, ChatCircle, MapTrifold, Star, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/lib/constants";
import type { Dictionary } from "@/app/[lang]/dictionaries";

interface Props { dict: Dictionary }

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

  return (
    <section className="bg-forest text-white overflow-hidden">

      {/* Top: Why grid — 2-col layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
          {/* Left: headline + stats */}
          <div>
            <h2 className="font-serif text-white font-bold leading-[1.05] mb-6 reveal-up"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              {dict.whyUs.title}
            </h2>
            <p className="text-white/55 leading-relaxed mb-10 text-sm">
              {dict.whyUs.subtitle}
            </p>

            {/* Stats in 2x2 mini-grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: `${SITE.experienceYears}+`, label: dict.ourStory.stat1Label },
                { value: SITE.clientCount, label: dict.ourStory.stat2Label },
                { value: "5.0", label: "Star rating" },
                { value: "100%", label: "Licensed guides" },
              ].map((s) => (
                <div key={s.label} className="bg-white/6 border border-white/8 rounded-xl p-4">
                  <div className="font-serif text-white text-3xl font-bold leading-none mb-1">{s.value}</div>
                  <div className="text-white/40 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 4 reason cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WHY.map((item, i) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl bg-white/5 border border-white/8 hover:border-sunset/35 hover:bg-white/8 transition-all duration-300 group reveal-up stagger-child"
                style={{ "--stagger-i": i } as React.CSSProperties}
              >
                <div className="w-9 h-9 rounded-xl bg-sunset/12 border border-sunset/18 flex items-center justify-center mb-3.5 group-hover:bg-sunset/22 transition-colors">
                  <item.icon className="w-4.5 h-4.5 text-sunset" weight="duotone" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1.5">{item.title}</h3>
                <p className="text-white/45 text-xs leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/8" />

      {/* Bottom: horizontal process timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="font-serif text-white text-2xl font-bold mb-10 text-center">
          How It Works
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent pointer-events-none" />

          {STEPS.map((s) => (
            <div key={s.num} className="relative reveal-up">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-sunset/15 border border-sunset/30 flex items-center justify-center shrink-0">
                  <span className="font-mono text-sunset text-xs font-bold">{s.num}</span>
                </div>
                <div className="h-px flex-1 bg-white/8 lg:hidden" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-1.5">{s.title}</h4>
              <p className="text-white/40 text-xs leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
