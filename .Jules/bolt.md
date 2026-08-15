## 2026-08-15 - DOM Write Cache Guards for High-Frequency Render Loops
**Learning:** High-frequency timer intervals (`setInterval` at 1000ms/1500ms) and animation loops (`requestAnimationFrame` at 60fps) frequently trigger redundant DOM text node mutations and style reassignment even when values remain identical across frames/ticks.
**Action:** Apply dirty-checking cache guards on high-frequency UI updates (`textContent`, `style.width`, etc.) to execute DOM writes only when value state actually changes.
