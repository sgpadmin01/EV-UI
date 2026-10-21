## 2026-03-30 - Dirty-Checking Guards for High-Frequency HMI Render Loops
**Learning:** In framework-less embedded HMI applications, high-frequency animation loops (`requestAnimationFrame`) and time intervals frequently execute redundant DOM `textContent` mutations even when displayed values have not changed, leading to unnecessary layout reflows and style recalculation overhead.
**Action:** Always cache element references outside execution callbacks and add dirty-checking state guards (`if (val !== lastVal)`) prior to mutating DOM nodes in rAF loops and setInterval handlers.
