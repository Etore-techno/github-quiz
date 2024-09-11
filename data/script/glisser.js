function checkScrollBar() {
  const contentElement = document.getElementById('options');

  // Vérifie si la hauteur du contenu dépasse la hauteur visible (donc, besoin de défiler)
  if (contentElement.scrollHeight > contentElement.clientHeight) {
      contentElement.style.justifyContent = 'flex-start'; // Aligne le texte en haut
      
  } else {
      contentElement.style.justifyContent = 'center'; // Aligne le texte au centre
  }
}

// Vérification initiale
checkScrollBar();

// Écouteur pour redimensionnement de la fenêtre, afin de s'ajuster dynamiquement
window.addEventListener('resize', checkScrollBar);


  function showDraggableOptions(answers) {
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    optionsContainer.style.alignItems = 'flex-start';

    answers.forEach((answer, index) => {
        const row = document.createElement('div');
        row.classList.add('draggable-row');
        
        const numberSpan = document.createElement('span');
        numberSpan.classList.add('fixed-number');
        numberSpan.textContent = `${index + 1}.`; // Numérotation fixe
  
        const div = document.createElement('div');
        div.classList.add('draggable-option');
        div.setAttribute('draggable', 'true');
        div.setAttribute('data-index', index); // Index des éléments pour référence
        div.textContent = answer;
  
        row.appendChild(numberSpan);
        row.appendChild(div);
  
        optionsElement.appendChild(row);
    });
  
    addDragAndDropListeners();
}

function addDragAndDropListeners() {
  const draggableOptions = document.querySelectorAll('.draggable-option');

  draggableOptions.forEach(option => {
      option.addEventListener('dragstart', handleDragStart);
      option.addEventListener('dragover', handleDragOver);
      option.addEventListener('drop', handleDrop);
  });
}

function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.dataset.index);
  event.currentTarget.classList.add('dragging');
}

function handleDragOver(event) {
  event.preventDefault();
  event.currentTarget.classList.add('drag-over');
}

function handleDrop(event) {
  event.preventDefault();
  const sourceIndex = event.dataTransfer.getData('text/plain');
  const targetIndex = event.currentTarget.dataset.index;

  if (sourceIndex !== targetIndex) {
      const sourceElement = document.querySelector(`.draggable-option[data-index='${sourceIndex}']`);
      const targetElement = document.querySelector(`.draggable-option[data-index='${targetIndex}']`);

      // Échanger les contenus des éléments
      const tempText = sourceElement.textContent;
      sourceElement.textContent = targetElement.textContent;
      targetElement.textContent = tempText;
  }

  document.querySelectorAll('.draggable-option').forEach(option => {
      option.classList.remove('dragging', 'drag-over');
  });
}


function submitGlisserAnswer() {
  isWaiting = true;
  disableButtons();
  hideSubmitButton();

  // Obtenez l'ordre des éléments après déplacement
  const draggableOptions = Array.from(document.querySelectorAll('.draggable-option'));
  const userOrder = draggableOptions.map(option => option.textContent);

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = arraysEqual(userOrder, currentQuestion.correctOrder);

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
              finPlacement();
              showDraggableOptions(currentQuestion.answers);
              enableButtons();
              showSubmitButton();
              isWaiting = false;
          }, 5000);
                 
  }
}