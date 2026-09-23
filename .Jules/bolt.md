## 2026-09-23 - Framework-less HMI Animation and Telemetry Caching
**Learning:** High-frequency DOM text/style updates in requestAnimationFrame loops and setInterval timers trigger layout invalidation and string allocation even when numerical rounded values or text strings do not change between ticks.
**Action:** Always cache element references and apply value dirty-checking guards (`value !== lastValue`) before updating DOM textContent or style attributes in high-frequency rendering loops.
