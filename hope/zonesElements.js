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

    let tailleTexteDesktop = null; // 🔒 Stockage de la taille correcte
    let tailleTextePortrait = null; // 🔒 Stockage de la taille correcte
    let tailleTexteLandscape = null; // 🔒 Stockage de la taille correcte

    function calculerTexteDesktop(imgWidth, imgHeight, zoomFactor) {
        tailleTexteDesktop = calculerTailleTexte(imgWidth, imgHeight, zoomFactor, "desktop");
    }

    function calculerTextePortrait(imgWidth, imgHeight, zoomFactor) {
        tailleTextePortrait = calculerTailleTexte(imgWidth, imgHeight, zoomFactor, "portrait");
    }

    function calculerTexteLandscape(imgWidth, imgHeight, zoomFactor) {
        tailleTexteLandscape = calculerTailleTexte(imgWidth, imgHeight, zoomFactor, "landscape");
    }

    function calculerTailleTexte(imgWidth, imgHeight, zoomFactor, mode) {
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

        let fontSize = 3;  // Commence avec une taille plus grande
        testDiv.style.fontSize = `${fontSize / zoomFactor}vw`;

        while (testDiv.scrollWidth > zoneWidth || testDiv.scrollHeight > zoneHeight) {
            fontSize -= 0.1;
            testDiv.style.fontSize = `${fontSize / zoomFactor}vw`;

            if (fontSize < 0.5) break;  // 🔒 Sécurité pour éviter un texte invisible
        }

        // **Correction spécifique pour Portrait**
        if (mode === "portrait") {
            // 🔹 Autoriser une meilleure répartition largeur/hauteur
            let maxHeight = zoneHeight * 0.8; // On laisse 80% de la hauteur max dispo
            let maxWidth = zoneWidth * 0.95;  // 95% de la largeur max
            let textWidth = testDiv.scrollWidth;
            let textHeight = testDiv.scrollHeight;

            if (textHeight < maxHeight && textWidth < maxWidth) {
                fontSize *= 1.2;  // 📌 Permet d’augmenter un peu si c'est possible
            }
        }
        document.body.removeChild(testDiv);
        return isNaN(fontSize) || fontSize < 0.5 ? "1.5vw" : `${fontSize / zoomFactor}vw`;

    }

    function detecterMode() {
        if (window.innerWidth >= 1024) return "desktop";
        return window.innerHeight > window.innerWidth ? "portrait" : "landscape";
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
    
        let elementsSauvegardes = {};
        document.querySelectorAll('.dropzone').forEach(zone => {
            if (zone.children.length > 0) {
                elementsSauvegardes[zone.id] = zone.innerHTML;
            }
        });
    
        document.querySelectorAll('.dropzone').forEach(zone => zone.remove());
    
        let mode = detecterMode();


        if (mode === "desktop" && !tailleTexteDesktop) {
            calculerTexteDesktop (imgWidth, imgHeight, zoomFactor);
        } else if (mode === "portrait" && !tailleTextePortrait) {
            calculerTextePortrait (imgWidth, imgHeight, zoomFactor);
        } else if (mode === "landscape" && !tailleTexteLandscape) {
            calculerTexteLandscape (imgWidth, imgHeight, zoomFactor);
        } 
    
        console.log(`📝 Taille de texte desktop verrouillée : ${tailleTexteDesktop}`);
    
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
            
            
            if (mode === "desktop") {
                zoneDiv.style.fontSize = tailleTexteDesktop; // ✅ Application de la taille ajustée
            } else if (mode === "portrait") {
                zoneDiv.style.fontSize = tailleTextePortrait; // ✅ Application de la taille ajustée
            } else if (mode === "landscape") {
                zoneDiv.style.fontSize = tailleTexteLandscape; // ✅ Application de la taille ajustée
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



