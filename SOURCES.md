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

---

## Other verified & reliable candidates (not yet mined)

| Source | What it covers | Why reliable |
|---|---|---|
| Central Bank of Iran (https://cbi.ir) | inflation (CPI), FX rates, money supply, GDP | official internal |
| ITU (https://datahub.itu.int) | internet/ICT penetration | UN specialized agency |
| ILO / UNESCO / WHO / IMF | labor, education, health, macro | established international orgs |
| Peer-reviewed academic studies (e.g., on VPN/censorship) | niche topics with no official stat | last resort, cite the paper |

## Rejected (do not use)

- **GAMAAN** (Group for Analyzing and Measuring Attitudes in Iran) — rejected
  by user on **2026-08-05**: funding transparency concerns. Its previously
  noted numbers (e.g. ~90% of internet users use circumvention tools) are
  **dropped** and not re-usable.

## Gaps to fill

- ~~VPN / circumvention usage %~~ → **filled** by ISPA digital-ecosystem
  survey (74.4% of internet users, Jun 2026).
- Social-media platform shares for 1405 (have 1403 + 1404 waves).
- Fresh 1405 census/projection cycle (SCI).
- Values/religion data from WVS Iran 2020 (batch 2).
