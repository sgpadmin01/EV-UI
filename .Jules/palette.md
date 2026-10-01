## 2026-03-30 - Keyboard Focus Outlines on Touch Controls
**Learning:** Programmatic `.focus()` calls on custom embedded touch inputs (like hidden checkbox toggles or styled range sliders) do not trigger CSS `:focus-visible` pseudo-class styles unless accompanied by native keyboard interaction events (such as simulating a 'Tab' key press).
**Action:** Always test `:focus-visible` CSS rules using simulated keyboard navigation events (like `page.keyboard.press("Tab")`) in Playwright e2e tests.
