## 2026-03-29 - Cache Guards for High-Frequency HMI Render Loops
**Learning:** In a framework-less HMI app with `requestAnimationFrame` animations (e.g., speed gauge transitions) and `setInterval` ticks (e.g., clock, odometer, trip, efficiency), DOM element lookups and unconditional `.textContent` / `.style` assignments trigger redundant DOM tree mutations even when string/number values remain unchanged across frames.
**Action:** Always cache DOM element references outside loop callbacks and maintain state cache variables (`lastVal`) to perform dirty checking before mutating DOM properties.
