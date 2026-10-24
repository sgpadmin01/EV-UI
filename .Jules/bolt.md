## 2026-03-31 - DOM Reference Caching and Dirty Checking in Vanilla HMI Animation Loops
**Learning:** High-frequency timer intervals and 60fps `requestAnimationFrame` render loops that directly set DOM `textContent` or style properties without prior value comparison trigger unnecessary style recalc, layout, and repaint cycles even when the value has not changed.
**Action:** Always cache DOM element references outside of high-frequency loops/intervals and apply dirty-checking guards (`if (currentVal !== prevVal)`) before modifying DOM nodes or inline styles.
