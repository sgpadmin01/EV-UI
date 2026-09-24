## 2026-03-30 - Dirty-Checking High-Frequency HMI Animation DOM Operations
**Learning:** In framework-less vanilla JS HMI applications, running 60fps gauge animations (`requestAnimationFrame`) or 1s intervals (`setInterval`) that unconditionally write to DOM properties like `textContent` causes unnecessary layout re-computations and style recalcs even when values haven't changed.
**Action:** Always wrap high-frequency DOM property assignments with dirty-checking cache variables (`timeStr !== lastClockText`, `roundedSpeed !== lastSpeedText`) and cache element references outside functions.
