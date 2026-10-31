## 2026-10-31 - Fail Secure Error Handler Stack Trace Exposure
**Vulnerability:** In `server/middleware/errorMiddleware.js`, stack traces were only omitted if `process.env.NODE_ENV === 'production'`, inadvertently leaking internal stack traces and server file paths when `NODE_ENV` was unset (default in many environments) or set to other deployment environments such as `staging`.
**Learning:** Checking for negative production environments (`!== 'production'`) is an anti-pattern that fails insecurely when environments are omitted or non-standard.
**Prevention:** Fail securely by default by explicitly checking for allowlisted debug environments (`NODE_ENV === 'development'`) before returning sensitive diagnostics.
