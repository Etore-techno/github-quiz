function initialiserDragAndDrop() {
    const draggables = document.querySelectorAll('.diagramme-draggable, .bougeable');
    const droppables = document.querySelectorAll('.diagramme-droppable, .tableau-droppable');

    let isDragging = false;
    let currentDraggedElement = null;
    let initialPosition = { x: 0, y: 0, parent: null };
    let scrollInterval = null;

    // ✅ Ajout de la gestion tactile
    let isTouch = false;

    draggables.forEach((draggable, index) => {
        if (!draggable.id) {
            draggable.id = "draggable-" + index;
        }
        draggable.setAttribute("draggable", "true");

        // ✅ Début du drag (Souris)
        draggable.addEventListener("dragstart", function (event) {
            if (isTouch) return; // Évite les conflits avec le tactile
            isDragging = true;
            currentDraggedElement = event.target;
            event.dataTransfer.setData("text", event.target.id);
            event.dataTransfer.effectAllowed = "move";

            initialPosition.x = event.target.offsetLeft;
            initialPosition.y = event.target.offsetTop;
            initialPosition.parent = event.target.parentElement;

            setTimeout(() => {
                event.target.style.opacity = "0.5";
            }, 0);
        });

        // ✅ Fin du drag (Souris)
        draggable.addEventListener("dragend", function () {
            if (isTouch) return;
            isDragging = false;
            if (currentDraggedElement) {
                currentDraggedElement.style.opacity = "1";
                currentDraggedElement = null;
            }
            clearInterval(scrollInterval);
        });

        // 🛠️ 🔹 Gestion du drag tactile
        draggable.addEventListener('touchstart', function (e) {
            isTouch = true;
            e.preventDefault();
            currentDraggedElement = e.target.closest('.diagramme-draggable, .bougeable');
            if (!currentDraggedElement) return;

            currentDraggedElement.classList.add('dragging');

            const rect = currentDraggedElement.getBoundingClientRect();
            currentDraggedElement.dataset.offsetX = e.touches[0].clientX - rect.left;
            currentDraggedElement.dataset.offsetY = e.touches[0].clientY - rect.top;
        }, { passive: false });

        draggable.addEventListener('touchmove', function (e) {
            if (!currentDraggedElement) return;

            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;
            const offsetX = parseFloat(currentDraggedElement.dataset.offsetX);
            const offsetY = parseFloat(currentDraggedElement.dataset.offsetY);

            currentDraggedElement.style.position = 'fixed';
            currentDraggedElement.style.left = `${x - offsetX}px`;
            currentDraggedElement.style.top = `${y - offsetY}px`;
        }, { passive: false });

        draggable.addEventListener('touchend', function () {
            if (!currentDraggedElement) return;

            currentDraggedElement.classList.remove('dragging');
            currentDraggedElement = null;
            isTouch = false;
        });
    });

    // ✅ Auto-scroll en haut ou en bas de la page
    document.addEventListener("dragover", function (event) {
        if (!isDragging || !currentDraggedElement) return;

        event.preventDefault();
        const scrollSpeed = 13;
        const scrollMargin = 150;

        const mouseY = event.clientY;
        const windowHeight = window.innerHeight;

        clearInterval(scrollInterval);
        if (mouseY < scrollMargin) {
            scrollInterval = setInterval(() => {
                window.scrollBy(0, -scrollSpeed);
            }, 50);
        } else if (mouseY > windowHeight - scrollMargin) {
            scrollInterval = setInterval(() => {
                window.scrollBy(0, scrollSpeed);
            }, 50);
        }
    });

    // ✅ Gestion des zones de dépôt
    droppables.forEach(droppable => {
        droppable.addEventListener("dragover", function (event) {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        });

        droppable.addEventListener("drop", function (event) {
            event.preventDefault();
            if (!currentDraggedElement) return;

            const id = event.dataTransfer.getData("text");
            const draggedElement = document.getElementById(id);

            if (!draggedElement) {
                console.warn("⚠ Aucun élément trouvé pour l'ID:", id);
                return;
            }

            const existingElement = droppable.querySelector('.diagramme-draggable, .bougeable');
            if (existingElement) {
                retournerElementDepart(existingElement);
            }

            droppable.appendChild(draggedElement);
            draggedElement.style.position = "relative";
            draggedElement.style.opacity = "1";
            currentDraggedElement = null;
            isDragging = false;
        });

        // 🛠️ 🔹 Gestion du drop tactile
        droppable.addEventListener('touchend', function (e) {
            if (!currentDraggedElement) return;

            const dropZone = document.elementFromPoint(
                e.changedTouches[0].clientX,
                e.changedTouches[0].clientY
            );

            if (dropZone && dropZone.classList.contains('diagramme-droppable')) {
                dropZone.appendChild(currentDraggedElement);
                currentDraggedElement.style.position = 'relative';
                currentDraggedElement.style.left = '0px';
                currentDraggedElement.style.top = '0px';
                currentDraggedElement.classList.remove('dragging');
                currentDraggedElement = null;
            }
        });
    });

    // ✅ Empêcher le drop en dehors d'une zone valide
    document.addEventListener("drop", function (event) {
        if (!event.target.classList.contains('diagramme-droppable') &&
            !event.target.classList.contains('tableau-droppable')) {
            event.preventDefault();
            console.warn("⚠ Drop annulé : en dehors d'une zone valide.");
            if (currentDraggedElement) {
                retournerElementDepart(currentDraggedElement);
                currentDraggedElement.style.opacity = "1";
                currentDraggedElement = null;
                isDragging = false;
            }
        }
    });

    // ✅ Empêcher le défilement pendant le drag sur mobile
    document.body.style.touchAction = 'none';

    console.log("✅ Drag-and-drop souris et tactile correctement initialisé !");
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
