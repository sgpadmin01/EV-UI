import { describe, it } from "node:test";
import assert from "node:assert/strict";
import express from "express";
import http from "node:http";
import securityHeaders from "../middleware/securityHeaders.js";

describe("Security Headers & Server Hardening", () => {
  it("should set all expected security headers via securityHeaders middleware", async () => {
    const app = express();
    app.disable("x-powered-by");
    app.use(securityHeaders);
    app.get("/test", (req, res) => {
      res.send("ok");
    });

    const server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));
    const port = server.address().port;

    try {
      const response = await fetch(`http://127.0.0.1:${port}/test`);
      assert.equal(response.status, 200);

      // Verify security headers
      assert.equal(response.headers.get("x-content-type-options"), "nosniff");
      assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");
      assert.equal(response.headers.get("x-xss-protection"), "1; mode=block");
      assert.equal(
        response.headers.get("referrer-policy"),
        "strict-origin-when-cross-origin"
      );
      assert.equal(
        response.headers.get("permissions-policy"),
        "geolocation=(), camera=(), microphone=()"
      );

      // Verify X-Powered-By is omitted
      assert.equal(response.headers.get("x-powered-by"), null);
    } finally {
      await new Promise((resolve) => server.close(resolve));
    }
  });
});
