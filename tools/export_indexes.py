#!/usr/bin/env python3
"""Export the complete source-backed statistic inventory for the index dashboard."""
from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path
from typing import Any

try:
    import yaml
except ImportError:
    print("FAIL: pyyaml is required (import yaml failed)", file=sys.stderr)
    raise SystemExit(2)


def load_yaml(path: Path) -> list[dict[str, Any]]:
    value = yaml.safe_load(path.read_text(encoding="utf-8")) or []
    if not isinstance(value, list) or any(not isinstance(row, dict) for row in value):
        raise ValueError(f"{path}: expected a YAML list of mappings")
    return value


def require_unique(rows: list[dict[str, Any]], label: str) -> dict[str, dict[str, Any]]:
    indexed: dict[str, dict[str, Any]] = {}
    for row in rows:
        item_id = row.get("id")
        if not isinstance(item_id, str) or not item_id:
            raise ValueError(f"{label}: every row needs a non-empty string id")
        if item_id in indexed:
            raise ValueError(f"{label}: duplicate id {item_id!r}")
        indexed[item_id] = row
    return indexed


def export(root: Path) -> tuple[Path, int, int, int]:
    data_dir = root / "data"
    sources = require_unique(load_yaml(data_dir / "sources.yaml"), "sources")
    stats = require_unique(load_yaml(data_dir / "stats.yaml"), "stats")
    questions = require_unique(load_yaml(data_dir / "questions.yaml"), "questions")

    used_by: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for question_id, question in questions.items():
        stat_ids = question.get("stat_ids") or []
        if not isinstance(stat_ids, list):
            raise ValueError(f"question {question_id!r}: stat_ids must be a list")
        for stat_id in stat_ids:
            if stat_id not in stats:
                raise ValueError(f"question {question_id!r}: missing stat FK {stat_id!r}")
            used_by[stat_id].append({
                "id": question_id,
                "category": question.get("category"),
            })

    rows: list[dict[str, Any]] = []
    for stat_id, stat in stats.items():
        source_id = stat.get("source_id")
        if source_id not in sources:
            raise ValueError(f"stat {stat_id!r}: missing source FK {source_id!r}")
        row = dict(stat)
        row["source"] = dict(sources[source_id])
        row["quiz_questions"] = used_by.get(stat_id, [])
        rows.append(row)

    payload = {
        "generated_from": ["data/sources.yaml", "data/stats.yaml", "data/questions.yaml"],
        "stats_count": len(rows),
        "sources_count": len(sources),
        "quiz_questions_count": len(questions),
        "quiz_referenced_count": sum(bool(row["quiz_questions"]) for row in rows),
        "rows": rows,
    }
    out_path = root / "web" / "indexes-data.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=False, default=str) + "\n", encoding="utf-8")
    return out_path, len(rows), len(sources), len(questions)


def main() -> None:
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parents[1]
    try:
        out_path, stats_count, sources_count, questions_count = export(root)
    except (OSError, ValueError, yaml.YAMLError) as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        raise SystemExit(1)
    print(f"exported {stats_count} stats from {sources_count} sources and {questions_count} questions -> {out_path}")


if __name__ == "__main__":
    main()
