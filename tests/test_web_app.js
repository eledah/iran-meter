#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const test = require("node:test");

function makeElement(tagName = "div") {
  const listeners = {};
  const element = {
    tagName: tagName.toUpperCase(),
    id: "",
    className: "",
    textContent: "",
    innerHTML: "",
    value: "",
    max: "",
    disabled: false,
    hidden: false,
    style: {},
    children: [],
    parentElement: null,
    attributes: {},
    classList: {
      add(...names) { names.forEach((name) => { element.className = `${element.className} ${name}`.trim(); }); },
      remove(...names) { names.forEach((name) => { element.className = element.className.split(/\s+/).filter((part) => part && part !== name).join(" "); }); },
      contains(name) { return element.className.split(/\s+/).includes(name); },
      toggle(name, force) { const shouldAdd = force === undefined ? !this.contains(name) : force; if (shouldAdd) this.add(name); else this.remove(name); return shouldAdd; },
    },
    setAttribute(name, value) { element.attributes[name] = String(value); },
    getAttribute(name) { return element.attributes[name] ?? null; },
    removeAttribute(name) { delete element.attributes[name]; },
    addEventListener(type, handler) { (listeners[type] ||= []).push(handler); },
    dispatchEvent(event) { (listeners[event.type] || []).forEach((handler) => handler(event)); },
    click() { if (!element.disabled) element.dispatchEvent({ type: "click" }); },
    focus() { documentState.activeElement = element; },
    appendChild(child) { child.parentElement = element; element.children.push(child); return child; },
    getBoundingClientRect() { return { left: 0, right: 100, width: 100 }; },
  };
  let html = "";
  Object.defineProperty(element, "innerHTML", {
    get() { return html; },
    set(value) { html = String(value); element.children = []; },
  });
  return element;
}

const documentState = { activeElement: null, listeners: {} };
const elements = new Map();
const ids = [
  "app-title", "observatory-brand", "start-title", "start-hook", "start-desc", "start-rules",
  "btn-start", "btn-retry", "btn-restart", "btn-fa", "btn-en", "btn-full", "load-status",
  "screen-start", "screen-quiz", "screen-score", "progress-fill", "progress-label", "quiz-streak",
  "q-category", "q-source", "q-prompt", "q-hint", "q-options", "q-slider", "q-range", "q-bubble",
  "q-bubble-val", "q-marks", "scale-min", "scale-max", "btn-submit-guess", "q-feedback", "fb-result",
  "fb-scale-summary", "fb-fact", "btn-next", "score-rank", "score-total", "score-title",
  "score-breakdown", "score-best",
];
ids.forEach((id) => { const element = makeElement(id.startsWith("btn-") ? "button" : "div"); element.id = id; elements.set(id, element); });
elements.get("progress-fill").parentElement = makeElement("div");
elements.get("q-bubble-val").parentElement = elements.get("q-bubble");
elements.get("q-marks").parentElement = makeElement("div");

const document = {
  fullscreenEnabled: false,
  fullscreenElement: null,
  documentElement: { lang: "fa", dir: "rtl", requestFullscreen: async () => {} },
  getElementById(id) { return elements.get(id); },
  createElement(tagName) { return makeElement(tagName); },
  addEventListener(type, handler) { (documentState.listeners[type] ||= []).push(handler); },
};

const questionData = {
  sources: { demo: { url: "https://example.com/source" } },
  questions: [
    {
      id: "slider-1", category: "internet", difficulty: 3,
      prompt_fa: "چند درصد؟", prompt_en: "What percentage?", hint_fa: null, hint_en: null,
      fun_fact_fa: "نکته فارسی", fun_fact_en: "English fact", correct_index: 0,
      answer_stats: [{ value: 50, unit: "percent", year: 2026, source_id: "demo", source_name: "Demo", source_name_fa: "نمونه" }],
      options: [],
    },
    {
      id: "choice-1", category: "society", difficulty: 4,
      prompt_fa: "کدام؟", prompt_en: "Which one?", hint_fa: null, hint_en: null,
      fun_fact_fa: "نکته", fun_fact_en: "Fact", correct_index: 0,
      answer_stats: [{ value: 0, unit: "unsupported", year: 2026, source_id: "demo", source_name: "Demo", source_name_fa: "نمونه" }],
      options: [{ label_fa: "بله", label_en: "Yes" }, { label_fa: "نه", label_en: "No" }],
    },
  ],
};

let fetchQueue = [];
let initialized = false;
const testMath = Object.create(Math);
testMath.random = () => 0.99;
const context = {
  console,
  document,
  window: { addEventListener() {} },
  fetch: async () => {
    const next = fetchQueue.shift();
    if (next instanceof Error) throw next;
    return { ok: true, json: async () => next };
  },
  Math: testMath,
};
vm.runInNewContext(fs.readFileSync("web/app.js", "utf8"), context, { filename: "web/app.js" });
const api = context.window.IranMeter;

function resetDom() {
  elements.forEach((element) => {
    element.className = element.id === "screen-start" ? "screen" : "";
    element.innerHTML = "";
    element.textContent = "";
    element.children = [];
    element.disabled = false;
    element.attributes = {};
    element.style = {};
  });
  elements.get("screen-quiz").className = "screen hidden";
  elements.get("screen-score").className = "screen hidden";
  elements.get("q-slider").className = "slider-block hidden";
  elements.get("q-feedback").className = "feedback hidden";
  elements.get("q-range").value = "50";
  elements.get("q-range").parentElement = makeElement("div");
  elements.get("q-marks").parentElement = makeElement("div");
  elements.get("q-bubble-val").parentElement = elements.get("q-bubble");
  documentState.activeElement = null;
}

async function boot(data = questionData) {
  resetDom();
  fetchQueue = [data];
  if (!initialized) {
    api.init();
    initialized = true;
  } else {
    await api.loadData();
  }
  await new Promise((resolve) => setImmediate(resolve));
  elements.get("btn-start").click();
  return api.getState();
}

function switchToEnglish() {
  elements.get("btn-en").click();
}

function switchToPersian() {
  elements.get("btn-fa").click();
}

test("submitting twice records one answer and one score", async () => {
  await boot();
  elements.get("q-range").value = "50";
  elements.get("q-range").dispatchEvent({ type: "input" });
  elements.get("btn-submit-guess").click();
  elements.get("btn-submit-guess").click();
  const state = api.getState();
  assert.equal(state.score, 1);
  assert.equal(Object.keys(state.answers).length, 1);
});

test("locale changes preserve zero and nonzero draft guesses", async () => {
  await boot();
  elements.get("q-range").value = "0";
  elements.get("q-range").dispatchEvent({ type: "input" });
  switchToEnglish();
  assert.equal(String(elements.get("q-range").value), "0");
  elements.get("q-range").value = "84";
  elements.get("q-range").dispatchEvent({ type: "input" });
  switchToPersian();
  assert.equal(String(elements.get("q-range").value), "84");
});

test("locale changes preserve a reveal and translate its verdict", async () => {
  await boot();
  switchToPersian();
  elements.get("q-range").value = "50";
  elements.get("btn-submit-guess").click();
  assert.equal(elements.get("fb-result").textContent, "دقیق روی هدف");
  switchToEnglish();
  assert.equal(elements.get("fb-result").textContent, "Bullseye");
  assert.equal(elements.get("fb-fact").textContent, "English fact");
});

test("next is guarded and clears the previous question marks", async () => {
  await boot();
  elements.get("btn-next").click();
  assert.equal(api.getState().idx, 0);
  elements.get("q-range").value = "50";
  elements.get("btn-submit-guess").click();
  elements.get("q-marks").appendChild(makeElement("span"));
  elements.get("btn-next").click();
  assert.equal(api.getState().idx, 1);
  assert.equal(elements.get("q-marks").children.length, 0);
});

test("failed loading disables Start and retry recovers", async () => {
  resetDom();
  fetchQueue = [new Error("offline"), questionData];
  await api.loadData();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(api.getState().loadState, "error");
  assert.equal(elements.get("btn-start").disabled, true);
  assert.equal(elements.get("btn-retry").classList.contains("hidden"), false);
  elements.get("btn-retry").click();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(api.getState().loadState, "ready");
  assert.equal(elements.get("btn-start").disabled, false);
});

test("completion focuses the rank and reports full progress", async () => {
  await boot();
  elements.get("q-range").value = "50";
  elements.get("btn-submit-guess").click();
  elements.get("btn-next").click();
  elements.get("q-options").children[0].click();
  elements.get("btn-next").click();
  assert.equal(documentState.activeElement, elements.get("score-rank"));
  assert.equal(elements.get("progress-fill").parentElement.getAttribute("aria-valuenow"), "100");
});

test("choice reveal translates and direct duplicate submissions cannot score twice", async () => {
  await boot();
  api.submitGuess();
  api.next();
  switchToPersian();
  api.answerChoice(0);
  const scored = api.getState().score;
  api.answerChoice(1);
  switchToEnglish();
  assert.equal(api.getState().score, scored);
  assert.equal(api.getState().answers[1].choice, 0);
  assert.equal(elements.get("fb-result").textContent, "Correct answer");
  assert.equal(elements.get("q-options").children[0].disabled, true);
  assert.equal(elements.get("q-options").children[0].getAttribute("aria-pressed"), "true");
});

test("invalid payload stays unavailable and failure status translates", async () => {
  resetDom();
  fetchQueue = [{ questions: [] }];
  await api.loadData();
  assert.equal(api.getState().loadState, "error");
  switchToPersian();
  const persian = elements.get("load-status").textContent;
  switchToEnglish();
  assert.notEqual(elements.get("load-status").textContent, persian);
  assert.equal(elements.get("btn-start").disabled, true);
});

test("an exact result has no fabricated distance band", async () => {
  await boot();
  switchToEnglish();
  elements.get("q-range").value = "50";
  api.submitGuess();
  const zone = elements.get("q-marks").children.find((element) => element.classList.contains("zone"));
  assert.equal(zone.style.width, "0%");
  assert.match(elements.get("fb-scale-summary").textContent, /Gap: 0 points/);
});
