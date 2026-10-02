// SmartGrade App — Views module 2
// Contains: Recommend, Locator, History, Report, Before You Buy, Visualizer, Property Explorer, Expert Validation, Expert Pending

/* ── VISUALIZER ASSET MAP ──────────────────────────────────────── */
// Maps application IDs to the provided v3 image filenames
const SG_VIZ_IMAGES = {
    "APP001": "images/01_coastal_structure.jpg",
    "APP002": "images/02_chemical_processing.jpg",
    "APP003": "images/03_food_processing.jpg",
    // APP004 = Automotive exhaust — approximate mapping
    "APP004": "images/05_automotive_exhaust.jpg",
    // APP005 = Railway — use high-temperature as industrial proxy (no dedicated railway image)
    "APP005": "images/06_high_temperature.jpg",
    "APP006": "images/06_high_temperature.jpg",
    // APP007 = Architecture/Facades — indoor appliance is closest visual match
    "APP007": "images/07_indoor_appliance.jpg",
    // APP008 = Pulp/Paper Aggressive Acids — sulfuric/FGD
    "APP008": "images/12_sulfuric_fgd.jpg",
};

/* ── RECOMMEND ─────────────────────────────────────────────────── */
SGViews.renderRecommend = function () {
    const mode = SGApp.state.mode;
    return `
<div class="page-header">
  <div><div class="page-header-title">Recommend Me!</div><div style="font-size:0.75rem;color:var(--text-soft)">${mode === 'expert' ? 'Expert Mode — technical parameters' : 'Guided Mode — plain-language input'}</div></div>
  <button class="btn btn-outline btn-sm" onclick="SGApp.toggleMode()">Switch to ${mode === 'expert' ? 'Guided' : 'Expert'} Mode</button>
</div>
<div class="page-content">
  <div id="rec-workspace">
    ${SGViews.recommendStep1(mode)}
  </div>
</div>`;
};

SGViews.recommendStep1 = function (mode) {
    const steps = ['Define Requirements', 'Review Profile', 'Results'];
    return `
  <div class="step-progress">
    ${steps.map((s, i) => `<div class="step-col"><div class="step-dot ${i === 0 ? 'active' : ''}">${i + 1}</div><div class="step-label">${s}</div></div>${i < steps.length - 1 ? '<div class="step-line"></div>' : ''}`).join('')}
  </div>
  ${mode === 'expert' ? SGViews.expertInputPane() : SGViews.guidedInputPane()}`;
};

SGViews.guidedInputPane = function () {
    const editing = SGApp.state.editingReq;
    return `
  <div class="card" style="margin-bottom:1rem">
    <div class="section-title" style="margin-bottom:0.5rem">Describe your application</div>
    <div style="font-size:0.82rem;color:var(--text-soft);margin-bottom:1rem">Describe what you need in plain language. SmartGrade will extract the engineering requirements.</div>
    <textarea class="form-control" id="nl-input" placeholder='e.g. "I need a welded component for an outdoor coastal structure. It should have high strength. Cost is important but performance matters."' style="min-height:100px"></textarea>
    <div style="margin-top:0.75rem;display:flex;gap:0.5rem;flex-wrap:wrap">
      <span class="badge badge-steel" style="cursor:pointer" onclick="document.getElementById('nl-input').value='I need a welded component for an outdoor coastal structure. High strength. Cost important.'">🌊 Coastal structure</span>
      <span class="badge badge-steel" style="cursor:pointer" onclick="document.getElementById('nl-input').value='Food processing tank, needs welding, moderate corrosion environment, good formability required.'">🍽️ Food processing</span>
      <span class="badge badge-steel" style="cursor:pointer" onclick="document.getElementById('nl-input').value='Automotive exhaust muffler, high temperature up to 800 degrees C, good formability needed.'">🚗 Exhaust system</span>
      <span class="badge badge-steel" style="cursor:pointer" onclick="document.getElementById('nl-input').value='Chemical process vessel, aggressive acid environment, welded, performance critical.'">⚗️ Chemical equipment</span>
      <span class="badge badge-steel" style="cursor:pointer" onclick="SGApp.runRailwayDemo()">🚆 Railway / Transport</span>
    </div>

    <!-- Image Upload -->
    <div style="margin-top:1rem;padding:1rem;background:var(--light);border-radius:var(--radius-sm);border:2px dashed var(--border)">
      <div style="font-size:0.82rem;font-weight:600;color:var(--navy);margin-bottom:0.5rem">📷 Attach Application Image (optional)</div>
      <div style="font-size:0.78rem;color:var(--text-soft);margin-bottom:0.75rem">Upload a photo of your application or installation environment. SmartGrade will extract engineering context from the image and combine it with your text requirements.</div>
      <input type="file" id="img-upload-input" accept="image/*" style="display:none" onchange="SGApp.handleImageUpload(this)">
      <button class="btn btn-outline btn-sm" onclick="document.getElementById('img-upload-input').click()">📁 Choose Image</button>
      <div id="img-preview-wrap" style="margin-top:0.75rem"></div>
    </div>
  </div>
  <div class="card" style="margin-bottom:1rem">
    <div class="section-title" style="margin-bottom:0.75rem">Or answer guided questions</div>
    ${[
            ['What are you designing?', 'guided-q1', 'text', 'Structural component, vessel, panel, exhaust…'],
            ['Where will it be used?', 'guided-q2', 'text', 'Coastal outdoor / food-grade / chemical / automotive…'],
            ['Will it be welded?', 'guided-q3', 'select', ['', 'Yes', 'No', 'Not sure']],
            ['What strength level?', 'guided-q4', 'select', ['', 'Standard', 'High / Structural', 'Not sure']],
            ['What matters more?', 'guided-q5', 'select', ['', 'Cost then performance', 'Performance above all', 'Balanced']],
            ['Operating temperature range?', 'guided-q6', 'select', ['Not specified', 'Ambient (< 100°C)', 'Moderate (100–400°C)', 'High (> 400°C)']],
            ['Cost requirement?', 'guided-q7', 'select', ['Not specified', 'Lower cost preferred', 'Moderate cost acceptable', 'Cost not a constraint']],
            ['Corrosion resistance need?', 'guided-q8', 'select', ['Not specified', 'Mild (indoor/dry)', 'Moderate (outdoor/damp)', 'High (coastal/chloride)', 'Very high (acid/aggressive)']],
            ['Fabrication requirements?', 'guided-q9', 'select', ['Not specified', 'Good formability needed', 'Deep drawing required', 'Sheet metal / roll forming', 'Machining important']],
        ].map(([q, id, type, opts]) => `
    <div class="guided-step" id="gs-${id}">
      <div class="guided-q">${q}</div>
      ${type === 'text' ? `<input class="form-control" id="${id}" placeholder="${opts}">` :
            `<select class="form-control form-select" id="${id}">${(opts).map(o => `<option>${o}</option>`).join('')}</select>`}
    </div>`).join('')}
  </div>
  <div class="flex gap-2">
    <button class="btn btn-primary" onclick="SGApp.runRecommendation()">Extract Requirements &amp; Continue →</button>
    <button class="btn btn-outline" onclick="SGApp.runDemoScenario()">▶ Load Demo Scenario</button>
  </div>`;
};

SGViews.expertInputPane = function () {
    const appOptions = SG_APPLICATIONS.map(a => `<option value="${a.application_id}">${a.icon} ${a.name}</option>`).join('');
    return `
  <div class="grid-2" style="gap:1.25rem;margin-bottom:1rem">
    <div class="card">
      <div class="section-title" style="margin-bottom:1rem">Application Parameters</div>
      ${[
            ['Application / Industry', 'exp-app', 'select', appOptions],
            ['Environment / Exposure Class', 'exp-env', 'text', 'Outdoor coastal · Acid · Food-grade · High-temp…'],
            ['Operating Temperature', 'exp-temp', 'select', '<option value="">Not specified</option><option value="ambient">Ambient (< 100°C)</option><option value="moderate">Moderate (100–400°C)</option><option value="high">High (> 400°C)</option>'],
            ['Min Yield Strength Target', 'exp-ys', 'text', 'e.g. 200 MPa or "High" or leave blank'],
            ['Welding Required?', 'exp-weld', 'select', '<option>Yes</option><option>No</option><option>Not sure</option>'],
            ['Product Form', 'exp-form', 'select', '<option value="">Any / Not specified</option><option>Plate</option><option>Coil</option><option>Sheet</option><option>Tube</option>'],
        ].map(([l, id, t, opts]) => `<div class="form-group" style="margin-bottom:0.75rem">
        <label class="form-label" for="${id}">${l}</label>
        ${t === 'text' ? `<input class="form-control" id="${id}" placeholder="${opts}">` :
            `<select class="form-control form-select" id="${id}">${opts}</select>`}
      </div>`).join('')}
    </div>
    <div class="card">
      <div class="section-title" style="margin-bottom:1rem">Priority Weights (sum = 1.0)</div>
      ${[['Engineering Fit', 'w-eng', 0.3], ['Corrosion Resistance', 'w-cor', 0.25], ['Fabrication', 'w-fab', 0.2], ['Cost', 'w-cost', 0.15], ['Evidence Bonus', 'w-ev', 0.1]].map(([l, id, v]) => `
      <div class="form-group" style="margin-bottom:0.75rem">
        <label class="form-label" for="${id}">${l} <span id="${id}-val" style="color:var(--orange);font-weight:700">${v}</span></label>
        <input type="range" id="${id}" min="0" max="0.6" step="0.05" value="${v}" oninput="document.getElementById('${id}-val').textContent=parseFloat(this.value).toFixed(2)">
      </div>`).join('')}
      <div style="font-size:0.75rem;color:var(--text-soft)">Weights guide ranking. Hard engineering constraints are always applied first regardless of weights.</div>
    </div>
  </div>
  <button class="btn btn-primary" onclick="SGApp.runExpertRecommendation()">Run Engineering Analysis →</button>`;
};

SGViews.renderRequirementProfile = function (req) {
    const steps = ['Define Requirements', 'Review Profile', 'Results'];
    return `
  <div class="step-progress">
    ${steps.map((s, i) => `<div class="step-col"><div class="step-dot ${i === 0 ? 'done' : i === 1 ? 'active' : ''}">${i === 0 ? '✓' : i + 1}</div><div class="step-label">${s}</div></div>${i < steps.length - 1 ? `<div class="step-line ${i === 0 ? 'done' : ''}"></div>` : ''}`).join('')}
  </div>
  <div class="card" style="margin-bottom:1rem">
    <div class="section-header">
      <div><div class="section-title">Engineering Interpretation</div><div class="section-subtitle">SmartGrade extracted these requirements from your input. Review and edit before proceeding.</div></div>
    </div>
    <div style="background:var(--light);border-radius:var(--radius-sm);padding:0.75rem 1rem;font-size:0.82rem;color:var(--text-mid);margin-bottom:1rem;font-style:italic">"${req.rawText}"</div>
    ${req.imageInfo ? `<div style="margin-bottom:1rem;padding:0.5rem 0.75rem;background:#F0FEF8;border-radius:var(--radius-sm);border:1px solid #86EFAC;font-size:0.8rem">
      <div style="font-weight:700;color:var(--success);margin-bottom:0.25rem">📷 Image Information Combined</div>
      <div style="color:var(--text-mid)"><strong>App:</strong> ${req.imageInfo.application || '—'} · <strong>Env:</strong> ${req.imageInfo.environment || '—'}</div>
      <div style="color:var(--text-soft);font-size:0.75rem;margin-top:0.15rem;font-style:italic">${req.imageInfo.notes || ''}</div>
    </div>` : ''}
    <div class="req-profile">
      ${req.extractedFacts.map(f => `
      <div class="req-row">
        <div class="req-label">${f.label}</div>
        <div class="req-value ${f.missing ? 'missing' : ''}">${f.missing ? '⚠️ ' + f.value : f.value}</div>
        <span class="req-confidence conf-${f.confidence === 'High' ? 'high' : f.confidence === 'Medium' ? 'med' : 'low'}">${f.confidence}</span>
      </div>`).join('')}
    </div>
    ${req.extractedFacts.some(f => f.missing) ? `
    <div class="missing-data-alert">
      <span>⚠️</span>
      <div><strong>Missing information detected.</strong> The recommendation will be marked conditional for missing fields. Provide the information above for a more precise result. Missing data does not automatically fail a grade.</div>
    </div>` : ''}
  </div>
  <div class="flex gap-2">
    <button class="btn btn-primary" onclick="SGApp.confirmAndRecommend()">Confirm &amp; Run Recommendation →</button>
    <button class="btn btn-outline" onclick="SGApp.editRequirements()">← Edit Requirements</button>
  </div>`;
};

SGViews.renderResults = function (result, req) {
    if (!result) return `<div style="text-align:center;padding:3rem;color:var(--text-soft)">No results yet. Please run a recommendation first.</div>`;
    const steps = ['Define Requirements', 'Review Profile', 'Results'];
    return `
  <div class="step-progress">
    ${steps.map((s, i) => `<div class="step-col"><div class="step-dot ${i < 2 ? 'done' : 'active'}">${i < 2 ? '✓' : i + 1}</div><div class="step-label">${s}</div></div>${i < steps.length - 1 ? `<div class="step-line done"></div>` : ''}`).join('')}
  </div>
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:0.5rem">
    <div><div style="font-size:1.1rem;font-weight:800;color:var(--navy)">SmartGrade Recommendation Results</div>
    <div style="font-size:0.8rem;color:var(--text-soft)">${result.filteredCount} of ${SG_GRADES.length} grades passed hard filtering · ${result.allFiltered.length} candidates ranked</div></div>
    <div class="flex gap-2 flex-wrap">
      <button class="btn btn-outline btn-sm" onclick="SGApp.navigate('compare')">📊 Compare</button>
      <button class="btn btn-outline btn-sm" onclick="SGApp.saveProject()">💾 Save Project</button>
      <button class="btn btn-outline btn-sm" onclick="SGApp.navigate('report')">📄 Report</button>
      <button class="btn btn-outline btn-sm" onclick="SGApp.editRequirements()">✏️ Edit Requirements</button>
    </div>
  </div>
  
  <!-- Trade-off explorer -->
  <div class="tradeoff-panel" style="margin-bottom:1.25rem">
    <div style="font-size:0.8rem;font-weight:700;color:var(--navy);margin-bottom:0.75rem">⚖️ Trade-off Explorer — drag to adjust ranking weights</div>
    <div class="slider-wrap" style="margin-bottom:0.75rem">
      <div class="tradeoff-axis"><span>Cost Priority</span><span>Performance Priority</span></div>
      <input type="range" id="tradeoff-slider" min="0" max="100" value="50" oninput="SGViews.updateTradeoff(this.value)">
      <div class="slider-labels"><span>Lower cost emphasis</span><span style="text-align:right">Higher corrosion emphasis</span></div>
    </div>
    <div class="tradeoff-note">Moving toward performance increases corrosion-fit weight; it does not override hard engineering requirements. Hard-failed grades remain excluded.</div>
  </div>

  <!-- Result tabs -->
  <div class="tab-bar" id="result-tabs" style="margin-bottom:1rem">
    ${['Best Fit', 'Cost-Optimized', 'Performance-First', 'Alternatives'].map((t, i) => `<div class="tab-btn ${i === 0 ? 'active' : ''}" onclick="SGViews.switchResultTab('${t}',this)">${t}</div>`).join('')}
  </div>
  <div id="result-tab-content">
    ${SGViews.buildResultList(result.bestFit.slice(0, 1), 'Best Fit', req)}
  </div>`;
};

SGViews.buildResultList = function (list, view, req) {
    if (!list || !list.length) return `<div style="padding:2rem;text-align:center;color:var(--text-soft)">No grades passed hard filtering for this view.</div>`;
    const items = view === 'Best Fit' ? list.slice(0, 1) : list;
    return items.map((r, i) => SGViews.resultCard(r, i, view, req)).join('');
};

SGViews.resultCard = function (r, rank, view, req) {
    const c = r.fitScore >= 75 ? 'var(--success)' : r.fitScore >= 55 ? 'var(--warn)' : 'var(--danger)';
    const sust = SG_SUSTAINABILITY.find(s => s.grade === r.grade.grade_name && s.pcf_assessment === 'Conducted');
    const passFlags = r.flags.filter(f => f.result.startsWith('✓'));
    const warnFlags = r.flags.filter(f => f.result.includes('Conditional') || f.result.includes('Verification'));
    const circumf = 2 * Math.PI * 32;
    const offset = circumf - (r.fitScore / 100) * circumf;
    const rankLabel = view === 'Best Fit'
        ? '⭐ Best Fit · #1 Recommended'
        : view === 'Alternatives'
            ? `Alternative #${rank + 1} (${r.grade.grade_name})`
            : rank === 0
                ? '⭐ ' + view + ' · #1'
                : '#' + (rank + 1);
    const isTopPick = (view === 'Best Fit') || (rank === 0 && view !== 'Alternatives');
    return `
<div class="result-card ${isTopPick ? 'top-pick' : ''}" style="margin-bottom:1rem">
  <div class="result-card-header">
    <div class="score-ring-wrap">
      <div class="score-ring">
        <svg viewBox="0 0 80 80" width="80" height="80">
          <circle class="ring-bg" cx="40" cy="40" r="32"/>
          <circle class="ring-fill" cx="40" cy="40" r="32" stroke="${c}" stroke-dasharray="${circumf}" stroke-dashoffset="${offset}"/>
        </svg>
        <div class="ring-text"><div class="ring-num" style="color:${c}">${r.fitScore}</div><div class="ring-label">Fit Score</div></div>
      </div>
    </div>
    <div style="flex:1">
      <div class="result-rank">${rankLabel}</div>
      <div class="result-grade-name">${r.grade.grade_name}</div>
      <div class="result-family">${r.grade.family} · ${r.grade.UNS || 'Proprietary'}</div>
      <div style="margin-top:0.4rem;display:flex;gap:0.5rem;flex-wrap:wrap">
        <span class="badge badge-steel">💰 ${r.grade.cost_band}</span>
        ${sust ? `<span class="badge badge-success">✅ PCF Assessed</span>` : ``}
        ${r.verificationNeeded.length ? `<span class="badge badge-warn">⚠️ ${r.verificationNeeded.length} need verification</span>` : ''}
      </div>
    </div>
    <div class="flex flex-col gap-2" style="align-items:flex-end">
      <button class="btn btn-primary btn-sm" onclick="SGApp.addToCompare('${r.grade.grade_id}')">+ Compare</button>
      <button class="btn btn-outline btn-sm" onclick="SGViews.showGradeDetail('${r.grade.grade_id}');SGApp.navigate('grades')">View Grade →</button>
    </div>
  </div>
  <div class="result-body">
    <div style="font-size:0.82rem;color:var(--text-mid);margin-bottom:0.75rem">${r.grade.summary}</div>
    <div style="font-size:0.78rem;font-weight:700;text-transform:uppercase;color:var(--text-soft);margin-bottom:0.35rem">Why this grade?</div>
    <div class="result-flags">
      ${passFlags.map(f => `<div class="result-flag pass"><div class="result-flag-icon">✓</div><div class="result-flag-text"><div class="result-flag-crit">${f.criterion}</div><div class="result-flag-detail">${f.detail}${f.source ? ` <span class="source-chip">📄 ${f.source}</span>` : ''}</div></div></div>`).join('')}
      ${warnFlags.map(f => `<div class="result-flag warn"><div class="result-flag-icon">⚠️</div><div class="result-flag-text"><div class="result-flag-crit">${f.criterion}: ${f.result}</div><div class="result-flag-detail">${f.detail}</div></div></div>`).join('')}
    </div>
    ${r.verificationNeeded.length ? `<div class="missing-data-alert" style="margin-top:0.5rem"><span>⚠️</span><div><strong>Verification needed:</strong> ${r.verificationNeeded.join(', ')}. Confirm before final specification. Recommendation is conditional for these items.</div></div>` : ''}
    <div style="margin-top:0.75rem;font-size:0.72rem;color:var(--text-soft)">Source: <span class="source-chip">📄 ${r.grade.source}</span></div>
    <div style="margin-top:0.5rem;font-size:0.7rem;color:var(--text-soft)">SmartGrade Fit Score is a prototype ranking metric — not Jindal certification or human expert approval.</div>
  </div>
</div>`;
};

SGViews.switchResultTab = function (view, el) {
    document.querySelectorAll('#result-tabs .tab-btn').forEach(b => b.classList.toggle('active', b === el));
    const res = SGApp.state.lastResult;
    const req = SGApp.state.lastReq;
    const c = document.getElementById('result-tab-content');
    if (!c || !res) return;
    const map = {
        'Best Fit': res.bestFit.slice(0, 1),
        'Cost-Optimized': res.costOptimized,
        'Performance-First': res.performanceFirst,
        'Alternatives': res.bestFit.slice(1)
    };
    c.innerHTML = SGViews.buildResultList(map[view] || res.bestFit.slice(0, 1), view, req);
};

SGViews.updateTradeoff = function (val) {
    const res = SGApp.state.lastResult;
    const req = SGApp.state.lastReq;
    if (!res || !req) return;
    const v = val / 100;
    const w = {
        engineering: 0.25,
        corrosion: 0.15 + v * 0.3,
        fabrication: 0.2,
        cost: 0.3 - v * 0.25,
        evidence: 0.1
    };
    const total = Object.values(w).reduce((a, b) => a + b, 0);
    Object.keys(w).forEach(k => w[k] = w[k] / total);
    req.customWeights = w;
    const custom = SmartGradeEngine.recommend({ ...req, customWeights: w });
    if (custom) {
        const activeTab = document.querySelector('#result-tabs .tab-btn.active');
        if (activeTab && activeTab.textContent === 'Best Fit') {
            document.getElementById('result-tab-content').innerHTML = SGViews.buildResultList(custom.custom.slice(0, 1), 'Best Fit', req);
        } else if (activeTab && activeTab.textContent === 'Alternatives') {
            document.getElementById('result-tab-content').innerHTML = SGViews.buildResultList(custom.custom.slice(1), 'Alternatives', req);
        } else if (activeTab && activeTab.textContent === 'Cost-Optimized') {
            document.getElementById('result-tab-content').innerHTML = SGViews.buildResultList(custom.costOptimized, 'Cost-Optimized', req);
        } else if (activeTab && activeTab.textContent === 'Performance-First') {
            document.getElementById('result-tab-content').innerHTML = SGViews.buildResultList(custom.performanceFirst, 'Performance-First', req);
        }
    }
};

/* ── LOCATOR ──────────────────────────────────────────────────── */
SGViews.renderLocator = function () {
    return `
<div class="page-header">
  <div class="page-header-title">Jindal Sales &amp; Services</div>
  <div style="font-size:0.75rem;color:var(--text-soft)">Verified locations · Do not imply live stock availability</div>
</div>
<div class="page-content">
  <div class="flex gap-2" style="margin-bottom:1rem;flex-wrap:wrap">
    <input class="form-control" id="loc-search" placeholder="Search city or state…" style="width:240px" oninput="SGViews.filterLocations(this.value)">
    <select class="form-control form-select" id="loc-type" onchange="SGViews.filterLocations()" style="width:180px">
      <option value="">All Types</option>
      <option>Corporate Office</option>
      <option>Registered Office / Manufacturing</option>
      <option>Sales Office</option>
      <option>Service Centre</option>
      <option>Manufacturing Facility</option>
    </select>
  </div>
  <div class="grid-2" style="gap:1.25rem;align-items:start">
    <div id="location-list" class="location-list" style="max-height:480px;overflow-y:auto">
      ${SGViews.buildLocationList(SG_LOCATIONS)}
    </div>
    <div>
      <div id="map" style="height:480px"></div>
      <div style="margin-top:0.5rem;font-size:0.72rem;color:var(--text-soft)">Map data: OpenStreetMap · Coordinates are approximate · Verify before visiting.</div>
    </div>
  </div>
  <div style="margin-top:1rem;padding:0.75rem;background:var(--orange-pale);border-left:3px solid var(--orange);border-radius:0 var(--radius-sm) var(--radius-sm) 0;font-size:0.75rem;color:var(--text-mid)">
    ⚠️ This locator shows verified Jindal Stainless offices and service centres. It does not imply live stock availability. Contact the relevant office to discuss your requirements.
  </div>
</div>`;
};

SGViews.buildLocationList = function (locs) {
    const typeClass = {
        'Corporate Office': 'type-corp', 'Registered Office / Manufacturing': 'type-mfg',
        'Sales Office': 'type-sales', 'Service Centre': 'type-sc', 'Manufacturing Facility': 'type-mfg',
        'Service Centre / Sales': 'type-sc', 'Manufacturing / Acquired Facility': 'type-mfg'
    };
    return locs.map((l, i) => `
  <div class="location-item" id="loc-${l.id}" onclick="SGApp.selectLocation('${l.id}',${l.lat},${l.lon})">
    <div><span class="location-type-pill ${typeClass[l.type] || 'type-sales'}">${l.type}</span></div>
    <div class="location-city">${l.city}, ${l.state}</div>
    <div class="location-address">${l.address}</div>
    <div class="location-contact">
      ${l.phone ? `<span>📞 ${l.phone}</span>` : ''}
      ${l.email ? `<span>✉️ ${l.email}</span>` : ''}
    </div>
    <div style="margin-top:0.3rem;font-size:0.65rem;color:var(--steel)">✓ ${l.verification_status}</div>
  </div>`).join('');
};

SGViews.filterLocations = function (q) {
    const search = (q || document.getElementById('loc-search')?.value || '').toLowerCase();
    const type = document.getElementById('loc-type')?.value || '';
    const filtered = SG_LOCATIONS.filter(l =>
        (!search || (l.city + ' ' + l.state + ' ' + l.address).toLowerCase().includes(search)) &&
        (!type || l.type.includes(type))
    );
    const list = document.getElementById('location-list');
    if (list) list.innerHTML = SGViews.buildLocationList(filtered);
};

/* ── HISTORY ──────────────────────────────────────────────────── */
SGViews.renderHistory = function () {
    const projects = SGApp.state.projects;
    return `
<div class="page-header">
  <div class="page-header-title">Saved Projects &amp; History</div>
  <button class="btn btn-outline btn-sm" onclick="SGApp.navigate('recommend')">+ New Project</button>
</div>
<div class="page-content">
  ${projects.length ? `
  <div style="display:flex;flex-direction:column;gap:0.75rem">
    ${projects.slice().reverse().map(p => `
    <div class="history-item">
      <div class="history-icon">📁</div>
      <div class="history-info">
        <div class="history-name">${p.name}</div>
        <div class="history-meta">${p.mode === 'expert' ? '⚙️ Expert' : '🗂️ Guided'} Mode · ${p.date} · v${p.version}</div>
        <div class="history-grade">${p.topGrade ? 'Top recommendation: ' + p.topGrade : 'No recommendation'}</div>
        ${p.req ? `<div style="font-size:0.75rem;color:var(--text-soft);margin-top:0.3rem;font-style:italic">"${p.req.rawText?.substring(0, 100) || 'Expert mode input'}"</div>` : ''}
        ${p.expertValidation ? `<div style="margin-top:0.4rem"><span class="badge ${p.expertValidation.status === 'reviewed' ? 'badge-success' : 'badge-warn'}">${p.expertValidation.status === 'reviewed' ? '✓ Expert Reviewed' : '⏳ Pending Expert Review'}</span></div>` : ''}
      </div>
      <div class="flex flex-col gap-2" style="align-items:flex-end">
        <button class="btn btn-outline btn-sm" onclick="SGApp.loadProject('${p.id}')">Load →</button>
        <button class="btn btn-outline btn-sm" onclick="SGApp.navigate('report')">📄 Report</button>
        ${!p.expertValidation ? `<button class="btn btn-navy btn-sm" onclick="SGApp.loadAndSubmitForExpert('${p.id}')">🔬 Submit for Expert</button>` : ''}
      </div>
    </div>`).join('')}
  </div>` : `
  <div style="text-align:center;padding:4rem;color:var(--text-soft)">
    <div style="font-size:3rem;margin-bottom:1rem">🗂️</div>
    <div style="font-size:0.9rem">No saved projects yet.<br>Run a recommendation and save your project.</div>
    <button class="btn btn-primary" style="margin-top:1.5rem" onclick="SGApp.navigate('recommend')">⭐ Recommend Me!</button>
  </div>`}
</div>`;
};

/* ── BEFORE YOU BUY ───────────────────────────────────────────── */
SGViews.renderBeforeYouBuy = function () {
    const grade = SGApp.state.lastResult?.bestFit?.[0]?.grade;
    return `
<div class="page-header">
  <div><div class="page-header-title">Before You Buy</div><div style="font-size:0.75rem;color:var(--text-soft)">Procurement readiness checklist — this does not certify a purchase</div></div>
</div>
<div class="page-content">
  ${grade ? `<div style="margin-bottom:1rem;padding:0.75rem 1rem;background:var(--light);border-radius:var(--radius-sm);font-size:0.85rem">Checking readiness for: <strong>${grade.grade_name}</strong> (${grade.family}) · Cost Band: ${grade.cost_band}</div>` : `<div style="margin-bottom:1rem;padding:0.75rem;background:var(--orange-pale);border-radius:var(--radius-sm);font-size:0.82rem;color:var(--text-mid)">💡 Run a recommendation first to populate grade-specific fields, or fill in manually below.</div>`}
  <div class="grid-2" style="gap:1.25rem">
    <div>
      ${['Specification', 'Certification', 'MTC (Material Test Certificate)', 'Dimensions', 'Finish', 'Quantity'].map((sec, si) => `
      <div class="buy-section">
        <div class="buy-section-title">${si + 1}. ${sec}</div>
        <div style="display:flex;flex-direction:column;gap:0.35rem">
        ${SGViews.buyFields(sec, grade).map(f => `
        <div class="check-item" id="buy-${f.id}">
          <div class="check-icon">☐</div>
          <div class="check-content">
            <div class="check-title">${f.label}</div>
            ${f.value ? `<div class="check-desc" id="bv-${f.id}">${f.value}</div>` : ''}
            ${f.input ? `<input class="form-control" style="margin-top:0.35rem;font-size:0.8rem" placeholder="${f.placeholder || ''}" id="bi-${f.id}">` : ''}
          </div>
          <input type="checkbox" style="width:16px;height:16px;accent-color:var(--navy);flex-shrink:0" onchange="SGViews.toggleBuyCheck('buy-${f.id}',this.checked)">
        </div>`).join('')}
        </div>
      </div>`).join('')}
    </div>
    <div>
      <div class="card">
        <div class="section-title" style="margin-bottom:0.75rem">Checklist Status</div>
        <div id="buy-status-summary" style="font-size:0.85rem;color:var(--text-soft)">Check items on the left to track progress.</div>
        <div style="margin-top:1rem;padding:0.75rem;background:var(--light);border-radius:var(--radius-sm);font-size:0.78rem;color:var(--text-mid)">
          <strong>Note:</strong> This checklist is a procurement readiness tool. It does not certify a purchase. SmartGrade does not have access to live inventory data. Contact Jindal Sales &amp; Services to confirm availability and obtain a formal quotation.
        </div>
        <button class="btn btn-outline btn-sm" style="margin-top:1rem" onclick="SGApp.navigate('locator')">📍 Find Nearest Jindal Office →</button>
      </div>
    </div>
  </div>
</div>`;
};

SGViews.buyFields = function (section, g) {
    const gn = g ? g.grade_name : '[Grade]';
    const sects = {
        'Specification': [
            { id: 'spec-grade', label: 'Grade confirmed', value: gn, input: !g, placeholder: 'Enter grade' },
            { id: 'spec-form', label: 'Product form confirmed', input: true, placeholder: 'Plate / Coil / Sheet / Tube…' },
            { id: 'spec-std', label: 'Applicable standard identified', input: true, placeholder: 'ASTM / EN / IS…' },
        ],
        'Certification': [
            { id: 'cert-comp', label: 'Required compliance certifications identified' },
            { id: 'cert-list', label: 'Certification document list prepared' },
        ],
        'MTC (Material Test Certificate)': [
            { id: 'mtc-req', label: 'MTC requested from supplier' },
            { id: 'mtc-trace', label: 'Grade / heat / lot traceability verified' },
            { id: 'mtc-chem', label: 'Chemistry values checked against specification' },
            { id: 'mtc-mech', label: 'Mechanical values checked against specification' },
        ],
        'Dimensions': [
            { id: 'dim-thk', label: 'Thickness confirmed', input: true, placeholder: 'mm' },
            { id: 'dim-wid', label: 'Width confirmed', input: true, placeholder: 'mm' },
            { id: 'dim-len', label: 'Length / OD / wall thickness confirmed', input: true, placeholder: 'mm' },
        ],
        'Finish': [
            { id: 'fin-srf', label: 'Required surface finish confirmed', input: true, placeholder: '2B / BA / No.4 / Mirror…' },
        ],
        'Quantity': [
            { id: 'qty-amt', label: 'Quantity and unit confirmed', input: true, placeholder: 'e.g. 5 tonnes' },
            { id: 'qty-mob', label: 'Minimum order quantity checked with Jindal' },
        ]
    };
    return sects[section] || [];
};

SGViews.toggleBuyCheck = function (itemId, checked) {
    const el = document.getElementById(itemId);
    if (el) { el.classList.toggle('checked', checked); el.querySelector('.check-icon').textContent = checked ? '✓' : '☐'; }
};

/* ── REPORT ───────────────────────────────────────────────────── */
SGViews.renderReport = function () {
    const res = SGApp.state.lastResult;
    const req = SGApp.state.lastReq;
    const today = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    const top = res?.bestFit?.[0];
    return `
<div class="page-header">
  <div class="page-header-title">Technical Report</div>
  <div class="flex gap-2">
    <button class="btn btn-outline btn-sm" onclick="window.print()">🖨️ Print / PDF</button>
    <button class="btn btn-outline btn-sm" onclick="SGApp.saveProject()">💾 Save</button>
  </div>
</div>
<div class="page-content" id="report-content">
  <div class="card">
    <div style="border-bottom:3px solid var(--navy);padding-bottom:1rem;margin-bottom:1.5rem;display:flex;align-items:flex-start;justify-content:space-between">
      <div>
        <div style="font-size:1.5rem;font-weight:900;color:var(--navy)">Smart<span style="color:var(--orange)">Grade</span></div>
        <div style="font-size:0.75rem;color:var(--text-soft);margin-top:0.2rem">Grade Recommendation Technical Report</div>
      </div>
      <div style="text-align:right;font-size:0.78rem;color:var(--text-soft)">
        <div>Date: ${today}</div>
        <div>Mode: ${SGApp.state.mode === 'expert' ? 'Expert' : 'Guided'}</div>
        <div style="margin-top:0.25rem;font-size:0.65rem;color:var(--danger)">Prototype — Not Jindal certification</div>
      </div>
    </div>
    ${req ? `<div style="margin-bottom:1.5rem"><div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;color:var(--orange);margin-bottom:0.5rem">Application Input</div><div style="background:var(--light);padding:0.75rem;border-radius:var(--radius-sm);font-size:0.85rem;font-style:italic">"${req.rawText}"</div></div>` : ''}
    ${top ? `
    <div style="margin-bottom:1.5rem">
      <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;color:var(--orange);margin-bottom:0.5rem">Primary Recommendation</div>
      <div style="display:flex;gap:1rem;align-items:center;padding:1rem;background:var(--navy);border-radius:var(--radius);color:#fff">
        <div><div style="font-size:2rem;font-weight:900">${top.grade.grade_name}</div><div style="font-size:0.8rem;opacity:0.8">${top.grade.family} · ${top.grade.UNS || 'Proprietary'}</div></div>
        <div style="flex:1"><div style="font-size:0.8rem;opacity:0.8">SmartGrade Fit Score</div><div style="font-size:1.5rem;font-weight:800;color:var(--orange)">${top.fitScore}/100</div></div>
        <div style="font-size:0.75rem;opacity:0.7">Cost Band: ${top.grade.cost_band}</div>
      </div>
      <div style="margin-top:0.75rem;font-size:0.85rem;color:var(--text-mid)">${top.grade.summary}</div>
    </div>
    <div style="margin-bottom:1.5rem">
      <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;color:var(--orange);margin-bottom:0.5rem">Reasoning</div>
      ${top.flags.filter(f => f.result.startsWith('✓')).map(f => `<div style="display:flex;gap:0.5rem;font-size:0.82rem;margin-bottom:0.35rem"><span style="color:var(--success)">✓</span><div><strong>${f.criterion}:</strong> ${f.detail}${f.source ? ' · ' + f.source : ''}</div></div>`).join('')}
    </div>
    <div style="margin-bottom:1.5rem">
      <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;color:var(--orange);margin-bottom:0.5rem">Alternatives</div>
      ${(res.bestFit.slice(1, 3) || []).map(r => `<div style="display:flex;align-items:center;gap:0.75rem;padding:0.5rem 0;border-bottom:1px solid var(--border);font-size:0.82rem"><strong style="min-width:50px">${r.grade.grade_name}</strong><span style="color:var(--text-soft)">${r.grade.summary.substring(0, 80)}…</span><span class="badge badge-steel">${r.fitScore}</span></div>`).join('')}
    </div>` : '<div style="padding:2rem;text-align:center;color:var(--text-soft)">Run a recommendation first to generate a report.</div>'}
    <div style="margin-bottom:1rem">
      <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;color:var(--orange);margin-bottom:0.5rem">Assumptions &amp; Limitations</div>
      <ul style="font-size:0.8rem;color:var(--text-mid);padding-left:1.25rem;line-height:1.8">
        <li>SmartGrade Fit Score is a prototype ranking metric, not a Jindal Stainless certification.</li>
        <li>Cost bands are prototype relative reference bands — not Jindal pricing quotations.</li>
        <li>Missing data fields are flagged as "Needs Verification" — not assumed or forced to fail.</li>
        <li>Verify all specifications with Jindal technical documentation before procurement.</li>
        <li>This report does not constitute human expert review unless an Expert Validation record exists.</li>
      </ul>
    </div>
    <div style="font-size:0.72rem;color:var(--text-soft)">Sources: Jindal Stainless 300/400/Duplex Series Technical Datasheets · SmartGrade Prototype Dataset · Jindal Stainless Sustainability Report FY2023-24</div>
  </div>
</div>`;
};

/* ── PROPERTY EXPLORER ────────────────────────────────────────── */
SGViews.renderPropertyExplorer = function () {
    const mode = SGApp.state.mode;
    return `
<div class="page-header"><div class="page-header-title">Property Explorer</div></div>
<div class="page-content">
  <div class="grid-2" style="gap:1.25rem">
    <div class="card">
      <div class="section-title" style="margin-bottom:0.75rem">Select Grade &amp; Property</div>
      <div class="form-group" style="margin-bottom:0.75rem">
        <label class="form-label">Grade</label>
        <select class="form-control form-select" id="pe-grade" onchange="SGViews.updatePropExplorer()">
          ${SG_GRADES.map(g => `<option value="${g.grade_id}">${g.grade_name} (${g.family})</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Property Category</label>
        <select class="form-control form-select" id="pe-cat" onchange="SGViews.updatePropExplorer()">
          <option value="mechanical">Mechanical Properties</option>
          <option value="chemical">Chemical Composition</option>
          <option value="corrosion">Corrosion &amp; Fabrication</option>
          <option value="physical">Physical Properties</option>
        </select>
      </div>
    </div>
    <div class="card" id="pe-result">
      <div style="text-align:center;padding:2rem;color:var(--text-soft)">Select a grade to explore properties.</div>
    </div>
  </div>
</div>`;
};

SGViews.updatePropExplorer = function () {
    const gradeId = document.getElementById('pe-grade')?.value;
    const cat = document.getElementById('pe-cat')?.value;
    const g = SG_GRADES.find(x => x.grade_id === gradeId);
    const p = SG_PROPERTIES[gradeId];
    const panel = document.getElementById('pe-result');
    if (!panel || !g) return;
    const na = '<span class="na">Data not available</span>';
    const mode = SGApp.state.mode;
    let content = `<div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;color:var(--orange);margin-bottom:0.75rem">${g.grade_name} — `;
    if (cat === 'mechanical') {
        const m = p && p.mechanical;
        content += `Mechanical Properties</div>`;
        if (mode === 'expert') {
            content += `<table class="sg-table"><tr><th>Property</th><th>Value</th><th>Standard</th></tr>
      ${[['Min Yield Strength', m?.YS_min_MPa, m?.YS_min_MPa ? 'MPa' : '-'], ['Min Tensile Strength', m?.UTS_min_MPa, m?.UTS_min_MPa ? 'MPa' : '-'], ['Min Elongation', m?.EL_min_pct, m?.EL_min_pct ? '%' : '-'], ['Hardness', m?.hardness, '-']].map(([n, v, u]) => `<tr><td style="font-weight:600">${n}</td><td>${v != null ? v + ' ' + u : na}</td><td>Jindal technical datasheet</td></tr>`).join('')}</table>`;
        } else {
            content += `<div style="font-size:0.85rem;line-height:1.8"><p><strong>Yield Strength:</strong> ${m?.YS_min_MPa ? m.YS_min_MPa + ' MPa minimum — this is the stress at which the material begins to deform permanently.' : na}</p><p style="margin-top:0.5rem"><strong>Tensile Strength:</strong> ${m?.UTS_min_MPa ? m.UTS_min_MPa + ' MPa minimum — this is the maximum stress the material can withstand before breaking.' : na}</p><p style="margin-top:0.5rem"><strong>Elongation:</strong> ${m?.EL_min_pct ? m.EL_min_pct + '% minimum — higher elongation means the material can be stretched more before breaking, useful for deep drawing and forming.' : na}</p></div>`;
        }
    } else if (cat === 'corrosion') {
        content += `Corrosion &amp; Fabrication</div>`;
        content += `<div style="display:flex;flex-direction:column;gap:0.5rem">
    ${[['🛡️ Corrosion Level', g.corrosion_level], ['🔥 Temperature', g.temperature_notes], ['🔧 Weldability', g.weldability_level], ['🏗️ Formability', g.formability_level]].map(([l, v]) => `<div style="padding:0.6rem 0.85rem;background:var(--light);border-radius:var(--radius-sm)"><div style="font-weight:600;font-size:0.82rem">${l}</div><div style="font-size:0.8rem;color:var(--text-mid);margin-top:0.2rem">${v || na}</div></div>`).join('')}
    </div>`;
    } else if (cat === 'chemical') {
        const ch = p && p.chemistry;
        content += `Chemical Composition (wt %)</div>`;
        if (!ch) { content += '<div style="color:var(--text-soft);font-size:0.85rem">Detailed chemistry data not in prototype subset. Source: ' + g.source + '</div>'; }
        else {
            content += `<div style="margin-bottom:0.5rem;font-size:0.78rem;color:var(--text-soft)">Each element clearly identified with name, symbol, and value in wt%:</div>`;
            content += `<div style="display:flex;flex-wrap:wrap;gap:0.5rem">${SGViews._chemBadges(ch)}</div>`;
        }
    } else {
        const ph = p && p.physical;
        content += `Physical Properties</div>`;
        content += `<table class="sg-table"><tr><th>Property</th><th>Value</th></tr>
    ${[['Density', ph?.density_kg_m3, 'kg/m³'], ['Modulus of Elasticity', ph?.modulus_GPa, 'GPa'], ['Thermal Conductivity', ph?.thermal_conductivity_W_mK, 'W/m·K'], ['Thermal Expansion', ph?.thermal_expansion_um_mK, 'μm/m·K'], ['Electrical Resistivity', ph?.electrical_resistivity_uohm_m, 'μΩ·m']].map(([n, v, u]) => `<tr><td style="font-weight:600">${n}</td><td>${v != null ? v + ' ' + u : na}</td></tr>`).join('')}</table>`;
    }
    content += `<div style="margin-top:1rem;font-size:0.72rem;color:var(--text-soft)">Source: ${g.source}</div>`;
    panel.innerHTML = content;
};

/* ── APPLICATION VISUALIZER ────────────────────────────────────── */
SGViews.renderVisualizer = function () {
    return `
<div class="page-header"><div class="page-header-title">Application Visualizer</div></div>
<div class="page-content">
  <div class="form-group" style="max-width:360px;margin-bottom:1.25rem">
    <label class="form-label">Select Application</label>
    <select class="form-control form-select" id="viz-app-sel" onchange="SGViews.updateVisualizer()">
      ${SG_APPLICATIONS.map(a => `<option value="${a.application_id}">${a.icon} ${a.name}</option>`).join('')}
    </select>
  </div>
  <div class="visualizer-wrap">
    <div class="viz-image-container" id="viz-container"></div>
    <div id="viz-hotspot-panel" class="viz-panel hidden"></div>
  </div>
</div>`;
};

SGViews.updateVisualizer = function () {
    const appId = document.getElementById('viz-app-sel')?.value;
    const app = SG_APPLICATIONS.find(a => a.application_id === appId);
    const container = document.getElementById('viz-container');
    if (!container || !app) return;
    const imgSrc = SG_VIZ_IMAGES[appId];
    if (imgSrc) {
        container.innerHTML = `
    <div class="viz-scene viz-scene-img" style="position:relative;overflow:hidden;border-radius:var(--radius);min-height:320px;background:#0B2545">
      <img src="${imgSrc}" alt="${app.name}" class="viz-bg-img" onerror="this.style.display='none'" style="width:100%;height:100%;object-fit:cover;opacity:0.75;position:absolute;top:0;left:0">
      <div class="viz-overlay" style="position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(to bottom, rgba(11,37,69,0.3) 0%, rgba(11,37,69,0.6) 100%)"></div>
      <div style="position:relative;z-index:2;padding:1.25rem">
        <div style="font-size:1.1rem;font-weight:800;color:#fff">${app.icon} ${app.name}</div>
        <div style="font-size:0.8rem;color:rgba(255,255,255,0.7);margin-top:0.25rem">${app.industry}</div>
        <div style="font-size:0.75rem;color:rgba(255,255,255,0.55);margin-top:0.2rem">${app.environment}</div>
      </div>
      ${app.hotspots.map((h, i) => `
      <div class="viz-hotspot" style="position:absolute;left:${h.x}%;top:${h.y}%;transform:translate(-50%,-50%);z-index:3"
           onclick="SGViews.showHotspot('${appId}','${h.id}')" title="${h.label}" aria-label="${h.label}">
        ${i + 1}
      </div>`).join('')}
    </div>`;
    } else {
        container.innerHTML = `
    <div class="viz-scene">
      <span style="font-size:6rem;opacity:0.25;position:absolute">${app.icon || '🏭'}</span>
      <div style="position:relative;z-index:1;text-align:center;color:#fff">
        <div style="font-size:1.1rem;font-weight:800">${app.name}</div>
        <div style="font-size:0.8rem;opacity:0.7;margin-top:0.25rem">${app.industry}</div>
        <div style="font-size:0.78rem;opacity:0.6;margin-top:0.25rem">${app.environment}</div>
      </div>
      ${app.hotspots.map((h, i) => `
      <div class="viz-hotspot" style="left:${h.x}%;top:${h.y}%;transform:translate(-50%,-50%)"
           onclick="SGViews.showHotspot('${appId}','${h.id}')" title="${h.label}" aria-label="${h.label}">
        ${i + 1}
      </div>`).join('')}
    </div>`;
    }
    document.getElementById('viz-hotspot-panel').classList.add('hidden');
};

SGViews.showHotspot = function (appId, hsId) {
    const app = SG_APPLICATIONS.find(a => a.application_id === appId);
    const hs = app?.hotspots.find(h => h.id === hsId);
    if (!hs) return;
    const grades = hs.grades.map(id => SG_GRADES.find(g => g.grade_id === id)).filter(Boolean);
    const panel = document.getElementById('viz-hotspot-panel');
    panel.classList.remove('hidden');
    panel.innerHTML = `
  <div class="flex items-center justify-between" style="margin-bottom:0.75rem">
    <div><div style="font-weight:700;color:var(--navy)">${hs.label}</div><div style="font-size:0.8rem;color:var(--text-soft)">${hs.note}</div></div>
    <button class="btn btn-outline btn-sm" onclick="document.getElementById('viz-hotspot-panel').classList.add('hidden')">✕</button>
  </div>
  <div style="font-size:0.78rem;font-weight:600;text-transform:uppercase;color:var(--orange);margin-bottom:0.5rem">Suitable Grade Families</div>
  <div class="grid-3">
    ${grades.map(g => `<div class="grade-card card-hover" onclick="SGViews.showGradeDetail('${g.grade_id}');SGApp.navigate('grades')">
      <div class="grade-family-pill">${g.family}</div>
      <div class="grade-name">${g.grade_name}</div>
      <div style="font-size:0.75rem;color:var(--text-soft);margin-top:0.25rem">${g.corrosion_level}</div>
      <div class="cost-band-tag">💰 ${g.cost_band}</div>
    </div>`).join('')}
  </div>`;
};

/* ── EXPERT VALIDATION ─────────────────────────────────────────── */
SGViews.renderExpertValidation = function () {
    const records = SGApp.state.expertPendingRequests.filter(r => r.status === 'reviewed');
    const top = SGApp.state.lastResult?.bestFit?.[0];
    return `
<div class="page-header"><div class="page-header-title">Expert Validation</div></div>
<div class="page-content">
  <div class="card" style="margin-bottom:1rem">
    <div class="section-title" style="margin-bottom:0.75rem">Submit for Expert Review</div>
    <div style="font-size:0.82rem;color:var(--text-mid);margin-bottom:1rem">For complex or critical applications, submit your SmartGrade recommendation for expert validation. The expert receives the complete case context automatically — no manual data entry needed.</div>
    ${top ? `<div style="padding:0.75rem;background:var(--light);border-radius:var(--radius-sm);margin-bottom:0.75rem;font-size:0.85rem">Current recommendation: <strong>${top.grade.grade_name}</strong> (Fit Score: ${top.fitScore})</div>` : ''}
    <div class="form-group" style="margin-bottom:1rem"><label class="form-label">Notes for Expert (optional)</label><textarea class="form-control" id="val-note" placeholder="Add any additional context or questions for the expert…"></textarea></div>
    <button class="btn btn-navy" onclick="SGApp.submitForExpertValidation(null)">Submit for Expert Validation →</button>
  </div>
  ${records.length ? `
  <div class="card">
    <div class="section-title" style="margin-bottom:0.75rem">Reviewed Cases</div>
    ${records.map(r => `
    <div style="padding:0.75rem 1rem;border:1px solid var(--border);border-radius:var(--radius-sm);margin-bottom:0.5rem">
      <div class="flex items-center justify-between" style="margin-bottom:0.25rem">
        <div style="font-weight:700;font-size:0.88rem">${r.projectName}</div>
        <span class="validation-status completed">✓ Reviewed · ${r.reviewedDate || r.submittedDate}</span>
      </div>
      ${r.expertNote ? `<div style="font-size:0.8rem;color:var(--text-mid);margin-top:0.25rem">${r.expertNote}</div>` : ''}
      ${r.expertGrade && r.expertGrade === top?.grade?.grade_name ? `<div style="margin-top:0.5rem;padding:0.4rem 0.75rem;background:#F0FEF8;border-radius:var(--radius-sm);font-size:0.78rem;color:var(--success);font-weight:600">✓ Expert choice matches SmartGrade recommendation (${r.expertGrade})</div>` : r.expertGrade ? `<div style="margin-top:0.5rem;font-size:0.78rem;color:var(--warn)">Expert independent selection: ${r.expertGrade} — differs from SmartGrade recommendation</div>` : ''}
    </div>`).join('')}
  </div>` : ''}
</div>`;
};

/* ── EXPERT PENDING / NEED ATTENTION ───────────────────────────── */
SGViews.renderExpertPending = function () {
    const pending = SGApp.state.expertPendingRequests;
    const pendingItems = pending.filter(r => r.status === 'pending');
    const reviewed = pending.filter(r => r.status === 'reviewed');
    return `
<div class="page-header">
  <div>
    <div class="page-header-title">🔔 Pending / Need Attention</div>
    <div style="font-size:0.75rem;color:var(--text-soft)">Expert Mode — Cases submitted for engineering review</div>
  </div>
  <button class="btn btn-outline btn-sm" onclick="SGApp.loadRailwayDemoForExpert()">🚆 Load Railway Demo Case</button>
</div>
<div class="page-content">
  ${pendingItems.length === 0 && reviewed.length === 0 ? `
  <div class="card" style="text-align:center;padding:3rem">
    <div style="font-size:3rem;margin-bottom:1rem">🔔</div>
    <div style="font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:0.5rem">No Pending Requests</div>
    <div style="font-size:0.85rem;color:var(--text-soft);max-width:380px;margin:0 auto">No cases have been submitted for expert validation yet. When a user submits a project for expert review, it will appear here with the full case context.</div>
    <button class="btn btn-navy btn-sm" style="margin-top:1.5rem" onclick="SGApp.loadRailwayDemoForExpert()">🚆 Load Railway Demo Case</button>
  </div>` : ''}

  ${pendingItems.length > 0 ? `
  <div class="card" style="margin-bottom:1.25rem">
    <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
      <div style="width:10px;height:10px;border-radius:50%;background:var(--warn);animation:pulse 1.5s infinite"></div>
      <div style="font-size:0.9rem;font-weight:700;color:var(--navy)">Pending Review (${pendingItems.length})</div>
    </div>
    ${pendingItems.map(r => `
    <div class="expert-pending-card" id="epcard-${r.id}">
      <div class="expert-pending-header">
        <div>
          <div style="font-weight:700;font-size:0.95rem;color:var(--navy)">${r.projectName}</div>
          <div style="font-size:0.75rem;color:var(--text-soft);margin-top:0.2rem">Submitted: ${r.submittedDate} ${r.submittedTime ? '· ' + r.submittedTime : ''}</div>
        </div>
        <div class="flex gap-2">
          <span class="badge badge-warn">⏳ Needs Attention</span>
          <button class="btn btn-navy btn-sm" onclick="SGApp.openExpertRequest('${r.id}')">Review Case →</button>
        </div>
      </div>
      <div class="expert-pending-meta">
        ${r.req?.extractedFacts?.slice(0, 3).map(f => `<span class="expert-fact-chip"><strong>${f.label}:</strong> ${f.value}</span>`).join('') || ''}
        ${r.smartGradeTopRecommendation ? `<span class="expert-fact-chip badge-steel">SmartGrade rec: <strong>${r.smartGradeTopRecommendation.gradeName}</strong> (${r.smartGradeTopRecommendation.fitScore})</span>` : ''}
        ${r.imageInfo ? `<span class="expert-fact-chip badge-success">📷 Image included</span>` : ''}
      </div>
      ${r.userNote ? `<div style="margin-top:0.5rem;font-size:0.8rem;color:var(--text-mid);font-style:italic">"${r.userNote}"</div>` : ''}
    </div>`).join('')}
  </div>` : ''}

  ${reviewed.length > 0 ? `
  <div class="card">
    <div style="font-size:0.9rem;font-weight:700;color:var(--navy);margin-bottom:1rem">✓ Reviewed (${reviewed.length})</div>
    ${reviewed.map(r => `
    <div style="padding:0.75rem 1rem;border:1px solid var(--border);border-radius:var(--radius-sm);margin-bottom:0.5rem;opacity:0.75">
      <div class="flex items-center justify-between">
        <div style="font-weight:600;font-size:0.88rem">${r.projectName}</div>
        <span class="badge badge-success">✓ Reviewed · ${r.reviewedDate || ''}</span>
      </div>
      ${r.expertNote ? `<div style="font-size:0.78rem;color:var(--text-mid);margin-top:0.25rem">${r.expertNote}</div>` : ''}
      ${r.expertGrade ? `<div style="font-size:0.78rem;color:var(--text-soft);margin-top:0.15rem">Expert grade: <strong>${r.expertGrade}</strong></div>` : ''}
    </div>`).join('')}
  </div>` : ''}

  <div id="expert-req-detail" class="hidden" style="margin-top:1.25rem"></div>
</div>`;
};

SGViews.renderExpertRequestDetail = function (req) {
    const topGrades = req.result?.topGrades || [];
    return `
<div class="card">
  <div class="flex items-center justify-between" style="margin-bottom:1rem">
    <div>
      <div style="font-size:1rem;font-weight:800;color:var(--navy)">Case Detail: ${req.projectName}</div>
      <div style="font-size:0.75rem;color:var(--text-soft)">Submitted ${req.submittedDate} · ID: ${req.id}</div>
    </div>
    <button class="btn btn-outline btn-sm" onclick="document.getElementById('expert-req-detail').classList.add('hidden')">✕ Close</button>
  </div>

  <!-- Application context -->
  <div style="background:var(--light);border-radius:var(--radius-sm);padding:1rem;margin-bottom:1rem">
    <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;color:var(--orange);margin-bottom:0.5rem">Application Input</div>
    <div style="font-size:0.85rem;font-style:italic;color:var(--text-mid)">"${req.req?.rawText || 'No text input'}"</div>
  </div>

  ${req.imageInfo ? `
  <div style="background:#F0FEF8;border:1px solid #86EFAC;border-radius:var(--radius-sm);padding:0.75rem;margin-bottom:1rem">
    <div style="font-size:0.75rem;font-weight:700;color:var(--success);margin-bottom:0.35rem">📷 Image Information</div>
    <div style="font-size:0.82rem;color:var(--text-mid)"><strong>App:</strong> ${req.imageInfo.application} · <strong>Env:</strong> ${req.imageInfo.environment}</div>
    <div style="font-size:0.75rem;color:var(--text-soft);font-style:italic;margin-top:0.2rem">${req.imageInfo.notes}</div>
  </div>` : ''}

  <!-- Extracted requirements -->
  <div style="margin-bottom:1rem">
    <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;color:var(--orange);margin-bottom:0.5rem">Engineering Requirements</div>
    <div class="req-profile">
      ${(req.req?.extractedFacts || []).map(f => `
      <div class="req-row">
        <div class="req-label">${f.label}</div>
        <div class="req-value">${f.value}</div>
        <span class="req-confidence conf-${f.confidence === 'High' ? 'high' : f.confidence === 'Medium' ? 'med' : 'low'}">${f.confidence}</span>
      </div>`).join('')}
    </div>
  </div>

  <!-- SmartGrade recommendations -->
  ${topGrades.length ? `
  <div style="margin-bottom:1rem">
    <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;color:var(--orange);margin-bottom:0.5rem">SmartGrade Recommendations</div>
    ${topGrades.map((g, i) => `
    <div style="display:flex;align-items:center;gap:1rem;padding:0.6rem 0.85rem;background:${i === 0 ? 'var(--navy)' : 'var(--light)'};color:${i === 0 ? '#fff' : 'inherit'};border-radius:var(--radius-sm);margin-bottom:0.5rem">
      <div style="font-weight:800;font-size:1rem">${g.gradeName}</div>
      <div style="font-size:0.8rem;opacity:0.8">${g.family}</div>
      <div style="margin-left:auto;font-size:0.85rem;font-weight:700;color:${i === 0 ? 'var(--orange)' : 'var(--navy)'}">Fit: ${g.fitScore}/100</div>
      <div style="font-size:0.75rem;opacity:0.7">💰 ${g.costBand}</div>
    </div>`).join('')}
  </div>` : ''}

  <!-- Expert review form -->
  <div style="border-top:2px solid var(--border);padding-top:1rem;margin-top:0.5rem">
    <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;color:var(--orange);margin-bottom:0.75rem">Expert Assessment</div>
    <div class="form-group" style="margin-bottom:0.75rem">
      <label class="form-label">Expert Notes</label>
      <textarea class="form-control" id="expert-note-${req.id}" placeholder="Add your engineering assessment, observations, or recommendations…" style="min-height:80px"></textarea>
    </div>
    <div class="form-group" style="margin-bottom:1rem">
      <label class="form-label">Expert Grade Selection (independent)</label>
      <select class="form-control form-select" id="expert-grade-${req.id}">
        <option value="">— Select grade —</option>
        ${SG_GRADES.map(g => `<option value="${g.grade_id}" ${req.smartGradeTopRecommendation?.gradeName === g.grade_name ? 'data-smartgrade="true"' : ''}>${g.grade_name} (${g.family})</option>`).join('')}
      </select>
    </div>
    <div class="flex gap-2">
      <button class="btn btn-primary" onclick="SGApp.resolveExpertRequest('${req.id}')">✓ Mark as Reviewed</button>
      <button class="btn btn-outline" onclick="document.getElementById('expert-req-detail').classList.add('hidden')">Cancel</button>
    </div>
  </div>
</div>`;
};

/* ── EXTEND SGApp WITH HISTORY/EXPERT HELPERS ──────────────────── */
SGApp.loadAndSubmitForExpert = function(projectId) {
    const p = this.state.projects.find(x => x.id === projectId);
    if (!p) return;
    if (p.req) {
        this.state.lastReq = p.req;
        this.state.mode = p.mode;
        const result = SmartGradeEngine.recommend(p.req);
        this.state.lastResult = result;
    }
    this.navigate('validation');
};

SGApp.loadRailwayDemoForExpert = function() {
    // Check if railway demo request already exists
    const exists = this.state.expertPendingRequests.find(r => r.projectName && r.projectName.includes('Railway'));
    if (exists) {
        alert('Railway demo case is already in the pending queue.');
        this.navigate('expert-pending');
        return;
    }
    this.runRailwayDemo();
    setTimeout(() => {
        if (this.state.lastResult && this.state.lastReq) {
            const top = this.state.lastResult.bestFit?.[0];
            const request = {
                id: 'req-railway-' + Date.now(),
                projectId: null,
                projectName: 'Railway/Transport — Rail Car Body & Structural Frame',
                submittedDate: new Date().toLocaleDateString('en-IN'),
                submittedTime: new Date().toLocaleTimeString('en-IN'),
                status: 'pending',
                note: 'Demo case: railway rail car body panels and structural frame. High strength welded construction, outdoor industrial atmosphere.',
                userNote: 'Demo: Railway application — lean duplex vs austenitic grade comparison requested.',
                req: this.state.lastReq,
                result: {
                    filteredCount: this.state.lastResult.filteredCount,
                    topGrades: (this.state.lastResult.bestFit || []).slice(0, 3).map(r => ({
                        gradeName: r.grade.grade_name,
                        family: r.grade.family,
                        fitScore: r.fitScore,
                        costBand: r.grade.cost_band,
                        summary: r.grade.summary,
                    })),
                    allFiltered: this.state.lastResult.allFiltered?.length || 0,
                },
                smartGradeTopRecommendation: top ? {
                    gradeName: top.grade.grade_name,
                    family: top.grade.family,
                    fitScore: top.fitScore,
                    costBand: top.grade.cost_band,
                } : null,
                imageInfo: null,
            };
            this.state.expertPendingRequests.push(request);
            try { localStorage.setItem('sg_expert_requests', JSON.stringify(this.state.expertPendingRequests)); } catch (e) { }
            this.navigate('expert-pending');
        }
    }, 2500);
};
