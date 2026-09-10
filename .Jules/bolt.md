## 2026-09-10 - Dirty-Checking Cache Guard on High-Frequency Animation Loops
**Learning:** High-frequency `requestAnimationFrame` loops (such as gauge/speedometer render steps) mutate DOM element `textContent` on every frame even when rounded integer values remain identical.
**Action:** Apply dirty-checking cache guards (`lastValue`) on DOM element writes inside animation callbacks to eliminate redundant DOM updates and layout reflows.
