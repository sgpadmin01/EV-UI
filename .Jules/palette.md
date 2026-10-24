## 2026-03-30 - ARIA associations for custom HMI form controls
**Learning:** Custom styled toggle switches and range sliders in framework-less embedded HTML layouts lack accessible names unless explicitly linked via `aria-labelledby` to their label `id` or given an `aria-label`.
**Action:** Always ensure custom toggles and icon-only inputs have `aria-labelledby` or `aria-label` set so screen readers and accessibility trees can compute their accessible name.
