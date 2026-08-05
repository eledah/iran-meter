# Iran-meter — Indexes

Flat registry of every concrete statistic ("index") gathered for the quiz.
This is the working table that feeds `data/stats.yaml` later.

**Columns:** Index | Value | Unit | Ref. period | Report date | Source | URL

Provenance rules:
- Every number must trace to a source in `SOURCES.md`.
- `Ref. period` = the time the number describes (e.g. 2016 census, spring
  1403). `Report date` = when it was published.
- Confidence tags: `primary` (seen on the org's own page) / `news` (via a
  news article quoting the org) / `estimate` (modeled).
- Rows are added in batches as research subagents return findings.

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

---

*Pending: subagent batches for ISPA, SCI recent surveys, NOCR vital stats,
and further sources (CBI, WVS, ITU, …).*
