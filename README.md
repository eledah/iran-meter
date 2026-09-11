# Iran-meter

▶ **Play: https://eledah.github.io/iran-meter/** — bilingual (fa/en) quiz: guess 20 numbers about Iran, see the real stat.

## Status

- **Phase 1 — data hunt: complete.** 18 sources, 439 verified stat rows
  (official Iranian institutions + international orgs + leaked official
  surveys + measurement projects).
- **Phase 2 — build: complete.** `data/` YAMLs (18 sources / 439 stats),
  20-question graded bank (`data/questions.yaml`, graded by
  importance × worldview-shift — see `data/selection.md`), validation
  (`scripts/validate.py` + `tests/test_validate.py`, all rules pass),
  static bilingual web UI (`web/`) **live on GitHub Pages**.

## Repo map

| File | Purpose |
|---|---|
| `PROGRESS.md` | Minimal running log (one entry per milestone) |
| `SOURCES.md` | Source registry: org, type, URLs, what's inside, caveats; rejected sources |
| `INDEXES.md` | **The data layer** — flat table of every statistic: value, unit, reference period, report date, URL, confidence tag |
| `DATA_MODEL.md` | Data model (sources → stats → questions) + difficulty meter spec |
| `data/sources.yaml` | 18 source records (registry) |
| `data/stats.yaml` | 439 stat rows (one per number) |
| `data/questions.yaml` | 20-question quiz bank, bilingual (fa/en) |
| `data/selection.md` | How the top 20 were graded and picked from the 439-stat bank |
| `scripts/validate.py` | Validation: ids unique, stat refs resolve, correct_index in range, difficulty in [1,5] |
| `tests/test_validate.py` | Tests for the validator |
| `tools/export_web.py` | Exports `data/*.yaml` → `web/app-data.json` |
| `web/` | Static game UI (`index.html`, `app.js`, `styles.css`, `app-data.json`) |
| `references/` | Archived source documents (leaked 1402 survey chapters, official wave-3 report) |

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

## Development

```
python3 tools/export_web.py
python3 scripts/validate.py
python3 tests/test_validate.py
cd web && python3 -m http.server
```

Re-export after any `data/` change; validate before commit; serve `web/`
locally to preview.
