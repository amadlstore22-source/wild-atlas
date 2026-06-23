"use client";
import { useState } from "react";
import { Envelope, CreditCard, ShieldCheck, Phone, WhatsappLogo, CheckCircle } from "@phosphor-icons/react";
import type { Tour } from "@/lib/tours";
import { SITE, WHATSAPP_MESSAGES, whatsappUrl } from "@/lib/constants";
import { useFormSubmit } from "@/hooks/useFormSubmit";

export default function BookingSidebar({ tour }: { tour: Tour }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(2);
  const { sending, sent, error, submit: doSubmit } = useFormSubmit();

  function handleInquiry(e: React.FormEvent) {
    e.preventDefault();
    doSubmit({ type: "booking", tour: tour.title, name, email, date, people });
  }

  const waUrl = whatsappUrl(WHATSAPP_MESSAGES.tour(tour.title));
  const paypalUrl = `https://www.paypal.com/paypalme/${SITE.paypal}/${tour.depositAmount}`;
  const total = tour.price * people;

  return (
    <>
      {/* Desktop sidebar card */}
      <div className="bg-white rounded-2xl shadow-lg border border-sand-dark overflow-hidden">
        {/* Price header */}
        <div className="bg-forest p-6 text-white">
          <div className="text-white/70 text-xs uppercase tracking-widest mb-1">Starting from</div>
          <div className="font-serif text-4xl font-bold">${tour.price}</div>
          <div className="text-white/70 text-sm">per person</div>
          <div className="mt-4 pt-4 border-t border-white/15 grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-white/65 text-xs">Deposit</div>
              <div className="font-bold text-sunset">${tour.depositAmount}</div>
            </div>
            <div>
              <div className="text-white/65 text-xs">Response</div>
              <div className="font-bold text-white">{SITE.responseHours}h</div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Guarantee badges */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: ShieldCheck, text: `Free cancellation ${SITE.depositDays} days before` },
              { icon: CheckCircle, text: `Reply within ${SITE.responseHours} hours` },
            ].map((b) => (
              <div key={b.text} className="flex items-start gap-2 p-3 bg-sand/30 rounded-xl">
                <b.icon className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <span className="text-xs text-charcoal/60 leading-snug">{b.text}</span>
              </div>
            ))}
          </div>

          {sent ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-serif font-bold text-charcoal mb-1">Inquiry Sent!</h3>
              <p className="text-charcoal/55 text-sm leading-relaxed">
                We&apos;ll reply to <strong>{email}</strong> within {SITE.responseHours} hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquiry} className="space-y-3">
              <h3 className="font-semibold text-charcoal text-sm">Book This Tour</h3>

              <div>
                <label htmlFor="booking-name" className="text-xs font-semibold text-charcoal/50 uppercase tracking-widest block mb-1">Name *</label>
                <input
                  id="booking-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 rounded-xl border border-sand-dark text-charcoal text-sm focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 placeholder:text-charcoal/30 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="booking-email" className="text-xs font-semibold text-charcoal/50 uppercase tracking-widest block mb-1">Email *</label>
                <input
                  id="booking-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-sand-dark text-charcoal text-sm focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 placeholder:text-charcoal/30 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-charcoal/40 mb-1 block">Preferred date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-sand-dark text-charcoal text-sm focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-charcoal/40 mb-1 block">Travellers</label>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={people}
                      onChange={(e) => setPeople(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2.5 rounded-xl border border-sand-dark text-charcoal text-sm focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest/20 transition-colors"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/30 text-xs pointer-events-none">pax</span>
                  </div>
                </div>
              </div>

              {/* Total estimate */}
              {people > 0 && (
                <div className="flex items-center justify-between bg-forest/5 border border-forest/10 px-4 py-2.5 rounded-xl">
                  <span className="text-xs text-charcoal/50">Estimated total</span>
                  <span className="font-bold text-forest text-sm">${total.toLocaleString()}</span>
                </div>
              )}

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3 rounded-xl bg-sunset text-white font-bold hover:bg-orange-500 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg shadow-sunset/15 cta-pulse"
              >
                <Envelope className="w-4 h-4" />
                {sending ? "Sending…" : "Send Inquiry"}
              </button>
            </form>
          )}

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-sand-dark" />
            <span className="text-xs text-charcoal/35 shrink-0">or secure your spot now</span>
            <div className="flex-1 h-px bg-sand-dark" />
          </div>

          <a
            href={paypalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-[#0070BA] text-white font-bold hover:bg-[#005ea6] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#0070BA]/15"
          >
            <CreditCard className="w-4 h-4" />
            Pay ${tour.depositAmount} Deposit — PayPal
          </a>

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
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-forest/5 text-forest font-semibold text-xs hover:bg-forest/10 transition-colors border border-forest/10"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
          </div>

          {/* Large group + custom plan */}
          <div className="rounded-xl bg-sand/40 border border-sand-dark p-4 space-y-2.5">
            <p className="text-xs font-semibold text-charcoal/70 leading-snug">
              Travelling with a larger group or want a different itinerary?
            </p>
            <a
              href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Hello! I'd like to plan a private trip for a larger group on the "${tour.title}" tour. Can you help?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-forest hover:text-moss transition-colors"
            >
              <WhatsappLogo className="w-3.5 h-3.5 shrink-0" />
              Contact us for a custom plan →
            </a>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-sand-dark px-4 py-3 flex items-center gap-3 shadow-2xl">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-charcoal/40">From</div>
          <div className="font-bold text-forest text-xl leading-tight">
            ${tour.price} <span className="text-xs font-normal text-charcoal/35">/ person</span>
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
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-sunset text-white font-bold text-sm shadow-lg"
        >
          Book
        </button>
      </div>
    </>
  );
}
