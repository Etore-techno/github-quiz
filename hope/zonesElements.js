// zonesElements.js - Gestion des zones et des éléments avec recalcul dynamique et logs

app.reorganiserContainer = function (container) {
    const elements = Array.from(container.children);
    console.log(`🔄 Réorganisation des éléments du conteneur...`);
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.justifyContent = "flex-start";
    container.style.gap = "5px";

    elements.forEach((el, index) => {
        console.log(`🔹 Réorganisation : ${el.id} à la position ${index}`);
        el.style.transform = "translate(0, 0)";
        el.setAttribute('data-x', 0);
        el.setAttribute('data-y', 0);
    });
};

app.setupDiagramme = function () {
    const container = document.getElementById("diagramme-container");
    const elementsContainer = document.getElementById("deplacables-diagramme-container");
    const img = container.querySelector("img");

    function positionnerZonesEtElements() {
        const rect = img.getBoundingClientRect();
        const imgWidth = rect.width;
        const imgHeight = rect.height;

        elementsContainer.style.height = `${imgHeight}px`;

        let minWidthPetite = Infinity;
        let minHeightPetite = Infinity;
        let minWidthGrande = Infinity;
        let minHeightGrande = Infinity;

        window.exerciceData.diagrammezone.forEach(zone => {
            const zoneWidth = zone.relativeWidth * imgWidth;
            const zoneHeight = zone.relativeHeight * imgHeight;
            if (zone.taille === "petite") {
                minWidthPetite = Math.min(minWidthPetite, zoneWidth);
                minHeightPetite = Math.min(minHeightPetite, zoneHeight);
            } else {
                minWidthGrande = Math.min(minWidthGrande, zoneWidth);
                minHeightGrande = Math.min(minHeightGrande, zoneHeight);
            }
        });

        const textSize = Math.min(minWidthGrande, minHeightGrande) / 5;

        document.querySelectorAll('.dropzone').forEach(zone => zone.remove());
        document.querySelectorAll('.draggable').forEach(el => el.remove());

        window.exerciceData.diagrammezone.forEach(zone => {
            const zoneDiv = document.createElement("div");
            zoneDiv.className = "dropzone";
            zoneDiv.id = zone.id;
            zoneDiv.setAttribute('data-taille', zone.taille);

            zoneDiv.style.top = `${zone.relativeTop * imgHeight}px`;
            zoneDiv.style.left = `${zone.relativeLeft * imgWidth}px`;
            zoneDiv.style.width = `${zone.relativeWidth * imgWidth}px`;
            zoneDiv.style.height = `${zone.relativeHeight * imgHeight}px`;

            container.appendChild(zoneDiv);
            console.log(`🟦 Zone créée : ${zone.id} (${zone.taille})`);
        });

        window.exerciceData.diagrammeElements.forEach((element) => {
            const el = document.createElement("div");
            el.className = "draggable";
            el.id = element.id;
            el.textContent = element.nom;
            el.setAttribute('data-taille', element.taille);

            let width, height;
            if (element.taille === "petite") {
                width = minWidthPetite * 0.95;
                height = minHeightPetite * 0.95;
            } else {
                width = minWidthGrande * 0.95;
                height = minHeightGrande * 0.95;
            }

            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.fontSize = `${textSize}px`;

            elementsContainer.appendChild(el);
            window.app.positionsElements[element.id] = elementsContainer.id;

            console.log(`🟩 Élément ajouté : ${element.nom} (${element.taille})`);
        });

        app.reorganiserContainer(elementsContainer);
    }

    positionnerZonesEtElements();
    window.addEventListener('resize', () => setTimeout(positionnerZonesEtElements, 300));
};
