## 2026-03-29 - DOM Cache Guards in High-Frequency HMI Animation Loops
**Learning:** In vanilla JavaScript HMI canvas loops driven by `requestAnimationFrame` or high-frequency timers, setting `.style` or `.textContent` properties unconditionally triggers style recalculation and potential layout reflows even when values remain identical across frames.
**Action:** Always apply dirty-checking cache guards (`lastValue !== newValue`) before executing DOM style writes or text node updates in animation frames and telemetry intervals.
