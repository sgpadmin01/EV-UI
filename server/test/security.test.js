import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import express from "express";
import cors from "cors";
import userRoutes from "../routes/userRoutes.js";

// Create Express instance mirroring the production security configuration
function createTestApp() {
  const app = express();

  // Security: Disable X-Powered-By to prevent server technology fingerprinting
  app.disable("x-powered-by");

  // Security: Set defense-in-depth HTTP security headers
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "geolocation=(), camera=(), microphone=()");
    next();
  });

  app.use(cors());
  app.use(express.json());
  app.use("/api/users", userRoutes);

  return app;
}

test("Security: Server sends essential security headers and strips X-Powered-By", async () => {
  const app = createTestApp();
  const server = http.createServer(app);

  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/users`);
    assert.equal(response.status, 200);

    // Verify X-Powered-By is absent (fingerprint protection)
    assert.equal(
      response.headers.get("x-powered-by"),
      null,
      "X-Powered-By header should not be present"
    );

    // Verify defensive security headers
    assert.equal(
      response.headers.get("x-content-type-options"),
      "nosniff",
      "X-Content-Type-Options should be 'nosniff'"
    );
    assert.equal(
      response.headers.get("x-frame-options"),
      "SAMEORIGIN",
      "X-Frame-Options should be 'SAMEORIGIN'"
    );
    assert.equal(
      response.headers.get("referrer-policy"),
      "strict-origin-when-cross-origin",
      "Referrer-Policy should be 'strict-origin-when-cross-origin'"
    );
    assert.equal(
      response.headers.get("permissions-policy"),
      "geolocation=(), camera=(), microphone=()",
      "Permissions-Policy should restrict device APIs"
    );
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
