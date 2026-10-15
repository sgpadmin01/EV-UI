# Sentinel Security Journal

## 2026-08-03 - Express Security Headers and CSP Protection
**Vulnerability:** Lack of security-related response headers (e.g. X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Content-Security-Policy) on the Express backend, along with default disclosure of Express version/technology via the `X-Powered-By` header.
**Learning:** Default Express installations have zero security response headers out-of-the-box, leaving static assets and API routes open to Clickjacking, MIME-sniffing, and Cross-Site Scripting (XSS). Custom middleware can enforce strict security policies without external dependencies.
**Prevention:** Always disable the `X-Powered-By` header and implement a robust security headers middleware in production-grade Express servers. Ensure Content-Security-Policy (CSP) is configured defensively while permitting trusted CDNs/fonts used by the frontend HMI page.
