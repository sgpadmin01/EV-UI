## 2026-03-31 - Focus-Visible High-Contrast Focus Ring and ARIA Accessibility
**Learning:** Custom UI controls (like HMI sliders and toggle switches) and dark-themed capacitive buttons lacked native focus indicators and accessible labels for keyboard users and screen readers.
**Action:** Always add a high-contrast `:focus-visible` rule using design system accent color variables (`--accent-primary` and `--accent-glow`), target nested toggle inputs specifically, and include explicit `aria-label` attributes on icon-only control buttons.
