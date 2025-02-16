document.addEventListener("DOMContentLoaded", function () {
    const data = window.exerciceData;

    // Initialisation
    setupDiagramme();
    setupTableau();

    // Affiche les zones et les éléments pour le diagramme
    function setupDiagramme() {
        const container = document.getElementById("diagramme-container");
        const elementsContainer = document.getElementById("deplacables-diagramme-container");

        // Afficher les zones de dépôt
        data.diagramme_zones.forEach(zone => {
            let dropzone = createDropzone(zone, container);
            container.appendChild(dropzone);
        });

        // Afficher les éléments déplaçables
        data.diagramme_elements.forEach(element => {
            let draggable = createDraggable(element);
            elementsContainer.appendChild(draggable);
        });
    }

    // Affiche les zones et les éléments pour le tableau
    function setupTableau() {
        const tableauContainer = document.getElementById("tableau-container");
        const elementsContainer = document.getElementById("deplacables-tableau-container");

        // Afficher les zones étape 1
        data.tableau_zones1.forEach(zone => {
            let dropzone = createDropzone(zone, tableauContainer);
            tableauContainer.appendChild(dropzone);
        });

        // Afficher les zones étape 2
        data.tableau_zones2.forEach(zone => {
            let dropzone = createDropzone(zone, tableauContainer);
            tableauContainer.appendChild(dropzone);
        });

        // Afficher les éléments étape 1
        data.tableau_elements_etape1.forEach(element => {
            let draggable = createDraggable(element);
            elementsContainer.appendChild(draggable);
        });

        // Afficher les éléments étape 2
        data.tableau_elements_etape2.forEach(element => {
            let draggable = createDraggable(element);
            elementsContainer.appendChild(draggable);
        });
    }

    // Créer une zone de dépôt
    function createDropzone(zone, container) {
        const rect = container.getBoundingClientRect();
        let div = document.createElement("div");
        div.className = "dropzone";
        div.textContent = zone.id;
        div.style.top = `${zone.relativeTop * rect.height}px`;
        div.style.left = `${zone.relativeLeft * rect.width}px`;
        div.style.width = `${zone.relativeWidth * rect.width}px`;
        div.style.height = `${zone.relativeHeight * rect.height}px`;
        div.dataset.expected = zone.id;

        div.addEventListener("dragover", (e) => e.preventDefault());

        div.addEventListener("drop", (e) => {
            e.preventDefault();
            const draggedId = e.dataTransfer.getData("text/plain");
            const draggedElement = document.querySelector(`.draggable[data-id="${draggedId}"]`);
            if (draggedElement) {
                div.appendChild(draggedElement);
                draggedElement.style.left = "0";
                draggedElement.style.top = "0";
            }
        });

        return div;
    }

    // Créer un élément déplaçable
    function createDraggable(element) {
        let div = document.createElement("div");
        div.className = "draggable";
        div.textContent = element.nom;
        div.dataset.id = element.id;

        // Position aléatoire au départ
        div.style.top = `${Math.random() * 300}px`;
        div.style.left = `${Math.random() * 300}px`;

        div.draggable = true;

        div.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", element.id);
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
