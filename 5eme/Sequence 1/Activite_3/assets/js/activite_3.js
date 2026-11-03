window.ACTIVITY = {
  activity: "Activité 3",
  title: "Formes et conversions d’énergie",
  introFeedback: "Quand le binôme est prêt, commencez l’activité.",
  finish: "Complétez maintenant la fiche de l’activité 3 avant la mise en commun.",
  forms: ["Électrique", "Cinétique", "Thermique", "Lumineuse", "Potentielle"],
  steps: [
    {
      type: "intro",
      title: "Objectif :",
      instructions: [
        "Observez les scènes et échangez avant chaque validation.",
        "Commencez par relier des sources aux formes d’énergie reçues.",
        "Reconstituez ensuite les conversions d’énergie.",
        "Complétez la fiche d’activité à la fin."
      ]
    },
    {
      type: "sourceMatch",
      prompt: "Associez chaque source ou alimentation d’énergie à la ou aux formes d’énergie qu’elle peut fournir.",
      points: 2,
      pairs: [
        { id: "sun", label: "Rayonnement du Soleil", forms: ["Lumineuse", "Thermique"] },
        { id: "battery", label: "Batterie", forms: ["Électrique"] },
        { id: "wind", label: "Air en mouvement (vent)", forms: ["Cinétique"] },
        { id: "wood", label: "Bois brûlé", forms: ["Thermique"] },
        { id: "oil", label: "Pétrole brûlé", forms: ["Thermique"] },
        { id: "food", label: "Muscles utilisant des aliments", forms: ["Cinétique"] }
      ]
    },
    {
      type: "sourceMatch",
      prompt: "Associez chaque source ou alimentation d’énergie à la forme d’énergie qu’elle peut fournir.",
      points: 2,
      pairs: [
        { id: "coal", label: "Charbon brûlé", forms: ["Thermique"] },
        { id: "water", label: "Eau en mouvement", forms: ["Cinétique"] },
        { id: "catenary", label: "Caténaire du tramway", forms: ["Électrique"] },
        { id: "gas", label: "Gaz brûlé", forms: ["Thermique"] },
        { id: "ethanol", label: "Bioéthanol brûlé", forms: ["Thermique"] },
        { id: "dam", label: "Eau stockée en hauteur dans un barrage", forms: ["Potentielle"] }
      ]
    },
    {
      type: "sceneChoice", scene: "solar", phase: "sunlight",
      prompt: "Le Soleil éclaire les panneaux photovoltaïques de l’avion. Sous quelle forme l’énergie atteint-elle les panneaux ?",
      options: ["Électrique", "Cinétique", "Thermique", "Lumineuse", "Potentielle"], correct: "Lumineuse", points: 0.75,
      success: "Le rayonnement du Soleil apporte une énergie lumineuse aux panneaux."
    },
    {
      type: "sceneChoice", scene: "sail", phase: "wind",
      prompt: "Le vent est de l’air en mouvement. Sous quelle forme apporte-t-il de l’énergie à la voile ?",
      options: ["Électrique", "Cinétique", "Thermique", "Lumineuse", "Potentielle"], correct: "Cinétique", points: 0.75,
      success: "Parce qu’il est en mouvement, le vent apporte une énergie cinétique."
    },
    {
      type: "sceneChoice", scene: "steam", phase: "fire",
      prompt: "Dans le foyer d’une locomotive, le charbon brûle et chauffe l’eau. Quelle forme d’énergie est alors principalement produite ?",
      options: ["Électrique", "Cinétique", "Thermique", "Lumineuse", "Potentielle"], correct: "Thermique", points: 0.75,
      success: "La combustion du charbon produit principalement une énergie thermique."
    },
    {
      type: "sceneChoice", scene: "generator", phase: "crank",
      prompt: "Une personne tourne la manivelle d’une génératrice. Sous quelle forme l’énergie atteint-elle la génératrice ?",
      options: ["Électrique", "Cinétique", "Thermique", "Lumineuse", "Potentielle"], correct: "Cinétique", points: 0.75,
      success: "Le mouvement de la main et de la manivelle fournit une énergie cinétique."
    },
    {
      type: "conversion", scene: "solar", phase: "panel",
      prompt: "Quelle conversion est réalisée par les panneaux photovoltaïques de l’avion ?",
      component: "Panneaux photovoltaïques", slots: ["Lumineuse", "Électrique"], points: 1.5,
      hint: "Les panneaux reçoivent le rayonnement du Soleil et fournissent de l’électricité."
    },
    {
      type: "conversion", scene: "tram", phase: "motor",
      prompt: "Quelle conversion est réalisée par le moteur électrique du tramway ?",
      component: "Moteur électrique", slots: ["Électrique", "Cinétique"], points: 1.5,
      hint: "Le moteur reçoit de l’électricité et met son rotor en mouvement."
    },
    {
      type: "sceneChoice", scene: "sail", phase: "transfer",
      prompt: "Le vent met directement le voilier en mouvement. Quelle affirmation décrit correctement ce phénomène ?",
      options: [
        "L’énergie cinétique du vent est transmise au voilier sans changer de forme.",
        "L’énergie cinétique du vent devient une énergie électrique.",
        "L’énergie lumineuse devient une énergie cinétique.",
        "L’énergie thermique devient une énergie potentielle."
      ],
      correct: "L’énergie cinétique du vent est transmise au voilier sans changer de forme.", points: 1,
      success: "L’énergie reste cinétique : elle est transférée du vent au voilier sans conversion."
    },
    {
      type: "conversion", scene: "slope", phase: "full",
      prompt: "Une voiture descend une pente sans utiliser son moteur et prend de la vitesse. Quelle conversion observe-t-on ?",
      component: "Voiture placée en hauteur", slots: ["Potentielle", "Cinétique"], points: 1,
      hint: "En hauteur, l’énergie est liée à la position ; pendant la descente, la voiture prend de la vitesse."
    },
    {
      type: "conversion", scene: "radiator", phase: "full",
      prompt: "Le radiateur est branché à une prise. Quelle conversion réalise-t-il ?",
      component: "Radiateur électrique", slots: ["Électrique", "Thermique"], points: 1,
      hint: "L’électricité arrive par le câble ; le radiateur chauffe l’air de la pièce."
    },
    {
      type: "conversion", scene: "lamp", phase: "full",
      prompt: "La lampe est branchée à une prise. Quelle conversion utile réalise-t-elle ?",
      component: "Lampe", slots: ["Électrique", "Lumineuse"], points: 1,
      hint: "L’électricité arrive par le câble ; l’ampoule éclaire."
    },
    {
      type: "conversion", scene: "generator", phase: "electric",
      prompt: "Quelle conversion est réalisée par la génératrice lorsque la manivelle tourne ?",
      component: "Génératrice", slots: ["Cinétique", "Électrique"], points: 1.5,
      hint: "La génératrice reçoit le mouvement de la manivelle et fournit de l’électricité."
    },
    {
      type: "conversion", scene: "steam", phase: "full",
      prompt: "La vapeur chauffée pousse le piston et met les roues en mouvement. Quelle conversion d’énergie observe-t-on ?",
      component: "Vapeur, piston et mécanisme", slots: ["Thermique", "Cinétique"], points: 1.25,
      hint: "La vapeur chaude apporte une énergie thermique ; le piston et les roues se mettent en mouvement."
    },
    {
      type: "conversion", scene: "solar", phase: "full",
      prompt: "Reconstituez toute la suite de conversions qui permet à l’avion solaire d’avancer.",
      components: ["Panneaux photovoltaïques", "Moteur électrique"], slots: ["Lumineuse", "Électrique", "Cinétique"], points: 2,
      hint: "Les panneaux transforment d’abord le rayonnement ; le moteur transforme ensuite l’électricité."
    },
    {
      type: "conversion", scene: "generator", phase: "full",
      prompt: "Reconstituez les conversions qui permettent à la génératrice d’allumer la DEL.",
      components: ["Génératrice", "DEL"], slots: ["Cinétique", "Électrique", "Lumineuse"], points: 1.25,
      hint: "La génératrice produit de l’électricité ; la DEL transforme ensuite cette énergie en lumière."
    }
  ]
};
