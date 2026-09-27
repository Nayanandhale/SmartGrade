// SmartGrade App — Views module
// Contains render functions for: Splash, Dashboard, Recommend, Grade Explorer, Compare

window.SGViews = {};

/* ── SPLASH ─────────────────────────────────────────────────── */
SGViews.renderSplash = function () {
    return `
<div id="splash-screen">
  <div class="splash-bg-lines"></div>
  <div class="splash-particles">
    <div class="splash-particle" style="width:120px;height:120px;top:10%;left:8%;animation-delay:0s"></div>
    <div class="splash-particle" style="width:80px;height:80px;top:60%;left:5%;animation-delay:1.5s"></div>
    <div class="splash-particle" style="width:60px;height:60px;top:20%;right:12%;animation-delay:3s"></div>
    <div class="splash-particle" style="width:100px;height:100px;bottom:15%;right:8%;animation-delay:2s"></div>
  </div>
  <div class="splash-content">
    <div class="splash-logo">Smart<span>Grade</span></div>
    <div class="splash-tagline">Intelligent Stainless Steel Grade Recommendation</div>
    <div class="splash-line"></div>
    <div class="splash-onboarding">
      <p>SmartGrade translates your application requirements into engineering constraints, filters unsuitable grades, and ranks suitable candidates — with full explainability and source traceability.</p>
      <div class="splash-mode-title">Choose your mode to begin</div>
      <div class="mode-cards">
        <div class="mode-card" onclick="SGApp.selectMode('guided')" id="mode-guided">
          <div class="mode-card-icon">🗂️</div>
          <div class="mode-card-title">Guided Mode</div>
          <div class="mode-card-desc">Plain-language questions. Ideal for new or non-specialist users.</div>
        </div>
        <div class="mode-card" onclick="SGApp.selectMode('expert')" id="mode-expert">
          <div class="mode-card-icon">⚙️</div>
          <div class="mode-card-title">Expert Mode</div>
          <div class="mode-card-desc">Technical parameters, engineering constraints, configurable weights.</div>
        </div>
      </div>
    </div>
    <div class="splash-actions">
      <button class="btn btn-primary btn-lg" onclick="SGApp.enterDemo()">Continue as Demo</button>
      <button class="btn btn-outline btn-lg" style="color:#fff;border-color:rgba(255,255,255,0.3)" onclick="SGApp.showSignIn()">Sign In</button>
    </div>
    <div style="margin-top:1.5rem;font-size:0.7rem;color:rgba(184,200,216,0.6);">
      SmartGrade Prototype — Powered by Jindal Stainless grade data &amp; engineering rules · Not an official Jindal Stainless product
    </div>
  </div>
</div>`;
};

/* ── SIDEBAR ─────────────────────────────────────────────────── */
SGViews.renderSidebar = function (activePage, mode) {
    const n = (id, icon, label) => `<div class="nav-item ${activePage === id ? 'active' : ''}" onclick="SGApp.navigate('${id}')" role="button" tabindex="0" aria-current="${activePage === id ? 'page' : 'false'}"><span class="nav-icon">${icon}</span>${label}</div>`;
    const user = SGApp.state.currentUser || { name: 'Demo User', email: 'demo@smartgrade.in', initials: 'DM' };
    const pendingCount = SGApp.state.expertPendingRequests.filter(r => r.status === 'pending').length;
    return `
<nav class="sidebar" id="sidebar" aria-label="Main navigation">
  <div class="sidebar-logo">
    <div class="sidebar-logo-text">Smart<span>Grade</span></div>
    <div class="sidebar-tagline">Grade Recommendation Platform</div>
    <div style="margin-top:0.6rem">
      <span class="badge ${mode === 'expert' ? 'badge-orange' : 'badge-steel'}" style="font-size:0.65rem">${mode === 'expert' ? '⚙ Expert Mode' : '🗂 Guided Mode'}</span>
    </div>
  </div>
  <div class="sidebar-section">
    <div class="sidebar-section-label">Workspace</div>
    ${n('dashboard', '🏠', 'Dashboard')}
    ${n('recommend', '⭐', 'Recommend Me!')}
    ${n('history', '🕒', 'Saved Projects')}
  </div>
  <div class="sidebar-section">
    <div class="sidebar-section-label">Knowledge</div>
    ${n('grades', '🔍', 'Grade Explorer')}
    ${n('compare', '📊', 'Grade Comparison')}
    ${n('visualizer', '🖼️', 'Application Visualizer')}
    ${n('property', '📐', 'Property Explorer')}
  </div>
  <div class="sidebar-section">
    <div class="sidebar-section-label">Procurement</div>
    ${mode !== 'expert' ? `${n('buy', '✅', 'Before You Buy')}
    ${n('locator', '📍', 'Sales & Services')}` : ''}
    ${n('report', '📄', 'Technical Report')}
  </div>
  <div class="sidebar-section">
    <div class="sidebar-section-label">Support</div>
    ${mode !== 'expert' ? `${n('validation', '🔬', 'Expert Validation')}` : ''}
    ${mode === 'expert' ? `
    <div class="nav-item ${activePage === 'expert-pending' ? 'active' : ''}" onclick="SGApp.navigate('expert-pending')" role="button" tabindex="0">
      <span class="nav-icon">🔔</span>Pending / Need Attention
      ${pendingCount > 0 ? `<span class="pending-badge">${pendingCount}</span>` : ''}
    </div>` : ''}
  </div>
  <div class="sidebar-user">
    <div class="user-avatar">${user.initials || 'DM'}</div>
    <div style="flex:1;min-width:0">
      <div style="font-weight:600;color:#fff;font-size:0.8rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${user.name || 'Demo User'}</div>
      <div style="font-size:0.7rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${user.email || 'demo@smartgrade.in'}</div>
    </div>
    <button class="sidebar-logout-btn" onclick="SGApp.logout()" title="Log out" aria-label="Log out">⏏</button>
  </div>
</nav>`;
};

/* ── DASHBOARD ─────────────────────────────────────────────────── */
SGViews.renderDashboard = function () {
    const recent = SGApp.state.projects.slice(-3).reverse();
    return `
<div class="page-header">
  <div>
    <div class="page-header-title">Dashboard</div>
    <div style="font-size:0.75rem;color:var(--text-soft)">Welcome back · SmartGrade Prototype</div>
  </div>
  <div class="flex gap-2">
    <button class="btn btn-primary" onclick="SGApp.navigate('recommend')">⭐ Recommend Me!</button>
    <button class="btn btn-outline" onclick="SGApp.navigate('grades')">🔍 Explore Grades</button>
  </div>
</div>
<div class="page-content">
  <!-- Stats row -->
  <div class="grid-4" style="margin-bottom:1.5rem">
    ${SGViews.statCard('12', 'Core Grades', 'Available in prototype dataset', '🔩')}
    ${SGViews.statCard('8', 'Applications', 'Engineering scenarios covered', '⚙️')}
    ${SGViews.statCard(SGApp.state.projects.length, 'Projects', 'Saved in this session', '📁')}
    ${SGViews.statCard('19', 'Locations', 'Verified Jindal India offices', '📍')}
  </div>

  <div class="grid-2" style="gap:1.5rem;margin-bottom:1.5rem">
    <!-- Quick Start -->
    <div class="card">
      <div class="section-header"><div><div class="section-title">Quick Start</div><div class="section-subtitle">Jump straight into grade recommendation</div></div></div>
      <div style="background:linear-gradient(135deg,var(--navy) 0%,var(--navy-mid) 100%);border-radius:var(--radius);padding:1.25rem;color:#fff;margin-bottom:1rem">
        <div style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--steel-light);margin-bottom:0.5rem">Try the demo scenario</div>
        <div style="font-size:0.9rem;line-height:1.55;color:rgba(255,255,255,0.9);font-style:italic">"I need a welded component for an outdoor coastal structure. It should have high strength. Cost is important but performance matters."</div>
        <button class="btn btn-primary btn-sm" style="margin-top:1rem" onclick="SGApp.runDemoScenario()">▶ Run Demo</button>
      </div>
      <div class="flex gap-2" style="flex-wrap:wrap">
        <button class="btn btn-outline btn-sm" onclick="SGApp.navigate('recommend')">⭐ Recommend Me!</button>
        <button class="btn btn-outline btn-sm" onclick="SGApp.navigate('grades')">🔍 Explore Grades</button>
        <button class="btn btn-outline btn-sm" onclick="SGApp.navigate('compare')">📊 Compare Grades</button>
      </div>
    </div>
    <!-- Recent Projects -->
    <div class="card">
      <div class="section-header"><div class="section-title">Recent Projects</div><button class="btn btn-outline btn-sm" onclick="SGApp.navigate('history')">View All</button></div>
      ${recent.length ? recent.map(p => `
      <div class="history-item" onclick="SGApp.loadProject('${p.id}')" style="margin-bottom:0.5rem">
        <div class="history-icon">📁</div>
        <div class="history-info">
          <div class="history-name">${p.name}</div>
          <div class="history-meta">${p.mode} Mode · ${p.date}</div>
          <div class="history-grade">${p.topGrade ? 'Top pick: ' + p.topGrade : 'No recommendation yet'}</div>
        </div>
        <span class="badge badge-steel">v${p.version}</span>
      </div>`).join('') : `<div style="text-align:center;padding:2rem;color:var(--text-soft)"><div style="font-size:2rem;margin-bottom:0.5rem">📄</div><div style="font-size:0.85rem">No saved projects yet.<br>Run a recommendation to create one.</div></div>`}
    </div>
  </div>

  <!-- Grade family overview -->
  <div class="card">
    <div class="section-header"><div><div class="section-title">Grade Overview</div><div class="section-subtitle">12 core grades in this prototype dataset</div></div><button class="btn btn-outline btn-sm" onclick="SGApp.navigate('grades')">Explore All →</button></div>
    <div class="grid-4">
      ${[['Austenitic', 'badge-navy', '304, 304L, 316, 316L, 321, J204Cu, 904L'], ['Ferritic', 'badge-steel', '430, 409L, J4'], ['Duplex', 'badge-orange', '2205, 2101'], ['Lean Duplex', 'badge-steel', '2101']].map(([f, b, g]) => `
      <div class="card card-hover" style="cursor:pointer" onclick="SGApp.navigate('grades')">
        <div class="badge ${b}" style="margin-bottom:0.5rem">${f}</div>
        <div style="font-size:0.8rem;color:var(--text-soft);margin-top:0.35rem">${g}</div>
      </div>`).join('')}
    </div>
  </div>
</div>`;
};

SGViews.statCard = function (val, label, sub, icon) {
    return `<div class="card" style="text-align:center">
    <div style="font-size:1.5rem;margin-bottom:0.25rem">${icon}</div>
    <div style="font-size:2rem;font-weight:900;color:var(--navy);line-height:1">${val}</div>
    <div style="font-weight:700;font-size:0.85rem;margin-top:0.25rem">${label}</div>
    <div style="font-size:0.72rem;color:var(--text-soft);margin-top:0.2rem">${sub}</div>
  </div>`;
};

/* ── GRADE EXPLORER ─────────────────────────────────────────── */
SGViews.renderGradeExplorer = function () {
    return `
<div class="page-header">
  <div class="page-header-title">Grade Explorer</div>
  <div class="flex gap-2">
    <input class="form-control" id="grade-search" placeholder="Search grades: 304, duplex, austenitic…" style="width:280px" oninput="SGViews.filterGrades(this.value)">
    <select class="form-control form-select" id="grade-family-filter" onchange="SGViews.filterGrades()" style="width:160px">
      <option value="">All Families</option>
      <option>Austenitic</option>
      <option>Ferritic</option>
      <option>Duplex</option>
      <option>High-Alloy Austenitic</option>
    </select>
  </div>
</div>
<div class="page-content">
  <div class="grid-4" id="grade-cards-grid">
    ${SG_GRADES.map(g => SGViews.gradeCard(g)).join('')}
  </div>
  <div id="grade-detail-panel" class="hidden" style="margin-top:1.5rem"></div>
</div>`;
};

SGViews.filterGrades = function (searchVal) {
    const q = (searchVal || document.getElementById('grade-search')?.value || '').toLowerCase();
    const fam = document.getElementById('grade-family-filter')?.value || '';
    const grid = document.getElementById('grade-cards-grid');
    if (!grid) return;
    grid.innerHTML = SG_GRADES.filter(g =>
        (!q || g.grade_name.toLowerCase().includes(q) || g.summary.toLowerCase().includes(q) || g.family.toLowerCase().includes(q) || (g.UNS || '').toLowerCase().includes(q)) &&
        (!fam || g.family.toLowerCase().includes(fam.toLowerCase()))
    ).map(g => SGViews.gradeCard(g)).join('') || '<div style="padding:2rem;color:var(--text-soft)">No grades match your search.</div>';
};

SGViews.gradeCard = function (g) {
    const corrosionPct = { 'Very High (aggressive acid/chloride)': 100, 'Very High (pitting/SCC resistance)': 95, 'Very High': 90, 'Excellent': 85, 'Excellent (high-temp/intergranular)': 82, 'Good-High (better than 304 in chloride)': 72, 'Good (mild environments)': 60, 'Good (mildly corrosive / natural atmosphere)': 55, 'Good (non-aggressive environments)': 50, 'Good / source family': 65, 'Moderate (mildly corrosive)': 40 };
    const strengthPct = { 'High': 100, 'Medium': 65, 'Lower-Medium': 50, 'Medium-Lower': 50 };
    const weldPct = { 'Excellent': 100, 'Good': 75, 'Good / source family': 75, 'Weldable (HAZ effects noted)': 55, 'Moderate': 45 };
    const formPct = { 'Excellent': 100, 'Good': 75, 'Good / source family': 75, 'Moderate': 50 };
    const cp = corrosionPct[g.corrosion_level] || 50;
    const sp = strengthPct[g.strength_level] || 50;
    const wp = weldPct[g.weldability_level] || 50;
    const fp = formPct[g.formability_level] || 50;
    return `<div class="grade-card" onclick="SGViews.showGradeDetail('${g.grade_id}')" id="gcard-${g.grade_id}">
    <div class="grade-family-pill">${g.family}</div>
    <div class="grade-name">${g.grade_name}</div>
    <div class="grade-uns">${g.UNS || 'Proprietary'} · ${g.designation_source}</div>
    <div class="grade-bars">
      <div class="grade-bar-row"><span class="grade-bar-label">Corrosion</span><div class="grade-bar-track"><div class="grade-bar-fill" style="width:${cp}%"></div></div></div>
      <div class="grade-bar-row"><span class="grade-bar-label">Strength</span><div class="grade-bar-track"><div class="grade-bar-fill" style="width:${sp}%"></div></div></div>
      <div class="grade-bar-row"><span class="grade-bar-label">Weldability</span><div class="grade-bar-track"><div class="grade-bar-fill orange" style="width:${wp}%"></div></div></div>
      <div class="grade-bar-row"><span class="grade-bar-label">Formability</span><div class="grade-bar-track"><div class="grade-bar-fill orange" style="width:${fp}%"></div></div></div>
    </div>
    <div class="cost-band-tag">💰 Cost Band: <strong>${g.cost_band}</strong></div>
    <div style="margin-top:0.5rem;font-size:0.7rem;color:var(--text-soft)">📄 ${g.source}</div>
  </div>`;
};

SGViews.showGradeDetail = function (gradeId) {
    const g = SG_GRADES.find(x => x.grade_id === gradeId);
    const p = SG_PROPERTIES[gradeId];
    const apps = SG_GRADE_APPLICATIONS.filter(a => a.grade_id === gradeId);
    const sust = SG_SUSTAINABILITY.filter(s => s.grade === g.grade_name);
    const panel = document.getElementById('grade-detail-panel');
    if (!panel) return;
    document.querySelectorAll('.grade-card').forEach(c => c.classList.remove('selected'));
    const card = document.getElementById('gcard-' + gradeId);
    if (card) { card.classList.add('selected'); card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    panel.classList.remove('hidden');
    panel.innerHTML = `
  <div class="card">
    <div class="flex items-center justify-between" style="margin-bottom:1rem">
      <div>
        <div class="grade-family-pill">${g.family}</div>
        <div style="font-size:2rem;font-weight:900;color:var(--navy)">${g.grade_name}</div>
        <div style="font-size:0.8rem;color:var(--text-soft)">${g.UNS || 'Proprietary'} · ${g.designation_source}</div>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-outline btn-sm" onclick="SGApp.addToCompare('${gradeId}')">+ Compare</button>
        <button class="btn btn-outline btn-sm" onclick="document.getElementById('grade-detail-panel').classList.add('hidden')">✕ Close</button>
      </div>
    </div>
    <p style="font-size:0.88rem;line-height:1.6;color:var(--text-mid);margin-bottom:1rem">${g.summary}</p>
    <div style="margin-bottom:0.5rem;font-size:0.72rem;color:var(--text-soft)">📄 Source: ${g.source}</div>

    <div class="tab-bar" id="gd-tabs" style="margin-bottom:1rem">
      ${['properties', 'corrosion', 'applications', 'sustainability'].map((t, i) => `<div class="tab-btn ${i === 0 ? 'active' : ''}" onclick="SGViews.switchGDTab('${t}','${gradeId}')">${t.charAt(0).toUpperCase() + t.slice(1)}</div>`).join('')}
    </div>
    <div id="gd-content">
      ${SGViews.gradeDetailProperties(g, p)}
    </div>
  </div>`;
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

SGViews.switchGDTab = function (tab, gradeId) {
    document.querySelectorAll('#gd-tabs .tab-btn').forEach(b => b.classList.toggle('active', b.textContent.toLowerCase() === tab));
    const g = SG_GRADES.find(x => x.grade_id === gradeId);
    const p = SG_PROPERTIES[gradeId];
    const c = document.getElementById('gd-content');
    if (!c) return;
    if (tab === 'properties') c.innerHTML = SGViews.gradeDetailProperties(g, p);
    else if (tab === 'corrosion') c.innerHTML = SGViews.gradeDetailCorrosion(g);
    else if (tab === 'applications') c.innerHTML = SGViews.gradeDetailApps(gradeId, g);
    else if (tab === 'sustainability') c.innerHTML = SGViews.gradeDetailSustain(g);
};

SGViews.gradeDetailProperties = function (g, p) {
    const na = '<span class="na">Data not available</span>';
    const row = (l, v) => `<tr><td style="font-weight:600;color:var(--text-mid);font-size:0.8rem;width:180px">${l}</td><td style="font-size:0.82rem">${v ?? na}</td></tr>`;
    const m = p && p.mechanical;
    const ph = p && p.physical;
    const ch = p && p.chemistry;
    return `
  <div class="grid-2">
    <div>
      <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;color:var(--orange);margin-bottom:0.6rem">Mechanical Properties</div>
      <table class="sg-table">
        ${row('Min Yield Strength', m && m.YS_min_MPa ? m.YS_min_MPa + ' MPa' : null)}
        ${row('Min Tensile Strength', m && m.UTS_min_MPa ? m.UTS_min_MPa + ' MPa' : null)}
        ${row('Min Elongation', m && m.EL_min_pct ? m.EL_min_pct + '%' : null)}
        ${row('Hardness', m && m.hardness)}
        ${row('Density', ph && ph.density_kg_m3 ? ph.density_kg_m3 + ' kg/m³' : null)}
        ${row('Elastic Modulus', ph && ph.modulus_GPa ? ph.modulus_GPa + ' GPa' : null)}
      </table>
      <div style="font-size:0.72rem;color:var(--text-soft);margin-top:0.5rem">Source: ${g.source}</div>
    </div>
    <div>
      <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;color:var(--orange);margin-bottom:0.6rem">Fabrication & Service</div>
      <table class="sg-table">
        ${row('Corrosion Resistance', g.corrosion_level)}
        ${row('Weldability', g.weldability_level)}
        ${row('Formability', g.formability_level)}
        ${row('Strength Level', g.strength_level)}
        ${row('Temperature Notes', g.temperature_notes)}
        ${row('Cost Band', g.cost_band + ' (prototype reference — not Jindal pricing)')}
        ${row('Product Forms', g.product_forms.join(', '))}
      </table>
    </div>
  </div>
  ${ch ? `<div style="margin-top:1rem"><div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;color:var(--orange);margin-bottom:0.6rem">Chemistry (wt%) — Element compositions from source data</div>
  <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.5rem">
    ${SGViews._chemBadges(ch)}
  </div>
  <div style="font-size:0.72rem;color:var(--text-soft);margin-top:0.35rem">All values in weight %. Source: ${g.source}</div></div>` : ''}`;
};

SGViews._chemBadges = function(ch) {
    const ELEM_LABELS = [
        ['C_max',  'Carbon (C)', 'max'],
        ['Mn_max', 'Manganese (Mn)', 'max'],
        ['Si_max', 'Silicon (Si)', 'max'],
        ['P_max',  'Phosphorus (P)', 'max'],
        ['S_max',  'Sulfur (S)', 'max'],
        ['Ni_min', 'Nickel (Ni)', 'min'],
        ['Ni_max', 'Nickel (Ni)', 'max'],
        ['Cr_min', 'Chromium (Cr)', 'min'],
        ['Cr_max', 'Chromium (Cr)', 'max'],
        ['Mo_max', 'Molybdenum (Mo)', 'max'],
        ['N_max',  'Nitrogen (N)', 'max'],
        ['Ti',     'Titanium (Ti)', ''],
        ['Cu',     'Copper (Cu)', ''],
    ];
    return ELEM_LABELS
        .filter(([k]) => ch[k] !== null && ch[k] !== undefined)
        .map(([k, name, qualifier]) => {
            const val = ch[k];
            const label = qualifier ? `${name} (${qualifier})` : name;
            const pct = typeof val === 'number' ? val.toFixed(2) + '%' : val;
            return `<div style="background:var(--light);border:1px solid var(--border);padding:0.45rem 0.75rem;border-radius:var(--radius-sm);min-width:130px">
                <div style="font-size:0.68rem;color:var(--text-soft);font-weight:600;text-transform:uppercase;letter-spacing:0.03em">${label}</div>
                <div style="font-weight:800;font-size:1rem;color:var(--navy);margin-top:0.1rem">${pct}</div>
            </div>`;
        }).join('');
};

SGViews.gradeDetailCorrosion = function (g) {
    return `<div style="padding:0.5rem 0">
    <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;color:var(--orange);margin-bottom:0.75rem">Corrosion & Environment Profile</div>
    <div class="check-item" style="margin-bottom:0.5rem">
      <div class="check-icon">🛡️</div>
      <div class="check-content"><div class="check-title">Corrosion Level</div><div class="check-desc">${g.corrosion_level}</div></div>
    </div>
    <div class="check-item" style="margin-bottom:0.5rem">
      <div class="check-icon">🌡️</div>
      <div class="check-content"><div class="check-title">Temperature Notes</div><div class="check-desc">${g.temperature_notes}</div></div>
    </div>
    <div style="margin-top:1rem;padding:0.75rem;background:var(--light);border-radius:var(--radius-sm);font-size:0.8rem;color:var(--text-mid)">
      ℹ️ Detailed corrosion test data (PREN values, CPT, SCC testing) is not available in the prototype dataset. Verify with Jindal technical documentation before final specification.
    </div>
    <div style="margin-top:0.5rem;font-size:0.72rem;color:var(--text-soft)">Source: ${g.source}</div>
  </div>`;
};

SGViews.gradeDetailApps = function (gradeId, g) {
    const apps = SG_GRADE_APPLICATIONS.filter(a => a.grade_id === gradeId);
    return `<div>
    <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;color:var(--orange);margin-bottom:0.75rem">Application Evidence</div>
    ${apps.length ? apps.map(a => {
        const appDef = SG_APPLICATIONS.find(x => x.application_id === a.application_id);
        return appDef ? `<div class="check-item ${a.evidence_type.startsWith('Direct') ? 'checked' : ''}" style="margin-bottom:0.5rem">
        <div class="check-icon">${appDef.icon}</div>
        <div class="check-content">
          <div class="check-title">${appDef.name} <span class="badge ${a.evidence_type.startsWith('Direct') ? 'badge-success' : 'badge-warn'}" style="font-size:0.65rem">${a.evidence_type}</span></div>
          <div class="check-desc">${a.note}</div>
          <div style="margin-top:0.3rem"><span class="source-chip">📄 ${a.source}</span></div>
        </div>
      </div>` : '';
    }).join('') : '<div style="color:var(--text-soft);font-size:0.85rem">No application evidence in prototype dataset for this grade.</div>'}
  </div>`;
};

SGViews.gradeDetailSustain = function (g) {
    const entries = SG_SUSTAINABILITY.filter(s => s.grade === g.grade_name);
    return `<div>
    <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;color:var(--orange);margin-bottom:0.75rem">Sustainability Evidence (Evidence Key Only)</div>
    ${entries.map(s => `
    <div class="sustain-row">
      <div class="sustain-icon">${s.pcf_assessment === 'Conducted' ? '✅' : '❌'}</div>
      <div>
        <div class="sustain-status-text">${s.pcf_assessment}</div>
        ${s.pcf_assessment === 'Conducted' ? `<div class="sustain-details">Boundary: ${s.boundary} · Methodology: ${s.methodology} · Period: ${s.assessment_period}<br>Source: ${s.source}</div>` : `<div class="sustain-details">${s.source}</div>`}
      </div>
    </div>`).join('')}
    <div class="sustain-disclaimer">⚠️ This is an evidence key. No numeric PCF values are displayed. Having a PCF assessment does not imply one grade is "more sustainable" than another. See source document for full details.</div>
  </div>`;
};

/* ── COMPARISON TABLE ─────────────────────────────────────────── */
SGViews.renderCompare = function () {
    const sel = SGApp.state.compareGrades.map(id => SG_GRADES.find(g => g.grade_id === id)).filter(Boolean);
    return `
<div class="page-header">
  <div class="page-header-title">Grade Comparison</div>
  <div class="flex gap-2">
    <select class="form-control form-select" id="compare-add-sel" style="width:140px">
      <option value="">+ Add grade</option>
      ${SG_GRADES.filter(g => !SGApp.state.compareGrades.includes(g.grade_id)).map(g => `<option value="${g.grade_id}">${g.grade_name}</option>`).join('')}
    </select>
    <button class="btn btn-navy btn-sm" onclick="SGApp.addSelectedToCompare()">Add</button>
    <button class="btn btn-outline btn-sm" onclick="SGApp.clearCompare()">Clear All</button>
  </div>
</div>
<div class="page-content">
  ${sel.length < 2 ? `<div style="text-align:center;padding:3rem;color:var(--text-soft)"><div style="font-size:3rem;margin-bottom:1rem">📊</div><div>Select 2–3 grades to compare.<br>Use the Grade Explorer to add grades, or use the dropdown above.</div></div>` : SGViews.buildCompareTable(sel)}
</div>`;
};

SGViews.buildCompareTable = function (grades) {
    const na = '<span class="na">Data not available</span>';
    const p = id => SG_PROPERTIES[id];
    const sust = g => { const s = SG_SUSTAINABILITY.find(x => x.grade === g.grade_name); return s && s.pcf_assessment === 'Conducted' ? '✅ Conducted' : '❌ Not in dataset'; };
    const rows = [
        ['Family', g => g.family],
        ['UNS / Designation', g => g.UNS || 'Proprietary'],
        ['Corrosion Level', g => g.corrosion_level],
        ['Strength Level', g => g.strength_level],
        ['Weldability', g => g.weldability_level],
        ['Formability', g => g.formability_level],
        ['Min YS (MPa)', g => { const m = p(g.grade_id)?.mechanical; return m?.YS_min_MPa ? m.YS_min_MPa + ' MPa' : na; }],
        ['Min UTS (MPa)', g => { const m = p(g.grade_id)?.mechanical; return m?.UTS_min_MPa ? m.UTS_min_MPa + ' MPa' : na; }],
        ['Temperature Notes', g => g.temperature_notes],
        ['Product Forms', g => g.product_forms.join(', ')],
        ['Cost Band', g => `<span class="badge badge-steel">${g.cost_band}</span><div style="font-size:0.65rem;color:var(--text-soft);margin-top:2px">Prototype reference only</div>`],
        ['PCF Assessment Evidence', g => sust(g)],
    ];
    return `<div style="overflow-x:auto"><table class="sg-table"><thead><tr>
    <th style="min-width:160px">Attribute</th>
    ${grades.map(g => `<th><div style="font-size:1.1rem;font-weight:900">${g.grade_name}</div><div style="font-size:0.72rem;font-weight:400;opacity:0.8">${g.family}</div></th>`).join('')}
  </tr></thead><tbody>
  ${rows.map(([label, fn]) => `<tr><td style="font-weight:600;color:var(--text-mid)">${label}</td>${grades.map(g => `<td>${fn(g) || na}</td>`).join('')}</tr>`).join('')}
  </tbody></table></div>
  <div style="margin-top:1rem;font-size:0.75rem;color:var(--text-soft)">Missing data is shown explicitly as "Data not available". Do not infer values for absent fields. Verify with Jindal technical documentation.</div>`;
};
