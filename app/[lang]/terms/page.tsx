import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "../dictionaries";
import Link from "next/link";

type LangParams = { params: Promise<{ lang: string }> };

export const metadata: Metadata = {
  title: "Terms & Conditions — Marrakech Eco Tours",
  description: "Terms and conditions governing bookings and tours with Marrakech Eco Tours.",
  robots: { index: true, follow: false },
};

export default async function TermsPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Link href={`/${lang}`} className="text-sm text-charcoal/50 hover:text-forest transition-colors mb-8 inline-block">
          ← Back to home
        </Link>

        <h1 className="font-serif text-charcoal text-5xl font-bold mb-4">Terms &amp; Conditions</h1>
        <p className="text-charcoal/50 text-sm mb-12">Last updated: June 2026</p>

        <div className="prose prose-stone max-w-none space-y-10 text-charcoal/80 leading-relaxed">

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">1. About These Terms</h2>
            <p>
              These Terms &amp; Conditions govern all bookings made with Marrakech Eco Tours ("we", "us", "our"),
              a tour operator based in Marrakech, Morocco, operating under Moroccan law. By submitting a booking
              request, paying a deposit, or making full payment through our website at{" "}
              <a href="https://marrakechecotours.com" className="text-forest hover:underline">marrakechecotours.com</a>,
              you agree to these terms on behalf of yourself and all members of your group.
            </p>
            <p className="mt-3">
              Our platform is available in multiple languages (English, French, Spanish, German, Italian, and Arabic)
              as a courtesy. In the event of any conflict between translations, the English version of these Terms
              shall prevail.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">2. Our Services</h2>
            <p>
              We offer guided trekking, desert, cultural, and adventure tours departing from Marrakech and Agadir,
              Morocco. Our tours include, but are not limited to: High Atlas mountain treks, Toubkal summit expeditions,
              Sahara desert excursions, medina cultural walks, and multi-day wilderness adventures. Full details —
              including inclusions, exclusions, fitness requirements, and duration — are listed on each individual
              tour page on our website.
            </p>
            <p className="mt-3">
              The news and travel articles featured on our website are aggregated from third-party RSS feeds for
              informational purposes only. We are not responsible for the accuracy, timeliness, or content of
              articles from external sources.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">3. Bookings &amp; Payments</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>A booking is confirmed once we have received your deposit payment and sent you a written confirmation via email.</li>
              <li>A deposit of <strong>30% of the total tour price</strong> is required to secure your booking.</li>
              <li>The remaining balance is due no later than <strong>14 days before your departure date</strong>.</li>
              <li>Bookings made within 14 days of departure require full payment at the time of booking.</li>
              <li>Payments are processed securely via <strong>PayPal</strong>. We do not store or have access to your card or bank details. PayPal's own terms and fees apply.</li>
              <li>All prices are quoted in Euros (EUR) unless otherwise stated. Exchange rate fluctuations are your responsibility.</li>
              <li>Group bookings of 6 or more persons may be subject to a custom quote — contact us before booking.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">4. Cancellation Policy</h2>
            <h3 className="font-semibold text-charcoal text-lg mb-2">Cancellation by you:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>More than 14 days before departure:</strong> Full refund of all payments made.</li>
              <li><strong>8–14 days before departure:</strong> 50% of the total tour price is charged; the remainder is refunded.</li>
              <li><strong>7 days or less before departure:</strong> No refund. The full tour price is forfeited.</li>
              <li><strong>No-show:</strong> No refund. The full tour price is forfeited.</li>
            </ul>
            <p className="mt-4">
              All cancellation requests must be made in writing to{" "}
              <a href="mailto:hello@marrakechecotours.com" className="text-forest hover:underline">hello@marrakechecotours.com</a>.
              The date of our receipt of your written cancellation determines which policy applies.
            </p>

            <h3 className="font-semibold text-charcoal text-lg mt-6 mb-2">Cancellation by us:</h3>
            <p>
              We reserve the right to cancel a tour due to insufficient bookings, severe weather, safety concerns,
              political instability, natural disaster, or force majeure events. In such cases, you will receive a
              full refund of all payments made to us. We are not liable for any additional costs you incur
              (international flights, accommodation, visas, travel insurance, etc.).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">5. Changes to Bookings</h2>
            <p>
              We will accommodate date change requests where possible, subject to availability and with at least
              14 days' notice. A date change administration fee of <strong>€25 per person</strong> may apply.
              Tour itineraries may be modified by our guides on the day for reasons of safety, weather, or
              logistics. No refund is given for itinerary modifications made in good faith for these reasons.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">6. Your Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are responsible for ensuring you hold a valid passport and any required visas for Morocco prior to travel.</li>
              <li>You are responsible for obtaining adequate travel insurance, including medical cover and emergency evacuation. We <strong>strongly recommend</strong> this for all trekking and desert tours.</li>
              <li>You must disclose any medical conditions, dietary requirements, disabilities, or mobility limitations relevant to your tour at the time of booking.</li>
              <li>You must follow the instructions of your guide at all times. Our guides have authority to modify or terminate a tour if necessary for the safety of the group.</li>
              <li>Any participant whose behaviour endangers others or is deemed inappropriate by the guide may be removed from the tour without refund.</li>
              <li>You are responsible for the safety and security of your personal belongings throughout your tour.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">7. Health &amp; Fitness</h2>
            <p>
              By completing a booking, you confirm that you and all members of your group are in suitable physical
              health to undertake the tour selected. Trekking tours — particularly Toubkal Summit ascents and
              multi-day High Atlas routes — require a good level of cardiovascular fitness and involve strenuous
              activity at altitude (up to 4,167 m / 13,671 ft). We accept no liability for injury or illness
              arising from failure to disclose relevant medical conditions prior to booking.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">8. Included &amp; Excluded Services</h2>
            <p>
              What is included and excluded is specified on each individual tour page. Unless explicitly stated as
              included, the following are <strong>excluded</strong> from all tour prices: international flights,
              Morocco entry visa fees, travel insurance, airport transfers (unless specified), personal spending
              money, meals not listed in the tour description, tips and gratuities for guides and drivers, and
              single-room supplements.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">9. Eco Commitment</h2>
            <p>
              We are committed to responsible and sustainable tourism in Morocco. We ask all participants to
              respect local environments, communities, and cultural traditions. This includes following Leave No
              Trace principles on treks, respecting local dress codes in medinas and villages, and supporting
              local economies by purchasing from local artisans and businesses where possible.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">10. Liability</h2>
            <p>
              Marrakech Eco Tours takes all reasonable steps to ensure the safety and quality of the tours we
              operate. However, we are not liable for:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Death, personal injury, illness, loss, or damage arising from circumstances beyond our reasonable control (force majeure, extreme weather, natural disaster, civil unrest, pandemic)</li>
              <li>Loss of or damage to personal belongings during a tour</li>
              <li>The acts or omissions of third-party suppliers (accommodation providers, transport operators) where we act as agent rather than principal</li>
              <li>Any costs you incur as a result of tour cancellation or modification (flights, hotels, visa fees, etc.)</li>
              <li>The accuracy of news or travel content sourced from third-party RSS feeds displayed on our website</li>
            </ul>
            <p className="mt-3">
              Our maximum liability to you in any circumstance is limited to the total price paid for your tour.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">11. Photography &amp; Media</h2>
            <p>
              Our guides may photograph or film tour activities for use on our website and social media. If you
              do not wish to appear in any photographs or videos, please inform your guide at the start of the
              tour. By participating without raising this objection, you grant us a non-exclusive, royalty-free
              licence to use images in which you appear for promotional purposes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">12. Intellectual Property</h2>
            <p>
              All content on this website — including text, design, photography, and code — is the property of
              Marrakech Eco Tours unless credited otherwise. You may not reproduce, distribute, or use any content
              without our express written permission. News articles displayed on the News page are sourced from
              third parties and remain the property of their respective publishers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">13. Complaints</h2>
            <p>
              If you have a complaint during your tour, raise it with your guide immediately so we can address
              it in real time. If unresolved, submit a written complaint to{" "}
              <a href="mailto:hello@marrakechecotours.com" className="text-forest hover:underline">
                hello@marrakechecotours.com
              </a>{" "}
              within 28 days of the end of your tour. We will acknowledge within 5 business days and respond
              in full within 14 days.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">14. Governing Law</h2>
            <p>
              These Terms &amp; Conditions are governed by the laws of the Kingdom of Morocco. Any disputes
              arising shall be subject to the exclusive jurisdiction of the courts of Marrakech, Morocco.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">15. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. The date at the top of this page reflects the most
              recent revision. Your continued use of the website or any booking made after a revision constitutes
              acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">16. Contact</h2>
            <p>
              Questions about these terms? Contact us at:{" "}
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
