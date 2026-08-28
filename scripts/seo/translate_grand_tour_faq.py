# -*- coding: utf-8 -*-
"""Translate the 8-day fixed-departure FAQ into all five locales.

WHY THIS IS A SEPARATE STEP FROM THE TOUR TRANSLATION
-----------------------------------------------------
__tests__/lib/faq-locale-parity.test.ts exists because this has bitten three
times (tourType, includes/excludes, faq). mergeWithEn() falls back to the
English field when a locale omits it, which is right for numbers and wrong for
prose: an untranslated `faq` renders English questions on the Arabic page while
everything around them is Arabic, and the build never complains.

The FAQ is also emitted as FAQPage schema, so an English answer on a localised
page is a hreflang mismatch Google can see.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/translate_grand_tour_faq.py
"""
import io

EN_SLUG = "morocco-highlights-toubkal-sahara-8day"

FAQ = {
    "fr": [
        ("Quelle condition physique faut-il pour la partie Toubkal ?",
         "Assez pour deux longues journées consécutives, la seconde durant environ neuf heures avec un départ avant l'aube. Il n'y a ni escalade technique, ni corde, ni passage d'escalade : c'est une longue marche en altitude. Si vous pouvez marcher six heures en moyenne montagne sans redouter le lendemain, vous êtes prêt."),
        ("Est-ce un circuit privé ?",
         "Non. C'est un départ à date fixe de 14 places : vous voyagez avec d'autres personnes ayant réservé la même date. C'est ce qui rend le prix par personne fixe plutôt que dépendant de la taille de votre groupe. Si vous préférez avoir l'itinéraire pour vous seuls, demandez-nous un devis en privé."),
        ("Quel temps fait-il à ces dates ?",
         "Les départs vont de mars à la mi-avril, et la montagne change beaucoup sur cette période. En mars, le Toubkal est encore une montagne d'hiver : neige sur les pentes hautes et températures négatives au sommet à l'aube, avec crampons et piolet fournis si les conditions l'exigent. Aux dates d'avril, la limite des neiges a généralement reculé et la marche est plus facile, même si le sommet peut rester sous zéro avant le lever du soleil. Le désert, lui, est l'inverse à toutes les dates : journées chaudes et nuits froides et claires."),
        ("Pourquoi la journée 6 est-elle une si longue route ?",
         "Parce que l'erg Chebbi est la véritable mer de sable, à environ 560 km de Marrakech. Les opérateurs qui promettent un transfert court vers le désert vont en général vers les dunes bien plus petites de Zagora. Nous pensons que ces heures supplémentaires achètent quelque chose qui en vaut la peine."),
        ("Que signifie concrètement la limite de 14 places ?",
         "Le départ ferme dès que les 14 places sont vendues. Nous plafonnons à ce chiffre parce que le refuge du Toubkal et le campement du désert ont tous deux une capacité limitée, et parce qu'un guide ne peut encadrer qu'un nombre limité de personnes un matin de sommet."),
    ],
    "es": [
        ("¿Qué forma física hace falta para la parte del Toubkal?",
         "La suficiente para dos jornadas largas seguidas, la segunda de unas nueve horas con salida antes del amanecer. No hay escalada técnica, ni cuerda, ni trepadas: es una caminata larga en altura. Si puedes andar seis horas por media montaña sin temer al día siguiente, estás listo."),
        ("¿Es un circuito privado?",
         "No. Es una salida en fecha fija con 14 plazas, así que viajas con otras personas que reservaron la misma fecha. Eso es lo que hace que el precio por persona sea plano en lugar de depender del tamaño de tu grupo. Si prefieres tener la ruta para vosotros solos, pídenos presupuesto en privado."),
        ("¿Qué tiempo hace en estas fechas?",
         "Las salidas van de marzo a mediados de abril, y la montaña cambia mucho en ese margen. En marzo el Toubkal sigue siendo una montaña invernal: nieve en las laderas altas y temperaturas bajo cero en la cumbre al amanecer, con crampones y piolet incluidos cuando las condiciones lo exigen. En las fechas de abril la cota de nieve suele haber subido y la caminata es más fácil, aunque la cumbre puede seguir bajo cero antes del alba. El desierto es lo contrario en todas las fechas: días cálidos y noches frías y despejadas."),
        ("¿Por qué el día 6 es una ruta tan larga?",
         "Porque Erg Chebbi es el auténtico mar de arena, a unos 560 km de Marrakech. Los operadores que prometen un traslado corto al desierto suelen ir a las dunas mucho más pequeñas de Zagora. Creemos que esas horas de más compran algo que merece la pena."),
        ("¿Qué significa en la práctica el límite de 14 plazas?",
         "La salida se cierra cuando se venden las 14 plazas. Ponemos ese tope porque el refugio del Toubkal y el campamento del desierto tienen espacio limitado, y porque un guía solo puede atender a un número determinado de personas en una mañana de cumbre."),
    ],
    "de": [
        ("Wie fit muss ich für den Toubkal-Teil sein?",
         "Fit genug für zwei lange aufeinanderfolgende Tage, der zweite davon rund neun Stunden mit Aufbruch vor Sonnenaufgang. Es gibt keine technische Kletterei, kein Seil und keine Kraxelei — es ist eine lange Wanderung in Höhe. Wer sechs Stunden im Bergland gehen kann, ohne den nächsten Tag zu fürchten, ist bereit."),
        ("Ist das eine private Tour?",
         "Nein. Das ist ein Termin mit festem Datum und 14 Plätzen, Sie reisen also mit anderen, die dasselbe Datum gebucht haben. Genau deshalb ist der Preis pro Person fest und nicht von Ihrer Gruppengröße abhängig. Wenn Sie die Route lieber für sich allein hätten, fragen Sie uns nach einem privaten Angebot."),
        ("Wie ist das Wetter an diesen Terminen?",
         "Die Termine reichen von März bis Mitte April, und der Berg verändert sich in diesem Zeitraum deutlich. Im März ist der Toubkal noch ein Winterberg: Schnee an den oberen Hängen und Minusgrade am Gipfel im Morgengrauen, Steigeisen und Eispickel werden gestellt, wenn die Bedingungen es verlangen. An den April-Terminen ist die Schneegrenze meist zurückgewichen und das Gehen leichter, auch wenn der Gipfel vor Sonnenaufgang noch unter null liegen kann. In der Wüste ist es an allen Terminen umgekehrt: warme Tage, kalte und klare Nächte."),
        ("Warum ist Tag 6 eine so lange Fahrt?",
         "Weil der Erg Chebbi das echte Sandmeer ist, rund 560 km von Marrakesch entfernt. Anbieter, die einen kurzen Wüstentransfer versprechen, fahren meist zu den viel kleineren Dünen bei Zagora. Wir finden, die zusätzlichen Stunden kaufen etwas, das sich lohnt."),
        ("Was bedeutet das Limit von 14 Plätzen konkret?",
         "Der Termin schließt, sobald 14 Plätze verkauft sind. Wir deckeln dort, weil sowohl die Toubkal-Hütte als auch das Wüstencamp begrenzten Platz haben und weil ein Guide an einem Gipfelmorgen nur eine begrenzte Zahl von Menschen betreuen kann."),
    ],
    "it": [
        ("Che forma fisica serve per la parte del Toubkal?",
         "Quella che basta per due giornate lunghe consecutive, la seconda di circa nove ore con partenza prima dell'alba. Non c'è arrampicata tecnica, non c'è corda e non ci sono passaggi da scalare: è una lunga camminata in quota. Se riesci a camminare sei ore in media montagna senza temere il giorno dopo, sei pronto."),
        ("È un tour privato?",
         "No. È una partenza a data fissa con 14 posti, quindi viaggi con altre persone che hanno prenotato la stessa data. È questo che rende il prezzo a persona fisso invece che legato alla dimensione del tuo gruppo. Se preferisci avere l'itinerario tutto per voi, chiedici un preventivo privato."),
        ("Che tempo fa in queste date?",
         "Le partenze vanno da marzo a metà aprile, e la montagna cambia parecchio in questo arco. A marzo il Toubkal è ancora una montagna invernale: neve sui pendii alti e temperature sotto zero in vetta all'alba, con ramponi e piccozza forniti quando le condizioni lo richiedono. Nelle date di aprile il limite delle nevi si è di solito ritirato e il cammino è più facile, anche se la vetta può restare sotto zero prima del sorgere del sole. Il deserto è l'opposto in tutte le date: giornate calde e notti fredde e limpide."),
        ("Perché il giorno 6 è un trasferimento così lungo?",
         "Perché l'Erg Chebbi è il vero mare di sabbia, a circa 560 km da Marrakech. Gli operatori che promettono un trasferimento breve verso il deserto di solito vanno alle dune molto più piccole di Zagora. Riteniamo che quelle ore in più comprino qualcosa che vale la pena avere."),
        ("Che cosa significa concretamente il limite di 14 posti?",
         "La partenza chiude quando i 14 posti sono venduti. Mettiamo quel tetto perché il rifugio del Toubkal e il campo nel deserto hanno entrambi spazio limitato, e perché una guida può seguire solo un certo numero di persone la mattina della vetta."),
    ],
    "ar": [
        ("ما مستوى اللياقة المطلوب لجزء توبقال؟",
         "لياقة تكفي ليومين طويلين متتاليين، ثانيهما نحو تسع ساعات بانطلاق قبل الفجر. لا يوجد تسلق تقني ولا حبال ولا مقاطع تسلق: إنها مسيرة طويلة على ارتفاع عالٍ. إن كنت تستطيع المشي ست ساعات في أرض جبلية دون أن تخشى اليوم التالي، فأنت جاهز."),
        ("هل هذه رحلة خاصة؟",
         "لا. هذه رحلة بموعد ثابت و14 مقعدًا، أي أنك تسافر مع أشخاص آخرين حجزوا التاريخ نفسه. وهذا ما يجعل السعر للشخص ثابتًا بدل أن يعتمد على حجم مجموعتك. وإن كنت تفضّل أن يكون المسار لكم وحدكم، اطلب منا عرضًا خاصًا."),
        ("كيف يكون الطقس في هذه المواعيد؟",
         "تمتد المواعيد من مارس إلى منتصف أبريل، والجبل يتغيّر كثيرًا خلال هذه الفترة. في مارس لا يزال توبقال جبلًا شتويًا: ثلوج على المنحدرات العليا وحرارة تحت الصفر في القمة عند الفجر، مع توفير الكرامبون والفأس الجليدي عند الحاجة. أما في مواعيد أبريل فيكون خط الثلج قد تراجع عادة والمشي أسهل، وإن كانت القمة قد تبقى تحت الصفر قبل الشروق. الصحراء عكس ذلك في كل المواعيد: نهار دافئ وليل بارد صافٍ."),
        ("لماذا يوم السادس طريق طويل إلى هذا الحد؟",
         "لأن عرق الشبي هو بحر الرمال الحقيقي، على بُعد نحو 560 كم من مراكش. المنظّمون الذين يعدون بنقل قصير إلى الصحراء يقصدون عادة كثبان زاكورة الأصغر بكثير. ونحن نرى أن تلك الساعات الإضافية تشتري شيئًا يستحق."),
        ("ماذا يعني عمليًا حدّ الـ14 مقعدًا؟",
         "يُغلق الموعد فور بيع المقاعد الأربعة عشر. نضع هذا السقف لأن ملجأ توبقال ومخيم الصحراء كليهما محدودا السعة، ولأن المرشد لا يستطيع رعاية أكثر من عدد معيّن من الأشخاص في صباح الوصول إلى القمة."),
    ],
}


def block(pairs):
    lines = ["    faq: ["]
    for q, a in pairs:
        lines.append('      { q: "%s", a: "%s" },' % (q, a))
    lines.append("    ],")
    return "\n".join(lines) + "\n"


def run():
    for loc, pairs in FAQ.items():
        path = "lib/tours.%s.ts" % loc
        src = io.open(path, encoding="utf-8").read()
        key = '    slug: "%s",' % EN_SLUG
        assert src.count(key) == 1, "%s: expected exactly one entry" % path
        at = src.index(key)
        # Insert the faq before the closing brace of that record.
        end = src.index("\n  },", at)
        assert "faq:" not in src[at:end], "%s already has a faq" % path
        src = src[: end + 1] + block(pairs) + src[end + 1 :]
        io.open(path, "w", encoding="utf-8", newline="\n").write(src)
        print("  %s  %d Q&A" % (loc, len(pairs)))


run()
