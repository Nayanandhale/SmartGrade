// SmartGrade Dataset – Sustainability, Cost Bands, Locations, Sources
// Source: SmartGrade_Round2_Prototype_Ready_Dataset.xlsx / Sustainability, Cost_Bands, Locations, Sources sheets
// IMPORTANT: Do NOT display numeric PCF values. Show evidence/assessment status only.
// Cost bands are prototype relative bands ONLY — not Jindal pricing.

// SUSTAINABILITY (evidence key only — per blueprint rules)
window.SG_SUSTAINABILITY = [
    { grade: "304", site: "Hisar", pcf_assessment: "Conducted", boundary: "Cradle-to-Gate", methodology: "ISO 14040 / 14044 / 14067", assessment_period: "FY2023–24", source: "Jindal Stainless Sustainability Report FY2023–24" },
    { grade: "304L", site: "Hisar", pcf_assessment: "Conducted", boundary: "Cradle-to-Gate", methodology: "ISO 14040 / 14044 / 14067", assessment_period: "FY2023–24", source: "Jindal Stainless Sustainability Report FY2023–24" },
    { grade: "316", site: "Hisar", pcf_assessment: "Conducted", boundary: "Cradle-to-Gate", methodology: "ISO 14040 / 14044 / 14067", assessment_period: "FY2023–24", source: "Jindal Stainless Sustainability Report FY2023–24" },
    { grade: "316L", site: "Hisar", pcf_assessment: "Conducted", boundary: "Cradle-to-Gate", methodology: "ISO 14040 / 14044 / 14067", assessment_period: "FY2023–24", source: "Jindal Stainless Sustainability Report FY2023–24" },
    { grade: "304", site: "Jajpur", pcf_assessment: "Conducted", boundary: "Cradle-to-Gate", methodology: "ISO 14040 / 14044 / 14067", assessment_period: "FY2023–24", source: "Jindal Stainless Sustainability Report FY2023–24" },
    { grade: "316", site: "Jajpur", pcf_assessment: "Conducted", boundary: "Cradle-to-Gate", methodology: "ISO 14040 / 14044 / 14067", assessment_period: "FY2023–24", source: "Jindal Stainless Sustainability Report FY2023–24" },
    { grade: "430", site: "Hisar", pcf_assessment: "Conducted", boundary: "Cradle-to-Gate", methodology: "ISO 14040 / 14044 / 14067", assessment_period: "FY2023–24", source: "Jindal Stainless Sustainability Report FY2023–24" },
    { grade: "430", site: "Jajpur", pcf_assessment: "Conducted", boundary: "Cradle-to-Gate", methodology: "ISO 14040 / 14044 / 14067", assessment_period: "FY2023–24", source: "Jindal Stainless Sustainability Report FY2023–24" },
    { grade: "2205", site: "Hisar", pcf_assessment: "No verified product-level PCF available in current dataset", boundary: null, methodology: null, assessment_period: null, source: "SmartGrade prototype dataset – not in supplied finalized sustainability records" },
    { grade: "2101", site: "Hisar", pcf_assessment: "No verified product-level PCF available in current dataset", boundary: null, methodology: null, assessment_period: null, source: "SmartGrade prototype dataset – not in supplied finalized sustainability records" },
    { grade: "409L", site: "Hisar", pcf_assessment: "No verified product-level PCF available in current dataset — 409L is not treated as 409", boundary: null, methodology: null, assessment_period: null, source: "SmartGrade prototype dataset – 409L excluded from supplied finalized sustainability records" },
    { grade: "J204Cu", site: "Hisar", pcf_assessment: "No verified product-level PCF available in current dataset", boundary: null, methodology: null, assessment_period: null, source: "SmartGrade prototype dataset" },
    { grade: "J4", site: "Hisar", pcf_assessment: "No verified product-level PCF available in current dataset", boundary: null, methodology: null, assessment_period: null, source: "SmartGrade prototype dataset" },
    { grade: "904L", site: null, pcf_assessment: "No verified product-level PCF available in current dataset", boundary: null, methodology: null, assessment_period: null, source: "SmartGrade prototype dataset" },
    { grade: "321", site: "Hisar", pcf_assessment: "No verified product-level PCF available in current dataset", boundary: null, methodology: null, assessment_period: null, source: "SmartGrade prototype dataset" }
];

// COST BANDS (relative prototype reference only — NOT Jindal pricing)
window.SG_COST_BANDS = [
    { "grade/family": "304", form: "All prototype forms", band: "Moderate", source_date: "Prototype reference", source_type: "Illustrative relative band — not Jindal pricing" },
    { "grade/family": "304L", form: "All prototype forms", band: "Moderate", source_date: "Prototype reference", source_type: "Illustrative relative band — not Jindal pricing" },
    { "grade/family": "316", form: "All prototype forms", band: "Moderate-Higher", source_date: "Prototype reference", source_type: "Illustrative relative band — not Jindal pricing" },
    { "grade/family": "316L", form: "All prototype forms", band: "Moderate-Higher", source_date: "Prototype reference", source_type: "Illustrative relative band — not Jindal pricing" },
    { "grade/family": "321", form: "All prototype forms", band: "Moderate-Higher", source_date: "Prototype reference", source_type: "Illustrative relative band — not Jindal pricing" },
    { "grade/family": "430", form: "All prototype forms", band: "Lower", source_date: "Prototype reference", source_type: "Illustrative relative band — not Jindal pricing" },
    { "grade/family": "409L", form: "All prototype forms", band: "Lower", source_date: "Prototype reference", source_type: "Illustrative relative band — not Jindal pricing" },
    { "grade/family": "2205", form: "All prototype forms", band: "Higher", source_date: "Prototype reference", source_type: "Illustrative relative band — not Jindal pricing" },
    { "grade/family": "2101", form: "All prototype forms", band: "Moderate-Higher", source_date: "Prototype reference", source_type: "Illustrative relative band — not Jindal pricing" },
    { "grade/family": "J204Cu", form: "All prototype forms", band: "Moderate", source_date: "Prototype reference", source_type: "Illustrative relative band — not Jindal pricing" },
    { "grade/family": "J4", form: "All prototype forms", band: "Lower", source_date: "Prototype reference", source_type: "Illustrative relative band — not Jindal pricing" },
    { "grade/family": "904L", form: "All prototype forms", band: "Higher", source_date: "Prototype reference", source_type: "Illustrative relative band — not Jindal pricing" }
];

// LOCATIONS (verified from Jindal supplied datasheet)
window.SG_LOCATIONS = [
    { id: "JSL-IN-CORP-001", city: "New Delhi", state: "Delhi", type: "Corporate Office", address: "Jindal Centre, 12, Bhikaji Cama Place, New Delhi – 110066", phone: "+91 11 26188345-60; +91 11 41462000", email: "info@jindalstainless.com", lat: 28.5674, lon: 77.1860, verification_status: "Verified" },
    { id: "JSL-IN-REG-001", city: "Hisar", state: "Haryana", type: "Registered Office / Manufacturing", address: "O.P. Jindal Marg, Hisar – 125005, Haryana", phone: "01662-222471-83", email: "info@jindalstainless.com", lat: 29.1490, lon: 75.7217, verification_status: "Verified" },
    { id: "JSL-IN-SALES-001", city: "Ahmedabad", state: "Gujarat", type: "Sales Office", address: "401-402, Florence, Opposite Ashram Road Post Office, Ashram Road, Ahmedabad – 380006", phone: "+91 9833214396", email: "", lat: 23.0225, lon: 72.5714, verification_status: "Verified" },
    { id: "JSL-IN-SALES-003", city: "Chennai", state: "Tamil Nadu", type: "Sales Office", address: "Gee Gee Universal Building, 1st Floor, No. 2, Mc Nichols Road, Chetpet, Chennai – 600031", phone: "", email: "", lat: 13.0827, lon: 80.2707, verification_status: "Verified" },
    { id: "JSL-IN-SALES-004", city: "Gurugram", state: "Haryana", type: "Sales Office", address: "Stainless Centre, 1st Floor, Plot No. 50, Sector 32, Gurugram – 122001", phone: "+91 124 4494100", email: "info@jindalstainless.com", lat: 28.4595, lon: 77.0266, verification_status: "Verified" },
    { id: "JSL-IN-SALES-005", city: "Hyderabad", state: "Telangana", type: "Sales Office", address: "H. No. 1-10-74/C, Flat No. G 201/A, 2nd Floor, Technopolis Galada Complex, Begumpet, Hyderabad – 500016", phone: "+91 9491073529", email: "", lat: 17.4437, lon: 78.4636, verification_status: "Verified" },
    { id: "JSL-IN-SALES-006", city: "Kolkata", state: "West Bengal", type: "Sales Office", address: "3A, Duckback House, 41, Shakespeare Sarani, Kolkata – 700017", phone: "+91 9073352568", email: "", lat: 22.5726, lon: 88.3639, verification_status: "Verified" },
    { id: "JSL-IN-SALES-007", city: "Mumbai", state: "Maharashtra", type: "Sales Office", address: "Jindal Mansion, 1st Floor, 5A, G. Deshmukh Marg (Pedder Road), Mumbai – 400026", phone: "+91 9561094183", email: "", lat: 18.9752, lon: 72.8258, verification_status: "Verified" },
    { id: "JSL-IN-SALES-008", city: "Pune", state: "Maharashtra", type: "Sales Office", address: "209, Regent Plaza, 2nd Floor, Baner–Pashan Link Road, Baner, Pune – 411045", phone: "+91 9561094183", email: "", lat: 18.5204, lon: 73.8567, verification_status: "Verified" },
    { id: "JSL-IN-SALES-010", city: "Vadodara", state: "Gujarat", type: "Sales Office", address: "902-903, Samanvay Silver, Near Shivaji Circle, Mujmahuda, Vadodara – 390020", phone: "+91 9833214396", email: "", lat: 22.3072, lon: 73.1812, verification_status: "Verified" },
    { id: "JSL-IN-SC-001", city: "Gurugram / Pathredi", state: "Haryana", type: "Service Centre", address: "VPO – Pathredi, Bilaspur–Tauru Road, Gurugram – 122413", phone: "+91 9560885892; +91 124 4127700", email: "info.hisar@jindalstainless.com", lat: 28.3411, lon: 76.9490, verification_status: "Verified" },
    { id: "JSL-IN-SC-002", city: "Patalganga / Raigad", state: "Maharashtra", type: "Service Centre", address: "Plot No. N-13, Addl. Patalganga Industrial Area, Tal. Khalapur, Dist. Raigad", phone: "+91 9665061222", email: "", lat: 18.8437, lon: 73.1460, verification_status: "Verified" },
    { id: "JSL-IN-SC-003", city: "Gummidipoondi / Chennai", state: "Tamil Nadu", type: "Service Centre", address: "Survey No. 2 of No. 19, Chinna Puliyar Village, Gummidipoondi Taluk, Dist. Thiruvallur, Chennai – 601201", phone: "", email: "", lat: 13.4043, lon: 80.1047, verification_status: "Verified" },
    { id: "JSL-IN-SC-004", city: "Vadodara", state: "Gujarat", type: "Service Centre / Sales", address: "Office No. 902/903, Samanvay Silver, Shivaji Circle, Mujmahuda, Akota, Vadodara – 390020", phone: "+91 7600818230", email: "", lat: 22.3089, lon: 73.1814, verification_status: "Verified" },
    { id: "JSL-IN-MFG-001", city: "Hisar", state: "Haryana", type: "Manufacturing Facility", address: "O.P. Jindal Marg, Hisar – 125005, Haryana", phone: "01662-222471-83", email: "info.hisar@jindalstainless.com", lat: 29.1490, lon: 75.7217, verification_status: "Verified" },
    { id: "JSL-IN-MFG-002", city: "Jajpur", state: "Odisha", type: "Manufacturing Facility", address: "Kalinga Nagar Industrial Complex, Duburi, Dist. Jajpur – 755026, Odisha", phone: "+91 9937811839", email: "investorcare@jindalstainless.com", lat: 20.9517, lon: 86.0096, verification_status: "Verified" },
    { id: "JSL-IN-MFG-003", city: "Kothavalasa", state: "Andhra Pradesh", type: "Manufacturing Facility", address: "Jindal Nagar, Kothavalasa – 535183, Dist. Vizianagaram, Andhra Pradesh", phone: "+91 8966 273327", email: "", lat: 18.0480, lon: 83.4480, verification_status: "Verified" },
    { id: "JSL-IN-MFG-004", city: "Ghaziabad", state: "Uttar Pradesh", type: "Manufacturing / Acquired Facility", address: "A 1 Industrial Area, South of G.T. Road, Ghaziabad, Uttar Pradesh – 201009", phone: "", email: "", lat: 28.6692, lon: 77.4538, verification_status: "Verified" }
];

// SOURCES
window.SG_SOURCES = [
    { source_id: "SRC001", title: "Jindal Stainless 300 Series Technical Datasheet", publisher: "Jindal Stainless", url: "#", date: null },
    { source_id: "SRC002", title: "Jindal Stainless 400 Series Technical Datasheet", publisher: "Jindal Stainless", url: "#", date: null },
    { source_id: "SRC003", title: "Jindal Stainless Duplex Series Technical Datasheet", publisher: "Jindal Stainless", url: "#", date: null },
    { source_id: "SRC004", title: "Jindal Stainless Sustainability Report FY2023-24", publisher: "Jindal Stainless", url: "https://www.jindalstainless.com/", date: "2024" },
    { source_id: "SRC005", title: "SmartGrade Round-2 Prototype Dataset", publisher: "SmartGrade Team", url: "#", date: "2026" }
];

// RECOMMENDATION RULES (from dataset Recommendation_Rules sheet)
window.SG_REC_RULES = [
    { rule_id: "R001", stage: "Hard Filter", criterion: "Application compatibility", logic: "If grade_application evidence directly supports the application, pass. If only weak/context evidence, mark Needs Verification rather than fail.", priority: "Hard/verification" },
    { rule_id: "R002", stage: "Hard Filter", criterion: "Environment/corrosion", logic: "Reject only when supplied evidence clearly contradicts the required environment. Missing corrosion data → Needs Verification.", priority: "Hard/verification" },
    { rule_id: "R003", stage: "Hard Filter", criterion: "Temperature", logic: "If user temperature exceeds documented grade capability, reject. If not documented, flag Needs Verification.", priority: "Hard/verification" },
    { rule_id: "R004", stage: "Hard Filter", criterion: "Strength", logic: "Compare minimum YS/UTS target with source-supported minimums where comparable product form/standard applies.", priority: "Hard" },
    { rule_id: "R005", stage: "Hard Filter", criterion: "Fabrication/weldability", logic: "If welding required, prefer grades with explicit weldability evidence; missing data → Needs Verification.", priority: "Hard/verification" },
    { rule_id: "R006", stage: "Hard Filter", criterion: "Product form", logic: "Use product_forms field; if required form not listed, flag verification rather than invent availability.", priority: "Hard/verification" },
    { rule_id: "R007", stage: "Ranking", criterion: "Cost", logic: "Use prototype relative cost band only after engineering eligibility. Cost must not override a failed hard requirement.", priority: "Soft" },
    { rule_id: "R008", stage: "Ranking", criterion: "Performance priority", logic: "Increase weight for user-selected critical property (corrosion or strength); keep hard constraints unchanged.", priority: "Soft" },
    { rule_id: "R009", stage: "Ranking", criterion: "Missing data", logic: "Do not score unsupported properties as zero; renormalize available weights or flag the result conditional.", priority: "Safety/quality" },
    { rule_id: "R010", stage: "Explainability", criterion: "Sources", logic: "Every important recommendation reason should retain grade/source/page references.", priority: "Required" }
];
