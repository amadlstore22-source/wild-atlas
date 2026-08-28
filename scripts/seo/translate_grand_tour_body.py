# -*- coding: utf-8 -*-
"""Translate the 8-day fixed departure's itinerary, highlights and inclusions.

WHY THESE CANNOT BE LEFT TO FALL BACK
-------------------------------------
Two constraints meet here and between them force a real translation:

  - `Tour` requires highlights/includes/excludes/itinerary, so a locale record
    cannot simply omit them -- tsc rejects the file.
  - mergeWithEn() overlays any value that is not undefined/null/"", and an
    EMPTY ARRAY passes that guard. So `itinerary: []` type-checks and then
    silently renders a booking page with no itinerary at all.

The only correct option is the honest one: translate them. This is the same
class of bug as the `tourType` incident recorded in lib/tours-i18n.ts, where a
field present in English and missing from the locales badged 24 private tours
as "Shared" in five languages.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/translate_grand_tour_body.py
"""
import io

EN_SLUG = "morocco-highlights-toubkal-sahara-8day"

DATA = {
    "fr": {
        "highlights": [
            "Sommet du Jbel Toubkal à 4 167 m — le plus haut d'Afrique du Nord",
            "Nuits au refuge du Toubkal (3 207 m) et au Gîte Panorama à Imlil",
            "Aït Ben Haddou, le ksar de terre classé à l'UNESCO sur l'ancienne route caravanière",
            "Les gorges du Dadès et du Todra sur la route du sud",
            "Méharée dans l'erg Chebbi et nuit en campement dans le désert",
            "Visite guidée de la médina de Marrakech le dernier jour complet",
        ],
        "includes": [
            "Tous les transferts aéroport, à l'arrivée et au départ",
            "Tous les repas pendant le trek",
            "Hébergement en demi-pension — riad, gîte, refuge et campement",
            "Guide de montagne diplômé",
            "Mules sur le trek et méharée à l'erg Chebbi",
            "Déjeuners pendant la partie désert",
        ],
        "excludes": [
            "Dîner à Marrakech",
            "Assurance voyage",
            "Pourboires pour le guide, les muletiers et l'équipe du campement",
        ],
        "days": [
            ("Arrivée à Marrakech",
             "Transfert depuis l'aéroport vers votre riad dans la médina. Le reste de la journée est libre pour vous installer. Le dîner à Marrakech n'est pas inclus : vous mangez où vous voulez."),
            ("Marrakech – Imlil, puis montée au refuge du Toubkal (3 207 m)",
             "Route vers Imlil (1 740 m), le village de départ, et rencontre avec les muletiers. Montée par la vallée du Mizane en passant par le sanctuaire de Sidi Chamharouch jusqu'au refuge. Coucher tôt avant le jour du sommet."),
            ("Sommet du Toubkal (4 167 m), puis descente sur Imlil",
             "Départ avant l'aube pour le sommet, atteint au lever du soleil sur l'Atlas et la brume saharienne au loin. Descente jusqu'à Imlil et nuit au Gîte Panorama — un vrai lit et une douche chaude après deux jours en montagne."),
            ("Imlil – Aït Ben Haddou et les gorges du Dadès",
             "On quitte la montagne par le col du Tizi n'Tichka avec un arrêt à Aït Ben Haddou, ksar classé à l'UNESCO sur l'ancienne route caravanière du Sahara. Puis Ouarzazate et les gorges du Dadès pour la nuit."),
            ("Dadès – gorges du Todra, puis dromadaires vers l'erg Chebbi",
             "Marche dans les gorges du Todra, où les parois se resserrent à quelques mètres et s'élèvent sur 300 m. Route vers Merzouga, puis échange du véhicule contre les dromadaires pour rejoindre le campement dans les dunes avant le coucher du soleil."),
            ("Merzouga – retour à Marrakech",
             "Lever du soleil sur les dunes, puis la longue route de retour par la vallée du Drâa et le Haut Atlas jusqu'à Marrakech. C'est une journée entière sur la route : c'est le prix à payer pour atteindre la vraie mer de sable plutôt que les dunes les plus proches."),
            ("Visite guidée de la médina et soirée libre",
             "Visite guidée de la médina de Marrakech — les souks, le quartier des tanneurs et le cœur historique — jusqu'en début d'après-midi. La soirée est libre ; le dîner à Marrakech n'est pas inclus."),
            ("Départ",
             "Transfert vers l'aéroport de Marrakech Menara à l'heure de votre vol."),
        ],
    },
    "es": {
        "highlights": [
            "Cumbre del Yebel Toubkal a 4.167 m — la más alta del norte de África",
            "Noches en el refugio del Toubkal (3.207 m) y en el Gîte Panorama de Imlil",
            "Ait Ben Haddou, el ksar de adobe declarado Patrimonio de la Humanidad",
            "Las gargantas del Dades y del Todra camino del sur",
            "Paseo en camello por Erg Chebbi y noche en campamento en el desierto",
            "Visita guiada por la medina de Marrakech el último día completo",
        ],
        "includes": [
            "Todos los traslados de aeropuerto, a la llegada y a la salida",
            "Todas las comidas durante el trekking",
            "Alojamiento en media pensión — riad, gîte, refugio y campamento",
            "Guía de montaña titulado",
            "Mulas en el trekking y paseo en camello en Erg Chebbi",
            "Almuerzos durante la parte del desierto",
        ],
        "excludes": [
            "Cena en Marrakech",
            "Seguro de viaje",
            "Propinas para el guía, los muleros y el personal del campamento",
        ],
        "days": [
            ("Llegada a Marrakech",
             "Traslado desde el aeropuerto a tu riad en la medina. El resto del día es libre para instalarte. La cena en Marrakech no está incluida, así que comes donde prefieras."),
            ("Marrakech – Imlil y subida al refugio del Toubkal (3.207 m)",
             "Carretera hasta Imlil (1.740 m), el pueblo de inicio, y encuentro con los muleros. Subida por el valle del Mizane pasando por el santuario de Sidi Chamharouch hasta el refugio. A dormir pronto antes del día de cumbre."),
            ("Cumbre del Toubkal (4.167 m) y bajada a Imlil",
             "Salida antes del amanecer hacia la cumbre, alcanzada con el sol saliendo sobre el Atlas y la bruma sahariana al fondo. Bajada hasta Imlil y noche en el Gîte Panorama: una cama de verdad y una ducha caliente después de dos días en la montaña."),
            ("Imlil – Ait Ben Haddou y las gargantas del Dades",
             "Se deja la montaña por el puerto de Tizi n'Tichka con parada en Ait Ben Haddou, ksar declarado Patrimonio de la Humanidad en la antigua ruta caravanera del Sáhara. Después Ouarzazate y las gargantas del Dades para pasar la noche."),
            ("Dades – garganta del Todra y camellos hacia Erg Chebbi",
             "Paseo por la garganta del Todra, donde las paredes se estrechan a pocos metros y se elevan 300 m. Continuación hasta Merzouga y cambio del vehículo por los camellos para llegar al campamento entre las dunas antes de la puesta de sol."),
            ("Merzouga – regreso a Marrakech",
             "Amanecer sobre las dunas y después la larga vuelta por el valle del Draa y el Alto Atlas hasta Marrakech. Es un día entero de carretera: el precio de llegar al auténtico mar de arena en lugar de a las dunas más cercanas."),
            ("Visita guiada de la medina y tarde libre",
             "Visita guiada por la medina de Marrakech — los zocos, el barrio de los curtidores y el casco histórico — hasta primera hora de la tarde. La tarde es libre; la cena en Marrakech no está incluida."),
            ("Salida",
             "Traslado al aeropuerto de Marrakech Menara a la hora de tu vuelo."),
        ],
    },
    "de": {
        "highlights": [
            "Gipfel des Jbel Toubkal auf 4.167 m — der höchste Nordafrikas",
            "Nächte in der Toubkal-Hütte (3.207 m) und im Gîte Panorama in Imlil",
            "Ait Ben Haddou, das UNESCO-gelistete Lehmksar an der alten Karawanenstraße",
            "Die Dades- und Todra-Schluchten auf der Fahrt nach Süden",
            "Kamelritt in den Erg Chebbi und eine Nacht im Wüstencamp",
            "Geführter Rundgang durch die Medina von Marrakesch am letzten vollen Tag",
        ],
        "includes": [
            "Alle Flughafentransfers bei An- und Abreise",
            "Alle Mahlzeiten während des Treks",
            "Unterkunft mit Halbpension — Riad, Gîte, Hütte und Wüstencamp",
            "Staatlich geprüfter Bergführer",
            "Maultiere auf dem Trek und Kamelritt am Erg Chebbi",
            "Mittagessen während der Wüstenetappe",
        ],
        "excludes": [
            "Abendessen in Marrakesch",
            "Reiseversicherung",
            "Trinkgelder für Guide, Maultiertreiber und Camp-Personal",
        ],
        "days": [
            ("Ankunft in Marrakesch",
             "Transfer vom Flughafen zu Ihrem Riad in der Medina. Der restliche Tag steht zur freien Verfügung. Das Abendessen in Marrakesch ist nicht inbegriffen — Sie essen, wo Sie möchten."),
            ("Marrakesch – Imlil und Aufstieg zur Toubkal-Hütte (3.207 m)",
             "Fahrt nach Imlil (1.740 m), dem Ausgangsdorf, und Treffen mit den Maultiertreibern. Aufstieg durch das Mizane-Tal vorbei am Heiligtum von Sidi Chamharouch zur Hütte. Früh schlafen vor dem Gipfeltag."),
            ("Toubkal-Gipfel (4.167 m) und Abstieg nach Imlil",
             "Aufbruch vor Sonnenaufgang zum Gipfel, oben zum Sonnenaufgang über dem Atlas und dem Saharadunst dahinter. Abstieg bis nach Imlil und Übernachtung im Gîte Panorama — ein richtiges Bett und eine warme Dusche nach zwei Tagen am Berg."),
            ("Imlil – Ait Ben Haddou und die Dades-Schlucht",
             "Über den Tizi-n'Tichka-Pass hinaus aus den Bergen, mit Halt in Ait Ben Haddou, dem UNESCO-gelisteten Ksar an der alten Sahara-Karawanenroute. Weiter über Ouarzazate zur Dades-Schlucht für die Nacht."),
            ("Dades – Todra-Schlucht und mit Kamelen in den Erg Chebbi",
             "Gang in die Todra-Schlucht, wo die Wände auf wenige Meter zusammenrücken und 300 m aufragen. Weiter nach Merzouga, dort Wechsel vom Fahrzeug auf Kamele und Ritt in die Dünen, um das Camp vor Sonnenuntergang zu erreichen."),
            ("Merzouga – zurück nach Marrakesch",
             "Sonnenaufgang über den Dünen, dann die lange Rückfahrt durch das Draa-Tal und über den Hohen Atlas nach Marrakesch. Ein voller Tag auf der Straße — der Preis dafür, das echte Sandmeer zu erreichen statt der näher gelegenen Dünen."),
            ("Geführter Medina-Rundgang und freier Abend",
             "Geführter Rundgang durch die Medina von Marrakesch — Souks, Gerberviertel und historischer Kern — bis zum frühen Nachmittag. Der Abend gehört Ihnen; das Abendessen in Marrakesch ist nicht inbegriffen."),
            ("Abreise",
             "Transfer zum Flughafen Marrakesch Menara rechtzeitig zu Ihrem Flug."),
        ],
    },
    "it": {
        "highlights": [
            "Vetta del Jbel Toubkal a 4.167 m — la più alta del Nord Africa",
            "Notti al rifugio del Toubkal (3.207 m) e al Gîte Panorama di Imlil",
            "Ait Ben Haddou, lo ksar di terra cruda patrimonio UNESCO sulla vecchia via carovaniera",
            "Le gole del Dades e del Todra lungo la strada verso sud",
            "Giro in cammello nell'Erg Chebbi e notte in campo tendato nel deserto",
            "Visita guidata della medina di Marrakech nell'ultimo giorno pieno",
        ],
        "includes": [
            "Tutti i transfer da e per l'aeroporto",
            "Tutti i pasti durante il trek",
            "Sistemazione in mezza pensione — riad, gîte, rifugio e campo tendato",
            "Guida alpina abilitata",
            "Muli durante il trek e giro in cammello all'Erg Chebbi",
            "Pranzi durante la parte nel deserto",
        ],
        "excludes": [
            "Cena a Marrakech",
            "Assicurazione di viaggio",
            "Mance per guida, mulattieri e personale del campo",
        ],
        "days": [
            ("Arrivo a Marrakech",
             "Transfer dall'aeroporto al tuo riad nella medina. Il resto della giornata è libero per ambientarti. La cena a Marrakech non è inclusa, quindi mangi dove preferisci."),
            ("Marrakech – Imlil e salita al rifugio del Toubkal (3.207 m)",
             "Trasferimento a Imlil (1.740 m), il villaggio di partenza, e incontro con i mulattieri. Salita lungo la valle del Mizane passando dal santuario di Sidi Chamharouch fino al rifugio. A letto presto prima del giorno della vetta."),
            ("Vetta del Toubkal (4.167 m) e discesa a Imlil",
             "Partenza prima dell'alba per la vetta, raggiunta con il sole che sorge sull'Atlante e la foschia sahariana sullo sfondo. Discesa fino a Imlil e notte al Gîte Panorama: un letto vero e una doccia calda dopo due giorni in montagna."),
            ("Imlil – Ait Ben Haddou e le gole del Dades",
             "Si lascia la montagna dal passo di Tizi n'Tichka con sosta ad Ait Ben Haddou, ksar patrimonio UNESCO sull'antica via carovaniera sahariana. Poi Ouarzazate e le gole del Dades per la notte."),
            ("Dades – gola del Todra e cammelli verso l'Erg Chebbi",
             "Passeggiata nella gola del Todra, dove le pareti si stringono a pochi metri e si alzano per 300 m. Proseguimento per Merzouga e cambio dal veicolo ai cammelli per raggiungere il campo tra le dune prima del tramonto."),
            ("Merzouga – rientro a Marrakech",
             "Alba sulle dune, poi il lungo rientro attraverso la valle del Draa e l'Alto Atlante fino a Marrakech. È una giornata intera di strada: il prezzo da pagare per raggiungere il vero mare di sabbia invece delle dune più vicine."),
            ("Visita guidata della medina e serata libera",
             "Visita guidata della medina di Marrakech — i souk, il quartiere dei conciatori e il nucleo storico — fino al primo pomeriggio. La serata è libera; la cena a Marrakech non è inclusa."),
            ("Partenza",
             "Transfer all'aeroporto di Marrakech Menara in tempo per il tuo volo."),
        ],
    },
    "ar": {
        "highlights": [
            "الوصول إلى قمة جبل توبقال على ارتفاع 4167 م — أعلى قمة في شمال أفريقيا",
            "المبيت في ملجأ توبقال (3207 م) وفي دار بانوراما بإمليل",
            "آيت بن حدو، القصر الطيني المصنّف على لائحة اليونسكو على درب القوافل القديم",
            "مضيقا دادس وتودغة في الطريق نحو الجنوب",
            "ركوب الجمال إلى عرق الشبي والمبيت في مخيم صحراوي",
            "جولة مصحوبة بمرشد في مدينة مراكش العتيقة في آخر يوم كامل",
        ],
        "includes": [
            "جميع التنقلات من المطار وإليه، عند الوصول والمغادرة",
            "جميع الوجبات خلال المسير الجبلي",
            "الإقامة بنصف إقامة — رياض ودار ضيافة وملجأ ومخيم",
            "مرشد جبلي مرخّص",
            "البغال في المسير وركوب الجمال في عرق الشبي",
            "وجبات الغداء خلال جزء الصحراء",
        ],
        "excludes": [
            "العشاء في مراكش",
            "تأمين السفر",
            "إكراميات المرشد والبغّالة وطاقم المخيم",
        ],
        "days": [
            ("الوصول إلى مراكش",
             "نقل من المطار إلى الرياض في المدينة العتيقة. بقية اليوم لك للاستقرار والراحة. العشاء في مراكش غير مشمول، فأنت حر في اختيار مكان الأكل."),
            ("مراكش – إمليل ثم الصعود إلى ملجأ توبقال (3207 م)",
             "الطريق إلى إمليل (1740 م)، قرية الانطلاق، ولقاء البغّالة. الصعود عبر وادي ميزان مرورًا بضريح سيدي شمهروش حتى الملجأ. نوم مبكر قبل يوم القمة."),
            ("قمة توبقال (4167 م) ثم النزول إلى إمليل",
             "انطلاق قبل الفجر نحو القمة، والوصول إليها مع شروق الشمس على الأطلس وضباب الصحراء في الأفق. النزول حتى إمليل والمبيت في دار بانوراما — سرير حقيقي ودشّ ساخن بعد يومين في الجبل."),
            ("إمليل – آيت بن حدو ومضيق دادس",
             "مغادرة الجبال عبر ممر تيزي نتيشكا مع توقف في آيت بن حدو، القصر المصنّف على لائحة اليونسكو على درب القوافل الصحراوي القديم. ثم ورزازات ومضيق دادس للمبيت."),
            ("دادس – مضيق تودغة ثم الجمال إلى عرق الشبي",
             "المشي داخل مضيق تودغة حيث تتقارب الجدران إلى أمتار قليلة وترتفع 300 م. المتابعة إلى مرزوقة واستبدال السيارة بالجمال للوصول إلى المخيم بين الكثبان قبل الغروب."),
            ("مرزوقة – العودة إلى مراكش",
             "شروق الشمس على الكثبان، ثم الطريق الطويل عائدًا عبر وادي درعة والأطلس الكبير إلى مراكش. إنه يوم كامل على الطريق: هذا ثمن الوصول إلى بحر الرمال الحقيقي بدل الكثبان الأقرب."),
            ("جولة مصحوبة في المدينة العتيقة وأمسية حرة",
             "جولة مصحوبة بمرشد في مدينة مراكش العتيقة — الأسواق وحي الدباغين والنواة التاريخية — حتى بداية بعد الظهر. الأمسية لك؛ والعشاء في مراكش غير مشمول."),
            ("المغادرة",
             "النقل إلى مطار مراكش المنارة في الوقت المناسب لرحلتك."),
        ],
    },
}

# Structural per-day fields, copied verbatim from the English record. Only the
# title and description are translated; meals codes, timings and coordinates
# are identical in every locale by design.
DAY_META = [
    '        day: 1,\n        stay: "Riad, Marrakech",\n        stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 },\n',
    '        day: 2,\n        meals: "B,L,D",\n        stay: "Toubkal Refuge",\n        driving: "1.5 h",\n        walking: "5 h",\n        ascent: "+1,470 m",\n        stop: { name: "Toubkal Refuge", lat: 31.0782, lng: -7.9192 },\n',
    '        day: 3,\n        meals: "B,L,D",\n        stay: "Gite Panorama, Imlil",\n        walking: "8-9 h",\n        ascent: "+960 m / -2,430 m",\n        stop: { name: "Jbel Toubkal Summit", lat: 31.0606, lng: -7.9153 },\n',
    '        day: 4,\n        meals: "B,D",\n        stay: "Hotel, Dades",\n        driving: "7-8 h",\n        distance: "~330 km",\n        stop: { name: "Ait Ben Haddou", lat: 31.0472, lng: -7.1319 },\n',
    '        day: 5,\n        meals: "B,L,D",\n        stay: "Desert camp, Erg Chebbi",\n        driving: "5-6 h",\n        distance: "~290 km",\n        stop: { name: "Erg Chebbi, Merzouga", lat: 31.1667, lng: -3.9833 },\n',
    '        day: 6,\n        meals: "B,L,D",\n        stay: "Riad, Marrakech",\n        driving: "9-10 h",\n        distance: "~560 km",\n        stop: { name: "Marrakech", lat: 31.6295, lng: -7.9811 },\n',
    '        day: 7,\n        meals: "B",\n        stay: "Riad, Marrakech",\n        walking: "3-4 h",\n        stop: { name: "Marrakech Medina", lat: 31.6258, lng: -7.9891 },\n',
    '        day: 8,\n        meals: "B",\n',
]


def arr(name, items):
    out = ["    %s: [" % name]
    for i in items:
        out.append('      "%s",' % i)
    out.append("    ],")
    return "\n".join(out) + "\n"


def itinerary(days):
    out = ["    itinerary: ["]
    for meta, (title, desc) in zip(DAY_META, days):
        out.append("      {")
        out.append(meta.rstrip("\n"))
        out.append('        title: "%s",' % title)
        out.append('        description:')
        out.append('          "%s",' % desc)
        out.append("      },")
    out.append("    ],")
    return "\n".join(out) + "\n"


def run():
    for loc, d in DATA.items():
        path = "lib/tours.%s.ts" % loc
        src = io.open(path, encoding="utf-8").read()
        key = '    slug: "%s",' % EN_SLUG
        at = src.index(key)
        end = src.index("\n  },", at)
        assert "itinerary:" not in src[at:end], "%s already has a body" % path
        body = (
            arr("highlights", d["highlights"])
            + arr("includes", d["includes"])
            + arr("excludes", d["excludes"])
            + itinerary(d["days"])
        )
        src = src[: end + 1] + body + src[end + 1 :]
        io.open(path, "w", encoding="utf-8", newline="\n").write(src)
        print("  %s  %d highlights, %d days" % (loc, len(d["highlights"]), len(d["days"])))


run()
