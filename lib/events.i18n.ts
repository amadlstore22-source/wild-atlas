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
  Partial<Pick<TourEvent, "dateNote">>;

type Table = Record<string, Record<Exclude<Locale, "en">, EventCopy>>;

const COPY: Table = {
  "gnaoua-world-music-festival-essaouira": {
    fr: {
      name: "Festival Gnaoua et Musiques du Monde, Essaouira",
      shortName: "Festival Gnaoua",
      blurb:
        "Trois jours de transe gnaoua face à l'Atlantique, dans une cité fortifiée vidée de ses voitures et remplie de tambours.",
      description:
        "La 27e édition réunit les maâlems — maîtres musiciens gnaoua — sur des scènes ouvertes à travers Essaouira, aux côtés d'invités jazz et musiques du monde qui improvisent avec eux. C'est gratuit, en plein air, et la médina veille jusqu'à l'aube. Les hébergements à Essaouira se remplissent des mois à l'avance : une excursion à la journée depuis Marrakech est souvent la façon la plus réaliste d'y assister.",
    },
    es: {
      name: "Festival Gnaoua y Músicas del Mundo, Essaouira",
      shortName: "Festival Gnaoua",
      blurb:
        "Tres días de trance gnaoua frente al Atlántico, en una ciudad amurallada que se vacía de coches y se llena de tambores.",
      description:
        "La 27ª edición reúne a los maalems — maestros músicos gnaoua — en escenarios abiertos por toda Essaouira, junto a invitados de jazz y músicas del mundo que improvisan con ellos. Es gratuito, al aire libre, y la medina no duerme hasta el amanecer. El alojamiento en Essaouira se agota con meses de antelación, así que una excursión de un día desde Marrakech suele ser la forma más realista de verlo.",
    },
    de: {
      name: "Gnaoua- und Weltmusikfestival, Essaouira",
      shortName: "Gnaoua-Festival",
      blurb:
        "Drei Tage Gnaoua-Trance am Atlantik, in einer Stadtmauer ohne Autos und voller Trommeln.",
      description:
        "Die 27. Ausgabe bringt Maalems — Gnaoua-Meistermusiker — auf offene Bühnen in ganz Essaouira, zusammen mit Jazz- und Weltmusikgästen, die mit ihnen improvisieren. Der Eintritt ist frei, alles findet draußen statt, und die Medina bleibt bis zum Morgengrauen wach. Unterkünfte in Essaouira sind Monate im Voraus ausgebucht, daher ist ein Tagesausflug ab Marrakesch oft der realistischere Weg.",
    },
    it: {
      name: "Festival Gnaoua e Musiche del Mondo, Essaouira",
      shortName: "Festival Gnaoua",
      blurb:
        "Tre giorni di trance gnaoua sull'Atlantico, in una città murata svuotata di auto e piena di tamburi.",
      description:
        "La 27ª edizione porta i maalem — maestri musicisti gnaoua — su palchi aperti in tutta Essaouira, insieme a ospiti jazz e world music che improvvisano con loro. È gratuito, all'aperto, e la medina resta sveglia fino all'alba. Gli alloggi a Essaouira si esauriscono con mesi di anticipo, quindi una gita in giornata da Marrakech è spesso il modo più realistico per viverlo.",
    },
    ar: {
      name: "مهرجان كناوة وموسيقى العالم، الصويرة",
      shortName: "مهرجان كناوة",
      blurb:
        "ثلاثة أيام من إيقاع كناوة على المحيط الأطلسي، في مدينة مسوَّرة تخلو من السيارات وتمتلئ بالطبول.",
      description:
        "تجمع الدورة السابعة والعشرون المعلمين — أساتذة موسيقى كناوة — على منصات مفتوحة في أنحاء الصويرة، إلى جانب ضيوف من الجاز وموسيقى العالم يرتجلون معهم. الدخول مجاني، والعروض في الهواء الطلق، والمدينة العتيقة تسهر حتى الفجر. أماكن الإقامة في الصويرة تُحجز قبل أشهر، لذا فإن رحلة يومية من مراكش غالبًا ما تكون الطريقة الأكثر واقعية للحضور.",
    },
  },

  "marrakech-international-marathon": {
    fr: {
      name: "Marathon International de Marrakech",
      shortName: "Marathon de Marrakech",
      blurb:
        "La 36e édition longe les remparts et la palmeraie dans la fraîcheur de janvier à Marrakech.",
      description:
        "Un marathon et un semi-marathon à travers les murailles de la vieille ville, la Palmeraie et les avenues de Guéliz, avec environ 15 000 coureurs. Janvier est le mois le plus frais pour courir et aussi la pleine saison du trek hivernal au Toubkal : un week-end de course s'associe naturellement à quelques jours dans l'Atlas.",
    },
    es: {
      name: "Maratón Internacional de Marrakech",
      shortName: "Maratón de Marrakech",
      blurb:
        "La 36ª edición recorre las murallas y el palmeral en el fresco enero de Marrakech.",
      description:
        "Un maratón y un medio maratón por las murallas de la ciudad vieja, el Palmeral y las avenidas de Gueliz, con unos 15 000 corredores. Enero es el mes más fresco para correr y también plena temporada de trekking invernal en el Toubkal, así que un fin de semana de carrera combina de forma natural con unos días en el Atlas.",
    },
    de: {
      name: "Marrakesch-Marathon",
      shortName: "Marrakesch-Marathon",
      blurb:
        "Die 36. Ausgabe führt an Stadtmauern und Palmenhainen entlang, in der Kühle des Januars.",
      description:
        "Ein Marathon und ein Halbmarathon durch die alten Stadtmauern, die Palmeraie und die Alleen von Gueliz, mit rund 15.000 Läuferinnen und Läufern. Der Januar ist der kühlste Laufmonat und zugleich Hochsaison für Winter-Trekking am Toubkal — ein Rennwochenende lässt sich gut mit ein paar Tagen im Atlas verbinden.",
    },
    it: {
      name: "Maratona Internazionale di Marrakech",
      shortName: "Maratona di Marrakech",
      blurb:
        "La 36ª edizione corre lungo le mura e i palmeti nel fresco gennaio di Marrakech.",
      description:
        "Una maratona e una mezza maratona attraverso le mura della città vecchia, la Palmeraie e i viali di Gueliz, con circa 15.000 partecipanti. Gennaio è il mese più fresco per correre ed è anche piena stagione di trekking invernale sul Toubkal: un weekend di gara si abbina naturalmente a qualche giorno sull'Atlante.",
    },
    ar: {
      name: "ماراطون مراكش الدولي",
      shortName: "ماراطون مراكش",
      blurb:
        "الدورة السادسة والثلاثون تمر بالأسوار والنخيل في برودة يناير بمراكش.",
      description:
        "ماراطون ونصف ماراطون عبر أسوار المدينة القديمة والنخيل وشوارع كليز، بمشاركة نحو 15 ألف عدّاء. يناير هو أبرد شهور الجري، وهو أيضًا موسم الترحال الشتوي في توبقال، لذا يتلاءم أسبوع السباق تمامًا مع بضعة أيام في الأطلس.",
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
