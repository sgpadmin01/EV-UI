## 2026-03-30 - Dirty-Checking for High-Frequency DOM Update Loops
**Learning:** Framework-less JS running `requestAnimationFrame` or high-frequency `setInterval` timers causes constant DOM layout recalculations if styles or `textContent` are mutated unconditionally.
**Action:** Always store the last rendered value in primitive local variables and compare before assigning DOM properties or styles. Guard view-specific DOM updates by checking panel visibility (e.g. `.classList.contains('active')`).
