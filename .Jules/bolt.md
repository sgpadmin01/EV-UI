## 2026-03-30 - Dirty checking on high-frequency HMI updates
**Learning:** Framework-less HTML/JS apps using `requestAnimationFrame` and `setInterval` frequently perform unconditional `.textContent` and `.style` updates even when calculated string/number values are identical across frames, causing unnecessary DOM tree mutations and layout recalculations.
**Action:** Always dirty-check values against a local cache variable prior to touching DOM nodes in `requestAnimationFrame` loops or periodic interval callbacks.
