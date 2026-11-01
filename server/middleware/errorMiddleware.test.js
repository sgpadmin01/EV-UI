import test from "node:test";
import assert from "node:assert/strict";
import { notFound, errorHandler } from "./errorMiddleware.js";

test("notFound middleware sets status 404 and forwards error to next()", () => {
  let statusCode = null;
  let forwardedError = null;

  const req = { originalUrl: "/api/nonexistent" };
  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
  };
  const next = (err) => {
    forwardedError = err;
  };

  notFound(req, res, next);

  assert.equal(statusCode, 404);
  assert.equal(forwardedError.message, "Not Found - /api/nonexistent");
});

test("errorHandler fails securely by hiding stack trace when NODE_ENV is undefined", () => {
  const originalEnv = process.env.NODE_ENV;
  delete process.env.NODE_ENV;

  try {
    const err = new Error("Test internal failure");
    let statusCode = null;
    let jsonBody = null;

    const req = {};
    const res = {
      statusCode: 200,
      status(code) {
        this.statusCode = code;
        statusCode = code;
        return this;
      },
      json(data) {
        jsonBody = data;
        return this;
      },
    };

    errorHandler(err, req, res, () => {});

    assert.equal(statusCode, 500);
    assert.equal(jsonBody.message, "Test internal failure");
    assert.equal(jsonBody.stack, null, "Stack trace must not leak when NODE_ENV is unset");
  } finally {
    process.env.NODE_ENV = originalEnv;
  }
});

test("errorHandler hides stack trace when NODE_ENV is production", () => {
  const originalEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";

  try {
    const err = new Error("Production error");
    let jsonBody = null;

    const req = {};
    const res = {
      statusCode: 500,
      status() { return this; },
      json(data) { jsonBody = data; return this; },
    };

    errorHandler(err, req, res, () => {});

    assert.equal(jsonBody.stack, null, "Stack trace must be null in production");
  } finally {
    process.env.NODE_ENV = originalEnv;
  }
});

test("errorHandler includes stack trace when NODE_ENV is development", () => {
  const originalEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";

  try {
    const err = new Error("Development error");
    let jsonBody = null;

    const req = {};
    const res = {
      statusCode: 500,
      status() { return this; },
      json(data) { jsonBody = data; return this; },
    };

    errorHandler(err, req, res, () => {});

    assert.equal(jsonBody.stack, err.stack, "Stack trace must be included in development");
  } finally {
    process.env.NODE_ENV = originalEnv;
  }
});
