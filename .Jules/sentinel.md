## 2026-08-06 - Fail-Secure Environment Checking in Error Middleware
**Vulnerability:** Information leakage via unmasked error stack traces when `NODE_ENV` was not explicitly set to `"production"`.
**Learning:** Checking `process.env.NODE_ENV === 'production' ? null : err.stack` exposes stack traces by default whenever `NODE_ENV` is unset or set to non-production environments (e.g., `staging`, `test`).
**Prevention:** Always use explicit opt-in for debug/development outputs (e.g., `process.env.NODE_ENV === 'development'`) to ensure production defaults are fail-secure.
