const projectile = document.getElementById("projectile");
const vitre = document.getElementById("vitre");
const hauteurAffichee = document.getElementById("hauteur-affichee");
const energieCalc = document.getElementById("energieCalc");
const etatVitre = document.getElementById("etatVitre");
const scene = document.getElementById("scene");
const materiauSelect = document.getElementById("materiau");
const impactToggle = document.getElementById("impactToggle");

let isDragging = false;
let hauteurMetres = 2.0; // par défaut 2m
let animationFrame = null;
let degradation = 0;
// Conversion hauteur (m) -> position top (%)

function hauteurVersTopPourcent(h_m) {
  return ((2.5 - h_m) / 2.5) * 80;
}

// Conversion position top (%) -> hauteur (m)
function topPourcentVersHauteur(topPct) {
  return 2.5 - (topPct / 80) * 2.5;
}

// Met à jour la position du projectile et les données affichées
function updateProjectilePosition() {
  const top = hauteurVersTopPourcent(hauteurMetres);
  projectile.style.top = `${top}%`;
  hauteurAffichee.textContent = hauteurMetres.toFixed(2);
}


document.getElementById("materiau").addEventListener("change", function () {
  const valeur = this.value;
  const imageVitre = document.getElementById("vitre");

 if (valeur.startsWith("vitre")) {
    imageVitre.src = "images/simulation/vitre_intacte.png";
  } else if (valeur === "porte_bois" || valeur === "porte_bois_renforce") {
    imageVitre.src = "images/simulation/porte_bois_intacte.png";
  } else if (valeur === "porte_PVC" || valeur === "porte_haute_performance" || valeur === "porte_acier") {
    imageVitre.src = "images/simulation/porte_metal_intacte.png";
  } else {
    imageVitre.src = "images/simulation/porte_metal_intacte.png"; // fallback
  }
});

document.getElementById("masse").addEventListener("input", function () {
  let val = parseFloat(this.value);

  if (isNaN(val) || val < 1) {
    this.value = 1;
  } else if (val > 100) {
    this.value = 100;
  }
});

function incrementMasse() {
  const input = document.getElementById("masse");
  let val = parseFloat(input.value) || 1;
  if (val < 100) {
    val += 0.1;
    input.value = val.toFixed(1);
    input.dispatchEvent(new Event('input'));
  }
}

function decrementMasse() {
  const input = document.getElementById("masse");
  let val = parseFloat(input.value) || 1;
  if (val > 1) {
    val -= 0.1;
    input.value = val.toFixed(1);
    input.dispatchEvent(new Event('input'));
  }
}


projectile.addEventListener("mousedown", (e) => {
  isDragging = true;
  document.body.classList.add("noselect");
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  document.body.classList.remove("noselect");
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const rect = scene.getBoundingClientRect();
  let y = e.clientY - rect.top;
  let pct = (y / rect.height) * 100;

  // Clamp entre 0% (2.5m) et 80% (0m)
pct = Math.min(48, Math.max(0, pct));

  hauteurMetres = topPourcentVersHauteur(pct);
  updateProjectilePosition();
  energieCalc.textContent = "...";

});

projectile.addEventListener("touchstart", function (e) {
  isDragging = true;
  document.body.classList.add("noselect");
  e.preventDefault(); // évite scroll
}, { passive: false });

document.addEventListener("touchmove", function (e) {
  if (!isDragging) return;

  const touch = e.touches[0];
  const rect = scene.getBoundingClientRect();
  let y = touch.clientY - rect.top;
  let pct = (y / rect.height) * 100;

  // Clamp entre 0% (2.5m) et 48% (1m)
  pct = Math.min(48, Math.max(0, pct));

  hauteurMetres = topPourcentVersHauteur(pct);
  updateProjectilePosition();
  energieCalc.textContent = "...";
}, { passive: false });

document.addEventListener("touchend", function () {
  isDragging = false;
  document.body.classList.remove("noselect");
});


function toggleControls(active) {
  document.getElementById("btn-simuler").disabled = !active;
  document.querySelectorAll(".controls input, .controls select").forEach(el => {
    el.disabled = !active;
  });
}

function lancerSimulation() {
  const masse = parseFloat(document.getElementById("masse").value);
  const g = 9.81;
  const materiau = materiauSelect.value;
  const nbImpacts = impactToggle.checked ? 3 : 1;

const startTop = hauteurVersTopPourcent(hauteurMetres);
const endTop = 80;

const duration = 1000 * (hauteurMetres / 2.5);


  let seuilFissure = 0, seuilCassure = 0, seuilSensibilite = 0;

switch (materiau) {
  case "vitre_simple_vitrage":
    seuilFissure = 30; seuilCassure = 80; seuilSensibilite = 15; break;
  case "vitre_verre_feuillete":
    seuilFissure = 100; seuilCassure = 220; seuilSensibilite = 50; break;
  case "vitre_verre_trempe":
    seuilFissure = 180; seuilCassure = 360; seuilSensibilite = 90; break;
  case "vitre_double_vitrage":
    seuilFissure = 150; seuilCassure = 300; seuilSensibilite = 75; break;
  case "vitre_polycarbonate":
    seuilFissure = 300; seuilCassure = 600; seuilSensibilite = 120; break;

  case "porte_PVC":
    seuilFissure = 80; seuilCassure = 160; seuilSensibilite = 40; break;
  case "porte_bois":
    seuilFissure = 180; seuilCassure = 350; seuilSensibilite = 90; break;
  case "porte_bois_renforce":
    seuilFissure = 350; seuilCassure = 700; seuilSensibilite = 150; break;
  case "porte_acier":
    seuilFissure = 500; seuilCassure = 1000; seuilSensibilite = 200; break;
  case "porte_haute_performance":
    seuilFissure = 450; seuilCassure = 900; seuilSensibilite = 180; break;
}


const seuilFissureOrigine = seuilFissure;
const seuilCassureOrigine = seuilCassure;

const seuilCassureInitial = seuilCassure;
const seuilFissureInitial = seuilFissure;


let fragFactor = 1.0;

// Matériaux organiques (bois, PVC) : sensibles à l’usure
if (materiau.includes("PVC") || materiau.includes("bois")) {
  fragFactor = 0.93;
}

// Métaux (acier, haute performance) : très résistants à la fatigue
else if (materiau.includes("acier") || materiau.includes("haute_performance")) {
  fragFactor = 0.98;
}

// Vitres classiques (verre simple, double)
else if (materiau.includes("simple_vitrage") || materiau.includes("double_vitrage")) {
  fragFactor = 0.90;
}

// Verre feuilleté ou trempé : meilleure tenue
else if (materiau.includes("feuillete") || materiau.includes("trempe")) {
  fragFactor = 0.95;
}

// Polycarbonate : très résistant, peu de fatigue
else if (materiau.includes("polycarbonate")) {
  fragFactor = 0.99;
}



  toggleControls(false);
  degradation = 0;
  let fatigue = 0;




  afficherEtat(materiau, degradation);

function jouerImpact(impactIndex, energie) {
    if (impactIndex >= nbImpacts) {
      toggleControls(true);
      return;
    }

if (energie >= seuilSensibilite) {
  if (materiau.includes("verre")) fatigue += energie * 1.0;
  else if (materiau.includes("bois")) fatigue += energie * 0.5;
  else fatigue += energie * 0.3;
}


    const seuilFissureActuel = seuilFissure * Math.pow(fragFactor, impactIndex);
    const seuilCassureActuel = seuilCassure * Math.pow(fragFactor, impactIndex);

    let startTime = null;

    function animation(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
const y = startTop + (endTop - startTop) * progress;
projectile.style.top = `${y}%`;
hauteurMetres = topPourcentVersHauteur(y);
updateProjectilePosition();


      if (progress < 1) {
        animationFrame = requestAnimationFrame(animation);
      } else {
       if (impactIndex === nbImpacts - 1) {
  if (fatigue >= seuilCassureInitial) {
    degradation = 2;
  } else if (fatigue >= seuilFissureInitial && degradation < 1) {
    degradation = 1;
  }

  console.log("→ Évaluation finale après tous les impacts :");
  console.log("Fatigue cumulée :", fatigue.toFixed(2));
  console.log("Seuil fissure :", seuilFissureInitial);
  console.log("Seuil cassure :", seuilCassureInitial);
  console.log("État final :", degradation === 2 ? "cassé/fracturé" : degradation === 1 ? "fissuré/déformé" : "intact");
}





        afficherEtat(materiau, degradation);

        setTimeout(() => {
  jouerImpact(impactIndex + 1, energie);
        }, 500);
      }
    }

    requestAnimationFrame(animation);
  }
const energieInitiale = 9.81 * masse * hauteurMetres;
energieCalc.textContent = `${energieInitiale.toFixed(1)} J`;

jouerImpact(0, energieInitiale);
}

function afficherEtat(materiau, niveau) {
  let isVitre = materiau.startsWith("vitre");
  let texte = "";
  let classe = "";

  if (isVitre) {
    if (niveau === 0) {
      texte = "Intact";
      classe = "intact";
      vitre.src = "images/simulation/vitre_intacte.png";
    } else if (niveau === 1) {
      texte = "Fissuré";
      classe = "fissure";
      vitre.src = "images/simulation/vitre_fissuree.png";
    } else {
      texte = "Cassé";
      classe = "casse";
      vitre.src = "images/simulation/vitre_cassee.png";
    }
  } else if (materiau.includes("bois")) {
    if (niveau === 0) {
      texte = "Intact";
      classe = "intact";
      vitre.src = "images/simulation/porte_bois_intacte.png";
    } else if (niveau === 1) {
      texte = "Déformée";
      classe = "fissure";
      vitre.src = "images/simulation/porte_bois_deformee.png";
    } else {
      texte = "Fracturée";
      classe = "casse";
      vitre.src = "images/simulation/porte_bois_fracturee.png";
    }
  } else {
    if (niveau === 0) {
      texte = "Intact";
      classe = "intact";
      vitre.src = "images/simulation/porte_metal_intacte.png";
    } else if (niveau === 1) {
      texte = "Déformée";
      classe = "fissure";
      vitre.src = "images/simulation/porte_metal_deformee.png";
    } else {
      texte = "Fracturée";
      classe = "casse";
      vitre.src = "images/simulation/porte_metal_fracturee.png";
    }
  }

  const etatEl = document.getElementById("etatVitre");
  etatEl.textContent = texte;
  etatEl.className = `etat-vitre ${classe}`;
}

function toggleInfo(id) {
  // Fermer les autres bulles
  document.querySelectorAll('.tooltip-box').forEach(el => {
    if (el.id !== id) el.style.display = 'none';
  });

  const tooltip = document.getElementById(id);
  const visible = tooltip.style.display === 'block';
  if (visible) {
    tooltip.style.display = 'none';
    return;
  }

  // Affiche la bulle pour pouvoir mesurer sa taille
  tooltip.style.display = 'block';
  tooltip.style.visibility = 'hidden'; // invisible temporairement
  tooltip.style.left = '0px';
  tooltip.style.top = '0px';

  const cadre = document.getElementById('cadre-fixe');
  let cible, top, left;

const decalageX = 15; // espace horizontal en pixels

if (id === 'info-reglages') {
  cible = document.getElementById('bloc-reglages');
  top = cible.offsetTop;
  left = cible.offsetLeft + cible.offsetWidth + decalageX;
} else if (id === 'info-energie') {
  cible = document.getElementById('bloc-energie');
  top = cible.offsetTop + cible.offsetHeight - tooltip.offsetHeight;
  left = cible.offsetLeft + cible.offsetWidth + decalageX;
} else if (id === 'info-etat') {
  cible = document.getElementById('bloc-etat');
  top = cible.offsetTop + cible.offsetHeight - tooltip.offsetHeight;
  left = cible.offsetLeft + cible.offsetWidth + decalageX;
}

  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
  tooltip.style.visibility = 'visible';
}



// Fermer les infos si on clique ailleurs
document.addEventListener('click', function (e) {
  if (!e.target.classList.contains('info-button')) {
    document.querySelectorAll('.tooltip-box').forEach(box => {
      box.style.display = 'none';
    });
  }
});


// Ferme la bulle si on clique ailleurs
document.addEventListener('click', function(event) {
  if (!event.target.classList.contains('info-button')) {
    document.querySelectorAll('.tooltip-box').forEach(box => {
      box.style.display = 'none';
    });
  }
});


window.addEventListener("load", () => {
  hauteurMetres = 2.0;
  updateProjectilePosition();
  energieCalc.textContent = "...";

});


document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("materiau-select");
  const selected = select.querySelector(".selected");
  const options = select.querySelector(".options");
  const hiddenInput = document.getElementById("materiau");

  // Ouvre / ferme le menu
  selected.addEventListener("click", () => {
    select.classList.toggle("open");
  });

  // Sélection d'une option
  options.querySelectorAll(".option").forEach(option => {
    option.addEventListener("click", () => {
      selected.textContent = option.textContent;
      hiddenInput.value = option.getAttribute("data-value");
      select.classList.remove("open");
    });
  });

  // Ferme le menu si clic en dehors
  document.addEventListener("click", function (e) {
    if (!select.contains(e.target)) {
      select.classList.remove("open");
    }
  });
});

function scaleFixe() {
  const cadre = document.getElementById("cadre-fixe");
  const ratioRef = 1920 / 1080;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const ratioEcran = w / h;

  let scale;
  if (ratioEcran > ratioRef) {
    scale = h / 1080;
  } else {
    scale = w / 1920;
  }

  cadre.style.transform = `scale(${scale})`;
}

function centrerCadreFixe() {
  const cadre = document.getElementById("cadre-fixe");
  const largeurEcran = window.innerWidth;
  const hauteurEcran = window.innerHeight;
  const largeurCadre = 1920;
  const hauteurCadre = 1080;

  const scale = Math.min(largeurEcran / largeurCadre, hauteurEcran / hauteurCadre);

  // Appliquer le scale
  cadre.style.transform = `scale(${scale})`;

  // Calcul des marges restantes pour centrer
  const margeHorizontale = (largeurEcran - largeurCadre * scale) / 2;
  const margeVerticale = (hauteurEcran - hauteurCadre * scale) / 2;

  cadre.style.left = `${margeHorizontale}px`;
  cadre.style.top = `${margeVerticale}px`;
}

// Lors du chargement initial (avec un petit délai pour mobile)
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    scaleFixe();
    centrerCadreFixe();
  }, 10);
});

// Lors du redimensionnement de la fenêtre (avec temporisation)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    scaleFixe();
    centrerCadreFixe();
  }, 10);
});

// Lors du changement d'orientation (mobile/tablette)
window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    scaleFixe();
    centrerCadreFixe();
  }, 20);
});
