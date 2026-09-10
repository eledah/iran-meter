"use strict";
/* Static quiz app — no dependencies. Loads app-data.json (same dir). */
let DATA = null;
let lang = "fa"; // default fa
let idx = 0;
let score = 0;
let perDiff = {}; // difficulty -> {total, correct}

const DIFF_LABEL = {
  fa: { 1: "خیلی آسان", 2: "آسان", 3: "متوسط", 4: "سخت", 5: "خیلی سخت" },
  en: { 1: "Trivial", 2: "Easy", 3: "Medium", 4: "Hard", 5: "Expert" },
};

const STR = {
  fa: {
    title: "ایران‌متر", startTitle: "ایران را چقدر می‌شناسید؟",
    startDesc: "۲۴ پرسش درباره‌ی ایران بر اساس آمار رسمی و نظرسنجی‌ها. بعد از هر پاسخ، جواب درست و نکته‌ی جالب را می‌بینید.",
    start: "شروع آزمون", next: "سؤال بعد", finish: "دیدن نتیجه",
    progress: (a, b) => `سؤال ${a} از ${b}`,
    correct: "آفرین! درست جواب دادید.", wrong: "اشتباه شد — پاسخ درست مشخص شده است.",
    source: (n) => `منبع: ${n}`, scoreTitle: "نتیجه‌ی شما",
    scoreTotal: (s, t) => `${s} پاسخ درست از ${t} سؤال`,
    diffRow: (d, c, t) => `سطح ${d}: ${c} از ${t} درست`,
    restart: "شروع دوباره", loadErr: "خطا در بارگذاری app-data.json",
  },
  en: {
    title: "Iran-meter", startTitle: "How well do you know Iran?",
    startDesc: "24 questions about Iran based on official stats and polls. After each answer you see the correct answer and a fun fact.",
    start: "Start quiz", next: "Next question", finish: "See results",
    progress: (a, b) => `Question ${a} of ${b}`,
    correct: "Correct — well done!", wrong: "Wrong — the correct answer is highlighted.",
    source: (n) => `Source: ${n}`, scoreTitle: "Your score",
    scoreTotal: (s, t) => `${s} correct out of ${t}`,
    diffRow: (d, c, t) => `Level ${d}: ${c} of ${t} correct`,
    restart: "Restart", loadErr: "Failed to load app-data.json",
  },
};

const $ = (id) => document.getElementById(id);

function applyLang() {
  const t = STR[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  $("app-title").textContent = t.title;
  $("start-title").textContent = t.startTitle;
  $("start-desc").textContent = t.startDesc;
  $("btn-start").textContent = t.start;
  $("btn-restart").textContent = t.restart;
  $("btn-fa").classList.toggle("active", lang === "fa");
  $("btn-en").classList.toggle("active", lang === "en");
  if (!$("screen-quiz").classList.contains("hidden")) renderQuestion();
  if (!$("screen-score").classList.contains("hidden")) renderScore();
}

function gaugeHTML(level) {
  let s = "";
  for (let i = 1; i <= 5; i++) s += `<i class="${i <= level ? "on" : ""}"></i>`;
  return s;
}

function show(id) {
  for (const s of ["screen-start", "screen-quiz", "screen-score"]) $(s).classList.add("hidden");
  $(id).classList.remove("hidden");
}

function startQuiz() {
  idx = 0; score = 0; perDiff = {};
  show("screen-quiz");
  renderQuestion();
}

function optLabel(opt) {
  return lang === "fa" ? (opt.label_fa || opt.label_en) : (opt.label_en || opt.label_fa);
}

function renderQuestion() {
  const t = STR[lang];
  const qs = DATA.questions;
  const q = qs[idx];
  $("progress-fill").style.width = `${(idx / qs.length) * 100}%`;
  $("progress-label").textContent = t.progress(idx + 1, qs.length);
  $("q-category").textContent = q.category || "";
  const g = $("q-gauge");
  g.innerHTML = gaugeHTML(q.difficulty);
  g.title = `${DIFF_LABEL[lang][q.difficulty] || ""} (${q.difficulty}/5)`;
  $("q-prompt").textContent = lang === "fa" ? q.prompt_fa : q.prompt_en;
  const box = $("q-options");
  box.innerHTML = "";
  q.options.forEach((opt, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = optLabel(opt);
    b.addEventListener("click", () => answer(i));
    box.appendChild(b);
  });
  $("q-feedback").classList.add("hidden");
}

function answer(i) {
  const t = STR[lang];
  const q = DATA.questions[idx];
  const ok = i === q.correct_index;
  if (ok) score++;
  const d = q.difficulty;
  perDiff[d] = perDiff[d] || { total: 0, correct: 0 };
  perDiff[d].total++;
  if (ok) perDiff[d].correct++;

  const btns = $("q-options").querySelectorAll("button");
  btns.forEach((b, j) => {
    b.disabled = true;
    if (j === q.correct_index) b.classList.add("correct");
    else if (j === i) b.classList.add("wrong");
  });

  $("fb-result").textContent = ok ? t.correct : t.wrong;
  $("fb-result").className = "fb-result " + (ok ? "ok" : "bad");
  $("fb-fact").textContent = lang === "fa" ? (q.fun_fact_fa || "") : (q.fun_fact_en || "");
  const srcName = (q.answer_stats && q.answer_stats[0] &&
    (lang === "fa" ? q.answer_stats[0].source_name_fa : q.answer_stats[0].source_name)) || "";
  $("fb-source").textContent = srcName ? t.source(srcName) : "";
  const last = idx === DATA.questions.length - 1;
  $("btn-next").textContent = last ? t.finish : t.next;
  $("q-feedback").classList.remove("hidden");
  $("progress-fill").style.width = `${((idx + 1) / DATA.questions.length) * 100}%`;
}

function next() {
  if (idx + 1 >= DATA.questions.length) { renderScore(); show("screen-score"); }
  else { idx++; renderQuestion(); }
}

function renderScore() {
  const t = STR[lang];
  $("score-title").textContent = t.scoreTitle;
  $("score-total").textContent = t.scoreTotal(score, DATA.questions.length);
  const ul = $("score-breakdown");
  ul.innerHTML = "";
  Object.keys(perDiff).sort().forEach((d) => {
    const li = document.createElement("li");
    li.textContent = t.diffRow(d, perDiff[d].correct, perDiff[d].total);
    ul.appendChild(li);
  });
}

async function init() {
  $("btn-fa").addEventListener("click", () => { lang = "fa"; applyLang(); });
  $("btn-en").addEventListener("click", () => { lang = "en"; applyLang(); });
  $("btn-start").addEventListener("click", startQuiz);
  $("btn-next").addEventListener("click", next);
  $("btn-restart").addEventListener("click", startQuiz);
  try {
    const res = await fetch("app-data.json");
    if (!res.ok) throw new Error(res.status);
    DATA = await res.json();
  } catch (e) {
    $("start-desc").textContent = STR[lang].loadErr + ": " + e;
    return;
  }
  applyLang();
}
document.addEventListener("DOMContentLoaded", init);
