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

    

    function calculerTailleTexteDesktop(zoneDiv) {
        // 📌 Sélection de la plus longue réponse compatible avec une zone "grande"
        let texteMax = "";
        const zonesGrandes = window.exerciceData.diagrammezone.filter(z => z.taille === "grande");
        const elementsCompatibles = window.exerciceData.diagrammeElements.filter(el => 
            zonesGrandes.some(z => z.taille === el.taille)
        );
    
        if (elementsCompatibles.length > 0) {
            texteMax = elementsCompatibles.reduce((longest, el) => el.nom.length > longest.length ? el.nom : longest, "");
        }
    
        console.log(`🔍 Texte utilisé pour le test Desktop : "${texteMax}"`);
    
        // 📌 Création d'une div invisible pour tester la taille du texte
        let testDiv = document.createElement("div");
        testDiv.style.position = "absolute";
        testDiv.style.visibility = "hidden";
        testDiv.style.whiteSpace = "nowrap";
        testDiv.innerText = texteMax;
        document.body.appendChild(testDiv);
    
        // 📏 Prendre les dimensions réelles de la zone
        const zoneWidth = zoneDiv.clientWidth;
        const zoneHeight = zoneDiv.clientHeight;
    
        console.log(`📏 Taille réelle de la zone (ID: ${zoneDiv.id}) → ${zoneWidth}px x ${zoneHeight}px`);
    
        let fontSize = Math.min(zoneHeight * 0.5, 24); // 🔹 Démarre avec 50% de la hauteur ou max 24px
        testDiv.style.fontSize = `${fontSize}px`;
    
        while (testDiv.scrollHeight > zoneHeight * 0.9 || testDiv.scrollWidth > zoneWidth * 0.9) {
            fontSize -= 1;
            testDiv.style.fontSize = `${fontSize}px`;
    
            if (fontSize < 12) break; // 🔒 Sécurité pour éviter un texte trop petit
        }
    
        document.body.removeChild(testDiv);
        return `${fontSize}px`;
    }
    
    
    function calculerTailleTexteMobile(zoneDiv) {
        // 📌 Sélection de la plus longue réponse compatible avec une zone "grande"
        let texteMax = "";
        const zonesGrandes = window.exerciceData.diagrammezone.filter(z => z.taille === "grande");
        const elementsCompatibles = window.exerciceData.diagrammeElements.filter(el => 
            zonesGrandes.some(z => z.taille === el.taille)
        );
    
        if (elementsCompatibles.length > 0) {
            texteMax = elementsCompatibles.reduce((longest, el) => el.nom.length > longest.length ? el.nom : longest, "");
        }
    
        console.log(`🔍 Texte utilisé pour le test Mobile : "${texteMax}"`);
    
        let testDiv = document.createElement("div");
        testDiv.style.position = "absolute";
        testDiv.style.visibility = "hidden";
        testDiv.style.whiteSpace = "nowrap";
        testDiv.innerText = texteMax;
        document.body.appendChild(testDiv);
    
        const zoneWidth = zoneDiv.clientWidth;
        const zoneHeight = zoneDiv.clientHeight;
    
        console.log(`📏 Taille réelle de la zone (ID: ${zoneDiv.id}) → ${zoneWidth}px x ${zoneHeight}px`);
    
        let fontSize = zoneHeight * 0.6; // 🔹 Commence avec 60% de la hauteur de la zone
        testDiv.style.fontSize = `${fontSize}px`;
    
        while (testDiv.scrollHeight > zoneHeight * 0.85 || testDiv.scrollWidth > zoneWidth * 0.9) {
            fontSize -= 1;
            testDiv.style.fontSize = `${fontSize}px`;
    
            if (fontSize < 10) break; // 🔒 Empêche une taille illisible
        }
    
        document.body.removeChild(testDiv);
        return `${fontSize}px`;
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
            container.appendChild(zoneDiv);

            // 🔥 Calcul dynamique de la taille du texte après avoir ajouté l'élément DOM
        setTimeout(() => {
            let tailleTexte;
            if (mode === "desktop") {
                tailleTexte = calculerTailleTexteDesktop(zoneDiv);
            } else {
                tailleTexte = calculerTailleTexteMobile(zoneDiv);
            }
            zoneDiv.style.fontSize = tailleTexte;
            console.log(`📏 Taille de texte finale pour ${zoneData.id} : ${tailleTexte}`);
        }, 50); // 📌 Petit délai pour assurer que les dimensions sont bien prises

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



