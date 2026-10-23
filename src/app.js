(() => {
'use strict';
const R = window.RECIPES, K = window.KITCHEN, PEOPLE = window.PEOPLE;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const app = $('#app');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ico = (id, cls = '') => `<svg class="${cls}"><use href="#i-${id}"/></svg>`;
const byId = id => R.find(r => r.id === id);

/* ---------- storage ---------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem('kb.' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('kb.' + k, JSON.stringify(v)); } catch {} }
};
const idb = (() => {
  let dbp;
  const open = () => dbp || (dbp = new Promise((res, rej) => {
    try { const r = indexedDB.open('kucharka', 1); r.onupgradeneeded = () => r.result.createObjectStore('photos'); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); } catch (e) { rej(e); }
  }));
  const tx = (mode, fn) => open().then(db => new Promise((res, rej) => { const t = db.transaction('photos', mode); const s = t.objectStore('photos'); const q = fn(s); t.oncomplete = () => res(q && q.result); t.onerror = () => rej(t.error); }));
  return { get: k => tx('readonly', s => s.get(k)).catch(() => null), set: (k, v) => tx('readwrite', s => s.put(v, k)).catch(() => null), del: k => tx('readwrite', s => s.delete(k)).catch(() => null) };
})();
const photoCache = {};

/* ---------- formatting ---------- */
const FR = { 0: '', 0.25: '¼', 0.5: '½', 0.75: '¾' };
function frac(v, step) {
  let r = Math.round(v / step) * step; if (r < step) r = step;
  const w = Math.floor(r + 1e-9), f = Math.round((r - w) * 100) / 100;
  return (w ? w : '') + (FR[f] ?? '') || '¼';
}
function fmtQty(ing, ratio) {
  const v = ing.a * ratio;
  if (!ing.a) return ing.u || '';
  switch (ing.u) {
    case 'g': case 'ml': { const n = Math.max(5, Math.round(v / 5) * 5); return n.toLocaleString('cs-CZ') + ' ' + ing.u; }
    case 'tbsp': case 'tsp': return frac(v, 0.25) + ' ' + ing.u;
    case 'ks': return frac(v, 0.5) + ' ks';
    default: return frac(v, 0.5) + ' ' + ing.u;
  }
}
const mmss = s => { s = Math.max(0, Math.ceil(s)); const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60; return (h ? h + ':' + String(m).padStart(2, '0') : String(m).padStart(2, '0')) + ':' + String(x).padStart(2, '0'); };
const fmtTime = m => m >= 60 ? (Math.floor(m / 60) + ' h' + (m % 60 ? ' ' + (m % 60) + ' min' : '')) : m + ' min';
const today = () => new Date().toISOString().slice(0, 10);
const fmtDate = d => { if (!d) return ''; const p = d.split('-'); return p.length === 3 ? `${+p[2]}. ${+p[1]}. ${p[0]}` : p.length === 2 ? `${+p[1]}/${p[0]}` : d; };
const servLabel = (r, n) => r.servingsLabel || (n === 1 ? 'porce' : n < 5 ? 'porce' : 'porcí');
const initials = n => (n || '?').trim().slice(0, 1).toUpperCase();

/* ---------- user ---------- */
let me = store.get('me', null);

/* ---------- feedback outbox (Netlify Forms) ---------- */
function send(payload) {
  const item = Object.assign({ 'form-name': 'zpetna-vazba', kdo: me || 'neznámý', datum: new Date().toISOString() }, payload);
  const box = store.get('outbox', []); box.push(item); store.set('outbox', box); flush();
}
let flushing = false;
async function flush() {
  if (flushing || !navigator.onLine) return; flushing = true;
  let box = store.get('outbox', []);
  while (box.length) {
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(box[0]).toString() });
      if (!res.ok) break;
      box.shift(); store.set('outbox', box);
    } catch { break; }
  }
  flushing = false;
}
addEventListener('online', flush);

/* ---------- toast & sheet ---------- */
let toastT;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600); }
function openSheet(html, onMount) {
  const s = $('#sheet'), b = $('#sheetBackdrop');
  s.innerHTML = '<div class="grab"></div>' + html; s.hidden = false; b.hidden = false;
  b.onclick = closeSheet; onMount && onMount(s);
}
function closeSheet() { $('#sheet').hidden = true; $('#sheetBackdrop').hidden = true; }

function askWho(then) {
  let pick = me;
  openSheet(`<h2>Kdo vaří?</h2><p class="muted">Komentáře a hodnocení se ukládají pod tvým jménem, ať vím, kdo co napsal.</p>
    <div class="people">${PEOPLE.map(p => `<button data-p="${esc(p)}" aria-pressed="${p === me}"><span class="avatar">${initials(p)}</span>${esc(p)}</button>`).join('')}
    <button data-p="__other" aria-pressed="${me && !PEOPLE.includes(me)}"><span class="avatar">+</span>Někdo jiný</button></div>
    <input class="field ${me && !PEOPLE.includes(me) ? '' : 'hidden'}" id="otherName" placeholder="Tvoje jméno" value="${me && !PEOPLE.includes(me) ? esc(me) : ''}">
    <button class="btn primary" id="whoOk" style="width:100%;margin-top:14px">Hotovo</button>`, s => {
    $$('.people button', s).forEach(b => b.onclick = () => {
      $$('.people button', s).forEach(x => x.setAttribute('aria-pressed', x === b));
      pick = b.dataset.p; $('#otherName', s).classList.toggle('hidden', pick !== '__other'); if (pick === '__other') $('#otherName', s).focus();
    });
    $('#whoOk', s).onclick = () => {
      const name = pick === '__other' ? $('#otherName', s).value.trim() : pick;
      if (!name) { toast('Vyber nebo napiš jméno'); return; }
      me = name; store.set('me', me); closeSheet(); render(); then && then();
    };
  });
}

/* ---------- photos ---------- */
function photoHTML(r, extra = '') {
  const own = photoCache[r.id];
  const src = own || (r.photo && r.photo.src) || '';
  const hue = [...r.id].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return `<div class="ph ${extra} ${src ? '' : 'noimg'}" style="background:linear-gradient(135deg,hsl(${hue} 45% 62%),hsl(${(hue + 40) % 360} 50% 45%))">
    <div class="fallback">${esc(r.title.slice(0, 1))}</div>
    ${src ? `<img src="${esc(src)}" alt="${esc(r.title)}" loading="lazy" decoding="async" onerror="this.parentNode.classList.add('fail')">` : ''}</div>`;
}
async function loadOwnPhotos() {
  await Promise.all(R.map(async r => { const p = await idb.get(r.id); if (p) photoCache[r.id] = p; }));
}
function pickPhoto(r) {
  const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*';
  inp.onchange = async () => {
    const f = inp.files[0]; if (!f) return;
    const url = await resize(f, 1400);
    photoCache[r.id] = url; await idb.set(r.id, url);
    toast('Fotka uložená v tomhle telefonu'); render();
  };
  inp.click();
}
function resize(file, max) {
  return new Promise(res => {
    const img = new Image(); const u = URL.createObjectURL(file);
    img.onload = () => { const s = Math.min(1, max / Math.max(img.width, img.height)); const c = document.createElement('canvas'); c.width = img.width * s; c.height = img.height * s; c.getContext('2d').drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(u); res(c.toDataURL('image/jpeg', .85)); };
    img.src = u;
  });
}

/* ---------- per-recipe local state ---------- */
const st = {
  servings: id => store.get('serv.' + id, byId(id).servings),
  setServings: (id, n) => store.set('serv.' + id, n),
  got: id => store.get('got.' + id, {}),
  done: id => store.get('done.' + id, {}),
  comments: id => store.get('com.' + id, []),
  ratings: id => store.get('rate.' + id, {}),
  cooked: id => store.get('cooked.' + id, [])
};

/* ---------- timers ---------- */
let timers = store.get('timers', []);
const saveTimers = () => store.set('timers', timers);
const tKey = (rid, i) => rid + ':' + i;
function timerLeft(t) { return t.state === 'run' ? (t.endAt - Date.now()) / 1000 : t.left; }
function toggleTimer(rid, i) {
  unlockAudio(); askNotify();
  const r = byId(rid), step = r.steps[i], key = tKey(rid, i);
  let t = timers.find(x => x.key === key);
  if (!t || t.state === 'done') {
    timers = timers.filter(x => x.key !== key);
    t = { key, rid, i, label: step.t, recipe: r.title, dur: step.s, state: 'run', endAt: Date.now() + step.s * 1000, left: step.s };
    timers.push(t);
  } else if (t.state === 'run') { t.left = timerLeft(t); t.state = 'pause'; }
  else { t.endAt = Date.now() + t.left * 1000; t.state = 'run'; }
  saveTimers(); syncWake(); tick(true);
}
function resetTimer(key) { timers = timers.filter(x => x.key !== key); saveTimers(); tick(true); }
function finishTimer(t) {
  t.state = 'done'; t.left = 0; saveTimers();
  const d = st.done(t.rid); d[t.i] = true; store.set('done.' + t.rid, d);
  ring(t);
}
let ringing = null;
function ring(t) {
  ringing = t.key;
  beep(); try { navigator.vibrate && navigator.vibrate([400, 200, 400, 200, 600]); } catch {}
  if ('Notification' in window && Notification.permission === 'granted' && document.visibilityState !== 'visible') {
    try { new Notification('⏰ ' + t.label + ' — hotovo', { body: t.recipe, tag: t.key, requireInteraction: true }); } catch {}
  }
  toast('⏰ ' + t.label + ' — hotovo');
  let n = 0; const rep = setInterval(() => { if (ringing !== t.key || ++n > 5) { clearInterval(rep); return; } beep(); }, 2500);
  render(true);
}
let actx;
function unlockAudio() { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === 'suspended') actx.resume(); } catch {} }
function beep() {
  try {
    unlockAudio(); const now = actx.currentTime;
    [0, .28, .56].forEach((d, k) => { const o = actx.createOscillator(), g = actx.createGain(); o.type = 'sine'; o.frequency.value = k === 2 ? 1175 : 880; g.gain.setValueAtTime(0.0001, now + d); g.gain.exponentialRampToValueAtTime(0.5, now + d + .02); g.gain.exponentialRampToValueAtTime(0.0001, now + d + .24); o.connect(g).connect(actx.destination); o.start(now + d); o.stop(now + d + .26); });
  } catch {}
}
let asked = store.get('notifAsked', false);
function askNotify() { if (asked || !('Notification' in window) || Notification.permission !== 'default') return; asked = true; store.set('notifAsked', true); try { Notification.requestPermission(); } catch {} }

function tick(force) {
  let changed = false;
  timers.forEach(t => { if (t.state === 'run' && timerLeft(t) <= 0) { finishTimer(t); changed = true; } });
  // update all timer buttons
  $$('[data-tkey]').forEach(el => {
    const t = timers.find(x => x.key === el.dataset.tkey);
    const state = t ? t.state : 'idle';
    const secs = t ? timerLeft(t) : +el.dataset.dur;
    if (el.dataset.state !== state || force) {
      el.dataset.state = state;
      const icon = el.querySelector('use'); if (icon) icon.setAttribute('href', '#i-' + (state === 'run' ? 'pause' : state === 'done' ? 'check' : 'play'));
    }
    const lab = el.querySelector('.tl'); if (lab) lab.textContent = state === 'done' ? 'Hotovo' : mmss(secs);
  });
  $$('[data-tleft]').forEach(el => { const t = timers.find(x => x.key === el.dataset.tleft); if (t) el.textContent = t.state === 'done' ? 'Hotovo' : mmss(timerLeft(t)); });
  // pill
  const active = timers.filter(t => t.state !== 'done' || ringing === t.key);
  const pill = $('#timerPill'), badge = $('#timerBadge');
  const inCook = location.hash.startsWith('#/vareni');
  if (active.length && !location.hash.startsWith('#/casovace') && !inCook) {
    const t = [...active].sort((a, b) => (a.state === 'done' ? -1 : timerLeft(a)) - (b.state === 'done' ? -1 : timerLeft(b)))[0];
    pill.hidden = false; pill.classList.toggle('ring', t.state === 'done');
    pill.innerHTML = `${ico(t.state === 'done' ? 'check' : t.state === 'pause' ? 'pause' : 'timer')}<span>${t.state === 'done' ? 'Hotovo' : mmss(timerLeft(t))} · ${esc(t.label)}</span>${active.length > 1 ? `<b style="opacity:.7">+${active.length - 1}</b>` : ''}`;
    pill.onclick = () => { ringing = null; location.hash = '#/casovace'; };
  } else pill.hidden = true;
  const runN = timers.filter(t => t.state === 'run').length;
  badge.hidden = !runN; badge.textContent = runN;
  if (changed && force !== true) render(true);
}
setInterval(tick, 500);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { tick(true); syncWake(); } });

/* ---------- wake lock ---------- */
let wakeLock = null, wakeWanted = false;
async function syncWake() {
  const h = location.hash;
  wakeWanted = h.startsWith('#/r/') || h.startsWith('#/vareni') || timers.some(t => t.state === 'run');
  if (!('wakeLock' in navigator)) { updateWakeUI(false); return; }
  try {
    if (wakeWanted && !wakeLock && document.visibilityState === 'visible') {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => { wakeLock = null; updateWakeUI(false); });
    } else if (!wakeWanted && wakeLock) { await wakeLock.release(); wakeLock = null; }
  } catch { wakeLock = null; }
  updateWakeUI(!!wakeLock);
}
function updateWakeUI(on) { $$('.wake').forEach(w => { w.dataset.on = on; w.lastChild.textContent = on ? 'Displej nezhasne' : ('wakeLock' in navigator ? 'Klepni pro zapnutí displeje' : 'Displej: nastav v telefonu'); }); }
document.addEventListener('click', () => { if (wakeWanted && !wakeLock) syncWake(); }, { passive: true });

/* ---------- versions: what's new ---------- */
const seen = store.get('seenVersions', null);
const isNew = r => seen && !(r.id in seen);
const isUpdated = r => seen && (r.id in seen) && seen[r.id] < r.version;
function markSeen() { const m = {}; R.forEach(r => m[r.id] = r.version); store.set('seenVersions', m); }

/* ---------- views ---------- */
const FILTERS = [
  ['vse', 'Vše', () => true],
  ['hit', 'Hity dětí', r => r.kidsLiked || r.tags.includes('hit')],
  ['rychle', 'Do 30 min', r => r.time <= 30],
  ['jedno-nadobi', 'Jedno nádobí', r => r.tags.includes('jedno-nadobi')],
  ['dvakrat', 'Uvař jednou, jez dvakrát', r => r.tags.includes('dvakrat')],
  ['polevka', 'Polévky', r => r.category === 'Polévka'],
  ['peceni', 'Pečení a sladké', r => r.category === 'Pečení' || r.category === 'Snídaně'],
  ['papinak', 'Papiňák', r => r.equipment.includes('papinak')],
  ['ryzovar', 'Rýžovar', r => r.equipment.includes('ryzovar')],
  ['trouba', 'Trouba', r => r.equipment.includes('trouba')]
];
let filter = store.get('filter', 'vse'), query = '';

function card(r) {
  const cooked = st.cooked(r.id), rt = st.ratings(r.id);
  const ups = Object.values(rt).filter(v => v === 1).length;
  const pills = [];
  if (isNew(r)) pills.push('<span class="pill new">Nové</span>');
  else if (isUpdated(r)) pills.push('<span class="pill new">Upraveno</span>');
  if (r.kidsLiked || r.tags.includes('hit')) pills.push('<span class="pill hot">Hit</span>');
  return `<a class="card" href="#/r/${r.id}">
    ${photoHTML(r)}
    ${pills.length ? `<div class="badge-corner">${pills.join('')}</div>` : ''}
    <div class="body"><h3>${esc(r.title)}</h3>
      <div class="meta">${ico('clock')}${fmtTime(r.time)}${cooked.length ? ` · ${cooked.length}× vařeno` : ''}${ups ? ` · ${ups}${ico('thumb')}` : ''}</div>
    </div></a>`;
}

function viewHome() {
  const f = FILTERS.find(x => x[0] === filter) || FILTERS[0];
  const q = query.trim().toLowerCase();
  const list = R.filter(f[2]).filter(r => !q || (r.title + ' ' + r.subtitle + ' ' + r.ingredients.map(i => i.n).join(' ')).toLowerCase().includes(q));
  const recent = [...R].sort((a, b) => (b.updated || '').localeCompare(a.updated || ''))[0];
  const showFeature = filter === 'vse' && !q;
  app.innerHTML = `<div class="wrap">
    <header class="top"><div class="top-row">
      <div class="brand"><h1>Kuchařka</h1><span class="dot"></span></div>
      <button class="me-chip" id="meBtn"><span class="avatar">${me ? initials(me) : '?'}</span>${me ? esc(me) : 'Kdo vaří?'}</button>
    </div><p class="tagline">Všechno bez lepku · ${R.length} receptů</p></header>
    <label class="search">${ico('search')}<input id="q" type="search" placeholder="Hledej recept nebo surovinu…" value="${esc(query)}" autocomplete="off"></label>
    <div class="chips" role="toolbar">${FILTERS.map(x => `<button class="chip" data-f="${x[0]}" aria-pressed="${x[0] === filter}">${x[1]}</button>`).join('')}</div>
    ${showFeature ? `<div class="section-h"><h2>Naposledy přidané</h2></div>
      <a class="feature" href="#/r/${recent.id}">${photoHTML(recent)}<div class="ov"><small>${esc(recent.category)} · ${fmtTime(recent.time)}</small><h2>${esc(recent.title)}</h2><p>${esc(recent.subtitle)}</p></div></a>` : ''}
    <div class="section-h"><h2>${q ? 'Výsledky' : f[1] === 'Vše' ? 'Všechny recepty' : f[1]}</h2><span class="muted">${list.length}</span></div>
    ${list.length ? `<div class="grid">${list.map(card).join('')}</div>` : `<div class="empty">${ico('search')}<p>Nic takového tu zatím není.</p></div>`}
  </div>`;
  $('#meBtn').onclick = () => askWho();
  const qi = $('#q');
  qi.oninput = () => { query = qi.value; const pos = qi.selectionStart; viewHome(); const n = $('#q'); n.focus(); n.setSelectionRange(pos, pos); };
  $$('.chip').forEach(c => c.onclick = () => { filter = c.dataset.f; store.set('filter', filter); viewHome(); });
}

function ingsHTML(r, ratio, got) {
  return `<ul class="ings">${r.ingredients.map((g, i) => `<li data-i="${i}" class="${got[i] ? 'got' : ''}"><span class="tick">${ico('check')}</span><span class="q">${esc(fmtQty(g, ratio))}</span><span class="n">${esc(g.n)}</span></li>`).join('')}</ul>`;
}
function timerBtn(r, i, cls = 'tbtn') {
  const s = r.steps[i]; if (!s.s) return '';
  return `<button class="${cls}" data-tkey="${tKey(r.id, i)}" data-dur="${s.s}" data-state="idle">${ico('play')}<span class="tl">${mmss(s.s)}</span></button>`;
}
/* suroviny použité v kroku, přepočtené na zvolené porce */
function stepIngs(r, s, ratio) {
  return (s.i || []).map(e => {
    const [k, part] = Array.isArray(e) ? e : [e, 1];
    const g = r.ingredients[k]; if (!g) return null;
    return { q: fmtQty(g, ratio * part), n: g.n, part: part < 1 };
  }).filter(Boolean);
}
function stepIngsHTML(r, s, ratio, cls) {
  const list = stepIngs(r, s, ratio); if (!list.length) return '';
  return `<ul class="${cls}">${list.map(x => `<li><b>${esc(x.q)}</b> ${esc(x.n)}${x.part ? ' <em>(část)</em>' : ''}</li>`).join('')}</ul>`;
}

function viewRecipe(id) {
  const r = byId(id); if (!r) return go('#/');
  const n = st.servings(id), ratio = n / r.servings, got = st.got(id), done = st.done(id);
  const comments = st.comments(id), rt = st.ratings(id), cooked = st.cooked(id);
  const equip = r.equipment.map(e => K.items.find(k => k.id === e)).filter(Boolean);
  const allNotes = [
    ...(r.notes || []).map(x => ({ ...x, kind: 'claude', synced: true })),
    ...comments
  ];
  const inShop = store.get('shop', []).some(s => s.id === id);
  app.innerHTML = `<div class="wrap">
    <div class="hero">${photoHTML(r)}<div class="shade"></div>
      <div class="hero-bar"><a class="round" href="#/" aria-label="Zpět">${ico('back')}</a>
        <button class="round" id="photoBtn" aria-label="Vlastní fotka">${ico('camera')}</button></div>
      ${photoCache[id] ? '<div class="credit">Tvoje fotka</div>' : r.photo && r.photo.page ? `<div class="credit">Ilustrační foto: <a href="${esc(r.photo.page)}" target="_blank" rel="noopener">Wikimedia Commons</a></div>` : ''}
    </div>
    <div class="d-head"><div class="cat">${esc(r.category)}${r.kidsLiked ? ' · hit u dětí' : ''}</div>
      <h1>${esc(r.title)}</h1><p>${esc(r.subtitle)}</p>
      <div class="facts"><span class="fact">${ico('clock')}${fmtTime(r.time)}</span><span class="fact">${ico('users')}${r.servings} ${servLabel(r, r.servings)}</span>
        ${equip.map(e => `<a class="fact" href="#/kuchyne">${ico('pot')}${esc(e.name)}</a>`).join('')}</div>
      <button class="wake" data-on="false"><i></i><span>Displej nezhasne</span></button>
    </div>
    <div class="actions">
      <a class="btn primary" href="#/vareni/${id}">${ico('chef')}Začít vařit</a>
      <button class="btn icon" id="shopBtn" aria-label="Do nákupu" style="${inShop ? 'color:var(--olive)' : ''}">${ico(inShop ? 'check' : 'cart')}</button>
      <button class="btn icon" id="cookedBtn" aria-label="Uvařeno">${ico('spark')}</button>
    </div>
    ${r.key ? `<div class="keybox">${ico('spark')}<div><b>Na tomhle to stojí</b><p>${esc(r.key)}</p></div></div>` : ''}

    <section class="panel"><div class="panel-h"><h2>Suroviny</h2>
      <div class="stepper"><button id="sm" aria-label="Méně">${ico('minus')}</button><div class="val">${n}<small>${servLabel(r, n)}</small></div><button id="sp" aria-label="Více">${ico('plus')}</button></div></div>
      ${ingsHTML(r, ratio, got)}
      ${n !== r.servings ? `<p class="small muted" style="margin:8px 0 0">Přepočteno z ${r.servings} ${servLabel(r, r.servings)}. <button id="sreset" style="color:var(--accent);font-weight:700">Vrátit</button></p>` : ''}
    </section>

    <section class="panel"><div class="panel-h"><h2>Postup</h2>${Object.keys(done).length ? '<button class="small" id="dreset" style="color:var(--accent);font-weight:700">Začít znovu</button>' : ''}</div>
      <ol class="steps">${r.steps.map((s, i) => `<li class="step ${done[i] ? 'done' : ''}" data-i="${i}"><span class="num">${i + 1}</span><div class="tx">
        <div class="tt">${esc(s.t)}${s.key ? '<span class="k">klíčové</span>' : ''}${s.tag ? `<span class="tg">${esc(s.tag)}</span>` : ''}</div><p>${esc(s.d)}</p>${stepIngsHTML(r, s, ratio, 'sing')}${timerBtn(r, i)}</div></li>`).join('')}</ol>
    </section>

    ${r.tips && r.tips.length ? `<section class="panel"><div class="panel-h"><h2>Tipy</h2></div><ul class="tips">${r.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul></section>` : ''}

    <section class="panel"><div class="panel-h"><h2>Jak to chutnalo?</h2><span class="small muted">${cooked.length ? `Vařeno ${cooked.length}× · naposledy ${fmtDate(cooked[cooked.length - 1])}` : 'Zatím nevařeno'}</span></div>
      <div class="rate">${PEOPLE.map(p => `<div class="person"><b>${esc(p)}</b><div class="row">
        <button class="up" data-p="${esc(p)}" data-v="1" aria-pressed="${rt[p] === 1}" aria-label="${esc(p)}: chutnalo">${ico('thumb')}</button>
        <button class="down" data-p="${esc(p)}" data-v="-1" aria-pressed="${rt[p] === -1}" aria-label="${esc(p)}: nechutnalo">${ico('thumb')}</button></div></div>`).join('')}</div>
    </section>

    <section class="panel" id="notes"><div class="panel-h"><h2>Poznámky</h2><span class="small muted">čte je i Claude</span></div>
      ${allNotes.length ? allNotes.map(c => `<div class="note"><span class="avatar">${initials(c.who)}</span><div><span class="who">${esc(c.who)}</span><span class="kind ${c.kind}">${{ problem: 'problém', uprava: 'návrh úpravy', poznamka: 'poznámka', claude: 'zapracováno' }[c.kind] || ''}</span><span class="when">${fmtDate(c.date)}</span><p>${esc(c.text)}</p></div></div>`).join('') : '<p class="muted small" style="margin:0">Až budeš vařit, napiš sem, co se povedlo a co ne — příště podle toho recept upravím.</p>'}
      <div class="compose"><div class="seg" id="kindSeg">
        <button data-k="poznamka" aria-pressed="true">Poznámka</button><button data-k="problem" aria-pressed="false">Problém</button><button data-k="uprava" aria-pressed="false">Návrh úpravy</button></div>
        <textarea id="noteTxt" placeholder="Např. rýže byla moc měkká, příště o 2 minuty kratší…"></textarea>
        <div class="foot"><span class="small muted">${me ? 'Jako ' + esc(me) : 'Nejdřív vyber, kdo jsi'}</span><button class="btn sm primary" id="noteSend">Uložit</button></div>
      </div>
    </section>

    <section class="panel"><div class="panel-h"><h2>Historie receptu</h2><span class="small muted">verze ${r.version}</span></div>
      <ul class="hist">${(r.history || []).slice().reverse().map(h => `<li><b>v${h.v} · ${fmtDate(h.date)}</b> — ${esc(h.text)}</li>`).join('')}<li><b>v1</b> — z ${esc(r.source || 'chatu')}</li></ul>
    </section>
  </div>`;

  $('#photoBtn').onclick = () => {
    if (photoCache[id]) openSheet(`<h2>Fotka receptu</h2><p class="muted">Vlastní fotka je uložená jen v tomhle telefonu.</p>
      <button class="btn primary" id="pNew" style="width:100%;margin-top:10px">${ico('camera')}Vyfotit / vybrat jinou</button>
      <button class="btn" id="pDel" style="width:100%;margin-top:8px">Vrátit ilustrační foto</button>`, s => {
      $('#pNew', s).onclick = () => { closeSheet(); pickPhoto(r); };
      $('#pDel', s).onclick = async () => { delete photoCache[id]; await idb.del(id); closeSheet(); render(); };
    }); else pickPhoto(r);
  };
  $('#sm').onclick = () => { if (n > 1) { st.setServings(id, n - 1); render(true); } };
  $('#sp').onclick = () => { if (n < 40) { st.setServings(id, n + 1); render(true); } };
  const sr = $('#sreset'); if (sr) sr.onclick = () => { st.setServings(id, r.servings); render(true); };
  const dr = $('#dreset'); if (dr) dr.onclick = () => { store.set('done.' + id, {}); store.set('got.' + id, {}); timers.filter(t => t.rid === id).forEach(t => resetTimer(t.key)); render(true); };
  $$('.ings li').forEach(li => li.onclick = () => { const g = st.got(id); g[li.dataset.i] = !g[li.dataset.i]; store.set('got.' + id, g); li.classList.toggle('got'); });
  $$('.step .num').forEach(nm => nm.onclick = () => { const li = nm.closest('.step'); const d = st.done(id); d[li.dataset.i] = !d[li.dataset.i]; store.set('done.' + id, d); li.classList.toggle('done'); });
  $$('.tbtn').forEach(b => b.onclick = () => { const i = +b.dataset.tkey.split(':')[1]; toggleTimer(id, i); });
  $$('.tbtn').forEach(b => { let pt; b.onpointerdown = () => { pt = setTimeout(() => { resetTimer(b.dataset.tkey); toast('Časovač vynulován'); }, 700); }; b.onpointerup = b.onpointerleave = () => clearTimeout(pt); });
  $('#shopBtn').onclick = () => {
    let s = store.get('shop', []);
    if (s.some(x => x.id === id)) { s = s.filter(x => x.id !== id); toast('Odebráno z nákupu'); }
    else { s.push({ id, servings: n }); toast(`Přidáno do nákupu (${n} ${servLabel(r, n)})`); }
    store.set('shop', s); render(true);
  };
  $('#cookedBtn').onclick = () => cookedFlow(r);
  $$('.rate button').forEach(b => b.onclick = () => {
    const p = b.dataset.p, v = +b.dataset.v, cur = st.ratings(id);
    cur[p] = cur[p] === v ? 0 : v; store.set('rate.' + id, cur);
    send({ typ: 'hodnoceni', recept: id, nazev: r.title, hodnoceni: `${p}: ${cur[p] === 1 ? 'chutnalo' : cur[p] === -1 ? 'nechutnalo' : 'zrušeno'}`, verze: r.version });
    render(true);
  });
  let kind = 'poznamka';
  $$('#kindSeg button').forEach(b => b.onclick = () => { kind = b.dataset.k; $$('#kindSeg button').forEach(x => x.setAttribute('aria-pressed', x === b)); });
  $('#noteSend').onclick = () => {
    const txt = $('#noteTxt').value.trim(); if (!txt) { toast('Napiš poznámku'); return; }
    const doSave = () => {
      const c = st.comments(id); c.push({ who: me, kind, text: txt, date: today() }); store.set('com.' + id, c);
      send({ typ: kind, recept: id, nazev: r.title, text: txt, verze: r.version, porce: st.servings(id) });
      toast('Uloženo — příště to zapracuju'); render(true);
    };
    if (!me) askWho(doSave); else doSave();
  };
  $('.wake').onclick = () => syncWake();
}

function cookedFlow(r) {
  openSheet(`<h2>Uvařeno! ${ico('spark')}</h2><p class="muted">Jak to dopadlo? Krátká poznámka mi pomůže recept příště vylepšit.</p>
    <div class="seg" style="margin-top:12px" id="cf">${['Povedlo se', 'Šlo to', 'Něco nesedělo'].map((x, k) => `<button data-v="${x}" aria-pressed="${k === 0}">${x}</button>`).join('')}</div>
    <div class="compose" style="margin-top:4px"><textarea id="cfTxt" placeholder="Co bys příště udělal jinak? (nepovinné)"></textarea></div>
    <button class="btn primary" id="cfOk" style="width:100%;margin-top:12px">Uložit</button>`, s => {
    let v = 'Povedlo se';
    $$('#cf button', s).forEach(b => b.onclick = () => { v = b.dataset.v; $$('#cf button', s).forEach(x => x.setAttribute('aria-pressed', x === b)); });
    $('#cfOk', s).onclick = () => {
      const fin = () => {
        const c = st.cooked(r.id); c.push(today()); store.set('cooked.' + r.id, c);
        const txt = $('#cfTxt', s).value.trim();
        if (txt) { const cm = st.comments(r.id); cm.push({ who: me, kind: v === 'Něco nesedělo' ? 'problem' : 'poznamka', text: v + ': ' + txt, date: today() }); store.set('com.' + r.id, cm); }
        send({ typ: 'uvareno', recept: r.id, nazev: r.title, hodnoceni: v, text: txt, verze: r.version, porce: st.servings(r.id) });
        store.set('done.' + r.id, {}); store.set('got.' + r.id, {});
        closeSheet(); toast('Zapsáno. Díky!'); render(true);
      };
      if (!me) { closeSheet(); askWho(fin); } else fin();
    };
  });
}

/* ---------- cooking mode ---------- */
let cookIdx = 0, cookFor = null;
function viewCook(id) {
  const r = byId(id); if (!r) return go('#/');
  if (cookFor !== id) { cookFor = id; const d = st.done(id); cookIdx = r.steps.findIndex((_, i) => !d[i]); if (cookIdx < 0) cookIdx = 0; }
  const s = r.steps[cookIdx], d = st.done(id), last = cookIdx === r.steps.length - 1;
  const n = st.servings(id), ratio = n / r.servings;
  app.innerHTML = `<div class="cook">
    <div class="cook-top"><a class="round" href="#/r/${id}" aria-label="Zavřít">${ico('close')}</a>
      <div class="ttl"><b>${esc(r.title)}</b><button class="wake" data-on="false"><i></i><span>Displej nezhasne</span></button></div>
      <button class="round" id="ingT" aria-label="Suroviny">${ico('list')}</button></div>
    <div class="progress">${r.steps.map((_, i) => `<i class="${i === cookIdx ? 'on' : d[i] ? 'dn' : ''}"></i>`).join('')}</div>
    <div class="cook-body" id="cb">
      <div class="no">Krok ${cookIdx + 1} z ${r.steps.length}</div>
      <h2>${esc(s.t)}${s.tag ? ` <span class="tg" style="font-family:var(--sans);font-size:14px;vertical-align:6px;background:var(--olive-soft);color:var(--olive);padding:3px 9px;border-radius:7px">${esc(s.tag)}</span>` : ''}</h2>
      ${stepIngs(r, s, ratio).length ? `<div class="cook-step-ings"><div class="lbl">V tomhle kroku · ${n} ${servLabel(r, n)}</div>${stepIngsHTML(r, s, ratio, 'csi')}</div>` : ''}
      <div class="txt">${esc(s.d)}</div>
      ${s.key && r.key ? `<div class="keybox k">${ico('spark')}<div><b>Pozor</b><p>${esc(r.key)}</p></div></div>` : ''}
      ${s.s ? timerBtn(r, cookIdx, 'big-timer') : ''}
      <div class="cook-ings ${store.get('cookIngs', false) ? '' : 'hidden'}" id="ci">${ingsHTML(r, ratio, st.got(id))}</div>
    </div>
    <div class="cook-foot">
      <button class="btn icon" id="prev" ${cookIdx === 0 ? 'disabled style="opacity:.4"' : ''} aria-label="Předchozí">${ico('left')}</button>
      <button class="btn primary" id="next">${last ? ico('check') + 'Hotovo' : 'Další krok' + ico('right')}</button>
    </div></div>`;
  const nextStep = () => { const dd = st.done(id); dd[cookIdx] = true; store.set('done.' + id, dd); if (last) { go('#/r/' + id); setTimeout(() => cookedFlow(r), 50); } else { cookIdx++; viewCook(id); } };
  const prevStep = () => { if (cookIdx > 0) { cookIdx--; viewCook(id); } };
  $('#next').onclick = nextStep; $('#prev').onclick = prevStep;
  $('#ingT').onclick = () => { const v = !store.get('cookIngs', false); store.set('cookIngs', v); $('#ci').classList.toggle('hidden', !v); };
  $$('#ci li').forEach(li => li.onclick = () => { const g = st.got(id); g[li.dataset.i] = !g[li.dataset.i]; store.set('got.' + id, g); li.classList.toggle('got'); });
  const bt = $('.big-timer'); if (bt) bt.onclick = () => toggleTimer(id, cookIdx);
  $('.wake').onclick = () => syncWake();
  let x0 = null, y0 = null; const cb = $('#cb');
  cb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  cb.addEventListener('touchend', e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) { dx < 0 ? (last ? null : nextStep()) : prevStep(); } x0 = null; }, { passive: true });
}

/* ---------- shopping ---------- */
function viewShop() {
  const sel = store.get('shop', []).filter(s => byId(s.id));
  const checked = store.get('shopChecked', {});
  const merged = {};
  sel.forEach(s => {
    const r = byId(s.id), ratio = s.servings / r.servings;
    r.ingredients.forEach(g => {
      const name = g.n.replace(/\s*\(.*?\)\s*/g, ' ').replace(/,.*$/, '').trim().toLowerCase();
      const key = name + '|' + g.u;
      merged[key] = merged[key] || { n: name, u: g.u, a: 0, from: new Set() };
      merged[key].a += g.a * ratio; merged[key].from.add(r.title);
    });
  });
  const items = Object.entries(merged).sort((a, b) => a[1].n.localeCompare(b[1].n, 'cs'));
  const line = it => it.a ? fmtQty({ a: it.a, u: it.u }, 1) : it.u;
  app.innerHTML = `<div class="wrap"><header class="page-h"><h1>Nákup</h1><p>Vyber recepty tlačítkem ${ico('cart', 'small')} u receptu — suroviny se sečtou.</p></header>
    ${sel.length ? `<div class="shop-recipes">${sel.map(s => { const r = byId(s.id); return `<div class="shop-r">${photoHTML(r)}<div class="nm">${esc(r.title)}<small>${s.servings} ${servLabel(r, s.servings)}</small></div>
      <div class="stepper"><button data-a="-" data-id="${s.id}" aria-label="Méně">${ico('minus')}</button><button data-a="+" data-id="${s.id}" aria-label="Více">${ico('plus')}</button></div>
      <button class="btn icon sm" data-del="${s.id}" aria-label="Odebrat" style="width:40px">${ico('trash')}</button></div>`; }).join('')}</div>
    <section class="panel"><div class="panel-h"><h2>Seznam</h2><button class="btn sm" id="copy">${ico('copy')}Kopírovat</button></div>
      <ul class="ings">${items.map(([k, it]) => `<li data-k="${esc(k)}" class="${checked[k] ? 'got' : ''}"><span class="tick">${ico('check')}</span><span class="q">${esc(line(it))}</span><span class="n">${esc(it.n)}${it.from.size > 1 ? `<br><small class="muted">${[...it.from].map(esc).join(', ')}</small>` : ''}</span></li>`).join('')}</ul>
    </section>
    <div class="callout">Sůl, olej a koření máš nejspíš doma — odškrtni, co nepotřebuješ, a zbytek zkopíruj do Košíku nebo do zpráv.</div>
    <button class="btn" id="clr" style="width:100%">${ico('trash')}Vyčistit nákup</button>`
    : `<div class="empty">${ico('cart')}<p>Zatím prázdné.<br>Otevři recept a klepni na košík.</p></div>`}</div>`;
  $$('[data-a]').forEach(b => b.onclick = () => { const s = store.get('shop', []); const x = s.find(y => y.id === b.dataset.id); x.servings = Math.max(1, x.servings + (b.dataset.a === '+' ? 1 : -1)); store.set('shop', s); viewShop(); });
  $$('[data-del]').forEach(b => b.onclick = () => { store.set('shop', store.get('shop', []).filter(y => y.id !== b.dataset.del)); viewShop(); updateShopBadge(); });
  $$('.ings li').forEach(li => li.onclick = () => { const c = store.get('shopChecked', {}); c[li.dataset.k] = !c[li.dataset.k]; store.set('shopChecked', c); li.classList.toggle('got'); });
  const cp = $('#copy'); if (cp) cp.onclick = async () => {
    const c = store.get('shopChecked', {});
    const txt = 'Nákup (bez lepku):\n' + items.filter(([k]) => !c[k]).map(([, it]) => '☐ ' + it.n + (it.a ? ' — ' + line(it) : '')).join('\n');
    try { await navigator.clipboard.writeText(txt); toast('Zkopírováno'); } catch { openSheet(`<h2>Seznam</h2><textarea class="field" style="height:50vh;padding:12px">${esc(txt)}</textarea>`); }
  };
  const cl = $('#clr'); if (cl) cl.onclick = () => { store.set('shop', []); store.set('shopChecked', {}); viewShop(); updateShopBadge(); };
}
function updateShopBadge() { const n = store.get('shop', []).length; const b = $('#shopBadge'); b.hidden = !n; b.textContent = n; }

/* ---------- kitchen ---------- */
function viewKitchen() {
  const groups = [...new Set(K.items.map(i => i.group))];
  app.innerHTML = `<div class="wrap"><header class="page-h"><h1>Moje kuchyně</h1><p>${esc(K.intro)}</p></header>
    ${groups.map(g => `<div class="kgroup"><h2>${esc(g)}</h2>${K.items.filter(i => i.group === g).map(i => {
      const uses = R.filter(r => r.equipment.includes(i.id));
      return `<div class="kitem"><b>${esc(i.name)}</b>${i.note ? `<p>${esc(i.note)}</p>` : ''}${uses.length ? `<div class="uses">${uses.map(r => `<a href="#/r/${r.id}">${esc(r.title)}</a>`).join('')}</div>` : ''}</div>`;
    }).join('')}</div>`).join('')}
    <div class="callout">Něco chybí, nebo se spotřebič chová jinak (třeba rýžovar je hotový za 25 minut)? Napiš to do poznámky u receptu nebo mi to řekni v chatu — doplním to sem i do receptů.</div>
    <section class="panel"><div class="panel-h"><h2>Nastavení</h2></div>
      <p class="small muted" style="margin:0 0 10px">Vaříš jako: <b>${me ? esc(me) : 'nevybráno'}</b> · verze appky ${esc(window.APP_VERSION)}</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm" id="who">Změnit jméno</button><button class="btn sm" id="theme">${ico('sun')}Motiv: ${{ auto: 'podle telefonu', light: 'světlý', dark: 'tmavý' }[store.get('theme', 'auto')]}</button><button class="btn sm" id="notif">Upozornění časovačů</button></div>
    </section></div>`;
  $('#who').onclick = () => askWho();
  $('#theme').onclick = () => { const order = ['auto', 'light', 'dark']; const t = order[(order.indexOf(store.get('theme', 'auto')) + 1) % 3]; store.set('theme', t); applyTheme(); viewKitchen(); };
  $('#notif').onclick = async () => { if (!('Notification' in window)) { toast('Tenhle prohlížeč upozornění neumí'); return; } const p = await Notification.requestPermission(); toast(p === 'granted' ? 'Upozornění zapnutá' : 'Upozornění nejsou povolená'); };
}
function applyTheme() { const t = store.get('theme', 'auto'); if (t === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.dataset.theme = t; }

/* ---------- timers page ---------- */
function viewTimers() {
  ringing = null;
  const list = [...timers].sort((a, b) => timerLeft(a) - timerLeft(b));
  app.innerHTML = `<div class="wrap"><header class="page-h"><h1>Časovače</h1><p>Běží dál, i když appku zavřeš. Po návratu uvidíš správný zbývající čas.</p></header>
    ${list.length ? list.map(t => `<div class="trow ${t.state === 'done' ? 'done' : ''}"><div class="tm" data-tleft="${t.key}">${t.state === 'done' ? 'Hotovo' : mmss(timerLeft(t))}</div>
      <a class="lb" href="#/r/${t.rid}"><b>${esc(t.label)}</b><small>${esc(t.recipe)}</small></a>
      ${t.state !== 'done' ? `<button class="tbtn" data-tkey="${t.key}" data-dur="${t.dur}" data-state="${t.state}" style="margin:0">${ico(t.state === 'run' ? 'pause' : 'play')}<span class="tl" style="display:none"></span></button>` : ''}
      <button class="btn icon sm" data-rm="${t.key}" aria-label="Smazat" style="width:40px">${ico('close')}</button></div>`).join('')
    : `<div class="empty">${ico('timer')}<p>Žádný časovač neběží.<br>Spustíš ho u kroku receptu.</p></div>`}
    <div class="callout"><b>Když zamkneš telefon:</b> čas se počítá dál podle hodin. Zvuk a vibrace ale spolehlivě zazní, jen když je appka otevřená — proto během vaření displej nezhasíná. Na Androidu si povol upozornění, pak přijde i notifikace.</div></div>`;
  $$('.tbtn').forEach(b => b.onclick = () => { const [rid, i] = b.dataset.tkey.split(':'); toggleTimer(rid, +i); viewTimers(); });
  $$('[data-rm]').forEach(b => b.onclick = () => { resetTimer(b.dataset.rm); viewTimers(); });
}

/* ---------- router ---------- */
function go(h) { if (location.hash !== h) location.hash = h; else render(); }
let lastHash = null;
function render(keepScroll) {
  const h = location.hash || '#/';
  const y = scrollY;
  if (h.startsWith('#/r/')) viewRecipe(h.slice(4));
  else if (h.startsWith('#/vareni/')) viewCook(h.slice(9));
  else if (h === '#/nakup') viewShop();
  else if (h === '#/kuchyne') viewKitchen();
  else if (h === '#/casovace') viewTimers();
  else viewHome();
  const tab = h.startsWith('#/nakup') ? 'nakup' : h.startsWith('#/kuchyne') ? 'kuchyne' : h.startsWith('#/casovace') ? 'casovace' : 'recepty';
  $$('.tabbar a').forEach(a => a.classList.toggle('on', a.dataset.tab === tab));
  $('#tabbar').hidden = h.startsWith('#/vareni');
  if (keepScroll === true && lastHash === h) scrollTo(0, y); else if (lastHash !== h) scrollTo(0, 0);
  if (!h.startsWith('#/vareni')) cookFor = null;
  lastHash = h;
  updateShopBadge(); tick(true); syncWake();
}
addEventListener('hashchange', () => render());

/* ---------- schovat prvky, které do stránky vkládá Netlify (lišta / logo) ---------- */
function stripNetlify(root) {
  (root.querySelectorAll ? root.querySelectorAll('body > *:not(#app):not(nav):not(button):not(.toast):not(.sheet):not(.sheet-backdrop):not(form):not(svg):not(script)') : []).forEach(el => {
    const sig = (el.tagName + ' ' + (el.id || '') + ' ' + (typeof el.className === 'string' ? el.className : '') + ' ' + (el.getAttribute('src') || '')).toLowerCase();
    if (sig.includes('netlify')) el.remove();
  });
}
try { stripNetlify(document); new MutationObserver(() => stripNetlify(document)).observe(document.body, { childList: true }); } catch {}

/* ---------- boot ---------- */
applyTheme();
loadOwnPhotos().then(() => {
  render();
  const newOnes = seen ? R.filter(r => isNew(r) || isUpdated(r)) : [];
  if (newOnes.length) toast(newOnes.length === 1 ? `Nové v kuchařce: ${newOnes[0].title}` : `${newOnes.length} nových nebo upravených receptů`);
  if (!seen) markSeen(); else setTimeout(markSeen, 4000);
  flush();
});
})();
