import test from "node:test";
import assert from "node:assert/strict";
import { errorHandler } from "../middleware/errorMiddleware.js";

test("errorHandler fails securely by hiding stack traces unless NODE_ENV is development", async (t) => {
  const originalEnv = process.env.NODE_ENV;

  t.afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.NODE_ENV;
    } else {
      process.env.NODE_ENV = originalEnv;
    }
  });

  await t.test("does not expose stack trace when NODE_ENV is unset", () => {
    delete process.env.NODE_ENV;
    let payload = null;
    let status = null;
    const req = {};
    const res = {
      statusCode: 200,
      status(code) { status = code; return this; },
      json(data) { payload = data; return this; }
    };

    errorHandler(new Error("Database connection timeout"), req, res, () => {});
    assert.equal(status, 500);
    assert.equal(payload.message, "Database connection timeout");
    assert.equal(payload.stack, null);
  });

  await t.test("does not expose stack trace when NODE_ENV is production", () => {
    process.env.NODE_ENV = "production";
    let payload = null;
    const req = {};
    const res = {
      statusCode: 500,
      status() { return this; },
      json(data) { payload = data; return this; }
    };

    errorHandler(new Error("Internal server error"), req, res, () => {});
    assert.equal(payload.stack, null);
  });

  await t.test("exposes stack trace only when NODE_ENV is development", () => {
    process.env.NODE_ENV = "development";
    let payload = null;
    const req = {};
    const res = {
      statusCode: 500,
      status() { return this; },
      json(data) { payload = data; return this; }
    };

    errorHandler(new Error("Dev debug error"), req, res, () => {});
    assert.notEqual(payload.stack, null);
    assert.match(payload.stack, /Error: Dev debug error/);
  });
});
