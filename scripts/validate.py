#!/usr/bin/env python3
"""Validate iran-meter YAML data files against DATA_MODEL.md rules.

Rules (DATA_MODEL.md "Validation"):
  1. YAML parses.
  2. ids unique within each file.
  3. Every stat.source_id exists in sources;
     every question.stat_ids entry exists in stats.
  4. correct_index < len(options).
  5. Correct option's numeric value is within tolerance of the referenced
     stat value (leading number parsed from the option label; tolerance 2.0
     for percents; fa-digit labels warn only, never fail).
  6. difficulty is an int in [1, 5].

Usage:
    python3 scripts/validate.py [data_dir]

Prints PASS/FAIL per rule with counts; exit 0 iff all rules pass
(warnings never affect the exit code). Only stdlib + pyyaml.
"""

import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:  # pragma: no cover
    print("FAIL: pyyaml is required (import yaml failed)", file=sys.stderr)
    sys.exit(2)

# Tolerance for rule 5 on percent-unit stats (absolute points).
PERCENT_TOLERANCE = 2.0
# Relative tolerance for non-percent units (fraction of stat value).
RELATIVE_TOLERANCE = 0.02

FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩"
FA_DIGIT_SET = set(FA_DIGITS)

_LEADING_NUM_RE = re.compile(r"[+-]?[\d,]*\.?\d+")


def contains_fa_digits(text):
    """True if text contains any Persian/Arabic-Indic digit."""
    return any(ch in FA_DIGIT_SET for ch in str(text))


def parse_leading_number(label):
    """Parse the leading arabic-numeral number from an option label.

    Returns the float value, or None if no parseable number is present.
    Labels containing Persian/Arabic-Indic digits return None (caller
    should warn, not fail).
    """
    if label is None:
        return None
    text = str(label).strip()
    if not text or contains_fa_digits(text):
        return None
    # Search anywhere (labels like "~54%" or "about 60 percent" still match).
    match = _LEADING_NUM_RE.search(text.replace(",", ""))
    if not match:
        return None
    try:
        return float(match.group(0))
    except ValueError:
        return None


def find_duplicates(rows):
    """Return a sorted list of ids appearing more than once in rows."""
    seen = set()
    dupes = set()
    for row in rows or []:
        if not isinstance(row, dict):
            continue
        rid = row.get("id")
        if rid in seen:
            dupes.add(rid)
        seen.add(rid)
    return sorted(dupes, key=str)


def _option_label(option):
    if not isinstance(option, dict):
        return None
    return option.get("label_en", option.get("label"))


def check_refs(sources, stats, questions):
    """Rule 3: stat.source_id in sources; question.stat_ids in stats."""
    errors = []
    source_ids = {s.get("id") for s in sources or [] if isinstance(s, dict)}
    stat_ids = {s.get("id") for s in stats or [] if isinstance(s, dict)}
    for st in stats or []:
        if not isinstance(st, dict):
            continue
        sid = st.get("source_id")
        if sid not in source_ids:
            errors.append(
                "stat %r: source_id %r not found in sources" % (st.get("id"), sid)
            )
    for q in questions or []:
        if not isinstance(q, dict):
            continue
        for ref in q.get("stat_ids") or []:
            if ref not in stat_ids:
                errors.append(
                    "question %r: stat_id %r not found in stats" % (q.get("id"), ref)
                )
    return errors


def check_correct_index(questions):
    """Rule 4: correct_index is a valid 0-based index into options."""
    errors = []
    for q in questions or []:
        if not isinstance(q, dict):
            continue
        qid = q.get("id")
        options = q.get("options") or []
        ci = q.get("correct_index")
        if not isinstance(options, list) or len(options) == 0:
            errors.append("question %r: options is empty/missing" % (qid,))
            continue
        if isinstance(ci, bool) or not isinstance(ci, int):
            errors.append("question %r: correct_index %r is not an int" % (qid, ci))
        elif ci < 0 or ci >= len(options):
            errors.append(
                "question %r: correct_index %r out of range (options=%d)"
                % (qid, ci, len(options))
            )
    return errors


def check_answer_values(questions, stats_by_id):
    """Rule 5: correct option numeric value ~= referenced stat value.

    Only single-stat questions are checked (multi-stat comparison questions
    have no single answer value). Unparseable or fa-digit labels produce
    warnings, never errors.
    """
    errors = []
    warnings = []
    for q in questions or []:
        if not isinstance(q, dict):
            continue
        qid = q.get("id")
        stat_ids = q.get("stat_ids") or []
        if len(stat_ids) != 1:
            continue  # comparison/multi-stat question: nothing to check
        stat = stats_by_id.get(stat_ids[0])
        if stat is None:
            continue  # broken ref already reported by rule 3
        options = q.get("options") or []
        ci = q.get("correct_index")
        if (
            not isinstance(options, list)
            or isinstance(ci, bool)
            or not isinstance(ci, int)
            or ci < 0
            or ci >= len(options)
        ):
            continue  # broken index already reported by rule 4
        label = _option_label(options[ci])
        if label is not None and contains_fa_digits(label):
            warnings.append(
                "question %r: fa-digit label %r skipped (warn only)" % (qid, label)
            )
            continue
        num = parse_leading_number(label)
        if num is None:
            warnings.append(
                "question %r: correct option label %r has no parseable number"
                % (qid, label)
            )
            continue
        try:
            stat_val = float(stat.get("value"))
        except (TypeError, ValueError):
            warnings.append(
                "question %r: stat %r value %r is not numeric"
                % (qid, stat_ids[0], stat.get("value"))
            )
            continue
        unit = str(stat.get("unit") or "")
        if unit == "percent":
            ok = abs(num - stat_val) <= PERCENT_TOLERANCE
            detail = "|%s - %s| = %.3g > %.3g" % (num, stat_val, abs(num - stat_val), PERCENT_TOLERANCE)
        else:
            tol = max(PERCENT_TOLERANCE, abs(stat_val) * RELATIVE_TOLERANCE)
            ok = abs(num - stat_val) <= tol
            detail = "|%s - %s| = %.3g > %.3g (rel 2%%)" % (
                num, stat_val, abs(num - stat_val), tol)
        if not ok:
            errors.append(
                "question %r: correct option %r (%s) far from stat %r value %s [%s]: %s"
                % (qid, label, num, stat_ids[0], stat_val, unit, detail)
            )
    return errors, warnings


def check_difficulty(questions):
    """Rule 6: difficulty is an int in [1, 5]."""
    errors = []
    for q in questions or []:
        if not isinstance(q, dict):
            continue
        d = q.get("difficulty")
        if isinstance(d, bool) or not isinstance(d, int) or not 1 <= d <= 5:
            errors.append(
                "question %r: difficulty %r is not an int in [1, 5]" % (q.get("id"), d)
            )
    return errors


def validate_all(sources, stats, questions):
    """Run rules 2-6 on in-memory data.

    Returns a dict: rule name -> {"status": "PASS"|"FAIL"|"SKIP",
    "errors": [...], "warnings": [...]}.
    Rule 1 (YAML parses) is handled by the file loader in main().
    """
    results = {}

    dup_src = find_duplicates(sources)
    dup_stat = find_duplicates(stats)
    dup_q = find_duplicates(questions)
    dup_errors = (
        ["sources duplicate id: %r" % i for i in dup_src]
        + ["stats duplicate id: %r" % i for i in dup_stat]
        + ["questions duplicate id: %r" % i for i in dup_q]
    )
    results["rule2-unique-ids"] = {
        "status": "FAIL" if dup_errors else "PASS",
        "errors": dup_errors,
        "warnings": [],
    }

    ref_errors = check_refs(sources, stats, questions)
    results["rule3-refs"] = {
        "status": "FAIL" if ref_errors else "PASS",
        "errors": ref_errors,
        "warnings": [],
    }

    if questions is None:
        for rule in ("rule4-correct-index", "rule5-answer-value", "rule6-difficulty"):
            results[rule] = {"status": "SKIP", "errors": [], "warnings": []}
        return results

    ci_errors = check_correct_index(questions)
    results["rule4-correct-index"] = {
        "status": "FAIL" if ci_errors else "PASS",
        "errors": ci_errors,
        "warnings": [],
    }

    stats_by_id = {
        s.get("id"): s for s in stats or [] if isinstance(s, dict)
    }
    av_errors, av_warnings = check_answer_values(questions, stats_by_id)
    results["rule5-answer-value"] = {
        "status": "FAIL" if av_errors else "PASS",
        "errors": av_errors,
        "warnings": av_warnings,
    }

    diff_errors = check_difficulty(questions)
    results["rule6-difficulty"] = {
        "status": "FAIL" if diff_errors else "PASS",
        "errors": diff_errors,
        "warnings": [],
    }
    return results


def load_yaml_file(path):
    """Return (data, error). error is None on success."""
    try:
        with open(path, encoding="utf-8") as fh:
            return yaml.safe_load(fh), None
    except FileNotFoundError:
        return None, "file not found: %s" % path
    except yaml.YAMLError as exc:
        return None, "YAML parse error in %s: %s" % (path, exc)
    except OSError as exc:
        return None, "cannot read %s: %s" % (path, exc)


def main(argv=None):
    argv = argv if argv is not None else sys.argv[1:]
    data_dir = Path(argv[0]) if argv else Path(__file__).resolve().parents[1] / "data"
    files = {
        "sources": data_dir / "sources.yaml",
        "stats": data_dir / "stats.yaml",
        "questions": data_dir / "questions.yaml",
    }

    overall_fail = False

    # Rule 1: YAML parses.
    data = {}
    rule1_errors = []
    for key, path in files.items():
        if key == "questions" and not path.exists():
            data[key] = None  # optional until the quiz bank lands
            continue
        loaded, err = load_yaml_file(path)
        if err is not None:
            rule1_errors.append(err)
            data[key] = []
        else:
            data[key] = loaded if loaded is not None else []
    if rule1_errors:
        print("RULE 1 (yaml-parses): FAIL (%d/%d files failed)" % (len(rule1_errors), len(files)))
        for err in rule1_errors:
            print("  FAIL: %s" % err)
        overall_fail = True
    else:
        n = sum(len(data[k]) if isinstance(data.get(k), list) else 0 for k in ("sources", "stats"))
        nq = "?" if data["questions"] is None else len(data["questions"])
        print("RULE 1 (yaml-parses): PASS (sources=%d stats=%d questions=%s)"
              % (len(data["sources"]), len(data["stats"]), nq))

    for key in ("sources", "stats"):
        if not isinstance(data[key], list):
            print("RULE 1 (yaml-parses): FAIL (%s.yaml top level is %s, want a list)"
                  % (key, type(data[key]).__name__))
            overall_fail = True
            data[key] = []
    if data["questions"] is not None and not isinstance(data["questions"], list):
        print("RULE 1 (yaml-parses): FAIL (questions.yaml top level is %s, want a list)"
              % type(data["questions"]).__name__)
        overall_fail = True
        data["questions"] = []

    if data["questions"] is None:
        print("questions.yaml: not present yet — question rules SKIP")

    results = validate_all(data["sources"], data["stats"], data["questions"])

    labels = {
        "rule2-unique-ids": "RULE 2 (unique-ids)",
        "rule3-refs": "RULE 3 (refs)",
        "rule4-correct-index": "RULE 4 (correct-index)",
        "rule5-answer-value": "RULE 5 (answer-value)",
        "rule6-difficulty": "RULE 6 (difficulty)",
    }
    counts = {
        "rule2-unique-ids": lambda: "sources=%d stats=%d questions=%s" % (
            len(data["sources"]), len(data["stats"]),
            "?" if data["questions"] is None else len(data["questions"])),
        "rule3-refs": lambda: "stats=%d questions=%s" % (
            len(data["stats"]),
            "?" if data["questions"] is None else len(data["questions"])),
        "rule4-correct-index": lambda: "questions=%s" % (
            "?" if data["questions"] is None else len(data["questions"])),
        "rule5-answer-value": lambda: "questions=%s" % (
            "?" if data["questions"] is None else len(data["questions"])),
        "rule6-difficulty": lambda: "questions=%s" % (
            "?" if data["questions"] is None else len(data["questions"])),
    }
    for rule, label in labels.items():
        res = results[rule]
        status = res["status"]
        print("%s: %s (%s, errors=%d warnings=%d)"
              % (label, status, counts[rule](), len(res["errors"]), len(res["warnings"])))
        for err in res["errors"][:20]:
            print("  FAIL: %s" % err)
        if len(res["errors"]) > 20:
            print("  ... and %d more errors" % (len(res["errors"]) - 20))
        for warn in res["warnings"][:10]:
            print("  WARN: %s" % warn)
        if len(res["warnings"]) > 10:
            print("  ... and %d more warnings" % (len(res["warnings"]) - 10))
        if status == "FAIL":
            overall_fail = True

    print("RESULT: %s" % ("FAIL" if overall_fail else "PASS"))
    return 1 if overall_fail else 0


if __name__ == "__main__":
    sys.exit(main())
