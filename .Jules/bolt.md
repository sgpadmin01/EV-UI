## 2026-10-21 - High-Frequency DOM Text Mutation Guards in Embedded HMI Loops
**Learning:** In framework-less embedded dashboards running `requestAnimationFrame` loops (such as speedometer gauges) or `setInterval` timers (such as clocks), re-assigning `element.textContent` on every tick causes unnecessary DOM mutations, style recalcs, and layout reflows even when formatted values have not changed.
**Action:** Guard high-frequency DOM operations with value dirty-checks and cache DOM element references so mutations only execute when rounded/formatted output changes.
