## 2026-03-31 - Visible focus indicators for touchscreen buttons and icon ARIA labels
**Learning:** Icon-only buttons on high-contrast dark automotive HMIs often lack screen-reader labels and visible keyboard focus outlines when navigated via physical controls/tabbing.
**Action:** Always include explicit `aria-label` attributes on icon-only control buttons and attach high-contrast `:focus-visible` outline styles in the primary design system.
