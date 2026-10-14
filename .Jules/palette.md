## 2026-03-30 - Focus-Visible Mapping for Custom Embedded HMI Controls
**Learning:** Custom CSS toggle switches with visually-hidden `<input>` elements block native focus outlines on keypress. Standard `:focus` rules on `<input>` don't display focus rings because the input itself is styled `opacity: 0`.
**Action:** Map focus indicators onto the adjacent visible toggle component using `.hmi-toggle input:focus-visible + .hmi-toggle-slider` and pair with `aria-labelledby` so both visual keyboard focus and screen readers function seamlessly on HMI touchscreens.
