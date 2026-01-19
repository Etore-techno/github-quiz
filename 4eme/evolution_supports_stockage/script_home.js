/* Mini-SPA “Supports de stockage” — Diapo (4 parties) + image par partie
   - Accueil : image + titre "Supports de stockage", pas de flèches ni points
   - Thèmes : le h1 devient le titre du thème, 4 parties navigables (← →, swipe, clavier)
   - Flèche gauche masquée en 1/4 ; flèche droite masquée en 4/4
*/

const DATA = {
  disquette: {
    titre: "La disquette",
    s1: `La disquette est un support de stockage inventé en 1971 et utilisé par le grand public à partir de 1981.
Ce support de stockage servait à stocker et transporter de petits fichiers.
Elle se présente sous la forme d’un disque souple recouvert d’une fine couche métallique et protégé par une coque en plastique rigide d’environ 9 centimètres de côté.
Sa capacité est restée identique depuis sa création : 1,44 Mo, soit environ un millier de pages de texte.
Légère, réinscriptible et transportable, elle a longtemps servi à sauvegarder ou transférer de petits fichiers entre ordinateurs.`,
    s2: `Les données sont enregistrées à la surface d’un disque souple grâce à de minuscules particules métalliques capables de s’orienter comme de très petits aimants.
L’utilisation d’un lecteur de disquette est indispensable : lors de l’écriture, une tête spéciale modifie l’orientation de ces particules pour représenter les 0 et 1 du langage binaire ; lors de la lecture, cette même tête détecte les variations d’orientation et les transforme en signaux électriques que l’ordinateur peut interpréter.
Ce principe permet de conserver les données sans alimentation, mais le support reste fragile : un choc, un aimant ou un simple grain de poussière pouvait effacer toutes les données, et sa vitesse de lecture lente limitait son utilisation.`,
    s3: `Le prix d’une disquette était d’environ 1 €, ce qui représentait un coût élevé par rapport à la quantité de données stockées.
Sa consommation d’énergie était modérée, car le lecteur utilisait un petit moteur pour la faire tourner et une tête pour lire les informations.
Composée principalement de plastique, de métal et d’une fine couche d’alliage ferreux, elle était difficile à recycler et impossible à réparer.
Sa durée de vie était faible : les données pouvaient facilement être perdues après quelques années d’utilisation.`,

    imgs: [
      "images/disquette/01_presentation.jpg",
      "images/disquette/02_principe.jpg",
      "images/disquette/03_cout.jpg"
    ]
  },
  cd_dvd_bluray: {
    titre: "Les CD, DVD et Blu-ray",
    s1: `Les CD, DVD et Blu-ray ont longtemps été utilisés pour stocker, copier ou diffuser de la musique, des films ou des logiciels.
Ces supports se présentent sous la forme de disques rigides de 12 centimètres de diamètre, fins et légers, que l’on peut transporter facilement.
Le CD (Compact Disc), inventé en 1982 et utilisé pour les ordinateurs à partir de 1985, possède une capacité de 700 Mo, suffisant pour enregistrer un album audio complet ou plusieurs centaines de pages de texte.
Le DVD a été créé en 1995 et s’est diffusé dans le grand public à partir de 1997. Sa capacité de 4,7 Go rend possible le stockage de films entiers ou de jeux plus volumineux.
Enfin, le Blu-ray, mis au point en 2003 et commercialisé en 2005, offre une capacité d’environ 25 Go, adaptée à la haute définition.`,
    s2: `Les données sont enregistrées à la surface du disque sous forme de microscopiques creux disposés en spirale.
Pour lire ou graver le disque, un lecteur ou graveur dédié est nécessaire. 
Lors de la lecture, un faisceau lumineux très précis se réfléchit différemment selon qu’il rencontre un creux ou une zone lisse : ces variations de lumière sont transformées en signaux électriques que l’ordinateur traduit en 0 et 1. Lors de la gravure, ce faisceau chauffe localement la surface du disque et crée les creux qui représentent les données.
Plus le faisceau est fin, plus les creux peuvent être rapprochés, ce qui permet de stocker davantage d’informations sur la même surface.
Cependant, ils présentent plusieurs limites : les disques peuvent être rayés ou déformés, et leur vitesse de lecture reste moyenne, ce qui rallonge les temps de transfert de données.`,
    s3: `Le prix d’un disque vierge reste faible : un CD coûte environ 0,20 €, un DVD autour de 0,50 €, et un Blu-ray environ 1 €.
Leur consommation d’énergie est modérée pendant l’utilisation : le lecteur doit faire tourner le disque et activer le faisceau lumineux, mais cette dépense reste limitée.
Ils sont difficiles à recycler et peu réparables, car composés de plastique et d’aluminium collés.
Leur durée de vie est moyenne : ils peuvent conserver les données pendant plusieurs dizaines d’années s’ils sont bien protégés des rayures et de la chaleur.`,
       imgs: [
      "images/cd_dvd_bluray/01_presentation.jpg",
      "images/cd_dvd_bluray/02_principe.jpg",
      "images/cd_dvd_bluray/03_cout.jpg"
    ]
  },
  cle_usb: {
    titre: "La clé USB",
    s1: `La clé USB a été inventée en 1999 et commercialisée en 2000.
Ce support de stockage est utilisé pour sauvegarder, copier ou transférer des documents, des images, des vidéos ou des logiciels.
Elle se présente sous la forme d’un petit boîtier compact contenant une mémoire et un connecteur que l’on branche directement sur un port USB.
Les premières clés stockaient 32 Mo, tandis que les modèles actuels atteignent en moyenne 128 Go, ce qui permet de stocker un grand nombre de documents, de photos ou de vidéos.
Compacte, rapide et compatible avec de nombreux appareils, elle est devenue un support incontournable pour les particuliers comme pour les professionnels.`,
    s2: `Les données sont stockées à l’intérieur d’une puce de mémoire capable de retenir des charges électriques correspondant aux 0 et 1 du langage binaire.
Lors de la lecture, ces charges sont mesurées et transformées en signaux électriques que l’ordinateur peut interpréter.
Ce principe permet de stocker les données sans alimentation permanente, tout en offrant une vitesse de lecture rapide.
Elle est réinscriptible, résistante aux chocs, silencieuse et facile à transporter. Cependant, elle reste sensible à la chaleur, à l’humidité ou à une mauvaise manipulation, et peut être perdue facilement à cause de sa petite taille.`,
    s3: `Le prix moyen actuel d’une clé USB de 128 Go est d’environ 10 €.
Sa consommation d’énergie est faible : elle utilise un peu d’électricité seulement lorsqu’elle est branchée et en activité.
Elle contient plusieurs composants électroniques et des métaux rares, ce qui rend sa recyclabilité difficile et sa réparation impossible.
Elle est durable en usage normal et peut fonctionner plusieurs années avant de devenir inutilisable.`,
    imgs: [
      "images/cle_usb/01_presentation.jpg",
      "images/cle_usb/02_principe.jpg",
      "images/cle_usb/03_cout.jpg"
    ]
  },
  hdd: {
    titre: "Le disque dur (HDD)",
    s1: `Le disque dur a été créé en 1956 et s’est démocratisé à partir de 1983.
Ce support de stockage est utilisé pour stocker durablement des fichiers, des logiciels et des systèmes informatiques.
Il se présente sous la forme d’un boîtier métallique contenant plusieurs disques rigides empilés les uns sur les autres.
Le premier modèle grand public pouvait stocker environ 5 Mo, tandis que les modèles actuels atteignent en moyenne 2 To.
Robuste et capable de stocker de très grandes quantités de données, le disque dur est encore largement utilisé dans les ordinateurs et les serveurs.`,
    s2: `Les données sont enregistrées sur la surface des disques grâce à de minuscules particules métalliques qui réagissent à un champ produit par une tête d’écriture.
Lors de la lecture, la tête de lecture détecte les changements d’orientation et les convertit en signaux électriques compréhensibles par l’ordinateur.
Ce principe permet de conserver les données sans alimentation. Cependant, il comporte des pièces mécaniques mobiles, ce qui le rend sensible aux chocs.
Sa vitesse de lecture est moyenne, mais suffisante pour la plupart des usages courants.`,
    s3: `Le prix moyen actuel d’un disque dur de 2 To est d’environ 50 €.
Sa consommation d’énergie est modérée : il utilise de l’électricité pour faire tourner les disques et déplacer la tête de lecture.
Composé principalement de métal, de plastique et de circuits électroniques, il est partiellement recyclable mais difficile à réparer.
Sa durabilité est bonne : il peut fonctionner de 5 à 10 ans s’il est protégé des chocs et de la poussière.`,
       imgs: [
      "images/hdd/01_presentation.jpg",
      "images/hdd/02_principe.jpg",
      "images/hdd/03_cout.jpg"
    ]
  },
  ssd: {
    titre: "Le SSD",
    s1: `Le SSD (Solid State Drive) a été développé en 2007 et commercialisé à partir de 2008.
Ce support de stockage est utilisé pour stocker et exécuter rapidement des fichiers, des applications et des systèmes informatiques.
Il se présente sous la forme d’un boîtier rigide et plat, souvent installé à l’intérieur des ordinateurs portables ou de bureau.
Les premiers modèles pouvaient contenir 32 Go, tandis que les modèles actuels atteignent en moyenne 1 To.
Compact, silencieux et très rapide, le SSD est aujourd’hui largement utilisé dans les équipements numériques modernes.`,
    s2: `Les données sont enregistrées dans plusieurs puces de mémoire capables de retenir des charges électriques pour représenter les 0 et 1 du langage binaire.
Lors de la lecture, ces charges sont mesurées et converties en signaux électriques interprétés par l’ordinateur.
Ce procédé offre une vitesse de lecture très élevée, un fonctionnement silencieux et une résistance accrue aux chocs, car il ne contient aucun élément mobile.`,
    s3: `Le prix moyen actuel d’un SSD de 1 To est d’environ 70 €.
Sa consommation d’énergie est faible : il utilise peu d’électricité pendant le fonctionnement et presque rien au repos.
Composé de circuits intégrés, de métaux rares et de plastique, il est difficile à recycler et impossible à réparer.
Sa durée de vie est bonne, généralement de plusieurs années, mais elle dépend de son utilisation.`,
      imgs: [
      "images/ssd/01_presentation.jpg",
      "images/ssd/02_principe.jpg",
      "images/ssd/03_cout.jpg"
    ]
  }
};


  const IMAGE_SETS = {
  disquette: {
    0: ["images/disquette/1_1_presentation.jpg", "images/disquette/1_2_presentation.jpg"],
    1: ["images/disquette/2_1_principe.jpg",     "images/disquette/2_2_principe.gif"],
    2: ["images/disquette/3_1_usages.jpg",       "images/disquette/3_2_usages.jpg"]
  },
  cd_dvd_bluray: {
    0: ["images/cd_dvd_bluray/1_1_presentation.jpg", "images/cd_dvd_bluray/1_2_presentation.jpg"],
    1: ["images/cd_dvd_bluray/2_1_principe.jpg",     "images/cd_dvd_bluray/2_2_principe.gif"],
    2: ["images/cd_dvd_bluray/3_1_usages.jpg",       "images/cd_dvd_bluray/3_2_usages.jpg"]
  },
  cle_usb: {
    0: ["images/cle_usb/1_1_presentation.jpg", "images/cle_usb/1_2_presentation.jpg"],
    1: ["images/cle_usb/2_1_principe.jpg",     "images/cle_usb/2_2_principe.gif"],
    2: ["images/cle_usb/3_1_usages.jpg",       "images/cle_usb/3_2_usages.jpg"]
  },
  hdd: {
    0: ["images/hdd/1_1_presentation.jpg", "images/hdd/1_2_presentation.jpg"],
    1: ["images/hdd/2_1_principe.jpg",     "images/hdd/2_2_principe.gif"],
    2: ["images/hdd/3_1_usages.jpg",       "images/hdd/3_2_usages.jpg"]
  },
  ssd: {
    0: ["images/ssd/1_1_presentation.jpg", "images/ssd/1_2_presentation.jpg"],
    1: ["images/ssd/2_1_principe.jpg",     "images/ssd/2_2_principe.gif"],
    2: ["images/ssd/3_1_usages.jpg",       "images/ssd/3_2_usages.jpg"]
  }
};

/* ======= Références DOM ======= */
let _slideIndex = 0;
let _currentId = null;

const topTitle     = document.getElementById('top-title');
const accueilVisuel= document.getElementById('accueil-visuel');
const blocContenu  = document.getElementById('bloc-contenu');
const blocImg      = document.getElementById('bloc-image-diapo');
const imgDiapo     = document.getElementById('image-diapo');
const btnLeft      = document.getElementById('btn-left');
const btnRight     = document.getElementById('btn-right');
const dots         = document.getElementById('dots');
const titreContainer = document.querySelector('.titre-icone-container');

/* ======= Overlay de zoom ======= */
const zoomOverlay = document.createElement('div');
zoomOverlay.id = 'zoom-overlay';

const zoomImg = document.createElement('img');
zoomImg.id = 'zoom-image';

zoomOverlay.appendChild(zoomImg);
document.body.appendChild(zoomOverlay);

// Fermer le zoom en cliquant n'importe où sur l'overlay
zoomOverlay.addEventListener('click', () => {
  zoomOverlay.style.display = 'none';
  zoomImg.src = '';
});


/* === Icônes à gauche et à droite du titre (utilise <img id="icon-left/right">) === */
function mettreAJourIcones(theme) {
  const iconLeft  = document.getElementById('icon-left');
  const iconRight = document.getElementById('icon-right');

  if (!iconLeft || !iconRight) return;

  // Accueil : pas d'icônes
  if (!theme) {
    iconLeft.style.display = 'none';
    iconRight.style.display = 'none';
    iconLeft.removeAttribute('src');
    iconRight.removeAttribute('src');
    return;
  }

  // Définir la source des deux icônes (même image à gauche et à droite)
  const src = `images/${theme}/icon.png`;
  iconLeft.src = src;
  iconRight.src = src;

  // Afficher les icônes
  iconLeft.style.display = 'block';
  iconRight.style.display = 'block';

  // Si l'icône est manquante, on masque proprement
  const onError = (imgEl) => () => { imgEl.style.display = 'none'; };
  iconLeft.onerror = onError(iconLeft);
  iconRight.onerror = onError(iconRight);
}

/* ======= NEW: gestion des icônes de titre via variable CSS ======= */
function setThemeIcons(idOrNull) {
  // On utilise la var CSS --title-icon (cf. style2.css) + une classe body pour l'accueil
  const el = document.documentElement; // <html> :root
  const body = document.body;

  // Reset classes
  body.classList.remove('theme-none');

  if (!idOrNull) {
    // Accueil : pas d'icônes
    body.classList.add('theme-none');
    el.style.setProperty('--title-icon', 'none');
    return;
  }

  // Exemple de chemins :
  // images/disquette/icon.png
  // images/cd_dvd_bluray/icon.png
  // images/cle_usb/icon.png
  // images/hdd/icon.png
  // images/ssd/icon.png
  const url = `url("images/${idOrNull}/icon.png")`;
  el.style.setProperty('--title-icon', url);
}

/* ======= Utils UI ======= */
function setActiveThumb(id) {
  document.querySelectorAll(".thumbnail").forEach(t => {
    t.classList.toggle("active", t.dataset.id === id);
  });
}

function renderDots(total, index) {
  if (!dots) return;
  dots.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i === index ? ' active' : '');
    d.addEventListener('click', () => { _slideIndex = i; updateSlide(); });
    dots.appendChild(d);
  }
}

function fadeIn(el) {
  if (!el) return;
  el.classList.add('fade-enter');
  requestAnimationFrame(() => {
    el.classList.add('fade-enter-active');
    el.classList.remove('fade-enter');
    setTimeout(() => el.classList.remove('fade-enter-active'), 200);
  });
}

function attachZoomHandlers() {
  const imgs = blocImg.querySelectorAll('img.diapo-img');
  imgs.forEach(img => {
    img.addEventListener('click', () => {
      zoomImg.src = img.src;           // on affiche l'image cliquée
      zoomOverlay.style.display = 'flex'; // l'overlay prend tout l'écran
    });
  });
}


/* ======= Mise à jour Image + Flèches + Dots ======= */
function updateImage() {
  if (!_currentId) return;

  const set = IMAGE_SETS[_currentId];
  if (!set) return;

  const pair = set[_slideIndex]; // 2 images : [img1, img2]
  if (!pair) return;

  const [img1, img2] = pair;

  blocImg.style.display = 'flex';
  blocImg.innerHTML = `
    <img class="diapo-img" src="${img1}" alt="">
    <img class="diapo-img" src="${img2}" alt="">
  `;

  // 🔍 activer le zoom sur les deux images de cette diapo
  attachZoomHandlers();
}




function updateArrowsAndDots() {
  const sections = document.querySelectorAll('#bloc-contenu .bloc-section');
  const total = sections.length;

  // Pas de flèches ni dots si on est sur l’accueil (aucune section)
  const onHome = (total === 0);
  btnLeft.style.display  = onHome ? 'none' : (_slideIndex === 0 ? 'none' : 'block');
  btnRight.style.display = onHome ? 'none' : (_slideIndex === total - 1 ? 'none' : 'block');
  dots.style.display     = onHome ? 'none' : 'flex';

  if (!onHome) renderDots(total, _slideIndex);
}

function updateSlide() {
  const all = document.querySelectorAll('#bloc-contenu .bloc-section');
  all.forEach((sec, i) => sec.classList.toggle('active', i === _slideIndex));
  updateArrowsAndDots();
  updateImage();
}

/* ======= Navigation ======= */
function nextSlide() {
  const all = document.querySelectorAll('#bloc-contenu .bloc-section');
  if (!all.length) return;
  if (_slideIndex < all.length - 1) {
    _slideIndex++;
    updateSlide();
  }
}
function prevSlide() {
  const all = document.querySelectorAll('#bloc-contenu .bloc-section');
  if (!all.length) return;
  if (_slideIndex > 0) {
    _slideIndex--;
    updateSlide();
  }
}

/* ======= Gestes & Clavier ======= */
function enableSwipeOnPanel() {
  const panel = document.getElementById('info-panel');
  if (!panel) return;
  let x0 = null, y0 = null;

  panel.addEventListener('touchstart', (e) => {
    const t = e.changedTouches[0];
    x0 = t.clientX; y0 = t.clientY;
  }, {passive:true});

  panel.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - x0;
    const dy = t.clientY - y0;
    x0 = y0 = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) nextSlide();
      else prevSlide();
    }
  }, {passive:true});
}

function enableKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') prevSlide();
  });
}

/* ======= Chargement d’un thème ======= */
function afficherTheme(id) {
  const d = DATA[id];
  if (!d) return;

  // ⬇️ On quitte l’accueil
  document.body.classList.remove('home-accueil');

  // 🔽 Ré-afficher le titre + icônes dès qu’on quitte l’accueil
  if (titreContainer) {
    titreContainer.style.display = 'flex';
  }

  topTitle.style.display = "block";

  _currentId = id;
  _slideIndex = 0;

  // Titre principal : thème
  topTitle.textContent = d.titre || "Supports de stockage";

  mettreAJourIcones(id);

// NEW: icônes autour du titre
  setThemeIcons(id);

  // Activer l’onglet visuellement
  setActiveThumb(id);

  // Afficher panneau contenu, masquer accueil
  blocContenu.style.display = 'block';
  accueilVisuel.style.display = 'none';

  // Injecter les 4 sections (sans h2 redondant, le h1 sert de titre)
  blocContenu.innerHTML = `
    <div class="bloc-section" id="sec-1">
      <h3>🟦 1. Présentation générale</h3>
      <p>${(d.s1 || '').replaceAll('\n','<br>')}</p>
    </div>
    <div class="bloc-section" id="sec-2">
      <h3>🔵 2. Principe de fonctionnement</h3>
      <p>${(d.s2 || '').replaceAll('\n','<br>')}</p>
    </div>
    <div class="bloc-section" id="sec-3">
      <h3>⚖️ 3. Coût et impact environnemental</h3>
      <p>${(d.s3 || '').replaceAll('\n','<br>')}</p>
    </div>
  `;

  // Init
  enableSwipeOnPanel();
  enableKeyboardNav();
  updateSlide();

  // Scroll en haut du panneau au chargement du thème
  const panel = document.getElementById('info-panel');
  if (panel) panel.scrollTo({ top: 0, behavior: 'instant' });

  // Petit fondu sur le bloc texte
  fadeIn(blocContenu);
}

/* ======= Exposer pour les boutons HTML ======= */
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;

/* ======= État ACCUEIL (par défaut) ======= */
/* - Titre = "Supports de stockage"
   - Image d’accueil visible
   - Flèches & dots masqués */
(function initHome() {
  topTitle.textContent = "Supports de stockage";

  // Masquer les icônes d’accueil
  mettreAJourIcones(null);
  setThemeIcons(null);

 // ⬇️ On indique qu'on est sur l'accueil
  document.body.classList.add('home-accueil');

  // 🔽 ON CACHE LE TITRE + ICÔNES SUR L'ACCUEIL
  if (titreContainer) {
    titreContainer.style.display = 'none';
  }

  blocContenu.style.display = 'none';
  accueilVisuel.style.display = 'flex';

  btnLeft.style.display = 'none';
  btnRight.style.display = 'none';
  dots.style.display = 'none';
})();
