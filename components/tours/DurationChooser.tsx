import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";
import { TOURS, type Tour } from "@/lib/tours";
import { getTourFor, tourSlugFor } from "@/lib/tours-i18n";
import { ladderFor, dunesPlace } from "@/lib/duration-ladders";
import { localeTag } from "@/lib/events-format";
import EventPrice from "@/components/events/EventPrice";

interface Props {
  slug: string;
  lang: Locale;
  dict: Dictionary;
}

/**
 * "How many days?": the same dunes at 2, 3 or 4 days, side by side, with the
 * driving each day drawn as bars. All figures come from lib/duration-ladders.ts;
 * see its docblock for why the block exists and where each number is from.
 */
export default function DurationChooser({ slug, lang, dict }: Props) {
  const options = ladderFor(slug);
  if (!options || options.length < 2) return null;
  const t = dict.tourDetail;
  const nf = new Intl.NumberFormat(localeTag(lang));
  const maxHours = Math.max(...options.flatMap((o) => o.drives));

  // Translated itinerary text only where it lines up day for day with the
  // English one (the same rule the route map uses for stop names).
  const itineraryOf = (s: string) => {
    const base = TOURS.find((x) => x.slug === s) as Tour;
    const local = getTourFor(lang, s) ?? base;
    return { tour: local, days: local.itinerary.length === base.itinerary.length ? local.itinerary : base.itinerary };
  };
  const place = dunesPlace(slug, lang);
  const oneCampNight = options.every((o) => o.campNights === 1);

  return (
    <section id="tour-duration" className="scroll-mt-32">
      <h2 className="font-display text-ink text-3xl font-bold mb-3">{t.durationHeading}</h2>
      {oneCampNight && place && (
        <p className="text-ink-soft text-lg leading-relaxed mb-4">{t.durationIntro.replace("{place}", place)}</p>
      )}
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink-muted mb-3">
        <span aria-hidden="true" className="inline-flex items-end gap-0.5 h-3">
          <span className="w-1.5 h-2 bg-ink-muted/50" /><span className="w-1.5 h-3 bg-ink-muted/50" /><span className="w-1.5 h-1.5 bg-ink-muted/50" />
        </span>
        {t.durationDriving}
      </p>

      <ol className="space-y-3">
        {options.map((o) => {
          const { tour, days } = itineraryOf(o.slug);
          const isCurrent = o.slug === slug;
          return (
            <li
              key={o.slug}
              className={`grid grid-cols-1 sm:grid-cols-[minmax(0,11rem)_1fr_auto] gap-4 sm:gap-6 items-center rounded-[4px] p-4 sm:p-5 ${
                isCurrent ? "bg-indigo/5 ring-2 ring-indigo/40" : "bg-card ring-1 ring-rule"
              }`}
            >
              <div className="min-w-0">
                <p className="font-display text-ink text-xl font-bold leading-tight">{tour.duration}</p>
                <p className="text-ink-muted text-xs mt-1 leading-snug line-clamp-3">{tour.title}</p>
              </div>

              <div>
                <ul className="flex items-end gap-1.5 h-24" aria-label={t.durationDriving}>
                  {o.drives.map((h, i) => (
                    <li key={i} className="flex-1 max-w-14 h-full flex flex-col justify-end items-center gap-1">
                      <span className="text-[0.7rem] tabular-nums text-ink-soft whitespace-nowrap">
                        <span className="sr-only">{t.durationDay.replace("{n}", String(i + 1))}: </span>
                        {/* bdi: "≈8 h" inside Arabic text otherwise renders as "h 8≈". */}
                        <bdi>{days[i]?.driving ?? ""}</bdi>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`w-full rounded-t-[2px] ${isCurrent ? "bg-indigo" : "bg-ink-muted/35"}`}
                        style={{ height: `${Math.max(6, (h / maxHours) * 100) * 0.72}%` }}
                      />
                    </li>
                  ))}
                </ul>
                {o.km > 0 && (
                  <p className="text-xs text-ink-muted mt-2">{t.routeMapKm.replace("{km}", nf.format(o.km))}</p>
                )}
              </div>

              <div className="sm:text-right flex sm:block items-end justify-between gap-4">
                <div>
                  <p className="font-display text-ink text-2xl font-bold leading-none"><EventPrice eur={o.perPersonForTwo} /></p>
                  <p className="text-xs text-ink-muted mt-1">{t.durationPerPersonForTwo}</p>
                </div>
                {isCurrent ? (
                  <span className="inline-block sm:mt-3 text-xs font-semibold uppercase tracking-widest text-indigo">{t.durationThisTrip}</span>
                ) : (
                  <Link
                    href={`/${lang}/tours/${tourSlugFor(lang, o.slug)}`}
                    className="inline-flex items-center gap-1 sm:mt-3 text-sm font-semibold text-indigo underline-offset-4 hover:underline"
                  >
                    {t.durationSeeTrip}
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
