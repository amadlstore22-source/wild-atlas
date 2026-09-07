/**
 * French alt text for the gallery photographs, keyed by `src`.
 *
 * Only the alt strings are translated, not the whole photo list: `src`,
 * `group` and `span` are identical in every locale, and duplicating the array
 * six times would mean six places to edit when a photo is added and five ways
 * for the order to drift. lib/gallery-alt-i18n.ts overlays this onto
 * GALLERY_PHOTOS at render time.
 *
 * Alt text is not decoration here. It is the caption the lightbox displays,
 * the `description` in the gallery page's ImageObject schema, and what Google
 * Images reads — so an English string on /fr/gallery is a French page telling
 * Google its pictures are of English-language subjects.
 *
 * Place names stay in their established form: Jbel Toubkal, Imlil, Erg Chebbi,
 * Erg Chegaga, Aït Ben Haddou, Volubilis, Todra. Those are what people search
 * for in every language, and "translating" them would cost the very traffic
 * this file exists to earn. What IS translated is everything around them.
 */
export const GALLERY_ALT_FR: Record<string, string> = {
  "/gallery/toubkal-national-park-peak-clouds.jpg":
    "Le massif du Jbel Toubkal sous des nuages spectaculaires, parc national du Toubkal, Haut Atlas, Maroc",
  "/gallery/toubkal-summit-group-pyramid.jpg":
    "Nos randonneurs à la pyramide du sommet du Jbel Toubkal, 4 167 m, Haut Atlas, Maroc",
  "/gallery/trek-camp-golden-hour-valley.jpg":
    "Notre campement de trek dressé au-dessus d'une vallée du Haut Atlas à l'heure dorée, Maroc",
  "/gallery/imlil-mule-trail-toubkal-behind.jpg":
    "Sur le sentier muletier au départ d'Imlil, la crête enneigée du Toubkal en arrière-plan, Maroc",
  "/gallery/toubkal-trail-turquoise-pool-waterfall.jpg":
    "Vasque naturelle turquoise et cascade sur le sentier d'Imlil à Sidi Chamharouch, Toubkal, Maroc",
  "/gallery/berber-guide-waterfall-portrait.jpg":
    "L'un de nos guides de montagne berbères diplômés devant une cascade du Haut Atlas, Maroc",
  "/gallery/trek-camp-high-valley-dawn.jpg":
    "Tentes berbères de notre campement d'altitude aux premières lueurs, Haut Atlas, Maroc",
  "/gallery/imlil-village-green-valley.jpg":
    "Le village d'Imlil en terrasses dans sa vallée verdoyante du Haut Atlas, sous les sommets du Toubkal, Maroc",
  "/gallery/imlil-berber-village-kittens.jpg":
    "Des chatons sur les marches en pierre d'un village berbère du Haut Atlas, Maroc",
  "/gallery/imlil-valley-night-stars.jpg":
    "La vallée d'Imlil la nuit — lumières du village et étoiles sous le Haut Atlas, Maroc",
  "/gallery/trek-winter-ascent-snow-traverse.jpg":
    "Notre groupe traversant une pente neigeuse lors d'une ascension hivernale dans le Haut Atlas, Maroc",
  "/gallery/blog-hero-sahara-dunes-golden.jpg":
    "Campement dans les dunes de l'Erg Chebbi à l'heure dorée, Sahara de Merzouga, Maroc",
  "/gallery/tours-erg-chegaga-3day-marrakech.jpg":
    "Tentes berbères dressées au pied des dunes de l'Erg Chegaga, vallée du Draa, Maroc",
  "/gallery/tours-merzouga-stargazing-desert-tour.jpg":
    "Le ciel nocturne au-dessus d'une dune de l'Erg Chebbi, Merzouga — aucune lumière artificielle à 50 km, Maroc",
  "/gallery/atlantic-coast-trek-beach-walkers.jpg":
    "Notre groupe marchant sur l'estran d'une plage déserte au pied d'un promontoire, côte atlantique du Maroc",
  "/gallery/atlantic-coast-trek-argan-trail-group.jpg":
    "Nos randonneurs sur un sentier pierreux à travers l'arganeraie au-dessus de la côte atlantique, Maroc",
  "/gallery/atlantic-coast-trek-camels-argan-track.jpg":
    "L'un de nos guides en turban bleu conduisant les chameaux de bât sur une piste bordée d'arganiers, côte atlantique du Maroc",
  "/gallery/atlantic-coast-sea-arch-cliff.jpg":
    "Arche rocheuse naturelle dans les falaises marines, les rouleaux de l'Atlantique en contrebas, côte du Maroc",
  "/gallery/coastal-desert-camp-dusk-tents.jpg":
    "Nos tentes dressées dans les dunes côtières au crépuscule pendant le déchargement des chameaux, Maroc",
  "/gallery/family-desert-camp-campfire-dusk.jpg":
    "Une famille avec de jeunes enfants autour du feu de camp dans notre campement saharien au crépuscule, le guide entretenant le feu, Maroc",
  "/gallery/family-desert-camel-caravan-dunes.jpg":
    "Des enfants dans la caravane de chameaux traversant les dunes de l'Erg Chebbi, notre guide en tête à pied, Merzouga, Maroc",
  "/gallery/family-camel-trek-palmeraie-children.jpg":
    "Des enfants en chèche à dos de chameau devant les palmeraies et les murs en pisé d'un village de la vallée du Draa, Maroc",
  "/gallery/camel-caravan-sunset-riders.jpg":
    "Nos voyageurs à dos de chameau dans la caravane au coucher du soleil sur les dunes de l'Erg Chebbi, Merzouga, Maroc",
  "/gallery/trek-lunch-mint-tea-walnut-grove.jpg":
    "Déjeuner en chemin, salade berbère et thé à la menthe servis sur des tapis sous les noyers, Haut Atlas, Maroc",
  "/gallery/refuge-group-dinner-long-table.jpg":
    "Nos randonneurs dînant ensemble à la grande table d'un refuge de montagne, Haut Atlas, Maroc",
  "/gallery/atlas-terraced-fields-sunrise.jpg":
    "Champs berbères en terrasses captant la première lumière dans une vallée du Haut Atlas, Maroc",
  "/gallery/atlas-mule-train-green-trail.jpg":
    "Notre caravane de mulets portant le matériel sur un sentier verdoyant de printemps, Haut Atlas, Maroc",
  "/gallery/camp-cook-preparing-vegetables.jpg":
    "Notre cuisinier de campement préparant des légumes frais sous la tente-mess lors d'un départ dans le désert, Maroc",
  "/gallery/desert-campfire-night-guests.jpg":
    "Voyageurs et guides autour du feu de camp sous un ciel noir du désert, Sahara, Maroc",
  "/gallery/trek-scramble-gorge-poles.jpg":
    "Des randonneurs franchissant un ressaut rocheux avec bâtons sur un itinéraire du Haut Atlas, Maroc",
  "/gallery/winter-ascent-crampons-helmet.jpg":
    "Un randonneur en casque et crampons lors d'une ascension hivernale dans le Haut Atlas enneigé, Maroc",
  "/gallery/camels-resting-acacia-tree.jpg":
    "Chameaux de bât au repos à l'ombre d'un acacia isolé lors d'une traversée du désert, Maroc",
  "/gallery/ait-ben-haddou-kasbah-wide.jpg":
    "Le ksar en terre d'Aït Ben Haddou dominant les palmeraies, Ouarzazate, Maroc",
  "/gallery/wild-ostrich-souss-massa.jpg":
    "Une autruche sauvage dans la plaine côtière du parc national de Souss-Massa, Maroc",
  "/gallery/rabat-mausoleum-mohammed-v-columns.jpg":
    "Le mausolée Mohammed V vu à travers le champ de colonnes brisées de l'esplanade Hassan, Rabat, Maroc",
  "/gallery/rabat-hassan-tower-columns.jpg":
    "Le minaret inachevé de la tour Hassan dominant les rangées de fûts de colonnes laissés par la mosquée abandonnée, Rabat, Maroc",
  "/gallery/volubilis-basilica-arches.jpg":
    "La basilique à arcades de la cité romaine de Volubilis, chapiteaux corinthiens tombés au premier plan, Maroc",
  "/gallery/volubilis-arch-of-caracalla-inscription.jpg":
    "L'inscription dédicatoire latine sur l'attique de l'arc de Caracalla à Volubilis, Maroc",
  "/gallery/rabat-mausoleum-carved-portal.jpg":
    "Portail de stuc sculpté et porte de bronze du mausolée Mohammed V sous sa toiture de tuiles vertes, Rabat, Maroc",
  "/gallery/rabat-mausoleum-marble-arcade.jpg":
    "Détail de l'arcade de marbre blanc sculpté et des arcs entrelacés du mausolée Mohammed V, Rabat, Maroc",
  "/gallery/rabat-zellij-tile-fountain.jpg":
    "Une fontaine en zellige encastrée dans un mur de pierre sculptée sur l'esplanade Hassan, Rabat, Maroc",
  "/gallery/rabat-hassan-esplanade-columns-walker.jpg":
    "Un visiteur marchant entre les rangées de fûts de colonnes de l'esplanade Hassan, le mur de la kasbah et Rabat au-delà, Maroc",
  "/gallery/rabat-mausoleum-green-roof-sunburst.jpg":
    "La toiture pyramidale verte du mausolée Mohammed V, le soleil éclatant derrière une colonne de la mosquée Hassan, Rabat, Maroc",
  "/gallery/rabat-royal-guard-horseback-mausoleum.jpg":
    "Un cavalier de la Garde royale en tunique rouge et cape blanche sur un cheval gris à l'entrée du mausolée Mohammed V, Rabat, Maroc",
  "/gallery/rabat-hassan-tower-carved-facade-pigeons.jpg":
    "Le treillis de pierre sculptée de la tour Hassan près du mur ocre érodé de la mosquée en ruine, des pigeons nichés dans ses cavités, Rabat, Maroc",
  "/gallery/rabat-mausoleum-arcade-lantern-detail.jpg":
    "Arcs de marbre entrelacés et lanterne de bronze suspendue le long de l'arcade supérieure du mausolée Mohammed V, Rabat, Maroc",
  "/gallery/rabat-mausoleum-brass-lantern-crenellations.jpg":
    "Une lanterne de laiton ajourée sur son socle sous le mur crénelé de marbre blanc du mausolée Mohammed V, Rabat, Maroc",
  "/gallery/rabat-hassan-esplanade-steps-city-beyond.jpg":
    "Le large escalier de pierre montant vers l'esplanade Hassan, le mur ocre de la mosquée en ruine au-dessus et Rabat étendue derrière, Maroc",
  "/gallery/rabat-hassan-esplanade-zellij-fountain-wide.jpg":
    "La cour à fontaine carrelée en contrebas de l'esplanade Hassan, groupes scolaires le long de la balustrade et colonnes de la mosquée en ruine au-dessus, Rabat, Maroc",
  "/gallery/rabat-alaouite-state-treasury-doorway.jpg":
    "La porte du trésor de l'État alaouite sous le mur ocre de la mosquée Hassan inachevée, Rabat, Maroc",
  "/gallery/volubilis-arch-of-caracalla-through-arch.jpg":
    "L'arc de Caracalla à Volubilis, sa dédicace latine au-dessus et la plaine du Zerhoun encadrée par l'ouverture, Maroc",
  "/gallery/volubilis-basilica-interior-long-shadows.jpg":
    "Ombres matinales sur le dallage à l'intérieur de la basilique de Volubilis, le mur à arcades conservé sur toute sa hauteur, Maroc",
  "/gallery/volubilis-columns-over-zerhoun-plain.jpg":
    "Deux colonnes debout de Volubilis au-dessus des oliveraies et des champs de blé de la plaine du Zerhoun, Maroc",
  "/gallery/volubilis-arch-of-caracalla-across-ruins.jpg":
    "L'arc de Caracalla vu par-delà le plan des rues fouillées de Volubilis, les collines du Rif à l'arrière-plan, Maroc",
  "/gallery/volubilis-basilica-arcade-upward.jpg":
    "L'arcade de brique et de pierre de la basilique de Volubilis vue d'en bas, chapiteaux corinthiens sculptés le long de la corniche, Maroc",
  "/gallery/volubilis-basilica-capitals-foreground.jpg":
    "Chapiteaux corinthiens tombés au premier plan de l'arcade de la basilique de Volubilis, Maroc",
  "/gallery/fes-woodcarvers-workshop-artisans.jpg":
    "Trois artisans travaillant un panneau de cèdre sculpté dans un atelier de sculpture sur bois de la médina de Fès, moucharabiehs achevés couvrant les murs, Maroc",
  "/gallery/fes-woodcarver-chisel-mallet-panel.jpg":
    "Un sculpteur sur bois taillant une rosace géométrique dans un panneau de cèdre au ciseau et au maillet dans son atelier, médina de Fès, Maroc",
  "/gallery/fes-kairaouine-minaret-lit-dusk.jpg":
    "Le minaret éclairé et la toiture pyramidale verte de la mosquée Quaraouiyine au-dessus des toits de Fès el-Bali au crépuscule, Maroc",
  "/gallery/fes-carpet-shop-stacked-kilims.jpg":
    "Un marchand de tapis au fond de sa boutique entre des murs de kilims empilés et de couvertures berbères pliées, médina de Fès, Maroc",
  "/gallery/fes-leather-shop-hanging-bags.jpg":
    "Une maroquinerie de la médina de Fès garnie du sol au plafond de sacs et de besaces tannés à la tannerie Chouara, Maroc",
  "/gallery/fes-carpet-store-window-grille.jpg":
    "Tapis et textiles empilés vus à travers une grille de fenêtre en fer dans la médina de Fès, Maroc",
  "/gallery/todra-gorge-red-walls-road.jpg":
    "La route serpentant entre les parois calcaires de 300 mètres des gorges du Todra, Haut Atlas, Maroc",
  "/gallery/todra-gorge-walker-canyon-floor.jpg":
    "Un marcheur au fond du canyon des gorges du Todra, minuscule au pied des parois rouges, Maroc",
  "/gallery/todra-gorge-stream-beside-road.jpg":
    "La rivière du Todra coulant en nappe sur les galets le long de la route des gorges, sous des falaises en surplomb, Maroc",
  "/gallery/merzouga-erg-chebbi-dune-ridge-wide.jpg":
    "Toute la crête des dunes de l'Erg Chebbi s'élevant de la hamada plate aux abords de Merzouga, Maroc",
};
