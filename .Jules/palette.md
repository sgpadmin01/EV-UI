## 2025-05-18 - Visual Verification of CSS `:focus-visible`
**Learning:** Programmatic `.focus()` in Playwright or browser scripts does not activate CSS `:focus-visible` pseudo-class rules because the browser tracks user input modality. Native keyboard navigation (such as `page.keyboard.press("Tab")`) must be simulated to trigger and visually verify `:focus-visible` focus indicators.
**Action:** Always simulate user keyboard navigation events (e.g., `Tab` key presses) rather than calling `.focus()` directly when capturing focus-state screenshots or running automated accessibility checks.
