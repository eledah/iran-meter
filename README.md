# Iran-meter

Interactive quiz game about Iran, built on **verified statistics** about Iran
and its people (working name — final name TBD).

Players answer questions like "What share of Iranian households own their
home?" or "What share of internet users use a VPN?" and learn something real
about the country along the way.

## Status

- **Phase 1 — data hunting: complete.** ~390 verified index rows from 16
  sources (official Iranian institutions + international orgs + leaked
  official surveys + measurement projects).
- **Phase 2 — build: next.** Convert `INDEXES.md` → `data/` YAML files,
  add validation, draft 20–30 questions with the difficulty meter.

## Repo map

| File | Purpose |
|---|---|
| `PROGRESS.md` | Minimal running log (one entry per milestone) |
| `SOURCES.md` | Source registry: org, type, URLs, what's inside, caveats; rejected sources |
| `INDEXES.md` | **The data layer** — flat table of every statistic: value, unit, reference period, report date, URL, confidence tag |
| `DATA_MODEL.md` | Proposed data model (sources → stats → questions) + difficulty meter spec |
| `references/` | Archived source documents (leaked 1402 survey chapters, official wave-3 report) |
| `data/` | *(phase 2)* `sources.yaml`, `stats.yaml`, `questions.yaml`, `calibration.yaml` |

## Provenance rules (non-negotiable)

- Every quiz number must trace to a row in `INDEXES.md` → a source in
  `SOURCES.md`. No orphans.
- Each index row carries: value · unit · **reference period** (what time the
  number describes) · **report date** (when it was published) · URL ·
  confidence (`primary` / `news` / `estimate` / `leak`).
- Two numbers may look alike but measure different things — the notes column
  exists for exactly this (e.g. the two distinct "~92% dissatisfaction"
  figures; census-2016 vs 1401 housing tenure methodologies; SCI vs CBI
  inflation).
- Wartime-period 1405/2026 figures are flagged (incl. CBI's publication
  hiatus). Leaked classified documents (`leak`) are usable but labeled and
  spot-checked.

## Source policy

Preferred: official Iranian institutions (مرکز آمار ایران, ایسپا, بانک
مرکزی, ثبت احوال) + established international bodies (World Bank, ITU,
ILO, WHO, UNESCO, IMF, WVS) + measurement projects (OONI, Freedom House).
**GAMAAN is rejected** (funding concerns, user decision 2026-08-05) — see
`SOURCES.md` → Rejected.

## Next-phase checklist

1. Build `data/sources.yaml` from `SOURCES.md` (14+ source records).
2. Build `data/stats.yaml` from `INDEXES.md` (one row per number).
3. Draft 20–30 questions in `data/questions.yaml` — bilingual (fa/en),
   4 options each, difficulty 1–5 with `surprise_note` (see `DATA_MODEL.md`).
4. Pydantic validation script + pytest (ids unique, stat refs resolve,
   correct_index in range, difficulty in [1,5]).
5. Decide the game client: CLI / web / Bale bot — with the user.
