## 2026-03-29 - Dirty-Checking Cache Guards on High-Frequency HMI Render Loops
**Learning:** In vanilla JavaScript embedded HMI applications with continuous telemetry and requestAnimationFrame animations, setting innerHTML or textContent on every frame or interval forces redundant DOM mutations, text node dirtying, and layout recalculations even when values haven't changed.
**Action:** Always maintain previous value cache guards (`lastValue`) before mutating DOM textContent or style attributes in animation frames and setInterval handlers.
