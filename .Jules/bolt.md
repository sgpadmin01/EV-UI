## 2026-03-30 - Cache Guard on High-Frequency DOM Gauge Text Updates
**Learning:** In framework-less HMI rendering with high-frequency (60 FPS) animation loops, setting `.textContent` on DOM elements on every frame triggers redundant DOM mutations even when the rounded display value remains identical across frames.
**Action:** Always implement dirty checking / cache guards (`value !== lastValue`) before updating DOM text nodes inside `requestAnimationFrame` loops.
