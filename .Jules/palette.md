## 2026-03-30 - Focus-Visible Outlines on Touchscreen HMIs
**Learning:** On fixed-canvas touchscreens, standard `:focus` styles can create persistent rings during touch interactions, whereas omitting focus styles breaks keyboard and screen-reader navigation.
**Action:** Always use `:focus-visible` with a high-contrast accent ring and offset (`outline: 2px solid var(--accent-primary); outline-offset: 2px;`) to support keyboard accessibility without cluttering touch interactions.
