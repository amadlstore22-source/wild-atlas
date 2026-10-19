import type { FormEvent } from "react";

/**
 * A field people never see and spam bots fill in. /api/contact and
 * /api/newsletter answer "ok" to any submission that carries it and send
 * nothing, so a bot gets no signal to adapt to (security audit, 2026-10-19).
 *
 * Hidden off-screen rather than with display:none, which some bots skip, and
 * kept out of the tab order and the accessibility tree so keyboard and screen
 * reader users never land on it. autocomplete="off" stops password managers
 * and autofill from filling it for a real visitor.
 */
export const HONEYPOT_NAME = "website";

export default function Honeypot() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
      <label>
        Website
        <input type="text" name={HONEYPOT_NAME} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

/** The honeypot's value in the form being submitted ("" for a real visitor). */
export function honeypotValue(e: FormEvent): string {
  const form = e.currentTarget as HTMLFormElement | null;
  const field = form?.elements?.namedItem?.(HONEYPOT_NAME) as HTMLInputElement | null;
  return field?.value ?? "";
}
