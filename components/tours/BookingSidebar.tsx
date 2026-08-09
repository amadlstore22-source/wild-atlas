"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Envelope, CreditCard, ShieldCheck, Phone, WhatsappLogo, CheckCircle, CalendarCheck, Star, HandHeart } from "@phosphor-icons/react";
import type { Tour } from "@/lib/tours";
import { perPersonPrice, groupPriceTiers, lowestGroupPrice } from "@/lib/tours";
import { SITE, TRIPADVISOR, WHATSAPP_MESSAGES, whatsappUrl } from "@/lib/constants";
import { reviewsForTour } from "@/lib/reviews";
import { track, trackConversion } from "@/lib/analytics";
import { useCurrency } from "@/lib/currency";
import { priceIn } from "@/lib/currency-core";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

export default function BookingSidebar({ tour, lang = "en", dict }: { tour: Tour; lang?: Locale; dict: Dictionary }) {
  const b = dict.booking;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  // The smallest bookable group, from the tour's own tiers — some tours (the
  // family trek) cannot be booked solo, so 1 is not always the floor.
  const minPeople = groupPriceTiers(tour)[0]?.minPeople ?? 1;
  const [people, setPeople] = useState(Math.max(2, minPeople));
  // The travellers field is a controlled number input, but clamping on every
  // keystroke made it impossible to clear: Math.max(1, Number("")) is 1, so the
  // digit reappeared before a second one could be typed. Keep the raw string
  // while the field is focused and clamp on blur instead.
  const [peopleInput, setPeopleInput] = useState(String(Math.max(2, minPeople)));
  // Empty or zero is a real error now that the field can be cleared: snapping
  // silently back to 1 would send an enquiry for the wrong group size.
  const peopleInvalid =
    peopleInput.trim() === "" ||
    !Number.isFinite(Number(peopleInput)) ||
    Number(peopleInput) < minPeople;
  const [agreed, setAgreed] = useState(false);
  const { format, currency } = useCurrency();
  const { sending, sent, error, submit: doSubmit } = useFormSubmit();

  function handleInquiry(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed || peopleInvalid) return;
    doSubmit({ type: "booking", tour: tour.title, name, email, date, people });
  }

  // Count an enquiry conversion only once the submit actually succeeds — firing
  // in handleInquiry would also count network failures. `sent` flips true after
  // a successful send. Value = the deposit, a reasonable proxy for lead worth.
  useEffect(() => {
    if (sent) {
      track("enquiry_submit", { tour: tour.title });
      trackConversion("enquiry", { value: tour.depositAmount, currency: "EUR" });
    }
  }, [sent, tour.title, tour.depositAmount]);

  // Mirror programmatic changes (stepper, tier row) into the text field.
  useEffect(() => {
    setPeopleInput(String(people));
  }, [people]);

  const waUrl = whatsappUrl(WHATSAPP_MESSAGES.tour(tour.title));
  // depositAmount is stored in USD but the page displays the active currency.
  // Passing the raw number sent the customer to PayPal for "95" while the page
  // said "€87" — a 9% discrepancy in whatever currency PayPal happened to pick.
  // PayPal.Me takes an explicit currency as an amount suffix (e.g. /87EUR), so
  // convert first and always state the currency.
  // Bound the date picker: a request for a past date is always a mistake, and
  // beyond two years is not a real enquiry. Computed per render rather than at
  // module load so a long-lived tab does not go stale overnight.
  const today = new Date();
  const minDate = today.toISOString().slice(0, 10);
  const maxDate = new Date(today.getFullYear() + 2, today.getMonth(), today.getDate())
    .toISOString()
    .slice(0, 10);

  const depositDue = priceIn(tour.depositAmount, currency);
  // Only render a payment link when a handle is actually configured. An empty
  // SITE.paypal would otherwise build ".../paypalme//155EUR", sending customers
  // to a stranger's account or a dead page with their deposit in hand.
  const paypalUrl = SITE.paypal
    ? `https://www.paypal.com/paypalme/${SITE.paypal}/${depositDue}${currency}`
    : null;
  const depositRequestUrl = whatsappUrl(
    `Hello! I'd like to pay the ${format(tour.depositAmount)} deposit for "${tour.title}". Could you send me a payment link?`,
  );
  const priceMax = tour.priceMax ?? null;
  // Group-size pricing: the per-person rate drops as the group grows. `effPer`
  // is the rate for the currently-selected group; `basePer` is the 1–3 rate,
  // so `saved` shows the discount when a bigger group has been chosen.
  const effPer = perPersonPrice(tour, people);
  const basePer = perPersonPrice(tour, 1);
  // The full tier table, shown openly on the page. Competitors publish a "from"
  // price that is really the 14–17 person rate and hide the rest behind "contact
  // us for a quote" — a couple then discovers the real number only by email.
  // Showing every tier is the honest version and removes a reason to bounce.
  const cheapest = lowestGroupPrice(tour);
  const tiers = groupPriceTiers(tour);
  const showTiers = tiers.length > 1 && tiers[tiers.length - 1].price < tiers[0].price;
  const savedPerPerson = basePer - effPer;
  const totalMin = effPer * people;
  const totalMax = priceMax ? Math.round((priceMax / tour.price) * effPer) * people : null;

  return (
    <>
      {/* Desktop sidebar card */}
      <div className="bg-card rounded-[4px] shadow-lg border border-rule overflow-hidden">
        {/* Price header */}
        <div className="bg-indigo p-6 text-white">
          <div className="text-white/70 text-xs uppercase tracking-widest mb-1">{b.pricePerPerson}</div>
          {/* Lead with the cheapest per-person rate. tour.price is the SOLO
              rate — the dearest figure the tour has — and heading the sidebar
              with it made a EUR695 trek look like a EUR1,800 one. The solo rate
              stays visible directly underneath, so nobody travelling alone is
              surprised at checkout. */}
          <div className="font-display text-4xl font-bold">
            {format(cheapest.price)}{priceMax ? ` – ${format(priceMax)}` : ""}
          </div>
          {cheapest.minPeople > 1 && (
            <div className="text-white/70 text-xs mt-1">
              {(b.perPersonGroupNote ?? "per person for {count}+ travellers · {solo} solo").
                replace("{count}", String(cheapest.minPeople)).
                replace("{solo}", format(tour.price))}
            </div>
          )}
          <div className="text-white/55 text-xs mt-1">{b.exactPriceNote}</div>
          {showTiers && (
            <div className="mt-2 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-brass-glow bg-white/10 px-2.5 py-1 rounded-full">
              {(b.groupRateFrom ?? "Groups from {price}/person").replace("{price}", format(tiers[tiers.length - 1].price))}
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-white/15 grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-white/65 text-xs">{b.deposit}</div>
              <div className="font-bold text-brass-glow">{format(tour.depositAmount)}</div>
            </div>
            <div>
              <div className="text-white/65 text-xs">{b.response}</div>
              <div className="font-bold text-white">{SITE.responseHours}h</div>
            </div>
          </div>
        </div>

        {/* Group price table. Published openly rather than hidden behind an
            enquiry: the competitor tables that do exist show a couple paying
            EUR 435pp where we charge EUR 272, and a visitor cannot compare what
            they cannot see. */}
        {showTiers && (
          <div className="px-6 py-4 border-b border-rule bg-parchment/40">
            <div className="text-[0.7rem] font-semibold uppercase tracking-widest text-ink-soft mb-2">
              {b.groupPricingTitle ?? "Price per person by group size"}
            </div>

            {/* The group-size control belongs WITH the prices. It previously
                existed only as a number field inside the enquiry form far
                below, so from here the highlighted bracket looked fixed. */}
            <div className="flex items-center justify-between gap-3 mb-3 rounded-[3px] border border-indigo/20 bg-card px-3 py-2">
              <span className="text-xs font-semibold text-ink-soft">
                {b.groupSizeLabel ?? "How many travelling?"}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPeople((n) => Math.max(minPeople, n - 1))}
                  disabled={people <= minPeople}
                  aria-label={b.groupSizeFewer ?? "Fewer travellers"}
                  className="w-7 h-7 rounded-[3px] border border-rule text-indigo font-bold leading-none disabled:opacity-35 disabled:cursor-not-allowed hover:bg-indigo-wash transition-colors"
                >
                  &minus;
                </button>
                <span
                  aria-live="polite"
                  className="w-8 text-center font-bold text-indigo tabular-nums text-sm"
                >
                  {people}
                </span>
                <button
                  type="button"
                  onClick={() => setPeople((n) => Math.min(20, n + 1))}
                  disabled={people >= 20}
                  aria-label={b.groupSizeMore ?? "More travellers"}
                  className="w-7 h-7 rounded-[3px] border border-rule text-indigo font-bold leading-none disabled:opacity-35 disabled:cursor-not-allowed hover:bg-indigo-wash transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            <ul className="flex flex-col gap-1.5">
              {tiers.map((tier, i) => {
                const next = tiers[i + 1];
                const isLast = !next;
                // A tier covers minPeople up to the next tier's threshold.
                const label = isLast
                  ? (b.groupPricingPlus ?? "{n}+").replace("{n}", String(tier.minPeople))
                  : next.minPeople - tier.minPeople === 1
                    ? String(tier.minPeople)
                    : `${tier.minPeople}\u2013${next.minPeople - 1}`;
                const active = people >= tier.minPeople && (isLast || people < next.minPeople);
                // The cheapest bracket is the one worth calling out.
                const best = tier.price === cheapest.price;
                const peopleWord =
                  tier.minPeople === 1 && !isLast
                    ? (b.groupPricingPerson ?? "person")
                    : (b.groupPricingPeopleWord ?? "people");
                return (
                  <li key={tier.minPeople} className={best ? "relative pt-2" : "relative"}>
                    {best && (
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-terracotta text-white text-[0.58rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-[2px] whitespace-nowrap">
                        {b.groupPricingBestValue ?? "Best value"}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setPeople(tier.minPeople)}
                      aria-pressed={active}
                      className={`w-full text-start flex items-center justify-between gap-2 rounded-[3px] border bg-card px-3.5 transition-colors hover:border-indigo/50 ${
                        best
                          ? "py-3 border-terracotta"
                          : active
                            ? "py-2.5 border-indigo/40 bg-indigo-wash/40"
                            : "py-2.5 border-rule"
                      }`}
                    >
                      <span className="text-[0.72rem] font-bold uppercase tracking-wider text-indigo shrink-0">
                        {label} {peopleWord}
                      </span>
                      <span className="flex items-baseline gap-1.5 min-w-0">
                        <span
                          className={`font-display text-xl leading-none tabular-nums ${
                            best ? "text-terracotta" : "text-indigo"
                          }`}
                        >
                          {format(tier.price)}
                        </span>
                        <span className="text-[0.58rem] uppercase tracking-wider text-ink-muted whitespace-nowrap">
                          {b.groupPricingEachSuffix ?? "per person"}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="text-[0.7rem] text-ink-muted mt-2 leading-snug">
              {b.groupPricingNote ??
                "The vehicle and guide cost the same however many travel, so the price per person falls as the group grows."}
            </p>
          </div>
        )}

        <div className="p-6 space-y-5">
          {/* Answers the question the page otherwise leaves hanging: "can I go on
              my dates?". We run private departures, so there is no fixed schedule
              to fit into — saying so converts better than a calendar of open
              dates, and unlike a calendar it stays true without maintenance. */}
          <div className="rounded-[3px] border border-indigo/15 bg-indigo-wash/60 p-4">
            <div className="flex items-start gap-2.5">
              <CalendarCheck className="w-5 h-5 text-indigo shrink-0 mt-0.5" weight="duotone" />
              <div>
                <p className="text-sm font-semibold text-indigo leading-snug">{b.chooseDatesTitle}</p>
                <p className="text-xs text-ink-soft leading-relaxed mt-1">
                  {b.chooseDatesBody}
                </p>
              </div>
            </div>
          </div>

          {/* Guarantee badges */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: ShieldCheck, text: b.freeCancellationDays.replace("{days}", String(SITE.depositDays)) },
              { icon: CheckCircle, text: b.replyWithinHours.replace("{hours}", String(SITE.responseHours)) },
            ].map((badge) => (
              <div key={badge.text} className="flex items-start gap-2 p-3 bg-surface-sunk/40 rounded-[3px]">
                <badge.icon className="w-4 h-4 text-indigo shrink-0 mt-0.5" />
                <span className="text-xs text-ink-soft leading-snug">{badge.text}</span>
              </div>
            ))}
          </div>

          {sent ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-indigo/12 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-7 h-7 text-indigo" />
              </div>
              <h3 className="font-display font-bold text-ink mb-1">{b.enquirySent}</h3>
              <p className="text-ink-soft text-sm leading-relaxed">
                {b.enquirySentBody.replace("{email}", email).replace("{hours}", String(SITE.responseHours))}
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquiry} className="space-y-3">
              <h3 className="font-semibold text-ink text-sm">{b.checkAvailability}</h3>

              <div>
                <label htmlFor="booking-name" className="text-xs font-semibold text-ink-soft uppercase tracking-widest block mb-1">{b.nameLabel}</label>
                <input
                  id="booking-name"
                  name="name"
                  // autoComplete lets the browser fill these from a saved
                  // profile. On a mobile booking form that removes two of the
                  // four fields a visitor has to type.
                  autoComplete="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={b.namePlaceholder}
                  className="w-full px-4 py-2.5 rounded-[3px] border border-rule text-ink text-sm focus:outline-none focus:border-indigo focus:ring-1 focus:ring-indigo/20 placeholder:text-ink-muted transition-colors"
                />
              </div>
              <div>
                <label htmlFor="booking-email" className="text-xs font-semibold text-ink-soft uppercase tracking-widest block mb-1">{b.emailLabel}</label>
                <input
                  id="booking-email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={b.emailPlaceholder}
                  className="w-full px-4 py-2.5 rounded-[3px] border border-rule text-ink text-sm focus:outline-none focus:border-indigo focus:ring-1 focus:ring-indigo/20 placeholder:text-ink-muted transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* htmlFor/id pairs are required, not cosmetic: without them a
                    screen reader announces these as unlabelled inputs even
                    though the text sits directly above. Lighthouse flagged both
                    under "Form elements must have labels". */}
                <div>
                  <label htmlFor="booking-date" className="text-xs text-ink-muted mb-1 block">
                    {b.preferredDate}
                  </label>
                  <input
                    id="booking-date"
                    name="preferred-date"
                    type="date"
                    value={date}
                    min={minDate}
                    max={maxDate}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-[3px] border border-rule text-ink text-sm focus:outline-none focus:border-indigo focus:ring-1 focus:ring-indigo/20 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="booking-travellers" className="text-xs text-ink-muted mb-1 block">
                    {b.travellers}
                  </label>
                  <div className="relative">
                    <input
                      id="booking-travellers"
                      name="travellers"
                      type="number"
                      min={1}
                      max={20}
                      value={peopleInput}
                      onChange={(e) => {
                        const raw = e.target.value;
                        setPeopleInput(raw);
                        const n = Number(raw);
                        // Only move the quote once the field holds a usable
                        // number; an empty box leaves the last valid size.
                        if (raw !== "" && Number.isFinite(n) && n >= minPeople) {
                          setPeople(Math.min(20, Math.floor(n)));
                        }
                      }}
                      onBlur={() => {
                        // Only normalise a value that is already valid — an
                        // empty or zero field keeps its warning instead of
                        // being silently rewritten to 1.
                        const n = Number(peopleInput);
                        if (peopleInput.trim() !== "" && Number.isFinite(n) && n >= minPeople) {
                          const clamped = Math.min(20, Math.floor(n));
                          setPeople(clamped);
                          setPeopleInput(String(clamped));
                        }
                      }}
                      aria-invalid={peopleInvalid}
                      aria-describedby={peopleInvalid ? "booking-travellers-error" : undefined}
                      className={`w-full px-3 py-2.5 rounded-[3px] border text-ink text-sm focus:outline-none focus:ring-1 transition-colors ${
                        peopleInvalid
                          ? "border-terracotta focus:border-terracotta focus:ring-terracotta/20"
                          : "border-rule focus:border-indigo focus:ring-indigo/20"
                      }`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted text-xs pointer-events-none">{b.paxSuffix}</span>
                  </div>
                  {peopleInvalid && (
                    <p
                      id="booking-travellers-error"
                      role="alert"
                      className="text-terracotta text-xs mt-1"
                    >
                      {(minPeople > 1
                        ? (b.travellersRequiredMin ?? "Enter at least {count} travellers.")
                        : (b.travellersRequired ?? "Enter at least 1 traveller.")
                      ).replace("{count}", String(minPeople))}
                    </p>
                  )}
                </div>
              </div>

              {/* Total estimate + group-size pricing */}
              {people > 0 && (
                <div className="bg-indigo/5 border border-indigo/10 px-4 py-2.5 rounded-[3px] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-ink-soft">{format(effPer)} <span className="text-ink-muted">/ {b.perPersonShort ?? "person"}</span></span>
                    <span className="font-bold text-indigo text-sm">
                      {format(totalMin)}{totalMax ? ` – ${format(totalMax)}` : ""}
                    </span>
                  </div>
                  {savedPerPerson > 0 && (
                    <div className="text-[0.7rem] text-forest font-semibold">
                      {(b.groupSaveNote ?? "Group rate — you save {amount}/person").replace("{amount}", format(savedPerPerson))}
                    </div>
                  )}
                </div>
              )}

              {/* Terms agreement — required before an enquiry can be sent. */}
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded-[2px] border border-rule text-indigo accent-[#2B3A67] focus:outline-none focus:ring-2 focus:ring-indigo/30"
                />
                <span className="text-xs text-ink-soft leading-snug">
                  {b.agreeToTermsPrefix}{" "}
                  <Link href={`/${lang}/terms`} target="_blank" className="text-indigo underline underline-offset-2 hover:text-indigo-deep">{b.termsAndConditions}</Link>{" "}
                  {b.agreeToTermsAnd}{" "}
                  <Link href={`/${lang}/privacy`} target="_blank" className="text-indigo underline underline-offset-2 hover:text-indigo-deep">{b.privacyPolicy}</Link>.
                </span>
              </label>

              {error && <p className="text-terracotta text-sm">{error}</p>}

              <button
                type="submit"
                disabled={sending || !agreed || peopleInvalid}
                className="btn-brass w-full !py-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Envelope className="w-4 h-4" />
                {sending ? b.sending : b.sendEnquiry}
              </button>
            </form>
          )}

          {/* Social proof at the decision point. Research on travel conversion
              is consistent that third-party review evidence belongs NEXT TO the
              booking CTA, not in a distant testimonials section — and that a
              quoted sentence outperforms a bare score. Reviews are real and
              shared with the homepage block (lib/reviews.ts). */}
          <div className="rounded-[3px] border border-rule bg-surface-sunk/30 p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-ink-muted">
                {b.reviewQuotesTitle}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-ink">
                <Star className="w-3.5 h-3.5 text-saffron" weight="fill" aria-hidden="true" />
                {TRIPADVISOR.rating.toFixed(1)}
                <span className="font-normal text-ink-muted">({TRIPADVISOR.reviewCount})</span>
              </span>
            </div>
            {reviewsForTour(tour.title).map((r) => (
              <figure key={r.name} className="border-l-2 border-saffron/40 pl-3">
                <blockquote className="text-xs text-ink-soft leading-relaxed italic">
                  “{r.short}”
                </blockquote>
                <figcaption className="text-[0.68rem] text-ink-muted mt-1">
                  {r.name} · {r.country} · {r.date}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-rule" />
            <span className="text-xs text-ink-muted shrink-0">{b.orSecureSpot}</span>
            <div className="flex-1 h-px bg-rule" />
          </div>

          {paypalUrl ? (
            <a
              href={paypalUrl}
              target="_blank"
              rel="noopener noreferrer"
              // Paying the deposit is the highest-intent action on the page.
              // Until now nothing called trackConversion("deposit"), so Google
              // Ads never learned which keywords produce actual payers — the
              // strongest bidding signal available.
              onClick={() => trackConversion("deposit", { value: tour.depositAmount, currency: "EUR" })}
              className="w-full py-3 rounded-[3px] bg-[#0070BA] text-white font-bold hover:bg-[#005ea6] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#0070BA]/15"
            >
              <CreditCard className="w-4 h-4" />
              {b.payDepositPaypal.replace("{amount}", format(tour.depositAmount))}
            </a>
          ) : (
            // No PayPal handle configured. Rather than hide the deposit step,
            // keep the customer moving: name the amount and give them a way to
            // ask for a link. Guessing a handle would risk paying a stranger.
            <div className="rounded-[3px] border border-rule bg-surface-sunk/40 p-4 space-y-2.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  {b.depositToConfirm}
                </span>
                <span className="font-display text-lg font-bold text-ink">
                  {format(tour.depositAmount)}
                </span>
              </div>
              <p className="text-xs text-ink-soft leading-snug">
                {b.depositConfirmBody}
              </p>
              <a
                href={depositRequestUrl}
                target="_blank"
                rel="noopener noreferrer"
                // Same intent as paying: this is the deposit step while no
                // PayPal handle is configured, so it must count the same.
                onClick={() => trackConversion("deposit", { value: tour.depositAmount, currency: "EUR" })}
                className="w-full py-2.5 rounded-[3px] bg-indigo text-white font-bold text-sm hover:bg-indigo-deep transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                {b.requestPaymentLink}
              </a>
            </div>
          )}

          {/* Contact alternatives */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                track("whatsapp_click", { location: "booking_sidebar", tour: tour.title });
                trackConversion("whatsapp");
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#25D366]/10 text-[#128C7E] font-semibold text-xs hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20"
            >
              <WhatsappLogo className="w-4 h-4" />
              {b.whatsapp}
            </a>
            <a
              href={`tel:${SITE.phoneDial}`}
              onClick={() => {
                track("phone_click", { location: "booking_sidebar", tour: tour.title });
                trackConversion("phone");
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-[3px] bg-indigo/5 text-indigo font-semibold text-xs hover:bg-indigo/10 transition-colors border border-indigo/10"
            >
              <Phone className="w-4 h-4" />
              {b.callUs}
            </a>
          </div>

          {/* Why book direct. Booking platforms take 25–40% from operators;
              competitors make this a price argument, but for a family-run
              outfit it is really a values argument — the money reaches the
              guides rather than a middleman. Stated plainly, no hard sell. */}
          <div className="rounded-[3px] border border-indigo/15 bg-indigo-wash/50 p-4">
            <div className="flex items-start gap-2.5">
              <HandHeart className="w-5 h-5 text-indigo shrink-0 mt-0.5" weight="duotone" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-indigo leading-snug">{b.bookDirectTitle}</p>
                <p className="text-xs text-ink-soft leading-relaxed mt-1">{b.bookDirectBody}</p>
              </div>
            </div>
          </div>

          {/* Large group + custom plan */}
          <div className="rounded-[3px] bg-surface-sunk/40 border border-rule p-4 space-y-2.5">
            <p className="text-xs font-semibold text-ink-soft leading-snug">
              {b.largerGroupPrompt}
            </p>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Hello! I'd like to plan a private trip for a larger group on the "${tour.title}" tour. Can you help?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              // A large-group enquiry is worth more than a single booking, not
              // less — this was the one WhatsApp CTA inside the sidebar itself
              // that went untracked.
              onClick={() => trackConversion("whatsapp")}
              className="flex items-center gap-1.5 text-xs font-semibold text-indigo hover:text-indigo-deep transition-colors"
            >
              <WhatsappLogo className="w-3.5 h-3.5 shrink-0" />
              {b.contactCustomPlan}
            </a>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA. data-sticky-cta tells the floating WhatsApp button
          to stand down — this bar has its own, and the float would cover it. */}
      <div
        data-sticky-cta
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-card border-t border-rule px-4 py-3 flex items-center gap-3 shadow-2xl"
      >
        <div className="flex-1 min-w-0">
          {/* Same rule as the sidebar and the cards: lead with the cheapest
              per-person rate, not tour.price (the solo rate). This bar is the
              last thing a mobile visitor sees before tapping Book, so quoting
              the dearest figure here undid the fix everywhere else. */}
          <div className="text-xs text-ink-muted">
            {cheapest.minPeople > 1 ? (b.fromPerPerson ?? "From, per person") : b.perPersonMobile}
          </div>
          <div className="font-bold text-indigo text-xl leading-tight">
            {format(cheapest.price)}{priceMax ? `–${format(priceMax)}` : ""}{" "}
            <span className="text-xs font-normal text-ink-muted">
              {cheapest.minPeople > 1
                ? (b.perPersonGroupSuffix ?? "/ person, {count}+").replace("{count}", String(cheapest.minPeople))
                : b.perPersonSuffix}
            </span>
          </div>
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            track("whatsapp_click", { location: "mobile_bar", tour: tour.title });
            trackConversion("whatsapp");
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#25D366] text-white font-bold text-sm shadow-lg"
        >
          <WhatsappLogo className="w-4 h-4" />
          {b.whatsapp}
        </a>
        <button
          onClick={() => document.querySelector("form")?.scrollIntoView({ behavior: "smooth" })}
          className="btn-brass !px-4 !py-2.5 !text-sm"
        >
          {b.bookMobile}
        </button>
      </div>
    </>
  );
}
