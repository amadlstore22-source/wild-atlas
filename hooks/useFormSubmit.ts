"use client";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface Options {
  onSuccess?: () => void;
}

export function useFormSubmit(options?: Options) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const inFlight = useRef(false);

  async function submit(body: Record<string, unknown>) {
    if (inFlight.current) return;
    inFlight.current = true;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setSent(true);
        options?.onSuccess?.();
        toast.success("Message sent!", { description: "We'll get back to you within 24 hours." });
      } else {
        // Surface the API's own message rather than a blanket "went wrong":
        // a rate-limited visitor was being told the site is broken, when the
        // real answer is "you've sent a few already, try again shortly".
        let msg = "Something went wrong. Please try WhatsApp or email us directly.";
        let title = "Couldn't send your message";
        try {
          const data = await res.json();
          if (typeof data?.error === "string" && data.error) msg = data.error;
        } catch {
          // Non-JSON error body — keep the generic copy.
        }
        if (res.status === 429) {
          title = "Too many messages";
          const secs = Number(res.headers.get("Retry-After"));
          if (Number.isFinite(secs) && secs > 0) {
            const mins = Math.ceil(secs / 60);
            msg = `You've sent several messages already. Please try again in ${mins} minute${mins === 1 ? "" : "s"}, or reach us on WhatsApp.`;
          }
        }
        setError(msg);
        toast.error(title, { description: "Try WhatsApp for a faster response." });
      }
    } catch {
      const msg = "Network error. Please try again.";
      setError(msg);
      toast.error("Network error", { description: "Check your connection and try again." });
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }

  return { sending, sent, error, submit };
}
