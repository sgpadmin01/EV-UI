## 2026-03-30 - Accessibility for Custom Embedded HMI Touch Controls
**Learning:** Custom touch-oriented HMI controls (like icon-only map zoom buttons, custom sliders, and toggles) in framework-less interfaces often lack accessible screen reader labels (`aria-label` / `aria-labelledby`) and keyboard focus visibility (`:focus-visible`).
**Action:** Always map screen reader association labels to visible custom input titles (`aria-labelledby`) and include `:focus-visible` outline styles in the primary design system stylesheet for keyboard navigation support.
