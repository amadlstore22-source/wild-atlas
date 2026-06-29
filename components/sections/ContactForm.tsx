"use client";
import { useState } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { useFormSubmit } from "@/hooks/useFormSubmit";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const { sending, sent, error, submit: doSubmit } = useFormSubmit();

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    doSubmit({ type: "general", ...form });
  }

  if (sent) {
    return (
      <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <PaperPlaneTilt className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-serif text-charcoal text-2xl font-bold mb-2">Message Sent!</h3>
        <p className="text-charcoal/60">
          Thank you, <strong>{form.name}</strong>. We&apos;ll reply to <strong>{form.email}</strong> — WhatsApp replies come within 24 hours, email may take a little longer.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl p-8 shadow-sm shadow-sunset/5 ring-1 ring-sand-dark/60 space-y-5">
      <h2 className="font-serif text-charcoal text-2xl font-bold">Send a Message</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-charcoal/50 uppercase tracking-widest block mb-1.5">Name *</label>
          <input
            required
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your full name"
            className="w-full px-4 py-3 rounded-xl border border-sand-dark text-charcoal text-sm focus:outline-none focus:border-forest placeholder:text-charcoal/30"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-charcoal/50 uppercase tracking-widest block mb-1.5">Email *</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl border border-sand-dark text-charcoal text-sm focus:outline-none focus:border-forest placeholder:text-charcoal/30"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-charcoal/50 uppercase tracking-widest block mb-1.5">Subject</label>
        <input
          type="text"
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          placeholder="e.g. Toubkal Trek inquiry — July 2026"
          className="w-full px-4 py-3 rounded-xl border border-sand-dark text-charcoal text-sm focus:outline-none focus:border-forest placeholder:text-charcoal/30"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-charcoal/50 uppercase tracking-widest block mb-1.5">Message *</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us about your dream adventure — dates, group size, experience level, any questions..."
          className="w-full px-4 py-3 rounded-xl border border-sand-dark text-charcoal text-sm focus:outline-none focus:border-forest placeholder:text-charcoal/30 resize-none"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="w-full py-3.5 rounded-xl bg-forest text-white font-bold text-base hover:bg-moss transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        <PaperPlaneTilt className="w-4 h-4" />
        {sending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
