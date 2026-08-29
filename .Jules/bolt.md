## 2026-03-31 - Dirty-checking for High-Frequency HMI Animation and Interval Render Loops
**Learning:** In framework-less vanilla JavaScript HMI apps with high-frequency animation loops (requestAnimationFrame) and telemetry intervals, mutating DOM node properties (like `textContent` or `style.width`) on every frame/tick causes unnecessary layout reflows and style recalcs even when values have not changed.
**Action:** Always maintain previous-value state variables to dirty-check before applying DOM mutations in high-frequency update loops.
