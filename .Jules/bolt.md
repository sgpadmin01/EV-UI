## 2026-10-04 - DOM Guarding on High-Frequency HMI Render Loops
**Learning:** In framework-less applications driven by `requestAnimationFrame` and high-frequency `setInterval` loops (e.g. speedometers, RPM displays, clock, and telemetry meters), mutating `.textContent` or element inline styles on every tick triggers unnecessary DOM mutations and layout reflows even when values remain identical across frames.
**Action:** Always maintain previous state variables to perform dirty-checking before updating DOM properties on high-frequency UI intervals or animation loops.
