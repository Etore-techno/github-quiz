function initDragAndDrop() {
    const draggables = document.querySelectorAll('.diagramme-draggable, .bougeable');
    const droppables = document.querySelectorAll('.diagramme-droppable, .tableau-droppable');

    let draggedElement = null;
    let startX = 0, startY = 0;
    let originContainer = null;

    // 🟢 Démarrage du drag
    function startDrag(e) {
        e.preventDefault();
        draggedElement = e.target.closest('.diagramme-draggable, .bougeable');
        if (!draggedElement) return;

        startX = e.clientX || e.touches?.[0]?.clientX;
        startY = e.clientY || e.touches?.[0]?.clientY;

        originContainer = draggedElement.parentElement;
        draggedElement.classList.add('dragging');
        draggedElement.style.position = 'fixed';
        draggedElement.style.zIndex = '1000';
    }

    // 🟡 Déplacement de l'élément
    function moveDrag(e) {
        if (!draggedElement) return;

        const x = e.clientX || e.touches?.[0]?.clientX;
        const y = e.clientY || e.touches?.[0]?.clientY;

        draggedElement.style.left = `${x - 50}px`;
        draggedElement.style.top = `${y - 25}px`;
    }

    // 🔴 Fin du drag
    function endDrag(e) {
        if (!draggedElement) return;

        const x = e.clientX || e.changedTouches?.[0]?.clientX;
        const y = e.clientY || e.changedTouches?.[0]?.clientY;
        let dropped = false;

        droppables.forEach(zone => {
            const rect = zone.getBoundingClientRect();
            if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                // Vérifier si la zone est déjà occupée
                const existing = zone.querySelector('.diagramme-draggable, .bougeable');
                if (existing) {
                    originContainer.appendChild(existing);
                    existing.classList.remove('placed');
                }

                zone.appendChild(draggedElement);
                draggedElement.classList.add('placed');
                draggedElement.style.position = 'relative';
                draggedElement.style.left = '0';
                draggedElement.style.top = '0';
                dropped = true;
            }
        });

        // Retour si pas déposé
        if (!dropped) {
            originContainer.appendChild(draggedElement);
            draggedElement.classList.remove('placed');
            draggedElement.style.position = 'relative';
            draggedElement.style.left = '0';
            draggedElement.style.top = '0';
        }

        draggedElement.classList.remove('dragging');
        draggedElement.style.zIndex = '1';
        draggedElement = null;
    }

    // 🖱️ Associer les événements `pointer`
    draggables.forEach(elem => {
        elem.addEventListener('pointerdown', startDrag);
        document.addEventListener('pointermove', moveDrag);
        document.addEventListener('pointerup', endDrag);
    });

    console.log("🚀 Drag-and-drop optimisé !");
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
