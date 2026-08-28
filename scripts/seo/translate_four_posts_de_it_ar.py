# -*- coding: utf-8 -*-
"""German, Italian and Arabic translations of the four new posts.

Companion to translate_four_posts_fr_es.py -- same structure, same rules.
Prices are the EUR figures the tour pages actually render (USD stored,
converted at 0.86693); blog-prices.test.ts checks them per locale.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/translate_four_posts_de_it_ar.py
"""
import io

POSTS = {}

# ---------------------------------------------------------------- GERMAN ---
POSTS["de"] = [
{
 "slug": "toubkal-sahara-8-day-tour-cost",
 "title": "Was kostet die 8-tägige Toubkal- und Sahara-Reise? (Termine 2027)",
 "excerpt": "Acht Tage, zwei Ziele: der höchste Gipfel Nordafrikas und die Dünen des Erg Chebbi. Das kostet ein Termin mit festem Datum wirklich, so verhält es sich zum getrennten Buchen, und darum ändert sich der Preis pro Person nicht mit der Gruppengröße.",
 "heroImage": "/gallery/toubkal-refuge-approach-trekkers.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 8,
 "tags": ["Toubkal", "Sahara", "Erg Chebbi", "Trekking", "Marokko"],
 "seoTitle": "Toubkal und Sahara 8 Tage — Preis und Termine 2027",
 "seoDescription": "Was die 8-tägige Toubkal- und Sahara-Reise kostet: 889 € pro Person an festen Terminen, gegenüber 1.413 € für dieselbe Strecke einzeln gebucht.",
 "faq": [
  ("Was kostet die 8-tägige Toubkal- und Sahara-Reise?", "889 € pro Person an den festen Terminen 2027, reduziert von einem Listenpreis von 921 €. Darin enthalten sind alle Flughafentransfers, Unterkunft mit Halbpension, sämtliche Mahlzeiten während des Treks, der staatlich geprüfte Bergführer, Maultiere am Berg und der Kamelritt am Erg Chebbi. Das Abendessen in Marrakesch, die Reiseversicherung und Trinkgelder sind nicht enthalten — eine bewusste Entscheidung, die unten erklärt wird."),
  ("Warum ändert sich der Preis nicht mit der Gruppengröße?", "Weil dies ein Termin mit festem Datum ist, der pro Platz verkauft wird, und keine private Tour. Bei unseren privaten Touren sind Bergführer und Fahrzeug ein fixer Kostenblock, der auf die Teilnehmer verteilt wird — sechs Personen zahlen also deutlich weniger pro Kopf als eine allein. Hier startet die Reise an ihrem veröffentlichten Termin, und was sich ändert, ist die Zahl der freien Plätze von 14. Zwei Freunde zahlen pro Person dasselbe wie ein Alleinreisender, was in Marokko ungewöhnlich ist und der Hauptgrund, warum diese Route für Solo-Reisende passt."),
  ("Was bedeutet das Limit von 14 Plätzen konkret?", "Der Termin schließt, sobald 14 Plätze verkauft sind. Wir deckeln dort aus zwei praktischen Gründen und nicht als Verkaufstaktik: die Toubkal-Hütte und das Wüstencamp haben in einer bestimmten Nacht begrenzten Platz, und ein Guide kann an einem Gipfelmorgen im Dunkeln nur eine begrenzte Zahl von Menschen betreuen. Wenn ein Termin ausgebucht ist, ist der nächste wirklich der nächste."),
  ("Ist es günstiger, die Teile einzeln zu buchen?", "Nein, und es ist nicht knapp. Vergleichbare Touren aus unserem eigenen Programm — der 4-tägige Toubkal-Trek, eine 3-tägige private Sahara-Tour und ein geführter Medina-Tag — kommen zum Einzelpreis auf rund 1.413 €. Die kombinierte Route kostet 889 €, weil sie eine durchgehende Strecke mit einem Guide und einem Fahrzeug ist statt drei getrennter Reisen mit jeweils eigenen Transfers und eigenem Führungstag."),
  ("Was ist nicht enthalten, und was kostet mich das?", "Das Abendessen in Marrakesch an den beiden Riad-Nächten, weil die Medina voller Orte ist, die man selbst aussuchen sollte, und ein festgelegtes Hoteldinner die schlechteste Art ist, dort zu essen — rechnen Sie mit 100-250 MAD pro Person. Die Reiseversicherung ist Pflicht und Ihre Sache, da der Schutz für Trekking über 4.000 m je nach Police stark variiert. Trinkgelder sind üblich: 150-200 MAD pro Tag für den Guide und 70-100 MAD für die Maultiertreiber, von der Gruppe, bar am Ende."),
  ("Muss ich ein erfahrener Trekker sein?", "Nein, aber Sie müssen fit für zwei lange aufeinanderfolgende Tage sein. Der Gipfeltag dauert rund neun Stunden mit Aufbruch vor Sonnenaufgang, und auf der Normalroute gibt es keine technische Kletterei — kein Seil, kein Kraxeln über den einen oder anderen Felsabsatz hinaus. Verlangt wird Wanderausdauer in der Höhe. Wer sechs Stunden im Bergland gehen kann, ohne den nächsten Morgen zu fürchten, hat die nötige Grundlage."),
 ],
 "content": """
Zwei Ziele, die die meisten als getrennte Reisen behandeln: der Jbel Toubkal auf 4.167 m
und das Sandmeer des Erg Chebbi. Das kostet es, sie in einer achttägigen Route zu
verbinden — und dorthin geht das Geld.

## Die Kernzahl

**889 € pro Person**, an den festen Terminen 2027, reduziert von einem Listenpreis von
921 €.

Das ist ein fester Platzpreis. Er sinkt nicht, wenn Sie Freunde mitbringen, und steigt
nicht, wenn Sie allein kommen — das Gegenteil davon, wie fast jede Reise in Marokko
kalkuliert wird, unsere eingeschlossen.

## Warum der Preis sich nicht mit der Gruppe bewegt

Bei einer privaten Tour sind Guide, Fahrzeug und Fahrer ein fixer Kostenblock, der auf die
Buchenden verteilt wird. Eine Person zahlt alles; sechs teilen durch sechs. Deshalb reicht
unser [4-tägiger Toubkal-Trek](/en/tours/toubkal-summit-trek-4day) von 650 € allein bis zu
260 € pro Person zu sechst.

Ein fester Termin kehrt das um. Die Reise startet an ihrem veröffentlichten Datum, ob vier
oder vierzehn gebucht haben — der Platzpreis ist also fix, und was variiert, ist die
Verfügbarkeit. Für Alleinreisende ist das schlicht das bessere Angebot; für eine
Sechsergruppe lohnt der Vergleich mit der privaten Variante.

## Was dieselbe Strecke einzeln gebucht kostet

Aus unserem eigenen Programm, zum Einzelpreis:

| Baustein | Vergleichbare Tour | Einzelpreis |
|---|---|---|
| Toubkal-Gipfel | [4-tägiger Toubkal-Trek](/en/tours/toubkal-summit-trek-4day) zu 650 € allein | 650 € |
| Sahara / Erg Chebbi | 3-tägige private Sahara-Tour | 690 € |
| Medina Marrakesch | Geführte Kulturtour | 73 € |
| **Summe** | | **1.413 €** |

Die kombinierte Reise kostet 889 € für dieselbe Strecke. Die Differenz ist kein Rabatt —
sie ist das, was wegfällt, wenn aus drei Reisen eine Route wird: zwei Sätze
Hin- und Rücktransfers ab Marrakesch, zwei zusätzliche Führungstage und die Leerfahrten
dazwischen.

## Was enthalten ist

- Alle Flughafentransfers, bei An- und Abreise
- Sieben Nächte: Riad, Gîte, Berghütte und Wüstencamp
- Durchgehend Halbpension und **alle** Mahlzeiten während des Treks
- Staatlich geprüfter Bergführer für die gesamte Reise
- Maultiere am Berg, Kamele am Erg Chebbi
- Nationalparkgebühren

## Was nicht, und warum

- **Das Abendessen in Marrakesch** an den beiden Riad-Nächten. Das ist Absicht. Die Medina
  hat mehr lohnende Adressen, als irgendein Programm für Sie auswählen sollte, und ein
  festgelegtes Hoteldinner ist die denkbar schlechteste Art, dort zu essen. Rechnen Sie
  mit 100-250 MAD.
- **Die Reiseversicherung.** Pflicht, und Ihre Sache, weil der Schutz für Trekking über
  4.000 m je nach Police enorm schwankt — lesen Sie lieber Ihre eigene, als unserer zu
  vertrauen.
- **Trinkgelder.** 150-200 MAD pro Tag für den Guide, 70-100 MAD für die Maultiertreiber,
  von der Gruppe, bar am Ende.

## Die Termine

Fünf Daten, März und April 2027, je 14 Plätze. Die März-Termine bedeuten winterliche
Verhältnisse am Gipfel — lesen Sie
[Toubkal im März besteigen](/en/blog/climbing-toubkal-in-march), bevor Sie wählen, denn der
Berg Anfang März und derselbe Berg Mitte April sind spürbar verschiedene Unternehmungen.

## Kurz gefasst

889 € kaufen acht Tage, zwei von Marokkos markantesten Zielen, einen Guide und eine
durchgehende Route. Dieselbe Strecke als getrennte Reisen zu buchen kostet rund 1.413 €.
Der Platzpreis ändert sich nicht mit der Gruppengröße, was ihn für Alleinreisende
ungewöhnlich attraktiv macht — und für eine Sechsergruppe zum sorgfältigen Vergleich
einlädt.
""",
},
{
 "slug": "tibherine-plane-wreck-toubkal",
 "title": "Das Flugzeugwrack am Tibherine: Marokkos höchste Absturzstelle",
 "excerpt": "Ein Flugzeugmotor steckt im Gipfel neben dem Toubkal, Trümmer verteilen sich über die gesamte Westflanke. Er liegt dort seit 1969, und die meisten Darstellungen bekommen die Details falsch.",
 "heroImage": "/gallery/tibherine-east-plane-wreck-sunrise.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 6,
 "tags": ["Toubkal", "Tibherine", "Hoher Atlas", "Geschichte", "Marokko"],
 "seoTitle": "Das Flugzeugwrack am Tibherine über dem Toubkal",
 "seoDescription": "Eine Lockheed Constellation schlug im November 1969 auf 3.880 m am Tibherine Ost ein, beladen mit Munition für Biafra. Das Wrack wurde erst acht Monate später gefunden.",
 "faq": [
  ("Wo genau liegt das Flugzeugwrack am Tibherine?", "Am Tibherine Ost, einem 3.880 m hohen Gipfel im Toubkal-Massiv, nördlich des Toubkal selbst. Tibherine ist ein Zwillingsgipfel — Ost auf 3.880 m und West auf 3.887 m, in Höhe und Form ähnlich genug, dass sie vor Ort „die Zwillinge“ heißen. Das Wrack liegt auf dem östlichen Gipfel, Trümmer verteilen sich über die Westflanke, und ein Motor steckt im Gipfelfels."),
  ("Welches Flugzeug war es, und was ist passiert?", "Eine Lockheed L-749A Constellation, die nachts von Faro in Portugal Richtung São Tomé flog, beladen mit Munition für Biafra während des nigerianischen Bürgerkriegs. Am 28. November 1969 meldete die Besatzung Triebwerksprobleme und wollte zum nächstgelegenen Flughafen ausweichen, doch die Maschine verlor an Höhe und schlug am Berg ein. Alle acht Menschen an Bord kamen ums Leben."),
  ("Wie lange dauerte es, bis das Wrack gefunden wurde?", "Fast acht Monate. Der Absturz war am 28. November 1969, das Wrack wurde erst am 18. Juli 1970 gefunden, als Bergsteiger im Toubkal-Gebiet auf die Trümmer stießen. Diese Lücke erklärt, warum viele Darstellungen den Absturz auf 1970 datieren — sie zitieren den Fund, nicht den Unfall."),
  ("Führen Toubkal-Treks zum Wrack?", "Nicht auf der Normalroute. Unsere Treks gehen auf den Gipfel des Toubkal und zurück zur Hütte; Tibherine ist ein eigenes Ziel, erreicht über eine andere, weit weniger begangene Linie. Für erfahrene Trekker lässt es sich mit einem ortskundigen Guide ergänzen, aber es passt nicht in ein zweitägiges Programm und sollte nie als beiläufiger Abstecher behandelt werden."),
  ("Ist ein Besuch sicher?", "Das Problem ist das Gelände, nicht das Wrack. Der Zustieg ist unmarkiert, der Untergrund locker und stellenweise ausgesetzt, und die Nordseite des Massivs ist steiler als die Touristenroute. Das ist Gelände für erfahrene Bergwanderer mit Guide und bei stabilen Verhältnissen — und seit 2018 ist ein lizenzierter Guide im Toubkal-Nationalpark ohnehin gesetzlich vorgeschrieben."),
  ("Warum widersprechen sich die Quellen bei der Opferzahl?", "Mehrere Reiseartikel sprechen von vier Besatzungsmitgliedern. Der Eintrag der Bureau of Aircraft Accidents Archives — der maßgebliche Unfallbericht — nennt acht. Deshalb veröffentlichen wir acht. Bei der Höhe ist es ähnlich durcheinander: die Angaben 3.886 und 3.887 m kursieren, weil Autoren den Tibherine West für ein Wrack zitieren, das auf dem Tibherine Ost auf 3.880 m liegt."),
 ],
 "content": """
Wer die Nordseite des Toubkal-Massivs begeht, stößt auf etwas, das die meisten mitten im
Schritt innehalten lässt: ein Flugzeugmotor, im Fels eines 3.880 m hohen Gipfels, mit
Metall über den Hang darunter verstreut.

Er liegt dort seit 1969. Die meisten Darstellungen haben mindestens ein Detail falsch —
hier steht, was der Bericht tatsächlich sagt.

## Was geschah

In der Nacht des **28. November 1969** flog eine Lockheed L-749A Constellation von Faro in
Portugal Richtung São Tomé. Ihre Fracht war Munition, ihr eigentliches Ziel Biafra — das
Gebiet, das sich 1967 von Nigeria abgespalten hatte und Ende 1969 in den letzten Monaten
eines verlorenen Krieges stand.

Über Marokko bekam die Besatzung Triebwerksprobleme und teilte der Flugsicherung mit, sie
wolle zum nächstgelegenen Flughafen ausweichen. Stattdessen verlor die Maschine an Höhe
und schlug am Tibherine Ost ein. Alle acht Menschen an Bord kamen ums Leben.

## Acht Monate, bis es jemand fand

Das Wrack wurde erst am **18. Juli 1970** entdeckt, als Bergsteiger im Toubkal-Gebiet auf
etwa 3.900 m auf die Trümmer stießen.

Diese acht Monate erklären eine hartnäckige Verwechslung: Artikel, die den Absturz auf 1970
datieren, zitieren den Fund, nicht den Unfall. Beide Daten sind real, und sie bezeichnen
nicht dasselbe Ereignis.

## Wo es tatsächlich liegt

Tibherine ist ein **Zwillingsgipfel**: Ost auf 3.880 m und West auf 3.887 m, in Höhe und
Profil ähnlich genug, dass sie vor Ort „die Zwillinge“ heißen. Das Wrack liegt auf dem
**östlichen** Gipfel.

Daher rührt der andere gängige Fehler. Darstellungen mit 3.886 oder 3.887 m geben die Höhe
des Westgipfels für ein Wrack an, das auf dem Ostgipfel liegt.

Trümmer ziehen sich die Westflanke und die Rinne darunter hinab. Einer der Motoren steckt
im Gipfel selbst — das ist das Stück, das die meisten Trekker fotografieren.

## Was die meisten Artikel falsch machen

Die Zahl der Toten ist die Korrektur, auf die es ankommt. Mehrere Reiseberichte nennen vier
Besatzungsmitglieder. Die Bureau of Aircraft Accidents Archives — der maßgebliche
Unfallbericht — nennt **acht**. Wir veröffentlichen acht.

Das ist mehr als Pedanterie. Es geht um einen Kriegsfrachtflug, bei dem alle an Bord
starben und der fast ein Jahr lang unentdeckt an einem Berghang lag. Die Opferzahl zu
halbieren macht daraus eine Kuriosität.

## Kann man es besuchen?

Nicht auf der Normalroute des Toubkal, und wir sagen das lieber klar, als das Gegenteil
anklingen zu lassen.

Unsere [Toubkal-Treks](/en/tours/toubkal-summit-trek-4day) führen auf den Toubkal-Gipfel
auf 4.167 m und zurück zur Hütte. Tibherine ist ein eigenes Ziel auf einer anderen, weit
weniger begangenen Linie. Der Zustieg ist unmarkiert, locker und steiler als alles auf dem
Touristenpfad.

Für erfahrene Trekker lässt es sich ergänzen, mit einem ortskundigen Guide und bei stabilen
Verhältnissen. In ein zweitägiges Programm passt es nicht. Wenn es Ihnen wichtig ist,
sagen Sie es bei der Anfrage, und wir sagen Ihnen ehrlich, ob es zu der Reise passt, die
Sie erwägen — oft lautet die Antwort, dass ein zusätzlicher Tag nötig ist.

Seit 2018 ist ein lizenzierter Guide im Toubkal-Nationalpark ohnehin Pflicht; allein ist
das keine Route für einen Versuch.
""",
},
{
 "slug": "climbing-toubkal-in-march",
 "title": "Toubkal im März besteigen: worauf Sie sich wirklich einlassen",
 "excerpt": "März ist der Monat, in dem man mit Frühling rechnet und Winter vorfindet. So ist der Berg wirklich, das verlangt er an Ausrüstung, und wann April die bessere Antwort ist.",
 "heroImage": "/gallery/toubkal-final-snow-slope-dawn.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 7,
 "tags": ["Toubkal", "Wintertrekking", "Hoher Atlas", "Marokko", "Jahreszeiten"],
 "seoTitle": "Toubkal im März besteigen — Schnee, Ausrüstung, Rat",
 "seoDescription": "Im März ist der Toubkal über 3.000 m noch winterlich: Schnee, Steigeisen und Eispickel. Was Sie erwartet, was Sie brauchen und wann April besser ist.",
 "faq": [
  ("Liegt im März noch Schnee am Toubkal?", "Ja, oberhalb von etwa 3.000 m. Der März steht am Ende der Wintersaison, und der Gipfelaufbau trägt in einem normalen Jahr bis in den April Schnee. Im Tal in Imlil kann Hemdsärmelwetter herrschen, während der Gipfel im Morgengrauen deutlich unter null liegt — die beiden trennen 2.400 m Höhe, und das erklärt das meiste."),
  ("Brauche ich im März Steigeisen und Eispickel?", "In den meisten Jahren ja, und Sie müssen damit umgehen können, nicht nur tragen. Die Schlusshänge werden aus einer Wanderung zu einer Schneetour, sobald sie gefroren sind — und genau dann sind sie am schwierigsten. Beides lässt sich in Imlil für 100-150 MAD pro Tag mieten. Auf unseren geführten Terminen wird es gestellt, wenn die Verhältnisse es verlangen."),
  ("Ist der März gefährlicher als der Sommer?", "Es ist eher ein anderer Berg als schlicht ein härterer. Starke Schneefälle zwischen Januar und März bringen echte Lawinengefahr an belasteten Hängen, und das Wetter dreht schneller als im Sommer. Deshalb zählt ein Guide im März mehr als im Juli: Sie bezahlen das Urteil darüber, ob heute der Tag ist."),
  ("März oder April für den Toubkal?", "April, für die meisten. Die Schneegrenze ist meist zurückgewichen, das Gehen ist leichter und die Tage sind länger, während die Menschenmengen noch fehlen. Wählen Sie März, wenn Sie den Berg bewusst in winterlichem Zustand wollen und sich auf Schnee sicher fühlen — es ist ruhiger, und die Gipfelsicht in kalter, klarer Luft ist die beste des Jahres."),
  ("Wie kalt wird es am Gipfelmorgen?", "Verlässlich unter null, und mit Windchill am Gipfelgrat fühlt es sich deutlich kälter an als das Thermometer zeigt. Sie starten im Dunkeln, dem kältesten Teil des Tages. Eine richtige Isolationsjacke, warme Handschuhe plus ein Ersatzpaar und etwas fürs Gesicht sind im März nicht optional."),
  ("Kann ein Anfänger den Toubkal im März besteigen?", "Ein fitter Anfänger kann das, mit Guide und bei stabilen Verhältnissen — aber es ist ehrlich gesagt anspruchsvoller als derselbe Trek im Juni, und die Gipfelerfolgsquote ist niedriger. Wenn dies Ihr erster großer Berg ist und Ihnen der Gipfel wichtig ist, ist April und später der freundlichere Einstieg. Mit Winterwandererfahrung ist der März dort oben ein sehr lohnender Monat."),
 ],
 "content": """
Der März erwischt die Leute. Die Flüge sind günstig, Marrakesch ist warm, und der Berg
wirkt auf der Karte nah genug für einen Frühlingsspaziergang. Oberhalb von 3.000 m ist es
noch Winter.

## Wie der März wirklich ist

Imlil auf 1.740 m kann im März angenehm sein: Sonne, nachmittags Hemdsärmel, blühende
Mandelbäume in den Tälern. Der Gipfel liegt 2.427 m höher, und dieser Unterschied ist die
ganze Geschichte.

Oberhalb von etwa 3.000 m trägt der Berg Schnee, und in einem normalen Jahr hält ihn der
Gipfelaufbau bis in den April. Am Gipfelmorgen verlassen Sie die Hütte im Dunkeln, bei
Minusgraden, auf Gelände, das über Nacht gefroren ist.

## Die Ausrüstung, die nicht mehr optional ist

- **Steigeisen und Eispickel** — und das Wissen, sie einzusetzen. Gefrorener Schnee ist der
  Moment, in dem die Schlusshänge aufhören, eine Wanderung zu sein, und zugleich der
  Moment, in dem sie am härtesten sind. Die Miete in Imlil kostet 100-150 MAD pro Tag; auf
  unseren geführten Terminen wird gestellt, wenn die Verhältnisse es verlangen.
- **Steife Schuhe**, die ein Steigeisen wirklich aufnehmen. Ein weicher Trailschuh kann das
  nicht — der häufigste Ausrüstungsfehler, den wir im März sehen.
- **Isolation und ein zweites Paar Handschuhe.** Sie starten im Dunkeln, und der Wind am
  Gipfelgrat erledigt den Rest.

## Das Risiko, mit dem niemand wirbt

Starke Schneefälle zwischen Januar und März belasten die Hänge, und daraus entsteht echte
Lawinengefahr an bestimmten Expositionen unter bestimmten Bedingungen. Auch das Wetter
dreht deutlich schneller als im Sommer.

Deshalb ist ein Guide im März mehr wert als im Juli. Sein Wert liegt nicht darin, einen Weg
zu finden, dem Sie selbst folgen könnten — sondern im Urteil, ob heute der Tag zum
Aufstieg ist, und in der Bereitschaft umzukehren. Seit 2018 ist ein lizenzierter Guide im
Toubkal-Nationalpark ohnehin gesetzlich vorgeschrieben.

## März oder April?

**Wählen Sie April** für die unkomplizierteste Variante: die Schneegrenze ist meist
zurückgewichen, das Gehen ist leichter, die Tage sind länger, und die Sommermassen sind
noch nicht da. Für einen ersten großen Berg ist April und später der freundlichere
Einstieg, mit deutlich höherer Erfolgsquote.

**Wählen Sie März**, wenn Sie den Berg bewusst in winterlichem Zustand wollen und sich auf
Schnee sicher fühlen. Es ist ruhiger, und die Gipfelsicht in kalter, klarer Luft ist die
beste des Jahres.

Unsere [8-tägigen Toubkal- und Sahara-Termine](/en/tours/morocco-highlights-toubkal-sahara-8day)
liegen bewusst auf beiden Seiten dieser Grenze — drei Termine im März, zwei im April. Wenn
Sie zwischen ihnen schwanken, ist der Absatz oben die Entscheidung.

## Gönnen Sie sich den zusätzlichen Tag

In jedem Monat entscheidet die Höhe über mehr Gipfel als die Fitness. Das
[4-Tage-Programm](/en/tours/toubkal-summit-trek-4day) steigt allmählich an, mit einer Nacht
zur Akklimatisation; die 2-Tage-Variante geht in rund dreißig Stunden von 1.740 m auf
4.167 m. Im März, wenn der Gipfelgang ohnehin härter und langsamer ist, ist dieser Tag mehr
wert als im Juli.
""",
},
{
 "slug": "toubkal-aguelzim-pass-trek-cost",
 "title": "Was kostet der 3-tägige Toubkal-Trek über den Aguelzim-Pass?",
 "excerpt": "Der Aguelzim-Pass ist der ruhige Weg auf den Toubkal — eine hohe Querung, die das Mizane-Tal komplett umgeht. Das kostet die dreitägige Variante, und dazu passt sie wirklich.",
 "heroImage": "/gallery/tours-toubkal-aguelzim-pass-3day.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 6,
 "tags": ["Toubkal", "Aguelzim", "Hoher Atlas", "Trekking", "Marokko"],
 "seoTitle": "Toubkal Aguelzim-Pass 3 Tage — Preis und Route",
 "seoDescription": "Was der 3-tägige Weg über den Aguelzim-Pass auf den Toubkal kostet, wie er sich vom Zustieg durchs Mizane-Tal unterscheidet, und für wen die ruhige Linie passt.",
 "faq": [
  ("Was ist die Route über den Aguelzim-Pass?", "Ein alternativer Zustieg zur Toubkal-Hütte, der den Tizi n'Aguelzim auf rund 3.560 m überschreitet, statt das Mizane-Tal hinaufzugehen. Sie ist länger und höher als die Normalroute und deutlich ruhiger — der meiste Toubkal-Verkehr sieht sie nie. Der Preis dafür ist ein ernsthafter Pass schon am ersten Tag statt eines allmählichen Talwegs."),
  ("Ist Aguelzim schwerer als die Normalroute?", "Ja, spürbar. Der klassische Zustieg gewinnt die Höhe gleichmäßig entlang eines Tals; Aguelzim stellt Ihnen einen 3.560-m-Pass in den Weg, bevor Sie überhaupt in der Höhe geschlafen haben. Sie passt zu Menschen mit Bergerfahrung, die die ruhige Linie wollen, nicht zu jemandem beim ersten großen Berg."),
  ("Warum Aguelzim statt der Normalroute?", "Einsamkeit und bessere Ausblicke. Der Pfad durchs Mizane-Tal ist im Sommer der meistbegangene im Atlas, mit Maultierkarawanen und Tageswanderern fast bis zur Hütte. Die Aguelzim-Querung ist im Vergleich leer, und der Pass selbst zeigt Ihnen das ganze Massiv auf einmal — was der Zustieg durchs Tal nie tut."),
  ("Wie fit muss ich sein?", "Fit genug für einen langen Tag mit einem hohen Pass, an aufeinanderfolgenden Tagen. Im Sommer ist das keine technische Route — kein Seil, kein Kraxeln — aber die Querung am ersten Tag ist eine echte Anstrengung in der Höhe, bevor Sie akklimatisiert sind. Wer regelmäßig Bergtage von sechs oder sieben Stunden geht, liegt richtig."),
 ],
 "content": """
Fast alle, die den Toubkal besteigen, gehen von Imlil das Mizane-Tal hinauf. Im Sommer
trägt dieser Pfad Maultierkarawanen, Tageswanderer und eine stete Reihe von Trekkern bis
zur Hütte.

Der Aguelzim-Pass ist der andere Weg hinein.

## Die Route

Statt dem Talboden zu folgen, überschreitet diese Linie den **Tizi n'Aguelzim auf rund
3.560 m** und erreicht die Hütte von oben. Sie ist länger, höher und im Vergleich leer —
und der Blick vom Pass gibt Ihnen das ganze Massiv auf einmal, was der Zustieg durchs Tal
nie tut.

## Was es kostet

Unser [3-tägiger Aguelzim-Trek](/en/tours/toubkal-aguelzim-pass-3day) kostet 600 € für eine
Person, 302 € pro Person zu zweit und 230 € pro Person zu sechst. Wie alle unsere privaten
Termine ist er nach einer fallenden Skala kalkuliert, weil Guide und Transport ein fixer
Kostenblock sind, der auf die Teilnehmer verteilt wird: der Preis pro Person sinkt also mit
der Gruppengröße, und ein Alleinreisender trägt das Ganze allein.

Enthalten sind der staatlich geprüfte Bergführer, die Hüttennächte, alle Mahlzeiten am
Berg, Maultierunterstützung für das Gruppengepäck, die Nationalparkgebühren und der
Transport ab und nach Marrakesch.

## Für wen sie passt, ehrlich gesagt

**Nicht** für einen ersten Berg. Die Normalroute gewinnt ihre Höhe allmählich entlang eines
Tals; Aguelzim stellt Ihnen am ersten Tag einen 3.560-m-Pass voran, bevor Sie in der Höhe
geschlafen haben. Das ist ein echter Unterschied darin, wie sich die Tour anfühlt — und
darin, wie wahrscheinlich Sie den Gipfel in gutem Zustand erreichen.

Sie passt zu erfahrenen Bergwanderern, die schon mehrtägige Touren gemacht haben und den
Berg lieber für sich hätten, als die einfachste Linie zu nehmen. Wenn dies Ihr erster
großer Gipfel ist, ist die [4-tägige Normalroute](/en/tours/toubkal-summit-trek-4day) die
bessere Wahl, und wir sagen Ihnen das auch, wenn Sie fragen.

## Was enthalten ist

Dasselbe wie bei unseren anderen Toubkal-Treks: staatlich geprüfter Bergführer,
Hüttenunterkunft, alle Mahlzeiten am Berg, Maultiere für das Gruppengepäck,
Nationalparkgebühren und Transport ab und nach Marrakesch. Reiseversicherung, persönliche
Ausrüstung und Trinkgelder sind nicht enthalten.

## Kurz gefasst

Aguelzim ist der Kennerzustieg auf den Toubkal — höher, länger, ruhiger und schöner. Er
kostet ungefähr das, was der klassische Dreitagestrek kostet, weil der Unterschied in der
Linie liegt und nicht in der Logistik. Nehmen Sie ihn, wenn Sie die Beine haben und die
Einsamkeit wollen; nehmen Sie das Tal, wenn es Ihr erster Atlas-Gipfel ist.
""",
},
]

# --------------------------------------------------------------- ITALIAN ---
POSTS["it"] = [
{
 "slug": "toubkal-sahara-8-day-tour-cost",
 "title": "Quanto costa il tour Toubkal e Sahara di 8 giorni? (partenze 2027)",
 "excerpt": "Otto giorni, due obiettivi: la cima più alta del Nord Africa e le dune di Erg Chebbi. Ecco quanto costa davvero una partenza a data fissa, come si confronta con il prenotare le parti separatamente, e perché il prezzo a persona non cambia con la dimensione del gruppo.",
 "heroImage": "/gallery/toubkal-refuge-approach-trekkers.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 8,
 "tags": ["Toubkal", "Sahara", "Erg Chebbi", "trekking", "Marocco"],
 "seoTitle": "Tour Toubkal e Sahara 8 giorni — prezzo e partenze 2027",
 "seoDescription": "Quanto costa il tour di 8 giorni Toubkal e Sahara: 889 € a persona su partenze fisse, contro 1.413 € prenotando lo stesso percorso separatamente.",
 "faq": [
  ("Quanto costa il tour Toubkal e Sahara di 8 giorni?", "889 € a persona sulle partenze fisse del 2027, scontato da un prezzo di listino di 921 €. Comprende tutti i transfer aeroportuali, la sistemazione in mezza pensione, tutti i pasti durante il trek, la guida alpina abilitata, i muli in montagna e il giro in cammello a Erg Chebbi. La cena a Marrakech, l'assicurazione di viaggio e le mance non sono incluse: una scelta deliberata, spiegata più sotto."),
  ("Perché il prezzo non cambia con la dimensione del gruppo?", "Perché è una partenza a data fissa venduta a posto, non un tour privato. Nei nostri tour privati la guida e il veicolo sono un costo fisso diviso fra i partecipanti, quindi sei persone pagano molto meno ciascuna di una sola. Qui il viaggio parte alla data pubblicata comunque, e ciò che varia è quanti dei 14 posti restano. Due amici pagano a persona quanto un viaggiatore solo: è insolito in Marocco ed è la ragione principale per cui questo itinerario funziona bene per chi viaggia da solo."),
  ("Cosa significa concretamente il limite di 14 posti?", "La partenza chiude quando i 14 posti sono venduti. Mettiamo quel tetto per due ragioni pratiche e non come tattica di vendita: il rifugio del Toubkal e il campo nel deserto hanno spazio limitato in una data notte, e una guida può seguire solo un certo numero di persone la mattina della vetta, al buio. Se una data risulta esaurita, la successiva è davvero la successiva."),
  ("Conviene prenotare le parti separatamente?", "No, e non è una differenza sottile. Prendendo viaggi comparabili dal nostro catalogo — il trek di 4 giorni al Toubkal, un tour privato di 3 giorni nel Sahara e una giornata guidata nella medina — si arriva a circa 1.413 € a tariffa singola. L'itinerario combinato costa 889 € perché è un solo percorso continuo con una guida e un veicolo, invece di tre viaggi distinti, ciascuno con i propri transfer e la propria giornata di guida."),
  ("Cosa non è incluso e quanto mi costerà?", "La cena a Marrakech nelle due notti in riad, perché la medina è piena di posti che vale la pena scegliere da sé e una cena d'albergo imposta è il modo peggiore di mangiare in quella città: calcola 100-250 MAD a testa. L'assicurazione di viaggio è obbligatoria e la organizzi tu, dato che la copertura per il trekking oltre i 4.000 m varia molto da polizza a polizza. Le mance sono consuetudine: 150-200 MAD al giorno per la guida e 70-100 MAD per i mulattieri, da parte del gruppo, in contanti alla fine."),
  ("Serve essere trekker esperti?", "No, ma serve essere in forma per due giornate lunghe consecutive. Il giorno della vetta dura circa nove ore con partenza prima dell'alba, e sulla via normale non c'è arrampicata tecnica: niente corda, nessun passaggio da scalare oltre a qualche gradino roccioso. Quello che serve è resistenza da escursionismo in quota. Se cammini sei ore in montagna senza temere il giorno dopo, hai il motore giusto."),
 ],
 "content": """
Due obiettivi che la maggior parte delle persone tratta come viaggi separati: il Jbel
Toubkal a 4.167 m e il mare di sabbia di Erg Chebbi. Ecco quanto costa unirli in un
percorso di otto giorni, e dove vanno i soldi.

## Il numero principale

**889 € a persona**, sulle partenze fisse del 2027, scontato da un prezzo di listino di
921 €.

È un prezzo a posto, piatto. Non scende se porti amici e non sale se vieni da solo: il
contrario di come è calcolato quasi ogni viaggio in Marocco, compresi i nostri.

## Perché il prezzo non si muove con il gruppo

In un tour privato la guida, il veicolo e l'autista sono un costo fisso diviso fra chi
prenota. Una persona paga tutto; sei persone dividono per sei. Per questo il nostro
[trek di 4 giorni al Toubkal](/en/tours/toubkal-summit-trek-4day) va da 650 € da soli a
260 € ciascuno in sei.

Una partenza fissa capovolge la logica. Il viaggio parte alla data pubblicata che abbiano
prenotato in quattro o in quattordici, quindi il prezzo del posto è piatto e ciò che varia
è la disponibilità. Per chi viaggia solo è nettamente più conveniente; per un gruppo di sei
vale la pena confrontarlo con la versione privata.

## Quanto costa prenotare lo stesso percorso separatamente

Dal nostro catalogo, a tariffa singola:

| Componente | Tour comparabile | Prezzo singolo |
|---|---|---|
| Vetta del Toubkal | [Trek Toubkal 4 giorni](/en/tours/toubkal-summit-trek-4day) a 650 € da soli | 650 € |
| Sahara / Erg Chebbi | Tour privato 3 giorni nel Sahara | 690 € |
| Medina di Marrakech | Visita culturale guidata | 73 € |
| **Totale** | | **1.413 €** |

Il tour combinato costa 889 € per lo stesso terreno. La differenza non è uno sconto: è ciò
che sparisce quando tre viaggi separati diventano un percorso — due serie di transfer
andata e ritorno da Marrakech, due giornate di guida in più e i giorni di veicolo vuoto in
mezzo.

## Cosa è incluso

- Tutti i transfer aeroportuali, all'arrivo e alla partenza
- Sette notti: riad, gîte, rifugio di montagna e campo nel deserto
- Mezza pensione per tutto il viaggio e **tutti** i pasti durante il trek
- Guida alpina abilitata per l'intero percorso
- Muli in montagna, cammelli a Erg Chebbi
- Tasse del parco nazionale

## Cosa no, e perché

- **La cena a Marrakech** nelle due notti in riad. È deliberato. La medina ha più posti che
  meritano di quanti un itinerario dovrebbe sceglierne per te, e una cena d'albergo imposta
  è il modo peggiore di mangiare in quella città. Calcola 100-250 MAD.
- **L'assicurazione di viaggio.** Obbligatoria, e la organizzi tu, perché la copertura per
  il trekking oltre i 4.000 m varia enormemente fra le polizze e preferiamo che tu legga la
  tua piuttosto che fidarti della nostra.
- **Le mance.** 150-200 MAD al giorno per la guida, 70-100 MAD per i mulattieri, da parte
  del gruppo, in contanti alla fine.

## Le partenze

Cinque date, marzo e aprile 2027, 14 posti ciascuna. Le partenze di marzo sono in
condizioni invernali in vetta: leggi
[salire sul Toubkal a marzo](/en/blog/climbing-toubkal-in-march) prima di scegliere, perché
la montagna a inizio marzo e la stessa montagna a metà aprile sono proposte sensibilmente
diverse.

## In breve

889 € comprano otto giorni, due degli obiettivi simbolo del Marocco, una guida e un
percorso continuo. Prenotare lo stesso terreno come viaggi separati costa circa 1.413 €. Il
prezzo del posto non cambia con la dimensione del gruppo, il che lo rende insolitamente
conveniente per chi viaggia da solo e degno di un confronto attento se siete in sei.
""",
},
{
 "slug": "tibherine-plane-wreck-toubkal",
 "title": "Il relitto d'aereo sul Tibherine: il sito di incidente più alto del Marocco",
 "excerpt": "Un motore d'aereo è incastrato in una cima accanto al Toubkal, con detriti sparsi lungo tutta la parete ovest. È lì dal 1969, e la maggior parte dei racconti sbaglia i dettagli.",
 "heroImage": "/gallery/tibherine-east-plane-wreck-sunrise.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 6,
 "tags": ["Toubkal", "Tibherine", "Alto Atlante", "storia", "Marocco"],
 "seoTitle": "Il relitto d'aereo sul Tibherine sopra il Toubkal",
 "seoDescription": "Un Lockheed Constellation si schiantò sul Tibherine Est a 3.880 m nel novembre 1969, carico di munizioni per il Biafra. Il relitto fu trovato solo otto mesi dopo.",
 "faq": [
  ("Dove si trova esattamente il relitto del Tibherine?", "Sul Tibherine Est, una cima di 3.880 m nel massiccio del Toubkal, a nord del Toubkal stesso. Il Tibherine è una cima gemella — Est a 3.880 m e Ovest a 3.887 m, abbastanza simili per quota e forma da essere chiamate localmente «le gemelle». Il relitto è sulla cima orientale, con detriti sparsi lungo la parete ovest e un motore incastrato nelle rocce di vetta."),
  ("Che aereo era e cosa è successo?", "Un Lockheed L-749A Constellation, in volo notturno da Faro, in Portogallo, verso São Tomé, carico di munizioni destinate al Biafra durante la guerra civile nigeriana. Il 28 novembre 1969 l'equipaggio segnalò problemi ai motori e chiese di dirottare sull'aeroporto più vicino, ma l'aereo perse quota e colpì la montagna. Tutte e otto le persone a bordo morirono."),
  ("Quanto tempo passò prima che il relitto fosse trovato?", "Quasi otto mesi. L'incidente avvenne il 28 novembre 1969 e il relitto fu localizzato solo il 18 luglio 1970, quando alcuni alpinisti in salita nella zona del Toubkal si imbatterono nei detriti. È questo intervallo a spiegare perché molti racconti datino l'incidente al 1970: citano il ritrovamento, non lo schianto."),
  ("I trek del Toubkal passano dal relitto?", "Non sulla via normale. I nostri trek salgono in vetta al Toubkal e tornano al rifugio; il Tibherine è un obiettivo a parte, raggiunto per una linea diversa e molto meno frequentata. Può essere aggiunto per trekker esperti con una guida che conosca l'avvicinamento, ma non rientra in un itinerario di due giorni e non va mai trattato come una deviazione occasionale."),
  ("È sicuro andarci?", "Il problema è il terreno, non il relitto. L'avvicinamento non è segnalato, il fondo è instabile ed esposto a tratti, e il versante nord del massiccio è più ripido della via turistica. È terreno per escursionisti esperti con una guida e in condizioni stabili — e dal 2018 una guida abilitata è comunque obbligatoria in tutto il Parco Nazionale del Toubkal."),
  ("Perché le fonti non concordano sul numero di vittime?", "Diversi articoli di viaggio parlano di quattro membri d'equipaggio. Il registro del Bureau of Aircraft Accidents Archives — il rapporto d'incidente di riferimento — dice otto. Pubblichiamo otto per questo. La quota è confusa allo stesso modo: le cifre di 3.886 e 3.887 m circolano perché si cita il Tibherine Ovest per un relitto che sta sul Tibherine Est, a 3.880 m."),
 ],
 "content": """
Percorri il versante nord del massiccio del Toubkal e ti imbatti in qualcosa che ferma
quasi tutti a metà passo: un motore d'aereo, posato fra le rocce di una cima di 3.880 m,
con metallo sparso lungo il pendio sottostante.

È lì dal 1969. La maggior parte dei racconti sbaglia almeno un dettaglio, quindi ecco cosa
dice davvero il rapporto.

## Cosa è successo

Nella notte del **28 novembre 1969** un Lockheed L-749A Constellation volava da Faro, in
Portogallo, verso São Tomé. Il carico era munizioni, e la destinazione finale il Biafra:
il territorio che si era separato dalla Nigeria nel 1967 e che, alla fine del 1969, era
negli ultimi mesi di una guerra perduta.

Sopra il Marocco l'equipaggio ebbe problemi ai motori e comunicò al controllo del traffico
aereo che voleva dirottare sull'aeroporto più vicino. L'aereo perse invece quota e colpì il
Tibherine Est. Tutte e otto le persone a bordo morirono.

## Otto mesi prima che qualcuno lo trovasse

Il relitto fu localizzato solo il **18 luglio 1970**, quando alcuni alpinisti in salita
nella zona del Toubkal si imbatterono nei detriti attorno ai 3.900 m.

Questo intervallo di otto mesi spiega una confusione persistente: gli articoli che datano
l'incidente al 1970 citano il ritrovamento, non lo schianto. Entrambe le date sono reali, e
non sono lo stesso evento.

## Dove si trova davvero

Il Tibherine è una **cima gemella**: Est a 3.880 m e Ovest a 3.887 m, abbastanza simili per
quota e profilo da essere chiamate localmente «le gemelle». Il relitto è sulla cima
**orientale**.

Da qui nasce l'altro errore comune. I racconti che citano 3.886 o 3.887 m danno la quota
della cima ovest per un relitto che giace su quella est.

I detriti scendono lungo la parete ovest e il canale sottostante. Uno dei motori è
incastrato nella vetta stessa, ed è il pezzo che quasi tutti i trekker fotografano.

## Cosa sbaglia la maggior parte degli articoli

Il numero dei morti è la correzione che conta. Diversi reportage di viaggio parlano di
quattro membri d'equipaggio. Il Bureau of Aircraft Accidents Archives — il rapporto
d'incidente di riferimento — dice **otto**. Noi pubblichiamo otto.

Non è pedanteria. Si tratta di un volo di carico bellico che uccise tutti a bordo e rimase
introvabile su un fianco di montagna per quasi un anno. Dimezzare il bilancio lo trasforma
in una curiosità.

## Si può andare a vederlo?

Non sulla via normale del Toubkal, e preferiamo dirlo chiaramente piuttosto che lasciar
intendere il contrario.

I nostri [trek del Toubkal](/en/tours/toubkal-summit-trek-4day) salgono alla vetta del
Toubkal a 4.167 m e tornano al rifugio. Il Tibherine è un obiettivo a parte su una linea
diversa e molto meno battuta. L'avvicinamento non è segnalato, il fondo è instabile e più
ripido di qualsiasi cosa sul sentiero turistico.

Può essere aggiunto per trekker esperti, con una guida che conosca il terreno e in
condizioni stabili. Non rientra in un itinerario di due giorni. Se vederlo ti interessa,
dillo al momento della richiesta e ti diremo onestamente se rientra nel viaggio che stai
valutando: spesso la risposta è che serve un giorno in più.

Dal 2018 una guida abilitata è obbligatoria in tutto il Parco Nazionale del Toubkal, quindi
non è comunque una via da tentare da soli.
""",
},
{
 "slug": "climbing-toubkal-in-march",
 "title": "Salire sul Toubkal a marzo: a cosa stai davvero andando incontro",
 "excerpt": "Marzo è il mese in cui si prenota aspettandosi la primavera e si trova l'inverno. Ecco com'è davvero la montagna, che attrezzatura richiede, e quando aprile è la risposta migliore.",
 "heroImage": "/gallery/toubkal-final-snow-slope-dawn.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 7,
 "tags": ["Toubkal", "trekking invernale", "Alto Atlante", "Marocco", "stagioni"],
 "seoTitle": "Salire sul Toubkal a marzo — neve, attrezzatura e consigli",
 "seoDescription": "A marzo il Toubkal è ancora invernale sopra i 3.000 m: neve, ramponi e piccozza. Cosa aspettarsi, cosa serve e quando scegliere aprile.",
 "faq": [
  ("C'è ancora neve sul Toubkal a marzo?", "Sì, sopra i 3.000 m circa. Marzo è la coda della stagione invernale, e il cono di vetta di norma tiene la neve fino ad aprile in un anno normale. A valle, a Imlil, si può stare in maniche corte mentre la cima è ben sotto zero all'alba: li separano 2.400 m di dislivello, ed è lì quasi tutta la spiegazione."),
  ("Servono ramponi e piccozza a marzo?", "Nella maggior parte degli anni sì, e bisogna saperli usare, non solo portarli. I pendii finali passano da camminata a salita su neve quando sono gelati, ed è esattamente quando sono più difficili. Entrambi si noleggiano a Imlil per 100-150 MAD al giorno. Sulle nostre partenze guidate vengono forniti quando le condizioni lo richiedono."),
  ("Marzo è più pericoloso dell'estate?", "È una montagna diversa più che semplicemente più dura. Le forti nevicate fra gennaio e marzo creano un rischio valanghe reale sui pendii carichi, e il tempo cambia più in fretta che d'estate. Per questo una guida conta di più a marzo che a luglio: quello che paghi è il giudizio su se oggi sia il giorno giusto."),
  ("Marzo o aprile per salire sul Toubkal?", "Aprile, per la maggior parte delle persone. Il limite delle nevi si è di solito ritirato, camminare è più facile e le giornate sono più lunghe, mentre la folla non è ancora arrivata. Scegli marzo se vuoi davvero la montagna in condizione invernale e te la cavi sulla neve: è più tranquillo, e le viste dalla vetta nell'aria fredda e limpida sono le migliori dell'anno."),
  ("Quanto fa freddo la mattina della vetta?", "Sotto zero, in modo affidabile, e con il vento sulla cresta la sensazione è decisamente più fredda di quanto dica il termometro. Si parte al buio, il momento più freddo della giornata. Un vero piumino, guanti caldi più un paio di riserva e qualcosa per coprire il viso non sono opzionali a marzo."),
  ("Un principiante può salire sul Toubkal a marzo?", "Un principiante allenato può farlo, con una guida e in condizioni stabili — ma è onestamente più impegnativo dello stesso trek a giugno, e la percentuale di successo in vetta è più bassa. Se è la tua prima montagna grande e arrivare in cima ti importa, da aprile in poi è un'introduzione più gentile. Se hai esperienza di montagna invernale, marzo è un mese molto appagante lassù."),
 ],
 "content": """
Marzo è il mese che coglie di sorpresa. I voli costano poco, Marrakech è calda, e la
montagna sembra abbastanza vicina sulla carta da sembrare una passeggiata primaverile.
Sopra i 3.000 m è ancora inverno.

## Com'è davvero marzo

Imlil, a 1.740 m, può essere piacevole a marzo: sole, maniche corte nel pomeriggio,
mandorli in fiore nelle valli. La vetta è 2.427 m più in alto, e questa differenza è tutta
la storia.

Sopra i 3.000 m circa la montagna porta neve, e in un anno normale il cono di vetta la
conserva fino ad aprile. La mattina della vetta si lascia il rifugio al buio, con
temperature sotto zero, su un terreno gelato durante la notte.

## L'attrezzatura che smette di essere opzionale

- **Ramponi e piccozza**, e la capacità di usarli. La neve gelata è il momento in cui i
  pendii finali smettono di essere una camminata, ed è anche quando sono più duri. Il
  noleggio a Imlil costa 100-150 MAD al giorno; sulle nostre partenze guidate vengono
  forniti quando le condizioni lo richiedono.
- **Scarponi rigidi** che reggano davvero un rampone. Una scarpa da trail morbida non lo
  fa, ed è l'errore di attrezzatura più comune che vediamo a marzo.
- **Isolamento e un paio di guanti di riserva.** Si parte al buio e il vento sulla cresta
  di vetta fa il resto.

## Il rischio che nessuno pubblicizza

Le forti nevicate fra gennaio e marzo caricano i pendii, e questo crea un rischio valanghe
reale su certe esposizioni in certe condizioni. Anche il tempo cambia molto più in fretta
che d'estate.

Per questo una guida vale di più a marzo che a luglio. Il suo valore non è trovare un
sentiero che potresti seguire da solo: è il giudizio su se oggi sia il giorno per salire, e
la disponibilità a tornare indietro. Dal 2018 una guida abilitata è comunque obbligatoria
nel Parco Nazionale del Toubkal.

## Marzo o aprile?

**Scegli aprile** se vuoi la versione più lineare: il limite delle nevi si è di solito
ritirato, camminare è più facile, le giornate sono più lunghe e la folla estiva non è
ancora arrivata. Per una prima montagna grande, da aprile in poi è un'introduzione più
gentile e la percentuale di successo è nettamente più alta.

**Scegli marzo** se vuoi davvero la montagna in condizione invernale e te la cavi sulla
neve. È più tranquillo, e le viste dalla vetta nell'aria fredda e limpida sono le migliori
dell'anno.

Le nostre
[partenze di 8 giorni Toubkal e Sahara](/en/tours/morocco-highlights-toubkal-sahara-8day)
sono su entrambi i lati di quella linea — tre date a marzo, due ad aprile — ed è
deliberato. Se sei indeciso, il paragrafo qui sopra è la decisione.

## Concediti il giorno in più

In qualsiasi mese, è la quota a decidere più vette della forma fisica. L'
[itinerario di 4 giorni](/en/tours/toubkal-summit-trek-4day) sale gradualmente con una
notte di acclimatamento; la versione di 2 giorni passa da 1.740 m a 4.167 m in una
trentina d'ore. A marzo, quando la spinta finale è comunque più dura e più lenta, quel
giorno vale più che a luglio.
""",
},
{
 "slug": "toubkal-aguelzim-pass-trek-cost",
 "title": "Quanto costa il trek di 3 giorni al Toubkal per il passo di Aguelzim?",
 "excerpt": "Il passo di Aguelzim è la via tranquilla al Toubkal: un valico in quota che evita del tutto la valle del Mizane. Ecco quanto costa la versione di tre giorni e a chi si adatta davvero.",
 "heroImage": "/gallery/tours-toubkal-aguelzim-pass-3day.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 6,
 "tags": ["Toubkal", "Aguelzim", "Alto Atlante", "trekking", "Marocco"],
 "seoTitle": "Trek passo di Aguelzim al Toubkal, 3 giorni — prezzo e via",
 "seoDescription": "Quanto costa la via del passo di Aguelzim al Toubkal in 3 giorni, in cosa differisce dall'avvicinamento classico per il Mizane, e a chi si adatta la linea tranquilla.",
 "faq": [
  ("Cos'è la via del passo di Aguelzim?", "Un avvicinamento alternativo al rifugio del Toubkal che valica il Tizi n'Aguelzim a circa 3.560 m invece di risalire la valle del Mizane. È più lunga e più alta della linea normale, e decisamente più tranquilla: quasi tutto il traffico del Toubkal non la vede mai. Il prezzo da pagare è un valico serio già il primo giorno invece di una salita graduale sul fondovalle."),
  ("Aguelzim è più difficile della via normale?", "Sì, in modo sensibile. L'avvicinamento classico guadagna quota in modo costante lungo una valle; Aguelzim mette un valico di 3.560 m sulla tua strada prima ancora che tu abbia dormito in quota. Si adatta a chi ha esperienza di montagna e vuole la linea tranquilla, non a chi affronta la sua prima cima."),
  ("Perché scegliere Aguelzim invece della via normale?", "Solitudine, e panorami migliori. Il sentiero della valle del Mizane è il più frequentato dell'Atlante d'estate, con carovane di muli ed escursionisti giornalieri quasi fino al rifugio. Il valico di Aguelzim è vuoto in confronto, e il passo stesso ti dà tutto il massiccio in un colpo d'occhio, cosa che l'avvicinamento per la valle non fa mai."),
  ("Che forma fisica serve?", "Quella che basta per una giornata lunga con un valico alto, su giorni consecutivi. In estate non è una via tecnica — niente corda, niente arrampicata — ma il valico del primo giorno è uno sforzo reale in quota prima di esserti acclimatato. Se fai regolarmente giornate di montagna di sei o sette ore, sei nella fascia giusta."),
 ],
 "content": """
Quasi tutti quelli che salgono sul Toubkal risalgono la valle del Mizane da Imlil.
D'estate quel sentiero porta carovane di muli, escursionisti giornalieri e una fila
costante di trekker fino al rifugio.

Il passo di Aguelzim è l'altra via d'ingresso.

## L'itinerario

Invece di seguire il fondovalle, questa linea valica il **Tizi n'Aguelzim a circa 3.560 m**
e scende al rifugio dall'alto. È più lunga, più alta e vuota in confronto — e la vista dal
passo ti dà l'intero massiccio in una volta, cosa che l'avvicinamento per la valle non fa
mai.

## Quanto costa

Il nostro [trek Aguelzim di 3 giorni](/en/tours/toubkal-aguelzim-pass-3day) costa 600 € per
una persona, 302 € ciascuno in due e 230 € ciascuno in sei. Come tutte le nostre partenze
private è tariffato su scala decrescente, perché la guida e il trasporto sono un costo
fisso diviso fra i partecipanti: il prezzo a persona scende al crescere del gruppo, e chi
va da solo se lo carica tutto.

Comprende la guida alpina abilitata, le notti in rifugio, tutti i pasti in montagna, il
supporto dei muli per il materiale collettivo, le tasse del parco nazionale e il trasporto
andata e ritorno da Marrakech.

## A chi si adatta, onestamente

**Non** a una prima montagna. La via normale guadagna quota gradualmente lungo una valle;
Aguelzim ti mette davanti un valico di 3.560 m il primo giorno, prima che tu abbia dormito
in quota. È una differenza reale nel modo in cui il viaggio si sente, e nelle probabilità
che tu arrivi in vetta stando bene.

Si adatta a escursionisti esperti che hanno già fatto traversate di più giorni e
preferiscono avere la montagna per sé piuttosto che prendere la linea più facile. Se è la
tua prima cima importante, la [via normale di 4 giorni](/en/tours/toubkal-summit-trek-4day)
è la scelta migliore e te lo diremo se lo chiedi.

## Cosa è incluso

Lo stesso dei nostri altri trek del Toubkal: guida alpina abilitata, sistemazione in
rifugio, tutti i pasti in montagna, muli per il materiale collettivo, tasse del parco
nazionale e trasporto andata e ritorno da Marrakech. L'assicurazione di viaggio, il
materiale personale e le mance non sono inclusi.

## In breve

Aguelzim è l'avvicinamento da intenditori al Toubkal: più alto, più lungo, più tranquillo e
più bello. Costa all'incirca quanto il trek classico di tre giorni, perché la differenza sta
nella linea e non nella logistica. Prendilo se hai le gambe e vuoi la solitudine; prendi la
valle se è la tua prima cima dell'Atlante.
""",
},
]

# ---------------------------------------------------------------- ARABIC ---
POSTS["ar"] = [
{
 "slug": "toubkal-sahara-8-day-tour-cost",
 "title": "كم تكلف رحلة توبقال والصحراء في 8 أيام؟ (مواعيد 2027)",
 "excerpt": "ثمانية أيام وهدفان: أعلى قمة في شمال أفريقيا وكثبان عرق الشبي. هذه هي التكلفة الحقيقية لموعد ثابت، ومقارنتها بحجز الأجزاء منفصلة، ولماذا لا يتغيّر السعر للشخص بحجم المجموعة.",
 "heroImage": "/gallery/toubkal-refuge-approach-trekkers.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 8,
 "tags": ["توبقال", "الصحراء", "عرق الشبي", "المشي الجبلي", "المغرب"],
 "seoTitle": "رحلة توبقال والصحراء 8 أيام — السعر ومواعيد 2027",
 "seoDescription": "تكلفة رحلة الثمانية أيام إلى توبقال والصحراء: 889 € للشخص في مواعيد ثابتة، مقابل 1,413 € عند حجز المسار نفسه منفصلًا.",
 "faq": [
  ("كم تكلف رحلة توبقال والصحراء في 8 أيام؟", "889 € للشخص في المواعيد الثابتة لعام 2027، مخفّضًا من سعر قائمة قدره 921 €. يشمل ذلك جميع التنقلات من المطار وإليه، والإقامة بنصف إقامة، وجميع الوجبات خلال المسير الجبلي، والمرشد الجبلي المرخّص، والبغال في الجبل، وركوب الجمال في عرق الشبي. أما العشاء في مراكش وتأمين السفر والإكراميات فغير مشمولة، وهو اختيار مقصود نشرحه أدناه."),
  ("لماذا لا يتغيّر السعر بحسب حجم المجموعة؟", "لأن هذه رحلة بموعد ثابت تُباع بالمقعد، لا رحلة خاصة. في رحلاتنا الخاصة يكون المرشد والسيارة تكلفة ثابتة تُقسَّم على المشاركين، فيدفع ستة أشخاص أقل بكثير للفرد مما يدفعه شخص واحد. أما هنا فالرحلة تنطلق في موعدها المعلن على أي حال، والمتغيّر هو عدد المقاعد المتبقية من أصل 14. صديقان يدفعان للشخص ما يدفعه مسافر منفرد، وهو أمر غير معتاد في المغرب، وهو السبب الرئيسي لملاءمة هذا المسار لمن يسافر وحده."),
  ("ماذا يعني عمليًا حدّ الـ14 مقعدًا؟", "يُغلق الموعد فور بيع المقاعد الأربعة عشر. نضع هذا السقف لسببين عمليين لا كأسلوب بيع: ملجأ توبقال ومخيم الصحراء كلاهما محدود السعة في ليلة بعينها، والمرشد لا يستطيع رعاية أكثر من عدد معيّن من الأشخاص في صباح القمة وفي الظلام. وإذا ظهر موعد مكتملًا، فالموعد التالي هو التالي فعلًا."),
  ("هل حجز الأجزاء منفصلة أرخص؟", "لا، والفارق ليس بسيطًا. بأخذ رحلات مماثلة من كتالوجنا نفسه — مسير توبقال في 4 أيام، ورحلة صحراوية خاصة في 3 أيام، ويوم مصحوب بمرشد في المدينة العتيقة — يبلغ المجموع نحو 1,413 € بسعر الفرد. المسار المدمج بـ889 € لأنه مسار واحد متصل بمرشد واحد وسيارة واحدة، بدل ثلاث رحلات منفصلة يحمل كل منها تنقلاته ويوم إرشاده."),
  ("ما غير المشمول وكم سيكلّفني؟", "العشاء في مراكش في ليلتَي الرياض، لأن المدينة العتيقة مليئة بأماكن تستحق أن تختارها بنفسك، وعشاء الفندق المفروض هو أسوأ طريقة للأكل في تلك المدينة — احسب 100 إلى 250 درهمًا للفرد. وتأمين السفر إلزامي وعليك ترتيبه، لأن تغطية المشي فوق 4000 م تختلف كثيرًا بين الوثائق. والإكراميات عرف متبع: 150 إلى 200 درهم يوميًا للمرشد و70 إلى 100 درهم للبغّالة، من المجموعة، نقدًا في النهاية."),
  ("هل يجب أن أكون متمرسًا في المشي الجبلي؟", "لا، لكن يجب أن تكون لائقًا ليومين طويلين متتاليين. يوم القمة نحو تسع ساعات بانطلاق قبل الفجر، ولا يوجد تسلق تقني في المسار العادي: لا حبال ولا مقاطع تسلق سوى بعض الحواف الصخرية. المطلوب هو قدرة على المشي في المرتفعات. إن كنت تستطيع المشي ست ساعات في أرض جبلية دون أن تخشى اليوم التالي، فلديك ما يلزم."),
 ],
 "content": """
هدفان يعاملهما أغلب الناس كرحلتين منفصلتين: جبل توبقال على ارتفاع 4167 م، وبحر الرمال في
عرق الشبي. هذه تكلفة جمعهما في مسار واحد من ثمانية أيام، وإلى أين يذهب المال.

## الرقم الأساسي

**889 € للشخص**، في المواعيد الثابتة لعام 2027، مخفّضًا من سعر قائمة قدره 921 €.

إنه سعر مقعد ثابت. لا ينخفض إن أحضرت أصدقاء ولا يرتفع إن جئت وحدك — عكس ما تُسعَّر به تقريبًا
كل رحلة في المغرب، بما فيها رحلاتنا.

## لماذا لا يتحرك السعر مع المجموعة

في الرحلة الخاصة يكون المرشد والسيارة والسائق تكلفة ثابتة تُقسَّم على من يحجز. شخص واحد يدفعها
كاملة؛ وستة أشخاص يقسمونها على ستة. لذلك يتراوح
[مسير توبقال في 4 أيام](/en/tours/toubkal-summit-trek-4day) بين 650 € للفرد منفردًا و260 €
للفرد عند ستة أشخاص.

الموعد الثابت يقلب هذا. الرحلة تنطلق في تاريخها المعلن سواء حجز أربعة أو أربعة عشر، فسعر
المقعد ثابت والمتغيّر هو التوفر. لمن يسافر وحده هذا أفضل بوضوح؛ ولمجموعة من ستة تستحق
المقارنة مع النسخة الخاصة.

## تكلفة حجز المسار نفسه منفصلًا

من كتالوجنا نفسه، بسعر الفرد:

| العنصر | الرحلة المماثلة | سعر الفرد |
|---|---|---|
| قمة توبقال | [مسير توبقال 4 أيام](/en/tours/toubkal-summit-trek-4day) بـ650 € منفردًا | 650 € |
| الصحراء / عرق الشبي | رحلة صحراوية خاصة 3 أيام | 690 € |
| مدينة مراكش العتيقة | جولة ثقافية مصحوبة بمرشد | 73 € |
| **المجموع** | | **1,413 €** |

الرحلة المدمجة بـ889 € للمسار نفسه. الفارق ليس خصمًا، بل هو ما يختفي حين تصير ثلاث رحلات
مسارًا واحدًا: مجموعتان من التنقلات ذهابًا وإيابًا من مراكش، ويومان إضافيان من الإرشاد، وأيام
السيارة الفارغة بينهما.

## ما هو مشمول

- جميع التنقلات من المطار وإليه، عند الوصول والمغادرة
- سبع ليالٍ: رياض، ودار ضيافة، وملجأ جبلي، ومخيم صحراوي
- نصف إقامة طوال الرحلة، و**جميع** الوجبات خلال المسير
- مرشد جبلي مرخّص طوال الرحلة
- البغال في الجبل، والجمال في عرق الشبي
- رسوم المنتزه الوطني

## وما ليس مشمولًا، ولماذا

- **العشاء في مراكش** في ليلتَي الرياض. وهذا مقصود. في المدينة العتيقة من الأماكن الجديرة
  أكثر مما ينبغي لأي برنامج أن يختاره عنك، وعشاء الفندق المفروض أسوأ طريقة ممكنة للأكل هناك.
  احسب 100 إلى 250 درهمًا.
- **تأمين السفر.** إلزامي، وعليك ترتيبه، لأن تغطية المشي فوق 4000 م تختلف اختلافًا كبيرًا بين
  الوثائق، ونفضّل أن تقرأ وثيقتك بدل أن تثق بوثيقتنا.
- **الإكراميات.** 150 إلى 200 درهم يوميًا للمرشد، و70 إلى 100 درهم للبغّالة، من المجموعة،
  نقدًا في النهاية.

## المواعيد

خمسة تواريخ، مارس وأبريل 2027، 14 مقعدًا لكل موعد. مواعيد مارس تعني ظروفًا شتوية في القمة —
اقرأ [صعود توبقال في مارس](/en/blog/climbing-toubkal-in-march) قبل أن تختار، فالجبل في مطلع
مارس والجبل نفسه في منتصف أبريل أمران مختلفان فعلًا.

## باختصار

889 € تشتري ثمانية أيام، وهدفين من أبرز معالم المغرب، ومرشدًا واحدًا ومسارًا متصلًا. حجز
المسار نفسه كرحلات منفصلة يكلّف نحو 1,413 €. وسعر المقعد لا يتغيّر بحجم المجموعة، ما يجعله
قيمة استثنائية لمن يسافر وحده، ويستحق مقارنة متأنية إن كنتم ستة.
""",
},
{
 "slug": "tibherine-plane-wreck-toubkal",
 "title": "حطام الطائرة على تيبهرين: أعلى موقع تحطّم في المغرب",
 "excerpt": "محرك طائرة غارس في قمة مجاورة لتوبقال، وحطام متناثر على الوجه الغربي كله. إنه هناك منذ 1969، وأغلب الروايات تخطئ في التفاصيل.",
 "heroImage": "/gallery/tibherine-east-plane-wreck-sunrise.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 6,
 "tags": ["توبقال", "تيبهرين", "الأطلس الكبير", "تاريخ", "المغرب"],
 "seoTitle": "حطام الطائرة على تيبهرين فوق توبقال",
 "seoDescription": "اصطدمت طائرة لوكهيد كونستليشن بتيبهرين الشرقية على 3880 م في نوفمبر 1969 محمّلة بذخيرة إلى بيافرا. ولم يُعثر على الحطام إلا بعد ثمانية أشهر.",
 "faq": [
  ("أين يقع حطام تيبهرين بالضبط؟", "على تيبهرين الشرقية، قمة ارتفاعها 3880 م في كتلة توبقال، إلى الشمال من توبقال نفسها. وتيبهرين قمة توأم — الشرقية على 3880 م والغربية على 3887 م، متقاربتان في الارتفاع والشكل حتى تُسمّيان محليًا «التوأمين». والحطام على القمة الشرقية، مع بقايا متناثرة على الوجه الغربي ومحرك غارس في صخور القمة."),
  ("ما الطائرة وماذا حدث؟", "طائرة لوكهيد L-749A كونستليشن، كانت تحلّق ليلًا من فارو في البرتغال نحو ساو تومي، محمّلة بذخيرة متجهة إلى بيافرا خلال الحرب الأهلية النيجيرية. في 28 نوفمبر 1969 أبلغ الطاقم عن أعطال في المحركات وطلب التحويل إلى أقرب مطار، لكن الطائرة فقدت ارتفاعها واصطدمت بالجبل. وقُتل جميع من على متنها وعددهم ثمانية."),
  ("كم مضى قبل العثور على الحطام؟", "نحو ثمانية أشهر. وقع التحطّم في 28 نوفمبر 1969 ولم يُعثر على الحطام إلا في 18 يوليو 1970، حين صادفه متسلقون في منطقة توبقال. وهذه الفجوة تفسّر لماذا تؤرّخ روايات كثيرة الحادث بعام 1970: إنها تنقل تاريخ الاكتشاف لا تاريخ الحادث."),
  ("هل تمرّ رحلات توبقال بالحطام؟", "ليس في المسار العادي. رحلاتنا تصعد إلى قمة توبقال ثم تعود إلى الملجأ؛ وتيبهرين هدف منفصل يُبلغ عبر خط مختلف أقل ارتيادًا بكثير. ويمكن إضافته للمتمرسين مع مرشد يعرف طريق الوصول، لكنه لا يناسب برنامج يومين ولا ينبغي أبدًا التعامل معه كانحراف عابر."),
  ("هل زيارته آمنة؟", "المشكلة في الأرض لا في الحطام. الطريق غير معلَّم، والأرض هشّة ومكشوفة في مواضع، والجانب الشمالي من الكتلة أشد انحدارًا من المسار السياحي. إنها أرض لمشّائين متمرسين برفقة مرشد وفي ظروف مستقرة — ومنذ 2018 صار المرشد المرخّص إلزاميًا على أي حال في كل المنتزه الوطني لتوبقال."),
  ("لماذا تختلف المصادر في عدد الضحايا؟", "تتحدث عدة مقالات سياحية عن أربعة من أفراد الطاقم. أما سجل Bureau of Aircraft Accidents Archives — وهو تقرير الحادث المرجعي — فيذكر ثمانية. لذلك ننشر ثمانية. والارتفاع مشوّش بالطريقة نفسها: يتداول البعض 3886 و3887 م لأنهم ينقلون ارتفاع تيبهرين الغربية لحطام يقع على تيبهرين الشرقية عند 3880 م."),
 ],
 "content": """
امشِ على الجانب الشمالي من كتلة توبقال وستصادف ما يوقف أغلب الناس في منتصف خطوتهم: محرك
طائرة، مستقر بين صخور قمة على 3880 م، ومعدن متناثر على المنحدر تحته.

إنه هناك منذ 1969. وأغلب الروايات تخطئ في تفصيل واحد على الأقل، وهذا ما يقوله السجل فعلًا.

## ما الذي حدث

في ليلة **28 نوفمبر 1969** كانت طائرة لوكهيد L-749A كونستليشن تحلّق من فارو في البرتغال نحو
ساو تومي. حمولتها ذخيرة، ووجهتها النهائية بيافرا — الإقليم الذي انفصل عن نيجيريا عام 1967
وكان، في أواخر 1969، في الأشهر الأخيرة من حرب خاسرة.

فوق المغرب واجه الطاقم عطلًا في المحركات وأبلغ المراقبة الجوية برغبته في التحويل إلى أقرب
مطار. لكن الطائرة فقدت ارتفاعها بدل ذلك، واصطدمت بتيبهرين الشرقية. وقُتل جميع من على متنها
وعددهم ثمانية.

## ثمانية أشهر قبل أن يجدها أحد

لم يُعثر على الحطام إلا في **18 يوليو 1970**، حين صادفه متسلقون في منطقة توبقال على نحو
3900 م.

وهذه الأشهر الثمانية تفسّر التباسًا راسخًا: المقالات التي تؤرّخ التحطّم بعام 1970 تنقل تاريخ
الاكتشاف لا تاريخ الحادث. والتاريخان حقيقيان، وليسا الحدث نفسه.

## أين يقع فعلًا

تيبهرين **قمة توأم**: الشرقية على 3880 م والغربية على 3887 م، متقاربتان في الارتفاع والهيئة
حتى تُسمّيان محليًا «التوأمين». والحطام على القمة **الشرقية**.

ومن هنا يأتي الخطأ الشائع الآخر. فالروايات التي تذكر 3886 أو 3887 م تعطي ارتفاع القمة
الغربية لحطام يرقد على الشرقية.

تنحدر البقايا على الوجه الغربي وفي الممر تحته. وأحد المحركات غارس في القمة نفسها، وهو القطعة
التي يصوّرها أغلب المشّائين.

## ما تخطئ فيه أغلب المقالات

عدد القتلى هو التصحيح الذي يستحق. تتحدث عدة تقارير سياحية عن أربعة من أفراد الطاقم. أما
Bureau of Aircraft Accidents Archives — تقرير الحادث المرجعي — فيذكر **ثمانية**. ونحن ننشر
ثمانية.

والأمر يتجاوز التدقيق الشكلي. فهذه رحلة شحن حربية قتلت كل من على متنها وبقيت مجهولة على سفح
جبل قرابة عام كامل. وتنصيف حصيلة الضحايا يحوّلها إلى مجرد طرفة.

## هل يمكن الذهاب لرؤيته؟

ليس في المسار العادي لتوبقال، ونفضّل قول ذلك بوضوح على الإيحاء بغيره.

[رحلاتنا إلى توبقال](/en/tours/toubkal-summit-trek-4day) تصعد إلى قمة توبقال على 4167 م ثم
تعود إلى الملجأ. وتيبهرين هدف منفصل على خط مختلف أقل ارتيادًا بكثير. والطريق غير معلَّم،
والأرض هشّة وأشد انحدارًا من أي شيء على المسار السياحي.

يمكن إضافته للمشّائين المتمرسين، مع مرشد يعرف الأرض وفي ظروف مستقرة. وهو لا يناسب برنامج
يومين. وإن كانت رؤيته تهمّك، فقُل ذلك عند الاستفسار وسنخبرك بصدق إن كان يناسب الرحلة التي
تفكر فيها — وغالبًا يكون الجواب أنك تحتاج يومًا إضافيًا.

ومنذ 2018 صار المرشد المرخّص إلزاميًا في كل المنتزه الوطني لتوبقال، فهو على أي حال ليس مسارًا
يُخاض وحيدًا.
""",
},
{
 "slug": "climbing-toubkal-in-march",
 "title": "صعود توبقال في مارس: ما الذي تُقدم عليه فعلًا",
 "excerpt": "مارس هو الشهر الذي يحجز فيه الناس متوقعين الربيع فيجدون الشتاء. هذه حال الجبل الحقيقية، وما يتطلبه من عتاد، ومتى يكون أبريل الجواب الأفضل.",
 "heroImage": "/gallery/toubkal-final-snow-slope-dawn.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 7,
 "tags": ["توبقال", "المشي الشتوي", "الأطلس الكبير", "المغرب", "المواسم"],
 "seoTitle": "صعود توبقال في مارس — الثلج والعتاد ونصائح صادقة",
 "seoDescription": "في مارس يبقى توبقال شتويًا فوق 3000 م: ثلج وكرامبون وفأس جليدي. ما الذي ينتظرك، وما تحتاجه، ومتى تختار أبريل.",
 "faq": [
  ("هل ما زال الثلج على توبقال في مارس؟", "نعم، فوق نحو 3000 م. مارس في ذيل الموسم الشتوي، ومخروط القمة يحمل الثلج عادة حتى أبريل في سنة طبيعية. وقد تكون بأكمام قصيرة في الوادي عند إمليل بينما القمة تحت الصفر بكثير عند الفجر — يفصل بينهما 2400 م من الارتفاع، وهذا معظم التفسير."),
  ("هل أحتاج كرامبون وفأسًا جليديًا في مارس؟", "في أغلب السنوات نعم، وتحتاج أن تعرف استعمالهما لا أن تحملهما فقط. المنحدرات الأخيرة تتحول من مشي إلى تسلق على الثلج حين تتجمّد، وهو بالضبط حين تكون أصعب. ويمكن استئجارهما في إمليل بـ100 إلى 150 درهمًا يوميًا. وفي مواعيدنا المصحوبة بمرشد نوفّرهما حين تقتضي الظروف."),
  ("هل مارس أخطر من الصيف؟", "هو جبل مختلف أكثر منه أصعب فحسب. التساقطات الكثيفة بين يناير ومارس تخلق خطر انهيارات حقيقيًا على المنحدرات المحمّلة، والطقس يتقلّب أسرع من الصيف. ولهذا يهمّ المرشد في مارس أكثر مما يهمّ في يوليو: ما تدفع مقابله هو الحكم على ما إذا كان اليوم مناسبًا للصعود."),
  ("مارس أم أبريل لصعود توبقال؟", "أبريل، لأغلب الناس. يكون خط الثلج قد تراجع عادة، والمشي أسهل، والنهار أطول، والزحام لم يصل بعد. اختر مارس إن كنت تريد الجبل فعلًا في حالته الشتوية وتجيد التعامل مع الثلج — فهو أهدأ، ومناظر القمة في الهواء البارد الصافي هي الأجمل في السنة."),
  ("كم تبلغ البرودة صباح القمة؟", "تحت الصفر بثبات، ومع الرياح على حافة القمة يكون الإحساس أبرد بكثير مما يظهره المقياس. تنطلق في الظلام، وهو أبرد أوقات اليوم. وسترة عازلة حقيقية وقفازات دافئة وزوج احتياطي وما يغطي الوجه ليست اختيارية في مارس."),
  ("هل يستطيع مبتدئ صعود توبقال في مارس؟", "المبتدئ اللائق يستطيع، مع مرشد وفي ظروف مستقرة — لكنه بصراحة أصعب من المسير نفسه في يونيو، ونسبة الوصول إلى القمة أقل. إن كان هذا أول جبل كبير لك وكان بلوغ القمة يهمّك، فأبريل وما بعده مدخل ألطف. وإن كانت لديك خبرة في المشي الشتوي، فمارس شهر ثريّ هناك في الأعلى."),
 ],
 "content": """
مارس هو الشهر الذي يوقع الناس. الرحلات الجوية رخيصة، ومراكش دافئة، والجبل يبدو على الخريطة
قريبًا بما يكفي ليُشبه نزهة ربيعية. لكن فوق 3000 م لا يزال الشتاء.

## كيف هو مارس فعلًا

إمليل على 1740 م قد تكون لطيفة في مارس: شمس، وأكمام قصيرة بعد الظهر، ولوز مزهر في الوديان.
والقمة أعلى بـ2427 م، وهذا الفارق هو الحكاية كلها.

فوق نحو 3000 م يحمل الجبل ثلجًا، وفي سنة طبيعية يحتفظ به مخروط القمة حتى أبريل. وصباح القمة
تغادر الملجأ في الظلام، في حرارة تحت الصفر، على أرض تجمّدت طوال الليل.

## العتاد الذي يتوقف عن كونه اختياريًا

- **الكرامبون والفأس الجليدي** — والمعرفة باستعمالهما. الثلج المتجمّد هو اللحظة التي تكفّ
  فيها المنحدرات الأخيرة عن كونها مشيًا، وهي أيضًا اللحظة التي تكون فيها أشدّ. الاستئجار في
  إمليل بـ100 إلى 150 درهمًا يوميًا؛ وفي مواعيدنا المصحوبة نوفّرهما حين تقتضي الظروف.
- **حذاء صلب** يقبل الكرامبون فعلًا. حذاء المسارات اللين لا يقبله، وهو أشيع خطأ في العتاد
  نراه في مارس.
- **عزل حراري وزوج قفازات احتياطي.** تنطلق في الظلام، والرياح على حافة القمة تفعل الباقي.

## الخطر الذي لا يعلن عنه أحد

التساقطات الكثيفة بين يناير ومارس تحمّل المنحدرات، وهذا يخلق خطر انهيارات حقيقيًا في اتجاهات
معيّنة وظروف معيّنة. والطقس أيضًا يتقلّب أسرع بكثير من الصيف.

ولهذا يساوي المرشد في مارس أكثر مما يساوي في يوليو. قيمته ليست في إيجاد مسار تستطيع اتباعه
وحدك، بل في الحكم على ما إذا كان اليوم يومًا للصعود، وفي الاستعداد للعودة. ومنذ 2018 صار
المرشد المرخّص إلزاميًا في المنتزه الوطني لتوبقال على أي حال.

## مارس أم أبريل؟

**اختر أبريل** إن أردت النسخة الأيسر: خط الثلج تراجع عادة، والمشي أسهل، والنهار أطول، وزحام
الصيف لم يصل. ولأول جبل كبير، أبريل وما بعده مدخل ألطف، ونسبة النجاح أعلى بوضوح.

**اختر مارس** إن كنت تريد الجبل فعلًا في حالته الشتوية وتجيد التعامل مع الثلج. فهو أهدأ،
ومناظر القمة في الهواء البارد الصافي هي الأجمل في السنة.

[مواعيد رحلتنا إلى توبقال والصحراء في 8 أيام](/en/tours/morocco-highlights-toubkal-sahara-8day)
تقع على جانبَي هذا الخط — ثلاثة تواريخ في مارس واثنان في أبريل — وهذا مقصود. وإن كنت مترددًا
بينها، فالفقرة أعلاه هي القرار.

## امنح نفسك اليوم الإضافي

في أي شهر، الارتفاع يحسم من القمم أكثر مما تحسمه اللياقة.
[برنامج الأربعة أيام](/en/tours/toubkal-summit-trek-4day) يصعد تدريجيًا مع ليلة للتأقلم؛ أما
نسخة اليومين فتنتقل من 1740 م إلى 4167 م في نحو ثلاثين ساعة. وفي مارس، حين تكون الدفعة
الأخيرة أصعب وأبطأ أصلًا، يساوي ذلك اليوم أكثر مما يساويه في يوليو.
""",
},
{
 "slug": "toubkal-aguelzim-pass-trek-cost",
 "title": "كم يكلف مسير ممر أكلزيم إلى توبقال في 3 أيام؟",
 "excerpt": "ممر أكلزيم هو الطريق الهادئ إلى توبقال — عبور مرتفع يتجنّب وادي ميزان كليًا. هذه تكلفة نسخة الثلاثة أيام ومن تناسبه فعلًا.",
 "heroImage": "/gallery/tours-toubkal-aguelzim-pass-3day.jpg",
 "category": "trekking", "region": "atlas-mountains", "readTime": 6,
 "tags": ["توبقال", "أكلزيم", "الأطلس الكبير", "المشي الجبلي", "المغرب"],
 "seoTitle": "مسير ممر أكلزيم إلى توبقال، 3 أيام — السعر والمسار",
 "seoDescription": "تكلفة طريق ممر أكلزيم إلى توبقال في 3 أيام، وكيف يختلف عن الطريق الكلاسيكي عبر ميزان، ومن يناسبه هذا الخط الهادئ.",
 "faq": [
  ("ما هو طريق ممر أكلزيم؟", "طريق بديل إلى ملجأ توبقال يعبر تيزي نأكلزيم على نحو 3560 م بدل صعود وادي ميزان. وهو أطول وأعلى من الخط العادي، وأهدأ بكثير: معظم حركة توبقال لا تراه أبدًا. والمقابل هو ممر جدّي في اليوم الأول بدل صعود تدريجي في قاع الوادي."),
  ("هل أكلزيم أصعب من الطريق العادي؟", "نعم، بفارق ملموس. الطريق الكلاسيكي يكسب الارتفاع بثبات على امتداد وادٍ؛ أما أكلزيم فيضع ممرًا على 3560 م في طريقك قبل أن تنام في الارتفاع أصلًا. وهو يناسب من لديه خبرة جبلية ويريد الخط الهادئ، لا من يخوض أول جبل له."),
  ("لماذا نختار أكلزيم بدل الطريق العادي؟", "العزلة، ومناظر أفضل. مسار وادي ميزان هو الأكثر ارتيادًا في الأطلس صيفًا، بقوافل البغال والمشّائين اليوميين حتى الملجأ تقريبًا. أما عبور أكلزيم فخالٍ بالمقارنة، والممر نفسه يمنحك الكتلة كلها بنظرة واحدة، وهو ما لا يفعله الطريق عبر الوادي أبدًا."),
  ("ما اللياقة المطلوبة؟", "ما يكفي ليوم طويل فيه ممر مرتفع، في أيام متتالية. ليس مسارًا تقنيًا في الصيف — لا حبال ولا تسلق — لكن عبور اليوم الأول جهد حقيقي في الارتفاع قبل أن تتأقلم. إن كنت تمشي بانتظام أيامًا جبلية من ست أو سبع ساعات، فأنت في النطاق الصحيح."),
 ],
 "content": """
يصعد معظم من يقصد توبقال وادي ميزان انطلاقًا من إمليل. وفي الصيف يحمل ذلك المسار قوافل
البغال والمشّائين اليوميين وصفًا متواصلًا من المشاة حتى الملجأ.

ممر أكلزيم هو المدخل الآخر.

## المسار

بدل اتّباع قاع الوادي، يعبر هذا الخط **تيزي نأكلزيم على نحو 3560 م** وينزل إلى الملجأ من
أعلى. وهو أطول وأعلى وخالٍ بالمقارنة — والمنظر من الممر يمنحك الكتلة كلها دفعة واحدة، وهو ما
لا يفعله الطريق عبر الوادي أبدًا.

## كم يكلف

[مسير أكلزيم في 3 أيام](/en/tours/toubkal-aguelzim-pass-3day) بـ600 € لشخص واحد، و302 €
للفرد عند شخصين، و230 € للفرد عند ستة. ومثل كل مواعيدنا الخاصة، يُسعَّر على سلّم تنازلي، لأن
المرشد والنقل تكلفة ثابتة تُقسَّم على المشاركين: فينخفض السعر للفرد كلما كبرت المجموعة، ويحمل
المسافر المنفرد الكلفة كاملة.

ويشمل ذلك المرشد الجبلي المرخّص، وليالي الملجأ، وجميع الوجبات في الجبل، ودعم البغال لعتاد
المجموعة، ورسوم المنتزه الوطني، والنقل ذهابًا وإيابًا من مراكش.

## من يناسبه، بصراحة

**ليس** أول جبل. الطريق العادي يكسب ارتفاعه تدريجيًا على امتداد وادٍ؛ أما أكلزيم فيضع أمامك
ممرًا على 3560 م في اليوم الأول، قبل أن تنام في الارتفاع. وهذا فارق حقيقي في إحساس الرحلة،
وفي احتمال بلوغك القمة وأنت بخير.

وهو يناسب المشّائين المتمرسين الذين خاضوا رحلات متعددة الأيام ويفضّلون أن يكون الجبل لهم
وحدهم على أن يسلكوا أيسر خط. وإن كانت هذه أول قمة كبيرة لك، فـ
[الطريق العادي في 4 أيام](/en/tours/toubkal-summit-trek-4day) هو الخيار الأفضل وسنقول لك ذلك
إن سألت.

## ما هو مشمول

الشيء نفسه في بقية رحلاتنا إلى توبقال: مرشد جبلي مرخّص، وإقامة في الملجأ، وجميع الوجبات في
الجبل، وبغال لعتاد المجموعة، ورسوم المنتزه الوطني، والنقل ذهابًا وإيابًا من مراكش. أما تأمين
السفر والعتاد الشخصي والإكراميات فغير مشمولة.

## باختصار

أكلزيم هو طريق العارفين إلى توبقال — أعلى وأطول وأهدأ وأجمل. ويكلف تقريبًا ما يكلفه المسير
الكلاسيكي في ثلاثة أيام، لأن الفارق في الخط لا في اللوجستيات. اسلكه إن كانت لديك السيقان
وأردت العزلة؛ واسلك الوادي إن كانت هذه أول قمة لك في الأطلس.
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
