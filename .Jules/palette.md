# Palette's Journal

## 2025-05-18 - Keyboard Focus States and Icon-Only Button Labels in Agricultural Touchscreen HMI
**Learning:** In industrial and agricultural touch displays (like the EAV-700), operators alternate between physical steering-wheel/joystick directional switches and touch. Default browser outlines are suppressed or unstyled, leaving keyboard and joystick tab navigation invisible. Furthermore, touch buttons wrapped around raw SVG/Lucide icons (such as map zoom controls) lack textual accessible names for assistive readers.
**Action:** Always provide custom `:focus-visible` styles utilizing the design system's glow variables (`--accent-primary` / `--shadow-accent-glow`) with high-contrast outlines for all interactive elements (`.hmi-btn`, `.sbc-btn`, `.nav-tab`, sliders, toggles), and ensure every icon-only control has an explicit `aria-label`.
