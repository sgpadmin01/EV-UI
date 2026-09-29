## 2026-03-30 - Cache guards on framework-less HMI animation loops

**Learning:** In framework-less vanilla JavaScript HMI rendering, invoking `element.textContent = ...` or `element.style.width = ...` every frame inside `requestAnimationFrame` loops or high-frequency `setInterval` timers mutates the DOM tree even when values have not changed. This forces style and layout recalculation in browser rendering engines.
**Action:** Always maintain local state variables and apply dirty-checking cache guards (`if (val !== lastVal)`) before mutating DOM text nodes or inline styles in animation loops or high-frequency timers.
