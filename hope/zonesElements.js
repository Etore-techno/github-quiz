// zonesElements.js - Gestion des zones et des éléments

// Configuration des zones et éléments du diagramme
app.setupDiagramme = function () {
    const container = document.getElementById("diagramme-container");
    const elementsContainer = document.getElementById("deplacables-diagramme-container");

    const img = container.querySelector("img");
    const rect = img.getBoundingClientRect();
    const imgWidth = rect.width;
    const imgHeight = rect.height;

    // Calcul du décalage par rapport au container
    const containerRect = container.getBoundingClientRect();
    const offsetX = containerRect.left;
    const offsetY = containerRect.top;

    // Création des zones
    window.exerciceData.diagrammezone.forEach(zone => {
        const zoneDiv = document.createElement("div");
        zoneDiv.className = "dropzone";
        zoneDiv.textContent = zone.id;

        // Calculer la position par rapport au conteneur d'image
        zoneDiv.style.top = `${zone.relativeTop * imgHeight}px`;
        zoneDiv.style.left = `${zone.relativeLeft * imgWidth}px`;
        zoneDiv.style.width = `${zone.relativeWidth * imgWidth}px`;
        zoneDiv.style.height = `${zone.relativeHeight * imgHeight}px`;

        zoneDiv.style.backgroundColor = `rgba(255, 0, 0, 0.5)`;
        zoneDiv.style.border = "2px dashed black";
        zoneDiv.style.position = "absolute";

        container.appendChild(zoneDiv);
    });

    // Création des éléments
    window.exerciceData.diagrammeElements.forEach((element, index) => {
        const matchingZone = window.exerciceData.diagrammezone[index];
        const el = app.createElement(element, elementsContainer, "lightblue", matchingZone, imgWidth, imgHeight);
        elementsContainer.appendChild(el);
    });
};

// Configuration des zones et éléments du tableau
app.setupTableau = function () {
    const container = document.getElementById("tableau-container");
    const elementsContainer = document.getElementById("deplacables-tableau-container");

    const img = container.querySelector("img");
    const rect = img.getBoundingClientRect();
    const imgWidth = rect.width;
    const imgHeight = rect.height;

    // Calcul du décalage par rapport au container
    const containerRect = container.getBoundingClientRect();
    const offsetX = containerRect.left;
    const offsetY = containerRect.top;

    // Création des zones
    const zones = [...window.exerciceData.tableauzones1, ...window.exerciceData.tableauzones2];
    zones.forEach(zone => {
        const zoneDiv = document.createElement("div");
        zoneDiv.className = "dropzone";
        zoneDiv.textContent = zone.id;

        // Calculer la position par rapport au conteneur d'image
        zoneDiv.style.top = `${zone.relativeTop * imgHeight}px`;
        zoneDiv.style.left = `${zone.relativeLeft * imgWidth}px`;
        zoneDiv.style.width = `${zone.relativeWidth * imgWidth}px`;
        zoneDiv.style.height = `${zone.relativeHeight * imgHeight}px`;

        zoneDiv.style.backgroundColor = `rgba(0, 0, 255, 0.5)`;
        zoneDiv.style.border = "2px dashed black";
        zoneDiv.style.position = "absolute";

        container.appendChild(zoneDiv);
    });

    // Création des éléments
    const elements = [...window.exerciceData.tableauElementsEtape1, ...window.exerciceData.tableauElementsEtape2];
    elements.forEach((element, index) => {
        const matchingZone = zones[index];
        const el = app.createElement(element, elementsContainer, "lightgreen", matchingZone, imgWidth, imgHeight);
        elementsContainer.appendChild(el);
    });
};

// Fonction de création d'un élément déplaçable
app.createElement = function (element, container, color, zone, imgWidth, imgHeight) {
    const el = document.createElement("div");
    el.className = "draggable";
    el.textContent = element.nom;

    // Taille proportionnelle à la zone associée
    if (zone) {
        el.style.width = `${zone.relativeWidth * imgWidth * 0.95}px`;
        el.style.height = `${zone.relativeHeight * imgHeight * 0.95}px`;
        el.style.fontSize = `${Math.min(zone.relativeHeight * imgHeight, zone.relativeWidth * imgWidth) / 6}px`;
    } else {
        el.style.width = "150px";
        el.style.height = "50px";
        el.style.fontSize = "14px";
    }

    el.style.position = "relative";
    el.style.margin = "5px";
    el.style.backgroundColor = color;
    el.style.border = `2px solid ${color === "lightblue" ? "navy" : "green"}`;
    el.style.padding = "5px";
    el.style.textAlign = "center";
    el.style.display = "inline-block";
    el.style.cursor = "grab";

    el.draggable = true;

    el.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", element.id);
    });

    container.appendChild(el);
    return el;
};
