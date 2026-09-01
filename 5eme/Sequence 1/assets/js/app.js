(() => {
  "use strict";

  const activity = window.ACTIVITY;
  const app = document.getElementById("app");
  const PHOTO = (number) => `assets/images/photo${number}.jpg`;
  if (activity.randomizeCardQuestions) {
    const introductions = activity.steps.filter((step) => step.type === "intro");
    const cardQuestions = activity.steps.filter((step) => step.type === "cards");
    const remaining = activity.steps.filter((step) => step.type !== "intro" && step.type !== "cards");
    activity.steps = [...introductions, ...shuffle(cardQuestions), ...remaining];
  }
  const scoredSteps = activity.steps.filter((step) => Number(step.points) > 0);

  let stepIndex = 0;
  let score = 0;
  let currentMaximum = 0;
  let completed = false;
  const wrongAttempts = {};
  const states = {};
  let familyLayout = null;
  let familyGroups = null;

  function fitFrame() {
    const frame = document.getElementById("frame");
    if (!frame) return;
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    frame.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }

  window.addEventListener("resize", fitFrame);
  fitFrame();

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function formatNumber(value) {
    const rounded = Math.round(value * 100) / 100;
    return Number.isInteger(rounded) ? String(rounded) : String(rounded).replace(".", ",");
  }

  function questionPosition() {
    const step = activity.steps[stepIndex];
    if (!step || !step.points) return null;
    let number = 0;
    for (let index = 0; index <= stepIndex; index += 1) {
      if (activity.steps[index].points) number += 1;
    }
    return { number, total: scoredSteps.length };
  }

  function renderShell() {
    const position = questionPosition();
    const currentStep = activity.steps[stepIndex];
    const screenLabel = stepIndex >= activity.steps.length
      ? "Fin"
      : position
        ? `Question : ${position.number} sur ${position.total}`
        : currentStep?.type === "checkpoint"
          ? "Fiche d’activité"
          : "Consignes";
    app.innerHTML = `
      <div id="shell">
        <header class="header">
          <div class="header-activity">${escapeHtml(activity.activity)} : ${escapeHtml(activity.title)}</div>
          <div class="header-question">${screenLabel}</div>
        </header>
        <main class="content" id="content"></main>
        <footer class="footer">
          <div class="feedback info" id="feedback">Discutez dans le groupe avant de valider.</div>
          <div class="actions" id="actions"></div>
          <div class="score" id="score">${scoreLabel()}</div>
        </footer>
      </div>`;
    fitFrame();
  }

  function scoreLabel() {
    if (currentMaximum === 0) return "Note : —";
    return `Note : ${formatNumber(score)} / ${formatNumber(currentMaximum)}`;
  }

  function refreshScore() {
    const target = document.getElementById("score");
    if (target) target.textContent = scoreLabel();
  }

  function setFeedback(message, kind = "info") {
    const feedback = document.getElementById("feedback");
    const lengthClass = message.length > 245 ? " extra-long" : message.length > 150 ? " long" : "";
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
    const actions = document.getElementById("actions");
    actions.replaceChildren(...buttons);
  }

  function penaltyFor(points, attempts) {
    if (!attempts) return 0;
    if (points >= 6) return attempts;
    return attempts * points * 0.25;
  }

  function completeStep(points, afterSuccess) {
    if (completed) return;
    completed = true;
    const attempts = wrongAttempts[stepIndex] || 0;
    const gained = Math.max(0, points - penaltyFor(points, attempts));
    score += gained;
    currentMaximum += points;
    refreshScore();
    if (afterSuccess) afterSuccess();
    const used = attempts + 1;
    setFeedback(
      `Réponse correcte. ${formatNumber(gained)} point${gained > 1 ? "s" : ""} gagné${gained > 1 ? "s" : ""} sur ${formatNumber(points)} — ${used} essai${used > 1 ? "s" : ""} utilisé${used > 1 ? "s" : ""}.`,
      "ok",
    );
    const isLastQuestion = stepIndex === activity.steps.length - 1;
    setActions([makeButton(isLastQuestion ? "Voir le résultat" : "Question suivante", nextStep, true)]);
  }

  function nextStep() {
    stepIndex += 1;
    completed = false;
    if (stepIndex >= activity.steps.length) renderFinish();
    else render();
  }

  function addWrongAttempt() {
    wrongAttempts[stepIndex] = (wrongAttempts[stepIndex] || 0) + 1;
    return wrongAttempts[stepIndex];
  }

  function progressiveMessage(correctCount, required, hints) {
    const attempt = addWrongAttempt();
    let message = `Il faut trouver ${required} réponse${required > 1 ? "s" : ""}. Parmi vos choix, ${correctCount} ${correctCount > 1 ? "sont corrects" : "est correct"}.`;
    if (attempt >= 2 && hints && hints.length) {
      const hint = hints[Math.min(attempt - 2, hints.length - 1)];
      message += ` Indice : ${hint}`;
    } else {
      message += " Reprenez les cartes et échangez vos arguments dans le groupe.";
    }
    setFeedback(message, "warn");
  }

  function sameSet(first, second) {
    if (first.length !== second.length) return false;
    const expected = new Set(second.map(String));
    return first.every((value) => expected.has(String(value)));
  }

  function shuffle(values) {
    const result = [...values];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  }

  function derangedLabels(values, expected) {
    for (let attempt = 0; attempt < 100; attempt += 1) {
      const candidate = shuffle(values);
      if (candidate.every((value, index) => value !== expected[index])) return candidate;
    }
    return values.map((_, index) => expected[(index + 1) % expected.length]);
  }

  function validateSelection(selected, correct, hints, points, onSuccess) {
    if (completed) return;
    const required = correct.length;
    const previousErrors = wrongAttempts[stepIndex] || 0;
    if (previousErrors >= 1 && selected.length !== required) {
      setFeedback(`Cette fois, sélectionnez exactement ${required} réponse${required > 1 ? "s" : ""}. Cet essai n’est pas compté.`, "info");
      return;
    }
    if (selected.length === 0) {
      setFeedback("Choisissez au moins une réponse avant de valider.", "info");
      return;
    }
    if (sameSet(selected, correct)) {
      completeStep(points, onSuccess);
      return;
    }
    const expected = new Set(correct.map(String));
    const correctCount = selected.filter((value) => expected.has(String(value))).length;
    progressiveMessage(correctCount, required, hints);
  }

  function renderIntro(step) {
    const content = document.getElementById("content");
    content.innerHTML = `
      <div class="intro-grid">
        <section class="intro-instructions">
          <h2>${escapeHtml(step.title)}</h2>
          <div class="intro-lines">${step.instructions.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</div>
        </section>
        <section class="intro-visual"><img src="assets/images/${escapeHtml(step.image)}" alt="Tas de cartes disposées en désordre"></section>
      </div>`;
    setFeedback(activity.introFeedback || "Quand les cartes sont réparties et que chacun est prêt, commencez l’enquête.", "info");
    setActions([makeButton("Commencer", nextStep, true)]);
  }

  function renderCheckpoint(step) {
    const content = document.getElementById("content");
    content.innerHTML = `<section class="finish checkpoint"><div><h2>${escapeHtml(step.title)}</h2><p>${escapeHtml(step.text)}</p><div class="checkpoint-note">L’écran reste affiché pendant que chaque élève complète sa fiche. Poursuivez seulement lorsque le groupe a terminé.</div></div></section>`;
    setFeedback("Complétez maintenant la partie indiquée sur la fiche d’activité.", "info");
    setActions([makeButton("Poursuivre", nextStep, true)]);
  }

  function photoMarkup(number) {
    return `<div class="answer-photo"><img src="${PHOTO(number)}" alt="Photographie de la carte ${number}"></div>`;
  }

  function showAnswerPhotos(numbers) {
    const preview = document.getElementById("preview");
    if (!preview) return;
    preview.className = "panel preview-panel answer-preview";
    preview.innerHTML = `<div class="preview-title">Réponses trouvées</div><div class="answer-photos">${numbers.map((number) => photoMarkup(number)).join("")}</div>`;
  }

  function renderChoice(step) {
    const content = document.getElementById("content");
    const options = shuffle(step.options);
    content.innerHTML = `
      <div class="question-layout">
        <div class="prompt">${escapeHtml(step.prompt)}</div>
        <section class="panel selection-panel"><div class="choice-grid" id="choices"></div></section>
        <aside class="panel preview-panel preview-only" id="preview"><img class="preview-image" src="${PHOTO("X")}" alt="Point d’interrogation"></aside>
      </div>`;
    const selected = new Set();
    const choices = document.getElementById("choices");
    options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option";
      button.textContent = option;
      button.dataset.value = option;
      button.addEventListener("click", () => {
        if (completed) return;
        if (selected.has(option)) selected.delete(option);
        else {
          selected.clear();
          selected.add(option);
        }
        [...choices.children].forEach((item) => item.classList.toggle("selected", selected.has(item.dataset.value)));
      });
      choices.append(button);
    });
    setActions([makeButton("Valider", () => validateSelection([...selected], step.correct, step.hints, step.points, () => {
      document.querySelectorAll(".option").forEach((button) => { button.disabled = true; });
    }), true)]);
  }

  function renderCards(step) {
    const content = document.getElementById("content");
    content.innerHTML = `
      <div class="question-layout">
        <div class="prompt">${escapeHtml(step.prompt)}</div>
        <section class="panel selection-panel"><div class="card-grid" id="cardGrid"></div></section>
        <aside class="panel preview-panel preview-only" id="preview"><img class="preview-image" id="previewImage" src="${PHOTO("X")}" alt="Point d’interrogation"></aside>
      </div>`;
    const selected = new Set();
    const grid = document.getElementById("cardGrid");
    activity.cards.forEach((number) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "card-button";
      button.textContent = number;
      button.dataset.value = String(number);
      const preview = () => {
        const image = document.getElementById("previewImage");
        if (image) image.src = PHOTO(number);
      };
      const resetPreview = () => {
        const image = document.getElementById("previewImage");
        if (image) image.src = PHOTO("X");
      };
      button.addEventListener("mouseenter", preview);
      button.addEventListener("mouseleave", resetPreview);
      button.addEventListener("focus", preview);
      button.addEventListener("blur", resetPreview);
      button.addEventListener("click", () => {
        if (completed) return;
        preview();
        if (selected.has(number)) selected.delete(number);
        else selected.add(number);
        button.classList.toggle("selected", selected.has(number));
      });
      grid.append(button);
    });
    setActions([makeButton("Valider", () => validateSelection([...selected], step.correct, step.hints, step.points, () => {
      document.querySelectorAll(".card-button").forEach((button) => { button.disabled = true; });
      showAnswerPhotos(step.correct);
    }), true)]);
  }

  function permutations(values) {
    if (values.length <= 1) return [values];
    const result = [];
    values.forEach((value, index) => {
      const rest = values.slice(0, index).concat(values.slice(index + 1));
      permutations(rest).forEach((tail) => result.push([value, ...tail]));
    });
    return result;
  }

  function bestFamilyAssignment(zones, families) {
    const names = Object.keys(families);
    let best = null;
    permutations(names).forEach((order) => {
      const intersections = zones.map((zone, index) => {
        const expected = new Set(families[order[index]]);
        return zone.filter((card) => expected.has(card)).length;
      });
      const total = intersections.reduce((sum, value) => sum + value, 0);
      if (!best || total > best.total) best = { order, intersections, total };
    });
    return best;
  }

  function removeFromArea(state, area, index, card) {
    const list = area === "reserve" ? state.reserve : state.zones[index];
    const position = list.indexOf(card);
    if (position >= 0) list.splice(position, 1);
  }

  function addToArea(state, area, index, card) {
    const list = area === "reserve" ? state.reserve : state.zones[index];
    if (!list.includes(card)) list.push(card);
    list.sort((a, b) => a - b);
  }

  function areaList(state, area, index) {
    return area === "reserve" ? state.reserve : state.zones[index];
  }

  function moveFamilyCard(state, step, source, destination, targetCard = null) {
    if (source.area === "group" && state.locked.has(source.index)) {
      setFeedback("Cette famille est déjà correcte et reste bloquée.", "info");
      return false;
    }
    if (destination.area === "group" && state.locked.has(destination.index)) {
      setFeedback("Cette famille est déjà correcte et reste bloquée.", "info");
      return false;
    }
    if (source.area === destination.area && source.index === destination.index) return false;
    if (targetCard === source.card) return false;
    const sourceList = areaList(state, source.area, source.index);
    if (!sourceList.includes(source.card)) return false;
    const destinationList = areaList(state, destination.area, destination.index);
    const capacity = destination.area === "group" ? step.capacities[destination.index] : Infinity;
    if (targetCard !== null && destinationList.includes(targetCard)) {
      removeFromArea(state, source.area, source.index, source.card);
      removeFromArea(state, destination.area, destination.index, targetCard);
      addToArea(state, destination.area, destination.index, source.card);
      addToArea(state, source.area, source.index, targetCard);
      return true;
    }
    if (destinationList.length >= capacity) {
      setFeedback(`Ce groupe ne peut pas recevoir plus de ${capacity} cartes. Déplacez une carte ou faites un échange.`, "info");
      return false;
    }
    removeFromArea(state, source.area, source.index, source.card);
    addToArea(state, destination.area, destination.index, source.card);
    return true;
  }

  function bindFamilyInteractions(state, step) {
    let selected = null;
    let dragged = null;
    const root = document.getElementById("familyWorkspace");

    function redraw() {
      drawFamilyWorkspace(state, step);
    }

    root.querySelectorAll(".card-tile").forEach((tile) => {
      const source = {
        card: Number(tile.dataset.card),
        area: tile.dataset.area,
        index: Number(tile.dataset.index || 0),
      };
      const showPreview = () => {
        const image = document.getElementById("sortPreviewImage");
        if (image) image.src = PHOTO(source.card);
      };
      const resetPreview = () => {
        const image = document.getElementById("sortPreviewImage");
        if (image) image.src = PHOTO("X");
      };
      tile.addEventListener("mouseenter", showPreview);
      tile.addEventListener("mouseleave", resetPreview);
      tile.addEventListener("focus", showPreview);
      tile.addEventListener("blur", resetPreview);
      tile.draggable = !(source.area === "group" && state.locked.has(source.index));
      tile.addEventListener("dragstart", (event) => {
        dragged = source;
        event.dataTransfer.setData("text/plain", JSON.stringify(source));
      });
      tile.addEventListener("dragend", () => { dragged = null; });
      tile.addEventListener("dragover", (event) => event.preventDefault());
      tile.addEventListener("drop", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!dragged) return;
        const destination = { area: source.area, index: source.index };
        if (moveFamilyCard(state, step, dragged, destination, source.card)) redraw();
        dragged = null;
      });
      tile.addEventListener("dblclick", () => {
        if (source.area === "group" && moveFamilyCard(state, step, source, { area: "reserve", index: 0 })) redraw();
      });
      tile.addEventListener("click", () => {
        if (!selected) {
          selected = source;
          tile.classList.add("selected");
          setFeedback("Carte sélectionnée : cliquez dans un autre groupe, sur une carte à échanger, ou dans la réserve.", "info");
          return;
        }
        if (selected.card === source.card) {
          selected = null;
          tile.classList.remove("selected");
          return;
        }
        const destination = { area: source.area, index: source.index };
        if (moveFamilyCard(state, step, selected, destination, source.card)) redraw();
        selected = null;
      });
    });

    root.querySelectorAll("[data-drop-area]").forEach((drop) => {
      drop.addEventListener("dragover", (event) => event.preventDefault());
      drop.addEventListener("drop", (event) => {
        event.preventDefault();
        if (!dragged) return;
        const destination = { area: drop.dataset.dropArea, index: Number(drop.dataset.dropIndex || 0) };
        if (moveFamilyCard(state, step, dragged, destination)) redraw();
        dragged = null;
      });
      drop.addEventListener("click", (event) => {
        if (!selected || event.target.closest(".card-tile")) return;
        const destination = { area: drop.dataset.dropArea, index: Number(drop.dataset.dropIndex || 0) };
        if (moveFamilyCard(state, step, selected, destination)) redraw();
        selected = null;
      });
    });
  }

  function drawFamilyWorkspace(state, step) {
    const workspace = document.getElementById("familyWorkspace");
    workspace.innerHTML = `
      <div class="reserve" data-drop-area="reserve" data-drop-index="0">
        ${state.reserve.map((card) => `<div class="card-tile" data-card="${card}" data-area="reserve" data-index="0">${card}</div>`).join("")}
      </div>
      <div class="groups">
        ${state.zones.map((cards, index) => `
          <section class="group-zone ${state.status[index] === "correct" ? "correct-family locked" : state.status[index] === "near" ? "near-family" : ""}">
            <div class="group-heading">Groupe de ${step.capacities[index]} cartes — ${cards.length} / ${step.capacities[index]}</div>
            <div class="group-cards" data-drop-area="group" data-drop-index="${index}">
              ${cards.map((card) => `<div class="card-tile" data-card="${card}" data-area="group" data-index="${index}">${card}</div>`).join("")}
            </div>
          </section>`).join("")}
      </div>`;
    bindFamilyInteractions(state, step);
  }

  function showFamilySuccess(state, assignment) {
    const workspace = document.getElementById("familyWorkspace");
    workspace.innerHTML = `<div class="groups" style="grid-row:1 / -1">
      ${state.zones.map((cards, index) => `<section class="group-zone correct-family"><div class="group-heading">Famille trouvée — ${cards.length} cartes</div><div class="family-photos">${cards.map((card) => `<img src="${PHOTO(card)}" alt="${escapeHtml(activity.cardNames[card])}" title="${escapeHtml(activity.cardNames[card])}">`).join("")}</div></section>`).join("")}
    </div>`;
    familyLayout = [...assignment.order];
    familyGroups = state.zones.map((zone) => [...zone]);
  }

  function validateFamilySort(state, step) {
    if (state.reserve.length > 0) {
      setFeedback(`Il reste ${state.reserve.length} carte${state.reserve.length > 1 ? "s" : ""} à placer. La validation n’est pas comptée.`, "info");
      return;
    }
    const invalid = state.zones.findIndex((zone, index) => zone.length !== step.capacities[index]);
    if (invalid >= 0) {
      setFeedback("Chaque groupe doit contenir exactement le nombre de cartes annoncé. La validation n’est pas comptée.", "info");
      return;
    }
    const assignment = bestFamilyAssignment(state.zones, step.families);
    const exact = state.zones.map((zone, index) => sameSet(zone, step.families[assignment.order[index]]));
    if (exact.every(Boolean)) {
      state.status = exact.map(() => "correct");
      completeStep(step.points, () => showFamilySuccess(state, assignment));
      return;
    }
    addWrongAttempt();
    state.status = state.zones.map((zone, index) => {
      if (exact[index]) {
        state.locked.add(index);
        return "correct";
      }
      return assignment.intersections[index] >= zone.length - 1 ? "near" : "";
    });
    drawFamilyWorkspace(state, step);
    const exactCount = exact.filter(Boolean).length;
    const nearDetails = state.zones
      .map((zone, index) => ({ count: assignment.intersections[index], total: zone.length, exact: exact[index] }))
      .filter((item) => !item.exact && item.count >= item.total - 1);
    let message = exactCount ? `${exactCount} groupe${exactCount > 1 ? "s sont entièrement corrects" : " est entièrement correct"} et reste${exactCount > 1 ? "nt" : ""} bloqué${exactCount > 1 ? "s" : ""}. ` : "";
    if (nearDetails.length) {
      message += nearDetails.map((item) => `Un autre groupe contient ${item.count} cartes qui vont ensemble sur ${item.total}.`).join(" ");
      message += " Une carte semble devoir être échangée dans chaque groupe orange.";
    } else if (!exactCount) {
      message = "Aucun groupe n’est suffisamment cohérent. Vos groupes ne reposent probablement pas sur le bon critère : cherchez une autre caractéristique commune.";
    } else {
      message += "Les autres groupes doivent être réorganisés sans changer les familles déjà bloquées.";
    }
    setFeedback(message, "warn");
  }

  function renderFamilySort(step) {
    const content = document.getElementById("content");
    content.innerHTML = `<div class="sort-layout family-sort-layout">
      <div class="sort-prompt">${escapeHtml(step.prompt)}</div>
      <div class="family-sort-body">
        <div class="sort-workspace" id="familyWorkspace"></div>
        <aside class="sort-preview"><img id="sortPreviewImage" src="${PHOTO("X")}" alt="Point d’interrogation"></aside>
      </div>
    </div>`;
    if (!states[stepIndex]) {
      states[stepIndex] = { reserve: [...activity.cards], zones: step.capacities.map(() => []), locked: new Set(), status: step.capacities.map(() => "") };
    }
    const state = states[stepIndex];
    drawFamilyWorkspace(state, step);
    setFeedback("Glissez les numéros. Double-cliquez sur une carte pour la remettre dans la réserve ; déposez une carte sur une autre pour les échanger.", "info");
    setActions([makeButton("Valider le classement", () => validateFamilySort(state, step), true)]);
  }

  function fallbackFamilyData() {
    const entries = Object.entries(activity.steps.find((step) => step.type === "familySort")?.families || {});
    const capacities = activity.steps.find((step) => step.type === "familySort")?.capacities || [];
    familyLayout = capacities.map((capacity) => entries.find(([, cards]) => cards.length === capacity)?.[0]);
    familyGroups = familyLayout.map((name) => [...(Object.fromEntries(entries)[name] || [])]);
  }

  function labelExpected(step, index) {
    if (step.type === "titleSort") return familyLayout[index];
    return step.mapping[familyLayout[index]];
  }

  function moveLabel(state, source, destinationIndex) {
    const value = source.area === "reserve" ? state.reserve[source.index] : state.assignments[source.index];
    if (!value) return;
    if (source.area === "reserve") state.reserve.splice(source.index, 1);
    else state.assignments[source.index] = null;
    const replaced = state.assignments[destinationIndex];
    state.assignments[destinationIndex] = value;
    if (replaced) {
      if (source.area === "group") state.assignments[source.index] = replaced;
      else state.reserve.push(replaced);
    }
  }

  function drawLabelWorkspace(state, step) {
    const root = document.getElementById("labelWorkspace");
    root.innerHTML = `
      <div class="label-reserve" data-label-reserve="true">${state.reserve.map((label, index) => `<div class="label-tile" draggable="true" data-label-area="reserve" data-label-index="${index}">${escapeHtml(label)}</div>`).join("")}</div>
      <div class="label-groups">
        ${familyGroups.map((cards, index) => `<section class="label-group">
          ${step.type === "titleSort" ? `<div class="label-drop" data-label-drop="${index}">${state.assignments[index] ? escapeHtml(state.assignments[index]) : "Déposer le nom de la famille"}</div>` : `<div class="label-group-title">${escapeHtml(familyLayout[index])}</div>`}
          <div class="family-photos">${cards.map((card) => `<img src="${PHOTO(card)}" alt="${escapeHtml(activity.cardNames[card])}" title="${escapeHtml(activity.cardNames[card])}">`).join("")}</div>
          ${step.type === "functionSort" ? `<div class="label-drop" data-label-drop="${index}">${state.assignments[index] ? escapeHtml(state.assignments[index]) : "Déposer la fonction d’usage"}</div>` : `<div class="label-group-title">${cards.length} objets</div>`}
        </section>`).join("")}
      </div>`;
    let selected = null;
    let dragged = null;
    root.querySelectorAll(".label-tile").forEach((tile) => {
      const source = { area: tile.dataset.labelArea, index: Number(tile.dataset.labelIndex) };
      tile.addEventListener("dragstart", (event) => { dragged = source; event.dataTransfer.setData("text/plain", JSON.stringify(source)); });
      tile.addEventListener("click", () => {
        selected = source;
        root.querySelectorAll(".label-tile").forEach((other) => other.classList.remove("selected"));
        tile.classList.add("selected");
        setFeedback("Étiquette sélectionnée : cliquez dans la case où vous voulez la placer.", "info");
      });
    });
    root.querySelectorAll("[data-label-drop]").forEach((drop) => {
      const destination = Number(drop.dataset.labelDrop);
      drop.addEventListener("dragover", (event) => event.preventDefault());
      drop.addEventListener("drop", (event) => {
        event.preventDefault();
        if (!dragged) return;
        moveLabel(state, dragged, destination);
        drawLabelWorkspace(state, step);
      });
      drop.addEventListener("click", () => {
        if (selected) {
          moveLabel(state, selected, destination);
          drawLabelWorkspace(state, step);
        } else if (state.assignments[destination]) {
          state.reserve.push(state.assignments[destination]);
          state.assignments[destination] = null;
          drawLabelWorkspace(state, step);
        }
      });
    });
  }

  function validateLabels(state, step) {
    if (state.assignments.some((value) => !value)) {
      setFeedback("Placez les quatre étiquettes avant de valider. Cet essai n’est pas compté.", "info");
      return;
    }
    const correctCount = state.assignments.filter((value, index) => value === labelExpected(step, index)).length;
    if (correctCount === state.assignments.length) {
      completeStep(step.points, () => {
        document.querySelectorAll(".label-drop").forEach((drop) => { drop.style.borderStyle = "solid"; });
      });
      return;
    }
    const attempt = addWrongAttempt();
    let message = `${correctCount} étiquette${correctCount > 1 ? "s sont" : " est"} à la bonne place sur 4.`;
    if (attempt >= 2) message += step.type === "titleSort" ? " Indice : appuyez-vous sur le support ou le milieu de déplacement." : " Indice : chaque fonction commence par « Se déplacer… » puis précise le milieu ou le support.";
    else message += " Comparez les quatre groupes avant de déplacer une étiquette.";
    setFeedback(message, "warn");
  }

  function renderLabelSort(step) {
    if (!familyLayout || !familyGroups) fallbackFamilyData();
    const content = document.getElementById("content");
    content.innerHTML = `<div class="sort-layout"><div class="sort-prompt">${escapeHtml(step.prompt)}</div><div class="label-workspace" id="labelWorkspace"></div></div>`;
    if (!states[stepIndex]) {
      const expected = familyLayout.map((_, index) => labelExpected(step, index));
      states[stepIndex] = { reserve: derangedLabels(step.labels, expected), assignments: familyLayout.map(() => null) };
    }
    const state = states[stepIndex];
    drawLabelWorkspace(state, step);
    setFeedback("Glissez les étiquettes, ou sélectionnez une étiquette puis cliquez dans sa case. Cliquez sur une étiquette placée pour la reprendre.", "info");
    setActions([makeButton("Valider", () => validateLabels(state, step), true)]);
  }

  function sourceAreaList(state, area) {
    if (area === "renewable") return state.renewable;
    if (area === "nonrenewable") return state.nonrenewable;
    return state.aside;
  }

  function sourceCapacity(step, area) {
    if (area === "renewable") return step.renewable.length;
    if (area === "nonrenewable") return step.nonrenewable.length;
    return Infinity;
  }

  function moveSourceCard(state, step, source, destination, targetCard = null) {
    const sourceList = sourceAreaList(state, source.area);
    const destinationList = sourceAreaList(state, destination.area);
    if (source.area === destination.area) return false;
    if (targetCard === source.card || !sourceList.includes(source.card)) return false;
    if (destinationList.includes(source.card)) return false;
    if (targetCard !== null && destinationList.includes(targetCard)) {
      sourceList.splice(sourceList.indexOf(source.card), 1);
      destinationList.splice(destinationList.indexOf(targetCard), 1);
      destinationList.push(source.card);
      sourceList.push(targetCard);
      sourceList.sort((a, b) => a - b);
      destinationList.sort((a, b) => a - b);
      return true;
    }
    const capacity = sourceCapacity(step, destination.area);
    if (destinationList.length >= capacity) {
      setFeedback(`Cette zone accepte exactement ${capacity} cartes. Déplacez une carte ou faites un échange.`, "info");
      return false;
    }
    sourceList.splice(sourceList.indexOf(source.card), 1);
    destinationList.push(source.card);
    destinationList.sort((a, b) => a - b);
    return true;
  }

  function drawSourceWorkspace(state, step) {
    const root = document.getElementById("sourceCards");
    const zoneMarkup = (area, title, cards) => `<section class="${area === "aside" ? "aside-zone" : `source-zone ${area}-zone`}" data-source-drop="${area}"><h3>${escapeHtml(title)} — ${cards.length}${area === "aside" ? " / 8" : ` / ${sourceCapacity(step, area)}`}</h3><div class="group-cards" data-source-drop="${area}">${cards.map((card) => `<div class="card-tile" draggable="true" data-card="${card}" data-area="${area}">${card}</div>`).join("")}</div></section>`;
    root.innerHTML = [
      zoneMarkup("renewable", "Sources renouvelables", state.renewable),
      zoneMarkup("aside", "Cartes laissées de côté", state.aside),
      zoneMarkup("nonrenewable", "Sources non renouvelables", state.nonrenewable),
    ].join("");
    let selected = null;
    let dragged = null;
    root.querySelectorAll(".card-tile").forEach((tile) => {
      const source = { area: tile.dataset.area, card: Number(tile.dataset.card) };
      tile.addEventListener("dragstart", (event) => { dragged = source; event.dataTransfer.setData("text/plain", JSON.stringify(source)); });
      tile.addEventListener("dragend", () => { dragged = null; });
      tile.addEventListener("dragover", (event) => event.preventDefault());
      tile.addEventListener("drop", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!dragged) return;
        if (moveSourceCard(state, step, dragged, { area: source.area }, source.card)) drawSourceWorkspace(state, step);
        dragged = null;
      });
      tile.addEventListener("dblclick", () => {
        if (source.area !== "aside" && moveSourceCard(state, step, source, { area: "aside" })) drawSourceWorkspace(state, step);
      });
      tile.addEventListener("click", () => {
        if (!selected) {
          selected = source;
          tile.classList.add("selected");
          setFeedback("Carte sélectionnée : cliquez dans une autre zone ou sur une carte à échanger.", "info");
          return;
        }
        if (selected.card === source.card) {
          selected = null;
          tile.classList.remove("selected");
          return;
        }
        if (moveSourceCard(state, step, selected, { area: source.area }, source.card)) drawSourceWorkspace(state, step);
        selected = null;
      });
    });
    root.querySelectorAll("[data-source-drop]").forEach((drop) => {
      drop.addEventListener("dragover", (event) => event.preventDefault());
      drop.addEventListener("drop", (event) => {
        event.preventDefault();
        if (!dragged || event.target.closest(".card-tile")) return;
        if (moveSourceCard(state, step, dragged, { area: drop.dataset.sourceDrop })) drawSourceWorkspace(state, step);
        dragged = null;
      });
      drop.addEventListener("click", (event) => {
        if (!selected || event.target.closest(".card-tile")) return;
        if (moveSourceCard(state, step, selected, { area: drop.dataset.sourceDrop })) drawSourceWorkspace(state, step);
        selected = null;
      });
    });
  }

  function showSourceSuccess(state) {
    const root = document.getElementById("sourceCards");
    const photos = (cards) => `<div class="family-photos">${cards.map((card) => `<img src="${PHOTO(card)}" title="${escapeHtml(activity.cardNames[card])}" alt="${escapeHtml(activity.cardNames[card])}">`).join("")}</div>`;
    root.innerHTML = `<section class="source-zone renewable-zone"><h3>Sources renouvelables — 9</h3>${photos(state.renewable)}</section><section class="aside-zone"><h3>Cartes laissées de côté — 8</h3>${photos(state.aside)}</section><section class="source-zone nonrenewable-zone"><h3>Sources non renouvelables — 7</h3>${photos(state.nonrenewable)}</section>`;
  }

  function validateSourceSort(state, step) {
    if (state.renewable.length !== step.renewable.length || state.nonrenewable.length !== step.nonrenewable.length || state.aside.length !== step.aside.length) {
      setFeedback(`Il faut exactement ${step.renewable.length} cartes dans « renouvelables », ${step.nonrenewable.length} dans « non renouvelables » et ${step.aside.length} laissées de côté. Cet essai n’est pas compté.`, "info");
      return;
    }
    if (sameSet(state.renewable, step.renewable) && sameSet(state.nonrenewable, step.nonrenewable) && sameSet(state.aside, step.aside)) {
      completeStep(step.points, () => showSourceSuccess(state));
      return;
    }
    const attempt = addWrongAttempt();
    const renewableSet = new Set(step.renewable);
    const nonrenewableSet = new Set(step.nonrenewable);
    const asideSet = new Set(step.aside);
    const renewCorrect = state.renewable.filter((card) => renewableSet.has(card)).length;
    const nonCorrect = state.nonrenewable.filter((card) => nonrenewableSet.has(card)).length;
    const shouldAside = state.renewable.concat(state.nonrenewable).filter((card) => asideSet.has(card)).length;
    let message = `Renouvelables : ${renewCorrect}/${step.renewable.length} bien placées. Non renouvelables : ${nonCorrect}/${step.nonrenewable.length}. ${shouldAside} carte${shouldAside > 1 ? "s classées devraient" : " classée devrait"} rester au centre.`;
    if (attempt >= 2) message += " Indice : laissez au centre l’électricité seule et les cartes qui mélangent plusieurs catégories.";
    setFeedback(message, "warn");
  }

  function renderSourceSort(step) {
    const content = document.getElementById("content");
    content.innerHTML = `<div class="sort-layout"><div class="sort-prompt">${escapeHtml(step.prompt)}</div><div class="source-workspace"><div class="definitions">${step.definitions.map((definition, index) => `<div class="definition ${index === 0 ? "renewable-definition" : "nonrenewable-definition"}">${escapeHtml(definition)}</div>`).join("")}</div><div class="source-columns" id="sourceCards"></div></div></div>`;
    if (!states[stepIndex]) states[stepIndex] = { renewable: [], nonrenewable: [], aside: [...activity.cards] };
    const state = states[stepIndex];
    drawSourceWorkspace(state, step);
    setFeedback("Placez les numéros dans les deux groupes. Double-cliquez pour remettre une carte au centre ; déposez-la sur une autre pour les échanger.", "info");
    setActions([makeButton("Valider le classement", () => validateSourceSort(state, step), true)]);
  }

  function renderFinish() {
    renderShell();
    const content = document.getElementById("content");
    content.innerHTML = `<section class="finish"><div><h2>Activité terminée</h2><div class="final-score">${formatNumber(score)} / 20</div><p>${escapeHtml(activity.finish)}</p></div></section>`;
    setFeedback("Complétez maintenant votre fiche d’activité.", "ok");
    const finishButton = makeButton("Fin", () => {}, true);
    finishButton.disabled = true;
    setActions([finishButton]);
  }

  function render() {
    renderShell();
    const step = activity.steps[stepIndex];
    if (step.type === "intro") renderIntro(step);
    else if (step.type === "checkpoint") renderCheckpoint(step);
    else if (step.type === "choice") renderChoice(step);
    else if (step.type === "cards") renderCards(step);
    else if (step.type === "familySort") renderFamilySort(step);
    else if (step.type === "titleSort" || step.type === "functionSort") renderLabelSort(step);
    else if (step.type === "sourceSort") renderSourceSort(step);
    else throw new Error(`Type d’écran inconnu : ${step.type}`);
  }

  render();
})();
