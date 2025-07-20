function afficherCocherReponses(answers) {
  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';

  // Assurez-vous que vous avez accès à l'objet question actuel
  const currentQuestion = questions[currentQuestionIndex];

   // Réinitialiser les classes
   optionsContainer.classList.remove('horizontal', 'vertical');

   // Appliquer la classe appropriée en fonction de la question
   if (currentQuestion.vertical === 'oui') {
     optionsContainer.classList.add('vertical');
   } else {
     optionsContainer.classList.add('horizontal');
   }

  answers.forEach(answer => {
    const optionContainer = document.createElement('div');
    optionContainer.classList.add('checkbox-option');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = answer;
    checkbox.id = `checkbox-${answer}`;

    const label = document.createElement('label');
    label.htmlFor = `checkbox-${answer}`;
    label.textContent = answer;

    optionContainer.appendChild(checkbox);
    optionContainer.appendChild(label);

    optionsContainer.appendChild(optionContainer);

    // Ajouter un écouteur d'événement sur chaque checkbox
    checkbox.addEventListener('change', () => {
      const selectedCheckboxes = document.querySelectorAll('.checkbox-option input[type="checkbox"]:checked');
      const correctAnswersCount = currentQuestion.correctAnswers.length;

      // Afficher le bouton "Valider" uniquement si le bon nombre de cases sont cochées
      if (selectedCheckboxes.length === correctAnswersCount) {
      
        validerButton.style.display = 'inline-block';
/*
        submitCocherButton.style.display = 'inline-block';
        */
      } else {

        validerButton.style.display = 'none';

/*
        submitCocherButton.style.display = 'none';
*/
      }
    });
  });
}

function verifCocherAnswer() {
  isWaiting = true;
  desactiverButtons();
  cacherValiderButton();
  cacherPasserButton();

  const checkboxes = document.querySelectorAll('.checkbox-option input[type="checkbox"]');
  const selectedAnswers = [];
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) selectedAnswers.push(checkbox.value);
  });

  const currentQuestion = questions[currentQuestionIndex];

// Normaliser les réponses sélectionnées et correctes (supprimer les accents, mettre en minuscules)
const normalizeString = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
const normalizedSelectedAnswers = selectedAnswers.map(answer => normalizeString(answer));
const normalizedCorrectAnswers = currentQuestion.correctAnswers.map(answer => normalizeString(answer));

// Vérifier si toutes les réponses sélectionnées sont correctes
const isCorrect = normalizedSelectedAnswers.every(answer => normalizedCorrectAnswers.includes(answer));

  if (isCorrect && normalizedSelectedAnswers.length === normalizedCorrectAnswers.length) {
    gestionReponseCorrecte();
    
  } else {
    gestionReponseFausse();
}
}

