window.addEventListener("load", function () {
    console.log("🌐 Page et images complètement chargées. Initialisation...");

    const diagrammeImage = document.querySelector("#diagramme-container img");
    const tableauImage = document.querySelector("#tableau-container img");

    // Attendre que les images soient chargées
    Promise.all([waitForImage(diagrammeImage), waitForImage(tableauImage)]).then(() => {
        console.log("🚀 Toutes les images sont chargées. Initialisation des exercices...");
        setupExercises();
        window.addEventListener('resize', setupExercises); // Recalcule les positions au redimensionnement
    }).catch(err => {
        console.error("❌ Erreur de chargement d'image:", err);
    });

    // Fonction utilitaire pour attendre une image
    function waitForImage(img) {
        return new Promise((resolve, reject) => {
            if (img.complete) resolve();
            else {
                img.addEventListener("load", resolve);
                img.addEventListener("error", () => reject(`❌ Impossible de charger l'image: ${img.src}`));
            }
        });
    }

    // Fonction d'initialisation principale
    function setupExercises() {
        console.log("🔄 Recalcul des positions des zones et éléments...");

        // Nettoyage des zones existantes
        document.querySelectorAll(".dropzone").forEach(zone => zone.remove());
        document.querySelectorAll(".draggable").forEach(el => el.remove());

        setupDiagramme();
        setupTableau();
    }

    // Affichage des zones et éléments du diagramme
    function setupDiagramme() {
        const container = document.getElementById("diagramme-container");
        const elementsContainer = document.getElementById("deplacables-diagramme-container");

        const rect = container.querySelector("img").getBoundingClientRect();
        const imgWidth = rect.width;
        const imgHeight = rect.height;

        window.exerciceData.diagrammezone.forEach(zone => {
            const zoneDiv = createZone(zone, imgWidth, imgHeight, "red");
            container.appendChild(zoneDiv);
        });

        window.exerciceData.diagrammeElements.forEach(element => {
            const el = createElement(element, elementsContainer, "lightblue");
            elementsContainer.appendChild(el);
        });
    }

    // Affichage des zones et éléments du tableau
    function setupTableau() {
        const container = document.getElementById("tableau-container");
        const elementsContainer = document.getElementById("deplacables-tableau-container");

        const rect = container.querySelector("img").getBoundingClientRect();
        const imgWidth = rect.width;
        const imgHeight = rect.height;

        // Fusionner les zones des étapes 1 et 2
        const zones = [...window.exerciceData.tableauzones1, ...window.exerciceData.tableauzones2];
        zones.forEach(zone => {
            const zoneDiv = createZone(zone, imgWidth, imgHeight, "blue");
            container.appendChild(zoneDiv);
        });

        // Fusionner les éléments des étapes 1 et 2
        const elements = [...window.exerciceData.tableauElementsEtape1, ...window.exerciceData.tableauElementsEtape2];
        elements.forEach(element => {
            const el = createElement(element, elementsContainer, "lightgreen");
            elementsContainer.appendChild(el);
        });
    }

    // Création générique d'une zone
    function createZone(zone, imgWidth, imgHeight, color) {
        const zoneDiv = document.createElement("div");
        zoneDiv.className = "dropzone";
        zoneDiv.textContent = zone.id;

        // Calcul en fonction de la taille visible de l'image
        zoneDiv.style.position = "absolute";
        zoneDiv.style.top = `${zone.relativeTop * imgHeight}px`;
        zoneDiv.style.left = `${zone.relativeLeft * imgWidth}px`;
        zoneDiv.style.width = `${zone.relativeWidth * imgWidth}px`;
        zoneDiv.style.height = `${zone.relativeHeight * imgHeight}px`;

        zoneDiv.style.backgroundColor = `rgba(${color === "red" ? "255,0,0" : "0,0,255"}, 0.4)`;
        zoneDiv.style.border = "2px dashed black";
        zoneDiv.style.zIndex = "2";

        console.log(`🛠️ Zone ${zone.id} positionnée à top: ${zoneDiv.style.top}, left: ${zoneDiv.style.left}`);
        return zoneDiv;
    }

    // Création générique d'un élément déplaçable
    function createElement(element, container, color) {
        const el = document.createElement("div");
        el.className = "draggable";
        el.textContent = element.nom;

        el.style.position = "absolute";
        el.style.top = `${Math.random() * 300}px`;
        el.style.left = `${Math.random() * 300}px`;
        el.style.backgroundColor = color;
        el.style.border = `2px solid ${color === "lightblue" ? "navy" : "green"}`;
        el.style.padding = "15px";
        el.style.zIndex = "5";

        el.draggable = true;

        el.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", element.id);
        });

        console.log(`🛠️ Élément "${element.nom}" ajouté.`);
        return el;
    }
});
