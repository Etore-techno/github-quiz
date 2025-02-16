window.addEventListener("load", function () {
    console.log("🌐 Page et images complètement chargées. Initialisation...");

    const diagrammeImage = document.querySelector("#diagramme-container img");
    const tableauImage = document.querySelector("#tableau-container img");

    // Charger les images avant d'initialiser les exercices
    Promise.all([waitForImage(diagrammeImage), waitForImage(tableauImage)]).then(() => {
        console.log("🚀 Toutes les images sont chargées. Initialisation des exercices...");
        setupExercises();
        window.addEventListener('resize', setupExercises);
    }).catch(err => {
        console.error("❌ Erreur de chargement d'image:", err);
    });

    function waitForImage(img) {
        return new Promise((resolve, reject) => {
            if (img.complete) resolve();
            else {
                img.addEventListener("load", resolve);
                img.addEventListener("error", () => reject(`❌ Impossible de charger l'image: ${img.src}`));
            }
        });
    }

    // Initialisation complète des exercices
    function setupExercises() {
        console.log("🔄 Recalcul des positions des zones et éléments...");

        // Nettoyer zones et éléments existants
        document.querySelectorAll(".dropzone").forEach(zone => zone.remove());
        document.querySelectorAll(".draggable").forEach(el => el.remove());

        // Lancer les deux exercices
        setupDiagramme();
        setupTableau();
    }

 // Configuration des zones et éléments du diagramme
function setupDiagramme() {
    const container = document.getElementById("diagramme-container");
    const elementsContainer = document.getElementById("deplacables-diagramme-container");

    const rect = container.querySelector("img").getBoundingClientRect();
    const imgWidth = rect.width;
    const imgHeight = rect.height;

    window.exerciceData.diagrammezone.forEach(zone => {
        createZone(zone, imgWidth, imgHeight, "red", container);
    });

    window.exerciceData.diagrammeElements.forEach(element => {
        const draggable = createElement(element, elementsContainer, "lightblue");
        elementsContainer.appendChild(draggable);
    });
}


// Configuration des zones et éléments du tableau
function setupTableau() {
    const container = document.getElementById("tableau-container");
    const elementsContainer = document.getElementById("deplacables-tableau-container");

    const rect = container.querySelector("img").getBoundingClientRect();
    const imgWidth = rect.width;
    const imgHeight = rect.height;

    const zones = [...window.exerciceData.tableauzones1, ...window.exerciceData.tableauzones2];
    zones.forEach(zone => {
        createZone(zone, imgWidth, imgHeight, "blue", container);
    });

    const elements = [...window.exerciceData.tableauElementsEtape1, ...window.exerciceData.tableauElementsEtape2];
    elements.forEach(element => {
        const draggable = createElement(element, elementsContainer, "lightgreen");
        elementsContainer.appendChild(draggable);
    });
}

// Création d'une zone (avec conteneur passé en paramètre)
function createZone(zone, imgWidth, imgHeight, color, container) {
    const zoneDiv = document.createElement("div");
    zoneDiv.className = "dropzone";
    zoneDiv.textContent = zone.id;

    // Positionnement basé sur les dimensions réelles
    zoneDiv.style.position = "absolute";
    zoneDiv.style.top = `${zone.relativeTop * imgHeight}px`;
    zoneDiv.style.left = `${zone.relativeLeft * imgWidth}px`;
    zoneDiv.style.width = `${zone.relativeWidth * imgWidth}px`;
    zoneDiv.style.height = `${zone.relativeHeight * imgHeight}px`;

    zoneDiv.style.backgroundColor = `rgba(${color === "red" ? "255,0,0" : "0,0,255"}, 0.4)`;
    zoneDiv.style.border = "2px dashed black";
    zoneDiv.style.zIndex = "2";

    console.log(`🛠️ Zone ${zone.id} ajoutée dans ${container.id}`);

    // Ajout dans le bon conteneur
    container.appendChild(zoneDiv);

    return zoneDiv;
}


    // Création d'un élément déplaçable avec taille adaptée
    function createElement(element, container, color, zone, imgWidth, imgHeight) {
        const el = document.createElement("div");
        el.className = "draggable";
        el.textContent = element.nom;

        // Taille proportionnelle à la zone correspondante
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

        console.log(`🛠️ Élément "${element.nom}" créé avec taille ajustée.`);
        return el;
    }
});
