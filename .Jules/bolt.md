## 2026-03-31 - DOM Dirty-Checking Guards for High-Frequency Animation Loops
**Learning:** In vanilla JS framework-less HMI applications, high-frequency animation loops (like requestAnimationFrame at 60fps) that mutate element `textContent` without dirty checking force the browser engine to perform unnecessary DOM text node updates and layout reflow checks even when the rounded numeric string values remain identical.
**Action:** Always wrap high-frequency DOM `textContent` and style mutations in dirty-checking cache guards (`if (val !== lastVal)`) to skip redundant DOM updates.
