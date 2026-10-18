## 2026-03-29 - High-Contrast Focus-Visible Styles for HMI Touch-Panels
**Learning:** Custom HMI touch controls (sliders, toggles, custom buttons) default to outline: none, rendering keyboard and assistive device navigation invisible without explicit `:focus-visible` styling.
**Action:** Always map `:focus-visible` styles using theme accent variables with matching glows (`var(--accent-primary)`) to preserve keyboard accessibility across dark embedded vehicle interfaces.
