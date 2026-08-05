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

---

*Pending: batch 3 (WVS Iran 2020 retry, ILO, WHO).*
