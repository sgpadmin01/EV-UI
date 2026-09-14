## 2026-03-30 - Interactive Elements Styled as Static Containers
**Learning:** In framework-less HMI layouts, mock inputs (such as search boxes styled with `<div>`) create significant accessibility and keyboard trap issues because screen readers and touch interactions fail to register them as focusable input controls.
**Action:** Always replace mock UI container elements with native HTML controls (`<input type="search">`, `<button>`) paired with high-contrast `:focus-visible` styling and explicit `aria-label`s.
