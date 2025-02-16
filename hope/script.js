document.addEventListener("DOMContentLoaded", function () {
    const data = window.exerciceData;

    // Attendre le chargement complet des images avant d'ajouter les zones et éléments
    const diagrammeImage = document.querySelector("#diagramme-container img");
    const tableauImage = document.querySelector("#tableau-container img");

    diagrammeImage.addEventListener("load", () => {
        setupDiagramme();
    });
    tableauImage.addEventListener("load", () => {
        setupTableau();
    });

    // Affiche les zones et les éléments pour le diagramme
    function setupDiagramme() {
        const container = document.getElementById("diagramme-container");
        const elementsContainer = document.getElementById("deplacables-diagramme-container");

        // Afficher les zones de dépôt
        data.diagrammezone.forEach(zone => {
            let dropzone = createDropzone(zone, container);
            container.appendChild(dropzone);
        });

        // Afficher les éléments déplaçables
        data.diagrammeElements.forEach(element => {
            let draggable = createDraggable(element, elementsContainer);
        });
    }

    // Affiche les zones et les éléments pour le tableau
    function setupTableau() {
        const tableauContainer = document.getElementById("tableau-container");
        const elementsContainer = document.getElementById("deplacables-tableau-container");

        // Afficher les zones étape 1
        data.tableauzones1.forEach(zone => {
            let dropzone = createDropzone(zone, tableauContainer);
            tableauContainer.appendChild(dropzone);
        });

        // Afficher les zones étape 2
        data.tableauzones2.forEach(zone => {
            let dropzone = createDropzone(zone, tableauContainer);
            tableauContainer.appendChild(dropzone);
        });

        // Afficher les éléments étape 1
        data.tableauElementsEtape1.forEach(element => {
            createDraggable(element, elementsContainer);
        });

        // Afficher les éléments étape 2
        data.tableauElementsEtape2.forEach(element => {
            createDraggable(element, elementsContainer);
        });
    }

    // Créer une zone de dépôt avec couleur visible
    function createDropzone(zone, container) {
        const rect = container.getBoundingClientRect();
        let div = document.createElement("div");
        div.className = "dropzone";
        div.textContent = zone.id;
        div.style.top = `${zone.relativeTop * rect.height}px`;
        div.style.left = `${zone.relativeLeft * rect.width}px`;
        div.style.width = `${zone.relativeWidth * rect.width}px`;
        div.style.height = `${zone.relativeHeight * rect.height}px`;

        // Couleur aléatoire pour mieux identifier les zones
        div.style.backgroundColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 150, 0.4)`;

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
    function createDraggable(element, container) {
        let div = document.createElement("div");
        div.className = "draggable";
        div.textContent = element.nom;
        div.dataset.id = element.id;

        // Position aléatoire pour test de visibilité
        div.style.top = `${Math.random() * 300}px`;
        div.style.left = `${Math.random() * 300}px`;

        div.draggable = true;

        div.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", element.id);
        });

        container.appendChild(div);
    }


});
