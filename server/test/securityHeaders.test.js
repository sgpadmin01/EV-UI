import express from "express";
import http from "http";
import securityHeaders from "../middleware/securityHeaders.js";

async function runTest() {
  const app = express();
  app.disable("x-powered-by");
  app.use(securityHeaders);

  app.get("/test", (req, res) => {
    res.send("OK");
  });

  const server = app.listen(0, () => {
    const port = server.address().port;
    http.get(`http://localhost:${port}/test`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          console.log("Status code:", res.statusCode);
          console.log("Headers:", res.headers);

          const expectedHeaders = {
            "x-content-type-options": "nosniff",
            "x-frame-options": "DENY",
            "x-xss-protection": "0",
            "referrer-policy": "no-referrer",
            "permissions-policy": "geolocation=(), microphone=(), camera=()",
          };

          for (const [header, expectedValue] of Object.entries(expectedHeaders)) {
            if (res.headers[header] !== expectedValue) {
              throw new Error(`Expected header ${header} to be '${expectedValue}', got '${res.headers[header]}'`);
            }
          }

          if (res.headers["x-powered-by"]) {
            throw new Error("Expected x-powered-by header to be disabled");
          }

          console.log("✅ All security headers verified successfully!");
          server.close(() => process.exit(0));
        } catch (err) {
          console.error("❌ Test failed:", err.message);
          server.close(() => process.exit(1));
        }
      });
    }).on("error", (err) => {
      console.error("❌ HTTP request failed:", err);
      server.close(() => process.exit(1));
    });
  });
}

runTest();
