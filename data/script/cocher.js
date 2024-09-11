function showCocherOptions(answers) {
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
        submitCocherButton.style.display = 'inline-block';
      } else {
        submitCocherButton.style.display = 'none';
      }
    });
  });
}

function submitCocherAnswer() {
  isWaiting = true;
  disableButtons();
  hideSubmitButton();
  const checkboxes = document.querySelectorAll('.checkbox-option input[type="checkbox"]');
  const selectedAnswers = [];
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) selectedAnswers.push(checkbox.value);
  });

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = arraysEqual(selectedAnswers, currentQuestion.correctAnswers);

      if (isCorrect) {
    handleCorrectAnswer();
    setTimeout(() => {
      showNextButton();
    }, 2000);
  } else {
    attemptsLeft--;
    if (attemptsLeft > 0) {
    feedbackElement.textContent = `Incorrect. Il vous reste ${attemptsLeft} essai${attemptsLeft === 1 ? '' : 's'}.`;
  } else {
    feedbackElement.textContent = `Incorrect. Vous avez utilisé tous vos essais.`;
  }
    setTimeout(() => {
     feedbackElement.textContent = '';
     const inputs = optionsElement.querySelectorAll('input[type="checkbox"], input[type="radio"]');
     inputs.forEach(input => { input.checked = false; });
     enableButtons();
     isWaiting = false;
    }, 5000);
  
}
}

