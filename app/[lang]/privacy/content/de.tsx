import Link from "next/link";
import { SITE, SISTER_SITE } from "@/lib/constants";
import type { LegalCtx, LegalDoc } from "@/components/legal/LegalPage";

export default function privacyDe({ lang, mail }: LegalCtx): LegalDoc {
  return {
    metaTitle: "Datenschutzerklärung",
    metaDescription: "Wie Marrakech Eco Tours Ihre personenbezogenen Daten nach dem marokkanischen Gesetz 09-08 erhebt, nutzt und schützt.",
    title: "Datenschutzerklärung",
    intro: "Wie wir Ihre personenbezogenen Daten erheben, nutzen und schützen, und welche Rechte Sie nach dem marokkanischen Gesetz 09-08 an Ihren Daten haben.",
    sections: [
      {
        id: "who-we-are",
        title: "Wer wir sind",
        body: (
          <>
            <p>
              Marrakech Eco Tours („wir“, „uns“) ist ein Reiseveranstalter mit Sitz in Marokko, der geführte
              Trekking-, Wüsten-, Kultur- und Abenteuertouren ab Marrakesch und Agadir anbietet. Unsere Website ist{" "}
              <a href="https://marrakechecotours.com">marrakechecotours.com</a>.
            </p>
            <p>
              Wir sind der <strong>Verantwortliche</strong> für die in dieser Erklärung beschriebenen
              personenbezogenen Daten. Um uns dazu zu kontaktieren – auch um eines der unten genannten Rechte
              auszuüben –, schreiben Sie an {mail}, rufen Sie <a href={`tel:${SITE.phoneDial}`}>{SITE.phone}</a> an
              oder schreiben Sie uns an {SITE.address}.
            </p>
            <p>
              Wir betreiben außerdem eine Schwestermarke,{" "}
              <a href={SISTER_SITE.url} target="_blank" rel="noopener noreferrer">{SISTER_SITE.name}</a>{" "}
              ({SISTER_SITE.url.replace("https://", "")}), die vom selben Team geführt wird. Diese Erklärung gilt für
              marrakechecotours.com; die Website der Schwestermarke veröffentlicht einen eigenen Hinweis.
            </p>
            <p>
              Diese Erklärung beschreibt, welche personenbezogenen Daten wir erheben, wie wir sie nutzen und welche
              Rechte Sie haben. Wir verarbeiten personenbezogene Daten gemäß dem marokkanischen Gesetz Nr. 09-08 zum
              Schutz natürlicher Personen bei der Verarbeitung personenbezogener Daten, beaufsichtigt von der CNDP
              (Commission Nationale de contrôle de la protection des Données à caractère Personnel). Für Besucher aus
              der Europäischen Union wenden wir zusätzlich an der DSGVO ausgerichtete Standards an.
            </p>
          </>
        ),
      },
      {
        id: "information-we-collect",
        title: "Welche Daten wir erheben",
        body: (
          <>
            <p>Wir erheben nur die Informationen, die Sie uns freiwillig mitteilen, wenn Sie:</p>
            <ul>
              <li>über unser Kontaktformular eine Anfrage oder Buchungsanfrage senden (Name, E-Mail-Adresse, Telefonnummer, gewünschte Tour, Reisedaten, Gruppengröße und Nachricht)</li>
              <li>uns direkt per WhatsApp, E-Mail oder Telefon kontaktieren</li>
              <li>unseren Newsletter abonnieren (nur E-Mail-Adresse)</li>
              <li>eine Buchung und eine Anzahlung tätigen (die Zahlung wird von PayPal abgewickelt – wir erhalten, speichern oder sehen Ihre Karten- oder Bankdaten nicht)</li>
              <li>auf Fotos erscheinen, die während einer Tour aufgenommen wurden, sofern wir Sie um Erlaubnis zur Veröffentlichung gebeten und diese erhalten haben</li>
            </ul>
            <p>
              Außerdem verarbeiten wir automatisch eine kleine Menge technischer und Präferenzdaten – siehe{" "}
              <a href="#cookies">Cookies und ähnliche Technologien</a> sowie{" "}
              <Link href={`/${lang}/cookies`}>unsere Cookie-Richtlinie</Link> für alle Einzelheiten.
            </p>
          </>
        ),
      },
      {
        id: "how-we-use",
        title: "Wie wir Ihre Daten nutzen",
        body: (
          <>
            <p>Wir nutzen die von Ihnen bereitgestellten Informationen ausschließlich, um:</p>
            <ul>
              <li>Ihre Anfrage zu beantworten und Ihre Buchung zu bearbeiten</li>
              <li>Buchungsbestätigungen, Reiseverläufe und Informationen vor der Abreise zu senden</li>
              <li>Sie über Änderungen an Ihrer Buchung oder Tour zu informieren</li>
              <li>Newsletter zu versenden, nur wenn Sie diese ausdrücklich abonniert haben (Abmeldung jederzeit möglich)</li>
              <li>gesetzliche und buchhalterische Pflichten nach marokkanischem Recht zu erfüllen</li>
            </ul>
            <p>
              Wir verwenden Ihre Informationen niemals ohne Ihre ausdrückliche Einwilligung für unerwünschte Werbung.
              Wir verkaufen, vermieten, teilen oder tauschen Ihre personenbezogenen Daten nicht zu Werbezwecken mit
              Dritten.
            </p>
          </>
        ),
      },
      {
        id: "cookies",
        title: "Cookies und ähnliche Technologien",
        body: (
          <>
            <p>
              Unsere Website verwendet nur wenige Cookies. Wir verwenden <strong>keine</strong> Social-Media-Pixel
              und keine seitenübergreifenden Werbetracker. Folgende Cookies setzen wir:
            </p>
            <ul>
              <li><strong>Einwilligung (met-cookie-consent)</strong> – speichert Ihre Cookie-Auswahl, damit wir nicht erneut fragen. Unbedingt erforderlich.</li>
              <li><strong>Währung (met_currency)</strong> – speichert die gewählte Anzeigewährung (EUR, USD, GBP oder MAD). Funktionale Präferenz; wird nur gesetzt, wenn Sie die Währung ändern.</li>
              <li><strong>Google Analytics (_ga, _gid und verwandte)</strong> – helfen uns, in zusammengefasster Form zu verstehen, wie Besucher die Website nutzen und ob unsere Werbung die richtigen Menschen erreicht. <strong>Nur gesetzt, wenn Sie „Alle akzeptieren“ wählen</strong>; wählen Sie „Nur notwendige“, werden sie nie gesetzt und Google Analytics wird nicht geladen.</li>
              <li><strong>Microsoft Clarity (_clck, _clsk und verwandte)</strong> – zeigen uns in zusammengefasster Form und als maskierte Sitzungsaufzeichnungen, wo Besucher klicken und scrollen. <strong>Nur gesetzt, wenn Sie „Alle akzeptieren“ wählen</strong>; andernfalls wird Clarity nicht geladen.</li>
            </ul>
            <p>
              Außerdem nutzen wir eine datenschutzfreundliche, cookielose Leistungsmessung (siehe{" "}
              <a href="#third-party">Dienste Dritter</a>). Eine vollständige Übersicht, auch dazu, wie Sie Cookies
              ablehnen oder löschen, finden Sie in unserer{" "}
              <Link href={`/${lang}/cookies`}>Cookie-Richtlinie</Link>. Beim ersten Besuch können Sie über ein
              Banner alle Cookies akzeptieren oder nur die unbedingt erforderlichen behalten. Rechtsgrundlage für
              Analyse-Cookies ist Ihre <strong>Einwilligung</strong>, die Sie jederzeit widerrufen können, indem Sie
              die Cookies dieser Website löschen.
            </p>
          </>
        ),
      },
      {
        id: "third-party",
        title: "Dienste Dritter",
        body: (
          <>
            <p>
              Für den Betrieb unserer Website und die Abwicklung von Buchungen nutzen wir folgende Auftragsverarbeiter.
              Jeder verarbeitet Daten nach seinen eigenen Datenschutzbestimmungen:
            </p>
            <ul>
              <li>
                <strong>Vercel</strong> – Website-Hosting und datenschutzfreundliche Analyse. Vercel Analytics und
                Speed Insights erfassen anonymisierte, zusammengefasste Verkehrs- und Leistungsdaten (Seitenaufrufe,
                Besucherzahlen, Core Web Vitals) ohne Cookies oder persönliche Kennungen. Vercel kann aus
                Sicherheitsgründen übliche Serverdaten (IP-Adresse, Zeitstempel der Anfragen) protokollieren. Siehe{" "}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Vercel</a>.
              </li>
              <li>
                <strong>Google (Analytics und Ads)</strong> – <strong>nur wenn Sie alle Cookies akzeptieren</strong>,
                nutzen wir Google Analytics 4 zur Messung der Gesamtnutzung der Website und Google Ads zur Messung der
                Wirkung unserer Werbung. Google kann diese Daten (einschließlich Ihrer IP-Adresse, für die wir die
                IP-Anonymisierung aktivieren) außerhalb Marokkos verarbeiten. Nichts davon wird geladen, wenn Sie „Nur
                notwendige“ wählen. Siehe{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Google</a>.
              </li>
              <li>
                <strong>Microsoft (Clarity)</strong> – <strong>nur wenn Sie alle Cookies akzeptieren</strong>, nutzen
                wir Microsoft Clarity, um zu sehen, wie Besucher unsere Seiten verwenden (Klicks, Scrollen, maskierte
                Sitzungsaufzeichnungen), damit wir Unklarheiten beheben können. Eingaben in Formularen werden
                maskiert. Nichts davon wird geladen, wenn Sie „Nur notwendige“ wählen. Siehe{" "}
                <a href="https://www.microsoft.com/en-us/privacy/privacystatement" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Microsoft</a>.
              </li>
              <li>
                <strong>PayPal</strong> – sichere Abwicklung von Anzahlungen und vollständigen Zahlungen. PayPal
                verarbeitet alle Karten- und Bankdaten direkt; wir erhalten Ihre Zahlungsdaten nie.
              </li>
              <li>
                <strong>Resend</strong> – Versand transaktionaler E-Mails. Wenn Sie unser Kontakt- oder
                Newsletter-Formular absenden, werden Ihr Name und Ihre E-Mail-Adresse über Resend an unser Postfach
                weitergeleitet. Siehe{" "}
                <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Resend</a>.
              </li>
              <li>
                <strong>Cloudflare</strong> – DNS, Netzwerksicherheit und E-Mail-Weiterleitung. Nachrichten an unsere
                Adresse {SITE.emailDisplay} werden über Cloudflare Email Routing an das von uns betreute Team-Postfach
                weitergeleitet; der Inhalt Ihrer E-Mail läuft also während der Übertragung über Cloudflare. Als DNS-
                und Sicherheitsebene verarbeitet Cloudflare zudem übliche Verbindungsdaten (IP-Adresse,
                Anfrage-Metadaten), um die Website vor Missbrauch zu schützen. Siehe{" "}
                <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Cloudflare</a>.
              </li>
              <li>
                <strong>WhatsApp / Meta</strong> – wenn Sie uns über WhatsApp kontaktieren, unterliegen Ihre
                Nachrichten den Datenschutzbestimmungen und Nutzungsbedingungen von Meta.
              </li>
              <li>
                <strong>RSS-Anbieter Dritter</strong> – Artikel auf unserer News-Seite werden serverseitig aus
                öffentlichen RSS-Feeds abgerufen (The Guardian, BBC, NYT Travel und andere). Dabei werden keine
                Informationen an diese Anbieter übermittelt, die Sie identifizieren könnten.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "retention",
        title: "Speicherdauer",
        body: (
          <p>
            Wir speichern Ihre personenbezogenen Daten so lange, wie es zur Durchführung Ihrer Buchung erforderlich
            ist, und danach bis zu <strong>5 Jahre</strong> zur Erfüllung buchhalterischer und gesetzlicher Pflichten
            nach marokkanischem Recht. Anfragen, aus denen keine Buchung wird, löschen wir innerhalb von{" "}
            <strong>12 Monaten</strong> nach unserem letzten Kontakt mit Ihnen. Newsletter-Abonnements bleiben
            bestehen, bis Sie sich abmelden.
          </p>
        ),
      },
      {
        id: "your-rights",
        title: "Ihre Rechte",
        body: (
          <>
            <p>Nach dem marokkanischen Gesetz 09-08 (und der DSGVO, soweit anwendbar) haben Sie das Recht:</p>
            <ul>
              <li>eine Kopie der personenbezogenen Daten anzufordern, die wir über Sie speichern (Auskunftsrecht)</li>
              <li>die Berichtigung unrichtiger oder unvollständiger Daten zu verlangen (Recht auf Berichtigung)</li>
              <li>die Löschung Ihrer Daten zu verlangen, sofern wir nicht gesetzlich zur Aufbewahrung verpflichtet sind</li>
              <li>der Verarbeitung Ihrer Daten unter bestimmten Umständen zu widersprechen oder sie einzuschränken</li>
              <li>Ihre Einwilligung zu jeder Kommunikation, der Sie nicht vertraglich zugestimmt haben, jederzeit zu widerrufen</li>
            </ul>
            <p>
              Um eines dieser Rechte auszuüben, schreiben Sie uns an {mail}. Wir antworten innerhalb von{" "}
              <strong>30 Tagen</strong>. Sie haben außerdem das Recht, sich bei der CNDP zu beschweren, wenn Sie der
              Meinung sind, dass Ihre Daten nicht ordnungsgemäß behandelt wurden.
            </p>
          </>
        ),
      },
      {
        id: "security",
        title: "Sicherheit",
        body: (
          <p>
            Wir treffen angemessene technische und organisatorische Maßnahmen, um Ihre Daten vor unbefugtem Zugriff,
            Verlust oder unbefugter Offenlegung zu schützen. Unsere Website wird ausschließlich über HTTPS mit einer
            strengen Content Security Policy ausgeliefert. Alle Zahlungen wickelt PayPal ab – wir erhalten,
            übertragen oder speichern niemals Kartendaten. Nachrichten aus dem Kontaktformular werden über Resend
            mittels verschlüsselter Verbindungen zugestellt.
          </p>
        ),
      },
      {
        id: "international",
        title: "Internationale Datenübermittlung",
        body: (
          <p>
            Unser Geschäftsbetrieb und unsere Daten befinden sich hauptsächlich in Marokko. Unser Hosting (Vercel),
            unser E-Mail-Versand (Resend) und – sofern Sie Analyse-Cookies akzeptiert haben – die Infrastruktur von
            Google Analytics/Ads und Microsoft Clarity können Daten in den Vereinigten Staaten oder in der
            Europäischen Union verarbeiten. Werden personenbezogene Daten außerhalb Marokkos übermittelt, sorgen wir
            für angemessene Schutzmaßnahmen im Einklang mit dem marokkanischen Gesetz 09-08 und den Vorgaben der
            CNDP.
          </p>
        ),
      },
      {
        id: "children",
        title: "Datenschutz von Kindern",
        body: (
          <p>
            Unsere Leistungen richten sich nicht an Kinder unter 16 Jahren, und wir erheben wissentlich keine
            personenbezogenen Daten von ihnen. Minderjährige, die an Touren teilnehmen, müssen von einem
            verantwortlichen Erwachsenen begleitet werden, der diesen Bedingungen und dieser Erklärung in ihrem
            Namen zustimmt. Wenn Sie glauben, dass uns ein Kind personenbezogene Daten übermittelt hat, kontaktieren
            Sie uns; wir löschen sie umgehend.
          </p>
        ),
      },
      {
        id: "external-links",
        title: "Externe Links",
        body: (
          <p>
            Unsere Website verlinkt auf externe Seiten, darunter Nachrichtenartikel und unsere Schwestermarke.
            Sobald Sie unsere Website verlassen, gilt diese Erklärung nicht mehr, und wir sind nicht für die
            Datenschutzpraktiken von Websites Dritter verantwortlich.
          </p>
        ),
      },
      {
        id: "changes",
        title: "Änderungen dieser Erklärung",
        body: (
          <p>
            Wir können diese Erklärung von Zeit zu Zeit aktualisieren, um Änderungen unserer Leistungen oder des
            geltenden Rechts abzubilden. Das Datum oben auf dieser Seite zeigt die letzte Überarbeitung. Die weitere
            Nutzung unserer Website nach einer Überarbeitung gilt als Zustimmung zur aktualisierten Erklärung.
          </p>
        ),
      },
      {
        id: "contact",
        title: "Kontakt",
        body: (
          <p>
            Bei Fragen zum Datenschutz oder um Ihre Rechte auszuüben, kontaktieren Sie uns unter {mail}.
          </p>
        ),
      },
    ],
  };
}
