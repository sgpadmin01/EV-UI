## 2026-03-30 - DOM Dirty-Checking in Framework-less HMI Animation Loops

**Learning:** In vanilla JavaScript HMI interfaces with high-frequency animation loops (`requestAnimationFrame`) or frequent telemetry/clock timers (`setInterval`), unconditionally modifying `.textContent` or element inline styles on every frame causes unnecessary DOM tree mutations and layout/style recalculation costs, even when the displayed values remain unchanged across multiple frames.

**Action:** Always cache DOM element references and introduce value dirty-checking (`if (el.textContent !== newValue) el.textContent = newValue;`) before setting DOM text node values or style attributes in recurring loops or timers.
