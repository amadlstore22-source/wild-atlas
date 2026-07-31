"use client";
import { trackConversion } from "@/lib/analytics";

/**
 * WhatsApp and phone links that report a conversion by default.
 *
 * Tracking used to be added per call site, so it existed on the booking
 * sidebar and the floating button but was missing from the contact page's
 * primary CTA, the footer, the tours page, the destination and guide pages,
 * and the CTA banner — 8 CTAs in total. A paid click that converted through
 * any of those registered in Google Ads as a click that did NOT convert, so
 * bidding was optimising against incomplete data.
 *
 * Defaulting to tracked means a new CTA is counted unless someone explicitly
 * opts out, which is the safer direction for this failure mode.
 */

interface CommonProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  /** Opt out for links that are contact details rather than conversion CTAs
   *  (e.g. the phone number printed in the privacy and terms pages). */
  noTrack?: boolean;
  "aria-label"?: string;
}

export function WhatsAppLink({ href, className, children, noTrack, ...rest }: CommonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={noTrack ? undefined : () => trackConversion("whatsapp")}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}

export function PhoneLink({ href, className, children, noTrack, ...rest }: CommonProps) {
  return (
    <a
      href={href}
      onClick={noTrack ? undefined : () => trackConversion("phone")}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
