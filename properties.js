// SmartGrade Dataset – Properties
// Source: SmartGrade_Round2_Prototype_Ready_Dataset.xlsx / Properties sheet
// Missing values kept as null — do NOT infer or invent.

window.SG_PROPERTIES = {
    "G001": {
        chemistry: { C_max: 0.08, Mn_max: 2.0, Si_max: 0.75, P_max: 0.045, S_max: 0.030, Ni_min: 8.0, Ni_max: 10.5, Cr_min: 18.0, Cr_max: 20.0, Mo_max: null, N_max: null, Ti: null, Cu: null },
        mechanical: { YS_min_MPa: 205, UTS_min_MPa: 515, EL_min_pct: 40, hardness: "Brinell ≤ 201 (Typical)" },
        physical: { density_kg_m3: 7900, modulus_GPa: 193, thermal_conductivity_W_mK: 16.2, thermal_expansion_um_mK: 17.2, electrical_resistivity_uohm_m: 0.72 },
        source: "300series.pdf, pp.7-8"
    },
    "G002": {
        chemistry: { C_max: 0.03, Mn_max: 2.0, Si_max: 0.75, P_max: 0.045, S_max: 0.030, Ni_min: 8.0, Ni_max: 12.0, Cr_min: 18.0, Cr_max: 20.0, Mo_max: null, N_max: null, Ti: null, Cu: null },
        mechanical: { YS_min_MPa: 170, UTS_min_MPa: 485, EL_min_pct: 40, hardness: "Brinell ≤ 201 (Typical)" },
        physical: { density_kg_m3: 7900, modulus_GPa: 193, thermal_conductivity_W_mK: 16.2, thermal_expansion_um_mK: 17.2, electrical_resistivity_uohm_m: 0.72 },
        source: "300series.pdf, pp.7-8"
    },
    "G003": {
        chemistry: { C_max: 0.08, Mn_max: 2.0, Si_max: 0.75, P_max: 0.045, S_max: 0.030, Ni_min: 10.0, Ni_max: 14.0, Cr_min: 16.0, Cr_max: 18.0, Mo_max: 3.0, N_max: null, Ti: null, Cu: null },
        mechanical: { YS_min_MPa: 205, UTS_min_MPa: 515, EL_min_pct: 40, hardness: "Brinell ≤ 217 (Typical)" },
        physical: { density_kg_m3: 7990, modulus_GPa: 193, thermal_conductivity_W_mK: 16.3, thermal_expansion_um_mK: 16.0, electrical_resistivity_uohm_m: 0.74 },
        source: "300series.pdf, pp.20-21"
    },
    "G004": {
        chemistry: { C_max: 0.03, Mn_max: 2.0, Si_max: 0.75, P_max: 0.045, S_max: 0.030, Ni_min: 10.0, Ni_max: 14.0, Cr_min: 16.0, Cr_max: 18.0, Mo_max: 3.0, N_max: null, Ti: null, Cu: null },
        mechanical: { YS_min_MPa: 170, UTS_min_MPa: 485, EL_min_pct: 40, hardness: "Brinell ≤ 217 (Typical)" },
        physical: { density_kg_m3: 7990, modulus_GPa: 193, thermal_conductivity_W_mK: 16.3, thermal_expansion_um_mK: 16.0, electrical_resistivity_uohm_m: 0.74 },
        source: "300series.pdf, pp.20-21"
    },
    "G005": {
        chemistry: { C_max: 0.08, Mn_max: 2.0, Si_max: 0.75, P_max: 0.045, S_max: 0.030, Ni_min: 9.0, Ni_max: 12.0, Cr_min: 17.0, Cr_max: 19.0, Mo_max: null, N_max: null, Ti: "5×C min", Cu: null },
        mechanical: { YS_min_MPa: 205, UTS_min_MPa: 515, EL_min_pct: 40, hardness: "Brinell ≤ 217 (Typical)" },
        physical: { density_kg_m3: 7900, modulus_GPa: 193, thermal_conductivity_W_mK: 16.1, thermal_expansion_um_mK: 17.2, electrical_resistivity_uohm_m: 0.72 },
        source: "300series.pdf, p.24"
    },
    "G006": {
        chemistry: { C_max: 0.12, Mn_max: 1.0, Si_max: 1.0, P_max: 0.04, S_max: 0.015, Ni_min: null, Ni_max: null, Cr_min: 16.0, Cr_max: 18.0, Mo_max: null, N_max: null, Ti: null, Cu: null },
        mechanical: { YS_min_MPa: 205, UTS_min_MPa: 450, EL_min_pct: 22, hardness: "Brinell ≤ 183 (Typical)" },
        physical: { density_kg_m3: 7700, modulus_GPa: 200, thermal_conductivity_W_mK: 26.1, thermal_expansion_um_mK: 10.4, electrical_resistivity_uohm_m: 0.60 },
        source: "400series.pdf, pp.11-12"
    },
    "G007": {
        chemistry: { C_max: 0.03, Mn_max: 1.0, Si_max: 1.0, P_max: 0.04, S_max: 0.015, Ni_min: null, Ni_max: 0.5, Cr_min: 10.5, Cr_max: 11.7, Mo_max: null, N_max: null, Ti: "≥6×(C+N)", Cu: null },
        mechanical: { YS_min_MPa: 170, UTS_min_MPa: 380, EL_min_pct: 20, hardness: null },
        physical: { density_kg_m3: 7700, modulus_GPa: 200, thermal_conductivity_W_mK: 25.0, thermal_expansion_um_mK: 11.5, electrical_resistivity_uohm_m: 0.60 },
        source: "400series.pdf, pp.1-2"
    },
    "G008": {
        chemistry: { C_max: 0.03, Mn_max: 2.0, Si_max: 1.0, P_max: 0.03, S_max: 0.02, Ni_min: 4.5, Ni_max: 6.5, Cr_min: 22.0, Cr_max: 23.0, Mo_max: 3.5, N_max: 0.22, Ti: null, Cu: null },
        mechanical: { YS_min_MPa: 450, UTS_min_MPa: 620, EL_min_pct: 25, hardness: "Brinell ≤ 290 (Typical)" },
        physical: { density_kg_m3: 7800, modulus_GPa: 200, thermal_conductivity_W_mK: 19.0, thermal_expansion_um_mK: 13.0, electrical_resistivity_uohm_m: 0.85 },
        source: "duplex-series.pdf, p.3"
    },
    "G009": {
        chemistry: { C_max: 0.04, Mn_max: 4.0, Si_max: 1.0, P_max: 0.04, S_max: 0.015, Ni_min: 1.35, Ni_max: 1.7, Cr_min: 21.0, Cr_max: 22.0, Mo_max: 0.4, N_max: 0.22, Ti: null, Cu: null },
        mechanical: { YS_min_MPa: 450, UTS_min_MPa: 650, EL_min_pct: 25, hardness: null },
        physical: { density_kg_m3: 7800, modulus_GPa: 200, thermal_conductivity_W_mK: 17.0, thermal_expansion_um_mK: 13.0, electrical_resistivity_uohm_m: 0.80 },
        source: "duplex-series.pdf"
    },
    "G010": {
        chemistry: { C_max: 0.15, Mn_max: 7.5, Si_max: 1.0, P_max: 0.06, S_max: 0.03, Ni_min: 1.5, Ni_max: 3.0, Cr_min: 15.0, Cr_max: 17.0, Mo_max: null, N_max: 0.15, Ti: null, Cu: "1.5–3.0" },
        mechanical: { YS_min_MPa: 200, UTS_min_MPa: 520, EL_min_pct: 35, hardness: null },
        physical: { density_kg_m3: 7800, modulus_GPa: 193, thermal_conductivity_W_mK: null, thermal_expansion_um_mK: null, electrical_resistivity_uohm_m: null },
        source: "Jindal proprietary specification"
    },
    "G011": {
        chemistry: { C_max: 0.12, Mn_max: 1.0, Si_max: 1.0, P_max: 0.04, S_max: 0.015, Ni_min: null, Ni_max: null, Cr_min: 15.5, Cr_max: 17.5, Mo_max: null, N_max: null, Ti: null, Cu: null },
        mechanical: { YS_min_MPa: 205, UTS_min_MPa: 450, EL_min_pct: 22, hardness: null },
        physical: { density_kg_m3: 7700, modulus_GPa: 200, thermal_conductivity_W_mK: null, thermal_expansion_um_mK: null, electrical_resistivity_uohm_m: null },
        source: "Jindal proprietary specification"
    },
    "G012": {
        chemistry: { C_max: 0.02, Mn_max: 2.0, Si_max: 1.0, P_max: 0.045, S_max: 0.035, Ni_min: 23.0, Ni_max: 28.0, Cr_min: 19.0, Cr_max: 23.0, Mo_max: 5.0, N_max: null, Ti: null, Cu: "1.0–2.0" },
        mechanical: { YS_min_MPa: 220, UTS_min_MPa: 490, EL_min_pct: 35, hardness: "Brinell ≤ 220 (Typical)" },
        physical: { density_kg_m3: 7950, modulus_GPa: 190, thermal_conductivity_W_mK: 12.0, thermal_expansion_um_mK: 15.0, electrical_resistivity_uohm_m: 1.0 },
        source: "904L reference / Jindal high-alloy data"
    }
};
