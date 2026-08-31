## 2026-03-29 - Dirty-checking High-Frequency DOM Render Loops
**Learning:** Framework-less HMI rendering loops (requestAnimationFrame and setInterval) frequently update DOM element attributes (e.g. style.transform, textContent, style.strokeDashoffset) even when values remain identical. This causes unnecessary browser recalculations and layout reflows on low-power touch display hardware.
**Action:** Always maintain primitive state variables to cache previous values and apply dirty-checking guards before writing to DOM properties in high-frequency loops or interval timers.
