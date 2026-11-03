'use strict';
function safeURL(value, base) {
  if (/^(?:javascript|data|vbscript):/i.test(value)) return null;
  try { const u = new URL(value, base); return ['https:', 'http:', 'file:'].includes(u.protocol) ? u.href : null; } catch { return null; }
}
function videoID(value) {
  try {const u=new URL(value);let id=null;const h=u.hostname.toLowerCase();if(h==='youtu.be')id=u.pathname.split('/')[1];else if(['youtube.com','www.youtube.com','m.youtube.com','youtube-nocookie.com','www.youtube-nocookie.com'].includes(h)){id=u.searchParams.get('v');if(!id&&/^\/(shorts|embed|live)\//.test(u.pathname))id=u.pathname.split('/')[2];}return /^[\w-]{11}$/.test(id||'')?id:null;}catch{return null;}
}
function parseContent(text,base) {
 const sequences=[],errors=[];let seq=null,act=null;
 text.replace(/^\uFEFF/,'').split(/\r?\n/).forEach((raw,index)=>{const line=raw.trim();if(!line||line.startsWith('//'))return;
 const bad=message=>errors.push(`Ligne ${index+1} : ${message}`);
 if(line.startsWith('## ')){if(!seq)return bad('ajoute une séquence (# Titre) avant cette activité.');act={title:line.slice(3).trim(),description:[],links:[]};seq.activities.push(act);return;}
 if(line.startsWith('# ')){seq={title:line.slice(2).trim(),description:[],activities:[]};sequences.push(seq);act=null;return;}
 if(line.startsWith('#'))return bad('utilise # suivi d’un espace pour une séquence, ou ## suivi d’un espace pour une activité.');
 if(line.includes('|')){if(!act)return bad('place ce lien sous une activité (## Titre).');const parts=line.split('|').map(s=>s.trim());if(parts.length!==3||parts.some(s=>!s))return bad('format attendu : PDF | Nom du bouton | adresse');const[type,label,path]=parts;const kind=type.toUpperCase();if(!['PDF','WEB','VIDEO','LIEN'].includes(kind))return bad('type inconnu : utilise PDF, WEB, VIDEO ou LIEN.');const url=safeURL(path,base);if(!url)return bad('adresse non autorisée ou invalide.');const id=kind==='VIDEO'?videoID(url):null;if(kind==='VIDEO'&&!id)return bad('utilise le lien YouTube d’une vidéo (watch, youtu.be, shorts ou live).');act.links.push({type:kind,label,url,id});return;}
 if(!seq)return bad('place le texte sous une séquence.');(act||seq).description.push(line);
 });return {sequences,errors};
}
if(typeof module!=='undefined')module.exports={parseContent,videoID,safeURL};
if(typeof document!=='undefined'){
const $=id=>document.getElementById(id);let data={sequences:[],errors:[]};let treeReady=false;
const palettes=[['#356bd0','#eaf1ff'],['#098478','#def6ef'],['#8150bb','#f0e9fb'],['#bd6a22','#fff0dc'],['#c24870','#fce8ef'],['#257d9e','#e0f3fa']];
const el=(tag,text,cls)=>{const e=document.createElement(tag);if(text)e.textContent=text;if(cls)e.className=cls;return e;};
function color(e,i){const p=palettes[i%palettes.length];e.style.setProperty('--accent',p[0]);e.style.setProperty('--tint',p[1]);}
function icon(type){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 200 165');svg.setAttribute('aria-hidden','true');svg.innerHTML=type==='PDF'?`<ellipse cx="101" cy="151" rx="58" ry="7" fill="#bc263b" opacity=".12"/><path d="M58 13h57l30 30v95a9 9 0 0 1-9 9H58a9 9 0 0 1-9-9V22a9 9 0 0 1 9-9" fill="#fff" stroke="#efc5cd" stroke-width="2"/><path d="M115 13v23a7 7 0 0 0 7 7h23" fill="#ffd7df"/><path d="M69 62h55M69 72h42" stroke="#d9e0eb" stroke-width="5" stroke-linecap="round"/><rect x="33" y="86" width="109" height="43" rx="9" fill="#cf304b"/><path d="M33 119v10l16 10v-10" fill="#9d1831"/><text x="88" y="116" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-size="28" font-weight="800" letter-spacing="2">PDF</text>`:`<ellipse cx="100" cy="149" rx="73" ry="7" fill="#165d79" opacity=".13"/><path d="M83 124h34l6 18H77z" fill="#718baa"/><rect x="65" y="139" width="70" height="7" rx="3.5" fill="#a1b4c9"/><rect x="17" y="17" width="166" height="110" rx="12" fill="#233d60"/><rect x="24" y="24" width="152" height="89" rx="6" fill="#fff"/><path d="M30 24h140q6 0 6 6v12H24V30q0-6 6-6" fill="#dce8f7"/><circle cx="33" cy="33" r="3" fill="#ed6b81"/><circle cx="43" cy="33" r="3" fill="#f7bd57"/><circle cx="53" cy="33" r="3" fill="#49bd9f"/><rect x="67" y="29" width="89" height="8" rx="4" fill="#fff"/><rect x="34" y="51" width="58" height="51" rx="5" fill="#d8f2ee"/><path d="M42 89l14-15 10 9 10-21 9 27" fill="none" stroke="#299b8e" stroke-width="4" stroke-linejoin="round"/><rect x="104" y="53" width="56" height="7" rx="3.5" fill="#3b669b"/><rect x="104" y="67" width="48" height="4" rx="2" fill="#c7d6e8"/><rect x="104" y="77" width="54" height="4" rx="2" fill="#c7d6e8"/><rect x="104" y="90" width="35" height="12" rx="6" fill="#5383df"/><path d="M148 90l7 40 8-12 13-3z" fill="#ffcb67" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>`;return svg;}
function closeVideo(){if($('video').open)$('video').close();$('player').replaceChildren();}
$('close-video').onclick=closeVideo;$('video').addEventListener('close',()=> $('player').replaceChildren());$('video').addEventListener('click',e=>{if(e.target===$('video')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeVideo();}});
function play(link){$('video-title').textContent=link.label;$('youtube-link').href=link.url;const f=el('iframe');f.title=link.label;f.src=`https://www.youtube-nocookie.com/embed/${link.id}?rel=0`;f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';f.allowFullscreen=true;f.referrerPolicy='strict-origin-when-cross-origin';$('player').replaceChildren(f);$('video').showModal();}
function headingParts(title,type,number){
 const re=type==='SEQ'?/^séquence\s*(\d+)\s*(?:[—–:.-]\s*)?(.*)$/i:/^activité\s*(\d+)\s*(?:[—–:.-]\s*)?(.*)$/i;
 const m=title.match(re);
 if(m)return {label:`${type==='SEQ'?'Séquence':'Activité'} ${m[1]}`,title:m[2].trim()};
 if(type==='ACT'&&/^(synthèses?|corrections?|évaluations?|ressources|documents|bilan|pour aller plus loin)\b/i.test(title))return {label:title,title:''};
 return {label:`${type==='SEQ'?'Séquence':'Activité'} ${number}`,title};
}
function card({title,href,index=0,type,number,meta='',link}){
 const video=type==='VIDEO',group=type==='SEQ'||type==='ACT';const c=el(video?'button':'a',null,'card '+(group?'group-card':'resource-card'));color(c,index);
 if(video){c.type='button';c.onclick=()=>play(link);}else{c.href=href;if(link){c.target='_blank';c.rel='noopener noreferrer';}}
 const visual=el('div',null,'visual');let displayTitle=title;
 if(group){const parts=headingParts(title,type,number);visual.append(el('span',parts.label,'group-label'));displayTitle=parts.title;}
 else if(video){const img=el('img',null,'video-thumb');img.alt='';img.loading='lazy';img.src=`https://i.ytimg.com/vi/${link.id}/hqdefault.jpg`;img.onerror=()=>img.remove();visual.append(img,el('span','▶','play-mark'));}
 else {visual.append(icon(type==='LIEN'?'WEB':type));}
 const body=el('div',null,'card-body');if(displayTitle)body.append(el('h2',displayTitle));
 if(type==='ACT')body.append(el('div',meta,'resource-count'));
 c.append(visual,body);return c;
}
function buildTree(){const tree=$('tree');tree.replaceChildren();data.sequences.forEach((s,i)=>{
 const d=el('section',null,'tree-seq');color(d,i);d.dataset.sequence=i;
 const row=el('div',null,'tree-row'),toggle=el('button','›','tree-toggle'),name=el('a',s.title,'tree-name'),children=el('div',null,'tree-children');
 children.id=`tree-children-${i}`;children.hidden=true;toggle.type='button';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls',children.id);toggle.setAttribute('aria-label',`Déplier ou replier ${s.title}`);
 toggle.onclick=()=>{children.hidden=!children.hidden;toggle.setAttribute('aria-expanded',String(!children.hidden));};name.href=`#sequence-${i+1}`;
 name.onclick=()=>{children.hidden=false;toggle.setAttribute('aria-expanded','true');};row.append(toggle,name);d.append(row,children);
 s.activities.forEach((a,j)=>{const link=el('a',a.title);link.href=`#sequence-${i+1}-activite-${j+1}`;children.append(link);});tree.append(d);
 });treeReady=true;}
function crumb(text,href){const e=el(href===null?'span':'a',text);if(href!==null)e.href=href;$('breadcrumb').append(e);}
function render(focus=false){closeVideo();if(!treeReady)buildTree();const m=location.hash.match(/^#sequence-(\d+)(?:-activite-(\d+))?$/);const si=m?Number(m[1])-1:-1,seq=data.sequences[si],ai=m&&m[2]?Number(m[2])-1:-1,act=seq?.activities[ai];$('content').replaceChildren();$('breadcrumb').replaceChildren();$('content').className=act?'grid resources':'grid';crumb('Accueil',seq?'#':null);if(seq){crumb('›',null);crumb(seq.title,act?`#sequence-${si+1}`:null);}if(act){crumb('›',null);crumb(act.title,null);}
$('title').textContent=act?.title||seq?.title||'Mes séquences';const description=(act||seq)?.description.join('\n')||'';$('description').textContent=description;$('description').hidden=!description;
$('tree').querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')===location.hash)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});if(seq){const d=$('tree').querySelector(`[data-sequence="${si}"]`);if(d){d.querySelector('.tree-children').hidden=false;d.querySelector('.tree-toggle').setAttribute('aria-expanded','true');}}
if(act)act.links.forEach(link=>{const types={PDF:['PDF',4],WEB:['ACTIVITÉ EN LIGNE',1],VIDEO:['VIDÉO',4],LIEN:['LIEN',2]};const [meta,index]=types[link.type];$('content').append(card({title:link.label,href:link.url,type:link.type,meta,index,link}));});
else if(seq)seq.activities.forEach((a,i)=>$('content').append(card({title:a.title,description:a.description.join('\n'),href:`#sequence-${si+1}-activite-${i+1}`,type:'ACT',number:i+1,index:si,meta:`${a.links.length} ressource${a.links.length>1?'s':''}`})));
else data.sequences.forEach((s,i)=>$('content').append(card({title:s.title,description:s.description.join('\n'),href:`#sequence-${i+1}`,type:'SEQ',number:i+1,index:i,meta:`${s.activities.length} rubrique${s.activities.length>1?'s':''}`})));
if(!$('content').children.length)$('content').append(el('p',act?'Ressources à venir.':seq?'Activités à venir.':'Séquences à venir.','empty'));if(focus){$('title').focus();window.scrollTo(0,0);}}
function load(text){data=parseContent(text,location.href);treeReady=false;$('notice').replaceChildren();if(data.errors.length){const d=el('details',null,'warning');d.append(el('summary',`${data.errors.length} ligne(s) de contenu.txt à corriger`));data.errors.forEach(x=>d.append(el('p',x)));$('notice').append(d);}render();}
window.addEventListener('hashchange',()=>render(true));$('file').addEventListener('change',async e=>{if(e.target.files[0])load(await e.target.files[0].text());});
if(location.protocol==='file:'){$('local').hidden=false;load('');}else fetch('contenu.txt',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error(r.status);return r.text();}).then(load).catch(()=>{$('content').replaceChildren(el('p','Impossible de charger contenu.txt. Vérifie sa présence à côté de index.html.','warning'));$('local').hidden=false;});
}
