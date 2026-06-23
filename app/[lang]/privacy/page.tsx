import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "../dictionaries";
import Link from "next/link";

type LangParams = { params: Promise<{ lang: string }> };

export const metadata: Metadata = {
  title: "Privacy Policy — Marrakech Eco Tours",
  description: "How Marrakech Eco Tours collects, uses, and protects your personal information.",
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
        <p className="text-charcoal/50 text-sm mb-12">Last updated: June 2025</p>

        <div className="prose prose-stone max-w-none space-y-10 text-charcoal/80 leading-relaxed">

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">1. Who We Are</h2>
            <p>
              Marrakech Eco Tours ("we", "us", "our") is a Morocco-based tour operator offering guided trekking,
              desert, cultural, and adventure tours departing from Marrakech and Agadir. Our website is{" "}
              <a href="https://marrakechecotours.com" className="text-forest hover:underline">marrakechecotours.com</a>.
              You can contact us at{" "}
              <a href="mailto:hello@marrakechecotours.com" className="text-forest hover:underline">hello@marrakechecotours.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">2. Information We Collect</h2>
            <p>We collect information you voluntarily provide when you:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Submit an enquiry or booking request through our contact form (name, email, phone, tour interest, message)</li>
              <li>Contact us via WhatsApp, email, or phone</li>
              <li>Complete a booking (payment details are processed by PayPal — we do not store card data)</li>
            </ul>
            <p className="mt-3">
              We do not use cookies for tracking, advertising, or analytics beyond what is built into the hosting
              platform (Vercel). We do not run third-party advertising scripts on this site.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">3. How We Use Your Information</h2>
            <p>We use the information you provide solely to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Respond to your enquiry and arrange your tour booking</li>
              <li>Send booking confirmations, itineraries, and pre-departure information</li>
              <li>Contact you about changes to your booking</li>
              <li>Comply with legal obligations under Moroccan law</li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or share your personal data with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">4. Third-Party Services</h2>
            <p>We use the following third-party services which may process your data:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li><strong>Vercel</strong> — website hosting (may log IP addresses for security purposes)</li>
              <li><strong>PayPal</strong> — payment processing for deposits (governed by PayPal's own privacy policy)</li>
              <li><strong>Resend</strong> — transactional email delivery for contact form submissions</li>
              <li><strong>WhatsApp</strong> — if you contact us via WhatsApp, your messages are subject to Meta's privacy policy</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfil your booking and for up to
              3 years afterwards for accounting and legal compliance purposes. Enquiries that do not result in a
              booking are deleted within 12 months.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Request access to the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (where we are not legally required to retain it)</li>
              <li>Withdraw consent at any time for communications you did not contractually agree to</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{" "}
              <a href="mailto:hello@marrakechecotours.com" className="text-forest hover:underline">hello@marrakechecotours.com</a>.
              We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">7. Security</h2>
            <p>
              We take reasonable technical and organisational measures to protect your personal data against
              unauthorised access, loss, or disclosure. Our website is served over HTTPS. Payment processing
              is handled entirely by PayPal and we never receive or store card details.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">8. Children's Privacy</h2>
            <p>
              Our services are not directed to children under the age of 16. We do not knowingly collect
              personal information from children. If you believe a child has submitted personal data to us,
              please contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The date at the top of this page reflects
              the most recent revision. Continued use of our website after changes constitutes acceptance of the
              updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">10. Contact</h2>
            <p>
              For any privacy-related questions, contact us at:{" "}
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
