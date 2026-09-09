## 2026-03-30 - Dirty-Checking High-Frequency DOM Updates in Unframed HMI
**Learning:** In a framework-less vanilla JS HMI application driven by `requestAnimationFrame` and `setInterval` loops, repeatedly setting `.textContent` or `style.width` on DOM elements without dirty-checking causes redundant DOM tree mutations and layout/paint reflow calculations on every frame/tick even when displayed numeric values remain unchanged.
**Action:** Guard high-frequency DOM operations with cached value dirty-checking (`if (newValue !== lastValue)`) before touching DOM nodes.
