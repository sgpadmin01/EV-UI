## 2026-09-07 - Cache DOM references in high-frequency clock and tab loops
**Learning:** In framework-less vanilla JavaScript HMI apps, querying the DOM (`document.querySelectorAll` or `document.getElementById`) inside `setInterval` ticks or tab click handlers adds unnecessary lookup overhead on every execution.
**Action:** Always store static DOM element references in module/script scope variables outside periodic intervals and event handlers.
