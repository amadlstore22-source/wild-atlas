import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "../../dictionaries";
import { hreflangForPath } from "@/lib/seo/hreflang";
import { ogBase } from "@/lib/seo/open-graph";
import { EVENTS, toursForEvent } from "@/lib/events";
import { eventFor } from "@/lib/events.i18n";
import { formatEventDates, confidenceLabel, localeTag } from "@/lib/events-format";
import { getTourFor, tourSlugFor } from "@/lib/tours-i18n";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import BookingStatus from "@/components/events/BookingStatus";

type EventParams = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  return EVENTS.flatMap((e) =>
    (["en", "fr", "es", "de", "it", "ar"] as const).map((lang) => ({
      lang,
      slug: e.slug,
    }))
  );
}

export async function generateMetadata({ params }: EventParams): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const event = eventFor(lang, slug);
  if (!event) return {};
  const dict = await getDictionary(lang);
  const dates = formatEventDates(event, lang);
  const title = `${event.name} ${dates}`;
  return {
    title,
    description: event.blurb,
    openGraph: {
      ...ogBase(lang),
      title,
      description: event.blurb,
      images: [{ url: event.heroImage, width: 1400, height: 900, alt: event.name }],
      url: `https://marrakechecotours.com/${lang}/events/${slug}`,
    },
    alternates: {
      canonical: `https://marrakechecotours.com/${lang}/events/${slug}`,
      languages: hreflangForPath(LOCALES, `/events/${slug}`),
    },
    // The dictionary is loaded so the page and its metadata stay in one
    // language; nothing else here needs it yet.
    ...(dict ? {} : {}),
  };
}

export default async function EventDetailPage({ params }: EventParams) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const event = eventFor(lang, slug);
  if (!event) notFound();

  const dict = await getDictionary(lang);
  const t = dict.events;
  const dates = formatEventDates(event, lang);
  const tours = toursForEvent(event);

  /**
   * schema.org/Event. `eventStatus` and a precise `startDate` are only honest
   * when the organiser has published the date, so unconfirmed events emit the
   * window they actually have and nothing more.
   */
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.blurb,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [`https://marrakechecotours.com${event.heroImage}`],
    location: {
      "@type": "Place",
      name: event.name,
      address: { "@type": "PostalAddress", addressCountry: "MA" },
    },
    organizer: {
      "@type": "Organization",
      name: "Marrakech Eco Tours",
      url: "https://marrakechecotours.com",
    },
    ...(event.sourceUrl ? { sameAs: event.sourceUrl } : {}),
    // A set-departure trip is a SERIES, not one long event. Emitting only the
    // season's startDate..endDate told Google there was a single seven-week
    // event running 5 March - 22 April, which is the same misreading the page
    // body is built to avoid — and the one a rich result would repeat in the
    // SERP, where there is no page copy to correct it. Each departure is
    // therefore its own subEvent with a real start and end.
    ...(event.departureDates && event.departureDates.length > 0
      ? {
          subEvent: event.departureDates.map((d) => {
            // The trip is 8 days / 7 nights, so it ends 7 days after it leaves.
            const end = new Date(`${d}T00:00:00Z`);
            end.setUTCDate(end.getUTCDate() + 7);
            return {
              "@type": "Event",
              name: event.name,
              startDate: d,
              endDate: end.toISOString().slice(0, 10),
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: event.name,
                address: { "@type": "PostalAddress", addressCountry: "MA" },
              },
            };
          }),
        }
      : {}),
  };

  // Crumb takes a `path`; buildBreadcrumbSchema prepends the site origin.
  const crumbs = {
    "@context": "https://schema.org",
    ...buildBreadcrumbSchema([
      { name: "Home", path: `/${lang}` },
      { name: t.heading, path: `/${lang}/events` },
      { name: event.name, path: `/${lang}/events/${event.slug}` },
    ]),
  };

  return (
    <div className="bg-[var(--color-sand)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />

      <section className="relative h-[45vh] min-h-[300px] w-full">
        <Image
          src={event.heroImage}
          alt={event.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-4 pb-8">
          {/* Live booking status sits at the top, above the fold, because on a
              set-departure trip "can I still get on this?" is the first
              question and it was previously only answerable by scrolling.
              Client-rendered: this page is SSG, so a server-computed badge
              would freeze at build time and keep advertising a departure that
              had already left. */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/90 px-3 py-1 font-body text-xs text-[var(--color-ink)]">
              {dates}
            </span>
            {event.departureDates && event.departureDates.length > 0 ? (
              <BookingStatus
                dates={event.departureDates}
                lang={lang}
                labels={{
                  open: t.bookingOpen,
                  next: t.bookingNext,
                  closed: t.bookingClosed,
                }}
              />
            ) : null}
          </div>
          <h1 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            {event.name}
          </h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <p className="font-body text-lg leading-relaxed text-[var(--color-ink-soft)]">
          {event.description}
        </p>

        {/* Date honesty: for anything not confirmed by the organiser, say so
            plainly rather than letting the month window imply precision. */}
        <div className="mt-8 rounded-lg border border-[var(--color-sand-dark)] bg-white p-5">
          <p className="font-body text-sm font-semibold text-[var(--color-ink)]">
            {confidenceLabel(event.confidence, t)}
          </p>
          {event.dateNote ? (
            <p className="mt-2 font-body text-sm leading-relaxed text-[var(--color-ink-muted)]">
              {event.dateNote}
            </p>
          ) : null}
          {event.sourceUrl ? (
            <p className="mt-2 font-body text-sm">
              <a
                href={event.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-terracotta)] underline"
              >
                {t.officialSource}
              </a>
            </p>
          ) : null}
          <p className="mt-3 font-body text-sm text-[var(--color-ink-muted)]">
            {/* Festivals fill nearby ACCOMMODATION; our own departures run out of
                SEATS. Shipping the festival sentence on a set-departure page gives
                a confident reason to book early that is not the actual reason. */}
            {(event.departureDates?.length ? t.bookAheadSeats : t.bookAhead).replace(
              "{weeks}",
              String(event.bookAheadWeeks),
            )}
          </p>
        </div>

        {/* Set departures list each date individually.
            The single startDate/endDate above spans the whole season so the
            sort and expiry logic keep working, but rendering only that range
            would read as one seven-week event -- someone would arrive in the
            middle expecting to join. These are five separate eight-day trips.

            The seat count is rendered rather than left in JSON-LD alone:
            fixed-departure.test.ts records that a cap visible only to a crawler
            is exactly the structured-data mismatch Google's spam policy targets.

            Date formatting goes through localeTag for the same reason the
            booking sidebar does -- bare "en" resolves to en-US and prints
            "Mar 5, 2027" on a site that is British English everywhere else. */}
        {event.departureDates && event.departureDates.length > 0 ? (
          <section className="mt-8 rounded-lg border border-[var(--color-sand-dark)] bg-white p-5">
            <h2 className="font-body text-sm font-semibold text-[var(--color-ink)]">
              {t.departureDates}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {event.departureDates.map((d) => (
                <li
                  key={d}
                  className="rounded-full bg-[var(--color-sand)] px-3 py-1 font-body text-sm font-semibold text-[var(--color-ink)]"
                >
                  <time dateTime={d}>
                    {new Date(`${d}T00:00:00Z`).toLocaleDateString(localeTag(lang), {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </time>
                </li>
              ))}
            </ul>
            <p className="mt-3 font-body text-sm text-[var(--color-ink-muted)]">
              {t.departureDatesNote}
            </p>
          </section>
        ) : null}

        {/* The page used to run description -> tours, which left the reader to
            work out for themselves why the date mattered. These two lists carry
            that argument, and the second one is what makes the first credible:
            a festival page with only upsides reads like every OTA listing. */}
        {event.highlights.length > 0 ? (
          <section className="mt-10">
            <h2 className="font-display text-2xl text-[var(--color-ink)]">
              {t.whyGo}
            </h2>
            <ul className="mt-4 grid gap-3">
              {event.highlights.map((item) => (
                <li key={item} className="flex gap-3 font-body text-[var(--color-ink-soft)]">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-terracotta)]" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* bg-bone, not sand: the page ground is already --color-sand, so a
            sand panel on sand would not read as a panel at all. */}
        {event.considerations.length > 0 ? (
          <section className="mt-10 rounded-lg border border-[var(--color-sand-dark)] bg-[var(--color-bone)] p-5">
            <h2 className="font-display text-xl text-[var(--color-ink)]">
              {t.beforeYouGo}
            </h2>
            <ul className="mt-3 grid gap-3">
              {event.considerations.map((item) => (
                <li key={item} className="flex gap-3 font-body text-sm text-[var(--color-ink-muted)]">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-ink-faint)]" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {tours.length > 0 ? (
          <section className="mt-10">
            <h2 className="font-display text-2xl text-[var(--color-ink)]">
              {t.departuresHeading}
            </h2>
            <ul className="mt-4 grid gap-4">
              {tours.map((tour) => {
                const localised = getTourFor(lang, tourSlugFor(lang, tour.slug));
                const name = localised?.title ?? tour.title;
                return (
                  <li key={tour.slug}>
                    <Link
                      href={`/${lang}/tours/${tourSlugFor(lang, tour.slug)}`}
                      className="flex items-center gap-4 rounded-lg border border-[var(--color-sand-dark)] bg-white p-4 hover:border-[var(--color-terracotta)]"
                    >
                      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded">
                        <Image
                          src={localised?.heroImage ?? tour.heroImage}
                          alt={name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <span className="font-body text-sm text-[var(--color-ink)]">
                        {name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <p className="mt-10 font-body text-sm">
          <Link href={`/${lang}/events`} className="text-[var(--color-terracotta)] underline">
            &larr; {t.allEvents}
          </Link>
        </p>
      </article>
    </div>
  );
}
