import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { hasLocale } from "../dictionaries";
import { SITE } from "@/lib/constants";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

type LangParams = { params: Promise<{ lang: string }> };

const UPDATED = "21 July 2026";

export const metadata: Metadata = {
  title: "Cookie Policy — Marrakech Eco Tours",
  description: "The cookies and privacy-friendly measurement Marrakech Eco Tours uses, and how to control them.",
  robots: { index: true, follow: false },
};

export default async function CookiesPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const mail = <a href={`mailto:${SITE.email}`}>{SITE.emailDisplay}</a>;

  const sections: LegalSection[] = [
    {
      id: "what-are-cookies",
      title: "What Are Cookies",
      body: (
        <p>
          Cookies are small text files a website stores in your browser. They let a site remember choices you have
          made and function correctly. This policy explains the cookies we use, why, and how to control them. It
          sits alongside our <Link href={`/${lang}/privacy`}>Privacy Policy</Link>.
        </p>
      ),
    },
    {
      id: "our-approach",
      title: "Our Approach",
      body: (
        <>
          <p>
            We keep cookies to a minimum. We do <strong>not</strong> use advertising cookies, cross-site trackers,
            social media pixels, or Google Analytics. We never sell data collected through cookies.
          </p>
          <p>
            On your first visit, a banner lets you <strong>Accept all</strong> cookies or keep only the{" "}
            <strong>Necessary</strong> ones. Either choice lets you use the whole site &mdash; there is no cookie
            wall. Your choice is remembered so we do not ask again.
          </p>
        </>
      ),
    },
    {
      id: "cookies-we-use",
      title: "Cookies We Use",
      body: (
        <>
          <h3>Strictly necessary</h3>
          <dl className="tier">
            <dt>met-cookie-consent</dt>
            <dd>Stores your cookie choice so the banner does not reappear. No consent required (exempt). Persists up to 1 year.</dd>
          </dl>
          <h3>Functional (preference)</h3>
          <dl className="tier">
            <dt>met_currency</dt>
            <dd>Remembers the display currency you select (EUR, USD, GBP, or MAD). Set only when you change currency. Persists up to 1 year.</dd>
          </dl>
          <p>
            We do not currently set any analytics or marketing cookies. If that ever changes, we will update this
            policy and ask for your consent first.
          </p>
        </>
      ),
    },
    {
      id: "measurement",
      title: "Cookieless Measurement",
      body: (
        <p>
          To understand aggregate traffic and site performance we use <strong>Vercel Analytics</strong> and{" "}
          <strong>Vercel Speed Insights</strong>. These are privacy-friendly and <strong>do not use cookies</strong>{" "}
          or fingerprinting &mdash; they collect only anonymised, aggregated metrics (page views, visitor counts,
          Core Web Vitals) and cannot identify you. See{" "}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel&rsquo;s Privacy Policy</a>.
        </p>
      ),
    },
    {
      id: "third-party",
      title: "Third-Party Cookies",
      body: (
        <p>
          Some pages embed or link to third-party services that may set their own cookies when you interact with
          them &mdash; for example <strong>PayPal</strong> when you follow a payment link we send you, or{" "}
          <strong>WhatsApp / Meta</strong> if you start a chat. These are governed by those providers&rsquo; own
          cookie and privacy policies, not ours.
        </p>
      ),
    },
    {
      id: "managing-cookies",
      title: "Managing & Removing Cookies",
      body: (
        <>
          <p>You are always in control:</p>
          <ul>
            <li>Choose <strong>Necessary only</strong> on the consent banner to avoid the functional cookie.</li>
            <li>Delete cookies at any time in your browser settings; clearing them will reset your currency and consent choices.</li>
            <li>Set your browser to block or warn about cookies. The site will still work, though it may not remember your currency.</li>
          </ul>
          <p>
            Most browsers explain how to manage cookies in their Help section (Chrome, Safari, Firefox, Edge).
          </p>
        </>
      ),
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      body: (
        <p>
          We may update this Cookie Policy as our site evolves or the law changes. The date at the top reflects
          the most recent revision.
        </p>
      ),
    },
    {
      id: "contact",
      title: "Contact",
      body: <p>Questions about cookies? Contact us at {mail}.</p>,
    },
  ];

  return (
    <LegalPage
      lang={lang}
      eyebrow="Legal"
      title="Cookie Policy"
      intro="The cookies and privacy-friendly measurement we use, why, and how you can control them."
      updated={UPDATED}
      sections={sections}
    />
  );
}
