## 2026-09-20 - Cache Guards on Framework-less HMI Animation and Timer Loops
**Learning:** High-frequency animation loops (requestAnimationFrame at 60 FPS) and frequent setInterval timers in framework-less JS applications trigger unnecessary DOM text node mutations and layout work when values do not change across frames/ticks.
**Action:** Always cache element references and apply value dirty-checking (`val !== lastVal`) before mutating `.textContent` or style attributes in requestAnimationFrame callbacks and setInterval handlers.
