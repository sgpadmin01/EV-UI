## 2026-08-04 - Eliminate CSS imports, Pin CDN script versions, and Throttle high-frequency DOM writes
**Learning:**
1. Render-blocking CSS `@import` statements force browser engines to construct synchronous CSSOM chains, serialize requests, and delay critical painting. Moving font loads to parallel `<link>` tags with `<link rel="preconnect">` allows parallel HTTP streams to fetch fonts immediately.
2. Loading CDN scripts with dynamic tag identifiers like `@latest` triggers unnecessary 302/307 Redirect roundtrips on every session, blocking parser engines and increasing latency. Pinning the specific release version completely bypasses redirect overhead and enables proper browser cache-control.
3. In custom JS simulation / animation loops (`requestAnimationFrame`), writing to `.textContent` elements on every frame—even when the underlying value remains identical—forces the layout/repaint/reflow engine to execute redundant work. Implementing simple state comparisons (`lastRoundedSpeed`) reduces DOM manipulation overhead to the absolute minimum.

**Action:**
- Never use `@import` inside CSS files for external CDNs; instead, parallelize them in the HTML `<head>`.
- Always use preconnect/dns-prefetch hints for critical third-party CDNs.
- Pin third-party libraries to exact release versions to eliminate redirect latency.
- Protect animation-frame/interval DOM writes with basic value checks before applying text or layout updates.
