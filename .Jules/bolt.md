## 2026-03-30 - Dirty-Checking Cache Guards on High-Frequency HMI Animation and Timer Loops
**Learning:** In framework-less DOM applications running 60Hz `requestAnimationFrame` loops or `setInterval` timers, updating `textContent` or `style` properties on every frame triggers unnecessary layout/paint recalcs when the formatted integer or string value remains unchanged across frames.
**Action:** Always cache DOM element queries outside loops and place dirty-checking guards (`if (value !== lastValue)`) before setting DOM properties in high-frequency animation and timer callbacks.
