function initDragAndDrop() {
    const draggables = document.querySelectorAll('.diagramme-draggable, .bougeable');
    const droppables = document.querySelectorAll('.diagramme-droppable, .tableau-droppable');

    let currentDraggedElement = null;
    let offsetX = 0;
    let offsetY = 0;
    let originContainer = null;

    // 🟢 Démarrer le drag
    function startDrag(e) {
        e.preventDefault();
        currentDraggedElement = e.target.closest('.diagramme-draggable, .bougeable');
        if (!currentDraggedElement) return;

        const rect = currentDraggedElement.getBoundingClientRect();
        offsetX = (e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX) - rect.left;
        offsetY = (e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY) - rect.top;

        originContainer = currentDraggedElement.parentElement;
        currentDraggedElement.classList.add('dragging');
        currentDraggedElement.style.position = 'absolute';
    }

    // 🟡 Déplacement
    function moveDrag(e) {
        if (!currentDraggedElement) return;

        const x = (e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX) - offsetX;
        const y = (e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY) - offsetY;

        currentDraggedElement.style.left = `${x}px`;
        currentDraggedElement.style.top = `${y}px`;
    }

    // 🔴 Fin du drag et dépôt
    function endDrag(e) {
        if (!currentDraggedElement) return;

        let dropped = false;

        droppables.forEach(zone => {
            const zoneRect = zone.getBoundingClientRect();
            const x = e.type.startsWith('touch') ? e.changedTouches[0].clientX : e.clientX;
            const y = e.type.startsWith('touch') ? e.changedTouches[0].clientY : e.clientY;

            if (x >= zoneRect.left && x <= zoneRect.right && y >= zoneRect.top && y <= zoneRect.bottom) {
                const existingElement = zone.querySelector('.diagramme-draggable, .bougeable');
                if (existingElement) {
                    originContainer.appendChild(existingElement);
                    existingElement.style.left = '0px';
                    existingElement.style.top = '0px';
                }
                zone.appendChild(currentDraggedElement);
                currentDraggedElement.style.left = '0px';
                currentDraggedElement.style.top = '0px';
                currentDraggedElement.style.position = 'relative';
                dropped = true;
                console.log(`✅ Élément déposé dans la zone : ${zone.id}`);
            }
        });

        if (!dropped) {
            originContainer.appendChild(currentDraggedElement);
            currentDraggedElement.style.left = '0px';
            currentDraggedElement.style.top = '0px';
            currentDraggedElement.style.position = 'relative';
            console.warn("⚠️ Déplacement annulé : hors zone.");
        }

        currentDraggedElement.classList.remove('dragging');
        currentDraggedElement = null;
    }

    // 🖱️ Associer événements souris et tactile
    draggables.forEach(elem => {
        // Souris
        elem.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', moveDrag);
        document.addEventListener('mouseup', endDrag);

        // Tactile
        elem.addEventListener('touchstart', startDrag, { passive: false });
        document.addEventListener('touchmove', moveDrag, { passive: false });
        document.addEventListener('touchend', endDrag);
    });

    console.log("🚀 Drag-and-drop mobile-first opérationnel !");
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
