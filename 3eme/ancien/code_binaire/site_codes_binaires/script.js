const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const sleep = ms => new Promise(r => setTimeout(r, ms));

const calcMap = {
  '0':'0000','1':'0001','2':'0010','3':'0011','4':'0100','5':'0101','6':'0110','7':'0111','8':'1000','9':'1001',
  '+':'1010','-':'1011','×':'1100','÷':'1101','=':'1110','C':'1111'
};
const reverseCalcMap = Object.fromEntries(Object.entries(calcMap).map(([k,v])=>[v,k]));
const calcKeys = ['7','8','9','+','4','5','6','-','1','2','3','×','0','÷','=','C'];
const colorMap = {
  '000':'blanc','001':'noir','010':'rouge','011':'vert','100':'bleu','101':'jaune','110':'violet','111':'orange'
};
const colorCss = {
  '000':'#ffffff','001':'#111827','010':'#ef4444','011':'#22c55e','100':'#3b82f6','101':'#facc15','110':'#a855f7','111':'#fb923c'
};
const asciiPairs = [
  ['A',65],['B',66],['C',67],['D',68],['E',69],['I',73],['L',76],['N',78],['O',79],['P',80],['R',82],['S',83],['T',84],['X',88]
];

function setupNavigation(){
  $$('.navBtn').forEach(btn=>btn.addEventListener('click', ()=>{
    const target = btn.dataset.target;
    $$('.navBtn').forEach(b=>b.classList.toggle('active', b===btn));
    $$('.activity').forEach(sec=>sec.classList.toggle('active', sec.id===target));
    window.scrollTo({top:0, behavior:'smooth'});
  }));
}

function makeCalcTable(){
  const table = $('#calcTable');
  if(!table) return;
  let html = '<tr><th>Code binaire</th><th>Touche</th><th>Code binaire</th><th>Touche</th></tr>';
  const entries = Object.entries(calcMap);
  for(let i=0;i<entries.length;i+=2){
    const a = entries[i], b = entries[i+1];
    html += `<tr><td class="mono">${a[1]}</td><td>${a[0]}</td><td class="mono">${b?b[1]:''}</td><td>${b?b[0]:''}</td></tr>`;
  }
  table.innerHTML = html;
}

function createKeypad(containerSel, handler){
  const root = $(containerSel);
  if(!root) return;
  root.innerHTML = '';
  calcKeys.forEach(k=>{
    const btn = document.createElement('button');
    btn.className = 'calcKey';
    if(['+','-','×','÷','='].includes(k)) btn.classList.add('operator');
    if(k==='C') btn.classList.add('func');
    if(k==='+') btn.classList.add('plusKey');
    btn.dataset.key = k;
    btn.textContent = k;
    btn.addEventListener('click', ()=>handler(k, btn));
    root.appendChild(btn);
  });
}

// ---------- Binary basics ----------
let signalState = [0,0,0,0];
function buildSignalBuilder(){
  const root = $('#signalBuilder');
  if(!root) return;
  root.innerHTML = signalState.map((bit,i)=>`
    <div class="signalSlot" data-i="${i}">
      <button class="switchBtn ${bit?'closed':'open'}" data-i="${i}">${bit?'Fermé':'Ouvert'}</button>
      <div class="signalColumn">
        <div class="level high ${bit?'active':''}">1</div>
        <div class="level low ${!bit?'active':''}">0</div>
      </div>
      <div class="slotBit mono">${bit}</div>
    </div>`).join('');
  $$('.switchBtn', root).forEach(btn=>btn.addEventListener('click', ()=>{
    const i=+btn.dataset.i; signalState[i]=signalState[i]?0:1; buildSignalBuilder(); updateSignalOutputs();
  }));
  updateSignalOutputs();
}
function updateSignalOutputs(){
  const code = signalState.join('');
  $('#signalBinary').textContent = code;
  $('#signalReading').textContent = signalState.map(b=>b?'niveau haut':'niveau bas').join(', ');
}

let counterState = [0,0,0,0];
const weights = [8,4,2,1];
function buildCounterBits(){
  const root = $('#counterBits');
  if(!root) return;
  root.innerHTML = weights.map((w,i)=>`
    <button class="bitCard ${counterState[i]?'on':'off'}" data-i="${i}">
      <span class="bitWeight">${w}</span>
      <span class="bitState mono">${counterState[i]}</span>
    </button>`).join('');
  $$('.bitCard',root).forEach(btn=>btn.addEventListener('click', ()=>{
    const i=+btn.dataset.i; counterState[i]=counterState[i]?0:1; buildCounterBits(); updateCounterOutputs();
  }));
  updateCounterOutputs();
}
function updateCounterOutputs(){
  const code = counterState.join('');
  const active = weights.filter((_,i)=>counterState[i]);
  const value = active.reduce((a,b)=>a+b,0);
  $('#counterBinary').textContent = code;
  $('#counterCalc').textContent = active.length ? active.join(' + ') : '0';
  $('#counterValue').textContent = String(value);
}

const readSignalTarget = [1,0,1,0];
function buildReadSignal(){
  const root = $('#readSignal');
  if(!root) return;
  root.innerHTML = readSignalTarget.map(bit=>`
    <div class="viewerSlot">
      <div class="signalColumn static">
        <div class="level high ${bit?'active':''}"></div>
        <div class="level low ${!bit?'active':''}"></div>
      </div>
    </div>`).join('');
}

// ---------- Guided calculator lesson ----------
let guideSequenceIndex = 0;
let guideBusy = false;
let courseMemory = [];
let courseScreen = '0';
let courseExpr = '';
let courseResult = '';
const guideTargets = ['3','+','5','='];
const guideInstructions = ['Tape sur <span class="mono">3</span>.','Tape sur <span class="mono">+</span>.','Tape sur <span class="mono">5</span>.','Tape sur <span class="mono">=</span>.','Séquence terminée : le résultat est <span class="mono">8</span>.'];

function setGuideInstruction(){
  const badge = $('#calcGuideBadge');
  const instr = $('#calcGuideInstruction');
  if(guideSequenceIndex < guideTargets.length){
    badge.textContent = `Étape ${guideSequenceIndex+1} sur 4`;
    instr.innerHTML = guideInstructions[guideSequenceIndex];
  } else {
    badge.textContent = 'Terminé';
    instr.innerHTML = guideInstructions[4];
  }
}
function resetGuideHighlights(){
  ['chipKeyboard','chipCoding','chipMemory','chipCpu','chipDisplay'].forEach(id=>$('#'+id)?.classList.remove('activeChip'));
  $$('#calcCoursePad .calcKey').forEach(k=>k.classList.remove('active'));
}
function updateGuideStatus({key='-', binary='-', memory='-', expr='-', screen=null, title='En attente', text='La calculatrice attend la première touche.', chip=null}){
  resetGuideHighlights();
  if(chip) $('#'+chip)?.classList.add('activeChip');
  if(key && key!=='-') $(`#calcCoursePad .calcKey[data-key="${CSS.escape(key)}"]`)?.classList.add('active');
  $('#calcCurrentKey').textContent = key;
  $('#calcCurrentBinary').textContent = binary;
  $('#calcCurrentMemory').textContent = memory;
  $('#calcCurrentExpr').textContent = expr;
  $('#calcGuideStepTitle').textContent = title;
  $('#calcGuideText').textContent = text;
  if(screen !== null) $('#calcCourseScreen').textContent = screen;
}
function setupGuidedCalculator(){
  createKeypad('#calcCoursePad', handleGuideKey);
  setGuideInstruction();
  updateGuideStatus({screen:'0'});
}
async function handleGuideKey(key){
  if(guideBusy || guideSequenceIndex >= guideTargets.length) return;
  if(key !== guideTargets[guideSequenceIndex]) return;
  guideBusy = true;
  const target = key;
  const code = calcMap[target];
  const beforeScreen = courseScreen;
  if(target === '3' || target === '+' || target === '5'){
    const nextScreen = (beforeScreen === '0' ? '' : beforeScreen) + target;
    const nextExpr = courseExpr ? courseExpr + ' ' + target : target;
    updateGuideStatus({key:target,binary:'-',memory:courseMemory.join(' | ') || '-',expr:courseExpr || '-',screen:beforeScreen,title:'Touche détectée',text:`Le clavier détecte la touche ${target}.`,chip:'chipKeyboard'});
    await sleep(1800);
    updateGuideStatus({key:target,binary:code,memory:courseMemory.join(' | ') || '-',expr:courseExpr || '-',screen:beforeScreen,title:'Codage binaire',text:`La touche ${target} est transformée en code binaire ${code}.`,chip:'chipCoding'});
    await sleep(1900);
    courseMemory.push(code);
    courseExpr = nextExpr;
    updateGuideStatus({key:target,binary:code,memory:courseMemory.join(' | '),expr:courseExpr,screen:beforeScreen,title:'Stockage en mémoire',text:'Le code est ajouté à la mémoire dans l’ordre de saisie.',chip:'chipMemory'});
    await sleep(1900);
    courseScreen = nextScreen;
    updateGuideStatus({key:target,binary:code,memory:courseMemory.join(' | '),expr:courseExpr,screen:courseScreen,title:'Affichage',text:`L’écran est mis à jour et affiche ${courseScreen}.`,chip:'chipDisplay'});
    await sleep(2200);
  } else if(target === '=') {
    updateGuideStatus({key:'=',binary:'-',memory:courseMemory.join(' | '),expr:courseExpr,screen:beforeScreen,title:'Touche détectée',text:'Le clavier détecte la touche =.',chip:'chipKeyboard'});
    await sleep(1800);
    updateGuideStatus({key:'=',binary:code,memory:courseMemory.join(' | '),expr:courseExpr,screen:beforeScreen,title:'Codage binaire',text:'La touche = reçoit elle aussi un code binaire.',chip:'chipCoding'});
    await sleep(1800);
    courseMemory.push(code);
    updateGuideStatus({key:'=',binary:code,memory:courseMemory.join(' | '),expr:courseExpr,screen:beforeScreen,title:'Mémoire complète',text:'La mémoire contient maintenant les nombres, le symbole + et la demande de calcul.',chip:'chipMemory'});
    await sleep(2200);
    updateGuideStatus({key:'=',binary:code,memory:courseMemory.join(' | '),expr:'3 + 5',screen:beforeScreen,title:'Traitement du calcul',text:'Le processeur lit 3 + 5 et effectue le calcul.',chip:'chipCpu'});
    await sleep(2200);
    courseResult = '8';
    courseExpr = '3 + 5 = 8';
    updateGuideStatus({key:'=',binary:'1000',memory:courseMemory.join(' | '),expr:courseExpr,screen:courseResult,title:'Affichage du résultat',text:'Le circuit d’affichage prépare le résultat et l’écran LCD montre 8.',chip:'chipDisplay'});
    await sleep(2400);
  }
  guideSequenceIndex++;
  setGuideInstruction();
  guideBusy = false;
}

// ---------- Live calculator ----------
let liveTokens = [];
function setupLiveCalc(){
  createKeypad('#calcLivePad', onLiveKey);
  $('#calcClearBtn')?.addEventListener('click', ()=>{ liveTokens=[]; updateLiveCalc(); });
  updateLiveCalc();
}
function onLiveKey(key){
  if(key==='C'){ liveTokens=[]; updateLiveCalc(); return; }
  liveTokens.push(key);
  updateLiveCalc();
}
function decodeTokens(tokens){
  return tokens.join(' ');
}
function evalTokens(tokens){
  if(!tokens.includes('=')) return '';
  const expr = tokens.filter(t=>t!=='=').join(' ');
  const simple = expr.replace('×','*').replace('÷','/');
  try{ const val = Function(`return (${simple})`)(); return Number.isFinite(val)?String(val):''; }catch{ return ''; }
}
function updateLiveCalc(){
  const expr = liveTokens.join('');
  $('#calcLiveScreen').textContent = expr || '0';
  $('#calcLiveExpr').textContent = liveTokens.join(' ') || '-';
  $('#calcLiveBinary').textContent = liveTokens.map(t=>calcMap[t]||'?').join(' ') || '-';
  $('#calcLiveResult').textContent = evalTokens(liveTokens) || '-';
}

// ---------- Generic helpers for grids ----------
function createGrid(rootSel, size, interactive=false, colorMode=false){
  const root = $(rootSel); if(!root) return [];
  root.innerHTML='';
  const state = Array.from({length:size}, ()=>Array.from({length:size}, ()=> colorMode?'000':0));
  for(let r=0;r<size;r++){
    for(let c=0;c<size;c++){
      const cell = document.createElement('button');
      cell.className = 'pixel';
      if(colorMode) cell.style.background = colorCss['000'];
      cell.dataset.r = r; cell.dataset.c = c;
      if(interactive){
        cell.addEventListener('click', ()=>{
          if(colorMode){
            const codes = Object.keys(colorMap); const idx = codes.indexOf(state[r][c]);
            state[r][c] = codes[(idx+1)%codes.length]; cell.style.background = colorCss[state[r][c]];
          }else{
            state[r][c] = state[r][c]?0:1; cell.classList.toggle('on', !!state[r][c]);
          }
          root.dispatchEvent(new CustomEvent('gridchange', {detail: state}));
        });
      } else cell.disabled = true;
      root.appendChild(cell);
    }
  }
  return state;
}
function setGridState(rootSel, state, colorMode=false){
  const root = $(rootSel); if(!root) return;
  const cells = $$('.pixel', root);
  let i=0;
  for(let r=0;r<state.length;r++){
    for(let c=0;c<state[r].length;c++){
      const cell = cells[i++];
      if(colorMode) cell.style.background = colorCss[state[r][c]];
      else cell.classList.toggle('on', !!state[r][c]);
    }
  }
}
function stateToBWCode(state){ return state.map(row=>row.join('')).join('\n'); }
function stateToColorCode(state){ return state.map(row=>row.join(' ')).join('\n'); }

// ---------- BW bitmap ----------
const bwDemoCode = ['00011000','00111100','01111110','11011011','11111111','00100100','01000010','10000001'];
let bwEditState, bwExState;
const bwTargetState = [[0,1,1,1,0],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[0,1,1,1,0]];
function setupBW(){
  bwEditState = createGrid('#bwEditGrid',8,true,false);
  $('#bwEditGrid')?.addEventListener('gridchange', e=>$('#bwGeneratedCode').textContent = stateToBWCode(e.detail));
  $('#bwGeneratedCode').textContent = stateToBWCode(bwEditState);
  $('#bwClearBtn')?.addEventListener('click', ()=>{ bwEditState = createGrid('#bwEditGrid',8,true,false); setupBW(); });

  bwExState = createGrid('#bwExGrid',5,true,false);
  createGrid('#bwTargetGrid',5,false,false);
  setGridState('#bwTargetGrid', bwTargetState);
  $('#bwTargetGrid').style.pointerEvents='none';
  $('#bwDemoBtn')?.addEventListener('click', runBWDemo);
  runBWDemo();
}
async function runBWDemo(){
  const state = createGrid('#bwDemoGrid',8,false,false);
  const grid = $('#bwDemoGrid');
  const cells = $$('.pixel', grid);
  let idx=0;
  for(let r=0;r<8;r++){
    $('#bwLine').textContent = bwDemoCode[r];
    for(let c=0;c<8;c++){
      const bit = Number(bwDemoCode[r][c]);
      $('#bwBit').textContent = String(bit);
      $('#bwMeaning').textContent = bit ? 'pixel noir' : 'pixel blanc';
      cells[idx].classList.toggle('on', !!bit);
      idx++;
      await sleep(120);
    }
    await sleep(200);
  }
}

// ---------- Color bitmap ----------
const colorDemoState = [
  ['000','000','010','000','000'],
  ['000','010','010','010','000'],
  ['010','010','010','010','010'],
  ['000','011','011','011','000'],
  ['000','011','000','011','000']
];
let colorEditState, colorExState;
const colorExTarget = [
  ['000','100','100','100','000'],
  ['100','000','101','000','100'],
  ['100','101','101','101','100'],
  ['100','000','101','000','100'],
  ['000','100','100','100','000']
];
function makeColorTable(){
  const table = $('#colorTable'); if(!table) return;
  let html = '<tr><th>Code</th><th>Couleur</th></tr>';
  Object.entries(colorMap).forEach(([code,name])=>html += `<tr><td class="mono">${code}</td><td><span class="swatch" style="background:${colorCss[code]}"></span>${name}</td></tr>`);
  table.innerHTML = html;
}
function setupColor(){
  colorEditState = createGrid('#colorEditGrid',5,true,true);
  $('#colorEditGrid')?.addEventListener('gridchange', e=>$('#colorGeneratedCode').textContent = stateToColorCode(e.detail));
  $('#colorGeneratedCode').textContent = stateToColorCode(colorEditState);
  $('#colorClearBtn')?.addEventListener('click', ()=>{ setupColor(); });
  colorExState = createGrid('#colorExGrid',5,true,true);
  $('#colorDemoBtn')?.addEventListener('click', runColorDemo);
  runColorDemo();
}
async function runColorDemo(){
  createGrid('#colorDemoGrid',5,false,true);
  const root = $('#colorDemoGrid'); const cells = $$('.pixel', root); let idx=0;
  for(let r=0;r<5;r++){
    for(let c=0;c<5;c++){
      const code = colorDemoState[r][c];
      $('#colorCode').textContent = code;
      $('#colorMeaning').textContent = colorMap[code];
      cells[idx].style.background = colorCss[code]; idx++;
      await sleep(180);
    }
  }
}

// ---------- ASCII ----------
function makeAsciiTable(){
  const table = $('#asciiTable'); if(!table) return;
  let html = '<tr><th>Caractère</th><th>Décimal</th><th>Binaire</th></tr>';
  asciiPairs.forEach(([ch,n])=>html += `<tr><td>${ch}</td><td>${n}</td><td class="mono">${n.toString(2).padStart(8,'0')}</td></tr>`);
  table.innerHTML = html;
}
function setupAscii(){
  $('#asciiDemoBtn')?.addEventListener('click', runAsciiDemo);
  $('#asciiInput')?.addEventListener('input', updateAsciiLive);
  runAsciiDemo(); updateAsciiLive();
}
async function runAsciiDemo(){
  const word='ROBOT';
  const bins = word.split('').map(ch=>ch.charCodeAt(0).toString(2).padStart(8,'0'));
  $('#asciiBinaryChips').innerHTML=''; $('#asciiDecimalChips').innerHTML=''; $('#asciiLetterChips').innerHTML=''; $('#asciiWordResult').textContent='';
  for(let i=0;i<word.length;i++){
    $('#asciiBinaryChips').innerHTML += `<span class="chipBadge mono">${bins[i]}</span>`; await sleep(250);
  }
  for(let i=0;i<word.length;i++){
    $('#asciiDecimalChips').innerHTML += `<span class="chipBadge">${word.charCodeAt(i)}</span>`; await sleep(250);
  }
  for(let i=0;i<word.length;i++){
    $('#asciiLetterChips').innerHTML += `<span class="chipBadge">${word[i]}</span>`; await sleep(250);
  }
  $('#asciiWordResult').textContent = word;
}
function updateAsciiLive(){
  const val = ($('#asciiInput')?.value || '').toUpperCase().replace(/[^A-Z ]/g,'');
  const dec = []; const bin = [];
  for(const ch of val){ dec.push(ch.charCodeAt(0)); bin.push(ch.charCodeAt(0).toString(2).padStart(8,'0')); }
  $('#asciiLiveDecimal').textContent = dec.join(' ') || '-';
  $('#asciiLiveBinary').textContent = bin.join(' ') || '-';
  $('#asciiInput').value = val;
}

// ---------- Joystick ----------
function valueTo3Bits(v){ return Math.max(0,Math.min(7,v)).toString(2).padStart(3,'0'); }
function posText(x,y){
  const hx = x<3 ? 'gauche' : x>4 ? 'droite' : '';
  const hy = y<3 ? 'haut' : y>4 ? 'bas' : '';
  return (hy+' '+hx).trim() || 'centre';
}
function setJoyKnob(padSel, knobSel, x, y){
  const pad = $(padSel), knob = $(knobSel); if(!pad||!knob) return;
  const size = pad.clientWidth; const max = size-20; // knob 20?
  knob.style.left = `${(x/7)*max}px`; knob.style.top = `${(y/7)*max}px`;
}
function setupJoystickDrag(padSel, knobSel, callback){
  const pad = $(padSel), knob = $(knobSel); if(!pad||!knob) return;
  const update = (clientX,clientY) => {
    const rect = pad.getBoundingClientRect();
    let x = Math.round(((clientX-rect.left)/rect.width)*7); let y = Math.round(((clientY-rect.top)/rect.height)*7);
    x = Math.max(0,Math.min(7,x)); y = Math.max(0,Math.min(7,y));
    setJoyKnob(padSel,knobSel,x,y); callback(x,y);
  };
  let dragging=false;
  const start=e=>{ dragging=true; const p=e.touches?e.touches[0]:e; update(p.clientX,p.clientY); e.preventDefault(); };
  const move=e=>{ if(!dragging) return; const p=e.touches?e.touches[0]:e; update(p.clientX,p.clientY); };
  const end=()=> dragging=false;
  pad.addEventListener('mousedown',start); window.addEventListener('mousemove',move); window.addEventListener('mouseup',end);
  pad.addEventListener('touchstart',start,{passive:false}); window.addEventListener('touchmove',move,{passive:false}); window.addEventListener('touchend',end);
}
function setupJoystick(){
  $('#joyDemoBtn')?.addEventListener('click', runJoyDemo);
  runJoyDemo();
  setJoyKnob('#joyLivePad','#joyLiveKnob',4,4); updateJoyLive(4,4);
  setupJoystickDrag('#joyLivePad','#joyLiveKnob', updateJoyLive);
  setJoyKnob('#joyExPad','#joyExKnob',4,4); updateJoyEx(4,4);
  setupJoystickDrag('#joyExPad','#joyExKnob', updateJoyEx);
}
async function runJoyDemo(){
  const seq = [[4,4],[7,4],[1,1],[4,7],[4,4]];
  for(const [x,y] of seq){
    setJoyKnob('#joyDemoPad','#joyDemoKnob',x,y);
    $('#joyDemoX').textContent = valueTo3Bits(x); $('#joyDemoY').textContent = valueTo3Bits(y); $('#joyDemoText').textContent = posText(x,y);
    await sleep(900);
  }
}
function updateJoyLive(x,y){
  $('#joyLiveXVal').textContent = x; $('#joyLiveXBin').textContent = valueTo3Bits(x);
  $('#joyLiveYVal').textContent = y; $('#joyLiveYBin').textContent = valueTo3Bits(y);
  $('#joyLiveText').textContent = posText(x,y);
  $('#joyLivePad').dataset.x=x; $('#joyLivePad').dataset.y=y;
}
function updateJoyEx(x,y){
  $('#joyExX').textContent = valueTo3Bits(x); $('#joyExY').textContent = valueTo3Bits(y);
  $('#joyExPad').dataset.x=x; $('#joyExPad').dataset.y=y;
}

// ---------- Checks ----------
function normalizeSpace(s){ return (s||'').replace(/\s+/g,' ').trim().toUpperCase(); }
function setupChecks(){
  $$('.checkBtn').forEach(btn=>btn.addEventListener('click', ()=>check(btn.dataset.check)));
}
function setFb(id, ok, msg){ const el = $('#'+id); if(el){ el.textContent = msg; el.className = `feedback ${ok?'ok':'bad'}`; } }
function check(which){
  switch(which){
    case 'signalRead': {
      const ok = ($('#readSignalInput').value||'').replace(/\s+/g,'') === '1010';
      setFb('signalReadFb', ok, ok?'Bravo, le signal correspond à 1010.':'Ce signal correspond à 1010.'); break;
    }
    case 'calc1': {
      const ok1 = normalizeSpace($('#calcEx1Op').value).replace(/X/g,'×') === '7 - 2 =';
      const ok2 = ($('#calcEx1Res').value||'').trim() === '5';
      setFb('calcFb1', ok1&&ok2, ok1&&ok2?'Correct !':'Réponse attendue : 7 - 2 = puis 5.'); break;
    }
    case 'calc2': {
      const op = normalizeSpace($('#calcEx2Op').value).replace(/X/g,'×');
      const ok1 = op === '4 × 3 ='; const ok2 = ($('#calcEx2Res').value||'').trim()==='12';
      setFb('calcFb2', ok1&&ok2, ok1&&ok2?'Correct !':'Réponse attendue : 4 × 3 = puis 12.'); break;
    }
    case 'calc3': {
      const code = ($('#calcEx3Code').value||'').replace(/\s+/g,' ').trim();
      const ok = code === '1000 1010 0001 1110';
      setFb('calcFb3', ok, ok?'Correct !':'Code attendu : 1000 1010 0001 1110'); break;
    }
    case 'bw1': {
      const target = '01110\n10001\n10101\n10001\n01110';
      const state = gridStateFromDOM('#bwExGrid',5,false);
      setFb('bwFb1', stateToBWCode(state)===target, stateToBWCode(state)===target?'Bravo !':'Le motif attendu correspond au code donné.'); break;
    }
    case 'bw2': {
      const val = ($('#bwEx2Code').value||'').trim().replace(/\r/g,'');
      const ok = val === '01110\n10001\n10101\n10001\n01110';
      setFb('bwFb2', ok, ok?'Correct !':'Code attendu : 01110 / 10001 / 10101 / 10001 / 01110'); break;
    }
    case 'color1': {
      const ok = stateToColorCode(gridStateFromDOM('#colorExGrid',5,true)) === stateToColorCode(colorExTarget);
      setFb('colorFb1', ok, ok?'Correct !':'Reproduis les couleurs du code donné.'); break;
    }
    case 'color2': {
      const ok = ($('#colorEx2').value||'').trim()==='8';
      setFb('colorFb2', ok, ok?'Exact, 3 bits permettent 8 codes.':'Avec 3 bits, on peut coder 8 couleurs.'); break;
    }
    case 'ascii1': setFb('asciiFb1', normalizeSpace($('#asciiEx1').value)==='CODE', normalizeSpace($('#asciiEx1').value)==='CODE'?'Correct !':'Le mot attendu est CODE.'); break;
    case 'ascii2': setFb('asciiFb2', normalizeSpace($('#asciiEx2').value)==='BINAIRE', normalizeSpace($('#asciiEx2').value)==='BINAIRE'?'Correct !':'Le mot attendu est BINAIRE.'); break;
    case 'ascii3': {
      const expected = '01010000 01001001 01011000 01000101 01001100';
      const ok = ($('#asciiEx3').value||'').replace(/\s+/g,' ').trim()===expected;
      setFb('asciiFb3', ok, ok?'Correct !':`Code attendu : ${expected}`); break;
    }
    case 'joy1': {
      const v=normalizeSpace($('#joyEx1').value); const ok=v.includes('DROITE');
      setFb('joyFb1', ok, ok?'Correct !':'Avec X=111 et Y=100, le stick est vers la droite.'); break;
    }
    case 'joy2': {
      const v=normalizeSpace($('#joyEx2').value); const ok=v.includes('HAUT')&&v.includes('GAUCHE');
      setFb('joyFb2', ok, ok?'Correct !':'Avec X=001 et Y=001, le stick est en haut à gauche.'); break;
    }
    case 'joy3': {
      const pad = $('#joyExPad'); const ok = valueTo3Bits(+pad.dataset.x)==='110' && valueTo3Bits(+pad.dataset.y)==='010';
      setFb('joyFb3', ok, ok?'Bravo !':'Place le stick pour obtenir X = 110 et Y = 010.'); break;
    }
  }
}
function gridStateFromDOM(rootSel,size,colorMode){
  const root=$(rootSel); const cells=$$('.pixel',root); const state=[]; let i=0;
  for(let r=0;r<size;r++){
    const row=[];
    for(let c=0;c<size;c++){
      const cell=cells[i++];
      if(colorMode){
        const color = rgbToHex(getComputedStyle(cell).backgroundColor);
        const code = Object.keys(colorCss).find(k=>colorCss[k].toLowerCase()===color.toLowerCase()) || '000';
        row.push(code);
      } else row.push(cell.classList.contains('on')?1:0);
    }
    state.push(row);
  }
  return state;
}
function rgbToHex(rgb){
  if(rgb.startsWith('#')) return rgb;
  const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/); if(!m) return '#ffffff';
  return '#' + [m[1],m[2],m[3]].map(x=>Number(x).toString(16).padStart(2,'0')).join('');
}

function init(){
  setupNavigation();
  makeCalcTable();
  buildSignalBuilder();
  buildCounterBits();
  buildReadSignal();
  setupGuidedCalculator();
  setupLiveCalc();
  setupBW();
  makeColorTable();
  setupColor();
  makeAsciiTable();
  setupAscii();
  setupJoystick();
  setupChecks();
}

document.addEventListener('DOMContentLoaded', init);
