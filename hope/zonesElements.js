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

        // Calcul de la taille maximale du texte
        let tailleMaxTexte = 0;
        window.exerciceData.diagrammeElements.forEach(element => {
            let longueurTexte = element.nom.length;
            tailleMaxTexte = Math.max(tailleMaxTexte, longueurTexte);
        });

        let tailleTexte = Math.max(1.5, 20 / tailleMaxTexte) + "vw"; // 🔥 Ajustement dynamique

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
            zoneDiv.style.fontSize = tailleTexte;

            container.appendChild(zoneDiv);
            console.log(`✅ Zone créée : ${zoneData.id}`);

            // 🔄 **RESTAURATION** des éléments placés dans les zones
            if (elementsSauvegardes[zoneData.id]) {
                zoneDiv.innerHTML = elementsSauvegardes[zoneData.id];
                console.log(`🔄 Restauration des éléments dans ${zoneData.id}`);
            }
        });

        // ✅ Réattache les événements après un recalcul
        app.initSelectionMenu();
    }

    if (img.complete) {
        positionnerZonesEtElements();
    } else {
        img.onload = positionnerZonesEtElements;
    }

    function ajusterStylesMenu() {
        console.log("🔧 Ajustement du style du menu de sélection");
    
        const selectionMenu = document.getElementById("selection-menu");
        if (!selectionMenu) return;
    
        const baseTaille = window.innerHeight * 0.02; // 🔥 Base stable pour padding/marge
        const baseBordure = window.innerHeight * 0.002; // 🔥 Taille stable pour bordure
    
        selectionMenu.style.padding = `${baseTaille}px`;  
        selectionMenu.style.borderWidth = `${baseBordure}px`;  // ✅ Fixe la bordure
        selectionMenu.style.boxShadow = "0.2em 0.2em 0.8em rgba(0, 0, 0, 0.2)";  
    
        console.log(`📏 Padding : ${selectionMenu.style.padding}, Bordure : ${selectionMenu.style.borderWidth}`);
    }
    
    // Recalcul des positions en cas de redimensionnement
    window.addEventListener("resize", () => {
        requestAnimationFrame(positionnerZonesEtElements);
    });


// 🟢 Ajustement dès que le menu s’ouvre
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("dropzone")) {
        ajusterStylesMenu();
    }
});
};
