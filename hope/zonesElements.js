app.setupDiagramme = function () {
    const container = document.getElementById("diagramme-container");
    const img = container.querySelector("img");

    function positionnerZonesEtElements() {
        console.log("🔍 `positionnerZonesEtElements()` exécutée !");

        const rect = img.getBoundingClientRect();
        
        // Assurer que l'image est bien chargée avant de recalculer les zones
        if (rect.width === 0 || rect.height === 0) {
            console.warn("⚠️ L'image n'est pas encore chargée, recalcul en attente...");
            return;
        }

        const imgWidth = rect.width;
        const imgHeight = rect.height;

        console.log(`📏 Taille actuelle de l'image : ${imgWidth} x ${imgHeight}`);

        // Supprimer les anciennes zones avant d’en créer de nouvelles
        document.querySelectorAll('.dropzone').forEach(zone => zone.remove());

        window.exerciceData.diagrammezone.forEach(zoneData => {
            const zoneDiv = document.createElement("div");
            zoneDiv.className = "dropzone";
            zoneDiv.id = zoneData.id;
            zoneDiv.setAttribute("data-taille", zoneData.taille);

            // ⚠️ Positionnement RELATIF à l'image
            zoneDiv.style.position = "absolute";
            zoneDiv.style.top = `${zoneData.relativeTop * imgHeight}px`;
            zoneDiv.style.left = `${zoneData.relativeLeft * imgWidth}px`;
            zoneDiv.style.width = `${zoneData.relativeWidth * imgWidth}px`;
            zoneDiv.style.height = `${zoneData.relativeHeight * imgHeight}px`;

            container.appendChild(zoneDiv);
            console.log(`✅ Zone créée : ${zoneData.id} → Top: ${zoneDiv.style.top}, Left: ${zoneDiv.style.left}`);
        });
    }

    // Attendre le chargement complet de l’image avant de placer les zones
    if (img.complete) {
        positionnerZonesEtElements();
    } else {
        img.onload = positionnerZonesEtElements;
    }

    // Recalculer les positions des zones en cas de redimensionnement
    window.addEventListener("resize", () => {
        requestAnimationFrame(positionnerZonesEtElements);
    });
};
