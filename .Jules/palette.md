## 2026-03-30 - Custom Checkbox Toggle Keyboard Focus Visibility
**Learning:** Custom CSS toggle checkboxes built on hidden `<input type="checkbox">` elements (e.g., using `opacity: 0`) typically lose all visible focus indicators. This completely breaks accessibility for keyboard-only users who cannot tell which setting they are about to toggle.
**Action:** Always map the focus state of the hidden input element to its visible sibling element (e.g., using `.hmi-toggle input:focus-visible + .hmi-toggle-slider`) to render a high-contrast focus outline.
