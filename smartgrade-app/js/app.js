// SmartGrade App Controller
window.SGApp = {
    state: {
        mode: 'guided',
        activePage: 'splash',
        projects: [],
        compareGrades: [],
        lastResult: null,
        lastReq: null,
        chatOpen: false,
        chatMessages: [],
        selectedMode: null,
        validationRecords: [],
        expertPendingRequests: [],
        map: null,
        mapMarkers: [],
        currentUser: null,
        // Image upload state
        uploadedImage: null,
        uploadedImageData: null,
        extractedImageInfo: null,
        // Edit requirements state
        editingReq: null,
    },

    init: function () {
        // Load any saved projects
        try { const s = localStorage.getItem('sg_projects'); if (s) this.state.projects = JSON.parse(s); } catch (e) { }
        try { const m = localStorage.getItem('sg_mode'); if (m) this.state.mode = m; } catch (e) { }
        try { const u = localStorage.getItem('sg_user'); if (u) this.state.currentUser = JSON.parse(u); } catch (e) { }
        try { const er = localStorage.getItem('sg_expert_requests'); if (er) this.state.expertPendingRequests = JSON.parse(er); } catch (e) { }
        // Render splash
        document.getElementById('app').innerHTML = SGViews.renderSplash();
    },

    selectMode: function (mode) {
        this.state.selectedMode = mode;
        document.getElementById('mode-guided')?.classList.remove('selected');
        document.getElementById('mode-expert')?.classList.remove('selected');
        document.getElementById('mode-' + mode)?.classList.add('selected');
    },

    enterDemo: function () {
        this.state.mode = this.state.selectedMode || 'guided';
        this.state.currentUser = { name: 'Demo User', email: 'demo@smartgrade.in', initials: 'DM', isDemo: true };
        try { localStorage.setItem('sg_user', JSON.stringify(this.state.currentUser)); } catch (e) { }
        this._enterApp();
    },

    showSignIn: function () {
        alert('Sign-in is not available in the prototype. Continuing as Demo User.');
        this.enterDemo();
    },

    _enterApp: function () {
        this.state.activePage = 'dashboard';
        this._renderShell('dashboard');
        try { localStorage.setItem('sg_mode', this.state.mode); } catch (e) { }
    },

    logout: function () {
        const modal = document.getElementById('logout-modal');
        if (modal) {
            modal.classList.remove('hidden');
        } else {
            if (confirm('Are you sure you want to log out of SmartGrade?')) {
                this.confirmLogout();
            }
        }
    },

    cancelLogout: function () {
        document.getElementById('logout-modal')?.classList.add('hidden');
    },

    confirmLogout: function () {
        // Clear only session/auth state — do NOT delete saved projects
        this.state.currentUser = null;
        this.state.lastResult = null;
        this.state.lastReq = null;
        this.state.chatMessages = [];
        this.state.chatOpen = false;
        this.state.editingReq = null;
        this.state.uploadedImage = null;
        this.state.uploadedImageData = null;
        this.state.extractedImageInfo = null;
        try { localStorage.removeItem('sg_user'); } catch (e) { }
        // Redirect to splash — protected routes will now require re-login
        document.getElementById('app').innerHTML = SGViews.renderSplash();
    },

    _requireAuth: function () {
        if (!this.state.currentUser) {
            document.getElementById('app').innerHTML = SGViews.renderSplash();
            return false;
        }
        return true;
    },

    _renderShell: function (page) {
        if (!this._requireAuth()) return;
        const sidebar = SGViews.renderSidebar(page, this.state.mode);
        const content = this._renderPage(page);
        document.getElementById('app').innerHTML = `
    <div class="app-body">
      ${sidebar}
      <main class="main-content" id="main-content">
        ${content}
      </main>
      <button class="btn btn-icon" id="menu-toggle" onclick="document.getElementById('sidebar').classList.toggle('open')" style="display:none;position:fixed;top:1rem;left:1rem;z-index:200;background:var(--navy);color:#fff;border:none">☰</button>
    </div>
    <!-- Chat FAB -->
    <div id="chat-fab" onclick="SGApp.toggleChat()" title="SmartGrade Assistant" role="button" aria-label="Open chat assistant">💬</div>
    <div id="chat-panel">
      ${SGViews.renderChatPanel?.() || '<div class="chat-header"><div class="chat-avatar">🤖</div><div class="chat-header-info"><div class="chat-header-name">SmartGrade Assistant</div><div class="chat-header-status">RAG · Source-traced</div></div><button onclick="SGApp.toggleChat()" style="background:none;border:none;color:#fff;font-size:1.25rem;cursor:pointer">✕</button></div><div class="chat-messages" id="chat-messages"></div><div class="chat-footer"><input class="chat-input" id="chat-input" placeholder="Ask about a grade, property, or your recommendation…" onkeydown="if(event.key===\'Enter\')SGApp.sendChat()"><button class="btn btn-navy btn-sm" onclick="SGApp.sendChat()">Send</button></div>'}
    </div>
    <!-- Logout Confirm Modal -->
    <div id="logout-modal" class="modal-overlay hidden">
      <div class="modal-box">
        <div class="modal-title">Log Out</div>
        <div class="modal-body">Are you sure you want to log out of SmartGrade?</div>
        <div class="modal-actions">
          <button class="btn btn-outline" onclick="SGApp.cancelLogout()">Cancel</button>
          <button class="btn btn-navy" onclick="SGApp.confirmLogout()">Log Out</button>
        </div>
      </div>
    </div>`;
        this._afterRender(page);
    },

    _renderPage: function (page) {
        switch (page) {
            case 'dashboard': return SGViews.renderDashboard();
            case 'recommend': return SGViews.renderRecommend();
            case 'grades': return SGViews.renderGradeExplorer();
            case 'compare': return SGViews.renderCompare();
            case 'locator': return SGViews.renderLocator();
            case 'history': return SGViews.renderHistory();
            case 'buy': return SGViews.renderBeforeYouBuy();
            case 'report': return SGViews.renderReport();
            case 'visualizer': return SGViews.renderVisualizer();
            case 'property': return SGViews.renderPropertyExplorer();
            case 'validation': return SGViews.renderExpertValidation();
            case 'expert-pending': return SGViews.renderExpertPending();
            default: return SGViews.renderDashboard();
        }
    },

    _afterRender: function (page) {
        if (page === 'locator') this._initMap();
        if (page === 'visualizer') { const first = SG_APPLICATIONS[0]; if (first) SGViews.updateVisualizer(); }
        if (page === 'property') SGViews.updatePropExplorer();
        // Restore chat messages
        const cm = document.getElementById('chat-messages');
        if (cm) {
            if (!this.state.chatMessages.length) {
                this.state.chatMessages = [{ role: 'bot', text: 'Hi! I\'m the SmartGrade Assistant. I can answer questions about stainless steel grades, recommend next steps, or explain any metric in your results. What would you like to know?' }];
            }
            cm.innerHTML = this.state.chatMessages.map(m => SGApp._chatBubble(m)).join('');
            cm.scrollTop = cm.scrollHeight;
        }
        if (this.state.chatOpen) document.getElementById('chat-panel')?.classList.add('open');
    },

    navigate: function (page) {
        if (!this._requireAuth()) return;
        if (this.state.mode === 'guided' && page === 'expert-pending') {
            this.navigate('dashboard');
            return;
        }
        if (this.state.mode === 'expert' && (page === 'buy' || page === 'locator' || page === 'validation')) {
            this.navigate('dashboard');
            return;
        }
        this.state.activePage = page;
        this._renderShell(page);
        window.scrollTo(0, 0);
    },

    toggleMode: function () {
        this.state.mode = this.state.mode === 'guided' ? 'expert' : 'guided';
        try { localStorage.setItem('sg_mode', this.state.mode); } catch (e) { }
        this.navigate('recommend');
    },

    /* ── IMAGE UPLOAD ─────────────────────────────────────────── */
    handleImageUpload: function (input) {
        const file = input.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            this.state.uploadedImage = file.name;
            this.state.uploadedImageData = e.target.result;
            this.state.extractedImageInfo = null;
            this._showImagePreview();
        };
        reader.readAsDataURL(file);
    },

    _showImagePreview: function () {
        const previewEl = document.getElementById('img-preview-wrap');
        if (!previewEl) return;
        previewEl.innerHTML = `
      <div class="img-preview-box">
        <img src="${this.state.uploadedImageData}" alt="Uploaded" class="img-preview-thumb" id="uploaded-thumb">
        <div class="img-preview-meta">
          <div style="font-weight:600;font-size:0.82rem;color:var(--navy)">${this.state.uploadedImage}</div>
          <div style="font-size:0.75rem;color:var(--text-soft)">Image ready for analysis</div>
          <div class="flex gap-2" style="margin-top:0.5rem">
            <button class="btn btn-outline btn-sm" onclick="SGApp.extractImageInfo()">🔍 Analyse Image</button>
            <button class="btn btn-outline btn-sm" onclick="SGApp.removeImage()">✕ Remove</button>
          </div>
        </div>
      </div>`;
    },

    removeImage: function () {
        this.state.uploadedImage = null;
        this.state.uploadedImageData = null;
        this.state.extractedImageInfo = null;
        const previewEl = document.getElementById('img-preview-wrap');
        if (previewEl) previewEl.innerHTML = '';
        const input = document.getElementById('img-upload-input');
        if (input) input.value = '';
    },

    extractImageInfo: function () {
        const previewEl = document.getElementById('img-preview-wrap');
        if (!previewEl) return;
        previewEl.innerHTML += `<div id="img-extract-status" style="margin-top:0.5rem;font-size:0.8rem;color:var(--orange)">⟳ Analysing image…</div>`;
        // Simulate extraction (in production this would call a vision API)
        setTimeout(() => {
            // Simulated extraction based on image filename pattern
            const name = (this.state.uploadedImage || '').toLowerCase();
            let extracted = {};
            if (name.includes('coastal') || name.includes('marine')) {
                extracted = { application: 'Coastal/Marine Structure', environment: 'Chloride/Marine', notes: 'Image shows coastal infrastructure with salt-air exposure' };
            } else if (name.includes('chemical') || name.includes('process')) {
                extracted = { application: 'Chemical Processing', environment: 'Chemical/Acid', notes: 'Image shows process/chemical equipment' };
            } else if (name.includes('food') || name.includes('kitchen')) {
                extracted = { application: 'Food Processing', environment: 'Food-grade', notes: 'Image shows food processing or kitchen environment' };
            } else if (name.includes('pharma') || name.includes('pharmaceutical')) {
                extracted = { application: 'Pharmaceutical Equipment', environment: 'Hygienic/sterile', notes: 'Image shows pharmaceutical or medical equipment' };
            } else if (name.includes('auto') || name.includes('exhaust')) {
                extracted = { application: 'Automotive Exhaust', environment: 'High temperature/exhaust', notes: 'Image shows automotive exhaust components' };
            } else if (name.includes('high_temp') || name.includes('high-temp') || name.includes('furnace')) {
                extracted = { application: 'High-Temperature Equipment', environment: 'High temperature/oxidising', notes: 'Image shows high-temperature industrial environment' };
            } else if (name.includes('railway') || name.includes('train')) {
                extracted = { application: 'Railway/Transport', environment: 'Outdoor/mechanical', notes: 'Image shows railway or transport application' };
            } else if (name.includes('water') || name.includes('sewage')) {
                extracted = { application: 'Water/Sewage Infrastructure', environment: 'Aqueous/wet', notes: 'Image shows water treatment or sewage infrastructure' };
            } else if (name.includes('offshore') || name.includes('chloride')) {
                extracted = { application: 'Offshore/Chloride Environment', environment: 'Offshore/High chloride', notes: 'Image shows offshore or chloride-heavy environment' };
            } else if (name.includes('desalin') || name.includes('seawater')) {
                extracted = { application: 'Seawater/Desalination', environment: 'High chloride/seawater', notes: 'Image shows desalination or seawater processing plant' };
            } else if (name.includes('sulfuric') || name.includes('fgd')) {
                extracted = { application: 'Sulfuric Acid/FGD Equipment', environment: 'Aggressive acid/sulfuric', notes: 'Image shows acid or FGD equipment' };
            } else {
                extracted = { application: 'Industrial Equipment (image analysed)', environment: 'Industrial', notes: 'Image analysed — please confirm or specify the environment' };
            }
            this.state.extractedImageInfo = extracted;
            const status = document.getElementById('img-extract-status');
            if (status) status.remove();
            const previewEl2 = document.getElementById('img-preview-wrap');
            if (previewEl2) {
                previewEl2.querySelector('.img-preview-meta').insertAdjacentHTML('beforeend', `
          <div id="img-extracted-info" style="margin-top:0.5rem;padding:0.5rem 0.75rem;background:#F0FEF8;border-radius:4px;border:1px solid #86EFAC">
            <div style="font-size:0.72rem;font-weight:700;color:var(--success);text-transform:uppercase;margin-bottom:0.2rem">✓ Extracted from Image</div>
            <div style="font-size:0.78rem;color:var(--text-mid)"><strong>App:</strong> ${extracted.application}</div>
            <div style="font-size:0.78rem;color:var(--text-mid)"><strong>Environment:</strong> ${extracted.environment}</div>
            <div style="font-size:0.75rem;color:var(--text-soft);margin-top:0.2rem;font-style:italic">${extracted.notes}</div>
          </div>`);
            }
        }, 1800);
    },

    /* ── RECOMMENDATION ────────────────────────────────────────── */
    runRecommendation: function () {
        const nlText = (document.getElementById('nl-input')?.value || '').trim();
        const q1 = document.getElementById('guided-q1')?.value || '';
        const q2 = document.getElementById('guided-q2')?.value || '';
        const q3 = document.getElementById('guided-q3')?.value || '';
        const q4 = document.getElementById('guided-q4')?.value || '';
        const q5 = document.getElementById('guided-q5')?.value || '';
        const q6 = document.getElementById('guided-q6')?.value || ''; // temperature
        const q7 = document.getElementById('guided-q7')?.value || ''; // cost
        const q8 = document.getElementById('guided-q8')?.value || ''; // corrosion
        const q9 = document.getElementById('guided-q9')?.value || ''; // fabrication

        // Build combined text from all inputs including image extraction
        const imageParts = [];
        if (this.state.extractedImageInfo) {
            const ei = this.state.extractedImageInfo;
            if (ei.application) imageParts.push(`Application from image: ${ei.application}`);
            if (ei.environment) imageParts.push(`Environment from image: ${ei.environment}`);
        }

        const textParts = [
            nlText,
            q1 ? `Application: ${q1}` : '',
            q2 ? `Environment: ${q2}` : '',
            q3 && q3 !== 'Not sure' ? `Welding: ${q3}` : '',
            q4 && q4 !== 'Not sure' ? `Strength: ${q4}` : '',
            q5 ? `Priority: ${q5}` : '',
            q6 && q6 !== 'Not specified' ? `Temperature: ${q6}` : '',
            q7 && q7 !== 'Not specified' ? `Cost requirement: ${q7}` : '',
            q8 && q8 !== 'Not specified' ? `Corrosion requirement: ${q8}` : '',
            q9 && q9 !== 'Not specified' ? `Fabrication: ${q9}` : '',
            ...imageParts
        ].filter(Boolean).join('. ') || 'demo coastal welded structural component';

        const req = SmartGradeEngine.extractRequirements(textParts);
        req.imageInfo = this.state.extractedImageInfo;
        req.hasImage = !!this.state.uploadedImage;
        req.imageName = this.state.uploadedImage;

        this.state.lastReq = req;
        this.state.editingReq = null;

        const ws = document.getElementById('rec-workspace');
        if (!ws) return;
        ws.innerHTML = this._loadingHTML('Extracting engineering requirements…', ['Parsing natural language…', 'Processing image information…', 'Mapping to engineering constraints…', 'Preparing requirement profile…']);
        setTimeout(() => { ws.innerHTML = SGViews.renderRequirementProfile(req); }, 1200);
    },

    editRequirements: function () {
        // Set editing flag so guidedInputPane can restore values
        this.state.editingReq = this.state.lastReq;
        const ws = document.getElementById('rec-workspace');
        if (!ws) return;
        ws.innerHTML = SGViews.recommendStep1(SGApp.state.mode);
        // Restore previous values
        this._restoreInputValues();
    },

    _restoreInputValues: function () {
        const req = this.state.editingReq;
        if (!req) return;
        // Restore NL text
        const nlInput = document.getElementById('nl-input');
        if (nlInput && req.rawText) nlInput.value = req.rawText;
        // Restore guided questions from extractedFacts
        if (req.extractedFacts) {
            req.extractedFacts.forEach(f => {
                if (f.label === 'Application') {
                    const el = document.getElementById('guided-q1');
                    if (el && !f.value.includes('Not clearly')) el.value = f.value;
                }
                if (f.label === 'Environment') {
                    const el = document.getElementById('guided-q2');
                    if (el) el.value = f.value;
                }
            });
        }
        if (req.weldingRequired) {
            const el = document.getElementById('guided-q3');
            if (el) el.value = 'Yes';
        }
        if (req.strengthLevel === 'high') {
            const el = document.getElementById('guided-q4');
            if (el) el.value = 'High / Structural';
        }
        if (req.costPriority) {
            const el = document.getElementById('guided-q5');
            if (el) el.value = req.costPriority === 'cost-optimized' ? 'Cost then performance' : req.costPriority === 'performance-first' ? 'Performance above all' : 'Balanced';
        }
        if (req.tempCategory) {
            const el = document.getElementById('guided-q6');
            if (el) el.value = req.tempCategory === 'high' ? 'High (> 400°C)' : req.tempCategory === 'moderate' ? 'Moderate (100–400°C)' : 'Ambient (< 100°C)';
        }
        // Restore image if still in state
        if (this.state.uploadedImageData) {
            this._showImagePreview();
        }
    },

    runExpertRecommendation: function () {
        const appId = document.getElementById('exp-app')?.value || '';
        const envText = document.getElementById('exp-env')?.value || '';
        const temp = document.getElementById('exp-temp')?.value || '';
        const ysText = document.getElementById('exp-ys')?.value || '';
        const weld = document.getElementById('exp-weld')?.value || 'Yes';
        const form = document.getElementById('exp-form')?.value || '';
        const weights = {
            engineering: parseFloat(document.getElementById('w-eng')?.value || 0.3),
            corrosion: parseFloat(document.getElementById('w-cor')?.value || 0.25),
            fabrication: parseFloat(document.getElementById('w-fab')?.value || 0.2),
            cost: parseFloat(document.getElementById('w-cost')?.value || 0.15),
            evidence: parseFloat(document.getElementById('w-ev')?.value || 0.1),
        };
        const app = SG_APPLICATIONS.find(a => a.application_id === appId);
        const combined = [app ? `Application: ${app.name}` : '', envText ? `Environment: ${envText}` : '', temp ? `Temperature: ${temp}` : '', ysText ? `Yield strength: ${ysText}` : '', `Welding: ${weld}`, form ? `Product form: ${form}` : ''].filter(Boolean).join('. ');
        const req = SmartGradeEngine.extractRequirements(combined || 'industrial application welded');
        req.customWeights = weights;
        this.state.lastReq = req;
        this.state.editingReq = null;
        const ws = document.getElementById('rec-workspace');
        if (!ws) return;
        ws.innerHTML = this._loadingHTML('Running engineering analysis…', ['Applying hard filters…', 'Ranking by weighted criteria…', 'Preparing results…']);
        setTimeout(() => { ws.innerHTML = SGViews.renderRequirementProfile(req); }, 1000);
    },

    confirmAndRecommend: function () {
        const req = this.state.lastReq;
        if (!req) return;
        const ws = document.getElementById('rec-workspace');
        if (!ws) return;
        ws.innerHTML = this._loadingHTML('Running SmartGrade engine…', ['Stage 1: Application filter…', 'Stage 2: Corrosion filter…', 'Stage 3: Temperature filter…', 'Stage 4: Strength filter…', 'Stage 5: Fabrication filter…', 'Stage 6: Product form filter…', 'Ranking candidates…']);
        setTimeout(() => {
            const result = SmartGradeEngine.recommend(req);
            if (result) {
                this.state.lastResult = result;
                ws.innerHTML = SGViews.renderResults(result, req);
            } else {
                ws.innerHTML = `<div style="text-align:center;padding:3rem;background:var(--white);border-radius:var(--radius);border:1px solid var(--border)">
          <div style="font-size:2.5rem;margin-bottom:1rem">⚠️</div>
          <div style="font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:0.5rem">No Grades Passed Hard Filtering</div>
          <div style="font-size:0.85rem;color:var(--text-soft);max-width:380px;margin:0 auto">The engineering constraints you specified eliminated all grades from consideration. Try relaxing one constraint (e.g., temperature range or strength requirement) and try again.</div>
          <button class="btn btn-primary" style="margin-top:1.5rem" onclick="SGApp.editRequirements()">← Edit Requirements</button>
        </div>`;
            }
        }, 2000);
    },

    runDemoScenario: function () {
        const demoText = 'I need a welded component for an outdoor coastal structure. It should have high strength and good corrosion resistance. Cost is important but performance matters.';
        const req = SmartGradeEngine.extractRequirements(demoText);
        this.state.lastReq = req;
        this._renderShell('recommend');
        const ws = document.getElementById('rec-workspace');
        if (!ws) return;
        ws.innerHTML = this._loadingHTML('Loading demo scenario…', ['Parsing requirements…', 'Running engine…', 'Ranking grades…']);
        setTimeout(() => {
            const result = SmartGradeEngine.recommend(req);
            this.state.lastResult = result;
            ws.innerHTML = SGViews.renderResults(result, req);
        }, 2000);
    },

    runRailwayDemo: function () {
        const demoText = 'Railway rail car body panels and structural frame. High strength required, welding needed. Outdoor and industrial atmosphere, moderate corrosion resistance needed. Weight efficiency important. Formability required for body panels.';
        const req = SmartGradeEngine.extractRequirements(demoText);
        req.rawText = demoText;
        req.applicationId = 'APP005';
        req.environment = 'outdoor / industrial atmosphere / mechanical loading';
        req.weldingRequired = true;
        req.strengthLevel = 'high';
        req.extractedFacts = [
            { label: 'Application', value: 'Railway / Transport', confidence: 'High' },
            { label: 'Environment', value: 'Outdoor · Industrial atmosphere · Mechanical loading', confidence: 'High' },
            { label: 'Weldability', value: 'Welding required', confidence: 'High' },
            { label: 'Strength', value: 'High strength required', confidence: 'High' },
            { label: 'Fabrication', value: 'Good formability needed for body panels', confidence: 'High' },
            { label: 'Operating Temperature', value: 'Ambient / moderate', confidence: 'Medium' },
            { label: 'Cost Priority', value: 'Weight efficiency & cost balance', confidence: 'Medium' },
        ];
        this.state.lastReq = req;
        this.state.editingReq = null;
        this._renderShell('recommend');
        const ws = document.getElementById('rec-workspace');
        if (!ws) return;
        ws.innerHTML = this._loadingHTML('Loading Railway Demo…', ['Parsing requirements…', 'Running engine…', 'Ranking grades…']);
        setTimeout(() => {
            const result = SmartGradeEngine.recommend(req);
            this.state.lastResult = result;
            ws.innerHTML = SGViews.renderResults(result, req);
        }, 2000);
    },

    _loadingHTML: function (title, steps) {
        return `<div class="card"><div class="loader-wrap">
      <div class="spinner"></div>
      <div style="font-weight:700;color:var(--navy)">${title}</div>
      <div class="loader-steps">
        ${steps.map((s, i) => `<div class="loader-step ${i === 0 ? 'active' : ''}" id="ls-${i}">
          <span>${i === 0 ? '⟳' : '○'}</span> ${s}
        </div>`).join('')}
      </div>
    </div></div>`;
    },

    /* ── COMPARE ───────────────────────────────────────────────── */
    addToCompare: function (gradeId) {
        if (!this.state.compareGrades.includes(gradeId)) {
            if (this.state.compareGrades.length >= 3) this.state.compareGrades.shift();
            this.state.compareGrades.push(gradeId);
        }
    },
    addSelectedToCompare: function () {
        const sel = document.getElementById('compare-add-sel')?.value;
        if (sel) { this.addToCompare(sel); this.navigate('compare'); }
    },
    clearCompare: function () { this.state.compareGrades = []; this.navigate('compare'); },

    /* ── MAP ────────────────────────────────────────────────────── */
    _initMap: function () {
        if (typeof L === 'undefined') { document.getElementById('map').innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text-soft)">Map requires Leaflet.js. Enable internet access or check CDN.</div>'; return; }
        if (this.state.map) { try { this.state.map.remove(); } catch (e) { } this.state.map = null; }
        const map = L.map('map').setView([20.5937, 78.9629], 5);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors', maxZoom: 18 }).addTo(map);
        this.state.map = map;
        this.state.mapMarkers = [];
        const icon = L.divIcon({ className: '', html: '<div style="background:var(--orange,#E8601C);border:3px solid #fff;border-radius:50%;width:14px;height:14px;box-shadow:0 2px 4px rgba(0,0,0,.3)"></div>', iconSize: [14, 14], iconAnchor: [7, 7] });
        SG_LOCATIONS.forEach(loc => {
            const m = L.marker([loc.lat, loc.lon], { icon }).addTo(map)
                .bindPopup(`<b>${loc.city}, ${loc.state}</b><br>${loc.type}<br><small>${loc.address}</small>${loc.phone ? '<br>📞 ' + loc.phone : ''}${loc.email ? '<br>✉️ ' + loc.email : ''}`);
            this.state.mapMarkers.push({ id: loc.id, marker: m });
        });
    },

    selectLocation: function (id, lat, lon) {
        document.querySelectorAll('.location-item').forEach(el => el.classList.remove('active'));
        document.getElementById('loc-' + id)?.classList.add('active');
        if (this.state.map && lat && lon) {
            this.state.map.setView([lat, lon], 13);
            const entry = this.state.mapMarkers.find(m => m.id === id);
            if (entry) entry.marker.openPopup();
        }
    },

    /* ── PROJECTS ────────────────────────────────────────────────── */
    saveProject: function () {
        const top = this.state.lastResult?.bestFit?.[0];
        const name = prompt('Project name:', 'Project ' + new Date().toLocaleDateString());
        if (!name) return;
        const project = {
            id: 'proj-' + Date.now(),
            name,
            mode: this.state.mode,
            date: new Date().toLocaleDateString('en-IN'),
            version: '1',
            topGrade: top?.grade?.grade_name || null,
            req: this.state.lastReq,
            result: this.state.lastResult ? {
                filteredCount: this.state.lastResult.filteredCount,
                topGrades: (this.state.lastResult.bestFit || []).slice(0, 3).map(r => ({
                    gradeName: r.grade.grade_name,
                    family: r.grade.family,
                    fitScore: r.fitScore,
                    costBand: r.grade.cost_band,
                }))
            } : null,
            expertValidation: null,
        };
        this.state.projects.push(project);
        try { localStorage.setItem('sg_projects', JSON.stringify(this.state.projects)); } catch (e) { }
        alert('Project saved: ' + name);
    },

    loadProject: function (id) {
        const p = this.state.projects.find(x => x.id === id);
        if (!p) return;
        if (p.req) {
            this.state.lastReq = p.req;
            this.state.mode = p.mode;
            const result = SmartGradeEngine.recommend(p.req);
            this.state.lastResult = result;
        }
        this.navigate('recommend');
        const ws = document.getElementById('rec-workspace');
        if (ws && this.state.lastResult) ws.innerHTML = SGViews.renderResults(this.state.lastResult, this.state.lastReq);
    },

    /* ── EXPERT VALIDATION ───────────────────────────────────────── */
    submitForExpertValidation: function (projectId) {
        const p = projectId ? this.state.projects.find(x => x.id === projectId) : null;
        const req = p ? p.req : this.state.lastReq;
        const result = p ? SmartGradeEngine.recommend(req) : this.state.lastResult;
        if (!req) { alert('No active project or recommendation to submit. Please run a recommendation first.'); return; }

        const note = document.getElementById('val-note')?.value?.trim() || '';
        const gradeId = document.getElementById('val-grade')?.value || '';
        const grade = gradeId ? SG_GRADES.find(g => g.grade_id === gradeId)?.grade_name : null;

        const top = result?.bestFit?.[0];
        const request = {
            id: 'req-' + Date.now(),
            projectId: p?.id || null,
            projectName: p?.name || (req.rawText?.substring(0, 60) || 'Untitled case'),
            submittedDate: new Date().toLocaleDateString('en-IN'),
            submittedTime: new Date().toLocaleTimeString('en-IN'),
            status: 'pending',
            note,
            userNote: note,
            req: req,
            result: result ? {
                filteredCount: result.filteredCount,
                topGrades: (result.bestFit || []).slice(0, 3).map(r => ({
                    gradeName: r.grade.grade_name,
                    family: r.grade.family,
                    fitScore: r.fitScore,
                    costBand: r.grade.cost_band,
                    summary: r.grade.summary,
                })),
                allFiltered: result.allFiltered?.length || 0,
            } : null,
            smartGradeTopRecommendation: top ? {
                gradeName: top.grade.grade_name,
                family: top.grade.family,
                fitScore: top.fitScore,
                costBand: top.grade.cost_band,
            } : null,
            imageInfo: req.imageInfo || null,
        };

        this.state.expertPendingRequests.push(request);
        try { localStorage.setItem('sg_expert_requests', JSON.stringify(this.state.expertPendingRequests)); } catch (e) { }

        // Update project if exists
        if (p) {
            p.expertValidation = { requestId: request.id, status: 'pending', submittedDate: request.submittedDate };
            try { localStorage.setItem('sg_projects', JSON.stringify(this.state.projects)); } catch (e) { }
        }

        alert('✓ Submitted for Expert Validation. The expert will receive the complete case context and it will appear in Expert Mode → Pending / Need Attention.');
        this.navigate('validation');
    },

    submitValidation: function () {
        this.submitForExpertValidation(null);
    },

    /* ── EXPERT MODE ─────────────────────────────────────────────── */
    openExpertRequest: function (requestId) {
        const req = this.state.expertPendingRequests.find(r => r.id === requestId);
        if (!req) return;
        const panel = document.getElementById('expert-req-detail');
        if (!panel) return;
        panel.innerHTML = SGViews.renderExpertRequestDetail(req);
        panel.classList.remove('hidden');
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    resolveExpertRequest: function (requestId) {
        const req = this.state.expertPendingRequests.find(r => r.id === requestId);
        if (!req) return;
        const noteEl = document.getElementById('expert-note-' + requestId);
        const gradeEl = document.getElementById('expert-grade-' + requestId);
        const note = noteEl?.value?.trim() || '';
        const gradeId = gradeEl?.value || '';
        const grade = gradeId ? SG_GRADES.find(g => g.grade_id === gradeId)?.grade_name : null;
        req.status = 'reviewed';
        req.expertNote = note;
        req.expertGrade = grade;
        req.reviewedDate = new Date().toLocaleDateString('en-IN');
        try { localStorage.setItem('sg_expert_requests', JSON.stringify(this.state.expertPendingRequests)); } catch (e) { }
        this.navigate('expert-pending');
    },

    /* ── CHAT ────────────────────────────────────────────────────── */
    toggleChat: function () {
        this.state.chatOpen = !this.state.chatOpen;
        document.getElementById('chat-panel')?.classList.toggle('open', this.state.chatOpen);
    },

    sendChat: function () {
        const input = document.getElementById('chat-input');
        const msg = input?.value?.trim();
        if (!msg) return;
        input.value = '';
        this.state.chatMessages.push({ role: 'user', text: msg });
        const cm = document.getElementById('chat-messages');
        if (cm) { cm.innerHTML = this.state.chatMessages.map(m => this._chatBubble(m)).join(''); cm.scrollTop = cm.scrollHeight; }
        // RAG response
        setTimeout(() => {
            const reply = SmartGradeEngine.chatResponse(msg, { recommendationResult: this.state.lastResult, grades: SG_GRADES, properties: SG_PROPERTIES, sustainability: SG_SUSTAINABILITY });
            this.state.chatMessages.push({ role: 'bot', text: reply.text, sources: reply.sources });
            const cm2 = document.getElementById('chat-messages');
            if (cm2) { cm2.innerHTML = this.state.chatMessages.map(m => this._chatBubble(m)).join(''); cm2.scrollTop = cm2.scrollHeight; }
        }, 600);
    },

    _chatBubble: function (m) {
        return `<div class="chat-msg ${m.role}">
      <div class="chat-bubble">${m.text}</div>
      ${m.sources && m.sources.length ? `<div class="chat-sources">${m.sources.map(s => `<span class="source-chip">📄 ${s}</span>`).join('')}</div>` : ''}
    </div>`;
    },
};

// Init on load
window.addEventListener('DOMContentLoaded', () => SGApp.init());
