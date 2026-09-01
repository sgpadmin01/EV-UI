## 2026-03-30 - Framework-less HMI Animation & Interval Loop DOM Caching
**Learning:** In vanilla JavaScript HMI/embedded web displays running requestAnimationFrame (60fps) or rapid setInterval loops, repeatedly re-assigning DOM properties (e.g. `textContent` or `style.width`) on every frame/tick triggers browser style recalcs and layout reflows even if the visible text or percentage value has not changed.
**Action:** Always maintain primitive cache variables (e.g., `lastSpeed`, `lastClockStr`) and perform dirty-checking before writing to DOM properties in high-frequency loops.
