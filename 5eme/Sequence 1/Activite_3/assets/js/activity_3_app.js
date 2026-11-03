(() => {
  "use strict";

  const activity = window.ACTIVITY;
  const app = document.getElementById("app");
  const scoredSteps = activity.steps.filter((step) => Number(step.points) > 0);
  const states = {};
  const wrongAttempts = {};
  const animationTimers = [];
  let activeScene = null;
  let stepIndex = 0;
  let score = 0;
  let currentMaximum = 0;
  let completed = false;

  function fitFrame() {
    const frame = document.getElementById("frame");
    if (!frame) return;
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    frame.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function shuffle(values) {
    const result = [...values];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  }

  function formatNumber(value) {
    const rounded = Math.round(value * 100) / 100;
    return Number.isInteger(rounded) ? String(rounded) : String(rounded).replace(".", ",");
  }

  function scoreLabel() {
    return currentMaximum ? `Note : ${formatNumber(score)} / ${formatNumber(currentMaximum)}` : "Note : —";
  }

  function questionPosition() {
    const step = activity.steps[stepIndex];
    if (!step?.points) return null;
    let number = 0;
    for (let index = 0; index <= stepIndex; index += 1) {
      if (activity.steps[index].points) number += 1;
    }
    return { number, total: scoredSteps.length };
  }

  function headerLabel() {
    const position = questionPosition();
    if (position) return `Question : ${position.number} sur ${position.total}`;
    return stepIndex === 0 ? "Consignes" : "Fin";
  }

  function renderShell() {
    app.innerHTML = `
      <div id="shell">
        <header class="header">
          <div class="header-activity">${escapeHtml(activity.activity)} : ${escapeHtml(activity.title)}</div>
          <div class="header-question">${headerLabel()}</div>
        </header>
        <main class="content" id="content"></main>
        <footer class="footer">
          <div class="feedback info" id="feedback">Lisez la consigne et échangez avant de valider.</div>
          <div class="actions" id="actions"></div>
          <div class="score" id="score">${scoreLabel()}</div>
        </footer>
      </div>`;
    fitFrame();
  }

  function setFeedback(message, kind = "info") {
    const feedback = document.getElementById("feedback");
    const lengthClass = message.length > 220 ? " extra-long" : message.length > 135 ? " long" : "";
    feedback.className = `feedback ${kind}${lengthClass}`;
    feedback.textContent = message;
  }

  function makeButton(text, handler, primary = false) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `action${primary ? " primary" : ""}`;
    button.textContent = text;
    button.addEventListener("click", handler);
    return button;
  }

  function setActions(buttons) {
    document.getElementById("actions").replaceChildren(...buttons);
  }

  function addWrongAttempt() {
    wrongAttempts[stepIndex] = (wrongAttempts[stepIndex] || 0) + 1;
    return wrongAttempts[stepIndex];
  }

  function completeStep(step, successMessage, afterSuccess = null) {
    if (completed) return;
    completed = true;
    const attempts = wrongAttempts[stepIndex] || 0;
    const gained = Math.max(0, step.points - attempts * step.points * 0.25);
    score += gained;
    currentMaximum += step.points;
    document.getElementById("score").textContent = scoreLabel();
    if (afterSuccess) afterSuccess();
    const used = attempts + 1;
    const result = `${successMessage} ${formatNumber(gained)} point${gained > 1 ? "s" : ""} gagné${gained > 1 ? "s" : ""} sur ${formatNumber(step.points)} - ${used} essai${used > 1 ? "s" : ""}.`;
    setFeedback(result, "ok");
    const isLast = stepIndex === activity.steps.length - 1;
    const nextButton = makeButton(isLast ? "Voir le résultat" : "Question suivante", nextStep, true);
    if (afterSuccess) {
      nextButton.disabled = true;
      nextButton.title = "Observez le début de l’animation avant de poursuivre.";
      later(2000, () => {
        if (!nextButton.isConnected) return;
        nextButton.disabled = false;
        nextButton.title = "";
      });
    }
    setActions([nextButton]);
  }

  function nextStep() {
    clearAnimationTimers();
    stepIndex += 1;
    completed = false;
    if (stepIndex >= activity.steps.length) renderFinish();
    else render();
  }

  function clearAnimationTimers() {
    while (animationTimers.length) clearTimeout(animationTimers.pop());
    if (activeScene) activeScene.destroy();
    activeScene = null;
  }

  function later(delay, callback) {
    animationTimers.push(setTimeout(callback, delay));
  }

  function introVisual() {
    return `<div class="a3-intro-visual" aria-label="Aperçu des scènes animées">
      <div class="intro-scene-card intro-plane"><img src="assets/images/solar_plane_panels.png" alt="Avion solaire dont les ailes portent des panneaux photovoltaïques"></div>
      <div class="intro-scene-card intro-radiator"><img src="assets/images/electric_radiator.png" alt="Radiateur électrique"></div>
    </div>`;
  }

  function renderIntro(step) {
    document.getElementById("content").innerHTML = `<div class="intro-grid a3-intro-grid">
      <section class="intro-instructions"><h2>${escapeHtml(step.title)}</h2><div class="intro-lines">${step.instructions.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}</div></section>
      <section class="intro-visual">${introVisual()}</section>
    </div>`;
    setFeedback(activity.introFeedback, "info");
    setActions([makeButton("Commencer", nextStep, true)]);
  }

  function sourceThumbnail(id) {
    return `<span class="source-thumb source-${id}" aria-hidden="true"></span>`;
  }

  function prepareDragPreview(event, value, label = value) {
    if (!event.dataTransfer) return;
    event.dataTransfer.setData("text/plain", value);
    event.dataTransfer.effectAllowed = "copy";
    const ghost = document.createElement("div");
    ghost.className = "energy-drag-preview";
    ghost.innerHTML = escapeHtml(label).replace("\n", "<br>");
    document.body.appendChild(ghost);
    event.dataTransfer.setDragImage(ghost, 92, 27);
    event.currentTarget.addEventListener("dragend", () => ghost.remove(), { once: true });
  }

  function renderSourceMatch(step) {
    if (!states[stepIndex]) states[stepIndex] = { assignments: Object.fromEntries(step.pairs.map((pair) => [pair.id, Array(pair.forms.length).fill(null)])), selected: null };
    const state = states[stepIndex];
    const draw = () => {
      const board = document.getElementById("sourceMatchBoard");
      board.innerHTML = `<div class="source-form-palette">${activity.forms.map((form) => `<button class="form-chip${state.selected === form ? " selected" : ""}" draggable="true" data-form="${escapeHtml(form)}">Énergie<br>${escapeHtml(form.toLowerCase())}</button>`).join("")}</div>
        <div class="source-pair-grid">${step.pairs.map((pair) => {
          const assigned = state.assignments[pair.id];
          const slots = assigned.map((form, slotIndex) => `<button class="source-form-slot${form ? " filled" : ""}" data-pair-id="${pair.id}" data-slot-index="${slotIndex}">${form ? `Énergie<br>${escapeHtml(form.toLowerCase())}` : "Déposer une<br>forme d’énergie"}</button>`).join("");
          return `<article class="source-pair${assigned.length === 2 ? " double-answer" : ""}"><div class="source-visual-wrap">${sourceThumbnail(pair.id)}</div><div class="source-name">${escapeHtml(pair.label)}</div><div class="pair-arrow">➜</div><div class="source-answer-slots">${slots}</div></article>`;
        }).join("")}</div>`;
      board.querySelectorAll(".form-chip").forEach((chip) => {
        chip.addEventListener("click", () => { state.selected = chip.dataset.form; draw(); setFeedback(`Forme sélectionnée : ${state.selected}. Cliquez sur une source.`, "info"); });
        chip.addEventListener("dragstart", (event) => prepareDragPreview(event, chip.dataset.form, `Énergie\n${chip.dataset.form.toLowerCase()}`));
      });
      board.querySelectorAll(".source-form-slot").forEach((slot) => {
        slot.addEventListener("dragover", (event) => event.preventDefault());
        slot.addEventListener("drop", (event) => {
          event.preventDefault();
          const value = event.dataTransfer?.getData("text/plain");
          if (value && activity.forms.includes(value)) {
            state.assignments[slot.dataset.pairId][Number(slot.dataset.slotIndex)] = value;
            draw();
          }
        });
        slot.addEventListener("click", () => {
          if (!state.selected) return;
          const answers = state.assignments[slot.dataset.pairId];
          const index = Number(slot.dataset.slotIndex);
          answers[index] = answers[index] === state.selected ? null : state.selected;
          draw();
        });
      });
    };
    document.getElementById("content").innerHTML = `<div class="lab-layout"><div class="lab-prompt">${escapeHtml(step.prompt)}</div><div class="source-match-board" id="sourceMatchBoard"></div></div>`;
    draw();
    const hasDoubleAnswer = step.pairs.some((pair) => pair.forms.length > 1);
    setFeedback(`Sélectionnez ou déplacez une forme vers chaque case. Une case n’accepte qu’une réponse.${hasDoubleAnswer ? " Le Soleil possède deux cases." : ""}`, "info");
    setActions([makeButton("Valider", () => {
      const answers = step.pairs.map((pair) => state.assignments[pair.id]);
      if (answers.some((answer) => answer.some((value) => !value))) {
        setFeedback("Complétez toutes les cases avant de valider. Cet essai n’est pas compté.", "info");
        return;
      }
      const correctCount = step.pairs.filter((pair) => {
        const answer = [...state.assignments[pair.id]].sort();
        const expected = [...pair.forms].sort();
        return answer.length === expected.length && answer.every((value, index) => value === expected[index]);
      }).length;
      if (correctCount === step.pairs.length) {
        document.querySelectorAll(".source-pair").forEach((pair) => pair.classList.add("correct-pair"));
        completeStep(step, hasDoubleAnswer ? "Les six associations sont correctes, y compris les deux formes fournies par le Soleil." : "Les six associations sont correctes.");
        return;
      }
      const attempt = addWrongAttempt();
      let message = `${correctCount} association${correctCount > 1 ? "s sont" : " est"} correcte${correctCount > 1 ? "s" : ""} sur ${step.pairs.length}.`;
      if (attempt >= 2) message += hasDoubleAnswer ? " Indice : un mouvement correspond à une énergie cinétique ; brûler un combustible produit surtout de la chaleur ; le Soleil peut éclairer et chauffer." : " Indice : l’eau stockée en hauteur possède une énergie potentielle ; une caténaire fournit de l’électricité.";
      else message += " Relisez ce que fait chaque source avant d’essayer de nouveau.";
      setFeedback(message, "warn");
    }, true)]);
  }

  function sceneMarkup(scene, phase) {
    return `<div class="cinema-scene canvas-cinema" id="sceneVisual" data-scene="${escapeHtml(scene)}" data-phase="${escapeHtml(phase)}">
      <canvas class="energy-canvas" id="energyCanvas" width="1000" height="510" aria-label="Démonstration animée de la circulation et de la conversion de l’énergie"></canvas>
      <div class="scene-caption" id="sceneCaption">Observez les éléments, puis validez pour lancer la démonstration.</div>
      <button class="replay-scene" type="button" hidden>Revoir l’animation</button>
    </div>`;
  }

  function setSceneCaption(text) {
    const caption = document.getElementById("sceneCaption");
    if (caption) caption.textContent = text;
  }

  function runSceneAnimation(sceneName, phaseName) {
    clearAnimationTimers();
    const scene = document.getElementById("sceneVisual");
    const canvas = document.getElementById("energyCanvas");
    if (!scene || !canvas || !window.EnergyScene) return;
    scene.classList.add("running");
    const replay = scene.querySelector(".replay-scene");
    if (replay) replay.hidden = false;
    activeScene = new window.EnergyScene(canvas, sceneName, phaseName);
    activeScene.play();
    const sceneMessages = {
      solar: {
        sunlight: ["1. Le Soleil fournit une énergie lumineuse aux panneaux."],
        panel: ["1. Le Soleil fournit une énergie lumineuse aux panneaux.", "2. Les panneaux photovoltaïques fournissent de l’électricité."],
        full: ["1. Le Soleil fournit une énergie lumineuse aux panneaux.", "2. Les panneaux fournissent de l’électricité.", "3. Le moteur entraîne l’hélice et l’avion avance."]
      },
      tram: { motor: ["1. L’électricité circule dans la caténaire et atteint le tramway.", "2. Le rotor du moteur tourne.", "3. Le tramway se déplace sur les rails."] },
      sail: {
        wind: ["1. Le Vent atteint la voile : elle se tend et prend sa forme."],
        transfer: ["1. Le Vent en mouvement atteint la voile.", "2. Le voilier avance : l’énergie reste cinétique."]
      },
      kayak: { paddle: ["La personne met la pagaie en mouvement."] },
      steam: {
        fire: ["1. Le charbon brûle et produit une énergie thermique."],
        full: ["1. La vapeur chauffée pousse le piston.", "2. Le piston effectue des va-et-vient et entraîne la roue.", "3. La locomotive se déplace : énergie cinétique."]
      },
      slope: { full: ["1. En haut de la pente, la voiture possède une énergie potentielle.", "2. Sa hauteur diminue pendant la descente.", "3. Sa vitesse augmente."] },
      radiator: { full: ["1. L’électricité suit le câble depuis la prise.", "2. Le radiateur chauffe.", "3. L’air chaud sort par la grille et monte."] },
      lamp: { full: ["1. L’électricité suit le câble puis le pied de la lampe.", "2. L’ampoule reçoit l’électricité.", "3. La lampe produit de la lumière."] },
      generator: {
        crank: ["1. La main entraîne la manivelle : énergie cinétique."],
        electric: ["1. La main entraîne la manivelle.", "2. La génératrice convertit l’énergie cinétique en énergie électrique."],
        full: ["1. La main entraîne la manivelle.", "2. La génératrice produit de l’électricité.", "3. La DEL transforme l’électricité en lumière."]
      }
    };
    const messages = sceneMessages[sceneName]?.[phaseName] || ["Observez la circulation de l’énergie."];
    setSceneCaption(messages[0]);
    messages.slice(1).forEach((message, index) => later(1900 * (index + 1), () => setSceneCaption(message)));
  }

  function bindReplay(scene, phase) {
    const canvas = document.getElementById("energyCanvas");
    if (canvas && window.EnergyScene) {
      activeScene = new window.EnergyScene(canvas, scene, phase);
    }
    document.querySelector(".replay-scene")?.addEventListener("click", () => runSceneAnimation(scene, phase));
  }

  function renderSceneChoice(step) {
    if (!states[stepIndex]) states[stepIndex] = { selected: null, options: shuffle(step.options) };
    const state = states[stepIndex];
    document.getElementById("content").innerHTML = `<div class="lab-layout"><div class="lab-prompt">${escapeHtml(step.prompt)}</div><div class="animated-question"><section class="answer-zone"><div class="scene-options">${state.options.map((option) => `<button class="scene-option${state.selected === option ? " selected" : ""}" data-value="${escapeHtml(option)}">${escapeHtml(option)}</button>`).join("")}</div></section>${sceneMarkup(step.scene, step.phase)}</div></div>`;
    document.querySelectorAll(".scene-option").forEach((button) => button.addEventListener("click", () => {
      state.selected = button.dataset.value;
      document.querySelectorAll(".scene-option").forEach((item) => item.classList.toggle("selected", item === button));
    }));
    bindReplay(step.scene, step.phase);
    setFeedback("Choisissez la réponse qui correspond à la scène, puis validez pour lancer l’animation.", "info");
    setActions([makeButton("Valider et animer", () => {
      if (!state.selected) { setFeedback("Choisissez une réponse avant de valider. Cet essai n’est pas compté.", "info"); return; }
      if (state.selected === step.correct) {
        document.querySelectorAll(".scene-option").forEach((button) => { button.disabled = true; });
        completeStep(step, step.success, () => runSceneAnimation(step.scene, step.phase));
        return;
      }
      const attempt = addWrongAttempt();
      let message = "La réponse choisie ne correspond pas à ce qui est observé.";
      if (attempt >= 2) message += step.scene === "sail" ? " Indice : le vent et le voilier sont tous les deux en mouvement." : step.scene === "kayak" ? " Indice : observez ce qui bouge lorsque la personne agit sur la pagaie." : step.scene === "steam" ? " Indice : brûler du charbon chauffe l’eau." : " Indice : le rayonnement du Soleil apporte de la lumière.";
      else message += " Relisez la question et observez la source d’énergie.";
      setFeedback(message, "warn");
    }, true)]);
  }

  function conversionChainMarkup(step, answers) {
    const parts = [];
    step.slots.forEach((_, index) => {
      const label = answers[index] ? `Énergie ${answers[index].toLowerCase()}` : index === 0 ? "Énergie d’entrée" : index === step.slots.length - 1 ? "Énergie de sortie" : "Énergie intermédiaire";
      parts.push(`<button class="conversion-slot${answers[index] ? " filled" : ""}" data-slot="${index}">${escapeHtml(label)}</button>`);
      if (index < step.slots.length - 1) {
        const component = step.components ? step.components[index] : step.component;
        parts.push(`<span class="conversion-arrow">➜</span><div class="conversion-component">${escapeHtml(component)}</div><span class="conversion-arrow">➜</span>`);
      }
    });
    return parts.join("");
  }

  function renderConversion(step) {
    if (!states[stepIndex]) states[stepIndex] = { answers: Array(step.slots.length).fill(null), selected: null };
    const state = states[stepIndex];
    document.getElementById("content").innerHTML = `<div class="lab-layout"><div class="lab-prompt">${escapeHtml(step.prompt)}</div><div class="animated-question conversion-question"><section class="answer-zone conversion-answer"><div class="conversion-palette">${activity.forms.map((form) => `<button class="form-chip" draggable="true" data-form="${form}">Énergie<br>${escapeHtml(form.toLowerCase())}</button>`).join("")}</div><div class="photo-conversion-chain" id="conversionChain"></div></section>${sceneMarkup(step.scene, step.phase)}</div></div>`;
    const root = document.querySelector(".conversion-question");
    const chain = document.getElementById("conversionChain");
    const draw = () => {
      chain.innerHTML = conversionChainMarkup(step, state.answers);
      chain.querySelectorAll(".conversion-slot").forEach((slot) => {
        slot.addEventListener("dragover", (event) => event.preventDefault());
        slot.addEventListener("drop", (event) => {
          event.preventDefault();
          const form = event.dataTransfer?.getData("text/plain");
          if (form && activity.forms.includes(form)) { state.answers[Number(slot.dataset.slot)] = form; draw(); }
        });
        slot.addEventListener("click", () => { state.answers[Number(slot.dataset.slot)] = state.selected || null; draw(); });
      });
    };
    root.querySelectorAll(".form-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        state.selected = chip.dataset.form;
        root.querySelectorAll(".form-chip").forEach((other) => other.classList.toggle("selected", other === chip));
        setFeedback(`Forme sélectionnée : ${state.selected}. Cliquez sur une case de la conversion.`, "info");
      });
      chip.addEventListener("dragstart", (event) => prepareDragPreview(event, chip.dataset.form, `Énergie\n${chip.dataset.form.toLowerCase()}`));
    });
    draw();
    bindReplay(step.scene, step.phase);
    setFeedback("Placez les formes d’énergie dans l’ordre, puis validez pour observer la conversion.", "info");
    setActions([makeButton("Valider et animer", () => {
      if (state.answers.some((answer) => !answer)) { setFeedback("Complétez toutes les cases avant de valider. Cet essai n’est pas compté.", "info"); return; }
      const correctCount = state.answers.filter((answer, index) => answer === step.slots[index]).length;
      if (correctCount === step.slots.length) {
        document.querySelectorAll(".conversion-slot").forEach((slot) => { slot.disabled = true; });
        completeStep(step, "Conversion correctement reconstituée.", () => runSceneAnimation(step.scene, step.phase));
        return;
      }
      const attempt = addWrongAttempt();
      let message = `${correctCount} forme${correctCount > 1 ? "s sont" : " est"} correctement placée${correctCount > 1 ? "s" : ""} sur ${step.slots.length}.`;
      if (attempt >= 2) message += ` Indice : ${step.hint}`;
      else message += " Repérez ce que reçoit le composant et l’effet qu’il produit.";
      setFeedback(message, "warn");
    }, true)]);
  }

  function renderConversionGrid(step) {
    if (!states[stepIndex]) states[stepIndex] = { answers: step.rows.map(() => [null, null]), selected: null };
    const state = states[stepIndex];
    document.getElementById("content").innerHTML = `<div class="lab-layout"><div class="lab-prompt">${escapeHtml(step.prompt)}</div><div class="general-grid"><div class="conversion-palette">${activity.forms.map((form) => `<button class="form-chip" data-form="${form}">${form}</button>`).join("")}</div><div class="general-table" id="generalTable"></div><div class="general-animation"><div class="lamp-object">💡<span></span></div><div class="radiator-object">▥<span></span><span></span><span></span></div><div class="generator-object"><span class="generator-wheel">⚙</span><b>Génératrice</b></div></div></div></div>`;
    const root = document.querySelector(".general-grid");
    const table = document.getElementById("generalTable");
    const draw = () => {
      table.innerHTML = `<div class="general-row head"><b>Objet</b><b>Énergie d’entrée</b><b>Énergie de sortie</b></div>${step.rows.map((row, rowIndex) => `<div class="general-row"><strong>${escapeHtml(row.object)}</strong><button data-row="${rowIndex}" data-side="0">${state.answers[rowIndex][0] || "À compléter"}</button><button data-row="${rowIndex}" data-side="1">${state.answers[rowIndex][1] || "À compléter"}</button></div>`).join("")}`;
      table.querySelectorAll("button").forEach((slot) => slot.addEventListener("click", () => {
        state.answers[Number(slot.dataset.row)][Number(slot.dataset.side)] = state.selected || null;
        draw();
      }));
    };
    root.querySelectorAll(".form-chip").forEach((chip) => chip.addEventListener("click", () => {
      state.selected = chip.dataset.form;
      root.querySelectorAll(".form-chip").forEach((other) => other.classList.toggle("selected", other === chip));
    }));
    draw();
    setFeedback("Sélectionnez une forme, puis cliquez dans les cases du tableau. Une forme peut être utilisée plusieurs fois.", "info");
    setActions([makeButton("Valider", () => {
      if (state.answers.flat().some((answer) => !answer)) { setFeedback("Complétez les six cases avant de valider. Cet essai n’est pas compté.", "info"); return; }
      const correctCount = state.answers.reduce((total, answer, index) => total + Number(answer[0] === step.rows[index].input) + Number(answer[1] === step.rows[index].output), 0);
      if (correctCount === 6) {
        completeStep(step, "Les trois conversions sont correctes.", () => document.querySelector(".general-animation")?.classList.add("running"));
        return;
      }
      const attempt = addWrongAttempt();
      let message = `${correctCount} case${correctCount > 1 ? "s sont" : " est"} correcte${correctCount > 1 ? "s" : ""} sur 6.`;
      if (attempt >= 2) message += " Indice : une lampe produit de la lumière, un radiateur produit de la chaleur et une génératrice produit de l’électricité.";
      else message += " Cherchez ce que reçoit chaque objet et ce qu’il produit.";
      setFeedback(message, "warn");
    }, true)]);
  }

  function renderFinish() {
    renderShell();
    document.getElementById("content").innerHTML = `<section class="finish"><div><h2>Activité terminée</h2><div class="final-score">${formatNumber(score)} / 20</div><p>${escapeHtml(activity.finish)}</p></div></section>`;
    setFeedback("Complétez maintenant votre fiche d’activité.", "ok");
    const end = makeButton("Fin", () => {}, true);
    end.disabled = true;
    setActions([end]);
  }

  function render() {
    renderShell();
    const step = activity.steps[stepIndex];
    if (step.type === "intro") renderIntro(step);
    else if (step.type === "sourceMatch") renderSourceMatch(step);
    else if (step.type === "sceneChoice") renderSceneChoice(step);
    else if (step.type === "conversion") renderConversion(step);
    else if (step.type === "conversionGrid") renderConversionGrid(step);
    else throw new Error(`Type d’écran inconnu : ${step.type}`);
  }

  window.__ACTIVITY_DEBUG__ = {
    get stepIndex() { return stepIndex; },
    get score() { return score; },
    get maximum() { return currentMaximum; },
    get states() { return states; },
    runSceneAnimation
  };

  window.addEventListener("resize", fitFrame);
  render();
})();
