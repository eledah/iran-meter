# Iran-meter — Progress

Interactive quiz game about Iran based on official reported statistics
(internal + external). Working name: **Iran-meter** (final name TBD).

## Log

- **2026-08-05** — Repo scaffolded (git init). Verified 2 data sources:
  SCI Census 2016 (official/internal) + GAMAAN Media Survey 2023
  (independent/external). Wrote `SOURCES.md`; proposed data model in
  `DATA_MODEL.md`.

- **2026-08-05 (2)** — Source policy set: **GAMAAN rejected** (funding
  concerns, user decision; moved to Rejected section, its numbers dropped).
  Added **ISPA** (ایسپا — digital-ecosystem survey as VPN/social-media
  replacement), **World Bank** (full Iran indicator set), **WVS Wave 7
  Iran 2020** to `SOURCES.md`. Added **difficulty meter** spec (1–5 rubric +
  runtime calibration) to `DATA_MODEL.md`.

- **2026-08-05 (3)** — Index hunt batch 1 (3 parallel subagents): ISPA, SCI
  recent releases, NOCR ثبت احوال. ~90 verified rows added to new
  `INDEXES.md`; spot-checked 4 headline numbers myself (VPN 74%, unemployment
  9.1%, marriage age 28.3/24.1, household expenditure 269.3M toman) — all
  confirmed. Wartime-context flags noted for 1405 figures. Batch 2 dispatched
  (CBI, WVS, ITU).

- **2026-08-05 (4)** — Index hunt batch 2: **CBI** (inflation 83.9% p2p /
  61.4% annual, USD rates, liquidity 15,581همت +53.3%) and **ITU** (internet
  85.3%, mobile 174/100, 4G 94.2% — all primary) integrated into
  `INDEXES.md`. **WVS agent failed** (upstream model 503) — retried in batch
  3. Batch 3 dispatched: WVS (retry), ILO, WHO.

- **2026-08-05 (5)** — Index hunt batch 3: **WVS** retry succeeded (values
  from academic papers + official WVS Online tool: religion very important
  70.6%, trust in armed forces ~70%, interpersonal trust 15%, pride 83.5%);
  **ILO** (unemployment 7.6% survey / 8.3% modeled, NEET 24.3%, min wage
  53M IRR); **WHO** (tobacco 12.5%, obesity 24%, health spending 6.03% GDP,
  LE 74.7). Integrated into `INDEXES.md` (~150 rows total). Batch 4
  dispatched: UNESCO, IMF, academic VPN/censorship studies.
