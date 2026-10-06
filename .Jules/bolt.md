## 2026-03-30 - Cache Guards on Periodic HMI Telemetry DOM Updates
**Learning:** High-frequency or periodic setInterval timer updates on DOM nodes (e.g., telemetry metrics in framework-less embedded HMI apps) can trigger redundant DOM text mutators and layout/style recalculations even when values haven't changed (e.g. when vehicle is stationary or rounded formatted strings remain identical).
**Action:** Store last updated string/style state values and apply dirty checking before mutating `.textContent` or `.style.width` properties in setInterval callbacks.
