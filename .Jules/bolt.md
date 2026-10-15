## 2026-03-30 - DOM Dirty-Checking in Framework-less HMI Animation Loops
**Learning:** Continuous animation loops (e.g. `requestAnimationFrame` gauge rendering) and repeating `setInterval` timers in framework-less HMI apps trigger redundant DOM `textContent` and `style` mutations on every frame/tick even when integer or string outputs haven't changed.
**Action:** Always maintain previous state variables (`lastSpeedText`, `lastClockStr`, etc.) and apply dirty-checking guards prior to mutating DOM node properties to eliminate unnecessary render tree layout and repaint overhead.
