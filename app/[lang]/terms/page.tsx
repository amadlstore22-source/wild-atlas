import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "../dictionaries";
import Link from "next/link";

type LangParams = { params: Promise<{ lang: string }> };

export const metadata: Metadata = {
  title: "Terms & Conditions — Marrakech Eco Tours",
  description: "Terms and conditions governing bookings and tours with Marrakech Eco Tours.",
};

export default async function TermsPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <div className="min-h-screen bg-offwhite">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Link href={`/${lang}`} className="text-sm text-charcoal/50 hover:text-forest transition-colors mb-8 inline-block">
          ← Back to home
        </Link>

        <h1 className="font-serif text-charcoal text-5xl font-bold mb-4">Terms &amp; Conditions</h1>
        <p className="text-charcoal/50 text-sm mb-12">Last updated: June 2025</p>

        <div className="prose prose-stone max-w-none space-y-10 text-charcoal/80 leading-relaxed">

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">1. About These Terms</h2>
            <p>
              These Terms &amp; Conditions govern all bookings made with Marrakech Eco Tours ("we", "us", "our"),
              a tour operator based in Marrakech, Morocco. By submitting a booking request or paying a deposit,
              you agree to these terms on behalf of yourself and all members of your group.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">2. Bookings &amp; Deposits</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>A booking is confirmed once we have received your deposit payment and sent you a written confirmation.</li>
              <li>A deposit of 30% of the total tour price is required to secure your booking.</li>
              <li>The remaining balance is due no later than <strong>14 days before your departure date</strong>.</li>
              <li>Bookings made within 14 days of departure require full payment at the time of booking.</li>
              <li>Deposits are processed via PayPal. We do not accept responsibility for any fees charged by PayPal or your bank.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">3. Cancellation Policy</h2>
            <h3 className="font-semibold text-charcoal text-lg mb-2">Cancellation by you:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>More than 14 days before departure:</strong> Full refund of all payments made.</li>
              <li><strong>8–14 days before departure:</strong> 50% of the total tour price is charged; the remainder is refunded.</li>
              <li><strong>7 days or less before departure:</strong> No refund. The full tour price is forfeited.</li>
              <li><strong>No-show:</strong> No refund. The full tour price is forfeited.</li>
            </ul>
            <p className="mt-4">All cancellation requests must be made in writing to{" "}
              <a href="mailto:hello@marrakechecotours.com" className="text-forest hover:underline">hello@marrakechecotours.com</a>.
              The date of our receipt of your written cancellation determines which policy applies.
            </p>

            <h3 className="font-semibold text-charcoal text-lg mt-6 mb-2">Cancellation by us:</h3>
            <p>
              We reserve the right to cancel a tour due to insufficient bookings, severe weather, safety concerns,
              political instability, or force majeure events. In such cases, you will receive a full refund of all
              payments made. We are not liable for any additional costs you incur (flights, accommodation, visas, etc.).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">4. Changes to Bookings</h2>
            <p>
              We will accommodate date change requests where possible, subject to availability, and with at least
              14 days' notice. A date change fee of €25 per person may apply. Tour itineraries may be modified
              by our guides on the day for safety, weather, or logistical reasons. No refund is given for
              itinerary modifications made in good faith.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">5. Your Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are responsible for ensuring you hold a valid passport and any required visas for Morocco.</li>
              <li>You are responsible for obtaining adequate travel insurance, including medical and emergency evacuation cover. We strongly recommend this for all trekking tours.</li>
              <li>You must inform us of any medical conditions, dietary requirements, or mobility limitations relevant to your tour at the time of booking.</li>
              <li>You must follow the instructions of your guide at all times. Our guides have authority to modify or terminate a tour if they deem it necessary for the safety of the group.</li>
              <li>You are responsible for your own behaviour. Any participant whose conduct endangers others or is deemed inappropriate by the guide may be removed from the tour without refund.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">6. Health &amp; Fitness</h2>
            <p>
              You confirm that you and all members of your group are in suitable physical health to undertake the
              tour selected. Trekking tours (particularly Toubkal Summit and multi-day High Atlas routes) require
              a good level of fitness and involve strenuous physical activity at altitude. We accept no liability
              for injury or illness arising from failure to disclose relevant medical conditions prior to booking.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">7. Included &amp; Excluded Services</h2>
            <p>
              What is included and excluded in each tour is specified on the individual tour page. Unless
              explicitly stated as included, the following are <strong>not included</strong>: international
              flights, Morocco entry visa fees, travel insurance, personal spending money, meals not listed,
              tips and gratuities, and single-room supplements.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">8. Liability</h2>
            <p>
              Marrakech Eco Tours acts as organiser for all tours we operate directly. We take all reasonable
              steps to ensure the safety and quality of our tours. However, we are not liable for:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Death, injury, illness, loss, or damage arising from circumstances beyond our reasonable control (force majeure, extreme weather, natural disaster, civil unrest)</li>
              <li>Loss or damage to personal belongings during a tour</li>
              <li>The acts or omissions of third-party suppliers (accommodation, transport) where we act as agent</li>
              <li>Any costs you incur as a result of tour cancellation or modification (flights, hotels, etc.)</li>
            </ul>
            <p className="mt-3">
              Our maximum liability to you in any circumstance is limited to the total price paid for your tour.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">9. Photography &amp; Media</h2>
            <p>
              Our guides may photograph or film tour activities for use on our website and social media. If you
              do not wish to appear in any photographs or videos, please inform your guide at the start of the
              tour. By participating in a tour without raising this objection, you grant us a non-exclusive,
              royalty-free licence to use images in which you appear for promotional purposes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">10. Complaints</h2>
            <p>
              If you have a complaint during your tour, please raise it with your guide immediately so we have
              the opportunity to resolve it. If the matter is not resolved, submit a written complaint to{" "}
              <a href="mailto:hello@marrakechecotours.com" className="text-forest hover:underline">
                hello@marrakechecotours.com
              </a>{" "}
              within 28 days of the end of your tour. We will respond within 14 days.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">11. Governing Law</h2>
            <p>
              These Terms &amp; Conditions are governed by the laws of the Kingdom of Morocco. Any disputes
              arising shall be subject to the exclusive jurisdiction of the courts of Marrakech, Morocco.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-charcoal text-2xl font-bold mb-3">12. Contact</h2>
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
