## 2025-05-18 - High-Contrast Keyboard Focus Indicators and ARIA Labels
**Learning:** Custom UI components (like HMI sliders, toggles, and icon buttons) lacked keyboard focus visibility and accessible associations for screen readers.
**Action:** Always provide explicit high-contrast `:focus-visible` outline/glow selectors for non-standard form controls and attach `aria-label`/`aria-labelledby` attributes to icon-only controls and wrapped toggle inputs.
