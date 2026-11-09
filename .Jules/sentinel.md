## 2026-11-09 - Disable X-Powered-By Header in Express
**Vulnerability:** Default Express configuration reveals `X-Powered-By: Express` in HTTP response headers, exposing the backend technology stack to potential attackers during reconnaissance.
**Learning:** By default, Express emits the `X-Powered-By` header on all HTTP responses unless explicitly disabled via `app.disable('x-powered-by')` or security middleware.
**Prevention:** Always disable `x-powered-by` or use security header middleware when configuring Express server instances to prevent unnecessary information disclosure.
