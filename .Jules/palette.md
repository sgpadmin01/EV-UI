## 2026-03-30 - Focus-Visible States on Touch-First HMI Interfaces
**Learning:** Touch-optimized custom form controls (like toggles and range sliders) and icon-only buttons often obscure focus rings during keyboard navigation unless `:focus-visible` is specifically targeted on underlying `<input>` elements and mapped to parent container selectors.
**Action:** Always map `:focus-visible` styles on custom toggle inputs to their sibling UI elements (e.g. `.hmi-toggle-slider`) and ensure icon-only buttons have explicit `aria-label` or `aria-labelledby` attributes.
