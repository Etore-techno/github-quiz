function fixHeaderHeight() {
    const header = document.getElementById("header-container");
    const spaceTop = document.querySelector(".space-top");
    const spaceBetween = document.querySelector(".space-between");
    const spaceBottom = document.querySelector(".space-bottom");
    const validateControls = document.getElementById("validate-controls-1");

    if (!header || !spaceTop || !spaceBetween || !spaceBottom || !validateControls) return;

    // 🔍 Détection du facteur de zoom
    let zoomFactor = window.devicePixelRatio || 1;

    // 📏 Base des tailles correctes à 100% de zoom
    let baseHeaderHeight = 100;  
    let baseSpaceTop = 20;       
    let baseSpaceBetween = 10;   
    let baseSpaceBottom = 20;    
    let baseValidateControls = 40; 

    // ✅ Correction dynamique en fonction du zoom
    header.style.height = `${baseHeaderHeight / zoomFactor}px`;
    header.style.minHeight = `${baseHeaderHeight / zoomFactor}px`;
    header.style.maxHeight = `${baseHeaderHeight / zoomFactor}px`;

    spaceTop.style.height = `${baseSpaceTop / zoomFactor}px`;
    spaceBetween.style.height = `${baseSpaceBetween / zoomFactor}px`;
    spaceBottom.style.height = `${baseSpaceBottom / zoomFactor}px`;

    validateControls.style.height = `${baseValidateControls / zoomFactor}px`;
    validateControls.style.minHeight = `${baseValidateControls / zoomFactor}px`;
    validateControls.style.maxHeight = `${baseValidateControls / zoomFactor}px`;

    console.log(`✅ Hauteur du header et des espaces fixée pour zoom x${zoomFactor.toFixed(2)}`);
    console.log(`🟢 Space-Top: ${spaceTop.style.height}, 🔵 Space-Between: ${spaceBetween.style.height}, 🟡 Space-Bottom: ${spaceBottom.style.height}`);
    console.log(`🟠 Validate Controls: ${validateControls.style.height}`);
}

// ✅ Fixe la taille du titre et du bouton
function fixTitleAndButtonSize() {
    const titre = document.getElementById("titre-1");
    const bouton = document.getElementById("validate-1-button");
    const header = document.getElementById("header-container");

    if (!titre || !bouton || !header) return;

    let baseSize = Math.min(window.innerWidth, window.innerHeight) / 100;

    // ✅ Garder des tailles proportionnelles mais stables
    titre.style.fontSize = `${4 * baseSize}px`;
    bouton.style.fontSize = `${3 * baseSize}px`;
    bouton.style.padding = `${1.5 * baseSize}px ${3 * baseSize}px`;

    // ✅ Fixe la hauteur du container
    header.style.height = `${12 * baseSize}px`;

    console.log("✅ Taille recalculée et position corrigée !");
}

// ✅ Vérifie les tailles lors du zoom ou redimensionnement
function checkHeaderSizes() {
    const header = document.getElementById("header-container");
    const spaceTop = document.querySelector(".space-top");
    const spaceBetween = document.querySelector(".space-between");
    const spaceBottom = document.querySelector(".space-bottom");

    console.log(`📏 Header: ${header.offsetHeight}px`);
    console.log(`🟢 Space-Top: ${spaceTop.offsetHeight}px`);
    console.log(`🔵 Space-Between: ${spaceBetween.offsetHeight}px`);
    console.log(`🟡 Space-Bottom: ${spaceBottom.offsetHeight}px`);
}

// 🔄 Appliquer les corrections lors des événements
window.addEventListener("resize", fixHeaderHeight);
window.addEventListener("DOMContentLoaded", fixHeaderHeight);
window.addEventListener("orientationchange", fixHeaderHeight);

window.addEventListener("resize", fixTitleAndButtonSize);
window.addEventListener("DOMContentLoaded", fixTitleAndButtonSize);
window.addEventListener("orientationchange", fixTitleAndButtonSize);

window.addEventListener("resize", checkHeaderSizes);
window.addEventListener("DOMContentLoaded", checkHeaderSizes);
window.addEventListener("orientationchange", checkHeaderSizes);
