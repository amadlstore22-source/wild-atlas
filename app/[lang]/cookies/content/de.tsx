import Link from "next/link";
import type { LegalCtx, LegalDoc } from "@/components/legal/LegalPage";

export default function cookiesDe({ lang, mail }: LegalCtx): LegalDoc {
  return {
    metaTitle: "Cookie-Richtlinie",
    metaDescription: "Welche Cookies und datenschutzfreundliche Messung Marrakech Eco Tours verwendet und wie Sie sie steuern können.",
    title: "Cookie-Richtlinie",
    intro: "Welche Cookies und datenschutzfreundliche Messung wir verwenden, warum, und wie Sie sie steuern können.",
    sections: [
      {
        id: "what-are-cookies",
        title: "Was sind Cookies",
        body: (
          <p>
            Cookies sind kleine Textdateien, die eine Website in Ihrem Browser speichert. Sie ermöglichen es der
            Website, sich an Ihre Entscheidungen zu erinnern und korrekt zu funktionieren. Diese Richtlinie erklärt,
            welche Cookies wir verwenden, warum und wie Sie sie steuern können. Sie ergänzt unsere{" "}
            <Link href={`/${lang}/privacy`}>Datenschutzerklärung</Link>.
          </p>
        ),
      },
      {
        id: "our-approach",
        title: "Unser Ansatz",
        body: (
          <>
            <p>
              Wir beschränken Cookies auf ein Minimum und verkaufen niemals Daten, die über Cookies erhoben werden. Wir
              verwenden <strong>Google Analytics</strong> und <strong>Microsoft Clarity</strong>, um zu verstehen,
              wie Besucher die Website finden und nutzen – und zwar <strong>nur</strong>, wenn Sie zustimmen: Beide
              bleiben ausgeschaltet, bis Sie <strong>Alle akzeptieren</strong> wählen. Wir verwenden keine
              Social-Media-Pixel und keine seitenübergreifenden Werbetracker.
            </p>
            <p>
              Beim ersten Besuch können Sie über ein Banner <strong>Alle akzeptieren</strong> oder nur die{" "}
              <strong>notwendigen</strong> Cookies behalten. Wählen Sie „Nur notwendige“, werden keine Analyse-Cookies
              gesetzt und Google Analytics wird überhaupt nicht geladen. Mit beiden Optionen können Sie die gesamte
              Website nutzen – es gibt keine Cookie-Sperre. Ihre Wahl wird gespeichert, damit wir nicht erneut fragen,
              und Sie können sie jederzeit ändern, indem Sie Ihre Cookies löschen.
            </p>
          </>
        ),
      },
      {
        id: "cookies-we-use",
        title: "Welche Cookies wir verwenden",
        body: (
          <>
            <h3>Unbedingt erforderlich</h3>
            <dl className="tier">
              <dt>met-cookie-consent</dt>
              <dd>Speichert Ihre Cookie-Auswahl, damit das Banner nicht erneut erscheint. Keine Einwilligung erforderlich (ausgenommen). Speicherdauer: bis zu 1 Jahr.</dd>
            </dl>
            <h3>Funktional (Präferenzen)</h3>
            <dl className="tier">
              <dt>met_currency</dt>
              <dd>Speichert die gewählte Anzeigewährung (EUR, USD, GBP oder MAD). Wird nur gesetzt, wenn Sie die Währung ändern. Speicherdauer: bis zu 1 Jahr.</dd>
            </dl>
            <h3>Analyse – nur wenn Sie „Alle akzeptieren“ wählen</h3>
            <p>
              Die folgenden Cookies setzt <strong>Google Analytics (GA4)</strong>, und zwar erst, nachdem Sie{" "}
              <strong>Alle akzeptieren</strong> gewählt haben. Wählen Sie <strong>Nur notwendige</strong>, wird
              keines davon jemals gesetzt. Sie helfen uns, in zusammengefasster Form zu sehen, welche Seiten und Touren
              Besucher interessieren und ob unsere Anzeigen die richtigen Menschen erreichen – wir nutzen sie nicht,
              um Sie persönlich zu identifizieren.
            </p>
            <dl className="tier">
              <dt>_ga</dt>
              <dd>Unterscheidet den Browser eines Besuchers von dem eines anderen, damit Besuche gezählt werden können. Gesetzt von Google Analytics. Speicherdauer: bis zu 2 Jahre.</dd>
              <dt>_ga_&lt;container&gt;</dt>
              <dd>Speichert den Status Ihrer Sitzung für Google Analytics 4. Speicherdauer: bis zu 2 Jahre.</dd>
              <dt>_gid</dt>
              <dd>Unterscheidet Besucher über einen kurzen Zeitraum. Gesetzt von Google Analytics. Speicherdauer: bis zu 24 Stunden.</dd>
            </dl>
            <p>
              Ebenfalls nur nach <strong>Alle akzeptieren</strong> zeigt uns <strong>Microsoft Clarity</strong> in
              zusammengefasster Form und als anonymisierte Aufzeichnungen, wo Besucher klicken und scrollen, damit wir
              Seiten verbessern können, die verwirren. Clarity maskiert, was Sie in Formulare eingeben. Seine Cookies:
            </p>
            <dl className="tier">
              <dt>_clck</dt>
              <dd>Speichert die Clarity-Nutzer-ID und Einstellungen für diese Website. Gesetzt von Microsoft Clarity.</dd>
              <dt>_clsk</dt>
              <dd>Verbindet die Seiten eines Besuchs zu einer einzigen Sitzung. Gesetzt von Microsoft Clarity.</dd>
              <dt>CLID, MUID, ANONCHK, MR, SM</dt>
              <dd>Drittanbieter-Cookies auf Microsoft-Domains, mit denen Clarity einen Browser wiedererkennt; Clarity nutzt sie nicht für Werbung (ANONCHK ist immer 0). Siehe Microsofts Liste der Clarity-Cookies.</dd>
            </dl>
          </>
        ),
      },
      {
        id: "measurement",
        title: "Cookielose Messung",
        body: (
          <>
            <p>
              Wir zählen außerdem Klicks auf die Tourvorschläge in unseren Artikeln. Für jeden Klick erfassen wir nur
              Datum, Sprache, Artikel und angeklickte Tour – <strong>kein Cookie</strong>, keine IP-Adresse und nichts,
              was Sie identifizieren könnte. Diese Zählung läuft daher unabhängig von Ihrer Wahl im Banner.
            </p>
            <p>
              Unabhängig von den oben genannten Analyse-Cookies nutzen wir <strong>Vercel Analytics</strong> und{" "}
              <strong>Vercel Speed Insights</strong>, um die Leistung der Website zu messen. Diese Werkzeuge sind
              datenschutzfreundlich und <strong>verwenden keine Cookies</strong> und kein Fingerprinting – sie erfassen
              nur anonymisierte, zusammengefasste Kennzahlen (Seitenaufrufe, Besucherzahlen, Core Web Vitals), laufen
              immer und können Sie nicht identifizieren. Siehe{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Vercel</a>.
            </p>
          </>
        ),
      },
      {
        id: "third-party",
        title: "Cookies von Drittanbietern",
        body: (
          <>
            <p>
              Wenn Sie alle Cookies akzeptieren, setzt <strong>Google</strong> (Google Analytics und
              Conversion-Messung von Google Ads) die oben aufgeführten Cookies und kann sie verwenden, um die Wirkung
              unserer Werbung zu messen. Dafür gelten die{" "}
              <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">Cookie-Richtlinie von Google</a>{" "}
              und die{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Google</a>.
            </p>
            <p>
              Wenn Sie alle Cookies akzeptieren, setzt <strong>Microsoft</strong> (Clarity) die oben aufgeführten
              Cookies. Dafür gelten die{" "}
              <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies" target="_blank" rel="noopener noreferrer">Liste der Clarity-Cookies</a>{" "}
              und die{" "}
              <a href="https://www.microsoft.com/en-us/privacy/privacystatement" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Microsoft</a>.
            </p>
            <p>
              Einige Seiten binden auch andere Dienste Dritter ein oder verlinken darauf, die eigene Cookies setzen
              können, wenn Sie sie nutzen – zum Beispiel <strong>PayPal</strong>, wenn Sie einem von uns gesendeten
              Zahlungslink folgen, oder <strong>WhatsApp / Meta</strong>, wenn Sie einen Chat beginnen. Dafür gelten
              die Cookie- und Datenschutzrichtlinien dieser Anbieter, nicht unsere.
            </p>
          </>
        ),
      },
      {
        id: "managing-cookies",
        title: "Cookies verwalten und löschen",
        body: (
          <>
            <p>Sie behalten jederzeit die Kontrolle:</p>
            <ul>
              <li>Wählen Sie im Einwilligungsbanner <strong>Nur notwendige</strong>, um funktionale und Analyse-Cookies zu vermeiden – Google Analytics und Microsoft Clarity werden dann nicht geladen.</li>
              <li>Um Ihre Einwilligung nach dem Akzeptieren zu widerrufen, löschen Sie die Cookies dieser Website in Ihrem Browser; das Banner erscheint erneut und Sie können neu wählen. Dabei wird auch Ihre Währungsauswahl zurückgesetzt.</li>
              <li>Stellen Sie Ihren Browser so ein, dass er Cookies blockiert oder davor warnt. Die Website funktioniert weiterhin, merkt sich aber möglicherweise Ihre Währung nicht.</li>
            </ul>
            <p>
              Die meisten Browser erklären in ihrer Hilfe, wie Sie Cookies verwalten (Chrome, Safari, Firefox, Edge).
            </p>
          </>
        ),
      },
      {
        id: "changes",
        title: "Änderungen dieser Richtlinie",
        body: (
          <p>
            Wir können diese Cookie-Richtlinie aktualisieren, wenn sich unsere Website weiterentwickelt oder sich die
            Rechtslage ändert. Das Datum oben zeigt die letzte Überarbeitung.
          </p>
        ),
      },
      {
        id: "contact",
        title: "Kontakt",
        body: <p>Fragen zu Cookies? Schreiben Sie uns an {mail}.</p>,
      },
    ],
  };
}
