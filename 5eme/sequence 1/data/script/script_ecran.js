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
    scaleFixe();
    centrerCadreFixe();
});

// Lors du redimensionnement de la fenêtre (avec temporisation)
window.addEventListener('resize', () => {
    scaleFixe();
    centrerCadreFixe();
});

// Lors du changement d'orientation (mobile/tablette)
let resizeTimeout;

window.addEventListener('orientationchange', () => {
    clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    scaleFixe();
    centrerCadreFixe();
  }, 10);
});