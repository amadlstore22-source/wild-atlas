import { fetchMoroccoWeather } from "@/lib/weather";
import AnimateInView from "@/components/ui/AnimateInView";

// Live weather across the regions our tours cover — helps travellers judge the
// best time and what to pack. Data: Open-Meteo (free), cached 3 h server-side.
export default async function TrailConditions() {
  const { regions, error } = await fetchMoroccoWeather();
  if (error || regions.length === 0) return null;

  return (
    <section className="border-y border-sand-dark/40 bg-bone/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AnimateInView variant="fade-up" duration={0.5}>
          <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">

            {/* Label */}
            <div className="shrink-0">
              <p className="text-[10px] font-bold tracking-widest text-ink-muted uppercase leading-none mb-1">
                Live Weather
              </p>
              <p className="font-semibold text-sm text-charcoal/80 leading-snug">
                Across Morocco right now
              </p>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-sand-dark/60 self-stretch" />

            {/* Region cards */}
            <ul className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {regions.map((r) => (
                <li
                  key={r.name}
                  className="flex items-center gap-3 rounded-xl bg-white/60 border border-sand-dark/40 px-3.5 py-2.5"
                >
                  <span className="text-2xl leading-none" aria-hidden="true">{r.icon}</span>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-bold text-charcoal text-base leading-none tabular-nums">
                        {r.tempC}°
                      </span>
                      <span className="text-ink-muted text-xs tabular-nums">
                        {r.highC}° / {r.lowC}°
                      </span>
                    </div>
                    <div className="text-ink-soft text-xs font-medium truncate mt-0.5">
                      {r.name}
                      <span className="text-ink-muted"> · {r.label}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Attribution */}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs text-charcoal/25 hover:text-ink-muted transition-colors self-end lg:self-center whitespace-nowrap"
            >
              Open-Meteo · 3 h cache
            </a>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
