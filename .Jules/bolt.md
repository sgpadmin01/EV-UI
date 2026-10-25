## 2026-10-25 - Dirty-checking High-Frequency DOM Operations in Vanilla JS HMI
**Learning:** In framework-less applications with high-frequency animation loops (e.g. 60 FPS requestAnimationFrame) or frequent interval tickers (1000ms updateClock/telemetry), re-assigning element textContent or inline style properties on every tick triggers unnecessary DOM mutations and style recalculations even when the rendered value has not changed.
**Action:** Always maintain cache guards (`lastValue`) to dirty-check values before mutating DOM element properties in high-frequency loops or interval timers.
