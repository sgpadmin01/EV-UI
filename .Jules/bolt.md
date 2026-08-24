## 2026-08-24 - Cache High-Frequency HMI DOM Updates via Dirty Checking
**Learning:** In framework-less JavaScript HMI animation loops (e.g. `requestAnimationFrame` speedometer rendering), setting DOM node properties such as `textContent`, `transform`, or `strokeDashoffset` on every frame causes unnecessary DOM tree updates even when the computed values haven't changed across intermediate sub-pixel steps.
**Action:** Always maintain previous state variables (`lastValue`) and guard DOM element updates with inequality checks before mutating properties or attributes.
