## 2026-03-30 - Focus-Visible Outlines in Dark HMI Interface
**Learning:** Embedded touch displays with physical key/joystick controls or web browser navigation require clear, high-contrast `:focus-visible` ring indicators on interactive elements (`.hmi-btn`, `.nav-tab`, `.hmi-toggle input`, `.sbc-btn`, etc.) to support accessible keyboard/hardware navigation without cluttering standard touch tap interactions.
**Action:** Include `:focus-visible` outline styles in `design-system.css` mapped to `--accent-primary` or `--accent-glow` for all interactive elements.
