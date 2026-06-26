"use client";
import { useRef, useState } from "react";

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
      } else {
        setError("Something went wrong. Please try WhatsApp or email us directly.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }

  return { sending, sent, error, submit };
}
