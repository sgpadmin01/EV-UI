## 2026-09-08 - Dirty-Checking Guards for High-Frequency Telemetry Loops
**Learning:** Framework-less HMI interfaces updating DOM elements via `requestAnimationFrame` and `setInterval` generate a high volume of redundant `textContent` assignments, triggering browser layout/style calculations even when values remain identical.
**Action:** Always apply dirty-checking cache guards (`if (el.textContent !== newStr) el.textContent = newStr`) before updating DOM text nodes in high-frequency rendering loops.
