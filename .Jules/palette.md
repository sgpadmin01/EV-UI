## 2026-03-31 - Visible Focus Outlines in Touch-Optimized Dark HMI Interfaces
**Learning:** Embedded touch interfaces without explicit `:focus-visible` styles leave keyboard and assistive technology users unable to navigate tabs and controls cleanly, as dark background colors mask standard browser default focus rings.
**Action:** Always map `:focus-visible` to custom design system accent colors (`var(--accent-primary)`) for buttons, sliders, switches, and tabs in touch-first displays.
