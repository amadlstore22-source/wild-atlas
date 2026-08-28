# -*- coding: utf-8 -*-
"""French and Spanish translations of the four new posts.

WHY NO localizedSlug
--------------------
63 of the 90 existing posts serve at the English slug in every locale, and
adding a localised segment means a matching entry in BOTH the BLOG_SLUGS_* map
in proxy.ts and the reverse map in lib/locale-switch.ts. Those three places
drifting is what localized-tour-slugs.test.ts and locale-switch.test.ts exist
to catch. Omitting it keeps the new posts on the majority pattern and out of
that failure mode entirely.

PRICES
------
Every figure is the EUR value the tour pages actually render (USD stored,
converted at 0.86693). blog-prices.test.ts checks these against lib/tours.ts
in every locale, so a hand-typed number that drifts fails the build -- which
is the incident that test was written for.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/translate_four_posts_fr_es.py
"""
import io

POSTS = {}

# ---------------------------------------------------------------- FRENCH ---
POSTS["fr"] = [
{
 "slug": "toubkal-sahara-8-day-tour-cost",
 "title": "Combien coûte le circuit Toubkal et Sahara de 8 jours ? (départs 2027)",
 "excerpt": "Huit jours, deux objectifs : le plus haut sommet d'Afrique du Nord et les dunes de l'erg Chebbi. Voici ce que coûte réellement un départ à date fixe, comment cela se compare à réserver les parties séparément, et pourquoi le prix par personne ne change pas avec la taille du groupe.",
 "heroImage": "/gallery/toubkal-refuge-approach-trekkers.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 8,
 "tags": ["Toubkal", "Sahara", "erg Chebbi", "trekking", "Maroc"],
 "seoTitle": "Circuit Toubkal et Sahara 8 jours — prix et départs 2027",
 "seoDescription": "Ce que coûte le circuit de 8 jours Toubkal et Sahara : 889 € par personne sur des départs fixes, contre 1 413 € en réservant le même parcours séparément.",
 "faq": [
  ("Combien coûte le circuit Toubkal et Sahara de 8 jours ?", "889 € par personne sur les départs fixes de 2027, au lieu d'un tarif normal de 921 €. Cela comprend tous les transferts aéroport, l'hébergement en demi-pension, tous les repas pendant le trek, le guide de montagne diplômé, les mules en montagne et la méharée à l'erg Chebbi. Le dîner à Marrakech, l'assurance voyage et les pourboires ne sont pas inclus — un choix délibéré, détaillé plus bas."),
  ("Pourquoi le prix ne change-t-il pas selon la taille du groupe ?", "Parce qu'il s'agit d'un départ à date fixe vendu à la place, et non d'un circuit privé. Sur nos circuits privés, le guide et le véhicule sont un coût fixe réparti entre les participants : six personnes paient donc beaucoup moins chacune qu'une seule. Ici le voyage part à sa date publiée quoi qu'il arrive, et ce qui varie, c'est le nombre de places restantes sur 14. Deux amis paient le même prix par personne qu'un voyageur seul, ce qui est rare au Maroc et fait de cet itinéraire un très bon choix en solo."),
  ("Que signifie concrètement la limite de 14 places ?", "Le départ ferme dès que les 14 places sont vendues. Ce plafond répond à deux contraintes réelles plutôt qu'à une tactique commerciale : le refuge du Toubkal et le campement du désert ont une capacité limitée pour une nuit donnée, et un guide ne peut encadrer qu'un nombre limité de personnes un matin de sommet, dans le noir. Si une date affiche complet, la suivante est vraiment la suivante."),
  ("Est-ce moins cher de réserver les parties séparément ?", "Non, et l'écart est net. En prenant des circuits comparables dans notre propre catalogue — le trek Toubkal de 4 jours, un circuit Sahara privé de 3 jours et une journée guidée dans la médina — on arrive à environ 1 413 € au tarif solo. L'itinéraire combiné est à 889 € parce qu'il s'agit d'un seul parcours continu avec un seul guide et un seul véhicule, au lieu de trois voyages distincts portant chacun ses transferts et sa journée de guidage."),
  ("Qu'est-ce qui n'est pas inclus, et combien cela coûte-t-il ?", "Le dîner à Marrakech lors des deux nuits en riad : la médina regorge d'adresses qui méritent d'être choisies par vous, et un dîner d'hôtel imposé est la pire façon d'y manger — comptez 100 à 250 MAD par personne. L'assurance voyage est obligatoire et à votre charge, car les garanties pour le trekking au-dessus de 4 000 m varient beaucoup d'un contrat à l'autre. Les pourboires sont d'usage : 150 à 200 MAD par jour pour le guide et 70 à 100 MAD pour les muletiers, de la part du groupe, en espèces à la fin."),
  ("Faut-il être un trekkeur expérimenté ?", "Non, mais il faut être en forme pour deux longues journées consécutives. Le jour du sommet dure environ neuf heures avec un départ avant l'aube, et il n'y a aucune escalade technique sur l'itinéraire normal : ni corde, ni passage d'escalade au-delà de quelques ressauts rocheux. Ce qu'il faut, c'est de l'endurance de randonnée en altitude. Si vous marchez six heures en moyenne montagne sans redouter le lendemain, vous avez ce qu'il faut."),
 ],
 "content": """
Deux objectifs que la plupart des gens traitent comme deux voyages distincts : le Jbel
Toubkal à 4 167 m, et la mer de sable de l'erg Chebbi. Voici ce que coûte leur réunion en
un itinéraire de huit jours, et où va l'argent.

## Le chiffre principal

**889 € par personne**, sur les départs fixes de 2027, au lieu d'un tarif normal de 921 €.

C'est un prix à la place, fixe. Il ne baisse pas si vous venez à plusieurs et n'augmente
pas si vous venez seul — l'inverse de presque tous les voyages au Maroc, y compris les
nôtres.

## Pourquoi le prix ne bouge pas avec le groupe

Sur un circuit privé, le guide, le véhicule et le chauffeur sont un coût fixe réparti
entre les participants. Une personne paie tout ; six personnes divisent par six. C'est
pourquoi notre [trek Toubkal de 4 jours](/en/tours/toubkal-summit-trek-4day) va de 650 €
en solo à 260 € chacun à six.

Un départ fixe inverse cette logique. Le voyage part à sa date publiée que quatre ou
quatorze personnes aient réservé, donc le prix de la place est fixe et ce qui varie, c'est
la disponibilité. Pour un voyageur seul c'est nettement plus avantageux ; pour un groupe
de six, cela vaut la peine de comparer avec la version privée.

## Ce que coûte le même parcours réservé séparément

D'après notre propre catalogue, au tarif solo :

| Élément | Circuit comparable | Prix solo |
|---|---|---|
| Sommet du Toubkal | [Trek Toubkal 4 jours](/en/tours/toubkal-summit-trek-4day) à 650 € en solo | 650 € |
| Sahara / erg Chebbi | Circuit Sahara privé 3 jours | 690 € |
| Médina de Marrakech | Visite culturelle guidée | 73 € |
| **Total** | | **1 413 €** |

Le circuit combiné coûte 889 € pour le même parcours. L'écart n'est pas une remise : c'est
ce qui disparaît quand trois voyages deviennent un seul itinéraire — deux séries de
transferts aller-retour depuis Marrakech, deux journées de guidage supplémentaires, et les
jours de véhicule à vide entre les deux.

## Ce qui est inclus

- Tous les transferts aéroport, à l'arrivée et au départ
- Sept nuits : riad, gîte, refuge de montagne et campement dans le désert
- Demi-pension tout au long, et **tous** les repas pendant le trek
- Guide de montagne diplômé pour l'ensemble du voyage
- Mules en montagne, dromadaires à l'erg Chebbi
- Droits d'entrée du parc national

## Ce qui ne l'est pas, et pourquoi

- **Le dîner à Marrakech** lors des deux nuits en riad. C'est délibéré. La médina compte
  plus d'adresses qui valent le détour qu'aucun programme ne devrait choisir à votre
  place, et un dîner d'hôtel imposé est la pire façon d'y manger. Comptez 100 à 250 MAD.
- **L'assurance voyage.** Obligatoire, et à votre charge, parce que les garanties pour le
  trekking au-dessus de 4 000 m varient énormément selon les contrats — mieux vaut lire
  le vôtre que faire confiance au nôtre.
- **Les pourboires.** 150 à 200 MAD par jour pour le guide, 70 à 100 MAD pour les
  muletiers, de la part du groupe, en espèces à la fin.

## Les départs

Cinq dates, mars et avril 2027, 14 places chacune. Les départs de mars se font en
conditions hivernales au sommet — lisez
[gravir le Toubkal en mars](/en/blog/climbing-toubkal-in-march) avant de choisir, car la
montagne début mars et la même montagne à la mi-avril sont deux propositions bien
différentes.

## En résumé

889 € achètent huit jours, deux objectifs emblématiques du Maroc, un seul guide et un
parcours continu. Réserver le même terrain en voyages séparés coûte environ 1 413 €. Le
prix de la place ne change pas avec la taille du groupe, ce qui en fait une valeur
inhabituellement bonne pour les voyageurs seuls — et une comparaison à faire soigneusement
si vous êtes six.
""",
},
{
 "slug": "tibherine-plane-wreck-toubkal",
 "title": "L'épave d'avion du Tibherine : le plus haut site de crash du Maroc",
 "excerpt": "Un moteur d'avion est encastré dans un sommet voisin du Toubkal, avec des débris éparpillés sur toute la face ouest. Il est là depuis 1969, et la plupart des récits se trompent sur les détails.",
 "heroImage": "/gallery/tibherine-east-plane-wreck-sunrise.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 6,
 "tags": ["Toubkal", "Tibherine", "Haut Atlas", "histoire", "Maroc"],
 "seoTitle": "L'épave d'avion du Tibherine au-dessus du Toubkal",
 "seoDescription": "Un Lockheed Constellation a percuté le Tibherine Est à 3 880 m en novembre 1969, chargé de munitions pour le Biafra. L'épave n'a été retrouvée que huit mois plus tard.",
 "faq": [
  ("Où se trouve exactement l'épave du Tibherine ?", "Sur le Tibherine Est, un sommet de 3 880 m du massif du Toubkal, au nord du Toubkal lui-même. Le Tibherine est un sommet jumeau — Est à 3 880 m et Ouest à 3 887 m, assez proches en hauteur et en forme pour être appelés localement « les jumeaux ». L'épave est sur le sommet oriental, avec des débris répandus sur la face ouest et un moteur encastré dans les rochers du sommet."),
  ("De quel avion s'agissait-il et que s'est-il passé ?", "Un Lockheed L-749A Constellation, qui volait de nuit de Faro au Portugal vers São Tomé, chargé de munitions destinées au Biafra pendant la guerre civile nigériane. Le 28 novembre 1969, l'équipage a signalé des problèmes moteur et demandé à se dérouter vers l'aéroport le plus proche, mais l'appareil a perdu de l'altitude et percuté la montagne. Les huit personnes à bord ont péri."),
  ("Combien de temps avant que l'épave soit retrouvée ?", "Près de huit mois. Le crash a eu lieu le 28 novembre 1969 et l'épave n'a été localisée que le 18 juillet 1970, quand des alpinistes en course dans le massif du Toubkal sont tombés sur les débris. C'est cet écart qui explique que beaucoup de récits datent le crash de 1970 : ils citent la découverte, pas l'accident."),
  ("Les treks du Toubkal passent-ils par l'épave ?", "Pas sur l'itinéraire normal. Nos treks montent au sommet du Toubkal puis redescendent au refuge ; le Tibherine est un objectif distinct, atteint par une ligne différente et bien moins fréquentée. Il peut être ajouté pour des trekkeurs expérimentés avec un guide qui connaît l'approche, mais il ne rentre pas dans un programme de deux jours et ne doit jamais être traité comme un simple détour."),
  ("Est-ce dangereux d'y aller ?", "C'est le terrain qui pose problème, pas l'épave. L'approche n'est pas balisée, le sol est instable et exposé par endroits, et le versant nord du massif est plus raide que l'itinéraire touristique. C'est du terrain pour randonneurs expérimentés accompagnés d'un guide, par temps stable — et depuis 2018 un guide diplômé est de toute façon obligatoire partout dans le parc national du Toubkal."),
  ("Pourquoi les sources divergent-elles sur le nombre de victimes ?", "Plusieurs articles de voyage parlent de quatre membres d'équipage. Le registre du Bureau of Aircraft Accidents Archives — le rapport d'accident de référence — indique huit. Nous publions huit pour cette raison. L'altitude est brouillée de la même façon : les chiffres de 3 886 et 3 887 m circulent parce que des auteurs citent le Tibherine Ouest pour une épave qui se trouve sur le Tibherine Est, à 3 880 m."),
 ],
 "content": """
Marchez sur le versant nord du massif du Toubkal et vous tombez sur quelque chose qui
arrête net la plupart des gens : un moteur d'avion, posé dans les rochers d'un sommet de
3 880 m, avec du métal éparpillé sur la pente en contrebas.

Il est là depuis 1969. La plupart des récits se trompent sur au moins un détail — voici
ce que dit réellement le rapport.

## Ce qui s'est passé

Dans la nuit du **28 novembre 1969**, un Lockheed L-749A Constellation volait de Faro, au
Portugal, vers São Tomé. Sa cargaison : des munitions, à destination finale du Biafra —
le territoire qui avait fait sécession du Nigeria en 1967 et se trouvait, fin 1969, dans
les derniers mois d'une guerre perdue.

Au-dessus du Maroc, l'équipage a eu des ennuis moteur et a annoncé au contrôle aérien
vouloir se dérouter vers l'aéroport le plus proche. L'appareil a perdu de l'altitude à la
place, et percuté le Tibherine Est. Les huit personnes à bord ont péri.

## Huit mois avant que quiconque la retrouve

L'épave n'a été localisée que le **18 juillet 1970**, quand des alpinistes en course dans
le massif du Toubkal sont tombés sur les débris vers 3 900 m.

Ces huit mois expliquent une confusion tenace : les articles qui datent le crash de 1970
citent la découverte, pas l'accident. Les deux dates sont réelles, et ce ne sont pas le
même événement.

## Où c'est réellement

Le Tibherine est un **sommet jumeau** : Est à 3 880 m et Ouest à 3 887 m, assez proches en
hauteur et en profil pour être appelés localement « les jumeaux ». L'épave est sur le
sommet **oriental**.

C'est la source de l'autre erreur courante. Les récits qui citent 3 886 ou 3 887 m donnent
la hauteur du sommet ouest pour une épave qui gît sur celui de l'est.

Les débris descendent la face ouest et le couloir en dessous. L'un des moteurs est encastré
dans le sommet lui-même — c'est la pièce que photographient la plupart des trekkeurs.

## Ce que la plupart des articles se trompent

Le nombre de morts est celui qui mérite correction. Plusieurs récits de voyage parlent de
quatre membres d'équipage. Le Bureau of Aircraft Accidents Archives — le rapport
d'accident de référence — indique **huit**. Nous publions huit.

Ce n'est pas de la pédanterie. Il s'agit d'un vol de cargaison de guerre qui a tué tout le
monde à bord et est resté introuvable sur un flanc de montagne pendant presque un an.
Diviser le bilan par deux transforme cela en curiosité.

## Peut-on aller le voir ?

Pas sur l'itinéraire normal du Toubkal, et nous préférons le dire clairement plutôt que de
laisser entendre le contraire.

Nos [treks du Toubkal](/en/tours/toubkal-summit-trek-4day) montent au sommet du Toubkal à
4 167 m et redescendent au refuge. Le Tibherine est un objectif distinct sur une ligne
différente, bien moins parcourue. L'approche n'est pas balisée, le terrain est instable et
plus raide que tout ce qu'on trouve sur le sentier touristique.

Il peut être ajouté pour des trekkeurs expérimentés, avec un guide qui connaît le terrain
et par temps stable. Il ne rentre pas dans un programme de deux jours. Si le voir compte
pour vous, dites-le au moment de la demande et nous vous dirons honnêtement si cela
s'intègre au voyage envisagé — souvent la réponse est qu'il faut une journée de plus.

Depuis 2018, un guide diplômé est obligatoire partout dans le parc national du Toubkal :
ce n'est de toute façon pas un itinéraire à tenter seul.
""",
},
{
 "slug": "climbing-toubkal-in-march",
 "title": "Gravir le Toubkal en mars : à quoi vous vous engagez vraiment",
 "excerpt": "Mars est le mois où l'on réserve en s'attendant au printemps et où l'on trouve l'hiver. Voici à quoi ressemble vraiment la montagne, le matériel qu'elle exige, et les cas où avril est la meilleure réponse.",
 "heroImage": "/gallery/toubkal-final-snow-slope-dawn.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 7,
 "tags": ["Toubkal", "trekking hivernal", "Haut Atlas", "Maroc", "saisons"],
 "seoTitle": "Gravir le Toubkal en mars — neige, matériel et conseils",
 "seoDescription": "En mars le Toubkal est encore hivernal au-dessus de 3 000 m : neige, crampons et piolet. Ce qui vous attend, ce qu'il faut, et quand choisir avril.",
 "faq": [
  ("Y a-t-il encore de la neige sur le Toubkal en mars ?", "Oui, au-dessus d'environ 3 000 m. Mars est la fin de la saison hivernale, et le cône sommital porte généralement de la neige jusqu'en avril une année normale. On peut être en manches courtes dans la vallée à Imlil pendant que le sommet est largement sous zéro à l'aube — 2 400 m d'écart de hauteur expliquent l'essentiel."),
  ("Faut-il des crampons et un piolet en mars ?", "La plupart des années, oui, et il faut savoir s'en servir, pas seulement les porter. Les pentes finales passent de la marche à l'escalade sur neige quand elles sont gelées, et c'est précisément là qu'elles sont les plus difficiles. Les deux se louent à Imlil pour 100 à 150 MAD par jour. Sur nos départs guidés, ils sont fournis quand les conditions l'exigent."),
  ("Mars est-il plus dangereux que l'été ?", "C'est une montagne différente plutôt que simplement plus dure. Les fortes chutes de neige entre janvier et mars créent un vrai risque d'avalanche sur les pentes chargées, et le temps tourne plus vite qu'en été. C'est pourquoi un guide compte davantage en mars qu'en juillet : le jugement sur l'opportunité de monter aujourd'hui est ce que vous payez."),
  ("Mars ou avril pour gravir le Toubkal ?", "Avril, pour la plupart des gens. La limite des neiges a généralement reculé, la marche est plus facile et les jours sont plus longs, alors que les foules ne sont pas encore là. Choisissez mars si vous voulez vraiment la montagne en condition hivernale et que vous êtes à l'aise sur la neige — c'est plus calme, et les vues du sommet dans l'air froid et clair sont les plus belles de l'année."),
  ("Quel froid fait-il le matin du sommet ?", "Sous zéro, de manière fiable, et avec le vent sur l'arête sommitale la sensation est nettement plus froide que le thermomètre. On part dans le noir, au moment le plus froid de la journée. Une vraie doudoune, des gants chauds plus une paire de rechange, et de quoi couvrir le visage ne sont pas optionnels en mars."),
  ("Un débutant peut-il gravir le Toubkal en mars ?", "Un débutant en bonne condition physique le peut, avec un guide et par temps stable — mais c'est honnêtement plus dur que le même trek en juin, et le taux de réussite au sommet est plus faible. Si c'est votre première grande montagne et que le sommet compte, avril et après sont une introduction plus clémente. Si vous avez de l'expérience de randonnée hivernale, mars est un mois gratifiant là-haut."),
 ],
 "content": """
Mars est le mois qui piège les gens. Les vols sont bon marché, Marrakech est chaude, et la
montagne paraît assez proche sur la carte pour ressembler à une balade de printemps.
Au-dessus de 3 000 m, c'est encore l'hiver.

## À quoi ressemble vraiment mars

Imlil à 1 740 m peut être agréable en mars : du soleil, des manches courtes l'après-midi,
des amandiers en fleurs dans les vallées. Le sommet est 2 427 m plus haut, et cette
différence est toute l'histoire.

Au-dessus d'environ 3 000 m la montagne porte de la neige, et une année normale le cône
sommital la garde jusqu'en avril. Le matin du sommet, vous quittez le refuge dans le noir,
par températures négatives, sur un terrain gelé pendant la nuit.

## Le matériel qui cesse d'être optionnel

- **Crampons et piolet** — et le savoir-faire pour les utiliser. La neige gelée, c'est le
  moment où les pentes finales cessent d'être une marche, et c'est aussi le moment où
  elles sont les plus dures. La location à Imlil coûte 100 à 150 MAD par jour ; sur nos
  départs guidés, ils sont fournis quand les conditions l'exigent.
- **Des chaussures rigides** capables de recevoir un crampon. Une chaussure de trail
  souple ne le peut pas : c'est l'erreur de matériel la plus fréquente que nous voyons en
  mars.
- **De l'isolation et une paire de gants de rechange.** Vous partez dans le noir et le vent
  sur l'arête sommitale fait le reste.

## Le risque dont personne ne parle

Les fortes chutes de neige entre janvier et mars chargent les pentes, ce qui crée un vrai
risque d'avalanche sur certaines expositions dans certaines conditions. Le temps tourne
aussi bien plus vite qu'en été.

C'est pourquoi un guide vaut davantage en mars qu'en juillet. Sa valeur n'est pas de
retrouver un sentier que vous pourriez suivre seul : c'est le jugement sur l'opportunité de
monter aujourd'hui, et la volonté de faire demi-tour. Depuis 2018, un guide diplômé est de
toute façon obligatoire dans le parc national du Toubkal.

## Mars ou avril ?

**Choisissez avril** pour la version la plus simple : la limite des neiges a généralement
reculé, la marche est plus facile, les jours sont plus longs, et les foules de l'été ne
sont pas là. Pour une première grande montagne, avril et après sont une introduction plus
clémente, avec un taux de réussite nettement supérieur.

**Choisissez mars** si vous voulez vraiment la montagne en condition hivernale et que vous
êtes à l'aise sur la neige. C'est plus calme, et les vues du sommet dans l'air froid et
clair sont les plus belles de l'année.

Nos [départs Toubkal et Sahara de 8 jours](/en/tours/morocco-highlights-toubkal-sahara-8day)
partent des deux côtés de cette limite — trois dates en mars, deux en avril — et c'est
délibéré. Si vous hésitez entre elles, le paragraphe ci-dessus est la décision.

## Accordez-vous la journée supplémentaire

Quel que soit le mois, c'est l'altitude qui décide de plus de sommets que la forme
physique. Le [programme de 4 jours](/en/tours/toubkal-summit-trek-4day) monte
progressivement avec une nuit d'acclimatation ; la version de 2 jours passe de 1 740 m à
4 167 m en une trentaine d'heures. En mars, quand la montée finale est de toute façon plus
dure et plus lente, cette journée vaut encore plus qu'en juillet.
""",
},
{
 "slug": "toubkal-aguelzim-pass-trek-cost",
 "title": "Combien coûte le trek du col d'Aguelzim au Toubkal en 3 jours ?",
 "excerpt": "Le col d'Aguelzim est la voie tranquille vers le Toubkal — une traversée en altitude qui évite complètement la vallée du Mizane. Voici ce que coûte la version de trois jours et à qui elle convient vraiment.",
 "heroImage": "/gallery/tours-toubkal-aguelzim-pass-3day.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 6,
 "tags": ["Toubkal", "Aguelzim", "Haut Atlas", "trekking", "Maroc"],
 "seoTitle": "Trek du col d'Aguelzim au Toubkal, 3 jours — prix et itinéraire",
 "seoDescription": "Ce que coûte la voie du col d'Aguelzim vers le Toubkal en 3 jours, en quoi elle diffère de l'approche classique par le Mizane, et à qui convient cette ligne plus tranquille.",
 "faq": [
  ("Qu'est-ce que la voie du col d'Aguelzim ?", "Une approche alternative du refuge du Toubkal qui franchit le Tizi n'Aguelzim vers 3 560 m au lieu de remonter la vallée du Mizane. Elle est plus longue et plus haute que la voie normale, et nettement plus calme : l'essentiel du trafic du Toubkal ne la voit jamais. La contrepartie est un vrai col dès le premier jour au lieu d'une montée progressive en fond de vallée."),
  ("Aguelzim est-il plus difficile que la voie normale ?", "Oui, sensiblement. L'approche classique gagne de la hauteur régulièrement le long d'une vallée ; Aguelzim place un col de 3 560 m sur votre route avant même que vous ayez dormi en altitude. Cette voie convient aux personnes ayant de l'expérience en randonnée qui veulent la ligne tranquille, pas à quelqu'un qui tente sa première montagne."),
  ("Pourquoi choisir Aguelzim plutôt que la voie normale ?", "La solitude, et de meilleures vues. Le sentier de la vallée du Mizane est le plus fréquenté de l'Atlas en été, avec des caravanes de mules et des marcheurs à la journée presque jusqu'au refuge. La traversée d'Aguelzim est vide en comparaison, et le col lui-même vous donne tout le massif d'un seul regard, ce que l'approche par la vallée ne fait jamais."),
  ("Quelle condition physique faut-il ?", "Assez pour une longue journée comportant un col élevé, sur des jours consécutifs. Ce n'est pas une voie technique en été — ni corde ni escalade — mais la traversée du premier jour est un vrai effort en altitude avant toute acclimatation. Si vous faites régulièrement des journées de randonnée de six ou sept heures, vous êtes dans la bonne fourchette."),
 ],
 "content": """
Presque tous ceux qui gravissent le Toubkal remontent la vallée du Mizane depuis Imlil. En
été, ce sentier porte des caravanes de mules, des marcheurs à la journée et un défilé
continu de trekkeurs jusqu'au refuge.

Le col d'Aguelzim est l'autre entrée.

## L'itinéraire

Au lieu de suivre le fond de vallée, cette ligne franchit le **Tizi n'Aguelzim vers
3 560 m** et rejoint le refuge par le haut. Elle est plus longue, plus haute, et vide en
comparaison — et la vue depuis le col donne tout le massif d'un coup, ce que l'approche
par la vallée ne fait jamais.

## Ce que cela coûte

Notre [trek Aguelzim de 3 jours](/en/tours/toubkal-aguelzim-pass-3day) est à 600 € pour
une personne, 302 € chacun à deux, et 230 € chacun à six. Comme tous nos départs privés,
il est tarifé sur une échelle dégressive, parce que le guide et le transport sont un coût
fixe réparti entre les participants : le tarif par personne baisse donc quand le groupe
grandit, et un trekkeur seul porte l'ensemble.

Cela comprend le guide de montagne diplômé, les nuits en refuge, tous les repas en
montagne, le portage à dos de mule, les droits du parc national et le transport
aller-retour depuis Marrakech.

## À qui cela convient, honnêtement

**Pas** à une première montagne. La voie normale gagne sa hauteur progressivement le long
d'une vallée ; Aguelzim place un col de 3 560 m devant vous dès le premier jour, avant
toute nuit en altitude. C'est une vraie différence dans le ressenti du voyage, et dans vos
chances d'arriver au sommet en forme.

Elle convient aux randonneurs expérimentés qui ont déjà fait des trekkings de plusieurs
jours et préfèrent avoir la montagne pour eux plutôt que prendre la ligne la plus facile.
Si c'est votre premier grand sommet, la
[voie normale de 4 jours](/en/tours/toubkal-summit-trek-4day) est le meilleur choix et
nous vous le dirons si vous demandez.

## Ce qui est inclus

La même chose que sur nos autres treks du Toubkal : guide de montagne diplômé, hébergement
en refuge, tous les repas en montagne, mules pour le matériel collectif, droits du parc
national et transport aller-retour depuis Marrakech. L'assurance voyage, le matériel
personnel et les pourboires ne sont pas inclus.

## En résumé

Aguelzim est l'approche des connaisseurs vers le Toubkal — plus haute, plus longue, plus
calme et plus belle. Elle coûte à peu près ce que coûte le trek classique de trois jours,
parce que la différence tient à la ligne et non à la logistique. Prenez-la si vous avez
les jambes et voulez la solitude ; prenez la vallée si c'est votre premier sommet de
l'Atlas.
""",
},
]

# --------------------------------------------------------------- SPANISH ---
POSTS["es"] = [
{
 "slug": "toubkal-sahara-8-day-tour-cost",
 "title": "¿Cuánto cuesta el circuito Toubkal y Sáhara de 8 días? (salidas 2027)",
 "excerpt": "Ocho días, dos objetivos: la cumbre más alta del norte de África y las dunas de Erg Chebbi. Esto es lo que cuesta realmente una salida en fecha fija, cómo se compara con reservar las partes por separado, y por qué el precio por persona no cambia con el tamaño del grupo.",
 "heroImage": "/gallery/toubkal-refuge-approach-trekkers.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 8,
 "tags": ["Toubkal", "Sáhara", "Erg Chebbi", "trekking", "Marruecos"],
 "seoTitle": "Circuito Toubkal y Sáhara 8 días — precio y salidas 2027",
 "seoDescription": "Lo que cuesta el circuito de 8 días Toubkal y Sáhara: 889 € por persona en salidas fijas, frente a 1.413 € reservando el mismo recorrido por separado.",
 "faq": [
  ("¿Cuánto cuesta el circuito Toubkal y Sáhara de 8 días?", "889 € por persona en las salidas fijas de 2027, rebajado de un precio de tarifa de 921 €. Incluye todos los traslados de aeropuerto, alojamiento en media pensión, todas las comidas durante el trekking, el guía de montaña titulado, las mulas en la montaña y el paseo en camello en Erg Chebbi. La cena en Marrakech, el seguro de viaje y las propinas no están incluidos, y es una decisión deliberada que se explica más abajo."),
  ("¿Por qué el precio no cambia según el tamaño del grupo?", "Porque es una salida en fecha fija vendida por plaza, no un circuito privado. En nuestros circuitos privados el guía y el vehículo son un coste fijo repartido entre los participantes, así que seis personas pagan mucho menos cada una que una sola. Aquí el viaje sale en su fecha publicada pase lo que pase, y lo que varía es cuántas de las 14 plazas quedan. Dos amigos pagan lo mismo por persona que un viajero solo, algo poco habitual en Marruecos y la razón principal por la que este itinerario encaja tan bien para quien viaja solo."),
  ("¿Qué significa en la práctica el límite de 14 plazas?", "La salida se cierra cuando se venden las 14 plazas. Ponemos ese tope por dos razones prácticas y no como táctica de venta: el refugio del Toubkal y el campamento del desierto tienen espacio limitado en una noche concreta, y un guía solo puede atender a un número determinado de personas en una mañana de cumbre, a oscuras. Si una fecha aparece agotada, la siguiente es realmente la siguiente."),
  ("¿Sale más barato reservar las partes por separado?", "No, y la diferencia es grande. Reservando viajes comparables de nuestro propio catálogo — el trekking de 4 días al Toubkal, un circuito privado de 3 días al Sáhara y una jornada guiada por la medina — sale alrededor de 1.413 € a precio individual. El itinerario combinado cuesta 889 € porque es una sola ruta continua con un guía y un vehículo, en lugar de tres viajes separados, cada uno con sus traslados y su jornada de guía."),
  ("¿Qué no está incluido y cuánto me costará?", "La cena en Marrakech las dos noches de riad, porque la medina está llena de sitios que merece la pena elegir uno mismo y una cena de hotel fijada es la peor forma de comer en esa ciudad: calcula 100-250 MAD por persona. El seguro de viaje es obligatorio y lo contratas tú, ya que la cobertura para trekking por encima de 4.000 m varía mucho según la póliza. Las propinas son costumbre: 150-200 MAD al día para el guía y 70-100 MAD para los muleros, de parte del grupo, en efectivo al final."),
  ("¿Hace falta ser un trekker experimentado?", "No, pero sí estar en forma para dos días largos consecutivos. El día de cumbre son unas nueve horas con salida antes del amanecer, y no hay escalada técnica en la ruta normal: ni cuerda, ni trepadas más allá de algún resalte rocoso. Lo que exige es resistencia de montaña en altura. Si puedes caminar seis horas por terreno montañoso sin temer al día siguiente, tienes el motor necesario."),
 ],
 "content": """
Dos objetivos que la mayoría trata como viajes distintos: el Yebel Toubkal a 4.167 m y el
mar de arena de Erg Chebbi. Esto es lo que cuesta unirlos en una ruta de ocho días, y
adónde va el dinero.

## La cifra principal

**889 € por persona**, en las salidas fijas de 2027, rebajado de un precio de tarifa de
921 €.

Es un precio por plaza, plano. No baja si vienes acompañado ni sube si vienes solo, que es
justo lo contrario de cómo se cobra casi cualquier viaje en Marruecos, incluidos los
nuestros.

## Por qué el precio no se mueve con el grupo

En un circuito privado el guía, el vehículo y el conductor son un coste fijo repartido
entre quienes reservan. Una persona lo paga entero; seis lo dividen entre seis. Por eso
nuestro [trekking de 4 días al Toubkal](/en/tours/toubkal-summit-trek-4day) va de 650 € en
solitario a 260 € por persona siendo seis.

Una salida fija invierte eso. El viaje sale en su fecha publicada tanto si han reservado
cuatro personas como catorce, así que el precio de la plaza es plano y lo que varía es la
disponibilidad. Para quien viaja solo es claramente mejor; para un grupo de seis merece la
pena compararlo con la versión privada.

## Lo que cuesta reservar el mismo recorrido por separado

De nuestro propio catálogo, a precio individual:

| Componente | Circuito comparable | Precio individual |
|---|---|---|
| Cumbre del Toubkal | [Trekking Toubkal 4 días](/en/tours/toubkal-summit-trek-4day) a 650 € solo | 650 € |
| Sáhara / Erg Chebbi | Circuito privado 3 días al Sáhara | 690 € |
| Medina de Marrakech | Visita cultural guiada | 73 € |
| **Total** | | **1.413 €** |

El circuito combinado cuesta 889 € por el mismo terreno. La diferencia no es un descuento:
es lo que desaparece cuando tres viajes separados se convierten en una ruta — dos juegos
de traslados de ida y vuelta desde Marrakech, dos jornadas extra de guía, y los días de
vehículo vacío entre medias.

## Qué incluye

- Todos los traslados de aeropuerto, a la llegada y a la salida
- Siete noches: riad, gîte, refugio de montaña y campamento en el desierto
- Media pensión durante todo el viaje, y **todas** las comidas durante el trekking
- Guía de montaña titulado para todo el recorrido
- Mulas en la montaña, camellos en Erg Chebbi
- Tasas del parque nacional

## Qué no, y por qué

- **La cena en Marrakech** las dos noches de riad. Es deliberado. La medina tiene más
  sitios que merecen la pena de los que ningún itinerario debería elegir por ti, y una
  cena de hotel fijada es la peor forma posible de comer en esa ciudad. Calcula
  100-250 MAD.
- **El seguro de viaje.** Obligatorio, y lo contratas tú, porque la cobertura para
  trekking por encima de 4.000 m varía enormemente entre pólizas y preferimos que leas la
  tuya a que te fíes de la nuestra.
- **Las propinas.** 150-200 MAD al día para el guía, 70-100 MAD para los muleros, de parte
  del grupo, en efectivo al final.

## Las salidas

Cinco fechas, marzo y abril de 2027, 14 plazas cada una. Las salidas de marzo son
condiciones invernales en la cumbre — lee
[subir al Toubkal en marzo](/en/blog/climbing-toubkal-in-march) antes de elegir, porque la
montaña a principios de marzo y la misma montaña a mediados de abril son propuestas
bastante distintas.

## En resumen

889 € compran ocho días, dos de los objetivos emblemáticos de Marruecos, un guía y una
ruta continua. Reservar el mismo terreno como viajes separados cuesta unos 1.413 €. El
precio por plaza no cambia con el tamaño del grupo, lo que lo hace especialmente
interesante para quien viaja solo y digno de comparar con calma si sois seis.
""",
},
{
 "slug": "tibherine-plane-wreck-toubkal",
 "title": "Los restos del avión en Tibherine: el lugar de accidente más alto de Marruecos",
 "excerpt": "Un motor de avión está incrustado en una cumbre junto al Toubkal, con restos esparcidos por toda la cara oeste. Lleva allí desde 1969, y la mayoría de los relatos se equivocan en los detalles.",
 "heroImage": "/gallery/tibherine-east-plane-wreck-sunrise.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 6,
 "tags": ["Toubkal", "Tibherine", "Alto Atlas", "historia", "Marruecos"],
 "seoTitle": "Los restos del avión de Tibherine sobre el Toubkal",
 "seoDescription": "Un Lockheed Constellation chocó contra Tibherine Este a 3.880 m en noviembre de 1969, cargado de munición para Biafra. Los restos no se hallaron hasta ocho meses después.",
 "faq": [
  ("¿Dónde están exactamente los restos del avión de Tibherine?", "En Tibherine Este, una cumbre de 3.880 m del macizo del Toubkal, al norte del propio Toubkal. Tibherine es una cumbre gemela — Este a 3.880 m y Oeste a 3.887 m, lo bastante parecidas en altura y forma como para que localmente se las llame «las gemelas». Los restos están en la cima oriental, con material esparcido por la cara oeste y un motor incrustado en las rocas de la cumbre."),
  ("¿Qué avión era y qué ocurrió?", "Un Lockheed L-749A Constellation que volaba de noche desde Faro, en Portugal, hacia Santo Tomé, cargado de munición destinada a Biafra durante la guerra civil nigeriana. El 28 de noviembre de 1969 la tripulación comunicó problemas de motor y pidió desviarse al aeropuerto más cercano, pero el aparato perdió altura y chocó contra la montaña. Murieron las ocho personas a bordo."),
  ("¿Cuánto tardaron en encontrar los restos?", "Casi ocho meses. El accidente fue el 28 de noviembre de 1969 y los restos no se localizaron hasta el 18 de julio de 1970, cuando unos montañeros que subían por la zona del Toubkal se toparon con ellos. Ese intervalo explica que muchos relatos fechen el accidente en 1970: están citando el hallazgo, no el siniestro."),
  ("¿Los trekkings al Toubkal visitan los restos?", "No en la ruta normal. Nuestros trekkings suben a la cumbre del Toubkal y vuelven al refugio; Tibherine es un objetivo aparte, al que se llega por una línea distinta y mucho menos transitada. Puede añadirse para trekkers experimentados con un guía que conozca la aproximación, pero no cabe en un itinerario de dos días y nunca debe tratarse como un desvío casual."),
  ("¿Es seguro ir?", "El problema es el terreno, no los restos. La aproximación no está señalizada, el suelo es suelto y expuesto en tramos, y la cara norte del macizo es más empinada que la ruta turística. Es terreno para montañeros experimentados con guía y en condiciones estables — y desde 2018 un guía titulado es obligatorio en cualquier caso en todo el Parque Nacional del Toubkal."),
  ("¿Por qué discrepan las fuentes sobre el número de muertos?", "Varios artículos de viajes hablan de cuatro tripulantes. El registro del Bureau of Aircraft Accidents Archives — el informe de accidente de referencia — dice ocho. Publicamos ocho por esa razón. La altitud está igual de confundida: las cifras de 3.886 y 3.887 m aparecen porque se cita Tibherine Oeste para unos restos que están en Tibherine Este, a 3.880 m."),
 ],
 "content": """
Camina por la vertiente norte del macizo del Toubkal y te encontrarás con algo que detiene
en seco a casi todo el mundo: un motor de avión, posado entre las rocas de una cumbre de
3.880 m, con metal esparcido por la ladera de abajo.

Lleva allí desde 1969. La mayoría de los relatos se equivoca en al menos un detalle, así
que esto es lo que dice el registro.

## Qué ocurrió

La noche del **28 de noviembre de 1969**, un Lockheed L-749A Constellation volaba desde
Faro, en Portugal, hacia Santo Tomé. Su carga era munición, y su destino final Biafra: el
territorio que se había separado de Nigeria en 1967 y estaba, a finales de 1969, en los
últimos meses de una guerra perdida.

Sobre Marruecos la tripulación tuvo problemas de motor y comunicó al control aéreo que
quería desviarse al aeropuerto más cercano. En vez de eso el aparato perdió altura y chocó
contra Tibherine Este. Murieron las ocho personas a bordo.

## Ocho meses hasta que alguien lo encontró

Los restos no se localizaron hasta el **18 de julio de 1970**, cuando unos montañeros que
subían por la zona del Toubkal se toparon con ellos hacia los 3.900 m.

Ese intervalo de ocho meses explica una confusión persistente: los artículos que fechan el
accidente en 1970 están citando el hallazgo, no el siniestro. Ambas fechas son reales, y
no son el mismo suceso.

## Dónde está realmente

Tibherine es una **cumbre gemela**: Este a 3.880 m y Oeste a 3.887 m, lo bastante parecidas
en altura y perfil como para que localmente se las llame «las gemelas». Los restos están
en la cima **oriental**.

De ahí viene el otro error habitual. Los relatos que citan 3.886 o 3.887 m están dando la
altura de la cumbre oeste para unos restos que yacen en la del este.

El material desciende por la cara oeste y el corredor de debajo. Uno de los motores está
incrustado en la propia cumbre, y es la pieza que fotografían casi todos los trekkers.

## En qué se equivoca la mayoría de los artículos

El número de muertos es lo que merece corrección. Varios reportajes de viajes hablan de
cuatro tripulantes. El Bureau of Aircraft Accidents Archives — el informe de accidente de
referencia — dice **ocho**. Publicamos ocho.

Importa más allá de la pedantería. Se trata de un vuelo de carga de guerra que mató a
todos los que iban a bordo y quedó sin encontrar en una ladera durante casi un año. Partir
por la mitad la cifra de víctimas lo convierte en una curiosidad.

## ¿Se puede ir a verlo?

No en la ruta normal del Toubkal, y preferimos decirlo claramente antes que dar a entender
lo contrario.

Nuestros [trekkings al Toubkal](/en/tours/toubkal-summit-trek-4day) suben a la cumbre del
Toubkal, a 4.167 m, y regresan al refugio. Tibherine es un objetivo aparte por una línea
distinta y mucho menos frecuentada. La aproximación no está señalizada, es de terreno
suelto y más empinada que nada de lo que hay en el camino turístico.

Puede añadirse para trekkers experimentados, con un guía que conozca el terreno y en
condiciones estables. No cabe en un itinerario de dos días. Si verlo te importa, dilo al
consultarnos y te diremos con honestidad si encaja en el viaje que estás considerando; a
menudo la respuesta es que hace falta un día más.

Desde 2018 un guía titulado es obligatorio en todo el Parque Nacional del Toubkal, así que
en ningún caso es una ruta para intentar en solitario.
""",
},
{
 "slug": "climbing-toubkal-in-march",
 "title": "Subir al Toubkal en marzo: a qué te estás apuntando en realidad",
 "excerpt": "Marzo es el mes en que se reserva esperando primavera y se encuentra invierno. Esto es cómo está realmente la montaña, qué material exige, y cuándo abril es la mejor respuesta.",
 "heroImage": "/gallery/toubkal-final-snow-slope-dawn.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 7,
 "tags": ["Toubkal", "trekking invernal", "Alto Atlas", "Marruecos", "estaciones"],
 "seoTitle": "Subir al Toubkal en marzo — nieve, material y consejos",
 "seoDescription": "En marzo el Toubkal sigue siendo invernal por encima de 3.000 m: nieve, crampones y piolet. Qué esperar, qué necesitas y cuándo elegir abril.",
 "faq": [
  ("¿Sigue habiendo nieve en el Toubkal en marzo?", "Sí, por encima de unos 3.000 m. Marzo está al final de la temporada invernal, y el cono de cumbre suele mantener nieve hasta abril en un año normal. En el valle, en Imlil, puedes ir en manga corta mientras la cima está muy por debajo de cero al amanecer: los separan 2.400 m de desnivel, y ahí está casi toda la explicación."),
  ("¿Necesito crampones y piolet en marzo?", "La mayoría de los años sí, y necesitas saber usarlos, no solo llevarlos. Las pendientes finales pasan de ser una caminata a ser una ascensión sobre nieve cuando están heladas, que es justo cuando resultan más difíciles. Ambos se alquilan en Imlil por 100-150 MAD al día. En nuestras salidas guiadas se proporcionan cuando las condiciones lo exigen."),
  ("¿Es marzo más peligroso que el verano?", "Es una montaña distinta más que simplemente más dura. Las fuertes nevadas de enero a marzo generan un riesgo real de aludes en las laderas cargadas, y el tiempo cambia más rápido que en verano. Por eso un guía vale más en marzo que en julio: lo que pagas es el criterio para decidir si hoy es el día."),
  ("¿Marzo o abril para subir al Toubkal?", "Abril, para la mayoría. La cota de nieve suele haber subido, la caminata es más fácil y los días son más largos, y las multitudes aún no han llegado. Elige marzo si de verdad quieres la montaña en condición invernal y te manejas sobre nieve: está más tranquilo, y las vistas desde la cumbre con aire frío y limpio son las mejores del año."),
  ("¿Cuánto frío hace la mañana de cumbre?", "Bajo cero, de forma fiable, y con la sensación térmica del viento en la arista se nota bastante más frío de lo que marca el termómetro. Se sale de noche, que es el momento más frío del día. Un buen plumas, guantes de abrigo más un par de repuesto y algo que cubra la cara no son opcionales en marzo."),
  ("¿Puede un principiante subir al Toubkal en marzo?", "Un principiante en forma puede, con guía y en condiciones estables, pero es honestamente más duro que el mismo trekking en junio y la tasa de éxito en la cumbre es menor. Si es tu primera montaña grande y llegar arriba te importa, de abril en adelante es una introducción más amable. Si tienes experiencia en montaña invernal, marzo es un mes muy agradecido allí arriba."),
 ],
 "content": """
Marzo es el mes que pilla desprevenida a la gente. Los vuelos son baratos, Marrakech está
templada, y la montaña parece lo bastante cerca en el mapa como para parecer un paseo
primaveral. Por encima de 3.000 m sigue siendo invierno.

## Cómo es marzo en realidad

Imlil, a 1.740 m, puede ser agradable en marzo: sol, manga corta por la tarde, almendros
en flor en los valles. La cumbre está 2.427 m más arriba, y esa diferencia lo explica todo.

Por encima de unos 3.000 m la montaña lleva nieve, y en un año normal el cono de cumbre la
conserva hasta abril. La mañana de cumbre sales del refugio a oscuras, con temperaturas
bajo cero, sobre un terreno que se ha helado durante la noche.

## El material que deja de ser opcional

- **Crampones y piolet**, y saber usarlos. La nieve helada es cuando las pendientes
  finales dejan de ser una caminata, que es también cuando son más duras. El alquiler en
  Imlil cuesta 100-150 MAD al día; en nuestras salidas guiadas se proporcionan cuando las
  condiciones lo requieren.
- **Botas rígidas** que admitan realmente un crampón. Una zapatilla de trail blanda no lo
  hace, y es el error de material más común que vemos en marzo.
- **Aislamiento y un par de guantes de repuesto.** Sales de noche y el viento en la arista
  de cumbre hace el resto.

## El riesgo que nadie anuncia

Las fuertes nevadas entre enero y marzo cargan las laderas, y eso genera un riesgo real de
aludes en determinadas orientaciones y condiciones. El tiempo también cambia bastante más
rápido que en verano.

Por eso un guía vale más en marzo que en julio. Su valor no está en encontrar un camino
que podrías seguir tú solo: está en el criterio sobre si hoy es el día de subir, y en la
disposición a dar media vuelta. Desde 2018 un guía titulado es obligatorio en el Parque
Nacional del Toubkal en cualquier caso.

## ¿Marzo o abril?

**Elige abril** si quieres la versión más sencilla: la cota de nieve suele haber subido,
caminar es más fácil, los días son más largos y las multitudes del verano aún no han
llegado. Para una primera montaña grande, de abril en adelante es una introducción más
amable y la tasa de éxito es notablemente mayor.

**Elige marzo** si de verdad quieres la montaña en condición invernal y te manejas sobre
nieve. Está más tranquilo, y las vistas desde la cumbre con aire frío y limpio son las
mejores del año.

Nuestras
[salidas de 8 días Toubkal y Sáhara](/en/tours/morocco-highlights-toubkal-sahara-8day)
salen a ambos lados de esa línea — tres fechas en marzo, dos en abril — y es deliberado.
Si dudas entre ellas, el párrafo de arriba es la decisión.

## Concédete el día extra

Sea cual sea el mes, la altitud decide más cumbres que la forma física. El
[itinerario de 4 días](/en/tours/toubkal-summit-trek-4day) sube gradualmente con una noche
de aclimatación; la versión de 2 días va de 1.740 m a 4.167 m en unas treinta horas. En
marzo, cuando el empuje final es de todos modos más duro y más lento, ese día extra vale
más que en julio.
""",
},
{
 "slug": "toubkal-aguelzim-pass-trek-cost",
 "title": "¿Cuánto cuesta el trekking de 3 días por el paso de Aguelzim al Toubkal?",
 "excerpt": "El paso de Aguelzim es la vía tranquila al Toubkal: un cruce en altura que evita por completo el valle del Mizane. Esto es lo que cuesta la versión de tres días y a quién le encaja de verdad.",
 "heroImage": "/gallery/tours-toubkal-aguelzim-pass-3day.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 6,
 "tags": ["Toubkal", "Aguelzim", "Alto Atlas", "trekking", "Marruecos"],
 "seoTitle": "Trekking paso de Aguelzim al Toubkal, 3 días — precio y ruta",
 "seoDescription": "Lo que cuesta la ruta del paso de Aguelzim al Toubkal en 3 días, en qué se diferencia de la aproximación clásica por el Mizane, y a quién le encaja la línea tranquila.",
 "faq": [
  ("¿Qué es la ruta del paso de Aguelzim?", "Una aproximación alternativa al refugio del Toubkal que cruza el Tizi n'Aguelzim a unos 3.560 m en lugar de remontar el valle del Mizane. Es más larga y más alta que la línea normal, y bastante más tranquila: casi todo el tránsito del Toubkal no la ve nunca. La contrapartida es un paso serio el primer día en vez de una subida gradual por el fondo del valle."),
  ("¿Es Aguelzim más difícil que la ruta normal?", "Sí, de forma apreciable. La aproximación clásica gana altura de manera constante por un valle; Aguelzim pone un paso de 3.560 m por delante antes de que hayas dormido en altura siquiera. Encaja con gente con experiencia en montaña que quiere la línea tranquila, no con quien intenta su primera cumbre."),
  ("¿Por qué elegir Aguelzim en vez de la ruta normal?", "Soledad, y mejores vistas. El sendero del valle del Mizane es el más transitado del Atlas en verano, con recuas de mulas y caminantes de día casi hasta el refugio. El cruce de Aguelzim está vacío en comparación, y el propio paso te da todo el macizo de un vistazo, algo que la aproximación por el valle no hace nunca."),
  ("¿Qué forma física hace falta?", "La suficiente para un día largo con un paso alto, en jornadas consecutivas. No es una ruta técnica en verano — ni cuerda ni trepadas — pero el cruce del primer día es un esfuerzo real en altura antes de aclimatarte. Si haces con regularidad jornadas de montaña de seis o siete horas, estás en el rango adecuado."),
 ],
 "content": """
Casi todo el que sube al Toubkal remonta el valle del Mizane desde Imlil. En verano ese
camino lleva recuas de mulas, caminantes de día y una fila constante de trekkers hasta el
refugio.

El paso de Aguelzim es la otra entrada.

## La ruta

En lugar de seguir el fondo del valle, esta línea cruza el **Tizi n'Aguelzim a unos
3.560 m** y baja al refugio desde arriba. Es más larga, más alta y está vacía en
comparación — y la vista desde el paso te da el macizo entero de una vez, algo que la
aproximación por el valle no hace nunca.

## Lo que cuesta

Nuestro [trekking Aguelzim de 3 días](/en/tours/toubkal-aguelzim-pass-3day) cuesta 600 €
para una persona, 302 € cada uno siendo dos, y 230 € cada uno siendo seis. Como todas
nuestras salidas privadas, se tarifica en escala decreciente, porque el guía y el
transporte son un coste fijo repartido entre los participantes: el precio por persona baja
según crece el grupo, y quien va solo lo carga entero.

Incluye el guía de montaña titulado, las noches de refugio, todas las comidas en la
montaña, el apoyo de mulas, las tasas del parque nacional y el transporte de ida y vuelta
desde Marrakech.

## A quién le encaja, con honestidad

**No** a una primera montaña. La ruta normal gana su altura gradualmente por un valle;
Aguelzim te pone un paso de 3.560 m delante el primer día, antes de haber dormido en
altura. Esa es una diferencia real en cómo se siente el viaje, y en las probabilidades de
que hagas cumbre encontrándote bien.

Encaja con montañeros experimentados que ya han hecho travesías de varios días y prefieren
tener la montaña para ellos antes que tomar la línea más fácil. Si es tu primera cumbre
grande, la [ruta normal de 4 días](/en/tours/toubkal-summit-trek-4day) es mejor opción y te
lo diremos si preguntas.

## Qué incluye

Lo mismo que nuestros otros trekkings al Toubkal: guía de montaña titulado, alojamiento en
refugio, todas las comidas en la montaña, mulas para el material colectivo, tasas del
parque nacional y transporte de ida y vuelta desde Marrakech. El seguro de viaje, el
material personal y las propinas no están incluidos.

## En resumen

Aguelzim es la aproximación de los entendidos al Toubkal: más alta, más larga, más
tranquila y más bonita. Cuesta más o menos lo que cuesta el trekking clásico de tres días,
porque la diferencia está en la línea y no en la logística. Tómala si tienes las piernas y
quieres la soledad; toma el valle si es tu primera cumbre del Atlas.
""",
},
]


def esc(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')


def render(p):
    faq = "".join('      { q: "%s", a: "%s" },\n' % (esc(q), esc(a)) for q, a in p["faq"])
    tags = ", ".join('"%s"' % t for t in p["tags"])
    return (
        "  {\n"
        '    slug: "%s",\n'
        "    author: MET_TEAM,\n"
        '    title: "%s",\n'
        '    excerpt:\n      "%s",\n'
        '    heroImage: "%s",\n'
        '    category: "%s",\n'
        '    region: "%s",\n'
        "    readTime: %d,\n"
        '    publishedAt: "2026-08-28",\n'
        '    updatedAt: "2026-08-28",\n'
        "    tags: [%s],\n"
        '    seoTitle: "%s",\n'
        '    seoDescription:\n      "%s",\n'
        "    faq: [\n%s    ],\n"
        "    content: `%s`,\n"
        "  },\n"
        % (p["slug"], esc(p["title"]), esc(p["excerpt"]), p["heroImage"],
           p["category"], p["region"], p["readTime"], tags,
           esc(p["seoTitle"]), esc(p["seoDescription"]), faq, p["content"])
    )


def run():
    for lang, posts in POSTS.items():
        path = "lib/blog.%s.part2.ts" % lang
        src = io.open(path, encoding="utf-8").read()
        add = ""
        for p in posts:
            assert '"%s"' % p["slug"] not in src, "%s: %s already there" % (path, p["slug"])
            add += render(p)
        at = src.rindex("\n];")
        src = src[:at] + "\n" + add.rstrip("\n") + src[at:]
        io.open(path, "w", encoding="utf-8", newline="\n").write(src)
        print("  %s  +%d posts" % (lang, len(posts)))


run()
