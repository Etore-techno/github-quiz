/* Transport Google Apps Script : pont iframe, confirmation, versions et relance idempotente. */
(() => {
  'use strict';
  const uuid = () => crypto.randomUUID ? crypto.randomUUID() : Array.from(crypto.getRandomValues(new Uint8Array(24)), n => n.toString(16).padStart(2, '0')).join('');
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  class Bridge {
    constructor(url) { this.url = url; this.pending = new Map(); this.connection = null; this.frame = null; this.target = null; }
    connect() {
      if (this.connection) return this.connection;
      this.channel = uuid();
      this.connection = new Promise((resolve, reject) => {
        const timer = setTimeout(() => { this.reset(); reject(new Error('Connexion à Google impossible. Vérifiez Internet et la configuration du service.')); }, 25000);
        this.listener = event => {
          const data = event.data;
          const trustedOrigin = event.origin === 'https://script.google.com' || /^https:\/\/[a-z0-9-]+\.googleusercontent\.com$/.test(event.origin);
          if (!trustedOrigin || !data || data.quizBridge !== 1 || data.channel !== this.channel) return;
          if (data.type === 'ready' && !this.target) {
            this.target = event.source; this.origin = event.origin; clearTimeout(timer); resolve(); return;
          }
          if (event.source !== this.target || event.origin !== this.origin || data.type !== 'response') return;
          const pending = this.pending.get(data.id);
          if (!pending) return;
          clearTimeout(pending.timer); this.pending.delete(data.id); pending.resolve(data.result);
        };
        window.addEventListener('message', this.listener);
        this.frame = document.createElement('iframe');
        this.frame.title = 'Connexion de sauvegarde'; this.frame.hidden = true;
        const src = new URL(this.url); src.searchParams.set('channel', this.channel);
        this.frame.src = src.href; document.body.append(this.frame);
      });
      return this.connection;
    }
    reset() {
      if (this.listener) window.removeEventListener('message', this.listener);
      if (this.frame) this.frame.remove();
      for (const entry of this.pending.values()) { clearTimeout(entry.timer); entry.reject(new Error('Connexion interrompue. Réessayez.')); }
      this.pending.clear(); this.connection = null; this.target = null;
    }
    async request(request) {
      await this.connect();
      return new Promise((resolve, reject) => {
        const id = uuid();
        const timer = setTimeout(() => { this.pending.delete(id); this.reset(); reject(new Error('La sauvegarde n’a pas été confirmée. Réessayez avant de continuer.')); }, 25000);
        this.pending.set(id, {resolve, reject, timer});
        this.target.postMessage({quizBridge: 1, channel: this.channel, type: 'request', id, request}, this.origin);
      });
    }
  }

  window.QuizSave = class {
    constructor(activityId, activityName, hooks) {
      this.activityId = activityId; this.activityName = activityName; this.hooks = hooks;
      this.identity = null; this.busy = false; this.pendingSave = null; this.conflict = false;
      this.status = ''; this.statusKind = 'info';
      const url = window.QUIZ_SAVE_CONFIG?.scriptUrl || '';
      this.configured = /^https:\/\/script\.google\.com\/macros\/s\/[a-zA-Z0-9_-]+\/exec$/.test(url);
      if (this.configured) this.bridge = new Bridge(url);
      window.addEventListener('beforeunload', event => {
        if (this.busy || this.pendingSave) { event.preventDefault(); event.returnValue = ''; }
      });
    }
    get blocked() { return this.busy || !!this.pendingSave; }
    showLogin() {
      this.identity = null;
      document.getElementById('app').innerHTML = `<section class="login-panel">
        <div class="login-activity">Séquence 1 · ${escape(this.activityName)}</div>
        <h1>Votre classe, votre groupe</h1>
        <p>Choisissez le groupe indiqué par votre professeur.<br>Votre progression sera retrouvée si vous avez déjà commencé.</p>
        <form id="quizLogin"><div class="login-fields">
          <label>Classe
            <div class="login-dropdown" data-input="quizClass">
              <button class="login-dropdown-toggle" type="button" aria-haspopup="listbox" aria-expanded="false">Choisir la classe</button>
              <div class="login-dropdown-menu" role="listbox" hidden>${[1,2,3,4,5].map(n => `<button type="button" role="option" data-value="5e${n}">5e${n}</button>`).join('')}</div>
            </div>
            <input id="quizClass" type="hidden" value="">
          </label>
          <label>Groupe
            <div class="login-dropdown" data-input="quizGroup">
              <button class="login-dropdown-toggle" type="button" aria-haspopup="listbox" aria-expanded="false">Choisir le groupe</button>
              <div class="login-dropdown-menu" role="listbox" hidden>${[1,2,3,4,5,6].map(n => `<button type="button" role="option" data-value="${n}">Groupe ${n}</button>`).join('')}</div>
            </div>
            <input id="quizGroup" type="hidden" value="">
          </label>
        </div><button class="action primary" id="quizLoginButton" type="submit">Commencer / Reprendre</button></form>
        <p id="quizLoginStatus" role="status" aria-live="polite">${this.configured ? 'Un autre navigateur ? Sélectionnez simplement la même classe et le même groupe.' : 'La sauvegarde n’est pas encore configurée. Le professeur doit suivre le guide d’installation.'}</p>
        <p class="login-note">Chaque activité possède sa propre sauvegarde.</p>
      </section>`;
      document.getElementById('quizLoginButton').disabled = !this.configured;
      document.querySelectorAll('.login-dropdown').forEach(dropdown => {
        const input = document.getElementById(dropdown.dataset.input);
        const toggle = dropdown.querySelector('.login-dropdown-toggle');
        const menu = dropdown.querySelector('.login-dropdown-menu');
        const close = () => { dropdown.classList.remove('open'); menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); };
        toggle.addEventListener('click', () => {
          const open = !dropdown.classList.contains('open');
          document.querySelectorAll('.login-dropdown.open').forEach(other => {
            if (other !== dropdown) {
              other.classList.remove('open');
              other.querySelector('.login-dropdown-menu').hidden = true;
              other.querySelector('.login-dropdown-toggle').setAttribute('aria-expanded', 'false');
            }
          });
          dropdown.classList.toggle('open', open); menu.hidden = !open; toggle.setAttribute('aria-expanded', String(open));
        });
        menu.querySelectorAll('[data-value]').forEach(option => option.addEventListener('click', () => {
          input.value = option.dataset.value; toggle.textContent = option.textContent; close();
        }));
        dropdown.addEventListener('focusout', () => requestAnimationFrame(() => {
          if (!dropdown.contains(document.activeElement)) close();
        }));
      });
      document.getElementById('quizLogin').addEventListener('submit', async event => {
        event.preventDefault(); if (this.busy || !this.configured) return;
        const className = document.getElementById('quizClass').value, group = Number(document.getElementById('quizGroup').value);
        if (!/^5e[1-5]$/.test(className) || group < 1 || group > 6) return;
        const button = document.getElementById('quizLoginButton'), message = document.getElementById('quizLoginStatus');
        this.busy = true; button.disabled = true; message.textContent = 'Recherche de votre progression…';
        try {
          const identity = {activityId: this.activityId, className, group};
          const result = await this.bridge.request({...identity, action: 'load'});
          if (!result?.ok) throw new Error(result?.message || 'Impossible de charger la progression.');
          this.identity = identity; this.revision = result.revision; this.busy = false;
          this.status = result.state ? 'Progression retrouvée' : 'Nouvelle activité'; this.statusKind = 'ok';
          this.hooks.open(result.state);
          // La première sauvegarde fixe notamment l'ordre aléatoire des questions.
          if (!result.state) await this.save(this.hooks.snapshot());
        } catch (error) {
          this.identity = null; this.busy = false;
          if (!document.getElementById('quizLoginStatus')) this.showLogin();
          document.getElementById('quizLoginStatus').textContent = error.message;
          document.getElementById('quizLoginButton').disabled = false;
        }
      });
    }
    mount() {
      const bar = document.getElementById('saveBar'); if (!bar || !this.identity) return;
      bar.innerHTML = `<strong>${escape(this.identity.className)} · Groupe ${this.identity.group}</strong>
        <button type="button" class="save-link" id="changeGroup">Changer de groupe</button>
        <span id="saveStatus" role="status" aria-live="polite"></span>
        <button type="button" class="save-link" id="retrySave" hidden>Réessayer</button>
        <button type="button" class="save-link" id="reloadSave" hidden>Recharger la progression</button>`;
      document.getElementById('changeGroup').addEventListener('click', () => {
        if (this.blocked) return;
        if (confirm('Changer de groupe ? Les changements depuis la dernière validation ne seront pas conservés.')) this.showLogin();
      });
      document.getElementById('retrySave').addEventListener('click', () => this.retry());
      document.getElementById('reloadSave').addEventListener('click', () => this.reload());
      this.paint();
    }
    paint() {
      const label = document.getElementById('saveStatus');
      if (label) { label.textContent = this.status; label.className = 'save-status ' + this.statusKind; }
      const retry = document.getElementById('retrySave'), reload = document.getElementById('reloadSave'), change = document.getElementById('changeGroup');
      if (retry) { retry.hidden = !this.pendingSave || this.conflict || this.busy; retry.disabled = this.busy; }
      if (reload) { reload.hidden = !this.conflict; reload.disabled = this.busy; }
      if (change) change.disabled = this.blocked;
      this.hooks.lock(this.blocked);
    }
    async save(state) {
      if (!this.identity || this.blocked) return;
      this.pendingSave = {...this.identity, action: 'save', revision: this.revision, requestId: uuid(), state};
      await this.retry();
    }
    async retry() {
      if (!this.pendingSave || this.busy || this.conflict) return;
      this.busy = true; this.status = 'Enregistrement…'; this.statusKind = 'info'; this.paint();
      try {
        const result = await this.bridge.request(this.pendingSave);
        if (!result?.ok) {
          this.conflict = result?.code === 'CONFLICT';
          throw new Error(result?.message || 'La sauvegarde n’a pas été confirmée. Réessayez.');
        }
        this.revision = result.revision; this.pendingSave = null;
        this.status = 'Progression enregistrée'; this.statusKind = 'ok';
      } catch (error) { this.status = error.message; this.statusKind = 'error'; }
      finally { this.busy = false; this.paint(); }
    }
    async reload() {
      if (this.busy || !this.identity) return;
      this.busy = true; this.status = 'Chargement de la dernière progression…'; this.paint();
      try {
        const result = await this.bridge.request({...this.identity, action: 'load'});
        if (!result?.ok) throw new Error(result?.message || 'Chargement impossible.');
        this.hooks.open(result.state);
        this.revision = result.revision; this.pendingSave = null; this.conflict = false;
        this.status = 'Progression retrouvée'; this.statusKind = 'ok';
      } catch (error) { this.status = error.message; this.statusKind = 'error'; }
      finally { this.busy = false; this.paint(); }
    }
  };
})();
