## 2026-03-31 - Dirty-checking in framework-less HMI animation and timer loops
**Learning:** In a vanilla JS HMI application with animation loops (rAF) and high-frequency timers (setInterval), continuously re-assigning element `.textContent` and style properties on every frame or tick causes unnecessary DOM mutations and layout invalidation even when values haven't changed.
**Action:** Always maintain cache variables (`lastValue`) and apply dirty-checking guards before writing to DOM text nodes or attributes inside rAF or interval loops.
