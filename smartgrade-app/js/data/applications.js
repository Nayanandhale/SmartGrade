// SmartGrade Dataset – Applications & Grade-Application Mappings
// Source: SmartGrade_Round2_Prototype_Ready_Dataset.xlsx / Applications & Grade_Applications sheets

window.SG_APPLICATIONS = [
    {
        application_id: "APP001",
        name: "Coastal / Marine Structure",
        industry: "Construction & Infrastructure",
        component: "Structural component, cladding, handrails, bridges",
        environment: "Outdoor / coastal / marine / chloride",
        temp_range: "Ambient to moderate (up to ~60°C)",
        required_properties: ["High corrosion resistance", "Weldability", "Good strength"],
        icon: "🌊",
        hotspots: [
            { id: "HS001", label: "Structural Beam", x: 30, y: 40, grades: ["G004", "G008", "G003"], note: "Chloride-laden atmosphere requires Mo-bearing or duplex grade" },
            { id: "HS002", label: "Cladding Panel", x: 60, y: 25, grades: ["G003", "G004", "G009"], note: "Surface finish and pitting resistance critical" },
            { id: "HS003", label: "Fasteners / Fixings", x: 75, y: 60, grades: ["G008", "G004"], note: "SCC risk in coastal exposure — duplex preferred" }
        ]
    },
    {
        application_id: "APP002",
        name: "Process / Chemical Equipment",
        industry: "Chemical & Process Industry",
        component: "Pressure vessels, heat exchangers, pipelines",
        environment: "Chemical / acid / high temperature",
        temp_range: "Ambient to 450°C (grade-dependent)",
        required_properties: ["Corrosion resistance to process chemicals", "Weldability", "Pressure-bearing capability"],
        icon: "⚙️",
        hotspots: [
            { id: "HS004", label: "Pressure Vessel Shell", x: 35, y: 45, grades: ["G004", "G003", "G012"], note: "Material selection depends on process chemical and temperature" },
            { id: "HS005", label: "Heat Exchanger Tube", x: 65, y: 30, grades: ["G004", "G012"], note: "Pitting/crevice corrosion resistance critical in cooling water" }
        ]
    },
    {
        application_id: "APP003",
        name: "Food Processing & Consumer",
        industry: "Food & Beverage / Consumer Goods",
        component: "Kitchen equipment, food tanks, utensils, catering",
        environment: "Food-grade / damp / mild cleaning agents",
        temp_range: "Ambient to moderate",
        required_properties: ["Hygienic surface", "Formability", "Weldability", "Moderate corrosion resistance"],
        icon: "🍽️",
        hotspots: [
            { id: "HS006", label: "Mixing Tank", x: 40, y: 50, grades: ["G001", "G002", "G004"], note: "304/304L standard for food unless aggressive cleaning used" },
            { id: "HS007", label: "Work Surface", x: 65, y: 35, grades: ["G001", "G010"], note: "Formability and surface finish priority" }
        ]
    },
    {
        application_id: "APP004",
        name: "Automotive Exhaust System",
        industry: "Automotive",
        component: "Mufflers, exhaust pipes, catalytic converter housings",
        environment: "High temperature / cyclic thermal / mild condensate",
        temp_range: "Up to ~800°C (grade-dependent)",
        required_properties: ["High-temperature oxidation resistance", "Formability", "Weldability"],
        icon: "🚗",
        hotspots: [
            { id: "HS008", label: "Muffler / Silencer", x: 50, y: 55, grades: ["G007", "G006"], note: "409L primary grade for automotive exhaust per Jindal data" },
            { id: "HS009", label: "Exhaust Manifold", x: 30, y: 40, grades: ["G005", "G007"], note: "Higher temperature requires Ti-stabilized austenitic" }
        ]
    },
    {
        application_id: "APP005",
        name: "Railway / Transport",
        industry: "Railway & Transportation",
        component: "Rail car bodies, interior panels, structural elements",
        environment: "Outdoor / industrial atmosphere / mechanical loading",
        temp_range: "Ambient to moderate",
        required_properties: ["Strength", "Formability", "Weight efficiency", "Weldability"],
        icon: "🚆",
        hotspots: [
            { id: "HS010", label: "Carriage Body Panel", x: 45, y: 30, grades: ["G009", "G001", "G010"], note: "Lean duplex reduces weight vs austenitic at equivalent strength" },
            { id: "HS011", label: "Structural Frame", x: 30, y: 60, grades: ["G009", "G008"], note: "Higher strength grade allows thinner sections" }
        ]
    },
    {
        application_id: "APP006",
        name: "High-Temperature / Industrial Furnace",
        industry: "Heat Treatment / Industrial Processing",
        component: "Furnace components, heat shields, kiln furniture",
        environment: "High temperature / oxidising",
        temp_range: "450°C to 900°C",
        required_properties: ["High-temperature oxidation resistance", "Creep resistance", "Intergranular corrosion resistance"],
        icon: "🔥",
        hotspots: [
            { id: "HS012", label: "Heat Shield / Muffle", x: 40, y: 40, grades: ["G005", "G006"], note: "321 suited for 450–900°C per Jindal sheet; 430 up to 875°C intermittent" }
        ]
    },
    {
        application_id: "APP007",
        name: "Architecture & Facades",
        industry: "Architecture & Construction",
        component: "Cladding, roofing, column covers, entry features",
        environment: "Urban / semi-rural outdoor / non-marine",
        temp_range: "Ambient",
        required_properties: ["Surface finish / aesthetics", "Moderate corrosion resistance", "Formability"],
        icon: "🏛️",
        hotspots: [
            { id: "HS013", label: "Facade Panel", x: 50, y: 30, grades: ["G001", "G006", "G011"], note: "304 or 430 depending on environment aggressivity; 316 for urban coastal" },
            { id: "HS014", label: "Entrance Feature", x: 70, y: 55, grades: ["G001", "G010"], note: "Ni-saving grades can reduce cost for non-aggressive indoor/mild applications" }
        ]
    },
    {
        application_id: "APP008",
        name: "Pulp, Paper & Aggressive Acids",
        industry: "Pulp & Paper / Chemical",
        component: "Digesters, bleach plant equipment, acid tanks",
        environment: "Aggressive acids / chloride + acid / high temperature",
        temp_range: "Ambient to 150°C",
        required_properties: ["Exceptional corrosion resistance (pitting, crevice, SCC)", "Weldability"],
        icon: "🧪",
        hotspots: [
            { id: "HS015", label: "Bleach Plant Vessel", x: 40, y: 45, grades: ["G012", "G008"], note: "904L for aggressive acid/chloride environments" }
        ]
    }
];

// Grade-Application mappings
window.SG_GRADE_APPLICATIONS = [
    { grade_id: "G001", application_id: "APP003", evidence_type: "Direct / Primary", note: "304 is industry standard for food processing", source: "300series.pdf, pp.7-8" },
    { grade_id: "G001", application_id: "APP007", evidence_type: "Direct / Primary", note: "304 widely used for architecture in non-marine zones", source: "300series.pdf, pp.7-8" },
    { grade_id: "G002", application_id: "APP003", evidence_type: "Direct / Primary", note: "304L preferred for welded food equipment", source: "300series.pdf, pp.7-8" },
    { grade_id: "G003", application_id: "APP001", evidence_type: "Direct / Primary", note: "316 for coastal/marine chloride environments", source: "300series.pdf, pp.20-21" },
    { grade_id: "G003", application_id: "APP002", evidence_type: "Direct / Primary", note: "316 for chemical process equipment", source: "300series.pdf, pp.20-21" },
    { grade_id: "G004", application_id: "APP001", evidence_type: "Direct / Primary", note: "316L preferred for welded coastal structures", source: "300series.pdf, pp.20-21" },
    { grade_id: "G004", application_id: "APP002", evidence_type: "Direct / Primary", note: "316L preferred for welded chemical equipment", source: "300series.pdf, pp.20-21" },
    { grade_id: "G004", application_id: "APP003", evidence_type: "Context / Secondary", note: "316L when aggressive cleaning agents used", source: "300series.pdf, pp.20-21" },
    { grade_id: "G005", application_id: "APP006", evidence_type: "Direct / Primary", note: "321 designed for 450–900°C applications per Jindal sheet", source: "300series.pdf, p.24" },
    { grade_id: "G005", application_id: "APP004", evidence_type: "Direct / Primary", note: "321 for high-temperature exhaust manifold applications", source: "300series.pdf, p.24" },
    { grade_id: "G006", application_id: "APP004", evidence_type: "Direct / Primary", note: "430 for automotive trim and mild-temperature exhaust", source: "400series.pdf, pp.11-12" },
    { grade_id: "G006", application_id: "APP007", evidence_type: "Direct / Primary", note: "430 for non-marine architectural applications", source: "400series.pdf, pp.11-12" },
    { grade_id: "G007", application_id: "APP004", evidence_type: "Direct / Primary", note: "409L is primary Jindal grade for automotive exhaust", source: "400series.pdf, pp.1-2" },
    { grade_id: "G008", application_id: "APP001", evidence_type: "Direct / Primary", note: "2205 for high-strength coastal/structural applications", source: "duplex-series.pdf, p.3" },
    { grade_id: "G008", application_id: "APP002", evidence_type: "Direct / Primary", note: "2205 for offshore/chemical process equipment", source: "duplex-series.pdf, p.3" },
    { grade_id: "G008", application_id: "APP008", evidence_type: "Direct / Primary", note: "2205 for aggressive chemical environments", source: "duplex-series.pdf, p.3" },
    { grade_id: "G009", application_id: "APP001", evidence_type: "Direct / Primary", note: "2101 for cost-effective high-strength coastal structures", source: "duplex-series.pdf" },
    { grade_id: "G009", application_id: "APP005", evidence_type: "Direct / Primary", note: "2101 lean duplex for railway/transport structural applications", source: "duplex-series.pdf" },
    { grade_id: "G010", application_id: "APP003", evidence_type: "Context / Secondary", note: "J204Cu suitable for non-aggressive food-adjacent applications", source: "Jindal proprietary specification" },
    { grade_id: "G010", application_id: "APP007", evidence_type: "Direct / Primary", note: "J204Cu for cost-effective non-marine architecture", source: "Jindal proprietary specification" },
    { grade_id: "G011", application_id: "APP007", evidence_type: "Direct / Primary", note: "J4 for economy indoor architectural applications", source: "Jindal proprietary specification" },
    { grade_id: "G012", application_id: "APP002", evidence_type: "Direct / Primary", note: "904L for aggressive acid process environments", source: "904L reference" },
    { grade_id: "G012", application_id: "APP008", evidence_type: "Direct / Primary", note: "904L for pulp/paper and aggressive acid environments", source: "904L reference" }
];
