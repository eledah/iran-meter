# Iran-meter — Observatory design

## Intent

A calm measurement instrument for comparing a player's picture of Iran with sourced statistics. Keep Iran-meter as the product name; Observatory / رصدخانه is its visual theme. The question and scale are the central experience, not a dashboard.

## Visual system

- Midnight navy `#09131f` background; `#112233` surfaces; warm white `#f1f0e9` text.
- Cyan `#66dfce` represents measured truth and primary actions. Amber `#f3bd69` represents the player's guess. Coral `#ffa08f` signals a miss; do not recolor the factual marker as an error.
- Use the tokens in `web/styles.css` as the source of truth.
- Vazirmatn with system fallbacks; no letter-spacing on Persian text.
- Fine calibration ticks, thin rules, restrained corners. No confetti, punitive shaking, neon glow, ornamental dashboards, or decorative loading delays.
- One responsive stage capped at 840px. Controls stay in normal document flow; content may scroll naturally.

## Interaction contract

1. Read a question with source and reference period visible.
2. Adjust the native range or choose an option.
3. Submit once. Score from the unrounded source value with the existing tolerance rules.
4. Reveal immediately on the original scale. Use explicit guess/truth labels and distinct marker shapes, not color alone.
5. Let the player choose when to advance. Never auto-advance or add a timer.

Preserve drafts (including zero), answers, verdicts and scores when switching Persian/English. Store semantic answer state separately from localized rendering. Do not score from render functions. Clear previous markers before another question; guard duplicate submissions and premature Next.

Numeric geometry remains LTR in both locales, while Persian label text is RTL. The native thumb is 26px; overlays are inset 13px on each side. Keep point coordinates exact; move only labels to fit at endpoints. Refit after font or viewport changes. A zero difference means a zero-width distance band.

## Accessibility and resilience

- Keep native keyboard arrows, Home/End and touch input. Expose meaningful range name/value and progress semantics.
- Use visible focus indicators for interactive controls and 44px minimum primary/control touch targets.
- Move focus deliberately on question/reveal/completion transitions. Never focus an invisible delayed action.
- Correct and selected multiple-choice options need visible text labels.
- Honor reduced-motion preferences. Avoid redundant live announcements.
- Disable Start before data is ready. Show a localized error and working retry on load failure.
- Source links must come from actual data, use safe HTTP(S) URLs, and retain provenance. Do not invent dates, comparative rankings or accuracy metrics.

## Verification

```
node --check web/app.js
node --test tests/test_web_app.js
python3 scripts/validate.py
python3 tests/test_validate.py
```

Browser-check complete rounds in Persian and English at 320px, 390px and desktop widths. Include guesses at both endpoints, exact/near/missed reveals, multiple choice, locale switches before/after submission, replay, reduced motion, native keyboard/touch, 200% text size, and failed-fetch recovery. Source inspection or string-matching tests alone do not verify game state or layout.
