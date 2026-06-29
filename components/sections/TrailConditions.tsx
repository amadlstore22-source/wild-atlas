import { fetchMoroccoEvents, getAlertLevel, formatEvent } from "@/lib/eonet";
import { CheckCircle, Warning, Info } from "@phosphor-icons/react/dist/ssr";
import AnimateInView from "@/components/ui/AnimateInView";

export default async function TrailConditions() {
  const { events, error } = await fetchMoroccoEvents();
  const level = error ? "advisory" : getAlertLevel(events);

  const statusColors = {
    clear: {
      icon: "bg-forest/10 text-forest",
      text: "text-forest",
    },
    advisory: {
      icon: "bg-saffron/15 text-[#A67B2A]",
      text: "text-[#8B6420]",
    },
    warning: {
      icon: "bg-sunset/10 text-sunset",
      text: "text-sunset",
    },
  };

  const statusLabel =
    level === "clear"
      ? "No active alerts in the region"
      : level === "warning"
      ? `${events.length} active alert${events.length !== 1 ? "s" : ""} — confirm route with your guide`
      : error
      ? "Conditions data temporarily unavailable"
      : `${events.length} advisory event${events.length !== 1 ? "s" : ""} in the region`;

  return (
    <section className="border-y border-sand-dark/40 bg-bone/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AnimateInView variant="fade-up" duration={0.5}>
          <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-8">

            {/* Status indicator */}
            <div className="flex items-center gap-3 shrink-0">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${statusColors[level].icon}`}>
                {level === "clear" ? (
                  <CheckCircle className="w-5 h-5" weight="fill" />
                ) : level === "warning" ? (
                  <Warning className="w-5 h-5" weight="fill" />
                ) : (
                  <Info className="w-5 h-5" weight="fill" />
                )}
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest text-charcoal/35 uppercase leading-none mb-1">
                  Regional Conditions
                </p>
                <p className={`font-semibold text-sm leading-snug ${statusColors[level].text}`}>
                  {statusLabel}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px bg-sand-dark/60 self-stretch" />

            {/* Event list or clear message */}
            <div className="flex-1 min-w-0">
              {events.length > 0 ? (
                <>
                  <ul className="flex flex-wrap gap-x-6 gap-y-1.5">
                    {events.slice(0, 4).map((event) => {
                      const { label, icon, date } = formatEvent(event);
                      return (
                        <li key={event.id} className="flex items-center gap-2 text-sm">
                          <span className="text-base leading-none" aria-hidden="true">{icon}</span>
                          <span className="font-medium text-charcoal/80">{label}</span>
                          {date && (
                            <span className="text-charcoal/40 text-xs">{date}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  <p className="text-charcoal/40 text-xs mt-2">
                    Your guide will brief you on current trail and route conditions before departure.
                  </p>
                </>
              ) : (
                <p className="text-charcoal/50 text-sm leading-relaxed">
                  {error
                    ? "We're unable to retrieve live conditions data right now. For the latest trail conditions, contact us directly before your departure."
                    : "No significant natural events reported in Morocco and the surrounding region in the past 14 days. Conditions currently look favourable for trekking and travel."}
                </p>
              )}
            </div>

            {/* Attribution */}
            <a
              href="https://eonet.gsfc.nasa.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs text-charcoal/25 hover:text-charcoal/45 transition-colors self-end sm:self-center whitespace-nowrap"
            >
              NASA EONET · 3 h cache
            </a>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
