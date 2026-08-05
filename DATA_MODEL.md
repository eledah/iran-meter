# Iran-meter — Data Model Proposal

## Principle

**Three layers, strictly separated:**

```
sources/  →  stats/  →  questions/
(provenance)  (the numbers)  (the game)
```

- Questions **never hardcode numbers** — they reference stat records.
- Every stat points to exactly one source.
- You can add quiz questions without touching data, and swap/update a number
  without touching questions.

## File layout

```
iran-meter/
├── data/
│   ├── sources.yaml      # registry of data sources
│   ├── stats.yaml        # one row per reported number
│   └── questions.yaml    # quiz bank (20–30 entries)
├── SOURCES.md            # human-readable notes on each source
├── DATA_MODEL.md         # this file
└── PROGRESS.md
```

YAML files because: human-editable, git-diffable, no runtime dependency for a
20–30 question bank. (If we later add player answer tracking / leaderboards,
that's a separate SQLite DB — the quiz data stays in YAML.)

## Entity 1 — Source (in `data/sources.yaml`)

```yaml
- id: sci-census-2016
  org: Statistical Centre of Iran
  org_fa: مرکز آمار ایران
  title: Population and Housing Census 2016 (1395)
  type: official_census        # official_census | independent_survey | academic | other
  url: https://www.amar.org.ir/
  doc_url: https://irandataportal.syr.edu/wp-content/uploads/Iran_Census_2016_Selected_Results.pdf
  accessed: 2026-08-05         # ISO 8601
  coverage_note: Full national census, last published 2016
```

## Entity 2 — Stat (in `data/stats.yaml`)

One row **per number** (per year × scope). This is the layer that makes the
quiz trustworthy — the exact value and definition live here, untouched by
gameplay.

```yaml
- id: home-ownership-rate-national-2016
  source_id: sci-census-2016
  name_en: Households in owner-occupied dwellings (national)
  name_fa: سهم خانوارهای مالک مسکن (کل کشور)
  value: 60.5
  unit: percent                # percent | count | years | ratio
  year: 2016
  scope: national              # national | urban | rural | by-age | by-province
  definition: Share of households in conventional dwelling units with tenure "owned land and building"
  confidence: official         # official | survey-weighted | estimate
  notes: Urban rate is much lower (54.5%) — see urban-2016 sibling stat
```

## Entity 3 — Question (in `data/questions.yaml`)

```yaml
- id: q-housing-01
  category: housing            # housing | internet | media | demographics | economy ...
  difficulty: medium           # easy | medium | hard
  prompt_en: What share of Iranian households own their home?
  prompt_fa: چند درصد از خانوارهای ایرانی صاحب خانه‌شان هستند؟
  stat_ids: [home-ownership-rate-national-2016]   # 1..n — the "answer" stat(s)
  options:
    - label_en: "45%"
      label_fa: "٪۴۵"
    - label_en: "60%"
      label_fa: "٪۶۰"
    - label_en: "75%"
      label_fa: "٪۷۵"
    - label_en: "85%"
      label_fa: "٪۸۵"
  correct_index: 1             # 0-based
  fun_fact_en: In big cities it drops to ~54% — renting is the urban norm.
  fun_fact_fa: در شهرهای بزرگ این عدد به حدود ۵۴٪ می‌رسد — اجاره‌نشینی در شهرها رایج‌تر است.
```

Comparison questions (e.g. "Which is higher: trust in IRIB or Iran
International?") simply list both stat_ids and compare in code.

## Conventions

- **ids:** lowercase snake_case with prefix (`q-`, `stat-`, `src-`); unique.
- **dates:** ISO 8601 (`2026-08-05`).
- **values:** exact number as reported; unit always explicit; percentages as
  0–100 numbers. Rounding happens only in `options`, never in `stats`.
- **bilingual:** `_en` / `_fa` fields everywhere — game targets Persian-
  speaking players.
- **options:** 4 plausible values, one matching the stat; correct_index 0-based.

## Validation (before the game trusts the data)

1. YAML parses (JSON Schema or Pydantic models).
2. All `id`s unique across each file.
3. Every `stat.source_id` exists in sources; every `question.stat_ids` exists
   in stats.
4. `correct_index` < number of options.
5. `question.stat_ids` value ≈ the correct option (sanity check on rounding).

Suggested check tool: a small Pydantic script + pytest, run in CI / pre-commit.
