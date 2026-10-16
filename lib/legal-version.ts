/**
 * The "last updated" date of each legal page, and the version of them a
 * visitor has to accept.
 *
 * Owner, 2026-10-16: "after we update our terms of service and legal stuff,
 * anyone who opens our website has to accept again, from the start, even if
 * they are old visitors." So the consent banner stores the version it was
 * accepted under (LEGAL_VERSION_KEY) next to the choice itself, and a stored
 * choice only counts while that version is the current one. Analytics waits
 * for the new choice too (lib/analytics.ts).
 *
 * The version is the newest of the three dates, so editing a page's date here
 * is all it takes: the page shows the new date and every visitor is asked
 * again. Change a date only for a real change of substance, not a typo fix,
 * or regular visitors are asked again for nothing.
 *
 * The banner stays the bottom bar it always was, not a full-screen wall:
 * Google demotes mobile pages that hide their content behind an interstitial
 * unless the law requires it, and a cookie notice is the case it allows.
 */
export const LEGAL_UPDATED = {
  terms: "2026-10-13",
  privacy: "2026-10-13",
  // 2026-10-16: lists met-legal-version, the record of which version was accepted.
  cookies: "2026-10-16",
} as const;

export const LEGAL_VERSION: string = Object.values(LEGAL_UPDATED).sort().at(-1)!;

/** localStorage key holding the LEGAL_VERSION the visitor accepted. */
export const LEGAL_VERSION_KEY = "met-legal-version";

/** The visitor's stored choice ("all" | "necessary"), or null when there is
 *  none or it was made under an earlier version of the legal pages. */
export function currentConsent(storage: Pick<Storage, "getItem">, consentKey: string): string | null {
  const choice = storage.getItem(consentKey);
  if (choice === null) return null;
  return storage.getItem(LEGAL_VERSION_KEY) === LEGAL_VERSION ? choice : null;
}
