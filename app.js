"use strict";
/* Static quiz app — no dependencies. Loads app-data.json (same dir). */
let DATA = null;
let QUIZ = []; // shuffled subset per round
const QUIZ_SIZE = 20;
const SLIDER_TOL = 5; // ±pp counts as correct on slider questions
let lang = "fa"; // default fa
let idx = 0;
let score = 0;
let streak = 0;
let bestStreak = 0;
let perDiff = {}; // difficulty -> {total, correct}

const DIFF_LABEL = {
  fa: { 1: "خیلی آسان", 2: "آسان", 3: "متوسط", 4: "سخت", 5: "خیلی سخت" },
  en: { 1: "Trivial", 2: "Easy", 3: "Medium", 4: "Hard", 5: "Expert" },
};

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const toFa = (n) => String(n).replace(/[0-9]/g, (d) => FA_DIGITS[d]);
const num = (n) => (lang === "fa" ? toFa(n) : String(n));

const STR = {
  fa: {
    title: "ایران‌متر",
    startTitle: "ایران را چقدر می‌شناسید؟",
    startHook: "۲۰ حدس، یک زنجیره، یک لقب در پایان",
    startDesc: "۲۰ پرسش تصادفی درباره‌ی ایران بر اساس آمار رسمی و نظرسنجی‌ها. روی عدد چانه بزنید، زنجیره بسازید و بعد از هر پاسخ جواب درست و نکته‌ی جالب را ببینید.",
    startRules: "حدس درصدی تا ۵ واحد خطا قبول است. پاسخ چندگزینه‌ای یا درست است یا نه. زنجیره با هر پاسخ درست بالا می‌رود و با یک اشتباه می‌شکند.",
    start: "بزن بریم",
    next: "سؤال بعد", finish: "دیدن نتیجه",
    progress: (a, b) => `سؤال ${toFa(a)} از ${toFa(b)}`,
    submit: "ثبت حدس",
    source: (n) => `منبع: ${n}`,
    scoreTitle: "کارنامه‌ی شما بر پایه‌ی سختی",
    diffRow: (d, c, t) => `سطح ${toFa(d)}: ${toFa(c)} از ${toFa(t)} درست`,
    restart: "یک دست دیگر",
    loadErr: "خطا در بارگذاری app-data.json",
    streak: (s) => `زنجیره‌ی ${toFa(s)}تایی`,
    // slider closeness tiers
    exact: "دقیق زدید",
    close: "درست است، نزدیک بود",
    near: "نزدیک بود ولی نشد",
    off: "خیلی دور بود",
    choiceOk: "درست گفتید",
    choiceBad: "اشتباه شد",
    yourGuess: (g) => `حدس شما: ${toFa(g)}٪`,
    truth: (v) => `عدد درست: ${toFa(v)}٪`,
    gap: (d) => `فاصله‌ی شما: ${toFa(d)} واحد`,
    ranks: [
      [17, "ایران‌شناس"], [13, "آمارباز قهار"], [9, "چانه‌زن بازار"],
      [5, "حدس‌زن کنجکاو"], [0, "تازه‌وارد بازار"],
    ],
    best: (b) => `بهترین زنجیره‌ی شما: ${toFa(b)}`,
  },
  en: {
    title: "Iran-meter",
    startTitle: "How well do you know Iran?",
    startHook: "20 guesses, one streak, one title at the end",
    startDesc: "20 random questions about Iran from official stats and polls. Haggle over the number, build a streak, and after each answer see the true value and a fun fact.",
    startRules: "Percent guesses count within 5 points. Multiple choice is right or wrong. Your streak grows with every correct answer and breaks on one miss.",
    start: "Deal me in",
    next: "Next question", finish: "See results",
    progress: (a, b) => `Question ${a} of ${b}`,
    submit: "Submit guess",
    source: (n) => `Source: ${n}`,
    scoreTitle: "Your report card by difficulty",
    diffRow: (d, c, t) => `Level ${d}: ${c} of ${t} correct`,
    restart: "Play again",
    loadErr: "Failed to load app-data.json",
    streak: (s) => `Streak of ${s}`,
    exact: "Bullseye",
    close: "Correct, and close",
    near: "Close but no deal",
    off: "Way off",
    choiceOk: "You got it",
    choiceBad: "Not this time",
    yourGuess: (g) => `Your guess: ${g}%`,
    truth: (v) => `True value: ${v}%`,
    gap: (d) => `You were off by ${d} points`,
    ranks: [
      [17, "Iran knower"], [13, "Sharp stat-spotter"], [9, "Bazaar haggler"],
      [5, "Curious guesser"], [0, "New in the bazaar"],
    ],
    best: (b) => `Your best streak: ${b}`,
  },
};

const $ = (id) => document.getElementById(id);

function rankFor(s) {
  for (const [min, name] of STR[lang].ranks) if (s >= min) return name;
  return STR[lang].ranks[STR[lang].ranks.length - 1][1];
}

function applyLang() {
  const t = STR[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  $("app-title").textContent = t.title;
  $("start-title").textContent = t.startTitle;
  $("start-hook").textContent = t.startHook;
  $("start-desc").textContent = t.startDesc;
  $("start-rules").textContent = t.startRules;
  $("btn-start").textContent = t.start;
  $("btn-restart").textContent = t.restart;
  $("btn-fa").classList.toggle("active", lang === "fa");
  $("btn-en").classList.toggle("active", lang === "en");
  updateGuessOutput();
  updateStreakUI(false);
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

function dealIn() {
  // ONE orchestrated start moment: ticket deals in once per round
  document.body.classList.remove("dealing");
  void document.body.offsetWidth;
  document.body.classList.add("dealing");
}

function startQuiz() {
  idx = 0; score = 0; streak = 0; bestStreak = 0; perDiff = {};
  QUIZ = shuffle([...DATA.questions]).slice(0, QUIZ_SIZE);
  show("screen-quiz");
  dealIn();
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

function updateStreakUI(pop) {
  const t = STR[lang];
  const showIt = streak >= 2;
  const el = $("quiz-streak");
  if (!el) return;
  el.classList.toggle("hidden", !showIt);
  if (showIt) el.textContent = t.streak(streak);
  el.classList.remove("pop");
  if (pop && showIt) { void el.offsetWidth; el.classList.add("pop"); }
}

function renderQuestion() {
  const t = STR[lang];
  const q = QUIZ[idx];
  $("progress-fill").style.width = `${(idx / QUIZ.length) * 100}%`;
  $("progress-label").textContent = t.progress(idx + 1, QUIZ.length);
  $("q-category").textContent = q.category || "";
  const g = $("q-gauge");
  g.innerHTML = gaugeHTML(q.difficulty);
  g.title = `${DIFF_LABEL[lang][q.difficulty] || ""} (${num(q.difficulty)}/${num(5)})`;
  g.setAttribute("aria-label", g.title);
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
  if (ok) {
    score++;
    streak++;
    if (streak > bestStreak) bestStreak = streak;
  } else {
    streak = 0;
  }
  const d = QUIZ[idx].difficulty;
  perDiff[d] = perDiff[d] || { total: 0, correct: 0 };
  perDiff[d].total++;
  if (ok) perDiff[d].correct++;
}

function showFeedback(tier, tierClass, lines) {
  const t = STR[lang];
  const q = QUIZ[idx];
  const r = $("fb-result");
  r.textContent = tier;
  r.className = "fb-result " + tierClass;
  $("fb-gap").textContent = lines;
  const fact = lang === "fa" ? (q.fun_fact_fa || "") : (q.fun_fact_en || "");
  $("fb-fact").textContent = fact;
  const st0 = q.answer_stats && q.answer_stats[0];
  const srcName = (st0 && (lang === "fa" ? st0.source_name_fa : st0.source_name)) || "";
  $("fb-source").textContent = srcName ? t.source(srcName) : "";
  const last = idx === QUIZ.length - 1;
  $("btn-next").textContent = last ? t.finish : t.next;
  $("q-feedback").classList.remove("hidden");
  $("progress-fill").style.width = `${((idx + 1) / QUIZ.length) * 100}%`;
  $("btn-next").focus();
}

function answerChoice(i) {
  const t = STR[lang];
  const q = QUIZ[idx];
  const ok = i === q.correct_index;
  recordResult(ok);
  updateStreakUI(ok);
  const btns = $("q-options").querySelectorAll("button");
  btns.forEach((b, j) => {
    b.disabled = true;
    if (j === q.correct_index) b.classList.add("correct");
    else if (j === i) b.classList.add("wrong");
    else b.classList.add("dim");
  });
  showFeedback(
    ok ? t.choiceOk : t.choiceBad,
    ok ? "tier-choice-ok" : "tier-choice-bad",
    ""
  );
}

function submitGuess() {
  const t = STR[lang];
  const q = QUIZ[idx];
  const truth = q.answer_stats[0].value;
  const guess = Number($("q-range").value);
  const diff = Math.abs(guess - truth);
  const ok = diff <= SLIDER_TOL;
  recordResult(ok);
  updateStreakUI(ok);
  $("q-range").disabled = true;
  $("btn-submit-guess").disabled = true;
  let tier, cls;
  if (diff <= 1) { tier = t.exact; cls = "tier-exact"; }
  else if (diff <= SLIDER_TOL) { tier = t.close; cls = "tier-close"; }
  else if (diff <= 12) { tier = t.near; cls = "tier-near"; }
  else { tier = t.off; cls = "tier-off"; }
  showFeedback(tier, cls, `${t.yourGuess(guess)} — ${t.truth(Math.round(truth * 10) / 10)} — ${t.gap(Math.round(diff * 10) / 10)}`);
}

function next() {
  if (idx + 1 >= QUIZ.length) { renderScore(); show("screen-score"); }
  else { idx++; renderQuestion(); }
}

function renderScore() {
  const t = STR[lang];
  $("score-rank").textContent = rankFor(score);
  $("score-total").textContent = t.scoreTotal
    ? t.scoreTotal(score, QUIZ.length)
    : (lang === "fa"
      ? `${toFa(score)} پاسخ درست از ${toFa(QUIZ.length)} سؤال`
      : `${score} correct out of ${QUIZ.length}`);
  $("score-title").textContent = t.scoreTitle;
  const ul = $("score-breakdown");
  ul.innerHTML = "";
  Object.keys(perDiff).sort().forEach((d) => {
    const li = document.createElement("li");
    li.textContent = t.diffRow(d, perDiff[d].correct, perDiff[d].total);
    ul.appendChild(li);
  });
  $("score-best").textContent = t.best(bestStreak);
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
