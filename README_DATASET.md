# DATASET TO ADD

Place the generated/validated SmartGrade dataset files in this folder.

Recommended organization:

dataset/
  grades/
  properties/
  corrosion/
  fabrication/
  applications/
  grade_applications/
  cost_bands/
  sustainability/
  locations/
  sources/
  mtc_samples/              # optional
  rag_documents/            # optional

The prototype should treat these files as the factual source of truth.

Do not overwrite source facts with generated values.
Do not create unsupported engineering values to fill blanks.

Recommended prototype coverage:
- 10–12 core grades
- 8–12 application scenarios
- cost bands for prototype grades
- all 12 supplied sustainability grade/site records
- full supplied location dataset
- selected application/RAG documents
- 1–2 sample MTCs if available
