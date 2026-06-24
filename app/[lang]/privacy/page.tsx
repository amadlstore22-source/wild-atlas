import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "../dictionaries";
import Link from "next/link";

type LangParams = { params: Promise<{ lang: string }> };

export const metadata: Metadata = {
  title: "Privacy Policy — Marrakech Eco Tours",
  description: "How Marrakech Eco Tours collects, uses, and protects your personal information.",
  robots: { index: true, follow: false },
};

export default async function PrivacyPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Link href={`/${lang}`} className="text-sm text-charcoal/50 hover:text-forest transition-colors mb-8 inline-block">
          ← Back to home
        </Link>

        <h1 className="font-serif text-charcoal text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-charcoal/50 text-sm mb-12">Last updated: June 2026</p>

        <div className="prose prose-stone max-w-none space-y-10 text-charcoal/80 leading-relaxed">

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">1. Who We Are</h2>
            <p>
              Marrakech Eco Tours ("we", "us", "our") is a Morocco-based tour operator offering guided trekking,
              desert, cultural, and adventure tours departing from Marrakech and Agadir. Our website is{" "}
              <a href="https://marrakechecotours.com" className="text-forest hover:underline">marrakechecotours.com</a>.
              You can reach us at{" "}
              <a href="mailto:hello@marrakechecotours.com" className="text-forest hover:underline">hello@marrakechecotours.com</a>.
            </p>
            <p className="mt-3">
              This policy explains what personal data we collect, how we use it, and what rights you have over
              your information. We comply with the applicable data protection provisions under Moroccan law (Law
              09-08 relating to the protection of individuals with regard to the processing of personal data).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">2. Information We Collect</h2>
            <p>We collect only the information you voluntarily provide when you:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Submit an enquiry or booking request through our contact form (name, email address, phone number, tour interest, travel dates, group size, and message)</li>
              <li>Contact us via WhatsApp, email, or phone directly</li>
              <li>Complete a booking and deposit payment (payment is processed by PayPal — we do not receive, store, or have access to your card or bank details)</li>
            </ul>
            <p className="mt-3">
              We do not use cookies for tracking or advertising. We do not run third-party analytics scripts
              (such as Google Analytics) on this website. Our hosting provider (Vercel) may collect standard
              server logs (IP address, browser type, request timestamps) for security and performance purposes
              — see Vercel's Privacy Policy for details.
            </p>
            <p className="mt-3">
              Our News page displays travel articles aggregated from third-party RSS feeds. We do not collect
              any personal data in connection with your use of the news section.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">3. How We Use Your Information</h2>
            <p>We use the information you provide solely to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Respond to your tour enquiry and process your booking</li>
              <li>Send booking confirmations, itineraries, and pre-departure information</li>
              <li>Contact you regarding changes to your booking or tour</li>
              <li>Comply with legal and accounting obligations under Moroccan law</li>
            </ul>
            <p className="mt-3">
              We will never use your information for unsolicited marketing without your explicit consent.
              We do not sell, rent, share, or trade your personal data with third parties for any marketing purpose.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">4. Third-Party Services</h2>
            <p>
              To operate our website and process bookings, we use the following third-party services. Each
              processes data in accordance with their own privacy policies:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>
                <strong>Vercel</strong> — website hosting and deployment infrastructure. Vercel may log
                server-level data (IP addresses, request logs) for security and reliability.
              </li>
              <li>
                <strong>PayPal</strong> — secure payment processing for tour deposits and full payments.
                PayPal handles all card and bank data directly; we never receive your payment credentials.
              </li>
              <li>
                <strong>Resend</strong> — transactional email delivery. When you submit our contact form,
                your message is routed via Resend to our inbox. Resend processes your name and email address
                in order to deliver the email.
              </li>
              <li>
                <strong>WhatsApp / Meta</strong> — if you contact us directly via WhatsApp, your messages
                are subject to Meta's own privacy policy and terms of service.
              </li>
              <li>
                <strong>Third-party RSS publishers</strong> — news articles on our News page are fetched
                from public RSS feeds (The Guardian, Condé Nast Traveler, NYT Travel, and others). We do
                not share your data with these publishers; the feeds are fetched server-side with no
                user-identifying information sent.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">5. Data Retention</h2>
            <p>
              We retain your personal data for as long as necessary to fulfil your booking and for up to
              <strong> 5 years</strong> afterwards for accounting and legal compliance purposes under Moroccan
              law. Enquiries that do not result in a booking are deleted within <strong>12 months</strong> of
              our last contact with you.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">6. Your Rights</h2>
            <p>Under applicable data protection law, you have the right to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Request a copy of the personal data we hold about you</li>
              <li>Request correction of any inaccurate or incomplete data</li>
              <li>Request deletion of your data, where we are not legally required to retain it</li>
              <li>Object to or restrict our processing of your data in certain circumstances</li>
              <li>Withdraw consent at any time for any communication you did not contractually agree to</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{" "}
              <a href="mailto:hello@marrakechecotours.com" className="text-forest hover:underline">hello@marrakechecotours.com</a>.
              We will respond within <strong>30 days</strong>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">7. Security</h2>
            <p>
              We take reasonable technical and organisational measures to protect your personal data against
              unauthorised access, loss, or disclosure. Our website is served exclusively over HTTPS with
              strict Content Security Policy headers. All payment processing is handled by PayPal — we never
              receive, transmit, or store card data. Our contact form submissions are delivered via Resend
              over encrypted connections.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">8. International Transfers</h2>
            <p>
              Our primary operations and data are based in Morocco. Our hosting (Vercel) and email delivery
              (Resend) infrastructure may process data in the United States or European Union. Where personal
              data is transferred outside Morocco, we take steps to ensure appropriate protections are in place
              consistent with Moroccan Law 09-08.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">9. Children's Privacy</h2>
            <p>
              Our services are not directed at children under the age of 16. We do not knowingly collect
              personal data from children. Minors participating in tours must be accompanied by a responsible
              adult who agrees to these terms and this Privacy Policy on their behalf. If you believe a child
              has submitted personal data to us, please contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">10. External Links</h2>
            <p>
              Our website contains links to external websites, including news articles from third-party
              publishers. Once you leave our site, this Privacy Policy no longer applies. We are not
              responsible for the privacy practices of any third-party websites.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our services or
              applicable law. The date at the top of this page reflects the most recent revision. We encourage
              you to review this page periodically. Continued use of our website after a revision constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">12. Contact</h2>
            <p>
              For any privacy-related questions or to exercise your data rights, contact us at:{" "}
              <a href="mailto:hello@marrakechecotours.com" className="text-forest hover:underline">
                hello@marrakechecotours.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
