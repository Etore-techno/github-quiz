/* Mini-SPA “Supports de stockage” — Diapo (3 parties) + images par partie
   - Accueil : image + titre "Supports de stockage", pas de flèches ni points
   - Thèmes : le h1 devient le titre du thème, 4 parties navigables (← →, swipe, clavier)
   - Flèche gauche masquée en 1/4 ; flèche droite masquée en 4/4
*/

const DATA = {
  disquette: {
    titre: "La disquette",
    s1: `La première disquette commercialisée date de 1971 et stockait environ 80 Ko.
Le modèle de 3,5 pouces représenté ici s’est diffusé plus tard, dans les années 1980. Le modèle le plus répandu pouvait stocker 1,44 Mo.
La disquette servait à enregistrer et à transporter de petits fichiers. Elle mesure environ 9 cm de côté et nécessite un lecteur spécifique.`,
    s2: `Les données sont enregistrées sur un disque souple recouvert de matière magnétique.
Une tête d’écriture oriente de minuscules zones comme de petits aimants pour représenter les 0 et les 1. Une tête de lecture détecte ensuite leur orientation.
Un moteur fait tourner le disque pendant la lecture et l’écriture.`,
    s3: `La vitesse de la disquette est lente. Sa résistance aux chocs est faible. Son encombrement est important pour sa faible capacité : elle mesure 9 cm et il faut également prévoir un lecteur.
Sa lecture nécessite un lecteur de disquettes spécifique. Le prix moyen d’une disquette de 1,44 Mo était d’environ 1 €.
La disquette est sensible aux poussières, aux aimants et aux déformations. Sa faible capacité, sa lenteur et la disparition de son lecteur expliquent son remplacement.`,
  },
  cd_dvd_bluray: {
    titre: "Les CD, DVD et Blu-ray",
    s1: `Le CD a commencé à être commercialisé en 1982. Les premiers modèles stockaient 650 Mo ; le modèle devenu le plus courant stocke 700 Mo.
Le DVD a été commercialisé en 1996. Un DVD courant à simple couche stocke 4,7 Go.
Le Blu-ray s’est diffusé auprès du grand public à partir de 2006. Un disque standard à simple couche stocke 25 Go.
Ces trois disques mesurent 12 cm de diamètre et ont servi à diffuser de la musique, des films, des logiciels ou des jeux.`,
    s2: `Un faisceau laser suit une piste en spirale. Les différences de lumière réfléchie sont transformées en signaux électriques puis en 0 et en 1.
Un faisceau plus précis permet de rapprocher les informations : le DVD stocke davantage qu’un CD et le Blu-ray davantage qu’un DVD.
Les trois supports reposent sur le même fonctionnement et constituent des générations successives. Un lecteur ou un graveur compatible reste indispensable.`,
    s3: `La vitesse de lecture de ces disques est moyenne. Leur résistance aux rayures est faible. Leur encombrement est réduit pour les disques, mais il faut également prévoir un lecteur.
La lecture d’un CD ou d’un DVD nécessite un lecteur optique ; celle d’un Blu-ray nécessite un lecteur compatible. Le prix moyen est d’environ 0,20 € pour un CD de 700 Mo, 0,50 € pour un DVD de 4,7 Go et 1 € pour un Blu-ray de 25 Go.
Ces disques sont faciles à ranger, mais les rayures et la nécessité d’un lecteur limitent aujourd’hui leurs usages.`,
  },
  cle_usb: {
    titre: "La clé USB",
    s1: `Les premières clés USB ont été commercialisées en 2000. Un des premiers modèles proposait une capacité de 8 Mo.
Une clé USB courante actuelle peut stocker 128 Go.
Ce petit support amovible se branche directement sur un port USB et permet de copier ou de transporter des fichiers. Dans notre collège, son utilisation est interdite pour des raisons de sécurité.`,
    s2: `Les données sont enregistrées dans une mémoire flash. Des cellules de mémoire conservent des charges électriques correspondant aux 0 et aux 1, même lorsque la clé est débranchée.
La clé ne contient ni disque, ni tête de lecture, ni moteur. Elle est silencieuse, réinscriptible et résiste assez bien aux chocs.`,
    s3: `La vitesse de la clé USB est rapide. Sa résistance aux chocs est bonne. Son encombrement est très faible.
Sa connexion s’effectue directement sur un port USB. Le prix moyen d’une clé USB de 128 Go est d’environ 10 €.
Elle est pratique et compatible avec de nombreux appareils, mais peut être perdue facilement. Sa réparation est très difficile et son recyclage nécessite une filière adaptée.`,
  },
  hdd: {
    titre: "Le disque dur (HDD)",
    s1: `Le premier disque dur commercial a été mis en service en 1956. Il stockait environ 5 Mo et occupait un volume très important.
Les HDD se sont ensuite miniaturisés et diffusés dans les ordinateurs personnels à partir des années 1980.
Un HDD actuel courant peut stocker 2 To. Ces disques restent utilisés dans les ordinateurs, les boîtiers externes et les serveurs.`,
    s2: `Plusieurs plateaux rigides tournent à grande vitesse. Une tête d’écriture modifie l’orientation de minuscules zones magnétiques ; une tête de lecture détecte ensuite ces orientations.
Le disque conserve les données sans alimentation. Ses plateaux et ses têtes sont des pièces mécaniques mobiles, sensibles aux chocs.`,
    s3: `La vitesse du HDD est moyenne. Sa résistance aux chocs est faible. Son encombrement est moyen.
Il possède des pièces mobiles. Le prix moyen d’un HDD de 2 To est d’environ 50 €.
Le HDD offre une grande capacité pour un prix modéré. Il est toutefois plus encombrant, plus bruyant et généralement plus lent qu’un SSD.`,
  },
  ssd: {
    titre: "Le SSD",
    s1: `Les SSD se sont diffusés auprès du grand public à partir de 2007. Un des premiers modèles grand public proposait 32 Go.
Des mémoires de ce type existaient déjà auparavant dans des équipements spécialisés : 2007 correspond donc à leur diffusion et non à leur invention.
Un SSD actuel courant peut stocker 1 To. Il est souvent utilisé pour le système, les logiciels et les fichiers auxquels il faut accéder rapidement.`,
    s2: `Les données sont enregistrées dans plusieurs puces de mémoire flash. Leurs cellules conservent des charges électriques qui représentent les 0 et les 1.
Le SSD ne contient ni plateau, ni tête de lecture, ni moteur. Les informations sont lues directement dans les cellules de mémoire.`,
    s3: `La vitesse du SSD est très rapide. Sa résistance aux chocs est bonne. Son encombrement est faible.
Il ne possède aucune pièce mobile. Le prix moyen d’un SSD de 1 To est d’environ 70 €.
Le SSD est silencieux et consomme peu d’énergie pendant son fonctionnement. Sa réparation est très difficile et son prix reste supérieur à celui d’un HDD de grande capacité.`,
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

  // Injecter les 3 sections (sans h2 redondant, le h1 sert de titre)
  blocContenu.innerHTML = `
    <div class="bloc-section" id="sec-1">
      <h3>1. Histoire et capacités</h3>
      <p>${(d.s1 || '').replaceAll('\n','<br>')}</p>
    </div>
    <div class="bloc-section" id="sec-2">
      <h3>2. Fonctionnement</h3>
      <p>${(d.s2 || '').replaceAll('\n','<br>')}</p>
    </div>
    <div class="bloc-section" id="sec-3">
      <h3>3. Caractéristiques, usages et limites</h3>
      <p>${(d.s3 || '').replaceAll('\n','<br>')}</p>
    </div>
  `;

  // Initialiser l'affichage du thème choisi
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
  // Les gestionnaires de navigation ne sont installés qu'une seule fois.
  enableSwipeOnPanel();
  enableKeyboardNav();

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
