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


var questionElement, optionsElement, suivantButton, validerButton, passerButton, demarrerButton, messageElement, 
    blocscoreElement, scoreElement, nombrequestionsElement, 
    numeroquestionElement, scorepossibleElement, blocnumquestionElement, 
    questionContainerElement, centrecontainerElement, currentQuestionIndex = 0, 
    score = 0, tentativesRestantes = 4, reponseCorrecte = false, isWaiting = false, pauseTimeout;

    window.addEventListener('DOMContentLoaded', function() {
  questionElement = document.getElementById('questionContainer');
  optionsElement = document.getElementById('options');
 validerButton = document.getElementById('valider-button');
 passerButton = document.getElementById('passer-button');
  suivantButton = document.getElementById('next');
  demarrerButton = document.getElementById('demarrer');
  messageElement = document.getElementById('message');
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
       afficherQuestion();
       afficherReponses();checkScrollBar();
       finPlacement();
    });      

    validerButton.addEventListener('click', () => {
      if (isWaiting) return;


      if (questions[currentQuestionIndex].type === 'glisse') {
          verifGlisserAnswer(); // Call the drag-and-drop submit function

      } else if (questions[currentQuestionIndex].type === 'multiple') {
          verifMultipleAnswer(); // Call the multiple-choice submit function
      } else if (questions[currentQuestionIndex].type === 'cocher') {
        verifCocherAnswer(); // Call the cocher-choice submit function
    }
  });

  passerButton.addEventListener('click', () => {
    if (isWaiting) return;
    var confirmation = confirm("Es-tu sûr de vouloir passer cette question ? Tu n'obtiendras aucun point !");
    if (confirmation) {
      questionsuivante();
    } else {
        alert("Action annulée !");
        // Code si l'utilisateur annule l'action
    }
});


    suivantButton.addEventListener('click', () => {
     questionsuivante();
     
    });
  }

function questionsuivante() {
  cacherSuivantButton();
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    tentativesRestantes = 4;
    reponseCorrecte = false;
    messageElement.textContent = '';
    clearTimeout(pauseTimeout);
    afficherQuestion();
    afficherReponses();
    checkScrollBar();
    activerButtons();
    finPlacement();

  } else {
    finQuiz();
  }

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


function afficherQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;
  optionsElement.innerHTML = '';
  document.getElementById('barre').style.display = 'flex';    

  numeroquestionElement.textContent = currentQuestionIndex+1;
  nombrequestionsElement.textContent = questions.length;
  scorepossibleElement.textContent = questions.length*4;


// Afficher ou masquer le bouton "passer"
if (tentativesRestantes < 0) {
  montrerPasserButton();
} else {
  cacherPasserButton();
}


}


// Declare a variable to keep a reference to the opened window
let openedWindow = null;

function afficherReponses() {
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
    afficherGlisseReponses(currentQuestion.answers);
activerButtons();

  } else if (currentQuestion.type === 'cocher') {
    afficherCocherReponses(currentQuestion.answers);
  } else if (currentQuestion.type === 'multiple') {
    afficherMultipleReponses(currentQuestion.answers);
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
  isWaiting = false;
}

  window.gestionReponseCorrecte = function() {
    reponseCorrecte = true;
    if (tentativesRestantes > 0) {
    score += tentativesRestantes;
    } else {
      score += 1;
    }
    let usedAttempts = 4 - tentativesRestantes + 1;
    messageElement.textContent = `Correct ! Vous avez utilisé ${usedAttempts} essai${usedAttempts === 1 ? '' : 's'}.`;
    scoreElement.textContent = score;
    const currentQuestion = questions[currentQuestionIndex];
    if ('photo2' in currentQuestion) {

    // Sélectionnez l'élément avec l'ID 'photo'
const element = document.getElementById('photobloc');

// Changez l'image de fond avec celle de 'photo2' de la question courante
element.style.backgroundImage = `url('data/images/${currentQuestion.photo2}')`;
  }
  setTimeout(() => {
    montrerSuivantButton();
  }, 2000);
}

window.gestionReponseFausse = function() {
  const currentQuestion = questions[currentQuestionIndex];

  tentativesRestantes--;
      if (tentativesRestantes > 0) {
          messageElement.textContent = `Incorrect. Il vous reste ${tentativesRestantes} essai${tentativesRestantes === 1 ? '' : 's'}.`;
        } else {
          messageElement.textContent = `Incorrect. Vous avez utilisé tous vos essais.`;
        }
          
          setTimeout(() => {
              messageElement.textContent = '';
              if (currentQuestion.type === 'glisse') {
              afficherGlisseReponses(currentQuestion.answers);
              } else if (currentQuestion.type === 'cocher') {
                const inputs = optionsElement.querySelectorAll('input[type="checkbox"], input[type="radio"]');
                inputs.forEach(input => { input.checked = false; });
              } else if (currentQuestion.type === 'multiple') {
                optionsElement.querySelectorAll('.option-button').forEach(btn => btn.classList.remove('selected'));
              }
              activerButtons();


              if (tentativesRestantes > 0) {
                cacherPasserButton(); 
              } else {
                montrerPasserButton();              }

              isWaiting = false;
          }, 5000);
}
  
  window.montrerValiderButton = function() {
   
    validerButton.style.display = 'inline-block';
    validerButton.disabled = false;
   suivantButton.style.display = 'none';
  }

  window.cacherValiderButton = function() {
    validerButton.style.display = 'none';
  }

  window.montrerPasserButton = function() {
    passerButton.style.display = 'inline-block'; // Assurez-vous d'utiliser passerButton
    passerButton.disabled = false; // Rendre le bouton actif
    suivantButton.style.display = 'none'; // Cache le bouton "suivant"
}

  window.cacherPasserButton = function() {
    passerButton.style.display = 'none';
  }

  window.montrerSuivantButton = function() {
    suivantButton.style.display = 'inline-block';
  }

  window.cacherSuivantButton = function() {
    suivantButton.style.display = 'none';
  }

  window.desactiverButtons = function() {
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

    validerButton.disabled = true;

  }

  window.activerButtons = function() {
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

    validerButton.disabled = false;

  }

  function finQuiz() {
    let scoreDivise = Math.ceil(score * 5 / questions.length);
    questionElement.innerHTML = 'Quiz terminé !<br/> Votre score : ' + scoreDivise + ' sur 20';
    optionsElement.innerHTML = '';

    validerButton.style.display = 'none';
    passerButton.style.display = 'none';
    suivantButton.style.display = 'none';
    messageElement.textContent = '';
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
