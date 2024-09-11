
function showMultipleOptions(answers) {
  const currentQuestion = questions[currentQuestionIndex];
  const numItems = currentQuestion.answers.length;
  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';
  optionsContainer.style.alignItems = 'center';
  const numRows = calculateRows(numItems);
  const itemsPerRow = calculateItemsPerRow(numItems, numRows);

  let index = 0;

  // Créer et ajouter les lignes d'options une par une
  for (let row = 0; row < numRows; row++) {
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('option-row');

    for (let col = 0; col < itemsPerRow[row]; col++) {
      if (index >= numItems) break;

      const answer = currentQuestion.answers[index];
      const button = createOptionButton(answer);

      rowContainer.appendChild(button);
      index++;
    }

    optionsElement.appendChild(rowContainer);
  }

  // Calculer la largeur optimale des boutons basée uniquement sur la première ligne
  const buttonWidth = calculateButtonWidth(itemsPerRow[0]);

  // Appliquer la même largeur à tous les boutons
  const buttons = document.querySelectorAll('.option-button');
  buttons.forEach(button => {
    button.style.flex = `0 0 ${buttonWidth}px`;
    button.style.width = `${buttonWidth}px`;
  });
}

// Fonction utilitaire pour comparer deux tableaux
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}


function createOptionRow(numItems, startIndex, answers) {
  const rowContainer = document.createElement('div');
  rowContainer.classList.add('option-row');

  for (let i = startIndex; i < startIndex + numItems; i++) {
    const answer = answers[i];
    const button = createOptionButton(answer);
    rowContainer.appendChild(button);
  }

  return rowContainer;
}



  function createOptionButton(answer) {
    const button = document.createElement('button');
    button.classList.add('option-button');
    button.textContent = answer;
   
    if (questions[currentQuestionIndex].type === 'multiple') {
      button.addEventListener('click', () => {
        handleMultipleAnswer(button);
      });
    }

    return button;
  }

function calculateRows(numItems) {
  if (numItems <= 5) {
    return 1;
  } else if (numItems <= 10) {
    return 2;
  } else if (numItems <= 15) {
    return 3;
  } else {
    return 4;
  }
}

function calculateItemsPerRow(numItems, numRows) {
  const itemsPerRow = Math.ceil(numItems / numRows);
  return Array(numRows).fill(itemsPerRow).map((val, index) => {
    if (index === numRows - 1) {
      return numItems - (itemsPerRow * index);
    }
    return val;
  });
}

  function setButtonWidths(numItems, maxItemsPerRow) {
    const buttons = document.querySelectorAll('.option-button');
    const buttonWidth = calculateButtonWidth(maxItemsPerRow);
    buttons.forEach(button => {
      button.style.width = `${buttonWidth}px`;
    });
  }

function calculateButtonWidth(itemsInRow) {
    const containerWidth = optionsElement.clientWidth;
    const emInPixels = parseFloat(getComputedStyle(document.documentElement).fontSize);

    // Calcul de la largeur des boutons en pixels
    return Math.floor((containerWidth - (6 * 2 * emInPixels)) / 7);
}


  function handleMultipleAnswer(button) {
    button.classList.toggle('selected');
    const selectedButtons = Array.from(optionsElement.querySelectorAll('.selected'));
    const currentQuestion = questions[currentQuestionIndex];
    const numberOfCorrectAnswers = currentQuestion.correctAnswers.length;

    console.log("Réponses sélectionnées : ", selectedButtons);
  console.log("Nombre de réponses correctes : ", numberOfCorrectAnswers);

    submitButtonMultiple.style.display = selectedButtons.length === numberOfCorrectAnswers ? 'inline-block' : 'none';
    
  }

  
  function submitMultipleAnswer() {
    isWaiting = true;
    disableButtons();
    const selectedButtons = Array.from(optionsElement.querySelectorAll('.selected'));
    const currentQuestion = questions[currentQuestionIndex];
    const numberOfCorrectAnswers = currentQuestion.correctAnswers.length;
    if (selectedButtons.length !== numberOfCorrectAnswers) return;
    hideSubmitButton();
    const selectedAnswers = selectedButtons.map(btn => btn.textContent.trim()).sort();
    const correctAnswers = currentQuestion.correctAnswers.map(answer => answer.toString().trim()).sort();
    
    if (arraysEqual(selectedAnswers, correctAnswers)) {
      handleCorrectAnswer();
      setTimeout(() => {
        showNextButton();
      }, 2000);
    } else {
      handleIncorrectAnswer();
    }
  }