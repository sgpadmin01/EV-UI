import { test, describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { errorHandler, notFound } from "../middleware/errorMiddleware.js";

describe("Security - errorMiddleware", () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  function createMockResponse(initialStatusCode = 200) {
    return {
      statusCode: initialStatusCode,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.body = data;
        return this;
      },
    };
  }

  test("does not expose stack trace when NODE_ENV is undefined", () => {
    delete process.env.NODE_ENV;
    const req = {};
    const res = createMockResponse();
    const err = new Error("Database connection timed out");
    err.stack = "Error: Database connection timed out\n    at /secret/db.js:10:5";

    errorHandler(err, req, res, () => {});

    assert.equal(res.statusCode, 500);
    assert.equal(res.body.message, "Database connection timed out");
    assert.equal(res.body.stack, null);
  });

  test("does not expose stack trace when NODE_ENV is production", () => {
    process.env.NODE_ENV = "production";
    const req = {};
    const res = createMockResponse();
    const err = new Error("Internal failure");
    err.stack = "Error: stack trace details";

    errorHandler(err, req, res, () => {});

    assert.equal(res.statusCode, 500);
    assert.equal(res.body.stack, null);
  });

  test("does not expose stack trace when NODE_ENV is test", () => {
    process.env.NODE_ENV = "test";
    const req = {};
    const res = createMockResponse();
    const err = new Error("Test failure");
    err.stack = "Error: stack trace details";

    errorHandler(err, req, res, () => {});

    assert.equal(res.statusCode, 500);
    assert.equal(res.body.stack, null);
  });

  test("exposes stack trace only when NODE_ENV is development", () => {
    process.env.NODE_ENV = "development";
    const req = {};
    const res = createMockResponse();
    const err = new Error("Dev debug error");
    err.stack = "Error: Dev debug error\n    at /app/dev.js:1:1";

    errorHandler(err, req, res, () => {});

    assert.equal(res.statusCode, 500);
    assert.equal(res.body.stack, err.stack);
  });

  test("preserves non-200 status codes", () => {
    delete process.env.NODE_ENV;
    const req = {};
    const res = createMockResponse(403);
    const err = new Error("Access forbidden");

    errorHandler(err, req, res, () => {});

    assert.equal(res.statusCode, 403);
    assert.equal(res.body.message, "Access forbidden");
    assert.equal(res.body.stack, null);
  });

  test("notFound creates 404 error with request URL", () => {
    const req = { originalUrl: "/api/nonexistent" };
    const res = createMockResponse();
    let passedError = null;

    notFound(req, res, (err) => {
      passedError = err;
    });

    assert.equal(res.statusCode, 404);
    assert.ok(passedError instanceof Error);
    assert.equal(passedError.message, "Not Found - /api/nonexistent");
  });
});
