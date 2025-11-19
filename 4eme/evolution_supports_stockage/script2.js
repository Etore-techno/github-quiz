// script2.js — centrage stable + mise à l’échelle via variable CSS

(function () {
  const DESIGN_W = 1920;
  const DESIGN_H = 1080;

  const root = document.documentElement;    // <html>
  const cadre = document.getElementById('cadre-fixe');

  function applyScale() {
    if (!cadre) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scale = Math.min(vw / DESIGN_W, vh / DESIGN_H);
    // ✅ On met à jour la variable CSS, on ne touche PAS à style.transform
    root.style.setProperty('--scale', String(scale));
  }

  window.addEventListener('DOMContentLoaded', applyScale);
  window.addEventListener('resize', applyScale, { passive: true });
  window.addEventListener('orientationchange', applyScale);
  setTimeout(applyScale, 0); // petit fallback
})();
