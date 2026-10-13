import { SITE } from "@/lib/constants";
import type { LegalCtx, LegalDoc } from "@/components/legal/LegalPage";

export default function termsIt({ mail }: LegalCtx): LegalDoc {
  return {
    metaTitle: "Termini e condizioni",
    metaDescription: "Termini e condizioni che regolano le prenotazioni e i tour con Marrakech Eco Tours, secondo la legge marocchina.",
    title: "Termini e condizioni",
    intro: "Le condizioni che regolano le prenotazioni e i tour con Marrakech Eco Tours. Leggile prima di prenotare.",
    sections: [
      {
        id: "about",
        title: "Informazioni su queste condizioni",
        body: (
          <>
            <p>
              I presenti Termini e condizioni regolano tutte le prenotazioni effettuate con Marrakech Eco Tours
              («noi»), tour operator con sede a {SITE.address}, che opera secondo la legge marocchina. Inviando una
              richiesta di prenotazione, versando un acconto o effettuando il pagamento completo tramite{" "}
              <a href="https://marrakechecotours.com">marrakechecotours.com</a>, accetti queste condizioni per te e
              per tutti i membri del tuo gruppo.
            </p>
            <p>
              Il nostro sito è disponibile in inglese, francese, spagnolo, tedesco, italiano e arabo come cortesia. In
              caso di discrepanza tra le traduzioni, <strong>prevale la versione inglese</strong>.
            </p>
          </>
        ),
      },
      {
        id: "services",
        title: "I nostri servizi",
        body: (
          <>
            <p>
              Offriamo tour guidati di trekking, deserto, cultura e avventura con partenza da Marrakech e Agadir:
              trekking nell’Alto Atlante, ascensioni al Toubkal, escursioni nel Sahara, passeggiate culturali nelle
              medine e avventure di più giorni nella natura. Tutti i dettagli — cosa è incluso ed escluso, preparazione
              fisica richiesta e durata — sono indicati nella pagina di ciascun tour.
            </p>
            <p>
              Le notizie e gli articoli di viaggio del nostro sito sono raccolti da feed RSS di terze parti a solo
              scopo informativo. Non siamo responsabili dell’accuratezza, dell’attualità o del contenuto delle fonti
              esterne.
            </p>
          </>
        ),
      },
      {
        id: "bookings",
        title: "Prenotazioni e pagamenti",
        body: (
          <ul>
            <li>Una prenotazione è confermata quando abbiamo ricevuto il tuo acconto e ti abbiamo inviato una conferma scritta via e-mail.</li>
            <li>Per garantire la prenotazione è richiesto un acconto, di norma il <strong>20% del prezzo del tour</strong>. L’importo esatto è indicato nella pagina del tour o nella tua fattura, ed è quello che si applica.</li>
            <li>Il saldo si paga <strong>all’arrivo</strong>, all’inizio del tour, in contanti (euro o dirham), oppure con bonifico bancario prima della data. <strong>Non accettiamo pagamenti con carta.</strong></li>
            <li>Le prenotazioni dell’ultimo minuto sono accettate alle stesse condizioni, salvo disponibilità: l’acconto blocca le date e il saldo si paga all’arrivo.</li>
            <li>L’acconto si paga tramite <strong>PayPal</strong> o con <strong>bonifico bancario</strong>. Ti inviamo i dati per il pagamento via WhatsApp o e-mail una volta confermata la prenotazione; inviaci uno screenshot del pagamento quando l’hai effettuato. Le commissioni PayPal o bancarie per l’invio di un pagamento sono a tuo carico. Se da un pagamento vengono trattenute commissioni e riceviamo meno dell’importo dovuto, la differenza si aggiunge al saldo da pagare all’inizio del viaggio. Non riceviamo né conserviamo mai i dati della tua carta.</li>
            <li>I prezzi sono mostrati nella valuta scelta (EUR, USD, GBP o MAD) per comodità; il prezzo contrattuale è concordato per iscritto alla conferma. Le fluttuazioni del cambio sono a tuo carico.</li>
            <li>Le prenotazioni di gruppo da 6 persone in su possono essere soggette a un preventivo personalizzato: contattaci prima di prenotare.</li>
          </ul>
        ),
      },
      {
        id: "cancellation",
        title: "Politica di cancellazione",
        body: (
          <>
            <h3>Cancellazione da parte tua</h3>
            <dl className="tier">
              <dt>14 giorni o più prima della partenza</dt>
              <dd>Rimborso completo di tutti i pagamenti effettuati, acconto compreso, al netto delle commissioni di trasferimento.</dd>
              <dt>Meno di 14 giorni prima della partenza</dt>
              <dd>Si applica una penale del 50% del prezzo totale del tour. Quanto hai pagato oltre tale importo ti viene rimborsato, al netto delle commissioni di trasferimento.</dd>
              <dt>Mancata presentazione</dt>
              <dd>Nessun rimborso. Viene addebitato l’intero prezzo del tour.</dd>
            </dl>
            <p>Tutte le richieste di cancellazione devono essere inviate per iscritto a {mail}. La data in cui riceviamo la tua cancellazione scritta determina la fascia applicabile.</p>
            <h3>Rimborsi e commissioni di trasferimento</h3>
            <p>I rimborsi sono soggetti a commissioni di trasferimento: le commissioni PayPal o bancarie addebitate per l’invio di un rimborso vengono detratte dall’importo rimborsato. Vale per ogni rimborso, chiunque annulli.</p>
            <h3>Cancellazione da parte nostra</h3>
            <p>Ci riserviamo il diritto di annullare un tour per insufficienza di prenotazioni, condizioni meteorologiche estreme, motivi di sicurezza, instabilità politica, calamità naturali o forza maggiore. In tal caso ricevi il rimborso completo di tutti i pagamenti effettuati, al netto delle commissioni di trasferimento. Non siamo responsabili dei costi aggiuntivi da te sostenuti (voli internazionali, alloggio, visti, assicurazione di viaggio, ecc.).</p>
          </>
        ),
      },
      {
        id: "changes-to-bookings",
        title: "Modifiche alle prenotazioni",
        body: (
          <p>
            Accogliamo le richieste di cambio data quando possibile, in base alla disponibilità e con almeno 14
            giorni di preavviso. Può essere applicato un costo amministrativo di <strong>25 € a persona</strong> per il
            cambio data. Le nostre guide possono modificare l’itinerario il giorno stesso per motivi di sicurezza,
            meteo o logistica. Non è previsto alcun rimborso per modifiche dell’itinerario fatte in buona fede per
            questi motivi.
          </p>
        ),
      },
      {
        id: "responsibilities",
        title: "Le tue responsabilità",
        body: (
          <ul>
            <li>Prima del viaggio devi avere un passaporto valido e gli eventuali visti richiesti per il Marocco.</li>
            <li>Devi stipulare un’adeguata assicurazione di viaggio, con copertura medica e di evacuazione d’emergenza. La <strong>raccomandiamo vivamente</strong> per tutti i trekking e i tour nel deserto.</li>
            <li>Al momento della prenotazione devi comunicare eventuali condizioni di salute, esigenze alimentari, disabilità o limitazioni di mobilità rilevanti per il tour.</li>
            <li>Devi seguire sempre le indicazioni della tua guida. Le guide possono modificare o interrompere un tour se necessario per la sicurezza del gruppo.</li>
            <li>Il partecipante il cui comportamento mette in pericolo gli altri o è ritenuto inappropriato dalla guida può essere escluso dal tour senza rimborso.</li>
            <li>Sei responsabile della sicurezza dei tuoi effetti personali per tutta la durata del tour.</li>
          </ul>
        ),
      },
      {
        id: "health-fitness",
        title: "Salute e forma fisica",
        body: (
          <p>
            Completando una prenotazione confermi che tu e tutti i membri del tuo gruppo siete in condizioni di
            salute adatte al tour scelto. I trekking — in particolare le ascensioni al Toubkal e i percorsi di più
            giorni nell’Alto Atlante — richiedono una buona forma cardiovascolare e comportano uno sforzo intenso in
            quota (fino a 4.167 m). Non ci assumiamo alcuna responsabilità per lesioni o malattie derivanti dalla
            mancata comunicazione, prima della prenotazione, di condizioni di salute rilevanti.
          </p>
        ),
      },
      {
        id: "included-excluded",
        title: "Servizi inclusi ed esclusi",
        body: (
          <p>
            Cosa è incluso ed escluso è indicato nella pagina di ciascun tour. Salvo indicazione esplicita, sono{" "}
            <strong>esclusi</strong> da tutti i prezzi: voli internazionali, costi del visto per il Marocco,
            assicurazione di viaggio, trasferimenti aeroportuali (salvo indicazione), spese personali, pasti non
            indicati nella descrizione del tour, mance per guide e autisti e supplementi per camera singola.
          </p>
        ),
      },
      {
        id: "eco",
        title: "Impegno ecologico",
        body: (
          <p>
            Ci impegniamo per un turismo responsabile e sostenibile in Marocco. Chiediamo a tutti i partecipanti di
            rispettare l’ambiente, le comunità e le tradizioni locali: seguendo i principi «Leave No Trace» durante i
            trekking, rispettando le regole di abbigliamento locali nelle medine e nei villaggi e sostenendo
            l’economia locale acquistando, quando possibile, da artigiani e negozi del posto.
          </p>
        ),
      },
      {
        id: "liability",
        title: "Responsabilità",
        body: (
          <>
            <p>
              Adottiamo tutte le misure ragionevoli per garantire la sicurezza e la qualità dei tour che organizziamo.
              Tuttavia non siamo responsabili per:
            </p>
            <ul>
              <li>Morte, lesioni personali, malattie, perdite o danni derivanti da circostanze al di fuori del nostro ragionevole controllo (forza maggiore, condizioni meteorologiche estreme, calamità naturali, disordini civili, pandemie)</li>
              <li>La perdita o il danneggiamento di effetti personali durante un tour</li>
              <li>Gli atti o le omissioni di fornitori terzi (alloggio, trasporto) quando agiamo come intermediari e non come fornitori principali</li>
              <li>I costi da te sostenuti a seguito dell’annullamento o della modifica di un tour (voli, hotel, costi del visto, ecc.)</li>
              <li>L’accuratezza delle notizie o dei contenuti di viaggio provenienti da feed RSS di terze parti</li>
            </ul>
            <p>
              La nostra responsabilità massima nei tuoi confronti è in ogni caso limitata al prezzo totale pagato per
              il tuo tour. Nulla in queste condizioni esclude una responsabilità che non può essere esclusa ai sensi
              della legge marocchina applicabile.
            </p>
          </>
        ),
      },
      {
        id: "photography",
        title: "Fotografie e media",
        body: (
          <>
            <p>
              Le nostre guide possono fotografare o filmare le attività del tour. Se sei riconoscibile in
              un’immagine, ti chiederemo il permesso prima di pubblicarla sul nostro sito o sui social, e sei libero di
              rifiutare senza dare spiegazioni. Puoi anche dire alla tua guida in qualsiasi momento del tour che
              preferisci non essere fotografato.
            </p>
            <p>
              Se cambi idea dopo aver dato il permesso, scrivici a {mail} e rimuoveremo l’immagine dai nostri canali.
              Le immagini già condivise o ripubblicate da terzi potrebbero sfuggire al nostro controllo.
            </p>
          </>
        ),
      },
      {
        id: "ip",
        title: "Proprietà intellettuale",
        body: (
          <p>
            I testi, il design e il codice di questo sito sono di proprietà di Marrakech Eco Tours. Non puoi
            riprodurli, distribuirli o utilizzarli senza il nostro esplicito consenso scritto. Alcune fotografie sono
            concesse in licenza da archivi fotografici e restano di proprietà dei rispettivi fotografi secondo tali
            licenze. Gli articoli della pagina Notizie provengono da feed di terze parti e restano di proprietà dei
            loro editori.
          </p>
        ),
      },
      {
        id: "complaints",
        title: "Reclami",
        body: (
          <p>
            Se hai un reclamo durante il tour, segnalalo subito alla tua guida, così potremo intervenire sul momento.
            Se il problema non viene risolto, invia un reclamo scritto a {mail} entro 28 giorni dalla fine del tour.
            Ne confermeremo la ricezione entro 5 giorni lavorativi e risponderemo in modo completo entro 14 giorni.
          </p>
        ),
      },
      {
        id: "governing-law",
        title: "Legge applicabile",
        body: (
          <>
            <p>
              I presenti Termini e condizioni sono regolati dalle leggi del Regno del Marocco e le controversie sono
              di competenza dei tribunali di Marrakech.
            </p>
            <p>
              Se sei un consumatore residente nell’Unione europea o nel Regno Unito, ciò non ti priva della tutela
              delle disposizioni inderogabili della normativa sui consumatori del tuo paese di residenza, e conservi
              ogni diritto di agire davanti ai tribunali del tuo paese.
            </p>
          </>
        ),
      },
      {
        id: "changes",
        title: "Modifiche a queste condizioni",
        body: (
          <p>
            Possiamo aggiornare queste condizioni di tanto in tanto. La data in cima a questa pagina indica l’ultima
            revisione. L’uso continuato del sito, o qualsiasi prenotazione effettuata dopo una revisione, costituisce
            accettazione delle condizioni aggiornate.
          </p>
        ),
      },
      {
        id: "contact",
        title: "Con chi stipuli il contratto",
        body: (
          <>
            <p>
              I tour prenotati tramite questo sito sono organizzati da <strong>Marrakech Eco Tours</strong>, tour
              operator con sede a {SITE.address}, in attività dal {SITE.foundedYear}.
            </p>
            <p>
              E-mail {mail} · Telefono <a href={`tel:${SITE.phoneDial}`}>{SITE.phone}</a>
            </p>
            <p>
              Puoi inviare domande su queste condizioni, o su una prenotazione già effettuata, tramite uno qualsiasi di
              questi recapiti. Rispondiamo entro un’ora (8:00–20:00, ora del Marocco).
            </p>
          </>
        ),
      },
    ],
  };
}
