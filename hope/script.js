window.addEventListener("load", function () {
    console.log("🌐 Page et images complètement chargées. Initialisation...");

    const diagrammeImage = document.querySelector("#diagramme-container img");
    const tableauImage = document.querySelector("#tableau-container img");

    // Attendre le chargement des deux images avec Promise.all
    Promise.all([
        waitForImage(diagrammeImage),
        waitForImage(tableauImage)
    ]).then(() => {
        console.log("🚀 Toutes les images sont chargées. Début des exercices.");
        setupExercises();
    }).catch(err => {
        console.error("❌ Erreur lors du chargement des images :", err);
    });

    // Attendre le chargement d'une image
    function waitForImage(img) {
        return new Promise((resolve, reject) => {
            if (img.complete) {
                console.log(`📸 Image déjà chargée: ${img.src}`);
                resolve();
            } else {
                img.addEventListener("load", () => {
                    console.log(`✅ Image chargée: ${img.src}`);
                    resolve();
                });
                img.addEventListener("error", () => reject(`❌ Échec de chargement: ${img.src}`));
            }
        });
    }

    // Fonction principale après le chargement des images
    function setupExercises() {
        console.log("🔧 Configuration des exercices...");
        setupDiagramme();
        setupTableau();
    }

    // Affiche les zones et éléments du diagramme
    function setupDiagramme() {
        const container = document.getElementById("diagramme-container");
        const elementsContainer = document.getElementById("deplacables-diagramme-container");

        if (!window.exerciceData || !window.exerciceData.diagrammezone) {
            console.error("❌ Données manquantes pour le diagramme !");
            return;
        }

        // Affichage des zones
        window.exerciceData.diagrammezone.forEach(zone => {
            const zoneDiv = createZone(zone, container, "red");
            container.appendChild(zoneDiv);
        });

        // Affichage des éléments
        window.exerciceData.diagrammeElements.forEach(element => {
            const el = createElement(element, elementsContainer, "lightblue");
            elementsContainer.appendChild(el);
        });
    }

    // Affiche les zones et éléments du tableau
    function setupTableau() {
        const container = document.getElementById("tableau-container");
        const elementsContainer = document.getElementById("deplacables-tableau-container");

        // Fusionner les zones des étapes 1 et 2
        const zones = [...window.exerciceData.tableauzones1, ...window.exerciceData.tableauzones2];
        zones.forEach(zone => {
            const zoneDiv = createZone(zone, container, "blue");
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
    function createZone(zone, container, color) {
        const zoneDiv = document.createElement("div");
        zoneDiv.className = "dropzone";
        zoneDiv.textContent = zone.id;

        // Calcul des positions en fonction de la taille réelle de l'image
        zoneDiv.style.position = "absolute";
        zoneDiv.style.top = `${zone.relativeTop * container.clientHeight}px`;
        zoneDiv.style.left = `${zone.relativeLeft * container.clientWidth}px`;
        zoneDiv.style.width = `${zone.relativeWidth * container.clientWidth}px`;
        zoneDiv.style.height = `${zone.relativeHeight * container.clientHeight}px`;

        zoneDiv.style.backgroundColor = `rgba(${color === "red" ? "255,0,0" : "0,0,255"}, 0.4)`;
        zoneDiv.style.border = "2px dashed black";
        zoneDiv.style.zIndex = "2";
        console.log(`🟢 Zone ${zone.id} : top=${zoneDiv.style.top}, left=${zoneDiv.style.left}`);
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

        console.log(`🟢 Élément "${element.nom}" ajouté.`);
        return el;
    }
});
