## 2026-08-06 - Screen-reader ARIA labeling for custom HMI controls
**Learning:** In framework-less HMI interfaces, custom controls like range sliders and toggle checkboxes require explicit ARIA attributes (`aria-label`, `aria-labelledby`, `aria-valuenow`) and dynamic JS event listener updates to maintain real-time accessibility state for assistive technology.
**Action:** Always bind `aria-labelledby` on toggle inputs to their label headers and dynamically keep `aria-valuenow` synchronized on input event listeners for range inputs.
