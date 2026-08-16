## 2026-08-16 - Dirty-Checking Guards on High-Frequency DOM Loop Updates
**Learning:** In framework-less HMI applications, high-frequency animation loops (`requestAnimationFrame`) and interval timers (`setInterval`) can trigger redundant DOM writes (`.textContent` and `.style.width`) even when the computed string value has not changed, causing unnecessary DOM mutations and potential layout reflows.
**Action:** Always cache target DOM element references and compare newly calculated string values against previous values before mutating DOM element properties.
