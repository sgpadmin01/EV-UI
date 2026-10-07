import assert from "node:assert";
import { errorHandler, notFound } from "./errorMiddleware.js";

async function runTests() {
  console.log("Running errorMiddleware security tests...");

  // Mock response object
  function createMockRes() {
    return {
      statusCode: 200,
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

  // Test 1: NODE_ENV = development -> stack trace SHOULD be present
  process.env.NODE_ENV = "development";
  const resDev = createMockRes();
  const testError = new Error("Dev error test");
  errorHandler(testError, {}, resDev, () => {});
  assert.strictEqual(resDev.statusCode, 500);
  assert.strictEqual(resDev.body.message, "Dev error test");
  assert.ok(typeof resDev.body.stack === "string", "Stack trace should be present in development mode");
  console.log("✓ Test 1 Passed: Development mode includes stack trace");

  // Test 2: NODE_ENV = production -> stack trace SHOULD be null
  process.env.NODE_ENV = "production";
  const resProd = createMockRes();
  errorHandler(testError, {}, resProd, () => {});
  assert.strictEqual(resProd.statusCode, 500);
  assert.strictEqual(resProd.body.message, "Dev error test");
  assert.strictEqual(resProd.body.stack, null, "Stack trace should be null in production mode");
  console.log("✓ Test 2 Passed: Production mode hides stack trace (null)");

  // Test 3: NODE_ENV = undefined -> stack trace SHOULD be null (Fail securely)
  delete process.env.NODE_ENV;
  const resUnset = createMockRes();
  errorHandler(testError, {}, resUnset, () => {});
  assert.strictEqual(resUnset.statusCode, 500);
  assert.strictEqual(resUnset.body.message, "Dev error test");
  assert.strictEqual(resUnset.body.stack, null, "Stack trace should be null when NODE_ENV is unset");
  console.log("✓ Test 3 Passed: Unset NODE_ENV mode hides stack trace (null)");

  console.log("All errorMiddleware tests passed successfully!");
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
