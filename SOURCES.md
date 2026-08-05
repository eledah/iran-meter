# Iran-meter — Sources

Registry of statistics sources for quiz questions. Every number in the quiz
must trace back to an entry here.

Format: org / type / urls / accessed / what's inside (key numbers we can use).

**Source policy (2026-08-05):** prefer official Iranian institutions (SCI,
ISPA, NOCR, CBI) + established international bodies (World Bank, WVS, ITU).
Rejected sources are listed at the bottom so they don't get re-added.

---

## 1. Statistical Centre of Iran (مرکز آمار ایران) — SCI

- **Type:** official national statistics agency (internal source)
- **URLs:**
  - Portal: https://www.amar.org.ir/
  - English "Selected Results" slides (2016 census): https://irandataportal.syr.edu/wp-content/uploads/Iran_Census_2016_Selected_Results.pdf
- **Accessed:** 2026-08-05
- **What's inside:**

  **Census 2016:** population 79,926,270; households 24,196,035; avg household
  size 3.3; urbanization 74%; literacy 87.6% (6+) / 94.7% (10–49); median age
  30; home ownership 60.5% national / 54.5% urban / 79.2% rural; renting 30.7%
  national / 36.7% urban; age groups 0–14: 24.0%, 65+: 6.1%; nationality 97.8%
  Iranian. Full table in `INDEXES.md`.

  **Recent releases (post-census):**
  - *Labor Force Survey* (quarterly): unemployment 9.1% spring 1405 (youth
    23.4%), 7.6% winter 1404, annual 7.5% for 1404; participation 40.7% (men
    67.8 / women 13.7); unemployment men 7.5 / women 16.7 (spring 1405).
    Published 29 Jul 2026 (spring 1405) — figures flagged by SCI as wartime.
  - *Household Income & Expenditure Survey* 1403 (published 18 Aug 2025):
    urban net expenditure 269.3M toman/yr, urban income 343.2M, rural 144.7M /
    201.4M; housing+fuel = 43.7% of urban expenditure (23.5% rural).
  - *Gini* 1403 (published 10 Feb 2026): 0.3870 national (urban 0.3689, rural
    0.3532); Palma 1.84; top 20% hold 46.24%, bottom 20% hold 6.07%.
  - *Housing tenure* 1401 (social-justice indicators): urban owners 68.07% vs
    renters 23.7%; rural 88.63% / 4.96%. **Methodology differs from census
    2016 — don't mix the two series in one question.**
  - *Population estimate* (1 Aban 1403): 85.96M; urbanization 77%; households
    27.65M.
- **Caveat:** census data is 2016; use the newer surveys for current numbers.

## 2. ISPA (ایسپا) — مرکز افکارسنجی دانشجویان ایران

- **Type:** national public-opinion polling agency, non-governmental,
  affiliated with ACECR / جهاد دانشگاهی; WAPOR member. Active since 1380.
  (internal source)
- **URLs:** https://ispa.ir/ · Telegram @ispa_polling
- **Accessed:** 2026-08-05
- **What's inside (survey reports found):**
  - **«زیستبوم دیجیتال ایرانیان»** (Digital Ecosystem of Iranians), n=4,060
    internet users, face-to-face, fielded 15–21 Jun 2026 (right after the
    wartime internet outage), published 22 Jul 2026. Key numbers: VPN use
    74.4% of internet users (85% under-30); internet penetration 89.3% (15+);
    57.6% oppose cutting the internet in crises; 61.1% oppose officials'
    "class" internet; unfiltering priority Instagram 47.8% / Telegram 20.9% /
    YouTube 8.4%; avg daily internet use 4h 3min.
  - **«مصرف شبکهها و رسانههای اجتماعی مردم ایران»** — two waves:
    Sep 2024 (n=3,990, face-to-face): ≥1 messenger 82.2%; Instagram 50.6%,
    Telegram 39.3%, WhatsApp 33.3%, Eitaa 28.9%, Rubika 28.5%, Bale 9.7%.
    Sep 2025 (n=1,502, telephone): avg daily social-media 2h 8min; 13.7% no use.
  - **Media trust** (Aban 1402, n=5,086): IRIB main news source 37.9%,
    social networks 31%, satellite 8.9%.
  - **Investment preferences** (Aug 2026): land/housing 36.8% top, gold/coins
    ~10%, crypto 3.1%.
- **Caveat:** client-commissioned polls; results published as report PDFs +
  news items — mine reports for exact methodology. Digital-ecosystem figures
  reflect post-outage conditions.

## 3. World Bank — Iran, Islamic Rep. (external source)

- **URL:** https://data.worldbank.org/country/iran-islamic-rep
- **Accessed:** 2026-08-05
- **What's inside:** internet users 85% (2024); life expectancy 78 (2024);
  population 92.4M (2025); GDP/capita $3,924; inflation 42.2%; unemployment
  (ILO modeled) 8.3%; poverty $3.00/day 2.5% (2023); electricity access 100%;
  women in parliament 5%; female labor-force participation 14% vs male 67.2%;
  homicides 2/100k (2014). Full table in `INDEXES.md`.
- **Caveat:** some indicators are modeled estimates; sanctions limit reporting.

## 4. World Values Survey — Wave 7, Iran 2020 (external, academic)

- **URL:** https://www.worldvaluessurvey.org/ (WV7; country list includes
  "Iran 2020")
- **Accessed:** 2026-08-05
- **What's inside:** representative national values survey (face-to-face) —
  religiosity, trust, family/work priorities, gender attitudes, political
  values. Iran 2020 wave data downloadable (SPSS/Stata/CSV). Values to be
  extracted from the dataset or citable findings.
- **Caveat:** face-to-face mode → possible preference falsification on
  sensitive topics in Iran; frame questions carefully.

## 5. National Organization for Civil Registration (سازمان ثبت احوال کشور)

- **Type:** official internal vital-statistics registry
- **URL:** https://www.sabteahval.ir/ (data also via SCI yearbook and news
  releases quoting the org)
- **Accessed:** 2026-08-05
- **What's inside (latest verified):**
  - Marriages: 470,372 (1403) → ~431,800 (1404, −8.2%).
  - Divorces: 194,078 (1403) → ~181,500 (1404).
  - Divorce per 100 marriages ≈ 41 (1403) / ~42 (1404) — **ثبت احوال itself
    warns this same-year ratio is statistically misleading; use carefully.**
  - Avg age at first marriage (1403): men **28.3**, women **24.1** years.
  - Births: 979,923 (1403, CBR ≈ 11.4‰) → ~892,300 (1404, ≈ 10.2‰).
  - Deaths: 458,848 (1403, ≈ 5.3‰) → ~451,700 (1404).
- **Caveat:** small discrepancies (±50–900) between ثبت احوال and health-
  ministry counts due to late registration; mostly via-news sourcing.

## 6. Central Bank of Iran (بانک مرکزی)

- **Type:** official internal monetary authority
- **URL:** https://cbi.ir/
- **Accessed:** 2026-08-05 (cbi.ir itself unreachable from research env; all
  figures via outlets/aggregators quoting CBI releases)
- **What's inside (latest, wartime period):**
  - Point-to-point inflation **83.9%** (Tir 1405 = Jul 2026); annual avg
    61.4%; monthly 3.6%; CPI index 742.8 (1400=100). Note SCI's parallel
    index says 66% annual / 87.9% p2p — the two agencies differ.
  - USD official rate 1,472,440 IRR (30 Jul 2026); national exchange office
    1,325,072; free market ~1.92M IRR.
  - Liquidity 15,581 trillion toman (+53.3% y/y, end Esfand 1404); base
    money +61.5%; interbank rate 23.86% (Jul 2026); policy corridor
    17/23/24%.
- **Caveat:** CBI withheld monetary data ~5 months (wartime), resumed Jun
  2026; treat 1405 numbers as volatile.

## 7. ITU — International Telecommunication Union (external)

- **Type:** UN specialized agency, official ICT statistics
- **URL:** https://datahub.itu.int/data/?e=IRN (WTID 2025 release)
- **Accessed:** 2026-08-05 (primary, verified directly on DataHub)
- **What's inside (2024 unless noted):** internet users 85.3%; mobile
  subscriptions 174/100; active mobile-broadband 127/100; fixed broadband
  12.06/100 (11.04M subs); 4G coverage 94.2%, 5G 8.2%, 2G 99%; smartphone
  ownership 72.4% (2021); home internet rural 69.2% / urban 82.5% (2021);
  internet by gender female 77.7% / male 79.5% (2021); broadband basket
  0.20%/0.19% of GNI per capita (2025).

## 8. World Values Survey — Wave 7, Iran 2020 (external, academic)

- **URL:** https://www.worldvaluessurvey.org/ (WV7; "Iran 2020")
- **Accessed:** 2026-08-05 (batch 3 retry succeeded)
- **Survey:** N=1,499, adults 18+, fielded 24 Mar–17 Apr 2020 (PAPI/phone
  during COVID), Persian.
- **What's inside (citable values):** life satisfaction mean 6.20/10; religion
  "very important" 70.6%; self-identified religious 84.2%; trust armed forces
  ~70%, government ~19%, parliament ~20%; interpersonal trust 15%; family
  trust 85%, neighbors 18%; national pride 83.5%; "men better political
  leaders" 44.3%; "university more important for a boy" 52.3%.
- **Not yet extracted (dataset downloadable):** media trust %, family/work
  importance %, prayer frequency.
- **Caveat:** face-to-face/phone mode → possible preference falsification on
  sensitive topics; values sourced via academic papers (Saleh 2024, Marburg
  DP 2026, TWU thesis) + official WVS Online tool.

## 9. ILO — International Labour Organization (external)

- **URL:** https://ilostat.ilo.org/data/country-profiles/irn/
- **Accessed:** 2026-08-05 (primary)
- **What's inside:** survey-based (LFS 2024): unemployment 7.6%, LFPR 40.7%,
  youth NEET 24.3%, women in management 20.4%, avg weekly hours 46.8,
  minimum wage IRR 53.07M/month (≈5.3M toman). Modeled (ILOEST 2025):
  unemployment 8.3% (M 6.8 / F 15.6), youth 21.9%, LFPR 41% (M 67 / F 14).
  Informal employment: **no data for Iran**.

## 10. WHO — World Health Organization (external)

- **URL:** https://data.who.int/countries/364 (+ GHO OData API)
- **Accessed:** 2026-08-05 (primary, GHO API verified)
- **What's inside:** tobacco use 12.5% (2022; M 23.5 / F 1.6); obesity 24.0%
  (2022; F 29.9 / M 18.1); health expenditure 6.03% of GDP (2023); physicians
  15.05/10k (2018); life expectancy 74.7 (2021); HALE 64.0; maternal
  mortality 15.84/100k; under-5 mortality 12.18/1,000; road traffic 20.6/100k;
  hypertension 26.2%; alcohol 0.07 L/capita; skilled birth 99%; DTP3 99%.

## 11. UNESCO Institute for Statistics (external)

- **URL:** https://api.uis.unesco.org/ (UIS API; Feb 2026 data release)
- **Accessed:** 2026-08-05 (primary, UIS API verified)
- **What's inside (2023 unless noted):** adult literacy 88.9% (F 85.1 / M
  92.8); youth literacy 98.7%; tertiary gross enrollment 58.7% (2022);
  education spending 2.8% of GDP; expected schooling 14.1 years (2022); mean
  years of schooling 10.3 (2016); primary GER 102%, secondary 85.1%.

## 12. IMF — WEO (external)

- **URL:** https://www.imf.org/en/Countries/IRN (+ datamapper)
- **Accessed:** 2026-08-05 (primary; WEO Apr 2026 + Jul 2026 update; last
  Article IV: 2018)
- **What's inside:** GDP growth +3.7% (2024) → −1.5% (2025) → −6.1% forecast
  (2026, Jul update −5.4%) → +3.2% (2027); CPI inflation 32.5% → 50.9% →
  **68.9% forecast 2026** (IMF: highest since WWII) → 39.6%; unemployment
  7.6% → 8.0% → 9.2%; GDP/capita PPP ~$21k; current account +$13.2bn (2024)
  → −$5.4bn (2026).

## 13. Internet censorship & VPN — official + measurement orgs + academic

- **Type:** mixed (internal official survey + OONI + Freedom House + papers)
- **URLs:** ooni.org/post/iran-internet-censorship/ · freedomhouse.org/country/
  iran/freedom-net/2024 · jcss.ut.ac.ir/article_90348.html · iranintl.com/
  en/202502243980
- **Accessed:** 2026-08-05
- **What's inside:**
  - **Iranian Parliament Research Center (IPRC) telephone survey, Dec 2024
    (n=1,100): 81% of internet users bypass censorship with VPNs** (49.4% free
    / 30.3% paid) — official internal source, reported via Iran International.
  - OONI measurements: 886 domains blocked (2014–17); Sep 2022 WhatsApp/
    Instagram blocks; Nov 2019 blackout BGP −33%.
  - Freedom House FOTN: 12/100 (2024), 13/100 (2025) — "Not Free".
  - Academic (J. Cyberspace Studies 2022): 10–12M VPN users (2018 official
    est.), Telegram active users ~40% (2021), only 31.1% of top mobile apps
    accessible.
- **Caveat:** GAMAAN-linked figures explicitly excluded (see Rejected).

---

## Optional follow-ups (not urgent)

| Area | What's missing |
|---|---|
| Provincial splits (SCI province-level data) | more granular, for "regional" questions |
| ISPA granular report PDFs | exact sample/weighting details per survey |
| WVS dataset mining | media trust %, family/work importance %, prayer frequency |
| 1405 census/projection cycle | SCI next population update |

## Rejected (do not use)

- **GAMAAN** (Group for Analyzing and Measuring Attitudes in Iran) — rejected
  by user on **2026-08-05**: funding transparency concerns. Its previously
  noted numbers (e.g. ~90% of internet users use circumvention tools) are
  **dropped** and not re-usable. A 2025 Tilburg paper by GAMAAN's founder
  repeating "85% VPN" figures is likewise excluded.

## Gaps — status

- VPN / circumvention usage % → **filled** (ISPA 74.4% Jun 2026 + IPRC 81%
  Dec 2024 + academic 10–12M users).
- Social-media platform shares → filled for 1403/1404 (ISPA); 1405 optional.
- Marriage/divorce, age at first marriage → filled (ثبت احوال).
- Fresh 1405 census/projection → pending SCI release.
- Values/religion → filled (WVS 2020 via academic papers).
