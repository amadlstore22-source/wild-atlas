import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { hasLocale } from "../dictionaries";
import { SITE, SISTER_SITE } from "@/lib/constants";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

type LangParams = { params: Promise<{ lang: string }> };

const UPDATED = "19 July 2026";

export const metadata: Metadata = {
  title: "Privacy Policy — Marrakech Eco Tours",
  description: "How Marrakech Eco Tours collects, uses, and protects your personal information under Moroccan Law 09-08.",
  robots: { index: true, follow: false },
};

export default async function PrivacyPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const mail = (
    <a href={`mailto:${SITE.email}`}>{SITE.emailDisplay}</a>
  );

  const sections: LegalSection[] = [
    {
      id: "who-we-are",
      title: "Who We Are",
      body: (
        <>
          <p>
            Marrakech Eco Tours (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a Morocco-based tour
            operator offering guided trekking, desert, cultural, and adventure tours departing from Marrakech and
            Agadir. Our website is{" "}
            <a href="https://marrakechecotours.com">marrakechecotours.com</a>.
          </p>
          <p>
            We are the <strong>data controller</strong> for the personal data described in this policy. To contact
            us about it &mdash; including to exercise any of the rights set out below &mdash; email {mail}, call{" "}
            <a href={`tel:${SITE.phoneDial}`}>{SITE.phone}</a>, or write to us at {SITE.address}.
          </p>
          <p>
            We also operate a sister brand,{" "}
            <a href={SISTER_SITE.url} target="_blank" rel="noopener noreferrer">{SISTER_SITE.name}</a>{" "}
            ({SISTER_SITE.url.replace("https://", "")}), run by the same team. This policy covers
            marrakechecotours.com; the sister site publishes its own notice.
          </p>
          <p>
            This policy explains what personal data we collect, how we use it, and what rights you have. We process
            personal data in accordance with Moroccan Law No. 09-08 relating to the protection of individuals with
            regard to the processing of personal data, overseen by the CNDP (Commission Nationale de contr&ocirc;le
            de la protection des Donn&eacute;es &agrave; caract&egrave;re Personnel). Where we serve visitors in the
            European Union, we also apply GDPR-aligned standards.
          </p>
        </>
      ),
    },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      body: (
        <>
          <p>We collect only the information you voluntarily provide when you:</p>
          <ul>
            <li>Submit an enquiry or booking request through our contact form (name, email address, phone number, tour interest, travel dates, group size, and message)</li>
            <li>Contact us via WhatsApp, email, or phone directly</li>
            <li>Subscribe to our newsletter (email address only)</li>
            <li>Complete a booking and deposit payment (payment is processed by PayPal &mdash; we do not receive, store, or have access to your card or bank details)</li>
            <li>Appear in photographs taken on tour, where we have asked for and received your permission to publish them</li>
          </ul>
          <p>
            We also process a small amount of technical and preference data automatically &mdash; see{" "}
            <a href="#cookies">Cookies &amp; Similar Technologies</a> and{" "}
            <Link href={`/${lang}/cookies`}>our Cookie Policy</Link> for the full detail.
          </p>
        </>
      ),
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      body: (
        <>
          <p>We use the information you provide solely to:</p>
          <ul>
            <li>Respond to your tour enquiry and process your booking</li>
            <li>Send booking confirmations, itineraries, and pre-departure information</li>
            <li>Contact you regarding changes to your booking or tour</li>
            <li>Send newsletters, only if you have explicitly subscribed (you can unsubscribe at any time)</li>
            <li>Comply with legal and accounting obligations under Moroccan law</li>
          </ul>
          <p>
            We will never use your information for unsolicited marketing without your explicit consent. We do not
            sell, rent, share, or trade your personal data with third parties for any marketing purpose.
          </p>
        </>
      ),
    },
    {
      id: "cookies",
      title: "Cookies & Similar Technologies",
      body: (
        <>
          <p>
            Our website uses a small number of cookies. We do <strong>not</strong> use advertising cookies,
            cross-site trackers, or third-party marketing pixels, and we do not use Google Analytics. The cookies
            we set are:
          </p>
          <ul>
            <li><strong>Consent (met-cookie-consent)</strong> &mdash; remembers your cookie choice so we do not ask again. Strictly necessary.</li>
            <li><strong>Currency (met_currency)</strong> &mdash; remembers the display currency you select (EUR, USD, GBP, or MAD). Functional preference; set only when you change currency.</li>
          </ul>
          <p>
            We also use privacy-friendly, cookieless measurement (see{" "}
            <a href="#third-party">Third-Party Services</a>). A full breakdown, including how to refuse or clear
            cookies, is in our <Link href={`/${lang}/cookies`}>Cookie Policy</Link>. On your first visit a banner
            lets you accept all cookies or keep only the strictly necessary ones.
          </p>
        </>
      ),
    },
    {
      id: "third-party",
      title: "Third-Party Services",
      body: (
        <>
          <p>
            To operate our website and process bookings, we use the following processors. Each handles data under
            their own privacy terms:
          </p>
          <ul>
            <li>
              <strong>Vercel</strong> &mdash; website hosting and privacy-friendly analytics. Vercel Analytics and
              Speed Insights collect anonymised, aggregated traffic and performance data (page views, visitor
              counts, Core Web Vitals) without cookies or personal identifiers. Vercel may log standard
              server data (IP address, request timestamps) for security. See{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel&rsquo;s Privacy Policy</a>.
            </li>
            <li>
              <strong>PayPal</strong> &mdash; secure payment processing for deposits and full payments. PayPal
              handles all card and bank data directly; we never receive your payment credentials.
            </li>
            <li>
              <strong>Resend</strong> &mdash; transactional email delivery. When you submit our contact or
              newsletter form, your name and email are routed via Resend to our inbox. See{" "}
              <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Resend&rsquo;s Privacy Policy</a>.
            </li>
            <li>
              <strong>Cloudflare</strong> &mdash; DNS, network security, and email routing. Messages sent to our{" "}
              {SITE.emailDisplay} address are forwarded by Cloudflare Email Routing to the team inbox we monitor,
              so the contents of your email pass through Cloudflare in transit. As our DNS and security layer,
              Cloudflare also processes standard connection data (IP address, request metadata) to protect the
              site from abuse. See{" "}
              <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Cloudflare&rsquo;s Privacy Policy</a>.
            </li>
            <li>
              <strong>WhatsApp / Meta</strong> &mdash; if you contact us via WhatsApp, your messages are subject to
              Meta&rsquo;s own privacy policy and terms.
            </li>
            <li>
              <strong>Third-party RSS publishers</strong> &mdash; news articles on our News page are fetched
              server-side from public RSS feeds (The Guardian, BBC, NYT Travel, and others). No user-identifying
              information is sent to these publishers.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "retention",
      title: "Data Retention",
      body: (
        <p>
          We retain your personal data for as long as necessary to fulfil your booking and for up to{" "}
          <strong>5 years</strong> afterwards for accounting and legal compliance under Moroccan law. Enquiries
          that do not result in a booking are deleted within <strong>12 months</strong> of our last contact with
          you. Newsletter subscriptions are kept until you unsubscribe.
        </p>
      ),
    },
    {
      id: "your-rights",
      title: "Your Rights",
      body: (
        <>
          <p>Under Moroccan Law 09-08 (and GDPR where it applies), you have the right to:</p>
          <ul>
            <li>Request a copy of the personal data we hold about you (right of access)</li>
            <li>Request correction of any inaccurate or incomplete data (right of rectification)</li>
            <li>Request deletion of your data, where we are not legally required to retain it</li>
            <li>Object to or restrict our processing of your data in certain circumstances</li>
            <li>Withdraw consent at any time for any communication you did not contractually agree to</li>
          </ul>
          <p>
            To exercise any of these rights, email us at {mail}. We will respond within <strong>30 days</strong>.
            You also have the right to lodge a complaint with the CNDP if you believe your data has been mishandled.
          </p>
        </>
      ),
    },
    {
      id: "security",
      title: "Security",
      body: (
        <p>
          We take reasonable technical and organisational measures to protect your data against unauthorised
          access, loss, or disclosure. Our website is served exclusively over HTTPS with a strict Content Security
          Policy. All payment processing is handled by PayPal &mdash; we never receive, transmit, or store card
          data. Contact form submissions are delivered via Resend over encrypted connections.
        </p>
      ),
    },
    {
      id: "international",
      title: "International Transfers",
      body: (
        <p>
          Our primary operations and data are based in Morocco. Our hosting (Vercel) and email delivery (Resend)
          infrastructure may process data in the United States or European Union. Where personal data is
          transferred outside Morocco, we take steps to ensure appropriate protections consistent with Moroccan
          Law 09-08 and CNDP guidance.
        </p>
      ),
    },
    {
      id: "children",
      title: "Children's Privacy",
      body: (
        <p>
          Our services are not directed at children under 16, and we do not knowingly collect their personal data.
          Minors participating in tours must be accompanied by a responsible adult who agrees to these terms and
          this policy on their behalf. If you believe a child has submitted personal data to us, contact us and we
          will delete it promptly.
        </p>
      ),
    },
    {
      id: "external-links",
      title: "External Links",
      body: (
        <p>
          Our website links to external sites, including news articles and our sister brand. Once you leave our
          site this policy no longer applies, and we are not responsible for the privacy practices of third-party
          websites.
        </p>
      ),
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      body: (
        <p>
          We may update this policy from time to time to reflect changes in our services or applicable law. The
          date at the top of this page reflects the most recent revision. Continued use of our website after a
          revision constitutes acceptance of the updated policy.
        </p>
      ),
    },
    {
      id: "contact",
      title: "Contact",
      body: (
        <p>
          For any privacy-related question or to exercise your data rights, contact us at {mail}.
        </p>
      ),
    },
  ];

  return (
    <LegalPage
      lang={lang}
      eyebrow="Legal"
      title="Privacy Policy"
      intro="How we collect, use, and protect your personal information, and the rights you have over your data under Moroccan Law 09-08."
      updated={UPDATED}
      sections={sections}
    />
  );
}
