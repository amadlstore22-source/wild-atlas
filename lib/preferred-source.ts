/**
 * Google "preferred sources" (owner, 2026-10-23).
 *
 * A reader who picks marrakechecotours.com in Google's source preferences sees
 * our articles more often in Top Stories, and with a "preferred" badge in AI
 * Overviews and AI Mode, for their own searches only. Google documents three
 * ways to send readers there: its JavaScript button, an advanced JS SDK, or a
 * plain link to the preferences page:
 * https://developers.google.com/search/docs/appearance/preferred-sources
 *
 * We use the plain link. The button loads https://news.google.com/swg/js/...,
 * which our Content-Security-Policy (next.config.ts) does not allow and which
 * the cookie banner would have to account for; the link needs neither and
 * costs nothing on page speed. Google allows our own badge design.
 *
 * Eligibility checked by the owner on 2026-10-23: the preferences tool lists
 * marrakechecotours.com, with the MET logo. Only whole domains qualify, so the
 * query is the bare domain, not a page URL.
 */
export const PREFERRED_SOURCE_URL = "https://www.google.com/preferences/source?q=marrakechecotours.com";
