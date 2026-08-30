import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "../dictionaries";
import { hreflangForPath } from "@/lib/seo/hreflang";
import { ogBase } from "@/lib/seo/open-graph";
import type { TourEvent } from "@/lib/events";
import { upcomingEventsFor } from "@/lib/events.i18n";
import { formatEventDates, confidenceLabel, localeTag } from "@/lib/events-format";
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

  return (
    <div className="bg-[var(--color-sand)]">
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
        <ul className="grid gap-8">
          {events.map((event) => (
            <EventCard key={event.slug} event={event} lang={lang} t={t} />
          ))}
        </ul>

        <p className="mt-12 rounded-lg border border-[var(--color-sand-dark)] bg-white p-5 font-body text-sm leading-relaxed text-[var(--color-ink-muted)]">
          {t.disclaimer}
        </p>
      </section>
    </div>
  );
}

function EventCard({
  event,
  lang,
  t,
}: {
  event: TourEvent;
  lang: string;
  t: { confirmed: string; estimated: string; lunar: string; bookAhead: string; seeDepartures: string; departureDates: string };
}) {
  // A set-departure trip's startDate..endDate spans the whole SEASON so the
  // sort and expiry logic work, but printing that range on a card reads as one
  // long event rather than five separate eight-day trips. Show the first
  // departure instead, with the rest indicated by count on the line below.
  const departures = event.departureDates ?? [];
  const dates =
    departures.length > 0
      ? new Date(`${departures[0]}T00:00:00Z`).toLocaleDateString(localeTag(lang), {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        })
      : formatEventDates(event, lang);
  return (
    <li className="overflow-hidden rounded-xl border border-[var(--color-sand-dark)] bg-white shadow-sm">
      <Link href={`/${lang}/events/${event.slug}`} className="group grid sm:grid-cols-[240px_1fr]">
        <div className="relative aspect-[4/3] sm:aspect-auto">
          <Image
            src={event.heroImage}
            alt={event.name}
            fill
            sizes="(max-width: 640px) 100vw, 240px"
            className="object-cover"
          />
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[var(--color-ink)] px-3 py-1 font-body text-xs text-white">
              {dates}
            </span>
            <span className="font-body text-xs text-[var(--color-ink-muted)]">
              {confidenceLabel(event.confidence, t)}
            </span>
          </div>
          <h2 className="mt-3 font-display text-2xl text-[var(--color-ink)] group-hover:underline">
            {event.name}
          </h2>
          <p className="mt-2 font-body text-sm leading-relaxed text-[var(--color-ink-muted)]">
            {event.blurb}
          </p>
          {departures.length > 1 ? (
            <p className="mt-2 font-body text-xs font-semibold text-[var(--color-ink)]">
              {t.departureDates}: {departures.length}
            </p>
          ) : null}
          <p className="mt-3 font-body text-xs text-[var(--color-ink-muted)]">
            {t.bookAhead.replace("{weeks}", String(event.bookAheadWeeks))}
          </p>
          <span className="mt-4 inline-block font-body text-sm text-[var(--color-terracotta)]">
            {t.seeDepartures} &rarr;
          </span>
        </div>
      </Link>
    </li>
  );
}
