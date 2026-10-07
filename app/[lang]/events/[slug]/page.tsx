import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, LOCALES } from "../../dictionaries";
import { hreflangForPath } from "@/lib/seo/hreflang";
import { ogBase } from "@/lib/seo/open-graph";
import { EVENTS, priceToursForEvent, toursForEvent } from "@/lib/events";
import { eventFor, upcomingEventsFor } from "@/lib/events.i18n";
import { formatEventDates, confidenceLabel, localeTag, eventSerpTitle, eventSchemaFor } from "@/lib/events-format";
import { getTourFor, tourSlugFor } from "@/lib/tours-i18n";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { lowestGroupPrice } from "@/lib/tours";
import { whatsappUrl } from "@/lib/constants";
import { CheckCircle, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import BookingStatus from "@/components/events/BookingStatus";
import EventPlanner, { type EventTrip } from "@/components/events/EventPlanner";
import EventPrice from "@/components/events/EventPrice";
import BrassButton from "@/components/ui/BrassButton";
import { WhatsAppLink } from "@/components/ui/ContactLinks";

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
  // The date range stays OUT of the <title>. Appending it pushed every event
  // page past the ~60 characters Google renders -- the Spanish 8-day Highlights
  // page reached 122 -- so the dates were clipped anyway AND took the end of
  // the event name with them. Bing Webmaster Tools flagged the English ones as
  // "Title too long" on 2026-09-08.
  //
  // The name alone is what people search for, and it fits for every event in
  // the catalogue. The dates are still the first thing in the description
  // below, where there is room for them, and they remain in the visible H1 and
  // in the Event structured data, which is what a date-aware search feature
  // actually reads.
  //
  // One event name is still long enough to overflow on its own (the 8-day
  // Highlights departure, 80 characters rendered in English and 122 in
  // Spanish). Trim the SERP title at its subtitle separator rather than
  // shortening `event.name` itself: that field is also the visible H1 and the
  // Event schema's name, and both want the full thing.
  //
  // The YEAR does go in when it fits. People search "festival gnaoua
  // essaouira 2027", and the Gnaoua page sat at position ~5 with a 1.8% CTR
  // for those queries (GSC, Sep 2026) while its title carried no year. Full
  // name + year first, then the short name + year, then the old rule.
  const title = eventSerpTitle(event);
  return {
    title,
    description: `${dates}. ${event.blurb}`,
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
  const ownDepartures = Boolean(event.departureDates?.length);

  // The trips we run on these dates, with the same "from" price the tour
  // cards and booking sidebar show (lowestGroupPrice), so the three can never
  // disagree. Title, photo and duration come from the localised tour.
  const trips: EventTrip[] = toursForEvent(event).map((tour) => {
    const local = getTourFor(lang, tourSlugFor(lang, tour.slug)) ?? tour;
    const cheapest = lowestGroupPrice(tour);
    return {
      slug: tour.slug,
      href: `/${lang}/tours/${tourSlugFor(lang, tour.slug)}`,
      title: local.title,
      image: local.heroImage ?? tour.heroImage,
      duration: local.duration,
      typeLabel: tour.tourType === "shared" ? dict.tours.shared : dict.tours.private,
      priceEur: cheapest.price,
      minPeople: cheapest.minPeople,
    };
  });
  // The headline price: for our own departures, the departure trip itself,
  // not the cheaper alternatives listed below it (see priceToursForEvent).
  const priced = new Set(priceToursForEvent(event).map((tour) => tour.slug));
  const pricedTrips = trips.filter((trip) => priced.has(trip.slug));
  const fromTrip = pricedTrips.length
    ? pricedTrips.reduce((a, b) => (b.priceEur < a.priceEur ? b : a))
    : null;
  const perPersonFor = (minPeople: number) =>
    minPeople > 1 ? dict.common.perPersonGroup.replace("{count}", String(minPeople)) : dict.common.perPerson;

  const whatsappHref = whatsappUrl(
    t.whatsappMessage.replace("{event}", event.name).replace("{dates}", dates),
  );
  const others = upcomingEventsFor(lang).filter((e) => e.slug !== event.slug).slice(0, 3);

  // Null for our own departures and unconfirmed dates: see eventSchemaFor.
  const eventSchema = eventSchemaFor(event);

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
      {eventSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />

      {/* paddingBlock: 0 — globals.css gives every <section> an unlayered
          padding-block that beats Tailwind utilities (see Hero.tsx). The rest
          of this page uses <div>s for the same reason: the old layout's
          sections each picked up up to 128px of padding top and bottom, which
          is where the large empty gaps between blocks came from. */}
      <section
        className="relative flex min-h-[78svh] items-end overflow-hidden bg-indigo-deep lg:min-h-[640px]"
        style={{ paddingBlock: 0 }}
      >
        <Image
          src={event.heroImage}
          alt={event.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-deep/80 via-indigo-deep/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-deep/90 via-indigo-deep/20 to-indigo-deep/30" />

        <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:pb-20">
          {/* Live booking status sits at the top because on a set-departure
              trip "can I still get on this?" is the first question.
              Client-rendered: this page is SSG, so a server-computed badge
              would freeze at build time. */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-[2px] bg-cream px-3 py-1 text-xs font-semibold text-ink">{dates}</span>
            {ownDepartures ? (
              <BookingStatus
                dates={event.departureDates!}
                lang={lang}
                labels={{ open: t.bookingOpen, next: t.bookingNext, closed: t.bookingClosed }}
              />
            ) : null}
          </div>
          <h1
            className="mt-4 max-w-3xl font-display font-semibold leading-[1.04] text-cream"
            style={{ fontSize: "clamp(2.3rem, 5vw, 4.2rem)", textWrap: "balance" }}
          >
            {event.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/85 sm:text-lg">{event.blurb}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <BrassButton href="#plan" variant="brass">{t.planTrip}</BrassButton>
            <WhatsAppLink
              href={whatsappHref}
              className="inline-flex items-center gap-2 rounded-[2px] border border-cream/40 px-6 py-3.5 font-semibold text-cream transition-colors hover:border-cream/70 hover:bg-cream/10"
            >
              <WhatsappLogo className="h-5 w-5" weight="fill" />
              {t.askWhatsapp}
            </WhatsAppLink>
          </div>
        </div>
      </section>

      {/* Key facts: everything someone needs to decide whether to plan around
          this date, before they read a word of the description. */}
      <div className="relative z-10 mx-auto -mt-8 max-w-6xl px-5">
        <dl className="grid grid-cols-2 overflow-hidden rounded-[4px] bg-card shadow-[0_10px_30px_rgba(27,38,69,0.10)] ring-1 ring-rule lg:grid-cols-4">
          {[
            { k: t.factWhen, v: <>{dates}</> },
            { k: t.factDates, v: <>{confidenceLabel(event.confidence, t)}</> },
            { k: t.factBookAhead, v: <>{t.bookAheadValue.replace("{weeks}", String(event.bookAheadWeeks))}</> },
            ...(fromTrip
              ? [{
                  k: t.factTripsFrom,
                  v: (
                    <>
                      <EventPrice eur={fromTrip.priceEur} />{" "}
                      <span className="text-sm font-normal text-ink-muted">{perPersonFor(fromTrip.minPeople)}</span>
                    </>
                  ),
                }]
              : []),
          ].map((f) => (
            <div key={f.k} className="border-b border-r border-rule/60 px-5 py-4 sm:px-6 sm:py-5">
              <dt className="text-[11px] font-semibold uppercase tracking-widest text-ink-muted">{f.k}</dt>
              <dd className="mt-1 text-[15px] font-semibold leading-snug text-ink sm:text-base">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="min-w-0">
          <p className="max-w-[65ch] text-lg leading-relaxed text-ink-soft">{event.description}</p>

          {/* Date honesty: for anything not confirmed by the organiser, say so
              plainly rather than letting the month window imply precision. */}
          {event.dateNote || event.sourceUrl ? (
            <p className="mt-5 max-w-[65ch] text-sm leading-relaxed text-ink-muted">
              {event.dateNote}{" "}
              {event.sourceUrl ? (
                <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-terracotta underline underline-offset-2">
                  {t.officialSource}
                </a>
              ) : null}
            </p>
          ) : null}
          <p className="mt-2 max-w-[65ch] text-sm text-ink-muted">
            {/* Festivals fill nearby ACCOMMODATION; our own departures run out of
                SEATS. Shipping the festival sentence on a set-departure page gives
                a confident reason to book early that is not the actual reason. */}
            {(ownDepartures ? t.bookAheadSeats : t.bookAhead).replace("{weeks}", String(event.bookAheadWeeks))}
          </p>

          {/* Set departures list each date individually: the single
              startDate/endDate spans the whole season so the sort and expiry
              logic keep working, but rendering only that range would read as
              one seven-week event. The seat count is rendered rather than left
              in JSON-LD alone (fixed-departure.test.ts). Dates go through
              localeTag so en prints British English, not en-US. */}
          {ownDepartures ? (
            <div className="mt-8 rounded-[4px] bg-card p-5 ring-1 ring-rule">
              <h2 className="text-sm font-semibold text-ink">{t.departureDates}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {event.departureDates!.map((d) => (
                  <li key={d} className="rounded-[2px] bg-[var(--color-sand)] px-3 py-1 text-sm font-semibold text-ink">
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
              <p className="mt-3 text-sm text-ink-muted">{t.departureDatesNote}</p>
            </div>
          ) : null}

          {/* Why go, then the honest counterweight: a festival page with only
              upsides reads like every OTA listing. */}
          {event.highlights.length > 0 ? (
            <div className="mt-12">
              <h2 className="font-display text-3xl text-ink">{t.whyGo}</h2>
              <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {event.highlights.map((item) => (
                  <li key={item} className="flex gap-3 border-t border-rule/70 pt-4 text-ink-soft">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" weight="duotone" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {event.considerations.length > 0 ? (
            <div className="mt-12 rounded-[4px] bg-[var(--color-bone)] p-6 ring-1 ring-rule">
              <h2 className="font-display text-2xl text-ink">{t.beforeYouGo}</h2>
              <ul className="mt-4 grid gap-3">
                {event.considerations.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] text-ink-soft">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-faint" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>

        {/* Desktop only: on a phone the hero buttons and the form below already
            do this job, and a third copy would push the content down. */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-[4px] bg-indigo-deep p-6 text-cream shadow-[0_14px_40px_rgba(27,38,69,0.25)]">
            <p className="font-display text-2xl leading-snug text-cream">{t.asideTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-cream/80">{t.asideBody}</p>
            {fromTrip ? (
              <p className="mt-4 text-sm text-cream/80">
                {t.factTripsFrom}{" "}
                <strong className="text-xl font-bold text-brass-glow"><EventPrice eur={fromTrip.priceEur} /></strong>{" "}
                {perPersonFor(fromTrip.minPeople)}
              </p>
            ) : null}
            {/* Cream, not the indigo BrassButton: indigo on this indigo-deep
                panel had almost no contrast. */}
            <a
              href="#plan"
              className="mt-5 flex w-full items-center justify-center rounded-[2px] bg-cream px-6 py-3.5 font-semibold text-indigo-deep transition-colors hover:bg-white active:scale-[0.985]"
            >
              {t.planTripShort}
            </a>
            <WhatsAppLink
              href={whatsappHref}
              className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-cream/90 hover:text-cream"
            >
              <WhatsappLogo className="h-5 w-5" weight="fill" />
              {t.askWhatsapp}
            </WhatsAppLink>
          </div>
        </aside>
      </div>

      <EventPlanner
        lang={lang}
        eventSlug={event.slug}
        eventName={event.name}
        dates={dates}
        trips={trips}
        whatsappHref={whatsappHref}
        labels={{
          tripsHeading: ownDepartures ? t.tripsHeadingOwn : t.tripsHeading,
          tripsIntro: ownDepartures ? t.tripsIntroOwn : t.tripsIntro,
          seeTrip: t.seeTrip,
          askAboutDates: t.askAboutDates,
          planHeading: t.planHeading,
          planIntro: t.planIntro,
          stepsTitle: t.stepsTitle,
          steps: [t.step1, t.step2, t.step3],
          askWhatsapp: t.askWhatsapp,
          formName: dict.contact.formName,
          formNamePlaceholder: dict.contact.formNamePlaceholder,
          formEmail: dict.contact.formEmail,
          formEmailPlaceholder: dict.contact.formEmailPlaceholder,
          formPeople: t.formPeople,
          formTrip: t.formTrip,
          formTripUnsure: t.formTripUnsure,
          formDetails: t.formDetails,
          formDetailsPlaceholder: t.formDetailsPlaceholder,
          formConsentPrefix: dict.contact.formConsentPrefix,
          privacyPolicy: dict.booking.privacyPolicy,
          formSubmit: t.formSubmit,
          formSending: dict.contact.formSending,
          sentTitle: dict.contact.messageSentTitle,
          sentBody: dict.contact.messageSentBody,
          from: dict.common.from,
          perPerson: dict.common.perPerson,
          perPersonGroup: dict.common.perPersonGroup,
          heard: dict.enquirySource,
        }}
      />

      {others.length > 0 ? (
        <div className="border-t border-rule">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-2xl text-ink sm:text-3xl">{t.moreEvents}</h2>
              <Link href={`/${lang}/events`} className="text-sm font-semibold text-indigo hover:underline hover:underline-offset-4">
                {t.allEvents} &rarr;
              </Link>
            </div>
            <ul className="mt-6 grid gap-5 sm:grid-cols-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/${lang}/events/${o.slug}`} className="group block overflow-hidden rounded-[4px] bg-card ring-1 ring-rule">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={o.heroImage} alt={o.name} fill sizes="(max-width: 640px) 100vw, 360px"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">{formatEventDates(o, lang)}</p>
                      <p className="mt-1 font-display text-lg leading-snug text-ink group-hover:underline group-hover:underline-offset-4">{o.name}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
