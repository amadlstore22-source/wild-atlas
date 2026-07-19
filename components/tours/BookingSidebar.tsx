"use client";
import { useState } from "react";
import Link from "next/link";
import { Envelope, CreditCard, ShieldCheck, Phone, WhatsappLogo, CheckCircle, CalendarCheck } from "@phosphor-icons/react";
import type { Tour } from "@/lib/tours";
import { SITE, WHATSAPP_MESSAGES, whatsappUrl } from "@/lib/constants";
import { useCurrency } from "@/lib/currency";
import { priceIn } from "@/lib/currency-core";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import type { Locale } from "@/app/[lang]/dictionaries";

export default function BookingSidebar({ tour, lang = "en" }: { tour: Tour; lang?: Locale }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(2);
  const [agreed, setAgreed] = useState(false);
  const { format, currency } = useCurrency();
  const { sending, sent, error, submit: doSubmit } = useFormSubmit();

  function handleInquiry(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) return;
    doSubmit({ type: "booking", tour: tour.title, name, email, date, people });
  }

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
  const totalMin = tour.price * people;
  const totalMax = priceMax ? priceMax * people : null;

  return (
    <>
      {/* Desktop sidebar card */}
      <div className="bg-card rounded-[4px] shadow-lg border border-rule overflow-hidden">
        {/* Price header */}
        <div className="bg-indigo p-6 text-white">
          <div className="text-white/70 text-xs uppercase tracking-widest mb-1">Price per person</div>
          <div className="font-display text-4xl font-bold">
            {format(tour.price)}{priceMax ? ` – ${format(priceMax)}` : ""}
          </div>
          <div className="text-white/55 text-xs mt-1">exact price agreed on booking</div>
          <div className="mt-4 pt-4 border-t border-white/15 grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-white/65 text-xs">Deposit</div>
              <div className="font-bold text-brass-glow">{format(tour.depositAmount)}</div>
            </div>
            <div>
              <div className="text-white/65 text-xs">Response</div>
              <div className="font-bold text-white">{SITE.responseHours}h</div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Answers the question the page otherwise leaves hanging: "can I go on
              my dates?". We run private departures, so there is no fixed schedule
              to fit into — saying so converts better than a calendar of open
              dates, and unlike a calendar it stays true without maintenance. */}
          <div className="rounded-[3px] border border-indigo/15 bg-indigo-wash/60 p-4">
            <div className="flex items-start gap-2.5">
              <CalendarCheck className="w-5 h-5 text-indigo shrink-0 mt-0.5" weight="duotone" />
              <div>
                <p className="text-sm font-semibold text-indigo leading-snug">You choose the dates</p>
                <p className="text-xs text-ink-soft leading-relaxed mt-1">
                  Private departures — no fixed schedule to fit into. Tell us when you want to go and we build
                  the trip around you.
                </p>
              </div>
            </div>
          </div>

          {/* Guarantee badges */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: ShieldCheck, text: `Free cancellation ${SITE.depositDays} days before` },
              { icon: CheckCircle, text: `Reply within ${SITE.responseHours} hours` },
            ].map((b) => (
              <div key={b.text} className="flex items-start gap-2 p-3 bg-surface-sunk/40 rounded-[3px]">
                <b.icon className="w-4 h-4 text-indigo shrink-0 mt-0.5" />
                <span className="text-xs text-ink-soft leading-snug">{b.text}</span>
              </div>
            ))}
          </div>

          {sent ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-indigo/12 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-7 h-7 text-indigo" />
              </div>
              <h3 className="font-display font-bold text-ink mb-1">Enquiry Sent!</h3>
              <p className="text-ink-soft text-sm leading-relaxed">
                We&apos;ll reply to <strong>{email}</strong> within {SITE.responseHours} hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquiry} className="space-y-3">
              <h3 className="font-semibold text-ink text-sm">Check Availability</h3>

              <div>
                <label htmlFor="booking-name" className="text-xs font-semibold text-ink-soft uppercase tracking-widest block mb-1">Name *</label>
                <input
                  id="booking-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 rounded-[3px] border border-rule text-ink text-sm focus:outline-none focus:border-indigo focus:ring-1 focus:ring-indigo/20 placeholder:text-ink-muted transition-colors"
                />
              </div>
              <div>
                <label htmlFor="booking-email" className="text-xs font-semibold text-ink-soft uppercase tracking-widest block mb-1">Email *</label>
                <input
                  id="booking-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-[3px] border border-rule text-ink text-sm focus:outline-none focus:border-indigo focus:ring-1 focus:ring-indigo/20 placeholder:text-ink-muted transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-ink-muted mb-1 block">Preferred date</label>
                  <input
                    type="date"
                    value={date}
                    min={minDate}
                    max={maxDate}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-[3px] border border-rule text-ink text-sm focus:outline-none focus:border-indigo focus:ring-1 focus:ring-indigo/20 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-ink-muted mb-1 block">Travellers</label>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={people}
                      onChange={(e) => setPeople(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2.5 rounded-[3px] border border-rule text-ink text-sm focus:outline-none focus:border-indigo focus:ring-1 focus:ring-indigo/20 transition-colors"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted text-xs pointer-events-none">pax</span>
                  </div>
                </div>
              </div>

              {/* Total estimate */}
              {people > 0 && (
                <div className="flex items-center justify-between bg-indigo/5 border border-indigo/10 px-4 py-2.5 rounded-[3px]">
                  <span className="text-xs text-ink-soft">Est. total</span>
                  <span className="font-bold text-indigo text-sm">
                    {format(totalMin)}{totalMax ? ` – ${format(totalMax)}` : ""}
                  </span>
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
                  I have read and agree to the{" "}
                  <Link href={`/${lang}/terms`} target="_blank" className="text-indigo underline underline-offset-2 hover:text-indigo-deep">Terms &amp; Conditions</Link>{" "}
                  and{" "}
                  <Link href={`/${lang}/privacy`} target="_blank" className="text-indigo underline underline-offset-2 hover:text-indigo-deep">Privacy Policy</Link>.
                </span>
              </label>

              {error && <p className="text-terracotta text-sm">{error}</p>}

              <button
                type="submit"
                disabled={sending || !agreed}
                className="btn-brass w-full !py-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Envelope className="w-4 h-4" />
                {sending ? "Sending…" : "Send Enquiry"}
              </button>
            </form>
          )}

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-rule" />
            <span className="text-xs text-ink-muted shrink-0">or secure your spot now</span>
            <div className="flex-1 h-px bg-rule" />
          </div>

          {paypalUrl ? (
            <a
              href={paypalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-[3px] bg-[#0070BA] text-white font-bold hover:bg-[#005ea6] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#0070BA]/15"
            >
              <CreditCard className="w-4 h-4" />
              Pay {format(tour.depositAmount)} Deposit — PayPal
            </a>
          ) : (
            // No PayPal handle configured. Rather than hide the deposit step,
            // keep the customer moving: name the amount and give them a way to
            // ask for a link. Guessing a handle would risk paying a stranger.
            <div className="rounded-[3px] border border-rule bg-surface-sunk/40 p-4 space-y-2.5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Deposit to confirm
                </span>
                <span className="font-display text-lg font-bold text-ink">
                  {format(tour.depositAmount)}
                </span>
              </div>
              <p className="text-xs text-ink-soft leading-snug">
                We send a secure payment link once your dates are agreed, so you
                only pay for a departure we have confirmed.
              </p>
              <a
                href={depositRequestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-[3px] bg-indigo text-white font-bold text-sm hover:bg-indigo-deep transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Request a payment link
              </a>
            </div>
          )}

          {/* Contact alternatives */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#25D366]/10 text-[#128C7E] font-semibold text-xs hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20"
            >
              <WhatsappLogo className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href={`tel:${SITE.phoneDial}`}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-[3px] bg-indigo/5 text-indigo font-semibold text-xs hover:bg-indigo/10 transition-colors border border-indigo/10"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
          </div>

          {/* Large group + custom plan */}
          <div className="rounded-[3px] bg-surface-sunk/40 border border-rule p-4 space-y-2.5">
            <p className="text-xs font-semibold text-ink-soft leading-snug">
              Travelling with a larger group or want a different itinerary?
            </p>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Hello! I'd like to plan a private trip for a larger group on the "${tour.title}" tour. Can you help?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-indigo hover:text-indigo-deep transition-colors"
            >
              <WhatsappLogo className="w-3.5 h-3.5 shrink-0" />
              Contact us for a custom plan →
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
          <div className="text-xs text-ink-muted">Per person</div>
          <div className="font-bold text-indigo text-xl leading-tight">
            {format(tour.price)}{priceMax ? `–${format(priceMax)}` : ""} <span className="text-xs font-normal text-ink-muted">/ person</span>
          </div>
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#25D366] text-white font-bold text-sm shadow-lg"
        >
          <WhatsappLogo className="w-4 h-4" />
          WhatsApp
        </a>
        <button
          onClick={() => document.querySelector("form")?.scrollIntoView({ behavior: "smooth" })}
          className="btn-brass !px-4 !py-2.5 !text-sm"
        >
          Book
        </button>
      </div>
    </>
  );
}
