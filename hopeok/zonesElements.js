app.setupDiagramme = function () {
    const container = document.getElementById("diagramme-container");
    const img = container.querySelector("img");
    let repositionnementEnCours = false; // 🔒 Empêche plusieurs recalculs simultanés

    function attendreChargementEtPositionner() {
        if (repositionnementEnCours) {
            console.log("⏳ Repositionnement déjà en cours, on ignore cet appel.");
            return;
        }

        repositionnementEnCours = true;

        console.log("👀 Masquage temporaire des zones...");
        document.querySelectorAll('.dropzone').forEach(zone => {
            zone.style.opacity = "0";  // 🔹 Masquer les zones pour éviter le flash visuel
        });

        setTimeout(() => {
            positionnerZonesEtElements();
            repositionnementEnCours = false;
        }, 200); // 🔄 Réduction du délai pour une mise à jour rapide
    }

    let tailleTexteMemoire = null; // 🔒 Stockage de la taille correcte

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
    
        if (!window.exerciceData || !window.exerciceData.diagrammezone.length) {
            console.error("❌ Aucune donnée de positionnement trouvée !");
            return;
        }
    
        let zoomFactor = window.devicePixelRatio || 1; // 🔍 Détection du zoom
    
        let elementsSauvegardes = {};
        document.querySelectorAll('.dropzone').forEach(zone => {
            if (zone.children.length > 0) {
                elementsSauvegardes[zone.id] = zone.innerHTML;
            }
        });
    
        document.querySelectorAll('.dropzone').forEach(zone => zone.remove());
    
        if (!tailleTexteMemoire) {
            let texteMax = "Public (élèves et professeur)";
            let zoneMax = window.exerciceData.diagrammezone.find(zone => zone.id.includes("zone"));
    
            if (zoneMax) {
                const zoneWidth = zoneMax.relativeWidth * imgWidth;
                const zoneHeight = zoneMax.relativeHeight * imgHeight;
    
                let testDiv = document.createElement("div");
                testDiv.style.position = "absolute";
                testDiv.style.visibility = "hidden";
                testDiv.style.width = `${zoneWidth}px`;
                testDiv.style.height = `${zoneHeight}px`;
                testDiv.style.whiteSpace = "nowrap";
                testDiv.innerText = texteMax;
                document.body.appendChild(testDiv);
    
                let fontSize = 2;
                testDiv.style.fontSize = `${fontSize / zoomFactor}vw`; // 🔥 Correction du zoom
    
                while (testDiv.scrollWidth > zoneWidth || testDiv.scrollHeight > zoneHeight) {
                    fontSize -= 0.1;
                    testDiv.style.fontSize = `${fontSize / zoomFactor}vw`;
                    if (fontSize < 0.5) break;
                }
    
                document.body.removeChild(testDiv);
                tailleTexteMemoire = isNaN(fontSize) || fontSize < 0.5 ? "1.5vw" : `${fontSize / zoomFactor}vw`; // ✅ Correction finale
            }
        }
    
        console.log(`📝 Taille de texte verrouillée : ${tailleTexteMemoire}`);
    
        window.exerciceData.diagrammezone.forEach(zoneData => {
            if (
                isNaN(zoneData.relativeTop) || isNaN(zoneData.relativeLeft) ||
                isNaN(zoneData.relativeWidth) || isNaN(zoneData.relativeHeight)
            ) {
                console.error(`❌ Données invalides pour ${zoneData.id} (relativeTop: ${zoneData.relativeTop}, relativeLeft: ${zoneData.relativeLeft})`);
                return;
            }
    
            const zoneDiv = document.createElement("div");
            zoneDiv.className = "dropzone";
            zoneDiv.id = zoneData.id;
            zoneDiv.setAttribute("data-taille", zoneData.taille);
            zoneDiv.style.position = "absolute";
    
            zoneDiv.style.top = `${zoneData.relativeTop * imgHeight}px`;
            zoneDiv.style.left = `${zoneData.relativeLeft * imgWidth}px`;
            zoneDiv.style.width = `${zoneData.relativeWidth * imgWidth}px`;
            zoneDiv.style.height = `${zoneData.relativeHeight * imgHeight}px`;
            zoneDiv.style.fontSize = tailleTexteMemoire; // ✅ Application de la taille ajustée
    
            container.appendChild(zoneDiv);
            console.log(`✅ Zone créée : ${zoneData.id}`);
    
            if (elementsSauvegardes[zoneData.id]) {
                zoneDiv.innerHTML = elementsSauvegardes[zoneData.id];
                console.log(`🔄 Restauration des éléments dans ${zoneData.id}`);
            }
        });
    
        app.initSelectionMenu();
    }
    
    
    
    
    if (img.complete) {
        attendreChargementEtPositionner();
    } else {
        img.onload = () => attendreChargementEtPositionner();
    }

    window.addEventListener("resize", () => {
        attendreChargementEtPositionner();
    });

    window.addEventListener("orientationchange", () => {
        attendreChargementEtPositionner();
    });
};




function ajusterConteneurElements() {
    console.log("🔧 Ajustement du conteneur des éléments");

    const container = document.querySelector(".elements-container");
    if (!container) return;

    const isPortrait = window.innerHeight > window.innerWidth;

    // **Correction du padding et des marges**
    const basePadding = isPortrait ? "1vh" : "1.5vh";  // 🔹 Moins de marge en portrait
    const baseBorder = "0.15em solid black";  
    const baseShadow = "0.1em 0.1em 0.5em rgba(0, 0, 0, 0.2)";  // 🔹 Ombre réduite
    const minWidth = isPortrait ? "25vw" : "20vw";  // 🔹 Taille plus équilibrée
    const maxWidth = isPortrait ? "30vw" : "22vw";  // 🔹 Limite la largeur
    const minHeight = "50vh";  // 🔹 Taille stable

    container.style.padding = basePadding;  
    container.style.border = baseBorder;  
    container.style.boxShadow = baseShadow;
    container.style.minWidth = minWidth;
    container.style.maxWidth = maxWidth;
    container.style.minHeight = minHeight;

    console.log(`📏 Mode ${isPortrait ? "portrait" : "paysage"} - Padding: ${container.style.padding}, MinWidth: ${container.style.minWidth}`);
}

// ✅ Appliquer la correction au chargement et aux redimensionnements
window.addEventListener("resize", ajusterConteneurElements);
window.addEventListener("DOMContentLoaded", ajusterConteneurElements);
window.addEventListener("orientationchange", ajusterConteneurElements);
