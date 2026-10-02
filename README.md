# 🏭 SmartGrade

### Intelligent Stainless Steel Grade Recommendation & Procurement Support Platform

SmartGrade is a **prototype for Jindal Stainless grade recommendation and procurement support**.

The system takes an application requirement in natural language or through structured inputs, translates it into engineering requirements, removes grades that do not satisfy hard constraints, ranks the remaining candidates according to user priorities, and explains the recommendation with supporting evidence.

It is designed around one important separation:

> **The LLM interprets and explains. The dataset supplies the facts. The recommendation engine applies the engineering rules.**

This keeps the recommendation process transparent, reproducible, and traceable to source material.

---

## 🧭 Quick Navigation

- [✨ What SmartGrade Does](#-what-smartgrade-does)
- [🔄 How SmartGrade Works](#-how-smartgrade-works)
- [🧩 System Modules](#-system-modules)
- [⭐ Recommendation Workflow](#-recommendation-workflow)
- [🖥️ Current Prototype](#️-current-prototype)
- [🛠️ Technology Stack](#️-technology-stack)
- [📁 Project Structure](#-project-structure)
- [📊 Prototype Dataset](#-prototype-dataset)
- [🧠 Recommendation Engine](#-recommendation-engine)
- [🔎 Explainability & Source Traceability](#-explainability--source-traceability)
- [🌱 Sustainability & 💰 Cost Intelligence](#-sustainability---cost-intelligence)
- [🛒 Before You Buy](#-before-you-buy)
- [📍 Jindal Sales & Services](#-jindal-sales--services)
- [💬 Knowledge Assistant](#-knowledge-assistant)
- [👨‍🔬 Expert Validation](#-expert-validation)
- [📄 Reports & Saved Projects](#-reports--saved-projects)

---

## ✨ What SmartGrade Does

SmartGrade is **not simply a grade-search chatbot**.

Its core workflow is:

```text
User Application
      ↓
Engineering Requirements
      ↓
Requirement Review
      ↓
Hard Constraint Filtering
      ↓
Weighted Ranking
      ↓
Trade-off Analysis
      ↓
Recommendation + Alternatives
      ↓
Explanation + Source Evidence
      ↓
Procurement Support
```

The system considers requirements such as:

- Application / component
- Operating environment
- Temperature
- Strength requirement
- Corrosion resistance
- Formability
- Weldability
- Product form
- Cost priority
- Performance priority

The final output can include:

- ⭐ **Best Fit**
- 💰 **Cost-Optimized**
- 🏆 **Performance-First**
- 🔄 **Alternative grades**
- ⚖️ Trade-offs
- 📚 Source evidence
- ⚠️ Missing information / verification requirements

---

## 🔄 How SmartGrade Works

```text
┌─────────────────────┐
│      USER / UI      │
│   Guided / Expert   │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│     INPUT LAYER     │
│ Text · Image · Audio│
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ ENGINEERING          │
│ INTERPRETER          │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ REQUIREMENT PROFILE │
│   User Review/Edit   │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ HARD CONSTRAINT     │
│      FILTER         │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ WEIGHTED RANKING &  │
│  TRADE-OFF ENGINE   │
└──────────┬──────────┘
           ↓
┌─────────────────────────────────────┐
│ Grade Knowledge                     │
│ Application Knowledge               │
│ Cost Bands                          │
│ Sustainability Evidence             │
└──────────┬──────────────────────────┘
           ↓
┌─────────────────────┐
│ EXPLANATION +       │
│ SOURCE TRACEABILITY │
└──────────┬──────────┘
           ↓
┌─────────────────────────────────────┐
│ Recommendation / Alternatives       │
│ Report · Before You Buy             │
│ Sales & Services · Knowledge Assist │
└─────────────────────────────────────┘
```

The architecture separates the **structured source of truth** from the AI layer. PostgreSQL/Supabase is intended for structured records, while a document store/vector index supports source-grounded knowledge retrieval.

---

# 🧩 System Modules

SmartGrade is organized into the following functional modules.

| Module | What it does |
|---|---|
| 👤 **User Experience & Access** | Guided Mode, Expert Mode, profile, saved projects and recommendation history |
| 🧠 **Requirement Intelligence** | Natural-language input, image/OCR input, engineering interpretation and missing-information alerts |
| 🔍 **Grade Knowledge** | Grade search, property explorer, grade profiles and application knowledge |
| ⚙️ **Recommendation Engine** | Hard filtering, ranking, Best Fit, Cost-Optimized, Performance-First and alternatives |
| 💡 **Explainability & Validation** | Reasons, score breakdown, assumptions, limitations, source traceability and expert validation |
| 🖼️ **Application Visualizer** | Application images, clickable components and material/grade evidence |
| 🌱 **Sustainability Evidence** | Shows whether documented Jindal PCF assessment exists for applicable grade/site records |
| 💰 **Cost Intelligence** | Lower / Moderate / Higher reference bands used consistently across the system |
| ✅ **Before You Buy** | Specification, certification, MTC, dimensions, finish and quantity checklist |
| 📍 **Jindal Sales & Services** | Sales office, service centre and manufacturing location support |
| 💬 **Knowledge Assistant** | Source-grounded grade, property, application and recommendation Q&A |
| 📄 **Reports & Project Workspace** | Save, compare, rerun and export recommendation records |

---

# ⭐ Recommendation Workflow

## 1. Guided Mode

Guided Mode is intended for users who may not know all the engineering parameters.

The interface asks questions such as:

| Guided Question | Engineering Field |
|---|---|
| What are you designing? | Application / component |
| Where will it be used? | Environment / exposure |
| How hot will it get? | Operating temperature |
| Does it need to carry high loads? | Strength requirement |
| Will it need bending / deep drawing? | Formability |
| Will it be welded? | Weldability |
| What matters more: cost or performance? | Priority weights |

The answers are converted into the same **Requirement Profile JSON** used by Expert Mode.

---

## 2. Expert Mode

Expert Mode exposes the engineering parameters directly.

It allows a more technical user to provide:

- Application / industry
- Environment
- Temperature
- Strength requirement
- Formability
- Weldability
- Product form
- Corrosion requirement
- Priority weights

Both Guided and Expert Mode ultimately feed the **same recommendation engine**.

---

# ⚙️ Recommendation Engine

The recommendation engine works in two major stages.

## Stage 1 — Hard Constraint Filtering

Candidate grades are checked against:

```text
Candidate Grades
      ↓
Application Compatibility
      ↓
Environment / Corrosion Minimum
      ↓
Temperature Suitability
      ↓
Strength Minimum
      ↓
Fabrication / Weldability
      ↓
Product Form Availability
      ↓
Remaining Candidates
```

A grade that fails a hard engineering requirement is removed from the candidate set.

### Missing data handling

Missing data is **not automatically treated as failure**.

If a required property is unavailable:

```text
Data unavailable
      ↓
Needs Verification
      ↓
Surface missing field to user
```

This prevents incomplete documentation from automatically becoming a bad grade.

---

## Stage 2 — Weighted Ranking

Remaining candidates are ranked using available evidence.

The prototype scoring model follows:

```text
Score =
    engineering_fit  × w_engineering
  + corrosion_fit    × w_corrosion
  + temperature_fit  × w_temperature
  + fabrication_fit  × w_fabrication
  + cost_fit         × w_cost
  + evidence_bonus   × w_evidence
```

The weights are configurable and their total is normalized to 1.

Unsupported properties are **not scored as zero**. If a criterion has no comparable value, that criterion is marked unavailable and the available weights are renormalized.

---

## 🏆 Recommendation Views

| Recommendation | Meaning |
|---|---|
| ⭐ **Best Fit** | Uses the user's overall priority weights |
| 💰 **Cost-Optimized** | Gives greater weight to cost while keeping hard engineering constraints unchanged |
| 🏆 **Performance-First** | Gives greater weight to the user's selected performance property |
| 🔄 **Alternative** | Shows another technically suitable candidate and explains the difference |

---

# ⚖️ Trade-off Explorer

SmartGrade also allows the user to explore trade-offs between priorities such as:

```text
Lower Cost  ←──────────────→  Higher Performance
```

For example:

- Cost ↔ Corrosion resistance
- Cost ↔ Strength
- Performance ↔ Fabrication suitability

Changing the emphasis updates the ranking.

> Moving toward a performance criterion changes the ranking weight; it does **not** override hard engineering requirements.

---

# 💡 Explainability & Source Traceability

Every recommendation should explain:

1. Why the grade passed the hard filters
2. Which properties matched the requirements
3. Which user priority influenced the ranking
4. What trade-off exists
5. What information is missing
6. Which sources support the result

Example:

```text
RECOMMENDED GRADE: 316L

Why:
✓ Application compatible
✓ High corrosion requirement satisfied
✓ Weldability requirement satisfied
✓ Temperature requirement satisfied

Trade-off:
→ Higher cost band than some alternatives

Data caveat:
→ Confirm product form and exact specification before purchase

Sources:
→ Grade technical document
→ Application source
→ Cost reference
```

The displayed **SmartGrade Fit Score is a prototype ranking metric**. It is not Jindal certification and does not represent human expert approval.

---

# 🖥️ Current Prototype

The supplied prototype is currently implemented as a **browser-based HTML/CSS/JavaScript application**.

### Current implementation

| Layer | Current Prototype |
|---|---|
| 🎨 UI | HTML5 + CSS3 |
| ⚙️ Application logic | Vanilla JavaScript |
| 📊 Data | JavaScript data modules / prototype dataset |
| 🧠 Recommendation | `engine.js` deterministic filtering + ranking |
| 🗺️ Map | Leaflet + OpenStreetMap |
| 💾 Project persistence | Browser/local prototype state |
| 💬 Assistant | Prototype source-grounded chat interface |
| 🖼️ Application visuals | Local application images |
| 📄 Reports | Browser/print-oriented report view |

The blueprint's recommended production-oriented architecture is:

| Layer | Recommended Architecture |
|---|---|
| Frontend | Next.js / React |
| Styling | Tailwind CSS + component library |
| Backend | Python FastAPI |
| Database | Supabase PostgreSQL |
| Authentication | Supabase Auth |
| File storage | Supabase Storage |
| Vector search | pgvector |
| AI | Hosted LLM API |
| OCR / Vision | Vision/OCR API |
| Maps | Leaflet + OpenStreetMap or Google Maps |
| Reports | HTML/PDF / print view |

The current prototype focuses on demonstrating the **system behaviour and recommendation journey** rather than implementing the complete production architecture.

---

# 🛠️ Technology Stack

### Current Prototype

```text
HTML5
   +
CSS3
   +
Vanilla JavaScript
   +
Leaflet
   +
Structured JavaScript Dataset
```

### Intended Scalable Architecture

```text
React / Next.js
       ↓
FastAPI
       ↓
Supabase PostgreSQL
       +
Supabase Storage
       +
pgvector
       ↓
Hosted LLM / Vision APIs
```

The architecture specifically avoids training a language model from scratch. The intended AI approach is a small, curated RAG knowledge base over relevant Jindal source material.

---

# 📁 Project Structure

The current prototype repository is organized as:

```text
SmartGrade/
│
├── 📄 README.md
├── 📄 dataset.json
├── 📄 dataset_schema.json
│
├── 📁 DATASET_TO_ADD/
│   ├── README_DATASET.md
│   └── SmartGrade_Round2_Prototype_Ready_Dataset.xlsx
│
└── 📁 smartgrade-app/
    │
    ├── 📄 index.html
    │
    ├── 📁 css/
    │   └── smartgrade.css
    │
    ├── 📁 images/
    │   ├── 01_coastal_structure.jpg
    │   ├── 02_chemical_processing.jpg
    │   ├── 03_food_processing.jpg
    │   ├── 04_pharmaceutical.jpg
    │   ├── 05_automotive_exhaust.jpg
    │   ├── 06_high_temperature.jpg
    │   ├── 07_indoor_appliance.jpg
    │   ├── 08_kitchenware.jpg
    │   ├── 09_offshore_chloride.jpg
    │   ├── 10_water_sewage.jpg
    │   ├── 11_seawater_desalination.jpg
    │   └── 12_sulfuric_fgd.jpg
    │
    └── 📁 js/
        ├── app.js
        ├── engine.js
        ├── views1.js
        ├── views2.js
        │
        └── 📁 data/
            ├── applications.js
            ├── dataset.js
            ├── grades.js
            └── properties.js
```

### Main application files

| File | Responsibility |
|---|---|
| `index.html` | Main application entry point and script loading |
| `css/smartgrade.css` | SmartGrade visual design system and component styling |
| `js/app.js` | Application controller, navigation and state |
| `js/engine.js` | Requirement filtering, ranking and recommendation logic |
| `js/views1.js` | Dashboard, navigation, grade explorer and comparison views |
| `js/views2.js` | Recommendation, procurement, visualizer, reports, history and expert workflows |
| `js/data/grades.js` | Grade records |
| `js/data/properties.js` | Technical property records |
| `js/data/applications.js` | Application scenarios and grade-application mappings |
| `js/data/dataset.js` | Additional prototype dataset and supporting records |
| `images/` | Application visualization assets |

---

# 📊 Prototype Dataset

The prototype deliberately uses a **focused dataset** rather than attempting to load the entire Jindal catalogue.

The recommended coverage is:

| Dataset | Target |
|---|---:|
| 🧪 Core grades | 10–12 |
| 🏗️ Applications | 8–12 |
| 💰 Cost bands | All prototype grades |
| 🌱 Sustainability | All 12 supplied grade/site records |
| 📍 Locations | Full static location dataset |
| 💬 RAG corpus | Prototype grades + selected application documents |
| 📄 MTC | 1–2 sample certificates, if available |

The current prototype includes application scenarios covering areas such as:

- 🌊 Coastal / Marine Structures
- ⚙️ Process / Chemical Equipment
- 🍽️ Food Processing & Consumer
- 🚗 Automotive Exhaust
- 🚆 Railway / Transport
- 🔥 High-Temperature / Industrial Furnace
- 🏛️ Architecture & Facades
- 🧪 Pulp, Paper & Aggressive Acids

---

# 🗄️ Data Architecture

The structured source-of-truth model contains records for:

```text
grades
properties
corrosion
fabrication
applications
grade_applications
cost_bands
sustainability
locations
sources
projects
recommendations
chat_messages
```

Every important technical record should retain source information such as:

```text
source_id
document / URL
page / section
date
```

This allows recommendation results to remain traceable back to the source material.

---

# 🌱 Sustainability & 💰 Cost Intelligence

## 🌱 Sustainability Evidence

SmartGrade uses the finalized sustainability dataset as an **evidence key**.

The UI answers whether documented Jindal PCF assessment exists for an applicable grade/site record.

It does **not** turn this evidence into a sustainability ranking.

The prototype should not display unsupported:

- Numeric PCF values
- Sustainability scores
- Recycled-material percentages
- Renewable-energy values
- External PCF estimates

---

## 💰 Cost Intelligence

SmartGrade uses three reference bands:

```text
Lower
Moderate
Higher
```

The same cost-band language is reused across:

- Filters
- Grade comparison
- Recommendations
- Alternatives
- Trade-off views
- Reports

These are **prototype reference bands**, not Jindal price quotations.

Public market references, where used, must be clearly identified as secondary/indicative references rather than Jindal pricing.

---

# 🛒 Before You Buy

After selecting a grade, SmartGrade provides a procurement-readiness checklist.

### Specification

- Grade
- Product form
- Applicable standard/specification

### Certification

- Required compliance/certification documents

### MTC

- Material Test Certificate
- Grade / heat / lot traceability
- Chemistry and mechanical values

### Dimensions

- Thickness
- Width
- Length / OD / wall thickness as applicable

### Finish

- Required surface finish

### Quantity

- Quantity
- Unit
- Order quantity

The checklist helps verify the actual purchase specification against the recommendation.

> **Before You Buy does not certify a purchase.**

---

# 📍 Jindal Sales & Services

SmartGrade uses the supplied India location dataset to provide a static, source-verified location experience.

The flow is:

```text
User City
   ↓
Verified Location Records
   ↓
Distance Calculation
   ↓
Relevant Jindal Office / Service Centre
   ↓
Call / Email / Official Contact Route
```

The location data is **not live inventory data**.

A location being displayed does not mean that a particular grade is currently available in stock.

---

# 💬 Knowledge Assistant

The SmartGrade Assistant is designed around two question categories:

### 1. Factual questions

Examples:

```text
What is the corrosion resistance of 316L?
What applications is 409L used for?
What is the difference between 304 and 316?
```

### 2. Recommendation questions

Examples:

```text
Why did you choose 316L over 304?
Why is this grade more suitable for my application?
What trade-off am I making by choosing the cheaper option?
```

For recommendation questions, the assistant receives the current:

```text
Requirement Profile
       +
Shortlisted Grades
       +
Scores
       +
Reasons
       +
Trade-offs
```

This prevents the chatbot from independently creating a new recommendation.

---

# 👨‍🔬 Expert Validation

Complex recommendations can be submitted for expert review.

The prototype supports a review workflow:

```text
Recommendation
      ↓
Request Expert Validation
      ↓
Expert Reviews Case
      ↓
Expert Notes
      ↓
Expert Grade Selection
      ↓
Reviewed Record
```

The system must not imply that an expert has approved a recommendation unless an actual review record exists.

---

# 📄 Reports & Saved Projects

Each recommendation can be treated as a versioned project.

A project can retain:

```text
Project
 ├── Input
 ├── Requirement Profile
 ├── Recommendation Version
 ├── Compared Grades
 ├── Trade-offs
 ├── Sources
 └── Exported Report
```

The technical recommendation report contains:

- Application
- Interpreted requirements
- Recommended grade
- Alternatives
- Key properties
- Reasoning
- Trade-offs
- Assumptions
- Missing information
- Source list
- Sustainability evidence
- Cost band
- Date / version

# 🔐 Source & Engineering Rules

SmartGrade follows a strict evidence hierarchy.

## ⚠️ Missing Data Policy

If a required value is not available:

```text
Do not guess
     ↓
Do not fabricate
     ↓
Mark as unavailable
     ↓
Request verification when necessary
```

This is especially important for:

- Temperature capability
- Strength
- Weldability
- Product-form availability
- Cost
- Sustainability evidence

---

### 🏭 SmartGrade

**Intelligent Grade Recommendation · Engineering Reasoning · Source Traceability · Procurement Support**
