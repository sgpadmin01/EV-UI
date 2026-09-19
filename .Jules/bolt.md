## 2026-09-19 - High-Frequency HMI Telemetry DOM Cache Guards

**Learning:** In framework-less vanilla JS HMI applications, high-frequency animation loops (`requestAnimationFrame` at 60fps) and 1s `setInterval` timers (e.g. clock and telemetry updates) repeatedly mutate text node `textContent` and CSS properties even when the computed integer or formatted string values remain identical across frames. This triggers redundant browser style recalculations and layout reflows on constrained touchscreen HMI hardware.

**Action:** Always cache DOM element lookups once outside the update functions/loops and implement state tracking guards (dirty-checking) to ensure `textContent` and style properties are only written when values actually change.
