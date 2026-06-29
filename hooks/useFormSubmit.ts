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
        const msg = "Something went wrong. Please try WhatsApp or email us directly.";
        setError(msg);
        toast.error("Couldn't send your message", { description: "Try WhatsApp for a faster response." });
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
