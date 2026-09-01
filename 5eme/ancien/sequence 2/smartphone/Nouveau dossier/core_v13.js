// core.js
(function () {
  "use strict";

  // ---------- Paths ----------
  const IMG_ROOT = "images/";
  const GENERAL = "general/";
  const PHONE_A = "phone_A/";

  function phoneFolder(profileKey){
    return PHONE_A;
  }
  function assetGeneral(rel){
    return IMG_ROOT + GENERAL + rel;
  }
  function assetPhone(profileKey, rel){
    return IMG_ROOT + phoneFolder(profileKey) + rel;
  }

  // ---------- Icons générées directement en SVG ----------
  const ICONS = {
    // Couleurs et icônes en SVG (aucune image externe nécessaire)
    colors: {
      phone: "#34C759",
      notifications: "#FF9500",
      health: "#FF3B30",

      social: "#007AFF",
      messages: "#34C759",
      photos: "#FF2D55",
      notes: "#FFCC00",
      mail: "#0A84FF",
      browser: "#5AC8FA",
      maps: "#30D158",
      downloads: "#8E8E93",
      bank: "#AF52DE",
      settings: "#8E8E93",
      camera: "#1C1C1E",
      quicknotes: "#FFCC00",
      about: "#8E8E93",
    }
  };

  function iconSvg(appId, cls="ico", alt=""){
    const title = alt ? `<title>${escapeHtml(alt)}</title>` : "";
    const svg = {
      phone: `<svg class="${cls}" viewBox="0 0 64 64" role="img" aria-label="${escapeHtml(alt)}">${title}
        <path fill="currentColor" d="M19 10c-2 0-4 2-4 4 0 21 16 37 37 37 2 0 4-2 4-4v-8c0-2-1-3-3-4l-7-2c-2-1-4 0-5 1l-2 3c-9-4-16-11-20-20l3-2c1-1 2-3 1-5l-2-7c-1-2-2-3-4-3h-8z"/>
      </svg>`,
      notifications: `<svg class="${cls}" viewBox="0 0 64 64" role="img" aria-label="${escapeHtml(alt)}">${title}
        <path fill="currentColor" d="M32 56a6 6 0 0 0 6-6H26a6 6 0 0 0 6 6zm18-12H14c2-3 4-6 4-14 0-9 6-16 14-18v-2a4 4 0 0 1 8 0v2c8 2 14 9 14 18 0 8 2 11 4 14z"/>
      </svg>`,
      health: `<svg class="${cls}" viewBox="0 0 64 64" role="img" aria-label="${escapeHtml(alt)}">${title}
        <path fill="currentColor" d="M32 56S10 41 10 25c0-7 5-12 12-12 5 0 8 3 10 6 2-3 5-6 10-6 7 0 12 5 12 12 0 16-22 31-22 31z"/>
        <path fill="#FFFFFF" opacity=".9" d="M30 20h4v8h8v4h-8v8h-4v-8h-8v-4h8z"/>
      </svg>`,
      messages: `<svg class="${cls}" viewBox="0 0 64 64" role="img" aria-label="${escapeHtml(alt)}">${title}
        <path fill="currentColor" d="M10 14c0-4 3-7 7-7h30c4 0 7 3 7 7v20c0 4-3 7-7 7H26l-9 8v-8h-0c-4 0-7-3-7-7V14z"/>
        <circle cx="24" cy="24" r="3" fill="#fff"/><circle cx="32" cy="24" r="3" fill="#fff"/><circle cx="40" cy="24" r="3" fill="#fff"/>
      </svg>`,
      social: `<svg class="${cls}" viewBox="0 0 64 64" role="img" aria-label="${escapeHtml(alt)}">${title}
        <path fill="currentColor" d="M22 30a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm20 8a9 9 0 1 1 0-18 9 9 0 0 1 0 18z"/>
        <path fill="currentColor" d="M6 54c1-10 9-18 18-18s17 8 18 18H6zm30 0c1-8 7-14 14-14s13 6 14 14H36z"/>
      </svg>`,
      mail: `<svg class="${cls}" viewBox="0 0 64 64" role="img" aria-label="${escapeHtml(alt)}">${title}
        <path fill="currentColor" d="M10 16c0-3 3-6 6-6h32c3 0 6 3 6 6v32c0 3-3 6-6 6H16c-3 0-6-3-6-6V16z"/>
        <path fill="#fff" d="M16 20h32v4L32 34 16 24v-4zm0 8 16 10 16-10v16H16V28z"/>
      </svg>`,
      browser: `<svg class="${cls}" viewBox="0 0 64 64" role="img" aria-label="${escapeHtml(alt)}">${title}
        <circle cx="32" cy="32" r="24" fill="currentColor"/>
        <path fill="#fff" d="M32 18l6 20-20 6 14-26z"/>
        <circle cx="32" cy="32" r="3" fill="#fff"/>
      </svg>`,
      camera: `<svg class="${cls}" viewBox="0 0 64 64" role="img" aria-label="${escapeHtml(alt)}">${title}
        <path fill="currentColor" d="M20 16h8l3-4h10l3 4h6c4 0 7 3 7 7v22c0 4-3 7-7 7H14c-4 0-7-3-7-7V23c0-4 3-7 7-7h6z"/>
        <circle cx="32" cy="34" r="10" fill="#fff"/><circle cx="32" cy="34" r="6" fill="currentColor"/>
      </svg>`,
      photos: `<svg class="${cls}" viewBox="0 0 64 64" role="img" aria-label="${escapeHtml(alt)}">${title}
        <rect x="10" y="12" width="44" height="40" rx="8" fill="#fff"/>
        <circle cx="32" cy="32" r="14" fill="currentColor"/>
        <path fill="#fff" d="M32 18a14 14 0 0 0-8 26c6-2 10-7 10-12 0-6-5-12-2-14z" opacity=".6"/>
      </svg>`,
      notes: `<svg class="${cls}" viewBox="0 0 64 64" role="img" aria-label="${escapeHtml(alt)}">${title}
        <path fill="currentColor" d="M16 10h32a6 6 0 0 1 6 6v32a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6V16a6 6 0 0 1 6-6z"/>
        <path fill="#fff" d="M20 22h24v4H20v-4zm0 10h24v4H20v-4zm0 10h18v4H20v-4z"/>
      </svg>`,
      maps: `<svg class="${cls}" viewBox="0 0 64 64" role="img" aria-label="${escapeHtml(alt)}">${title}
        <path fill="currentColor" d="M20 10l10 4 14-6v44l-14 6-10-4-12 6V16l12-6z"/>
        <path fill="#fff" opacity=".9" d="M30 14v44l-10-4V10l10 4zm14-6v44l-14 6V14l14-6z"/>
        <circle cx="40" cy="26" r="5" fill="currentColor"/>
      </svg>`,
      downloads: `<svg class="${cls}" viewBox="0 0 64 64" role="img" aria-label="${escapeHtml(alt)}">${title}
        <path fill="currentColor" d="M10 18c0-3 3-6 6-6h12l6 6h14c3 0 6 3 6 6v22c0 3-3 6-6 6H16c-3 0-6-3-6-6V18z"/>
        <path fill="#fff" d="M32 26v14l6-6h-4v-8h-4v8h-4l6 6z"/>
      </svg>`,
      bank: `<svg class="${cls}" viewBox="0 0 64 64" role="img" aria-label="${escapeHtml(alt)}">${title}
        <path fill="currentColor" d="M12 18h40a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6V24a6 6 0 0 1 6-6z"/>
        <rect x="10" y="26" width="44" height="6" fill="#fff" opacity=".9"/>
        <rect x="18" y="38" width="10" height="6" fill="#fff" opacity=".9"/>
      </svg>`,
      settings: `<svg class="${cls}" viewBox="0 0 64 64" role="img" aria-label="${escapeHtml(alt)}">${title}
        <path fill="currentColor" d="M36 8l2 6a20 20 0 0 1 5 2l6-3 6 10-6 4a20 20 0 0 1 0 6l6 4-6 10-6-3a20 20 0 0 1-5 2l-2 6H28l-2-6a20 20 0 0 1-5-2l-6 3-6-10 6-4a20 20 0 0 1 0-6l-6-4 6-10 6 3a20 20 0 0 1 5-2l2-6h8z"/>
        <circle cx="32" cy="32" r="8" fill="#fff" opacity=".9"/><circle cx="32" cy="32" r="4" fill="currentColor"/>
      </svg>`,
      about: `<svg class="${cls}" viewBox="0 0 64 64" role="img" aria-label="${escapeHtml(alt)}">${title}
        <circle cx="32" cy="32" r="26" fill="currentColor"/><circle cx="32" cy="22" r="6" fill="#fff"/>
        <rect x="28" y="30" width="8" height="24" rx="4" fill="#fff"/><rect x="28" y="30" width="8" height="4" fill="currentColor" opacity=".35"/>
      </svg>`,
      quicknotes: `<svg class="${cls}" viewBox="0 0 64 64" role="img" aria-label="${escapeHtml(alt)}">${title}
        <path fill="currentColor" d="M12 14h40a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6H22l-10 8v-8h0c-3 0-6-3-6-6V20a6 6 0 0 1 6-6z"/>
        <path fill="#fff" d="M18 24h28v4H18v-4zm0 10h18v4H18v-4z"/>
      </svg>`
    }[appId];

    return svg || `<span class="${cls}">•</span>`;
  }

  function badgeStyle(appId){
    const c = ICONS.colors[appId] || "#8E8E93";
    return `style="background:${c}"`;
  }

  // ---------- DOM ----------
  const screens = {
    lock:   document.getElementById("screen-lock"),
    home:   document.getElementById("screen-home"),
    app:    document.getElementById("screen-app"),
  };

  const sbTime = document.getElementById("sb-time");

  const lockClock = document.getElementById("lock-clock");
  const lockDate  = document.getElementById("lock-date");
  const lockNotificationsEl = document.getElementById("lock-notifications");
  const lockMsg = document.getElementById("lock-msg");

  const lockWallpaperEl = document.getElementById("lock-wallpaper");
  const homeWallpaperEl = document.getElementById("home-wallpaper");

  const homeTime = document.getElementById("home-time");
  const homeDate = document.getElementById("home-date");

  const homeSub = document.getElementById("home-sub");
  const appGrid = document.getElementById("app-grid");
  const dock = document.getElementById("dock");

  const guestUnlockCard = document.getElementById("guest-unlock-card");
  const pwdInput = document.getElementById("pwd-input");
  const pwdMsg = document.getElementById("pwd-msg");
  const pwdClear = document.getElementById("pwd-clear");
  const pwdOk = document.getElementById("pwd-ok");

  const appTitle = document.getElementById("app-title");
  const appContent = document.getElementById("app-content");
  const btnBack = document.getElementById("btn-back");

  const recentsOverlay = document.getElementById("recents");
  const recentsList = document.getElementById("recents-list");
  const recentsClose = document.getElementById("recents-close");

  // ---------- Data ----------
  const PROFILES = window.PROFILES || {};

  // ---------- State ----------
  let activeProfileKey = null;
  let activeProfile = null;

  let pinBuffer = "";
  let navStack = [];
  let unlockLevel = 0; // 0=LOCK_PIN, 1=GUEST(after PIN), 2=FULL

  // UI state par session (onglets navigateur, fichiers ouverts, mail connecté, etc.)
  let UI = {
    browser: { tab: "home" },
    downloads: { selected: null },
    mail: { authed: false, selected: null },
    messages: { thread: null },
    maps: { selected: null },
  };

  function resetUiState() {
    UI = {
      browser: { tab: "home" },
      downloads: { selected: null },
      mail: { authed: false, selected: null },
      messages: { thread: null },
      maps: { selected: null },
    };
  }

  const GRID_APPS = [
    { id: "phone",     name: "Téléphone" },
    { id: "social",    name: "Réseau social" },
    { id: "messages",  name: "Messages" },
    { id: "photos",    name: "Galerie" },
    { id: "notes",     name: "Notes" },
    { id: "about",     name: "À propos" },
    { id: "mail",      name: "Mail" },
    { id: "browser",   name: "Navigateur" },
    { id: "maps",      name: "Plans" },
    { id: "downloads", name: "Fichiers" },
    { id: "bank",      name: "Paiements" },
    { id: "settings",  name: "Réglages" },
  ];

  // ---------- Utils ----------
  function setActiveScreen(name) {
    // Sécurité : évite qu'une erreur DOM bloque toute la simulation
    Object.values(screens).filter(Boolean).forEach(el => el.classList.remove("screen--active"));
    const target = screens[name];
    if (!target) return;
    target.classList.add("screen--active");
    closeRecents();
  }

  function setHint(el, msg, type="info") {
    el.textContent = msg || "";
    el.style.color =
      type === "ok" ? "rgba(46,209,156,.95)" :
      type === "bad" ? "rgba(255,77,109,.95)" :
      "rgba(185,194,255,.95)";
  }


  function formatWhen(value) {
    const raw = String(value || "");
    const m = /^\{\{(today|yesterday)(?::([^}]+))?\}\}$/.exec(raw);
    if (m) {
      const label = m[1] === "today" ? "Aujourd’hui" : "Hier";
      return m[2] ? `${label} ${m[2]}` : label;
    }

    const d = /^\{\{day:([-+]?\d+)(?::([^}]+))?\}\}$/.exec(raw);
    if (d) {
      const offset = parseInt(d[1], 10);
      const time = d[2] || "";
      const date = new Date();
      date.setDate(date.getDate() + offset);
      const days = ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."];
      let label;
      if (offset === 0) label = "Aujourd’hui";
      else if (offset === -1) label = "Hier";
      else if (offset > -7 && offset < 7) label = days[date.getDay()];
      else label = `${days[date.getDay()]} ${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth()+1).padStart(2, "0")}`;
      return time ? `${label} ${time}` : label;
    }
    return raw;
  }

  function formatTextDates(value) {
    return String(value || "").replace(/\{\{(?:today|yesterday)(?::[^}]+)?\}\}|\{\{day:[-+]?\d+(?::[^}]+)?\}\}/g, token => formatWhen(token));
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }


  function initials(name) {
    const parts = String(name || "?").trim().split(/\s+/).filter(Boolean);
    return parts.slice(0, 2).map(p => p[0]).join("").toUpperCase() || "?";
  }

  function avatarHtml(label, img="", cls="avatar") {
    if (img) {
      return `<div class="${cls}"><img src="${assetPhone(activeProfileKey, img)}" alt=""></div>`;
    }
    return `<div class="${cls}">${escapeHtml(initials(label))}</div>`;
  }

  function phoneImage(img, cls="media-img", alt="") {
    return img ? `<img class="${cls}" src="${assetPhone(activeProfileKey, img)}" alt="${escapeHtml(alt)}">` : "";
  }

  function appSectionTitle(title, sub="") {
    return `<div class="app-section-title"><span>${escapeHtml(title)}</span>${sub ? `<small>${escapeHtml(sub)}</small>` : ""}</div>`;
  }

  function updateTime() {
    const simulatedDate = activeProfile?.ui?.simulatedDate || null;
    const d = simulatedDate ? new Date(simulatedDate) : new Date();
    const hh = String(d.getHours()).padStart(2,"0");
    const mm = String(d.getMinutes()).padStart(2,"0");
    const time = `${hh}:${mm}`;

    if (sbTime) sbTime.textContent = time;
    if (lockClock) lockClock.textContent = time;
    if (homeTime) homeTime.textContent = time;

    const days = ["Dim.","Lun.","Mar.","Mer.","Jeu.","Ven.","Sam."];
    const months = ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."];
    const dateStr = `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
    lockDate.textContent = dateStr;
    if (homeDate) homeDate.textContent = dateStr;
  }

  // ---------- Wallpapers ----------
  function applyWallpapers() {
    if (!activeProfile) return;
    const lockFile = activeProfile.ui?.lockWallpaper || "";
    const homeFile = activeProfile.ui?.homeWallpaper || "";

    // Si aucun fond d'écran n'est défini dans les données, on garde le fond CSS.
    lockWallpaperEl.style.backgroundImage = lockFile ? `url("${assetGeneral(lockFile)}")` : "";
    homeWallpaperEl.style.backgroundImage = homeFile ? `url("${assetGeneral(homeFile)}")` : "";
  }


  // ---------- Sécurité dynamique ----------
  function getSchoolYearStartYear(date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth(); // 0 = janvier, 8 = septembre
    return month >= 8 ? year : year - 1;
  }

  function computeTroisiemeBirthYearPin(date = new Date()) {
    // Repère choisi : un élève de 3e est généralement né 14 ans avant
    // l'année civile de rentrée scolaire. Exemple : rentrée 2025 -> 2011.
    return String(getSchoolYearStartYear(date) - 14);
  }

  function applyDynamicSecurity(profile) {
    if (!profile) return;
    const rule = profile.security?.pinRule || profile.pinRule || "";
    const wantsAutoPin = rule === "birthYearTroisieme" || profile.pin === "AUTO_3E" || profile.owner?.pin === "AUTO_3E";
    if (!wantsAutoPin) return;

    const computedPin = computeTroisiemeBirthYearPin(new Date());
    profile.pin = computedPin;
    if (profile.owner) profile.owner.pin = computedPin;
  }

  // ---------- Profil unique ----------
  function renderLockNotifications() {
    // Les notifications ne doivent pas être visibles avant le code PIN.
    // Elles sont consultables uniquement ensuite dans l’application « Notifications » du mode invité.
    if (!lockNotificationsEl) return;
    lockNotificationsEl.innerHTML = "";
  }

  function loadProfile(key) {
    activeProfileKey = key;
    activeProfile = PROFILES[key];
    if (!activeProfile) return;
    applyDynamicSecurity(activeProfile);

    pinBuffer = "";
    navStack = [];
    unlockLevel = 0;
    resetUiState();

    setHint(lockMsg, activeProfile.limited?.lockHint || "Saisis le code PIN.");
    setHint(pwdMsg, "");
    pwdInput.value = "";
    updatePinDots();

    applyWallpapers();
    updateTime();
    renderLockNotifications();
    setActiveScreen("lock");
  }

  // ---------- PIN ----------
  function updatePinDots() {
    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("filled", i < pinBuffer.length);
    });
  }

  function pinKeyPress(k) {
    if (pinBuffer.length >= 4) return;
    pinBuffer += k;
    updatePinDots();
  }

  function pinClear() {
    pinBuffer = "";
    updatePinDots();
    setHint(lockMsg, activeProfile?.limited?.lockHint || "Saisis le code PIN.");
  }

  function pinValidate() {
    if (!activeProfile) return;

    if (pinBuffer.length !== 4) {
      setHint(lockMsg, "Entre 4 chiffres.", "bad");
      return;
    }

    if (pinBuffer === activeProfile.owner.pin) {
      setHint(lockMsg, "Déverrouillé ✅", "ok");
      pinBuffer = "";
      updatePinDots();

      unlockLevel = 1; // guest
      setHint(pwdMsg, "");
      pwdInput.value = "";

      setTimeout(() => {
        setActiveScreen("home");
        renderHome();
        setTimeout(() => pwdInput.focus(), 60);
      }, 150);
    } else {
      setHint(lockMsg, "Code incorrect ❌", "bad");
      pinBuffer = "";
      updatePinDots();
    }
  }

  document.querySelectorAll(".keypad .key").forEach(btn => {
    btn.addEventListener("click", () => {
      const k = btn.dataset.key;
      const action = btn.dataset.action;
      if (k) pinKeyPress(k);
      if (action === "clear") pinClear();
      if (action === "ok") pinValidate();
    });
  });

  // ---------- Password ----------
  pwdClear && pwdClear.addEventListener("click", () => {
    pwdInput.value = "";
    setHint(pwdMsg, "");
    pwdInput.focus();
  });

  pwdInput && pwdInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      pwdOk && pwdOk.click();
    }
  });

  pwdOk && pwdOk.addEventListener("click", () => {
    if (!activeProfile) return;
    const typed = (pwdInput.value || "").trim();

    if (!typed) {
      setHint(pwdMsg, "Entre un mot de passe.", "bad");
      return;
    }

    if (typed.toLowerCase() === activeProfile.owner.accountPassword.toLowerCase()) {
      unlockLevel = 2; // full
      setHint(pwdMsg, "Accès complet ✅", "ok");
      setTimeout(() => renderHome(), 120);
    } else {
      setHint(pwdMsg, "Mot de passe incorrect ❌", "bad");
    }
  });

  // ---------- Dock apps ----------
  function getDockApps() {
    if (unlockLevel === 1) {
      const titleMap = {
        phone: "Téléphone",
        notifications: "Notifications",
        health: "Santé",
        quicknotes: "Notes rapides",
      };
      const guestIds = activeProfile?.limited?.guestApps || ["phone", "notifications", "health"];
      return guestIds.map(id => ({ id, title: titleMap[id] || id }));
    }
    // Mode complet : pas de dock (demande pédagogique)
    return [];
  }

  function renderDock() {
    if (!dock) return;
    const apps = getDockApps();

    if (!apps.length) {
      dock.innerHTML = "";
      dock.style.display = "none";
      return;
    }

    dock.innerHTML = apps.map(a => {
      const icon = iconSvg(a.id, "dock-ico", a.title);
      // Badge colored by app color, icon stays white via CSS
      const style = badgeStyle(a.id);
      return `
        <button class="dock-btn" type="button" data-open="${escapeHtml(a.id)}" aria-label="${escapeHtml(a.title)}">
          <div class="dock-badge badge-${escapeHtml(a.id)}" ${style}>${icon}</div>
        </button>
      `.trim();
    }).join("");

    dock.style.display = "flex";
  }


  // ---------- Home ----------
  function renderHome() {
    if (!activeProfile) return;

    const guest = unlockLevel === 1;

    // Espace réservé au dock : présent uniquement en mode invité
    document.documentElement.style.setProperty("--dock-h", guest ? "74px" : "0px");
    homeSub.textContent = guest ? "Compte verrouillé (mode invité)" : "";

    homeSub.style.display = guest ? "inline-block" : "none";

    guestUnlockCard.style.display = guest ? "block" : "none";

    appGrid.style.display = guest ? "none" : "grid";
    appGrid.innerHTML = "";

    if (!guest) {
      GRID_APPS.forEach(app => {
        const icon = iconSvg(app.id, "app-ico", app.name);

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "app-icon";
        btn.dataset.open = app.id;
        btn.innerHTML = `
          <div class="app-badge badge-${app.id}" ${badgeStyle(app.id)}>${icon}</div>
          <div class="app-name">${escapeHtml(app.name)}</div>
        `;
        appGrid.appendChild(btn);
      });
    }

    renderDock();
    closeRecents();
  }

  // ---------- Navigation Android ----------
  function goHome() {
    navStack = [];
    UI.messages.thread = null;
    destroyMapsLeaflet();
    setActiveScreen("home");
    renderHome();
  }

  function goBack() {
    if (!screens.app.classList.contains("screen--active")) return;

    // Cas spécial : dans "Messages", le bouton retour doit revenir à la liste des discussions
    const current = navStack[navStack.length - 1];
    if (current === "messages" && UI.messages && UI.messages.thread) {
      UI.messages.thread = null;
      renderApp("messages");
      return;
    }

    navStack.pop();
    const prev = navStack[navStack.length - 1];
    if (!prev) goHome();
    else renderApp(prev);
  }

  document.addEventListener("click", (e) => {
    const sys = e.target.closest("[data-sys]");
    if (!sys) return;

    const action = sys.dataset.sys;
    if (action === "home") goHome();
    if (action === "back") goBack();
  });

  // ---------- Open apps ----------
  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open]");
    if (!openBtn) return;

    const appId = openBtn.dataset.open;
    if (!activeProfile) return;

    if (unlockLevel === 1) {
      const allowed = new Set(getDockApps().map(a => a.id));
      if (!allowed.has(appId)) return;
    }

    openApp(appId);
  });


  // ---------- Dialer (Téléphone) ----------
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-dial]");
    if (!btn) return;

    const raw = btn.dataset.dial;
    let num = raw;

    if (raw === "__CUSTOM__") {
      const input = document.getElementById("dial-input");
      num = (input && input.value) ? input.value.trim() : "";
    }

    if (!num) return;

    const status = document.getElementById("dial-status");
    if (status) status.textContent = `Appel (simulation) : ${num}`;
  });

  // ---------- In-app interactions ----------
  document.addEventListener("click", (e) => {
    // Téléphone : clavier
    const key = e.target.closest("[data-key]");
    if (key) {
      const k = key.dataset.key;
      const input = document.getElementById("dial-input");
      if (!input) return;
      if (k === "BACK") { input.value = input.value.slice(0, -1); return; }
      if (k === "CLEAR") { input.value = ""; return; }
      if (k && k.length <= 2) { input.value = (input.value + k).slice(0, 20); }
      return;
    }

    // Navigateur : onglets Accueil/Historique
    const bTab = e.target.closest("[data-browser-tab]");
    if (bTab) {
      const tab = bTab.dataset.browserTab;
      UI.browser.tab = ["home", "history", "privacy"].includes(tab) ? tab : "home";
      const current = navStack[navStack.length - 1];
      if (current === "browser") renderApp("browser");
      return;
    }
// Plans : basculer le fond de carte (satellite ↔ carte)
const mapToggle = e.target.closest("[data-map-toggle]");
if (mapToggle) {
  UI.maps.layer = (UI.maps.layer === "map") ? "sat" : "map";
  const current = navStack[navStack.length - 1];
  if (current === "maps") renderApp("maps");
  return;
}

    // Plans : ouvrir un lieu enregistré
    const mapPlace = e.target.closest("[data-map-place]");
    if (mapPlace) {
      const idx = parseInt(mapPlace.dataset.mapPlace, 10);
      if (!Number.isFinite(idx)) return;
      UI.maps.selected = idx;
      const current = navStack[navStack.length - 1];
      if (current === "maps") renderApp("maps");
      return;
    }

    // Mail : connexion

    const loginBtn = e.target.closest("[data-mail-login]");
    if (loginBtn) {
      const current = navStack[navStack.length - 1];
      if (current !== "mail") return;

      const addressInput = document.getElementById("mail-address");
      const passInput = document.getElementById("mail-pass");
      const typedAddress = addressInput ? (addressInput.value || "").trim().toLowerCase() : "";
      const typedPass = passInput ? (passInput.value || "").trim() : "";
      const auth = activeProfile.full.mailLogin || {};
      const expectedAddress = String(auth.address || activeProfile.owner?.email || "").trim().toLowerCase();
      const ok = typedAddress && typedPass && expectedAddress && auth.password && typedAddress === expectedAddress && typedPass === auth.password;

      const msg = document.getElementById("mail-msg");
      if (!typedAddress || !typedPass) { if (msg) msg.textContent = "Entre l’adresse mail et le mot de passe."; return; }
      if (ok) {
        UI.mail.authed = true;
        if (msg) msg.textContent = "Connecté ✅";
        setTimeout(() => renderApp("mail"), 80);
      } else {
        if (msg) msg.textContent = "Adresse mail ou mot de passe incorrect.";
      }
      return;
    }

    const mailLogoutBtn = e.target.closest("[data-mail-logout]");
    if (mailLogoutBtn) {
      const current = navStack[navStack.length - 1];
      if (current !== "mail") return;
      UI.mail.authed = false;
      UI.mail.selected = null;
      renderApp("mail");
      return;
    }

    const openMail = e.target.closest("[data-mail-open]");
    if (openMail) {
      const current = navStack[navStack.length - 1];
      if (current !== "mail") return;
      const idx = parseInt(openMail.dataset.mailOpen, 10);
      if (!Number.isFinite(idx)) return;
      UI.mail.selected = idx;
      renderApp("mail");
      return;
    }

    const backMail = e.target.closest("[data-mail-back]");
    if (backMail) {
      const current = navStack[navStack.length - 1];
      if (current !== "mail") return;
      UI.mail.selected = null;
      renderApp("mail");
      return;
    }


    // Messages : ouvrir une discussion / revenir
    const openThread = e.target.closest("[data-msg-thread]");
    if (openThread) {
      UI.messages.thread = openThread.dataset.msgThread || null;
      const current = navStack[navStack.length - 1];
      if (current === "messages") renderApp("messages");
      return;
    }

    const backThread = e.target.closest("[data-msg-back]");
    if (backThread) {
      UI.messages.thread = null;
      const current = navStack[navStack.length - 1];
      if (current === "messages") renderApp("messages");
      return;
    }

    // Fichiers : ouvrir / revenir
    const openFile = e.target.closest("[data-file-open]");
    if (openFile) {
      const idx = parseInt(openFile.dataset.fileOpen, 10);
      if (!Number.isFinite(idx)) return;
      UI.downloads.selected = idx;
      const current = navStack[navStack.length - 1];
      if (current === "downloads") renderApp("downloads");
      return;
    }

    const backFile = e.target.closest("[data-file-back]");
    if (backFile) {
      UI.downloads.selected = null;
      const current = navStack[navStack.length - 1];
      if (current === "downloads") renderApp("downloads");
      return;
    }
  });


  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const target = e.target;
    if (target && (target.id === "mail-pass" || target.id === "mail-address")) {
      e.preventDefault();
      const btn = document.querySelector("[data-mail-login]");
      if (btn) btn.click();
    }
  });

  function openApp(appId) {
    closeRecents();
    // Reset états internes d'apps si besoin
    if (appId !== "messages") UI.messages.thread = null;
    navStack.push(appId);
    setActiveScreen("app");
    renderApp(appId);
  }

  btnBack && btnBack.addEventListener("click", goBack);

  // ---------- Recents ----------
  function toggleRecents() {
    if (!screens.home.classList.contains("screen--active") && !screens.app.classList.contains("screen--active")) return;

    if (!recentsOverlay.hidden) {
      closeRecents();
      return;
    }

    const last = [...navStack].reverse().filter(Boolean).slice(0, 4);
    recentsList.innerHTML = last.length
      ? last.map(id => `<div class="recents-card" data-open="${escapeHtml(id)}">• ${escapeHtml(id)}</div>`).join("")
      : `<div class="recents-card">Aucune app récente</div>`;

    recentsOverlay.hidden = false;
    recentsOverlay.setAttribute("aria-hidden", "false");
  }

  function closeRecents() {
    if (!recentsOverlay) return;
    recentsOverlay.hidden = true;
    recentsOverlay.setAttribute("aria-hidden", "true");
  }

  recentsClose && recentsClose.addEventListener("click", closeRecents);
  recentsOverlay && recentsOverlay.addEventListener("click", (e) => {
    if (e.target === recentsOverlay) closeRecents();
  });

  
  // ----- Conversations (Messages) -----
// (Données intégrées : ouvre une discussion quand on clique sur un fil.)
const CONVERSATIONS = {
  A: {
    "Maman": [
      { from: "Maman", text: "Tu as ton badge ? 🙂", when: "14/10 07:12" },
      { from: "Moi",   text: "Oui, je l’ai dans le sac.", when: "14/10 07:13" },
      { from: "Maman", text: "Pense à prendre ton manteau, il fait froid.", when: "14/10 07:14" },

      { from: "Maman", text: "Tu rentres à quelle heure aujourd’hui ?", when: "03/12 12:08" },
      { from: "Moi",   text: "Vers 17h, j’ai étude.", when: "03/12 12:10" },
      { from: "Maman", text: "Ok, je serai là vers 17h30.", when: "03/12 12:11" },

      { from: "Maman", text: "Tu es bien sorti du bus ? 🙂", when: "Aujourd’hui 07:32" },
      { from: "Moi",   text: "Oui, j'arrive au collège.", when: "Aujourd’hui 07:33" },
      { from: "Maman", text: "Pense à Nala en rentrant 🐾", when: "Aujourd’hui 07:50" },
      { from: "Moi",   text: "Oui t'inquiète.", when: "Aujourd’hui 07:51" },
      { from: "Maman", text: "Donne à Nala sa gamelle en rentrant 🐾 (et pense au devoir).", when: "Aujourd’hui 08:02" }
    ],
    "Papa": [
      { from: "Papa", text: "T’as bien pris le chargeur ?", when: "28/09 18:04" },
      { from: "Moi",  text: "Oui.", when: "28/09 18:05" },
      { from: "Papa", text: "Ok. Et n’oublie pas les clés.", when: "28/09 18:06" },

      { from: "Papa", text: "Avant de partir, active l'alarme.", when: "12/12 19:35" },
      { from: "Moi",  text: "Ok.", when: "12/12 19:36" },
      { from: "Papa", text: "Le code est 3819. Ne le partage pas.", when: "12/12 19:41" },
      { from: "Moi",  text: "Compris.", when: "12/12 19:42" }
    ],
    "Hugo": [
      { from: "Hugo", text: "T’as vu la nouvelle rampe au skatepark ?", when: "05/11 17:26" },
      { from: "Moi",  text: "Pas encore 😅", when: "05/11 17:27" },
      { from: "Hugo", text: "Elle est trop bien, faut venir !", when: "05/11 17:28" },

      { from: "Hugo", text: "Skatepark samedi ? 😎", when: "Hier 21:08" },
      { from: "Moi",  text: "Oui carrément.", when: "Hier 21:09" },
      { from: "Hugo", text: "14h, comme d'hab ?", when: "Hier 21:10" },
      { from: "Moi",  text: "Ok 14h 👍", when: "Hier 21:11" }
    ],
    "Coach (Foot)": [
      { from: "Coach", text: "Pense à ton certificat / autorisation parentale.", when: "28/10 17:02" },
      { from: "Moi",   text: "Ok coach.", when: "28/10 17:03" },

      { from: "Coach", text: "Rappel entraînement foot mercredi 16h30.", when: "Lun 16:10" },
      { from: "Moi",   text: "Ok coach.", when: "Lun 16:11" },
      { from: "Coach", text: "Pense à prendre ta gourde.", when: "Lun 16:12" }
    ]
  }
};


function getConversationFor(title) {
    const custom = activeProfile?.full?.messages?.conversations || {};
    if (custom[title]) return custom[title];

    const key = activeProfileKey;
    const pack = CONVERSATIONS[key] || {};
    return pack[title] || [
      { from: title, text: "Salut !", when: "" },
      { from: "Moi", text: "Salut 🙂", when: "" }
    ];
  }



  // ----- Plans (Leaflet) -----
  let mapsLeaflet = null;
  let mapsMarker = null;

  let mapsBaseLayer = null;
  let mapsLabelsLayer = null;
  function destroyMapsLeaflet() {
    try {
      if (mapsLeaflet) {
        mapsLeaflet.remove();
      }
    } catch (e) {
      // ignore
    }
    mapsLeaflet = null;
    mapsMarker = null;
    mapsBaseLayer = null;
    mapsLabelsLayer = null;
  }

function initMapsLeafletView() {
  // On ne crée la carte que si l'app Plans est active
  const current = navStack[navStack.length - 1];
  if (current !== "maps") return;

  const host = document.getElementById("maps-map");
  if (!host) return;

  destroyMapsLeaflet();

  const idx = Number.isFinite(UI.maps.selected) ? UI.maps.selected : null;
  if (idx === null) return;

  const m = (activeProfile && activeProfile.full && activeProfile.full.maps) ? activeProfile.full.maps : {};
  const places = m.recentPlaces || [];
  const p = places[idx];

  if (!p || typeof p.lat !== "number" || typeof p.lng !== "number") {
    host.innerHTML = `<div class="map-placeholder">Coordonnées manquantes.</div>`;
    return;
  }

  if (typeof window.L === "undefined") {
    host.innerHTML = `<div class="map-placeholder">Carte indisponible (bibliothèque non chargée).</div>`;
    return;
  }

  const zoom = Number.isFinite(p.zoom) ? p.zoom : 16;
  host.innerHTML = "";

  // Crée la carte
  mapsLeaflet = L.map(host, {
    zoomControl: true,
    attributionControl: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
  }).setView([p.lat, p.lng], zoom);

  // Couches de carte (toggle)
  const cartoLight = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      subdomains: "abcd",
      maxZoom: 19,
      detectRetina: true,
      crossOrigin: true,
    }
  );

  const esriImagery = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 19,
      detectRetina: true,
      crossOrigin: true,
    }
  );

  const esriLabels = L.tileLayer(
    "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 19,
      detectRetina: true,
      crossOrigin: true,
      opacity: 0.95,
    }
  );

  // Mode par défaut : satellite
  if (!UI.maps.layer) UI.maps.layer = "sat";

  function applyMapsLayer(mode) {
    try {
      if (mapsBaseLayer) mapsLeaflet.removeLayer(mapsBaseLayer);
      if (mapsLabelsLayer) mapsLeaflet.removeLayer(mapsLabelsLayer);
    } catch (e) { /* ignore */ }

    if (mode === "map") {
      mapsBaseLayer = cartoLight.addTo(mapsLeaflet);
      mapsLabelsLayer = null;
    } else {
      mapsBaseLayer = esriImagery.addTo(mapsLeaflet);
      mapsLabelsLayer = esriLabels.addTo(mapsLeaflet);
    }

    const btn = document.querySelector("[data-map-toggle]");
    if (btn) btn.textContent = (mode === "map") ? "Vue satellite" : "Vue carte";
  }

  applyMapsLayer(UI.maps.layer);

  // Marker
  mapsMarker = L.marker([p.lat, p.lng], { title: p.name || "Lieu" }).addTo(mapsLeaflet);

  // Important quand l'élément vient d'être injecté dans le DOM
  setTimeout(() => {
    try { mapsLeaflet && mapsLeaflet.invalidateSize(); } catch (e) {}
  }, 120);
}


// ---------- Apps rendering ----------
  function guardFull() {
    if (unlockLevel < 2) {
      return `<div class="card"><div class="big">Accès protégé</div><div class="muted">Déverrouille le compte sur l’écran d’accueil.</div></div>`;
    }
    return null;
  }

  function renderApp(appId) {
    appContent.scrollTop = 0;

    const titleMap = {
      phone: "Téléphone",
      health: "Santé - fiche médicale d'urgence",
      notifications: "Notifications",
      quicknotes: "Notes rapides",
      about: "À propos",
      social: "Réseau social",
      messages: "Messages",
      photos: "Galerie",
      notes: "Notes",
      mail: "Mail",
      browser: "Navigateur",
      maps: "Plans",
      downloads: "Fichiers",
      bank: "Paiements",
      settings: "Réglages",
    };
    appTitle.textContent = titleMap[appId] || appId;

    const renderers = {
      phone: renderPhone,
      health: renderHealth,      notifications: renderNotifications,
      quicknotes: renderQuickNotes,
      about: renderAbout,

      social: renderSocial,
      messages: renderMessages,
      photos: renderPhotos,
      notes: renderNotes,
      mail: renderMail,
      browser: renderBrowser,
      maps: renderMaps,
      downloads: renderDownloads,
      bank: renderBank,
      settings: renderSettings,
    };

    const fn = renderers[appId];
    const html = fn
      ? fn()
      : `<div class="card"><div class="big">App inconnue</div></div>`;

    appContent.innerHTML = html;

    if (appId === "maps") {
      setTimeout(initMapsLeafletView, 0);
    } else {
      destroyMapsLeaflet();
    }
  }

  // ----- Guest apps -----
  function renderCamera() {
    const key = activeProfileKey;
    const pics = (activeProfile.limited.cameraPhotos || []).map(p => {
      const imgTag = p.img ? `<img class="photo-img" src="${assetPhone(key, p.img)}" alt="">` : "";

      if (p.type === "postit") {
        return `
          <div class="card">
            <div class="photo">
              <div class="photo-title">${escapeHtml(p.title)}</div>
              ${imgTag}
              <div class="photo-body">
                <div class="pre">${escapeHtml(p.text)}</div>
                <div class="pwd-reveal">${escapeHtml(p.reveal)}</div>
                <div class="muted" style="margin-top:8px">(Très mauvaise pratique.)</div>
              </div>
            </div>
          </div>
        `;
      }

      return `
        <div class="item">
          <div class="item-title">🖼️ ${escapeHtml(p.title)}</div>
          ${imgTag}
          <div class="item-sub">${escapeHtml(formatWhen(p.meta || ""))}</div>
        </div>
      `;
    }).join("");

    return `
      <div class="card"><div class="big">Caméra</div><div class="muted">Mode invité : quelques éléments visibles.</div></div>
      <div class="card"><div class="list">${pics}</div></div>
    `;
  }

  function renderNotifications() {
    const notifsArr = (activeProfile.limited.notifications || []);
    const notifs = notifsArr.map(n => `
      <div class="notif-card">
        <div class="notif-icon">${escapeHtml((n.app || "?")[0] || "?")}</div>
        <div class="notif-body">
          <div class="row notif-head">
            <div><b>${escapeHtml(n.app)}</b> <span>${escapeHtml(n.title)}</span></div>
            <div class="muted">${escapeHtml(formatWhen(n.when))}</div>
          </div>
          <div class="notif-preview">${escapeHtml(n.preview)}</div>
        </div>
      </div>
    `).join("");

    return `
      ${appSectionTitle("Notifications", "mode invité après saisie du code PIN")}
      <div class="notification-list">
        ${notifs || `<div class="empty-state">Aucune notification.</div>`}
      </div>
    `;
  }

  function renderQuickNotes() {
    const notes = (activeProfile.limited.quickNotes || []).map(n => `
      <div class="item">
        <div class="item-title">${escapeHtml(n.title)}</div>
        <div class="item-sub pre">${escapeHtml(n.body)}</div>
      </div>
    `).join("");

    return `
      <div class="card"><div class="big">Notes rapides</div><div class="muted">Exemple d’info sensible laissée visible.</div></div>
      <div class="card"><div class="list">${notes}</div></div>
    `;
  }

  function renderAbout() {
    const g = guardFull(); if (g) return g;
    const o = activeProfile.owner;
    const device = activeProfile.device || {};
    const line = (label, value) => value ? `<div class="info-line"><span>${escapeHtml(label)}</span><b>${escapeHtml(value)}</b></div>` : "";

    return `
      <div class="profile-card-real">
        ${avatarHtml(o.prenom + " " + o.nom, "skate.jpg", "profile-avatar")}
        <div class="profile-main">
          <div class="profile-name">${escapeHtml(o.prenom)} ${escapeHtml(o.nom)}</div>
          <div class="profile-sub">Téléphone personnel</div>
        </div>
      </div>

      <div class="settings-card">
        ${appSectionTitle("Carte personnelle")}
        ${line("Nom d'utilisateur", o.username)}
        ${line("Date de naissance", o.dateNaissance)}
        ${line("Adresse", o.adresse)}
        ${line("Téléphone", o.telephone)}
        ${line("Email", o.email)}
        ${line("Responsable 1", o.responsable1)}
        ${line("Responsable 2", o.responsable2)}
      </div>

      <div class="settings-card">
        ${appSectionTitle("Appareil")}
        ${line("Nom de l'appareil", device.deviceName)}
        ${line("Modèle", device.model || "Smartphone")}
        ${line("Système", device.os || "OS mobile")}
        ${line("Stockage", device.storage)}
        ${line("Batterie", device.battery)}
        ${line("Réseau", device.network)}
        ${line("Dernière sauvegarde", device.lastBackup)}
      </div>
    `;
  }

  // --- Téléphone (mode invité) ---
  function renderPhone() {
    const recent = (activeProfile?.limited?.recentCalls || []).map(c => `
      <div class="call-row">
        <div class="call-avatar">${escapeHtml(initials(c.name))}</div>
        <div class="call-main">
          <div class="row"><div class="item-title">${escapeHtml(c.name)}</div><div class="muted">${escapeHtml(c.when || "")}</div></div>
          <div class="item-sub">${escapeHtml(c.type || "appel")} • ${escapeHtml(c.phone || "")}</div>
        </div>
      </div>
    `).join("");

    return `
      <div class="dialer-screen">
        <input id="dial-input" class="dial-input-real" type="text" inputmode="numeric" placeholder="Composer" autocomplete="off" />
        <div id="dial-status" class="dial-status"></div>

        <div class="phone-keypad real-dialpad" aria-label="Clavier téléphone">
          ${[["1",""],["2","ABC"],["3","DEF"],["4","GHI"],["5","JKL"],["6","MNO"],["7","PQRS"],["8","TUV"],["9","WXYZ"],["*",""],["0","+"],["#",""]].map(([d,sub]) => `
            <button class="key dial-key" type="button" data-key="${d}">
              <div class="key-big">${d}</div>
              <div class="key-sub">${sub}</div>
            </button>
          `).join("")}
        </div>

        <div class="phone-actions real-phone-actions">
          <button class="key key-back" type="button" data-key="BACK">⌫</button>
          <button class="call-btn real-call" type="button" data-dial="__CUSTOM__">📞</button>
          <button class="key key-clear" type="button" data-key="CLEAR">Effacer</button>
        </div>
      </div>

      <div class="settings-card">
        ${appSectionTitle("Récents")}
        <div class="call-list">${recent || `<div class="empty-state">Aucun appel récent.</div>`}</div>
      </div>

      <div class="settings-card emergency-card">
        ${appSectionTitle("Appels d’urgence")}
        <div class="emergency-grid">
          <button class="emergency-btn" type="button" data-dial="112">112<br><span>Urgences</span></button>
          <button class="emergency-btn" type="button" data-dial="15">15<br><span>SAMU</span></button>
          <button class="emergency-btn" type="button" data-dial="17">17<br><span>Police</span></button>
          <button class="emergency-btn" type="button" data-dial="18">18<br><span>Pompiers</span></button>
        </div>
      </div>
    `;
  }

  function dialBtn(num, label) {
    return `<button class="pill" type="button" data-dial="${escapeHtml(num)}">${escapeHtml(label)}</button>`;
  }

  // --- Santé (mode invité) ---
  function renderHealth() {
    const card = (activeProfile && activeProfile.limited && activeProfile.limited.healthCard) ? activeProfile.limited.healthCard : null;
    if (!card) return `<div class="empty-state">Fiche d’urgence indisponible.</div>`;

    const contacts = (card.iceContacts || []).map(c => `
      <div class="contact-row">
        <div class="contact-avatar">${escapeHtml(initials(c.name))}</div>
        <div>
          <div class="item-title">${escapeHtml(c.label)} — ${escapeHtml(c.name)}</div>
          <div class="item-sub">${escapeHtml(c.phone)}</div>
        </div>
      </div>
    `).join("");

    return `
      <div class="health-header">
        <div class="health-heart">♥</div>
        <div>
          <div class="big">Fiche médicale d’urgence</div>
          <div class="muted">${escapeHtml(card.identity || activeProfile.owner.prenom + " " + activeProfile.owner.nom)}</div>
        </div>
      </div>

      <div class="settings-card">
        ${appSectionTitle("Identité médicale")}
        <div class="health-grid">
          <div class="health-tile"><span>Date de naissance</span><b>${escapeHtml(card.birthDate || "—")}</b></div>
          <div class="health-tile"><span>Groupe sanguin</span><b>${escapeHtml(card.bloodType)}</b></div>
          <div class="health-tile"><span>N° patient</span><b>${escapeHtml(card.patientId || "—")}</b></div>
          <div class="health-tile"><span>Sécurité sociale</span><b>${escapeHtml(card.insuranceIdPartial || "—")}</b></div>
        </div>
      </div>

      <div class="settings-card">
        ${appSectionTitle("Informations médicales")}
        <div class="health-grid">
          <div class="health-tile"><span>Allergies</span><b>${escapeHtml(card.allergies || "Aucune connue")}</b></div>
          <div class="health-tile"><span>Traitement</span><b>${escapeHtml(card.treatment || "—")}</b></div>
          <div class="health-tile health-tile-wide"><span>Informations</span><b>${escapeHtml(card.conditions || "—")}</b></div>
        </div>
      </div>

      <div class="settings-card">
        ${appSectionTitle("Contacts d’urgence")}
        <div class="contact-list">${contacts || `<div class="empty-state">Aucun contact.</div>`}</div>
      </div>
    `;
  }

  // ----- Full apps -----
  function renderSocial() {
    const g = guardFull(); if (g) return g;
    const s = activeProfile.full.social || {};
    const profile = s.profile || {};
    const stats = profile.stats || {};

    const feed = (s.feed || []).map(p => {
      const comments = (p.comments || []).map(c => `
        <div class="comment"><b>${escapeHtml(c.user)}</b> ${escapeHtml(c.text)}</div>
      `).join("");
      const location = p.location ? `<div class="post-location">📍 ${escapeHtml(p.location)}</div>` : "";
      const counts = `${escapeHtml(p.likes || "0")} J’aime${p.commentsCount ? ` • ${escapeHtml(p.commentsCount)} commentaires` : ""}`;
      return `
        <article class="social-post">
          <div class="post-head">
            ${avatarHtml(p.user, p.user === profile.pseudo ? profile.avatar : "", "post-avatar")}
            <div class="post-meta">
              <div class="item-title">${escapeHtml(p.user)}</div>
              <div class="muted">${escapeHtml(formatWhen(p.date || ""))}</div>
            </div>
            <button class="post-more" type="button" aria-label="Plus d’options">•••</button>
          </div>
          <div class="post-text">${escapeHtml(p.text || "")}</div>
          ${phoneImage(p.image, "post-image", p.text || "publication")}
          ${location}
          <div class="post-counts">${counts}</div>
          <div class="post-actions">♡ J’aime   💬 Commenter   ↗ Partager</div>
          ${comments ? `<div class="comments">${comments}</div>` : ""}
        </article>
      `;
    }).join("");

    return `
      <div class="social-profile">
        ${avatarHtml(profile.pseudo || "Mathis", profile.avatar || "", "profile-avatar")}
        <div class="profile-name">${escapeHtml(profile.displayName || profile.pseudo || "Mathis")}</div>
        <div class="profile-sub">@${escapeHtml(profile.pseudo || "mathis_g")} • ${escapeHtml(profile.privacy || "Compte")}</div>
        <div class="profile-sub">${escapeHtml(profile.bio || "")}</div>
        <div class="social-stats">
          <div><b>${escapeHtml(stats.posts || "—")}</b><span>posts</span></div>
          <div><b>${escapeHtml(stats.followers || "—")}</b><span>abonnés</span></div>
          <div><b>${escapeHtml(stats.following || "—")}</b><span>suivis</span></div>
        </div>
      </div>
      <div class="social-feed-real">${feed}</div>
    `;
  }

  function renderMessages() {
    const g = guardFull(); if (g) return g;
    const m = activeProfile.full.messages || {};
    const selected = UI.messages.thread;

    if (selected) {
      const convo = getConversationFor(selected);
      const isGroup = selected.toLowerCase().includes("groupe") || new Set(convo.map(x => x.from).filter(x => x && x !== "Moi")).size > 1;
      const bubbles = convo.map(msg => {
        const me = (msg.from === "Moi");
        const sender = (!me && msg.from) ? `<div class="bubble-sender">${escapeHtml(msg.from)}</div>` : (me && isGroup ? `<div class="bubble-sender bubble-sender-me">Moi</div>` : ``);
        return `
          <div class="bubble ${me ? "me" : "them"}">
            ${sender}
            <div>${escapeHtml(msg.text)}</div>
            ${msg.when ? `<div class="bubble-meta">${escapeHtml(formatWhen(msg.when))}</div>` : ``}
          </div>
        `;
      }).join("");

      return `
        <div class="chat-header-real">
          <button class="chat-back" type="button" data-msg-back="1">←</button>
          ${avatarHtml(selected, "", "contact-avatar")}
          <div><div class="item-title">${escapeHtml(selected)}</div><div class="muted">SMS / Messages</div></div>
        </div>
        <div class="chat-real">${bubbles}</div>
      `;
    }

    const threads = (m.threads || []).map(t => `
      <button class="thread-row" type="button" data-msg-thread="${escapeHtml(t.title)}">
        ${avatarHtml(t.title, "", "contact-avatar")}
        <div class="thread-main">
          <div class="row"><div class="item-title">${escapeHtml(t.title)}</div><div class="muted">${escapeHtml(formatWhen(t.when || ""))}</div></div>
          <div class="thread-snippet">${escapeHtml(t.snippet || "")}</div>
        </div>
      </button>
    `).join("");

    return `
      ${appSectionTitle("Messages", "conversations récentes")}
      <div class="thread-list">${threads || `<div class="empty-state">Aucune discussion.</div>`}</div>
    `;
  }

  function renderPhotos() {
    const g = guardFull(); if (g) return g;
    const items = (activeProfile.full.photos || []).map(p => `
      <figure class="gallery-tile">
        ${phoneImage(p.img, "gallery-img", p.label || "photo")}
        <figcaption>
          <b>${escapeHtml(p.label)}</b>
          <span>${escapeHtml(formatWhen(p.meta || ""))}</span>
          ${p.place ? `<small>${escapeHtml(p.place)}</small>` : ""}
        </figcaption>
      </figure>
    `).join("");

    return `
      ${appSectionTitle("Galerie", "photos enregistrées sur le téléphone")}
      <div class="gallery-grid">
        ${items || `<div class="empty-state">Aucune photo.</div>`}
      </div>
    `;
  }
  function renderNotes() {
    const g = guardFull(); if (g) return g;

    const items = (activeProfile.full.notes || []).map(n => {
      const body = String(n.body || "").replace(/\n/g, "\n\n");
      return `
        <article class="note-card-real">
          <div class="note-title-real">${escapeHtml(n.title)}</div>
          <div class="note-body-real pre">${escapeHtml(body)}</div>
        </article>
      `;
    }).join("");

    return `
      ${appSectionTitle("Notes", "informations enregistrées")}
      <div class="notes-grid-real">${items || `<div class="empty-state">Aucune note.</div>`}</div>
    `;
  }
  function renderMail() {
    const g = guardFull(); if (g) return g;
    const auth = activeProfile.full.mailLogin || {};
    const address = auth.address || activeProfile.owner.email;
    const inbox = auth.inbox || activeProfile.full.mail || [];

    if (!UI.mail.authed) {
      return `
        <div class="mail-login-card">
          <div class="mail-logo">M</div>
          <div class="profile-name">Connexion</div>
          <div class="profile-sub">Adresse mail et mot de passe requis</div>
          <label class="field mail-field">
            <span>Adresse mail</span>
            <input id="mail-address" class="input" type="email" placeholder="adresse@mail.fr" autocomplete="off" spellcheck="false">
          </label>
          <label class="field mail-field">
            <span>Mot de passe</span>
            <input id="mail-pass" class="input" type="password" placeholder="Mot de passe" autocomplete="off">
          </label>
          <div id="mail-msg" class="muted"></div>
          <button class="primary" type="button" data-mail-login="1">Se connecter</button>
        </div>
      `;
    }

    const selectedIdx = Number.isFinite(UI.mail.selected) ? UI.mail.selected : null;
    if (selectedIdx !== null && inbox[selectedIdx]) {
      const m = inbox[selectedIdx];
      const body = formatTextDates(String(m.body || m.snippet || "")).replace(/\n/g, "\n\n");
      return `
        <div class="mail-topbar">
          <button class="ghost" type="button" data-mail-back="1">← Retour</button>
          <button class="ghost" type="button" data-mail-logout="1">Déconnexion</button>
        </div>
        <article class="mail-detail">
          <div class="mail-detail-head">
            <div class="mail-avatar">${escapeHtml(initials(m.from))}</div>
            <div>
              <div class="item-title">${escapeHtml(m.from || "")}</div>
              <div class="item-sub">${escapeHtml(formatWhen(m.when || ""))}</div>
            </div>
          </div>
          <h2 class="mail-detail-subject">${escapeHtml(m.subject || "")}</h2>
          <div class="mail-detail-body pre">${escapeHtml(body)}</div>
        </article>
      `;
    }

    const items = (inbox || []).map((m, i) => `
      <button class="mail-row" type="button" data-mail-open="${i}">
        <div class="mail-avatar">${escapeHtml(initials(m.from))}</div>
        <div class="mail-main">
          <div class="row"><div class="item-title">${escapeHtml(m.from)}</div><div class="muted">${escapeHtml(formatWhen(m.when||""))}</div></div>
          <div class="mail-subject">${escapeHtml(m.subject)}</div>
          <div class="thread-snippet">${escapeHtml(m.snippet)}</div>
        </div>
      </button>
    `).join("");

    return `
      <div class="mail-account-row">
        <div class="mail-account">Connecté : <b>${escapeHtml(address)}</b></div>
        <button class="ghost" type="button" data-mail-logout="1">Déconnexion</button>
      </div>
      <div class="mail-list">${items || `<div class="empty-state">Boîte de réception vide.</div>`}</div>
    `;
  }

  function renderBrowser() {
    const g=guardFull(); if(g) return g;
    const b = activeProfile.full.browser || {};
    const tab = UI.browser.tab || "home";

    const tabBtn = (id, label) => `
      <button class="seg-btn ${tab===id ? "on":""}" type="button" data-browser-tab="${id}">${label}</button>
    `;

    const historyItems = (b.history || []).map(x => `
      <div class="browser-row"><span>↺</span><div>${escapeHtml(x)}</div></div>
    `).join("");

    const suggestions = (b.suggestions || []).map(s => `
      <div class="browser-row"><span>🔎</span><div>${escapeHtml(s)}</div></div>
    `).join("");

    const tabs = (b.openTabs || []).map(t => `
      <div class="browser-tab-card"><span>▣</span><div>${escapeHtml(t)}</div></div>
    `).join("");

    const privacy = (b.privacy || []).map(x => `
      <div class="privacy-row"><span>${escapeHtml(x.label)}</span><b>${escapeHtml(x.value)}</b></div>
    `).join("");

    const homeHtml = `
      <div class="browser-home-real">
        <div class="browser-logo-real">Recherche</div>
        <div class="browser-search-real">🔎 <span>Rechercher ou saisir une adresse</span></div>
      </div>
      ${tabs ? `<div class="browser-mini-title">Onglets récents</div><div class="browser-tabs-list">${tabs}</div>` : ""}
      <div class="browser-mini-title">Suggestions</div>
      <div class="browser-card-list">${suggestions}</div>
    `;

    const histHtml = `<div class="browser-card-list">${historyItems || `<div class="empty-state">Historique vide.</div>`}</div>`;
    const privacyHtml = `<div class="settings-card browser-privacy-card">${appSectionTitle("Confidentialité du navigateur")} ${privacy || `<div class="empty-state">Aucune donnée.</div>`}</div>`;

    return `
      <div class="browser-tabs seg">
        ${tabBtn("home","Accueil")}
        ${tabBtn("history","Historique")}
        ${tabBtn("privacy","Confidentialité")}
      </div>
      ${tab === "history" ? histHtml : (tab === "privacy" ? privacyHtml : homeHtml)}
    `;
  }

  function renderMaps() {
    const g = guardFull(); if (g) return g;

    const m = activeProfile.full.maps || {};
    const places = m.recentPlaces || [];
    let sel = Number.isFinite(UI.maps.selected) ? UI.maps.selected : null;
    if (sel === null && places.length) {
      const defaultPlace = String(m.defaultPlace || "Collège Jean Monnet");
      const found = places.findIndex(p => String(p.name || "").includes(defaultPlace) || String(p.address || "").includes(defaultPlace));
      sel = found >= 0 ? found : 0;
      UI.maps.selected = sel;
    }
    const selected = (sel !== null && places[sel]) ? places[sel] : null;

    const mapInner = selected
      ? `<div class="map-loading">Chargement du plan…</div>`
      : `<div class="map-placeholder">Sélectionne un lieu récent</div>`;

    const items = places.map((p, i) => {
      const active = (sel === i) ? "is-active" : "";
      return `
        <div class="map-place-real ${active}" data-map-place="${i}" role="button" tabindex="0">
          <div class="pin-dot">⌖</div>
          <div>
            <div class="row"><div class="item-title">${escapeHtml(p.name)}</div><div class="muted">${escapeHtml(formatWhen(p.when || ""))}</div></div>
            <div class="item-sub">${escapeHtml(p.address || "")}</div>
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="maps-card-real">
        <div class="maps-toolbar">
          <button class="maps-toggle" type="button" data-map-toggle>${UI.maps.layer === "map" ? "Vue satellite" : "Vue carte"}</button>
        </div>
        <div id="maps-map" class="maps-map" aria-label="Carte">${mapInner}</div>
        <div class="maps-attrib muted" id="maps-address">${selected ? escapeHtml(selected.address || selected.name || "") : ""}</div>
      </div>
      ${appSectionTitle("Lieux récents")}
      <div class="places-list-real">${items || `<div class="empty-state">Aucun lieu enregistré.</div>`}</div>
    `;
  }

  function renderDownloads() {
    const g=guardFull(); if(g) return g;
    const files = activeProfile.full.downloads || [];
    const sel = UI.downloads.selected;

    function extOf(name){ const m = /\.([a-z0-9]+)$/i.exec(name||""); return m ? m[1].toLowerCase() : ""; }
    function fileIcon(ext){
      if (["jpg","jpeg","png","gif","webp"].includes(ext)) return "🖼️";
      if (["mp3","wav","m4a","aac"].includes(ext)) return "🎵";
      if (ext === "pdf") return "PDF";
      if (["doc","docx","odt","txt","rtf"].includes(ext)) return "DOC";
      return "📄";
    }

    if (Number.isFinite(sel) && files[sel]) {
      const f = files[sel];
      const ext = extOf(f.name);
      return `
        <div class="file-detail-real">
          <button class="ghost" type="button" data-file-back="1">← Retour</button>
          <div class="file-preview-real">
            ${f.image ? phoneImage(f.image, "file-image-preview", f.name) : `<div class="file-big-icon">${escapeHtml(fileIcon(ext))}</div>`}
          </div>
          <div class="profile-name">${escapeHtml(f.name)}</div>
          ${f.note ? `<div class="profile-sub">${escapeHtml(f.note)}</div>` : ""}
          <div class="file-meta-detail">
            ${f.date ? `<div><span>Date</span><b>${escapeHtml(formatWhen(f.date))}</b></div>` : ""}
            ${f.source ? `<div><span>Source</span><b>${escapeHtml(f.source)}</b></div>` : ""}
          </div>
        </div>
      `;
    }

    const grid = files.map((f, i) => {
      const ext = extOf(f.name);
      return `
        <button class="file-tile-real" type="button" data-file-open="${i}">
          ${f.image ? phoneImage(f.image, "file-thumb", f.name) : `<div class="file-icon-real">${escapeHtml(fileIcon(ext))}</div>`}
          <div class="file-name">${escapeHtml(f.name)}</div>
        </button>
      `;
    }).join("");

    return `
      ${appSectionTitle("Fichiers", "téléchargements et documents")}
      <div class="file-grid-real">${grid}</div>
    `;
  }
  function renderBank() {
    const g = guardFull(); if (g) return g;
    const b = (activeProfile.full && activeProfile.full.bank) ? activeProfile.full.bank : {};
    const balance = b.balance || "—";
    const opsArr = Array.isArray(b.ops) ? b.ops : [];

    const ops = opsArr.map(o => `
      <div class="payment-row">
        <div class="payment-icon">€</div>
        <div class="payment-main">
          <div class="row"><div class="item-title">${escapeHtml(o.label || "—")}</div><div class="payment-amount">${escapeHtml(o.amount || "")}</div></div>
          <div class="item-sub">${escapeHtml(formatWhen(o.when || ""))}</div>
        </div>
      </div>
    `).join("");

    return `
      <div class="wallet-card-real">
        <div class="muted">Solde disponible</div>
        <div class="wallet-balance">${escapeHtml(balance)}</div>
        <div class="wallet-chip">Carte ado •••• 7812</div>
      </div>
      ${appSectionTitle("Opérations récentes")}
      <div class="payment-list">${ops || `<div class="empty-state">—</div>`}</div>
    `;
  }
  function renderSettings() {
    const g = guardFull(); if (g) return g;
    const s = activeProfile.full.settings || {};
    const accounts = (s.accounts || []).map(a => `
      <div class="info-line"><span>${escapeHtml(a.label)}</span><b>${escapeHtml(a.value)}</b></div>
    `).join("");
    const toggles = (s.toggles || []).map(t => `
      <label class="toggle-row real-setting-row">
        <span class="toggle-text">
          <span class="item-title">${escapeHtml(t.label)}</span>
          ${t.sub ? `<span class="item-sub">${escapeHtml(t.sub)}</span>` : ""}
        </span>
        <input type="checkbox" ${t.on ? "checked":""} disabled>
        <span class="toggle-ui"></span>
      </label>
    `).join("");

    return `
      <div class="settings-profile-mini">
        ${avatarHtml(activeProfile.owner.prenom + " " + activeProfile.owner.nom, "skate.jpg", "contact-avatar")}
        <div><div class="item-title">${escapeHtml(activeProfile.owner.prenom)} ${escapeHtml(activeProfile.owner.nom)}</div><div class="item-sub">Compte Samsung / Google</div></div>
      </div>
      ${accounts ? `<div class="settings-card">${appSectionTitle("Comptes et sauvegarde")}${accounts}</div>` : ""}
      ${appSectionTitle("Confidentialité et sécurité")}
      <div class="settings-list real-settings-list">
        ${toggles || `<div class="empty-state">Aucun réglage.</div>`}
      </div>
    `;
  }

  // ---------- Init ----------
  function init() {
    closeRecents();
    updatePhoneScale();

    loadProfile("A");
    setInterval(updateTime, 1000 * 15);
  }

function updatePhoneScale(){
  const phone = document.querySelector(".phone");
  if (!phone) return;

  const root = getComputedStyle(document.documentElement);
  const w = parseFloat(root.getPropertyValue("--phone-w")) || 380;
  const h = parseFloat(root.getPropertyValue("--phone-h")) || 780;

  const margin = 44; // marge sécurité (padding page)
  const maxW = window.innerWidth - margin;
  const maxH = window.innerHeight - margin;

  let scale = Math.min(1, maxW / w, maxH / h);

  // Optionnel : évite que ce soit trop petit, au prix d’un scroll possible
  // scale = Math.max(scale, 0.75);

  phone.style.setProperty("--scale", scale.toFixed(3));
}

window.addEventListener("resize", () => requestAnimationFrame(updatePhoneScale));


  init();
})();
