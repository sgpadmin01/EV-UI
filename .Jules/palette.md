## 2026-03-30 - Focus Visible Styles and Control Accessibility Labels
**Learning:** Framework-less custom UI controls (sliders, toggles, icon-only action buttons) in touch-first HMI embedded applications often lack keyboard `:focus-visible` indicators and programmatic ARIA labels, making keyboard and screen reader accessibility incomplete.
**Action:** Always map `:focus-visible` outlines to custom HMI inputs/toggles and ensure icon-only buttons have explicit `aria-label` or `aria-labelledby` attributes.
