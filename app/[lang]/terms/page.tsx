import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "../dictionaries";
import { SITE } from "@/lib/constants";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";

type LangParams = { params: Promise<{ lang: string }> };

const UPDATED = "21 July 2026";

export const metadata: Metadata = {
  title: "Terms & Conditions — Marrakech Eco Tours",
  description: "Terms and conditions governing bookings and tours with Marrakech Eco Tours, under Moroccan law.",
  robots: { index: true, follow: false },
};

export default async function TermsPage({ params }: LangParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const mail = <a href={`mailto:${SITE.email}`}>{SITE.emailDisplay}</a>;

  const sections: LegalSection[] = [
    {
      id: "about",
      title: "About These Terms",
      body: (
        <>
          <p>
            These Terms &amp; Conditions govern all bookings made with Marrakech Eco Tours (&ldquo;we&rdquo;,
            &ldquo;us&rdquo;, &ldquo;our&rdquo;), a tour operator based in Marrakech, Morocco, operating under
            Moroccan law. By submitting a booking request, paying a deposit, or making full payment through{" "}
            <a href="https://marrakechecotours.com">marrakechecotours.com</a>, you agree to these terms on behalf
            of yourself and all members of your group.
          </p>
          <p>
            Our website is available in English, French, Spanish, German, Italian, and Arabic as a courtesy. In
            the event of any conflict between translations, the <strong>English version prevails</strong>.
          </p>
        </>
      ),
    },
    {
      id: "services",
      title: "Our Services",
      body: (
        <>
          <p>
            We offer guided trekking, desert, cultural, and adventure tours departing from Marrakech and Agadir:
            High Atlas treks, Toubkal summit expeditions, Sahara excursions, medina cultural walks, and multi-day
            wilderness adventures. Full details &mdash; inclusions, exclusions, fitness requirements, and duration
            &mdash; are listed on each individual tour page.
          </p>
          <p>
            News and travel articles on our website are aggregated from third-party RSS feeds for information only.
            We are not responsible for the accuracy, timeliness, or content of external sources.
          </p>
        </>
      ),
    },
    {
      id: "bookings",
      title: "Bookings & Payments",
      body: (
        <ul>
          <li>A booking is confirmed once we have received your deposit and sent you a written confirmation by email.</li>
          <li>
            A deposit is required to secure your booking. The exact amount is shown on each tour page and is
            typically around a quarter of the tour price. The figure displayed on the tour page at the time of
            booking is the one that applies.
          </li>
          <li>The remaining balance is due no later than <strong>14 days before your departure date</strong>.</li>
          <li>Bookings made within 14 days of departure require full payment at the time of booking.</li>
          <li>Deposits and payments are arranged via <strong>PayPal</strong>. Where an automatic checkout link is not available on the tour page, we send a PayPal payment request by WhatsApp or email once you confirm your booking details, and your deposit is secured once that payment is completed. We do not store or access your card or bank details. PayPal&rsquo;s own terms and fees apply.</li>
          <li>Prices are displayed in your chosen currency (EUR, USD, GBP, or MAD) for convenience; the contractual price is agreed in writing on confirmation. Exchange-rate fluctuations are your responsibility.</li>
          <li>Group bookings of 6 or more persons may be subject to a custom quote &mdash; contact us before booking.</li>
        </ul>
      ),
    },
    {
      id: "cancellation",
      title: "Cancellation Policy",
      body: (
        <>
          <h3>Cancellation by you</h3>
          <dl className="tier">
            <dt>14 days or more before departure</dt>
            <dd>Full refund of all payments made, including your deposit.</dd>
            <dt>8&ndash;13 days before departure</dt>
            <dd>50% of the total tour price is charged; the remainder is refunded.</dd>
            <dt>7 days or less before departure</dt>
            <dd>No refund. The full tour price is forfeited.</dd>
            <dt>No-show</dt>
            <dd>No refund. The full tour price is forfeited.</dd>
          </dl>
          <p>
            All cancellation requests must be made in writing to {mail}. The date we receive your written
            cancellation determines which tier applies.
          </p>
          <h3>Cancellation by us</h3>
          <p>
            We reserve the right to cancel a tour due to insufficient bookings, severe weather, safety concerns,
            political instability, natural disaster, or force majeure. In such cases you receive a full refund of
            all payments made to us. We are not liable for additional costs you incur (international flights,
            accommodation, visas, travel insurance, etc.).
          </p>
        </>
      ),
    },
    {
      id: "changes-to-bookings",
      title: "Changes to Bookings",
      body: (
        <p>
          We will accommodate date-change requests where possible, subject to availability and with at least 14
          days&rsquo; notice. A date-change administration fee of <strong>&euro;25 per person</strong> may apply.
          Itineraries may be modified by our guides on the day for reasons of safety, weather, or logistics. No
          refund is given for itinerary modifications made in good faith for these reasons.
        </p>
      ),
    },
    {
      id: "responsibilities",
      title: "Your Responsibilities",
      body: (
        <ul>
          <li>You must hold a valid passport and any required visas for Morocco prior to travel.</li>
          <li>You must obtain adequate travel insurance, including medical cover and emergency evacuation. We <strong>strongly recommend</strong> this for all trekking and desert tours.</li>
          <li>You must disclose any medical conditions, dietary requirements, disabilities, or mobility limitations relevant to your tour at the time of booking.</li>
          <li>You must follow your guide&rsquo;s instructions at all times. Guides may modify or terminate a tour if necessary for the safety of the group.</li>
          <li>Any participant whose behaviour endangers others or is deemed inappropriate by the guide may be removed from the tour without refund.</li>
          <li>You are responsible for the safety and security of your personal belongings throughout your tour.</li>
        </ul>
      ),
    },
    {
      id: "health-fitness",
      title: "Health & Fitness",
      body: (
        <p>
          By completing a booking, you confirm that you and all members of your group are in suitable physical
          health for the tour selected. Trekking tours &mdash; particularly Toubkal summit ascents and multi-day
          High Atlas routes &mdash; require good cardiovascular fitness and involve strenuous activity at altitude
          (up to 4,167 m / 13,671 ft). We accept no liability for injury or illness arising from failure to
          disclose relevant medical conditions prior to booking.
        </p>
      ),
    },
    {
      id: "included-excluded",
      title: "Included & Excluded Services",
      body: (
        <p>
          What is included and excluded is specified on each individual tour page. Unless explicitly stated as
          included, the following are <strong>excluded</strong> from all tour prices: international flights, Morocco
          entry visa fees, travel insurance, airport transfers (unless specified), personal spending money, meals
          not listed in the tour description, tips and gratuities for guides and drivers, and single-room
          supplements.
        </p>
      ),
    },
    {
      id: "eco",
      title: "Eco Commitment",
      body: (
        <p>
          We are committed to responsible and sustainable tourism in Morocco. We ask all participants to respect
          local environments, communities, and cultural traditions &mdash; following Leave No Trace principles on
          treks, respecting local dress codes in medinas and villages, and supporting local economies by
          purchasing from local artisans and businesses where possible.
        </p>
      ),
    },
    {
      id: "liability",
      title: "Liability",
      body: (
        <>
          <p>
            We take all reasonable steps to ensure the safety and quality of the tours we operate. However, we are
            not liable for:
          </p>
          <ul>
            <li>Death, personal injury, illness, loss, or damage arising from circumstances beyond our reasonable control (force majeure, extreme weather, natural disaster, civil unrest, pandemic)</li>
            <li>Loss of or damage to personal belongings during a tour</li>
            <li>The acts or omissions of third-party suppliers (accommodation, transport) where we act as agent rather than principal</li>
            <li>Any costs you incur as a result of tour cancellation or modification (flights, hotels, visa fees, etc.)</li>
            <li>The accuracy of news or travel content sourced from third-party RSS feeds</li>
          </ul>
          <p>
            Our maximum liability to you in any circumstance is limited to the total price paid for your tour.
            Nothing in these terms excludes liability that cannot be excluded under applicable Moroccan law.
          </p>
        </>
      ),
    },
    {
      id: "photography",
      title: "Photography & Media",
      body: (
        <>
          <p>
            Our guides may photograph or film tour activities. Where you are identifiable in an image, we will ask
            for your permission before publishing it on our website or social media, and you are free to decline
            without giving a reason. You can also tell your guide at any point during the tour that you would
            rather not be photographed.
          </p>
          <p>
            If you change your mind after giving permission, email us at {mail} and we will remove the image from
            our own channels. Images already shared or reposted by third parties may be outside our control.
          </p>
        </>
      ),
    },
    {
      id: "ip",
      title: "Intellectual Property",
      body: (
        <p>
          The text, design, and code of this website are the property of Marrakech Eco Tours. You may not
          reproduce, distribute, or use them without our express written permission. Some photography is licensed
          from third-party stock libraries and remains the property of the respective photographers under those
          licences. News articles on the News page are sourced from third-party feeds and remain the property of
          their publishers.
        </p>
      ),
    },
    {
      id: "complaints",
      title: "Complaints",
      body: (
        <p>
          If you have a complaint during your tour, raise it with your guide immediately so we can address it in
          real time. If unresolved, submit a written complaint to {mail} within 28 days of the end of your tour.
          We will acknowledge within 5 business days and respond in full within 14 days.
        </p>
      ),
    },
    {
      id: "governing-law",
      title: "Governing Law",
      body: (
        <>
          <p>
            These Terms &amp; Conditions are governed by the laws of the Kingdom of Morocco, and disputes are
            subject to the jurisdiction of the courts of Marrakech.
          </p>
          <p>
            If you are a consumer resident in the European Union or the United Kingdom, this does not deprive you
            of the protection of mandatory consumer-law provisions in your country of residence, and you keep any
            right you have to bring proceedings in your local courts.
          </p>
        </>
      ),
    },
    {
      id: "changes",
      title: "Changes to These Terms",
      body: (
        <p>
          We may update these terms from time to time. The date at the top of this page reflects the most recent
          revision. Your continued use of the website, or any booking made after a revision, constitutes
          acceptance of the updated terms.
        </p>
      ),
    },
    {
      id: "contact",
      title: "Who You Are Contracting With",
      body: (
        <>
          <p>
            Tours booked through this website are operated by <strong>Marrakech Eco Tours</strong>, a tour operator
            based in {SITE.address}, trading since {SITE.foundedYear}.
          </p>
          <p>
            Email {mail} &middot; Telephone{" "}
            <a href={`tel:${SITE.phoneDial}`}>{SITE.phone}</a>
          </p>
          <p>
            Questions about these terms, or about a booking you have already made, can be sent to either of the
            above. We reply within {SITE.responseHours} hours.
          </p>
        </>
      ),
    },
  ];

  return (
    <LegalPage
      lang={lang}
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="The terms that govern bookings and tours with Marrakech Eco Tours. Please read them before making a booking."
      updated={UPDATED}
      sections={sections}
    />
  );
}
