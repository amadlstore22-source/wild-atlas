# -*- coding: utf-8 -*-
"""Carry the Tibherine article's inline photographs into all five locales.

WHY THIS IS NOT OPTIONAL
------------------------
The images are part of the article, not decoration. An English reader gets the
wreck photographed on the summit; a French reader would get the same words with
nothing to look at, from the same source material.

__tests__/lib/blog-inline-images.test.ts fails on exactly this drift, which is
how the gap was found: the English post was updated and the five translations
were not.

The alt text and captions are translated, because alt text is read aloud by
screen readers and indexed by image search. Copying the English strings across
would leave five locales describing a photograph in the wrong language.

RUN
---
    PYTHONIOENCODING=utf-8 py scripts/seo/add_tibherine_images_locales.py
"""
import io

SLUG = "tibherine-plane-wreck-toubkal"

# locale -> (anchor heading, alt, caption) for each of the two images.
DATA = {
    "fr": [
        ("## Où c'est réellement",
         "Le moteur du Lockheed Constellation encastré dans les rochers du sommet du Tibherine Est, avec le Haut Atlas s'estompant dans la brume derrière.",
         "L'un des moteurs, toujours au sommet où il a percuté en 1969."),
        ("## Peut-on aller le voir ?",
         "Des débris éparpillés sur le sommet du Tibherine Est, les crêtes du Haut Atlas se perdant au loin.",
         "Les débris descendent la face ouest et le couloir en dessous."),
    ],
    "es": [
        ("## Dónde está realmente",
         "El motor del Lockheed Constellation incrustado en las rocas de la cumbre de Tibherine Este, con el Alto Atlas difuminándose en la bruma detrás.",
         "Uno de los motores, todavía en la cima donde chocó en 1969."),
        ("## ¿Se puede ir a verlo?",
         "Restos esparcidos por la cumbre de Tibherine Este, con las crestas del Alto Atlas perdiéndose en la distancia.",
         "Los restos descienden por la cara oeste y el corredor de debajo."),
    ],
    "de": [
        ("## Wo es tatsächlich liegt",
         "Der Motor der Lockheed Constellation, eingebettet in den Gipfelfels des Tibherine Ost, dahinter der im Dunst verschwindende Hohe Atlas.",
         "Einer der Motoren, noch immer am Gipfel, an dem er 1969 einschlug."),
        ("## Kann man es besuchen?",
         "Trümmer über den Gipfel des Tibherine Ost verstreut, die Grate des Hohen Atlas verlieren sich in der Ferne.",
         "Die Trümmer ziehen sich die Westflanke und die Rinne darunter hinab."),
    ],
    "it": [
        ("## Dove si trova davvero",
         "Il motore del Lockheed Constellation incastrato nelle rocce di vetta del Tibherine Est, con l'Alto Atlante che sfuma nella foschia alle spalle.",
         "Uno dei motori, ancora sulla cima dove si schiantò nel 1969."),
        ("## Si può andare a vederlo?",
         "Detriti sparsi sulla vetta del Tibherine Est, le creste dell'Alto Atlante che si perdono in lontananza.",
         "I detriti scendono lungo la parete ovest e il canale sottostante."),
    ],
    "ar": [
        ("## أين يقع فعلًا",
         "محرك طائرة لوكهيد كونستليشن غارس في صخور قمة تيبهرين الشرقية، ومن خلفه الأطلس الكبير يتلاشى في الضباب.",
         "أحد المحركات، لا يزال في القمة التي اصطدم بها عام 1969."),
        ("## هل يمكن الذهاب لرؤيته؟",
         "حطام متناثر على قمة تيبهرين الشرقية، وقمم الأطلس الكبير تتلاشى في البعد.",
         "تنحدر البقايا على الوجه الغربي وفي الممر تحته."),
    ],
}

SRCS = [
    "/gallery/tibherine-east-plane-wreck-sunrise.jpg",
    "/gallery/tibherine-east-plane-wreck-ridges.jpg",
]


def run():
    for loc, entries in DATA.items():
        path = "lib/blog.%s.part2.ts" % loc
        src = io.open(path, encoding="utf-8").read()
        key = '    slug: "%s",' % SLUG
        assert src.count(key) == 1, "%s: expected exactly one post" % path
        at = src.index(key)
        c = src.index("content: `", at)
        end = src.index("`,", c + len("content: `"))
        body = src[c:end]

        for (anchor, alt, caption), image in zip(entries, SRCS):
            assert body.count(anchor) == 1, "%s: anchor %r not found once" % (path, anchor)
            block = '![%s](%s "%s")\n\n%s' % (alt, image, caption, anchor)
            body = body.replace(anchor, block, 1)

        src = src[:c] + body + src[end:]
        io.open(path, "w", encoding="utf-8", newline="\n").write(src)
        print("  %s  +2 images" % loc)


run()
