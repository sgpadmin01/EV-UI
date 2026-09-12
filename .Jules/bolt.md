## 2026-03-31 - Dirty-checking DOM text mutations in requestAnimationFrame loops
**Learning:** In framework-less vanilla JS HMI animation loops running at ~60fps, DOM text nodes like speed and RPM values do not change value on every frame during smooth numeric interpolation. Mutating `textContent` on every frame triggers unnecessary browser text layout recalculations.
**Action:** Always dirty-check calculated rounded values (`if (value !== lastValue)`) before setting `textContent` or `style` properties in high-frequency animation and timer callbacks.
