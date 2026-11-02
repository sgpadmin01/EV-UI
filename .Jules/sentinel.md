## 2025-05-18 - Fail Securely in Error Handling Middleware
**Vulnerability:** Information leakage (CWE-209) via stack traces in Express error handling middleware when `NODE_ENV` is unset or set to any value other than `'production'`.
**Learning:** Defaulting to exposing stack traces unless `NODE_ENV === 'production'` fails open. In many deployment, staging, or container environments, `NODE_ENV` may be unset or assigned arbitrary values (e.g., `'staging'`, `'test'`), resulting in internal server call stacks and file paths being disclosed to clients.
**Prevention:** Fail securely by default: only expose error stack traces when `NODE_ENV === 'development'`.
