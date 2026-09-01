(() => {
  const CONFIG = window.APP_CONFIG;
  const STORAGE_PREFIX = 'maquette_tableur_v23';
  const STAGES = ['input', 'formula_sum', 'formula_yellow', 'formula_green', 'formula_orange'];
  const STAGE_LABELS = {
    input: 'Vérifier les cellules bleues claires',
    formula_sum: 'Vérifier les cellules bleues foncées',
    formula_yellow: 'Vérifier les cellules jaunes',
    formula_green: 'Vérifier les cellules vertes',
    formula_orange: 'Vérifier les cellules oranges',
    done: 'Tout est vérifié'
  };
  const CARD_DEFS = [
    { id: 'murs', title: 'Épaisseur murs', rows: [3, 4], headerMode: 'default' },
    { id: 'portes', title: 'Portes', rows: [8, 9], headerMode: 'default' },
    { id: 'fenetres', title: 'Allège : hauteur sous fenêtres', rows: [13], headerMode: 'default' },
    { id: 'salle_eau', title: 'Salle d’eau', rows: [17, 18, 19, 20, 21], headerMode: 'default' },
    { id: 'surface_salle_eau', title: 'Surface salle d’eau', rows: [23], headerMode: 'surface' },
    { id: 'chambre', title: 'Chambre', rows: [27, 28, 29, 30, 31, 32, 33, 34], headerMode: 'default' },
    { id: 'surface_chambre', title: 'Surface chambre', rows: [36], headerMode: 'surface' },
    { id: 'piece_vie', title: 'Pièce de vie', rows: [40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57], headerMode: 'default' },
    { id: 'surface_piece_vie', title: 'Surface pièce de vie', rows: [59], headerMode: 'surface' },
    { id: 'surface_totale', title: 'Surface totale du logement', rows: [62], headerMode: 'surface' },
    { id: 'fenetre_chambre', title: 'Fenêtre chambre', rows: [66, 67], headerMode: 'default', showTitle: true },
    { id: 'fenetre_vie', title: 'Fenêtre pièce de vie', rows: [71, 72], headerMode: 'default', showTitle: true },
    { id: 'surface_vitree', title: 'Surface vitrée totale', rows: [75], headerMode: 'surface', showTitle: true },
    { id: 'pourcentage_vitree', title: 'Pourcentage de surface vitrée / surface habitable', rows: [78], headerMode: 'percent' },
  ];
  const GROUP_DEFS = [
    { id: 'g_murs', title: 'Épaisseur des murs', cards: ['murs'] },
    { id: 'g_portes', title: 'Portes', cards: ['portes'] },
    { id: 'g_fenetres', title: 'Allège : hauteur sous fenêtres', cards: ['fenetres'] },
    { id: 'g_salle_eau', title: 'Salle d’eau', cards: ['salle_eau', 'surface_salle_eau'], image: 'salle_d_eau.bmp' },
    { id: 'g_chambre', title: 'Chambre', cards: ['chambre', 'surface_chambre'], image: 'chambre.bmp' },
    { id: 'g_piece_vie', title: 'Pièce de vie', cards: ['piece_vie', 'surface_piece_vie'], image: 'piece_de_vie.bmp' },
    { id: 'g_surface_totale', title: 'Surface totale du logement', cards: ['surface_totale'] },
    { id: 'g_vitree', title: '', cards: ['fenetre_chambre', 'fenetre_vie', 'surface_vitree'] },
    { id: 'g_pourcentage', title: 'Pourcentage de surface vitrée / surface habitable', cards: ['pourcentage_vitree'] }
  ];
  const BUTTON_PREREQS = {
    surface_salle_eau: ['salle_eau'],
    surface_chambre: ['chambre'],
    surface_piece_vie: ['piece_vie'],
    surface_totale: ['surface_salle_eau', 'surface_chambre', 'surface_piece_vie'],
    surface_vitree: ['fenetre_chambre', 'fenetre_vie'],
    pourcentage_vitree: ['surface_totale', 'surface_vitree']
  };
  const STAGE_BUTTON_CLASS = {
    input: 'verify-stage-input',
    formula_sum: 'verify-stage-formula-sum',
    formula_yellow: 'verify-stage-formula-yellow',
    formula_green: 'verify-stage-formula-green',
    formula_orange: 'verify-stage-formula-orange',
    done: 'verify-stage-done'
  };
  const MERGED_ROWS = new Set([23, 36, 59, 62, 75, 78]);
  const COLS = ['A', 'B', 'C', 'D'];
  const STAGE_NOUNS = {
    input: { singular: 'cellule bleue claire', plural: 'cellules bleues claires' },
    formula_sum: { singular: 'cellule bleue foncée', plural: 'cellules bleues foncées' },
    formula_yellow: { singular: 'cellule jaune', plural: 'cellules jaunes' },
    formula_green: { singular: 'cellule verte', plural: 'cellules vertes' },
    formula_orange: { singular: 'cellule orange', plural: 'cellules oranges' }
  };
  const INPUT_TOLERANCE_CM = 0.1;
  const ATTEMPT_FACTORS = [1, 0.8, 0.6, 0.4];
  const SCORE_RULES = {
    input: { mode: 'perCell', raw: 1 },
    formula_sum: { mode: 'perCell', raw: 1 },
    formula_yellow: { mode: 'perStage', raw: 2 },
    formula_green: { mode: 'perStage', raw: 2 },
    formula_orange: { mode: 'perStage', raw: 3 }
  };
  const state = {
    profile: null,
    storageKey: null,
    selectedCell: null,
    anchorCell: null,
    selectionCoords: [],
    entries: {},
    validations: {},
    stageStatus: {},
    cellMeta: {},
    rowMap: {},
    cellElements: {},
    numericValues: {},
    isMouseSelecting: false,
    clipboard: null,
    buttonInfo: {},
    infoElements: {},
    attempts: {},
    scoreAwards: {},
    maxRawPoints: 0,
  };
  const ui = {};
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    if (!CONFIG || !CONFIG.sections) {
      document.body.innerHTML = '<p style="padding:2rem;font-family:Arial">Configuration introuvable.</p>';
      return;
    }
    cacheUi();
    indexConfig();
    state.maxRawPoints = computeMaxRawPoints();
    renderGroups();
    bindEvents();
    handleLayoutChange();
    window.addEventListener('resize', handleLayoutChange);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', handleLayoutChange);
  }

  function cacheUi() {
    ui.loginOverlay = document.getElementById('loginOverlay');
    ui.loginForm = document.getElementById('loginForm');
    ui.fixedBarHost = document.getElementById('fixedBarHost');
    ui.appViewport = document.getElementById('appViewport');
    if (ui.appViewport) ui.appViewport.tabIndex = -1;
    ui.cardsContainer = document.getElementById('cardsContainer');
    ui.studentLine = document.getElementById('studentLine');
    ui.selectedCellRef = document.getElementById('selectedCellRef');
    ui.formulaInput = document.getElementById('formulaInput');
    ui.infoBox = document.getElementById('infoBox');
    ui.scoreDisplay = document.getElementById('scoreDisplay');
  }

  function bindEvents() {
    ui.loginForm.addEventListener('submit', onLogin);
    ui.formulaInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        commitSelectedCell();
      }
    });
    ui.formulaInput.addEventListener('input', updateInfoForTypedFormula);
    ui.formulaInput.addEventListener('focus', updateFormulaInsertMode);
    ui.formulaInput.addEventListener('blur', () => { state.formulaInsertMode = false; });
    document.addEventListener('mouseup', () => { state.isMouseSelecting = false; });
    document.addEventListener('keydown', handleGlobalKeydown);
  }

  function handleLayoutChange() {
    const root = document.documentElement;
    root.style.setProperty('--bar-h', '8.7vw');
    root.style.setProperty('--bar-gap', '0.8vw');
    root.style.setProperty('--sticky-top', 'calc(var(--bar-h) + var(--bar-gap))');
  }

  function indexConfig() {
    CONFIG.sections.forEach((section) => {
      section.rows.forEach((row) => {
        state.rowMap[row.row] = row;
        Object.keys(row.cells).forEach((col) => {
          const cell = row.cells[col];
          const meta = { ...cell, col, row: row.row, sectionKey: section.key };
          meta.stage = getStage(meta);
          state.cellMeta[cell.coord] = meta;
        });
      });
    });
  }

  function getStage(meta) {
    if (meta.kind === 'input') return 'input';
    if (meta.kind === 'formula_sum') return 'formula_sum';
    if (meta.kind === 'formula' && meta.col === 'C') return 'formula_yellow';
    if (meta.kind === 'formula' && meta.col === 'D') return 'formula_green';
    if (meta.kind === 'formula_result') return 'formula_orange';
    return null;
  }

  function renderGroups() {
    ui.cardsContainer.innerHTML = '';
    state.cellElements = {};
    state.infoElements = {};
    GROUP_DEFS.forEach((groupDef) => {
      const card = document.createElement('section');
      card.className = 'group-card';
      card.dataset.groupId = groupDef.id;
      if (groupDef.title) {
        const title = document.createElement('h2');
        title.className = 'group-title';
        title.textContent = groupDef.title;
        card.appendChild(title);
      }
      const grid = document.createElement('div');
      grid.className = `group-grid ${groupDef.image ? '' : 'no-image'}`;
      const stack = document.createElement('div');
      stack.className = 'subcards-stack';
      groupDef.cards.forEach((cardId) => {
        const def = CARD_DEFS.find((item) => item.id === cardId);
        if (def) stack.appendChild(renderMiniCard(def));
      });
      grid.appendChild(stack);
      if (groupDef.image) {
        const rail = document.createElement('div');
        rail.className = 'figure-rail';
        const side = document.createElement('div');
        side.className = 'figure-box';
        side.innerHTML = `<img src="assets/images/${groupDef.image}" alt="${escapeHtml(groupDef.title || groupDef.image)}">`;
        rail.appendChild(side);
        grid.appendChild(rail);
      }
      card.appendChild(grid);
      ui.cardsContainer.appendChild(card);
    });
    recomputeAll();
    updateAllDisplays();
    updateAllButtons();
    updateSelectionStyles();
  }

  function renderMiniCard(cardDef) {
    const wrap = document.createElement('div');
    wrap.className = 'subcard-row';
    const tableWrap = document.createElement('div');
    tableWrap.className = 'table-wrap';
    if (cardDef.showTitle) {
      const miniTitle = document.createElement('div');
      miniTitle.className = 'mini-table-title';
      miniTitle.textContent = cardDef.title;
      tableWrap.appendChild(miniTitle);
    }
    const table = document.createElement('table');
    table.className = 'sheet-table';
    const colgroup = document.createElement('colgroup');
    colgroup.innerHTML = `<col class="row-col"><col class="data-col"><col class="data-col"><col class="data-col"><col class="data-col">`;
    table.appendChild(colgroup);
    const tbody = document.createElement('tbody');
    tbody.appendChild(buildHeaderRows(cardDef.headerMode));
    cardDef.rows.forEach((rowNumber) => {
      const rowData = state.rowMap[rowNumber];
      if (!rowData) return;
      const tr = document.createElement('tr');
      const rowNum = document.createElement('td');
      rowNum.className = 'row-num';
      rowNum.textContent = rowNumber;
      tr.appendChild(rowNum);
      COLS.forEach((col) => {
        if (MERGED_ROWS.has(rowData.row) && (col === 'B' || col === 'C')) return;
        const td = document.createElement('td');
        const meta = rowData.cells[col];
        if (!meta) {
          td.innerHTML = '<div class="cell empty"></div>';
          tr.appendChild(td);
          return;
        }
        if (MERGED_ROWS.has(rowData.row) && col === 'A') {
          td.colSpan = 3;
          td.className = 'merged-cell';
        }
        const cellMeta = state.cellMeta[meta.coord];
        const cellDiv = document.createElement('div');
        cellDiv.className = `cell ${getCellClass(cellMeta)} col-${col.toLowerCase()}`;
        cellDiv.dataset.coord = meta.coord;
        if (state.cellMeta[meta.coord]) cellDiv.classList.add('clickable');
        cellDiv.innerHTML = `<span class="coord-tag">${meta.coord}</span><div class="cell-value"></div>`;
        td.appendChild(cellDiv);
        state.cellElements[meta.coord] = cellDiv;
        cellDiv.addEventListener('mousedown', (event) => handleCellPointerDown(event, meta.coord));
        cellDiv.addEventListener('mouseenter', () => handleCellPointerEnter(meta.coord));
        cellDiv.addEventListener('dragstart', (event) => event.preventDefault());
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    tableWrap.appendChild(table);
    wrap.appendChild(tableWrap);
    const actionCol = document.createElement('div');
    actionCol.className = 'action-col';
    const verifyInfo = document.createElement('div');
    verifyInfo.className = 'verify-info';
    verifyInfo.dataset.cardId = cardDef.id;
    const verifyPoints = document.createElement('div');
    verifyPoints.className = 'verify-points';
    const verifyMessage = document.createElement('div');
    verifyMessage.className = 'verify-message';
    verifyInfo.appendChild(verifyPoints);
    verifyInfo.appendChild(verifyMessage);
    state.infoElements[cardDef.id] = { box: verifyInfo, points: verifyPoints, message: verifyMessage };
    const verifyBtn = document.createElement('button');
    verifyBtn.className = 'verify-btn';
    verifyBtn.dataset.cardId = cardDef.id;
    verifyBtn.addEventListener('click', () => verifyCard(cardDef.id));
    actionCol.appendChild(verifyInfo);
    actionCol.appendChild(verifyBtn);
    wrap.appendChild(actionCol);
    return wrap;
  }

  function buildHeaderRows(mode) {
    const frag = document.createDocumentFragment();
    const tr1 = document.createElement('tr');
    tr1.className = 'head-row';
    tr1.innerHTML = `<th class="corner-top head-cell">Colonne →</th><th class="head-cell">A</th><th class="head-cell">B</th><th class="head-cell">C</th><th class="head-cell">D</th>`;
    const tr2 = document.createElement('tr');
    tr2.className = 'head-row';
    const labels = getHeaderLabels(mode);
    tr2.innerHTML = `<th class="corner-bottom head-cell">Ligne ↓</th><th class="head-cell">${labels.A}</th><th class="head-cell">${labels.B}</th><th class="head-cell">${labels.C}</th><th class="head-cell">${labels.D}</th>`;
    frag.appendChild(tr1); frag.appendChild(tr2); return frag;
  }

  function getHeaderLabels(mode) {
    if (mode === 'surface') return { A: '', B: '', C: '', D: 'Réelle (m²)' };
    if (mode === 'percent') return { A: '', B: '', C: '', D: 'Réelle (%)' };
    return { A: '', B: 'Mesuré (cm)', C: 'Réelle (cm)', D: 'Réelle (m)' };
  }

  function onLogin(event) {
    event.preventDefault();
    const profile = {
      prenom: document.getElementById('prenom').value.trim(),
      nom: document.getElementById('nom').value.trim(),
      classe: document.getElementById('classe').value.trim(),
      groupe: document.getElementById('groupe').value.trim(),
    };
    if (!profile.prenom || !profile.nom) return;
    state.profile = profile;
    state.storageKey = [STORAGE_PREFIX, safeId(profile.prenom), safeId(profile.nom), safeId(profile.classe || 'sans-classe'), safeId(profile.groupe || 'sans-groupe')].join('__');
    loadState();
    ui.studentLine.textContent = `${profile.prenom} ${profile.nom}${profile.classe ? ' - ' + profile.classe : ''}${profile.groupe ? ' - ' + profile.groupe : ''}`;
    ui.loginOverlay.style.display = 'none';
    ui.fixedBarHost.style.display = 'block';
    ui.appViewport.style.display = 'block';
    recomputeAll(); updateAllDisplays(); updateAllButtons(); updateScoreDisplay(); clearSelection();
    setInfo('Clique sur une cellule. Maj + clic pour sélectionner une plage. Ctrl/Cmd + C puis Ctrl/Cmd + V pour copier-coller.');
  }

  function safeId(value) {
    return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-');
  }

  function loadState() {
    const raw = localStorage.getItem(state.storageKey); if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      state.entries = parsed.entries || {};
      state.validations = parsed.validations || {};
      state.stageStatus = parsed.stageStatus || {};
      state.attempts = parsed.attempts || {};
      state.scoreAwards = parsed.scoreAwards || {};
    } catch {
      state.entries = {};
      state.validations = {};
      state.stageStatus = {};
      state.attempts = {};
      state.scoreAwards = {};
    }
  }

  function saveState() {
    if (!state.storageKey) return;
    localStorage.setItem(state.storageKey, JSON.stringify({ profile: state.profile, entries: state.entries, validations: state.validations, stageStatus: state.stageStatus, attempts: state.attempts, scoreAwards: state.scoreAwards, savedAt: new Date().toISOString() }));
  }

  function clearSelection() { state.selectedCell = null; state.anchorCell = null; state.selectionCoords = []; state.formulaInsertMode = false; ui.selectedCellRef.textContent = 'Aucune'; ui.formulaInput.value = ''; ui.formulaInput.readOnly = true; updateSelectionStyles(); }

  function handleCellPointerDown(event, coord) {
    event.preventDefault();
    const editingFormula = state.formulaInsertMode && state.selectedCell && canEditCoord(state.selectedCell) && isFormulaCell(state.selectedCell) && ui.formulaInput.value.trim().startsWith('=');
    if (editingFormula && state.selectedCell !== coord && !event.shiftKey) { insertCoordIntoInput(coord); return; }
    if (event.shiftKey && state.anchorCell) {
      state.selectedCell = state.anchorCell; state.selectionCoords = getRangeCoords(state.anchorCell, coord); state.isMouseSelecting = false; ui.formulaInput.value = ''; ui.selectedCellRef.textContent = getSelectionLabel(); updateSelectionStyles(); setInfo(`Plage ${getSelectionLabel()} sélectionnée.`); return;
    }
    state.isMouseSelecting = true; state.anchorCell = coord; state.selectedCell = coord; state.selectionCoords = [coord]; updateSelectionStyles(); loadInputForSelection();
  }

  function handleCellPointerEnter(coord) {
    if (!state.isMouseSelecting || !state.anchorCell) return;
    if (state.selectedCell && isFormulaCell(state.selectedCell) && ui.formulaInput.value.trim().startsWith('=')) return;
    state.selectionCoords = getRangeCoords(state.anchorCell, coord);
    if (state.selectionCoords.length > 1) { ui.formulaInput.value = ''; ui.selectedCellRef.textContent = getSelectionLabel(); setInfo(`Plage ${getSelectionLabel()} sélectionnée. Utilise Ctrl/Cmd + C pour copier.`); }
    else loadInputForSelection();
    updateSelectionStyles();
  }

  function loadInputForSelection() {
    if (!state.selectedCell || state.selectionCoords.length > 1) {
      ui.formulaInput.value = '';
      ui.formulaInput.readOnly = true;
      state.formulaInsertMode = false;
      ui.selectedCellRef.textContent = getSelectionLabel() || 'Aucune';
      if (state.selectionCoords.length > 1) setInfo(`Plage ${getSelectionLabel()} sélectionnée.`);
      return;
    }
    ui.selectedCellRef.textContent = state.selectedCell;
    ui.formulaInput.value = getRawCellContent(state.selectedCell);
    ui.formulaInput.readOnly = !canEditCoord(state.selectedCell);
    updateFormulaInsertMode();
    setInfo(getHintForCell(state.selectedCell));
  }

  function commitSelectedCell() {
    if (!state.selectedCell || state.selectionCoords.length !== 1) return;
    const coord = state.selectedCell, meta = state.cellMeta[coord];
    if (!meta || !canEditCoord(coord)) { setInfo('Cette cellule ne peut pas être modifiée.'); return; }
    const raw = ui.formulaInput.value.trim();
    if (meta.kind === 'input') {
      if (raw.startsWith('=')) { setInfo(`Dans ${coord}, seules des valeurs mesurées sont autorisées, pas de formule.`); return; }
      if (raw && parseStudentNumber(raw) == null) { setInfo(`Dans ${coord}, indique uniquement une valeur numérique.`); return; }
    } else {
      if (raw && !raw.startsWith('=')) { setInfo(`Dans ${coord}, il faut obligatoirement écrire une formule commençant par =.`); return; }
      if (raw && !hasCellReference(raw)) { setInfo(`Dans ${coord}, la formule doit utiliser au moins une autre cellule.`); return; }
    }
    state.entries[coord] = raw;
    delete state.validations[coord];
    resetStageStatusFrom(coord);
    recomputeAll();
    updateAllDisplays();
    updateAllButtons();
    saveState();
    state.formulaInsertMode = false;
    ui.formulaInput.value = '';
    ui.formulaInput.readOnly = true;
    ui.formulaInput.blur();
    const nextCoord = findNextCoordBelow(coord) || coord;
    state.anchorCell = nextCoord;
    state.selectedCell = nextCoord;
    state.selectionCoords = [nextCoord];
    loadInputForSelection();
    updateSelectionStyles();
    ensureCoordVisible(nextCoord);
    if (ui.appViewport) ui.appViewport.focus({ preventScroll: true });
    setInfo(`${coord} enregistré.`);
  }

  function resetStageStatusFrom(coord) {
    const meta = state.cellMeta[coord], cardId = getCardIdForCoord(coord); if (!meta || !cardId) return; if (!state.stageStatus[cardId]) state.stageStatus[cardId] = {};
    const startIndex = STAGES.indexOf(meta.stage); if (startIndex < 0) return;
    for (let i = startIndex; i < STAGES.length; i += 1) delete state.stageStatus[cardId][STAGES[i]];
    getCardCoords(cardId).forEach((c) => {
      const cStage = state.cellMeta[c] ? state.cellMeta[c].stage : null;
      const cIndex = STAGES.indexOf(cStage);
      if (c === coord) delete state.validations[c];
      else if (cIndex > startIndex) delete state.validations[c];
    });
    state.buttonInfo[cardId] = '';
  }

  function insertCoordIntoInput(coord) {
    const input = ui.formulaInput, start = input.selectionStart ?? input.value.length, end = input.selectionEnd ?? input.value.length;
    input.value = `${input.value.slice(0, start)}${coord}${input.value.slice(end)}`; const pos = start + coord.length; input.focus(); input.setSelectionRange(pos, pos); updateInfoForTypedFormula();
  }

  function updateSelectionStyles() {
    Object.values(state.cellElements).forEach((el) => el.classList.remove('range-selected', 'range-anchor', 'readonly-selected', 'locked-cell'));
    const coords = state.selectionCoords.length ? state.selectionCoords : (state.selectedCell ? [state.selectedCell] : []);
    coords.forEach((coord) => {
      const el = state.cellElements[coord]; if (!el) return;
      if (coord === state.anchorCell || (coords.length === 1 && coord === state.selectedCell)) el.classList.add('range-anchor'); else el.classList.add('range-selected');
      if (!canEditCoord(coord)) el.classList.add('readonly-selected');
      if (isLocked(coord)) el.classList.add('locked-cell');
    });
  }

  function updateInfoForTypedFormula() {
    updateFormulaInsertMode();
    if (!state.selectedCell || state.selectionCoords.length !== 1) return;
    const raw = ui.formulaInput.value.trim(), meta = state.cellMeta[state.selectedCell];
    if (meta && meta.kind === 'input') { setInfo(`Dans ${state.selectedCell}, indique uniquement une valeur mesurée.`); return; }
    if (raw.startsWith('=') && isFormulaCell(state.selectedCell)) {
      if (!hasCellReference(raw)) setInfo(`Dans ${state.selectedCell}, la formule doit utiliser d'autres cellules.`);
      else setInfo(`Dans ${state.selectedCell}, écris une formule puis appuie sur Entrée. Clique sur d'autres cellules pour insérer leurs références.`);
    }
    else setInfo(getHintForCell(state.selectedCell));
  }

  function updateFormulaInsertMode() {
    state.formulaInsertMode = !!(
      state.selectedCell &&
      state.selectionCoords.length === 1 &&
      canEditCoord(state.selectedCell) &&
      isFormulaCell(state.selectedCell) &&
      document.activeElement === ui.formulaInput &&
      ui.formulaInput.value.trim().startsWith('=')
    );
  }

  function setInfo(text) { ui.infoBox.textContent = text; }

  function getHintForCell(coord) {
    const meta = state.cellMeta[coord]; if (!meta) return 'Cellule inconnue.';
    if (meta.kind === 'input') return `Dans ${coord}, indique la mesure manquante en cm. Seules des valeurs sont autorisées.`;
    if (meta.kind === 'given') return `La valeur de ${coord} est déjà donnée dans l'activité.`;
    if (meta.kind === 'formula_sum') return `Dans ${coord}, écris une formule pour calculer cette mesure à partir d'autres cellules.`;
    if (meta.kind === 'formula' && meta.col === 'C') return `Dans ${coord}, écris une formule pour passer de la maquette à la mesure réelle en cm.`;
    if (meta.kind === 'formula' && meta.col === 'D') return `Dans ${coord}, écris une formule pour convertir les cm en m.`;
    if (meta.kind === 'formula_result') return `Dans ${coord}, écris une formule pour calculer le résultat demandé.`;
    return `Cellule ${coord}.`;
  }

  function recomputeAll() {
    const cache = {}; Object.keys(state.cellMeta).forEach((coord) => { cache[coord] = resolveNumericValue(coord, new Set()); }); state.numericValues = cache;
  }

  function resolveNumericValue(coord, stack) {
    if (stack.has(coord)) return null;
    const meta = state.cellMeta[coord]; if (!meta) return null;
    if (meta.kind === 'given') return normalizeNumber(meta.correct);
    if (meta.kind === 'label' || meta.kind === 'blank') return null;
    if (meta.kind === 'input') return parseStudentNumber(state.entries[coord]);
    const raw = state.entries[coord]; if (!raw || !String(raw).trim()) return null;
    stack.add(coord); const result = evaluateFormula(String(raw), stack); stack.delete(coord); return result;
  }

  function evaluateFormula(raw, stack) {
    const trimmed = raw.trim(); if (!trimmed.startsWith('=')) return null;
    let expr = trimmed.slice(1).trim(); if (!expr) return null;
    const rangeTokens = [];
    expr = expr.replace(/([A-D]\d+)\s*:\s*([A-D]\d+)/gi, (_, startRef, endRef) => {
      const token = `__RANGE_${rangeTokens.length}__`; rangeTokens.push({ token, startRef: startRef.toUpperCase(), endRef: endRef.toUpperCase() }); return token;
    });
    expr = expr.replace(/SOMME\s*\(/gi, 'SUM(').replace(/SUM\s*\(/gi, 'SUM(').replace(/;/g, ',');
    expr = expr.replace(/\b([A-D]\d+)\b/g, (match) => {
      const val = resolveNumericValue(match.toUpperCase(), stack); if (val == null || Number.isNaN(val)) throw new Error(`Référence ${match} non disponible`); return `(${String(val).replace(',', '.')})`;
    });
    rangeTokens.forEach(({ token, startRef, endRef }) => { expr = expr.replace(token, `RANGE("${startRef}","${endRef}")`); });
    if (/[^0-9+\-*/().,\sA-Z_"']/i.test(expr)) return null;
    try {
      const fn = new Function('SUM', 'RANGE', `return (${expr});`);
      const out = fn(sumFn, (startRef, endRef) => expandRange(startRef, endRef).map((coord) => {
        const val = resolveNumericValue(coord, new Set(stack)); if (val == null || Number.isNaN(val)) throw new Error(`Référence ${coord} non disponible`); return val;
      }));
      if (typeof out !== 'number' || Number.isNaN(out) || !Number.isFinite(out)) return null; return out;
    } catch { return null; }
  }

  function sumFn(...args) { const flat = []; args.forEach((arg) => { if (Array.isArray(arg)) flat.push(...arg.flat(Infinity)); else flat.push(arg); }); return flat.reduce((sum, value) => sum + Number(value || 0), 0); }

  function expandRange(startRef, endRef) {
    const a = coordToPos(startRef), b = coordToPos(endRef); if (!a || !b) return [];
    const minRow = Math.min(a.row, b.row), maxRow = Math.max(a.row, b.row), minCol = Math.min(a.col, b.col), maxCol = Math.max(a.col, b.col); const coords = [];
    for (let row = minRow; row <= maxRow; row += 1) {
      for (let col = minCol; col <= maxCol; col += 1) {
        const coord = posToCoord(row, col); if (coord && state.cellElements[coord]) coords.push(coord);
      }
    }
    return coords;
  }

  function parseStudentNumber(raw) { if (raw == null) return null; const text = String(raw).trim(); if (!text || text.startsWith('=')) return null; const num = Number(text.replace(/\s/g, '').replace(',', '.')); return Number.isFinite(num) ? num : null; }
  function normalizeNumber(value) { const num = Number(value); return Number.isFinite(num) ? num : null; }

  function computeMaxRawPoints() {
    let total = 0;
    CARD_DEFS.forEach((card) => {
      STAGES.forEach((stage) => {
        const coords = getCardCoords(card.id).filter((coord) => state.cellMeta[coord].stage === stage);
        if (!coords.length) return;
        const rule = SCORE_RULES[stage];
        total += rule.mode === 'perCell' ? coords.length * rule.raw : rule.raw;
      });
    });
    return total;
  }

  function getScoreScale() {
    return state.maxRawPoints ? 20 / state.maxRawPoints : 0;
  }

  function getTotalScore() {
    return Object.values(state.scoreAwards).reduce((sum, value) => sum + Number(value || 0), 0);
  }

  function formatScore(value) {
    return Number(value || 0).toFixed(2).replace('.', ',');
  }

  function updateScoreDisplay() {
    if (!ui.scoreDisplay) return;
    ui.scoreDisplay.textContent = `${formatScore(getTotalScore())} / 20`;
  }

  function getAttemptFactor(attemptNumber) {
    return ATTEMPT_FACTORS[Math.min(Math.max(attemptNumber, 1), ATTEMPT_FACTORS.length) - 1];
  }

  function getAttemptNumber(cardId, stage) {
    if (!state.attempts[cardId]) state.attempts[cardId] = {};
    state.attempts[cardId][stage] = (state.attempts[cardId][stage] || 0) + 1;
    return state.attempts[cardId][stage];
  }

  function getAwardKey(cardId, stage, coord) {
    const rule = SCORE_RULES[stage] || { mode: 'perStage' };
    return rule.mode === 'perCell' ? `${cardId}:${coord}` : `${cardId}:${stage}`;
  }

  function awardScore(cardId, stage, attemptNumber, coords, onlyCorrectCoords = []) {
    const rule = SCORE_RULES[stage];
    if (!rule) return 0;
    const factor = getAttemptFactor(attemptNumber);
    let gained = 0;
    if (rule.mode === 'perCell') {
      onlyCorrectCoords.forEach((coord) => {
        const key = getAwardKey(cardId, stage, coord);
        if (state.scoreAwards[key] != null) return;
        const pts = rule.raw * getScoreScale() * factor;
        state.scoreAwards[key] = pts;
        gained += pts;
      });
    } else {
      const key = getAwardKey(cardId, stage);
      if (state.scoreAwards[key] == null && coords.length && onlyCorrectCoords.length === coords.length) {
        const pts = rule.raw * getScoreScale() * factor;
        state.scoreAwards[key] = pts;
        gained += pts;
      }
    }
    return gained;
  }

  function updateAllDisplays() {
    Object.entries(state.cellMeta).forEach(([coord, meta]) => {
      const el = state.cellElements[coord]; if (!el) return;
      el.classList.remove('ok', 'no', 'locked-cell');
      if (state.validations[coord] === 'ok') el.classList.add('ok');
      if (state.validations[coord] === 'no') el.classList.add('no');
      if (isLocked(coord)) el.classList.add('locked-cell');
      el.querySelector('.cell-value').textContent = getDisplayValue(coord, meta);
    });
    updateSelectionStyles();
    refreshFormulaInputView();
    updateScoreDisplay();
  }

  function getDisplayValue(coord, meta) {
    if (meta.kind === 'label') return meta.display || meta.student || '';
    if (meta.kind === 'blank') return '';
    if (meta.kind === 'given') return formatNumber(meta.correct);
    if (meta.kind === 'input') { const raw = state.entries[coord], num = parseStudentNumber(raw); return raw && num == null ? raw : (num == null ? '' : formatNumber(num)); }
    const raw = state.entries[coord] ? String(state.entries[coord]).trim() : '', num = state.numericValues[coord]; if (!raw) return ''; if (num != null) return formatNumber(num); return raw.startsWith('=') ? '#ERREUR' : raw;
  }

  function formatNumber(num) { if (num == null || Number.isNaN(num)) return ''; const rounded = Math.round(num * 1000000) / 1000000; let text = String(rounded); if (text.includes('e')) text = rounded.toFixed(6); text = text.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1'); return text.replace('.', ','); }
  function getCellClass(meta) { if (meta.kind === 'label') return 'label'; if (meta.kind === 'given') return 'given'; if (meta.kind === 'input') return 'input'; if (meta.kind === 'formula_sum') return 'formula_sum'; if (meta.kind === 'formula_result') return 'formula_result'; if (meta.kind === 'formula') return `formula ${meta.col === 'D' ? 'green' : 'yellow'}`; return 'empty'; }
  function isEditableType(coord) { const meta = state.cellMeta[coord]; return meta && ['input', 'formula_sum', 'formula', 'formula_result'].includes(meta.kind); }
  function isLocked(coord) { return state.validations[coord] === 'ok'; }
  function canEditCoord(coord) { return isEditableType(coord) && !isLocked(coord); }
  function isFormulaCell(coord) { const meta = state.cellMeta[coord]; return meta && ['formula_sum', 'formula', 'formula_result'].includes(meta.kind); }
  function hasCellReference(raw) { return /(?:[A-D]\d+)(?::[A-D]\d+)?/i.test(String(raw || '')); }
  function getCardIdForCoord(coord) { const meta = state.cellMeta[coord]; if (!meta) return null; const def = CARD_DEFS.find((card) => card.rows.includes(meta.row)); return def ? def.id : null; }
  function getCardCoords(cardId) { const card = CARD_DEFS.find((c) => c.id === cardId); if (!card) return []; return card.rows.flatMap((row) => COLS.map((col) => `${col}${row}`)).filter((coord) => state.cellMeta[coord] && state.cellMeta[coord].stage); }
  function getStagesForCard(cardId) { const coords = getCardCoords(cardId), set = new Set(coords.map((coord) => state.cellMeta[coord].stage).filter(Boolean)); return STAGES.filter((stage) => set.has(stage)); }
  function getCurrentStage(cardId) { const stages = getStagesForCard(cardId), doneMap = state.stageStatus[cardId] || {}; return stages.find((stage) => !doneMap[stage]) || null; }

  function verifyCard(cardId) {
    const stage = getCurrentStage(cardId);
    if (!stage) {
      const msg = 'Tout est déjà vérifié.';
      state.buttonInfo[cardId] = { points: '', message: msg, strong: true };
      updateAllButtons();
      setInfo(msg);
      return;
    }
    const coords = getCardCoords(cardId).filter((coord) => state.cellMeta[coord].stage === stage);
    const emptyCoords = coords.filter((coord) => !isCellFilledForVerification(coord));
    if (emptyCoords.length) {
      const msg = `Renseigne d’abord ${formatStageFillMessage(stage, emptyCoords.length)}.`;
      state.buttonInfo[cardId] = { points: '', message: msg, strong: true };
      updateAllButtons();
      setInfo(msg);
      return;
    }

    const attemptNumber = getAttemptNumber(cardId, stage);
    let allGood = true;
    let correctCount = 0;
    const correctCoords = [];
    const adjustedInputs = [];

    coords.forEach((coord) => {
      const result = checkCell(coord);
      state.validations[coord] = result.ok ? 'ok' : 'no';
      if (result.ok) {
        correctCount += 1;
        correctCoords.push(coord);
      } else {
        allGood = false;
      }
      if (result.adjusted) adjustedInputs.push(result.adjusted);
    });

    if (!state.stageStatus[cardId]) state.stageStatus[cardId] = {};
    if (allGood) state.stageStatus[cardId][stage] = true;

    const pointsGained = awardScore(cardId, stage, attemptNumber, coords, correctCoords);
    const pointsLine = pointsGained > 0 ? `Points gagnés : +${formatScore(pointsGained)} / 20` : '';
    const message = buildVerificationMessage(stage, correctCount, coords.length, adjustedInputs);
    state.buttonInfo[cardId] = { points: pointsLine, message, strong: true };

    updateAllDisplays();
    updateAllButtons();
    saveState();
    setInfo(message.replace(/<[^>]+>/g, ''));
  }

  function checkCell(coord) {
    const meta = state.cellMeta[coord];
    if (!meta || !meta.stage) return { ok: true, adjusted: null };
    if (meta.kind === 'input') {
      const raw = state.entries[coord] ? String(state.entries[coord]).trim() : '';
      if (raw.startsWith('=')) return { ok: false, adjusted: null };
      const entered = parseStudentNumber(raw);
      if (entered == null) return { ok: false, adjusted: null };
      if (approxEqual(entered, meta.correct)) return { ok: true, adjusted: null };
      if (withinInputTolerance(entered, meta.correct)) {
        const before = formatNumber(entered);
        const after = formatNumber(meta.correct);
        state.entries[coord] = formatNumber(meta.correct);
        return { ok: true, adjusted: { coord, before, after } };
      }
      return { ok: false, adjusted: null };
    }
    const raw = state.entries[coord] ? String(state.entries[coord]).trim() : '';
    if (!raw.startsWith('=')) return { ok: false, adjusted: null };
    if (!hasCellReference(raw)) return { ok: false, adjusted: null };
    return { ok: approxEqual(state.numericValues[coord], meta.correct), adjusted: null };
  }

  function withinInputTolerance(a, b) {
    return a != null && b != null && Math.abs(Number(a) - Number(b)) <= INPUT_TOLERANCE_CM + 1e-9;
  }

  function isCellCorrect(coord) {
    return checkCell(coord).ok;
  }

  function isCellFilledForVerification(coord) {
    const meta = state.cellMeta[coord];
    if (!meta || !meta.stage) return true;
    const raw = state.entries[coord] ? String(state.entries[coord]).trim() : '';
    if (meta.kind === 'input') return raw !== '' && parseStudentNumber(raw) != null;
    return raw !== '';
  }

  function formatStagePhrase(stage, count) {
    const forms = STAGE_NOUNS[stage] || { singular: 'cellule', plural: 'cellules' };
    return count > 1 ? forms.plural : forms.singular;
  }

  function formatStageFillMessage(stage, count) {
    const phrase = formatStagePhrase(stage, count);
    return count > 1 ? `les ${count} ${phrase}` : `la ${phrase}`;
  }

  function formatSuccessMessage(stage, count) {
    const phrase = formatStagePhrase(stage, count);
    return count === 1 ? `La ${phrase} est correcte.` : `Les ${phrase} sont correctes.`;
  }

  function formatFailureMessage(correctCount, totalCount) {
    const cellWordCorrect = correctCount > 1 ? 'cellules' : 'cellule';
    const isPluralError = totalCount - correctCount > 1;
    return `${correctCount} ${cellWordCorrect} correcte${correctCount > 1 ? 's' : ''} sur ${totalCount}. Corrige ${isPluralError ? 'les cellules rouges' : 'la cellule rouge'}.`;
  }

  function formatAdjustmentMessage(adjustedInputs) {
    if (!adjustedInputs.length) return '';
    if (adjustedInputs.length === 1) {
      const item = adjustedInputs[0];
      return `Valeur ajustée : ${item.before} devient ${item.after} car un écart de 1 mm est accepté.`;
    }
    return `${adjustedInputs.length} valeurs ont été ajustées à la valeur attendue car un écart de 1 mm est accepté.`;
  }

  function buildVerificationMessage(stage, correctCount, totalCount, adjustedInputs) {
    const base = correctCount === totalCount ? formatSuccessMessage(stage, totalCount) : formatFailureMessage(correctCount, totalCount);
    const adjust = formatAdjustmentMessage(adjustedInputs);
    return adjust ? `${base} ${adjust}` : base;
  }

  function approxEqual(a, b) { return a != null && b != null && Math.abs(Number(a) - Number(b)) < 1e-6; }

  function updateAllButtons() {
    document.querySelectorAll('.verify-btn').forEach((btn) => {
      const cardId = btn.dataset.cardId;
      const stage = getCurrentStage(cardId);
      const infoRef = state.infoElements[cardId];
      const infoBox = infoRef ? infoRef.box : null;
      btn.classList.remove('verify-stage-input', 'verify-stage-formula-sum', 'verify-stage-formula-yellow', 'verify-stage-formula-green', 'verify-stage-formula-orange', 'verify-stage-done', 'hidden-verify');
      if (infoBox) infoBox.classList.remove('hidden-verify');
      if (!canShowVerifyButton(cardId)) {
        btn.classList.add('hidden-verify');
        if (infoBox) infoBox.classList.add('hidden-verify');
        return;
      }
      const displayStage = stage || getLastStageForCard(cardId) || 'done';
      btn.classList.add(STAGE_BUTTON_CLASS[displayStage] || 'verify-stage-done');
      btn.textContent = stage ? STAGE_LABELS[stage] : STAGE_LABELS.done;
      if (infoRef) {
        const data = state.buttonInfo[cardId] || {};
        infoRef.points.textContent = data.points || '';
        infoRef.message.textContent = data.message || '';
        infoRef.message.classList.toggle('strong', !!data.strong);
      }
    });
  }
  function canShowVerifyButton(cardId) {
    const reqs = BUTTON_PREREQS[cardId] || [];
    return reqs.every((reqId) => isCardFullyVerified(reqId));
  }

  function getLastStageForCard(cardId) {
    const stages = getStagesForCard(cardId);
    return stages.length ? stages[stages.length - 1] : null;
  }

  function isCardFullyVerified(cardId) {
    const stages = getStagesForCard(cardId);
    return stages.length > 0 && stages.every((stage) => !!(state.stageStatus[cardId] && state.stageStatus[cardId][stage]));
  }

  function handleGlobalKeydown(event) {
    if (!state.profile) return;
    const key = event.key;
    const lower = key.toLowerCase();
    const inFormulaInput = document.activeElement === ui.formulaInput;

    if ((event.ctrlKey || event.metaKey) && lower === 'c') { if (!state.selectionCoords.length && !state.selectedCell) return; event.preventDefault(); copySelection(); return; }
    if ((event.ctrlKey || event.metaKey) && lower === 'v') { if (!state.clipboard || !state.selectedCell) return; event.preventDefault(); pasteSelection(); return; }

    if (inFormulaInput) return;

    if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
      if (!state.selectedCell) return;
      event.preventDefault();
      moveSelectionWithArrow(key, event.shiftKey);
      return;
    }

    if ((key === 'Delete' || key === 'Backspace')) {
      if (!state.selectedCell && !state.selectionCoords.length) return;
      event.preventDefault();
      clearSelectedEditableCells();
      return;
    }

    if (!event.altKey && !event.ctrlKey && !event.metaKey && state.selectedCell && state.selectionCoords.length === 1 && canEditCoord(state.selectedCell) && isPrintableKey(key)) {
      event.preventDefault();
      ui.formulaInput.readOnly = false;
      ui.formulaInput.value = key;
      ui.formulaInput.focus({ preventScroll: true });
      ui.formulaInput.setSelectionRange(ui.formulaInput.value.length, ui.formulaInput.value.length);
      updateFormulaInsertMode();
      updateInfoForTypedFormula();
    }
  }

  function moveSelectionWithArrow(key, extendSelection) {
    if (!state.selectedCell) return;
    const current = coordToPos(state.selectionCoords.length > 1 ? state.selectionCoords[state.selectionCoords.length - 1] : state.selectedCell);
    if (!current) return;
    const step = { ArrowUp: { r: -1, c: 0 }, ArrowDown: { r: 1, c: 0 }, ArrowLeft: { r: 0, c: -1 }, ArrowRight: { r: 0, c: 1 } }[key];
    let row = current.row + step.r;
    let col = current.col + step.c;
    while (row >= 1 && col >= 1 && col <= 4 && row <= 200) {
      const coord = posToCoord(row, col);
      if (coord && state.cellElements[coord]) {
        if (extendSelection && state.anchorCell) {
          state.selectionCoords = getRangeCoords(state.anchorCell, coord);
          state.selectedCell = state.anchorCell;
          ui.selectedCellRef.textContent = getSelectionLabel();
          ui.formulaInput.value = '';
          ui.formulaInput.readOnly = true;
          state.formulaInsertMode = false;
          setInfo(`Plage ${getSelectionLabel()} sélectionnée.`);
          ensureCoordVisible(coord);
        } else {
          state.anchorCell = coord;
          state.selectedCell = coord;
          state.selectionCoords = [coord];
          loadInputForSelection();
          ensureCoordVisible(coord);
        }
        updateSelectionStyles();
        return;
      }
      row += step.r;
      col += step.c;
    }
  }

  function findNextCoordBelow(coord) {
    const pos = coordToPos(coord);
    if (!pos) return null;
    for (let row = pos.row + 1; row <= 200; row += 1) {
      const next = posToCoord(row, pos.col);
      if (next && state.cellElements[next]) return next;
    }
    return null;
  }

  function ensureCoordVisible(coord) {
    const el = state.cellElements[coord];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const topLimit = (ui.fixedBarHost ? ui.fixedBarHost.getBoundingClientRect().bottom : 0) + 8;
    const bottomLimit = window.innerHeight - 12;
    if (rect.top < topLimit) {
      window.scrollBy({ top: rect.top - topLimit, behavior: 'auto' });
    } else if (rect.bottom > bottomLimit) {
      window.scrollBy({ top: rect.bottom - bottomLimit, behavior: 'auto' });
    }
  }

  function isPrintableKey(key) {
    return key.length === 1;
  }

  function copySelection() {
    const coords = getOrderedSelectionCoords(); if (!coords.length) return; const bounds = getBounds(coords); const data = [];
    for (let row = bounds.minRow; row <= bounds.maxRow; row += 1) {
      const rowItems = [];
      for (let col = bounds.minCol; col <= bounds.maxCol; col += 1) {
        const coord = posToCoord(row, col); rowItems.push(coord && state.cellMeta[coord] ? { coord, raw: getRawCellContent(coord) } : { coord: null, raw: null });
      }
      data.push(rowItems);
    }
    state.clipboard = { width: bounds.maxCol - bounds.minCol + 1, height: bounds.maxRow - bounds.minRow + 1, data };
    setInfo(`Copie de ${getSelectionLabel()} prête. Utilise Ctrl/Cmd + V pour coller.`);
  }

  function pasteSelection() {
    if (!state.clipboard || !state.selectedCell) return; const selection = getOrderedSelectionCoords(); let writes = 0;
    if (state.clipboard.width === 1 && state.clipboard.height === 1 && selection.length > 1) {
      const source = state.clipboard.data[0][0]; selection.forEach((targetCoord) => { if (applyClipboardCell(source, targetCoord)) writes += 1; });
    } else {
      const targetStart = getBounds(selection);
      for (let dy = 0; dy < state.clipboard.height; dy += 1) {
        for (let dx = 0; dx < state.clipboard.width; dx += 1) {
          const targetCoord = posToCoord(targetStart.minRow + dy, targetStart.minCol + dx), source = state.clipboard.data[dy][dx]; if (targetCoord && applyClipboardCell(source, targetCoord)) writes += 1;
        }
      }
    }
    if (!writes) { setInfo('Aucun collage possible sur la sélection courante.'); return; }
    state.formulaInsertMode = false;
    recomputeAll(); updateAllDisplays(); updateAllButtons(); saveState();
    refreshFormulaInputView();
    if (ui.appViewport) ui.appViewport.focus({ preventScroll: true });
    setInfo(`${writes} cellule(s) collée(s).`);
  }

  function applyClipboardCell(source, targetCoord) {
    if (!source || !source.coord || source.raw == null) return false; const targetMeta = state.cellMeta[targetCoord]; if (!targetMeta || !canEditCoord(targetCoord)) return false;
    const sourcePos = coordToPos(source.coord), targetPos = coordToPos(targetCoord); let raw = String(source.raw ?? '').trim(); if (raw.startsWith('=')) raw = shiftFormulaReferences(raw, targetPos.row - sourcePos.row, targetPos.col - sourcePos.col);
    if (targetMeta.kind === 'input') { if (raw.startsWith('=') || (raw && parseStudentNumber(raw) == null)) return false; }
    else if (raw && (!raw.startsWith('=') || !hasCellReference(raw))) return false;
    state.entries[targetCoord] = raw; resetStageStatusFrom(targetCoord); return true;
  }

  function clearSelectedEditableCells() {
    const coords = getOrderedSelectionCoords().filter((coord) => canEditCoord(coord)); if (!coords.length) return;
    coords.forEach((coord) => { state.entries[coord] = ''; resetStageStatusFrom(coord); delete state.validations[coord]; }); recomputeAll(); updateAllDisplays(); updateAllButtons(); saveState(); setInfo(`${coords.length} cellule(s) effacée(s).`);
  }

  function refreshFormulaInputView() {
    if (!state.selectedCell || state.selectionCoords.length !== 1) return;
    ui.selectedCellRef.textContent = state.selectedCell;
    ui.formulaInput.value = getRawCellContent(state.selectedCell);
    ui.formulaInput.readOnly = !canEditCoord(state.selectedCell);
    updateFormulaInsertMode();
  }

  function getRawCellContent(coord) { const meta = state.cellMeta[coord]; if (!meta) return ''; if (meta.kind === 'given') return formatNumber(meta.correct); if (meta.kind === 'label') return meta.display || meta.student || ''; return state.entries[coord] || ''; }
  function shiftFormulaReferences(raw, dRow, dCol) { return raw.replace(/\b([A-D])(\d+)\b/g, (match, colLetter, rowNum) => { const nextCol = colToIndex(colLetter) + dCol, nextRow = Number(rowNum) + dRow; if (nextCol < 1 || nextCol > 4 || nextRow < 1) return match; return `${COLS[nextCol - 1]}${nextRow}`; }); }
  function getOrderedSelectionCoords() { const coords = state.selectionCoords.length ? [...state.selectionCoords] : (state.selectedCell ? [state.selectedCell] : []); return coords.sort((a, b) => { const pa = coordToPos(a), pb = coordToPos(b); return pa.row - pb.row || pa.col - pb.col; }); }
  function getSelectionLabel() { const coords = getOrderedSelectionCoords(); if (!coords.length) return ''; if (coords.length === 1) return coords[0]; return `${coords[0]}:${coords[coords.length - 1]}`; }
  function getRangeCoords(startCoord, endCoord) { const a = coordToPos(startCoord), b = coordToPos(endCoord); if (!a || !b) return []; const coords = []; const minRow = Math.min(a.row, b.row), maxRow = Math.max(a.row, b.row), minCol = Math.min(a.col, b.col), maxCol = Math.max(a.col, b.col); for (let row = minRow; row <= maxRow; row += 1) { for (let col = minCol; col <= maxCol; col += 1) { const coord = posToCoord(row, col); if (coord && state.cellElements[coord]) coords.push(coord); } } return coords; }
  function getBounds(coords) { const positions = coords.map(coordToPos).filter(Boolean); return { minRow: Math.min(...positions.map((p) => p.row)), maxRow: Math.max(...positions.map((p) => p.row)), minCol: Math.min(...positions.map((p) => p.col)), maxCol: Math.max(...positions.map((p) => p.col)) }; }
  function coordToPos(coord) { const m = /^([A-D])(\d+)$/i.exec(coord || ''); return m ? { col: colToIndex(m[1].toUpperCase()), row: Number(m[2]) } : null; }
  function posToCoord(row, col) { return col >= 1 && col <= 4 && row >= 1 ? `${COLS[col - 1]}${row}` : null; }
  function colToIndex(col) { return COLS.indexOf(String(col).toUpperCase()) + 1; }
  function escapeHtml(text) { return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;'); }
})();
