## 2026-03-31 - Keyboard Focus States for Custom Controls & ARIA Labels
**Learning:** Custom toggle switches with hidden input elements require targeting the adjacent slider element via `input:focus-visible + .hmi-toggle-slider` so screen readers and keyboard users get clear visual focus rings.
**Action:** Always test keyboard focus using simulated native tab key events and map focus-visible outlines onto custom UI wrappers.
