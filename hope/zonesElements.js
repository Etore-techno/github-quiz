// zonesElements.js - Gestion des zones et des éléments avec recalcul dynamique des positions

// zonesElements.js - Gestion des zones et des éléments avec recalcul dynamique et création d'éléments persistants

// 🛠️ Configuration des zones et éléments du diagramme
app.setupDiagramme = function () {
    const container = document.getElementById("diagramme-container");
    const elementsContainer = document.getElementById("deplacables-diagramme-container");
    const img = container.querySelector("img");

    function positionnerZonesEtElements() {
        const rect = img.getBoundingClientRect();
        const imgWidth = rect.width;
        const imgHeight = rect.height;

        // 🚮 Suppression des anciennes zones et éléments
        document.querySelectorAll('.dropzone').forEach(zone => zone.remove());
        document.querySelectorAll('.draggable').forEach(el => el.remove());

        // 🔄 Création des zones
        window.exerciceData.diagrammezone.forEach(zone => {
            const zoneDiv = document.createElement("div");
            zoneDiv.className = "dropzone";
            zoneDiv.id = zone.id;

            zoneDiv.style.top = `${zone.relativeTop * imgHeight}px`;
            zoneDiv.style.left = `${zone.relativeLeft * imgWidth}px`;
            zoneDiv.style.width = `${zone.relativeWidth * imgWidth}px`;
            zoneDiv.style.height = `${zone.relativeHeight * imgHeight}px`;

            zoneDiv.style.backgroundColor = `rgba(255, 0, 0, 0.3)`;
            zoneDiv.style.border = "2px dashed black";
            zoneDiv.style.position = "absolute";

            container.appendChild(zoneDiv);
        });

        // 🔄 Création des éléments
        window.exerciceData.diagrammeElements.forEach((element) => {
            const el = document.createElement("div");
            el.className = "draggable";
            el.id = element.id;
            el.textContent = element.nom;

            el.style.width = "150px";
            el.style.height = "50px";
            el.style.backgroundColor = "lightblue";
            el.style.border = "2px solid navy";
            el.style.margin = "5px";
            el.style.padding = "5px";
            el.style.textAlign = "center";
            el.style.cursor = "grab";
            el.style.position = "relative";

            el.draggable = true;
            el.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/plain", element.id);
            });

            elementsContainer.appendChild(el);
        });

        console.log("✅ Zones et éléments positionnés.");
    }

    // 📍 Positionnement initial et recalcul sur redimensionnement
    positionnerZonesEtElements();
    window.addEventListener('resize', () => {
        console.log("🔄 Recalibrage des zones et éléments après redimensionnement...");
        setTimeout(positionnerZonesEtElements, 300);
    });
};

// 🚫 Le tableau n'est pas modifié ici car non demandé.


// 🛠️ Configuration des zones et éléments du tableau
app.setupTableau = function () {
    const container = document.getElementById("tableau-container");
    const elementsContainer = document.getElementById("deplacables-tableau-container");

    const img = container.querySelector("img");

    function positionnerTableauZones() {
        const rect = img.getBoundingClientRect();
        const imgWidth = rect.width;
        const imgHeight = rect.height;

        // 🚮 Suppression des zones existantes
        document.querySelectorAll('.dropzone.tableau').forEach(zone => zone.remove());

        const zones = [...window.exerciceData.tableauzones1, ...window.exerciceData.tableauzones2];
        zones.forEach(zone => {
            const zoneDiv = document.createElement("div");
            zoneDiv.className = "dropzone tableau";
            zoneDiv.id = zone.id;

            zoneDiv.style.top = `${zone.relativeTop * imgHeight}px`;
            zoneDiv.style.left = `${zone.relativeLeft * imgWidth}px`;
            zoneDiv.style.width = `${zone.relativeWidth * imgWidth}px`;
            zoneDiv.style.height = `${zone.relativeHeight * imgHeight}px`;

            // 🖍️ Visuel pour le débogage
            zoneDiv.style.backgroundColor = `rgba(0, 0, 255, 0.3)`;
            zoneDiv.style.border = "2px dashed black";
            zoneDiv.style.position = "absolute";

            container.appendChild(zoneDiv);
        });

        // 🔄 Création des éléments si nécessaire
        if (!elementsContainer.hasChildNodes()) {
            const elements = [...window.exerciceData.tableauElementsEtape1, ...window.exerciceData.tableauElementsEtape2];
            elements.forEach((element, index) => {
                const matchingZone = zones[index];
                const el = app.createElement(element, elementsContainer, "lightgreen", matchingZone, imgWidth, imgHeight);
                elementsContainer.appendChild(el);
            });
        }
    }

    // 🔄 Positionnement initial et recalcul après redimensionnement
    positionnerTableauZones();
    window.addEventListener('resize', () => {
        console.log("🔍 Redimensionnement détecté, repositionnement des zones du tableau...");
        setTimeout(positionnerTableauZones, 300);
    });
};

// 🛠️ Fonction de création d'un élément déplaçable
app.createElement = function (element, container, color, zone, imgWidth, imgHeight) {
    const el = document.createElement("div");
    el.className = "draggable";
    el.id = element.id;
    el.textContent = element.nom;

    // 🧠 Calculer la taille proportionnelle en fonction de la zone
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
