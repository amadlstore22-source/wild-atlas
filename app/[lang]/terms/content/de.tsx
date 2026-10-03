import { SITE } from "@/lib/constants";
import type { LegalCtx, LegalDoc } from "@/components/legal/LegalPage";

export default function termsDe({ mail }: LegalCtx): LegalDoc {
  return {
    metaTitle: "Allgemeine Geschäftsbedingungen",
    metaDescription: "Allgemeine Geschäftsbedingungen für Buchungen und Touren bei Marrakech Eco Tours, nach marokkanischem Recht.",
    title: "Allgemeine Geschäftsbedingungen",
    intro: "Die Bedingungen für Buchungen und Touren bei Marrakech Eco Tours. Bitte lesen Sie sie vor Ihrer Buchung.",
    sections: [
      {
        id: "about",
        title: "Über diese Bedingungen",
        body: (
          <>
            <p>
              Diese Allgemeinen Geschäftsbedingungen gelten für alle Buchungen bei Marrakech Eco Tours („wir“, „uns“),
              einem Reiseveranstalter mit Sitz in {SITE.address}, der nach marokkanischem Recht tätig ist. Mit dem
              Absenden einer Buchungsanfrage, der Zahlung einer Anzahlung oder der vollständigen Zahlung über{" "}
              <a href="https://marrakechecotours.com">marrakechecotours.com</a> stimmen Sie diesen Bedingungen für
              sich selbst und alle Mitglieder Ihrer Gruppe zu.
            </p>
            <p>
              Unsere Website ist als Service auf Englisch, Französisch, Spanisch, Deutsch, Italienisch und Arabisch
              verfügbar. Bei Abweichungen zwischen den Übersetzungen ist die <strong>englische Fassung maßgeblich</strong>.
            </p>
          </>
        ),
      },
      {
        id: "services",
        title: "Unsere Leistungen",
        body: (
          <>
            <p>
              Wir bieten geführte Trekking-, Wüsten-, Kultur- und Abenteuertouren ab Marrakesch und Agadir an:
              Trekkingtouren im Hohen Atlas, Toubkal-Besteigungen, Sahara-Ausflüge, kulturelle Medina-Rundgänge und
              mehrtägige Abenteuer in der Natur. Alle Einzelheiten – Leistungen, Ausschlüsse, Anforderungen an die
              Fitness und Dauer – sind auf der Seite der jeweiligen Tour angegeben.
            </p>
            <p>
              Nachrichten und Reiseartikel auf unserer Website stammen aus RSS-Feeds Dritter und dienen nur der
              Information. Für die Richtigkeit, Aktualität oder den Inhalt externer Quellen übernehmen wir keine
              Verantwortung.
            </p>
          </>
        ),
      },
      {
        id: "bookings",
        title: "Buchungen und Zahlungen",
        body: (
          <ul>
            <li>Eine Buchung ist bestätigt, sobald Ihre Anzahlung bei uns eingegangen ist und wir Ihnen eine schriftliche Bestätigung per E-Mail gesendet haben.</li>
            <li>
              Zur Sicherung Ihrer Buchung ist eine Anzahlung erforderlich. Der genaue Betrag steht auf der jeweiligen
              Tourseite und beträgt in der Regel etwa ein Viertel des Tourpreises. Maßgeblich ist der zum Zeitpunkt
              der Buchung auf der Tourseite angezeigte Betrag.
            </li>
            <li>Der Restbetrag wird <strong>bei Ankunft</strong> zu Beginn Ihrer Tour bar oder mit Karte bezahlt. Vor Ihrer Reise wird nichts weiter berechnet.</li>
            <li>Kurzfristige Buchungen werden zu denselben Bedingungen angenommen, sofern verfügbar – die Anzahlung sichert die Termine, der Restbetrag wird bei Ankunft bezahlt.</li>
            <li>Anzahlungen und Zahlungen erfolgen über <strong>PayPal</strong>. Ist auf der Tourseite kein automatischer Zahlungslink verfügbar, senden wir Ihnen nach Bestätigung Ihrer Buchungsdaten eine PayPal-Zahlungsanforderung per WhatsApp oder E-Mail; Ihre Anzahlung ist gesichert, sobald diese Zahlung abgeschlossen ist. Wir speichern Ihre Karten- oder Bankdaten nicht und haben keinen Zugriff darauf. Es gelten die Bedingungen und Gebühren von PayPal.</li>
            <li>Preise werden zur Bequemlichkeit in der von Ihnen gewählten Währung (EUR, USD, GBP oder MAD) angezeigt; der vertragliche Preis wird bei der Bestätigung schriftlich vereinbart. Wechselkursschwankungen gehen zu Ihren Lasten.</li>
            <li>Für Gruppenbuchungen ab 6 Personen kann ein individuelles Angebot gelten – kontaktieren Sie uns vor der Buchung.</li>
          </ul>
        ),
      },
      {
        id: "cancellation",
        title: "Stornierungsbedingungen",
        body: (
          <>
            <h3>Stornierung durch Sie</h3>
            <dl className="tier">
              <dt>14 Tage oder mehr vor Reisebeginn</dt>
              <dd>Volle Rückerstattung aller geleisteten Zahlungen, einschließlich der Anzahlung.</dd>
              <dt>8–13 Tage vor Reisebeginn</dt>
              <dd>50 % des Gesamtpreises der Tour werden berechnet; der Rest wird erstattet.</dd>
              <dt>7 Tage oder weniger vor Reisebeginn</dt>
              <dd>Keine Rückerstattung. Der volle Tourpreis verfällt.</dd>
              <dt>Nichterscheinen</dt>
              <dd>Keine Rückerstattung. Der volle Tourpreis verfällt.</dd>
            </dl>
            <p>
              Alle Stornierungen müssen schriftlich an {mail} gerichtet werden. Maßgeblich für die anwendbare Stufe
              ist das Datum, an dem Ihre schriftliche Stornierung bei uns eingeht.
            </p>
            <h3>Stornierung durch uns</h3>
            <p>
              Wir behalten uns vor, eine Tour wegen zu weniger Buchungen, extremer Wetterbedingungen,
              Sicherheitsbedenken, politischer Instabilität, Naturkatastrophen oder höherer Gewalt abzusagen. In diesem
              Fall erhalten Sie alle an uns geleisteten Zahlungen vollständig zurück. Für zusätzliche Kosten, die Ihnen
              entstehen (internationale Flüge, Unterkunft, Visa, Reiseversicherung usw.), haften wir nicht.
            </p>
          </>
        ),
      },
      {
        id: "changes-to-bookings",
        title: "Änderungen von Buchungen",
        body: (
          <p>
            Wünsche zur Terminänderung erfüllen wir nach Möglichkeit, abhängig von der Verfügbarkeit und mit einer
            Vorlaufzeit von mindestens 14 Tagen. Dafür kann eine Bearbeitungsgebühr von{" "}
            <strong>25 € pro Person</strong> anfallen. Unsere Guides können den Ablauf am Tag selbst aus Gründen der
            Sicherheit, des Wetters oder der Logistik ändern. Für in gutem Glauben aus diesen Gründen vorgenommene
            Änderungen wird keine Erstattung gewährt.
          </p>
        ),
      },
      {
        id: "responsibilities",
        title: "Ihre Pflichten",
        body: (
          <ul>
            <li>Sie benötigen vor der Reise einen gültigen Reisepass und alle für Marokko erforderlichen Visa.</li>
            <li>Sie müssen eine angemessene Reiseversicherung abschließen, die medizinische Versorgung und Notfallrücktransport abdeckt. Für alle Trekking- und Wüstentouren <strong>empfehlen wir dies dringend</strong>.</li>
            <li>Sie müssen bei der Buchung alle für Ihre Tour relevanten Erkrankungen, Ernährungsbedürfnisse, Behinderungen oder Mobilitätseinschränkungen angeben.</li>
            <li>Sie müssen jederzeit den Anweisungen Ihres Guides folgen. Guides können eine Tour ändern oder abbrechen, wenn dies für die Sicherheit der Gruppe notwendig ist.</li>
            <li>Teilnehmer, deren Verhalten andere gefährdet oder vom Guide als unangemessen eingestuft wird, können ohne Erstattung von der Tour ausgeschlossen werden.</li>
            <li>Sie sind während der gesamten Tour für die Sicherheit Ihrer persönlichen Gegenstände verantwortlich.</li>
          </ul>
        ),
      },
      {
        id: "health-fitness",
        title: "Gesundheit und Fitness",
        body: (
          <p>
            Mit Ihrer Buchung bestätigen Sie, dass Sie und alle Mitglieder Ihrer Gruppe gesundheitlich für die
            gewählte Tour geeignet sind. Trekkingtouren – insbesondere Toubkal-Besteigungen und mehrtägige Routen im
            Hohen Atlas – erfordern eine gute Ausdauer und bedeuten anstrengende Aktivität in der Höhe (bis 4.167 m).
            Für Verletzungen oder Erkrankungen, die darauf zurückzuführen sind, dass relevante Vorerkrankungen vor der
            Buchung nicht angegeben wurden, übernehmen wir keine Haftung.
          </p>
        ),
      },
      {
        id: "included-excluded",
        title: "Enthaltene und nicht enthaltene Leistungen",
        body: (
          <p>
            Was enthalten ist und was nicht, steht auf der Seite der jeweiligen Tour. Sofern nicht ausdrücklich als
            enthalten angegeben, sind folgende Leistungen in keinem Tourpreis <strong>enthalten</strong>:
            internationale Flüge, Visagebühren für Marokko, Reiseversicherung, Flughafentransfers (sofern nicht
            angegeben), persönliche Ausgaben, nicht in der Tourbeschreibung genannte Mahlzeiten, Trinkgelder für
            Guides und Fahrer sowie Einzelzimmerzuschläge.
          </p>
        ),
      },
      {
        id: "eco",
        title: "Umweltverpflichtung",
        body: (
          <p>
            Wir setzen uns für verantwortungsvollen und nachhaltigen Tourismus in Marokko ein. Wir bitten alle
            Teilnehmenden, Natur, Gemeinschaften und kulturelle Traditionen vor Ort zu respektieren – indem sie beim
            Trekking die „Leave No Trace“-Grundsätze befolgen, die örtlichen Kleidungsregeln in Medinas und Dörfern
            achten und die lokale Wirtschaft unterstützen, wo immer möglich bei örtlichen Handwerkern und Geschäften
            einzukaufen.
          </p>
        ),
      },
      {
        id: "liability",
        title: "Haftung",
        body: (
          <>
            <p>
              Wir unternehmen alle angemessenen Schritte, um die Sicherheit und Qualität unserer Touren zu
              gewährleisten. Wir haften jedoch nicht für:
            </p>
            <ul>
              <li>Tod, Personenschäden, Krankheit, Verlust oder Schäden, die auf Umstände außerhalb unserer zumutbaren Kontrolle zurückgehen (höhere Gewalt, extremes Wetter, Naturkatastrophen, Unruhen, Pandemien)</li>
              <li>Verlust oder Beschädigung persönlicher Gegenstände während einer Tour</li>
              <li>Handlungen oder Unterlassungen externer Anbieter (Unterkunft, Transport), soweit wir als Vermittler und nicht als Hauptleistungserbringer auftreten</li>
              <li>Kosten, die Ihnen infolge der Absage oder Änderung einer Tour entstehen (Flüge, Hotels, Visagebühren usw.)</li>
              <li>die Richtigkeit von Nachrichten oder Reiseinhalten aus RSS-Feeds Dritter</li>
            </ul>
            <p>
              Unsere Haftung Ihnen gegenüber ist in jedem Fall auf den für Ihre Tour gezahlten Gesamtpreis begrenzt.
              Eine Haftung, die nach geltendem marokkanischem Recht nicht ausgeschlossen werden kann, wird durch diese
              Bedingungen nicht ausgeschlossen.
            </p>
          </>
        ),
      },
      {
        id: "photography",
        title: "Fotos und Medien",
        body: (
          <>
            <p>
              Unsere Guides können Aktivitäten während der Tour fotografieren oder filmen. Sind Sie auf einem Bild
              erkennbar, fragen wir Sie um Erlaubnis, bevor wir es auf unserer Website oder in sozialen Medien
              veröffentlichen, und Sie können ohne Angabe von Gründen ablehnen. Sie können Ihrem Guide auch jederzeit
              während der Tour sagen, dass Sie nicht fotografiert werden möchten.
            </p>
            <p>
              Wenn Sie es sich nach Ihrer Zustimmung anders überlegen, schreiben Sie uns an {mail}; wir entfernen das
              Bild dann aus unseren eigenen Kanälen. Bilder, die Dritte bereits geteilt oder weiterverbreitet haben,
              liegen möglicherweise außerhalb unserer Kontrolle.
            </p>
          </>
        ),
      },
      {
        id: "ip",
        title: "Geistiges Eigentum",
        body: (
          <p>
            Texte, Design und Code dieser Website sind Eigentum von Marrakech Eco Tours. Sie dürfen sie ohne unsere
            ausdrückliche schriftliche Genehmigung nicht vervielfältigen, verbreiten oder verwenden. Einige Fotos sind
            von Bilddatenbanken lizenziert und bleiben nach diesen Lizenzen Eigentum der jeweiligen Fotografen.
            Artikel auf der News-Seite stammen aus Feeds Dritter und bleiben Eigentum ihrer Herausgeber.
          </p>
        ),
      },
      {
        id: "complaints",
        title: "Beschwerden",
        body: (
          <p>
            Wenn Sie während Ihrer Tour eine Beschwerde haben, wenden Sie sich bitte sofort an Ihren Guide, damit wir
            direkt reagieren können. Bleibt das Problem ungelöst, senden Sie innerhalb von 28 Tagen nach Ende Ihrer
            Tour eine schriftliche Beschwerde an {mail}. Wir bestätigen den Eingang innerhalb von 5 Werktagen und
            antworten innerhalb von 14 Tagen ausführlich.
          </p>
        ),
      },
      {
        id: "governing-law",
        title: "Anwendbares Recht",
        body: (
          <>
            <p>
              Diese Allgemeinen Geschäftsbedingungen unterliegen dem Recht des Königreichs Marokko; für Streitigkeiten
              sind die Gerichte von Marrakesch zuständig.
            </p>
            <p>
              Wenn Sie als Verbraucher in der Europäischen Union oder im Vereinigten Königreich wohnen, wird Ihnen
              dadurch nicht der Schutz der zwingenden Verbraucherschutzvorschriften Ihres Wohnsitzlandes entzogen, und
              Sie behalten jedes Recht, das Sie haben, vor den Gerichten Ihres Landes zu klagen.
            </p>
          </>
        ),
      },
      {
        id: "changes",
        title: "Änderungen dieser Bedingungen",
        body: (
          <p>
            Wir können diese Bedingungen von Zeit zu Zeit aktualisieren. Das Datum oben auf dieser Seite zeigt die
            letzte Überarbeitung. Die weitere Nutzung der Website oder jede Buchung nach einer Überarbeitung gilt als
            Zustimmung zu den aktualisierten Bedingungen.
          </p>
        ),
      },
      {
        id: "contact",
        title: "Ihr Vertragspartner",
        body: (
          <>
            <p>
              Über diese Website gebuchte Touren werden von <strong>Marrakech Eco Tours</strong> durchgeführt, einem
              Reiseveranstalter mit Sitz in {SITE.address}, tätig seit {SITE.foundedYear}.
            </p>
            <p>
              E-Mail {mail} · Telefon <a href={`tel:${SITE.phoneDial}`}>{SITE.phone}</a>
            </p>
            <p>
              Fragen zu diesen Bedingungen oder zu einer bereits getätigten Buchung können Sie auf beiden Wegen an uns
              richten. Wir antworten innerhalb einer Stunde (8:00–20:00 Uhr marokkanischer Zeit).
            </p>
          </>
        ),
      },
    ],
  };
}
