## 2026-03-31 - Telemetry DOM Dirty-Checking Guard
**Learning:** In frameworkless HMI applications running periodic timers for telemetry (e.g., 1-second intervals), modifying `.textContent` or `.style` properties unconditionally forces browser style recalculations and potential layout reflows even when values are unchanged (such as when stationary or formatted strings remain identical).
**Action:** Always dirty-check calculated formatted values against cached last-rendered state before mutating DOM element properties in high-frequency loops or interval timers.
