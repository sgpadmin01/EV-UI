## 2026-03-30 - Dirty Checking on High-Frequency DOM Operations
**Learning:** In framework-less vanillajs HMI applications, high-frequency animation loops (`requestAnimationFrame` at 60fps) and timer intervals (`setInterval`) trigger DOM text and style mutations even when rounded values or strings haven't changed, causing unnecessary browser layout recalculations and repaints.
**Action:** Always maintain cache guard variables (`lastValue`) and compare formatted strings or integer values before updating `textContent` or inline style attributes.
