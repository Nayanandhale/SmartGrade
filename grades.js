// SmartGrade Dataset – Grades
// Source: SmartGrade_Round2_Prototype_Ready_Dataset.xlsx / Grades sheet
// DO NOT invent engineering values. All values from supplied Jindal source PDFs.

window.SG_GRADES = [
  {
    grade_id: "G001", grade_name: "304", family: "Austenitic", UNS: "S30400",
    designation_source: "J304 / ASTM 304",
    summary: "Most popular and versatile austenitic grade; excellent corrosion resistance, formability, deep drawability and weldability.",
    corrosion_level: "Excellent", strength_level: "Medium", formability_level: "Excellent", weldability_level: "Excellent",
    temperature_notes: "General-purpose; no grade-specific service-temperature limit stated in cited page.",
    product_forms: ["Hot Rolled Plates & Coil", "Cold Rolled Coil & Sheets"],
    cost_band: "Moderate", prototype_status: "Core prototype grade", source: "300series.pdf, pp.7-8",
    tags: ["austenitic", "general-purpose", "food", "architecture", "equipment"]
  },
  {
    grade_id: "G002", grade_name: "304L", family: "Austenitic", UNS: "S30403",
    designation_source: "J304L / ASTM 304L",
    summary: "Low-carbon 304 variant with improved intergranular corrosion resistance for welded condition.",
    corrosion_level: "Excellent", strength_level: "Medium", formability_level: "Excellent", weldability_level: "Excellent",
    temperature_notes: "General-purpose; low-carbon variant intended for welded condition.",
    product_forms: ["Hot Rolled Plates & Coil", "Cold Rolled Coil & Sheets"],
    cost_band: "Moderate", prototype_status: "Core prototype grade", source: "300series.pdf, pp.7-8",
    tags: ["austenitic", "welded", "low-carbon", "tanks", "vessels"]
  },
  {
    grade_id: "G003", grade_name: "316", family: "Austenitic", UNS: "S31600",
    designation_source: "J316 / ASTM 316",
    summary: "Mo-added austenitic stainless steel; improved general corrosion, pitting and crevice corrosion resistance in chloride environments.",
    corrosion_level: "Very High", strength_level: "Medium", formability_level: "Good", weldability_level: "Good",
    temperature_notes: "Higher-temperature strength advantage stated; no numeric service limit in cited page.",
    product_forms: ["Hot Rolled Plates & Coil", "Cold Rolled Coil & Sheets"],
    cost_band: "Moderate-Higher", prototype_status: "Core prototype grade", source: "300series.pdf, pp.20-21",
    tags: ["austenitic", "molybdenum", "marine", "chloride", "coastal", "chemical"]
  },
  {
    grade_id: "G004", grade_name: "316L", family: "Austenitic", UNS: "S31603",
    designation_source: "J316L / ASTM 316L",
    summary: "Low-carbon 316 variant with improved intergranular corrosion resistance during welding.",
    corrosion_level: "Very High", strength_level: "Medium", formability_level: "Good", weldability_level: "Excellent",
    temperature_notes: "No numeric service-temperature limit stated in cited page.",
    product_forms: ["Hot Rolled Plates & Coil", "Cold Rolled Coil & Sheets"],
    cost_band: "Moderate-Higher", prototype_status: "Core prototype grade", source: "300series.pdf, pp.20-21",
    tags: ["austenitic", "welded", "low-carbon", "marine", "coastal", "chloride", "chemical"]
  },
  {
    grade_id: "G005", grade_name: "321", family: "Austenitic", UNS: "S32100",
    designation_source: "J321 / ASTM 321",
    summary: "Ti-added 304 grade for improved intergranular corrosion resistance at high temperature.",
    corrosion_level: "Excellent (high-temp/intergranular)", strength_level: "Medium", formability_level: "Good", weldability_level: "Good",
    temperature_notes: "Designed for 450–900°C applications per supplied Jindal sheet.",
    product_forms: ["Hot Rolled Plates & Coil", "Cold Rolled Coil & Sheets"],
    cost_band: "Moderate-Higher", prototype_status: "Core prototype grade", source: "300series.pdf, p.24",
    tags: ["austenitic", "titanium-stabilized", "high-temperature", "exhaust", "pressure-vessels"]
  },
  {
    grade_id: "G006", grade_name: "430", family: "Ferritic", UNS: "S43000",
    designation_source: "J430 / ASTM 430",
    summary: "Common ferritic grade with good corrosion resistance in mildly corrosive environments and good oxidation resistance at elevated temperatures.",
    corrosion_level: "Good (mild environments)", strength_level: "Medium", formability_level: "Good", weldability_level: "Weldable (HAZ effects noted)",
    temperature_notes: "Oxidation resistance up to 875°C intermittent / 740°C continuous per supplied sheet.",
    product_forms: ["Hot Rolled Plates & Coil", "Cold Rolled Coil & Sheets"],
    cost_band: "Lower", prototype_status: "Core prototype grade", source: "400series.pdf, pp.11-12",
    tags: ["ferritic", "mild-environment", "architecture", "appliances", "automotive-trim"]
  },
  {
    grade_id: "G007", grade_name: "409L", family: "Ferritic / Stabilized", UNS: "S40910",
    designation_source: "J409L / UNS S40910",
    summary: "Ti-stabilized ferritic grade for mildly corrosive environments and automotive exhaust systems; good oxidation resistance up to about 800°C.",
    corrosion_level: "Good (mildly corrosive / natural atmosphere)", strength_level: "Lower-Medium", formability_level: "Good", weldability_level: "Good",
    temperature_notes: "Automotive exhaust components up to about 750–800°C; oxidation resistance approximately 800°C.",
    product_forms: ["Hot Rolled Plates & Coil", "Cold Rolled Coil & Sheets"],
    cost_band: "Lower", prototype_status: "Core prototype grade", source: "400series.pdf, pp.1-2",
    tags: ["ferritic", "exhaust", "automotive", "muffler", "high-temperature"]
  },
  {
    grade_id: "G008", grade_name: "2205", family: "Duplex", UNS: "S32205",
    designation_source: "J2205 / UNS S32205",
    summary: "Standard duplex grade with high strength, excellent pitting and crevice corrosion resistance, and good resistance to stress corrosion cracking.",
    corrosion_level: "Very High (pitting/SCC resistance)", strength_level: "High", formability_level: "Moderate", weldability_level: "Good",
    temperature_notes: "Avoid prolonged use above 300°C due to intermetallic formation per supplied source.",
    product_forms: ["Hot Rolled Plates & Coil", "Cold Rolled Coil & Sheets"],
    cost_band: "Higher", prototype_status: "Core prototype grade", source: "duplex-series.pdf, p.3",
    tags: ["duplex", "high-strength", "coastal", "structural", "marine", "chemical", "SCC"]
  },
  {
    grade_id: "G009", grade_name: "2101", family: "Lean Duplex", UNS: "S32101",
    designation_source: "J2101 / UNS S32101",
    summary: "Lean duplex grade offering higher strength than austenitic grades with lower Ni content; good pitting resistance.",
    corrosion_level: "Good-High (better than 304 in chloride)", strength_level: "High", formability_level: "Moderate", weldability_level: "Good",
    temperature_notes: "Lean duplex; similar temperature limitations to 2205 for intermetallic formation.",
    product_forms: ["Hot Rolled Plates & Coil", "Cold Rolled Coil & Sheets"],
    cost_band: "Moderate-Higher", prototype_status: "Core prototype grade", source: "duplex-series.pdf",
    tags: ["lean-duplex", "high-strength", "structural", "coastal", "cost-effective"]
  },
  {
    grade_id: "G010", grade_name: "J204Cu", family: "Austenitic / Ni-saving", UNS: null,
    designation_source: "J204Cu (Jindal proprietary designation)",
    summary: "Ni-saving austenitic grade using Mn+Cu; good corrosion and formability properties for non-chloride-aggressive environments.",
    corrosion_level: "Good (non-aggressive environments)", strength_level: "Medium", formability_level: "Good", weldability_level: "Good",
    temperature_notes: "General-purpose; no specific high-temperature service data in prototype subset.",
    product_forms: ["Cold Rolled Coil & Sheets"],
    cost_band: "Moderate", prototype_status: "Core prototype grade", source: "Jindal proprietary specification",
    tags: ["austenitic", "ni-saving", "cost-effective", "appliances", "architecture"]
  },
  {
    grade_id: "G011", grade_name: "J4", family: "Ferritic", UNS: null,
    designation_source: "J4 (Jindal proprietary designation)",
    summary: "Ferritic grade with economy cost band; suitable for mildly corrosive applications and indoor architectural uses.",
    corrosion_level: "Moderate (mildly corrosive)", strength_level: "Medium-Lower", formability_level: "Good", weldability_level: "Good",
    temperature_notes: "No specific high-temperature data in prototype subset.",
    product_forms: ["Cold Rolled Coil & Sheets"],
    cost_band: "Lower", prototype_status: "Core prototype grade", source: "Jindal proprietary specification",
    tags: ["ferritic", "economy", "indoor", "architecture", "appliances"]
  },
  {
    grade_id: "G012", grade_name: "904L", family: "High-Alloy Austenitic", UNS: "N08904",
    designation_source: "904L / UNS N08904",
    summary: "High-alloy austenitic grade with very high Mo+Cu content; exceptional resistance to pitting, crevice corrosion and stress corrosion cracking in aggressive chloride and acid environments.",
    corrosion_level: "Very High (aggressive acid/chloride)", strength_level: "Medium", formability_level: "Good", weldability_level: "Good",
    temperature_notes: "Suitable for use up to approximately 400°C; check specific conditions.",
    product_forms: ["Hot Rolled Plates & Coil", "Cold Rolled Coil & Sheets"],
    cost_band: "Higher", prototype_status: "Core prototype grade", source: "904L reference / Jindal high-alloy data",
    tags: ["austenitic", "high-alloy", "aggressive-acids", "chemical", "offshore", "pulp-paper"]
  }
];
