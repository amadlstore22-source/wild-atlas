import type { Locale } from "@/app/[lang]/dictionaries";
import { EVENTS, type TourEvent } from "./events";

/**
 * Per-locale event copy.
 *
 * Written for all six locales at once, deliberately. Twice this week a feature
 * shipped that rendered perfectly while serving English to five of six
 * locales — the tour seoTitles, and the whole review page — because an English
 * fallback is invisible. `__tests__/lib/events.test.ts` fails if any of these
 * strings is byte-identical to the English one.
 *
 * Only prose is translated. Dates come from lib/events.ts and are formatted per
 * locale by lib/events-format.ts, and `dateNote` explains a mechanism (harvest,
 * moon sighting) that must read correctly in each language.
 */

type EventCopy = Pick<TourEvent, "name" | "shortName" | "blurb" | "description"> &
  Partial<Pick<TourEvent, "dateNote" | "highlights" | "considerations">>;

type Table = Record<string, Record<Exclude<Locale, "en">, EventCopy>>;

const COPY: Table = {
  "morocco-highlights-8day-departures": {
    fr: {
      name: "Morocco Highlights 8 jours : sommet du Toubkal et désert du Sahara",
      shortName: "Highlights 8 jours",
      blurb:
        "Le plus haut sommet d'Afrique du Nord et les dunes de l'Erg Chebbi en un seul voyage, sur cinq départs fixes de quatorze places.",
      description:
        "La plupart des voyageurs choisissent entre la montagne et le désert. Ce circuit fait les deux en huit jours : trois jours sur le Toubkal, 4 167 m et point culminant de l'Afrique du Nord, puis la descente vers le sud par le Tizi n'Tichka jusqu'à une nuit dans les dunes de l'Erg Chebbi, à Merzouga. Il part à dates fixes plutôt qu'à la demande, et c'est ce qui en fait un circuit partagé au niveau d'un circuit privé : quatorze places, un guide de montagne diplômé, et un prix par personne qui ne bouge pas quel que soit le nombre d'inscrits.",
      highlights: [
        "Le Jbel Toubkal à 4 167 m — le plus haut sommet d'Afrique du Nord",
        "Une nuit dans les dunes de l'Erg Chebbi à Merzouga, rejointes à dos de dromadaire",
        "Cinq départs fixes entre mars et avril 2027, quatorze places chacun",
        "Un seul guide de montagne diplômé sur les huit jours, et non un chauffeur différent à chaque étape",
        "Un prix par personne fixe : il n'augmente pas parce que vous n'êtes que trois",
      ],
      considerations: [
        "Le circuit est classé difficile. Le Toubkal est une longue marche en altitude, sans difficulté technique, mais la journée du sommet dure huit à dix heures et commence avant l'aube.",
        "En mars et début avril, la neige tient encore sur l'arête sommitale et les crampons sont parfois nécessaires — ils sont fournis, mais l'ascension est alors réellement hivernale.",
        "Les départs fixes ne se déplacent pas. Si la date ne vous convient pas, le même terrain se parcourt en privé sur notre circuit Toubkal et Sahara de 5 jours, à la date de votre choix.",
        "Quatorze places au maximum, et ce sont les départs de mars qui se remplissent en premier.",
      ],
    },
    es: {
      name: "Morocco Highlights 8 días: cumbre del Toubkal y desierto del Sáhara",
      shortName: "Highlights 8 días",
      blurb:
        "La cumbre más alta del norte de África y las dunas del Erg Chebbi en un solo viaje, en cinco salidas fijas de catorce plazas.",
      description:
        "La mayoría de los viajeros elige entre la montaña y el desierto. Este circuito hace ambas cosas en ocho días: tres jornadas en el Toubkal, 4.167 m y techo del norte de África, y después el descenso hacia el sur por el Tizi n'Tichka hasta pasar una noche en las dunas del Erg Chebbi, en Merzouga. Sale en fechas fijas y no bajo demanda, y eso es lo que lo convierte en un circuito compartido con el nivel de uno privado: catorce plazas, un guía de montaña titulado y un precio por persona que no cambia por muy pocos que sean los inscritos.",
      highlights: [
        "El Jbel Toubkal a 4.167 m: la cumbre más alta del norte de África",
        "Una noche en las dunas del Erg Chebbi, en Merzouga, a la que se llega en camello",
        "Cinco salidas fijas entre marzo y abril de 2027, con catorce plazas cada una",
        "Un mismo guía de montaña titulado durante los ocho días, y no un conductor distinto en cada tramo",
        "Precio por plaza cerrado: no sube porque solo hayan reservado tres personas",
      ],
      considerations: [
        "El circuito está calificado como exigente. El Toubkal es una caminata larga en altura, sin dificultad técnica, pero la jornada de cumbre dura de ocho a diez horas y arranca antes del amanecer.",
        "En marzo y principios de abril todavía puede haber nieve en la arista de cumbre y a veces hacen falta crampones: se facilitan, pero en esas fechas la ascensión es realmente invernal.",
        "Las salidas fijas no se mueven. Si la fecha no le encaja, el mismo recorrido se hace en privado en nuestro circuito Toubkal y Sáhara de 5 días, en la fecha que prefiera.",
        "El límite son catorce plazas, y las salidas de marzo son las primeras en llenarse.",
      ],
    },
    de: {
      name: "Morocco Highlights 8 Tage: Toubkal-Gipfel und Sahara",
      shortName: "Highlights 8 Tage",
      blurb:
        "Der höchste Gipfel Nordafrikas und die Dünen des Erg Chebbi in einer Reise, auf fünf festen Terminen mit je vierzehn Plätzen.",
      description:
        "Die meisten Reisenden entscheiden sich zwischen Bergen und Wüste. Diese Reise verbindet beides in acht Tagen: drei Tage am Toubkal, mit 4.167 m der höchste Punkt Nordafrikas, danach über den Tizi n'Tichka nach Süden zu einer Nacht in den Dünen des Erg Chebbi bei Merzouga. Sie startet zu festen Terminen statt auf Anfrage, und genau das macht sie zu einer Gruppenreise auf dem Niveau einer privaten: vierzehn Plätze, ein staatlich geprüfter Bergführer und ein Preis pro Platz, der gleich bleibt, wie wenige auch buchen.",
      highlights: [
        "Der Jbel Toubkal mit 4.167 m — der höchste Gipfel Nordafrikas",
        "Eine Nacht in den Dünen des Erg Chebbi bei Merzouga, per Kamel erreicht",
        "Fünf feste Termine zwischen März und April 2027 mit je vierzehn Plätzen",
        "Ein einziger geprüfter Bergführer über alle acht Tage statt eines wechselnden Fahrers pro Etappe",
        "Ein fester Preis pro Platz: Er steigt nicht, wenn nur drei Personen buchen",
      ],
      considerations: [
        "Die Reise ist als anspruchsvoll eingestuft. Der Toubkal ist eine lange Höhenwanderung ohne technische Schwierigkeiten, doch der Gipfeltag dauert acht bis zehn Stunden und beginnt vor Sonnenaufgang.",
        "Im März und Anfang April liegt am Gipfelgrat oft noch Schnee, und Steigeisen sind mitunter nötig — sie werden gestellt, aber der Aufstieg ist dann eine echte Winterbesteigung.",
        "Feste Termine lassen sich nicht verschieben. Passt das Datum nicht, führt unsere 5-tägige Toubkal-und-Sahara-Reise privat über dasselbe Gelände, an einem Datum Ihrer Wahl.",
        "Vierzehn Plätze sind das Maximum, und die März-Termine sind zuerst ausgebucht.",
      ],
    },
    it: {
      name: "Morocco Highlights 8 giorni: vetta del Toubkal e deserto del Sahara",
      shortName: "Highlights 8 giorni",
      blurb:
        "La vetta più alta del Nord Africa e le dune dell'Erg Chebbi in un unico viaggio, su cinque partenze fisse da quattordici posti.",
      description:
        "Quasi tutti scelgono tra la montagna e il deserto. Questo viaggio fa entrambe le cose in otto giorni: tre giornate sul Toubkal, 4.167 m e punto più alto del Nord Africa, poi la discesa a sud attraverso il Tizi n'Tichka fino a una notte tra le dune dell'Erg Chebbi, a Merzouga. Parte a date fisse e non su richiesta, ed è questo a renderlo un viaggio di gruppo con lo standard di uno privato: quattordici posti, una guida alpina abilitata e un prezzo a posto che non cambia per quanti pochi siano gli iscritti.",
      highlights: [
        "Il Jbel Toubkal a 4.167 m: la vetta più alta del Nord Africa",
        "Una notte tra le dune dell'Erg Chebbi, a Merzouga, raggiunte in cammello",
        "Cinque partenze fisse tra marzo e aprile 2027, da quattordici posti ciascuna",
        "Un'unica guida alpina abilitata per tutti gli otto giorni, non un autista diverso a ogni tratta",
        "Prezzo a posto fisso: non sale perché hanno prenotato solo in tre",
      ],
      considerations: [
        "Il viaggio è classificato impegnativo. Il Toubkal è una lunga camminata in quota, senza difficoltà tecniche, ma la giornata di vetta dura dalle otto alle dieci ore e inizia prima dell'alba.",
        "A marzo e inizio aprile la neve può ancora coprire la cresta sommitale e a volte servono i ramponi: vengono forniti, ma in quel periodo la salita è a tutti gli effetti invernale.",
        "Le partenze fisse non si spostano. Se la data non va bene, lo stesso itinerario si percorre in privato con il nostro viaggio Toubkal e Sahara di 5 giorni, nella data che preferite.",
        "Il limite è di quattordici posti, e le partenze di marzo sono le prime a esaurirsi.",
      ],
    },
    ar: {
      name: "جولة المغرب المميزة في 8 أيام: قمة توبقال وصحراء مرزوكة",
      shortName: "الجولة المميزة 8 أيام",
      blurb:
        "أعلى قمة في شمال أفريقيا وكثبان عرق الشبي في رحلة واحدة، على خمسة مواعيد ثابتة سعة أربعة عشر مقعداً.",
      description:
        "يختار معظم المسافرين بين الجبل والصحراء. هذه الرحلة تجمع الاثنين في ثمانية أيام: ثلاثة أيام على توبقال، 4167 متراً وأعلى نقطة في شمال أفريقيا، ثم الانحدار جنوباً عبر ممر تيزي ن تيشكا إلى ليلة بين كثبان عرق الشبي في مرزوكة. تنطلق في مواعيد محددة لا حسب الطلب، وهذا ما يجعلها رحلة جماعية بمستوى الرحلة الخاصة: أربعة عشر مقعداً، ومرشد جبلي مرخّص واحد، وسعر للمقعد لا يتغير مهما قلّ عدد المشاركين.",
      highlights: [
        "جبل توبقال على ارتفاع 4167 متراً — أعلى قمة في شمال أفريقيا",
        "ليلة بين كثبان عرق الشبي في مرزوكة، يُوصل إليها على ظهر الجمال",
        "خمسة مواعيد ثابتة بين مارس وأبريل 2027، بأربعة عشر مقعداً لكل موعد",
        "مرشد جبلي مرخّص واحد طوال الأيام الثمانية، لا سائق مختلف في كل مرحلة",
        "سعر ثابت للمقعد: لا يرتفع لأن ثلاثة أشخاص فقط حجزوا",
      ],
      considerations: [
        "الرحلة مصنّفة صعبة. توبقال مسير طويل على ارتفاع عالٍ دون صعوبة تقنية، لكن يوم القمة يستغرق من ثماني إلى عشر ساعات ويبدأ قبل الفجر.",
        "في مارس وأوائل أبريل قد يبقى الثلج على حرف القمة وتلزم أحياناً أدوات التسلق الجليدي — نوفّرها، لكن الصعود حينها شتوي بحق.",
        "المواعيد الثابتة لا تتغير. إن لم يناسبك التاريخ، فالمسار نفسه متاح بشكل خاص في رحلة توبقال والصحراء لخمسة أيام، في أي تاريخ تختاره.",
        "أربعة عشر مقعداً هو الحد الأقصى، ومواعيد مارس هي أول ما يمتلئ.",
      ],
    },
  },
  "gnaoua-world-music-festival-essaouira": {
    fr: {
      name: "Festival Gnaoua et Musiques du Monde, Essaouira",
      shortName: "Festival Gnaoua",
      blurb:
        "Trois jours de transe gnaoua face à l'Atlantique, dans une cité fortifiée vidée de ses voitures et remplie de tambours.",
      description:
        "Les maâlems se réunissent — maîtres musiciens gnaoua — sur des scènes ouvertes à travers Essaouira, aux côtés d'invités jazz et musiques du monde qui improvisent avec eux. C'est gratuit, en plein air, et la médina veille jusqu'à l'aube. Les hébergements à Essaouira se remplissent des mois à l'avance : une excursion à la journée depuis Marrakech est souvent la façon la plus réaliste d'y assister.",
      dateNote:
        "Les organisateurs annoncent chaque édition quelques mois à l'avance et n'ont pas encore publié les dates 2027. Le festival se tient fin juin depuis des années — la 27e édition a eu lieu du 25 au 27 juin 2026.",
      highlights: [
        "Des maâlems — maîtres musiciens gnaoua — sur des scènes ouvertes dans toute la médina",
        "Gratuit et en plein air : pas de billet, pas de salle, toute la ville est le festival",
        "Des invités jazz et musiques du monde qui improvisent avec les groupes gnaoua",
        "Essaouira fermée aux voitures : la ville fortifiée se traverse à pied",
        "La médina veille jusqu'à l'aube",
      ],
      considerations: [
        "Les hébergements d'Essaouira sont complets des mois à l'avance — une excursion à la journée depuis Marrakech est souvent la seule option réaliste.",
        "L'affluence est forte et la médina reste bruyante toute la nuit ; mieux vaut ne pas dormir à l'intérieur des remparts si vous avez le sommeil léger.",
        "Les dates 2027 ne sont pas publiées. Nous retenons la fenêtre de fin juin utilisée depuis des années et confirmons dès l'annonce des organisateurs.",
      ],
    },
    es: {
      name: "Festival Gnaoua y Músicas del Mundo, Essaouira",
      shortName: "Festival Gnaoua",
      blurb:
        "Tres días de trance gnaoua frente al Atlántico, en una ciudad amurallada que se vacía de coches y se llena de tambores.",
      description:
        "Los maalems se reúnen — maestros músicos gnaoua — en escenarios abiertos por toda Essaouira, junto a invitados de jazz y músicas del mundo que improvisan con ellos. Es gratuito, al aire libre, y la medina no duerme hasta el amanecer. El alojamiento en Essaouira se agota con meses de antelación, así que una excursión de un día desde Marrakech suele ser la forma más realista de verlo.",
      dateNote:
        "Los organizadores anuncian cada edición unos meses antes y aún no han publicado las fechas de 2027. El festival se celebra a finales de junio desde hace años: la 27ª edición fue del 25 al 27 de junio de 2026.",
      highlights: [
        "Maalems — maestros músicos gnaoua — en escenarios abiertos por toda la medina",
        "Gratuito y al aire libre: sin entrada, sin recinto, toda la ciudad es el festival",
        "Invitados de jazz y músicas del mundo improvisando con los grupos gnaoua",
        "Essaouira cerrada al tráfico: la ciudad amurallada se recorre a pie",
        "La medina no duerme hasta el amanecer",
      ],
      considerations: [
        "El alojamiento en Essaouira se agota con meses de antelación: una excursión de un día desde Marrakech suele ser la única opción realista.",
        "Hay mucha gente y la medina es ruidosa toda la noche; quien tenga el sueño ligero no debería dormir dentro de las murallas.",
        "Las fechas de 2027 aún no se han publicado. Mantenemos la ventana de finales de junio de años anteriores y confirmamos en cuanto los organizadores la anuncien.",
      ],
    },
    de: {
      name: "Gnaoua- und Weltmusikfestival, Essaouira",
      shortName: "Gnaoua-Festival",
      blurb:
        "Drei Tage Gnaoua-Trance am Atlantik, in einer Stadtmauer ohne Autos und voller Trommeln.",
      description:
        "Maalems kommen — Gnaoua-Meistermusiker — auf offene Bühnen in ganz Essaouira, zusammen mit Jazz- und Weltmusikgästen, die mit ihnen improvisieren. Der Eintritt ist frei, alles findet draußen statt, und die Medina bleibt bis zum Morgengrauen wach. Unterkünfte in Essaouira sind Monate im Voraus ausgebucht, daher ist ein Tagesausflug ab Marrakesch oft der realistischere Weg.",
      dateNote:
        "Die Veranstalter geben jede Ausgabe einige Monate im Voraus bekannt und haben die Termine für 2027 noch nicht veröffentlicht. Das Festival findet seit Jahren Ende Juni statt — die 27. Ausgabe lief vom 25. bis 27. Juni 2026.",
      highlights: [
        "Maalems — Gnaoua-Meistermusiker — auf offenen Bühnen in der ganzen Medina",
        "Kostenlos und unter freiem Himmel: kein Ticket, kein Veranstaltungsort, die ganze Stadt ist das Festival",
        "Jazz- und Weltmusikgäste, die mit den Gnaoua-Gruppen improvisieren",
        "Essaouira ist autofrei, die ummauerte Stadt lässt sich komplett zu Fuß erkunden",
        "Die Medina bleibt bis zum Morgengrauen wach",
      ],
      considerations: [
        "Unterkünfte in Essaouira sind Monate im Voraus ausgebucht — ein Tagesausflug ab Marrakesch ist oft der einzig realistische Weg.",
        "Es ist sehr voll und die Medina bleibt die ganze Nacht laut; wer leicht aufwacht, sollte nicht innerhalb der Mauern übernachten.",
        "Die Termine für 2027 stehen noch nicht fest. Wir halten das seit Jahren übliche Ende-Juni-Fenster und bestätigen, sobald die Veranstalter es bekannt geben.",
      ],
    },
    it: {
      name: "Festival Gnaoua e Musiche del Mondo, Essaouira",
      shortName: "Festival Gnaoua",
      blurb:
        "Tre giorni di trance gnaoua sull'Atlantico, in una città murata svuotata di auto e piena di tamburi.",
      description:
        "I maalem si riuniscono — maestri musicisti gnaoua — su palchi aperti in tutta Essaouira, insieme a ospiti jazz e world music che improvvisano con loro. È gratuito, all'aperto, e la medina resta sveglia fino all'alba. Gli alloggi a Essaouira si esauriscono con mesi di anticipo, quindi una gita in giornata da Marrakech è spesso il modo più realistico per viverlo.",
      dateNote:
        "Gli organizzatori annunciano ogni edizione qualche mese prima e non hanno ancora pubblicato le date del 2027. Il festival si tiene a fine giugno da anni: la 27ª edizione si è svolta dal 25 al 27 giugno 2026.",
      highlights: [
        "Maalem — maestri musicisti gnaoua — su palchi aperti in tutta la medina",
        "Gratuito e all'aperto: nessun biglietto, nessuna sala, tutta la città è il festival",
        "Ospiti jazz e world music che improvvisano con i gruppi gnaoua",
        "Essaouira chiusa alle auto: la città murata si attraversa a piedi",
        "La medina resta sveglia fino all'alba",
      ],
      considerations: [
        "Gli alloggi a Essaouira si esauriscono con mesi di anticipo: una gita in giornata da Marrakech è spesso l'unica opzione realistica.",
        "C'è molta folla e la medina resta rumorosa tutta la notte; chi ha il sonno leggero non dovrebbe dormire dentro le mura.",
        "Le date del 2027 non sono ancora pubblicate. Manteniamo la finestra di fine giugno usata da anni e confermiamo appena gli organizzatori annunciano.",
      ],
    },
    ar: {
      name: "مهرجان كناوة وموسيقى العالم، الصويرة",
      shortName: "مهرجان كناوة",
      blurb:
        "ثلاثة أيام من إيقاع كناوة على المحيط الأطلسي، في مدينة مسوَّرة تخلو من السيارات وتمتلئ بالطبول.",
      description:
        "يجتمع المعلمون — أساتذة موسيقى كناوة — على منصات مفتوحة في أنحاء الصويرة، إلى جانب ضيوف من الجاز وموسيقى العالم يرتجلون معهم. الدخول مجاني، والعروض في الهواء الطلق، والمدينة العتيقة تسهر حتى الفجر. أماكن الإقامة في الصويرة تُحجز قبل أشهر، لذا فإن رحلة يومية من مراكش غالبًا ما تكون الطريقة الأكثر واقعية للحضور.",
      dateNote:
        "يعلن المنظمون عن كل دورة قبل أشهر قليلة، ولم ينشروا بعد مواعيد 2027. يُقام المهرجان في أواخر يونيو منذ سنوات — أُقيمت الدورة السابعة والعشرون من 25 إلى 27 يونيو 2026.",
      highlights: [
        "المعلمون — كبار موسيقيي كناوة — على مسارح مفتوحة في أنحاء المدينة القديمة",
        "مجاني وفي الهواء الطلق: بلا تذكرة وبلا قاعة، المدينة كلها هي المهرجان",
        "ضيوف من الجاز وموسيقى العالم يرتجلون مع فرق كناوة",
        "الصويرة مغلقة أمام السيارات، فالمدينة المسوّرة تُقطع سيرًا على الأقدام",
        "المدينة القديمة تسهر حتى الفجر",
      ],
      considerations: [
        "أماكن الإقامة في الصويرة تُحجز بالكامل قبل أشهر — رحلة يوم واحد من مراكش غالبًا هي الخيار الواقعي الوحيد.",
        "الزحام شديد والمدينة القديمة صاخبة طوال الليل؛ من ينام بسهولة خفيفة يُفضّل ألا يبيت داخل الأسوار.",
        "تواريخ 2027 لم تُنشر بعد. نعتمد نافذة أواخر يونيو المعتادة منذ سنوات ونؤكّدها فور إعلان المنظمين.",
      ],
    },
  },

  "marrakech-international-marathon": {
    fr: {
      name: "Marathon International de Marrakech",
      shortName: "Marathon de Marrakech",
      blurb:
        "La 37e édition longe les remparts et la palmeraie dans la fraîcheur de janvier à Marrakech.",
      description:
        "Un marathon et un semi-marathon à travers les murailles de la vieille ville, la Palmeraie et les avenues de Guéliz, avec environ 15 000 coureurs. Janvier est le mois le plus frais pour courir et aussi la pleine saison du trek hivernal au Toubkal : un week-end de course s'associe naturellement à quelques jours dans l'Atlas.",
      highlights: [
        "Un parcours le long des remparts, dans la Palmeraie et sur les avenues de Guéliz",
        "Marathon et semi-marathon, environ 15 000 coureurs",
        "Janvier est le mois le plus frais de l'année marocaine pour courir",
        "Les mêmes semaines sont la pleine saison de trek hivernal au Toubkal : un week-end de course se combine avec l'Atlas",
      ],
      considerations: [
        "Les hôtels de Marrakech augmentent leurs tarifs et se remplissent pour le week-end de la course : réservez avant le Nouvel An.",
        "Des routes sont fermées le matin de la course et les transferts doivent être organisés en conséquence.",
        "Associer la course à un trek au Toubkal signifie des conditions hivernales en montagne : crampons et piolet, pas une marche d'été.",
      ],
    },
    es: {
      name: "Maratón Internacional de Marrakech",
      shortName: "Maratón de Marrakech",
      blurb:
        "La 37ª edición recorre las murallas y el palmeral en el fresco enero de Marrakech.",
      description:
        "Un maratón y un medio maratón por las murallas de la ciudad vieja, el Palmeral y las avenidas de Gueliz, con unos 15 000 corredores. Enero es el mes más fresco para correr y también plena temporada de trekking invernal en el Toubkal, así que un fin de semana de carrera combina de forma natural con unos días en el Atlas.",
      highlights: [
        "Un recorrido por las murallas, el Palmeral y las avenidas de Gueliz",
        "Maratón y media maratón, unos 15 000 corredores",
        "Enero es el mes más fresco del año marroquí para correr",
        "Esas mismas semanas son plena temporada de trekking invernal en el Toubkal: un fin de semana de carrera combina con el Atlas",
      ],
      considerations: [
        "Los hoteles de Marrakech suben precios y se llenan el fin de semana de la carrera; reserve antes de Año Nuevo.",
        "Los cortes de tráfico reorganizan el centro la mañana de la carrera y los traslados deben planificarse en torno a ellos.",
        "Combinar la carrera con el Toubkal implica condiciones invernales en la montaña: crampones y piolet, no una caminata de verano.",
      ],
    },
    de: {
      name: "Marrakesch-Marathon",
      shortName: "Marrakesch-Marathon",
      blurb:
        "Die 37. Ausgabe führt an Stadtmauern und Palmenhainen entlang, in der Kühle des Januars.",
      description:
        "Ein Marathon und ein Halbmarathon durch die alten Stadtmauern, die Palmeraie und die Alleen von Gueliz, mit rund 15.000 Läuferinnen und Läufern. Der Januar ist der kühlste Laufmonat und zugleich Hochsaison für Winter-Trekking am Toubkal — ein Rennwochenende lässt sich gut mit ein paar Tagen im Atlas verbinden.",
      highlights: [
        "Eine Strecke entlang der Stadtmauern, durch die Palmeraie und über die Alleen von Gueliz",
        "Marathon und Halbmarathon mit rund 15.000 Läuferinnen und Läufern",
        "Der Januar ist der kühlste Laufmonat des marokkanischen Jahres",
        "Dieselben Wochen sind Hochsaison für Winter-Trekking am Toubkal — ein Rennwochenende lässt sich mit dem Atlas verbinden",
      ],
      considerations: [
        "Die Hotels in Marrakesch erhöhen die Preise und sind zum Rennwochenende ausgebucht; buchen Sie vor dem Jahreswechsel.",
        "Straßensperrungen verändern das Zentrum am Renntag, Transfers müssen entsprechend geplant werden.",
        "Rennen plus Toubkal bedeutet Winterbedingungen am Berg: Steigeisen und Eispickel, keine Sommerwanderung.",
      ],
    },
    it: {
      name: "Maratona Internazionale di Marrakech",
      shortName: "Maratona di Marrakech",
      blurb:
        "La 37ª edizione corre lungo le mura e i palmeti nel fresco gennaio di Marrakech.",
      description:
        "Una maratona e una mezza maratona attraverso le mura della città vecchia, la Palmeraie e i viali di Gueliz, con circa 15.000 partecipanti. Gennaio è il mese più fresco per correre ed è anche piena stagione di trekking invernale sul Toubkal: un weekend di gara si abbina naturalmente a qualche giorno sull'Atlante.",
      highlights: [
        "Un percorso lungo le mura, nella Palmeraie e sui viali di Gueliz",
        "Maratona e mezza maratona, circa 15.000 partecipanti",
        "Gennaio è il mese più fresco dell'anno marocchino per correre",
        "Le stesse settimane sono piena stagione di trekking invernale sul Toubkal: un weekend di gara si abbina all'Atlante",
      ],
      considerations: [
        "Gli hotel di Marrakech alzano le tariffe e si riempiono per il weekend della gara; prenotate prima di Capodanno.",
        "Le chiusure stradali riorganizzano il centro la mattina della gara e i trasferimenti vanno pianificati di conseguenza.",
        "Abbinare la gara al Toubkal significa condizioni invernali in montagna: ramponi e piccozza, non una camminata estiva.",
      ],
    },
    ar: {
      name: "ماراطون مراكش الدولي",
      shortName: "ماراطون مراكش",
      blurb:
        "الدورة السابعة والثلاثون تمر بالأسوار والنخيل في برودة يناير بمراكش.",
      description:
        "ماراطون ونصف ماراطون عبر أسوار المدينة القديمة والنخيل وشوارع كليز، بمشاركة نحو 15 ألف عدّاء. يناير هو أبرد شهور الجري، وهو أيضًا موسم الترحال الشتوي في توبقال، لذا يتلاءم أسبوع السباق تمامًا مع بضعة أيام في الأطلس.",
      highlights: [
        "مسار يمرّ بالأسوار القديمة والنخيل وشوارع جليز",
        "ماراطون ونصف ماراطون بمشاركة نحو 15,000 عدّاء",
        "يناير هو أبرد شهور السنة المغربية للجري",
        "الأسابيع نفسها هي ذروة موسم تسلق توبقال شتاءً، فعطلة السباق تُجمع مع الأطلس",
      ],
      considerations: [
        "فنادق مراكش ترفع أسعارها وتمتلئ في عطلة السباق؛ احجز قبل رأس السنة.",
        "إغلاق الطرق يغيّر وسط المدينة صباح السباق، وينبغي تخطيط التنقلات على أساسه.",
        "الجمع بين السباق وتوبقال يعني ظروفًا شتوية في الجبل: كرامبون وفأس جليد، لا نزهة صيفية.",
      ],
    },
  },

  "rose-festival-kelaat-mgouna": {
    fr: {
      name: "Festival des Roses, Kelaat M'Gouna",
      shortName: "Festival des Roses",
      blurb:
        "La vallée du Dadès récolte ses roses de Damas, et Kelaat M'Gouna fête trois jours durant au milieu des pétales.",
      description:
        "Le fond de vallée entre Kelaat M'Gouna et Boumalne Dadès cultive la rose de Damas pour l'eau et l'huile de rose. Au pic de la récolte, la ville organise un moussem : chars, danses Aït Atta, élection de la reine des roses et souks vendant le distillat de la saison. Le site se trouve directement sur la route de Marrakech au Sahara : un circuit désert bien calé traverse la récolte.",
      dateNote:
        "Le festival suit la récolte des roses : les organisateurs ne confirment les dates que quelques semaines à l'avance. Il tombe dans les deux premières semaines de mai chaque année récente — l'édition 2026 s'est tenue du 7 au 10 mai.",
      highlights: [
        "La récolte des roses de Damas à son apogée dans toute la vallée du Dadès",
        "Un moussem avec chars, danses Aït Atta et couronnement d'une reine des roses",
        "Des souks vendant l'eau et l'huile de rose distillées sur place",
        "Kelaat M'Gouna est sur la route Marrakech-Sahara : un circuit désert bien calé la traverse",
      ],
      considerations: [
        "Les dates ne sont confirmées que quelques semaines avant, car elles suivent la récolte : un voyage bâti autour comporte un vrai risque.",
        "La ville est petite et se remplit entièrement ; la plupart des visiteurs logent à Boumalne Dadès ou passent dans le cadre d'un circuit.",
        "Les roses sont une culture de rente : la cueillette commence avant l'aube et les champs sont récoltés en milieu de matinée.",
      ],
    },
    es: {
      name: "Festival de las Rosas, Kelaat M'Gouna",
      shortName: "Festival de las Rosas",
      blurb:
        "El valle del Dades recoge sus rosas de Damasco y Kelaat M'Gouna celebra tres días entre pétalos.",
      description:
        "El fondo del valle entre Kelaat M'Gouna y Boumalne Dades cultiva rosa de Damasco para agua y aceite de rosas. Cuando la cosecha alcanza su punto álgido, el pueblo celebra un moussem: carrozas, danzas Ait Atta, una reina de las rosas y zocos que venden el destilado de la temporada. Está justo en la carretera de Marrakech al Sáhara, así que un tour del desierto bien planificado atraviesa la cosecha.",
      dateNote:
        "El festival sigue la cosecha de la rosa, así que los organizadores confirman las fechas solo unas semanas antes. Ha caído en las dos primeras semanas de mayo todos los años recientes — la edición de 2026 fue del 7 al 10 de mayo.",
      highlights: [
        "La cosecha de rosa de Damasco en su punto álgido en todo el valle del Dades",
        "Un moussem con carrozas, danzas Ait Atta y la coronación de una reina de las rosas",
        "Zocos con agua y aceite de rosas destilados localmente",
        "Kelaat M'Gouna está en la carretera Marrakech-Sáhara: un circuito por el desierto bien planificado pasa por allí",
      ],
      considerations: [
        "Las fechas se confirman solo unas semanas antes porque siguen la cosecha, así que un viaje planificado en torno a ellas conlleva riesgo real.",
        "El pueblo es pequeño y se llena por completo; la mayoría se aloja en Boumalne Dades o pasa de camino al desierto.",
        "Las rosas son un cultivo comercial: la recogida empieza antes del amanecer y los campos quedan cosechados a media mañana.",
      ],
    },
    de: {
      name: "Rosenfest, Kelaat M'Gouna",
      shortName: "Rosenfest",
      blurb:
        "Das Dades-Tal erntet seine Damaszener-Rosen, und Kelaat M'Gouna feiert drei Tage lang in den Blüten.",
      description:
        "Der Talboden zwischen Kelaat M'Gouna und Boumalne Dades baut Damaszener-Rosen für Rosenwasser und -öl an. Auf dem Höhepunkt der Ernte richtet die Stadt ein Moussem aus: Umzugswagen, Ait-Atta-Tänze, eine Rosenkönigin und Souks mit dem Destillat der Saison. Der Ort liegt direkt an der Straße von Marrakesch in die Sahara — eine gut getaktete Wüstentour fährt mitten durch die Ernte.",
      dateNote:
        "Das Fest richtet sich nach der Rosenernte, daher bestätigen die Veranstalter die Termine erst wenige Wochen vorher. In allen jüngeren Jahren lag es in den ersten beiden Maiwochen — die Ausgabe 2026 fand vom 7. bis 10. Mai statt.",
      highlights: [
        "Die Damaszener-Rosenernte auf ihrem Höhepunkt im gesamten Dades-Tal",
        "Ein Moussem mit Umzugswagen, Ait-Atta-Tänzen und der Krönung einer Rosenkönigin",
        "Souks mit lokal destilliertem Rosenwasser und Rosenöl",
        "Kelaat M'Gouna liegt direkt an der Straße Marrakesch–Sahara: eine gut getimte Wüstentour fährt mitten hindurch",
      ],
      considerations: [
        "Die Termine stehen erst wenige Wochen vorher fest, weil sie der Ernte folgen — eine darauf gebaute Reise trägt ein echtes Datumsrisiko.",
        "Der Ort ist klein und komplett ausgebucht; die meisten übernachten in Boumalne Dades oder kommen auf einer Wüstenroute durch.",
        "Rosen sind eine Nutzpflanze: Gepflückt wird vor Sonnenaufgang, am späten Vormittag sind die Felder abgeerntet.",
      ],
    },
    it: {
      name: "Festival delle Rose, Kelaat M'Gouna",
      shortName: "Festival delle Rose",
      blurb:
        "La valle del Dades raccoglie le sue rose damascene e Kelaat M'Gouna festeggia tre giorni tra i petali.",
      description:
        "Il fondovalle tra Kelaat M'Gouna e Boumalne Dades coltiva rose damascene per acqua e olio di rosa. Quando la raccolta è al culmine, il paese organizza un moussem: carri, danze Ait Atta, una regina delle rose e souk che vendono il distillato della stagione. Si trova proprio sulla strada da Marrakech al Sahara, quindi un tour del deserto ben programmato attraversa la raccolta.",
      dateNote:
        "Il festival segue la raccolta delle rose, quindi gli organizzatori confermano le date solo poche settimane prima. È caduto nelle prime due settimane di maggio in tutti gli anni recenti — l'edizione 2026 si è tenuta dal 7 al 10 maggio.",
      highlights: [
        "La raccolta della rosa damascena al culmine in tutta la valle del Dades",
        "Un moussem con carri, danze Ait Atta e l'incoronazione di una regina delle rose",
        "Suq che vendono acqua e olio di rose distillati sul posto",
        "Kelaat M'Gouna è sulla strada Marrakech-Sahara: un tour del deserto ben programmato ci passa in mezzo",
      ],
      considerations: [
        "Le date si confermano solo poche settimane prima perché seguono il raccolto: un viaggio costruito attorno comporta un rischio reale.",
        "Il paese è piccolo e si riempie completamente; la maggior parte pernotta a Boumalne Dades o passa lungo un itinerario del deserto.",
        "Le rose sono una coltura da reddito: la raccolta inizia prima dell'alba e i campi sono spogli entro metà mattina.",
      ],
    },
    ar: {
      name: "مهرجان الورود، قلعة مݣونة",
      shortName: "مهرجان الورود",
      blurb:
        "وادي دادس يجني ورده الدمشقي، وقلعة مݣونة تحتفل ثلاثة أيام بين البتلات.",
      description:
        "يزرع قاع الوادي بين قلعة مݣونة وبومالن دادس الورد الدمشقي لاستخراج ماء الورد وزيته. وحين يبلغ الجني ذروته تقيم المدينة موسمًا: عربات مزيّنة، ورقصات آيت عطا، وملكة للورد، وأسواق تبيع مقطّر الموسم. يقع المكان مباشرة على طريق مراكش نحو الصحراء، لذا فإن جولة صحراوية بتوقيت مناسب تمر عبر موسم الجني.",
      dateNote:
        "يتبع المهرجان موسم جني الورد، لذا لا يؤكد المنظمون المواعيد إلا قبل أسابيع قليلة. وقد جرى في الأسبوعين الأولين من ماي في كل السنوات الأخيرة — أقيمت دورة 2026 من 7 إلى 10 ماي.",
      highlights: [
        "ذروة موسم جني الورد الدمشقي في وادي دادس بأكمله",
        "موسم بعربات مزيّنة ورقصات آيت عطا وتتويج ملكة الورد",
        "أسواق تبيع ماء الورد وزيته المقطّرين محليًا",
        "قلعة مݣونة تقع على طريق مراكش–الصحراء، فجولة صحراوية بتوقيت مناسب تمرّ منها",
      ],
      considerations: [
        "التواريخ لا تُؤكَّد إلا قبل أسابيع قليلة لأنها تتبع الحصاد، فبناء رحلة حولها ينطوي على مخاطرة حقيقية.",
        "البلدة صغيرة وتمتلئ تمامًا؛ معظم الزوار يبيتون في بومالن دادس أو يمرّون ضمن برنامج صحراوي.",
        "الورد محصول تجاري: الجني يبدأ قبل الفجر وتُقطف الحقول قبل منتصف الصباح.",
      ],
    },
  },

  "imilchil-marriage-moussem": {
    fr: {
      name: "Moussem des Fiançailles d'Imilchil",
      shortName: "Moussem d'Imilchil",
      blurb:
        "Un moussem du Haut Atlas où les familles Aït Haddidou se retrouvent pour commercer, célébrer et, par tradition, se fiancer.",
      description:
        "Tenu sur le plateau près d'Imilchil à environ 2 200 m, le moussem est d'abord une foire au bétail et aux marchandises pour les villages Aït Haddidou alentour, et ensuite le rassemblement de fiançailles qui l'a rendu célèbre. C'est isolé — l'accès est une longue route de montagne — et c'est un événement communautaire vivant plutôt qu'un spectacle, ce qui en fait précisément la valeur.",
      dateNote:
        "Fixé par la communauté Aït Haddidou et lié au calendrier de transhumance de fin d'été plutôt qu'à une date fixe. Il se tient généralement en septembre ; les jours exacts sont annoncés localement, souvent quelques semaines seulement à l'avance.",
      highlights: [
        "Un plateau du Haut Atlas à environ 2 200 m, loin des circuits touristiques",
        "D'abord une foire au bétail et aux marchandises pour les villages Aït Haddidou",
        "Le rassemblement de fiançailles qui l'a rendu célèbre, toujours mené par la communauté",
        "Un événement communautaire réel, non un spectacle monté pour les visiteurs",
      ],
      considerations: [
        "C'est isolé : l'accès est une longue route de montagne, et ce trajet représente l'essentiel de l'engagement.",
        "Les jours exacts sont fixés localement et souvent annoncés quelques semaines avant : difficile d'y caler un vol.",
        "L'hébergement autour d'Imilchil est sommaire et limité. Prévoyez un gîte ou une chambre chez l'habitant, pas un hôtel.",
        "C'est une occasion communautaire, pas un spectacle. Ne photographiez les personnes qu'avec leur accord.",
      ],
    },
    es: {
      name: "Moussem de los Novios de Imilchil",
      shortName: "Moussem de Imilchil",
      blurb:
        "Un moussem del Alto Atlas donde las familias Ait Haddidou se reúnen para comerciar, celebrar y, por tradición, prometerse.",
      description:
        "Celebrado en la meseta cerca de Imilchil, a unos 2.200 m, el moussem es ante todo una feria de ganado y mercancías para las aldeas Ait Haddidou de los alrededores, y después el encuentro de esponsales que lo hizo famoso. Es remoto — el acceso es una larga carretera de montaña — y es un acto comunitario real, no un espectáculo, que es justo lo que lo hace valioso.",
      dateNote:
        "Lo fija la comunidad Ait Haddidou y está ligado al calendario ganadero de finales de verano, no a una fecha fija. Suele celebrarse en septiembre; los días exactos se anuncian localmente, a menudo con solo unas semanas de antelación.",
      highlights: [
        "Una meseta del Alto Atlas a unos 2200 m, fuera del circuito turístico",
        "Ante todo una feria de ganado y mercancías para los pueblos Ait Haddidou",
        "La reunión de compromisos que le dio fama, aún gestionada por la comunidad",
        "Un acontecimiento comunitario real, no un espectáculo montado para visitantes",
      ],
      considerations: [
        "Es remoto: el acceso es una larga carretera de montaña, y ese trayecto es la mayor parte del esfuerzo.",
        "Los días exactos se fijan localmente y suelen anunciarse con pocas semanas: difícil planificar un vuelo.",
        "El alojamiento cerca de Imilchil es básico y limitado. Espere un gîte o una habitación en el pueblo, no un hotel.",
        "Es una ocasión comunitaria, no un espectáculo. Fotografíe a las personas solo con su permiso.",
      ],
    },
    de: {
      name: "Hochzeits-Moussem von Imilchil",
      shortName: "Imilchil-Moussem",
      blurb:
        "Ein Moussem im Hohen Atlas, bei dem sich Ait-Haddidou-Familien zum Handeln, Feiern und traditionell zum Verloben treffen.",
      description:
        "Auf der Hochebene bei Imilchil auf rund 2.200 m ist das Moussem zuerst ein Vieh- und Warenmarkt für die umliegenden Ait-Haddidou-Dörfer und erst dann das Verlobungstreffen, für das es berühmt ist. Es liegt abgelegen — die Anfahrt ist eine lange Bergstrecke — und es ist ein echtes Gemeinschaftsereignis statt einer Vorführung, was genau seinen Wert ausmacht.",
      dateNote:
        "Wird von der Ait-Haddidou-Gemeinschaft festgelegt und richtet sich nach dem spätsommerlichen Weidekalender, nicht nach einem festen Datum. Meist im September; die genauen Tage werden vor Ort bekannt gegeben, oft nur wenige Wochen vorher.",
      highlights: [
        "Ein Hochplateau im Hohen Atlas auf rund 2.200 m, abseits der Touristenrouten",
        "In erster Linie ein Vieh- und Warenmarkt für die umliegenden Ait-Haddidou-Dörfer",
        "Das Verlobungstreffen, für das er berühmt ist — nach wie vor von der Gemeinschaft getragen",
        "Ein echtes Gemeinschaftsereignis, keine für Besucher inszenierte Vorführung",
      ],
      considerations: [
        "Abgelegen: Die Anfahrt ist eine lange Bergstrecke, und diese Fahrt ist der größte Teil des Aufwands.",
        "Die genauen Tage werden lokal festgelegt und oft erst wenige Wochen vorher bekannt gegeben — schwer, einen Flug darauf zu planen.",
        "Unterkünfte bei Imilchil sind einfach und knapp. Erwarten Sie ein Gîte oder ein Dorfzimmer, kein Hotel.",
        "Es ist ein Gemeinschaftsanlass, keine Show. Fotografieren Sie Menschen nur mit deren Einverständnis.",
      ],
    },
    it: {
      name: "Moussem dei Fidanzamenti di Imilchil",
      shortName: "Moussem di Imilchil",
      blurb:
        "Un moussem dell'Alto Atlante dove le famiglie Ait Haddidou si ritrovano per commerciare, festeggiare e, per tradizione, fidanzarsi.",
      description:
        "Sull'altopiano vicino a Imilchil, a circa 2.200 m, il moussem è prima di tutto una fiera del bestiame e delle merci per i villaggi Ait Haddidou circostanti, e poi il raduno dei fidanzamenti che lo ha reso celebre. È remoto — l'accesso è una lunga strada di montagna — ed è un vero evento comunitario più che uno spettacolo, ed è proprio questo a renderlo prezioso.",
      dateNote:
        "Stabilito dalla comunità Ait Haddidou e legato al calendario della transumanza di fine estate più che a una data fissa. Di solito si tiene a settembre; i giorni esatti sono annunciati localmente, spesso solo poche settimane prima.",
      highlights: [
        "Un altopiano dell'Alto Atlante a circa 2.200 m, fuori dai circuiti turistici",
        "Prima di tutto una fiera del bestiame e delle merci per i villaggi Ait Haddidou",
        "Il raduno dei fidanzamenti che l'ha reso celebre, ancora gestito dalla comunità",
        "Un evento comunitario reale, non uno spettacolo allestito per i visitatori",
      ],
      considerations: [
        "È remoto: l'accesso è una lunga strada di montagna, e quel viaggio è gran parte dell'impegno.",
        "I giorni esatti sono fissati localmente e spesso annunciati poche settimane prima: difficile programmarci un volo.",
        "Gli alloggi vicino a Imilchil sono essenziali e limitati. Aspettatevi un gîte o una stanza in paese, non un hotel.",
        "È un'occasione comunitaria, non uno spettacolo. Fotografate le persone solo con il loro consenso.",
      ],
    },
    ar: {
      name: "موسم الخطوبة بإميلشيل",
      shortName: "موسم إميلشيل",
      blurb:
        "موسم في الأطلس الكبير تجتمع فيه عائلات آيت حديدو للتجارة والاحتفال، وللخطوبة بحكم التقليد.",
      description:
        "يُقام الموسم على الهضبة قرب إميلشيل على ارتفاع نحو 2200 متر، وهو أولًا سوق للماشية والسلع لقرى آيت حديدو المجاورة، وثانيًا تجمّع الخطوبة الذي اشتهر به. المكان ناءٍ — الوصول إليه طريق جبلي طويل — وهو مناسبة مجتمعية حقيقية لا عرضًا سياحيًا، وهذا بالضبط ما يجعله يستحق العناء.",
      dateNote:
        "تحدده جماعة آيت حديدو ويرتبط بتقويم الرعي في أواخر الصيف لا بتاريخ ثابت. يُقام عادة في شتنبر، وتُعلن أيامه بالضبط محليًا، غالبًا قبل أسابيع قليلة فقط.",
      highlights: [
        "هضبة في الأطلس الكبير على نحو 2200 م، بعيدًا عن المسارات السياحية",
        "هو أولًا سوق للماشية والبضائع لقرى آيت حديدو المحيطة",
        "تجمّع الخطبة الذي اشتهر به، ولا يزال تديره الجماعة نفسها",
        "مناسبة مجتمعية حقيقية، لا عرضًا مُعدًّا للزوار",
      ],
      considerations: [
        "المكان نائٍ: الوصول عبر طريق جبلي طويل، وهذه الرحلة هي الجزء الأكبر من الالتزام.",
        "الأيام تُحدَّد محليًا وغالبًا لا تُعلن إلا قبل أسابيع، ويصعب حجز رحلة طيران على أساسها.",
        "الإقامة قرب إملشيل بسيطة ومحدودة. توقّع دار ضيافة أو غرفة في القرية، لا فندقًا.",
        "هي مناسبة مجتمعية لا عرض فرجة. لا تصوّر الناس إلا بموافقتهم.",
      ],
    },
  },

  "ramadan-and-eid-al-fitr": {
    fr: {
      name: "Ramadan et Aïd el-Fitr",
      shortName: "Ramadan",
      blurb:
        "Le rythme du pays change : des journées calmes, et des villes qui s'animent après le coucher du soleil.",
      description:
        "Voyager pendant le Ramadan est tout à fait possible et peut être la période la plus marquante pour découvrir le Maroc, mais la journée se déroule autrement. Beaucoup de restaurants ferment jusqu'au coucher du soleil, musées et administrations réduisent leurs horaires, et la médina s'éveille vraiment après le canon de l'iftar. Le trek n'est pas affecté — nos guides organisent repas et eau en conséquence — et les villages de l'Atlas rompent le jeûne ensemble d'une façon que les visiteurs voient rarement.",
      dateNote:
        "Le Maroc fixe le Ramadan et l'Aïd par l'observation locale de la lune, via le ministère des Habous et des Affaires islamiques : le début et la fin peuvent bouger d'un jour dans un sens ou dans l'autre, parfois annoncés la veille au soir.",
      highlights: [
        "La médina s'anime vraiment après le canon de l'iftar, chaque soir",
        "Les villages de l'Atlas rompent le jeûne ensemble, un moment que les visiteurs voient rarement",
        "Le trek n'est pas affecté : nos guides organisent repas et eau en conséquence",
        "L'Aïd el-Fitr clôt le mois par la plus grande fête de l'année marocaine",
      ],
      considerations: [
        "De nombreux restaurants restent fermés jusqu'au coucher du soleil, et musées et administrations réduisent leurs horaires.",
        "Les villes sont calmes et lentes en journée ; l'énergie arrive après la nuit tombée, ce qui convient à certains voyages et pas à d'autres.",
        "Les dates de début et de fin dépendent de l'observation locale de la lune et sont parfois annoncées la veille au soir.",
        "L'Aïd lui-même ferme une grande partie du pays pendant deux à trois jours, transports et commerces compris.",
      ],
    },
    es: {
      name: "Ramadán y Eid al-Fitr",
      shortName: "Ramadán",
      blurb:
        "El ritmo del país cambia: días tranquilos y ciudades que cobran vida después del atardecer.",
      description:
        "Viajar durante el Ramadán es perfectamente posible y puede ser la época más memorable para conocer Marruecos, pero el día transcurre de otra manera. Muchos restaurantes cierran hasta la puesta de sol, museos y oficinas reducen su horario, y la medina despierta de verdad tras el cañonazo del iftar. El trekking no se ve afectado — nuestros guías planifican comida y agua en consecuencia — y los pueblos del Atlas rompen el ayuno juntos de una forma que los visitantes rara vez presencian.",
      dateNote:
        "Marruecos fija el Ramadán y el Eid por avistamiento local de la luna, a través del Ministerio de Habices y Asuntos Islámicos, así que el inicio y el final pueden moverse un día en cualquier dirección, a veces anunciados solo la víspera.",
      highlights: [
        "La medina cobra vida de verdad tras el cañonazo del iftar, cada tarde",
        "Los pueblos del Atlas rompen el ayuno juntos, algo que los visitantes rara vez ven",
        "El trekking no se ve afectado: nuestros guías organizan comida y agua en consecuencia",
        "El Eid al-Fitr cierra el mes con la mayor celebración del año marroquí",
      ],
      considerations: [
        "Muchos restaurantes permanecen cerrados hasta el atardecer, y museos y oficinas reducen horarios.",
        "Las ciudades están tranquilas y lentas de día; la energía llega tras el anochecer, lo que encaja con unos viajes y no con otros.",
        "Las fechas de inicio y fin dependen del avistamiento local de la luna y a veces se anuncian la víspera.",
        "El propio Eid cierra buena parte del país dos o tres días, incluidos transportes y la mayoría de comercios.",
      ],
    },
    de: {
      name: "Ramadan und Eid al-Fitr",
      shortName: "Ramadan",
      blurb:
        "Der Rhythmus des Landes ändert sich: stille Tage und Städte, die nach Sonnenuntergang aufblühen.",
      description:
        "Eine Reise im Ramadan ist ohne Weiteres möglich und kann die eindrücklichste Zeit für Marokko sein, nur läuft der Tag anders. Viele Restaurants bleiben bis Sonnenuntergang geschlossen, Museen und Ämter haben kürzere Zeiten, und die Medina erwacht erst nach dem Iftar-Kanonenschuss richtig. Das Trekking ist davon unberührt — unsere Guides planen Verpflegung und Wasser entsprechend — und die Atlasdörfer brechen das Fasten gemeinsam, auf eine Weise, die Gäste selten zu sehen bekommen.",
      dateNote:
        "Marokko legt Ramadan und Eid durch lokale Mondsichtung über das Ministerium für Stiftungen und islamische Angelegenheiten fest. Beginn und Ende können sich um einen Tag in beide Richtungen verschieben, manchmal erst am Vorabend angekündigt.",
      highlights: [
        "Die Medina erwacht jeden Abend erst nach dem Iftar-Kanonenschuss richtig",
        "Die Atlasdörfer brechen das Fasten gemeinsam — etwas, das Reisende selten erleben",
        "Trekking ist nicht betroffen: Unsere Guides planen Verpflegung und Wasser entsprechend",
        "Eid al-Fitr beschließt den Monat mit dem größten Fest des marokkanischen Jahres",
      ],
      considerations: [
        "Viele Restaurants bleiben bis Sonnenuntergang geschlossen, Museen und Ämter haben verkürzte Öffnungszeiten.",
        "Tagsüber sind die Städte ruhig und langsam; die Energie kommt nach Einbruch der Dunkelheit — das passt zu manchen Reisen und zu anderen nicht.",
        "Anfang und Ende richten sich nach der lokalen Mondsichtung und werden teils erst am Vorabend bekannt gegeben.",
        "Eid selbst legt zwei bis drei Tage lang weite Teile des Landes still, samt Verkehr und den meisten Geschäften.",
      ],
    },
    it: {
      name: "Ramadan e Eid al-Fitr",
      shortName: "Ramadan",
      blurb:
        "Il ritmo del paese cambia: giornate tranquille e città che si animano dopo il tramonto.",
      description:
        "Viaggiare durante il Ramadan è del tutto possibile e può essere il periodo più memorabile per scoprire il Marocco, ma la giornata scorre diversamente. Molti ristoranti restano chiusi fino al tramonto, musei e uffici riducono gli orari, e la medina si sveglia davvero dopo il colpo di cannone dell'iftar. Il trekking non ne risente — le nostre guide organizzano cibo e acqua di conseguenza — e i villaggi dell'Atlante rompono il digiuno insieme, in un modo che i visitatori vedono di rado.",
      dateNote:
        "Il Marocco fissa Ramadan ed Eid con l'avvistamento locale della luna, tramite il Ministero degli Habous e degli Affari islamici: inizio e fine possono spostarsi di un giorno in entrambe le direzioni, a volte annunciati solo la sera prima.",
      highlights: [
        "La medina si anima davvero dopo il colpo di cannone dell'iftar, ogni sera",
        "I villaggi dell'Atlante rompono il digiuno insieme, qualcosa che i visitatori vedono di rado",
        "Il trekking non è influenzato: le nostre guide organizzano cibo e acqua di conseguenza",
        "L'Eid al-Fitr chiude il mese con la festa più grande dell'anno marocchino",
      ],
      considerations: [
        "Molti ristoranti restano chiusi fino al tramonto, e musei e uffici riducono gli orari.",
        "Di giorno le città sono quiete e lente; l'energia arriva dopo il buio, il che si adatta ad alcuni viaggi e non ad altri.",
        "Inizio e fine dipendono dall'avvistamento locale della luna e a volte si annunciano la sera prima.",
        "L'Eid stesso ferma buona parte del paese per due o tre giorni, trasporti e gran parte dei negozi compresi.",
      ],
    },
    ar: {
      name: "رمضان وعيد الفطر",
      shortName: "رمضان",
      blurb:
        "يتغيّر إيقاع البلاد: نهار هادئ، ومدن تدبّ فيها الحياة بعد الغروب.",
      description:
        "السفر في رمضان ممكن تمامًا، وقد يكون أكثر الأوقات أثرًا لاكتشاف المغرب، لكن اليوم يجري على نحو مختلف. كثير من المطاعم تغلق حتى الغروب، وتقصّر المتاحف والإدارات ساعاتها، ولا تستيقظ المدينة العتيقة حقًا إلا بعد مدفع الإفطار. أما الترحال الجبلي فلا يتأثر — يخطط مرشدونا للطعام والماء وفق ذلك — وقرى الأطلس تفطر معًا بطريقة نادرًا ما يراها الزوار.",
      dateNote:
        "يحدد المغرب رمضان والعيد برؤية الهلال محليًا عبر وزارة الأوقاف والشؤون الإسلامية، لذا قد يتقدّم البدء والنهاية أو يتأخر بيوم واحد، ويُعلن ذلك أحيانًا مساء اليوم السابق فقط.",
      highlights: [
        "المدينة القديمة تدبّ فيها الحياة فعليًا بعد مدفع الإفطار كل مساء",
        "قرى الأطلس تفطر معًا، وهو مشهد نادرًا ما يراه الزوار",
        "الجبل لا يتأثر: مرشدونا ينظّمون الطعام والماء وفق ذلك",
        "عيد الفطر يختم الشهر بأكبر احتفال في السنة المغربية",
      ],
      considerations: [
        "كثير من المطاعم تبقى مغلقة حتى الغروب، والمتاحف والإدارات تعمل بساعات أقصر.",
        "المدن هادئة وبطيئة نهارًا؛ الحيوية تأتي بعد المغرب، وهذا يناسب بعض الرحلات دون غيرها.",
        "بداية الشهر ونهايته يُحدَّدان برؤية الهلال محليًا، وقد يُعلن ذلك مساء اليوم السابق فقط.",
        "العيد نفسه يعطّل جزءًا كبيرًا من البلاد يومين إلى ثلاثة، بما في ذلك النقل ومعظم المتاجر.",
      ],
    },
  },

  "almond-blossom-anti-atlas": {
    fr: {
      name: "Saison des amandiers en fleur, Anti-Atlas",
      shortName: "Amandiers en fleur",
      blurb:
        "Les terrasses de l'Anti-Atlas virent au blanc et au rose quelques semaines avant l'arrivée de la chaleur.",
      description:
        "Entre les pluies d'hiver et la chaleur du printemps, les terrasses d'amandiers autour de Tafraoute et de la vallée des Ameln fleurissent contre le granit rose. C'est la meilleure météo de marche de l'année dans l'Anti-Atlas — journées douces, nuits froides — et le moment le plus calme sur les sentiers. Tafraoute organise la plupart des années une fête de l'amandier en fleur, dont les dates sont fixées localement.",
      dateNote:
        "Une saison, pas une date. La floraison varie selon les pluies d'hiver et l'altitude : les vallées basses de l'Anti-Atlas fleurissent en premier, les villages plus hauts jusqu'à trois semaines plus tard.",
      highlights: [
        "Les terrasses d'amandiers en fleurs contre le granit rose de la vallée des Ammeln",
        "La meilleure météo de marche de l'année dans l'Anti-Atlas : journées douces, nuits froides",
        "La saison la plus calme sur les sentiers autour de Tafraoute",
        "Tafraoute organise une fête des amandiers en fleurs la plupart des années",
      ],
      considerations: [
        "La floraison est une saison, pas une date. Elle dépend des pluies d'hiver, et une année tardive peut la manquer.",
        "L'altitude étale le spectacle : les vallées basses fleurissent d'abord, les villages hauts jusqu'à trois semaines plus tard.",
        "Les nuits sont vraiment froides en altitude et les hébergements de village souvent non chauffés.",
        "Les dates de la fête de Tafraoute sont fixées localement et annoncées tardivement.",
      ],
    },
    es: {
      name: "Temporada del almendro en flor, Anti-Atlas",
      shortName: "Almendro en flor",
      blurb:
        "Las terrazas del Anti-Atlas se tiñen de blanco y rosa unas semanas antes de que llegue el calor.",
      description:
        "Entre las lluvias de invierno y el calor de la primavera, las terrazas de almendros alrededor de Tafraoute y del valle de Ameln florecen contra el granito rosa. Es el mejor tiempo del año para caminar en el Anti-Atlas — días templados, noches frías — y el momento más tranquilo en los senderos. Tafraoute celebra casi todos los años una fiesta del almendro en flor, con fechas fijadas localmente.",
      dateNote:
        "Es una temporada, no una fecha. La floración cambia con las lluvias de invierno y la altitud: los valles bajos del Anti-Atlas florecen primero y los pueblos más altos hasta tres semanas después.",
      highlights: [
        "Terrazas de almendros en flor contra el granito rosa del valle de Ammeln",
        "El mejor tiempo del año para caminar en el Anti-Atlas: días templados, noches frías",
        "La temporada más tranquila en los senderos alrededor de Tafraoute",
        "Tafraoute celebra una fiesta del almendro en flor casi todos los años",
      ],
      considerations: [
        "La floración es una temporada, no una fecha. Depende de las lluvias invernales, y un año tardío puede perderla.",
        "La altitud escalona el espectáculo: los valles bajos florecen primero, los pueblos altos hasta tres semanas después.",
        "Las noches son realmente frías en altura y el alojamiento rural suele carecer de calefacción.",
        "Las fechas de la fiesta de Tafraoute se fijan localmente y se anuncian tarde.",
      ],
    },
    de: {
      name: "Mandelblüte im Anti-Atlas",
      shortName: "Mandelblüte",
      blurb:
        "Die Terrassen des Anti-Atlas färben sich weiß und rosa, ein paar Wochen bevor die Hitze kommt.",
      description:
        "Zwischen den Winterregen und der Frühlingshitze blühen die Mandelterrassen um Tafraoute und im Ameln-Tal vor rosafarbenem Granit. Es ist das beste Wanderwetter des Jahres im Anti-Atlas — milde Tage, kalte Nächte — und die ruhigste Zeit auf den Wegen. Tafraoute richtet in den meisten Jahren ein Mandelblütenfest aus, dessen Termine vor Ort festgelegt werden.",
      dateNote:
        "Eine Saison, kein Datum. Die Blüte verschiebt sich mit dem Winterregen und der Höhe: tiefere Anti-Atlas-Täler blühen zuerst, höher gelegene Dörfer bis zu drei Wochen später.",
      highlights: [
        "Blühende Mandelterrassen vor dem rosafarbenen Granit des Ammeln-Tals",
        "Das beste Wanderwetter des Anti-Atlas-Jahres: milde Tage, kalte Nächte",
        "Die ruhigste Zeit auf den Wegen rund um Tafraoute",
        "Tafraoute richtet in den meisten Jahren ein Mandelblütenfest aus",
      ],
      considerations: [
        "Die Blüte ist eine Jahreszeit, kein Datum. Sie hängt vom Winterregen ab, und ein spätes Jahr kann sie verfehlen.",
        "Die Höhe staffelt das Schauspiel: Tiefere Täler blühen zuerst, höhere Dörfer bis zu drei Wochen später.",
        "Die Nächte sind in der Höhe wirklich kalt, und Dorfunterkünfte sind oft ungeheizt.",
        "Die Termine des Tafraoute-Fests werden lokal festgelegt und spät bekannt gegeben.",
      ],
    },
    it: {
      name: "Stagione dei mandorli in fiore, Anti-Atlante",
      shortName: "Mandorli in fiore",
      blurb:
        "Le terrazze dell'Anti-Atlante diventano bianche e rosa per qualche settimana prima che arrivi il caldo.",
      description:
        "Tra le piogge invernali e il caldo primaverile, le terrazze di mandorli intorno a Tafraoute e alla valle degli Ameln fioriscono contro il granito rosa. È il periodo migliore dell'anno per camminare nell'Anti-Atlante — giornate miti, notti fredde — e il momento più tranquillo sui sentieri. Tafraoute organizza quasi ogni anno una festa del mandorlo in fiore, con date stabilite localmente.",
      dateNote:
        "È una stagione, non una data. La fioritura cambia con le piogge invernali e l'altitudine: le valli più basse dell'Anti-Atlante fioriscono per prime, i villaggi più alti fino a tre settimane dopo.",
      highlights: [
        "Terrazze di mandorli in fiore contro il granito rosa della valle di Ammeln",
        "Il miglior tempo per camminare dell'anno nell'Anti-Atlante: giornate miti, notti fredde",
        "La stagione più tranquilla sui sentieri intorno a Tafraoute",
        "Tafraoute organizza una festa del mandorlo in fiore quasi ogni anno",
      ],
      considerations: [
        "La fioritura è una stagione, non una data. Dipende dalle piogge invernali, e un anno tardivo può mancarla.",
        "L'altitudine scaglia lo spettacolo: le valli basse fioriscono prima, i villaggi alti fino a tre settimane dopo.",
        "Le notti sono davvero fredde in quota e gli alloggi di villaggio spesso non riscaldati.",
        "Le date della festa di Tafraoute sono fissate localmente e annunciate tardi.",
      ],
    },
    ar: {
      name: "موسم إزهار اللوز، الأطلس الصغير",
      shortName: "إزهار اللوز",
      blurb:
        "مدرجات الأطلس الصغير تكتسي البياض والوردي أسابيع قليلة قبل حلول الحر.",
      description:
        "بين أمطار الشتاء وحرّ الربيع، تُزهر مدرجات اللوز حول تافراوت ووادي أملن في مواجهة الغرانيت الوردي. إنه أفضل طقس للمشي في السنة بالأطلس الصغير — نهار دافئ وليل بارد — وأهدأ الأوقات على المسارات. وتقيم تافراوت في معظم السنوات مهرجانًا لإزهار اللوز، تُحدَّد مواعيده محليًا.",
      dateNote:
        "موسم، لا تاريخ. يتغير توقيت الإزهار بحسب أمطار الشتاء والارتفاع: الوديان المنخفضة في الأطلس الصغير تُزهر أولًا، والقرى الأعلى بعدها بثلاثة أسابيع أحيانًا.",
      highlights: [
        "مدرجات اللوز المزهرة أمام غرانيت وادي أملن الوردي",
        "أفضل طقس للمشي في الأطلس الصغير طوال السنة: نهار معتدل وليل بارد",
        "أهدأ موسم على مسارات تافراوت",
        "تافراوت تنظّم مهرجانًا لزهر اللوز في معظم السنوات",
      ],
      considerations: [
        "الإزهار موسم لا تاريخ. يتوقّف على أمطار الشتاء، وقد تفوّته سنة متأخرة.",
        "الارتفاع يوزّع المشهد: الوديان المنخفضة تزهر أولًا، والقرى المرتفعة بعدها بثلاثة أسابيع.",
        "الليالي باردة فعلًا في الأعالي، وإقامات القرى غالبًا بلا تدفئة.",
        "تواريخ مهرجان تافراوت تُحدَّد محليًا وتُعلن متأخرة.",
      ],
    },
  },
};

/** An event with its prose swapped for `locale`, falling back to English. */
export function eventFor(locale: Locale, slug: string): TourEvent | undefined {
  const base = EVENTS.find((e) => e.slug === slug);
  if (!base || locale === "en") return base;
  const copy = COPY[slug]?.[locale];
  if (!copy) return base;
  return { ...base, ...copy };
}

export function eventsFor(locale: Locale): TourEvent[] {
  return EVENTS.map((e) => eventFor(locale, e.slug) ?? e);
}

/** Upcoming events in `locale`, soonest first. */
export function upcomingEventsFor(locale: Locale, now: Date = new Date()): TourEvent[] {
  const today = now.toISOString().slice(0, 10);
  return eventsFor(locale)
    .filter((e) => e.endDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export { COPY as EVENT_COPY };
