import { SITE } from "@/lib/constants";
import type { LegalCtx, LegalDoc } from "@/components/legal/LegalPage";

export default function termsFr({ mail }: LegalCtx): LegalDoc {
  return {
    metaTitle: "Conditions générales de vente",
    metaDescription: "Conditions générales applicables aux réservations et aux circuits avec Marrakech Eco Tours, régies par le droit marocain.",
    title: "Conditions générales",
    intro: "Les conditions qui régissent les réservations et les circuits avec Marrakech Eco Tours. Merci de les lire avant de réserver.",
    sections: [
      {
        id: "about",
        title: "À propos de ces conditions",
        body: (
          <>
            <p>
              Les présentes Conditions générales régissent toutes les réservations effectuées auprès de Marrakech Eco
              Tours (« nous »), tour-opérateur établi à {SITE.address} et exerçant sous le droit marocain. En
              envoyant une demande de réservation, en versant un acompte ou en effectuant le paiement complet via{" "}
              <a href="https://marrakechecotours.com">marrakechecotours.com</a>, vous acceptez ces conditions en
              votre nom et au nom de tous les membres de votre groupe.
            </p>
            <p>
              Notre site est proposé en anglais, français, espagnol, allemand, italien et arabe à titre de courtoisie.
              En cas de divergence entre les traductions, la <strong>version anglaise prévaut</strong>.
            </p>
          </>
        ),
      },
      {
        id: "services",
        title: "Nos services",
        body: (
          <>
            <p>
              Nous proposons des circuits guidés de trekking, de désert, culturels et d’aventure au départ de
              Marrakech et d’Agadir : treks dans le Haut Atlas, ascensions du Toubkal, excursions dans le Sahara,
              visites culturelles des médinas et aventures de plusieurs jours en pleine nature. Tous les détails —
              prestations incluses et exclues, condition physique requise et durée — figurent sur la page de chaque
              circuit.
            </p>
            <p>
              Les actualités et articles de voyage de notre site proviennent de flux RSS de tiers, à titre informatif
              uniquement. Nous ne sommes pas responsables de l’exactitude, de l’actualité ou du contenu de ces sources
              externes.
            </p>
          </>
        ),
      },
      {
        id: "bookings",
        title: "Réservations et paiements",
        body: (
          <ul>
            <li>Une réservation est confirmée dès que nous avons reçu votre acompte et vous avons envoyé une confirmation écrite par e-mail.</li>
            <li>
              Un acompte est exigé pour garantir votre réservation. Son montant exact est indiqué sur la page de
              chaque circuit et représente généralement environ un quart du prix du circuit. Le montant affiché sur
              la page du circuit au moment de la réservation est celui qui s’applique.
            </li>
            <li>Le solde est réglé <strong>à l’arrivée</strong>, au début de votre circuit, en espèces ou par carte. Rien d’autre n’est prélevé avant votre voyage.</li>
            <li>Les réservations de dernière minute sont acceptées aux mêmes conditions, sous réserve de disponibilité — l’acompte garantit les dates et le solde est réglé à l’arrivée.</li>
            <li>Les acomptes et paiements sont effectués via <strong>PayPal</strong>. Lorsqu’aucun lien de paiement automatique n’est disponible sur la page du circuit, nous vous envoyons une demande de paiement PayPal par WhatsApp ou par e-mail une fois les détails de votre réservation confirmés, et votre acompte est garanti dès que ce paiement est effectué. Nous ne conservons pas vos coordonnées bancaires ou de carte et n’y avons pas accès. Les conditions et frais propres à PayPal s’appliquent.</li>
            <li>Les prix sont affichés dans la devise de votre choix (EUR, USD, GBP ou MAD) pour votre commodité ; le prix contractuel est convenu par écrit lors de la confirmation. Les fluctuations de change sont à votre charge.</li>
            <li>Les réservations de groupe de 6 personnes ou plus peuvent faire l’objet d’un devis sur mesure — contactez-nous avant de réserver.</li>
          </ul>
        ),
      },
      {
        id: "cancellation",
        title: "Conditions d’annulation",
        body: (
          <>
            <h3>Annulation de votre part</h3>
            <dl className="tier">
              <dt>14 jours ou plus avant le départ</dt>
              <dd>Remboursement intégral de tous les paiements effectués, acompte compris.</dd>
              <dt>8 à 13 jours avant le départ</dt>
              <dd>50 % du prix total du circuit est retenu ; le reste est remboursé.</dd>
              <dt>7 jours ou moins avant le départ</dt>
              <dd>Aucun remboursement. La totalité du prix du circuit est due.</dd>
              <dt>Non-présentation</dt>
              <dd>Aucun remboursement. La totalité du prix du circuit est due.</dd>
            </dl>
            <p>
              Toute demande d’annulation doit être faite par écrit à {mail}. La date de réception de votre annulation
              écrite détermine le palier applicable.
            </p>
            <h3>Annulation de notre part</h3>
            <p>
              Nous nous réservons le droit d’annuler un circuit en raison d’un nombre insuffisant de réservations, de
              conditions météorologiques extrêmes, de problèmes de sécurité, d’instabilité politique, de catastrophe
              naturelle ou de force majeure. Dans ce cas, vous êtes intégralement remboursé de tous les paiements
              effectués. Nous ne sommes pas responsables des frais supplémentaires que vous auriez engagés (vols
              internationaux, hébergement, visas, assurance voyage, etc.).
            </p>
          </>
        ),
      },
      {
        id: "changes-to-bookings",
        title: "Modifications de réservation",
        body: (
          <p>
            Nous acceptons les demandes de changement de date dans la mesure du possible, sous réserve de
            disponibilité et avec un préavis d’au moins 14 jours. Des frais de modification de{" "}
            <strong>25 € par personne</strong> peuvent s’appliquer. Nos guides peuvent modifier l’itinéraire le jour
            même pour des raisons de sécurité, de météo ou de logistique. Aucun remboursement n’est accordé pour les
            modifications d’itinéraire effectuées de bonne foi pour ces raisons.
          </p>
        ),
      },
      {
        id: "responsibilities",
        title: "Vos responsabilités",
        body: (
          <ul>
            <li>Vous devez être en possession d’un passeport valide et de tout visa requis pour le Maroc avant votre voyage.</li>
            <li>Vous devez souscrire une assurance voyage adaptée, couvrant les frais médicaux et le rapatriement d’urgence. Nous la <strong>recommandons vivement</strong> pour tous les treks et circuits dans le désert.</li>
            <li>Vous devez signaler au moment de la réservation tout problème de santé, régime alimentaire, handicap ou mobilité réduite pertinent pour votre circuit.</li>
            <li>Vous devez suivre à tout moment les instructions de votre guide. Les guides peuvent modifier ou interrompre un circuit si la sécurité du groupe l’exige.</li>
            <li>Tout participant dont le comportement met les autres en danger ou est jugé inapproprié par le guide peut être exclu du circuit sans remboursement.</li>
            <li>Vous êtes responsable de la sécurité de vos effets personnels pendant toute la durée du circuit.</li>
          </ul>
        ),
      },
      {
        id: "health-fitness",
        title: "Santé et condition physique",
        body: (
          <p>
            En effectuant une réservation, vous confirmez que vous et tous les membres de votre groupe êtes en
            condition physique adaptée au circuit choisi. Les treks — en particulier les ascensions du Toubkal et les
            itinéraires de plusieurs jours dans le Haut Atlas — exigent une bonne condition cardiovasculaire et
            impliquent un effort soutenu en altitude (jusqu’à 4 167 m). Nous déclinons toute responsabilité en cas de
            blessure ou de maladie résultant de la non-déclaration d’un problème de santé pertinent avant la
            réservation.
          </p>
        ),
      },
      {
        id: "included-excluded",
        title: "Prestations incluses et exclues",
        body: (
          <p>
            Les prestations incluses et exclues sont précisées sur la page de chaque circuit. Sauf mention explicite,
            les éléments suivants sont <strong>exclus</strong> de tous les prix : vols internationaux, frais de visa
            pour le Maroc, assurance voyage, transferts aéroport (sauf mention contraire), dépenses personnelles,
            repas non mentionnés dans la description du circuit, pourboires des guides et chauffeurs, et suppléments
            chambre individuelle.
          </p>
        ),
      },
      {
        id: "eco",
        title: "Engagement écologique",
        body: (
          <p>
            Nous nous engageons pour un tourisme responsable et durable au Maroc. Nous demandons à tous les
            participants de respecter les milieux naturels, les communautés et les traditions locales — en suivant
            les principes « Leave No Trace » en trek, en respectant les codes vestimentaires locaux dans les médinas
            et les villages, et en soutenant l’économie locale en achetant auprès d’artisans et de commerces locaux
            lorsque c’est possible.
          </p>
        ),
      },
      {
        id: "liability",
        title: "Responsabilité",
        body: (
          <>
            <p>
              Nous prenons toutes les mesures raisonnables pour garantir la sécurité et la qualité des circuits que
              nous organisons. Toutefois, nous ne sommes pas responsables :
            </p>
            <ul>
              <li>Des décès, blessures, maladies, pertes ou dommages résultant de circonstances échappant à notre contrôle raisonnable (force majeure, conditions météorologiques extrêmes, catastrophe naturelle, troubles civils, pandémie)</li>
              <li>De la perte ou de la détérioration d’effets personnels pendant un circuit</li>
              <li>Des actes ou omissions de prestataires tiers (hébergement, transport) lorsque nous agissons en tant qu’intermédiaire et non en tant que prestataire principal</li>
              <li>Des frais que vous engagez à la suite de l’annulation ou de la modification d’un circuit (vols, hôtels, frais de visa, etc.)</li>
              <li>De l’exactitude des actualités ou contenus de voyage provenant de flux RSS de tiers</li>
            </ul>
            <p>
              Notre responsabilité maximale envers vous est, en toutes circonstances, limitée au prix total payé pour
              votre circuit. Rien dans ces conditions n’exclut une responsabilité qui ne peut être exclue en vertu du
              droit marocain applicable.
            </p>
          </>
        ),
      },
      {
        id: "photography",
        title: "Photographies et médias",
        body: (
          <>
            <p>
              Nos guides peuvent photographier ou filmer les activités du circuit. Lorsque vous êtes identifiable sur
              une image, nous vous demanderons votre autorisation avant de la publier sur notre site ou nos réseaux
              sociaux, et vous êtes libre de refuser sans avoir à vous justifier. Vous pouvez aussi indiquer à votre
              guide, à tout moment pendant le circuit, que vous préférez ne pas être photographié.
            </p>
            <p>
              Si vous changez d’avis après avoir donné votre accord, écrivez-nous à {mail} et nous retirerons l’image
              de nos propres canaux. Les images déjà partagées ou republiées par des tiers peuvent échapper à notre
              contrôle.
            </p>
          </>
        ),
      },
      {
        id: "ip",
        title: "Propriété intellectuelle",
        body: (
          <p>
            Les textes, le design et le code de ce site sont la propriété de Marrakech Eco Tours. Vous ne pouvez pas
            les reproduire, les diffuser ou les utiliser sans notre autorisation écrite expresse. Certaines photos
            sont utilisées sous licence auprès de banques d’images et restent la propriété de leurs photographes
            selon ces licences. Les articles de la page Actualités proviennent de flux tiers et restent la propriété
            de leurs éditeurs.
          </p>
        ),
      },
      {
        id: "complaints",
        title: "Réclamations",
        body: (
          <p>
            Si vous avez une réclamation pendant votre circuit, signalez-la immédiatement à votre guide afin que nous
            puissions y remédier sur place. Si le problème n’est pas résolu, adressez une réclamation écrite à {mail}{" "}
            dans les 28 jours suivant la fin de votre circuit. Nous en accuserons réception sous 5 jours ouvrables et
            vous répondrons de manière complète sous 14 jours.
          </p>
        ),
      },
      {
        id: "governing-law",
        title: "Droit applicable",
        body: (
          <>
            <p>
              Les présentes Conditions générales sont régies par le droit du Royaume du Maroc, et les litiges relèvent
              de la compétence des tribunaux de Marrakech.
            </p>
            <p>
              Si vous êtes un consommateur résidant dans l’Union européenne ou au Royaume-Uni, cela ne vous prive pas
              de la protection des dispositions impératives du droit de la consommation de votre pays de résidence, et
              vous conservez tout droit dont vous disposez d’agir devant les tribunaux de votre pays.
            </p>
          </>
        ),
      },
      {
        id: "changes",
        title: "Modifications de ces conditions",
        body: (
          <p>
            Nous pouvons mettre à jour ces conditions de temps à autre. La date en haut de cette page indique la
            dernière révision. L’utilisation continue du site, ou toute réservation effectuée après une révision,
            vaut acceptation des conditions mises à jour.
          </p>
        ),
      },
      {
        id: "contact",
        title: "Votre cocontractant",
        body: (
          <>
            <p>
              Les circuits réservés sur ce site sont organisés par <strong>Marrakech Eco Tours</strong>, tour-opérateur
              établi à {SITE.address}, en activité depuis {SITE.foundedYear}.
            </p>
            <p>
              E-mail {mail} · Téléphone <a href={`tel:${SITE.phoneDial}`}>{SITE.phone}</a>
            </p>
            <p>
              Pour toute question sur ces conditions ou sur une réservation déjà effectuée, vous pouvez nous joindre
              par l’un ou l’autre de ces moyens. Nous répondons dans l’heure (8 h – 20 h, heure du Maroc).
            </p>
          </>
        ),
      },
    ],
  };
}
