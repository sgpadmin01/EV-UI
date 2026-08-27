## 2026-08-27 - DOM Dirty-Checking Guard on High-Frequency Timers
**Learning:** In vanilla JS HMI displays with high-frequency intervals (such as 1-second clock updates), unconditionally updating `textContent` triggers unnecessary DOM mutations and potential layout reflow calculations even when string values are unchanged.
**Action:** Always apply dirty-checking guards (`if (newValue !== lastValue)`) before performing DOM mutations inside periodic intervals.
