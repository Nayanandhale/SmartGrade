// SmartGrade App — Views module (Redesigned with UI References)
// Contains render functions for: Splash, Sidebar, Dashboard, Grade Explorer, Compare

window.SGViews = window.SGViews || {};

/* ── SPLASH SCREEN (Two-Column Reference) ─────────────────────────── */
SGViews.renderSplash = function () {
    return `
<div class="splash-wrapper" id="splash-screen">
  <!-- Top Navigation Header -->
  <header class="splash-topbar">
    <div class="flex items-center gap-3">
      <img src="images/smartgrade_logo.png" alt="SmartGrade" class="splash-logo-img">
    </div>
    <ul class="splash-nav-links">
      <li><a href="#about" onclick="alert('SmartGrade provides AI-driven engineering intelligence for stainless steel selection.')">About</a></li>
      <li><a href="#solutions" onclick="alert('Solutions: Guided Mode, Expert Engineering Mode, Material Trade-Offs, and Source Traceability.')">Solutions</a></li>
      <li><a href="#industries" onclick="alert('Supported Industries: Marine, Chemical, Architecture, Transport, Energy, Food & Pharma.')">Industries</a></li>
      <li><a href="#contact" onclick="alert('Contact: Jindal Stainless Technical Advisory Network')">Contact</a></li>
    </ul>
    <button class="splash-btn-primary" onclick="SGApp.enterDemo()">
      Get Started ➔
    </button>
  </header>

  <!-- Hero Content Grid -->
  <div class="splash-grid-hero">
    <!-- Left Column: Hero Text & Onboarding -->
    <div class="splash-hero-left">
      <div class="splash-intel-tag">ENGINEERING INTELLIGENCE FOR STAINLESS STEEL</div>
      <h1 class="splash-main-h1">
        BUILT<br>
        FOR A<br>
        <span class="orange-glow-text">STRONGER<br>TOMORROW</span>
      </h1>
      <p class="splash-sub-desc">
        Translate your application into the right grade with data-driven recommendations, source traceability, and engineering constraints.
      </p>

      <!-- Mode Cards -->
      <div class="splash-mode-picker-row">
        <div class="splash-mode-box" onclick="SGApp.selectMode('guided'); SGApp.enterDemo();" id="mode-guided">
          <div class="splash-mode-box-header">
            <span class="splash-mode-icon">🗂️</span>
            <div class="splash-mode-arrow">➔</div>
          </div>
          <div class="splash-mode-name">Guided Mode</div>
          <div class="splash-mode-info">Step-by-step guidance for your application</div>
        </div>

        <div class="splash-mode-box" onclick="SGApp.selectMode('expert'); SGApp.enterDemo();" id="mode-expert">
          <div class="splash-mode-box-header">
            <span class="splash-mode-icon">⚙️</span>
            <div class="splash-mode-arrow">➔</div>
          </div>
          <div class="splash-mode-name">Expert Mode</div>
          <div class="splash-mode-info">Advanced inputs for engineering professionals</div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="splash-cta-row">
        <button class="splash-btn-primary" style="padding:0.75rem 1.75rem;font-size:0.95rem" onclick="SGApp.enterDemo()">
          ▶ Explore Prototype Demo
        </button>
        <button class="btn btn-outline" style="color:#fff;border-color:rgba(255,255,255,0.25);padding:0.75rem 1.5rem" onclick="SGApp.showSignIn()">
          Sign In
        </button>
      </div>

      <!-- Trust Bar -->
      <div class="splash-trust-footer">
        <strong style="color:#94A3B8">Trusted by industries worldwide:</strong> Architecture &bull; Automotive &bull; Process Industry &bull; Infrastructure &bull; Energy &bull; and more...
      </div>
    </div>

    <!-- Right Column: Industrial Steel Hero Visual -->
    <div class="splash-hero-right">
      <img src="images/hero_steel_coil.jpg" alt="Stainless Steel Manufacturing" class="splash-hero-img-full">
      <div class="splash-hero-right-overlay"></div>
      <div class="splash-floating-pill-badge">
        PEOPLE &bull; MATERIALS &bull; POSSIBILITIES
      </div>
    </div>
  </div>
</div>`;
};

/* ── SIDEBAR (Redesigned) ─────────────────────────────────────────── */
SGViews.renderSidebar = function (activePage, mode) {
    const n = (id, icon, label) => `
    <div class="nav-item ${activePage === id ? 'active' : ''}" onclick="SGApp.navigate('${id}')" role="button" tabindex="0" aria-current="${activePage === id ? 'page' : 'false'}">
      <span class="nav-icon">${icon}</span>
      <span>${label}</span>
    </div>`;
    const user = SGApp.state.currentUser || { name: 'Student', email: 'demo@smartgrade.in', initials: 'S' };
    const pendingCount = (SGApp.state.expertPendingRequests || []).filter(r => r.status === 'pending').length;

    return `
<nav class="sidebar" id="sidebar" aria-label="Main navigation">
  <div class="sidebar-logo-img-wrap">
    <img src="images/smartgrade_logo.png" alt="SmartGrade Logo" class="sidebar-logo-img">
    <div class="sidebar-mode-pill ${mode === 'expert' ? 'expert' : ''}">
      ${mode === 'expert' ? '⚙ Expert Mode' : '🗂 Guided Mode'}
    </div>
  </div>

  <div class="sidebar-section">
    <div class="sidebar-section-label">WORKSPACE</div>
    ${n('dashboard', '🏠', 'Dashboard')}
    ${n('recommend', '⭐', 'Recommend Me!')}
    ${n('history', '🕒', 'Saved Projects')}
  </div>

  <div class="sidebar-section">
    <div class="sidebar-section-label">KNOWLEDGE</div>
    ${n('grades', '🔍', 'Grade Explorer')}
    ${n('compare', '📊', 'Grade Comparison')}
    ${n('visualizer', '🖼️', 'Application Visualizer')}
    ${n('property', '📐', 'Property Explorer')}
  </div>

  <div class="sidebar-section">
    <div class="sidebar-section-label">PROCUREMENT</div>
    ${mode !== 'expert' ? `${n('buy', '✅', 'Before You Buy')}
    ${n('locator', '📍', 'Sales & Services')}` : ''}
    ${n('report', '📄', 'Technical Report')}
  </div>

  <div class="sidebar-section">
    <div class="sidebar-section-label">SUPPORT</div>
    ${mode !== 'expert' ? `${n('validation', '🔬', 'Expert Validation')}` : ''}
    ${mode === 'expert' ? `
    <div class="nav-item ${activePage === 'expert-pending' ? 'active' : ''}" onclick="SGApp.navigate('expert-pending')" role="button" tabindex="0">
      <span class="nav-icon">🔔</span>Pending Requests
      ${pendingCount > 0 ? `<span class="pending-badge" style="background:var(--orange);color:#fff;border-radius:10px;padding:0.1rem 0.4rem;font-size:0.65rem;margin-left:auto">${pendingCount}</span>` : ''}
    </div>` : ''}
  </div>

  <div class="sidebar-user" style="margin-top:auto;padding:1rem 1.25rem;border-top:1px solid var(--border-subtle);display:flex;align-items:center;gap:0.75rem">
    <div class="topbar-avatar" style="width:32px;height:32px">${user.initials ? user.initials[0] : 'S'}</div>
    <div style="flex:1;min-width:0">
      <div style="font-weight:600;color:#fff;font-size:0.8rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${user.name || 'Student'}</div>
      <div style="font-size:0.7rem;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${user.email || 'student@smartgrade.in'}</div>
    </div>
    <button onclick="SGApp.logout()" title="Log out" aria-label="Log out" style="color:var(--text-muted);font-size:1.1rem;cursor:pointer">⏏</button>
  </div>
</nav>`;
};

/* ── DASHBOARD (Top-Right Reference) ──────────────────────────────── */
SGViews.renderDashboard = function () {
    const recent = (SGApp.state.projects || []).slice(-3).reverse();
    return `
<div class="page-content" style="padding:1.5rem 2rem">
  <!-- Hero Banner with Sunset Steel Architecture -->
  <div class="dash-hero-container">
    <img src="images/dashboard_hero_bg.jpg" alt="Stainless Steel Architecture" class="dash-hero-bg-img">
    <div class="dash-hero-gradient"></div>
    
    <div class="dash-hero-inner">
      <div class="dash-tag-small">WELCOME BACK</div>
      <h1 class="dash-title-lg">What are you building?</h1>
      <p class="dash-desc-sub">
        Describe your application and let SmartGrade find the right stainless steel grade for you.
      </p>

      <!-- Interactive Search Box -->
      <div class="dash-search-input-box">
        <input type="text" id="dash-prompt-input" value="e.g. I need a welded component for an outdoor coastal structure. It should have high strength. Cost is important but performance matters." onkeydown="if(event.key==='Enter')SGApp.runPromptInput(this.value)">
        <button class="dash-search-submit-btn" onclick="SGApp.runPromptInput()" title="Run Recommendation">➔</button>
      </div>

      <!-- Quick Action Chips -->
      <div class="dash-action-chips">
        <div class="dash-action-chip" onclick="document.getElementById('dash-prompt-input').focus(); document.getElementById('dash-prompt-input').select();">
          <span>📝</span> Text Input
        </div>
        <div class="dash-action-chip" onclick="SGApp.navigate('recommend'); setTimeout(()=>{ const inp = document.getElementById('img-upload-input'); if(inp) inp.click(); }, 200);">
          <span>📷</span> Upload Image
        </div>
        <div class="dash-action-chip" onclick="document.getElementById('dash-prompt-input').value='Automotive exhaust system, high temperature up to 800°C, welded, cost-effective'; SGApp.runPromptInput();">
          <span>💡</span> Use Example
        </div>
      </div>
    </div>

    <!-- Floating Branding Tag -->
    <div class="dash-corner-tag">
      IDEAS &bull; MATERIALS &bull; APPLICATIONS &bull; REAL SOLUTIONS
    </div>
  </div>

  <!-- 4 Stats Cards Row (Matching Reference) -->
  <div class="stats-cards-grid-4">
    <div class="stat-box-modern">
      <div class="stat-icon-tile">🔩</div>
      <div>
        <div class="stat-num-val">12</div>
        <div class="stat-label-head">CORE GRADES</div>
        <div class="stat-label-sub">Available in prototype dataset</div>
      </div>
    </div>

    <div class="stat-box-modern">
      <div class="stat-icon-tile">⚙️</div>
      <div>
        <div class="stat-num-val">8</div>
        <div class="stat-label-head">APPLICATIONS</div>
        <div class="stat-label-sub">Engineering scenarios covered</div>
      </div>
    </div>

    <div class="stat-box-modern">
      <div class="stat-icon-tile">📍</div>
      <div>
        <div class="stat-num-val">19</div>
        <div class="stat-label-head">SERVICE LOCATIONS</div>
        <div class="stat-label-sub">Verified Jindal India offices</div>
      </div>
    </div>

    <div class="stat-box-modern">
      <div class="stat-icon-tile">🌱</div>
      <div>
        <div class="stat-num-val">12</div>
        <div class="stat-label-head">PCF RECORDS</div>
        <div class="stat-label-sub">Sustainability evidence available</div>
      </div>
    </div>
  </div>

  <!-- Quick Scenarios & Recent Projects Grid -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
    <!-- Quick Scenario Launcher -->
    <div class="rec-input-panel-card">
      <div class="section-title" style="color:#fff;font-size:1.05rem;font-weight:700;margin-bottom:0.3rem">Quick Demonstration Scenarios</div>
      <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:1rem">Launch verified end-to-end recommendation pipelines</div>
      
      <div style="background:rgba(255,255,255,0.04);border:1px solid var(--border-subtle);border-radius:8px;padding:1rem;margin-bottom:0.75rem">
        <div style="font-size:0.75rem;font-weight:700;color:var(--orange);text-transform:uppercase;margin-bottom:0.25rem">Scenario 1: Coastal Infrastructure</div>
        <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.4">Welded marine environment with high chloride exposure and structural strength requirements.</div>
        <button class="btn btn-sm btn-primary" style="margin-top:0.75rem;background:var(--orange);border:none" onclick="SGApp.runDemoScenario()">▶ Run Coastal Demo (316L)</button>
      </div>

      <div style="background:rgba(255,255,255,0.04);border:1px solid var(--border-subtle);border-radius:8px;padding:1rem">
        <div style="font-size:0.75rem;font-weight:700;color:#60A5FA;text-transform:uppercase;margin-bottom:0.25rem">Scenario 2: Railway Transport Frame</div>
        <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.4">Rail car body panels and structural frame requiring weldability, formability and high strength.</div>
        <button class="btn btn-sm btn-outline" style="margin-top:0.75rem;color:#fff;border-color:rgba(255,255,255,0.2)" onclick="SGApp.runRailwayDemo()">▶ Run Railway Demo (304 / Duplex)</button>
      </div>
    </div>

    <!-- Recent Projects -->
    <div class="rec-input-panel-card">
      <div class="section-title" style="color:#fff;font-size:1.05rem;font-weight:700;margin-bottom:0.3rem">Recent Projects</div>
      <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:1rem">Saved grade recommendation records</div>
      
      ${recent.length === 0 ? `
      <div style="text-align:center;padding:2rem 1rem;color:var(--text-muted);font-size:0.85rem">
        <div style="font-size:2rem;margin-bottom:0.5rem">📁</div>
        No saved projects yet.<br>Run a recommendation and save your results to see them here.
        <div style="margin-top:1rem">
          <button class="btn btn-sm btn-primary" style="background:var(--orange);border:none" onclick="SGApp.navigate('recommend')">Start First Recommendation</button>
        </div>
      </div>` : `
      <div style="display:flex;flex-direction:column;gap:0.75rem">
        ${recent.map(p => `
        <div style="background:rgba(255,255,255,0.04);border:1px solid var(--border-subtle);border-radius:8px;padding:0.85rem;display:flex;align-items:center;justify-content:space-between">
          <div>
            <div style="font-weight:700;color:#fff;font-size:0.88rem">${p.name || 'Untitled Project'}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.2rem">Grade: <span style="color:var(--orange);font-weight:700">${p.topGrade || 'N/A'}</span> &bull; ${p.date || 'Recent'}</div>
          </div>
          <button class="btn btn-sm btn-outline" style="color:#fff;border-color:rgba(255,255,255,0.2)" onclick="SGApp.navigate('history')">View ➔</button>
        </div>`).join('')}
      </div>`}
    </div>
  </div>
</div>`;
};

SGViews.statCard = function (num, label, desc, icon) {
    return `
  <div class="stat-box-modern">
    <div class="stat-icon-tile">${icon || '🔩'}</div>
    <div>
      <div class="stat-num-val">${num}</div>
      <div class="stat-label-head">${label}</div>
      <div class="stat-label-sub">${desc}</div>
    </div>
  </div>`;
};

/* ── GRADE EXPLORER (Bottom-Left Reference) ────────────────────────── */
SGViews.renderGradeExplorer = function () {
    const grades = SG_GRADES || [];
    // Build family pills from actual data (distinct top-level families)
    const families = ['All Grades', 'Austenitic', 'Ferritic', 'Duplex', 'Lean Duplex', 'High-Alloy Austenitic'];

    return `
<div class="page-content" style="padding:1.5rem 2rem">
  <!-- Breadcrumb & Back Navigation -->
  <div class="breadcrumb-container">
    <div class="breadcrumb-left">
      <button class="back-btn-pill" onclick="SGApp.goBack('dashboard')">
        ← Back
      </button>
      <div class="breadcrumb-path">
        <span>Knowledge</span>
        <span>/</span>
        <span class="current">Grade Explorer</span>
      </div>
    </div>
    <div class="breadcrumb-actions">
      <button class="btn btn-outline btn-sm" style="color:#fff;border-color:rgba(255,255,255,0.2)" onclick="SGApp.navigate('compare')">
        📊 Grade Comparison (${(SGApp.state.compareGrades || []).length})
      </button>
    </div>
  </div>

  <!-- Filter Pills Bar & Search -->
  <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-bottom:1.25rem">
    <div style="display:flex;gap:0.5rem;flex-wrap:wrap" id="family-pills">
      ${families.map(f => `
      <button class="result-filter-btn ${f === 'All Grades' ? 'active' : ''}" onclick="SGViews.filterGrades('${f}', this)">
        ${f}
      </button>`).join('')}
    </div>

    <div class="topbar-search" style="width:280px">
      <span style="font-size:0.85rem">🔍</span>
      <input type="text" id="grade-search" placeholder="Search grades (e.g. 304, 316L, 2205)…" oninput="SGViews.filterGrades()">
    </div>
  </div>

  <!-- Two-Column Layout -->
  <div class="grade-explorer-container">
    <!-- Left: Grade Cards List -->
    <div class="grade-list-cards-stack" id="grade-cards-list">
      ${grades.map((g, idx) => SGViews.gradeCard(g, idx === 0)).join('')}
    </div>

    <!-- Right: Grade Detail Canvas -->
    <div class="grade-detail-canvas" id="grade-detail-pane">
      ${grades.length ? SGViews.showGradeDetail(grades[0].grade_id) : '<div style="color:var(--text-muted)">Select a grade</div>'}
    </div>
  </div>
</div>`;
};

SGViews.gradeCard = function (g, isActive = false) {
    const thumb = (g.grade_id === 'G003' || g.grade_id === 'G004')
        ? 'images/steel_pipes_tubes.jpg'
        : 'images/grade_card_steel_sheets.jpg';
    const props = (SG_PROPERTIES || {})[g.grade_id] || {};
    const ysMpa = props.mechanical ? props.mechanical.YS_min_MPa : null;

    return `
<div class="grade-row-card ${isActive ? 'active' : ''}" id="gcard-${g.grade_id}" onclick="SGViews.selectGradeDetail('${g.grade_id}')">
  <img src="${thumb}" alt="${g.grade_name}" class="grade-thumb-img">
  <div style="flex:1;min-width:0">
    <div style="display:flex;align-items:center;justify-content:space-between">
      <div style="font-size:1.15rem;font-weight:800;color:#fff">${g.grade_name}</div>
      <span style="font-size:0.65rem;font-weight:700;color:var(--orange);background:rgba(242,101,34,0.15);padding:0.15rem 0.45rem;border-radius:4px">${g.family}</span>
    </div>
    <div style="font-size:0.72rem;color:var(--text-muted);margin-top:0.15rem">${g.UNS || 'Proprietary'}</div>
    <div style="display:flex;gap:0.4rem;margin-top:0.4rem;font-size:0.7rem;color:var(--text-secondary)">
      <span>Corrosion: <strong style="color:#fff">${g.corrosion_level ? g.corrosion_level.split(' ')[0] : 'N/A'}</strong></span>
      <span>&bull;</span>
      <span>Yield: <strong style="color:#fff">${ysMpa !== null && ysMpa !== undefined ? ysMpa + ' MPa' : 'N/A'}</strong></span>
    </div>
  </div>
</div>`;
};

SGViews.selectGradeDetail = function (gradeId) {
    document.querySelectorAll('.grade-row-card').forEach(c => c.classList.remove('active'));
    document.getElementById('gcard-' + gradeId)?.classList.add('active');
    const pane = document.getElementById('grade-detail-pane');
    if (pane) pane.innerHTML = SGViews.showGradeDetail(gradeId);
};

SGViews.filterGrades = function (family, btnEl) {
    if (btnEl) {
        document.querySelectorAll('#family-pills .result-filter-btn').forEach(b => b.classList.remove('active'));
        btnEl.classList.add('active');
    }
    const activeFamilyBtn = document.querySelector('#family-pills .result-filter-btn.active');
    const currentFamily = activeFamilyBtn ? activeFamilyBtn.innerText.trim() : 'All Grades';
    const query = (document.getElementById('grade-search')?.value || '').trim().toLowerCase();

    let filtered = SG_GRADES || [];
    if (currentFamily !== 'All Grades') {
        // Use startsWith/includes so 'Austenitic' matches 'Austenitic / Ni-saving', 'Ferritic / Stabilized', etc.
        filtered = filtered.filter(g => g.family && g.family.toLowerCase().startsWith(currentFamily.toLowerCase()));
    }
    if (query) {
        filtered = filtered.filter(g =>
            (g.grade_name && g.grade_name.toLowerCase().includes(query)) ||
            (g.UNS && g.UNS.toLowerCase().includes(query)) ||
            (g.summary && g.summary.toLowerCase().includes(query)) ||
            (g.family && g.family.toLowerCase().includes(query))
        );
    }

    const listEl = document.getElementById('grade-cards-list');
    if (listEl) {
        if (!filtered.length) {
            listEl.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text-muted);font-size:0.85rem">No grades found matching your criteria.</div>';
        } else {
            listEl.innerHTML = filtered.map((g, idx) => SGViews.gradeCard(g, idx === 0)).join('');
            SGViews.selectGradeDetail(filtered[0].grade_id);
        }
    }
};

SGViews.showGradeDetail = function (gradeId) {
    const g = (SG_GRADES || []).find(x => x.grade_id === gradeId);
    if (!g) return '<div style="color:var(--text-muted)">Grade not found.</div>';

    const isCompared = (SGApp.state.compareGrades || []).includes(g.grade_id);
    const heroImage = (g.grade_id === 'G003' || g.grade_id === 'G004')
        ? 'images/steel_pipes_tubes.jpg'
        : 'images/grade_card_steel_sheets.jpg';

    return `
<div>
  <!-- Header Bar -->
  <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1rem">
    <div>
      <div style="display:flex;align-items:center;gap:0.75rem">
        <h2 style="font-size:2.2rem;font-weight:900;color:#fff;letter-spacing:-0.02em;line-height:1">${g.grade_name}</h2>
        <span class="badge" style="background:rgba(242,101,34,0.18);color:var(--orange);border:1px solid rgba(242,101,34,0.3);font-size:0.75rem;padding:0.2rem 0.6rem;border-radius:4px">${g.family}</span>
      </div>
      <div style="font-size:0.82rem;color:var(--text-muted);margin-top:0.35rem">
        UNS: <strong style="color:#fff">${g.UNS || 'Proprietary'}</strong> &bull; Designation: <strong style="color:#fff">${g.designation_source || 'N/A'}</strong>
      </div>
    </div>

    <div style="display:flex;gap:0.6rem">
      <button class="btn btn-sm ${isCompared ? 'btn-navy' : 'btn-outline'}" style="color:#fff;border-color:rgba(255,255,255,0.25)" onclick="SGViews.toggleCompare('${g.grade_id}')">
        ${isCompared ? '✓ Added to Compare' : '+ Add to Compare'}
      </button>
      <button class="btn btn-sm btn-outline" style="color:#fff;border-color:rgba(255,255,255,0.25)" onclick="alert('Bookmark saved for ${g.grade_name}')" title="Save Bookmark">
        🔖
      </button>
    </div>
  </div>

  <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.6;margin-bottom:1.25rem">
    ${g.summary || 'Premium stainless steel grade engineered for demanding industrial and structural applications.'}
  </p>

  <!-- Banner Image -->
  <div style="position:relative;border-radius:8px;overflow:hidden;margin-bottom:1.5rem;border:1px solid var(--border-subtle)">
    <img src="${heroImage}" alt="${g.grade_name} Application Visual" style="width:100%;height:180px;object-fit:cover;display:block">
    <div style="position:absolute;bottom:0.75rem;left:1rem;background:rgba(12,16,23,0.75);backdrop-filter:blur(8px);padding:0.3rem 0.75rem;border-radius:4px;border:1px solid var(--border-subtle);font-size:0.72rem;color:#E2E8F0">
      Verified Jindal Grade Form &bull; Available in plates, sheets, bars &amp; tubes
    </div>
  </div>

  <!-- Tabs Navigation -->
  <div class="rec-tabs-row" style="margin-bottom:1.25rem" id="gd-tab-bar">
    <button class="rec-tab-btn active" onclick="SGViews.switchGDTab('properties', '${g.grade_id}', this)">Key Properties</button>
    <button class="rec-tab-btn" onclick="SGViews.switchGDTab('chemical', '${g.grade_id}', this)">Chemical Composition</button>
    <button class="rec-tab-btn" onclick="SGViews.switchGDTab('mechanical', '${g.grade_id}', this)">Mechanical Properties</button>
    <button class="rec-tab-btn" onclick="SGViews.switchGDTab('applications', '${g.grade_id}', this)">Applications</button>
    <button class="rec-tab-btn" onclick="SGViews.switchGDTab('sustainability', '${g.grade_id}', this)">Sustainability</button>
  </div>

  <!-- Tab Content Panel -->
  <div id="gd-tab-content">
    ${SGViews.gradeDetailProperties(g)}
  </div>
</div>`;
};

SGViews.toggleCompare = function (gradeId) {
    if (!SGApp.state.compareGrades) SGApp.state.compareGrades = [];
    const idx = SGApp.state.compareGrades.indexOf(gradeId);
    if (idx >= 0) {
        SGApp.state.compareGrades.splice(idx, 1);
    } else {
        if (SGApp.state.compareGrades.length >= 4) {
            alert('You can compare up to 4 grades simultaneously.');
            return;
        }
        SGApp.state.compareGrades.push(gradeId);
    }
    SGViews.selectGradeDetail(gradeId);
};

SGViews.switchGDTab = function (tab, gradeId, btnEl) {
    document.querySelectorAll('#gd-tab-bar .rec-tab-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    const g = (SG_GRADES || []).find(x => x.grade_id === gradeId);
    if (!g) return;
    const content = document.getElementById('gd-tab-content');
    if (!content) return;

    if (tab === 'properties') content.innerHTML = SGViews.gradeDetailProperties(g);
    else if (tab === 'chemical') content.innerHTML = SGViews.gradeDetailChemical(g);
    else if (tab === 'mechanical') content.innerHTML = SGViews.gradeDetailMechanical(g);
    else if (tab === 'applications') content.innerHTML = SGViews.gradeDetailApps(g);
    else if (tab === 'sustainability') content.innerHTML = SGViews.gradeDetailSustain(g);
};

SGViews.gradeDetailProperties = function (g) {
    const props = (SG_PROPERTIES || {})[g.grade_id] || {};
    const mech = props.mechanical || {};
    // Map text levels to bar scores
    const levelScore = { 'Excellent': 95, 'Very High': 90, 'Good': 75, 'High': 85, 'Moderate': 55, 'Good (mild environments)': 70, 'Lower-Medium': 45, 'Weldable (HAZ effects noted)': 65, 'Medium': 65, 'Medium-Lower': 45 };
    const getScore = (text) => {
        if (!text) return 60;
        const key = Object.keys(levelScore).find(k => text.startsWith(k));
        return key ? levelScore[key] : 60;
    };
    const ysScore = mech.YS_min_MPa ? Math.min(100, Math.round(mech.YS_min_MPa / 6.5)) : getScore(g.strength_level);
    const bars = [
        { label: 'Corrosion Resistance', score: getScore(g.corrosion_level), text: g.corrosion_level ? g.corrosion_level.split('(')[0].trim() : 'N/A' },
        { label: 'Weldability', score: getScore(g.weldability_level), text: g.weldability_level ? g.weldability_level.split('(')[0].trim() : 'N/A' },
        { label: 'Formability', score: getScore(g.formability_level), text: g.formability_level || 'N/A' },
        { label: 'Strength', score: ysScore, text: mech.YS_min_MPa ? mech.YS_min_MPa + ' MPa min' : g.strength_level || 'N/A' },
        { label: 'Cost Band', score: g.cost_band === 'Lower' ? 30 : g.cost_band === 'Moderate' ? 55 : g.cost_band === 'Moderate-Higher' ? 70 : g.cost_band === 'Higher' ? 85 : 50, text: g.cost_band || 'N/A' },
    ];

    // Generate application tags from tags array
    const appTags = (g.tags || []).map(t => t.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
    const displayTags = appTags.length ? appTags : ['Industrial Applications', 'Architectural', 'Process Industry'];

    return `
<div>
  <div style="font-size:0.88rem;font-weight:700;color:var(--text-secondary);margin-bottom:1rem;text-transform:uppercase;letter-spacing:0.05em">Performance Profile</div>
  <div style="display:flex;flex-direction:column;gap:0.85rem;margin-bottom:1.75rem">
    ${bars.map(b => `
    <div style="display:flex;align-items:center;gap:1rem;font-size:0.82rem">
      <div style="width:160px;color:var(--text-secondary);flex-shrink:0">${b.label}</div>
      <div style="flex:1;height:8px;border-radius:4px;background:rgba(255,255,255,0.06);overflow:hidden">
        <div style="width:${b.score}%;height:100%;background:linear-gradient(90deg, #F26522, #FF7A38);border-radius:4px"></div>
      </div>
      <div style="width:120px;text-align:right;font-weight:600;color:#fff;font-size:0.75rem">${b.text}</div>
    </div>`).join('')}
  </div>

  <div style="font-size:0.88rem;font-weight:700;color:#fff;margin-bottom:0.75rem">Application Tags</div>
  <div style="display:flex;flex-wrap:wrap;gap:0.5rem">
    ${displayTags.map(app => `
    <span style="background:rgba(255,255,255,0.06);border:1px solid var(--border-subtle);border-radius:100px;padding:0.3rem 0.75rem;font-size:0.73rem;color:var(--text-secondary)">
      ${app}
    </span>`).join('')}
  </div>
  ${g.temperature_notes ? `<div style="margin-top:1.25rem;padding:0.75rem 1rem;background:rgba(242,101,34,0.07);border-left:3px solid var(--orange);border-radius:0 6px 6px 0;font-size:0.78rem;color:var(--text-secondary)"><span style="font-weight:700;color:var(--orange)">Temperature Notes: </span>${g.temperature_notes}</div>` : ''}
</div>`;
};

SGViews.gradeDetailChemical = function (g) {
    const props = (SG_PROPERTIES || {})[g.grade_id] || {};
    const chem = props.chemistry || {};
    // Build a human-readable list of chemistry entries, skipping nulls
    const entries = Object.entries(chem).filter(([k, v]) => v !== null && v !== undefined);
    if (!entries.length) {
        return `<div style="background:rgba(255,255,255,0.03);border:1px solid var(--border-subtle);border-radius:8px;padding:1.5rem;text-align:center;color:var(--text-muted);font-size:0.85rem">Chemical composition data not available in prototype dataset for this grade.<br><span style="font-size:0.75rem">Source: ${g.source || 'N/A'}</span></div>`;
    }
    return `
<div style="background:rgba(255,255,255,0.03);border:1px solid var(--border-subtle);border-radius:8px;padding:1rem">
  <div style="font-size:0.82rem;font-weight:700;color:#fff;margin-bottom:0.25rem">Chemical Composition (% weight)</div>
  <div style="font-size:0.72rem;color:var(--text-muted);margin-bottom:1rem">Source: ${props.source || g.source || 'N/A'}</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(110px, 1fr));gap:0.75rem">
    ${entries.map(([elem, val]) => {
        const label = elem.replace(/_/g,' ').replace(' min','≥').replace(' max','≤');
        return `
    <div style="background:rgba(255,255,255,0.05);border:1px solid var(--border-subtle);border-radius:6px;padding:0.65rem;text-align:center">
      <div style="font-size:0.7rem;color:var(--orange);font-weight:700;text-transform:uppercase">${label}</div>
      <div style="font-size:1rem;font-weight:700;color:#fff;margin-top:0.2rem">${val}</div>
    </div>`;
    }).join('')}
  </div>
</div>`;
};

SGViews.gradeDetailMechanical = function (g) {
    const props = (SG_PROPERTIES || {})[g.grade_id] || {};
    const mech = props.mechanical || {};
    const phys = props.physical || {};
    const hasMech = Object.values(mech).some(v => v !== null && v !== undefined);
    if (!hasMech) {
        return `<div style="background:rgba(255,255,255,0.03);border:1px solid var(--border-subtle);border-radius:8px;padding:1.5rem;text-align:center;color:var(--text-muted);font-size:0.85rem">Mechanical property data not available in prototype dataset for this grade.<br><span style="font-size:0.75rem">Source: ${g.source || 'N/A'}</span></div>`;
    }
    const physEntries = Object.entries(phys).filter(([k,v]) => v !== null && v !== undefined);
    const physLabels = { density_kg_m3: 'Density (kg/m³)', modulus_GPa: 'Elastic Modulus (GPa)', thermal_conductivity_W_mK: 'Thermal Conductivity (W/mK)', thermal_expansion_um_mK: 'Thermal Expansion (μm/mK)', electrical_resistivity_uohm_m: 'Electrical Resistivity (μΩ·m)' };
    return `
<div style="display:flex;flex-direction:column;gap:1rem">
  <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border-subtle);border-radius:8px;padding:1rem">
    <div style="font-size:0.82rem;font-weight:700;color:#fff;margin-bottom:0.25rem">Mechanical Properties (Minimum Values)</div>
    <div style="font-size:0.72rem;color:var(--text-muted);margin-bottom:0.85rem">Source: ${props.source || g.source || 'N/A'}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem">
      <div style="background:rgba(255,255,255,0.05);border:1px solid var(--border-subtle);padding:0.75rem;border-radius:6px">
        <div style="font-size:0.72rem;color:var(--text-muted)">Yield Strength (Rp0.2 min)</div>
        <div style="font-size:1.15rem;font-weight:800;color:#fff;margin-top:0.2rem">${mech.YS_min_MPa !== undefined && mech.YS_min_MPa !== null ? mech.YS_min_MPa + ' MPa' : 'N/A'}</div>
      </div>
      <div style="background:rgba(255,255,255,0.05);border:1px solid var(--border-subtle);padding:0.75rem;border-radius:6px">
        <div style="font-size:0.72rem;color:var(--text-muted)">Tensile Strength (UTS min)</div>
        <div style="font-size:1.15rem;font-weight:800;color:#fff;margin-top:0.2rem">${mech.UTS_min_MPa !== undefined && mech.UTS_min_MPa !== null ? mech.UTS_min_MPa + ' MPa' : 'N/A'}</div>
      </div>
      <div style="background:rgba(255,255,255,0.05);border:1px solid var(--border-subtle);padding:0.75rem;border-radius:6px">
        <div style="font-size:0.72rem;color:var(--text-muted)">Elongation (A5 min)</div>
        <div style="font-size:1.15rem;font-weight:800;color:#fff;margin-top:0.2rem">${mech.EL_min_pct !== undefined && mech.EL_min_pct !== null ? mech.EL_min_pct + '%' : 'N/A'}</div>
      </div>
      <div style="background:rgba(255,255,255,0.05);border:1px solid var(--border-subtle);padding:0.75rem;border-radius:6px">
        <div style="font-size:0.72rem;color:var(--text-muted)">Hardness</div>
        <div style="font-size:0.95rem;font-weight:700;color:#fff;margin-top:0.2rem">${mech.hardness || 'N/A'}</div>
      </div>
    </div>
  </div>
  ${physEntries.length ? `
  <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border-subtle);border-radius:8px;padding:1rem">
    <div style="font-size:0.82rem;font-weight:700;color:#fff;margin-bottom:0.85rem">Physical Properties</div>
    <div style="display:flex;flex-direction:column;gap:0.5rem">
      ${physEntries.map(([k,v]) => `
      <div style="display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:0.8rem">
        <span style="color:var(--text-secondary)">${physLabels[k] || k}</span>
        <span style="color:#fff;font-weight:600">${v}</span>
      </div>`).join('')}
    </div>
  </div>` : ''}
</div>`;
};

SGViews.gradeDetailApps = function (g) {
    return SGViews.gradeDetailProperties(g);
};

SGViews.gradeDetailSustain = function (g) {
    // Look up from SG_SUSTAINABILITY dataset (from dataset.js)
    const sustData = (SG_SUSTAINABILITY || []).find(s => s.grade === g.grade_name);
    return `
<div style="background:rgba(255,255,255,0.03);border:1px solid var(--border-subtle);border-radius:8px;padding:1rem">
  <div style="font-size:0.82rem;font-weight:700;color:#fff;margin-bottom:0.75rem">Sustainability &amp; Product Carbon Footprint (PCF)</div>
  ${sustData ? `
  <div style="display:flex;flex-direction:column;gap:0.75rem">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid var(--border-subtle);font-size:0.82rem">
      <span style="color:var(--text-muted)">PCF Assessment Status:</span>
      <strong style="color:${sustData.pcf_assessment === 'Conducted' ? '#22C55E' : 'var(--text-muted)'}">${sustData.pcf_assessment || 'N/A'}</strong>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid var(--border-subtle);font-size:0.82rem">
      <span style="color:var(--text-muted)">PCF (kg CO₂e / kg steel):</span>
      <strong style="color:#fff">${sustData.pcf_co2e_per_kg !== null && sustData.pcf_co2e_per_kg !== undefined ? sustData.pcf_co2e_per_kg : 'Contact Jindal'}</strong>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid var(--border-subtle);font-size:0.82rem">
      <span style="color:var(--text-muted)">Recycled Content:</span>
      <strong style="color:#22C55E">${sustData.recycled_content_pct !== null && sustData.recycled_content_pct !== undefined ? sustData.recycled_content_pct + '%' : 'EAF Process'}</strong>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0.5rem 0;font-size:0.82rem">
      <span style="color:var(--text-muted)">EPD / Certificate:</span>
      <strong style="color:var(--orange)">${sustData.epd_certificate || 'Jindal Stainless Verified EPD'}</strong>
    </div>
    ${sustData.notes ? `<div style="padding:0.5rem 0.75rem;background:rgba(34,197,94,0.07);border-left:3px solid #22C55E;border-radius:0 4px 4px 0;font-size:0.75rem;color:var(--text-secondary);margin-top:0.25rem">${sustData.notes}</div>` : ''}
  </div>` : `
  <div style="color:var(--text-muted);font-size:0.85rem;text-align:center;padding:1rem">
    <div style="font-size:1.5rem;margin-bottom:0.5rem">🌱</div>
    Sustainability data not available in prototype dataset for grade <strong style="color:#fff">${g.grade_name}</strong>.<br>
    Contact Jindal Stainless for EPD documentation and PCF data.
    <div style="margin-top:0.75rem;font-size:0.72rem;color:var(--text-muted)">Source: ${g.source || 'N/A'}</div>
  </div>`}
</div>`;
};

/* ── GRADE COMPARISON ─────────────────────────────────────────────── */
SGViews.renderCompare = function () {
    const selected = (SGApp.state.compareGrades || []).map(id => (SG_GRADES || []).find(g => g.grade_id === id)).filter(Boolean);

    return `
<div class="page-content" style="padding:1.5rem 2rem">
  <!-- Breadcrumb & Back Navigation -->
  <div class="breadcrumb-container">
    <div class="breadcrumb-left">
      <button class="back-btn-pill" onclick="SGApp.goBack('grades')">
        ← Back
      </button>
      <div class="breadcrumb-path">
        <span>Knowledge</span>
        <span>/</span>
        <span class="current">Grade Comparison</span>
      </div>
    </div>
    <div class="breadcrumb-actions">
      <button class="btn btn-outline btn-sm" style="color:#fff;border-color:rgba(255,255,255,0.2)" onclick="SGApp.state.compareGrades=[]; SGApp.navigate('compare');">
        Clear All
      </button>
      <button class="btn btn-primary btn-sm" style="background:var(--orange);border:none" onclick="SGApp.navigate('grades')">
        + Add Grades
      </button>
    </div>
  </div>

  ${selected.length === 0 ? `
  <div class="rec-input-panel-card" style="text-align:center;padding:3rem 1.5rem">
    <div style="font-size:2.5rem;margin-bottom:0.75rem">📊</div>
    <h3 style="font-size:1.15rem;font-weight:700;color:#fff;margin-bottom:0.5rem">No Grades Selected for Comparison</h3>
    <p style="font-size:0.85rem;color:var(--text-muted);max-width:400px;margin:0 auto 1.5rem">
      Select 2 to 4 stainless steel grades in the Grade Explorer to see side-by-side metallurgical, chemical, mechanical, and economic comparisons.
    </p>
    <button class="btn btn-primary" style="background:var(--orange);border:none" onclick="SGApp.state.compareGrades=['G001','G004']; SGApp.navigate('compare');">
      ▶ Compare Default Demo (304 vs 316L)
    </button>
  </div>` : SGViews.buildCompareTable(selected)}
</div>`;
};

SGViews.buildCompareTable = function (grades) {
    return `
<div class="rec-input-panel-card" style="overflow-x:auto">
  <table style="width:100%;border-collapse:collapse;font-size:0.82rem;color:#fff">
    <thead>
      <tr style="border-bottom:2px solid var(--border-subtle)">
        <th style="text-align:left;padding:1rem;color:var(--text-muted);width:200px">Property / Metric</th>
        ${grades.map(g => `
        <th style="padding:1rem;text-align:left;min-width:180px">
          <div style="font-size:1.25rem;font-weight:900;color:#fff">${g.grade_name}</div>
          <div style="font-size:0.72rem;color:var(--orange);font-weight:700">${g.family}</div>
          <button class="btn btn-outline btn-sm" style="margin-top:0.5rem;font-size:0.7rem;padding:0.2rem 0.5rem;color:#E2E8F0;border-color:rgba(255,255,255,0.2)" onclick="SGViews.toggleCompare('${g.grade_id}'); SGApp.navigate('compare');">✕ Remove</button>
        </th>`).join('')}
      </tr>
    </thead>
    <tbody>
      <tr style="border-bottom:1px solid var(--border-subtle);background:rgba(255,255,255,0.02)">
        <td style="padding:0.85rem 1rem;font-weight:700;color:var(--text-secondary)">UNS / Standard</td>
        ${grades.map(g => `<td style="padding:0.85rem 1rem">${g.UNS || 'Proprietary'}</td>`).join('')}
      </tr>
      <tr style="border-bottom:1px solid var(--border-subtle)">
        <td style="padding:0.85rem 1rem;font-weight:700;color:var(--text-secondary)">Corrosion Resistance</td>
        ${grades.map(g => `<td style="padding:0.85rem 1rem"><strong style="color:var(--orange)">${g.corrosion_level ? g.corrosion_level.split('(')[0].trim() : 'N/A'}</strong></td>`).join('')}
      </tr>
      <tr style="border-bottom:1px solid var(--border-subtle);background:rgba(255,255,255,0.02)">
        <td style="padding:0.85rem 1rem;font-weight:700;color:var(--text-secondary)">Min Yield Strength (Rp0.2)</td>
        ${grades.map(g => { const p=(SG_PROPERTIES||{})[g.grade_id]||{}; const m=p.mechanical||{}; return `<td style="padding:0.85rem 1rem"><strong>${m.YS_min_MPa !== undefined && m.YS_min_MPa !== null ? m.YS_min_MPa + ' MPa' : 'N/A'}</strong></td>`; }).join('')}
      </tr>
      <tr style="border-bottom:1px solid var(--border-subtle)">
        <td style="padding:0.85rem 1rem;font-weight:700;color:var(--text-secondary)">Tensile Strength (UTS min)</td>
        ${grades.map(g => { const p=(SG_PROPERTIES||{})[g.grade_id]||{}; const m=p.mechanical||{}; return `<td style="padding:0.85rem 1rem">${m.UTS_min_MPa !== undefined && m.UTS_min_MPa !== null ? m.UTS_min_MPa + ' MPa' : 'N/A'}</td>`; }).join('')}
      </tr>
      <tr style="border-bottom:1px solid var(--border-subtle);background:rgba(255,255,255,0.02)">
        <td style="padding:0.85rem 1rem;font-weight:700;color:var(--text-secondary)">Weldability</td>
        ${grades.map(g => `<td style="padding:0.85rem 1rem">${g.weldability_level ? g.weldability_level.split('(')[0].trim() : 'N/A'}</td>`).join('')}
      </tr>
      <tr style="border-bottom:1px solid var(--border-subtle)">
        <td style="padding:0.85rem 1rem;font-weight:700;color:var(--text-secondary)">Formability</td>
        ${grades.map(g => `<td style="padding:0.85rem 1rem">${g.formability_level || 'N/A'}</td>`).join('')}
      </tr>
      <tr style="border-bottom:1px solid var(--border-subtle);background:rgba(255,255,255,0.02)">
        <td style="padding:0.85rem 1rem;font-weight:700;color:var(--text-secondary)">Strength Level</td>
        ${grades.map(g => `<td style="padding:0.85rem 1rem">${g.strength_level || 'N/A'}</td>`).join('')}
      </tr>
      <tr style="border-bottom:1px solid var(--border-subtle)">
        <td style="padding:0.85rem 1rem;font-weight:700;color:var(--text-secondary)">PCF Assessment</td>
        ${grades.map(g => { const s=(SG_SUSTAINABILITY||[]).find(x=>x.grade===g.grade_name); return `<td style="padding:0.85rem 1rem"><span style="color:${s && s.pcf_assessment==='Conducted' ? '#22C55E' : 'var(--text-muted)'}">${s ? s.pcf_assessment : 'Not in dataset'}</span></td>`; }).join('')}
      </tr>
      <tr>
        <td style="padding:0.85rem 1rem;font-weight:700;color:var(--text-secondary)">Cost Category</td>
        ${grades.map(g => `<td style="padding:0.85rem 1rem">${g.cost_band || 'N/A'}</td>`).join('')}
      </tr>
    </tbody>
  </table>
</div>`;
};
