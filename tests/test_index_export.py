"""Inventory export integrity and failure-path tests; no local server."""
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

import yaml

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("export_indexes", ROOT / "tools/export_indexes.py")
assert spec is not None and spec.loader is not None
exporter = importlib.util.module_from_spec(spec)
spec.loader.exec_module(exporter)


class ExportTests(unittest.TestCase):
    def test_all_rows_preserve_every_original_field(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            (root / "data").mkdir()
            for name in ("stats", "sources", "questions"):
                (root / "data" / f"{name}.yaml").write_bytes((ROOT / "data" / f"{name}.yaml").read_bytes())
            path, count, _, _ = exporter.export(root)
            payload = json.loads(path.read_text())
            originals = yaml.safe_load((root / "data/stats.yaml").read_text())
            rows = {row["id"]: row for row in payload["rows"]}
            self.assertEqual(count, len(originals))
            self.assertEqual(set(rows), {row["id"] for row in originals})
            for original in originals:
                for key, value in original.items():
                    self.assertEqual(rows[original["id"]][key], value)
            before = path.read_bytes()
            exporter.export(root)
            self.assertEqual(before, path.read_bytes())

    def test_duplicate_ids_rejected(self):
        with self.assertRaisesRegex(ValueError, "duplicate"):
            exporter.require_unique([{"id": "same"}, {"id": "same"}], "test")

    def test_missing_reference_rejected(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            (root / "data").mkdir()
            for name, data in {"stats": [{"id": "s", "source_id": "missing"}], "sources": [], "questions": []}.items():
                (root / "data" / f"{name}.yaml").write_text(yaml.safe_dump(data))
            with self.assertRaisesRegex(ValueError, "source FK"):
                exporter.export(root)


if __name__ == "__main__":
    unittest.main()
