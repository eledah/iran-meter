(() => {
  'use strict';

  const state = {
    rows: [], language: 'fa', query: '', source: '', confidence: '', unit: '', scope: '', quiz: '',
    page: 1, pageSize: 50, sortKey: 'id', sortDirection: 'asc'
  };
  const digits = { '۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9','٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9' };
  const faToLatin = value => String(value ?? '').replace(/[۰-۹٠-٩]/g, char => digits[char]).replace(/[يى]/g, 'ی').replace(/ك/g, 'ک').toLocaleLowerCase('en');
  const display = value => value === null || value === undefined || value === '' ? '—' : typeof value === 'object' ? JSON.stringify(value) : String(value);
  const sourceLabel = (row, language) => display(language === 'fa' ? (row.source.org_fa || row.source.org || row.source.title) : (row.source.org || row.source.title));
  const nameLabel = (row, language) => display(language === 'fa' ? (row.name_fa || row.name_en) : row.name_en);
  const haystack = (row, language) => [row.id, row.name_en, row.name_fa, row.value, row.unit, row.year, row.scope, row.notes, sourceLabel(row, language), row.source.org, row.source.org_fa, row.source.title, row.source.type].map(display).join(' ');
  const searchable = (row, query, language) => !query || faToLatin(haystack(row, language)).includes(faToLatin(query));
  const filterRows = (rows, filters, language = 'fa') => rows.filter(row => searchable(row, filters.query, language) && (!filters.source || row.source.id === filters.source) && (!filters.confidence || row.confidence === filters.confidence) && (!filters.unit || row.unit === filters.unit) && (!filters.scope || row.scope === filters.scope) && (!filters.quiz || (filters.quiz === 'used' ? row.quiz_questions.length > 0 : row.quiz_questions.length === 0)));
  const numericValue = value => typeof value === 'number' ? value : Number(String(value).replace(/,/g, ''));
  const sortRows = (rows, key, direction) => [...rows].sort((a, b) => {
    let left; let right;
    if (key === 'value') { left = numericValue(a.value); right = numericValue(b.value); if (!Number.isFinite(left) || !Number.isFinite(right)) { left = display(a.value); right = display(b.value); } }
    else if (key === 'source') { left = a.source.org || a.source.title || a.source.id; right = b.source.org || b.source.title || b.source.id; }
    else if (key === 'period') { left = display(a.year); right = display(b.year); }
    else if (key === 'quiz') { left = a.quiz_questions.length; right = b.quiz_questions.length; }
    else { left = display(a[key]); right = display(b[key]); }
    const comparison = typeof left === 'number' && typeof right === 'number' ? left - right : String(left).localeCompare(String(right), 'en', { numeric: true, sensitivity: 'base' });
    return (comparison || a.id.localeCompare(b.id)) * (direction === 'desc' ? -1 : 1);
  });
  const paginate = (rows, page, pageSize) => { const totalPages = Math.max(1, Math.ceil(rows.length / pageSize)); const safePage = Math.min(Math.max(1, page), totalPages); return { page: safePage, totalPages, rows: rows.slice((safePage - 1) * pageSize, safePage * pageSize) }; };
  const csvCell = value => {
    let text = value == null ? '' : display(value);
    if (typeof value !== 'number' && (/^[=+\-@]/.test(text.trimStart()) || /^[\t\r\n]/.test(text))) text = `'${text}`;
    return `"${text.replace(/"/g, '""')}"`;
  };
  const toCsv = rows => { const headers = ['ID','Name','Raw value','Unit','Reference period','Scope','Source','Source URL','Confidence','Quiz question IDs','Notes']; const lines = [headers, ...rows.map(row => [row.id, row.name_en, row.value, row.unit, row.year, row.scope, row.source.org || row.source.title, row.source.url || row.source.doc_url, row.confidence, row.quiz_questions.map(q => q.id).join('; '), row.notes])]; return '\ufeff' + lines.map(line => line.map(csvCell).join(',')).join('\r\n') + '\r\n'; };

  if (typeof module !== 'undefined') module.exports = { faToLatin, filterRows, sortRows, paginate, toCsv };
  if (typeof document === 'undefined') return;

  const $ = selector => document.querySelector(selector);
  const t = (fa, en) => state.language === 'fa' ? fa : en;
  const els = { table: $('#index-table'), body: $('#index-body'), status: $('#live-status'), count: $('#result-count'), range: $('#result-range'), page: $('#page-number'), prev: $('#prev-page'), next: $('#next-page'), export: $('#export-csv'), empty: $('#empty-state'), error: $('#error-state'), loading: $('#loading-state') };
  const unique = key => [...new Set(state.rows.map(row => key === 'source' ? row.source.id : row[key]).filter(Boolean))].sort((a,b) => String(a).localeCompare(String(b), 'en', { numeric: true }));
  const appendText = (parent, value, className, direction) => { const span = document.createElement('span'); span.textContent = display(value); if (className) span.className = className; if (direction) span.dir = direction; parent.append(span); return span; };
  const setText = (selector, value) => { const node = $(selector); if (node) node.textContent = value; };
  const safeUrl = value => /^https?:\/\//i.test(String(value || '')) ? String(value) : '';

  function renderOptions() {
    [['source-filter', unique('source'), row => state.rows.find(item => item.source.id === row)?.source?.org || row], ['confidence-filter', unique('confidence'), x => x], ['unit-filter', unique('unit'), x => x], ['scope-filter', unique('scope'), x => x]].forEach(([id, values, label]) => {
      const select = document.getElementById(id); const current = select.value; select.replaceChildren(); const all = document.createElement('option'); all.value = ''; all.textContent = t('همه', 'All'); select.append(all); values.forEach(value => { const option = document.createElement('option'); option.value = value; option.textContent = label(value); select.append(option); }); select.value = values.includes(current) ? current : '';
    });
  }
  function renderRow(row) {
    const tr = document.createElement('tr'); const details = document.createElement('details'); const summary = document.createElement('summary'); summary.textContent = t('جزئیات', 'Details'); details.append(summary);
    const detail = document.createElement('div'); detail.className = 'row-details'; appendText(detail, row.notes || t('یادداشتی ثبت نشده', 'No notes recorded'), 'notes');
    const sourceDetail = document.createElement('p'); appendText(sourceDetail, `${sourceLabel(row, state.language)} — ${display(row.source.title)}`);
    [row.source.coverage_note, row.source.accessed ? `${t('دسترسی', 'Accessed')}: ${row.source.accessed}` : ''].filter(Boolean).forEach(value => { const p = document.createElement('p'); appendText(p, value); sourceDetail.append(p); }); detail.append(sourceDetail); details.append(detail);
    const cells = [nameLabel(row, state.language), row.id, row.value, row.unit, row.year, row.scope, sourceLabel(row, state.language), row.confidence, row.quiz_questions.length ? `${row.quiz_questions.length} ${t('پرسش', 'questions')}` : t('ندارد', 'Not used')];
    cells.forEach((value, index) => { const td = document.createElement('td'); if (index === 0) { const strong = document.createElement('strong'); strong.textContent = display(value); td.append(strong); td.append(details); } else appendText(td, value, '', index === 1 || index === 2 ? 'ltr' : undefined); if (index === 6) { const url = safeUrl(row.source.url || row.source.doc_url); if (url) { const link = document.createElement('a'); link.href = url; link.target = '_blank'; link.rel = 'noopener'; link.textContent = t('منبع', 'Source'); link.className = 'source-link'; td.append(document.createTextNode(' '), link); } } tr.append(td); });
    const confidenceCell = tr.cells[7]; const badge = document.createElement('span'); badge.className = `confidence confidence-${String(row.confidence || 'unknown').replace(/[^a-z0-9_-]/gi, '')}`; badge.textContent = display(row.confidence); confidenceCell.replaceChildren(badge); tr.append(); return tr;
  }
  function render() {
    const filtered = filterRows(state.rows, state, state.language); const sorted = sortRows(filtered, state.sortKey, state.sortDirection); const page = paginate(sorted, state.page, state.pageSize); state.page = page.page; els.body.replaceChildren(...page.rows.map(renderRow));
    els.count.textContent = t(`${filtered.length} رکورد از ${state.rows.length}`, `${filtered.length} records of ${state.rows.length}`); els.range.textContent = filtered.length ? t(`نمایش ${((page.page-1)*state.pageSize)+1} تا ${Math.min(page.page*state.pageSize, filtered.length)}`, `Showing ${((page.page-1)*state.pageSize)+1}–${Math.min(page.page*state.pageSize, filtered.length)}`) : ''; els.page.textContent = `${page.page} / ${page.totalPages}`; els.prev.disabled = page.page <= 1; els.next.disabled = page.page >= page.totalPages; els.empty.hidden = filtered.length > 0; els.export.disabled = filtered.length === 0; els.status.textContent = t(`${filtered.length} رکورد پیدا شد`, `${filtered.length} records found`);
    document.querySelectorAll('[data-sort]').forEach(button => {
      button.removeAttribute('aria-sort');
      button.parentElement.setAttribute('aria-sort', state.sortKey === button.dataset.sort ? (state.sortDirection === 'asc' ? 'ascending' : 'descending') : 'none');
    });
  }
  function translateControls() {
    const labels = {
      '#export-csv': ['دانلود CSV', 'Download CSV'],
      '#retry-load': ['تلاش دوباره', 'Retry'],
      '#prev-page': ['قبلی', 'Previous'],
      '#next-page': ['بعدی', 'Next'],
      '#empty-clear': ['پاک‌کردن فیلترها', 'Clear filters'],
      '#empty-state p': ['رکوردی با این فیلترها پیدا نشد.', 'No matching records.'],
      '#error-state p': ['بارگذاری داده‌ها ناموفق بود.', 'Could not load the inventory.'],
      '#loading-state': ['در حال بارگذاری داده‌ها…', 'Loading inventory…'],
      '#quiz-filter option[value=""]': ['همه', 'All'],
      '#quiz-filter option[value="used"]': ['استفاده‌شده', 'Used in quiz'],
      '#quiz-filter option[value="unused"]': ['استفاده‌نشده', 'Not used'],
      '#page-size option[value="all"]': ['همه', 'All'],
      'table caption': ['فهرست کامل شاخص‌ها', 'Complete index inventory'],
      '.skip-link': ['پرش به جدول', 'Skip to table']
    };
    Object.entries(labels).forEach(([selector, text]) => setText(selector, t(...text)));
    const headers = [['نام / جزئیات','Name / details'],['شناسه','ID'],['مقدار','Value'],['واحد','Unit'],['دوره مرجع','Reference period'],['محدوده','Scope'],['منبع','Source'],['اعتبار منبع','Confidence'],['آزمون','Quiz']];
    document.querySelectorAll('thead th').forEach((cell, i) => {
      (cell.querySelector('button') || cell).textContent = t(...headers[i]);
    });
    $('#search').placeholder = t('مثلاً inflation یا تورم', 'For example: inflation, population, 2026');
    $('.summary').setAttribute('aria-label', t('خلاصه فهرست', 'Inventory summary'));
    $('nav').setAttribute('aria-label', t('ناوبری', 'Navigation'));
  }
  function setup() {
    document.documentElement.lang = 'fa'; document.documentElement.dir = 'rtl';
    document.querySelectorAll('[data-filter]').forEach(control => control.addEventListener('input', () => { state[control.dataset.filter] = control.value; state.page = 1; render(); }));
    $('#quiz-filter').addEventListener('change', event => { state.quiz = event.target.value; state.page = 1; render(); });
    $('#clear-filters').addEventListener('click', () => { ['query','source','confidence','unit','scope','quiz'].forEach(key => { state[key] = ''; }); document.querySelectorAll('[data-filter], #quiz-filter').forEach(control => control.value = ''); state.page = 1; render(); });
    document.querySelectorAll('[data-sort]').forEach(button => button.addEventListener('click', () => { const key = button.dataset.sort; state.sortDirection = state.sortKey === key && state.sortDirection === 'asc' ? 'desc' : 'asc'; state.sortKey = key; render(); }));
    els.prev.addEventListener('click', () => { state.page -= 1; render(); }); els.next.addEventListener('click', () => { state.page += 1; render(); }); $('#page-size').addEventListener('change', event => { state.pageSize = event.target.value === 'all' ? Math.max(1, state.rows.length) : Number(event.target.value); state.page = 1; render(); });
    $('#export-csv').addEventListener('click', () => { const rows = sortRows(filterRows(state.rows, state, state.language), state.sortKey, state.sortDirection); const blob = new Blob([toCsv(rows)], { type: 'text/csv;charset=utf-8' }); const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'iran-meter-indexes.csv'; link.click(); URL.revokeObjectURL(link.href); });
    $('#empty-clear').addEventListener('click', () => $('#clear-filters').click());
    $('#language-toggle').addEventListener('click', () => { state.language = state.language === 'fa' ? 'en' : 'fa'; document.documentElement.lang = state.language; document.documentElement.dir = state.language === 'fa' ? 'rtl' : 'ltr'; $('#language-toggle').textContent = state.language === 'fa' ? 'English' : 'فارسی'; document.title = t('فهرست شاخص‌ها | ایران‌متر', 'Index inventory | Iran-meter'); document.querySelectorAll('[data-fa][data-en]').forEach(node => { node.textContent = t(node.dataset.fa, node.dataset.en); }); translateControls(); renderOptions(); render(); });
    translateControls();
  }
  async function load() { try { const response = await fetch('indexes-data.json'); if (!response.ok) throw new Error(`HTTP ${response.status}`); const payload = await response.json(); if (!Array.isArray(payload.rows)) throw new Error('Invalid inventory payload'); state.rows = payload.rows; $('#total-records').textContent = payload.stats_count; $('#total-sources').textContent = payload.sources_count; $('#quiz-records').textContent = payload.quiz_referenced_count; els.loading.hidden = true; renderOptions(); render(); } catch (error) { els.loading.hidden = true; els.error.hidden = false; $('#retry-load').addEventListener('click', () => location.reload(), { once: true }); els.status.textContent = t('بارگذاری داده‌ها ناموفق بود', 'Could not load inventory'); } }
  setup(); load();
})();
