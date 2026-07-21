"use client";
import { useState } from "react";
import Link from "next/link";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import type { Dictionary, Locale } from "@/app/[lang]/dictionaries";

export default function ContactForm({ lang = "en", dict }: { lang?: Locale; dict: Dictionary }) {
  const c = dict.contact;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [agreed, setAgreed] = useState(false);
  const { sending, sent, error, submit: doSubmit } = useFormSubmit();

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) return;
    doSubmit({ type: "general", ...form });
  }

  if (sent) {
    return (
      <div className="bg-card rounded-[4px] p-10 shadow-sm text-center ring-1 ring-rule">
        <div className="w-16 h-16 rounded-[3px] bg-indigo/12 flex items-center justify-center mx-auto mb-4">
          <PaperPlaneTilt className="w-8 h-8 text-indigo" />
        </div>
        <h3 className="font-display text-ink text-2xl font-bold mb-2">{c.messageSentTitle}</h3>
        <p className="text-ink-soft">
          {(() => {
            const [before, rest] = c.messageSentBody.split("{name}");
            const [between, after] = rest.split("{email}");
            return (<>{before}<strong>{form.name}</strong>{between}<strong>{form.email}</strong>{after}</>);
          })()}
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full px-4 py-3 rounded-[3px] border border-rule text-ink text-sm focus:outline-none focus:border-indigo focus:ring-1 focus:ring-indigo/20 placeholder:text-ink-muted transition-colors";

  return (
    <form onSubmit={submit} className="bg-card rounded-[4px] p-8 shadow-sm ring-1 ring-rule space-y-5">
      <h2 className="font-display text-ink text-2xl font-bold">{c.formHeading}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-ink-soft uppercase tracking-widest block mb-1.5">{c.formName} *</label>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder={c.formNamePlaceholder}
            className={inputCls}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-ink-soft uppercase tracking-widest block mb-1.5">{c.formEmail} *</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder={c.formEmailPlaceholder}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-ink-soft uppercase tracking-widest block mb-1.5">{c.formSubjectLabel}</label>
        <input
          type="text"
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          placeholder={c.formSubjectPlaceholder}
          className={inputCls}
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-ink-soft uppercase tracking-widest block mb-1.5">{c.formMessage} *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder={c.formMessagePlaceholder}
          className={`${inputCls} resize-none`}
        />
      </div>

      {/* Privacy consent — required before the message can be sent. */}
      <label className="flex items-start gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded-[2px] border border-rule accent-[#2B3A67] focus:outline-none focus:ring-2 focus:ring-indigo/30"
        />
        <span className="text-xs text-ink-soft leading-snug">
          {c.formConsentPrefix}{" "}
          <Link href={`/${lang}/privacy`} target="_blank" className="text-indigo underline underline-offset-2 hover:text-indigo-deep">{dict.booking.privacyPolicy}</Link>.
        </span>
      </label>

      {error && <p className="text-terracotta text-sm">{error}</p>}

      <button
        type="submit"
        disabled={sending || !agreed}
        className="w-full py-3.5 rounded-[3px] bg-indigo text-white font-bold text-base hover:bg-indigo-deep transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <PaperPlaneTilt className="w-4 h-4" />
        {sending ? c.formSending : c.formSubmit}
      </button>
    </form>
  );
}
