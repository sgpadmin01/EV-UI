## 2025-05-18 - Fail-Secure Environment Checks in Error Middleware
**Vulnerability:** The error middleware used `process.env.NODE_ENV === 'production' ? null : err.stack`, which leaked full internal stack traces, filenames, and absolute paths to client HTTP responses whenever `NODE_ENV` was unset, test, or staging.
**Learning:** Defaulting to exposing debug information unless explicitly set to `'production'` is an insecure default that fails open in containerized, CI, and misconfigured staging environments.
**Prevention:** Always follow the fail-secure principle: gate debug outputs and stack traces exclusively behind `process.env.NODE_ENV === 'development'`.
