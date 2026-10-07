import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "../dictionaries";
import { hreflangForPath } from "@/lib/seo/hreflang";
import { ogBase } from "@/lib/seo/open-graph";
import JsonLd from "@/components/seo/JsonLd";
import { collectionPageDocument } from "@/lib/seo/schema";
import { priceToursForEvent, type TourEvent } from "@/lib/events";
import { lowestGroupPrice } from "@/lib/tours";
import EventPrice from "@/components/events/EventPrice";
import { upcomingEventsFor } from "@/lib/events.i18n";
import BookingStatus from "@/components/events/BookingStatus";
import { formatEventDates, confidenceLabel, localeTag, eventStamp, eventMonthKey } from "@/lib/events-format";
import { ArrowRight, Clock } from "@phosphor-icons/react/dist/ssr";
import { ZelligeBand } from "@/components/ui/MoroccanMotifs";

type LangParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const t = dict.events;
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    openGraph: {
      ...ogBase(lang),
      title: t.metaTitle,
      description: t.metaDesc,
      url: `https://marrakechecotours.com/${lang}/events`,
    },
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/events`,
      languages: hreflangForPath(LOCALES, "/events"),
    },
  };
}

export default async function EventsPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.events;
  const events = upcomingEventsFor(lang);
  const schema = collectionPageDocument({
    lang,
    path: `/${lang}/events`,
    name: t.metaTitle,
    items: events.map((x) => ({ name: x.name, path: `/${lang}/events/${x.slug}` })),
  });

  return (
    <div className="bg-[var(--color-sand)]">
      <JsonLd data={schema} />
      <section className="relative overflow-hidden bg-[var(--color-ink)] py-16 sm:py-24">
        <ZelligeBand className="absolute inset-x-0 bottom-0 opacity-20" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-[var(--color-sand-dark)]">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
            {t.heading}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-[var(--color-sand)]">
            {t.sub}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        {/* Grouped by the month each event starts in: on a calendar page the
            date is the first thing people scan for, so it is the structure
            rather than a small pill inside each card. */}
        <div className="space-y-14">
          {groupByMonth(events).map(({ key, events: monthEvents }) => {
            const [year, month] = key.split("-").map(Number);
            const at = new Date(Date.UTC(year, month - 1, 1));
            const monthName = new Intl.DateTimeFormat(localeTag(lang), { month: "long", timeZone: "UTC" }).format(at);
            return (
              <div key={key} role="group" aria-labelledby={`m-${key}`}>
                <h2 id={`m-${key}`} className="mb-6 flex items-baseline gap-3">
                  <span className="font-display text-3xl text-[var(--color-ink)] sm:text-4xl">
                    {monthName.charAt(0).toLocaleUpperCase(localeTag(lang)) + monthName.slice(1)}
                  </span>
                  <span className="font-body text-xs font-semibold tracking-[0.2em] text-[var(--color-ink-muted)] tabular-nums">
                    {year}
                  </span>
                  <span aria-hidden="true" className="h-px flex-1 self-center bg-[var(--color-border)]" />
                </h2>
                <ul className="grid gap-6">
                  {monthEvents.map((event) => (
                    <EventCard
                      key={event.slug}
                      event={event}
                      lang={lang}
                      t={t}
                      priceLabels={{ from: t.factTripsFrom, perPerson: dict.common.perPerson, perPersonGroup: dict.common.perPersonGroup }}
                    />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-12 rounded-lg border border-[var(--color-sand-dark)] bg-white p-5 font-body text-sm leading-relaxed text-[var(--color-ink-muted)]">
          {t.disclaimer}
        </p>
      </section>
    </div>
  );
}

/** Consecutive events that start in the same month, in the page's order. */
function groupByMonth(events: TourEvent[]) {
  const groups: { key: string; events: TourEvent[] }[] = [];
  for (const event of events) {
    const key = eventMonthKey(event);
    const last = groups[groups.length - 1];
    if (last && last.key === key) last.events.push(event);
    else groups.push({ key, events: [event] });
  }
  return groups;
}

function EventCard({
  event,
  lang,
  t,
  priceLabels,
}: {
  event: TourEvent;
  lang: string;
  priceLabels: { from: string; perPerson: string; perPersonGroup: string };
  t: {
    confirmed: string;
    estimated: string;
    lunar: string;
    factBookAhead: string;
    bookAheadValue: string;
    seeDepartures: string;
    departureDates: string;
    bookingOpen: string;
    bookingNext: string;
    bookingClosed: string;
  };
}) {
  const departures = event.departureDates ?? [];
  const own = departures.length > 0;
  const stamp = eventStamp(event, lang);
  // A set-departure trip's startDate..endDate spans the whole SEASON so the
  // sort and expiry logic work, but printing that range reads as one long
  // event. Show the first departure; the rest are listed as chips below.
  const dates = own
    ? new Date(`${departures[0]}T00:00:00Z`).toLocaleDateString(localeTag(lang), {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : formatEventDates(event, lang);
  const chip = new Intl.DateTimeFormat(localeTag(lang), { day: "numeric", month: "short", timeZone: "UTC" });
  // Cheapest trip we run on these dates, from the same helper as the tour
  // cards and the event page, so the three can never disagree. For our own
  // departures that is the departure trip only (see priceToursForEvent).
  const cheapest = priceToursForEvent(event)
    .map((tour) => lowestGroupPrice(tour))
    .reduce<{ price: number; minPeople: number } | null>((a, b) => (!a || b.price < a.price ? b : a), null);
  const dot =
    event.confidence === "confirmed"
      ? "bg-[var(--color-olive)]"
      : event.confidence === "lunar"
        ? "bg-[var(--color-indigo)]"
        : "bg-[var(--color-brass)]";

  return (
    <li>
      <Link
        href={`/${lang}/events/${event.slug}`}
        className="group grid overflow-hidden rounded-[6px] bg-[var(--color-card)] shadow-[0_1px_2px_rgba(31,26,22,0.06)] ring-1 ring-[var(--color-border)]/70 transition-shadow duration-300 hover:shadow-[0_22px_44px_-24px_rgba(31,26,22,0.45)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-indigo)] sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto sm:min-h-[300px]">
          <Image
            src={event.heroImage}
            alt={event.name}
            fill
            sizes="(max-width: 640px) 100vw, 420px"
            className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
          />
          {/* A leaf off a wall calendar. A day only when it is known: see eventStamp. */}
          <div
            aria-hidden="true"
            className="absolute start-4 top-4 min-w-[4.25rem] overflow-hidden rounded-[4px] bg-[var(--color-cream)] text-center shadow-[0_8px_20px_-8px_rgba(0,0,0,0.55)]"
          >
            <div className="bg-[var(--color-atlas-clay)] px-2 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-cream)]">
              {stamp.band}
            </div>
            <div
              className={`px-2 pb-2 pt-1.5 font-display leading-none text-[var(--color-ink)] lining-nums tabular-nums ${
                stamp.dayKnown ? "text-[1.75rem]" : "text-lg"
              }`}
            >
              {stamp.body}
            </div>
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-body text-xs">
            <span className="font-semibold text-[var(--color-ink)]">{dates}</span>
            {own ? (
              <BookingStatus
                dates={departures}
                lang={lang}
                labels={{ open: t.bookingOpen, next: t.bookingNext, closed: t.bookingClosed }}
              />
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[var(--color-ink-muted)]">
                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                {confidenceLabel(event.confidence, t)}
              </span>
            )}
          </div>

          <h3 className="mt-3 text-balance font-display text-[1.7rem] leading-[1.12] text-[var(--color-ink)] sm:text-[2rem]">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
              {event.name}
            </span>
          </h3>
          <p className="mt-3 max-w-prose font-body text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)]">
            {event.blurb}
          </p>

          {departures.length > 1 ? (
            <div className="mt-5">
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
                {t.departureDates}
              </p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {departures.map((iso) => (
                  <li
                    key={iso}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-bone)] px-3 py-1 font-body text-xs font-medium text-[var(--color-ink)] tabular-nums"
                  >
                    {chip.format(new Date(`${iso}T00:00:00Z`))}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-auto pt-6">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-[var(--color-border)]/70 pt-5">
              <div>
                {cheapest ? (
                  <p className="font-body text-sm text-[var(--color-ink-muted)]">
                    {priceLabels.from}{" "}
                    <strong className="font-display text-2xl font-semibold text-[var(--color-ink)] lining-nums">
                      <EventPrice eur={cheapest.price} />
                    </strong>{" "}
                    {cheapest.minPeople > 1
                      ? priceLabels.perPersonGroup.replace("{count}", String(cheapest.minPeople))
                      : priceLabels.perPerson}
                  </p>
                ) : null}
                <p className="mt-1 inline-flex items-center gap-1.5 font-body text-xs text-[var(--color-ink-muted)]">
                  <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                  {t.factBookAhead}: {t.bookAheadValue.replace("{weeks}", String(event.bookAheadWeeks))}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-5 py-2.5 font-body text-sm font-semibold text-[var(--color-cream)] transition-colors duration-200 group-hover:bg-[var(--color-atlas-clay)]">
                {t.seeDepartures}
                <ArrowRight
                  aria-hidden="true"
                  weight="bold"
                  className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 rtl:-scale-x-100"
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
