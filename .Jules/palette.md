## 2026-03-30 - Custom Toggle Focus Ring Visibility
**Learning:** For custom toggle controls with an opacity-0 hidden `<input type="checkbox">`, standard `:focus-visible` styles on the input element are invisible to screen/keyboard users.
**Action:** Apply focus-visible styling via the adjacent sibling combinator (`.hmi-toggle input:focus-visible + .hmi-toggle-slider`) to highlight the visible slider component during keyboard navigation.
