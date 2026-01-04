// main.js — Activité CdCF (Enceinte) + identité + scoring + envoi Google Sheets
// Basé sur ton main.js d’origine (zones/menu inchangés) + ajout des fonctionnalités identiques à l’activité "tondeuse"

window.app = window.app || {};

// =========================
// ✅ Réglage Google Sheets (URL du WebApp Apps Script /exec)
// =========================
window.app.SHEETS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbz0Yedh_JWCbIfBYn281UCrZu6dyVtrhjyv40B3cxRUh7QRfL81xMHkiyKWxP0bnmqC2A/exec";

// =========================
// ✅ Etat global
// =========================
window.app.etape = 1;                 // 1 diagramme, 2/3/4 tableau colonnes, 5 fin
window.app.etapeEnCours = false;      // anti multi-clic
window.app.identityConfirmed = false; // activité déverrouillée après confirmation
window.app.resultSent = false;        // score déjà envoyé

window.app.positionsElementsDiagramme = {};
window.app.reponsesAttenduesDiagramme = {};

window.app.positionsElementsTableau = {};
window.app.reponsesAttenduesTableau1 = {};
window.app.reponsesAttenduesTableau2 = {};
window.app.reponsesAttenduesTableau3 = {};

// =========================
// ✅ Scoring
// Tentatives comptées UNIQUEMENT quand toutes les réponses de l’étape sont remplies
// Barème : 1er essai 100%, 2e 80%, 3e 60%, 4e 40%, 5e+ 20%
// =========================
window.app.scoring = {
  attempts: { 1: 0, 2: 0, 3: 0, 4: 0 },
  points:   { 1: null, 2: null, 3: null, 4: null },
  max:      { 1: 0,    2: 0,    3: 0,    4: 0 }
};

function pointsAvecEssais(pointsMax, essais) {
  const a = Math.max(1, parseInt(essais, 10) || 1);
  const coeffs = { 1: 1, 2: 0.8, 3: 0.6, 4: 0.4 };
  const coeff = (coeffs[a] !== undefined) ? coeffs[a] : 0.2;
  return Math.max(0, Math.round(pointsMax * coeff * 10) / 10); // arrondi au 0,1
}

function attribuerPointsEtape(etape, pointsMax) {
  if (window.app.scoring.points[etape] !== null) return; // déjà attribué
  window.app.scoring.max[etape] = pointsMax;
  window.app.scoring.points[etape] = pointsAvecEssais(pointsMax, window.app.scoring.attempts[etape]);
}

function calculerScoreFinalSur20() {
  const totalMax = Object.values(window.app.scoring.max).reduce((a, b) => a + (b || 0), 0);
  const totalPts = Object.values(window.app.scoring.points).reduce((a, b) => a + (b || 0), 0);
  if (!totalMax) return 0;
  return Math.round((totalPts / totalMax) * 20 * 10) / 10;
}

// =========================
// ✅ Identité (classe + nom1 + nom2 OU solo)
// =========================
function getIdentity() {
  const classe = (document.getElementById("classe")?.value || "").trim();
  const nom1 = (document.getElementById("nom1")?.value || "").trim();
  const nom2 = (document.getElementById("nom2")?.value || "").trim();
  const solo = Boolean(document.getElementById("solo")?.checked);
  return { classe, nom1, nom2, solo };
}

function isIdentityOk() {
  const { classe, nom1, nom2, solo } = getIdentity();
  return Boolean(classe && nom1 && (solo || nom2));
}

function setIdentityMessage(text, color = "#333") {
  const el = document.getElementById("identity-message");
  if (!el) return;
  el.textContent = text;
  el.style.color = color;
}

function appliquerModeSoloUI() {
  const solo = document.getElementById("solo");
  const nom2 = document.getElementById("nom2");
  if (!solo || !nom2) return;

  if (solo.checked) {
    nom2.value = "SOLO";
    nom2.disabled = true;
  } else {
    if (nom2.value === "SOLO") nom2.value = "";
    nom2.disabled = false;
  }
}

function appliquerVerrouIdentite() {
  const ok = isIdentityOk();
  const startBtn = document.getElementById("start-activity-button");
  if (startBtn) startBtn.disabled = !ok;

  if (!ok) {
    setIdentityMessage("Renseignez la classe + Nom 1, puis soit Nom 2, soit cochez « Travail seul(e) ».", "#333");
  } else if (!window.app.identityConfirmed) {
    setIdentityMessage("Identité prête ✅ Cliquez sur « Je confirme et je commence ».", "green");
  } else {
    setIdentityMessage("Identité confirmée ✅", "green");
  }
}

function setLocked(isLocked) {
  document.body.classList.toggle("locked", Boolean(isLocked));
  const b1 = document.getElementById("validate-1-button");
  const b2 = document.getElementById("validate-2-button");
  if (b1) b1.disabled = isLocked;
  if (b2) b2.disabled = isLocked;
}

// =========================
// ✅ Google Sheets : envoi résultat final
// (date/heure fiable côté serveur via Apps Script recommandé)
// =========================
function envoyerResultatFinal() {
  if (window.app.resultSent) return;

  const url = window.app.SHEETS_WEBAPP_URL || "";
  if (!url || url.includes("COLLEZ_ICI")) {
    console.warn("URL Apps Script manquante : score non envoyé.");
    window.app.resultSent = true; // évite boucle
    return;
  }

  const { classe, nom1, nom2, solo } = getIdentity();
  const score = calculerScoreFinalSur20();

  const payload = {
    classe,
    nom1,
    nom2: solo ? "SOLO" : nom2,
    score
  };

  // Compatible GitHub Pages
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).catch(err => console.error("Erreur envoi Sheets:", err));

  window.app.resultSent = true;
}

// =========================
// ✅ Confirmation fermeture onglet après démarrage
// =========================
window.addEventListener("beforeunload", (e) => {
  if (window.app.identityConfirmed && !window.app.resultSent) {
    e.preventDefault();
    e.returnValue = "";
    return "";
  }
});

// =========================
// ✅ Réponses attendues (code d’origine)
// =========================
function initialiserReponsesAttendues() {
  if (!window.exerciceData || !window.exerciceData.diagrammezone || !window.exerciceData.diagrammeElements) {
    return;
  }

  // Diagramme
  if (window.exerciceData.diagrammezone.length === window.exerciceData.diagrammeElements.length) {
    window.app.reponsesAttenduesDiagramme = {};
    window.exerciceData.diagrammezone.forEach((zone, index) => {
      let element = window.exerciceData.diagrammeElements[index];
      if (element) window.app.reponsesAttenduesDiagramme[zone.id] = element.nom;
    });
  }

  // Tableau
  window.app.reponsesAttenduesTableau1 = {};
  window.app.reponsesAttenduesTableau2 = {};
  window.app.reponsesAttenduesTableau3 = {};

  window.exerciceData.tableauElements.forEach(element => {
    let colonne = element.colonne;
    let zoneId = element.id.replace("element-", "fonction-");

    if (colonne === 1) window.app.reponsesAttenduesTableau1[zoneId] = element.nom;
    else if (colonne === 2) window.app.reponsesAttenduesTableau2[zoneId] = element.nom;
    else if (colonne === 3) window.app.reponsesAttenduesTableau3[zoneId] = element.nom;
  });
}

// =========================
// ✅ Init DOM
// =========================
window.addEventListener("DOMContentLoaded", () => {
  // verrouille l’exercice tant que non confirmé
  setLocked(true);

  // identité
  appliquerModeSoloUI();
  appliquerVerrouIdentite();
  document.getElementById("classe")?.addEventListener("input", appliquerVerrouIdentite);
  document.getElementById("nom1")?.addEventListener("input", appliquerVerrouIdentite);
  document.getElementById("nom2")?.addEventListener("input", appliquerVerrouIdentite);
  document.getElementById("solo")?.addEventListener("change", () => {
    appliquerModeSoloUI();
    appliquerVerrouIdentite();
  });

  // confirmation
  document.getElementById("start-activity-button")?.addEventListener("click", () => {
    if (!isIdentityOk()) return;

    const { classe, nom1, nom2, solo } = getIdentity();
    const recap =
      "Vérifiez avant de commencer :\n" +
      `Classe : ${classe}\n` +
      `Nom 1 : ${nom1}\n` +
      `Nom 2 : ${solo ? "SOLO" : nom2}\n\n` +
      "Confirmez-vous que c'est exact ?";

    if (!window.confirm(recap)) return;

    window.app.identityConfirmed = true;

    // déverrouille l’exercice
    setLocked(false);

    // fige les champs, cache seulement le bouton
    ["classe", "nom1", "nom2", "solo"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.disabled = true;
    });
    const startBtn = document.getElementById("start-activity-button");
    if (startBtn) startBtn.style.display = "none";

    appliquerVerrouIdentite();
  });
});

// =========================
// ✅ Initialisation réponses attendues (après chargement data.js)
// =========================
window.addEventListener("DOMContentLoaded", () => {
  initialiserReponsesAttendues();
});

// =========================
// ✅ Lancement zones diagramme (code d’origine)
// =========================
window.addEventListener("DOMContentLoaded", () => {
  const diagrammeImage = document.querySelector("#diagramme-container img");
  if (!diagrammeImage) return;

  function attendreChargement(callback) {
    let tentatives = 0;
    const verifier = () => {
      const rect = diagrammeImage.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        callback();
      } else if (tentatives < 40) {
        tentatives++;
        requestAnimationFrame(verifier);
      }
    };
    verifier();
  }

  function demarrerExercices() {
    setTimeout(() => {
      // zones diagramme
      app.setupDiagramme();
    }, 50);
  }

  if (diagrammeImage.complete) {
    attendreChargement(demarrerExercices);
  } else {
    diagrammeImage.addEventListener("load", () => attendreChargement(demarrerExercices));
  }
});

// =========================
// ✅ Boutons Valider/Suivant (avec garde identité)
// =========================
document.getElementById("validate-1-button")?.addEventListener("click", () => {
  if (!window.app.identityConfirmed) return;

  const button = document.getElementById("validate-1-button");
  if (!button) return;

  if (button.textContent === "Valider") {
    verifierReponsesDiagramme();
  } else {
    button.disabled = true;
    passerEtapesuivante();
  }
});

document.getElementById("validate-2-button")?.addEventListener("click", () => {
  if (!window.app.identityConfirmed) return;

  const button = document.getElementById("validate-2-button");
  if (!button) return;

  if (button.textContent === "Valider") {
    verifierReponsesTableau();
  } else {
    button.disabled = true;
    passerEtapesuivante();
  }
});

// =========================
// ✅ Mise à jour positions (code d’origine)
// =========================
function mettreAJourListePositionsDiagramme() {
  window.app.positionsElementsDiagramme = {};
  document.querySelectorAll(".dropzone").forEach(zone => {
    let elementPlace = zone.querySelector("span");
    if (elementPlace) {
      let nomElement = elementPlace.textContent.trim();
      window.app.positionsElementsDiagramme[zone.id] = nomElement;
    }
  });
}

function mettreAJourListePositionsTableau() {
  window.app.positionsElementsTableau = {};

  document.querySelectorAll(".dropzone2").forEach(zone => {
    let etapeActuelle = parseInt(window.app.etape);
    let colonneZone = parseInt(zone.getAttribute("data-colonne"));

    if (
      (etapeActuelle === 2 && colonneZone === 1) ||
      (etapeActuelle === 3 && colonneZone === 2) ||
      (etapeActuelle === 4 && colonneZone === 3)
    ) {
      let elementPlace = zone.querySelector("span");
      if (elementPlace) {
        let nomElement = elementPlace.textContent.trim();
        let zoneId = zone.id;
        window.app.positionsElementsTableau[zoneId] = nomElement;
      }
    }
  });
}

// =========================
// ✅ Vérification diagramme (modifiée : tentative seulement si tout rempli + points)
// =========================
function verifierReponsesDiagramme() {
  if (!window.app.reponsesAttenduesDiagramme || Object.keys(window.app.reponsesAttenduesDiagramme).length === 0) {
    return;
  }

  mettreAJourListePositionsDiagramme();

  const totalZones = Object.keys(window.app.reponsesAttenduesDiagramme).length;
  const reponsesPlacees = Object.keys(window.app.positionsElementsDiagramme).length;

  const message = document.getElementById("diagramme-message");
  const boutonValidation = document.getElementById("validate-1-button");

  // ✅ Tentative NON comptée si incomplet
  if (reponsesPlacees < totalZones) {
    if (message) {
      message.textContent = `⚠️ Il manque ${totalZones - reponsesPlacees} réponses à placer.`;
      message.style.color = "orange";
    }
    return;
  }

  // ✅ Tentative comptée seulement si tout est rempli
  window.app.scoring.attempts[1] += 1;

  let reponsesCorrectes = 0;
  Object.keys(window.app.positionsElementsDiagramme).forEach(zoneId => {
    const nomElement = window.app.positionsElementsDiagramme[zoneId];
    const reponseAttendue = window.app.reponsesAttenduesDiagramme[zoneId];
    if (reponseAttendue && nomElement === reponseAttendue) reponsesCorrectes++;
  });

  if (reponsesCorrectes === totalZones) {
    attribuerPointsEtape(1, totalZones);
    const pts = window.app.scoring.points[1];

    if (message) {
      message.textContent = `✅ Bravo ! Diagramme correct. Points : ${pts}/${totalZones} (essai n°${window.app.scoring.attempts[1]}).`;
      message.style.color = "green";
    }
    if (boutonValidation) boutonValidation.textContent = "Suivant";

    // Désactiver les zones du diagramme
    document.querySelectorAll(".dropzone").forEach(zone => {
      zone.style.border = "none";
      zone.style.backgroundColor = "transparent";
      zone.style.pointerEvents = "none";
    });

  } else {
    if (message) {
      message.textContent = `❌ Certaines réponses sont incorrectes. Bonnes réponses : ${reponsesCorrectes}/${totalZones}.`;
      message.style.color = "red";
    }
  }
}

// =========================
// ✅ Vérification tableau (modifiée : tentative seulement si tout rempli + points + score final + envoi)
// =========================
function verifierReponsesTableau() {
  mettreAJourListePositionsTableau();
  const etapeActuelle = parseInt(window.app.etape);

  let reponsesAttendues = [];
  let colonneCible = "";
  if (etapeActuelle === 2) {
    reponsesAttendues = Object.values(window.app.reponsesAttenduesTableau1);
    colonneCible = ".colonne-1";
  } else if (etapeActuelle === 3) {
    reponsesAttendues = Object.values(window.app.reponsesAttenduesTableau2);
    colonneCible = ".colonne-2";
  } else if (etapeActuelle === 4) {
    reponsesAttendues = Object.values(window.app.reponsesAttenduesTableau3);
    colonneCible = ".colonne-3";
  } else {
    return;
  }

  const totalZones = reponsesAttendues.length;
  const reponsesPlacees = Object.values(window.app.positionsElementsTableau);

  const message = document.getElementById("tableau-message");
  const boutonValidation = document.getElementById("validate-2-button");

  // ✅ Tentative NON comptée si incomplet
  if (reponsesPlacees.length < totalZones) {
    if (message) {
      message.textContent = `⚠️ Il manque ${totalZones - reponsesPlacees.length} réponses à placer.`;
      message.style.color = "orange";
    }
    return;
  }

  // ✅ Tentative comptée seulement si tout est rempli
  window.app.scoring.attempts[etapeActuelle] += 1;

  // Comparaison dans l’ordre
  let reponsesCorrectes = 0;
  for (let i = 0; i < totalZones; i++) {
    if (reponsesPlacees[i] === reponsesAttendues[i]) reponsesCorrectes++;
  }

  if (reponsesCorrectes === totalZones) {
    attribuerPointsEtape(etapeActuelle, totalZones);
    const pts = window.app.scoring.points[etapeActuelle];

    if (message) {
      message.textContent = `✅ Bravo ! Colonne validée. Points : ${pts}/${totalZones} (essai n°${window.app.scoring.attempts[etapeActuelle]}).`;
      message.style.color = "green";
    }

    if (boutonValidation) boutonValidation.textContent = "Suivant";

    // Bloquer colonnes (fonction existante)
    if (typeof bloquerColonnesTableau === "function") bloquerColonnesTableau();

    // Désactiver uniquement la colonne concernée
    if (colonneCible) {
      document.querySelectorAll(`.dropzone2${colonneCible}`).forEach(zone => {
        zone.style.border = "none";
        zone.style.backgroundColor = "transparent";
        zone.style.pointerEvents = "none";
      });
    }

    // ✅ Fin à l’étape 4
    if (window.app.etape === 4) {
      if (boutonValidation) boutonValidation.style.display = "none";
      const scoreSur20 = calculerScoreFinalSur20();
      if (message) {
        message.textContent = `✅ Exercice terminé — Score final : ${scoreSur20}/20`;
        message.style.color = "black";
      }
      envoyerResultatFinal();
    }

  } else {
    if (message) {
      message.textContent = `❌ Certaines réponses sont incorrectes. Bonnes réponses : ${reponsesCorrectes}/${totalZones}.`;
      message.style.color = "red";
    }
  }
}

// =========================
// ✅ Passage étape suivante (code d’origine conservé)
// =========================
function passerEtapesuivante() {
  if (window.app.etapeEnCours) return;
  window.app.etapeEnCours = true;

  if (window.app.etape >= 5) {
    window.app.etapeEnCours = false;
    return;
  }

  // Incrémentation étape
  window.app.etape += 1;

  // Diagramme -> Tableau
  document.getElementById("validate-1-button").style.display = "none";

  const message1 = document.getElementById("diagramme-message");
  if (message1) {
    message1.textContent = "Complétez le tableau en-dessous !";
    message1.style.color = "black";
  }

  document.getElementById("validate-controls-2").style.display = "flex";
  document.getElementById("validate-2-button").textContent = "Valider";
  document.getElementById("validate-2-button").disabled = false;

  const message2 = document.getElementById("tableau-message");
  if (message2) {
    if (window.app.etape === 2) {
      message2.textContent = "Compléter les fonctions du tableau !";
      message2.style.color = "black";
    } else if (window.app.etape === 3) {
      message2.textContent = "Compléter les critères du tableau !";
      message2.style.color = "black";
    } else if (window.app.etape === 4) {
      message2.textContent = "Compléter les niveaux du tableau !";
      message2.style.color = "black";
    } else if (window.app.etape === 5) {
      message2.textContent = "Exercice terminé !";
      message2.style.color = "black";
    }
  }

  // Afficher uniquement les zones de la colonne correspondant à l'étape
  app.setupTableau();

  setTimeout(() => {
    window.app.etapeEnCours = false;
  }, 50);
}
