// ✅ Vérification si l'utilisateur est sur Desktop ou Mobile
function isDesktop() {
    return !/Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

// ✅ Fonction pour attendre le chargement complet de l'image avant d'exécuter les calculs
function waitForDiagramLoad(callback) {
    const diagramImage = document.querySelector("#diagramme-container img");
    if (!diagramImage) return;

    if (diagramImage.complete) {
        callback(); // ✅ Si l'image est déjà chargée
    } else {
        diagramImage.onload = callback; // ✅ Attendre qu'elle se charge
    }
}

// ✅ Fonction qui ajuste la taille du header en fonction du zoom sur PC
function fixHeaderOnDesktop() {
    const header = document.getElementById("header-container");
    const spaceTop = document.querySelector(".space-top");
    const spaceBetween = document.querySelector(".space-between");
    const spaceBottom = document.querySelector(".space-bottom");
    const validateControls = document.getElementById("validate-controls-1");

    if (!header || !spaceTop || !spaceBetween || !spaceBottom || !validateControls) return;

    // 🔍 Détection du facteur de zoom
    let zoomFactor = window.devicePixelRatio || 1;

    // 📏 Tailles correctes à 100% de zoom
    let baseHeaderHeight = 120;  
    let baseSpaceTop = 20;       
    let baseSpaceBetween = 10;   
    let baseSpaceBottom = 20;    
    let baseValidateControls = 40; 

    // ✅ Fixation en pixels (ajustement avec le zoom pour éviter l'effet d'agrandissement)
    header.style.height = `${baseHeaderHeight / zoomFactor}px`;
    header.style.minHeight = `${baseHeaderHeight / zoomFactor}px`;
    header.style.maxHeight = `${baseHeaderHeight / zoomFactor}px`;

    spaceTop.style.height = `${baseSpaceTop / zoomFactor}px`;
    spaceBetween.style.height = `${baseSpaceBetween / zoomFactor}px`;
    spaceBottom.style.height = `${baseSpaceBottom / zoomFactor}px`;

    validateControls.style.height = `${baseValidateControls / zoomFactor}px`;

    console.log(`✅ 🖥️ PC - Tailles fixées et stabilisées`);
}


// ✅ Fonction pour ajuster la taille du conteneur du bouton et du message
function fixValidateControlsSize() {
    const validateControls = document.getElementById("validate-controls-1");
    const bouton = document.getElementById("validate-1-button");
    const message = document.getElementById("diagramme-message");

    if (!validateControls || !bouton || !message) return;

    if (isDesktop()) {
        // 🖥️ Sur PC : Fixer la taille et ajuster les espacements avec le zoom
        let zoomFactor = window.devicePixelRatio || 1;
        let baseValidateControls = 50; // ✅ Hauteur totale du conteneur
        let baseGap = 10;  // ✅ Espacement entre le bouton et le message
        let basePadding = 5; // ✅ Padding du message

        validateControls.style.height = `${baseValidateControls / zoomFactor}px`;
        validateControls.style.minHeight = `${baseValidateControls / zoomFactor}px`;
        validateControls.style.maxHeight = `${baseValidateControls / zoomFactor}px`;

        validateControls.style.gap = `${baseGap / zoomFactor}px`; // ✅ Ajuste l'espace entre le bouton et le message

        message.style.padding = `${basePadding / zoomFactor}px ${(basePadding * 2) / zoomFactor}px`; // ✅ Ajuste le padding du message

        console.log(`✅ 🖥️ PC - Validate Controls stabilisé`);
    } else {
        // 📱 Sur Mobile : Ajustement basé sur la taille du header
        const header = document.getElementById("header-container");
        if (!header) return;

        let headerHeight = header.clientHeight;
        let validateHeight = headerHeight * 0.2; // ✅ Hauteur du conteneur en fonction du header
        let mobileGap = headerHeight * 0.02;  // ✅ Espacement proportionnel
        let mobilePadding = headerHeight * 0.01; // ✅ Padding du message proportionnel

        validateControls.style.height = `${validateHeight}px`; 
        validateControls.style.minHeight = `${validateHeight}px`;
        validateControls.style.maxHeight = `${validateHeight}px`;

        validateControls.style.gap = `${mobileGap}px`; // ✅ Espacement adapté au mobile

        message.style.padding = `${mobilePadding}px ${mobilePadding * 2}px`; // ✅ Padding proportionnel au mobile

        console.log(`✅ 📱 Mobile - Validate Controls ajusté`);
    }
}

// ✅ Fonction pour fixer la taille du titre, du bouton et du message
function fixTitleAndButtonSize() {
    const titre = document.getElementById("titre-1");
    const bouton = document.getElementById("validate-1-button");
    const message = document.getElementById("diagramme-message");
    const header = document.getElementById("header-container");

    if (!titre || !bouton || !header || !message) return;

    if (isDesktop()) {
        // 🖥️ Sur PC : Fixe les tailles et ajuste avec le zoom
        let zoomFactor = window.devicePixelRatio || 1;
        let baseTitleSize = 32;
        let baseButtonSize = 24;
        let baseMessageSize = 18;

        titre.style.fontSize = `${baseTitleSize / zoomFactor}px`;
        bouton.style.fontSize = `${baseButtonSize / zoomFactor}px`;
        bouton.style.padding = `${(baseButtonSize * 0.5) / zoomFactor}px ${(baseButtonSize * 1.2) / zoomFactor}px`;
        message.style.fontSize = `${baseMessageSize / zoomFactor}px`;

        console.log(`✅ 🖥️ PC - Titre et bouton ajustés`);
    } else {
        // 📱 Sur Mobile : Géré par fixHeaderOnMobile
        fixHeaderOnMobile();
    }
}




// ✅ Fonction qui ajuste la taille du header sur Mobile (Portrait et Paysage)
function fixHeaderOnMobile() {
    const header = document.getElementById("header-container");
    const titre = document.getElementById("titre-1");
    const bouton = document.getElementById("validate-1-button");
    const message = document.getElementById("diagramme-message");
    const validateControls = document.getElementById("validate-controls-1");
    const diagrammeContainer = document.getElementById("diagramme-container");

    if (!header || !titre || !bouton || !message || !validateControls || !diagrammeContainer) return;

    // ✅ Attendre que l’image soit chargée avant de faire les calculs
    waitForDiagramLoad(() => {
        let isPortrait = window.innerHeight > window.innerWidth;
        let containerWidth = diagrammeContainer.clientWidth; // ✅ Largeur de l'image

        // 📏 Calculs basés sur la largeur de l'image
        let headerHeight, titleSize, buttonSize, spaceTop, spaceBetween, spaceBottom, validateHeight, messageSize;

        if (isPortrait) {
            // 📱 Mode Portrait
            headerHeight = containerWidth * 0.20;
            titleSize = containerWidth * 0.07;
            buttonSize = containerWidth * 0.05;
            messageSize = containerWidth * 0.04;
            spaceTop = headerHeight * 0.15;
            spaceBetween = headerHeight * 0.12;
            spaceBottom = headerHeight * 0.15;
            validateHeight = headerHeight * 0.30;
        } else {
            // 📱 Mode Paysage
            headerHeight = containerWidth * 0.12;
            titleSize = containerWidth * 0.05;
            buttonSize = containerWidth * 0.04;
            messageSize = containerWidth * 0.03;
            spaceTop = headerHeight * 0.10;
            spaceBetween = headerHeight * 0.08;
            spaceBottom = headerHeight * 0.10;
            validateHeight = headerHeight * 0.25;
        }

        // 📌 Appliquer les tailles calculées
        header.style.width = `${containerWidth}px`;
        header.style.height = `${headerHeight}px`;
        header.style.minHeight = `${headerHeight}px`;
        header.style.maxHeight = `${headerHeight}px`;
        header.style.margin = "0 auto"; // ✅ Centrage du header

        titre.style.fontSize = `${titleSize}px`;
        bouton.style.fontSize = `${buttonSize}px`;
        bouton.style.padding = `${buttonSize * 0.5}px ${buttonSize}px`;
        message.style.fontSize = `${messageSize}px`;

        document.querySelector(".space-top").style.height = `${spaceTop}px`;
        document.querySelector(".space-between").style.height = `${spaceBetween}px`;
        document.querySelector(".space-bottom").style.height = `${spaceBottom}px`;

        validateControls.style.height = `${validateHeight}px`;
        validateControls.style.display = "flex";
        validateControls.style.flexDirection = "row";
        validateControls.style.justifyContent = "center";
        validateControls.style.alignItems = "center";
        validateControls.style.gap = `${buttonSize * 0.3}px`;

        console.log(`✅ 📱 Mobile - Mode ${isPortrait ? "Portrait" : "Paysage"} ajusté avec succès.`);
    });
}




// ✅ Fonction globale pour recalculer les tailles après un zoom (Desktop) ou un changement d'orientation (Mobile)
function updateHeaderSizes() {
    if (isDesktop()) {
        fixHeaderOnDesktop();
        fixTitleAndButtonSize();
        fixValidateControlsSize();
    } else {
        fixHeaderOnMobile();
    }
}

// ✅ Ajout d'un délai pour éviter plusieurs exécutions trop rapides lors des rotations de mobile
let resizeTimeout;
function delayedUpdateHeaderSizes() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateHeaderSizes, 100);
}

// ✅ Détection des événements pour recalculer uniquement quand c’est nécessaire
window.addEventListener("DOMContentLoaded", updateHeaderSizes);
window.addEventListener("resize", () => {
    if (isDesktop()) {
        fixHeaderOnDesktop();
        fixTitleAndButtonSize();
        fixValidateControlsSize();
    } else {
        delayedUpdateHeaderSizes();
    }


});

// ✅ Mise à jour dynamique en cas de rotation de l’écran sur mobile
window.addEventListener("orientationchange", delayedUpdateHeaderSizes);