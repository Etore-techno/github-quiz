function initialiserDragAndDrop() {
    const draggables = document.querySelectorAll('.diagramme-draggable, .bougeable');
    const droppables = document.querySelectorAll('.diagramme-droppable, .tableau-droppable');

    let currentDraggedElement = null;
    let offsetX = 0;
    let offsetY = 0;

    draggables.forEach(draggable => {
        draggable.addEventListener('touchstart', function (e) {
            e.preventDefault();

            currentDraggedElement = e.target.closest('.diagramme-draggable, .bougeable');
            if (!currentDraggedElement) return;

            const rect = currentDraggedElement.getBoundingClientRect();
            offsetX = e.touches[0].clientX - rect.left;
            offsetY = e.touches[0].clientY - rect.top;

            currentDraggedElement.style.position = 'absolute';
            currentDraggedElement.classList.add('dragging');
        }, { passive: false });

        draggable.addEventListener('touchmove', function (e) {
            if (!currentDraggedElement) return;

            const x = e.touches[0].clientX - offsetX;
            const y = e.touches[0].clientY - offsetY;

            currentDraggedElement.style.left = `${x}px`;
            currentDraggedElement.style.top = `${y}px`;
        }, { passive: false });

        draggable.addEventListener('touchend', function (e) {
            if (!currentDraggedElement) return;

            const touch = e.changedTouches[0];
            const dropZone = document.elementFromPoint(touch.clientX, touch.clientY);

            if (dropZone && dropZone.classList.contains('diagramme-droppable')) {
                dropZone.appendChild(currentDraggedElement);
                currentDraggedElement.style.position = 'relative';
                currentDraggedElement.style.left = '0px';
                currentDraggedElement.style.top = '0px';
            } else {
                // Retour à la position initiale
                currentDraggedElement.style.position = 'relative';
                currentDraggedElement.style.left = '0px';
                currentDraggedElement.style.top = '0px';
            }

            currentDraggedElement.classList.remove('dragging');
            currentDraggedElement = null;
        });
    });

    document.body.style.touchAction = 'none';
    console.log("📱 Drag-and-drop mobile activé.");
}



function activerDragAndDrop(zonesData, elementsData, deplacablesContainerId, messageId, validateButtonId) {
    const draggables = (etape === 1) 
        ? document.querySelectorAll(".diagramme-draggable") 
        : document.querySelectorAll(".bougeable");

    const droppables = (etape === 1) 
        ? document.querySelectorAll(".diagramme-droppable") 
        : document.querySelectorAll(".tableau-droppable");

    if (!droppables || droppables.length === 0) {
        console.error("Aucune zone de dépôt trouvée !");
        return;
    }
    if (!validateButtonId || validateButtonId === "") {
        console.error("⚠ Erreur : validateButtonId est vide !");
        return;
    }
    let validateButton = document.getElementById(validateButtonId);
    
    if (!validateButton) {
        console.error("Le bouton de validation n'a pas été trouvé !");
        return;
    }

    let correspondance = {};
    if (zonesData.length === elementsData.length) {
        zonesData.forEach((zone, index) => {
            correspondance[zone.id] = elementsData[index].id;
        });
    } else {
        console.error("⚠ Erreur : Le nombre de zones et d'éléments ne correspond pas.");
    }

    console.log("📌 Correspondance générée : ", correspondance);

    validateButton.replaceWith(validateButton.cloneNode(true));
    validateButton = document.getElementById(validateButtonId);

    validateButton.addEventListener("click", () => {
        if (validateButton.textContent === "Suivant") {
            if (etape === 1) {
                modifierIDsElementsEtape1();
                etape = 2;
                chargerEtape();
            } else if (etape === 2) {
                modifierIDsElementsEtape2();
                etape = 3;
                chargerEtape();
            } else if (etape === 3) {
                modifierIDsElementsEtape3();
            }
            return;
        }

        let correctCount = 0;
        let allPlaced = true;

        droppables.forEach(droppable => {
            let placedElement = droppable.querySelector(etape === 1 ? ".diagramme-draggable" : ".bougeable");

            if (!placedElement) {
                allPlaced = false;
            } else {
                if (correspondance[droppable.id] === placedElement.id) {
                    correctCount++;
                }
            }
        });

        const totalElements = Object.keys(correspondance).length;
        const message = document.getElementById(messageId);

        if (!allPlaced) {
            message.textContent = "Veuillez placer tous les éléments avant de valider.";
            message.style.color = "red";
            return;
        }

        if (correctCount === totalElements) {
            message.textContent = "Bravo ! Tous les éléments sont bien placés.";
            message.style.color = "green";

            draggables.forEach(draggable => {
                draggable.setAttribute("draggable", "false");
                draggable.style.cursor = "default";
            });

            validateButton.textContent = "Suivant";
            validateButton.style.backgroundColor = "#4CAF50";
            validateButton.style.color = "white";

        } else {
            message.textContent = `Vous avez ${correctCount} élément(s) bien placé(s) sur ${totalElements}.`;
            message.style.color = "orange";
        }
    });
}
