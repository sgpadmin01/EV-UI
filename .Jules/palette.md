## 2025-05-18 - Keyboard Focus-Visible and Accessible Form Labels in Touchscreen HMI
**Learning:** Custom interactive elements like custom range sliders and switch toggles in dark-mode HMIs need explicit `:focus-visible` ring outlines tied to their visual track/thumb elements, and icon-only SVG buttons require explicit `aria-label`s for screen reader navigation.
**Action:** When designing or updating HMI components, pair keyboard navigation focus states (`:focus-visible`) with explicit ARIA labels and `aria-labelledby` associations for custom sliders and icon controls.
