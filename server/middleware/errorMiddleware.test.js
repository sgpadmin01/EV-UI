import test from "node:test";
import assert from "node:assert/strict";
import { notFound, errorHandler } from "./errorMiddleware.js";

test("notFound middleware sets status 404 and calls next with Error", () => {
  const req = { originalUrl: "/api/unknown" };
  let capturedStatus = null;
  const res = {
    status(code) {
      capturedStatus = code;
      return this;
    },
  };
  let capturedError = null;
  notFound(req, res, (err) => {
    capturedError = err;
  });

  assert.equal(capturedStatus, 404);
  assert.equal(capturedError instanceof Error, true);
  assert.equal(capturedError.message, "Not Found - /api/unknown");
});

test("errorHandler suppresses stack trace when NODE_ENV is undefined", () => {
  const originalEnv = process.env.NODE_ENV;
  delete process.env.NODE_ENV;

  try {
    const err = new Error("Something went wrong");
    let statusCode = 200;
    let jsonResponse = null;
    const res = {
      statusCode,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        jsonResponse = data;
      },
    };

    errorHandler(err, {}, res, () => {});

    assert.equal(res.statusCode, 500);
    assert.equal(jsonResponse.message, "Something went wrong");
    assert.equal(jsonResponse.stack, null);
  } finally {
    process.env.NODE_ENV = originalEnv;
  }
});

test("errorHandler suppresses stack trace in production", () => {
  const originalEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";

  try {
    const err = new Error("Production error");
    let jsonResponse = null;
    const res = {
      statusCode: 400,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        jsonResponse = data;
      },
    };

    errorHandler(err, {}, res, () => {});

    assert.equal(res.statusCode, 400);
    assert.equal(jsonResponse.message, "Production error");
    assert.equal(jsonResponse.stack, null);
  } finally {
    process.env.NODE_ENV = originalEnv;
  }
});

test("errorHandler suppresses stack trace in staging or test", () => {
  const originalEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "staging";

  try {
    const err = new Error("Staging error");
    let jsonResponse = null;
    const res = {
      statusCode: 500,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        jsonResponse = data;
      },
    };

    errorHandler(err, {}, res, () => {});

    assert.equal(jsonResponse.stack, null);
  } finally {
    process.env.NODE_ENV = originalEnv;
  }
});

test("errorHandler includes stack trace when NODE_ENV is development", () => {
  const originalEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";

  try {
    const err = new Error("Dev error");
    let jsonResponse = null;
    const res = {
      statusCode: 500,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        jsonResponse = data;
      },
    };

    errorHandler(err, {}, res, () => {});

    assert.equal(jsonResponse.message, "Dev error");
    assert.equal(typeof jsonResponse.stack, "string");
    assert.match(jsonResponse.stack, /Error: Dev error/);
  } finally {
    process.env.NODE_ENV = originalEnv;
  }
});
