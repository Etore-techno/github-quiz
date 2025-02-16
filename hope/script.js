document.addEventListener("DOMContentLoaded", function () {
    const data = window.exerciceData;

    // Initialisation des exercices
    setupDiagramme();
    setupTableau();

    // Ajuster les positions en cas de redimensionnement
    window.addEventListener("resize", () => {
        adjustZonesPositions("diagramme", "diagramme-container");
        adjustZonesPositions("tableau", "tableau-container");
    });

    function setupDiagramme() {
        const elementsContainer = document.getElementById("deplacables-diagramme-container");
        data.diagramme.elements.forEach(element => {
            let div = createDraggableElement(element);
            elementsContainer.appendChild(div);
        });
        adjustZonesPositions("diagramme", "diagramme-container");
        document.getElementById("validate-1-button").addEventListener("click", validateDiagramme);
    }

    function setupTableau() {
        const elementsContainer = document.getElementById("deplacables-tableau-container");
        data.tableau.fonctions.forEach(element => {
            let div = createDraggableElement(element);
            elementsContainer.appendChild(div);
        });
        adjustZonesPositions("tableau", "tableau-container");
        document.getElementById("validate-2-button").addEventListener("click", validateTableau);
    }

    function createDraggableElement(element) {
        let div = document.createElement("div");
        div.className = "draggable";
        div.textContent = element.label;
        div.style.left = `${element.startX}px`;
        div.style.top = `${element.startY}px`;
        div.draggable = true;
        div.dataset.id = element.id;

        div.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", div.dataset.id);
        });

        return div;
    }

    function adjustZonesPositions(type, containerId) {
        const container = document.getElementById(containerId);
        const rect = container.getBoundingClientRect();
        const zones = type === "diagramme" ? data.diagramme.zones : data.tableau.zonesFonctions;

        // Supprimer d'anciennes zones
        container.querySelectorAll(".dropzone").forEach(zone => zone.remove());

        // Replacer les zones en fonction de la taille actuelle de l'image
        zones.forEach(zone => {
            let dropzone = document.createElement("div");
            dropzone.className = "dropzone";

            // Calcul basé sur les dimensions de l'image réelle
            dropzone.style.left = `${rect.left + (zone.relativeX * rect.width)}px`;
            dropzone.style.top = `${rect.top + (zone.relativeY * rect.height)}px`;

            dropzone.dataset.expected = zone.expectedId;

            dropzone.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            dropzone.addEventListener("drop", (e) => {
                e.preventDefault();
                let draggedId = e.dataTransfer.getData("text/plain");
                let draggedElement = document.querySelector(`.draggable[data-id='${draggedId}']`);

                if (draggedElement) {
                    dropzone.appendChild(draggedElement);
                    draggedElement.style.position = "relative";
                    draggedElement.style.left = "0px";
                    draggedElement.style.top = "0px";
                }
            });

            container.appendChild(dropzone);
        });
    }

    function validateDiagramme() {
        let correct = true;
        document.querySelectorAll("#diagramme-container .dropzone").forEach(zone => {
            let droppedElement = zone.firstChild;
            if (!droppedElement || droppedElement.dataset.id !== zone.dataset.expected) {
                correct = false;
            }
        });

        document.getElementById("diagramme-message").textContent = correct
            ? "Bravo ! Exercice réussi ✅"
            : "Il y a des erreurs ❌";
    }

    function validateTableau() {
        let correct = true;
        document.querySelectorAll("#tableau-container .dropzone").forEach(zone => {
            let droppedElement = zone.firstChild;
            if (!droppedElement || droppedElement.dataset.id !== zone.dataset.expected) {
                correct = false;
            }
        });

        document.getElementById("tableau-message").textContent = correct
            ? "Bravo ! Exercice réussi ✅"
            : "Il y a des erreurs ❌";
    }
});
