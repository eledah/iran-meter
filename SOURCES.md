# Iran-meter — Sources

Registry of statistics sources for quiz questions. Every number in the quiz
must trace back to an entry here.

Format: org / type / urls / accessed / what's inside (key numbers we can use).

**Source policy (2026-08-05):** prefer official Iranian institutions (SCI,
ISPA) + established international bodies (World Bank, WVS). Rejected sources
are listed at the bottom so they don't get re-added.

---

## 1. Statistical Centre of Iran (مرکز آمار ایران) — SCI

- **Type:** official national statistics agency (internal source)
- **URLs:**
  - Portal: https://www.amar.org.ir/
  - English "Selected Results" slides (2016 census): https://irandataportal.syr.edu/wp-content/uploads/Iran_Census_2016_Selected_Results.pdf
- **Accessed:** 2026-08-05
- **What's inside (key numbers):**

  | Stat | 2016 | 2011 | 2006 |
  |---|---|---|---|
  | Population | 79,926,270 | 75,149,669 | 70,495,782 |
  | Households | 24,196,035 | 21,185,647 | 17,501,771 |
  | Avg household size | 3.3 | 3.5 | 4.0 |
  | Urbanization | 74% | 71.4% | ~68.5% |
  | Literacy (age 6+) | 87.6% | 84.8% | 84.6% |
  | Literacy (age 10–49) | 94.7% | 92.4% | 91.7% |
  | Median age | 30 | 27 | 25 |
  | 1-person households | 8.5% | 7.1% | 5.2% |

  **Home tenure (share of households, "owned land and building"):**

  | Scope | 2016 | 2011 | 2006 |
  |---|---|---|---|
  | National — owner | 60.5% | 62.7% | 67.9% |
  | National — renter | 30.7% | 26.6% | 22.9% |
  | Urban — owner | 54.5% | 56.6% | 62.2% |
  | Urban — renter | 36.7% | 33.2% | 29.0% |
  | Rural — owner | 79.2% | 79.3% | 82.0% |
  | Rural — renter | 12.3% | 8.9% | 7.9% |

  Also: age pyramid (0–14: 24.0%, 65+: 6.1% in 2016), nationality (97.8%
  Iranian, ~2% Afghan), province-level population & literacy.

- **Also publishes (more current than the census):** quarterly **Labor Force
  Survey** (نیروی کار) and annual **Household Income & Expenditure Survey**
  (هزینه و درآمد خانوار) — refresh targets for employment/income questions.
- **Caveat:** census is 2016; prefer the newer surveys above where possible.

---

## 2. ISPA (ایسپا) — مرکز افکارسنجی دانشجویان ایران

- **Type:** national public-opinion polling agency, non-governmental,
  affiliated with ACECR / جهاد دانشگاهی; member of WAPOR (World Association
  for Public Opinion Research). Active since 1380 (2001). (internal source)
- **URLs:**
  - Site: https://ispa.ir/
  - Telegram: @ispa_polling
- **Accessed:** 2026-08-05
- **What's inside:**
  - National telephone surveys (مصاحبه تلفنی) on social attitudes, values,
    economy, digital life — results published as report PDFs + news items.
  - **«زیستبوم دیجیتال ایرانیان»** — national survey on Iranians' digital
    behavior & attitudes in cyberspace (results presented July 2026). This is
    our candidate source for **VPN / social-media / internet-habit stats**.
  - Recently signed a cooperation MOU with SCI (Aug 2026) for data-driven
    research — strengthens reliability.
- **Caveat:** surveys are client-commissioned (incl. government bodies) and
  published as reports — mine the actual report PDFs for exact figures,
  sample sizes, and field dates.

---

## 3. World Bank — Iran, Islamic Rep. (external source)

- **URL:** https://data.worldbank.org/country/iran-islamic-rep
- **Accessed:** 2026-08-05
- **What's inside (most recent values, as shown on country page):**

  | Indicator | Value | Year |
  |---|---|---|
  | Individuals using the Internet | 85% | 2024 |
  | Life expectancy at birth | 78 y | 2024 |
  | Population | 92,417,681 | 2025 |
  | Population growth | 0.9% | 2025 |
  | GDP per capita | $3,924 | 2025 |
  | GDP growth | −2.8% | 2025 |
  | Inflation (CPI) | 42.2% | 2025 |
  | Unemployment (ILO modeled) | 8.3% | 2025 |
  | Poverty ($3.00/day, 2021 PPP) | 2.5% | 2023 |
  | Access to electricity | 100% | 2024 |
  | Women in national parliament | 5% | 2025 |
  | Female labor-force participation | 14% (male 67.2%) | 2025 |
  | Intentional homicides | 2 /100k | 2014 |
  | Forest area | 6.6% | 2023 |

- **Caveat:** some indicators are modeled estimates (ILO/UN inputs); sanctions
  limit reporting, so treat cross-country comparisons loosely.

---

## 4. World Values Survey — Wave 7, Iran 2020 (external, academic)

- **URL:** https://www.worldvaluessurvey.org/ (WV7 documentation & data
  download; country list includes "Iran 2020")
- **Accessed:** 2026-08-05
- **What's inside:** representative national values survey (face-to-face) —
  religiosity, trust, family/work priorities, gender attitudes, political
  values. Iran 2020 wave data downloadable (SPSS/Stata/CSV).
- **Caveat:** face-to-face mode can suffer "preference falsification" on
  sensitive topics in Iran (documented in the literature). Use for
  non-sensitive values or frame questions carefully.

---

## Other verified & reliable candidates (not yet mined)

| Source | What it covers | Why reliable |
|---|---|---|
| Central Bank of Iran (https://cbi.ir) | inflation, FX rates, money supply, GDP | official internal |
| National Organization for Civil Registration (https://www.sabteahval.ir) | births, deaths, **marriages, divorces, avg age at first marriage** | official internal vital stats |
| SCI quarterly Labor Force Survey / annual Household Income–Expenditure | employment, income, housing (post-2016) | official internal |
| ITU (https://datahub.itu.int) | internet/ICT penetration | UN specialized agency |
| ILO / UNESCO / WHO / IMF | labor, education, health, macro | established international orgs |
| Peer-reviewed academic studies (e.g., on VPN/censorship) | niche topics with no official stat | last resort, cite the paper |

---

## Rejected (do not use)

- **GAMAAN** (Group for Analyzing and Measuring Attitudes in Iran) — rejected
  by user on **2026-08-05**: funding transparency concerns. Previously noted
  VPN/attitude numbers (e.g. ~90% of internet users use circumvention tools)
  are **dropped** — they are not re-usable.

## Gaps to fill (replacement needed)

- **VPN / circumvention usage %** — candidate: ISPA «زیستبوم دیجیتال ایرانیان»
  survey report; fallback: academic studies.
- **Social-media platform usage (Instagram/Telegram %)** — same candidates.
- **Marriage/divorce & age at first marriage** — NOCR (sabteahval.ir).
- **Fresh home-ownership & housing (post-2016)** — SCI household surveys.
