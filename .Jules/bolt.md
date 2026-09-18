## 2026-03-31 - Dirty-checking High-Frequency DOM Operations in HMI Loops
**Learning:** In framework-less applications with high-frequency animation loops (`requestAnimationFrame`) or frequent timers (`setInterval`), mutating DOM `textContent` without dirty-checking causes redundant layout/paint calculations even when values haven't visually changed.
**Action:** Always store previous values in cache guard variables (`lastVal`) and verify value change before assigning to DOM element properties in animation frames and periodic timers.
