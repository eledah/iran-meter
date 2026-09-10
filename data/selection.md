# Quiz selection — top 20 stats (graded from 439-stat bank)

Method: script-assisted triage. Loaded `data/stats.yaml` in Python, grouped by theme
(religiosity, internet/VPN, economy, trust/politics, emigration, labor, health,
education, demography), scored a shortlist of ~50 strongest candidates on
IMPORTANCE 1–5 (civic weight: millions affected, policy/economic gravity) ×
WORLDVIEW-SHIFT 1–5 (surprise vs a typical Iranian's priors). Score = I × W (max 25).
Ranked, capped at ~3 per theme, tie-breaks favoring primary/leak-verified confidence
and recency. Result: the 20 below, rebuilt into `data/questions.yaml`
(11 questions reused verbatim, 9 written new).

| Rank | Stat ID | Value | I × W = Score | Why it made the cut |
| --- | --- | --- | --- | --- |
| 1 | vpn-filter-breaker-use-2026 | 74.4% | 5 × 5 = 25 | Three-quarters circumvent filtering — world-scale civil disobedience |
| 2 | difficulty-securing-basic-food-2026 | 81% | 5 × 5 = 25 | Four in five struggle for basic food; vital-scale hardship |
| 3 | female-labor-force-participation-2025 | 14% | 5 × 5 = 25 | Among world's lowest; half the population sidelined |
| 4 | point-to-point-inflation-1405 | 83.9% | 5 × 5 = 25 | Macro shock scale; dwarfs the 61.4% annual average |
| 5 | pray-always-mostly-1402 | 54.8% | 5 × 5 = 25 | Prayer collapse 78.5 → 54.8 inverts the pious-society prior |
| 6 | separation-of-religion-politics-agree-1402 | 72.9% | 5 × 5 = 25 | 30.7 → 72.9 flip on separating religion and politics |
| 7 | never-pray-1402 | 22.2% | 4 × 5 = 20 | Sevenfold rise (3.1 → 22.2); the surveys' most shocking finding |
| 8 | inflation-most-important-national-problem-1402 | 81.9% | 5 × 4 = 20 | Overwhelming consensus on the country's top problem |
| 9 | would-emigrate-permanently-if-possible-1402 | 38.6% | 5 × 4 = 20 | Nearly two in five would leave for good; demographic hemorrhage |
| 10 | high-anger-rage-in-daily-life-2026 | 63.6% | 4 × 5 = 20 | World-record everyday anger; emotional state of the nation |
| 11 | youth-unemployment-1524-1405 | 23.4% | 5 × 4 = 20 | 2.5× the overall rate; the youth-expectations gap |
| 12 | low-trust-in-irib-1394-81-trusted-1402 | 58% | 4 × 5 = 20 | From 54.8% trust to 58% distrust — full reversal for state TV |
| 13 | dissatisfied-with-country-s-situation-1402 | 91.8% | 5 × 4 = 20 | Near-unanimous verdict; only 8.2% call things acceptable |
| 14 | predicted-turnout-tehran-city-2024 | 15% | 4 × 5 = 20 | Record-low capital participation; legitimacy signal |
| 15 | can-t-afford-medical-costs-2026 | 75% | 5 × 4 = 20 | Three in four priced out of care; health-economy gut punch |
| 16 | divorce-per-100-marriages-1403 | 41 | 4 × 4 = 16 | Family-structure shock vs the traditional-marriage prior |
| 17 | tertiary-gross-enrollment-2022 | 58.7% | 4 × 4 = 16 | Over half the cohort in higher ed; human-capital paradox |
| 18 | internet-must-never-be-cut-2026 | 67% | 4 × 4 = 16 | Two-thirds absolutist rebuke of shutdown policy |
| 19 | vpn-use-among-under-30s-2026 | 85% | 4 × 4 = 16 | Generational saturation above the 74% national figure |
| 20 | labor-force-participation-15-1405 | 40.7% | 4 × 4 = 16 | Only two in five participate; women near 14% drag the total |

Notable cuts (theme cap / overlap): annual-avg inflation 61.4% (overshadowed by 83.9%
point-to-point); urban home-ownership 54.5%; Canada destination 22%; life expectancy 78;
adult literacy 88.9%; median age 30.
