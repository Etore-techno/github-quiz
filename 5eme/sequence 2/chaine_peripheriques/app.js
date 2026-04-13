// app.js
// - Affichage Question X/Y
// - Mise en page fixe des zones
// - Essais illimités
// - Aide après 3 erreurs : retrait des intrus
// - Points identiques à partir du 4e essai

(() => {
  const DATA = window.CHAINE_DATA;

  const elStatement = document.getElementById("statement");
  const elBank = document.getElementById("bank");
  const elBankInfo = document.getElementById("bankInfo");
  const elScore = document.getElementById("score");
  const elAttempt = document.getElementById("attempt");
  const btnMain = document.getElementById("btnMain");
  const elExPos = document.getElementById("exPos");
  const fbText = document.getElementById("fbText");

  const needEls = {
    acquerir: document.getElementById("need-acq"),
    traiter: document.getElementById("need-trt"),
    communiquer: document.getElementById("need-com"),
  };

  const drops = {
    acquerir: document.getElementById("zone-acquerir"),
    traiter: document.getElementById("zone-traiter"),
    communiquer: document.getElementById("zone-communiquer"),
  };

  let serieIdx = 0;
  let exIdx = 0;
  let rawScore = 0;
  let fails = 0;
  let state = "play";
  let selectedId = null;
  let bankPruned = false;

  const MAX_PER_EX = (DATA.basePoints && DATA.basePoints[0] != null) ? DATA.basePoints[0] : 10;

  function totalExercisesCount() {
    let n = 0;
    for (const s of DATA.series) n += (s.exercises?.length || 0);
    return n;
  }

  const TOTAL_EX = totalExercisesCount();
  const MAX_RAW_TOTAL = Math.max(1, TOTAL_EX * MAX_PER_EX);

  function formatNote20(val) {
    const r = Math.round(val * 10) / 10;
    return (r % 1 === 0) ? String(Math.round(r)) : r.toFixed(1);
  }

  function updateScoreDisplay() {
    const note20 = (rawScore / MAX_RAW_TOTAL) * 20;
    const clamped = Math.max(0, Math.min(20, note20));
    elScore.textContent = formatNote20(clamped);
  }

  updateScoreDisplay();

  function setFeedback(type, html) {
    fbText.classList.remove("is-good", "is-bad", "is-info");
    if (type === "good") fbText.classList.add("is-good");
    else if (type === "bad") fbText.classList.add("is-bad");
    else fbText.classList.add("is-info");
    fbText.innerHTML = html;
  }

  function currentSerie() { return DATA.series[serieIdx]; }
  function currentExercise() { return currentSerie().exercises[exIdx]; }
  function needs() { return currentExercise().needs; }

  function currentQuestionNumber() {
    let n = exIdx + 1;
    for (let i = 0; i < serieIdx; i++) {
      n += DATA.series[i].exercises.length;
    }
    return n;
  }

  function updateExPos() {
    elExPos.textContent = `Question ${currentQuestionNumber()}/${TOTAL_EX}`;
  }

  function clearSelection() {
    selectedId = null;
    document.querySelectorAll(".item.selected").forEach(n => n.classList.remove("selected"));
  }

  function countIn(zoneKey) {
    return drops[zoneKey].querySelectorAll(".item").length;
  }

  function updateNeedsUI() {
    const n = needs();
    needEls.acquerir.textContent = `${countIn("acquerir")}/${n.acquerir}`;
    needEls.traiter.textContent = `${countIn("traiter")}/${n.traiter}`;
    needEls.communiquer.textContent = `${countIn("communiquer")}/${n.communiquer}`;

    for (const k of ["acquerir", "traiter", "communiquer"]) {
      drops[k].classList.toggle("full", countIn(k) >= n[k]);
    }
  }

  function updateAttemptUI() {
    elAttempt.textContent = String(fails + 1);
  }

  function getIntruderIds() {
    const ex = currentExercise();
    return new Set(ex.pool.filter(item => !(item.id in ex.solution)).map(item => item.id));
  }

  function updateBankInfo() {
    const intruderIds = getIntruderIds();
    const intrudersLeft = [...elBank.querySelectorAll(".item")]
      .filter(card => intruderIds.has(card.dataset.id)).length;
    elBankInfo.textContent = `Intrus : ${intrudersLeft}`;
  }

  function isLocked(card) {
    return card.classList.contains("locked");
  }

  function lockCardCorrect(card, zoneKey) {
    card.classList.add("locked");
    card.draggable = false;
    card.classList.remove("selected");
    card.classList.remove("correct-acquerir", "correct-traiter", "correct-communiquer");
    card.classList.add(`correct-${zoneKey}`);
  }

  function unlockAllCards() {
    document.querySelectorAll(".item").forEach(card => {
      card.classList.remove("locked");
      card.draggable = true;
      card.classList.remove("correct-acquerir", "correct-traiter", "correct-communiquer");
    });
  }

  function createCard(item) {
    const div = document.createElement("div");
    div.className = "item";
    div.draggable = true;
    div.dataset.id = item.id;

    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="txt"><div class="name">${item.name}</div></div>
    `;

    div.addEventListener("click", () => {
      if (state !== "play" || isLocked(div)) return;
      const already = div.classList.contains("selected");
      clearSelection();
      if (!already) {
        selectedId = item.id;
        div.classList.add("selected");
      }
    });

    div.addEventListener("dragstart", (e) => {
      if (state !== "play" || isLocked(div)) {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData("text/plain", item.id);
      e.dataTransfer.effectAllowed = "move";
      clearSelection();
    });

    div.addEventListener("dblclick", () => {
      if (state !== "play" || isLocked(div)) return;
      const parentIsDrop = div.parentElement && div.parentElement.classList.contains("drop");
      if (parentIsDrop) {
        elBank.appendChild(div);
        updateNeedsUI();
        updateBankInfo();
      }
    });

    return div;
  }

  function findCard(id) {
    return document.querySelector(`.item[data-id="${CSS.escape(id)}"]`);
  }

  function zoneHasSpace(zoneKey) {
    return countIn(zoneKey) < needs()[zoneKey];
  }

  function moveToZone(id, zoneKey) {
    if (state !== "play") return;

    const card = findCard(id);
    if (!card || isLocked(card)) return;

    if (!zoneHasSpace(zoneKey)) {
      setFeedback("bad", `❌ Cette zone est complète : <b>${needs()[zoneKey]}</b> élément(s) maximum.`);
      return;
    }

    drops[zoneKey].appendChild(card);
    updateNeedsUI();
    updateBankInfo();
    setFeedback("info", "Place le bon nombre d’éléments dans chaque zone, puis clique sur <b>Vérifier</b>.");
  }

  function enableDrop(zoneKey, el) {
    el.addEventListener("dragover", (e) => {
      e.preventDefault();
      el.classList.add("over");
    });

    el.addEventListener("dragleave", () => el.classList.remove("over"));

    el.addEventListener("drop", (e) => {
      e.preventDefault();
      el.classList.remove("over");
      const id = e.dataTransfer.getData("text/plain");
      moveToZone(id, zoneKey);
    });

    el.addEventListener("click", () => {
      if (!selectedId) return;
      moveToZone(selectedId, zoneKey);
      clearSelection();
    });
  }

  function enoughPlaced() {
    const n = needs();
    return countIn("acquerir") === n.acquerir &&
           countIn("traiter") === n.traiter &&
           countIn("communiquer") === n.communiquer;
  }

  function getPlacedIds(zoneKey) {
    return [...drops[zoneKey].querySelectorAll(".item")].map(x => x.dataset.id);
  }

  function getAllPlacedIds() {
    return new Set([
      ...getPlacedIds("acquerir"),
      ...getPlacedIds("traiter"),
      ...getPlacedIds("communiquer"),
    ]);
  }

  function awardRawPoints() {
    const base = DATA.basePoints ?? [10, 8, 6, 5];
    const idx = Math.min(fails, base.length - 1);
    const pts = base[idx] ?? base[base.length - 1] ?? 5;
    rawScore += pts;
    updateScoreDisplay();
    return pts;
  }

  function freezeCorrectAndReturnWrong() {
    const ex = currentExercise();
    const sol = ex.solution;

    let lockedCount = 0;
    let returnedCount = 0;

    for (const zoneKey of ["acquerir", "traiter", "communiquer"]) {
      const cards = [...drops[zoneKey].querySelectorAll(".item")];

      for (const card of cards) {
        if (isLocked(card)) continue;
        const id = card.dataset.id;
        const expectedZone = sol[id];

        if (expectedZone === zoneKey) {
          lockCardCorrect(card, zoneKey);
          lockedCount++;
        } else {
          elBank.appendChild(card);
          returnedCount++;
        }
      }
    }

    updateNeedsUI();
    updateBankInfo();
    return { lockedCount, returnedCount };
  }

  function pruneBankToUsefulOnly() {
    const ex = currentExercise();
    const solIds = Object.keys(ex.solution);
    const placed = getAllPlacedIds();
    const remainingNeeded = new Set(solIds.filter(id => !placed.has(id)));

    [...elBank.querySelectorAll(".item")].forEach(card => {
      const id = card.dataset.id;
      if (!remainingNeeded.has(id)) card.remove();
    });

    updateBankInfo();
  }

  function checkWin() {
    const ex = currentExercise();
    const sol = ex.solution;

    if (!enoughPlaced()) return false;

    for (const zoneKey of ["acquerir", "traiter", "communiquer"]) {
      for (const id of getPlacedIds(zoneKey)) {
        if (sol[id] !== zoneKey) return false;
      }
    }

    const placed = getAllPlacedIds();
    for (const id of Object.keys(sol)) {
      if (!placed.has(id)) return false;
    }
    return true;
  }

  function formatStatement(ex) {
    const rawStatement = (ex.statement || "").trim();
    const scenarioPrefix = /^scénario\s*:\s*/i;
    const scenarioText = rawStatement.replace(scenarioPrefix, "");

    elStatement.innerHTML = `
      <div class="statement-main">
        <div class="statement-line statement-line-center">
          <span class="statement-label">Système étudié :</span>
          <span class="statement-value">&nbsp;${ex.title}</span>
        </div>
        <div class="statement-line">
          <span class="statement-label statement-label-scenario">Scénario :</span>
          <span class="statement-scenario-text">&nbsp;${scenarioText}</span>
        </div>
      </div>
    `;
  }

  function loadExercise() {
    state = "play";
    fails = 0;
    bankPruned = false;
    clearSelection();
    updateAttemptUI();
    updateExPos();

    const ex = currentExercise();
    formatStatement(ex);

    elBank.innerHTML = "";
    for (const k of ["acquerir", "traiter", "communiquer"]) drops[k].innerHTML = "";

    const pool = [...ex.pool];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    pool.forEach(p => elBank.appendChild(createCard(p)));

    unlockAllCards();
    updateNeedsUI();
    updateBankInfo();

    btnMain.textContent = "Vérifier";
    btnMain.disabled = false;

    setFeedback("info", "Place le bon nombre d’éléments dans chaque zone, puis clique sur <b>Vérifier</b>.");
  }

  function nextExercise() {
    const serie = currentSerie();

    if (exIdx + 1 < serie.exercises.length) {
      exIdx++;
      loadExercise();
      return;
    }

    if (serieIdx + 1 < DATA.series.length) {
      serieIdx++;
      exIdx = 0;
      loadExercise();
      setFeedback("good", `✅ Série terminée. On passe à la <b>question ${currentQuestionNumber()}</b>.`);
      return;
    }

    setFeedback("good", `✅ <b>Tout terminé !</b> Note finale : <b>${elScore.textContent}/20</b>.`);
    btnMain.disabled = true;
  }

  function onMainButton() {
    if (state === "solved") {
      nextExercise();
      return;
    }

    if (!enoughPlaced()) {
      setFeedback("bad", "❌ Tu n’as pas placé le bon nombre d’éléments. Regarde les compteurs.");
      return;
    }

    const { lockedCount, returnedCount } = freezeCorrectAndReturnWrong();

    if (checkWin()) {
      awardRawPoints();
      state = "solved";
      btnMain.textContent = "Suivant";
      setFeedback("good", `✅ <b>Bravo !</b> Note actuelle : <b>${elScore.textContent}/20</b>. Clique sur <b>Suivant</b>.`);
      return;
    }

    fails++;
    updateAttemptUI();

    if (fails >= 3 && !bankPruned) {
      pruneBankToUsefulOnly();
      bankPruned = true;
      setFeedback("info", "💡 <b>Aide :</b> les intrus ont été retirés de la banque. Tu peux continuer autant d’essais que nécessaire.");
      return;
    }

    setFeedback(
      "bad",
      `✅ <b>${lockedCount}</b> élément(s) correct(s) restent en place.<br>` +
      `❌ <b>${returnedCount}</b> élément(s) ont été renvoyé(s) dans la banque.`
    );
  }

  enableDrop("acquerir", drops.acquerir);
  enableDrop("traiter", drops.traiter);
  enableDrop("communiquer", drops.communiquer);

  btnMain.addEventListener("click", onMainButton);

  loadExercise();
})();