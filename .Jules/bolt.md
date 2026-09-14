## 2026-09-14 - Dirty-Checking High-Frequency HMI DOM Updates
**Learning:** In framework-less JavaScript HMI displays, high-frequency animation loops (rAF at 60fps) and 1s telemetry intervals continuously mutate DOM `textContent` and style properties even when formatted values remain unchanged, triggering unnecessary browser layout reflows and CPU overhead on embedded devices.
**Action:** Always maintain previous render cache variables (dirty-checking guards) before setting `textContent` or inline style attributes in recurring loops or intervals.
