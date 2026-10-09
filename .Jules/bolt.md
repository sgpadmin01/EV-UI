## 2026-10-09 - Dirty-checking DOM updates on high-frequency HMI loops
**Learning:** High-frequency animation loops (`requestAnimationFrame`) and timers (`setInterval`) in framework-less JS HMI applications re-assign DOM text properties (e.g., `textContent`) on every frame, causing unnecessary DOM tree mutations even when rounded values or formatted time strings have not changed.
**Action:** Always maintain local state cache variables (e.g., `lastSpeedVal`, `lastClockStr`) to dirty-check values prior to updating the DOM in animation frames or clock intervals.
