// ✅ Vérification si l'utilisateur est sur Desktop ou Mobile
function isDesktop() {
    return !/Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

// ✅ Variables globales pour éviter les recalculs inutiles en Mobile
let mobilePortraitCalculated = false;
let mobileLandscapeCalculated = false;

// 📌 Variables de stockage des tailles fixes en Mobile (Portrait & Paysage)
let headerWidthPortrait, headerHeightPortrait, spaceTopHeightPortrait, spaceBetweenHeightPortrait, spaceBottomHeightPortrait;
let titleHeightPortrait, validateControlsHeightPortrait, titleFontSizePortrait, buttonWidthPortrait, buttonFontSizePortrait, messageFontSizePortrait;

let headerWidthLandscape, headerHeightLandscape, spaceTopHeightLandscape, spaceBetweenHeightLandscape, spaceBottomHeightLandscape;
let titleHeightLandscape, validateControlsHeightLandscape, titleFontSizeLandscape, buttonWidthLandscape, buttonFontSizeLandscape, messageFontSizeLandscape;



// ✅ Fonction pour attendre le chargement complet de l'image avant d'exécuter les calculs
function waitForDiagramLoad(callback) {
    const diagramImage = document.querySelector("#diagramme-container img");
    if (!diagramImage) return;

    if (diagramImage.complete) {
        setTimeout(callback, 50); // 🔹 Petit délai pour garantir que tout est chargé
    } else {
        diagramImage.onload = () => setTimeout(callback, 50);
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
        let baseValidateControls = 50;
        let baseGap = 10;
        let basePadding = 5;

        validateControls.style.height = `${baseValidateControls / zoomFactor}px`;
        validateControls.style.minHeight = `${baseValidateControls / zoomFactor}px`;
        validateControls.style.maxHeight = `${baseValidateControls / zoomFactor}px`;

        validateControls.style.gap = `${baseGap / zoomFactor}px`; 
        message.style.padding = `${basePadding / zoomFactor}px ${(basePadding * 2) / zoomFactor}px`;

        console.log(`✅ 🖥️ PC - Validate Controls stabilisé`);
    } else {
        // 📱 Sur Mobile : Ajustement basé sur la taille du header
        const header = document.getElementById("header-container");
        if (!header) return;

        let headerHeight = header.clientHeight;
        let validateHeight = headerHeight * 0.2;
        let mobileGap = headerHeight * 0.02;
        let mobilePadding = headerHeight * 0.01;

        validateControls.style.height = `${validateHeight}px`; 
        validateControls.style.minHeight = `${validateHeight}px`;
        validateControls.style.maxHeight = `${validateHeight}px`;

        validateControls.style.gap = `${mobileGap}px`;
        message.style.padding = `${mobilePadding}px ${mobilePadding * 2}px`;

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
        fixHeaderOnMobile();
    }
}

// ✅ Fonction pour calculer la taille maximale du titre avant de le fixer
function calculateTitleFontSize(containerWidth) {
    let testDiv = document.createElement("div");
    testDiv.style.position = "absolute";
    testDiv.style.visibility = "hidden";
    testDiv.style.width = `${containerWidth * 0.85}px`; // 🔹 Laisser une marge de 7.5% de chaque côté
    testDiv.style.whiteSpace = "nowrap";
    testDiv.style.fontWeight = "bold";  // ✅ Simulation de la vraie mise en page
    testDiv.innerText = "1. Diagramme des interactions :";  // ✅ Contenu réel
    document.body.appendChild(testDiv);

    let fontSize = containerWidth * 0.1; // 🔥 Augmentation de la taille de départ (10% de la largeur)
    testDiv.style.fontSize = `${fontSize}px`;

    // 🔹 Boucle pour réduire la taille si nécessaire
    while (testDiv.getBoundingClientRect().width > containerWidth * 0.85) {
        fontSize -= 1;
        testDiv.style.fontSize = `${fontSize}px`;
        if (fontSize < 12) break; // 🔒 Éviter une taille trop petite
    }

    document.body.removeChild(testDiv);
    console.log(`📏 Taille optimale du titre calculée : ${fontSize}px`);

    return fontSize;
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

    waitForDiagramLoad(() => {
        let isPortrait = window.innerHeight > window.innerWidth;
        let containerWidth = diagrammeContainer.clientWidth;
        let containerHeight = diagrammeContainer.clientHeight;

        console.log(`📏 📱 Mode: ${isPortrait ? "Portrait" : "Paysage"}`);

        if (isPortrait && mobilePortraitCalculated) {
            console.log(`🔄 📱 Mode Portrait déjà calculé, réattribution des valeurs.`);
        } else if (!isPortrait && mobileLandscapeCalculated) {
            console.log(`🔄 📱 Mode Paysage déjà calculé, réattribution des valeurs.`);
        } else {
            console.log(`🆕 📱 Calcul des valeurs fixes pour le mode ${isPortrait ? "Portrait" : "Paysage"}`);
            setTimeout(() => {
                console.log(`📌 Taille de l'image du diagramme: ${containerWidth}px x ${containerHeight}px`);

                let headerWidth = containerWidth;
                let headerHeight = containerHeight / 4;

                let spaceTopHeight = headerHeight * 0.16;
                let spaceBetweenHeight = headerHeight * 0.08;
                let spaceBottomHeight = headerHeight * 0.16;

                let titleHeight = headerHeight * 0.25;
                let validateControlsHeight = headerHeight * 0.35;

                let titleFontSize = calculateTitleFontSize(containerWidth);
                let buttonWidth = headerWidth * 0.15;
                let buttonFontSize = titleFontSize / 1.5;
                let messageFontSize = titleFontSize / 1.5;

                if (isPortrait) {
                    headerWidthPortrait = headerWidth;
                    headerHeightPortrait = headerHeight;

                    spaceTopHeightPortrait = spaceTopHeight;
                    spaceBetweenHeightPortrait = spaceBetweenHeight;
                    spaceBottomHeightPortrait = spaceBottomHeight;

                    titleHeightPortrait = titleHeight;
                    validateControlsHeightPortrait = validateControlsHeight;
                    titleFontSizePortrait = titleFontSize;
                    buttonWidthPortrait = buttonWidth;
                    buttonFontSizePortrait = buttonFontSize;
                    messageFontSizePortrait = messageFontSize;
                    mobilePortraitCalculated = true;
                } else {
                    headerWidthLandscape = headerWidth;
                    headerHeightLandscape = headerHeight;
                    spaceTopHeightLandscape = spaceTopHeight;
                    spaceBetweenHeightLandscape = spaceBetweenHeight;
                    spaceBottomHeightLandscape = spaceBottomHeight;

                    titleHeightLandscape = titleHeight;
                    validateControlsHeightLandscape = validateControlsHeight;
                    titleFontSizeLandscape = titleFontSize;
                    buttonWidthLandscape = buttonWidth;
                    buttonFontSizeLandscape = buttonFontSize;
                    messageFontSizeLandscape = messageFontSize;
                    mobileLandscapeCalculated = true;
                }

                console.log(`✅ 📱 Phase 1 : Tailles calculées pour ${isPortrait ? "Portrait" : "Paysage"}`);
            })}
                // Phase 2 : Appliquer les tailles calculées (après délai)
                setTimeout(() => {
                    let headerWidth = isPortrait ? headerWidthPortrait : headerWidthLandscape;
                    let headerHeight = isPortrait ? headerHeightPortrait : headerHeightLandscape;
                    let spaceTopHeight = isPortrait ? spaceTopHeightPortrait : spaceTopHeightLandscape;
                    let spaceBetweenHeight = isPortrait ? spaceBetweenHeightPortrait : spaceBetweenHeightLandscape;
                    let spaceBottomHeight = isPortrait ? spaceBottomHeightPortrait : spaceBottomHeightLandscape;
                    let titleHeight = isPortrait ? titleHeightPortrait : titleHeightLandscape;
                    let validateControlsHeight = isPortrait ? validateControlsHeightPortrait : validateControlsHeightLandscape;
                    let titleFontSize = isPortrait ? titleFontSizePortrait : titleFontSizeLandscape;
                    let buttonWidth = isPortrait ? buttonWidthPortrait : buttonWidthLandscape;
                    let buttonFontSize = isPortrait ? buttonFontSizePortrait : buttonFontSizeLandscape;
                    let messageFontSize = isPortrait ? messageFontSizePortrait : messageFontSizeLandscape;

                    header.style.width = `${headerWidth}px`;
                    header.style.height = `${headerHeight}px`;
                    header.style.margin = "0 auto";
                    header.style.position = "relative";

                    console.log(`✅ 📱 Phase 2 : Header positionné`);

                    // Phase 3 : Positionner les espaces et le titre (après délai)
                    setTimeout(() => {
                        document.querySelector(".space-top").style.height = `${spaceTopHeight}px`;
                        document.querySelector(".space-between").style.height = `${spaceBetweenHeight}px`;
                        document.querySelector(".space-bottom").style.height = `${spaceBottomHeight}px`;

                        titre.style.height = `${titleHeight}px`;
                        titre.style.fontSize = `${titleFontSize}px`;

                        console.log(`✅ 📱 Phase 3 : Espaces et titre positionnés`);

                        // Phase 4 : Positionner le bouton et le message (après délai)
                        setTimeout(() => {
                            validateControls.style.height = `${validateControlsHeight}px`;
                            validateControls.style.display = "flex";
                            validateControls.style.justifyContent = "flex-start";
                            validateControls.style.alignItems = "center";
                            validateControls.style.gap = `${buttonWidth * 0.5}px`;

                            bouton.style.width = `${buttonWidth}px`;
                            bouton.style.fontSize = `${buttonFontSize}px`;
                            bouton.style.marginLeft = "0px";

                            message.style.fontSize = `${messageFontSize}px`;

                            console.log(`✅ 📱 Phase 4 : Bouton et message positionnés`);
                            console.log(`✅ 📱 Mobile - Mode ${isPortrait ? "Portrait" : "Paysage"} ajusté avec succès.`);
                        }, 2000);
                    }, 2000);
                }, 2000);
            }, 2000);
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
window.addEventListener("orientationchange", delayedUpdateHeaderSizes);
