"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#F5F0E8", color: "#111" }}>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B5E3C", marginBottom: "1rem" }}>
            Unexpected Error
          </p>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#555", maxWidth: "480px", lineHeight: 1.6, marginBottom: "2rem" }}>
            We&apos;re sorry — an unexpected error occurred. Please try again, or contact us on WhatsApp if the issue persists.
          </p>
          <button
            onClick={unstable_retry}
            style={{ padding: "0.75rem 2rem", borderRadius: "9999px", background: "#4B5D3A", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "0.9rem" }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
