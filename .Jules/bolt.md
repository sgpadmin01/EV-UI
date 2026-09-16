## 2026-03-30 - Frameworkless HMI DOM Update Optimization
**Learning:** High-frequency animation loops (`requestAnimationFrame`) and polling intervals (`setInterval`) that unconditionally write to DOM properties (`textContent`, `style.transform`, `style.strokeDashoffset`, `style.width`) cause unnecessary layout reflows and style recalculations even when values remain unchanged.
**Action:** Apply dirty-checking/cache guards on DOM update targets before mutating DOM properties in high-frequency update loops.
