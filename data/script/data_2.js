var titrequiz = 'Activité 2 : Les énergies dans les moyens de transport';
var imagefond = 'data/images/fond.jpg'
var couleur = '#1B76AD'

var questions = [ 
    
    {
      question: "Qui suis-je ?<br/> Je suis un transport ferroviaire me déplaçant grâce à l'énergie musculaire.",
      answers: ["1", "2", "3", "4", "5", "12", "16", "20", "22", "23", "24", "27", "30", "31", "32", "33", "34", "35", "36", "38", "39", "40", "44", "45"],
      correctAnswers: ["2"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte2.jpg"
    },
    {
      question: "Qui suis-je ?<br/> Nous utilisons le même type de source d'énergie que celle contenue dans un briquet.",
      answers: ["1", "2", "3", "4", "5", "12", "16", "20", "22", "23", "24", "27", "30", "31", "32", "33", "34", "35", "36", "38", "39", "40", "44", "45"],
      correctAnswers: ["4", "34"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte4.jpg"
    },    
    {
      question: "Qui suis-je ?<br/> J'utilise une source d'énergie qui est également utilisée pour concevoir une table ou un tabouret.",
      answers: ["1", "2", "3", "4", "5", "12", "16", "20", "22", "23", "24", "27", "30", "31", "32", "33", "34", "35", "36", "38", "39", "40", "44", "45"],
      correctAnswers: ["32"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte32.jpg"
    },
    {
      question: "Qui suis-je ?<br/> Une lumière importante nous permet de nous déplacer.",
      answers: ["1", "2", "3", "4", "5", "12", "16", "20", "22", "23", "24", "27", "30", "31", "32", "33", "34", "35", "36", "38", "39", "40", "44", "45"],
      correctAnswers: ["12", "35"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte12.jpg"
    },
    {
      question: "Qui suis-je ?<br/> Nous pouvons utiliser de l'énergie éolienne.",
      answers: ["1", "2", "3", "4", "5", "12", "16", "20", "22", "23", "24", "27", "30", "31", "32", "33", "34", "35", "36", "38", "39", "40", "44", "45"],
      correctAnswers: ["4", "22", "24", "44"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte24.jpg"
    },
    {
      question: "Qui suis-je ?<br/> Nous sommes conçus pour utiliser l'énergie hydraulique.",
      answers: ["1", "2", "3", "4", "5", "12", "16", "20", "22", "23", "24", "27", "30", "31", "32", "33", "34", "35", "36", "38", "39", "40", "44", "45"],
      correctAnswers: ["3", "22", "27"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte27.jpg"
    },    
    {
      question: "Qui suis-je ?<br/> J'utilise une source d'énergie habituellement utilisée pour le barbecue.",
      answers: ["1", "2", "3", "4", "5", "12", "16", "20", "22", "23", "24", "27", "30", "31", "32", "33", "34", "35", "36", "38", "39", "40", "44", "45"],
      correctAnswers: ["31", "36"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte31.jpg"
    },
    {
      question: "Qui suis-je ?<br/> J’utilise la source d'énergie la plus utilisée par les transports. Certains d'entre nous peuvent utiliser une autre source d'énergie.",
      answers: ["1", "2", "3", "4", "5", "12", "16", "20", "22", "23", "24", "27", "30", "31", "32", "33", "34", "35", "36", "38", "39", "40", "44", "45"],
      correctAnswers: ["23", "30", "38", "39", "44", "45"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte23.jpg"
    },    
    {
      question: "Qui suis-je ?<br/> La source d'énergie que j'utilise permet de faire fonctionner les centrales nucléaires.",
      answers: ["1", "2", "3", "4", "5", "12", "16", "20", "22", "23", "24", "27", "30", "31", "32", "33", "34", "35", "36", "38", "39", "40", "44", "45"],
      correctAnswers: ["33"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte33.jpg"
    },
    {
      question: "Une source d'énergie renouvelable est une énergie inépuisable, que la Terre renouvelle en permanence.<br/> Parmi les sources d'énergie suivantes, quelles sont les sources d'énergies renouvelables ?",
      answers: ["le vent", "le pétrole", "le soleil", "le gaz", "les mouvements de l'eau", "le charbon", "l'Homme et les animaux", "la biomasse (bois)"],
      correctAnswers: ["le vent", "le soleil", "les mouvements de l'eau", "l'Homme et les animaux", "la biomasse (bois)"],
      type: "cocher",
      vertical: "oui",
      photo1: "carteX.jpg",
      photo2: "Renouvelables.jpg"
    },
 {
      question: "Qui suis-je ?<br/> Nous utilisons uniquement des sources d'énergie renouvelables.",
      answers: ["1", "2", "3", "4", "5", "12", "16", "20", "22", "23", "24", "27", "30", "31", "32", "33", "34", "35", "36", "38", "39", "40", "44", "45"],
      correctAnswers: ["1", "2", "3", "5", "12", "22", "24", "27", "32"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "Renouvelables.jpg"
    },
    {
      question: "Une source d'énergie non renouvelable est une énergie qui disparaîtra un jour. L'Homme utilise les stocks de la Terre plus rapidement qu'elle ne les renouvelle.<br/> Parmi les sources d'énergie suivantes, quelles sont les sources d'énergies non renouvelables ?",
      answers: ["l'Homme et les animaux", "la biomasse (bois)", "le gaz", "le pétrole", "les mouvements de l'eau", "le vent", "le soleil", "le charbon"],
      correctAnswers: ["le gaz", "le pétrole", "le charbon"],
      type: "cocher",
      vertical: "oui",
      photo1: "carteX.jpg",
      photo2: "Nonrenouvelables.jpg"
    },
   
    {
      question: "Qui suis-je ?<br/> Nous utilisons uniquement des sources d'énergie non renouvelables.",
      answers: ["1", "2", "3", "4", "5", "12", "16", "20", "22", "23", "24", "27", "30", "31", "32", "33", "34", "35", "36", "38", "39", "40", "44", "45"],
      correctAnswers: ["23", "31", "33", "34", "36", "38", "39", "45"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "Nonrenouvelables.jpg"
    },
    {
      question: "L'énergie cinétique correspond à l'énergie d'un objet ou d'un élément en mouvement.<br/>Quels sont les moyens de transport utilisant uniquement l'énergie cinétique d'une source d'énergie afin de se déplacer ?",
      answers: ["1", "2", "3", "4", "5", "12", "16", "20", "22", "23", "24", "27", "30", "31", "32", "33", "34", "35", "36", "38", "39", "40", "44", "45"],
       correctAnswers: ["1", "2", "3", "5", "22", "24", "27"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte22.jpg"
    },
    {
      question: "L'énergie thermique est une forme d'énergie qui donne de la chaleur, par exemple en brûlant une source d'énergie.<br/>Quels sont les moyens de transport utilisant uniquement l'énergie thermique d'une source d'énergie afin de se déplacer ?",
      answers: ["1", "2", "3", "4", "5", "12", "16", "20", "22", "23", "24", "27", "30", "31", "32", "33", "34", "35", "36", "38", "39", "40", "44", "45"],
      correctAnswers: ["23", "31", "32", "34", "36", "38", "39", "45"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte31.jpg"
    },
    {
      question: "L'énergie électrique est une forme d'énergie qui est produite par l'Homme, à partir de toutes les sources d'énergie.<br/>Quels sont les moyens de transport utilisant uniquement de l'énergie électrique ?",
      answers: ["1", "2", "3", "4", "5", "12", "16", "20", "22", "23", "24", "27", "30", "31", "32", "33", "34", "35", "36", "38", "39", "40", "44", "45"],
      correctAnswers: ["20", "16", "40"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte31.jpg"
    },
    {
      question: "Qui suis-je ?<br/> Je dispose d'un moteur électrique et d'un moteur thermique.",
      answers: ["1", "2", "3", "4", "5", "12", "16", "20", "22", "23", "24", "27", "30", "31", "32", "33", "34", "35", "36", "38", "39", "40", "44", "45"],
      correctAnswers: ["30"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte30.jpg"
    },
 {
      question: "Le soleil nous apporte de l'énergie sous deux formes différentes. Lesquelles ?",
      answers: ["énergie électrique", "énergie thermique", "énergie cinétique", "énergie lumineuse", "énergie potentielle"],
      correctAnswers: ["énergie thermique", "énergie lumineuse"],
      type: "cocher",
      vertical: "oui",
      photo1: "soleil.jpg",
      photo2: "soleil.jpg"
    },
    {
      question: "Les moyens de transport ont évolués car l'Homme a appris à utiliser différentes énergies.<br/>Replacer les informations suivantes dans l'ordre chronologique (1 = ancien ; 5 = récent) de l'utilisation des énergies dans les moyens de transport.",
      answers: ["le pétrole", "l'énergie électrique", "le charbon et le gaz", "la force de l'homme et des animaux", "les mouvements de l'eau et du vent"],
      correctOrder: ["la force de l'homme et des animaux", "les mouvements de l'eau et du vent", "le charbon et le gaz", "le pétrole", "l'énergie électrique"],
      type: "glisse",
      photo1: "evolution.jpg",
      photo2: "evolution.jpg"
    }, 
    {
      question: "Tous les moyens de transport lorsqu'ils se déplacent possèdent ...",
      answers: ["de l'énergie électrique", "de l'énergie thermique", "de l'énergie cinétique", "de l'énergie lumineuse"],
      correctAnswers: ["de l'énergie cinétique"],
      type: "cocher",
      vertical: "oui",
      photo1: "cinetique.jpg",
      photo2: "cinetique.jpg"
    }

  ];

    
    /*

   {
      question: "Quel nom donne-t-on ?",
      answers: ["meuble de rangement", "transport ferroviaire", "appareil de cuisson"],
      correctAnswers: ["transport ferroviaire"],
      type: "cocher",
      photo1: "carte20.jpg",
      photo2: "carte20.jpg"
    },

    {
      question: "Bon ordre 2 1 3",
      answers: ["Item A", "Item B", "Item C"],
      correctOrder: ["Item B", "Item A", "Item C"],
      type: "glisse",
      photo1: "carteX.jpg",
      photo2: "carte1.jpg"
    },
 
    {
      question: "Cliquez sur 4, 5, 6 et 7 ?",
      answers: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      correctAnswers: ["4", "5", "6", "7"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte1.jpg"
    }
 
  */