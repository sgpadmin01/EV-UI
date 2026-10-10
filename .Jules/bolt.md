## 2026-03-30 - DOM Cache and Guarding High-Frequency Timer Updates
**Learning:** High-frequency timer intervals (such as clock updates and telemetry simulation ticks) cause unnecessary DOM reflows and repaints if DOM element references are queried repeatedly and text/style values are mutated without dirty-checking formatted values.
**Action:** Always cache DOM element references outside setInterval callbacks and implement cache guards (comparing current formatted value with previous state) before setting `.textContent` or `.style.*`.
