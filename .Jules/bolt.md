## 2026-03-31 - Dirty-checking DOM Updates in High-Frequency Loops
**Learning:** In framework-less applications with continuous `requestAnimationFrame` animations or `setInterval` tickers, setting `textContent` unconditionally causes unnecessary DOM layout recalculations and style mutations even when the integer output value hasn't changed.
**Action:** Always maintain cache state variables (e.g. `lastClockTime`, `lastSpeedVal`) to guard DOM property assignments in rAF loops and time tickers.
