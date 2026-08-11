import mongoose from "mongoose";
import http from "http";

// Mock database connection to run the server offline
mongoose.connect = async () => {
  console.log("[Test] Mocked mongoose.connect called successfully.");
  return {
    connection: {
      host: "mocked-test-database",
    },
  };
};

// Set port for testing to avoid conflicts
const TEST_PORT = 5002;
process.env.PORT = TEST_PORT;
process.env.MONGODB_URI = "mongodb://localhost:27017/test";

console.log("[Test] Starting Express server wrapper...");

// Import the server dynamically so it starts
import("./index.js").then(() => {
  console.log(`[Test] Server started on port ${TEST_PORT}. Running assertions...`);

  // Wait a short delay to ensure server is fully listening
  setTimeout(() => {
    const options = {
      hostname: "localhost",
      port: TEST_PORT,
      path: "/api/users",
      method: "GET",
    };

    const req = http.request(options, (res) => {
      console.log(`[Test] Received Response Status: ${res.statusCode}`);
      const headers = res.headers;

      let passed = true;

      const assertHeader = (headerName, expectedValue) => {
        const val = headers[headerName.toLowerCase()];
        if (val === expectedValue) {
          console.log(`✅ [PASS] ${headerName}: "${val}"`);
        } else {
          console.error(`❌ [FAIL] ${headerName}: Expected "${expectedValue}", got "${val}"`);
          passed = false;
        }
      };

      // Assert that custom security headers are present
      assertHeader("x-frame-options", "DENY");
      assertHeader("x-content-type-options", "nosniff");
      assertHeader("referrer-policy", "strict-origin-when-cross-origin");
      assertHeader("x-permitted-cross-domain-policies", "none");

      // Assert Content Security Policy is configured correctly
      const csp = headers["content-security-policy"];
      if (csp && csp.includes("default-src 'self'")) {
        console.log(`✅ [PASS] Content-Security-Policy: "${csp}"`);
      } else {
        console.error(`❌ [FAIL] Content-Security-Policy: Expected to contain "default-src 'self'", got "${csp}"`);
        passed = false;
      }

      // Assert x-powered-by header is absent (disabled)
      if (headers["x-powered-by"]) {
        console.error(`❌ [FAIL] X-Powered-By header is present: "${headers["x-powered-by"]}"`);
        passed = false;
      } else {
        console.log("✅ [PASS] X-Powered-By: (absent)");
      }

      if (passed) {
        console.log("\n🎉 [SUCCESS] All security checks passed successfully!");
        process.exit(0);
      } else {
        console.error("\n💥 [FAILURE] Some security checks failed.");
        process.exit(1);
      }
    });

    req.on("error", (err) => {
      console.error(`[Test] Request failed: ${err.message}`);
      process.exit(1);
    });

    req.end();
  }, 1000);
}).catch((err) => {
  console.error(`[Test] Failed to load index.js: ${err.message}`);
  process.exit(1);
});
