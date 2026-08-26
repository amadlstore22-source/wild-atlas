# -*- coding: utf-8 -*-
"""Translate `highlights` and `considerations` into fr/es/de/it/ar.

WHY ALL FIVE AT ONCE
--------------------
eventFor() spreads the locale copy over the English base, so a missing field
silently falls back to English and the page still renders perfectly. That is
exactly how the tour seoTitles and the whole review page shipped English to five
of six locales. __tests__/lib/events.test.ts fails on byte-identical strings for
this reason, so partial translation is not an option.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/translate_event_modules.py
"""
import io
import re

T = {
    "gnaoua-world-music-festival-essaouira": {
        "fr": (
            ["Des maâlems — maîtres musiciens gnaoua — sur des scènes ouvertes dans toute la médina",
             "Gratuit et en plein air : pas de billet, pas de salle, toute la ville est le festival",
             "Des invités jazz et musiques du monde qui improvisent avec les groupes gnaoua",
             "Essaouira fermée aux voitures : la ville fortifiée se traverse à pied",
             "La médina veille jusqu'à l'aube"],
            ["Les hébergements d'Essaouira sont complets des mois à l'avance — une excursion à la journée depuis Marrakech est souvent la seule option réaliste.",
             "L'affluence est forte et la médina reste bruyante toute la nuit ; mieux vaut ne pas dormir à l'intérieur des remparts si vous avez le sommeil léger.",
             "Les dates 2027 ne sont pas publiées. Nous retenons la fenêtre de fin juin utilisée depuis des années et confirmons dès l'annonce des organisateurs."],
        ),
        "es": (
            ["Maalems — maestros músicos gnaoua — en escenarios abiertos por toda la medina",
             "Gratuito y al aire libre: sin entrada, sin recinto, toda la ciudad es el festival",
             "Invitados de jazz y músicas del mundo improvisando con los grupos gnaoua",
             "Essaouira cerrada al tráfico: la ciudad amurallada se recorre a pie",
             "La medina no duerme hasta el amanecer"],
            ["El alojamiento en Essaouira se agota con meses de antelación: una excursión de un día desde Marrakech suele ser la única opción realista.",
             "Hay mucha gente y la medina es ruidosa toda la noche; quien tenga el sueño ligero no debería dormir dentro de las murallas.",
             "Las fechas de 2027 aún no se han publicado. Mantenemos la ventana de finales de junio de años anteriores y confirmamos en cuanto los organizadores la anuncien."],
        ),
        "de": (
            ["Maalems — Gnaoua-Meistermusiker — auf offenen Bühnen in der ganzen Medina",
             "Kostenlos und unter freiem Himmel: kein Ticket, kein Veranstaltungsort, die ganze Stadt ist das Festival",
             "Jazz- und Weltmusikgäste, die mit den Gnaoua-Gruppen improvisieren",
             "Essaouira ist autofrei, die ummauerte Stadt lässt sich komplett zu Fuß erkunden",
             "Die Medina bleibt bis zum Morgengrauen wach"],
            ["Unterkünfte in Essaouira sind Monate im Voraus ausgebucht — ein Tagesausflug ab Marrakesch ist oft der einzig realistische Weg.",
             "Es ist sehr voll und die Medina bleibt die ganze Nacht laut; wer leicht aufwacht, sollte nicht innerhalb der Mauern übernachten.",
             "Die Termine für 2027 stehen noch nicht fest. Wir halten das seit Jahren übliche Ende-Juni-Fenster und bestätigen, sobald die Veranstalter es bekannt geben."],
        ),
        "it": (
            ["Maalem — maestri musicisti gnaoua — su palchi aperti in tutta la medina",
             "Gratuito e all'aperto: nessun biglietto, nessuna sala, tutta la città è il festival",
             "Ospiti jazz e world music che improvvisano con i gruppi gnaoua",
             "Essaouira chiusa alle auto: la città murata si attraversa a piedi",
             "La medina resta sveglia fino all'alba"],
            ["Gli alloggi a Essaouira si esauriscono con mesi di anticipo: una gita in giornata da Marrakech è spesso l'unica opzione realistica.",
             "C'è molta folla e la medina resta rumorosa tutta la notte; chi ha il sonno leggero non dovrebbe dormire dentro le mura.",
             "Le date del 2027 non sono ancora pubblicate. Manteniamo la finestra di fine giugno usata da anni e confermiamo appena gli organizzatori annunciano."],
        ),
        "ar": (
            ["المعلمون — كبار موسيقيي كناوة — على مسارح مفتوحة في أنحاء المدينة القديمة",
             "مجاني وفي الهواء الطلق: بلا تذكرة وبلا قاعة، المدينة كلها هي المهرجان",
             "ضيوف من الجاز وموسيقى العالم يرتجلون مع فرق كناوة",
             "الصويرة مغلقة أمام السيارات، فالمدينة المسوّرة تُقطع سيرًا على الأقدام",
             "المدينة القديمة تسهر حتى الفجر"],
            ["أماكن الإقامة في الصويرة تُحجز بالكامل قبل أشهر — رحلة يوم واحد من مراكش غالبًا هي الخيار الواقعي الوحيد.",
             "الزحام شديد والمدينة القديمة صاخبة طوال الليل؛ من ينام بسهولة خفيفة يُفضّل ألا يبيت داخل الأسوار.",
             "تواريخ 2027 لم تُنشر بعد. نعتمد نافذة أواخر يونيو المعتادة منذ سنوات ونؤكّدها فور إعلان المنظمين."],
        ),
    },
    "marrakech-international-marathon": {
        "fr": (
            ["Un parcours le long des remparts, dans la Palmeraie et sur les avenues de Guéliz",
             "Marathon et semi-marathon, environ 15 000 coureurs",
             "Janvier est le mois le plus frais de l'année marocaine pour courir",
             "Les mêmes semaines sont la pleine saison de trek hivernal au Toubkal : un week-end de course se combine avec l'Atlas"],
            ["Les hôtels de Marrakech augmentent leurs tarifs et se remplissent pour le week-end de la course : réservez avant le Nouvel An.",
             "Des routes sont fermées le matin de la course et les transferts doivent être organisés en conséquence.",
             "Associer la course à un trek au Toubkal signifie des conditions hivernales en montagne : crampons et piolet, pas une marche d'été."],
        ),
        "es": (
            ["Un recorrido por las murallas, el Palmeral y las avenidas de Gueliz",
             "Maratón y media maratón, unos 15 000 corredores",
             "Enero es el mes más fresco del año marroquí para correr",
             "Esas mismas semanas son plena temporada de trekking invernal en el Toubkal: un fin de semana de carrera combina con el Atlas"],
            ["Los hoteles de Marrakech suben precios y se llenan el fin de semana de la carrera; reserve antes de Año Nuevo.",
             "Los cortes de tráfico reorganizan el centro la mañana de la carrera y los traslados deben planificarse en torno a ellos.",
             "Combinar la carrera con el Toubkal implica condiciones invernales en la montaña: crampones y piolet, no una caminata de verano."],
        ),
        "de": (
            ["Eine Strecke entlang der Stadtmauern, durch die Palmeraie und über die Alleen von Gueliz",
             "Marathon und Halbmarathon mit rund 15.000 Läuferinnen und Läufern",
             "Der Januar ist der kühlste Laufmonat des marokkanischen Jahres",
             "Dieselben Wochen sind Hochsaison für Winter-Trekking am Toubkal — ein Rennwochenende lässt sich mit dem Atlas verbinden"],
            ["Die Hotels in Marrakesch erhöhen die Preise und sind zum Rennwochenende ausgebucht; buchen Sie vor dem Jahreswechsel.",
             "Straßensperrungen verändern das Zentrum am Renntag, Transfers müssen entsprechend geplant werden.",
             "Rennen plus Toubkal bedeutet Winterbedingungen am Berg: Steigeisen und Eispickel, keine Sommerwanderung."],
        ),
        "it": (
            ["Un percorso lungo le mura, nella Palmeraie e sui viali di Gueliz",
             "Maratona e mezza maratona, circa 15.000 partecipanti",
             "Gennaio è il mese più fresco dell'anno marocchino per correre",
             "Le stesse settimane sono piena stagione di trekking invernale sul Toubkal: un weekend di gara si abbina all'Atlante"],
            ["Gli hotel di Marrakech alzano le tariffe e si riempiono per il weekend della gara; prenotate prima di Capodanno.",
             "Le chiusure stradali riorganizzano il centro la mattina della gara e i trasferimenti vanno pianificati di conseguenza.",
             "Abbinare la gara al Toubkal significa condizioni invernali in montagna: ramponi e piccozza, non una camminata estiva."],
        ),
        "ar": (
            ["مسار يمرّ بالأسوار القديمة والنخيل وشوارع جليز",
             "ماراطون ونصف ماراطون بمشاركة نحو 15,000 عدّاء",
             "يناير هو أبرد شهور السنة المغربية للجري",
             "الأسابيع نفسها هي ذروة موسم تسلق توبقال شتاءً، فعطلة السباق تُجمع مع الأطلس"],
            ["فنادق مراكش ترفع أسعارها وتمتلئ في عطلة السباق؛ احجز قبل رأس السنة.",
             "إغلاق الطرق يغيّر وسط المدينة صباح السباق، وينبغي تخطيط التنقلات على أساسه.",
             "الجمع بين السباق وتوبقال يعني ظروفًا شتوية في الجبل: كرامبون وفأس جليد، لا نزهة صيفية."],
        ),
    },
    "rose-festival-kelaat-mgouna": {
        "fr": (
            ["La récolte des roses de Damas à son apogée dans toute la vallée du Dadès",
             "Un moussem avec chars, danses Aït Atta et couronnement d'une reine des roses",
             "Des souks vendant l'eau et l'huile de rose distillées sur place",
             "Kelaat M'Gouna est sur la route Marrakech-Sahara : un circuit désert bien calé la traverse"],
            ["Les dates ne sont confirmées que quelques semaines avant, car elles suivent la récolte : un voyage bâti autour comporte un vrai risque.",
             "La ville est petite et se remplit entièrement ; la plupart des visiteurs logent à Boumalne Dadès ou passent dans le cadre d'un circuit.",
             "Les roses sont une culture de rente : la cueillette commence avant l'aube et les champs sont récoltés en milieu de matinée."],
        ),
        "es": (
            ["La cosecha de rosa de Damasco en su punto álgido en todo el valle del Dades",
             "Un moussem con carrozas, danzas Ait Atta y la coronación de una reina de las rosas",
             "Zocos con agua y aceite de rosas destilados localmente",
             "Kelaat M'Gouna está en la carretera Marrakech-Sáhara: un circuito por el desierto bien planificado pasa por allí"],
            ["Las fechas se confirman solo unas semanas antes porque siguen la cosecha, así que un viaje planificado en torno a ellas conlleva riesgo real.",
             "El pueblo es pequeño y se llena por completo; la mayoría se aloja en Boumalne Dades o pasa de camino al desierto.",
             "Las rosas son un cultivo comercial: la recogida empieza antes del amanecer y los campos quedan cosechados a media mañana."],
        ),
        "de": (
            ["Die Damaszener-Rosenernte auf ihrem Höhepunkt im gesamten Dades-Tal",
             "Ein Moussem mit Umzugswagen, Ait-Atta-Tänzen und der Krönung einer Rosenkönigin",
             "Souks mit lokal destilliertem Rosenwasser und Rosenöl",
             "Kelaat M'Gouna liegt direkt an der Straße Marrakesch–Sahara: eine gut getimte Wüstentour fährt mitten hindurch"],
            ["Die Termine stehen erst wenige Wochen vorher fest, weil sie der Ernte folgen — eine darauf gebaute Reise trägt ein echtes Datumsrisiko.",
             "Der Ort ist klein und komplett ausgebucht; die meisten übernachten in Boumalne Dades oder kommen auf einer Wüstenroute durch.",
             "Rosen sind eine Nutzpflanze: Gepflückt wird vor Sonnenaufgang, am späten Vormittag sind die Felder abgeerntet."],
        ),
        "it": (
            ["La raccolta della rosa damascena al culmine in tutta la valle del Dades",
             "Un moussem con carri, danze Ait Atta e l'incoronazione di una regina delle rose",
             "Suq che vendono acqua e olio di rose distillati sul posto",
             "Kelaat M'Gouna è sulla strada Marrakech-Sahara: un tour del deserto ben programmato ci passa in mezzo"],
            ["Le date si confermano solo poche settimane prima perché seguono il raccolto: un viaggio costruito attorno comporta un rischio reale.",
             "Il paese è piccolo e si riempie completamente; la maggior parte pernotta a Boumalne Dades o passa lungo un itinerario del deserto.",
             "Le rose sono una coltura da reddito: la raccolta inizia prima dell'alba e i campi sono spogli entro metà mattina."],
        ),
        "ar": (
            ["ذروة موسم جني الورد الدمشقي في وادي دادس بأكمله",
             "موسم بعربات مزيّنة ورقصات آيت عطا وتتويج ملكة الورد",
             "أسواق تبيع ماء الورد وزيته المقطّرين محليًا",
             "قلعة مݣونة تقع على طريق مراكش–الصحراء، فجولة صحراوية بتوقيت مناسب تمرّ منها"],
            ["التواريخ لا تُؤكَّد إلا قبل أسابيع قليلة لأنها تتبع الحصاد، فبناء رحلة حولها ينطوي على مخاطرة حقيقية.",
             "البلدة صغيرة وتمتلئ تمامًا؛ معظم الزوار يبيتون في بومالن دادس أو يمرّون ضمن برنامج صحراوي.",
             "الورد محصول تجاري: الجني يبدأ قبل الفجر وتُقطف الحقول قبل منتصف الصباح."],
        ),
    },
    "imilchil-marriage-moussem": {
        "fr": (
            ["Un plateau du Haut Atlas à environ 2 200 m, loin des circuits touristiques",
             "D'abord une foire au bétail et aux marchandises pour les villages Aït Haddidou",
             "Le rassemblement de fiançailles qui l'a rendu célèbre, toujours mené par la communauté",
             "Un événement communautaire réel, non un spectacle monté pour les visiteurs"],
            ["C'est isolé : l'accès est une longue route de montagne, et ce trajet représente l'essentiel de l'engagement.",
             "Les jours exacts sont fixés localement et souvent annoncés quelques semaines avant : difficile d'y caler un vol.",
             "L'hébergement autour d'Imilchil est sommaire et limité. Prévoyez un gîte ou une chambre chez l'habitant, pas un hôtel.",
             "C'est une occasion communautaire, pas un spectacle. Ne photographiez les personnes qu'avec leur accord."],
        ),
        "es": (
            ["Una meseta del Alto Atlas a unos 2200 m, fuera del circuito turístico",
             "Ante todo una feria de ganado y mercancías para los pueblos Ait Haddidou",
             "La reunión de compromisos que le dio fama, aún gestionada por la comunidad",
             "Un acontecimiento comunitario real, no un espectáculo montado para visitantes"],
            ["Es remoto: el acceso es una larga carretera de montaña, y ese trayecto es la mayor parte del esfuerzo.",
             "Los días exactos se fijan localmente y suelen anunciarse con pocas semanas: difícil planificar un vuelo.",
             "El alojamiento cerca de Imilchil es básico y limitado. Espere un gîte o una habitación en el pueblo, no un hotel.",
             "Es una ocasión comunitaria, no un espectáculo. Fotografíe a las personas solo con su permiso."],
        ),
        "de": (
            ["Ein Hochplateau im Hohen Atlas auf rund 2.200 m, abseits der Touristenrouten",
             "In erster Linie ein Vieh- und Warenmarkt für die umliegenden Ait-Haddidou-Dörfer",
             "Das Verlobungstreffen, für das er berühmt ist — nach wie vor von der Gemeinschaft getragen",
             "Ein echtes Gemeinschaftsereignis, keine für Besucher inszenierte Vorführung"],
            ["Abgelegen: Die Anfahrt ist eine lange Bergstrecke, und diese Fahrt ist der größte Teil des Aufwands.",
             "Die genauen Tage werden lokal festgelegt und oft erst wenige Wochen vorher bekannt gegeben — schwer, einen Flug darauf zu planen.",
             "Unterkünfte bei Imilchil sind einfach und knapp. Erwarten Sie ein Gîte oder ein Dorfzimmer, kein Hotel.",
             "Es ist ein Gemeinschaftsanlass, keine Show. Fotografieren Sie Menschen nur mit deren Einverständnis."],
        ),
        "it": (
            ["Un altopiano dell'Alto Atlante a circa 2.200 m, fuori dai circuiti turistici",
             "Prima di tutto una fiera del bestiame e delle merci per i villaggi Ait Haddidou",
             "Il raduno dei fidanzamenti che l'ha reso celebre, ancora gestito dalla comunità",
             "Un evento comunitario reale, non uno spettacolo allestito per i visitatori"],
            ["È remoto: l'accesso è una lunga strada di montagna, e quel viaggio è gran parte dell'impegno.",
             "I giorni esatti sono fissati localmente e spesso annunciati poche settimane prima: difficile programmarci un volo.",
             "Gli alloggi vicino a Imilchil sono essenziali e limitati. Aspettatevi un gîte o una stanza in paese, non un hotel.",
             "È un'occasione comunitaria, non uno spettacolo. Fotografate le persone solo con il loro consenso."],
        ),
        "ar": (
            ["هضبة في الأطلس الكبير على نحو 2200 م، بعيدًا عن المسارات السياحية",
             "هو أولًا سوق للماشية والبضائع لقرى آيت حديدو المحيطة",
             "تجمّع الخطبة الذي اشتهر به، ولا يزال تديره الجماعة نفسها",
             "مناسبة مجتمعية حقيقية، لا عرضًا مُعدًّا للزوار"],
            ["المكان نائٍ: الوصول عبر طريق جبلي طويل، وهذه الرحلة هي الجزء الأكبر من الالتزام.",
             "الأيام تُحدَّد محليًا وغالبًا لا تُعلن إلا قبل أسابيع، ويصعب حجز رحلة طيران على أساسها.",
             "الإقامة قرب إملشيل بسيطة ومحدودة. توقّع دار ضيافة أو غرفة في القرية، لا فندقًا.",
             "هي مناسبة مجتمعية لا عرض فرجة. لا تصوّر الناس إلا بموافقتهم."],
        ),
    },
    "ramadan-and-eid-al-fitr": {
        "fr": (
            ["La médina s'anime vraiment après le canon de l'iftar, chaque soir",
             "Les villages de l'Atlas rompent le jeûne ensemble, un moment que les visiteurs voient rarement",
             "Le trek n'est pas affecté : nos guides organisent repas et eau en conséquence",
             "L'Aïd el-Fitr clôt le mois par la plus grande fête de l'année marocaine"],
            ["De nombreux restaurants restent fermés jusqu'au coucher du soleil, et musées et administrations réduisent leurs horaires.",
             "Les villes sont calmes et lentes en journée ; l'énergie arrive après la nuit tombée, ce qui convient à certains voyages et pas à d'autres.",
             "Les dates de début et de fin dépendent de l'observation locale de la lune et sont parfois annoncées la veille au soir.",
             "L'Aïd lui-même ferme une grande partie du pays pendant deux à trois jours, transports et commerces compris."],
        ),
        "es": (
            ["La medina cobra vida de verdad tras el cañonazo del iftar, cada tarde",
             "Los pueblos del Atlas rompen el ayuno juntos, algo que los visitantes rara vez ven",
             "El trekking no se ve afectado: nuestros guías organizan comida y agua en consecuencia",
             "El Eid al-Fitr cierra el mes con la mayor celebración del año marroquí"],
            ["Muchos restaurantes permanecen cerrados hasta el atardecer, y museos y oficinas reducen horarios.",
             "Las ciudades están tranquilas y lentas de día; la energía llega tras el anochecer, lo que encaja con unos viajes y no con otros.",
             "Las fechas de inicio y fin dependen del avistamiento local de la luna y a veces se anuncian la víspera.",
             "El propio Eid cierra buena parte del país dos o tres días, incluidos transportes y la mayoría de comercios."],
        ),
        "de": (
            ["Die Medina erwacht jeden Abend erst nach dem Iftar-Kanonenschuss richtig",
             "Die Atlasdörfer brechen das Fasten gemeinsam — etwas, das Reisende selten erleben",
             "Trekking ist nicht betroffen: Unsere Guides planen Verpflegung und Wasser entsprechend",
             "Eid al-Fitr beschließt den Monat mit dem größten Fest des marokkanischen Jahres"],
            ["Viele Restaurants bleiben bis Sonnenuntergang geschlossen, Museen und Ämter haben verkürzte Öffnungszeiten.",
             "Tagsüber sind die Städte ruhig und langsam; die Energie kommt nach Einbruch der Dunkelheit — das passt zu manchen Reisen und zu anderen nicht.",
             "Anfang und Ende richten sich nach der lokalen Mondsichtung und werden teils erst am Vorabend bekannt gegeben.",
             "Eid selbst legt zwei bis drei Tage lang weite Teile des Landes still, samt Verkehr und den meisten Geschäften."],
        ),
        "it": (
            ["La medina si anima davvero dopo il colpo di cannone dell'iftar, ogni sera",
             "I villaggi dell'Atlante rompono il digiuno insieme, qualcosa che i visitatori vedono di rado",
             "Il trekking non è influenzato: le nostre guide organizzano cibo e acqua di conseguenza",
             "L'Eid al-Fitr chiude il mese con la festa più grande dell'anno marocchino"],
            ["Molti ristoranti restano chiusi fino al tramonto, e musei e uffici riducono gli orari.",
             "Di giorno le città sono quiete e lente; l'energia arriva dopo il buio, il che si adatta ad alcuni viaggi e non ad altri.",
             "Inizio e fine dipendono dall'avvistamento locale della luna e a volte si annunciano la sera prima.",
             "L'Eid stesso ferma buona parte del paese per due o tre giorni, trasporti e gran parte dei negozi compresi."],
        ),
        "ar": (
            ["المدينة القديمة تدبّ فيها الحياة فعليًا بعد مدفع الإفطار كل مساء",
             "قرى الأطلس تفطر معًا، وهو مشهد نادرًا ما يراه الزوار",
             "الجبل لا يتأثر: مرشدونا ينظّمون الطعام والماء وفق ذلك",
             "عيد الفطر يختم الشهر بأكبر احتفال في السنة المغربية"],
            ["كثير من المطاعم تبقى مغلقة حتى الغروب، والمتاحف والإدارات تعمل بساعات أقصر.",
             "المدن هادئة وبطيئة نهارًا؛ الحيوية تأتي بعد المغرب، وهذا يناسب بعض الرحلات دون غيرها.",
             "بداية الشهر ونهايته يُحدَّدان برؤية الهلال محليًا، وقد يُعلن ذلك مساء اليوم السابق فقط.",
             "العيد نفسه يعطّل جزءًا كبيرًا من البلاد يومين إلى ثلاثة، بما في ذلك النقل ومعظم المتاجر."],
        ),
    },
    "almond-blossom-anti-atlas": {
        "fr": (
            ["Les terrasses d'amandiers en fleurs contre le granit rose de la vallée des Ammeln",
             "La meilleure météo de marche de l'année dans l'Anti-Atlas : journées douces, nuits froides",
             "La saison la plus calme sur les sentiers autour de Tafraoute",
             "Tafraoute organise une fête des amandiers en fleurs la plupart des années"],
            ["La floraison est une saison, pas une date. Elle dépend des pluies d'hiver, et une année tardive peut la manquer.",
             "L'altitude étale le spectacle : les vallées basses fleurissent d'abord, les villages hauts jusqu'à trois semaines plus tard.",
             "Les nuits sont vraiment froides en altitude et les hébergements de village souvent non chauffés.",
             "Les dates de la fête de Tafraoute sont fixées localement et annoncées tardivement."],
        ),
        "es": (
            ["Terrazas de almendros en flor contra el granito rosa del valle de Ammeln",
             "El mejor tiempo del año para caminar en el Anti-Atlas: días templados, noches frías",
             "La temporada más tranquila en los senderos alrededor de Tafraoute",
             "Tafraoute celebra una fiesta del almendro en flor casi todos los años"],
            ["La floración es una temporada, no una fecha. Depende de las lluvias invernales, y un año tardío puede perderla.",
             "La altitud escalona el espectáculo: los valles bajos florecen primero, los pueblos altos hasta tres semanas después.",
             "Las noches son realmente frías en altura y el alojamiento rural suele carecer de calefacción.",
             "Las fechas de la fiesta de Tafraoute se fijan localmente y se anuncian tarde."],
        ),
        "de": (
            ["Blühende Mandelterrassen vor dem rosafarbenen Granit des Ammeln-Tals",
             "Das beste Wanderwetter des Anti-Atlas-Jahres: milde Tage, kalte Nächte",
             "Die ruhigste Zeit auf den Wegen rund um Tafraoute",
             "Tafraoute richtet in den meisten Jahren ein Mandelblütenfest aus"],
            ["Die Blüte ist eine Jahreszeit, kein Datum. Sie hängt vom Winterregen ab, und ein spätes Jahr kann sie verfehlen.",
             "Die Höhe staffelt das Schauspiel: Tiefere Täler blühen zuerst, höhere Dörfer bis zu drei Wochen später.",
             "Die Nächte sind in der Höhe wirklich kalt, und Dorfunterkünfte sind oft ungeheizt.",
             "Die Termine des Tafraoute-Fests werden lokal festgelegt und spät bekannt gegeben."],
        ),
        "it": (
            ["Terrazze di mandorli in fiore contro il granito rosa della valle di Ammeln",
             "Il miglior tempo per camminare dell'anno nell'Anti-Atlante: giornate miti, notti fredde",
             "La stagione più tranquilla sui sentieri intorno a Tafraoute",
             "Tafraoute organizza una festa del mandorlo in fiore quasi ogni anno"],
            ["La fioritura è una stagione, non una data. Dipende dalle piogge invernali, e un anno tardivo può mancarla.",
             "L'altitudine scaglia lo spettacolo: le valli basse fioriscono prima, i villaggi alti fino a tre settimane dopo.",
             "Le notti sono davvero fredde in quota e gli alloggi di villaggio spesso non riscaldati.",
             "Le date della festa di Tafraoute sono fissate localmente e annunciate tardi."],
        ),
        "ar": (
            ["مدرجات اللوز المزهرة أمام غرانيت وادي أملن الوردي",
             "أفضل طقس للمشي في الأطلس الصغير طوال السنة: نهار معتدل وليل بارد",
             "أهدأ موسم على مسارات تافراوت",
             "تافراوت تنظّم مهرجانًا لزهر اللوز في معظم السنوات"],
            ["الإزهار موسم لا تاريخ. يتوقّف على أمطار الشتاء، وقد تفوّته سنة متأخرة.",
             "الارتفاع يوزّع المشهد: الوديان المنخفضة تزهر أولًا، والقرى المرتفعة بعدها بثلاثة أسابيع.",
             "الليالي باردة فعلًا في الأعالي، وإقامات القرى غالبًا بلا تدفئة.",
             "تواريخ مهرجان تافراوت تُحدَّد محليًا وتُعلن متأخرة."],
        ),
    },
}


def render(items, indent):
    return "".join('%s  "%s",\n' % (indent, s.replace('"', '\\"')) for s in items)


def run():
    path = "lib/events.i18n.ts"
    src = io.open(path, encoding="utf-8").read()
    added = 0

    for slug, per_locale in T.items():
        key = '  "%s": {' % slug
        assert key in src, "slug %s not in COPY" % slug
        slug_at = src.index(key)
        # Bound the search to this slug's block so `fr:` matches the right one.
        next_slug = src.find('\n  "', slug_at + len(key))
        block_end = next_slug if next_slug > 0 else len(src)

        for loc, (high, cons) in per_locale.items():
            marker = "\n    %s: {" % loc
            at = src.index(marker, slug_at, block_end)
            # The locale object ends at the first "\n    }," after it.
            close = src.index("\n    },", at)
            assert "highlights:" not in src[at:close], "%s/%s already done" % (slug, loc)
            ins = "\n      highlights: [\n%s      ],\n" % render(high, "      ")
            ins += "      considerations: [\n%s      ]," % render(cons, "      ")
            src = src[:close] + ins + src[close:]
            # Offsets shifted; recompute this slug's block end.
            block_end += len(ins)
            added += 1

    io.open(path, "w", encoding="utf-8", newline="\n").write(src)
    print("added %d locale blocks (%d events x 5 locales)" % (added, len(T)))


run()
