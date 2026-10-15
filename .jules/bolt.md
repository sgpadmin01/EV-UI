# Bolt's Journal - Critical Learnings

## 2026-03-08 - Embedded HMI DOM Paint Bottlenecks
**Learning:** In a vanilla-JS embedded HMI system running on low-power hardware (such as DWIN/SBC), standard intervals and high-frequency animations (via `requestAnimationFrame`) that blindly update DOM element `textContent` on every tick cause substantial CPU overhead and layout thrashing, even when the underlying visible value hasn't changed.
**Action:** Always cache the last-rendered state/string of DOM values (e.g. clock text, speed integers, and telemetry readings) and guard DOM writes with a strict inequality check.
