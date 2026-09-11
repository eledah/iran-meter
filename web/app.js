"use strict";
/* Iran Observatory — static, dependency-free bilingual quiz. */

let DATA = null;
let QUIZ = [];
const QUIZ_SIZE = 20;
const SLIDER_UNITS = {
  percent: { max: 100, tol: 5 },
  years: { max: 100, tol: 3 },
  ratio: { max: 100, tol: 5 },
};

let lang = "fa";
let idx = 0;
let score = 0;
let streak = 0;
let bestStreak = 0;
let perDiff = {};
let loadState = "loading";
const answers = {};
const drafts = {};

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const CAT_FA = {
  internet: "اینترنت",
  economy: "اقتصاد",
  society: "جامعه",
  health: "سلامت",
  demographics: "جمعیت",
  education: "آموزش",
};

const toFa = (value) => String(value).replace(/[0-9]/g, (d) => FA_DIGITS[d]);

const STR = {
  fa: {
    title: "ایران‌متر | رصدخانه ایران",
    brand: "ایران‌متر / رصدخانه ایران",
    startTitle: "ایران را چقدر می‌شناسی؟",
    startHook: "تصویر ذهنی‌ات را با آمار بسنج",
    startDesc: "۲۰ سؤال تصادفی درباره ایران؛ بر پایه آمار رسمی و پیمایش‌ها. حدس بزن، پاسخ را ثبت کن و بعد عدد واقعی و نکته‌اش را ببین.",
    startRules: "درصدها تا ۵ واحد و سال‌ها تا ۳ سال خطا را درست حساب می‌کنیم. چندگزینه‌ای‌ها درست یا غلط‌اند. هر پاسخ درست یک امتیاز و زنجیره می‌سازد؛ با خطا زنجیره از نو شروع می‌شود.",
    start: "شروع رصد",
    retry: "تلاش دوباره",
    next: "سؤال بعدی",
    finish: "گزارش نهایی",
    submit: "ثبت حدس",
    progress: (a, b) => `سؤال ${toFa(a)} از ${toFa(b)}`,
    progressValue: (a, b) => `${toFa(a)} از ${toFa(b)} پاسخ داده شده`,
    progressAria: "پیشرفت آزمون",
    fmtVal: (v, u) => (u === "years" ? `${toFa(v)} سال` : u === "ratio" ? `${toFa(v)} از ۱۰۰` : `${toFa(v)}٪`),
    source: (n) => `منبع: ${n}`,
    sourcePeriod: (y) => (y ? `دوره مرجع: ${toFa(y)}` : ""),
    scoreTitle: "گزارش رصد بر اساس سختی سؤال‌ها",
    scoreTotal: (s, n) => `${toFa(s)} پاسخ درست از ${toFa(n)} سؤال`,
    diffRow: (d, c, t) => `سطح ${toFa(d)}: ${toFa(c)} از ${toFa(t)} درست`,
    restart: "رصد دوباره",
    loadErr: "بارگذاری داده‌ها انجام نشد. اتصال را بررسی و دوباره تلاش کنید.",
    loading: "داده‌ها در حال بارگذاری…",
    streak: (s) => `زنجیره ${toFa(s)}تایی`,
    best: (s) => `بهترین زنجیره: ${toFa(s)}`,
    goFull: "تمام‌صفحه",
    exitFull: "خروج از تمام‌صفحه",
    exact: "دقیق روی هدف",
    close: "درست و نزدیک",
    near: "نزدیک بود، اما نه کافی",
    off: "فاصله زیاد بود",
    choiceOk: "پاسخ درست",
    choiceBad: "پاسخ درست این نبود",
    yourGuess: (g, u) => `حدس شما: ${formatValue(g, u)}`,
    truth: (v, u) => `مقدار واقعی: ${formatValue(v, u)}`,
    gap: (d, u) => `فاصله: ${toFa(d)} ${u === "years" ? "سال" : "واحد"}`,
    yourMarker: "حدس شما",
    truthMarker: "مقدار واقعی",
    ranks: [
      [17, "ایران‌سنج"],
      [13, "آمارشناس تیزبین"],
      [9, "رصدگر کنجکاو"],
      [5, "حدس‌زن پیگیر"],
      [0, "رصدگر تازه‌کار"],
    ],
  },
  en: {
    title: "Iran-meter | Iran Observatory",
    brand: "Iran-meter / Observatory",
    startTitle: "How well do you know Iran?",
    startHook: "Calibrate your mental picture against the data",
    startDesc: "20 random questions about Iran, grounded in official statistics and surveys. Make a guess, submit it, then inspect the true value and its context.",
    startRules: "Percentage guesses are correct within 5 points; year guesses within 3 years. Multiple choice is right or wrong. Correct answers build your score and streak; a miss resets the streak.",
    start: "Start observing",
    retry: "Try loading again",
    next: "Next question",
    finish: "View report",
    submit: "Submit guess",
    progress: (a, b) => `Question ${a} of ${b}`,
    progressValue: (a, b) => `${a} of ${b} answered`,
    progressAria: "Quiz progress",
    fmtVal: (v, u) => (u === "years" ? `${v} yrs` : u === "ratio" ? `${v} per 100` : `${v}%`),
    source: (n) => `Source: ${n}`,
    sourcePeriod: (y) => (y ? `Reference period: ${y}` : ""),
    scoreTitle: "Calibration report",
    scoreTotal: (s, n) => `${s} correct out of ${n} questions`,
    diffRow: (d, c, t) => `Level ${d}: ${c} of ${t} correct`,
    restart: "Observe again",
    loadErr: "The data could not be loaded. Check the connection and try again.",
    loading: "Loading data…",
    streak: (s) => `Streak of ${s}`,
    best: (s) => `Best streak: ${s}`,
    goFull: "Fullscreen",
    exitFull: "Exit fullscreen",
    exact: "Bullseye",
    close: "Correct and close",
    near: "Close, but not enough",
    off: "Far from the mark",
    choiceOk: "Correct answer",
    choiceBad: "Not the correct answer",
    yourGuess: (g, u) => `Your guess: ${formatValue(g, u)}`,
    truth: (v, u) => `True value: ${formatValue(v, u)}`,
    gap: (d, u) => `Gap: ${d} ${u === "years" ? "years" : "points"}`,
    yourMarker: "Your guess",
    truthMarker: "True value",
    ranks: [
      [17, "Iran calibrator"],
      [13, "Sharp stat-spotter"],
      [9, "Curious observer"],
      [5, "Persistent guesser"],
      [0, "New observer"],
    ],
  },
};

const $ = (id) => document.getElementById(id);
const formatValue = (value, unit) => STR[lang].fmtVal(value, unit);

function rankFor(value) {
  for (const [minimum, name] of STR[lang].ranks) {
    if (value >= minimum) return name;
  }
  return STR[lang].ranks[STR[lang].ranks.length - 1][1];
}

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function sliderSpec(question) {
  const stat = question.answer_stats && question.answer_stats.length === 1
    ? question.answer_stats[0]
    : null;
  const unit = stat && SLIDER_UNITS[stat.unit];
  if (!unit || typeof stat.value !== "number") return null;
  return {
    max: Math.max(unit.max, Math.ceil((stat.value * 1.25) / 10) * 10),
    tol: unit.tol,
    unit: stat.unit,
    truth: stat.value,
  };
}

function isSlider(question) {
  return sliderSpec(question) !== null;
}

function syncFullLabel() {
  const button = $("btn-full");
  if (button) {
    button.textContent = document.fullscreenElement
      ? STR[lang].exitFull
      : STR[lang].goFull;
  }
}

function setupFullscreen() {
  const button = $("btn-full");
  if (!button || !document.fullscreenEnabled) {
    if (button) button.classList.add("hidden");
    return;
  }
  button.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch (_) {
      // Fullscreen is optional; the game remains usable inline.
    }
  });
  document.addEventListener("fullscreenchange", syncFullLabel);
}

function show(screenId) {
  ["screen-start", "screen-quiz", "screen-score"].forEach((id) => {
    $(id).classList.toggle("hidden", id !== screenId);
  });
}

function clearObject(object) {
  Object.keys(object).forEach((key) => delete object[key]);
}

function updateStreakUI() {
  const element = $("quiz-streak");
  const visible = streak >= 2;
  element.classList.toggle("hidden", !visible);
  if (visible) element.textContent = STR[lang].streak(streak);
}

function setLoadStatus(message, error) {
  const status = $("load-status");
  status.textContent = message;
  status.classList.toggle("error", Boolean(error));
}

function updateProgress() {
  const answered = Object.keys(answers).length;
  const total = QUIZ.length || QUIZ_SIZE;
  const percent = Math.round((answered / total) * 100);
  const thread = $("progress-fill").parentElement;
  $("progress-fill").style.width = `${percent}%`;
  thread.setAttribute("aria-label", STR[lang].progressAria);
  thread.setAttribute("aria-valuenow", String(percent));
  thread.setAttribute("aria-valuetext", STR[lang].progressValue(answered, total));
  $("progress-label").textContent = STR[lang].progress(idx + 1, total);
}

function sourceFor(question) {
  const stat = question.answer_stats && question.answer_stats[0];
  const source = stat && DATA.sources && DATA.sources[stat.source_id];
  const url = (source && /^https?:\/\//i.test(source.url || "") ? source.url : "")
    || (source && /^https?:\/\//i.test(source.doc_url || "") ? source.doc_url : "");
  return {
    name: stat && (lang === "fa" ? (stat.source_name_fa || stat.source_name) : (stat.source_name || stat.source_name_fa)),
    year: stat && stat.year,
    url,
  };
}

function applyLanguage() {
  const strings = STR[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  document.title = strings.title;
  $("app-title").textContent = strings.title;
  $("observatory-brand").textContent = strings.brand;
  $("start-title").textContent = strings.startTitle;
  $("start-hook").textContent = strings.startHook;
  $("start-desc").textContent = strings.startDesc;
  $("start-rules").textContent = strings.startRules;
  $("btn-start").textContent = strings.start;
  $("btn-retry").textContent = strings.retry;
  $("btn-restart").textContent = strings.restart;
  $("btn-fa").classList.toggle("active", lang === "fa");
  $("btn-en").classList.toggle("active", lang === "en");
  $("btn-fa").setAttribute("aria-pressed", String(lang === "fa"));
  $("btn-en").setAttribute("aria-pressed", String(lang === "en"));
  syncFullLabel();
  updateStreakUI();
  updateLoadUI();
  if (!$("screen-quiz").classList.contains("hidden")) renderQuestion(true);
  if (!$("screen-score").classList.contains("hidden")) renderScore();
}

function updateLoadUI() {
  const strings = STR[lang];
  const ready = loadState === "ready";
  const failed = loadState === "error";
  $("btn-start").disabled = !ready;
  $("btn-retry").classList.toggle("hidden", !failed);
  $("btn-retry").disabled = !failed;
  if (loadState === "loading") setLoadStatus(strings.loading, false);
  if (failed) setLoadStatus(strings.loadErr, true);
  if (ready) setLoadStatus("", false);
}

function startQuiz() {
  if (loadState !== "ready" || !DATA || !Array.isArray(DATA.questions)) return;
  idx = 0;
  score = 0;
  streak = 0;
  bestStreak = 0;
  perDiff = {};
  clearObject(answers);
  clearObject(drafts);
  QUIZ = shuffle([...DATA.questions]).slice(0, QUIZ_SIZE);
  show("screen-quiz");
  renderQuestion(false);
  $("q-prompt").focus();
}

function optLabel(option) {
  return lang === "fa"
    ? (option.label_fa || option.label_en)
    : (option.label_en || option.label_fa);
}

function setEdgeClass(element, percent, container) {
  element.classList.remove("is-start", "is-end");
  if (!container || typeof element.getBoundingClientRect !== "function") return;
  const box = container.getBoundingClientRect();
  const label = element.getBoundingClientRect();
  const center = box.left + (box.width * percent) / 100;
  if (label.width && center - label.width / 2 < box.left) element.classList.add("is-start");
  if (label.width && center + label.width / 2 > box.right) element.classList.add("is-end");
}

function updateBubble() {
  const question = QUIZ[idx];
  const spec = question && sliderSpec(question);
  const range = $("q-range");
  const bubble = $("q-bubble-val");
  const overlay = $("q-bubble");
  if (!spec || !range || !bubble || !overlay) return;
  const guess = Number(range.value);
  const percent = Math.max(0, Math.min(100, (guess / spec.max) * 100));
  bubble.style.left = `${percent}%`;
  bubble.textContent = formatValue(guess, spec.unit);
  bubble.setAttribute("aria-label", STR[lang].yourMarker + ": " + formatValue(guess, spec.unit));
  range.setAttribute("aria-valuetext", formatValue(guess, spec.unit));
  setEdgeClass(bubble, percent, overlay);
}

function renderSource(question) {
  const source = sourceFor(question);
  const element = $("q-source");
  const period = source.year ? STR[lang].sourcePeriod(source.year) : "";
  element.textContent = source.name
    ? `${STR[lang].source(source.name)}${period ? ` · ${period}` : ""}`
    : "";
  element.title = period;
  element.classList.toggle("hidden", !source.name);
  element.removeAttribute("aria-label");
  element.removeAttribute("target");
  element.removeAttribute("rel");
  element.removeAttribute("href");
  if (source.url) {
    element.href = source.url;
    element.target = "_blank";
    element.rel = "noopener";
    element.setAttribute("aria-label", element.textContent);
  }
}

function renderChoiceOptions(question, saved) {
  const box = $("q-options");
  box.innerHTML = "";
  box.classList.remove("hidden");
  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = optLabel(option);
    button.setAttribute("aria-pressed", saved ? String(saved.choice === optionIndex) : "false");
    button.disabled = Boolean(saved);
    button.addEventListener("click", () => answerChoice(optionIndex));
    if (saved) {
      const status = document.createElement("span");
      status.className = "choice-status";
      if (optionIndex === question.correct_index) {
        status.textContent = lang === "fa" ? " — پاسخ درست" : " — correct answer";
        button.classList.add("correct");
      } else if (optionIndex === saved.choice) {
        status.textContent = lang === "fa" ? " — انتخاب شما" : " — your answer";
        button.classList.add("wrong");
      } else {
        status.textContent = "";
        button.classList.add("dim");
      }
      button.appendChild(status);
    }
    box.appendChild(button);
  });
}

function renderScale(question, saved) {
  const spec = sliderSpec(question);
  const slider = $("q-slider");
  const box = $("q-options");
  const range = $("q-range");
  box.classList.add("hidden");
  slider.classList.remove("hidden");
  range.max = spec.max;
  range.value = saved ? saved.guess : (Object.prototype.hasOwnProperty.call(drafts, idx) ? drafts[idx] : Math.round(spec.max / 2));
  range.disabled = Boolean(saved);
  $("btn-submit-guess").disabled = Boolean(saved);
  $("btn-submit-guess").classList.toggle("hidden", Boolean(saved));
  $("btn-submit-guess").textContent = STR[lang].submit;
  $("q-bubble").classList.toggle("hidden", Boolean(saved));
  $("scale-min").textContent = formatValue(0, spec.unit);
  $("scale-max").textContent = formatValue(spec.max, spec.unit);
  updateBubble();
  if (saved) paintTrack(saved.guess, spec, saved.ok);
}

function renderQuestion(languageOnly) {
  const question = QUIZ[idx];
  if (!question) return;
  const saved = answers[idx];
  updateProgress();
  $("q-category").textContent = lang === "fa"
    ? (CAT_FA[question.category] || question.category || "")
    : (question.category || "");
  $("q-prompt").textContent = lang === "fa" ? question.prompt_fa : question.prompt_en;
  $("q-prompt").tabIndex = -1;
  $("q-range").setAttribute("aria-label", $("q-prompt").textContent);
  const hint = lang === "fa" ? (question.hint_fa || "") : (question.hint_en || "");
  $("q-hint").textContent = hint;
  $("q-hint").classList.toggle("hidden", !hint);
  renderSource(question);
  $("q-marks").innerHTML = "";

  if (isSlider(question)) renderScale(question, saved);
  else {
    $("q-slider").classList.add("hidden");
    renderChoiceOptions(question, saved);
  }

  $("q-feedback").classList.toggle("hidden", !saved);
  if (saved) renderFeedback(saved);
  if (!languageOnly) updateStreakUI();
}

function placeMark(element, value, spec, container) {
  const percent = Math.max(0, Math.min(100, (value / spec.max) * 100));
  element.style.left = `${percent}%`;
  setEdgeClass(element, percent, container);
}

function paintTrack(guess, spec, correct) {
  const marks = $("q-marks");
  const container = marks;
  marks.innerHTML = "";
  const guessPercent = Math.max(0, Math.min(100, (guess / spec.max) * 100));
  const truthPercent = Math.max(0, Math.min(100, (spec.truth / spec.max) * 100));
  const zone = document.createElement("span");
  zone.className = `zone ${correct ? "good" : "miss"}`;
  zone.style.left = `${Math.min(guessPercent, truthPercent)}%`;
  zone.style.width = `${Math.abs(guessPercent - truthPercent)}%`;
  zone.setAttribute("aria-hidden", "true");
  marks.appendChild(zone);

  const truthDot = document.createElement("span");
  truthDot.className = `dot-truth ${correct ? "good" : "miss"}`;
  truthDot.style.left = `${truthPercent}%`;
  truthDot.setAttribute("aria-hidden", "true");
  marks.appendChild(truthDot);

  const guessMark = document.createElement("span");
  guessMark.className = "mark mark-guess";
  guessMark.textContent = `${STR[lang].yourMarker}: ${formatValue(guess, spec.unit)}`;
  guessMark.setAttribute("aria-hidden", "true");
  marks.appendChild(guessMark);
  placeMark(guessMark, guess, spec, container);

  const truthMark = document.createElement("span");
  truthMark.className = "mark mark-truth";
  truthMark.textContent = `${STR[lang].truthMarker}: ${formatValue(roundDisplay(spec.truth, spec.unit), spec.unit)}`;
  truthMark.setAttribute("aria-hidden", "true");
  marks.appendChild(truthMark);
  placeMark(truthMark, spec.truth, spec, container);
}

function roundDisplay(value) {
  return Math.round(value * 10) / 10;
}

// Refit labels after viewport or font changes without resetting game state or focus.
function refreshScaleLayout() {
  if ($("screen-quiz").classList.contains("hidden")) return;
  const question = QUIZ[idx];
  const spec = question && sliderSpec(question);
  if (!spec) return;
  const saved = answers[idx];
  if (saved) paintTrack(saved.guess, spec, saved.ok);
  else updateBubble();
}

function verdictText(key) {
  return STR[lang][key] || "";
}

function renderFeedback(saved) {
  const question = QUIZ[idx];
  const spec = sliderSpec(question);
  $("fb-result").textContent = verdictText(saved.tierKey);
  $("fb-result").className = `fb-result ${saved.tierClass}`;
  $("fb-scale-summary").textContent = spec
    ? `${STR[lang].yourGuess(saved.guess, spec.unit)}. ${STR[lang].truth(roundDisplay(spec.truth, spec.unit), spec.unit)}. ${STR[lang].gap(roundDisplay(Math.abs(saved.guess - spec.truth), spec.unit), spec.unit)}`
    : "";
  $("fb-fact").textContent = lang === "fa" ? (question.fun_fact_fa || "") : (question.fun_fact_en || "");
  $("btn-next").textContent = idx === QUIZ.length - 1 ? STR[lang].finish : STR[lang].next;
}

function tierFor(diff, tolerance) {
  if (diff <= 1) return ["exact", "tier-exact"];
  if (diff <= tolerance) return ["close", "tier-close"];
  if (diff <= 15) return ["near", "tier-near"];
  return ["off", "tier-off"];
}

function recordAnswer(ok, difficulty) {
  if (answers[idx]) return false;
  if (ok) {
    score += 1;
    streak += 1;
    bestStreak = Math.max(bestStreak, streak);
  } else streak = 0;
  perDiff[difficulty] = perDiff[difficulty] || { total: 0, correct: 0 };
  perDiff[difficulty].total += 1;
  if (ok) perDiff[difficulty].correct += 1;
  return true;
}

function answerChoice(choice) {
  const question = QUIZ[idx];
  if (!question || answers[idx]) return;
  const ok = choice === question.correct_index;
  if (!recordAnswer(ok, question.difficulty)) return;
  answers[idx] = {
    choice,
    ok,
    tierKey: ok ? "choiceOk" : "choiceBad",
    tierClass: ok ? "tier-choice-ok" : "tier-choice-bad",
  };
  renderQuestion(false);
  $("btn-next").focus();
}

function submitGuess() {
  const question = QUIZ[idx];
  const spec = question && sliderSpec(question);
  if (!spec || answers[idx]) return;
  const guess = Number($("q-range").value);
  drafts[idx] = guess;
  const diff = Math.abs(guess - spec.truth);
  const ok = diff <= spec.tol;
  if (!recordAnswer(ok, question.difficulty)) return;
  const [tierKey, tierClass] = tierFor(diff, spec.tol);
  answers[idx] = { guess, ok, tierKey, tierClass };
  delete drafts[idx];
  renderQuestion(false);
  $("btn-next").focus();
}

function next() {
  if (!answers[idx]) return;
  if (idx + 1 >= QUIZ.length) {
    renderScore();
    show("screen-score");
    $("score-rank").focus();
    return;
  }
  idx += 1;
  renderQuestion(false);
  $("q-marks").innerHTML = "";
  $("q-prompt").focus();
}

function renderScore() {
  $("score-rank").textContent = rankFor(score);
  $("score-total").textContent = STR[lang].scoreTotal(score, QUIZ.length);
  $("score-title").textContent = STR[lang].scoreTitle;
  const list = $("score-breakdown");
  list.innerHTML = "";
  Object.keys(perDiff).sort().forEach((difficulty) => {
    const row = document.createElement("li");
    row.textContent = STR[lang].diffRow(
      difficulty,
      perDiff[difficulty].correct,
      perDiff[difficulty].total,
    );
    list.appendChild(row);
  });
  $("score-best").textContent = STR[lang].best(bestStreak);
}

async function loadData() {
  loadState = "loading";
  DATA = null;
  updateLoadUI();
  try {
    const response = await fetch("app-data.json");
    if (!response.ok) throw new Error(String(response.status));
    const payload = await response.json();
    if (!payload || !Array.isArray(payload.questions) || payload.questions.length === 0) {
      throw new Error("invalid data");
    }
    DATA = payload;
    loadState = "ready";
  } catch (_) {
    DATA = null;
    loadState = "error";
  }
  updateLoadUI();
}

function init() {
  $("btn-fa").addEventListener("click", () => {
    lang = "fa";
    applyLanguage();
  });
  $("btn-en").addEventListener("click", () => {
    lang = "en";
    applyLanguage();
  });
  $("btn-start").addEventListener("click", startQuiz);
  $("btn-retry").addEventListener("click", loadData);
  $("btn-next").addEventListener("click", next);
  $("btn-restart").addEventListener("click", startQuiz);
  $("q-range").addEventListener("input", () => {
    drafts[idx] = Number($("q-range").value);
    updateBubble();
  });
  $("btn-submit-guess").addEventListener("click", submitGuess);
  window.addEventListener("resize", refreshScaleLayout);
  if (document.fonts) document.fonts.ready.then(refreshScaleLayout);
  setupFullscreen();
  applyLanguage();
  loadData();
}

if (typeof window !== "undefined") {
  window.IranMeter = {
    applyLanguage,
    answerChoice,
    getState: () => ({ lang, idx, score, answers, drafts, loadState }),
    init,
    loadData,
    next,
    renderQuestion,
    submitGuess,
  };
}

document.addEventListener("DOMContentLoaded", init);
