## 2026-03-30 - Focus-visible and ARIA enhancements for HMI navigation
**Learning:** Programmatic `.focus()` in Playwright tests or touch event listeners doesn't trigger native `:focus-visible` states in Chromium; simulating keyboard `Tab` interactions is required to verify outline visibility.
**Action:** When testing keyboard navigation and focus-visible outlines on HMI controls, always use native keyboard press sequences (`page.keyboard.press("Tab")`).
