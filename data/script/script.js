document.title = titrequiz;

document.getElementById("titrequiz").textContent = titrequiz;

// Ajouter une image de fond à la classe "quiz-container" via CSS
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `.quiz-container { background-image: url("${imagefond}"); }`;
document.head.appendChild(styleSheet);

const root = document.documentElement;
        // Attribuer une couleur à la variable CSS via JavaScript
        root.style.setProperty('--main-color', couleur);


var questionElement, optionsElement, submitCocherButton, submitButtonMultiple, 
    submitGlisserButton, nextButton, demarrerButton, feedbackElement, 
    blocscoreElement, scoreElement, nombrequestionsElement, 
    numeroquestionElement, scorepossibleElement, blocnumquestionElement, 
    questionContainerElement, centrecontainerElement, currentQuestionIndex = 0, 
    score = 0, attemptsLeft = 4, answeredCorrectly = false, isWaiting = false, pauseTimeout;

document.addEventListener('DOMContentLoaded', function() {
  questionElement = document.getElementById('questionContainer');
  optionsElement = document.getElementById('options');
  submitCocherButton = document.getElementById('submitCocher');
  submitButtonMultiple = document.getElementById('submitMultiple');
  submitGlisserButton = document.getElementById('submitGlisser');
  nextButton = document.getElementById('next');
  demarrerButton = document.getElementById('demarrer');
  feedbackElement = document.getElementById('feedback');
  blocscoreElement = document.getElementById('blocscore');
  scoreElement = document.getElementById('score');
  nombrequestionsElement = document.getElementById('nombrequestions');
  numeroquestionElement = document.getElementById('numeroquestion');
  scorepossibleElement = document.getElementById('scorepossible');
  blocnumquestionElement = document.getElementById('blocnumquestion');
  questionContainerElement = document.getElementById('questionContainer');
  centrecontainerElement = document.getElementById('centrecontainer');



  function initializeQuiz() {
 
   
    demarrerButton.addEventListener('click', () => {
       if (isWaiting) return;   
       cacherintro();
       showQuestion();
       showGrille();checkScrollBar();
       
       finPlacement();
    });      

    submitCocherButton.addEventListener('click', () => {
      if (isWaiting) return;
      submitCocherAnswer();
    });

    submitGlisserButton.addEventListener('click', () => {
      if (isWaiting) return;
      submitGlisserAnswer();
    });

    submitButtonMultiple.addEventListener('click', () => {
      if (isWaiting) return;
      submitMultipleAnswer();
    });

    nextButton.addEventListener('click', () => {
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        attemptsLeft = 4;
        answeredCorrectly = false;
        feedbackElement.textContent = '';
        clearTimeout(pauseTimeout);
        showQuestion();
        showGrille();checkScrollBar();
        finPlacement();
        enableButtons();
      } else {
        endQuiz();
      }
    });
  }

function cacherintro() {
    isWaiting = true;
    document.querySelector('.numeroquestion').style.display = 'inline-block';    
    demarrerButton.style.display = 'none';
    document.getElementById('questionContainer').style.display = 'flex';    
    document.getElementById('centrecontainer').style.display = 'flex';  
    document.querySelector('.scoreclass').style.display = 'block';
    const modifierfond = document.getElementById('quizcontainer');
    modifierfond.classList.replace('quiz-container', 'quiz-container2');
}


function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;
  optionsElement.innerHTML = '';
  document.getElementById('barre').style.display = 'flex';    

  numeroquestionElement.textContent = currentQuestionIndex+1;
  nombrequestionsElement.textContent = questions.length;
  scorepossibleElement.textContent = questions.length*4;

  if (currentQuestion.type === 'glisse') {
      submitGlisserButton.style.display = 'inline-block';
      submitButtonMultiple.style.display = 'none';
      submitCocherButton.style.display = 'none';
    } else if (currentQuestion.type === 'cocher') {
      submitCocherButton.style.display = 'inline-block';
      submitButtonMultiple.style.display = 'none';
      submitGlisserButton.style.display = 'none';
    } else {
      submitGlisserButton.style.display = 'none';
      submitButtonMultiple.style.display = 'inline-block';
      submitCocherButton.style.display = 'none';
    }
}


// Declare a variable to keep a reference to the opened window
let openedWindow = null;

function showGrille() {
  const currentQuestion = questions[currentQuestionIndex];

  // Select the elements
  const photoBloc = document.getElementById('photobloc');
  const photoFull = document.getElementById('photofull');

  // Set the background image for photobloc
  photoBloc.style.backgroundImage = `url('data/images/${currentQuestion.photo1}')`;

  // Remove existing click event listeners to avoid duplication
  const newPhotoBloc = photoBloc.cloneNode(true);
  photoBloc.parentNode.replaceChild(newPhotoBloc, photoBloc);

  // Add click event listener to photobloc
  newPhotoBloc.addEventListener('click', function () {
    // If a link is present, open it in a new tab only if not already opened
    if ('lien' in currentQuestion && currentQuestion.lien) {
      const lien = `data/animations/${currentQuestion.lien}`;
      
      // Check if the window is not already open or has been closed
      if (!openedWindow || openedWindow.closed) {
        // Open a new window and store the reference
        openedWindow = window.open(lien, '_blank');
      } else {
        // Focus the already opened window
        openedWindow.focus();
      }
      
      return; // Stop execution to avoid displaying the image
    }

    // Use the current background image of photoBloc for photoFull
    const currentBackgroundImage = newPhotoBloc.style.backgroundImage;

    // Show photofull with the same background image as photobloc
    photoFull.style.display = 'flex';
    photoFull.style.backgroundImage = currentBackgroundImage; // Use the same background image
    photoFull.style.backgroundSize = 'contain';
    photoFull.style.backgroundRepeat = 'no-repeat';
    photoFull.style.backgroundPosition = 'center center';

    // Add click event listener to photofull
    photoFull.addEventListener(
      'click',
      function () {
        photoFull.style.display = 'none'; // Hide photofull on click
      },
      { once: true } // Ensure the listener is added only once
    );
  });

  // Display options based on the question type
  if (currentQuestion.type === 'glisse') {
    showDraggableOptions(currentQuestion.answers);
  } else if (currentQuestion.type === 'cocher') {
    showCocherOptions(currentQuestion.answers);
  } else if (currentQuestion.type === 'multiple') {
    showMultipleOptions(currentQuestion.answers);
  }
}

 

  
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


window.finPlacement = function() {
  submitButtonMultiple.style.display = 'none';
submitCocherButton.style.display = 'none';
  nextButton.style.display = 'none';
  isWaiting = false;
}




  
  


  function startPause() {
    pauseTimeout = setTimeout(() => {
      endPause();
    }, 5000);
  }

  function endPause() {
    optionsElement.querySelectorAll('.option-button').forEach(btn => btn.classList.remove('selected'));
    feedbackElement.textContent = '';
    enableButtons();
    isWaiting = false;
  }

  window.handleCorrectAnswer = function() {
    answeredCorrectly = true;
    if (attemptsLeft > 0) {
    score += attemptsLeft;
    } else {
      score += 1;
    }
    let usedAttempts = 4 - attemptsLeft + 1;
    feedbackElement.textContent = `Correct ! Vous avez utilisé ${usedAttempts} essai${usedAttempts === 1 ? '' : 's'}.`;
    scoreElement.textContent = score;
    const currentQuestion = questions[currentQuestionIndex];
    if ('photo2' in currentQuestion) {

    // Sélectionnez l'élément avec l'ID 'photo'
const element = document.getElementById('photobloc');

// Changez l'image de fond avec celle de 'photo2' de la question courante
element.style.backgroundImage = `url('data/images/${currentQuestion.photo2}')`;
  }}

  window.handleIncorrectAnswer = function() {
    attemptsLeft--;
    if (attemptsLeft > 0) {
      feedbackElement.textContent = `Incorrect. Il vous reste ${attemptsLeft} essai${attemptsLeft === 1 ? '' : 's'}.`;
    } else {
      feedbackElement.textContent = `Incorrect, vous avez utilisé tous vos essais.`;
    }
      startPause();
  
  }
  
 

  window.showSubmitButton = function() {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.type === 'multiple') {
      submitButtonMultiple.style.display = 'inline-block';
      submitGlisserButton.style.display = 'none';
      submitCocherButton.style.display = 'none';
    } else if (currentQuestion.type === 'glisse') {
      submitButtonMultiple.style.display = 'none';
      submitGlisserButton.style.display = 'inline-block'; 
      submitCocherButton.style.display = 'none';
    }   else if (currentQuestion.type === 'cocher') {
      submitCocherButton.style.display = 'inline-block';
      submitButtonMultiple.style.display = 'none';
      submitGlisserButton.style.display = 'none';
    }      
   nextButton.style.display = 'none';
  }

  window.hideSubmitButton = function() {
    submitButtonMultiple.style.display = 'none';
    submitGlisserButton.style.display = 'none';
    submitCocherButton.style.display = 'none';
  }

  window.showNextButton = function() {
    nextButton.style.display = 'inline-block';
  }

  window.disableButtons = function() {
    optionsElement.querySelectorAll('.option-button').forEach(button => {
      button.disabled = true;
    });
    const draggableOptions = optionsElement.querySelectorAll('.draggable-option');
    draggableOptions.forEach(option => {
      option.setAttribute('draggable', false);
      option.removeEventListener('dragstart', handleDragStart);
      option.removeEventListener('dragover', handleDragOver);
      option.removeEventListener('drop', handleDrop);
  
    });
    const checkboxes = document.querySelectorAll('.checkbox-option input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.disabled = true;
    });
    submitButtonMultiple.disabled = true;
    submitGlisserButton.disabled = true;
    submitCocherButton.disabled = true;
  }

  window.enableButtons = function() {
    optionsElement.querySelectorAll('.option-button').forEach(button => {
      button.disabled = false;
    });
    const draggableOptions = optionsElement.querySelectorAll('.draggable-option');
    draggableOptions.forEach(option => {
      option.setAttribute('draggable', true);
      option.addEventListener('dragstart', handleDragStart);
      option.addEventListener('dragover', handleDragOver);
      option.addEventListener('drop', handleDrop);

    });

    const checkboxes = document.querySelectorAll('.checkbox-option input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.disabled = false;
    });
    submitButtonMultiple.disabled = false;
    submitGlisserButton.disabled = false;
    submitCocherButton.disabled = false;
  }

  function endQuiz() {
    let scoreDivise = Math.ceil(score * 5 / questions.length);
    questionElement.innerHTML = 'Quiz terminé !<br/> Votre score : ' + scoreDivise + ' sur 20';
    optionsElement.innerHTML = '';
    submitButtonMultiple.style.display = 'none';
    submitGlisserButton.style.display = 'none';
    nextButton.style.display = 'none';
    feedbackElement.textContent = '';
    blocscoreElement.textContent = '';
    blocnumquestionElement.textContent = '';
    questionContainerElement.style.fontSize = '2.5em';
    questionContainerElement.style.textAlign = 'center';
    questionContainerElement.style.color = 'white';
    centrecontainerElement.style.display = 'none';
    const modifierfond = document.getElementById('quizcontainer');
    modifierfond.classList.replace('quiz-container2', 'quiz-container');
    modifierfond.style.backgroundImage = imagefond;
    const element = document.getElementById('barre');
    element.style.display = 'none';
  }

  initializeQuiz();

});
