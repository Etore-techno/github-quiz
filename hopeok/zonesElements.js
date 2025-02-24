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

    // 🔒 Stockage des tailles calculées
let tailleTexteMemoireDesktop = null;
let tailleTexteMemoirePortrait = null;
let tailleTexteMemoireLandscape = null;

function calculerTailleTexteDesktop(imgWidth, imgHeight, zoomFactor) {
    return calculerTailleTexte(imgWidth, imgHeight, zoomFactor, "desktop");
}

function calculerTailleTextePortrait(imgWidth, imgHeight, zoomFactor) {
    return calculerTailleTexte(imgWidth, imgHeight, zoomFactor, "portrait");
}

function calculerTailleTexteLandscape(imgWidth, imgHeight, zoomFactor) {
    return calculerTailleTexte(imgWidth, imgHeight, zoomFactor, "landscape");
}

// 🟢 Fonction générique pour éviter la répétition de code
function calculerTailleTexte(imgWidth, imgHeight, zoomFactor, mode) {
    let texteMax = "Public (élèves et professeur)";
    let zoneMax = window.exerciceData.diagrammezone.find(zone => zone.id.includes("zone"));

    if (!zoneMax) return "16px"; // 🔒 Valeur par défaut

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

    let fontSize = mode === "desktop" ? Math.min(zoneHeight * 0.5, 24) :
                   mode === "portrait" ? Math.min(zoneHeight * 0.6, 26) :
                   Math.min(zoneHeight * 0.55, 25);

    testDiv.style.fontSize = `${fontSize}px`;

    while (testDiv.scrollHeight > zoneHeight * 0.9 || testDiv.scrollWidth > zoneWidth * 0.9) {
        fontSize -= 1;
        testDiv.style.fontSize = `${fontSize}px`;
        if (fontSize < 12) break;
    }

    document.body.removeChild(testDiv);

    console.log(`📏 Taille optimale calculée pour ${mode} : ${fontSize}px`);
    return `${fontSize}px`;
}


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
        let mode = detecterMode(); // 📌 Détecte le mode actuel
        let elementsSauvegardes = {};
        document.querySelectorAll('.dropzone').forEach(zone => {
            if (zone.children.length > 0) {
                elementsSauvegardes[zone.id] = zone.innerHTML;
            }
        });
    
        document.querySelectorAll('.dropzone').forEach(zone => zone.remove());
    
 // 🔹 1️⃣ Calcul de la taille du texte pour **Desktop**
 if (mode === "desktop" && !tailleTexteMemoireDesktop) {
    tailleTexteMemoireDesktop = calculerTailleTexteDesktop(imgWidth, imgHeight, zoomFactor);
    console.log(`📏 Taille calculée pour Desktop : ${tailleTexteMemoireDesktop}`);
}

// 🔹 2️⃣ Calcul de la taille du texte pour **Portrait**
if (mode === "portrait" && !tailleTexteMemoirePortrait) {
    tailleTexteMemoirePortrait = calculerTailleTextePortrait(imgWidth, imgHeight, zoomFactor);
    console.log(`📏 Taille calculée pour Portrait : ${tailleTexteMemoirePortrait}`);
}

// 🔹 3️⃣ Calcul de la taille du texte pour **Landscape**
if (mode === "landscape" && !tailleTexteMemoireLandscape) {
    tailleTexteMemoireLandscape = calculerTailleTexteLandscape(imgWidth, imgHeight, zoomFactor);
    console.log(`📏 Taille calculée pour Landscape : ${tailleTexteMemoireLandscape}`);
}

console.log(`📝 Tailles de texte mémorisées : 
    - Desktop : ${tailleTexteMemoireDesktop}
    - Portrait : ${tailleTexteMemoirePortrait}
    - Landscape : ${tailleTexteMemoireLandscape}`);
    
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
            // 📌 Application de la bonne taille de texte selon le mode
        if (mode === "desktop") {
            zoneDiv.style.fontSize = tailleTexteMemoireDesktop;
        } else if (mode === "portrait") {
            zoneDiv.style.fontSize = tailleTexteMemoirePortrait;
        } else {
            zoneDiv.style.fontSize = tailleTexteMemoireLandscape;
        }

    
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
    const mode = window.innerWidth >= 1024 ? "desktop" : isPortrait ? "portrait" : "landscape";

    // ✅ Fixation des tailles en pixels pour éviter l'effet du zoom en Mobile
    const basePadding = isPortrait ? "10px" : "15px";
    const baseBorder = "2px solid black";
    const baseShadow = "2px 2px 5px rgba(0, 0, 0, 0.2)";
    const minWidth = isPortrait ? "250px" : "300px";
    const maxWidth = isPortrait ? "350px" : "400px";
    const minHeight = "500px";

    container.style.padding = basePadding;
    container.style.border = baseBorder;
    container.style.boxShadow = baseShadow;
    container.style.minWidth = minWidth;
    container.style.maxWidth = maxWidth;
    container.style.minHeight = minHeight;

    console.log(`📏 Mode ${mode} - Padding: ${container.style.padding}, MinWidth: ${container.style.minWidth}`);

    // ✅ Correction du zoom en mode Desktop
    if (mode === "desktop") {
        let zoomFactor = window.devicePixelRatio || 1;

        console.log(`🔍 Zoom détecté : ${zoomFactor}`);

        document.querySelectorAll('.dropzone').forEach(zone => {
            // 🔹 Vérifier si la taille initiale est déjà stockée, sinon la stocker
            if (!zone.dataset.fontSizeOriginale) {
                zone.dataset.fontSizeOriginale = zone.style.fontSize;
            }
            if (!zone.dataset.borderSizeOriginale) {
                zone.dataset.borderSizeOriginale = getComputedStyle(zone).borderWidth;
            }

            // 🔹 Ajustement de la taille du texte après zoom
            let tailleOriginale = parseFloat(zone.dataset.fontSizeOriginale);
            if (!isNaN(tailleOriginale)) {
                let tailleCorrigee = tailleOriginale / zoomFactor;
                zone.style.fontSize = `${tailleCorrigee}px`;
                console.log(`📏 Ajustement texte Desktop : ${zone.style.fontSize}`);
            }

            // 🔹 Ajustement de la bordure après zoom
            let borderSize = parseFloat(zone.dataset.borderSizeOriginale);
            if (!isNaN(borderSize)) {
                let borderCorrigee = borderSize / zoomFactor;
                zone.style.borderWidth = `${borderCorrigee}px`;
                console.log(`🎨 Ajustement bordure Desktop : ${zone.style.borderWidth}`);
            }
        });
    }
}


function repositionnerEtAjuster() {
    console.log("🔄 Repositionnement des zones en cours...");
    
    positionnerZonesEtElements();

    // ✅ Attendre 100ms après le placement des zones avant d'ajuster le conteneur
    setTimeout(() => {
        ajusterConteneurElements();
    }, 100);
}


// ✅ Remplace les appels séparés par un appel unique à `repositionnerEtAjuster()`
window.addEventListener("resize", repositionnerEtAjuster);
window.addEventListener("DOMContentLoaded", repositionnerEtAjuster);
window.addEventListener("orientationchange", repositionnerEtAjuster);
