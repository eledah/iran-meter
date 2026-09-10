#!/usr/bin/env python3
"""Plain-assert tests for scripts/validate.py. No pytest needed.

Run:  python3 tests/test_validate.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))

from validate import (  # noqa: E402
    check_answer_values,
    check_correct_index,
    check_difficulty,
    check_refs,
    find_duplicates,
    parse_leading_number,
    validate_all,
)


def good_sources():
    return [{"id": "src-a", "org": "Org A"}]


def good_stats():
    return [
        {"id": "stat-1", "source_id": "src-a", "value": 60.5, "unit": "percent"},
    ]


def good_questions():
    return [
        {
            "id": "q-1",
            "difficulty": 3,
            "stat_ids": ["stat-1"],
            "options": [
                {"label_en": "45%"},
                {"label_en": "60%"},
                {"label_en": "75%"},
                {"label_en": "85%"},
            ],
            "correct_index": 1,
        }
    ]


def test_good_fixture_passes():
    results = validate_all(good_sources(), good_stats(), good_questions())
    bad = {k: v["errors"] for k, v in results.items() if v["status"] == "FAIL"}
    assert not bad, "good fixture should pass all rules, got: %s" % (bad,)


def test_duplicate_ids_detected():
    stats = good_stats() + [
        {"id": "stat-1", "source_id": "src-a", "value": 10, "unit": "percent"}
    ]
    assert find_duplicates(stats) == ["stat-1"]
    results = validate_all(good_sources(), stats, good_questions())
    assert results["rule2-unique-ids"]["status"] == "FAIL"
    # duplicates in questions too
    qs = good_questions() + [dict(good_questions()[0])]
    assert find_duplicates(qs) == ["q-1"]


def test_bad_source_ref_detected():
    stats = [
        {"id": "stat-9", "source_id": "nope-missing", "value": 5, "unit": "percent"}
    ]
    errors = check_refs(good_sources(), stats, [])
    assert len(errors) == 1 and "nope-missing" in errors[0]
    # bad question -> stat ref
    qs = [dict(good_questions()[0], stat_ids=["ghost-stat"])]
    errors = check_refs(good_sources(), good_stats(), qs)
    assert len(errors) == 1 and "ghost-stat" in errors[0]


def test_bad_correct_index_detected():
    qs = [dict(good_questions()[0], correct_index=4)]  # only 4 options
    errors = check_correct_index(qs)
    assert len(errors) == 1 and "correct_index" in errors[0]
    qs = [dict(good_questions()[0], correct_index=-1)]
    assert len(check_correct_index(qs)) == 1
    assert check_correct_index(good_questions()) == []


def test_bad_difficulty_detected():
    for bad in (0, 6, "3", 2.5, True, None):
        qs = [dict(good_questions()[0], difficulty=bad)]
        errors = check_difficulty(qs)
        assert len(errors) == 1, "difficulty %r should fail" % (bad,)
    assert check_difficulty(good_questions()) == []


def test_answer_value_tolerance_and_fa_digits():
    by_id = {s["id"]: s for s in good_stats()}
    # correct option far from stat value -> error
    qs = [dict(good_questions()[0], correct_index=3)]  # "85%" vs 60.5
    errors, _ = check_answer_values(qs, by_id)
    assert len(errors) == 1
    # within tolerance -> no error
    qs = [dict(good_questions()[0], correct_index=1)]  # "60%" vs 60.5
    errors, _ = check_answer_values(qs, by_id)
    assert errors == []
    # fa-digit label -> warn only, never error
    qs = [
        dict(
            good_questions()[0],
            correct_index=0,
            options=[{"label_en": "x", "label_fa": "٪۴۵"}],
        )
    ]
    qs[0]["options"] = [{"label_en": "٪۴۵"}]
    errors, warnings = check_answer_values(qs, by_id)
    assert errors == [] and len(warnings) == 1
    assert parse_leading_number("٪۴۵") is None
    assert parse_leading_number("60%") == 60.0


TESTS = [
    test_good_fixture_passes,
    test_duplicate_ids_detected,
    test_bad_source_ref_detected,
    test_bad_correct_index_detected,
    test_bad_difficulty_detected,
    test_answer_value_tolerance_and_fa_digits,
]


def main():
    failed = 0
    for fn in TESTS:
        try:
            fn()
        except AssertionError as exc:
            failed += 1
            print("FAIL %s: %s" % (fn.__name__, exc))
        else:
            print("PASS %s" % fn.__name__)
    print("RESULT: %d/%d passed" % (len(TESTS) - failed, len(TESTS)))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
