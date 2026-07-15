"use client";
import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";

interface Props {
  placeholder: string;
  buttonLabel: string;
}

export default function NewsletterForm({ placeholder, buttonLabel }: Props) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <p className="text-sm text-[#25D366] font-medium py-2">
        ✓ You&rsquo;re on the list — check your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="flex-1 min-w-0 bg-white/8 border border-white/15 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/35 transition-colors"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald text-cream text-sm font-semibold hover:bg-emerald-soft disabled:opacity-60 transition-colors shrink-0"
      >
        {state === "loading" ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            {buttonLabel}
            <ArrowRight className="w-3.5 h-3.5" weight="bold" />
          </>
        )}
      </button>
      {state === "error" && (
        <p className="absolute bottom-0 text-xs text-[#C97050] mt-1">Failed — try again.</p>
      )}
    </form>
  );
}
