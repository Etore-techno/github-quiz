window.ACTIVITY = {
  "sequence": "Séquence 1",
  "activity": "Activité 2",
  "title": "Les sources d’énergie dans les moyens de transport",
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
    24,
    27,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    38,
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
  "introFeedback": "Quand les cartes sont réparties et que chacun est prêt, commencez l’activité.",
  "randomizeCardQuestions": true,
  "steps": [
    {
      "type": "intro",
      "title": "D’où vient l’énergie ?",
      "instructions": [
        "Répartissez les 24 cartes entre tous les membres du groupe.",
        "À chaque question, lisez la description d’une énergie, identifiez-la puis sélectionnez toutes les cartes qui la mentionnent.",
        "Un seul élève valide après accord du groupe."
      ],
      "image": "card_pile_energy.jpg"
    },
    {
      "type": "cards",
      "prompt": "Les mammifères utilisent les aliments comme source d’énergie. Quelles cartes les mentionnent ?",
      "correct": [
        1,
        2,
        3,
        5,
        22
      ],
      "hints": [
        "Cette énergie est fournie par les muscles d’une personne ou d’un animal.",
        "Cherchez aussi les cartes qui mentionnent des chevaux."
      ],
      "points": 1
    },
    {
      "type": "cards",
      "prompt": "Quelles cartes mentionnent une source d’énergie qui est un liquide naturellement en mouvement ?",
      "correct": [
        3,
        22,
        27
      ],
      "hints": [
        "Cette source agit directement sur le moyen de transport et n’est pas stockée dans un réservoir.",
        "Cherchez une pirogue, des caravelles et un radeau."
      ],
      "points": 1
    },
    {
      "type": "cards",
      "prompt": "Quelles cartes mentionnent une source d’énergie pouvant agir directement sur une voile ?",
      "correct": [
        4,
        22,
        24,
        44
      ],
      "hints": [
        "La voile peut être sur l’eau, sur terre ou être associée à un ballon.",
        "Quatre cartes comportent le même symbole en forme de souffle."
      ],
      "points": 1
    },
    {
      "type": "cards",
      "prompt": "Des panneaux permettent de recevoir cette source d’énergie. Quelles cartes la mentionnent ?",
      "correct": [
        12,
        35
      ],
      "hints": [
        "Cette énergie est disponible lorsque le rayonnement arrive sur l’objet.",
        "Cherchez deux véhicules portant des panneaux sur leur surface."
      ],
      "points": 1
    },
    {
      "type": "cards",
      "prompt": "Une seule carte mentionne une source d’énergie combustible provenant directement d’arbres. Quelle carte est-ce ?",
      "correct": [
        32
      ],
      "hints": [
        "Le combustible est stocké et transporté à bord du véhicule.",
        "La carte recherchée montre un camion ancien."
      ],
      "points": 1
    },
    {
      "type": "cards",
      "prompt": "Cette source d’énergie liquide, stockée dans un réservoir, a mis plusieurs millions d’années à se former. Quelles cartes la mentionnent ?",
      "correct": [
        23,
        30,
        38,
        39,
        44,
        45
      ],
      "hints": [
        "Certaines cartes l’associent à une autre énergie.",
        "Cherchez six cartes, dont un navire et un véhicule sur coussin d’air."
      ],
      "points": 1
    },
    {
      "type": "cards",
      "prompt": "Cette source d’énergie solide s’est formée très lentement et doit être brûlée pour produire de la chaleur. Quelles cartes la mentionnent ?",
      "correct": [
        31,
        36
      ],
      "hints": [
        "Elle a beaucoup servi aux machines à vapeur.",
        "Cherchez un train de luxe et le premier bateau à vapeur."
      ],
      "points": 1
    },
    {
      "type": "cards",
      "prompt": "Cette source combustible peut être stockée sous pression dans une bouteille ou un réservoir. Sa réserve fossile est limitée. Quelles cartes la mentionnent ?",
      "correct": [
        4,
        34
      ],
      "hints": [
        "Les deux cartes l’associent à une autre énergie.",
        "Cherchez une montgolfière et un avion-fusée."
      ],
      "points": 1
    },
    {
      "type": "cards",
      "prompt": "Cette source d’énergie est un minerai à réserve limitée qui permet de produire beaucoup d’énergie dans un réacteur. Quelle carte la mentionne ?",
      "correct": [
        33
      ],
      "hints": [
        "Elle alimente un bâtiment militaire qui se déplace sur l’eau.",
        "La carte montre un porte-avions français."
      ],
      "points": 1
    },
    {
      "type": "cards",
      "prompt": "Cette source liquide peut être fabriquée à partir de végétaux. Sur la carte recherchée, elle est associée à un combustible gazeux.",
      "correct": [
        34
      ],
      "hints": [
        "Une seule carte convient.",
        "Cherchez l’appareil qui a franchi le mur du son."
      ],
      "points": 1
    },
    {
      "type": "cards",
      "prompt": "Cette énergie ne provient pas directement d’une source d’énergie : elle est produite par les êtres humains à partir de différentes sources. Quelles cartes la mentionnent ?",
      "correct": [
        16,
        20,
        30,
        35,
        40
      ],
      "hints": [
        "Elle peut arriver par une caténaire ou être stockée dans une batterie.",
        "Cherchez un train, un gyropode et trois voitures."
      ],
      "points": 1
    },
    {
      "type": "sourceSort",
      "prompt": "À partir des définitions, placez 9 cartes dans « Sources renouvelables » et 7 cartes dans « Sources non renouvelables ». Laissez 8 cartes au centre lorsqu’un seul classement n’est pas possible avec certitude.",
      "definitions": [
        "Source renouvelable : elle se reconstitue naturellement assez rapidement.",
        "Source non renouvelable : sa réserve est limitée et se reconstitue très lentement ou pas à notre échelle."
      ],
      "renewable": [
        1,
        2,
        3,
        5,
        12,
        22,
        24,
        27,
        32
      ],
      "nonrenewable": [
        23,
        31,
        33,
        36,
        38,
        39,
        45
      ],
      "aside": [
        4,
        16,
        20,
        30,
        34,
        35,
        40,
        44
      ],
      "points": 9
    }
  ],
  "finish": "Activité terminée. Complétez maintenant votre fiche d’activité avant la mise en commun."
};
