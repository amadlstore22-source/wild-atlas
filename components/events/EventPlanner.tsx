"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PaperPlaneTilt, WhatsappLogo } from "@phosphor-icons/react";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { track, trackConversion } from "@/lib/analytics";
import { useCurrency } from "@/lib/currency";
import { WhatsAppLink } from "@/components/ui/ContactLinks";
import HeardAboutSelect, { type HeardAboutLabels } from "@/components/ui/HeardAboutSelect";

/**
 * The selling half of an event page: the trips we run on the event dates, and
 * an enquiry form that already knows which event (and which trip) it is about.
 *
 * Until 2026-10-06 an event page ended in a list of tour names with no price,
 * no length and no way to ask anything; the only route to an enquiry was to
 * leave the page. Both halves share state so "Ask about these dates" on a card
 * can preselect that trip in the form below.
 *
 * Enquiries go through /api/contact as type "general" with the event in the
 * subject line, so they land in the inbox and the enquiry sheet with no change
 * to the API.
 */

export interface EventTrip {
  slug: string;
  href: string;
  title: string;
  image: string;
  duration: string;
  typeLabel: string;
  /** Cheapest per-person rate (EUR) and the group size it applies from. */
  priceEur: number;
  minPeople: number;
}

export interface EventPlannerLabels {
  tripsHeading: string;
  tripsIntro: string;
  seeTrip: string;
  askAboutDates: string;
  planHeading: string;
  planIntro: string;
  stepsTitle: string;
  steps: [string, string, string];
  askWhatsapp: string;
  formName: string;
  formNamePlaceholder: string;
  formEmail: string;
  formEmailPlaceholder: string;
  formPeople: string;
  formTrip: string;
  formTripUnsure: string;
  formDetails: string;
  formDetailsPlaceholder: string;
  formConsentPrefix: string;
  privacyPolicy: string;
  formSubmit: string;
  formSending: string;
  sentTitle: string;
  sentBody: string;
  from: string;
  perPerson: string;
  perPersonGroup: string;
  heard: HeardAboutLabels;
}

interface Props {
  lang: string;
  eventSlug: string;
  eventName: string;
  dates: string;
  trips: EventTrip[];
  whatsappHref: string;
  labels: EventPlannerLabels;
}

export default function EventPlanner({ lang, eventSlug, eventName, dates, trips, whatsappHref, labels: l }: Props) {
  const { format } = useCurrency();
  const [form, setForm] = useState({ name: "", email: "", people: "2", trip: "", details: "", heard: "" });
  const [agreed, setAgreed] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const { sending, sent, error, submit } = useFormSubmit({
    onSuccess: () => {
      track("event_enquiry_submit", { event: eventSlug, trip: form.trip || "unsure", heard: form.heard || "unanswered" });
      trackConversion("enquiry");
    },
  });

  const update = (field: keyof typeof form, value: string) => setForm((f) => ({ ...f, [field]: value }));

  function askAbout(slug: string) {
    update("trip", slug);
    const target = document.getElementById("plan");
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    // Focus after the scroll starts so the keyboard lands in the form too.
    window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), reduce ? 0 : 450);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) return;
    const trip = trips.find((t) => t.slug === form.trip);
    const tripLine = trip ? trip.title : l.formTripUnsure;
    submit({
      type: "general",
      name: form.name,
      email: form.email,
      people: form.people,
      tour: trip?.title ?? "",
      heard: form.heard,
      subject: `Event enquiry: ${eventName} (${dates})`,
      message:
        `Event: ${eventName} (${dates})\nTrip: ${tripLine}\nPeople: ${form.people}\nPage language: ${lang}\n\n` +
        (form.details || "(no extra details)"),
    });
  }

  const price = (t: EventTrip) =>
    t.minPeople > 1 ? l.perPersonGroup.replace("{count}", String(t.minPeople)) : l.perPerson;

  const inputCls =
    "w-full rounded-[3px] border border-rule bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-muted transition-colors focus:border-indigo focus:outline-none focus:ring-1 focus:ring-indigo/20";
  const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink-soft";

  return (
    <>
      {trips.length > 0 && (
        <div className="border-y border-rule bg-[var(--color-bone)]">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
            <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl" style={{ textWrap: "balance" }}>
              {l.tripsHeading}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">{l.tripsIntro}</p>

            <ul className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trips.map((t) => (
                <li key={t.slug} className="group flex flex-col overflow-hidden rounded-[4px] bg-card ring-1 ring-rule">
                  <Link href={t.href} className="relative block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden>
                    <Image
                      src={t.image}
                      alt={t.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-3 top-3 rounded-[2px] bg-indigo-deep/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-cream backdrop-blur-sm">
                      {t.typeLabel}
                    </span>
                  </Link>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">{t.duration}</p>
                    <h3 className="mt-1.5 font-display text-xl leading-snug text-ink">
                      <Link href={t.href} className="hover:underline hover:decoration-terracotta hover:underline-offset-4">
                        {t.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm text-ink-soft">
                      {l.from} <strong className="text-base text-ink">{format(t.priceEur)}</strong> {price(t)}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-sm font-semibold">
                      <button
                        type="button"
                        onClick={() => askAbout(t.slug)}
                        className="inline-flex items-center gap-1.5 rounded-[2px] bg-indigo px-4 py-2.5 text-cream transition-colors hover:bg-indigo-deep active:scale-[0.98]"
                      >
                        {l.askAboutDates}
                      </button>
                      <Link href={t.href} className="inline-flex items-center gap-1 text-indigo hover:underline hover:underline-offset-4">
                        {l.seeTrip}
                        <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" weight="bold" />
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div id="plan" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div>
            <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl" style={{ textWrap: "balance" }}>
              {l.planHeading}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">{l.planIntro}</p>

            <h3 className="mt-9 text-xs font-semibold uppercase tracking-widest text-ink-muted">{l.stepsTitle}</h3>
            <ol className="mt-4 grid gap-4">
              {l.steps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-rule bg-card font-display text-lg text-indigo">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-[15px] leading-relaxed text-ink-soft">{s}</span>
                </li>
              ))}
            </ol>

            <WhatsAppLink
              href={whatsappHref}
              className="mt-9 inline-flex items-center gap-2.5 rounded-[2px] border border-rule bg-card px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-indigo"
            >
              <WhatsappLogo className="h-5 w-5 text-[#1f9e55]" weight="fill" />
              {l.askWhatsapp}
            </WhatsAppLink>
          </div>

          {sent ? (
            <div className="rounded-[4px] bg-card p-10 text-center shadow-sm ring-1 ring-rule">
              <PaperPlaneTilt className="mx-auto mb-4 h-10 w-10 text-indigo" />
              <p className="mb-2 font-display text-2xl font-bold text-ink">{l.sentTitle}</p>
              <p className="text-ink-soft">
                {l.sentBody.replace("{name}", form.name).replace("{email}", form.email)}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5 rounded-[4px] bg-card p-6 shadow-sm ring-1 ring-rule sm:p-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ev-name" className={labelCls}>{l.formName} *</label>
                  <input ref={nameRef} id="ev-name" name="name" autoComplete="name" required type="text"
                    value={form.name} onChange={(e) => update("name", e.target.value)}
                    placeholder={l.formNamePlaceholder} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="ev-email" className={labelCls}>{l.formEmail} *</label>
                  <input id="ev-email" name="email" autoComplete="email" required type="email"
                    value={form.email} onChange={(e) => update("email", e.target.value)}
                    placeholder={l.formEmailPlaceholder} className={inputCls} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[140px_1fr]">
                <div>
                  <label htmlFor="ev-people" className={labelCls}>{l.formPeople}</label>
                  <input id="ev-people" name="people" type="number" min={1} max={100} inputMode="numeric"
                    value={form.people} onChange={(e) => update("people", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="ev-trip" className={labelCls}>{l.formTrip}</label>
                  <select id="ev-trip" name="trip" value={form.trip} onChange={(e) => update("trip", e.target.value)}
                    className={inputCls}>
                    <option value="">{l.formTripUnsure}</option>
                    {trips.map((t) => (
                      <option key={t.slug} value={t.slug}>{t.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="ev-details" className={labelCls}>{l.formDetails}</label>
                <textarea id="ev-details" name="details" rows={4}
                  value={form.details} onChange={(e) => update("details", e.target.value)}
                  placeholder={l.formDetailsPlaceholder} className={`${inputCls} resize-y`} />
              </div>
              <HeardAboutSelect id="ev-heard" value={form.heard} onChange={(v) => update("heard", v)}
                labels={l.heard} labelClassName={labelCls} selectClassName={inputCls} />

              <label className="flex cursor-pointer select-none items-start gap-2.5">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded-[2px] border border-rule accent-[#2B3A67]" />
                <span className="text-xs leading-snug text-ink-soft">
                  {l.formConsentPrefix}{" "}
                  <Link href={`/${lang}/privacy`} target="_blank" className="text-indigo underline underline-offset-2">
                    {l.privacyPolicy}
                  </Link>.
                </span>
              </label>

              {error && <p className="text-sm text-terracotta">{error}</p>}

              <button type="submit" disabled={sending || !agreed}
                className="flex w-full items-center justify-center gap-2 rounded-[3px] bg-indigo py-3.5 text-base font-bold text-white transition-colors hover:bg-indigo-deep disabled:cursor-not-allowed disabled:opacity-60">
                <PaperPlaneTilt className="h-4 w-4" />
                {sending ? l.formSending : l.formSubmit}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
