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
│   └── calibration.yaml  # runtime only: observed player success per question (gitignored)
├── SOURCES.md            # human-readable notes on each source
├── DATA_MODEL.md         # this file
└── PROGRESS.md
```

YAML files because: human-editable, git-diffable, no runtime dependency for a
20–30 question bank. (Player answer history / leaderboards later → separate
SQLite DB; the quiz data stays in YAML.)

## Entity 1 — Source (in `data/sources.yaml`)

```yaml
- id: sci-census-2016
  org: Statistical Centre of Iran
  org_fa: مرکز آمار ایران
  title: Population and Housing Census 2016 (1395)
  type: official_census        # official_census | official_survey | polling | international | academic
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
  unit: percent                # percent | count | years | ratio | usd
  year: 2016
  scope: national              # national | urban | rural | by-age | by-province
  definition: Share of households in conventional dwelling units with tenure "owned land and building"
  confidence: official         # official | survey-weighted | modeled-estimate
  notes: Urban rate is much lower (54.5%) — see urban-2016 sibling stat
```

## Entity 3 — Question (in `data/questions.yaml`)

```yaml
- id: q-housing-01
  category: housing            # housing | internet | media | demographics | economy | society ...
  difficulty: 3                # difficulty meter: integer 1 (trivial) … 5 (expert), see rubric below
  surprise_note: Urban ownership is only ~54% — most people guess higher   # why it's hard/easy
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

---

## The Difficulty Meter

Difficulty is **numeric 1–5**, set by the author, then optionally **calibrated
by real player data**. The in-game meter renders it as a 5-segment gauge.

### Author rubric (how to assign the number)

| Level | Label | Criterion |
|---|---|---|
| 1 | Trivial | Common knowledge; ≥80% of players are expected to know it |
| 2 | Easy | Known fact with a mild twist |
| 3 | Medium | Counterintuitive, but one plausible distractor exists |
| 4 | Hard | Surprising value; distractors within ~5 percentage points |
| 5 | Expert | Obscure; several close distractors; typically <25% correct |

When assigning, weigh three inputs:

1. **Familiarity** — how widely reported the fact is (census facts = higher
   familiarity than survey trivia).
2. **Surprise factor** — distance between the true value and the naive guess
   (e.g. "own home? ~90%?" → true 60% = surprising).
3. **Distractor closeness** — are the wrong options near the true value?

`surprise_note` documents the reasoning so difficulty stays consistent
between authors.

### Runtime calibration (data/calibration.yaml, gitignored)

```yaml
q-housing-01:
  attempts: 312
  correct_pct: 41.2
```

- The game updates `attempts` / `correct_pct` after every play session.
- **Effective difficulty** used by the meter:
  - `< 30 attempts` → use author difficulty as-is.
  - `≥ 30 attempts` → blend: `observed = clamp(5 × (1 − correct_pct/100), 1, 5)`
    then `effective = round(0.5 × author + 0.5 × observed)`.
- This lets the meter drift toward reality as the player base grows, while
  the authored value stays as the anchor.

### How the meter is used

- **Quiz builder** balances a game: for 20 questions → e.g. 5 × level 1–2,
  10 × level 3, 5 × level 4–5.
- **Adaptive mode (optional):** after 5 correct in a row, raise the level
  band; after 3 wrong, lower it.

---

## Conventions

- **ids:** lowercase snake_case with prefix (`q-`, `stat-`, `src-`); unique.
- **dates:** ISO 8601 (`2026-08-05`).
- **values:** exact number as reported; unit always explicit; percentages as
  0–100 numbers. Rounding happens only in `options`, never in `stats`.
- **bilingual:** `_en` / `_fa` fields everywhere — game targets Persian-
  speaking players.
- **options:** 4 plausible values, one matching the stat; correct_index 0-based.
- **difficulty:** integer 1–5 (rubric above); calibration lives in the
  gitignored runtime file, never in the committed question.

## Validation (before the game trusts the data)

1. YAML parses (JSON Schema or Pydantic models).
2. All `id`s unique across each file.
3. Every `stat.source_id` exists in sources; every `question.stat_ids` exists
   in stats.
4. `correct_index` < number of options.
5. `question.stat_ids` value ≈ the correct option (sanity check on rounding).
6. `difficulty` is an integer in [1, 5].

Suggested check tool: a small Pydantic script + pytest, run in CI / pre-commit.
