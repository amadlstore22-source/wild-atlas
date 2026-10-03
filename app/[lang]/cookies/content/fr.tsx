import Link from "next/link";
import type { LegalCtx, LegalDoc } from "@/components/legal/LegalPage";

export default function cookiesFr({ lang, mail }: LegalCtx): LegalDoc {
  return {
    metaTitle: "Politique relative aux cookies",
    metaDescription: "Les cookies et la mesure d’audience respectueuse de la vie privée utilisés par Marrakech Eco Tours, et comment les contrôler.",
    title: "Politique relative aux cookies",
    intro: "Les cookies et la mesure d’audience respectueuse de la vie privée que nous utilisons, pourquoi, et comment vous pouvez les contrôler.",
    sections: [
      {
        id: "what-are-cookies",
        title: "Qu’est-ce qu’un cookie",
        body: (
          <p>
            Les cookies sont de petits fichiers texte qu’un site enregistre dans votre navigateur. Ils permettent au
            site de se souvenir de vos choix et de fonctionner correctement. Cette politique explique quels cookies
            nous utilisons, pourquoi, et comment les contrôler. Elle complète notre{" "}
            <Link href={`/${lang}/privacy`}>Politique de confidentialité</Link>.
          </p>
        ),
      },
      {
        id: "our-approach",
        title: "Notre approche",
        body: (
          <>
            <p>
              Nous limitons les cookies au minimum et ne vendons jamais les données collectées par leur biais. Nous
              utilisons <strong>Google Analytics</strong> et <strong>Microsoft Clarity</strong> pour comprendre
              comment les visiteurs trouvent et utilisent le site, et <strong>uniquement</strong> si vous les
              acceptez — tous deux restent désactivés tant que vous n’avez pas choisi <strong>Tout accepter</strong>.
              Nous n’utilisons ni pixels de réseaux sociaux ni traceurs publicitaires inter-sites.
            </p>
            <p>
              Lors de votre première visite, un bandeau vous permet de <strong>Tout accepter</strong> ou de ne garder
              que les cookies <strong>nécessaires</strong>. Si vous choisissez « Nécessaires uniquement », aucun cookie
              d’analyse n’est déposé et Google Analytics ne se charge pas du tout. Quel que soit votre choix, vous
              pouvez utiliser tout le site — il n’y a pas de mur de cookies. Votre choix est mémorisé pour ne pas vous
              le redemander, et vous pouvez le modifier à tout moment en effaçant vos cookies.
            </p>
          </>
        ),
      },
      {
        id: "cookies-we-use",
        title: "Les cookies que nous utilisons",
        body: (
          <>
            <h3>Strictement nécessaires</h3>
            <dl className="tier">
              <dt>met-cookie-consent</dt>
              <dd>Enregistre votre choix concernant les cookies pour que le bandeau ne réapparaisse pas. Aucun consentement requis (exempté). Durée : jusqu’à 1 an.</dd>
            </dl>
            <h3>Fonctionnels (préférences)</h3>
            <dl className="tier">
              <dt>met_currency</dt>
              <dd>Mémorise la devise d’affichage choisie (EUR, USD, GBP ou MAD). Déposé uniquement si vous changez de devise. Durée : jusqu’à 1 an.</dd>
            </dl>
            <h3>Mesure d’audience — uniquement si vous choisissez « Tout accepter »</h3>
            <p>
              Les cookies suivants sont déposés par <strong>Google Analytics (GA4)</strong>, et uniquement après que
              vous avez choisi <strong>Tout accepter</strong>. Choisissez <strong>Nécessaires uniquement</strong> et
              aucun d’eux ne sera jamais déposé. Ils nous aident à voir, de manière agrégée, quelles pages et quels
              circuits intéressent les visiteurs, et si nos publicités attirent les bonnes personnes — nous ne les
              utilisons pas pour vous identifier personnellement.
            </p>
            <dl className="tier">
              <dt>_ga</dt>
              <dd>Distingue le navigateur d’un visiteur de celui d’un autre afin de compter les visites. Déposé par Google Analytics. Durée : jusqu’à 2 ans.</dd>
              <dt>_ga_&lt;container&gt;</dt>
              <dd>Conserve l’état de votre session pour Google Analytics 4. Durée : jusqu’à 2 ans.</dd>
              <dt>_gid</dt>
              <dd>Distingue les visiteurs sur une courte période. Déposé par Google Analytics. Durée : jusqu’à 24 heures.</dd>
            </dl>
            <p>
              Également uniquement après <strong>Tout accepter</strong>, <strong>Microsoft Clarity</strong> nous
              montre, de manière agrégée et sous forme de replays anonymisés, où les visiteurs cliquent et font
              défiler la page, afin que nous puissions corriger les pages qui les déroutent. Clarity masque ce que
              vous saisissez dans les formulaires. Ses cookies :
            </p>
            <dl className="tier">
              <dt>_clck</dt>
              <dd>Conserve l’identifiant utilisateur Clarity et les préférences pour ce site. Déposé par Microsoft Clarity.</dd>
              <dt>_clsk</dt>
              <dd>Relie les pages d’une même visite en une seule session. Déposé par Microsoft Clarity.</dd>
              <dt>CLID, MUID, ANONCHK, MR, SM</dt>
              <dd>Cookies tiers sur des domaines Microsoft que Clarity utilise pour reconnaître un navigateur ; Clarity ne les utilise pas à des fins publicitaires (ANONCHK vaut toujours 0). Voir la liste des cookies Clarity de Microsoft.</dd>
            </dl>
          </>
        ),
      },
      {
        id: "measurement",
        title: "Mesure sans cookies",
        body: (
          <>
            <p>
              Nous comptons aussi les clics sur les suggestions de circuits présentes dans nos articles. Pour chaque
              clic, nous enregistrons uniquement la date, la langue, l’article et le circuit cliqué —{" "}
              <strong>aucun cookie</strong>, aucune adresse IP et rien qui puisse vous identifier — cette mesure
              fonctionne donc quel que soit votre choix sur le bandeau.
            </p>
            <p>
              Indépendamment des cookies d’analyse ci-dessus, nous utilisons <strong>Vercel Analytics</strong> et{" "}
              <strong>Vercel Speed Insights</strong> pour mesurer les performances du site. Ces outils respectent la
              vie privée et <strong>n’utilisent ni cookies</strong> ni empreinte numérique — ils collectent
              uniquement des statistiques anonymisées et agrégées (pages vues, nombre de visiteurs, Core Web Vitals),
              fonctionnent en permanence et ne peuvent pas vous identifier. Voir la{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">politique de confidentialité de Vercel</a>.
            </p>
          </>
        ),
      },
      {
        id: "third-party",
        title: "Cookies tiers",
        body: (
          <>
            <p>
              Lorsque vous acceptez tous les cookies, <strong>Google</strong> (Google Analytics et mesure des
              conversions Google Ads) dépose les cookies indiqués ci-dessus et peut les utiliser pour mesurer la
              performance de nos publicités. Ceci est régi par la{" "}
              <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">politique de Google relative aux cookies</a>{" "}
              et ses{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">règles de confidentialité</a>.
            </p>
            <p>
              Lorsque vous acceptez tous les cookies, <strong>Microsoft</strong> (Clarity) dépose les cookies
              indiqués ci-dessus. Ceci est régi par la{" "}
              <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies" target="_blank" rel="noopener noreferrer">liste des cookies Clarity</a>{" "}
              et la{" "}
              <a href="https://www.microsoft.com/en-us/privacy/privacystatement" target="_blank" rel="noopener noreferrer">déclaration de confidentialité de Microsoft</a>.
            </p>
            <p>
              Certaines pages intègrent aussi d’autres services tiers, ou renvoient vers eux, qui peuvent déposer leurs
              propres cookies lorsque vous interagissez avec eux — par exemple <strong>PayPal</strong> lorsque vous
              suivez un lien de paiement que nous vous envoyons, ou <strong>WhatsApp / Meta</strong> si vous démarrez
              une conversation. Ces cookies sont régis par les politiques de ces prestataires, et non par la nôtre.
            </p>
          </>
        ),
      },
      {
        id: "managing-cookies",
        title: "Gérer et supprimer les cookies",
        body: (
          <>
            <p>Vous gardez toujours le contrôle :</p>
            <ul>
              <li>Choisissez <strong>Nécessaires uniquement</strong> sur le bandeau de consentement pour éviter les cookies fonctionnels et d’analyse — Google Analytics et Microsoft Clarity ne se chargeront pas.</li>
              <li>Pour retirer votre consentement après avoir accepté, effacez les cookies de ce site dans votre navigateur ; le bandeau réapparaît et vous pouvez choisir à nouveau. Cela réinitialise aussi votre choix de devise.</li>
              <li>Configurez votre navigateur pour bloquer les cookies ou vous avertir. Le site fonctionnera toujours, mais il pourrait ne pas se souvenir de votre devise.</li>
            </ul>
            <p>
              La plupart des navigateurs expliquent comment gérer les cookies dans leur rubrique d’aide (Chrome,
              Safari, Firefox, Edge).
            </p>
          </>
        ),
      },
      {
        id: "changes",
        title: "Modifications de cette politique",
        body: (
          <p>
            Nous pouvons mettre à jour cette Politique relative aux cookies à mesure que notre site évolue ou que la
            loi change. La date en haut de la page indique la dernière révision.
          </p>
        ),
      },
      {
        id: "contact",
        title: "Contact",
        body: <p>Une question sur les cookies ? Contactez-nous à {mail}.</p>,
      },
    ],
  };
}
