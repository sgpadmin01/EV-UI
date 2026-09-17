## 2026-03-30 - Dirty-Checking Guards for High-Frequency DOM Updates
**Learning:** In framework-less applications with continuous telemetry loops or `requestAnimationFrame` animations, setting `textContent` or inline style properties repeatedly on every tick triggers unnecessary DOM mutations and layout/style recalcs even when values are unchanged.
**Action:** Always cache DOM references outside interval loops and apply equality guards (dirty checking) before writing to DOM properties like `textContent` or `style.width`.
