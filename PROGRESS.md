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

- **2026-08-05 (6)** — Index hunt batch 4 (final planned): **UNESCO UIS**
  (literacy 88.9%, tertiary GER 58.7%, edu spending 2.8% GDP), **IMF WEO**
  (2026 GDP −6.1% forecast, inflation 68.9% forecast — highest since WWII),
  **censorship/VPN** (IPRC official survey 81% VPN use; OONI 886 blocked
  domains; FH score 12/100). All 13 planned sources now covered,
  `INDEXES.md` ~190 rows. Next: convert to `data/*.yaml` + draft questions.

- **2026-08-05 (7)** — Added **پیمایش ملی «ارزش‌ها و نگرش‌های ایرانیان»
  1402** (user-requested): classified government religiosity survey
  (n=15,878, autumn 1402), ch.8 leaked via BBC Persian — separation of
  religion & politics 72.9%, never pray 22.2%, 85% say religiosity declined.
  Source #14 in `SOURCES.md`; ~19 rows in `INDEXES.md`.

- **2026-08-05 (8)** — Batch 5: **all other leaked chapters** of the same
  1402 survey found (7 chapter PDFs on Iran Data Portal/Syracuse + IranWire
  trust chapter + Ham-Mihan social chapter): economy worse 80.3%, vote
  turnout 43%, low trust IRIB 58%, ideal family 2 kids 50.9%, would emigrate
  38.6%, inflation top problem 81.9%. **Provincial contrasts** (Tehran vs
  Sistan-Baluchestan literacy 92.9/76.0, urbanization Qom 95.2 vs S&B 48.5,
  poverty 15.4 vs 58.2). **WVS gaps closed** via live WVS Online tool (pray
  daily 73.7%, press trust 60.1%, family 93.9%). `INDEXES.md` ~260 rows.

- **2026-08-05 (9)** — Batch 6: **ISPA deep mine** (Starlink 43.4%, VPN spend
  262k toman/mo, online shopping 57.1%, AI never-heard 37.6%, Rubika 60.3%,
  happiness 64.41/100). **«آنچه ایران می‌خواهد» leak** (Ara center survey
  May 2026: anger 63.6% world-record, reforms 53%, food difficulty >81%).
  **Censored vote-intention poll** (turnout ~30% predicted). Ethics chapter
  agent failed (503) — retry in batch 7. `INDEXES.md` ~320 rows.

- **2026-08-05 (10)** — Batch 7: **Wave-3 (1394) baseline** of the values
  survey compiled from the official 718-page report (~40 primary values:
  separation 30.7%, hijab agree 53.1%, pray 78.5%, trust gov 49.9%); report
  archived at `references/values-survey-wave3/`. **Per-capita GDP by
  province** (Bushehr 383M rials = 4.4× national; S&B lowest). **Ethics
  chapter**: 3rd agent attempt failed (503) — extracted headline item
  myself via vision (forgiveness/altruism prevalent 48.1%, n=15,878);
  remaining ethics tables (eth-04…16) rendered locally for later.
  `INDEXES.md` ~390 rows.
