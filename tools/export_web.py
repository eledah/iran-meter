#!/usr/bin/env python3
"""Export iran-meter YAML data to web/app-data.json for the static quiz app.

Reads data/sources.yaml, data/stats.yaml, data/questions.yaml and writes
web/app-data.json: questions joined with their answer stat values, plus
sources indexed by id. Only stdlib + pyyaml.

Usage: python3 tools/export_web.py [repo_root]
"""
import json
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    print("FAIL: pyyaml is required (import yaml failed)", file=sys.stderr)
    sys.exit(2)


def load_yaml(path):
    with open(path, encoding="utf-8") as f:
        return yaml.safe_load(f) or []


def main():
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parents[1]
    data_dir = root / "data"
    out_path = root / "web" / "app-data.json"

    sources = load_yaml(data_dir / "sources.yaml")
    stats = load_yaml(data_dir / "stats.yaml")
    questions = load_yaml(data_dir / "questions.yaml")

    sources_by_id = {s["id"]: s for s in sources if isinstance(s, dict) and "id" in s}
    stats_by_id = {s["id"]: s for s in stats if isinstance(s, dict) and "id" in s}

    out_questions = []
    for q in questions:
        if not isinstance(q, dict):
            continue
        answer_stats = []
        for sid in q.get("stat_ids") or []:
            st = stats_by_id.get(sid)
            if st is None:
                continue
            src = sources_by_id.get(st.get("source_id"), {})
            answer_stats.append({
                "id": st.get("id"),
                "name_en": st.get("name_en"),
                "name_fa": st.get("name_fa"),
                "value": st.get("value"),
                "unit": st.get("unit"),
                "year": st.get("year"),
                "scope": st.get("scope"),
                "source_id": st.get("source_id"),
                "source_name": src.get("org") or src.get("title") or st.get("source_id"),
                "source_name_fa": src.get("org_fa") or src.get("title") or st.get("source_id"),
            })
        out_questions.append({
            "id": q.get("id"),
            "category": q.get("category"),
            "difficulty": q.get("difficulty"),
            "surprise_note": q.get("surprise_note"),
            "prompt_en": q.get("prompt_en"),
            "prompt_fa": q.get("prompt_fa"),
            "hint_en": q.get("hint_en"),
            "hint_fa": q.get("hint_fa"),
            "stat_ids": q.get("stat_ids") or [],
            "options": q.get("options") or [],
            "correct_index": q.get("correct_index"),
            "fun_fact_en": q.get("fun_fact_en"),
            "fun_fact_fa": q.get("fun_fact_fa"),
            "answer_stats": answer_stats,
        })

    payload = {
        "sources": {sid: s for sid, s in sources_by_id.items()},
        "questions": out_questions,
    }
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=1, default=str)
        f.write("\n")
    print(f"exported {len(out_questions)} questions, {len(sources_by_id)} sources -> {out_path}")


if __name__ == "__main__":
    main()
