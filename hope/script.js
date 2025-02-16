console.log("🔍 Vérification de window.exerciceData:", window.exerciceData);


document.addEventListener("DOMContentLoaded", function () {
    const data = window.exerciceData;

    console.log("DOM chargé, en attente du chargement des images...");

    const diagrammeImage = document.querySelector("#diagramme-container img");
    const tableauImage = document.querySelector("#tableau-container img");

    diagrammeImage.addEventListener("load", () => {
        console.log("Image du diagramme chargée.");
        setupDiagramme();
    });

    tableauImage.addEventListener("load", () => {
        console.log("Image du tableau chargée.");
        setupTableau();
    });

    // Affichage des zones et éléments pour le diagramme
    function setupDiagramme() {
        console.log("Début de la configuration du diagramme.");
        const container = document.getElementById("diagramme-container");
        const elementsContainer = document.getElementById("deplacables-diagramme-container");

        if (!container) {
            console.error("Le conteneur #diagramme-container est introuvable !");
            return;
        }

        // Affichage des zones
        data.diagrammezone.forEach(zone => {
            console.log(`Création de la zone: ${zone.id} - Top: ${zone.relativeTop}, Left: ${zone.relativeLeft}`);
            let dropzone = document.createElement("div");
            dropzone.className = "dropzone";
            dropzone.textContent = zone.id;

            dropzone.style.position = "absolute";
            dropzone.style.top = `${zone.relativeTop * 100}%`;
            dropzone.style.left = `${zone.relativeLeft * 100}%`;
            dropzone.style.width = `${zone.relativeWidth * 100}%`;
            dropzone.style.height = `${zone.relativeHeight * 100}%`;
            dropzone.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
            dropzone.style.border = "2px dashed black";
            dropzone.style.zIndex = "2";

            container.appendChild(dropzone);
            console.log(`Zone ${zone.id} ajoutée au conteneur.`);
        });

        // Affichage des éléments
        data.diagrammeElements.forEach(element => {
            console.log(`Création de l'élément: ${element.nom}`);
            let draggable = document.createElement("div");
            draggable.className = "draggable";
            draggable.textContent = element.nom;
            draggable.dataset.id = element.id;

            // Position aléatoire pour s'assurer de sa visibilité
            draggable.style.top = `${Math.random() * 200}px`;
            draggable.style.left = `${Math.random() * 300}px`;
            draggable.style.backgroundColor = "lightblue";
            draggable.style.border = "2px solid navy";
            draggable.style.padding = "15px";
            draggable.style.zIndex = "5";
            draggable.style.position = "absolute";

            draggable.draggable = true;
            draggable.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", element.id);
            });

            elementsContainer.appendChild(draggable);
            console.log(`Élément ${element.nom} ajouté au conteneur de déplaçables.`);
        });
    }

    // Affichage des zones et éléments pour le tableau
    function setupTableau() {
        console.log("Début de la configuration du tableau.");
        const container = document.getElementById("tableau-container");
        const elementsContainer = document.getElementById("deplacables-tableau-container");

        if (!container) {
            console.error("Le conteneur #tableau-container est introuvable !");
            return;
        }

        // Affichage des zones
        const allZones = data.tableauzones1.concat(data.tableauzones2);
        allZones.forEach(zone => {
            console.log(`Création de la zone tableau: ${zone.id} - Top: ${zone.relativeTop}, Left: ${zone.relativeLeft}`);
            let dropzone = document.createElement("div");
            dropzone.className = "dropzone";
            dropzone.textContent = zone.id;

            dropzone.style.position = "absolute";
            dropzone.style.top = `${zone.relativeTop * 100}%`;
            dropzone.style.left = `${zone.relativeLeft * 100}%`;
            dropzone.style.width = `${zone.relativeWidth * 100}%`;
            dropzone.style.height = `${zone.relativeHeight * 100}%`;
            dropzone.style.backgroundColor = "rgba(0, 0, 255, 0.5)";
            dropzone.style.border = "2px dashed black";
            dropzone.style.zIndex = "2";

            container.appendChild(dropzone);
            console.log(`Zone ${zone.id} ajoutée au conteneur.`);
        });

        // Affichage des éléments
        const allElements = data.tableauElementsEtape1.concat(data.tableauElementsEtape2);
        allElements.forEach(element => {
            console.log(`Création de l'élément tableau: ${element.nom}`);
            let draggable = document.createElement("div");
            draggable.className = "draggable";
            draggable.textContent = element.nom;
            draggable.dataset.id = element.id;

            draggable.style.top = `${Math.random() * 200}px`;
            draggable.style.left = `${Math.random() * 300}px`;
            draggable.style.backgroundColor = "lightgreen";
            draggable.style.border = "2px solid darkgreen";
            draggable.style.padding = "15px";
            draggable.style.zIndex = "5";
            draggable.style.position = "absolute";

            draggable.draggable = true;
            draggable.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", element.id);
            });

            elementsContainer.appendChild(draggable);
            console.log(`Élément ${element.nom} ajouté au conteneur de déplaçables.`);
        });
    }
});
