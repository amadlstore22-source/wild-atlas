import Link from "next/link";
import { SITE, SISTER_SITE } from "@/lib/constants";
import type { LegalCtx, LegalDoc } from "@/components/legal/LegalPage";

export default function privacyFr({ lang, mail }: LegalCtx): LegalDoc {
  return {
    metaTitle: "Politique de confidentialité",
    metaDescription: "Comment Marrakech Eco Tours collecte, utilise et protège vos données personnelles, conformément à la loi marocaine 09-08.",
    title: "Politique de confidentialité",
    intro: "Comment nous collectons, utilisons et protégeons vos données personnelles, et les droits dont vous disposez sur vos données en vertu de la loi marocaine 09-08.",
    sections: [
      {
        id: "who-we-are",
        title: "Qui sommes-nous",
        body: (
          <>
            <p>
              Marrakech Eco Tours (« nous ») est un tour-opérateur basé au Maroc qui propose des circuits guidés de
              trekking, de désert, culturels et d’aventure au départ de Marrakech et d’Agadir. Notre site web est{" "}
              <a href="https://marrakechecotours.com">marrakechecotours.com</a>.
            </p>
            <p>
              Nous sommes le <strong>responsable du traitement</strong> des données personnelles décrites dans cette
              politique. Pour nous contacter à ce sujet — y compris pour exercer l’un des droits décrits ci-dessous —
              écrivez à {mail}, appelez le <a href={`tel:${SITE.phoneDial}`}>{SITE.phone}</a> ou écrivez-nous à
              l’adresse {SITE.address}.
            </p>
            <p>
              Nous exploitons également une marque sœur,{" "}
              <a href={SISTER_SITE.url} target="_blank" rel="noopener noreferrer">{SISTER_SITE.name}</a>{" "}
              ({SISTER_SITE.url.replace("https://", "")}), gérée par la même équipe. Cette politique couvre
              marrakechecotours.com ; le site de la marque sœur publie sa propre notice.
            </p>
            <p>
              Cette politique explique quelles données personnelles nous collectons, comment nous les utilisons et
              quels sont vos droits. Nous traitons les données personnelles conformément à la loi marocaine n° 09-08
              relative à la protection des personnes physiques à l’égard du traitement des données à caractère
              personnel, sous le contrôle de la CNDP (Commission Nationale de contrôle de la protection des Données à
              caractère Personnel). Pour les visiteurs de l’Union européenne, nous appliquons également des normes
              alignées sur le RGPD.
            </p>
          </>
        ),
      },
      {
        id: "information-we-collect",
        title: "Données que nous collectons",
        body: (
          <>
            <p>Nous collectons uniquement les informations que vous nous fournissez volontairement lorsque vous :</p>
            <ul>
              <li>Envoyez une demande d’information ou de réservation via notre formulaire de contact (nom, adresse e-mail, numéro de téléphone, circuit souhaité, dates de voyage, taille du groupe et message)</li>
              <li>Nous contactez directement par WhatsApp, e-mail ou téléphone</li>
              <li>Vous abonnez à notre newsletter (adresse e-mail uniquement)</li>
              <li>Effectuez une réservation et le paiement d’un acompte (le paiement est traité par PayPal — nous ne recevons, ne conservons et n’avons accès à aucune de vos coordonnées bancaires ou de carte)</li>
              <li>Apparaissez sur des photos prises pendant un circuit, lorsque nous vous avons demandé et avons obtenu votre accord pour les publier</li>
            </ul>
            <p>
              Nous traitons aussi automatiquement une petite quantité de données techniques et de préférences — voir{" "}
              <a href="#cookies">Cookies et technologies similaires</a> et{" "}
              <Link href={`/${lang}/cookies`}>notre Politique relative aux cookies</Link> pour le détail complet.
            </p>
          </>
        ),
      },
      {
        id: "how-we-use",
        title: "Utilisation de vos données",
        body: (
          <>
            <p>Nous utilisons les informations que vous fournissez uniquement pour :</p>
            <ul>
              <li>Répondre à votre demande et traiter votre réservation</li>
              <li>Envoyer les confirmations de réservation, les programmes et les informations avant le départ</li>
              <li>Vous contacter au sujet de modifications de votre réservation ou de votre circuit</li>
              <li>Envoyer des newsletters, uniquement si vous vous êtes expressément abonné (désabonnement possible à tout moment)</li>
              <li>Respecter nos obligations légales et comptables en vertu du droit marocain</li>
            </ul>
            <p>
              Nous n’utiliserons jamais vos informations pour du marketing non sollicité sans votre consentement
              explicite. Nous ne vendons, ne louons, ne partageons ni n’échangeons vos données personnelles avec des
              tiers à des fins marketing.
            </p>
          </>
        ),
      },
      {
        id: "cookies",
        title: "Cookies et technologies similaires",
        body: (
          <>
            <p>
              Notre site utilise un petit nombre de cookies. Nous n’utilisons <strong>pas</strong> de pixels de
              réseaux sociaux ni de traceurs publicitaires inter-sites. Les cookies que nous déposons sont :
            </p>
            <ul>
              <li><strong>Consentement (met-cookie-consent)</strong> — mémorise votre choix concernant les cookies pour ne pas vous le redemander. Strictement nécessaire.</li>
              <li><strong>Devise (met_currency)</strong> — mémorise la devise d’affichage choisie (EUR, USD, GBP ou MAD). Préférence fonctionnelle ; déposé uniquement si vous changez de devise.</li>
              <li><strong>Google Analytics (_ga, _gid et associés)</strong> — nous aident à comprendre, de manière agrégée, comment les visiteurs utilisent le site et si nos publicités atteignent les bonnes personnes. <strong>Déposés uniquement si vous choisissez « Tout accepter »</strong> ; si vous choisissez « Nécessaires uniquement », ils ne sont jamais déposés et Google Analytics ne se charge pas.</li>
              <li><strong>Microsoft Clarity (_clck, _clsk et associés)</strong> — nous montrent, de manière agrégée et sous forme de replays de sessions masqués, où les visiteurs cliquent et font défiler la page. <strong>Déposés uniquement si vous choisissez « Tout accepter »</strong> ; sinon Clarity ne se charge pas.</li>
            </ul>
            <p>
              Nous utilisons aussi une mesure de performance respectueuse de la vie privée et sans cookies (voir{" "}
              <a href="#third-party">Services tiers</a>). Le détail complet, y compris la manière de refuser ou
              d’effacer les cookies, figure dans notre{" "}
              <Link href={`/${lang}/cookies`}>Politique relative aux cookies</Link>. Lors de votre première visite,
              un bandeau vous permet d’accepter tous les cookies ou de ne conserver que ceux strictement nécessaires.
              La base légale des cookies d’analyse est votre <strong>consentement</strong>, que vous pouvez retirer à
              tout moment en effaçant les cookies de ce site.
            </p>
          </>
        ),
      },
      {
        id: "third-party",
        title: "Services tiers",
        body: (
          <>
            <p>
              Pour faire fonctionner notre site et traiter les réservations, nous faisons appel aux sous-traitants
              suivants. Chacun traite les données selon ses propres conditions de confidentialité :
            </p>
            <ul>
              <li>
                <strong>Vercel</strong> — hébergement du site et mesure d’audience respectueuse de la vie privée.
                Vercel Analytics et Speed Insights collectent des données de trafic et de performance anonymisées et
                agrégées (pages vues, nombre de visiteurs, Core Web Vitals) sans cookies ni identifiants personnels.
                Vercel peut enregistrer des données serveur standard (adresse IP, horodatage des requêtes) à des fins
                de sécurité. Voir la{" "}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">politique de confidentialité de Vercel</a>.
              </li>
              <li>
                <strong>Google (Analytics et Ads)</strong> — <strong>uniquement si vous acceptez tous les cookies</strong>,
                nous utilisons Google Analytics 4 pour mesurer l’utilisation globale du site et Google Ads pour mesurer
                la performance de nos publicités. Google peut traiter ces données (y compris votre adresse IP, pour
                laquelle nous activons l’anonymisation) hors du Maroc. Rien ne se charge si vous choisissez
                « Nécessaires uniquement ». Voir les{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">règles de confidentialité de Google</a>.
              </li>
              <li>
                <strong>Microsoft (Clarity)</strong> — <strong>uniquement si vous acceptez tous les cookies</strong>,
                nous utilisons Microsoft Clarity pour voir comment les visiteurs utilisent nos pages (clics,
                défilement, replays de sessions masqués), afin de corriger ce qui les déroute. Le texte saisi dans les
                formulaires est masqué. Rien ne se charge si vous choisissez « Nécessaires uniquement ». Voir la{" "}
                <a href="https://www.microsoft.com/en-us/privacy/privacystatement" target="_blank" rel="noopener noreferrer">déclaration de confidentialité de Microsoft</a>.
              </li>
              <li>
                <strong>PayPal</strong> — traitement sécurisé des paiements d’acomptes et des paiements complets.
                PayPal gère directement toutes les données de carte et bancaires ; nous ne recevons jamais vos
                identifiants de paiement.
              </li>
              <li>
                <strong>Resend</strong> — envoi des e-mails transactionnels. Lorsque vous envoyez notre formulaire de
                contact ou d’inscription à la newsletter, votre nom et votre e-mail transitent par Resend jusqu’à notre
                boîte de réception. Voir la{" "}
                <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">politique de confidentialité de Resend</a>.
              </li>
              <li>
                <strong>Cloudflare</strong> — DNS, sécurité réseau et routage des e-mails. Les messages envoyés à
                notre adresse {SITE.emailDisplay} sont transférés par Cloudflare Email Routing vers la boîte de
                l’équipe que nous consultons ; le contenu de votre e-mail transite donc par Cloudflare. En tant que
                couche DNS et de sécurité, Cloudflare traite aussi des données de connexion standard (adresse IP,
                métadonnées des requêtes) pour protéger le site contre les abus. Voir la{" "}
                <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">politique de confidentialité de Cloudflare</a>.
              </li>
              <li>
                <strong>WhatsApp / Meta</strong> — si vous nous contactez par WhatsApp, vos messages sont soumis à la
                politique de confidentialité et aux conditions de Meta.
              </li>
              <li>
                <strong>Éditeurs de flux RSS tiers</strong> — les articles de notre page Actualités sont récupérés
                côté serveur depuis des flux RSS publics (The Guardian, BBC, NYT Travel et d’autres). Aucune
                information permettant de vous identifier n’est transmise à ces éditeurs.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "retention",
        title: "Conservation des données",
        body: (
          <p>
            Nous conservons vos données personnelles aussi longtemps que nécessaire pour exécuter votre réservation,
            puis jusqu’à <strong>5 ans</strong> pour nos obligations comptables et légales en vertu du droit
            marocain. Les demandes qui n’aboutissent pas à une réservation sont supprimées dans les{" "}
            <strong>12 mois</strong> suivant notre dernier échange avec vous. Les abonnements à la newsletter sont
            conservés jusqu’à votre désabonnement.
          </p>
        ),
      },
      {
        id: "your-rights",
        title: "Vos droits",
        body: (
          <>
            <p>En vertu de la loi marocaine 09-08 (et du RGPD lorsqu’il s’applique), vous avez le droit de :</p>
            <ul>
              <li>Demander une copie des données personnelles que nous détenons sur vous (droit d’accès)</li>
              <li>Demander la correction de toute donnée inexacte ou incomplète (droit de rectification)</li>
              <li>Demander la suppression de vos données, lorsque la loi ne nous oblige pas à les conserver</li>
              <li>Vous opposer au traitement de vos données ou le limiter dans certaines circonstances</li>
              <li>Retirer à tout moment votre consentement à toute communication que vous n’avez pas acceptée contractuellement</li>
            </ul>
            <p>
              Pour exercer l’un de ces droits, écrivez-nous à {mail}. Nous répondrons dans un délai de{" "}
              <strong>30 jours</strong>. Vous pouvez également introduire une réclamation auprès de la CNDP si vous
              estimez que vos données ont été mal traitées.
            </p>
          </>
        ),
      },
      {
        id: "security",
        title: "Sécurité",
        body: (
          <p>
            Nous prenons des mesures techniques et organisationnelles raisonnables pour protéger vos données contre
            tout accès, perte ou divulgation non autorisés. Notre site est servi exclusivement en HTTPS avec une
            politique de sécurité du contenu (CSP) stricte. Tous les paiements sont traités par PayPal — nous ne
            recevons, ne transmettons ni ne conservons jamais de données de carte. Les messages du formulaire de
            contact sont acheminés par Resend via des connexions chiffrées.
          </p>
        ),
      },
      {
        id: "international",
        title: "Transferts internationaux",
        body: (
          <p>
            Nos activités et nos données sont principalement basées au Maroc. Notre hébergement (Vercel), l’envoi de
            nos e-mails (Resend) et — si vous avez accepté les cookies d’analyse — les infrastructures de Google
            Analytics/Ads et de Microsoft Clarity peuvent traiter des données aux États-Unis ou dans l’Union
            européenne. Lorsque des données personnelles sont transférées hors du Maroc, nous veillons à garantir
            des protections appropriées, conformément à la loi marocaine 09-08 et aux recommandations de la CNDP.
          </p>
        ),
      },
      {
        id: "children",
        title: "Protection des enfants",
        body: (
          <p>
            Nos services ne s’adressent pas aux enfants de moins de 16 ans et nous ne collectons pas sciemment leurs
            données personnelles. Les mineurs participant à un circuit doivent être accompagnés d’un adulte
            responsable qui accepte, en leur nom, ces conditions et cette politique. Si vous pensez qu’un enfant nous
            a transmis des données personnelles, contactez-nous et nous les supprimerons rapidement.
          </p>
        ),
      },
      {
        id: "external-links",
        title: "Liens externes",
        body: (
          <p>
            Notre site contient des liens vers des sites externes, notamment des articles d’actualité et notre marque
            sœur. Dès que vous quittez notre site, cette politique ne s’applique plus et nous ne sommes pas
            responsables des pratiques de confidentialité des sites tiers.
          </p>
        ),
      },
      {
        id: "changes",
        title: "Modifications de cette politique",
        body: (
          <p>
            Nous pouvons mettre à jour cette politique de temps à autre pour refléter l’évolution de nos services ou
            de la législation applicable. La date en haut de cette page indique la dernière révision. L’utilisation
            continue de notre site après une révision vaut acceptation de la politique mise à jour.
          </p>
        ),
      },
      {
        id: "contact",
        title: "Contact",
        body: (
          <p>
            Pour toute question relative à la confidentialité ou pour exercer vos droits, contactez-nous à {mail}.
          </p>
        ),
      },
    ],
  };
}
