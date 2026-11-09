import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import express from "express";

test("security hardening: X-Powered-By header is disabled", async (t) => {
  const app = express();
  app.disable("x-powered-by");

  app.get("/test", (req, res) => {
    res.json({ status: "ok" });
  });

  const server = http.createServer(app);

  await new Promise((resolve) => server.listen(0, resolve));
  t.after(() => server.close());

  const address = server.address();
  const res = await fetch(`http://127.0.0.1:${address.port}/test`);

  assert.equal(res.status, 200);
  assert.equal(
    res.headers.get("x-powered-by"),
    null,
    "Expected 'x-powered-by' header to not be present"
  );
});
