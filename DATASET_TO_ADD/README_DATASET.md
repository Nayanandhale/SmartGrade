# 📊 SmartGrade Dataset

> **Factual dataset layer for the SmartGrade prototype**  
> This folder contains the generated/validated datasets and supporting documents used by SmartGrade.

---

## 🧭 What This Folder Is For

The `dataset/` folder is the **factual source of truth** for the SmartGrade prototype.

It should contain validated data covering:

- 🧪 Material grades and properties
- 🏭 Application scenarios
- 💰 Cost bands
- 🌱 Sustainability information
- 📍 Locations
- 📚 Source and RAG documents
- 📄 Sample MTCs (Material Test Certificates), where available

> ⚠️ **Data integrity comes first:** prototype logic must use supplied/source facts rather than replacing them with invented engineering values.

---

## 📁 Recommended Dataset Structure

```text
dataset/
│
├── grades/              # Core material/steel grade records
├── properties/          # Grade properties and technical data
├── corrosion/           # Corrosion-related information
├── fabrication/         # Fabrication and manufacturability data
├── applications/        # Application scenarios
├── grade_applications/  # Grade ↔ application mappings
├── cost_bands/          # Prototype cost-band information
├── sustainability/      # Sustainability grade/site records
├── locations/           # Location dataset
├── sources/             # Source/reference data
├── mtc_samples/         # Optional: sample MTCs
└── rag_documents/       # Optional: documents used for RAG
```

---

## 🔐 Source-of-Truth Rules

### ✅ Do

- Use supplied/validated source data as the factual basis.
- Preserve source facts when building prototype features.
- Keep datasets organized according to the structure above.
- Retain source/reference information where applicable.

### ❌ Do Not

- ❌ Overwrite source facts with generated values.
- ❌ Invent unsupported engineering values to fill missing fields.
- ❌ Treat generated assumptions as validated material data.
- ❌ Modify factual records simply to make the prototype output look complete.

> **Rule of thumb:** If a value is not supported by the supplied source material, leave it blank or mark it as unavailable rather than inventing it.

---

## 📦 Recommended Prototype Coverage

| Dataset Area | Recommended Coverage |
|---|---|
| 🧪 Core grades | **10–12** core grades |
| 🏗️ Applications | **8–12** application scenarios |
| 💰 Cost | Cost bands for prototype grades |
| 🌱 Sustainability | All **12 supplied sustainability grade/site records** |
| 📍 Locations | Full supplied location dataset |
| 📚 Application / RAG documents | Selected relevant documents |
| 📄 MTC samples | **1–2** sample MTCs, if available |

---

## 🎯 Purpose in the Prototype

The dataset supports SmartGrade's factual layer, allowing the application to work with consistent information across grades, properties, applications, cost, sustainability, locations, and supporting documents.

```text
              ┌──────────────────────┐
              │   Source / Validated │
              │        Data          │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   SmartGrade Dataset │
              │      /dataset        │
              └──────────┬───────────┘
                         │
            ┌────────────┼────────────┐
            ▼            ▼            ▼
       🧠 Prototype   📊 Analytics   🔎 RAG
         Logic         & Matching    / Search
```

---

## 📝 Data Quality Principle

**Accuracy > Completeness**

Missing information is preferable to unsupported information.

If a required engineering value is not available in the supplied sources:

```text
Do not guess → Do not fabricate → Preserve the gap
```

This keeps prototype outputs traceable to the underlying source material.

---

## 🚀 Before Adding New Dataset Files

Before committing a new file, check:

- [ ] Is the data supported by a supplied/validated source?
- [ ] Is it placed in the correct dataset folder?
- [ ] Are existing source facts preserved?
- [ ] Are unsupported values avoided?
- [ ] Is the file useful for the prototype's intended coverage?
- [ ] Are optional documents clearly identified as optional?

---

### 📌 SmartGrade Dataset Principle

> **Keep the prototype grounded in facts, not assumptions.**
