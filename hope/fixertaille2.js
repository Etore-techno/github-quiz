// ✅ Vérification si l'utilisateur est sur Desktop ou Mobile
function isDesktop() {
    return !/Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

// ✅ Variables globales pour éviter les recalculs inutiles en Mobile

// 📌 Variables de stockage des tailles fixes en Mobile (Portrait & Paysage)
let header2WidthPortrait, header2HeightPortrait, spaceTop2HeightPortrait, spaceBetween2HeightPortrait, spaceBottom2HeightPortrait;
let title2HeightPortrait, validateControls2HeightPortrait, title2FontSizePortrait, button2WidthPortrait, button2FontSizePortrait, message2FontSizePortrait;

let header2WidthLandscape, header2HeightLandscape, spaceTop2HeightLandscape, spaceBetween2HeightLandscape, spaceBottom2HeightLandscape;
let title2HeightLandscape, validateControls2HeightLandscape, title2FontSizeLandscape, button2WidthLandscape, button2FontSizeLandscape, message2FontSizeLandscape;



// ✅ Fonction pour attendre le chargement complet de l'image avant d'exécuter les calculs
function waitForTableauLoad(callback) {
    const tableauImage = document.querySelector("#tableau-container img");
    if (!tableauImage) return;

    if (tableauImage.complete) {
        setTimeout(callback, 50); // 🔹 Petit délai pour garantir que tout est chargé
    } else {
        tableauImage.onload = () => setTimeout(callback, 50);
    }
}

// ✅ Fonction qui ajuste la taille du header en fonction du zoom sur PC
function fixHeader2OnDesktop() {
    const header2 = document.getElementById("header-container2");
    const spaceTop2 = document.querySelector(".space-top2");
    const spaceBetween2 = document.querySelector(".space-between2");
    const spaceBottom2 = document.querySelector(".space-bottom2");
    const validateControls2 = document.getElementById("validate-controls-2");
    const tableauContainer = document.getElementById("tableau-container");


    if (!header2 || !spaceTop2 || !spaceBetween2 || !spaceBottom2 || !tableauContainer || !validateControls2) return;

    // 🔍 Détection du facteur de zoom
    let zoomFactor = window.devicePixelRatio || 1;

    // 📏 Tailles correctes à 100% de zoom
    let containerWidth = tableauContainer.clientWidth;

    let baseHeaderHeight = 120;  
    let baseSpaceTop = 15;       
    let baseSpaceBetween = 10;   
    let baseSpaceBottom = 15;    
    let baseValidateControls = 40; 

    // ✅ Fixation en pixels (ajustement avec le zoom pour éviter l'effet d'agrandissement)
    header2.style.width = `${containerWidth}px`;

    header2.style.height = `${baseHeaderHeight / zoomFactor}px`;
    header2.style.minHeight = `${baseHeaderHeight / zoomFactor}px`;
    header2.style.maxHeight = `${baseHeaderHeight / zoomFactor}px`;

    header2.style.margin = "0 auto";
    header2.style.position = "relative";

    spaceTop2.style.height = `${baseSpaceTop / zoomFactor}px`;
    spaceBetween2.style.height = `${baseSpaceBetween / zoomFactor}px`;
    spaceBottom2.style.height = `${baseSpaceBottom / zoomFactor}px`;

    validateControls2.style.height = `${baseValidateControls / zoomFactor}px`;

    console.log(`✅ 🖥️ PC - Tailles fixées et stabilisées`);
}

// ✅ Fonction pour desktop pour ajuster la taille du conteneur du bouton et du message
function fixValidateControlsSize2() {
    const validateControls2 = document.getElementById("validate-controls-2");
    const bouton2 = document.getElementById("validate-2-button");
    const message2 = document.getElementById("tableau-message");

    if (!validateControls2 || !bouton2 || !message2) return;

    if (isDesktop()) {
        // 🖥️ Sur PC : Fixer la taille et ajuster les espacements avec le zoom
        let zoomFactor = window.devicePixelRatio || 1;
        let baseValidateControls = 50;
        let baseGap = 10;
        let basePadding = 5;

        validateControls2.style.height = `${baseValidateControls / zoomFactor}px`;
        validateControls2.style.minHeight = `${baseValidateControls / zoomFactor}px`;
        validateControls2.style.maxHeight = `${baseValidateControls / zoomFactor}px`;

        validateControls2.style.gap = `${baseGap / zoomFactor}px`; 
        message2.style.padding = `${basePadding / zoomFactor}px ${(basePadding * 2) / zoomFactor}px`;

        console.log(`✅ 🖥️ PC - Validate Controls stabilisé`);
    } else {
        // 📱 Sur Mobile : Ajustement basé sur la taille du header
        const header2 = document.getElementById("header-container2");
        if (!header2) return;

        let headerHeight = header2.clientHeight;
        let validateHeight = headerHeight * 0.2;
        let mobileGap = headerHeight * 0.02;
        let mobilePadding = headerHeight * 0.01;

        validateControls2.style.height = `${validateHeight}px`; 
        validateControls2.style.minHeight = `${validateHeight}px`;
        validateControls2.style.maxHeight = `${validateHeight}px`;

        validateControls2.style.gap = `${mobileGap}px`;
        message2.style.padding = `${mobilePadding}px ${mobilePadding * 2}px`;

        console.log(`✅ 📱 Mobile - Validate Controls ajusté`);
    }
}

// ✅ Fonction pour desktop fixer la taille du titre, du bouton et du message
function fixTitleAndButtonSize2() {
    const titre2 = document.getElementById("titre-2");
    const bouton2 = document.getElementById("validate-2-button");
    const message2 = document.getElementById("tableau-message");
    const header2 = document.getElementById("header-container2");

    if (!titre2 || !bouton2 || !header2 || !message2) return;

    if (isDesktop()) {
        // 🖥️ Sur PC : Fixe les tailles et ajuste avec le zoom
        let zoomFactor = window.devicePixelRatio || 1;
        let baseTitleSize = 32;
        let baseButtonSize = 24;
        let baseMessageSize = 18;

        titre2.style.fontSize = `${baseTitleSize / zoomFactor}px`;
        bouton2.style.fontSize = `${baseButtonSize / zoomFactor}px`;
        bouton2.style.padding = `${(baseButtonSize * 0.5) / zoomFactor}px ${(baseButtonSize * 1.2) / zoomFactor}px`;
        message2.style.fontSize = `${baseMessageSize / zoomFactor}px`;

        console.log(`✅ 🖥️ PC - Titre et bouton ajustés`);
    } else {
        fixHeaderOnMobile2();
    }
}

// ✅ Fonction pour Mobile pour calculer la taille maximale du titre avant de le fixer
function calculateTitleFontSize2(containerWidth2) {
    let testDiv = document.createElement("div");
    testDiv.style.position = "absolute";
    testDiv.style.visibility = "hidden";
    testDiv.style.width = `${containerWidth2 * 0.85}px`; // 🔹 Laisser une marge de 7.5% de chaque côté
    testDiv.style.whiteSpace = "nowrap";
    testDiv.style.fontWeight = "bold";  // ✅ Simulation de la vraie mise en page
    testDiv.innerText = "2. Tableau de caractérisation :";  // ✅ Contenu réel
    document.body.appendChild(testDiv);

    let zoomFactor = window.devicePixelRatio || 1; // 🔍 Correction du facteur de zoom
    let fontSize = (containerWidth2 * 0.12) / zoomFactor; // 🔥 Départ avec 12% de la largeur ajustée
    
    testDiv.style.fontSize = `${fontSize}px`;

    // 🔹 Boucle pour réduire la taille si nécessaire
    while (testDiv.getBoundingClientRect().width > containerWidth2 * 0.9) {
        fontSize -= 1;
        testDiv.style.fontSize = `${fontSize}px`;
        if (fontSize < 14) break; // 🔒 Éviter une taille trop petite
    }

    document.body.removeChild(testDiv);
    console.log(`📏 Taille optimale du titre calculée : ${fontSize}px`);

    return fontSize;
}


// ✅ Fonction qui ajuste la taille du header sur Mobile (Portrait et Paysage)
function fixHeaderOnMobile2() {
    const header2 = document.getElementById("header-container2");
    const titre2 = document.getElementById("titre-2");
    const bouton2 = document.getElementById("validate-2-button");
    const message2 = document.getElementById("tableau-message");
    const validateControls2 = document.getElementById("validate-controls-2");
    const tableauContainer = document.getElementById("tableau-container");

    if (!header2 || !titre2 || !bouton2 || !message2 || !validateControls2 || !tableauContainer) return;

    waitForDiagramLoad(() => {
        let isPortrait = window.innerHeight > window.innerWidth;
        let containerWidth2 = tableauContainer.clientWidth;
        let containerHeight2 = tableauContainer.clientHeight;

        console.log(`📏 📱 Mode: ${isPortrait ? "Portrait" : "Paysage"}`);

        if (isPortrait && mobilePortraitCalculated) {
            console.log(`🔄 📱 Mode Portrait déjà calculé, réattribution des valeurs.`);
        } else if (!isPortrait && mobileLandscapeCalculated) {
            console.log(`🔄 📱 Mode Paysage déjà calculé, réattribution des valeurs.`);
        } else {
            console.log(`🆕 📱 Calcul des valeurs fixes pour le mode ${isPortrait ? "Portrait" : "Paysage"}`);
            setTimeout(() => {
                console.log(`📌 Taille de l'image du diagramme: ${containerWidth2}px x ${containerHeight2}px`);

                let headerWidth = containerWidth2;
                let headerHeight = containerHeight2 / 7;

                let spaceTopHeight = headerHeight * 0.12;
                let spaceBetweenHeight = headerHeight * 0.1;
                let spaceBottomHeight = headerHeight * 0.12;

                let titleHeight = headerHeight * 0.32;
                let validateControlsHeight = headerHeight * 0.32;

                let titleFontSize = calculateTitleFontSize(containerWidth2);
                let buttonWidth = headerWidth * 0.2;
                let buttonFontSize = titleFontSize / 1.2;
                let messageFontSize = titleFontSize / 1.2;

                if (isPortrait) {
                    header2WidthPortrait = headerWidth;
                    header2HeightPortrait = headerHeight;

                    spaceTop2HeightPortrait = spaceTopHeight;
                    spaceBetween2HeightPortrait = spaceBetweenHeight;
                    spaceBottom2HeightPortrait = spaceBottomHeight;

                    title2HeightPortrait = titleHeight;
                    validateControls2HeightPortrait = validateControlsHeight;
                    title2FontSizePortrait = titleFontSize;
                    button2WidthPortrait = buttonWidth;
                    button2FontSizePortrait = buttonFontSize;
                    message2FontSizePortrait = messageFontSize;
                    mobilePortraitCalculated = true;
                } else {
                    header2WidthLandscape = headerWidth;
                    header2HeightLandscape = headerHeight;
                    spaceTop2HeightLandscape = spaceTopHeight;
                    spaceBetween2HeightLandscape = spaceBetweenHeight;
                    spaceBottom2HeightLandscape = spaceBottomHeight;

                    title2HeightLandscape = titleHeight;
                    validateControls2HeightLandscape = validateControlsHeight;
                    title2FontSizeLandscape = titleFontSize;
                    button2WidthLandscape = buttonWidth;
                    button2FontSizeLandscape = buttonFontSize;
                    message2FontSizeLandscape = messageFontSize;
                    mobileLandscapeCalculated = true;
                }

                console.log(`✅ 📱 Phase 1 : Tailles calculées pour ${isPortrait ? "Portrait" : "Paysage"}`);
            })}
                // Phase 2 : Appliquer les tailles calculées (après délai)
                setTimeout(() => {
                    let headerWidth = isPortrait ? header2WidthPortrait : header2WidthLandscape;
                    let headerHeight = isPortrait ? header2HeightPortrait : header2HeightLandscape;
                    let spaceTopHeight = isPortrait ? spaceTop2HeightPortrait : spaceTop2HeightLandscape;
                    let spaceBetweenHeight = isPortrait ? spaceBetween2HeightPortrait : spaceBetween2HeightLandscape;
                    let spaceBottomHeight = isPortrait ? spaceBottom2HeightPortrait : spaceBottom2HeightLandscape;
                    let titleHeight = isPortrait ? title2HeightPortrait : title2HeightLandscape;
                    let validateControlsHeight = isPortrait ? validateControls2HeightPortrait : validateControls2HeightLandscape;
                    let titleFontSize = isPortrait ? title2FontSizePortrait : title2FontSizeLandscape;
                    let buttonWidth = isPortrait ? button2WidthPortrait : button2WidthLandscape;
                    let buttonFontSize = isPortrait ? button2FontSizePortrait : button2FontSizeLandscape;
                    let messageFontSize = isPortrait ? message2FontSizePortrait : message2FontSizeLandscape;

                    header2.style.width = `${headerWidth}px`;
                    header2.style.height = `${headerHeight}px`;
                    header2.style.margin = "0 auto";
                    header2.style.position = "relative";

                    console.log(`✅ 📱 Phase 2 : Header positionné`);

                    // Phase 3 : Positionner les espaces et le titre (après délai)
                    setTimeout(() => {
                        document.querySelector(".space-top2").style.height = `${spaceTopHeight}px`;
                        document.querySelector(".space-between2").style.height = `${spaceBetweenHeight}px`;
                        document.querySelector(".space-bottom2").style.height = `${spaceBottomHeight}px`;

                        titre2.style.height = `${titleHeight}px`;
                        titre2.style.fontSize = `${titleFontSize}px`;

                        console.log(`✅ 📱 Phase 3 : Espaces et titre positionnés`);

                        // Phase 4 : Positionner le bouton et le message (après délai)
                        setTimeout(() => {
                            validateControls2.style.height = `${validateControlsHeight}px`;
                            validateControls2.style.display = "flex";
                            validateControls2.style.justifyContent = "flex-start";
                            validateControls2.style.alignItems = "center";
                            validateControls2.style.gap = `${buttonWidth * 0.5}px`;

                            bouton2.style.width = `${buttonWidth}px`;
                            bouton2.style.fontSize = `${buttonFontSize}px`;
                            bouton2.style.marginLeft = "0px";

                            message2.style.fontSize = `${messageFontSize}px`;

                            console.log(`✅ 📱 Phase 4 : Bouton et message positionnés`);
                            console.log(`✅ 📱 Mobile - Mode ${isPortrait ? "Portrait" : "Paysage"} ajusté avec succès.`);
                        }, 2000);
                    }, 2000);
                }, 2000);
            }, 2000);
        }

// ✅ Fonction globale pour recalculer les tailles après un zoom (Desktop) ou un changement d'orientation (Mobile)
function updateHeaderSizes2() {
    if (isDesktop()) {
        fixHeader2OnDesktop();
        fixTitleAndButtonSize2();
        fixValidateControlsSize2();
    } else {
        fixHeaderOnMobile2();
    }
}

// ✅ Ajout d'un délai pour éviter plusieurs exécutions trop rapides lors des rotations de mobile
function delayedUpdateHeaderSizes2() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateHeaderSizes2, 100);
}

// ✅ Détection des événements pour recalculer uniquement quand c’est nécessaire
window.addEventListener("DOMContentLoaded", updateHeaderSizes2);
window.addEventListener("resize", () => {
    if (isDesktop()) {
        fixHeader2OnDesktop();
        fixTitleAndButtonSize2();
        fixValidateControlsSize2();
    } else {
        delayedUpdateHeaderSizes2();
    }
});
window.addEventListener("orientationchange", delayedUpdateHeaderSizes2);
