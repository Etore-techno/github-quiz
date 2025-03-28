var titrequiz = 'Activité 3 (suite) : Le principe de fonctionnement du vélo électrique';
var imagefond = 'data/images/velo_fond.jpg'
var couleur = '#1B76AD'

var questions = [ 
  /*    
  {
      question: "Les moyens de transport sont composés de différentes parties, chacune accomplissant des fonctions techniques spécifiques.<br/>Quelles sont les fonctions techniques communes à la majorité des moyens de transport ?",
      answers: ["Eclairer le trajet", "Propulser le moyen de transport", "Assurer le confort de l'utilisateur", "Assurer la sécurité de l'utilisateur", "Freiner le moyen de transport", "Afficher le trajet", "Transporter des objets", "Diriger le moyen de transport", "Protéger l'utilisateur des intempéries"],
      correctAnswers: ["Propulser le moyen de transport", "Freiner le moyen de transport", "Diriger le moyen de transport"],
      type: "cocher",
      vertical: "oui",
      photo1: "velo_fond.jpg",
      photo2: "velo_fond.jpg"
    },
    {
      question: "Quels sont les éléments du vélo réalisant la fonction technique : freiner le vélo (frein arrière) ?",
      answers: ["Guidon", "Selle", "Poignée de frein", "Câble de frein", "Feu avant", "Roue avant", "Cadre", "Fourche", "Plateau(x)", "Pédalier", "Roue arrière", "Chaîne", "Pignon(s)", "Garde-boue", "Feu arrière", "Porte bagages", "Mâchoîre et patins"],
      correctAnswers: ["Poignée de frein", "Câble de frein", "Roue arrière", "Mâchoîre et patins"],
      type: "cocher",
      vertical: "non",
      photo1: "velo_legende.jpg",
      photo2: "velo_legende.jpg"
    },
    {
      question: "Quels sont les éléments du vélo réalisant la fonction technique : propulser le vélo (avancer) ?",
      answers: ["Guidon", "Selle", "Poignée de frein", "Câble de frein", "Feu avant", "Roue avant", "Cadre", "Fourche", "Plateau(x)", "Pédalier", "Roue arrière", "Chaîne", "Pignon(s)", "Garde-boue", "Feu arrière", "Porte bagages", "Mâchoîre et patins"],
      correctAnswers: ["Plateau", "Pédalier", "Roue arrière", "Chaîne", "Pignons"],
      type: "cocher",
      vertical: "non",
      photo1: "velo_legende.jpg",
      photo2: "velo_legende.jpg"
    },
    {
      question: "Quels sont les éléments du vélo réalisant la fonction technique : dirigerle vélo (tourner) ?",
      answers: ["Guidon", "Selle", "Poignée de frein", "Câble de frein", "Feu avant", "Roue avant", "Cadre", "Fourche", "Plateau(x)", "Pédalier", "Roue arrière", "Chaîne", "Pignon(s)", "Garde-boue", "Feu arrière", "Porte bagages", "Mâchoîre et patins"],
      correctAnswers: ["Guidon", "Roue avant", "Fourche"],
      type: "cocher",
      vertical: "non",
      photo1: "velo_legende.jpg",
      photo2: "velo_legende.jpg"
    },
    {
      question: "À quelle fonction technique répondent le feu avant et le feu arrière ?",
      answers: ["Eclairer le trajet", "Propulser le moyen de transport", "Assurer le confort de l'utilisateur", "Assurer la sécurité de l'utilisateur", "Freiner le moyen de transport", "Afficher le trajet", "Transporter des objets", "Diriger le moyen de transport", "Protéger l'utilisateur des intempéries"],
      correctAnswers: ["Assurer la sécurité du cycliste"],
      type: "cocher",
      vertical: "oui",
      photo1: "velo_legende.jpg",
      photo2: "velo_legende.jpg"
    },
    {
      question: "À quelle fonction technique répond la selle ?",
      answers: ["Eclairer le trajet", "Propulser le moyen de transport", "Assurer le confort de l'utilisateur", "Assurer la sécurité de l'utilisateur", "Freiner le moyen de transport", "Afficher le trajet", "Transporter des objets", "Diriger le moyen de transport", "Protéger l'utilisateur des intempéries"],
      correctAnswers: ["Assurer le confort du cycliste"],
      type: "cocher",
      vertical: "oui",
      photo1: "velo_legende.jpg",
      photo2: "velo_legende.jpg"
    },
    {
      question: "À quelle fonction technique répond le cadre ?",
      answers: ["Eclairer le trajet", "Propulser le moyen de transport", "Assurer le confort de l'utilisateur", "Assurer la sécurité de l'utilisateur", "Freiner le moyen de transport", "Afficher le trajet", "Transporter des objets", "Diriger le moyen de transport", "Protéger l'utilisateur des intempéries"],
      correctAnswers: ["Maintenir la structure du vélo"],
      type: "cocher",
      vertical: "oui",
      photo1: "velo_legende.jpg",
      photo2: "velo_legende.jpg"
    },
    {
      question: "À quelle fonction technique répond le garde-boue ?",
      answers: ["Eclairer le trajet", "Propulser le moyen de transport", "Assurer le confort de l'utilisateur", "Assurer la sécurité de l'utilisateur", "Freiner le moyen de transport", "Afficher le trajet", "Transporter des objets", "Diriger le moyen de transport", "Protéger l'utilisateur des intempéries"],
      correctAnswers: ["Protéger le cycliste des éclaboussures"],
      type: "cocher",
      vertical: "oui",
      photo1: "velo_legende.jpg",
      photo2: "velo_legende.jpg"
    },
    {
      question: "À quelle fonction technique répond le porte bagages ?",
      answers: ["Eclairer le trajet", "Propulser le moyen de transport", "Assurer le confort de l'utilisateur", "Assurer la sécurité de l'utilisateur", "Freiner le moyen de transport", "Afficher le trajet", "Transporter des objets", "Diriger le moyen de transport", "Protéger l'utilisateur des intempéries"],
      correctAnswers: ["Transporter des objets"],
      type: "cocher",
      vertical: "oui",
      photo1: "velo_legende.jpg",
      photo2: "velo_legende.jpg"
    },
    {
      question: "Le cycliste transmet son énergie au vélo afin de le propulser.<br/>Replacer les éléments suivants dans l'ordre de circulation de l'énergie (1. Le cycliste) :",
      answers: ["le cycliste", "le(s) plateau(x)", "le sol", "la roue arrière", "la chaîne", "le pédalier", "le(s) pignon(s)"],
      correctOrder: ["le cycliste", "le pédalier", "le(s) plateau(x)", "la chaîne", "le(s) pignon(s)", "la roue arrière", "le sol"],
      type: "glisse",
      photo1: "velo_legende.jpg",
      photo2: "velo_legende.jpg"
    }, 

*/
    {
      question: "Le vélo électrique présenté sur l'image de droite possède 3 éléments supplémentaires que le vélo classique.<br/>À quelle fonction technique répond la batterie ?",
      answers: ["Propulser le moyen de transport", "Assurer le confort de l'utilisateur", "Alimenter le vélo en énergie électrique", "Assurer la sécurité de l'utilisateur", "Freiner le moyen de transport", "Commander la vitesse du vélo", "Afficher le trajet", "Transporter des objets", "Mettre en mouvement le plateau", "Diriger le moyen de transport", "Protéger l'utilisateur des intempéries"],
      correctAnswers: ["Alimenter le vélo en énergie électrique"],
      type: "cocher",
      vertical: "oui",
      photo1: "evelo_legende.jpg",
      photo2: "evelo_legende.jpg"
    },
    {
      question: "À quelle fonction technique répond le moteur électrique ?",
      answers: ["Propulser le moyen de transport", "Assurer le confort de l'utilisateur", "Alimenter le vélo en énergie électrique", "Assurer la sécurité de l'utilisateur", "Freiner le moyen de transport", "Commander la vitesse du vélo", "Afficher le trajet", "Transporter des objets", "Mettre en mouvement le plateau", "Diriger le moyen de transport", "Protéger l'utilisateur des intempéries"],
      correctAnswers: ["Mettre en mouvement le plateau"],
      type: "cocher",
      vertical: "oui",
      photo1: "evelo_legende.jpg",
      photo2: "evelo_legende.jpg"
    },
    {
      question: "À quelle fonction technique répond la poignée d'accélérateur ?",
      answers: ["Propulser le moyen de transport", "Assurer le confort de l'utilisateur", "Alimenter le vélo en énergie électrique", "Assurer la sécurité de l'utilisateur", "Freiner le moyen de transport", "Commander la vitesse du vélo", "Afficher le trajet", "Transporter des objets", "Mettre en mouvement le plateau", "Diriger le moyen de transport", "Protéger l'utilisateur des intempéries"],
      correctAnswers: ["Commander la vitesse du vélo"],
      type: "cocher",
      vertical: "oui",
      photo1: "evelo_legende.jpg",
      photo2: "evelo_legende.jpg"
    },
    {
      question: "Le vélo électrique ne nécessite plus l'énergie du cycliste afin de se propulser.<br/>Replacer les éléments suivants dans l'ordre de circulation de l'énergie (1. départ de l'énergie) :",
      answers: ["le moteur électrique", "le(s) plateau(x)", "le sol", "la poignée d'accélérateur", "la roue arrière", "la chaîne", "la batterie", "le(s) pignon(s)"],
      correctOrder: ["la batterie", "la poignée d'accélérateur", "le moteur électrique", "le(s) plateau(x)", "la chaîne", "le(s) pignon(s)", "la roue arrière", "le sol"],
      type: "glisse",
      photo1: "evelo_legende.jpg",
      photo2: "evelo_legende.jpg"
    }, 
    {
      question: "Le vélo et le vélo électrique font-ils partie de la même famille ? (oui ou non)<br/>Les 2 vélos fonctionnent-ils de la même façon ? (OUI ou NON) ?",
      answers: ["oui", "non", "OUI", "NON"],
      correctAnswers: ["oui","NON"],
      type: "cocher",
      vertical: "oui",
      photo1: "evelo_legende.jpg",
      photo2: "evelo_legende.jpg"
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