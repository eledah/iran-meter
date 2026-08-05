# Iran-meter — Indexes

Flat registry of every concrete statistic ("index") gathered for the quiz.
This is the working table that feeds `data/stats.yaml` later.

**Columns:** Index | Value | Unit | Ref. period | Report date | Source | URL

Provenance rules:
- Every number must trace to a source in `SOURCES.md`.
- `Ref. period` = the time the number describes (e.g. 2016 census, spring
  1403). `Report date` = when it was published.
- Confidence tags: `primary` (seen on the org's own page) / `news` (via a
  news article quoting the org) / `estimate` (computed or modeled).
- Rows are added in batches as research subagents return findings.

**Timeline note:** several 1405/2026 figures were collected during/after the
wartime period (incl. a prolonged internet outage; CBI withheld monetary
statistics ~5 months, resumed Jun 2026) — flagged per row where it matters.
Iranian calendar: 1403 = 2024–25, 1404 = 2025–26, 1405 = 2026–27.

---

## Statistical Centre of Iran — Census 2016 (primary)

| Index | Value | Unit | Ref. period | Report date | Source | URL |
|---|---|---|---|---|---|---|
| Population | 79,926,270 | persons | 2016 | 2016 | SCI census | irandataportal.syr.edu/wp-content/uploads/Iran_Census_2016_Selected_Results.pdf |
| Households | 24,196,035 | households | 2016 | 2016 | SCI census | same |
| Avg household size | 3.3 | persons | 2016 | 2016 | SCI census | same |
| Urbanization rate | 74 | % of population | 2016 | 2016 | SCI census | same |
| Literacy (age 6+) | 87.6 | % | 2016 | 2016 | SCI census | same |
| Literacy (age 10–49) | 94.7 | % | 2016 | 2016 | SCI census | same |
| Median age | 30 | years | 2016 | 2016 | SCI census | same |
| 1-person households | 8.5 | % of households | 2016 | 2016 | SCI census | same |
| Home ownership — national | 60.5 | % of households | 2016 | 2016 | SCI census | same |
| Home ownership — urban | 54.5 | % of households | 2016 | 2016 | SCI census | same |
| Home ownership — rural | 79.2 | % of households | 2016 | 2016 | SCI census | same |
| Renting — national | 30.7 | % of households | 2016 | 2016 | SCI census | same |
| Renting — urban | 36.7 | % of households | 2016 | 2016 | SCI census | same |
| Age group 0–14 | 24.0 | % of population | 2016 | 2016 | SCI census | same |
| Age group 65+ | 6.1 | % of population | 2016 | 2016 | SCI census | same |
| Iranian nationality share | 97.8 | % | 2016 | 2016 | SCI census | same |

## SCI — Recent releases (post-census, via news quoting SCI)

**Labor Force Survey — Spring 1405 (wartime period; SCI-flagged):**

| Index | Value | Unit | Ref. period | Report date | Source |
|---|---|---|---|---|---|
| Unemployment (15+) | 9.1 | % of labor force | Spring 1405 (2026) | 29 Jul 2026 | mehrnews.com/news/6902450 |
| Youth unemployment (15–24) | 23.4 | % | Spring 1405 | 29 Jul 2026 | same |
| Labor-force participation (15+) | 40.7 | % | Spring 1405 | 29 Jul 2026 | same |
| Participation — men / women | 67.8 / 13.7 | % | Spring 1405 | 29 Jul 2026 | ISNA/IranIntl via SCI |
| Unemployment — men / women | 7.5 / 16.7 | % | Spring 1405 | 29 Jul 2026 | same |
| Employed (15+) | 24.672 | million | Spring 1405 | 29 Jul 2026 | mehrnews 6902450 |
| Sector shares (services/industry/agriculture) | 53.8 / 31.0 / 15.1 | % | Spring 1405 | 29 Jul 2026 | same |

**Labor Force Survey — Winter 1404 & annual:**

| Index | Value | Unit | Ref. period | Report date | Source |
|---|---|---|---|---|---|
| Unemployment (15+) | 7.6 | % | Winter 1404 | 26 Apr 2026 | mehrnews.com/news/6811746 (headline errs 7.4; body 7.6) |
| Youth unemployment (15–24) | 21.2 | % | Winter 1404 | 26 Apr 2026 | same |
| Labor-force participation | 39.7 | % | Winter 1404 | 26 Apr 2026 | same |
| Unemployment (annual avg) | 7.5 | % | Year 1404 | ~Jun 2026 | mehrnews 6874029 |

**Household Income & Expenditure Survey — year 1403 (n = 19,347 urban + 18,158 rural):**

| Index | Value | Unit | Ref. period | Report date | Source |
|---|---|---|---|---|---|
| Urban household annual net expenditure | 269.3 | M toman/yr | 1403 | 18 Aug 2025 | borna.news/fa/news/2248780 |
| Urban household declared annual income | 343.2 | M toman/yr | 1403 | 18 Aug 2025 | same (+IRNA 85915124) |
| Rural household annual net expenditure | 144.7 | M toman/yr | 1403 | 18 Aug 2025 | same |
| Rural household declared annual income | 201.4 | M toman/yr | 1403 | 18 Aug 2025 | same |
| Housing+fuel share of urban expenditure | 43.7 | % | 1403 | 18 Aug 2025 | same |
| Housing+fuel share of rural expenditure | 23.5 | % | 1403 | 18 Aug 2025 | same |

**Gini & income distribution — year 1403:**

| Index | Value | Unit | Ref. period | Report date | Source |
|---|---|---|---|---|---|
| Gini coefficient — national | 0.3870 | index 0–1 | 1403 | 10 Feb 2026 | mehrnews.com/news/6744774 |
| Gini — urban / rural | 0.3689 / 0.3532 | index | 1403 | 10 Feb 2026 | eghtesadnews 743227 |
| Palma index | 1.84 | index | 1403 | 10 Feb 2026 | same |
| Income share — top 20% | 46.24 | % | 1403 | 10 Feb 2026 | same |
| Income share — bottom 20% | 6.07 | % | 1403 | 10 Feb 2026 | same |
| Gini (comparison) | 0.3979 | index | 1402 | 2025 | donya-e-eqtesad 4111873 |

**Housing tenure & population (note: tenure methodology differs from census 2016):**

| Index | Value | Unit | Ref. period | Report date | Source |
|---|---|---|---|---|---|
| Urban owner-occupied households | 68.07 | % | 1401 (2022–23) | 6 Mar 2024 | tabnak.ir/fa/news/1225695 |
| Urban renter households | 23.7 | % | 1401 | 6 Mar 2024 | same |
| Rural owner-occupied households | 88.63 | % | 1401 | 6 Mar 2024 | same |
| Population estimate | 85.96 | million | 1 Aban 1403 (23 Oct 2024) | 1 Oct 2024 | mizanonline.ir/fa/news/4796176 |
| Urbanization | 77 | % | 1 Aban 1403 | 1 Oct 2024 | same |
| Households | 27.65 | million | 1 Aban 1403 | 1 Oct 2024 | same |

## ISPA (ایسپا) — national polls

**«زیستبوم دیجیتال ایرانیان» (Digital Ecosystem of Iranians) — n=4,060 internet users, face-to-face, fielded 15–21 Jun 2026 (after the wartime internet outage); published 22 Jul 2026:**

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| VPN / filter-breaker use | 74.4 | % of internet users | Jun 2026 | 22 Jul 2026 | ispa.ir/4500; khabaronline 2250105 | primary (headline-confirmed) |
| VPN use among under-30s | 85 | % | Jun 2026 | 22 Jul 2026 | ispa.ir/4500 | primary |
| Internet penetration (15+) | 89.3 | % of population 15+ | Jun 2026 | Jul–Aug 2026 | shafaqna/IRNA; khabaronline | news |
| Oppose internet cutoff in crises | 57.6 | % | Jun 2026 | 22 Jul 2026 | khabaronline (ISNA) | news |
| "Internet must never be cut" | ~67 | % (75% under-30) | Jun 2026 | 22 Jul 2026 | ispa.ir/4500 | primary |
| Reopening intl internet = very right | 63.7 | % | Jun 2026 | 22 Jul 2026 | khabaronline (ISNA) | news |
| Oppose officials' "class" internet | 61.1 | % | Jun 2026 | 22 Jul 2026 | ispa.ir/4500 | primary |
| Unfiltering priority — Instagram | 47.8 | % | Jun 2026 | 22 Jul 2026 | khabaronline (ISNA) | news |
| Unfiltering priority — Telegram | 20.9 | % | Jun 2026 | 22 Jul 2026 | same | news |
| Unfiltering priority — YouTube | 8.4 | % | Jun 2026 | 22 Jul 2026 | same | news |
| Avg daily internet use | 4 h 3 min | h:m | Jun 2026 | 22 Jul 2026 | same | news |
| Dissatisfied with internet speed | 72.3 | % | Jun 2026 | 22 Jul 2026 | same | news |

**Social-media consumption surveys (platform usage):**

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| Use ≥1 messenger/social network | 82.2 | % | Sep 2024 (n=3,990) | 29 Sep 2024 | ecoiran 72224 (ISPA PR) | news |
| Instagram users | 50.6 | % | Sep 2024 | 29 Sep 2024 | same | news |
| Telegram users | 39.3 | % | Sep 2024 | 29 Sep 2024 | same | news |
| WhatsApp users | 33.3 | % | Sep 2024 | 29 Sep 2024 | same | news |
| Eitaa users | 28.9 | % | Sep 2024 | 29 Sep 2024 | same | news |
| Rubika users | 28.5 | % | Sep 2024 | 29 Sep 2024 | same | news |
| Bale users | 9.7 | % | Sep 2024 | 29 Sep 2024 | same | news |
| Avg daily social-media time | 2 h 8 min | h:m | Sep 2025 (n=1,502) | 17 Sep 2025 | sharghdaily 1051426 | news |
| No social-media use | 13.7 | % | Sep 2025 | 17 Sep 2025 | same | news |

**Media trust & economy:**

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| IRIB as main news source | 37.9 | % | Oct–Nov 2023 (n=5,086) | Nov 2023 | digiato; ISNA 1402091208080 | news |
| Social networks as main news source | 31 | % | Oct–Nov 2023 | Nov 2023 | same | news |
| Preferred investment — land/housing | 36.8 | % (top pick) | Aug 2026 | Aug 2026 | donya-e-eqtesad 3822817 | news |
| Preferred investment — gold/coins | ~10 | % | Aug 2026 | Aug 2026 | same | news |
| Preferred investment — crypto | 3.1 | % | Aug 2026 | Aug 2026 | same | news |

## World Bank — Iran country page (primary)

| Index | Value | Unit | Ref. period | Report date | Source | URL |
|---|---|---|---|---|---|---|
| Internet users | 85 | % of population | 2024 | 2026 | World Bank | data.worldbank.org/country/iran-islamic-rep |
| Life expectancy at birth | 78 | years | 2024 | 2026 | World Bank | same |
| Population | 92,417,681 | persons | 2025 | 2026 | World Bank | same |
| Population growth | 0.9 | % annual | 2025 | 2026 | World Bank | same |
| GDP per capita | 3,924 | USD | 2025 | 2026 | World Bank | same |
| GDP growth | −2.8 | % | 2025 | 2026 | World Bank | same |
| Inflation (CPI) | 42.2 | % | 2025 | 2026 | World Bank | same |
| Unemployment (ILO modeled) | 8.3 | % of labor force | 2025 | 2026 | World Bank (estimate) | same |
| Poverty ($3.00/day, 2021 PPP) | 2.5 | % of population | 2023 | 2026 | World Bank | same |
| Access to electricity | 100 | % | 2024 | 2026 | World Bank | same |
| Women in parliament | 5 | % of seats | 2025 | 2026 | World Bank | same |
| Female labor-force participation | 14 | % | 2025 | 2026 | World Bank | same |
| Male labor-force participation | 67.2 | % | 2025 | 2026 | World Bank | same |
| Intentional homicides | 2 | per 100k | 2014 | 2026 | World Bank | same |
| Forest area | 6.6 | % of land | 2023 | 2026 | World Bank | same |

## National Organization for Civil Registration (ثبت احوال) — vital stats

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| Marriages | 470,372 | events | 1403 | 2025 | SCI yearbook / ثبت احوال data | news |
| Marriages | ~431,800 | events | 1404 (−8.2%) | Apr–May 2026 | rokna 1225591; IRNA 86132278 | news |
| Divorces | 194,078 | events | 1403 | 2025 | SCI yearbook | news |
| Divorces | ~181,500 | events | 1404 (−6%) | Apr–May 2026 | rokna; iranstatis | news |
| Divorce per 100 marriages | ~41 | ratio | 1403 | 2025–26 | computed; ثبت احوال warns ratio is misleading | estimate |
| Avg age at first marriage — men | 28.3 | years | 1403 | 22 May 2025 | snn.ir/fa/news/1265084 | news (confirmed) |
| Avg age at first marriage — women | 24.1 | years | 1403 | 22 May 2025 | same | news (confirmed) |
| Births | 979,923 | events | 1403 | 21 May 2025 | inn.ir 99909 | news |
| Births | ~892,300 | events | 1404 | Mar–Apr 2026 | rokna 1220777 | news |
| Crude birth rate | ~11.4 | per 1,000 | 1403 | 2025–26 | iranstatis (computed) | estimate |
| Deaths | 458,848 | events | 1403 | 21 May 2025 | inn.ir 99909 | news |
| Deaths | ~451,700 | events | 1404 | Mar–Apr 2026 | rokna 1220777 | news |
| Crude death rate | ~5.3 | per 1,000 | 1403 | 2025–26 | iranstatis (computed) | estimate |

## Central Bank of Iran (بانک مرکزی) — monetary stats (via outlets quoting CBI; cbi.ir unreachable from research env)

**Inflation (urban CPI, base year 1400=100):**

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| Point-to-point inflation | 83.9 | % y/y | Tir 1405 (Jul 2026) | 30–31 Jul 2026 | zoomit 464112; factnameh | news (CBI release) |
| Annual avg (12-mo) inflation | 61.4 | % | 12 mo to Tir 1405 | 30–31 Jul 2026 | iranstatis; zoomit | news (CBI release) |
| Monthly inflation | 3.6 | % m/m | Tir 1405 | 30–31 Jul 2026 | zoomit; iranstatis | news (CBI release) |
| CPI index | 742.8 | index (1400=100) | Tir 1405 | 30–31 Jul 2026 | iranstatis | news (CBI release) |
| P2P trend | 67 → 83.9 | % y/y | Farvardin→Tir 1405 | monthly | donya-e-eqtesad 4276600 | news (CBI release) |
| SCI inflation (cross-check: SCI vs CBI differ) | annual 66 / p2p 87.9 | % | Tir 1405 | ~8 Aug 2026 | zoomit; IRNA 86193666 | news (SCIRI) |

**Exchange rates (USD/IRR):**

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| Official/reference rate (دلار دولتی) | 1,472,440 | IRR per USD | 30 Jul 2026 | daily | tgju (CBI rate) | news/aggregator |
| National exchange office sell (صرافی ملی) | 1,325,072 | IRR per USD | 2 Aug 2026 | daily | navasan.net | news/aggregator |
| Trade (NIMA) transfer rate | 1,527,850 | IRR per USD | 30 Jul 2026 | daily | ibena via khabarpu | news |
| Free-market rate | ~1,920,000–1,936,000 | IRR per USD | 30 Jul 2026 | daily | tgju | news/aggregator |

**Liquidity & interest:**

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| Liquidity (نقدینگی) | 15,581 | trillion toman | end Esfand 1404 (Mar 2026) | late Jul 2026 | IRNA 86188998 | news (CBI release) |
| Liquidity growth | 53.3 | % y/y | end Esfand 1404 | late Jul 2026 | IRNA 86188998 | news (CBI release) |
| Base money growth | 61.5 | % y/y | end Esfand 1404 | late Jul 2026 | independentpersian 421079 | news (CBI release) |
| Money multiplier | 7.434 | ratio | end Bahman 1404 | 15 Jun 2026 | tabnak 1379323 | news (CBI release) |
| Interbank rate | 23.86 | % p.a. | week ending 29 Jul 2026 | ~11 Aug 2026 | khabaronline 2254417 | news (CBI release) |
| Policy corridor | 17 / 23 / 24 | % p.a. (floor/repo/ceiling) | since ~Jun 2026 | 2026 | borna 2356585 | news |

## ITU — ICT statistics, Iran (primary; WTID 2025 release)

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| Individuals using the Internet | 85.3 | % | 2024 | 2025 | datahub.itu.int/data/?e=IRN&i=11624 | primary |
| Mobile-cellular subscriptions | 174 | per 100 inhab. | 2024 | 2025 | datahub.itu.int/data/?e=IRN&i=178 | primary |
| Active mobile-broadband subscriptions | 127 | per 100 inhab. | 2024 | 2025 | datahub.itu.int/data/?e=IRN&i=11632 | primary |
| Fixed-broadband subscriptions | 12.06 (11.04M) | per 100 inhab. (subs) | 2024 | 2025 | data.worldbank.org/indicator/IT.NET.BBND.P2 | primary |
| Smartphone ownership | 72.4 | % of individuals | 2021 | 2022 | datahub.itu.int/data/?e=IRN&i=28228 | primary |
| Mobile phone ownership | 92 (2021) / 86.8 (2024) | % of individuals | 2021/2024 | 2022/2025 | i=9145 / i=28027 | primary |
| 4G coverage | 94.2 | % of population | 2024 | 2025 | i=100095 | primary |
| 5G coverage | 8.2 | % of population | 2024 | 2025 | same | primary |
| 2G coverage | 99 | % of population | 2024 | 2025 | same | primary |
| Households with home internet — rural / urban | 69.2 / 82.5 | % of households | 2021 | 2022 | i=12047 | primary |
| Internet use — female / male | 77.7 / 79.5 | % of individuals | 2021 | 2022 | i=11624 by gender | primary |
| Broadband basket cost (fixed / mobile 5GB) | 0.20 / 0.19 | % of GNI per capita | 2025 | 2025 | i=100122 | primary |
| Fixed-broadband traffic | 564 | GB/subscription | 2024 | 2025 | i=13067 | primary |
| Mobile-broadband traffic | 163 | GB/subscription | 2024 | 2025 | i=13068 | primary |

## World Values Survey — Wave 7, Iran 2020 (n=1,499, fielded 24 Mar–17 Apr 2020, PAPI/phone; values via academic papers + official WVS Online tool)

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| Life satisfaction (1–10) | 6.20 | mean | 2020 | live query | WVS Online tool (official) | citable-page |
| Religion "very important" | 70.6 | % | 2020 | 2024 | Saleh 2024 (dergipark) | academic |
| Self-identified "religious person" | 84.2 | % | 2020 | 2024 | Saleh 2024 | academic |
| Trust in armed forces ("great deal") | 70.2–71 | % | 2020 | 2026/2024 | Marburg 2026 / Saleh 2024 | academic |
| Trust in government | 18.9–20 | % | 2020 | 2026/2024 | same | academic |
| Trust in parliament | 19.9–20 | % | 2020 | 2026/2024 | same | academic |
| Interpersonal trust ("most people can be trusted") | 15 | % | 2020 | 2024 | Saleh 2024 | academic |
| Complete trust in family | 85 | % | 2020 | 2024 | Saleh 2024 | academic |
| Complete trust in neighbors | 18 | % | 2020 | 2024 | Saleh 2024 | academic |
| Very proud of nationality | 83.5 | % | 2020 | 2026 | Marburg 2026 | academic |
| "Men make better political leaders" (agree) | 44.3 | % | 2020 | 2025 | TWU MA thesis | academic |
| "University more important for a boy" (agree) | 52.3 | % | 2020 | 2025 | TWU thesis | academic |
| Media (press/TV) trust; family/work importance; prayer freq | not found | — | 2020 | — | dataset downloadable, needs analysis | not-found |

## ILO — labor statistics (ILOSTAT; survey LFS 2024 + modeled ILOEST 2025)

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| Unemployment (survey) | 7.6 | % of labor force | 2024 | ILOSTAT profile | ilostat.ilo.org/data/country-profiles/irn/ | primary |
| Unemployment total (modeled) | 8.3 | % | 2025 | ILOEST | WB SL.UEM.TOTL.ZS | estimate |
| Unemployment male / female (modeled) | 6.8 / 15.6 | % | 2025 | ILOEST | WB indicators | estimate |
| Youth unemployment (15–24) | 21.9 (M 19.3 / F 32.0) | % | 2025 | ILOEST | WB SL.UEM.1524 | estimate |
| LFPR total (survey / modeled) | 40.7 / 41 | % of pop 15+ | 2024/2025 | ILOSTAT | profile + WB | primary/estimate |
| LFPR male / female (modeled) | 67 / 14 | % | 2025 | ILOEST | WB SL.TLF.CACT.* | estimate |
| Youth NEET (15–24) | 24.3 | % of youth | 2024 | ILOSTAT | profile; WB SL.UEM.NEET.ZS | primary |
| Women in management (SDG 5.5.2) | 20.4 | % | 2024 | ILOSTAT | profile | primary |
| Average weekly hours | 46.8 | hours | 2024 | ILOSTAT | profile | primary |
| Working >48 h/week | 31.7 | % of employed | 2024 | ILOSTAT | profile | primary |
| Time-related underemployment | 6.3 | % | 2024 | ILOSTAT | profile | primary |
| Working poverty (<US$3 PPP/day) | 0.8 | % | 2025 | ILOSTAT modeled | profile | estimate |
| Minimum wage | 53,073,300 | IRR/month | 2024 | ILOSTAT | profile | primary |
| Social protection coverage (SDG 1.3.1) | 100 | % | 2023 | ILOSTAT | profile | primary |
| Informal employment | no data | — | — | — | ILOSTAT profile | n/a |

## WHO — health statistics (GHO API / data.who.int, primary)

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| Tobacco use (15+, age-std) | 12.5 (M 23.5 / F 1.6) | % | 2022 | Jan 2024 | data.who.int/countries/364 | primary |
| Obesity (18+, BMI≥30) | 24.0 (F 29.9 / M 18.1) | % | 2022 | Feb 2024 | NCD_RisC via GHO | primary |
| Current health expenditure | 6.03 | % of GDP | 2023 | latest GHED | ghoapi GHED_CHEGDP_SHA2011 | primary |
| Physician density | 15.05 (2023: 18.11) | per 10,000 | 2018/2023 | Apr 2025 | HWF_0001 | primary |
| Life expectancy at birth | 74.7 (F 76.4 / M 73.1) | years | 2021 | GHE 2021 | WHOSIS_000001 | primary |
| Healthy life expectancy (HALE) | 64.0 | years | 2021 | GHE 2021 | same | primary |
| Maternal mortality | 15.84 | per 100k live births | latest | GHO | data.who.int | primary |
| Under-5 mortality | 12.18 | per 1,000 | latest | GHO | data.who.int | primary |
| Road traffic mortality | 20.6 | per 100k | latest | GHO | data.who.int | primary |
| Hypertension (30–79, age-std) | 26.2 | % | latest | GHO | data.who.int | primary |
| Alcohol consumption (15+) | 0.07 | L pure/capita | latest | GHO | data.who.int | primary |
| Skilled birth attendance | 99 | % | latest | GHO | data.who.int | primary |
| DTP3 immunization (1-yr-olds) | 99 | % | latest | GHO | data.who.int | primary |
| Population (WHO estimate) | 90,608,707 | persons | 2023 | WHO | data.who.int | primary |

## UNESCO Institute for Statistics (UIS API, primary; Feb 2026 data release)

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| Adult literacy (15+) | 88.9 | % | 2023 | Feb 2026 | api.uis.unesco.org LR.AG15T99 | primary |
| Youth literacy (15–24) | 98.7 | % | 2023 | Feb 2026 | LR.AG15T24 | primary |
| Adult literacy — female / male | 85.1 / 92.8 | % | 2023 | Feb 2026 | WB SE.ADT.LITR.* | primary |
| Tertiary gross enrollment | 58.7 | % | 2022 | Feb 2026 | GER.5T8 | primary |
| Government education expenditure | 2.8 | % of GDP | 2023 | Feb 2026 | XGDP.FSGOV | primary |
| Expected years of schooling | 14.1 | years | 2022 | Feb 2026 | SLE.1T8 | primary |
| Mean years of schooling (25+) | 10.3 | years | 2016 | Feb 2026 | MYS.1T8.AG25T99 | primary |
| Primary gross enrollment | 102.0 | % | 2023 | Feb 2026 | WB SE.PRM.ENRR | primary |
| Secondary gross enrollment | 85.1 | % | 2023 | Feb 2026 | WB SE.SEC.ENRR | primary |
| Out-of-school children (primary age) | 9,163 | children | 2023 | Feb 2026 | OFST.1.CP | primary |

## IMF — WEO April 2026 (primary; Jul 2026 update; last Article IV was 2018)

| Index | Value | Unit | Ref. period | Actual/Forecast | Report date | Source |
|---|---|---|---|---|---|---|
| Real GDP growth | +3.7 / −1.5 / −6.1 (−5.4 Jul) / +3.2 | % y/y | 2024/25/26/27 | A/E/F/F | Apr 2026 (Jul upd) | datamapper NGDP_RPCH |
| CPI inflation (avg) | 32.5 / 50.9 / 68.9 / 39.6 | % y/y | 2024–2027 | A/E/F/F | Apr 2026 | PCPIPCH |
| Unemployment | 7.6 / 8.0 / 9.2 | % | 2024/25/26 | A/E/F | Apr 2026 | LUR |
| GDP per capita (PPP) | 21,145 / 21,200 / 20,279 | intl $ | 2024/25/26 | A/E/F | Apr 2026 | PPPPC |
| GDP per capita (nominal) | 3,415 | USD | 2026 | F | Apr 2026 | NGDPDPC |
| GDP (current prices) | 416.7 → 300.3 | USD bn | 2024 → 2026 | A → F | Apr 2026 | NGDPD |
| Current account balance | +13.2 → −5.4 | USD bn | 2024 → 2026 | A → F | Apr 2026 | BCA |
| General govt net lending/borrowing | −5.19 | % of GDP | 2026 | F | Apr 2026 | Fiscal Monitor |
| Population (IMF) | 87.93 | million | 2026 | F | Apr 2026 | profile |

## Internet censorship & VPN (official/internal + measurement orgs + academic)

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| VPN use among internet users (IPRC survey) | 81 | % | Dec 2024 | Feb 2025 | Iranian Parliament Research Center via Iran Intl | news (official survey) |
| VPN — free / paid split | 49.4 / 30.3 | % | Dec 2024 | Feb 2025 | same | news (official survey) |
| VPN users (official est.) | 10–12 | million | 2018 | 2022 | J. Cyberspace Studies 6(2) | academic |
| Telegram users still active | ~40 | % | Jul 2021 | 2022 | JCS (citing ISPA) | academic |
| Top mobile apps freely accessible | 31.1 | % (53/170) | 2021–22 | 2022 | JCS | academic |
| Blocked domains (OONI 2014–17) | 886 | domains | 2014–2017 | 2017 | ooni.org/post/iran-internet-censorship | primary |
| Nov 2019 blackout — BGP drop | 33 | % | Nov 2019 | 2019 | OONI | primary |
| Internet freedom score (FH) | 12/100 (2024) · 13/100 (2025) | score | 2023–2025 | FH | freedomhouse.org FOTN | primary |
| Obstacles to Access sub-score | 7/25 | score | Jun 2023–May 2024 | FH 2024 | FOTN | primary |
| Internet penetration (DataReportal via FH) | 81.7 | % | Jan 2024 | FH 2024 | FOTN | primary |

## پیمایش ملی «ارزش‌ها و نگرش‌های ایرانیان» 1402 — religiosity (confidential gov survey; ch.8 leaked via BBC Persian)

Context: n=15,878, face-to-face, random sample, all 31 provinces, autumn 1402
(2023); prior waves 1379/1382/1394. Confidence: `leak` (classified doc via
BBC). Caveat: face-to-face + sensitive topic → answers likely conservative;
1394 vs 1402 wording differs on hijab questions.

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| Separation of religion & politics (agree) | 72.9 | % | 1402 | Feb 2024 | bbc.com/persian/articles/cmlgj8j3xl1o | leak |
| same (1394) | 30.7 | % | 1394 | 2015 | same | leak |
| No problem with women's no-hijab | 38 | % | 1402 | Feb 2024 | same | leak |
| Oppose no-hijab but won't intervene | 46 | % | 1402 | Feb 2024 | same | leak |
| Would admonish on no-hijab | 12.5 | % | 1402 | Feb 2024 | same | leak |
| Oppose mandatory hijab for all women | 45.2 | % (41% in favor) | 1402 | Feb 2024 | same | leak |
| Religion must not matter in hiring | 61.9 | % agree | 1402 | Feb 2024 | same | leak |
| Religiosity lower than 5 yrs ago | 85 | % | 1402 | Feb 2024 | same | leak |
| Expect less religiosity in 5 yrs | 81.8 | % | 1402 | Feb 2024 | same | leak |
| Self-rated very religious | 42.6 | % | 1402 | Feb 2024 | same | leak |
| Self-rated not/none religious | 24.3 | % | 1402 | Feb 2024 | same | leak |
| Belief in afterlife accounting | 77.4 | % agree (86.9% in 1394) | 1402 | Feb 2024 | same | leak |
| Pray always/mostly | 54.8 | % (78.5% in 1394) | 1402 | Feb 2024 | same | leak |
| Never pray | 22.2 | % (3.1% in 1394) | 1402 | Feb 2024 | same | leak |
| Congregational prayer always/mostly | 18.5 | % (26.2% in 1394) | 1402 | Feb 2024 | same | leak |
| Never congregational prayer | 44.9 | % (17.3% in 1394) | 1402 | Feb 2024 | same | leak |
| Fast always/mostly | 51.5 | % (72.5% in 1394) | 1402 | Feb 2024 | same | leak |
| Never fast | 27.4 | % (5.1% in 1394) | 1402 | Feb 2024 | same | leak |
| "Religion = pure heart even without prayer" (agree) | 61.8 | % (39.4% in 1394) | 1402 | Feb 2024 | same | leak |
| Full ch.8 PDF (BBC-hosted) | — | — | — | Feb 2024 | downloads.bbc.co.uk/worldservice/persian/پیمایش ملی دینداری.۱۴۰۲.pdf | leak |

## پیمایش ملی «ارزش‌ها و نگرش‌های ایرانیان» 1402 — OTHER leaked chapters (economy, politics, trust, family, identity, social harms)

Context: Wave 4 of the survey, n=15,878 (15+), face-to-face, 31 provinces,
Aban 1402 (Nov 2023); unveiled 30 Dey 1402; classified secret; commissioned
by وزارت ارشاد. Chapters hosted as PDFs on Iran Data Portal (Syracuse);
trust chapter via IranWire (Feb 2024); social-harms via Ham-Mihan.
Confidence: `leak`.

**Economic chapter:**

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| Tax collection unfair (agree) | 77.8 | % | 1402 | Feb 2024 | Syracuse PDF (نگرش‌های اقتصادی) | leak |
| Taxes haven't improved gov services | 72.2 | % | 1402 | Feb 2024 | same | leak |
| No tax needed if khums/zakat paid | 49.3 | % | 1402 | Feb 2024 | same | leak |
| Economy worse than 5 yrs ago | 80.3 | % | 1402 | Feb 2024 | same | leak |
| Economy will worsen in next 5 yrs | 70.9 | % | 1402 | Feb 2024 | same | leak |
| Self-perceived lower-middle class | 43.8 | % | 1402 | Feb 2024 | same | leak |
| Self-perceived lower class | 31.7 | % | 1402 | Feb 2024 | same | leak |

**Politics chapter:**

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| Will vote in next presidential election | 43.0 (42.4 no) | % | 1402 | Feb 2024 | Syracuse PDF (سیاست) | leak |
| Will vote in Majlis election | 40.3 (44.9 no) | % | 1402 | Feb 2024 | same | leak |
| Never attend rallies (22 Bahman/Quds) | 53.1 | % | 1402 | Feb 2024 | same | leak |
| Follow political news little/very little | 64.5 | % | 1402 | Feb 2024 | same | leak |
| Main reference group: family | 58.4 | % | 1402 | Feb 2024 | same | leak |
| Support "resistance axis" vs US/West | 44.3 (44.5 disagree) | % | 1402 | Feb 2024 | same | leak |
| Approve fight for Quds liberation | 58.8 | % | 1402 | Feb 2024 | same | leak |
| Approve US/West ties if giving up nuclear+missile | 27.3 (64.9 no) | % | 1402 | Feb 2024 | same | leak |

**Trust & social capital chapter (via IranWire):**

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| Low trust in IRIB (1394: ~81% trusted) | 58 | % | 1402 | Feb 2024 | iranwire.com/fa/special-features/125791 | leak |
| Low trust in parliament (1394: ~20%) | 63 | % | 1402 | Feb 2024 | same | leak |
| Low trust in government (1394: ~18%) | 57 | % | 1402 | Feb 2024 | same | leak |
| Low trust in judiciary (1394: ~20%) | 53 | % | 1402 | Feb 2024 | same | leak |
| Low trust in politicians (high: 13%) | 70 | % | 1402 | Feb 2024 | same | leak |
| Low trust in clergy (1394: 45% trusted) | ~56 | % | 1402 | Feb 2024 | same | leak |
| High-ish trust in police / Sepah | ~63 / ~60 | % | 1402 | Feb 2024 | same | leak |
| High trust in doctors | 73 | % | 1402 | Feb 2024 | same | leak |
| "People trust each other little" (27% none) | 54 | % | 1402 | Feb 2024 | same | leak |

**Family chapter:**

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| Ideal marriage age for girls 21–25 (mean 22.4) | 45.5 | % | 1402 | Feb 2024 | Syracuse PDF (خانوادگی) | leak |
| Approve premarital sex (61.0 strongly disagree) | 7.3 | % | 1402 | Feb 2024 | same | leak |
| Approve cohabitation without marriage | 10 | % | 1402 | Feb 2024 | same | leak |
| Ideal family size: 2 children | 50.9 | % | 1402 | Feb 2024 | same | leak |
| Give children freedom in lifestyle/dress | 46.1 | % | 1402 | Feb 2024 | same | leak |

**Identity chapter:**

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| Proud to be Iranian (high/very high; 53.3 very) | 83 | % | 1402 | Feb 2024 | Syracuse PDF (هویت) | leak |
| Would emigrate permanently if possible | 38.6 | % | 1402 | Feb 2024 | same | leak |
| Top emigration destination: Canada | 22 | % (US 19, DE 16, TR 10) | 1402 | Feb 2024 | same | leak |
| Low response to call to defend country | 51.6 | % | 1402 | Feb 2024 | same | leak |

**Social harms (via Ham-Mihan, Sep 2024):**

| Index | Value | Unit | Ref. period | Report date | Source | Conf. |
|---|---|---|---|---|---|---|
| Inflation = most important national problem | 81.9 | % (multi-select) | 1402 | Sep 2024 | hammihanonline.ir | news |
| Unemployment = top problem | 47.9 | % | 1402 | Sep 2024 | same | news |
| Current situation acceptable/good | 8.2 | % | 1402 | Sep 2024 | same | news |
| Dissatisfied with country's situation | ~91.8 | % | 1402 | Sep 2024 | same | news |
| "Country can be improved through reforms" | 61.6 | % | 1402 | Sep 2024 | same | news |

## Provincial contrasts (SCI census 2016 + releases; confidence primary unless noted)

| Index | Value | Unit | Provinces (max / min) | Ref. period | Source | Conf. |
|---|---|---|---|---|---|---|
| Population | 13,267,637 / 580,158 | persons | Tehran / Ilam | 2016 | SCI census | primary |
| Population estimate | 14.68M / 597k | persons | Tehran / Ilam | 1405 est. | iranstatis (SCI repub.) | med |
| Literacy (6+) | 92.9 / 76.0 | % | Tehran / Sistan-Baluchestan | 2016 | SCI census | primary |
| Urbanization | 95.2 / 48.5 | % | Qom / Sistan-Baluchestan | 2016 | SCI census | primary |
| Unemployment (winter 1403, corroborated) | 15.2 | % | Kermanshah (max) | 2024–25 | donya-e-eqtesad | news |
| Unemployment (winter 1404, ISNA) | 11.7 / 5.0 | % | Kermanshah / S. Khorasan | 2025–26 | eghtesadnews (ISNA) | news — **conflict: 16.5/3.5 elsewhere** |
| Poverty rate | 58.2 / 15.4 | % | Sistan-Baluchestan / Tehran | 1400 | SNN (Min. of Welfare) | news |
| GDP share of country | 22.1 | % | Tehran (max) | 1399 | SCI via Tabnak | news |
| GDP (current) | 1,760k / 38.5k | bn toman | Tehran / South Khorasan | 1400 | ecoinan (SCI reg. accounts) | news |
| Population growth 2011–16 | +3.02 | %/yr | South Khorasan (max) | 2016 | SCI census | primary |
| Shrinking provinces | −0.11 / −0.23 | %/yr | N. Khorasan / Hamedan | 2016 | SCI census | primary |
| Sex ratio | 114 / 100 | men per 100 women | Bushehr / Gilan | 2016 | SCI census | primary |

## WVS Iran 2020 — additional values (live WVS Online tool, N=1,499; citable-page)

| Index | Value | Unit | Ref. period | Source |
|---|---|---|---|---|
| Pray several times a day | 63.7 | % | 2020 | Q172 |
| Pray at least once a day | 73.7 | % | 2020 | Q172 (63.7+10.0) |
| Never pray | 5.4 | % | 2020 | Q172 |
| Attend religious services ≥ once a week | 26.1 | % | 2020 | Q171 |
| Trust in the press (a great deal + quite a lot) | 60.1 | % | 2020 | Q66 |
| Trust in television | 79.4 | % | 2020 | Q67 |
| Importance of family — "very important" | 93.9 | % | 2020 | Q1 |
| Importance of work — "very important" | 77.5 | % | 2020 | Q5 |
| TV news as daily info source | 63.0 | % | 2020 | Q202 |
| Internet as daily info source | 53.1 | % | 2020 | Q206 |
| Daily newspaper | 4.3 | % (59.0 never) | 2020 | Q201 |

---

*Now 14 sources covered, ~260 rows. Optional follow-ups: ISPA granular
reports, ethics chapter of the leaked survey, per-capita GDP by province.*
