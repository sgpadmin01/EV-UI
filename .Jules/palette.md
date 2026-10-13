## 2026-03-30 - Keyboard Focus & Screen Reader Support for Custom HMI Controls
**Learning:** Embedded touchscreen HMI custom controls (such as toggles and range sliders) lack default focus outlines and accessible names unless explicitly styled with `:focus-visible` and linked with `aria-labelledby` IDs.
**Action:** Always provide explicit `:focus-visible` ring CSS targeting custom input visible wrappers and associate form labels using `aria-labelledby` attributes.
