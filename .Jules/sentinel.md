## 2026-09-16 - Sensitive Error Stack Traces in API Error Responses
**Vulnerability:** Express error handler (`server/middleware/errorMiddleware.js`) was leaking internal error `stack` traces when `process.env.NODE_ENV` was not explicitly set to `"production"`.
**Learning:** Default fallback in Express applications can expose server directory structures, environment context, and internal stack traces if `NODE_ENV` is unset or set to development/staging in deployed environments.
**Prevention:** Always default to withholding stack traces unless explicitly enabled for development mode (`process.env.NODE_ENV === "development"`), ensuring production or unset environments fail securely.
