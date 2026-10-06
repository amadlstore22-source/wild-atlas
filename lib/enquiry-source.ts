/**
 * "How did you hear about us?" on the enquiry forms.
 *
 * Added 2026-10-06. Clarity showed ChatGPT referring ~22% of sessions, but GA4
 * and Clarity only see the visit that converts, not the conversation that sent
 * someone here a week earlier. Asking is the only way to learn which channels
 * actually produce enquiries, so the answer goes into the admin email and the
 * enquiry sheet.
 *
 * The browser sends a KEY, never free text: the server maps it to one fixed
 * English label, so every email reads the same whatever the page language,
 * and an unknown value is dropped rather than echoed into the inbox.
 * Optional on every form — a required marketing question costs enquiries.
 */
export const ENQUIRY_SOURCES = {
  google: "Google search",
  ai: "ChatGPT or another AI assistant",
  tripadvisor: "TripAdvisor",
  social: "Instagram or Facebook",
  friend: "A friend or family member",
  returning: "Travelled with us before",
  other: "Other",
} as const;

export type EnquirySource = keyof typeof ENQUIRY_SOURCES;
export const ENQUIRY_SOURCE_KEYS = Object.keys(ENQUIRY_SOURCES) as EnquirySource[];

/** The English label for a submitted key, or "" for anything else. */
export function enquirySourceLabel(key: unknown): string {
  return typeof key === "string" && Object.hasOwn(ENQUIRY_SOURCES, key)
    ? ENQUIRY_SOURCES[key as EnquirySource]
    : "";
}
