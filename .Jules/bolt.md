## 2026-11-03 - Dirty-checking and DOM Caching on Framework-less HMI Animation Loops
**Learning:** In framework-less vanilla JS HMI dashboards running 60fps requestAnimationFrame and 1s telemetry intervals, redundant DOM text updates and recurring document.getElementById queries trigger repetitive layout reflows and style recalculation even when rendered values are identical.
**Action:** Always cache DOM element references and introduce previous-value dirty-checking guards before writing to textContent or style attributes in recurring loops.
