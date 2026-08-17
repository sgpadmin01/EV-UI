## 2026-03-30 - Focus Outlines for Custom Checkbox Toggles
**Learning:** Custom switch/toggle components that hide `<input type="checkbox">` inside a wrapper element lose default browser focus outlines during keyboard navigation.
**Action:** Always target the hidden input's `:focus-visible` state and map focus outlines to the adjacent `.hmi-toggle-slider` element.
