"use strict";
/* Static quiz app — no dependencies. Loads app-data.json (same dir). */
let DATA = null;
let QUIZ = []; // shuffled subset per round
const QUIZ_SIZE = 20;
const SLIDER_TOL = 5; // ±pp counts as correct on slider questions
let lang = "fa"; // default fa
let idx = 0;
let score = 0;
let perDiff = {}; // difficulty -> {total, correct}

const DIFF_LABEL = {
  fa: { 1: "خیلی آسان", 2: "آسان", 3: "متوسط", 4: "سخت", 5: "خیلی سخت" },
  en: { 1: "Trivial", 2: "Easy", 3: "Medium", 4: "Hard", 5: "Expert" },
};

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const toFa = (n) => String(n).replace(/[0-9]/g, (d) => FA_DIGITS[d]);

const STR = {
  fa: {
    title: "ایران‌متر", startTitle: "ایران را چقدر می‌شناسید؟",
    startDesc: "۲۰ پرسش تصادفی درباره‌ی ایران بر اساس آمار رسمی و نظرسنجی‌ها. بعد از هر پاسخ، جواب درست و نکته‌ی جالب را می‌بینید.",
    start: "شروع آزمون", next: "سؤال بعد", finish: "دیدن نتیجه",
    progress: (a, b) => `سؤال ${toFa(a)} از ${toFa(b)}`,
    correct: "آفرین! درست جواب دادید.", wrong: "اشتباه شد — پاسخ درست مشخص شده است.",
    truth: (v) => `پاسخ درست: ${toFa(v)}٪`,
    yourGuess: (g) => `حدس شما: ${toFa(g)}٪`,
    submit: "ثبت حدس",
    source: (n) => `منبع: ${n}`, scoreTitle: "نتیجه‌ی شما",
    scoreTotal: (s, t) => `${toFa(s)} پاسخ درست از ${toFa(t)} سؤال`,
    diffRow: (d, c, t) => `سطح ${toFa(d)}: ${toFa(c)} از ${toFa(t)} درست`,
    restart: "شروع دوباره", loadErr: "خطا در بارگذاری app-data.json",
  },
  en: {
    title: "Iran-meter", startTitle: "How well do you know Iran?",
    startDesc: "20 random questions about Iran based on official stats and polls. After each answer you see the correct answer and a fun fact.",
    start: "Start quiz", next: "Next question", finish: "See results",
    progress: (a, b) => `Question ${a} of ${b}`,
    correct: "Correct — well done!", wrong: "Wrong — the correct answer is highlighted.",
    truth: (v) => `True value: ${v}%`,
    yourGuess: (g) => `Your guess: ${g}%`,
    submit: "Submit guess",
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
  updateGuessOutput();
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

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startQuiz() {
  idx = 0; score = 0; perDiff = {};
  QUIZ = shuffle([...DATA.questions]).slice(0, QUIZ_SIZE);
  show("screen-quiz");
  renderQuestion();
}

function optLabel(opt) {
  return lang === "fa" ? (opt.label_fa || opt.label_en) : (opt.label_en || opt.label_fa);
}

/* Slider mode: single-stat percent questions are answered with a 0-100 guess. */
function isSlider(q) {
  const st = q.answer_stats && q.answer_stats[0];
  return q.answer_stats && q.answer_stats.length === 1 &&
    st && st.unit === "percent" && typeof st.value === "number";
}

function updateGuessOutput() {
  const el = $("q-guess");
  if (!el) return;
  const g = $("q-range") ? $("q-range").value : 50;
  el.textContent = lang === "fa" ? toFa(g) + "٪" : g + "%";
}

function renderQuestion() {
  const t = STR[lang];
  const q = QUIZ[idx];
  $("progress-fill").style.width = `${(idx / QUIZ.length) * 100}%`;
  $("progress-label").textContent = t.progress(idx + 1, QUIZ.length);
  $("q-category").textContent = q.category || "";
  const g = $("q-gauge");
  g.innerHTML = gaugeHTML(q.difficulty);
  g.title = `${DIFF_LABEL[lang][q.difficulty] || ""} (${q.difficulty}/5)`;
  $("q-prompt").textContent = lang === "fa" ? q.prompt_fa : q.prompt_en;
  const box = $("q-options");
  const slider = $("q-slider");
  box.innerHTML = "";
  if (isSlider(q)) {
    box.classList.add("hidden");
    slider.classList.remove("hidden");
    $("q-range").value = 50;
    $("q-range").disabled = false;
    $("btn-submit-guess").disabled = false;
    updateGuessOutput();
    $("btn-submit-guess").textContent = t.submit;
  } else {
    slider.classList.add("hidden");
    box.classList.remove("hidden");
    q.options.forEach((opt, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = optLabel(opt);
      b.addEventListener("click", () => answerChoice(i));
      box.appendChild(b);
    });
  }
  $("q-feedback").classList.add("hidden");
}

function recordResult(ok) {
  if (ok) score++;
  const d = QUIZ[idx].difficulty;
  perDiff[d] = perDiff[d] || { total: 0, correct: 0 };
  perDiff[d].total++;
  if (ok) perDiff[d].correct++;
}

function showFeedback(ok, extraLine) {
  const t = STR[lang];
  const q = QUIZ[idx];
  $("fb-result").textContent = ok ? t.correct : t.wrong;
  $("fb-result").className = "fb-result " + (ok ? "ok" : "bad");
  const fact = lang === "fa" ? (q.fun_fact_fa || "") : (q.fun_fact_en || "");
  $("fb-fact").textContent = extraLine ? extraLine + (fact ? " — " + fact : "") : fact;
  const st0 = q.answer_stats && q.answer_stats[0];
  const srcName = (st0 && (lang === "fa" ? st0.source_name_fa : st0.source_name)) || "";
  $("fb-source").textContent = srcName ? t.source(srcName) : "";
  const last = idx === QUIZ.length - 1;
  $("btn-next").textContent = last ? t.finish : t.next;
  $("q-feedback").classList.remove("hidden");
  $("progress-fill").style.width = `${((idx + 1) / QUIZ.length) * 100}%`;
}

function answerChoice(i) {
  const q = QUIZ[idx];
  const ok = i === q.correct_index;
  recordResult(ok);
  const btns = $("q-options").querySelectorAll("button");
  btns.forEach((b, j) => {
    b.disabled = true;
    if (j === q.correct_index) b.classList.add("correct");
    else if (j === i) b.classList.add("wrong");
  });
  showFeedback(ok, null);
}

function submitGuess() {
  const t = STR[lang];
  const q = QUIZ[idx];
  const truth = q.answer_stats[0].value;
  const guess = Number($("q-range").value);
  const ok = Math.abs(guess - truth) <= SLIDER_TOL;
  recordResult(ok);
  $("q-range").disabled = true;
  $("btn-submit-guess").disabled = true;
  showFeedback(ok, `${t.yourGuess(guess)} · ${t.truth(Math.round(truth * 10) / 10)}`);
}

function next() {
  if (idx + 1 >= QUIZ.length) { renderScore(); show("screen-score"); }
  else { idx++; renderQuestion(); }
}

function renderScore() {
  const t = STR[lang];
  $("score-title").textContent = t.scoreTitle;
  $("score-total").textContent = t.scoreTotal(score, QUIZ.length);
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
  $("q-range").addEventListener("input", updateGuessOutput);
  $("btn-submit-guess").addEventListener("click", submitGuess);
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
