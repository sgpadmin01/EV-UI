## 2025-05-14 - Navigation Controls Accessibility and Focus Rings
**Learning:** Embedded touchscreen interfaces with dark themes frequently lack visible keyboard focus rings and accessible labels on icon-only buttons, preventing keyboard/switch accessibility and failing WCAG 2.1 SC 4.1.2.
**Action:** Always provide explicit accessible names (`aria-label` and `title`) on icon-only buttons and ensure high-contrast `:focus-visible` outline styles are mapped onto custom buttons and navigation tabs.
