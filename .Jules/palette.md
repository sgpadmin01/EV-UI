## 2026-03-30 - Accessible Touch Controls on Embedded HMI

**Learning:** Icon-only buttons (such as map zoom +/-) and visual-only input sliders (such as brightness controls) in framework-less HMI webviews lack default accessible names for screen readers.
**Action:** Always provide explicit `aria-label` attributes for icon-only buttons and sliders lacking attached `<label>` elements.
