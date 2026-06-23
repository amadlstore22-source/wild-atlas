"use client";
import { useState } from "react";

interface Options {
  onSuccess?: () => void;
}

export function useFormSubmit(options?: Options) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(body: Record<string, unknown>) {
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
    }
    setSending(false);
  }

  return { sending, sent, error, submit };
}
