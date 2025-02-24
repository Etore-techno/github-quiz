app.setupDiagramme = function () {
    const container = document.getElementById("diagramme-container");
    const img = container.querySelector("img");
    
    let repositionnementEnCours = false;
    let recalculEnCours = false;
    let dernierZoomTimestamp = 0;
    let derniereOrientation = detecterMode();

    function attendreChargementEtPositionner() {
        if (repositionnementEnCours) return;
        repositionnementEnCours = true;

        document.querySelectorAll('.dropzone').forEach(zone => zone.style.opacity = "0");

        setTimeout(() => {
            positionnerZonesEtElements();
            repositionnementEnCours = false;
        }, 200);
    }

    function detecterMode() {
        const largeur = window.innerWidth;
        const hauteur = window.innerHeight;
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        return isMobile ? (hauteur > largeur ? "portrait" : "landscape") : "desktop";
    }

    function detecterZoom() {
        return window.visualViewport?.scale || (window.outerWidth / window.innerWidth);
    }

    function trouverPlusPetiteGrandeZone() {
        const grandesZones = [...document.querySelectorAll('.dropzone[data-taille="grande"]')];
        if (grandesZones.length === 0) return null;
        return grandesZones.reduce((plusPetite, zone) => {
            const surface = zone.clientWidth * zone.clientHeight;
            return (!plusPetite || surface < plusPetite.surface) ? { zone, surface } : plusPetite;
        }, null)?.zone;
    }

    function trouverTexteLePlusLong() {
        const elementsCompatibles = window.exerciceData.diagrammeElements.filter(el => el.taille === "grande");
        return elementsCompatibles.reduce((longest, el) => el.nom.length > longest.length ? el.nom : longest, "");
    }

    let tailleTexteMemoire = {
        desktop: null,
        portrait: null,
        landscape: null
    };

    function calculerTailleTexteAuto(zone, mode, callback) {
        if (!zone) {
            console.warn("❌ Aucune zone trouvée pour le test !");
            callback("16px");
            return;
        }

        let texteMax = trouverTexteLePlusLong();
        let testText = document.createElement("div");
        testText.innerText = texteMax;

        testText.style.position = "absolute";
        testText.style.width = "100%";
        testText.style.height = "100%";
        testText.style.display = "flex";
        testText.style.justifyContent = "center";
        testText.style.alignItems = "center";
        testText.style.textAlign = "center";
        testText.style.wordWrap = "break-word";
        testText.style.overflow = "hidden"; 
        testText.style.fontSize = "5px";

        zone.appendChild(testText);

        setTimeout(() => {
            let fontSize = 5;
            testText.style.fontSize = `${fontSize}px`;

            let zoneHeight = zone.clientHeight;
            let zoneWidth = zone.clientWidth;
            let maxFontSize = 100; // 🚨 Sécurité pour éviter un plantage

            while (testText.scrollHeight <= zoneHeight && testText.scrollWidth <= zoneWidth && fontSize < maxFontSize) {
                fontSize += 1;
                testText.style.fontSize = `${fontSize}px`;
            }

            fontSize -= 1;
            console.log(`✅ Taille optimale trouvée pour ${mode} : ${fontSize}px`);
            zone.removeChild(testText);
            callback(`${fontSize}px`);
        }, 100);
    }

    function positionnerZonesEtElements() {
        if (recalculEnCours) return;
        recalculEnCours = true;

        const rect = img.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
            recalculEnCours = false;
            return;
        }

        const imgWidth = rect.width;
        const imgHeight = rect.height;
        let mode = detecterMode();
        console.log("Mode détecté :", mode);

        let elementsSauvegardes = {};
        document.querySelectorAll('.dropzone').forEach(zone => {
            if (zone.children.length > 0) {
                elementsSauvegardes[zone.id] = zone.innerHTML;
            }
        });

        document.querySelectorAll('.dropzone').forEach(zone => zone.remove());

        window.exerciceData.diagrammezone.forEach(zoneData => {
            const zoneDiv = document.createElement("div");
            zoneDiv.className = "dropzone";
            zoneDiv.id = zoneData.id;
            zoneDiv.style.position = "absolute";
            zoneDiv.setAttribute("data-taille", zoneData.taille);

            zoneDiv.style.top = `${zoneData.relativeTop * imgHeight}px`;
            zoneDiv.style.left = `${zoneData.relativeLeft * imgWidth}px`;
            zoneDiv.style.width = `${zoneData.relativeWidth * imgWidth}px`;
            zoneDiv.style.height = `${zoneData.relativeHeight * imgHeight}px`;

            container.appendChild(zoneDiv);

            if (elementsSauvegardes[zoneData.id]) {
                zoneDiv.innerHTML = elementsSauvegardes[zoneData.id];
            }
        });

        let zoneRef = trouverPlusPetiteGrandeZone();
        if (!zoneRef) {
            console.warn("⚠️ Impossible de trouver une zone de référence pour le test.");
            recalculEnCours = false;
            return;
        }

        calculerTailleTexteAuto(zoneRef, mode, (tailleOptimale) => {
            tailleTexteMemoire[mode] = tailleOptimale;

            document.querySelectorAll('.dropzone').forEach(zone => {
                zone.style.fontSize = tailleTexteMemoire[mode];
            });

            app.initSelectionMenu();
            recalculEnCours = false;
        });
    }

    function ajusterConteneurElements() {
        if (recalculEnCours) return;

        const mode = detecterMode();
        let zoomFactor = detecterZoom();
        console.log(`🎯 Mode détecté : ${mode}`);
        console.log(`🔍 Zoom détecté : ${zoomFactor}`);

        document.querySelectorAll('.dropzone').forEach(zone => {
            let tailleTexte = tailleTexteMemoire[mode] || "16px";
            zone.style.fontSize = `${tailleTexte}`;

            let borderSize = parseFloat(getComputedStyle(zone).borderWidth);
            if (!isNaN(borderSize)) {
                zone.style.borderWidth = `${borderSize / zoomFactor}px`;
            }
        });
    }

    function repositionnerEtAjuster() {
        let maintenant = Date.now();
        if (maintenant - dernierZoomTimestamp < 400) return;
        dernierZoomTimestamp = maintenant;

        if (recalculEnCours) return;
        positionnerZonesEtElements();
        setTimeout(() => ajusterConteneurElements(), 100);
    }

    function gererChangementOrientation() {
        let nouveauMode = detecterMode();
        if (nouveauMode === derniereOrientation) return;
        derniereOrientation = nouveauMode;
        
        console.log(`🔄 Changement de mode : ${nouveauMode}`);
        repositionnerEtAjuster();
    }

    if (img.complete) {
        attendreChargementEtPositionner();
    } else {
        img.onload = () => attendreChargementEtPositionner();
    }

    window.addEventListener("resize", repositionnerEtAjuster);
    window.addEventListener("orientationchange", gererChangementOrientation);
    window.addEventListener("DOMContentLoaded", repositionnerEtAjuster);
};
