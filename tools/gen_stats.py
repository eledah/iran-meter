#!/usr/bin/env python3
"""Generate data/stats.yaml from INDEXES.md — heuristic table parser with manual overrides."""
import re, unicodedata

SRC = "/root/workspace/iran-meter/INDEXES.md"
DST = "/root/workspace/iran-meter/data/stats.yaml"

lines = open(SRC, encoding="utf-8").read().splitlines()

# ---- section -> source map (by header/context matching) ----
def section_source(header, sub):
    h = (header + " " + sub).lower()
    if "census 2016" in h or ("statistical centre" in h and "census" in h): return "sci-census-2016"
    if "sci — recent" in h or "labor force survey" in h or "household income" in h or "gini" in h or "housing tenure" in h: return "sci-recent"
    if "world bank" in h: return "world-bank-iran"
    if "civil registration" in h or "vital stats" in h or "marriages" in sub.lower(): return "noc-register"
    if "central bank" in h or "inflation (urban" in h or "exchange rates" in h or "liquidity" in h: return "cbi-monetary"
    if h.startswith("itu") or "itu —" in h or "itu " in h: return "itu-ict"
    if "world values survey" in h or h.startswith("wvs"): return "wvs-wave7-2020"
    if h.startswith("ilo"): return "ilo-labor"
    if h.startswith("who"): return "who-health"
    if "unesco" in h: return "unesco-uis"
    if h.startswith("imf"): return "imf-weo"
    if "censorship" in h or "vpn" in h: return "censorship-vpn"
    if "1402" in h and ("religiosity" in h or "دین" in h or "ارزش" in h or "values" in h): return "values-survey-1402"
    if "other leaked" in h or "economic chapter" in h or "politics chapter" in h or "trust & social" in h or "family chapter" in h or "identity chapter" in h or "social harms" in h or "ethics" in h: return "values-survey-1402"
    if "what iran wants" in h or "آنچه ایران می" in h: return "what-iran-wants-2026"
    if "vote-intention" in h or "vote" in h: return "vote-poll-2024"
    if "public polls" in h: return "vote-poll-2024"
    if "provincial" in h: return "sci-recent"
    if "per-capita gdp" in h: return "sci-regional-accounts"
    if "wave 3" in h or "1394" in h: return "values-survey-1394"
    if "ispa" in h: return "ispa-digital-2026"
    return "misc"

current_h2 = ""
current_sub = ""
# track sub-context bold lines like **Labor Force Survey ...**
records = []  # (index, value, unit, ref, report, extra, conf)
contexts = []  # parallel: (h2, sub)

def conf_default(h2):
    h = h2.lower()
    if "census" in h: return "primary"
    if "world bank" in h: return "primary"
    if "itu" in h: return "primary"
    if "wvs" in h or "world values" in h: return "academic"
    if "ilo" in h: return "primary"
    if "who" in h: return "primary"
    if "unesco" in h: return "primary"
    if "imf" in h: return "primary"
    return "news"

for ln in lines:
    m = re.match(r"^##\s+(.*)", ln)
    if m:
        current_h2 = m.group(1).strip()
        current_sub = ""
        continue
    m2 = re.match(r"^\*\*(.+)\*\*:?\s*$", ln.strip())
    if m2 and len(ln.strip()) < 160:
        current_sub = m2.group(1).strip()
        continue
    s = ln.strip()
    if not s.startswith("|"): continue
    cells = [c.strip() for c in s.strip().strip("|").split("|")]
    if not cells: continue
    # skip separators and headers
    if all(re.match(r"^:?-{2,}:?$", c) for c in cells if c): continue
    if cells[0].lower() in ("index", "province/scope"): continue
    if len(cells) < 3: continue
    records.append(cells)
    contexts.append((current_h2, current_sub))

print(f"parsed {len(records)} candidate rows")

# ---- helpers ----
def slug(s):
    s = unicodedata.normalize("NFKD", s)
    s = s.encode("ascii", "ignore").decode()
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    s = re.sub(r"-{2,}", "-", s)
    return s[:60].strip("-") or "stat"

def norm_unit(u):
    u = (u or "").lower()
    if "%" in u or "percent" in u: return "percent"
    if "trillion toman" in u: return "trillion_toman"
    if "m toman/yr" in u: return "million_toman_per_year"
    if "bn toman" in u: return "billion_toman"
    if "thousand rials" in u: return "thousand_rials"
    if "m rials" in u: return "million_rials"
    if "m toman" in u: return "million_toman"
    if "million" in u and ("toman" in u or "irr" in u or "rials" in u): return "million_toman" if "toman" in u else "million_irr"
    if "million" in u: return "million_persons"
    if "persons" in u or "events" in u or "children" in u or "domains" in u or "subs" in u: return "count"
    if "households" in u: return "count_households"
    if "year" in u and ("school" in u or "age" in u or "old" in u): return "years"
    if "years" in u or u.strip() in ("years",): return "years"
    if "hours" in u or "h:m" in u: return "hours"
    if "men per" in u: return "men_per_100_women"
    if "per 100" in u: return "per_100"
    if "per 1,000" in u or "per 1000" in u: return "per_1000"
    if "per 100k" in u: return "per_100k"
    if "per 10,000" in u or "per 10000" in u: return "per_10000"
    if "irr" in u or "toman" in u or "rials" in u: return "irr"
    if "usd" in u or "intl $" in u or "usd bn" in u: return "usd"
    if "index" in u or "score" in u or "/100" in u or "mean" in u: return "index"
    if "ratio" in u or "×" in u or "men per" in u: return "ratio"
    if "pp" in u: return "pp"
    if "l pure" in u or "l " in u: return "liters"
    if u.strip() in ("—", "-", ""): return "none"
    return "other"

def norm_conf(c, h2):
    c = (c or "").lower()
    if "primary" in c: return "primary"
    if "academic" in c: return "academic"
    if "estimate" in c: return "estimate"
    if "leak" in c: return "leak"
    if "citable" in c: return "citable-page"
    if "news" in c: return "news"
    if "not-found" in c or c.strip() in ("n/a",): return "not-found"
    return conf_default(h2)

def norm_year(ref):
    ref = (ref or "").strip()
    if not ref or ref in ("—", "-"): return None
    m = re.search(r"1405|1404|1403|1402|1401|1400|1399|1394|1382|1379", ref)
    if m: return m.group(0)
    m = re.search(r"(19|20)\d{2}", ref)
    if m: return m.group(0)
    return ref[:24]

def scope_of(index, unit):
    t = (index + " " + unit).lower()
    if "urban" in t and "rural" in t: return "urban+rural-split"
    if "urban" in t: return "urban"
    if "rural" in t: return "rural"
    if "tehran" in t or "province" in t or " / " in index and any(p in t for p in ["ilam","khorasan","gilan","qom","bushehr","sistan"]): return "by-province"
    return "national"

def parse_num(v):
    v = v.replace(",", "").replace("٬", "")
    v = v.replace("−", "-").replace("–", "-").replace("—", "-")
    m = re.search(r"-?\d+(\.\d+)?", v)
    return float(m.group(0)) if m else None

def fmt_num(f):
    if f is None: return "null"
    return repr(int(f)) if f == int(f) else repr(f)

SKIP_VALS = {"not found", "no data"}
out = []
used_ids = set()
skipped = []

def add_row(sid_base, name_en, value, unit, year, scope, source_id, confidence, notes):
    global used_ids
    sid = slug(sid_base)
    if not sid: sid = "stat"
    base = sid; i = 2
    while sid in used_ids:
        sid = f"{base}-{i}"; i += 1
    used_ids.add(sid)
    out.append(dict(id=sid, name_en=name_en, value=value, unit=unit,
                    year=year, scope=scope, source_id=source_id,
                    confidence=confidence, notes=notes))

# Labels for split parts (men/women, urban/rural, etc.)
def split_labels(index):
    t = index.lower()
    if "men / women" in t or "— men" in t or "male / female" in t or "female / male" in t or re.search(r"\(m\b.*f\b", t):
        fem_first = "female / male" in t or t.startswith("internet use — female")
        return ["men", "women"] if not fem_first else ["women", "men"]
    if "urban / rural" in t or "urban/rural" in t: return ["urban", "rural"]
    if "rural / urban" in t: return ["rural", "urban"]
    if "free / paid" in t: return ["free", "paid"]
    if "services/industry/agriculture" in t or "sector shares" in t: return ["services", "industry", "agriculture"]
    if "top 20%" in t or "bottom 20%" in t: return None
    if "agree / oppose / neither" in t or "agree / disagree / neither" in t: return ["agree", "disagree", "neither"]
    if "no problem / opposed" in t: return ["no-problem", "opposed-no-interference", "admonish"]
    if "always/mostly / never" in t or "/ never" in t: return ["always-mostly", "never"]
    if "better than" in t and "worse" in t: return ["better", "worse"]
    if "improvement" in t and "worsening" in t: return ["improve", "worsen"]
    if "high/very-high" in t or "high + very high" in t or "high/very high" in t: return None
    return None

for cells, (h2, sub) in zip(records, contexts):
    # normalize columns: most tables: Index|Value|Unit|Ref|Report|Source|[Conf]
    idx, val = cells[0], cells[1] if len(cells) > 1 else ""
    unit = cells[2] if len(cells) > 2 else ""
    ref = cells[3] if len(cells) > 3 else ""
    report = cells[4] if len(cells) > 4 else ""
    extra = "; ".join(cells[5:]) if len(cells) > 5 else ""
    conf_raw = cells[6] if len(cells) > 6 else extra
    prov = ""
    # Provincial contrasts + per-capita-GDP tables have a shifted layout:
    # Index|Value|Unit|Provinces|Ref period|Source|Conf — remap cols 3..6
    if (h2.lower().startswith("provincial") or "per-capita gdp by province" in h2.lower()) and len(cells) >= 5:
        unit = cells[2]; prov = cells[3]; ref = cells[4]; report = ""
        extra = "; ".join(cells[5:]); conf_raw = cells[6] if len(cells) > 6 else ""
    if len(cells) <= 5: conf_raw = ""
    vl = val.strip().lower()
    if vl in SKIP_VALS or vl in ("—", "-", "") or val.strip().startswith("—"):
        skipped.append((idx, val, "no value")); continue
    if "waitlist" in idx.lower():
        skipped.append((idx, val, "waitlist")); continue
    src = section_source(h2, sub + " " + idx)
    # special-case source overrides
    li = idx.lower()
    if "ispa" in li or "ai " in li and "sep 2025" in ref: pass
    if "sci inflation" in li or "sciri" in extra.lower(): src = "sci-recent"
    if "imf" in li and "context" in li: src = "imf-weo"
    if "poverty rate" in li and ("sistan" in li or "sistan" in prov.lower()): src = "sci-recent"
    if "gdp share" in li or "gdp (current)" in li and "tehran" in li: src = "sci-recent"
    if "unemployment (winter" in li: src = "sci-recent"
    if "population growth 2011" in li or "shrinking provinces" in li or "sex ratio" in li: src = "sci-census-2016"
    if "population estimate" in li and "1405" in ref: src = "sci-recent"
    if "values wave 4" in li or "property is not safe" in li: src = "values-survey-1402"
    if "mois" in li or "ministry of intelligence" in li or "raisi approval" in li or "irib polling" in li or "irib/irna" in li or "definitely will vote" in li or "comfort/calm" in li or "income satisfaction" in li: src = "vote-poll-2024"
    if "ispa turnout" in li: src = "ispa"
    if "happiness index" in li: src = "ispa"
    if "telegram use men" in li or "rubika baseline" in li or "rubika growth" in li: src = "ispa"
    if "starlink" in li or "vpn users: free" in li or "online shopping" in li or "ride-hailing" in li or "online education" in li or "income highly dependent" in li or "ai:" in li or "chatgpt" in li or "ai use" in li or "ai users" in li or "high trust in ai" in li or "rubika popularity" in li or "instagram: %" in li or "speed = #1" in li: src = "ispa-digital-2026"
    if "instagram users" in li or "telegram users" in li or "whatsapp" in li or "eitaa" in li or "bale users" in li or "rubika users" in li or "use ≥1" in li or "avg daily social" in li or "no social-media" in li or "irib as main" in li or "social networks as main" in li or "preferred investment" in li: src = "ispa"
    if "vpn" in li and "2026" in ref: src = "ispa-digital-2026"
    if "vpn" in li and "2024" in ref and "iprc" in li: src = "censorship-vpn"
    if "internet penetration (15+)" in li: src = "ispa-digital-2026"
    if "trust in the press" in li or "trust in television" in li or "importance of family" in li or "importance of work" in li or "tv news" in li or "internet as daily" in li or "daily newspaper" in li or "pray several" in li or "pray at least" in li or "never pray" in li and "2020" in ref and "q17" in li.lower(): src = "wvs-wave7-2020"
    if cells[0].startswith("Pray") or cells[0].startswith("Attend") or cells[0].startswith("Trust in the press") or cells[0].startswith("Trust in television") or cells[0].startswith("Importance of") or cells[0].startswith("TV news") or cells[0].startswith("Internet as daily") or cells[0].startswith("Daily newspaper"):
        # these are under WVS additional values header
        if "wvs" in h2.lower() or "wvs" in sub.lower() or h2.startswith("WVS"):
            src = "wvs-wave7-2020"
    if "full ch.8 pdf" in li: skipped.append((idx, val, "link-only, no value")); continue
    if "breakdown: very low" in li:
        # expand breakdown into 5 rows
        parts = re.findall(r"(very low|low|med|high|very high)\s+([\d.]+)", val + " " + idx)
        # idx contains the breakdown; parse from idx
        m2 = re.findall(r"(very low|low|high|very high|med)\s+([\d.]+)", idx)
        for lab, num in m2:
            add_row(f"ethics-forgiveness-{slug(lab)}-1402", f"Forgiveness/altruism among people: {lab} (1402 ethics ch.)",
                    float(num), "percent", "1402", "national", "values-survey-1402", "leak",
                    "Breakdown from ethics ch. Table 1; visually verified")
        continue
    conf = norm_conf(conf_raw if len(cells) > 6 else (extra if any(k in extra.lower() for k in ["primary","news","leak","academic","estimate","citable"]) else ""), h2)
    year = norm_year(ref)
    if prov and not year:
        year = norm_year(report)
    unit_n = norm_unit(unit)
    scope = scope_of(idx, unit)
    if prov and "/" not in prov:
        scope = "by-province"  # single-province max/min row, e.g. GDP share Tehran
    notes_bits = []
    if sub: notes_bits.append(sub[:140])
    if report: notes_bits.append(f"reported {report[:60]}")
    if extra: notes_bits.append(extra[:160])
    # methodology caveats
    if "tenure methodology differs" in (h2+sub).lower() or "tenure" in li: notes_bits.append("Tenure methodology differs from census 2016")
    if "sci vs cbi" in li or "cross-check" in li: notes_bits.append("SCI vs CBI inflation differ; kept separate")
    if "misleading" in extra.lower() or "divorce per 100" in li: notes_bits.append("ثبت احوال warns this ratio is misleading")
    if "headline errs" in extra.lower() or "headline" in extra.lower(): notes_bits.append(extra[:160])
    if "conflict" in extra.lower(): notes_bits.append("Conflicting provincial figures reported elsewhere: " + extra[:160])
    if "wartime" in (h2+sub+extra).lower(): notes_bits.append("Collected during/after wartime period incl. internet outage")
    if "world's highest" in extra.lower() or "gallup" in extra.lower(): notes_bits.append("Reported as world's highest ever vs Gallup record 47% (Chad)")
    if val.strip().startswith("~") or val.strip().startswith(">") or val.strip().startswith("<") or val.strip().startswith("≈"): notes_bits.append(f"Approximate as reported: {val.strip()}")
    notes = "; ".join(notes_bits)[:400]
    if "14.68m / 597k" in val.lower().replace(" ", ""):
        add_row(f"{slug(idx)}-tehran-{year or 'na'}", f"{idx} — Tehran", 14.68, "million_persons", year, "by-province", src, conf, notes + f"; raw value: {val.strip()}")
        add_row(f"{slug(idx)}-ilam-{year or 'na'}", f"{idx} — Ilam", 0.597, "million_persons", year, "by-province", src, conf, notes + "; 597k converted to 0.597M for unit consistency")
        continue
    if "ispa turnout (nov 2023)" in li:
        m2 = re.findall(r"([\d.]+)", idx)
        if len(m2) >= 2:
            add_row("ispa-turnout-definitely-2023-11", "ISPA turnout Nov 2023: definitely will vote", float(m2[0]), "percent", "2023", "national", "ispa", conf, notes + "; Nov 2023 ISPA public poll")
            add_row("ispa-turnout-wont-vote-2023-11", "ISPA turnout Nov 2023: won't vote", float(m2[1]), "percent", "2023", "national", "ispa", conf, notes + "; Nov 2023 ISPA public poll")
            continue

    # Split handling for "/" values
    if "/" in val and not re.search(r"\d{4}/\d", val) and "per " not in val.lower().split("/")[0][-12:]:
        # check it's a numeric split
        chunks = [c.strip() for c in val.split("/")]
        nums = [parse_num(c) for c in chunks]
        if all(n is not None for n in nums) and len(nums) >= 2 and len(nums) <= 4:
            labels = split_labels(idx)
            # province max/min splits (shifted tables): provinces live in prov col
            if labels is None and prov and "/" in prov:
                pp = [p.strip() for p in prov.split("/")]
                iu = norm_unit(idx)
                ru = norm_unit(unit)
                if ru in ("other", "none"):
                    ru = iu if iu not in ("other", "none") else ("count" if max(nums) > 1000 else "percent")
                for n, p in zip(nums, pp):
                    add_row(f"{slug(idx)}-{slug(p)}-{year or 'na'}", f"{idx} — {p}",
                            n, ru, year, "by-province", src, conf,
                            (notes + f"; max/min pair as reported: {prov}; raw value: {val.strip()}").strip("; "))
                continue
            if labels is None and ("max / min" in idx or re.search(r"/\s*[\d.]+\s*(persons|%|%|million)", val) and any(p in idx for p in ["Tehran","Ilam","Sistan","Qom","Khorasan","Gilan","Bushehr","Hamedan"])):
                # province pair: derive from Provinces col = unit position in these tables
                provs = [c.strip() for c in unit.split("/")]
                unit_real = ref  # in provincial table cols shift: Value|Unit=provinces|Provinces col=ref...
                # Actually provincial table: Index|Value|Unit=Provinces(max/min)|Ref period|Source|Conf
                # so unit var holds provinces, ref holds period
                ul = unit
                # split provinces
                pp = [p.strip() for p in ul.split("/")]
                uu = "persons" if "person" in val.lower() or int(nums[0]) > 1000 else "percent"
                # figure real unit from index
                iu = norm_unit(idx)
                real_unit = iu if iu not in ("other","none") else ("persons" if max(nums) > 1000 else "percent")
                for n, p in zip(nums, pp):
                    add_row(f"{slug(idx)}-{slug(p)}-{year or '2016'}", f"{idx} — {p}",
                            n, real_unit, year, "by-province", src, conf, notes + f"; max/min pair: {ul}")
                continue
            if labels is None:
                # generic split: use unit-column side labels when they look like names
                # (provincial max/min tables put "Tehran / Ilam" in the unit col)
                ulab = [slug(p) for p in unit.split("/")]
                if len(ulab) == len(nums) and all(len(p) > 1 and not re.search(r"\d", p) for p in ulab):
                    labels = ulab
                else:
                    labels = [f"part{i+1}" for i in range(len(nums))]
            # special: GDP per capita Gilan/Mazandaran pair (provinces in prov col)
            if "gilan" in li or "mazandaran" in li or "gilan" in prov.lower():
                labels = ["gilan-rank18", "mazandaran-rank10"]
            if "bushehr / sistan" in li:
                labels = ["bushehr", "sistan-baluchestan"]
            if "capitals / other cities / rural" in li:
                labels = ["capitals", "other-cities", "rural"]
            if "15-29 / 30-49 / 50+" in li:
                labels = ["age-15-29", "age-30-49", "age-50-plus"]
            if "m 19.3" in val.lower() or ("m " in val and " f " in val):
                # youth unemployment with M/F detail — main + splits
                main = parse_num(val)
                add_row(f"{slug(idx)}-{year or 'x'}", idx, main, unit_n, year, "national", src, conf, notes + "; headline; gender split in sub-rows")
                for mm in re.finditer(r"\b([MF])\s+([\d.]+)", val):
                    gl = "men" if mm.group(1) == "M" else "women"
                    add_row(f"{slug(idx)}-{gl}-{year or 'x'}", f"{idx} — {gl}", float(mm.group(2)), unit_n, year, "national", src, conf, notes)
                continue
            for n, lab in zip(nums, labels):
                sc = scope
                if lab in ("urban","rural"): sc = lab
                if lab in ("men","women"): sc = "national"
                add_row(f"{slug(idx)}-{slug(lab)}-{year or 'na'}", f"{idx} — {lab}", n, unit_n, year, sc, src, conf, notes)
            continue
    # "→" trend values: take latest + note
    if "→" in val:
        parts = [p.strip() for p in val.split("→")]
        nums = [parse_num(p) for p in parts]
        nums = [n for n in nums if n is not None]
        if nums:
            add_row(f"{slug(idx)}-{year or 'na'}", idx, nums[-1], unit_n, year, scope, src, conf,
                    notes + f"; trend as reported: {val.strip()}")
            continue
    # "·" multi-year (FH scores): split
    if "·" in val and parse_num(val) is not None:
        segs = [s.strip() for s in val.split("·")]
        for s in segs:
            n = parse_num(s)
            ym = re.search(r"\((\d{4})\)", s)
            yy = ym.group(1) if ym else year
            add_row(f"{slug(idx)}-{yy}", f"{idx} ({s})", n, unit_n, yy, scope, src, conf, notes)
        continue
    # range "a–b" or "a-b" with single concept: keep midpoint? No — keep as null with note? Use first number + note.
    n = parse_num(val)
    if n is None:
        skipped.append((idx, val, "unparseable")); continue
    # range detection: keep single row with note
    if re.search(r"\d\s*[–-]\s*\d", val) and "/" not in val:
        notes = (notes + f"; range as reported: {val.strip()} (kept lower/primary)").strip("; ")
    # hours h:m conversion
    if re.match(r"^\d+\s*h\s*\d+", val):
        m = re.match(r"(\d+)\s*h\s*(\d+)", val)
        n = int(m.group(1)) + int(m.group(2)) / 60.0
        n = round(n, 3)
        unit_n = "hours"
    # percent-ish large IRR values with M toman etc already handled
    # scale: "M toman/yr", "trillion toman", "bn toman", "thousand rials", "M rials"
    COUNTYEAR = ""
    vraw = val.replace(",", "")
    if re.search(r"\d", vraw):
        if "trillion toman" in unit.lower():
            n = parse_num(vraw); unit_n = "trillion_toman"
        elif "m toman/yr" in unit.lower() or "m toman" in unit.lower():
            n = parse_num(vraw); unit_n = "million_toman_per_year"
        elif "bn toman" in unit.lower():
            n = parse_num(vraw); unit_n = "billion_toman"
        elif "thousand rials" in unit.lower():
            n = parse_num(vraw); unit_n = "thousand_rials"
        elif re.search(r"\bm rials\b", unit.lower()):
            n = parse_num(vraw); unit_n = "million_rials"
        elif "irr per usd" in unit.lower() or "irr/month" in unit.lower():
            n = parse_num(vraw)
            unit_n = "irr_per_usd" if "per usd" in unit.lower() else "irr_per_month"
        elif "usd bn" in unit.lower():
            n = parse_num(vraw); unit_n = "usd_billion"
        elif "million" in unit.lower() and n is not None and n < 1000:
            unit_n = "million_persons"
    disp_name = idx if not (prov and "/" not in prov) else f"{idx} — {prov.strip()}"
    base_id = f"{slug(disp_name)}-{year or 'na'}"
    # disambiguate scope in id
    if scope in ("urban", "rural"):
        base_id = f"{slug(idx)}-{scope}-{year or 'na'}"
    if prov and "/" not in prov:
        notes = (notes + f"; province: {prov.strip()}").strip("; ")
    add_row(base_id, disp_name, n if not isinstance(n, float) or True else n, unit_n, year, scope, src, conf, notes)

print(f"rows: {len(out)}, skipped: {len(skipped)}")
for s in skipped: print("SKIP:", s)

# ---- emit YAML manually ----
def yq(s):
    if s is None: return "null"
    if isinstance(s, (int, float)): return fmt_num(float(s))
    s = str(s)
    if s == "": return "''"
    if re.search(r"[:#\[\]{},&*!|>'\"%@`]", s) or s != s.strip() or "\n" in s:
        return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'
    return s

with open(DST, "w", encoding="utf-8") as f:
    f.write("# Iran-meter stats — generated from INDEXES.md (see generator: tools/gen_stats.py)\n")
    f.write(f"# rows: {len(out)}\n")
    for r in out:
        f.write(f"- id: {r['id']}\n")
        f.write(f"  source_id: {r['source_id']}\n")
        f.write(f"  name_en: {yq(r['name_en'])}\n")
        f.write(f"  value: {yq(r['value'])}\n")
        f.write(f"  unit: {r['unit']}\n")
        f.write(f"  year: {yq(r['year'])}\n")
        f.write(f"  scope: {r['scope']}\n")
        f.write(f"  confidence: {r['confidence']}\n")
        f.write(f"  notes: {yq(r['notes'])}\n")
print("wrote", DST)
