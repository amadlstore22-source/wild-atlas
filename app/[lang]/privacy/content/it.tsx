import Link from "next/link";
import { SITE, SISTER_SITE } from "@/lib/constants";
import type { LegalCtx, LegalDoc } from "@/components/legal/LegalPage";

export default function privacyIt({ lang, mail }: LegalCtx): LegalDoc {
  return {
    metaTitle: "Informativa sulla privacy",
    metaDescription: "Come Marrakech Eco Tours raccoglie, utilizza e protegge i tuoi dati personali ai sensi della legge marocchina 09-08.",
    title: "Informativa sulla privacy",
    intro: "Come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali, e i diritti che hai sui tuoi dati ai sensi della legge marocchina 09-08.",
    sections: [
      {
        id: "who-we-are",
        title: "Chi siamo",
        body: (
          <>
            <p>
              Marrakech Eco Tours («noi») è un tour operator con sede in Marocco che offre tour guidati di trekking,
              deserto, cultura e avventura con partenza da Marrakech e Agadir. Il nostro sito web è{" "}
              <a href="https://marrakechecotours.com">marrakechecotours.com</a>.
            </p>
            <p>
              Siamo il <strong>titolare del trattamento</strong> dei dati personali descritti in questa informativa.
              Per contattarci al riguardo — anche per esercitare uno dei diritti indicati di seguito — scrivi a{" "}
              {mail}, chiama il <a href={`tel:${SITE.phoneDial}`}>{SITE.phone}</a> oppure scrivici all’indirizzo{" "}
              {SITE.address}.
            </p>
            <p>
              Gestiamo anche un marchio gemello,{" "}
              <a href={SISTER_SITE.url} target="_blank" rel="noopener noreferrer">{SISTER_SITE.name}</a>{" "}
              ({SISTER_SITE.url.replace("https://", "")}), curato dallo stesso team. Questa informativa riguarda
              marrakechecotours.com; il sito del marchio gemello pubblica una propria informativa.
            </p>
            <p>
              Questa informativa spiega quali dati personali raccogliamo, come li utilizziamo e quali diritti hai.
              Trattiamo i dati personali in conformità con la legge marocchina n. 09-08 sulla protezione delle
              persone fisiche con riguardo al trattamento dei dati personali, sotto la vigilanza della CNDP
              (Commission Nationale de contrôle de la protection des Données à caractère Personnel). Per i visitatori
              dell’Unione europea applichiamo inoltre standard allineati al GDPR.
            </p>
          </>
        ),
      },
      {
        id: "information-we-collect",
        title: "Dati che raccogliamo",
        body: (
          <>
            <p>Raccogliamo solo le informazioni che ci fornisci volontariamente quando:</p>
            <ul>
              <li>Invii una richiesta di informazioni o di prenotazione tramite il nostro modulo di contatto (nome, indirizzo e-mail, numero di telefono, tour di interesse, date di viaggio, dimensione del gruppo e messaggio)</li>
              <li>Ci contatti direttamente via WhatsApp, e-mail o telefono</li>
              <li>Ti iscrivi alla nostra newsletter (solo indirizzo e-mail)</li>
              <li>Completi una prenotazione e il pagamento di un acconto (il pagamento è gestito da PayPal: non riceviamo, conserviamo né abbiamo accesso ai dati della tua carta o del tuo conto)</li>
              <li>Compari in fotografie scattate durante un tour, quando ti abbiamo chiesto e abbiamo ottenuto il permesso di pubblicarle</li>
            </ul>
            <p>
              Trattiamo inoltre automaticamente una piccola quantità di dati tecnici e di preferenza — vedi{" "}
              <a href="#cookies">Cookie e tecnologie simili</a> e{" "}
              <Link href={`/${lang}/cookies`}>la nostra Cookie Policy</Link> per tutti i dettagli.
            </p>
          </>
        ),
      },
      {
        id: "how-we-use",
        title: "Come utilizziamo i tuoi dati",
        body: (
          <>
            <p>Utilizziamo le informazioni che ci fornisci esclusivamente per:</p>
            <ul>
              <li>Rispondere alla tua richiesta e gestire la tua prenotazione</li>
              <li>Inviare conferme di prenotazione, programmi e informazioni prima della partenza</li>
              <li>Contattarti in caso di modifiche alla prenotazione o al tour</li>
              <li>Inviare newsletter, solo se ti sei iscritto espressamente (puoi annullare l’iscrizione in qualsiasi momento)</li>
              <li>Adempiere agli obblighi legali e contabili previsti dalla legge marocchina</li>
            </ul>
            <p>
              Non utilizzeremo mai le tue informazioni per marketing non richiesto senza il tuo consenso esplicito.
              Non vendiamo, noleggiamo, condividiamo né scambiamo i tuoi dati personali con terzi per finalità di
              marketing.
            </p>
          </>
        ),
      },
      {
        id: "cookies",
        title: "Cookie e tecnologie simili",
        body: (
          <>
            <p>
              Il nostro sito utilizza un numero ridotto di cookie. <strong>Non</strong> utilizziamo pixel dei social
              media né tracker pubblicitari tra siti. I cookie che impostiamo sono:
            </p>
            <ul>
              <li><strong>Consenso (met-cookie-consent)</strong> — ricorda la tua scelta sui cookie per non chiedertela di nuovo. Strettamente necessario.</li>
              <li><strong>Valuta (met_currency)</strong> — ricorda la valuta di visualizzazione scelta (EUR, USD, GBP o MAD). Preferenza funzionale; impostato solo se cambi valuta.</li>
              <li><strong>Google Analytics (_ga, _gid e correlati)</strong> — ci aiutano a capire, in forma aggregata, come i visitatori usano il sito e se la nostra pubblicità raggiunge le persone giuste. <strong>Impostati solo se scegli «Accetta tutto»</strong>; se scegli «Solo necessari» non vengono mai impostati e Google Analytics non si carica.</li>
              <li><strong>Microsoft Clarity (_clck, _clsk e correlati)</strong> — ci mostrano, in forma aggregata e tramite registrazioni di sessione mascherate, dove i visitatori cliccano e scorrono. <strong>Impostati solo se scegli «Accetta tutto»</strong>; altrimenti Clarity non si carica.</li>
            </ul>
            <p>
              Utilizziamo anche una misurazione delle prestazioni rispettosa della privacy e senza cookie (vedi{" "}
              <a href="#third-party">Servizi di terze parti</a>). Il dettaglio completo, compreso come rifiutare o
              cancellare i cookie, è nella nostra <Link href={`/${lang}/cookies`}>Cookie Policy</Link>. Alla prima
              visita un banner ti permette di accettare tutti i cookie o di mantenere solo quelli strettamente
              necessari. La base giuridica dei cookie analitici è il tuo <strong>consenso</strong>, che puoi revocare
              in qualsiasi momento cancellando i cookie di questo sito.
            </p>
          </>
        ),
      },
      {
        id: "third-party",
        title: "Servizi di terze parti",
        body: (
          <>
            <p>
              Per far funzionare il nostro sito e gestire le prenotazioni utilizziamo i seguenti responsabili del
              trattamento. Ciascuno tratta i dati secondo le proprie condizioni sulla privacy:
            </p>
            <ul>
              <li>
                <strong>Vercel</strong> — hosting del sito e statistiche rispettose della privacy. Vercel Analytics e
                Speed Insights raccolgono dati di traffico e prestazioni anonimizzati e aggregati (pagine viste,
                numero di visitatori, Core Web Vitals) senza cookie né identificativi personali. Vercel può
                registrare dati server standard (indirizzo IP, orario delle richieste) per motivi di sicurezza. Vedi
                l’
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">informativa sulla privacy di Vercel</a>.
              </li>
              <li>
                <strong>Google (Analytics e Ads)</strong> — <strong>solo se accetti tutti i cookie</strong>,
                utilizziamo Google Analytics 4 per misurare l’uso complessivo del sito e Google Ads per misurare il
                rendimento della nostra pubblicità. Google può trattare questi dati (incluso il tuo indirizzo IP, per
                il quale attiviamo l’anonimizzazione) al di fuori del Marocco. Non si carica se scegli «Solo
                necessari». Vedi le{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">norme sulla privacy di Google</a>.
              </li>
              <li>
                <strong>Microsoft (Clarity)</strong> — <strong>solo se accetti tutti i cookie</strong>, utilizziamo
                Microsoft Clarity per vedere come i visitatori usano le nostre pagine (clic, scorrimento,
                registrazioni di sessione mascherate), così da correggere ciò che crea confusione. Il testo digitato
                nei moduli viene mascherato. Non si carica se scegli «Solo necessari». Vedi l’
                <a href="https://www.microsoft.com/en-us/privacy/privacystatement" target="_blank" rel="noopener noreferrer">informativa sulla privacy di Microsoft</a>.
              </li>
              <li>
                <strong>PayPal</strong> — elaborazione sicura dei pagamenti di acconti e saldi completi. PayPal
                gestisce direttamente tutti i dati di carta e bancari; non riceviamo mai le tue credenziali di
                pagamento.
              </li>
              <li>
                <strong>Resend</strong> — invio delle e-mail transazionali. Quando invii il nostro modulo di contatto
                o di iscrizione alla newsletter, il tuo nome e la tua e-mail passano attraverso Resend fino alla
                nostra casella di posta. Vedi l’
                <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">informativa sulla privacy di Resend</a>.
              </li>
              <li>
                <strong>Cloudflare</strong> — DNS, sicurezza di rete e instradamento delle e-mail. I messaggi inviati
                al nostro indirizzo {SITE.emailDisplay} vengono inoltrati da Cloudflare Email Routing alla casella del
                team che monitoriamo, quindi il contenuto della tua e-mail transita attraverso Cloudflare. In quanto
                livello DNS e di sicurezza, Cloudflare tratta anche dati di connessione standard (indirizzo IP,
                metadati delle richieste) per proteggere il sito dagli abusi. Vedi l’
                <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">informativa sulla privacy di Cloudflare</a>.
              </li>
              <li>
                <strong>WhatsApp / Meta</strong> — se ci contatti tramite WhatsApp, i tuoi messaggi sono soggetti
                all’informativa sulla privacy e ai termini di Meta.
              </li>
              <li>
                <strong>Editori RSS di terze parti</strong> — gli articoli della nostra pagina Notizie vengono
                recuperati lato server da feed RSS pubblici (The Guardian, BBC, NYT Travel e altri). A questi editori
                non viene inviata alcuna informazione che possa identificarti.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "retention",
        title: "Conservazione dei dati",
        body: (
          <p>
            Conserviamo i tuoi dati personali per il tempo necessario a eseguire la prenotazione e fino a{" "}
            <strong>5 anni</strong> successivi per gli obblighi contabili e legali previsti dalla legge marocchina.
            Le richieste che non si traducono in una prenotazione vengono cancellate entro <strong>12 mesi</strong>{" "}
            dal nostro ultimo contatto con te. Le iscrizioni alla newsletter sono conservate finché non annulli
            l’iscrizione.
          </p>
        ),
      },
      {
        id: "your-rights",
        title: "I tuoi diritti",
        body: (
          <>
            <p>Ai sensi della legge marocchina 09-08 (e del GDPR, ove applicabile), hai il diritto di:</p>
            <ul>
              <li>Richiedere una copia dei dati personali che conserviamo su di te (diritto di accesso)</li>
              <li>Richiedere la correzione di dati inesatti o incompleti (diritto di rettifica)</li>
              <li>Richiedere la cancellazione dei tuoi dati, quando la legge non ci obbliga a conservarli</li>
              <li>Opporti al trattamento dei tuoi dati o limitarlo in determinate circostanze</li>
              <li>Revocare in qualsiasi momento il consenso a qualsiasi comunicazione che non hai accettato contrattualmente</li>
            </ul>
            <p>
              Per esercitare uno di questi diritti, scrivici a {mail}. Risponderemo entro <strong>30 giorni</strong>.
              Hai inoltre il diritto di presentare un reclamo alla CNDP se ritieni che i tuoi dati non siano stati
              trattati correttamente.
            </p>
          </>
        ),
      },
      {
        id: "security",
        title: "Sicurezza",
        body: (
          <p>
            Adottiamo misure tecniche e organizzative ragionevoli per proteggere i tuoi dati da accessi, perdite o
            divulgazioni non autorizzati. Il nostro sito è servito esclusivamente tramite HTTPS con una rigorosa
            Content Security Policy. Tutti i pagamenti sono gestiti da PayPal: non riceviamo, trasmettiamo né
            conserviamo mai dati delle carte. I messaggi del modulo di contatto vengono recapitati tramite Resend su
            connessioni cifrate.
          </p>
        ),
      },
      {
        id: "international",
        title: "Trasferimenti internazionali",
        body: (
          <p>
            Le nostre attività e i nostri dati hanno sede principalmente in Marocco. Il nostro hosting (Vercel),
            l’invio delle e-mail (Resend) e — se hai accettato i cookie analitici — l’infrastruttura di Google
            Analytics/Ads e Microsoft Clarity possono trattare dati negli Stati Uniti o nell’Unione europea. Quando
            i dati personali vengono trasferiti fuori dal Marocco, adottiamo misure per garantire tutele adeguate,
            in linea con la legge marocchina 09-08 e le indicazioni della CNDP.
          </p>
        ),
      },
      {
        id: "children",
        title: "Privacy dei minori",
        body: (
          <p>
            I nostri servizi non sono rivolti ai minori di 16 anni e non raccogliamo consapevolmente i loro dati
            personali. I minori che partecipano ai tour devono essere accompagnati da un adulto responsabile che
            accetti, per loro conto, questi termini e questa informativa. Se ritieni che un minore ci abbia inviato
            dati personali, contattaci e li cancelleremo tempestivamente.
          </p>
        ),
      },
      {
        id: "external-links",
        title: "Link esterni",
        body: (
          <p>
            Il nostro sito contiene link a siti esterni, tra cui articoli di notizie e il nostro marchio gemello.
            Quando lasci il nostro sito, questa informativa non si applica più e non siamo responsabili delle
            pratiche sulla privacy dei siti di terze parti.
          </p>
        ),
      },
      {
        id: "changes",
        title: "Modifiche a questa informativa",
        body: (
          <p>
            Possiamo aggiornare questa informativa di tanto in tanto per riflettere cambiamenti nei nostri servizi o
            nella normativa applicabile. La data in cima a questa pagina indica l’ultima revisione. L’uso continuato
            del sito dopo una revisione costituisce accettazione dell’informativa aggiornata.
          </p>
        ),
      },
      {
        id: "contact",
        title: "Contatti",
        body: (
          <p>
            Per qualsiasi domanda sulla privacy o per esercitare i tuoi diritti, contattaci all’indirizzo {mail}.
          </p>
        ),
      },
    ],
  };
}
