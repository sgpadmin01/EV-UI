## 2026-03-30 - Dirty-Checking Animation Loops in Framework-less HMIs
**Learning:** High-frequency animation loops (like `requestAnimationFrame` speed gauges or `setInterval` telemetry timers) cause unnecessary DOM layout recalculations and text node mutations if updated every frame/tick when formatted values haven't changed.
**Action:** Always cache DOM element references and introduce dirty-checking variables (`lastRenderedValue`) before setting `.textContent` or element styles inside high-frequency render loops.
