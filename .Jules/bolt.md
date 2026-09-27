## 2026-03-30 - DOM Caching and Dirty Checking in High-Frequency Loops
**Learning:** High-frequency rendering loops (e.g., 60fps requestAnimationFrame or 1s telemetry timers) in vanilla JS application suffer layout/reflow overhead when unconditionally reassigning `textContent` or `style` properties, even when values remain unchanged.
**Action:** Always cache DOM node references and apply dirty-checking guards (`value !== lastValue`) before updating DOM attributes in high-frequency loops.
