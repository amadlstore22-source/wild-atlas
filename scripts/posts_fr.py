# -*- coding: utf-8 -*-
"""French translations of the three new posts.

Kept in its own module because a heredoc cannot carry this text: French
apostrophes terminate the shell string. The repo convention is one generator
file per locale, written with the Write tool, never piped through bash.

Links use FRENCH slugs, taken from proxy.ts. Note three targets are NOT
localised and correctly keep their English slug:
  visiting-morocco-during-ramadan, what-to-pack-desert-tour-morocco,
  merzouga-vs-zagora-which-desert-tour
"""

POSTS = [
("morocco-festivals-calendar-by-month", {
 "title": "Festivals au Maroc mois par mois : ceux qui meritent d'organiser un voyage".replace("meritent", "méritent"),
 "excerpt": "Gnaoua sur l'Atlantique, la récolte des roses dans le Dadès, une foire de fiançailles dans le Haut Atlas, et le Ramadan. Quelles dates sont fixes, lesquelles bougent, et combien de temps à l'avance réserver.",
 "heroImage": "/gallery/jemaa-el-fna-dusk-rooftop.jpg",
 "category": "culture", "region": "root", "readTime": 11,
 "tags": ["festivals Maroc", "festival Gnaoua", "festival des roses Maroc", "moussem Imilchil", "calendrier evenements Maroc"],
 "seoTitle": "Festivals au Maroc mois par mois — dates et lesquelles bougent",
 "seoDescription": "Guide mois par mois des festivals marocains : Gnaoua à Essaouira, la récolte des roses de Kelaat M'Gouna, le moussem d'Imilchil, le Ramadan. Dates confirmées et fenêtres.",
 "relatedTours": ["shared-essaouira-day-trip", "shared-merzouga-3day-marrakech", "atlas-mountains-3day-trek", "marrakech-medina-cultural-tour"],
 "faq": [
  ("Quel est le plus grand festival du Maroc ?", "Par sa notoriété internationale, le Festival Gnaoua et Musiques du Monde d'Essaouira : trois jours de concerts gratuits en plein air fin juin, qui attirent des centaines de milliers de personnes. Par son importance locale, c'est sans doute le Ramadan et l'Aïd qui le clôt, qui changent le rythme du pays entier pendant un mois."),
  ("Les dates des festivals marocains changent-elles chaque année ?", "La plupart, oui, et pour trois raisons différentes. Les dates religieuses suivent le calendrier hégirien et sont fixées au Maroc par l'observation de la lune via le ministère des Habous et des Affaires islamiques : elles avancent d'environ onze jours chaque année grégorienne. Les fêtes de récolte comme le Festival des Roses suivent la culture. Les moussems de village sont fixés localement, parfois quelques semaines seulement à l'avance."),
  ("Quand a lieu le Festival des Roses au Maroc ?", "Kelaat M'Gouna l'organise au pic de la récolte de la rose de Damas, qui tombe dans les deux premières semaines de mai chaque année récente — l'édition 2026 s'est tenue du 7 au 10 mai. Les organisateurs ne confirment les jours exacts que quelques semaines à l'avance : considérez mai comme la fenêtre plutôt que de réserver des vols sur une date précise."),
  ("Peut-on voyager au Maroc pendant le Ramadan ?", "Oui, et c'est l'une des périodes les plus marquantes pour venir, mais la journée se déroule autrement. Beaucoup de restaurants restent fermés jusqu'au coucher du soleil, musées et administrations réduisent leurs horaires, et la médina s'éveille vraiment après le canon de l'iftar. Le trek n'est pas affecté : les guides organisent repas et eau en conséquence."),
  ("Combien de temps à l'avance réserver autour d'un festival ?", "Pour Gnaoua, les hébergements à Essaouira demanderaient neuf à douze mois — d'où l'intérêt d'une excursion à la journée depuis Marrakech. Kelaat M'Gouna se remplit des mois à l'avance pendant la récolte des roses. Pour le reste, six à dix semaines suffisent généralement."),
 ],
 "content": u"""
Le Maroc n'a pas une saison des festivals. Il a un calendrier religieux qui
dérive de onze jours par an, un calendrier agricole lié à ce qui mûrit, et
quelques événements à date fixe qui se comportent comme n'importe quoi en
Europe. Organiser un voyage autour de l'un d'eux suppose de savoir auquel on a
affaire.

## En bref

| Festival | Environ quand | Date fixe ? |
| --- | --- | --- |
| Marathon de Marrakech | Fin janvier | **Confirmée** longtemps à l'avance |
| Amandiers en fleur, Anti-Atlas | Février–mars | Une saison, pas une date |
| Ramadan et Aïd el-Fitr | ~11 jours plus tôt chaque année | Observation de la lune |
| Festival des Roses, Kelaat M'Gouna | Première quinzaine de mai | Suit la récolte |
| Gnaoua, Essaouira | Fin juin | Annoncé quelques mois avant |
| Moussem d'Imilchil | Septembre | Fixé localement, souvent à quelques semaines |

## Janvier — le marathon, et l'air le plus clair de l'année

Le [Marathon International de Marrakech](/fr/events/marrakech-international-marathon)
est la seule date véritablement fixe de cette liste : la 37e édition se court
le **dimanche 31 janvier 2027**, annoncée bien à l'avance sur le site des
organisateurs. Marathon et semi à travers les remparts de la vieille ville, la
Palmeraie et les avenues de Guéliz, avec environ 15 000 coureurs.

Janvier est aussi, contre toute attente, l'un des meilleurs mois pour être ici.
L'air est limpide, l'Atlas est sous la neige, et les journées au désert sont
agréables même si les nuits deviennent très froides.

## Février et mars — la floraison, et généralement le Ramadan

Entre les pluies d'hiver et la chaleur du printemps, les terrasses d'amandiers
de l'Anti-Atlas autour de Tafraoute fleurissent blanc et rose contre le granit
rose. C'est [une saison plutôt qu'une date](/fr/events/almond-blossom-anti-atlas) :
les vallées basses fleurissent d'abord, les villages plus hauts jusqu'à trois
semaines plus tard.

Le **Ramadan** tombe actuellement dans cette fenêtre et avance chaque année.
Il vaut la peine d'être compris plutôt qu'évité — voir
[voyager au Maroc pendant le Ramadan](/fr/blog/visiting-morocco-during-ramadan)
pour ce qui change concrètement au quotidien.

## Mai — la récolte des roses

Le fond de vallée entre Kelaat M'Gouna et Boumalne Dadès cultive la rose de
Damas pour l'eau et l'huile de rose. Au pic de la récolte, la ville organise un
moussem : chars, danses Aït Atta, reine des roses, et souks vendant le
distillat de la saison.

Ce qui rend celui-ci pratique, c'est la géographie. Kelaat M'Gouna se trouve
**directement sur la route Marrakech-Sahara**, donc un
[circuit désert de trois jours](/fr/tours/desert-merzouga-3-jours-partage)
calé début mai traverse la récolte sans le moindre détour.

Le hic : les organisateurs ne confirment les dates que quelques semaines avant,
parce que ce sont les fleurs qui décident. Voir la
[page du Festival des Roses](/fr/events/rose-festival-kelaat-mgouna) pour l'état
actuel des dates.

## Juin — Gnaoua à Essaouira

Trois jours de transe gnaoua face à l'Atlantique, dans une cité fortifiée vidée
de ses voitures et remplie de tambours. Les maâlems — maîtres musiciens gnaoua
— jouent sur des scènes ouvertes à travers la ville, aux côtés d'invités jazz
et musiques du monde qui improvisent avec eux. C'est gratuit, en plein air, et
la médina veille jusqu'à l'aube.

Le problème pratique, ce sont les lits. Les hébergements à Essaouira se
rempliraient **neuf à douze mois** à l'avance pour le festival. D'où l'intérêt
d'une [excursion à la journée depuis Marrakech](/fr/tours/excursion-partagee-essaouira) :
trois heures de route dans chaque sens, et vous dormez dans une ville où il
reste des chambres.

## Septembre — le moussem d'Imilchil

Sur un plateau à environ 2 200 m dans le Haut Atlas, c'est d'abord une foire au
bétail et aux marchandises pour les villages Aït Haddidou alentour, et ensuite
le rassemblement de fiançailles qui l'a rendu célèbre.

C'est isolé. L'accès est une longue route de montagne, et c'est un événement
communautaire vivant plutôt qu'un spectacle — ce qui est précisément la raison
d'y aller. Les dates sont fixées par la communauté et liées au calendrier de
transhumance de fin d'été. Cela se combine avec le
[trek des villages du Haut Atlas](/fr/tours/trek-villages-haut-atlas-3-jours).

## La seule chose à comprendre sur les dates

Quiconque affiche une date précise pour une fête de récolte marocaine ou un
moussem dix-huit mois à l'avance devine. Nous publions ce que les organisateurs
ont réellement confirmé et signalons clairement ce qui reste une fenêtre — vous
pouvez voir l'état actuel de tous sur notre
[page des événements à venir](/fr/events).
""",
}),

("getting-around-morocco-transport-guide", {
 "title": "Se déplacer au Maroc : trains, bus, grands taxis, et quand prendre un chauffeur",
 "excerpt": "Al Boraq relie Tanger à Casablanca en 2h10. Mais aucun train ne dessert Merzouga, Chefchaouen, Essaouira ou Ouarzazate — là où la plupart des voyageurs veulent aller.",
 "heroImage": "/gallery/blog-marrakech-to-fes-road-trip-guide.jpg",
 "category": "tips", "region": "root", "readTime": 12,
 "tags": ["transports Maroc", "trains Maroc", "ONCF", "Al Boraq", "se deplacer au Maroc"],
 "seoTitle": "Se déplacer au Maroc — trains, bus et temps de trajet réels",
 "seoDescription": "Les transports au Maroc expliqués : le TGV Al Boraq, les temps de trajet et tarifs ONCF, les bus CTM, les grands taxis — et les destinations qu'aucun train n'atteint.",
 "relatedTours": ["marrakech-to-fes-3day", "marrakech-to-chefchaouen-4day", "marrakech-imperial-cities-5day", "shared-essaouira-day-trip"],
 "faq": [
  ("Le Maroc a-t-il de bons trains ?", "Entre les villes de la ligne nord, oui, vraiment. Al Boraq est le premier train à grande vitesse d'Afrique, jusqu'à 320 km/h, et relie Tanger à Casablanca en 2h10. Les trains classiques Al Atlas continuent vers Marrakech en environ 2h40 depuis Casablanca et vers Fès en 3h45. Confortables, ponctuels et bon marché."),
  ("Peut-on aller au Sahara ou à Chefchaouen en train ?", "Non. Le réseau ferroviaire ne dessert ni Merzouga, ni Ouarzazate, ni Chefchaouen, ni Essaouira. Pour le désert, la gare la plus proche vous laisse à plusieurs centaines de kilomètres et une journée entière de route. Ces destinations se rejoignent en bus, en grand taxi, en voiture de location ou en circuit organisé."),
  ("Combien coûtent les trains marocains ?", "Peu, selon les standards européens. Tanger–Casablanca sur Al Boraq coûte entre 99 et 224 dirhams en seconde classe et 129 à 292 en première, selon l'anticipation. La vente ouvre trois mois avant le départ."),
  ("Est-il sûr de conduire au Maroc ?", "Les autoroutes sont modernes et faciles. La difficulté est ailleurs : les routes de montagne comme le Tizi n'Tichka sont étroites avec de longs à-pics et des camions lents, la circulation urbaine est affirmée, et les routes rurales mêlent voitures, mobylettes, charrettes et bétail. Beaucoup de visiteurs parfaitement à l'aise au volant chez eux trouvent les cols de l'Atlas plus fatigants que prévu."),
  ("Qu'est-ce qu'un grand taxi ?", "Un taxi collectif longue distance, souvent une vieille Mercedes, qui suit un trajet fixe et part quand il est plein — généralement six passagers. Très bon marché et vraiment utile pour les courtes liaisons entre villes. Vous pouvez aussi payer les places vides pour partir immédiatement, ce qui reste peu coûteux."),
 ],
 "content": u"""
Les transports marocains se divisent nettement en deux, et savoir où passe la
ligne évite beaucoup de planification inutile. Les villes du nord sont reliées
par des trains rapides, bon marché et confortables. Presque tout ce que les
visiteurs veulent réellement voir — le désert, les gorges, la ville bleue,
l'Atlantique — n'a aucun train.

## Les trains, là où ils circulent

**Al Boraq** est la première ligne à grande vitesse d'Afrique, ouverte en
novembre 2018, jusqu'à **320 km/h** sur la section dédiée Tanger–Kénitra. Elle
a fait passer Tanger–Casablanca de 4h45 à **2h10**.

| Trajet | Durée |
| --- | --- |
| Tanger → Casablanca (Al Boraq) | 2h10 |
| Tanger → Rabat (Al Boraq) | 1h20 |
| Casablanca → Marrakech | ~2h40 |
| Casablanca → Fès | ~3h45 |
| Marrakech → Tanger (un changement) | ~5h30–6h |

Les tarifs sont bas : Tanger–Casablanca coûte **99 à 224 dirhams** en seconde,
129 à 292 en première. **La vente ouvre trois mois à l'avance.** La première
classe offre un compartiment climatisé de six places, appréciable en été.

Une extension de la ligne à grande vitesse vers Marrakech est en construction.
Elle n'est pas encore ouverte.

## Là où les trains ne vont pas

C'est ce qui surprend. **Aucun chemin de fer ne dessert :**

- **Merzouga et les dunes de l'Erg Chebbi** — le Sahara
- **Ouarzazate, Aït Ben Haddou, les gorges du Dadès et du Todra**
- **Chefchaouen** — la ville bleue
- **Essaouira** — la côte atlantique
- **Imlil et les départs de trek vers le Toubkal**

C'est à peu près la liste complète des raisons pour lesquelles on vient au
Maroc. Il faut donc un bus, un grand taxi, une voiture ou un circuit.

## Les bus

**CTM** et **Supratours** sont les deux compagnies interurbaines à privilégier.
Modernes, climatisées, à horaires fixes et réservables en ligne. Supratours
appartient à l'opérateur ferroviaire et se rabat sur les gares, ce qui rend les
combinaisons train + bus simples — pour Essaouira, on prend le train jusqu'à
Marrakech puis un bus, environ trois heures, avec des départs toutes les deux à
trois heures.

## Les grands taxis

Un taxi collectif longue distance, souvent une vieille Mercedes, qui suit un
trajet fixe et part une fois six passagers réunis. Bon marché, fréquents, et
c'est ainsi que les Marocains se déplacent entre villes voisines. Si vous ne
voulez pas attendre, achetez les places restantes : le taxi part aussitôt.

Convenez du tarif avant de monter. Sur les trajets établis, les prix sont de
fait fixes et les habitants vous diront lesquels.

## Louer une voiture

Judicieux pour explorer la côte atlantique ou l'Anti-Atlas à votre rythme.
Moins judicieux qu'il n'y paraît pour les routes de montagne et du désert.

Le **Tizi n'Tichka** — le col que franchit tout trajet Marrakech-Sahara — est
une longue montée de virages serrés avec des à-pics, des camions lents et, en
hiver, de la neige. C'est une conduite exigeante, et après sept ou huit heures
vous arrivez aux dunes épuisé. Ajoutez que la plupart des campements se
rejoignent par des pistes non balisées qu'une voiture de location ne devrait
pas emprunter.

## Quand un chauffeur ou un circuit est vraiment la meilleure réponse

Pas pour tout. Si vous circulez entre Marrakech, Casablanca, Rabat, Fès et
Tanger, prenez le train : plus rapide, moins cher et plus confortable que tout
ce que nous pourrions vous vendre.

Cela change quand la destination n'a pas de gare et que la route est le
problème :

- **Marrakech au Sahara.** Deux longues journées de route dans chaque sens par
  le Tichka. Notre [circuit de trois jours à Merzouga](/fr/tours/desert-merzouga-3-jours-partage)
  est à 120 € par personne en partagé — moins qu'une location sur les mêmes
  jours, et ce n'est pas vous qui conduisez le col.
- **Marrakech à Chefchaouen.** [Quatre jours](/fr/tours/marrakech-chefchaouen-4-jours),
  parce que le faire en un seul, c'est neuf heures d'autoroute.
- **Les villes impériales.** [Cinq jours](/fr/tours/villes-imperiales-marrakech-5-jours)
  couvrant Fès, Meknès et Volubilis — cette dernière sans aucun transport
  public.
- **Marrakech à Fès par la route**, via [Aït Ben Haddou et les gorges](/fr/tours/marrakech-fes-3-jours)
  plutôt que l'autoroute, ce qui est tout l'intérêt du détour.

Pour une comparaison de coûts, voir
[réserver en direct ou via une plateforme](/fr/blog/reserver-circuit-maroc-direct-ou-plateforme)
et [l'effet de la taille du groupe sur le prix](/fr/blog/prix-circuit-maroc-taille-groupe).

## Une règle simple

Le train entre les grandes villes du nord. Un circuit ou un chauffeur pour le
désert, les gorges et les montagnes. Les grands taxis pour les courtes
liaisons. Une voiture de location seulement si la conduite est ce qui vous fait
envie.
""",
}),

("sahara-desert-weather-what-to-expect", {
 "title": "Météo du Sahara marocain : 43 °C le jour, presque zéro la nuit",
 "excerpt": "Merzouga passe de 19 °C en janvier à 43 °C en juillet — et les nuits s'effondrent. Les dunes sont à 730 m d'altitude, ce qui explique tout. Mois par mois, et ce qu'il faut vraiment emporter.",
 "heroImage": "/gallery/sahara-dunes-tamarisk-morning.jpg",
 "category": "desert", "region": "sahara-south", "readTime": 11,
 "tags": ["meteo Sahara", "temperature Merzouga", "quand partir desert Maroc", "que emporter desert", "climat Erg Chebbi"],
 "seoTitle": "Météo du désert du Sahara au Maroc — 温 mois par mois".replace("温 ", ""),
 "seoDescription": "Températures à Merzouga et à l'Erg Chebbi mois par mois : de 19 °C en janvier à 43 °C en juillet, avec des nuits proches de zéro en hiver. Quand partir et quoi emporter.",
 "relatedTours": ["shared-merzouga-3day-marrakech", "merzouga-stargazing-desert-tour", "erg-chegaga-3day-marrakech", "family-desert-4day-marrakech"],
 "faq": [
  ("Quelle température fait-il la nuit dans le Sahara marocain ?", "Assez froid pour être vraiment inconfortable si vous n'avez prévu que pour la journée. Les nuits de janvier à Merzouga tournent autour de 6 °C en moyenne, et une nuit claire et calme peut descendre plusieurs degrés plus bas — proche de zéro. Les dunes sont à 730 m d'altitude et l'air est extrêmement sec : la chaleur s'échappe vite dès le coucher du soleil."),
  ("Quel est le meilleur mois pour visiter le Sahara marocain ?", "Octobre, novembre, mars et avril. Des maximales de 24 à 30 °C, confortables pour le chameau et la marche dans les dunes, et des nuits fraîches sans être froides. L'hiver offre le ciel le plus pur et les campements les plus vides mais exige de vraies couches chaudes. Juillet et août, à 42–43 °C, sont éprouvants."),
  ("Quelle chaleur fait-il en été ?", "Les maximales moyennes de juillet à Merzouga atteignent 43 °C, août suit à 42 °C, et les nuits restent autour de 29 °C. Les circuits fonctionnent — les balades à dos de dromadaire passent tôt le matin et après le coucher du soleil — mais ce n'est pas la saison d'une première visite."),
  ("Pleut-il dans le Sahara marocain ?", "Rarement, mais ce n'est pas impossible. Quand il pleut, cela peut être soudain et fort, et les lits d'oued s'inondent vite — raison pour laquelle un bon guide ne campe jamais dans un oued. Quelques jours par an, surtout au printemps et à l'automne."),
  ("Et les tempêtes de sable ?", "Surtout au printemps, quand souffle le chergui. Une vraie tempête de sable réduit la visibilité et met du sable partout ; les campements attendent qu'elle passe. C'est inconfortable plutôt que dangereux avec un guide qui connaît le terrain. Un chèche que l'on peut enrouler sur le visage est vraiment utile, pas un souvenir."),
 ],
 "content": u"""
La plus fréquente des erreurs lors d'un voyage au désert marocain, c'est de
faire son sac pour un désert. On emporte un short et un chapeau, puis on passe
la nuit éveillé et gelé. L'Erg Chebbi est à **730 mètres** d'altitude dans un
air extrêmement sec, et une fois le soleil couché rien ne retient la chaleur.

## Merzouga, mois par mois

Maximales moyennes en journée :

| Mois | Max | Notes |
| --- | --- | --- |
| Janvier | 19 °C | Nuits proches de zéro. Ciel le plus pur de l'année. |
| Février | 21 °C | Toujours froid après la tombée du jour. |
| Mars | 26 °C | Excellent. Un peu de vent. |
| Avril | 30 °C | Sans doute le meilleur mois. |
| Mai | 34 °C | Chaud à la mi-journée. |
| Juin | 39 °C | Difficile. |
| Juillet | 43 °C | Les nuits restent vers 29 °C. |
| Août | 42 °C | Idem. |
| Septembre | 37 °C | Ça se rafraîchit. |
| Octobre | 30 °C | Excellent. |
| Novembre | 24 °C | Excellent, nuits froides de retour. |
| Décembre | 20 °C | Nuits froides, ciel pur. |

Les minimales nocturnes vont d'environ **6 °C en janvier à 29 °C en juillet** en
moyenne — et par nuit claire et calme, le campement peut relever plusieurs
degrés sous ce chiffre de janvier. Les sources divergent, ce qui est déjà une
information : prévoyez pour le bas de la fourchette, pas pour la moyenne.

## Ce que l'écart donne vraiment

En novembre, vous pouvez marcher sur une crête de dune en t-shirt à seize
heures, et chercher une polaire, un bonnet et une seconde couverture à vingt
heures. La chute est rapide : l'essentiel se joue dans l'heure qui suit le
coucher du soleil.

C'est aussi pourquoi le désert d'hiver est si bon pour les étoiles. Un air
froid, sec et immobile est exactement ce qu'il faut, et il n'y a aucune
pollution lumineuse à cent kilomètres. Notre
[nuit d'observation des étoiles à Merzouga](/fr/tours/nuit-etoilee-merzouga)
existe pour cette raison.

## Les meilleurs mois

**Octobre, novembre, mars, avril.** Journées de 24 à 30 °C, nuits fraîches sans
être punitives. C'est là que nous avons le plus de départs et que les
campements sont les plus pleins — réservez plus tôt que vous ne le pensez.

**Décembre à février.** Nuits froides, mais le ciel le plus pur, les dunes les
plus vides et la lumière la plus nette pour la photo.

**Mai et septembre.** Intermédiaires. Chaud à midi, très bien matin et soir.

**Juillet et août.** 42–43 °C. Les circuits tournent, mais ce n'est pas la
saison d'une première visite, et c'est difficile avec de jeunes enfants. Si
vous voyagez en famille, voir notre
[circuit désert en famille](/fr/tours/circuit-desert-famille-4-jours) et visez
le printemps ou l'automne.

## Vent et sable

Le printemps amène le **chergui**, le vent chaud et sec de l'intérieur. La
plupart du temps ce n'est que du vent. Parfois il soulève assez de sable pour
réduire sérieusement la visibilité, et les campements s'arrêtent et attendent.

Le sable entre dans les appareils photo, les sacs et les cheveux de toute
façon. Le chèche que porte chaque guide n'est pas décoratif : enroulé sur le
nez et la bouche, c'est l'objet le plus utile de la journée.

## Que mettre dans le sac

Pour la journée, toute l'année : manches longues et pantalon amples (plus
confortables qu'un short par vraie chaleur), chapeau à bord, crème solaire
haute protection, lunettes, et plus d'eau que prévu.

**Pour les nuits, d'octobre à avril, c'est là que les gens se trompent :**

- Une vraie couche isolante — polaire ou duvet, pas un sweat
- Une couche coupe-vent
- Bonnet et gants fins de décembre à février
- Chaussettes chaudes ; le sol des tentes est du sable froid
- Chaussures fermées pour le soir

Les campements fournissent des couvertures épaisses et la plupart ont des
chauffages en hiver, mais vous serez dehors pour le dîner, les étoiles et le
lever du soleil. C'est là que le froid vous trouve.

Pour la liste complète, voir
[que emporter pour un circuit désert](/fr/blog/what-to-pack-desert-tour-morocco).

## Choisir ses dates

Si la météo décide de votre voyage, visez fin octobre, novembre, mars ou début
avril, et réservez le campement tôt. Notre
[départ de trois jours à Merzouga](/fr/tours/desert-merzouga-3-jours-partage)
part tous les jours toute l'année à 120 € par personne, et nous vous dirons
honnêtement si le mois que vous envisagez est mauvais.

Vous hésitez sur le désert ?
[Merzouga ou Zagora](/fr/blog/merzouga-vs-zagora-which-desert-tour) compare les
routes, les dunes et le coût.
""",
}),
]
