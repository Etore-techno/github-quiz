app.setupDiagramme = function () {
    const container = document.getElementById("diagramme-container");
    const img = container.querySelector("img");
    let repositionnementEnCours = false; // 🔒 Empêche plusieurs recalculs simultanés

    let attenteRecalcule = false;
    let derniereMiseAJour = 0;
    const delaiEntreRecalcules = 200; // Délai minimal entre les recalculs (en ms)

    // 🔹 Variables de stockage des tailles de texte selon le mode
    let tailleTexteDesktop = null;
    let tailleTextePortrait = null;
    let tailleTextePaysage = null;

    // 🔹 Variables pour éviter les recalculs inutiles
    let desktopCalculated = false;
    let portraitCalculated = false;
    let paysageCalculated = false;

    // 🔹 Variable pour suivre le dernier mode appliqué
    let dernierMode = null;
    let dernierWidth = 0;
    let dernierHeight = 0;

    function attendreChargementEtPositionner() {
        const maintenant = Date.now();
        if (repositionnementEnCours || attenteRecalcule || (maintenant - derniereMiseAJour < delaiEntreRecalcules)) {
            console.log("⏳ Trop tôt pour un nouveau repositionnement, on ignore cet appel.");
            return;
        }

        repositionnementEnCours = true;
        attenteRecalcule = true;
        derniereMiseAJour = maintenant;

        console.log("👀 Masquage temporaire des zones...");
        document.querySelectorAll('.dropzone').forEach(zone => {
            zone.style.opacity = "0";  // 🔹 Masquer les zones pour éviter le flash visuel
        });

        requestAnimationFrame(() => {
            setTimeout(() => {
                positionnerZonesEtElements();
                repositionnementEnCours = false;
                setTimeout(() => (attenteRecalcule = false), 500);
            }, 200);
        });

    }

    function detecterMode() {
        if (window.innerWidth >= 1024) return "desktop";
        return window.innerHeight > window.innerWidth ? "portrait" : "paysage";
    }

    function calculerTailleTexte(mode, imgWidth, imgHeight) {
        if (mode === "desktop" && tailleTexteDesktop) return tailleTexteDesktop;
        if (mode === "portrait" && tailleTextePortrait) return tailleTextePortrait;
        if (mode === "paysage" && tailleTextePaysage) return tailleTextePaysage;

        let texteMax = "Public (élèves et professeur)";
        let zoneMax = window.exerciceData.diagrammezone.find(zone => zone.id.includes("zone"));
        if (!zoneMax) return "1.5vw";

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

        let zoomFactor = window.devicePixelRatio || 1;
        let fontSize = (mode === "desktop") ? (zoneWidth * 0.05) / zoomFactor :
            (mode === "portrait") ? (zoneWidth * 0.06) / zoomFactor :
            (zoneWidth * 0.055) / zoomFactor;

        testDiv.style.fontSize = `${fontSize}px`;

        while (testDiv.getBoundingClientRect().width > zoneWidth * 0.9 ||
            testDiv.getBoundingClientRect().height > zoneHeight * 0.9) {
            fontSize -= 1;
            if (fontSize < 14) {
                fontSize = 14;
                break;
            }
            testDiv.style.fontSize = `${fontSize}px`;
        }

        document.body.removeChild(testDiv);

        console.log(`📏 Taille de texte calculée pour ${mode}: ${fontSize}px`);

        return isNaN(fontSize) || fontSize < 14 ? "1.5vw" : `${fontSize}px`;
    }

    function positionnerZonesEtElements() {
        console.log("🔍 `positionnerZonesEtElements()` exécutée !");
        
        const rect = img.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
            console.warn("⚠️ L'image n'est pas encore chargée, recalcul en attente...");
            return;
        }

        let modeActuel = detecterMode();
        let imgWidth = modeActuel === "desktop" ? img.naturalWidth : img.clientWidth;
        let imgHeight = modeActuel === "desktop" ? img.naturalHeight : img.clientHeight;

        console.log(`📏 Taille actuelle de l'image : ${imgWidth} x ${imgHeight} (Mode: ${modeActuel})`);
        
        if (!window.exerciceData || !window.exerciceData.diagrammezone.length) {
            console.error("❌ Aucune donnée de positionnement trouvée !");
            return;
        }

        let tailleTexteMemoire = "1.5vw";
        if (modeActuel === "desktop" && !desktopCalculated) {
            tailleTexteDesktop = calculerTailleTexte(modeActuel, imgWidth, imgHeight);
            desktopCalculated = true;
        } else if (modeActuel === "portrait" && !portraitCalculated) {
            tailleTextePortrait = calculerTailleTexte(modeActuel, imgWidth, imgHeight);
            portraitCalculated = true;
        } else if (modeActuel === "paysage" && !paysageCalculated) {
            tailleTextePaysage = calculerTailleTexte(modeActuel, imgWidth, imgHeight);
            paysageCalculated = true;
        }

        tailleTexteMemoire = modeActuel === "desktop" ? tailleTexteDesktop :
            modeActuel === "portrait" ? tailleTextePortrait :
            tailleTextePaysage;

        console.log(`📝 Mode: ${modeActuel} - Taille de texte utilisée: ${tailleTexteMemoire}`);

        let elementsSauvegardes = {};
        document.querySelectorAll('.dropzone').forEach(zone => {
            if (zone.children.length > 0) {
                elementsSauvegardes[zone.id] = zone.innerHTML;
            }
        });

        document.querySelectorAll('.dropzone').forEach(zone => zone.remove());
        
        window.exerciceData.diagrammezone.forEach(zoneData => {
            if (isNaN(zoneData.relativeTop) || isNaN(zoneData.relativeLeft) ||
                isNaN(zoneData.relativeWidth) || isNaN(zoneData.relativeHeight)) {
                console.error(`❌ Données invalides pour ${zoneData.id}`);
                return;
            }

            const zoneDiv = document.createElement("div");
            zoneDiv.className = "dropzone";
            zoneDiv.id = zoneData.id;
            zoneDiv.style.position = "absolute";
            zoneDiv.setAttribute("data-taille", zoneData.taille);

            zoneDiv.style.top = `${Math.max(0, zoneData.relativeTop * imgHeight)}px`;
            zoneDiv.style.left = `${Math.max(0, zoneData.relativeLeft * imgWidth)}px`;
            zoneDiv.style.width = `${Math.max(1, zoneData.relativeWidth * imgWidth)}px`;
            zoneDiv.style.height = `${Math.max(1, zoneData.relativeHeight * imgHeight)}px`;
            zoneDiv.style.fontSize = tailleTexteMemoire;

            container.appendChild(zoneDiv);
            console.log(`✅ Zone créée : ${zoneData.id}`);

            if (elementsSauvegardes[zoneData.id]) {
                zoneDiv.innerHTML = elementsSauvegardes[zoneData.id];
                console.log(`🔄 Restauration des éléments dans ${zoneData.id}`);
            }
        });

        app.initSelectionMenu();
    }

    if (img.complete) attendreChargementEtPositionner();
    else img.onload = () => attendreChargementEtPositionner();

    window.addEventListener("resize", () => {
        let modeActuel = detecterMode();
        if (modeActuel !== dernierMode || img.clientWidth !== dernierWidth || img.clientHeight !== dernierHeight) {
            dernierMode = modeActuel;
            dernierWidth = img.clientWidth;
            dernierHeight = img.clientHeight;
            attendreChargementEtPositionner();
        }
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
