import Link from "next/link";
import type { LegalCtx, LegalDoc } from "@/components/legal/LegalPage";

export default function cookiesEn({ lang, mail }: LegalCtx): LegalDoc {
  return {
    metaTitle: "Cookie Policy",
    metaDescription: "The cookies and privacy-friendly measurement Marrakech Eco Tours uses, and how to control them.",
    title: "Cookie Policy",
    intro: "The cookies and privacy-friendly measurement we use, why, and how you can control them.",
    sections: [
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
              We keep cookies to a minimum and we never sell data collected through cookies. We use{" "}
              <strong>Google Analytics</strong> and <strong>Microsoft Clarity</strong> to understand how visitors find
              and use the site, and <strong>only</strong> if you accept them &mdash; both are switched off until you choose{" "}
              <strong>Accept all</strong>. We do not use social media pixels or cross-site advertising trackers.
            </p>
            <p>
              On your first visit, a banner lets you <strong>Accept all</strong> cookies or keep only the{" "}
              <strong>Necessary</strong> ones. If you choose Necessary only, no analytics cookies are set and Google
              Analytics does not load at all. Either choice lets you use the whole site &mdash; there is no cookie
              wall. Your choice is remembered so we do not ask again, and you can change it any time by clearing your
              cookies.
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
            <h3>Analytics &mdash; set only if you Accept all</h3>
            <p>
              The following are set by <strong>Google Analytics (GA4)</strong>, and only after you choose{" "}
              <strong>Accept all</strong>. Choose <strong>Necessary only</strong> and none of these are ever set.
              They help us see, in aggregate, which pages and tours visitors are interested in, and whether our ads
              bring the right people &mdash; we do not use them to identify you personally.
            </p>
            <dl className="tier">
              <dt>_ga</dt>
              <dd>Distinguishes one visitor&rsquo;s browser from another so visits can be counted. Set by Google Analytics. Persists up to 2 years.</dd>
              <dt>_ga_&lt;container&gt;</dt>
              <dd>Keeps the state of your session for Google Analytics 4. Persists up to 2 years.</dd>
              <dt>_gid</dt>
              <dd>Distinguishes visitors over a short window. Set by Google Analytics. Persists up to 24 hours.</dd>
            </dl>
            <p>
              Also only after <strong>Accept all</strong>, <strong>Microsoft Clarity</strong> shows us, in aggregate
              and as anonymised replays, where visitors click and scroll, so we can fix pages that confuse people.
              Clarity masks what you type into forms. Its cookies:
            </p>
            <dl className="tier">
              <dt>_clck</dt>
              <dd>Keeps the Clarity user ID and preferences for this site. Set by Microsoft Clarity.</dd>
              <dt>_clsk</dt>
              <dd>Connects the pages of one visit into a single session. Set by Microsoft Clarity.</dd>
              <dt>CLID, MUID, ANONCHK, MR, SM</dt>
              <dd>Third-party cookies on Microsoft domains that Clarity uses to recognise a browser; Clarity does not use them for advertising (ANONCHK is always 0). See Microsoft&rsquo;s list of Clarity cookies.</dd>
            </dl>
          </>
        ),
      },
      {
        id: "measurement",
        title: "Cookieless Measurement",
        body: (
          <>
          <p>
            We also count clicks on the trip suggestions inside our articles. For each click we record only the
            date, the language, the article and the tour clicked &mdash; <strong>no cookie</strong>, no IP address
            and nothing that could identify you &mdash; so it runs whatever you choose on the banner.
          </p>
          <p>
            Separately from the analytics cookies above, we use <strong>Vercel Analytics</strong> and{" "}
            <strong>Vercel Speed Insights</strong> to measure site performance. These are privacy-friendly and{" "}
            <strong>do not use cookies</strong> or fingerprinting &mdash; they collect only anonymised, aggregated
            metrics (page views, visitor counts, Core Web Vitals), always run, and cannot identify you. See{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel&rsquo;s Privacy Policy</a>.
          </p>
          </>
        ),
      },
      {
        id: "third-party",
        title: "Third-Party Cookies",
        body: (
          <>
            <p>
              When you accept all cookies, <strong>Google</strong> (Google Analytics, and Google Ads conversion
              measurement) sets the cookies listed above and may use them to measure the performance of our
              advertising. This is governed by{" "}
              <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">Google&rsquo;s cookie policy</a>{" "}
              and{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.
            </p>
            <p>
              When you accept all cookies, <strong>Microsoft</strong> (Clarity) sets the cookies listed above. This is
              governed by the{" "}
              <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies" target="_blank" rel="noopener noreferrer">Clarity cookie list</a>{" "}
              and the{" "}
              <a href="https://www.microsoft.com/en-us/privacy/privacystatement" target="_blank" rel="noopener noreferrer">Microsoft Privacy Statement</a>.
            </p>
            <p>
              Some pages also embed or link to other third-party services that may set their own cookies when you
              interact with them &mdash; for example <strong>PayPal</strong> when you follow a payment link we send
              you, or <strong>WhatsApp / Meta</strong> if you start a chat. These are governed by those
              providers&rsquo; own cookie and privacy policies, not ours.
            </p>
          </>
        ),
      },
      {
        id: "managing-cookies",
        title: "Managing & Removing Cookies",
        body: (
          <>
            <p>You are always in control:</p>
            <ul>
              <li>Choose <strong>Necessary only</strong> on the consent banner to avoid the functional and analytics cookies &mdash; Google Analytics and Microsoft Clarity will not load.</li>
              <li>To withdraw consent after accepting, clear this site&rsquo;s cookies in your browser; the banner reappears and you can choose again. Clearing also resets your currency choice.</li>
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
    ],
  };
}
