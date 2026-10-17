## 2026-10-17 - Dirty-checking cache guards for high-frequency HMI DOM loops
**Learning:** Framework-less HMI applications running high-frequency animation loops (e.g. 60fps `requestAnimationFrame`) and frequent `setInterval` telemetry updates trigger excessive layout reflows and text node overwrites when string/number formatting stays constant across ticks.
**Action:** Always wrap DOM text and style mutations in dirty-checking guards (`if (newValue !== lastValue)`) and cache element selectors outside update callbacks.
