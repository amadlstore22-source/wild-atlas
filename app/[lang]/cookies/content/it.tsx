import Link from "next/link";
import type { LegalCtx, LegalDoc } from "@/components/legal/LegalPage";

export default function cookiesIt({ lang, mail }: LegalCtx): LegalDoc {
  return {
    metaTitle: "Cookie Policy",
    metaDescription: "I cookie e la misurazione rispettosa della privacy usati da Marrakech Eco Tours, e come controllarli.",
    title: "Cookie Policy",
    intro: "I cookie e la misurazione rispettosa della privacy che utilizziamo, perché, e come puoi controllarli.",
    sections: [
      {
        id: "what-are-cookies",
        title: "Cosa sono i cookie",
        body: (
          <p>
            I cookie sono piccoli file di testo che un sito salva nel tuo browser. Permettono al sito di ricordare le
            scelte che hai fatto e di funzionare correttamente. Questa policy spiega quali cookie utilizziamo, perché
            e come controllarli. Completa la nostra{" "}
            <Link href={`/${lang}/privacy`}>Informativa sulla privacy</Link>.
          </p>
        ),
      },
      {
        id: "our-approach",
        title: "Il nostro approccio",
        body: (
          <>
            <p>
              Riduciamo i cookie al minimo e non vendiamo mai i dati raccolti tramite i cookie. Utilizziamo{" "}
              <strong>Google Analytics</strong> e <strong>Microsoft Clarity</strong> per capire come i visitatori
              trovano e usano il sito, e <strong>solo</strong> se li accetti: entrambi restano disattivati finché non
              scegli <strong>Accetta tutto</strong>. Non utilizziamo pixel dei social media né tracker pubblicitari
              tra siti.
            </p>
            <p>
              Alla prima visita un banner ti permette di <strong>Accettare tutto</strong> o di mantenere solo i cookie{" "}
              <strong>necessari</strong>. Se scegli «Solo necessari», non viene impostato alcun cookie analitico e
              Google Analytics non si carica affatto. Con entrambe le scelte puoi usare tutto il sito: non c’è alcun
              cookie wall. La tua scelta viene ricordata per non chiedertela di nuovo, e puoi cambiarla in qualsiasi
              momento cancellando i cookie.
            </p>
          </>
        ),
      },
      {
        id: "cookies-we-use",
        title: "Cookie che utilizziamo",
        body: (
          <>
            <h3>Strettamente necessari</h3>
            <dl className="tier">
              <dt>met-cookie-consent</dt>
              <dd>Memorizza la tua scelta sui cookie perché il banner non ricompaia. Nessun consenso richiesto (esente). Durata: fino a 1 anno.</dd>
            </dl>
            <h3>Funzionali (preferenze)</h3>
            <dl className="tier">
              <dt>met_currency</dt>
              <dd>Ricorda la valuta di visualizzazione scelta (EUR, USD, GBP o MAD). Impostato solo se cambi valuta. Durata: fino a 1 anno.</dd>
            </dl>
            <h3>Analitici: solo se scegli «Accetta tutto»</h3>
            <p>
              I seguenti cookie sono impostati da <strong>Google Analytics (GA4)</strong>, e solo dopo che hai
              scelto <strong>Accetta tutto</strong>. Se scegli <strong>Solo necessari</strong>, nessuno di essi
              viene mai impostato. Ci aiutano a vedere, in forma aggregata, quali pagine e tour interessano ai
              visitatori e se i nostri annunci attirano le persone giuste; non li usiamo per identificarti
              personalmente.
            </p>
            <dl className="tier">
              <dt>_ga</dt>
              <dd>Distingue il browser di un visitatore da quello di un altro per poter contare le visite. Impostato da Google Analytics. Durata: fino a 2 anni.</dd>
              <dt>_ga_&lt;container&gt;</dt>
              <dd>Mantiene lo stato della tua sessione per Google Analytics 4. Durata: fino a 2 anni.</dd>
              <dt>_gid</dt>
              <dd>Distingue i visitatori in un breve intervallo di tempo. Impostato da Google Analytics. Durata: fino a 24 ore.</dd>
            </dl>
            <p>
              Sempre e solo dopo <strong>Accetta tutto</strong>, <strong>Microsoft Clarity</strong> ci mostra, in
              forma aggregata e tramite registrazioni anonimizzate, dove i visitatori cliccano e scorrono, così da
              correggere le pagine che creano confusione. Clarity maschera ciò che digiti nei moduli. I suoi cookie:
            </p>
            <dl className="tier">
              <dt>_clck</dt>
              <dd>Conserva l’ID utente Clarity e le preferenze per questo sito. Impostato da Microsoft Clarity.</dd>
              <dt>_clsk</dt>
              <dd>Collega le pagine di una visita in un’unica sessione. Impostato da Microsoft Clarity.</dd>
              <dt>CLID, MUID, ANONCHK, MR, SM</dt>
              <dd>Cookie di terze parti su domini Microsoft che Clarity usa per riconoscere un browser; Clarity non li usa per la pubblicità (ANONCHK vale sempre 0). Vedi l’elenco dei cookie di Clarity di Microsoft.</dd>
            </dl>
          </>
        ),
      },
      {
        id: "measurement",
        title: "Misurazione senza cookie",
        body: (
          <>
            <p>
              Contiamo anche i clic sui suggerimenti di tour presenti nei nostri articoli. Per ogni clic registriamo
              solo la data, la lingua, l’articolo e il tour cliccato: <strong>nessun cookie</strong>, nessun indirizzo
              IP e nulla che possa identificarti, quindi funziona qualunque sia la tua scelta nel banner.
            </p>
            <p>
              Oltre ai cookie analitici indicati sopra, utilizziamo <strong>Vercel Analytics</strong> e{" "}
              <strong>Vercel Speed Insights</strong> per misurare le prestazioni del sito. Sono strumenti rispettosi
              della privacy che <strong>non usano cookie</strong> né fingerprinting: raccolgono solo metriche
              anonimizzate e aggregate (pagine viste, numero di visitatori, Core Web Vitals), funzionano sempre e non
              possono identificarti. Vedi l’
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">informativa sulla privacy di Vercel</a>.
            </p>
          </>
        ),
      },
      {
        id: "third-party",
        title: "Cookie di terze parti",
        body: (
          <>
            <p>
              Quando accetti tutti i cookie, <strong>Google</strong> (Google Analytics e misurazione delle
              conversioni di Google Ads) imposta i cookie indicati sopra e può usarli per misurare il rendimento della
              nostra pubblicità. Ciò è regolato dalla{" "}
              <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">cookie policy di Google</a>{" "}
              e dalle sue{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">norme sulla privacy</a>.
            </p>
            <p>
              Quando accetti tutti i cookie, <strong>Microsoft</strong> (Clarity) imposta i cookie indicati sopra. Ciò
              è regolato dall’
              <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies" target="_blank" rel="noopener noreferrer">elenco dei cookie di Clarity</a>{" "}
              e dall’
              <a href="https://www.microsoft.com/en-us/privacy/privacystatement" target="_blank" rel="noopener noreferrer">informativa sulla privacy di Microsoft</a>.
            </p>
            <p>
              Alcune pagine integrano o collegano anche altri servizi di terze parti che possono impostare i propri
              cookie quando interagisci con loro: per esempio <strong>PayPal</strong> quando segui un link di
              pagamento che ti inviamo, o <strong>WhatsApp / Meta</strong> se avvii una chat. Sono regolati dalle
              policy sui cookie e sulla privacy di quei fornitori, non dalla nostra.
            </p>
          </>
        ),
      },
      {
        id: "managing-cookies",
        title: "Gestire ed eliminare i cookie",
        body: (
          <>
            <p>Il controllo è sempre nelle tue mani:</p>
            <ul>
              <li>Scegli <strong>Solo necessari</strong> nel banner del consenso per evitare i cookie funzionali e analitici: Google Analytics e Microsoft Clarity non verranno caricati.</li>
              <li>Per revocare il consenso dopo aver accettato, cancella i cookie di questo sito nel browser; il banner ricompare e puoi scegliere di nuovo. La cancellazione azzera anche la valuta scelta.</li>
              <li>Imposta il browser per bloccare i cookie o avvisarti. Il sito continuerà a funzionare, ma potrebbe non ricordare la tua valuta.</li>
            </ul>
            <p>
              La maggior parte dei browser spiega come gestire i cookie nella sezione Guida (Chrome, Safari, Firefox,
              Edge).
            </p>
          </>
        ),
      },
      {
        id: "changes",
        title: "Modifiche a questa policy",
        body: (
          <p>
            Possiamo aggiornare questa Cookie Policy man mano che il sito evolve o la legge cambia. La data in alto
            indica l’ultima revisione.
          </p>
        ),
      },
      {
        id: "contact",
        title: "Contatti",
        body: <p>Domande sui cookie? Scrivici a {mail}.</p>,
      },
    ],
  };
}
