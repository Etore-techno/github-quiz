app.setupDiagramme = function () {
    const container = document.getElementById("diagramme-container");
    const img = container.querySelector("img");

    function positionnerZonesEtElements() {
        console.log("🔍 `positionnerZonesEtElements()` exécutée !");

        const rect = img.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
            console.warn("⚠️ L'image n'est pas encore chargée, recalcul en attente...");
            return;
        }

        const imgWidth = rect.width;
        const imgHeight = rect.height;
        console.log(`📏 Taille actuelle de l'image : ${imgWidth} x ${imgHeight}`);

        // 🔒 **SAUVEGARDE** des éléments placés avant de recréer les zones
        let elementsSauvegardes = {};
        document.querySelectorAll('.dropzone').forEach(zone => {
            if (zone.children.length > 0) {
                elementsSauvegardes[zone.id] = zone.innerHTML;
            }
        });

        // Supprimer les anciennes zones
        document.querySelectorAll('.dropzone').forEach(zone => zone.remove());

        // Recréer les zones avec la position relative à l’image
        window.exerciceData.diagrammezone.forEach(zoneData => {
            const zoneDiv = document.createElement("div");
            zoneDiv.className = "dropzone";
            zoneDiv.id = zoneData.id;
            zoneDiv.setAttribute("data-taille", zoneData.taille);

            zoneDiv.style.position = "absolute";
            zoneDiv.style.top = `${zoneData.relativeTop * imgHeight}px`;
            zoneDiv.style.left = `${zoneData.relativeLeft * imgWidth}px`;
            zoneDiv.style.width = `${zoneData.relativeWidth * imgWidth}px`;
            zoneDiv.style.height = `${zoneData.relativeHeight * imgHeight}px`;

            container.appendChild(zoneDiv);
            console.log(`✅ Zone créée : ${zoneData.id}`);

            // 🔄 **RESTAURATION** des éléments placés dans les zones
            if (elementsSauvegardes[zoneData.id]) {
                zoneDiv.innerHTML = elementsSauvegardes[zoneData.id];
                console.log(`🔄 Restauration des éléments dans ${zoneData.id}`);
            }
        });
    }

    if (img.complete) {
        positionnerZonesEtElements();
    } else {
        img.onload = positionnerZonesEtElements;
    }

    // Recalcul des positions en cas de redimensionnement
    window.addEventListener("resize", () => {
        requestAnimationFrame(positionnerZonesEtElements);
    });
};
