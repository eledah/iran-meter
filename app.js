"use strict";
/* Static quiz app — no dependencies. Loads app-data.json (same dir). */
let DATA = null;
let QUIZ = []; // shuffled subset per round
const QUIZ_SIZE = 20;
/* Slider specs per stat unit: range max + tolerance that counts as correct */
const SLIDER_UNITS = {
  percent: { max: 100, tol: 5 },
  years: { max: 100, tol: 3 },
};
const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    startHook: "۲۰ حدس بزن و آخرش لقب بگیر",
    startDesc: "۲۰ سؤال تصادفی درباره ایران داریم. همه از آمار رسمی و نظرسنجی‌هاست. حدس بزن و زنجیره بساز. بعد هر جواب، عدد درست را با نکته پشتش می‌بینی.",
    startRules: "درصدی‌ها تا ۵ واحد خطا قبول است. سنی‌ها تا ۳ سال. چندگزینه‌ای یا درست است یا غلط. هر جواب درست زنجیره را یکی بیشتر می‌کند. با یک غلط زنجیره می‌پرد.",
    start: "بزن بریم",
    next: "سؤال بعدی", finish: "نتیجه را ببین",
    progress: (a, b) => `سؤال ${toFa(a)} از ${toFa(b)}`,
    submit: "ثبت حدس",
    unitName: (u) => (u === "years" ? "سال" : "٪"),
    fmtVal: (v, u) => (u === "years" ? `${toFa(v)} سال` : `${toFa(v)}٪`),
    source: (n) => `منبع: ${n}`,
    scoreTitle: "کارنامه‌ات بر اساس سختی سؤال‌ها",
    diffRow: (d, c, t) => `سطح ${toFa(d)}: ${toFa(c)} از ${toFa(t)} درست`,
    restart: "یک دست دیگر",
    loadErr: "app-data.json بارگذاری نشد",
    streak: (s) => `زنجیره‌ی ${toFa(s)}تایی`,
    // slider closeness tiers
    exact: "آفرین، دقیق زدید",
    close: "درست است و خیلی نزدیک",
    near: "نزدیک بود ولی نشد",
    off: "این یکی خیلی دور بود",
    choiceOk: "آفرین، درست است",
    choiceBad: "این را اشتباه گفتید",
    yourGuess: (g, u) => `حدس شما: ${fmtV(g, u)}`,
    truth: (v, u) => `عدد درست: ${fmtV(v, u)}`,
    gap: (d, u) => `فاصله‌ی شما: ${toFa(d)} ${u === "years" ? "سال" : "واحد"}`,
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
    startRules: "Number guesses: percents count within 5 points, ages within 3 years. Multiple choice is right or wrong. Your streak grows with every correct answer and breaks on one miss.",
    start: "Deal me in",
    next: "Next question", finish: "See results",
    progress: (a, b) => `Question ${a} of ${b}`,
    submit: "Submit guess",
    unitName: (u) => (u === "years" ? "yrs" : "%"),
    fmtVal: (v, u) => (u === "years" ? `${v} yrs` : `${v}%`),
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
    yourGuess: (g, u) => `Your guess: ${fmtV(g, u)}`,
    truth: (v, u) => `True value: ${fmtV(v, u)}`,
    gap: (d, u) => `You were off by ${d} ${u === "years" ? "years" : "points"}`,
    ranks: [
      [17, "Iran knower"], [13, "Sharp stat-spotter"], [9, "Bazaar haggler"],
      [5, "Curious guesser"], [0, "New in the bazaar"],
    ],
    best: (b) => `Your best streak: ${b}`,
  },
};

const $ = (id) => document.getElementById(id);
const fmtV = (v, u) => STR[lang].fmtVal(v, u);

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

/* Slider mode: single-stat numeric questions (percents AND years) are
   answered with a guess on a range. Returns {max, tol, unit} or null. */
function sliderSpec(q) {
  const st = q.answer_stats && q.answer_stats[0];
  if (!q.answer_stats || q.answer_stats.length !== 1 || !st) return null;
  const spec = SLIDER_UNITS[st.unit];
  if (!spec || typeof st.value !== "number") return null;
  // ceiling leaves headroom past 100 when the truth runs hot (e.g. 83.9% inflation)
  const max = Math.max(spec.max, Math.ceil((st.value * 1.25) / 10) * 10);
  return { max, tol: spec.tol, unit: st.unit, truth: st.value };
}
const isSlider = (q) => sliderSpec(q) !== null;

function updateGuessOutput() {
  const el = $("q-guess");
  if (!el || !QUIZ[idx]) return;
  const spec = sliderSpec(QUIZ[idx]);
  const g = $("q-range") ? $("q-range").value : 50;
  el.textContent = fmtV(g, spec ? spec.unit : "percent");
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
  const hintText = lang === "fa" ? (q.hint_fa || "") : (q.hint_en || "");
  $("q-hint").textContent = hintText;
  $("q-hint").classList.toggle("hidden", !hintText);
  const box = $("q-options");
  const slider = $("q-slider");
  box.innerHTML = "";
  if (isSlider(q)) {
    const spec = sliderSpec(q);
    box.classList.add("hidden");
    slider.classList.remove("hidden");
    const range = $("q-range");
    range.max = spec.max;
    range.value = Math.round(spec.max / 2);
    range.disabled = false;
    $("btn-submit-guess").disabled = false;
    $("q-marks").innerHTML = "";
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

/* Reveal helpers: count-up, guess-vs-truth track, confetti, shake.
   All motion answers the user's action; skipped under reduced-motion. */
function countUp(el, target, fmt) {
  if (reduceMotion()) { el.textContent = fmt(target); return; }
  const t0 = performance.now(), dur = 750;
  const step = (now) => {
    const p = Math.min(1, (now - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(target * eased);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function paintTrack(guess, spec, ok) {
  // Data labels live ON the original slider: your-guess pill above the
  // track, true-value pill below it. The overlay is LTR so % maps to left%.
  const marks = $("q-marks");
  marks.innerHTML = "";
  const pct = (v) => Math.max(6, Math.min(94, (v / spec.max) * 100));
  const mk = (v, cls, label) => {
    const s = document.createElement("span");
    s.className = "mark " + cls + (cls === "mark-truth" ? (ok ? " good" : " miss") : "");
    s.style.left = pct(v) + "%";
    s.textContent = label;
    marks.appendChild(s);
  };
  mk(guess, "mark-guess", fmtV(guess, spec.unit));
  mk(Math.round(spec.truth * 10) / 10, "mark-truth", fmtV(Math.round(spec.truth * 10) / 10, spec.unit));
}

function confettiBurst() {
  if (reduceMotion()) return;
  const ticket = document.querySelector(".ticket");
  if (!ticket) return;
  const colors = ["#b3402a", "#3e7a4e", "#d9a62e", "#23201a"];
  for (let i = 0; i < 22; i++) {
    const s = document.createElement("i");
    s.className = "confetti";
    s.style.background = colors[i % colors.length];
    s.style.left = (20 + Math.random() * 60) + "%";
    s.style.setProperty("--dx", (Math.random() * 160 - 80).toFixed(0) + "px");
    s.style.setProperty("--rot", (Math.random() * 540 - 270).toFixed(0) + "deg");
    s.style.animationDelay = (Math.random() * 0.15).toFixed(2) + "s";
    ticket.appendChild(s);
    s.addEventListener("animationend", () => s.remove());
  }
}

function shakeTicket() {
  if (reduceMotion()) return;
  const ticket = document.querySelector(".ticket");
  if (!ticket) return;
  ticket.classList.remove("shake");
  void ticket.offsetWidth;
  ticket.classList.add("shake");
}

function showFeedback(tier, tierClass, lines, reveal) {
  const t = STR[lang];
  const q = QUIZ[idx];
  const r = $("fb-result");
  r.textContent = tier;
  r.className = "fb-result " + tierClass;
  // Reveal card: big counted-up truth (slider Qs also get labeled markers
  // painted directly onto the original slider by paintTrack)
  const truthBox = $("fb-truth");
  if (reveal) {
    truthBox.classList.remove("hidden");
    $("fb-truth-unit").textContent = "";
    // count-up trails the tier headline; instant under reduced motion
    const doCount = () => countUp($("fb-truth-num"), reveal.truth, (v) => {
      const r1 = Math.round(v * 10) / 10;
      return lang === "fa" ? toFa(r1) : String(r1);
    });
    if (reduceMotion()) doCount();
    else setTimeout(doCount, 300);
    // unit suffix after the animated number
    const unitEl = $("fb-truth-unit");
    unitEl.textContent = lang === "fa"
      ? (reveal.spec.unit === "years" ? " سال" : "٪")
      : (reveal.spec.unit === "years" ? " yrs" : "%");
    paintTrack(reveal.guess, reveal.spec, reveal.ok);
  } else {
    truthBox.classList.add("hidden");
  }
  $("fb-gap").textContent = lines;
  const fact = lang === "fa" ? (q.fun_fact_fa || "") : (q.fun_fact_en || "");
  $("fb-fact").textContent = fact;
  const st0 = q.answer_stats && q.answer_stats[0];
  const srcName = (st0 && (lang === "fa" ? st0.source_name_fa : st0.source_name)) || "";
  $("fb-source").textContent = srcName ? t.source(srcName) : "";
  $("fb-source").classList.toggle("hidden", !srcName);
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
  const spec = sliderSpec(q);
  const truth = spec.truth;
  const guess = Number($("q-range").value);
  const diff = Math.abs(guess - truth);
  const ok = diff <= spec.tol;
  recordResult(ok);
  updateStreakUI(ok);
  $("q-range").disabled = true;
  $("btn-submit-guess").disabled = true;
  let tier, cls;
  if (diff <= 1) { tier = t.exact; cls = "tier-exact"; }
  else if (diff <= spec.tol) { tier = t.close; cls = "tier-close"; }
  else if (diff <= 15) { tier = t.near; cls = "tier-near"; }
  else { tier = t.off; cls = "tier-off"; }
  if (cls === "tier-exact") confettiBurst();
  if (cls === "tier-off") shakeTicket();
  const r1 = Math.round(diff * 10) / 10;
  showFeedback(tier, cls,
    `${t.yourGuess(guess, spec.unit)} • ${t.truth(Math.round(truth * 10) / 10, spec.unit)} • ${t.gap(r1, spec.unit)}`,
    { guess, truth, spec, ok });
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
