window.ACTIVITY = {
  "sequence": "Séquence 1",
  "activity": "Activité 1",
  "title": "Besoin, fonction d’usage et familles de moyens de transport",
  "cards": [
    1,
    2,
    3,
    4,
    5,
    12,
    16,
    20,
    22,
    23,
    27,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    39,
    40,
    44,
    45
  ],
  "cardNames": {
    "1": "Véhicule routier à traction animale",
    "2": "Premier chemin de fer public",
    "3": "Pirogue",
    "4": "Montgolfière",
    "5": "Draisienne",
    "12": "Solar Impulse",
    "16": "Renault Zoé",
    "20": "TGV",
    "22": "Caravelles",
    "23": "Airbus A320",
    "24": "Char à voile",
    "27": "Radeau",
    "30": "Toyota Prius",
    "31": "Orient-Express",
    "32": "Camion fonctionnant au bois",
    "33": "Porte-avions Charles de Gaulle",
    "34": "Bell X-1",
    "35": "Sion",
    "36": "Pyroscaphe",
    "38": "Aérotrain",
    "39": "Ford Model T",
    "40": "Gyropode",
    "44": "MS Selandia",
    "45": "Avion des frères Wright"
  },
  "steps": [
    {
      "type": "intro",
      "title": "Une activité à mener en équipe",
      "instructions": [
        "Répartissez les 22 cartes : chaque élève en prend plusieurs et lit leurs informations.",
        "Discutez avant chaque validation. Un seul élève utilise l’ordinateur selon le choix du groupe.",
        "Après une erreur, le quiz propose un indice. Chaque nouvel essai peut diminuer les points gagnés.",
        "Complétez la fiche d’activité à la fin du quiz."
      ],
      "image": "card_pile.jpg"
    },
    {
      "type": "choice",
      "prompt": "Tous les objets présentés sur les cartes répondent au même besoin. Lequel ?",
      "options": [
        "Transporter des personnes ou des marchandises",
        "Produire de l’électricité",
        "Mesurer une distance",
        "Éclairer un espace"
      ],
      "correct": [
        "Transporter des personnes ou des marchandises"
      ],
      "hints": [
        "Cherchez ce que permettent tous les objets, quel que soit leur milieu de déplacement.",
        "Le mot attendu commence par « transport… » et concerne des personnes ou des marchandises."
      ],
      "points": 2
    },
    {
      "type": "cards",
      "prompt": "Qui sommes-nous ? Nous avons été inventés entre 1880 et 1950.",
      "correct": [
        31,
        32,
        34,
        39,
        44,
        45
      ],
      "hints": [
        "Lisez la date de chaque carte et vérifiez les deux limites de l’intervalle.",
        "Six cartes conviennent : leurs dates vont de 1883 à 1947."
      ],
      "points": 1
    },
    {
      "type": "cards",
      "prompt": "Qui sommes-nous ? Nous avons été inventés avant 1800 et nous nous déplaçons sur l’eau.",
      "correct": [
        3,
        22,
        36
      ],
      "hints": [
        "Deux conditions doivent être vraies en même temps : la date et le déplacement sur l’eau.",
        "Une embarcation très ancienne, des navires de 1492 et un bateau à vapeur de 1783 conviennent."
      ],
      "points": 1
    },
    {
      "type": "cards",
      "prompt": "Qui sommes-nous ? Nous nous déplaçons sur des rails.",
      "correct": [
        2,
        20,
        31
      ],
      "hints": [
        "Cherchez le support sur lequel le moyen de transport se déplace.",
        "Trois cartes montrent des transports guidés par des rails."
      ],
      "points": 1
    },
    {
      "type": "cards",
      "prompt": "Qui sommes-nous ? Nous nous déplaçons dans les airs et notre date est antérieure à 1950.",
      "correct": [
        4,
        34,
        45
      ],
      "hints": [
        "Vérifiez à la fois le milieu de déplacement et la date.",
        "Les trois dates recherchées sont 1783, 1903 et 1947."
      ],
      "points": 1
    },
    {
      "type": "cards",
      "prompt": "Qui sommes-nous ? Nous avons été inventés dans un pays européen et nous nous déplaçons sur la route.",
      "correct": [
        5,
        16,
        32,
        35
      ],
      "hints": [
        "Les deux conditions doivent être vérifiées. Le drapeau de l’Union européenne ne désigne pas un pays.",
        "Quatre cartes routières ont été inventées en France ou en Allemagne."
      ],
      "points": 1
    },
    {
      "type": "cards",
      "prompt": "Qui sommes-nous ? Le bois est le matériau principal qui nous constitue et notre date est antérieure à 1800.",
      "correct": [
        1,
        3,
        22,
        36
      ],
      "hints": [
        "Observez l’objet représenté, puis vérifiez sa date.",
        "Cherchez un transport routier ancien et trois transports sur l’eau."
      ],
      "points": 1
    },
    {
      "type": "cards",
      "prompt": "Qui sommes-nous ? Inventés après 1900, nous pouvons transporter au moins plusieurs dizaines de personnes.",
      "correct": [
        20,
        23,
        33,
        44
      ],
      "hints": [
        "Écartez les moyens de transport individuels et les transports hippomobiles.",
        "Cherchez un train, un avion et deux grands navires."
      ],
      "points": 1
    },
    {
      "type": "cards",
      "prompt": "Qui sommes-nous ? Nous nous déplaçons sur l’eau et notre date appartient au XIXe ou au XXe siècle.",
      "correct": [
        27,
        44
      ],
      "hints": [
        "Le XIXe siècle va de 1801 à 1900 et le XXe de 1901 à 2000.",
        "Deux cartes seulement conviennent : l’une date de 1842 et l’autre de 1912."
      ],
      "points": 1
    },
    {
      "type": "familySort",
      "prompt": "Regroupez les 22 cartes en quatre familles : choisissez le critère commun qui vous paraît le plus pertinent.",
      "families": {
        "Transports routiers": [
          1,
          5,
          16,
          30,
          32,
          35,
          39,
          40
        ],
        "Transports ferroviaires": [
          2,
          20,
          31
        ],
        "Transports maritimes ou fluviaux": [
          3,
          22,
          27,
          33,
          36,
          44
        ],
        "Transports aériens": [
          4,
          12,
          23,
          34,
          45
        ]
      },
      "capacities": [
        8,
        3,
        6,
        5
      ],
      "points": 6
    },
    {
      "type": "titleSort",
      "prompt": "Vous venez de construire quatre familles. Placez maintenant le nom qui convient au-dessus de chaque groupe.",
      "labels": [
        "Transports routiers",
        "Transports ferroviaires",
        "Transports maritimes ou fluviaux",
        "Transports aériens"
      ],
      "points": 2
    },
    {
      "type": "functionSort",
      "prompt": "Placez sous chaque famille la fonction d’usage qui correspond.",
      "labels": [
        "Se déplacer sur la route",
        "Se déplacer sur des rails",
        "Se déplacer sur l’eau",
        "Se déplacer dans les airs"
      ],
      "mapping": {
        "Transports routiers": "Se déplacer sur la route",
        "Transports ferroviaires": "Se déplacer sur des rails",
        "Transports maritimes ou fluviaux": "Se déplacer sur l’eau",
        "Transports aériens": "Se déplacer dans les airs"
      },
      "points": 2
    }
  ],
  "finish": "Activité terminée. Complétez maintenant votre fiche d’activité avant la mise en commun."
};
