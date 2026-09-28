/**
 * The guides credited on every MET-written blog post, in the owner's order
 * (given 2026-09-28: "Yassine+Aziz+Hassan+Mouhammed+Ismail").
 *
 * Mohamed and Smail are the same people as the Mohamed Aitidar and Smail
 * Aitidar profiles in lib/guides.ts -- the owner confirmed it and chose the
 * guide-page spelling, so the byline and the profiles name ONE person each.
 * That link is the point: a byline that resolves to a real guide page with a
 * biography is what Google's author guidance asks for; a bare first name
 * resolves to nobody. Yassine, Aziz and Hassan have no profile page yet, so
 * they are named without a link rather than linked to something invented.
 */
export interface BylineMember {
  name: string;
  /** The same name in Arabic script, for /ar. The Arabic guide profiles
   *  already spell Smail "إسماعيل" and Mohamed "محمد", so these match them. */
  ar: string;
  /** lib/guides.ts id; must exist in every locale (enforced by a test). The
   *  full name for schema comes from that locale's profile, never from here,
   *  so the byline and the profile cannot spell one person two ways. */
  guideId?: string;
}

export const BLOG_BYLINE: BylineMember[] = [
  { name: "Yassine", ar: "ياسين" },
  { name: "Aziz", ar: "عزيز" },
  { name: "Hassan", ar: "حسن" },
  { name: "Mohamed", ar: "محمد", guideId: "mohamed-aitidar" },
  { name: "Smail", ar: "إسماعيل", guideId: "smail-aitidar" },
];

export const bylineName = (m: BylineMember, lang: string) => (lang === "ar" ? m.ar : m.name);
