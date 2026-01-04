function detecterMode() {
    const largeur = window.innerWidth;
    const hauteur = window.innerHeight;
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent); // ✅ Vérifie si c'est un mobile
    if (isMobile) {
        return hauteur > largeur ? "portrait" : "landscape"; // 📌 Portrait ou Paysage pour mobiles
    } else {
        return "desktop"; // ✅ Par défaut, tout le reste est Desktop
    }
}

function calculerTailles() { 
    const mode = detecterMode();

    const header = document.querySelectorAll(".header");
    const spaceTop = document.querySelectorAll(".space-top");
    const spaceBetween = document.querySelectorAll(".space-between");
    const spaceBottom = document.querySelectorAll(".space-bottom");
    const titre = document.querySelectorAll(".titre");
    const bouton = document.querySelectorAll(".bouton-valider");
    const message = document.querySelectorAll(".message");
    const identityTitle = document.querySelectorAll(".identity-title");
    const identityLabel = document.querySelectorAll(".identity-label");
    const identityInput = document.querySelectorAll(".identity-input");
    const identityMessage = document.querySelectorAll(".identity-message");

    // ✅ Fonction pour appliquer le style à plusieurs éléments
    function appliquerStyle(elements, property, value) {
        elements.forEach(element => {
            element.style[property] = value;
        });
    }

    if (mode === "portrait") {
        appliquerStyle(header, "width", "100vw");
        appliquerStyle(spaceTop, "fontSize", "2vw");
        appliquerStyle(spaceBetween, "fontSize", "2vw");
        appliquerStyle(spaceBottom, "fontSize", "2vw");
        appliquerStyle(titre, "fontSize", "5vw");
        appliquerStyle(message, "fontSize", "2.8vw");

        // 🔥 Appliquer tous les styles d’un coup à chaque bouton
        bouton.forEach(btn => {
            btn.style.fontSize = "3.6vw";
            btn.style.borderRadius = "2vw";
            btn.style.padding = "1vw 2vw";
            btn.style.margin = "1vw";
        });

        appliquerStyle(identityTitle, "fontSize", "4vw");
        appliquerStyle(identityLabel, "fontSize", "2.8vw");
        appliquerStyle(identityInput, "fontSize", "2.8vw");
        appliquerStyle(identityMessage, "fontSize", "2.6vw");

    } else { 
        appliquerStyle(header, "width", "50vw");
        appliquerStyle(spaceTop, "fontSize", "1vw");
        appliquerStyle(spaceBetween, "fontSize", "1vw");
        appliquerStyle(spaceBottom, "fontSize", "1vw");
        appliquerStyle(titre, "fontSize", "2.5vw");
        appliquerStyle(message, "fontSize", "1.4vw");

        // 🔥 Appliquer tous les styles d’un coup à chaque bouton
        bouton.forEach(btn => {
            btn.style.fontSize = "1.8vw";
            btn.style.borderRadius = "1vw";
            btn.style.padding = "0.5vw 1vw";
            btn.style.margin = "0.5vw";
        });

        appliquerStyle(identityTitle, "fontSize", "2vw");
        appliquerStyle(identityLabel, "fontSize", "1.4vw");
        appliquerStyle(identityInput, "fontSize", "1.4vw");
        appliquerStyle(identityMessage, "fontSize", "1.3vw");
    }
}

// ✅ Détection des événements pour recalculer uniquement quand c’est nécessaire
window.addEventListener("DOMContentLoaded", calculerTailles);
window.addEventListener("resize", calculerTailles);
window.addEventListener("orientationchange", calculerTailles);
