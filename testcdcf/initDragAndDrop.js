function initDragAndDrop() {
    const draggables = document.querySelectorAll('.diagramme-draggable, .bougeable');
    const droppables = document.querySelectorAll('.diagramme-droppable, .tableau-droppable');

    let currentDraggedElement = null;
    let offsetX = 0;
    let offsetY = 0;
    let originContainer = null;

    // Fonction pour démarrer le drag (mobile et desktop)
    function startDrag(e) {
        e.preventDefault();
        currentDraggedElement = e.target.closest('.diagramme-draggable, .bougeable');
        if (!currentDraggedElement) return;

        // Sauvegarde du conteneur d'origine
        originContainer = currentDraggedElement.parentElement;

        const rect = currentDraggedElement.getBoundingClientRect();
        offsetX = (e.type.includes('touch') ? e.touches[0].clientX : e.clientX) - rect.left;
        offsetY = (e.type.includes('touch') ? e.touches[0].clientY : e.clientY) - rect.top;

        currentDraggedElement.style.zIndex = '1000';
        currentDraggedElement.classList.add('dragging');
    }

    // Fonction pour déplacer l'élément
    function moveDrag(e) {
        if (!currentDraggedElement) return;

        const x = (e.type.includes('touch') ? e.touches[0].clientX : e.clientX) - offsetX;
        const y = (e.type.includes('touch') ? e.touches[0].clientY : e.clientY) - offsetY;

        currentDraggedElement.style.position = 'fixed';
        currentDraggedElement.style.left = `${x}px`;
        currentDraggedElement.style.top = `${y}px`;
    }

    // Fonction pour déposer l'élément
    function endDrag(e) {
        if (!currentDraggedElement) return;

        // Déterminer la zone sous le point de relâchement
        const x = e.type.includes('touch') ? e.changedTouches[0].clientX : e.clientX;
        const y = e.type.includes('touch') ? e.changedTouches[0].clientY : e.clientY;
        const dropZone = document.elementFromPoint(x, y);

        if (dropZone && dropZone.classList.contains('diagramme-droppable')) {
            // Gestion du swap si la zone est occupée
            const existingElement = dropZone.querySelector('.diagramme-draggable, .bougeable');
            if (existingElement) {
                // Retour de l'élément en place à son origine
                originContainer.appendChild(existingElement);
                existingElement.style.left = '0px';
                existingElement.style.top = '0px';
                existingElement.style.position = 'relative';
            }

            // Placement du nouvel élément
            dropZone.appendChild(currentDraggedElement);
            currentDraggedElement.style.left = '0px';
            currentDraggedElement.style.top = '0px';
            currentDraggedElement.style.position = 'relative';
            console.log(`✅ Élément déplacé vers ${dropZone.id}`);
        } else {
            // Retour à l'origine si aucune zone valide n'est trouvée
            originContainer.appendChild(currentDraggedElement);
            currentDraggedElement.style.left = '0px';
            currentDraggedElement.style.top = '0px';
            currentDraggedElement.style.position = 'relative';
            console.warn("⚠️ Déplacement annulé : zone non valide.");
        }

        // Nettoyage final
        currentDraggedElement.classList.remove('dragging');
        currentDraggedElement.style.zIndex = '1';
        currentDraggedElement = null;
    }

    // Associer les événements pour souris et tactile
    draggables.forEach(elem => {
        // Événements souris
        elem.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', moveDrag);
        document.addEventListener('mouseup', endDrag);

        // Événements tactiles
        elem.addEventListener('touchstart', startDrag, { passive: false });
        document.addEventListener('touchmove', moveDrag, { passive: false });
        document.addEventListener('touchend', endDrag);
    });

    console.log("🚀 Drag-and-drop mobile-first activé !");
}

initDragAndDrop();


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
