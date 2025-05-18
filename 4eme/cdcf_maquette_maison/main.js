// main.js - Initialisation de l'exercice avec la nouvelle interaction

window.app = window.app || {};

window.app.etape = 3; // ✅ Remplace "1" (string) par 1 (number)

window.app.positionsElementsTableau = {}; // Stockage des positions des éléments
window.app.reponsesAttenduesTableau2 = {};
window.app.reponsesAttenduesTableau3 = {};

function initialiserReponsesAttendues() {


    // 🔹 Initialisation des réponses attendues pour le tableau
    window.app.reponsesAttenduesTableau2 = {}; 
    window.app.reponsesAttenduesTableau3 = {}; 

    window.exerciceData.tableauElements.forEach(element => {
        let colonne = element.colonne;
        let zoneId = element.id.replace("element-", "fonction-"); // ✅ Correction ici
    
         if (colonne === 2) {
            window.app.reponsesAttenduesTableau2[zoneId] = element.nom;
        } else if (colonne === 3) {
            window.app.reponsesAttenduesTableau3[zoneId] = element.nom;
        } 
    });
    

}



// Appel de l'initialisation après le chargement des données
window.addEventListener("DOMContentLoaded", () => {
    initialiserReponsesAttendues();
});



window.addEventListener("DOMContentLoaded", () => {
    const tableauImage = document.querySelector("#tableau-container img");

    function attendreChargement(callback) {
        let tentatives = 0;
        const verifier = () => {
            const rect = tableauImage.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                callback();
            } else if (tentatives < 20) {
                tentatives++;
                requestAnimationFrame(verifier);
            }
        };
        verifier();
    }

    if (tableauImage.complete) {
        attendreChargement(demarrerExercices);
    } else {
        tableauImage.addEventListener('load', () => attendreChargement(demarrerExercices));
    }

    function demarrerExercices() {
        setTimeout(() => {
            app.setupTableau();

        }, 50);
    }
});


document.getElementById("validate-2-button").addEventListener("click", () => {
    const button = document.getElementById("validate-2-button");
    if (button.textContent === "Valider") {
        verifierReponsesTableau();
    } else {
        button.disabled = true; // 🔥 Empêche le multi-clic
        passerEtapesuivante();
    }
});


 
function mettreAJourListePositionsTableau() {
    window.app.positionsElementsTableau = {}; // Réinitialisation de la liste des positions

    document.querySelectorAll(".dropzone2").forEach(zone => {
        // 📌 Vérification de l'étape actuelle
 let etapeActuelle = parseInt(window.app.etape); // Convertir en nombre pour éviter des erreurs
 let colonneZone = parseInt(zone.getAttribute("data-colonne")); // 🔥 Prendre `data-colonne` correctement
         // ✅ Vérifier si la zone appartient à l'étape actuelle
         if (
            (etapeActuelle === 3 && colonneZone === 2) ||
            (etapeActuelle === 4 && colonneZone === 3)
        ) {    
                
        let elementPlace = zone.querySelector("span"); // On récupère l'élément placé
        if (elementPlace) {
            let nomElement = elementPlace.textContent.trim();
            let zoneId = zone.id;
                        window.app.positionsElementsTableau[zoneId] = nomElement;
        }
    }
    });

}

function verifierReponsesTableau() {
    mettreAJourListePositionsTableau();
    let etapeActuelle = parseInt(window.app.etape);

    let totalZones = 0;
    let reponsesCorrectes = 0;
    let erreurs = [];

    let reponsesAttendues = [];
    let colonneCible = "";
   if (etapeActuelle === 3) {
        reponsesAttendues = Object.values(window.app.reponsesAttenduesTableau2);
        colonneCible = ".colonne-2";
    } else if (etapeActuelle === 4) {
        reponsesAttendues = Object.values(window.app.reponsesAttenduesTableau3);
        colonneCible = ".colonne-3";
    }

    let reponsesPlacees = Object.values(window.app.positionsElementsTableau);

    totalZones = reponsesAttendues.length;



    // ✅ Comparaison des textes en respectant l'ordre exact
    for (let i = 0; i < totalZones; i++) {
        if (reponsesPlacees[i] === reponsesAttendues[i]) {
            reponsesCorrectes++;
        } else {
            erreurs.push(`❌ Mauvaise réponse à la position ${i + 1}. Attendu : "${reponsesAttendues[i]}", trouvé : "${reponsesPlacees[i] || 'Aucune réponse'}".`);
        }
    }

    // 🔹 Affichage du message selon le résultat
    let message = document.getElementById("tableau-message");
    let boutonValidation = document.getElementById("validate-2-button");

    if (reponsesCorrectes === totalZones) {
        message.textContent = "✅ Bravo ! Toutes les réponses sont correctes.";
        message.style.color = "green";

        // 🔹 Transformation du bouton "Valider" en "Suivant"
        
        boutonValidation.textContent = "Suivant";
        if (window.app.etape === 4) {
            boutonValidation.style.display = "none";
            message.textContent = "Exercice terminé ! Vous pouvez corriger le tableau de votre feuille !";
            message.style.color = "black";
        }
        bloquerColonnesTableau();
// 🔹 Désactiver uniquement les zones de la colonne concernée
if (colonneCible) {
    document.querySelectorAll(`.dropzone2${colonneCible}`).forEach(zone => {
        zone.style.border = "none";
        zone.style.backgroundColor = "transparent";
        zone.style.pointerEvents = "none";
    });
}

    } else if (reponsesPlacees.length < totalZones) {
        message.textContent = `⚠️ Il manque ${totalZones - reponsesPlacees.length} réponses à placer.`;
        message.style.color = "orange";
    } else {
        message.textContent = `❌ Certaines réponses sont incorrectes. Vous avez ${reponsesCorrectes} bonnes réponses sur ${totalZones}.`;
        message.style.color = "red";
    }

}



function passerEtapesuivante() {

    // ✅ Bloquer toute nouvelle action si l'étape est déjà en cours
    if (window.app.etapeEnCours) {
        return;
    }
    window.app.etapeEnCours = true; // 🔥 Empêche les appels multiples
    
// ✅ Vérifier si on ne dépasse pas l’étape 5
if (window.app.etape >= 5) {
    window.app.etapeEnCours = false;
    return;
}


    // ✅ Incrémentation de l’étape
    window.app.etape += 1;
    

// ✅ Remise des boutons "Valider" pour éviter un blocage


document.getElementById("validate-controls-2").style.display = "flex";

document.getElementById("validate-2-button").textContent = "Valider";
document.getElementById("validate-2-button").disabled = false;

// ✅ Si on passe à l'étape 5, bloquer la colonne 3 et masquer le bouton
if (window.app.etape === 5) {
    document.querySelectorAll('.dropzone2[data-colonne="3"]').forEach(zone => {
        zone.style.backgroundColor = "rgba(200, 200, 200, 0.7)"; 
        zone.style.pointerEvents = "none"; 
        zone.style.opacity = "1"; 
    });

    // ✅ Cacher le bouton de validation
    document.getElementById("validate-2-button").style.display = "none";
}


    // ✅ Mise à jour du message affiché
    const message2 = document.getElementById("tableau-message");
    
    if (message2) {
        if (window.app.etape === 3) {
            message2.textContent = "Complétez les critères du tableau !";
            message2.style.color = "black";
        } else if (window.app.etape === 4) {
            message2.textContent = "Complétez les niveaux du tableau !";
            message2.style.color = "black";
        } else if (window.app.etape === 5) {
            message2.textContent = "Exercice terminé ! Vous pouvez recopier les 2 parties sur une feuille !";
            message2.style.color = "black";
        }
    }
    


    // ✅ Afficher uniquement les zones de la colonne correspondant à l'étape
    app.setupTableau();

    // 🔄 **Ajoute cette ligne à la fin pour débloquer l'étape suivante**
    setTimeout(() => {
        window.app.etapeEnCours = false; // 🔄 Permet d'avancer à la prochaine étape
    }, 50); // Un léger délai pour éviter un enchaînement trop rapide    
    

}


