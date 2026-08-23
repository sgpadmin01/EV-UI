## 2026-03-30 - Dirty-Checking High-Frequency DOM Loops
**Learning:** In framework-less vanilla JavaScript HMI applications using `requestAnimationFrame` or `setInterval` loops, unconditionally mutating DOM nodes (e.g., `textContent`, `style.transform`, `style.strokeDashoffset`) on every frame causes unnecessary DOM layout recalculations, style recalcs, and repaint overhead even when values haven't changed.
**Action:** Always cache element references outside high-frequency loops and store previous values to dirty-check before writing updates to DOM properties.
