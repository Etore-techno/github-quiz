var titrequiz = 'Activité 1 : Les familles des moyens de transport';
var imagefond = 'data/images/Sans titre 2.jpeg'
var couleur = '#0f1bc4'

var questions = [ 

    {
      question: "Qui suis-je ?<br/> Un baron allemand m'a fabriqué entièrement en bois.",
      answers: ["1", "3", "4", "5", "12", "16", "20", "22", "23", "27", "30", "31", "32", "33", "34", "35", "38", "39", "40", "44", "45"],
      correctAnswers: ["5"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte5.jpg"
    },
    {
      question: "Qui suis-je ?<br/> Je porte le nom d’un ancien président français.",
      answers: ["1", "3", "4", "5", "12", "16", "20", "22", "23", "27", "30", "31", "32", "33", "34", "35", "38", "39", "40", "44", "45"],
      correctAnswers: ["33"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte33.jpg"
    },    
    {
      question: "Qui suis-je ?<br/> Je suis une rame automotrice conçue et exploitée par la S.N.C.F..",
      answers: ["1", "3", "4", "5", "12", "16", "20", "22", "23", "27", "30", "31", "32", "33", "34", "35", "38", "39", "40", "44", "45"],
      correctAnswers: ["20"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte20.jpg"
    },
    {
      question: "Qui suis-je ?<br/> Je suis probablement le plus ancien moyen de transport construit par l'Homme.",
      answers: ["1", "3", "4", "5", "12", "16", "20", "22", "23", "27", "30", "31", "32", "33", "34", "35", "38", "39", "40", "44", "45"],
      correctAnswers: ["3"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte3.jpg"
    },   
    {
      question: "Qui suis-je ?<br/> J'assure la liaison entre Paris et Istanbul en desservant plusieurs capitales européennes.",
      answers: ["1", "3", "4", "5", "12", "16", "20", "22", "23", "27", "30", "31", "32", "33", "34", "35", "38", "39", "40", "44", "45"],
      correctAnswers: ["31"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte31.jpg"
    },
    {
      question: "Qui suis-je ?<br/> Je suis le premier véhicule fabriqué grâce au travail à la chaîne.",
      answers: ["1", "3", "4", "5", "12", "16", "20", "22", "23", "27", "30", "31", "32", "33", "34", "35", "38", "39", "40", "44", "45"],
      correctAnswers: ["39"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte39.jpg"
    },
    {
      question: "Qui suis-je ?<br/> 2 frères m’ont présenté pour la première fois au château de Versailles.",
      answers: ["1", "3", "4", "5", "12", "16", "20", "22", "23", "27", "30", "31", "32", "33", "34", "35", "38", "39", "40", "44", "45"],
      correctAnswers: ["4"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte4.jpg"
    },
    {
      question: "Qui suis-je ?<br/> Je possède le même système que les hoverboard utilisent pour rester stable.",
      answers: ["1", "3", "4", "5", "12", "16", "20", "22", "23", "27", "30", "31", "32", "33", "34", "35", "38", "39", "40", "44", "45"],
      correctAnswers: ["40"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte40.jpg"
    },    
    {
      question: "Qui suis-je ?<br/> Je préfère une place de parking ensoleillée.",
      answers: ["1", "3", "4", "5", "12", "16", "20", "22", "23", "27", "30", "31", "32", "33", "34", "35", "38", "39", "40", "44", "45"],
      correctAnswers: ["35"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte35.jpg"
    },
    {
      question: "Qui suis-je ?<br/> J’ai permis la découverte d’un nouveau continent.",
      answers: ["1", "3", "4", "5", "12", "16", "20", "22", "23", "27", "30", "31", "32", "33", "34", "35", "38", "39", "40", "44", "45"],
      correctAnswers: ["22"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte22.jpg"
    },    
    {
      question: "Qui suis-je ?<br/> 2 frères m’ont créé au 20ème siècle.",
      answers: ["1", "3", "4", "5", "12", "16", "20", "22", "23", "27", "30", "31", "32", "33", "34", "35", "38", "39", "40", "44", "45"],
      correctAnswers: ["45"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte45.jpg"
    },
    {
      question: "Qui suis-je ?<br/> Je suis le premier à dépasser 1200 km/h.",
      answers: ["1", "3", "4", "5", "12", "16", "20", "22", "23", "27", "30", "31", "32", "33", "34", "35", "38", "39", "40", "44", "45"],
      correctAnswers: ["34"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte34.jpg"
    },
    {
      question: "Qui suis-je ?<br/> J'ai suivi le soleil afin de réaliser le tour du monde.",
      answers: ["1", "3", "4", "5", "12", "16", "20", "22", "23", "27", "30", "31", "32", "33", "34", "35", "38", "39", "40", "44", "45"],
      correctAnswers: ["12"],
      type: "multiple",
      photo1: "carteX.jpg",
      photo2: "carte12.jpg"
    },


    {
      question: "Le rôle d'un objet technique se nomme sa fonction d'usage.<br/>Quelle est la fonction d'usage principale du moyen de transport de la carte 20 ?",
      answers: ["chauffer un plat", "protéger les pieds", "se déplacer sur la route", "contenir une boisson", "laisser une trace", "produire de la musique", "se déplacer sur des rails"],
      correctAnswers: ["se déplacer sur des rails"],
      type: "cocher",
      vertical: "oui",
      photo1: "carte20.jpg",
      photo2: "carte20.jpg"
    },
    {
      question: "Une famille d'objets regroupe des objets ayant la même fonction d'usage principale.<br/>Quels sont les moyens de transport appartenant à la même famille que celui de la carte 20 ?",
      answers: ["1", "3", "4", "5", "12", "16", "22", "23", "27", "30", "31", "32", "33", "34", "35", "38", "39", "40", "44", "45"],
      correctAnswers: ["31", "38"],
      type: "multiple",
      photo1: "carte20.jpg",
      photo2: "carte20.jpg"
    },
    {
      question: "Quel nom donne-t-on à cette famille de moyens de transport pemettant de se déplacer sur des rails ?",
      answers: ["meuble de rangement", "transport maritime", "appareil de cuisson", "système d'éclairage", "récipient", "transport ferroviaire", "console de jeux"],
      correctAnswers: ["transport ferroviaire"],
      type: "cocher",
      vertical: "oui",
      photo1: "carte20.jpg",
      photo2: "carte20.jpg"
    },
    {
      question: "Quelle est la fonction d'usage principale du moyen de transport de la carte 30 ?",
      answers: ["chauffer une pièce", "éclairer une pièce", "afficher des images", "se déplacer sur la route", "protéger la tête", "supporter une personne", "conserver des aliments"],
      correctAnswers: ["se déplacer sur la route"],
      type: "cocher",
      vertical: "oui",
      photo1: "carte30.jpg",
      photo2: "carte30.jpg"
    },
    {
      question: "Quels sont les moyens de transport appartenant à la même famille que celui de la carte 30 ?",
      answers: ["1", "3", "4", "5", "12", "16", "20", "22", "23", "27", "31", "32", "33", "34", "35", "38", "39", "40", "44", "45"],
      correctAnswers: ["1", "5", "16", "32", "35", "39", "40"],
      type: "multiple",
      photo1: "carte30.jpg",
      photo2: "carte30.jpg"
    },
    {
      question: "Quel nom donne-t-on à cette famille de moyens de transport pemettant de se déplacer sur la route ?",
      answers: ["meuble de rangement", "système d'éclairage", "système de chauffage", "récipient", "transport routier", "console de jeux", "transport maritime"],
      correctAnswers: ["transport routier"],
      type: "cocher",
      vertical: "oui",
      photo1: "carte30.jpg",
      photo2: "carte30.jpg"
    },
    {
      question: "Quelle est la fonction d'usage principale du moyen de transport de la carte 23 ?",
      answers: ["éclairer une pièce", "afficher des images", "se déplacer dans les airs", "contenir une boisson", "protéger la tête", "supporter une personne", "conserver des aliments"],
      correctAnswers: ["se déplacer dans les airs"],
      type: "cocher",
      vertical: "oui",
      photo1: "carte23.jpg",
      photo2: "carte23.jpg"
    },
    {
      question: "Quels sont les moyens de transport appartenant à la même famille que celui de la carte 23 ?",
      answers: ["1", "3", "4", "5", "12", "16", "20", "22", "27", "30", "31", "32", "33", "34", "35", "38", "39", "40", "44", "45"],
      correctAnswers: ["4", "12", "34", "45"],
      type: "multiple",
      photo1: "carte23.jpg",
      photo2: "carte23.jpg"
    },
    {
      question: "Quel nom donne-t-on à cette famille de moyens de transport pemettant de se déplacer dans les airs ?",
      answers: ["meuble de rangement", "transport ferroviaire", "transport aérien", "appareil de cuisson", "système d'éclairage", "système de chauffage", "console de jeux"],
      correctAnswers: ["transport aérien"],
      type: "cocher",
      vertical: "oui",
      photo1: "carte23.jpg",
      photo2: "carte23.jpg"
    },
    {
      question: "Quelle est la fonction d'usage principale du moyen de transport de la carte 22 ?",
      answers: ["chauffer un plat", "chauffer une pièce", "protéger les pieds", "éclairer une pièce", "afficher des images", "contenir une boisson", "se déplacer sur l'eau"],
      correctAnswers: ["se déplacer sur l'eau"],
      type: "cocher",
      vertical: "oui",
      photo1: "carte22.jpg",
      photo2: "carte22.jpg"
    },
    {
      question: "Quels sont les moyens de transport appartenant à la même famille que celui de la carte 22 ?",
      answers: ["1", "3", "4", "5", "12", "16", "20", "23", "27", "30", "31", "32", "33", "34", "35", "38", "39", "40", "44", "45"],
      correctAnswers: ["3", "27", "33", "44"],
      type: "multiple",
      photo1: "carte22.jpg",
      photo2: "carte22.jpg"
    },
    {
      question: "Quel nom donne-t-on à cette famille de moyens de transport pemettant de se déplacer sur l'eau ?",
      answers: ["meuble de rangement", "transport ferroviaire", "appareil de cuisson", "système de chauffage", "récipient", "console de jeux", "transport maritime"],
      correctAnswers: ["transport maritime"],
      type: "cocher",
      vertical: "oui",
      photo1: "carte22.jpg",
      photo2: "carte22.jpg"
    },

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