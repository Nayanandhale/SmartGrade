/**
 * SmartGrade Deterministic Recommendation Engine
 * Implements: Hard Filter → Weighted Ranking → Explanation
 * The LLM MUST NOT independently choose the engineering grade.
 * This module IS the deterministic decision layer.
 */

window.SmartGradeEngine = (function () {

    // ── Corrosion level numeric mapping for comparisons ──────────────────────
    const CORROSION_SCORE = {
        "Very High (aggressive acid/chloride)": 10,
        "Very High (pitting/SCC resistance)": 9,
        "Very High": 9,
        "Excellent (high-temp/intergranular)": 8,
        "Excellent": 8,
        "Good-High (better than 304 in chloride)": 7,
        "Good (mildly corrosive / natural atmosphere)": 5,
        "Good (mild environments)": 5,
        "Good (non-aggressive environments)": 4,
        "Good / source family": 7,
        "Moderate (mildly corrosive)": 3,
        "Weldable (HAZ effects noted)": null
    };

    const COST_SCORE = { "Lower": 3, "Moderate": 2, "Moderate-Higher": 1.5, "Higher": 1 };
    const STRENGTH_SCORE = { "High": 3, "Medium": 2, "Lower-Medium": 1.5, "Medium-Lower": 1.5 };
    const WELD_LEVEL = { "Excellent": 3, "Good": 2, "Good / source family": 2, "Weldable (HAZ effects noted)": 1, "Moderate": 1 };
    const FORM_LEVEL = { "Excellent": 3, "Good": 2, "Good / source family": 2, "Moderate": 1 };

    function corrosionNum(grade) {
        return CORROSION_SCORE[grade.corrosion_level] || 5;
    }

    // ── STAGE 1: Hard Filter ─────────────────────────────────────────────────
    function hardFilter(grades, req) {
        return grades.map(grade => {
            const flags = [];
            let rejected = false;
            let verificationNeeded = [];

            // R001 Application compatibility
            const appLinks = SG_GRADE_APPLICATIONS.filter(ga => ga.grade_id === grade.grade_id);
            if (req.applicationId) {
                const direct = appLinks.find(ga => ga.application_id === req.applicationId && ga.evidence_type.startsWith("Direct"));
                const context = appLinks.find(ga => ga.application_id === req.applicationId);
                if (!context) {
                    flags.push({ criterion: "Application compatibility", result: "⚠️ Needs Verification", detail: "No application evidence found for this grade in selected application." });
                    verificationNeeded.push("Application compatibility");
                } else if (!direct) {
                    flags.push({ criterion: "Application compatibility", result: "⚠️ Needs Verification", detail: "Only secondary/context evidence available. Confirm with engineering." });
                    verificationNeeded.push("Application compatibility");
                } else {
                    flags.push({ criterion: "Application compatibility", result: "✓ Pass", detail: direct.note, source: direct.source });
                }
            }

            // R002 Environment / corrosion
            if (req.environment) {
                const envUpper = req.environment.toLowerCase();
                const isHighChloride = envUpper.includes("coastal") || envUpper.includes("marine") || envUpper.includes("chloride") || envUpper.includes("offshore");
                const isAggressive = envUpper.includes("acid") || envUpper.includes("aggressive");
                const cScore = corrosionNum(grade);
                if (isHighChloride || isAggressive) {
                    const minRequired = isAggressive ? 9 : 7;
                    if (cScore >= minRequired) {
                        flags.push({ criterion: "Corrosion / Environment", result: "✓ Pass", detail: `${grade.grade_name} corrosion level: ${grade.corrosion_level}`, source: grade.source });
                    } else if (cScore >= minRequired - 2) {
                        flags.push({ criterion: "Corrosion / Environment", result: "⚠️ Conditional", detail: `${grade.grade_name} may not provide adequate corrosion resistance for ${req.environment}. Verify.` });
                        verificationNeeded.push("Corrosion resistance");
                    } else {
                        rejected = true;
                        flags.push({ criterion: "Corrosion / Environment", result: "✗ Fail", detail: `${grade.grade_name} is not suitable for ${req.environment} environments per supplied evidence.` });
                    }
                } else {
                    flags.push({ criterion: "Corrosion / Environment", result: "✓ Pass", detail: `Mild environment — ${grade.grade_name} corrosion level (${grade.corrosion_level}) is sufficient.` });
                }
            }

            // R003 Temperature
            if (req.tempCategory) {
                const tempCat = req.tempCategory;
                const gradeTemp = grade.temperature_notes || "";
                if (tempCat === "high" && !gradeTemp.includes("°C") && grade.family === "Duplex") {
                    if (gradeTemp.toLowerCase().includes("avoid above 300")) {
                        rejected = true;
                        flags.push({ criterion: "Temperature", result: "✗ Fail", detail: `${grade.grade_name}: Avoid prolonged use above 300°C due to intermetallic formation.` });
                    } else {
                        flags.push({ criterion: "Temperature", result: "⚠️ Needs Verification", detail: "High-temperature limit not fully documented for this grade in prototype subset. Verify." });
                        verificationNeeded.push("Temperature capability");
                    }
                } else if (tempCat === "high") {
                    const hasHighTempData = gradeTemp.includes("°C") || gradeTemp.includes("800") || gradeTemp.includes("900");
                    if (hasHighTempData) {
                        flags.push({ criterion: "Temperature", result: "✓ Pass", detail: `${grade.grade_name}: ${gradeTemp}`, source: grade.source });
                    } else {
                        flags.push({ criterion: "Temperature", result: "⚠️ Needs Verification", detail: "High-temperature adequacy not documented in prototype data. Verify before selection." });
                        verificationNeeded.push("Temperature capability");
                    }
                } else {
                    flags.push({ criterion: "Temperature", result: "✓ Pass", detail: "Ambient/moderate temperature — no temperature constraint failure." });
                }
            }

            // R004 Strength
            if (req.strengthLevel) {
                const props = SG_PROPERTIES[grade.grade_id];
                const ys = props ? props.mechanical.YS_min_MPa : null;
                if (req.strengthLevel === "high") {
                    if (!ys) {
                        flags.push({ criterion: "Strength", result: "⚠️ Needs Verification", detail: "Strength data not available in prototype subset. Verify." });
                        verificationNeeded.push("Strength");
                    } else if (ys >= 400) {
                        flags.push({ criterion: "Strength", result: "✓ Pass", detail: `Min YS: ${ys} MPa (High strength met)`, source: grade.source });
                    } else if (ys >= 200) {
                        flags.push({ criterion: "Strength", result: "⚠️ Conditional", detail: `Min YS: ${ys} MPa — adequate for many applications but verify structural design requirements.` });
                        verificationNeeded.push("Strength adequacy");
                    } else {
                        flags.push({ criterion: "Strength", result: "⚠️ Conditional", detail: `Min YS: ${ys} MPa — may be borderline for high-load structural applications. Verify.` });
                        verificationNeeded.push("Strength");
                    }
                } else {
                    if (ys) {
                        flags.push({ criterion: "Strength", result: "✓ Pass", detail: `Min YS: ${ys} MPa — satisfies moderate strength requirements.` });
                    } else {
                        flags.push({ criterion: "Strength", result: "⚠️ Data not available", detail: "Strength data absent from prototype subset." });
                        verificationNeeded.push("Strength");
                    }
                }
            }

            // R005 Weldability
            if (req.weldingRequired) {
                const weldLevel = WELD_LEVEL[grade.weldability_level] || 0;
                if (weldLevel >= 2) {
                    flags.push({ criterion: "Weldability", result: "✓ Pass", detail: `${grade.grade_name} weldability: ${grade.weldability_level}`, source: grade.source });
                } else if (weldLevel === 1) {
                    flags.push({ criterion: "Weldability", result: "⚠️ Conditional", detail: `${grade.grade_name}: ${grade.weldability_level}. Review welding procedure carefully.` });
                    verificationNeeded.push("Welding procedure");
                } else {
                    flags.push({ criterion: "Weldability", result: "⚠️ Needs Verification", detail: "Weldability not documented for this grade in prototype subset." });
                    verificationNeeded.push("Weldability");
                }
            }

            // R006 Product form
            if (req.productForm) {
                const formMatch = grade.product_forms.some(f => f.toLowerCase().includes(req.productForm.toLowerCase()));
                if (formMatch) {
                    flags.push({ criterion: "Product Form", result: "✓ Pass", detail: `${req.productForm} available.` });
                } else {
                    flags.push({ criterion: "Product Form", result: "⚠️ Needs Verification", detail: `${req.productForm} not listed in prototype data for ${grade.grade_name}. Confirm availability with Jindal.` });
                    verificationNeeded.push("Product form availability");
                }
            }

            return { grade, flags, rejected, verificationNeeded };
        }).filter(r => !r.rejected);
    }

    // ── STAGE 2: Weighted Ranking ────────────────────────────────────────────
    function rankGrades(filtered, weights) {
        return filtered.map(({ grade, flags, verificationNeeded }) => {
            const avail = {};
            let totalWeight = 0;
            let score = 0;

            // Engineering/application fit (0–1)
            const appPass = flags.filter(f => f.criterion === "Application compatibility" && f.result.startsWith("✓")).length > 0;
            if (weights.engineering > 0) {
                const fit = appPass ? 1.0 : 0.6;
                avail.engineering = true;
                score += fit * weights.engineering;
                totalWeight += weights.engineering;
            }

            // Corrosion fit (0–1)
            if (weights.corrosion > 0) {
                const cScore = corrosionNum(grade) / 10;
                avail.corrosion = true;
                score += cScore * weights.corrosion;
                totalWeight += weights.corrosion;
            }

            // Fabrication/weldability
            if (weights.fabrication > 0) {
                const wl = WELD_LEVEL[grade.weldability_level] || 1.5;
                const fl = FORM_LEVEL[grade.formability_level] || 1.5;
                const fabFit = ((wl + fl) / 6.0);
                avail.fabrication = true;
                score += fabFit * weights.fabrication;
                totalWeight += weights.fabrication;
            }

            // Cost fit (inverse — lower cost = higher score)
            if (weights.cost > 0) {
                const cb = grade.cost_band;
                const costFit = cb.includes("Lower") ? 1.0 : cb.includes("Moderate-Higher") ? 0.55 : cb.includes("Moderate") ? 0.75 : 0.3;
                avail.cost = true;
                score += costFit * weights.cost;
                totalWeight += weights.cost;
            }

            // Evidence bonus
            const sustainData = SG_SUSTAINABILITY.filter(s => s.grade === grade.grade_name && s.pcf_assessment === "Conducted");
            if (weights.evidence > 0 && sustainData.length > 0) {
                avail.evidence = true;
                score += 0.8 * weights.evidence;
                totalWeight += weights.evidence;
            } else if (weights.evidence > 0) {
                avail.evidence = false;
                // Missing evidence — do not score zero, just skip (renormalize)
            }

            // Renormalize if some criteria had no data
            const availWeightSum = Object.keys(avail).filter(k => avail[k]).reduce((s, k) => s + weights[k], 0);
            const normalizedScore = availWeightSum > 0 ? (score / availWeightSum) : score;
            const fitScore = Math.round(normalizedScore * 100);

            return { grade, flags, verificationNeeded, fitScore, availableData: avail };
        }).sort((a, b) => b.fitScore - a.fitScore);
    }

    // ── Public API ───────────────────────────────────────────────────────────
    function recommend(req) {
        const grades = SG_GRADES;

        // Default weights
        const weightsBestFit = { engineering: 0.3, corrosion: 0.25, fabrication: 0.2, cost: 0.15, evidence: 0.10 };
        const weightsCostOpt = { engineering: 0.25, corrosion: 0.20, fabrication: 0.15, cost: 0.35, evidence: 0.05 };
        const weightsPerfFirst = { engineering: 0.25, corrosion: 0.40, fabrication: 0.20, cost: 0.10, evidence: 0.05 };

        const filtered = hardFilter(grades, req);
        if (filtered.length === 0) return null;

        const costBandOrder = { 'Lower': 1, 'Moderate': 2, 'Moderate-Higher': 3, 'Higher': 4 };
        const bestFit = rankGrades(filtered, weightsBestFit);
        const costOpt = rankGrades(filtered, weightsCostOpt).sort((a, b) => {
            const costRankA = costBandOrder[a.grade.cost_band] || 99;
            const costRankB = costBandOrder[b.grade.cost_band] || 99;
            if (costRankA !== costRankB) {
                return costRankA - costRankB; // Lower cost band first
            }
            return b.fitScore - a.fitScore; // Within same band, higher fit score first
        });
        const perfFirst = rankGrades(filtered, weightsPerfFirst);

        // Custom weights from user trade-off
        const customWeights = req.customWeights || weightsBestFit;
        const custom = rankGrades(filtered, customWeights);

        return {
            bestFit: bestFit,
            costOptimized: costOpt,
            performanceFirst: perfFirst,
            custom: custom,
            filteredCount: filtered.length,
            allFiltered: filtered
        };
    }

    // Natural language requirement extraction
    function extractRequirements(text) {
        const lower = text.toLowerCase();
        const req = {
            applicationId: null,
            environment: null,
            strengthLevel: null,
            weldingRequired: false,
            tempCategory: null,
            productForm: null,
            costPriority: null,
            rawText: text,
            extractedFacts: []
        };

        // Application detection
        if (/coastal|marine|shore|sea|offshore/.test(lower)) {
            req.applicationId = "APP001"; req.environment = "coastal / marine / chloride";
            req.extractedFacts.push({ label: "Application", value: "Coastal / Marine Structure", confidence: "High" });
            req.extractedFacts.push({ label: "Environment", value: "Outdoor · Coastal · Chloride exposure", confidence: "High" });
        } else if (/chemical|acid|process equipment|vessel/.test(lower)) {
            req.applicationId = "APP002"; req.environment = "chemical / acid";
            req.extractedFacts.push({ label: "Application", value: "Process / Chemical Equipment", confidence: "High" });
        } else if (/food|kitchen|catering|canteen/.test(lower)) {
            req.applicationId = "APP003"; req.environment = "food-grade";
            req.extractedFacts.push({ label: "Application", value: "Food Processing & Consumer", confidence: "High" });
        } else if (/exhaust|muffler|automotive|silencer/.test(lower)) {
            req.applicationId = "APP004"; req.environment = "high temperature / exhaust";
            req.extractedFacts.push({ label: "Application", value: "Automotive Exhaust System", confidence: "High" });
        } else if (/railway|train|rail car/.test(lower)) {
            req.applicationId = "APP005"; req.environment = "indoor / outdoor";
            req.extractedFacts.push({ label: "Application", value: "Railway / Transport", confidence: "High" });
        } else if (/furnace|kiln|high.temp|high temperature/.test(lower)) {
            req.applicationId = "APP006"; req.environment = "high temperature / oxidising";
            req.tempCategory = "high";
            req.extractedFacts.push({ label: "Application", value: "High-Temperature / Industrial Furnace", confidence: "High" });
        } else if (/architect|facade|cladding|building/.test(lower)) {
            req.applicationId = "APP007"; req.environment = "outdoor / urban";
            req.extractedFacts.push({ label: "Application", value: "Architecture & Facades", confidence: "High" });
        } else if (/pulp|paper|digest|bleach/.test(lower)) {
            req.applicationId = "APP008"; req.environment = "aggressive acid / chloride";
            req.extractedFacts.push({ label: "Application", value: "Pulp, Paper & Aggressive Acids", confidence: "High" });
        } else {
            req.extractedFacts.push({ label: "Application", value: "Not clearly identified — please clarify", confidence: "Low" });
        }

        // Strength
        if (/high strength|strong|structural|load.bearing/.test(lower)) {
            req.strengthLevel = "high";
            req.extractedFacts.push({ label: "Strength", value: "High strength required", confidence: "High" });
        } else {
            req.extractedFacts.push({ label: "Strength", value: "Standard / not specified", confidence: "Medium" });
        }

        // Weldability
        if (/weld/.test(lower)) {
            req.weldingRequired = true;
            req.extractedFacts.push({ label: "Weldability", value: "Welding required", confidence: "High" });
        }

        // Temperature
        if (/high.temp|furnace|exhaust|kiln|800|900/.test(lower)) {
            req.tempCategory = "high";
            req.extractedFacts.push({ label: "Operating Temperature", value: "High temperature (>400°C)", confidence: "Medium" });
        } else {
            req.extractedFacts.push({ label: "Operating Temperature", value: "Ambient / moderate — not specified", confidence: "Low" });
        }

        // Cost priority
        if (/cost.important|budget|economical|cheaper|lower cost/.test(lower)) {
            req.costPriority = "cost-optimized";
            req.extractedFacts.push({ label: "Cost Priority", value: "Cost-important (but performance matters)", confidence: "High" });
        } else if (/performance|premium|best/.test(lower)) {
            req.costPriority = "performance-first";
            req.extractedFacts.push({ label: "Cost Priority", value: "Performance-first", confidence: "High" });
        }

        // Missing checks
        if (!req.tempCategory) req.extractedFacts.push({ label: "Operating Temperature", value: "Not specified — mark as missing", confidence: "Low", missing: true });
        if (!req.productForm) req.extractedFacts.push({ label: "Product Form", value: "Not specified — confirm before purchase", confidence: "Low", missing: true });

        return req;
    }

    // Chatbot RAG-like response generator
    function chatResponse(question, context) {
        const q = question.toLowerCase();
        const { recommendationResult, requirementProfile, activeView } = context || {};
        const topGrade = recommendationResult && recommendationResult.bestFit[0] ? recommendationResult.bestFit[0].grade : null;

        if (/why.*(choose|pick|select|recommend).*over|versus/.test(q) || /why not.*vs/.test(q)) {
            const match = q.match(/why.*?([\w]+)\s+over\s+([\w]+)/i) || q.match(/why not\s+([\w]+)/i);
            const altName = match ? match[2] || match[1] : null;
            const topName = topGrade ? topGrade.grade_name : "the top grade";
            const altGrade = altName ? SG_GRADES.find(g => g.grade_name.toLowerCase() === altName.toLowerCase()) : null;
            let response = `Based on your requirement profile:\n\n`;
            if (topGrade) {
                const topFlags = recommendationResult.bestFit[0].flags.filter(f => f.result.startsWith("✓"));
                response += `**${topName}** was recommended because:\n`;
                topFlags.forEach(f => response += `• ${f.criterion}: ${f.detail}\n`);
                if (altGrade) {
                    const cScore = corrosionNum(topGrade) - corrosionNum(altGrade);
                    if (cScore > 0) response += `\n**${topName} vs ${altGrade.grade_name}:** ${topName} has higher corrosion resistance (${topGrade.corrosion_level} vs ${altGrade.corrosion_level}).`;
                    if (topGrade.cost_band !== altGrade.cost_band) response += `\nCost band: ${topName} (${topGrade.cost_band}) vs ${altGrade.grade_name} (${altGrade.cost_band}).`;
                }
                response += `\n\n*Source: ${topGrade.source}*`;
            } else {
                response = "No active recommendation to compare. Please run 'Recommend Me!' first.";
            }
            return { text: response, sources: topGrade ? [topGrade.source] : [] };
        }

        if (/pcf|sustainability|carbon|environmental/.test(q)) {
            const gradeName = topGrade ? topGrade.grade_name : null;
            const sustainEntry = gradeName ? SG_SUSTAINABILITY.find(s => s.grade === gradeName) : null;
            let response = "**Sustainability Evidence**\n\n";
            if (sustainEntry && sustainEntry.pcf_assessment === "Conducted") {
                response += `For **${gradeName}** (${sustainEntry.site} site):\n• Assessment: ${sustainEntry.pcf_assessment}\n• Boundary: ${sustainEntry.boundary}\n• Methodology: ${sustainEntry.methodology}\n• Period: ${sustainEntry.assessment_period}\n\n`;
                response += "⚠️ This is an evidence key — the assessment was conducted. No numeric PCF values are displayed in this prototype per evaluation guidelines.";
            } else if (sustainEntry) {
                response += sustainEntry.pcf_assessment;
            } else {
                response += "Select a grade from recommendation results to see sustainability evidence.";
            }
            response += `\n\n*Source: ${sustainEntry ? sustainEntry.source : "SmartGrade prototype dataset"}*`;
            return { text: response, sources: ["Jindal Stainless Sustainability Report FY2023–24"] };
        }

        if (/cost|price|expensive|cheap|band/.test(q)) {
            const gradeName = topGrade ? topGrade.grade_name : null;
            const cb = gradeName ? SG_COST_BANDS.find(c => c["grade/family"] === gradeName) : null;
            let response = "**Cost Band Information**\n\n";
            if (cb) response += `**${gradeName}**: ${cb.band}\n\n`;
            response += "Cost bands are prototype relative reference bands (Lower / Moderate / Moderate-Higher / Higher). They are NOT Jindal Stainless pricing quotations.\n\nFor actual pricing, contact Jindal Sales & Services.";
            return { text: response, sources: ["SmartGrade prototype dataset — indicative relative bands only"] };
        }

        if (/grade|property|stainless|family/.test(q)) {
            const gradeMatch = SG_GRADES.find(g => q.includes(g.grade_name.toLowerCase()));
            if (gradeMatch) {
                const props = SG_PROPERTIES[gradeMatch.grade_id];
                let response = `**${gradeMatch.grade_name}** (${gradeMatch.family})\n\n${gradeMatch.summary}\n\n`;
                if (props) {
                    response += `• Min YS: ${props.mechanical.YS_min_MPa || "Data not available"} MPa\n`;
                    response += `• Min UTS: ${props.mechanical.UTS_min_MPa || "Data not available"} MPa\n`;
                    response += `• Min Elongation: ${props.mechanical.EL_min_pct || "Data not available"}%\n`;
                }
                response += `\nCorrosion: ${gradeMatch.corrosion_level}\nWeldability: ${gradeMatch.weldability_level}\nCost Band: ${gradeMatch.cost_band}\n\n*Source: ${gradeMatch.source}*`;
                return { text: response, sources: [gradeMatch.source] };
            }
        }

        if (/contact|location|office|service centre|where/.test(q)) {
            return { text: "Jindal Stainless has offices and service centres across India. Use the **Sales & Services** section to find the nearest location with address and contact details.", sources: ["Jindal_Stainless_India_Locations_Datasheet.docx"] };
        }

        if (/before you buy|procurement|mro|mtc|certificate/.test(q)) {
            return { text: "Use the **Before You Buy** checklist to verify:\n1. Grade and specification confirmed\n2. Certification documents identified\n3. Material Test Certificate (MTC) requested\n4. Dimensions confirmed\n5. Surface finish confirmed\n6. Order quantity confirmed\n\nThis checklist does not constitute a purchase confirmation.", sources: [] };
        }

        return {
            text: "I can help with:\n• Grade properties and selection reasoning\n• Sustainability evidence for shortlisted grades\n• Cost band information\n• Procurement readiness guidance\n• Office / service centre locations\n\nTry asking: *\"Why did you choose 316L over 304?\"* or *\"What is the cost band for 2205?\"*",
            sources: []
        };
    }

    return { recommend, extractRequirements, chatResponse };
})();
