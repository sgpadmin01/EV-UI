## 2026-03-30 - Dirty-Checking High-Frequency DOM Render Loops

**Learning:** Unconditional DOM `.textContent` and `.style.width` assignments in 60 FPS animation loops (`requestAnimationFrame`) or 1s intervals force the browser engine to dirty DOM text nodes and schedule unnecessary style/layout recalculations even when values remain identical.
**Action:** Always cache the previously rendered formatted value and apply dirty-checking guards before mutating DOM properties in animation loops and recurring timers.
