const test = require('node:test');
const assert = require('node:assert/strict');
const { faToLatin, filterRows, sortRows, paginate, toCsv } = require('../web/indexes.js');
const row = (id, value, notes = '') => ({ id, name_en: id, value, year: 1402, unit: 'percent', scope: 'national', confidence: 'primary', notes, source: {id:'s', org:'Source', org_fa:'مرکز', url:'https://example.com'}, quiz_questions: [] });
const rows = [row('ten', 10), row('two', 2), row('zero', 0)];

test('search normalizes digits and Arabic letters across languages', () => {
  assert.equal(faToLatin('۱۴٠۲ كي'), '1402 کی');
  assert.equal(filterRows(rows, {query:'۱۴۰۲'}, 'en').length, 3);
  assert.equal(filterRows(rows, {query:'مركز'}, 'en').length, 3);
});
test('numeric sorting retains zero and sorts 2 before 10', () => {
  assert.deepEqual(sortRows(rows, 'value', 'asc').map(r=>r.value), [0,2,10]);
});
test('filters and pagination handle empty and out-of-range pages', () => {
  assert.equal(filterRows(rows, {confidence:'leak'}).length, 0);
  assert.equal(paginate(rows, 99, 2).page, 2);
  assert.equal(paginate([], 99, 50).page, 1);
  assert.equal(paginate(rows, 1, rows.length).rows.length, 3);
});
test('CSV exports every given row with BOM, quoting and safe formulas', () => {
  const csv = toCsv([row('a', -2, '=SUM(1,2)'), row('b', 0, 'quoted "text",\nnext')]);
  assert.ok(csv.startsWith('\ufeff'));
  assert.ok(csv.includes('"-2"'));
  assert.ok(csv.includes('"\'=SUM(1,2)"'));
  assert.ok(csv.includes('"quoted ""text"",\nnext"'));
  assert.ok(csv.includes('"0"'));
});
