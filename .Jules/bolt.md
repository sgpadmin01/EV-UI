## 2026-03-30 - Dirty-Checking Cache Guards on High-Frequency DOM Loops
**Learning:** In vanilla JS animation loops (e.g. `requestAnimationFrame` and high-frequency `setInterval` timers), updating DOM text nodes and element inline styles unconditionally on every tick causes unnecessary DOM mutations and style recalculations even when values remain unchanged.
**Action:** Always store previous state values and perform dirty checking (`if (newValue !== lastValue)`) before assigning to `element.textContent` or `element.style` inside animation and telemetry intervals.
