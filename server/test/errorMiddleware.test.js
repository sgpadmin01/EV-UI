import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { errorHandler, notFound } from "../middleware/errorMiddleware.js";

describe("errorMiddleware", () => {
  let originalEnv;

  beforeEach(() => {
    originalEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.NODE_ENV;
    } else {
      process.env.NODE_ENV = originalEnv;
    }
  });

  describe("notFound middleware", () => {
    it("sets 404 status and passes Error to next()", () => {
      let passedStatus;
      let passedError;

      const req = { originalUrl: "/api/unknown-endpoint" };
      const res = {
        status: (code) => {
          passedStatus = code;
          return res;
        },
      };
      const next = (err) => {
        passedError = err;
      };

      notFound(req, res, next);

      assert.equal(passedStatus, 404);
      assert.ok(passedError instanceof Error);
      assert.equal(passedError.message, "Not Found - /api/unknown-endpoint");
    });
  });

  describe("errorHandler middleware security", () => {
    it("does not leak stack traces when NODE_ENV is unset", () => {
      delete process.env.NODE_ENV;

      let statusCodeSet;
      let jsonPayload;

      const req = {};
      const res = {
        statusCode: 200,
        status: (code) => {
          statusCodeSet = code;
          return res;
        },
        json: (payload) => {
          jsonPayload = payload;
          return res;
        },
      };
      const err = new Error("Database query failed");
      err.stack = "Error: Database query failed\n    at SecretService (/app/server/secret.js:10:5)";

      errorHandler(err, req, res, () => {});

      assert.equal(statusCodeSet, 500);
      assert.equal(jsonPayload.message, "Database query failed");
      assert.equal(jsonPayload.stack, undefined);
      assert.equal("stack" in jsonPayload, false);
    });

    it("does not leak stack traces in production environment", () => {
      process.env.NODE_ENV = "production";

      let statusCodeSet;
      let jsonPayload;

      const req = {};
      const res = {
        statusCode: 500,
        status: (code) => {
          statusCodeSet = code;
          return res;
        },
        json: (payload) => {
          jsonPayload = payload;
          return res;
        },
      };
      const err = new Error("Production error");
      err.stack = "Error: Production error\n    at internalFunction (/app/server/secret.js:10:5)";

      errorHandler(err, req, res, () => {});

      assert.equal(statusCodeSet, 500);
      assert.equal(jsonPayload.message, "Production error");
      assert.equal(jsonPayload.stack, undefined);
      assert.equal("stack" in jsonPayload, false);
    });

    it("includes stack traces only when NODE_ENV is explicitly 'development'", () => {
      process.env.NODE_ENV = "development";

      let statusCodeSet;
      let jsonPayload;

      const req = {};
      const res = {
        statusCode: 400,
        status: (code) => {
          statusCodeSet = code;
          return res;
        },
        json: (payload) => {
          jsonPayload = payload;
          return res;
        },
      };
      const err = new Error("Validation error");
      err.stack = "Error: Validation error\n    at validate (/app/server/validator.js:5:1)";

      errorHandler(err, req, res, () => {});

      assert.equal(statusCodeSet, 400);
      assert.equal(jsonPayload.message, "Validation error");
      assert.equal(jsonPayload.stack, err.stack);
    });

    it("preserves non-200 status codes", () => {
      delete process.env.NODE_ENV;

      let statusCodeSet;
      const req = {};
      const res = {
        statusCode: 403,
        status: (code) => {
          statusCodeSet = code;
          return res;
        },
        json: () => {},
      };
      const err = new Error("Forbidden");

      errorHandler(err, req, res, () => {});

      assert.equal(statusCodeSet, 403);
    });
  });
});
