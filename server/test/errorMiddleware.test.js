import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { notFound, errorHandler } from "../middleware/errorMiddleware.js";

describe("errorMiddleware security tests", () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  describe("errorHandler", () => {
    it("should NOT expose stack trace when NODE_ENV is undefined", () => {
      delete process.env.NODE_ENV;

      let statusCodeSent = null;
      let jsonSent = null;
      const res = {
        statusCode: 200,
        status(code) {
          statusCodeSent = code;
          return this;
        },
        json(payload) {
          jsonSent = payload;
          return this;
        },
      };

      const err = new Error("Database query failed");
      errorHandler(err, {}, res, () => {});

      assert.equal(statusCodeSent, 500);
      assert.equal(jsonSent.message, "Database query failed");
      assert.equal("stack" in jsonSent, false);
      assert.equal(jsonSent.stack, undefined);
    });

    it("should NOT expose stack trace in production mode", () => {
      process.env.NODE_ENV = "production";

      let statusCodeSent = null;
      let jsonSent = null;
      const res = {
        statusCode: 200,
        status(code) {
          statusCodeSent = code;
          return this;
        },
        json(payload) {
          jsonSent = payload;
          return this;
        },
      };

      const err = new Error("Sensitive connection error");
      errorHandler(err, {}, res, () => {});

      assert.equal(statusCodeSent, 500);
      assert.equal(jsonSent.message, "Sensitive connection error");
      assert.equal("stack" in jsonSent, false);
      assert.equal(jsonSent.stack, undefined);
    });

    it("should include stack trace in development mode for debugging", () => {
      process.env.NODE_ENV = "development";

      let statusCodeSent = null;
      let jsonSent = null;
      const res = {
        statusCode: 400,
        status(code) {
          statusCodeSent = code;
          return this;
        },
        json(payload) {
          jsonSent = payload;
          return this;
        },
      };

      const err = new Error("Validation error");
      errorHandler(err, {}, res, () => {});

      assert.equal(statusCodeSent, 400);
      assert.equal(jsonSent.message, "Validation error");
      assert.equal(typeof jsonSent.stack, "string");
      assert.ok(jsonSent.stack.includes("Validation error"));
    });
  });

  describe("notFound", () => {
    it("should set status 404 and forward error to next()", () => {
      let statusCodeSent = null;
      const res = {
        status(code) {
          statusCodeSent = code;
          return this;
        },
      };

      let forwardedError = null;
      const next = (err) => {
        forwardedError = err;
      };

      notFound({ originalUrl: "/api/unknown-endpoint" }, res, next);

      assert.equal(statusCodeSent, 404);
      assert.ok(forwardedError instanceof Error);
      assert.equal(forwardedError.message, "Not Found - /api/unknown-endpoint");
    });
  });
});
