## 2026-03-02 - Custom Toggle Switch Focus Indicators in Embedded Touch HMIs
**Learning:** In custom CSS-only toggle switches (`input[type="checkbox"]` visually hidden inside a wrapper `<label>`), targeting `input:focus-visible` alone does not render focus outlines because the `<input>` element has `opacity: 0`.
**Action:** Style the sibling slider element using `.hmi-toggle input:focus-visible + .hmi-toggle-slider` so keyboard navigation highlights the visible switch component.
