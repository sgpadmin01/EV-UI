## 2026-03-30 - DOM Mutation Dirty-Checking in High-Frequency Loops
**Learning:** In vanilla JS HMI applications running `requestAnimationFrame` and high-frequency `setInterval` timers, writing to `textContent` or `style` every tick (even when values don't change) triggers redundant DOM node mutations and layout recalculations.
**Action:** Cache previous values and apply dirty-checking guards (`if (val !== lastVal)`) before mutating DOM nodes in animation loops and telemetry timers.
