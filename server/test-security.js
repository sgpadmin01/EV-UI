import http from "http";
import express from "express";
import securityHeaders from "./middleware/securityHeaders.js";

const app = express();
app.disable("x-powered-by");
app.use(securityHeaders);

app.get("/api/users", (req, res) => {
  res.json({ message: "User route working" });
});

const server = app.listen(0, () => {
  const port = server.address().port;
  http.get(`http://localhost:${port}/api/users`, (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      const headers = res.headers;
      const checks = [
        ["x-content-type-options", "nosniff"],
        ["x-frame-options", "DENY"],
        ["x-xss-protection", "1; mode=block"],
        ["referrer-policy", "strict-origin-when-cross-origin"],
      ];

      let failed = false;

      for (const [header, expected] of checks) {
        if (headers[header] !== expected) {
          console.error(`FAIL: ${header} expected "${expected}", got "${headers[header]}"`);
          failed = true;
        } else {
          console.log(`PASS: ${header} = "${expected}"`);
        }
      }

      if (headers["content-security-policy"]) {
        console.log(`PASS: content-security-policy present ("${headers["content-security-policy"]}")`);
      } else {
        console.error("FAIL: content-security-policy missing");
        failed = true;
      }

      if (headers["x-powered-by"]) {
        console.error(`FAIL: x-powered-by header exposed ("${headers["x-powered-by"]}")`);
        failed = true;
      } else {
        console.log("PASS: x-powered-by header disabled");
      }

      server.close(() => {
        if (failed) {
          console.error("Security header tests FAILED.");
          process.exit(1);
        } else {
          console.log("All security header tests PASSED successfully.");
          process.exit(0);
        }
      });
    });
  }).on("error", (err) => {
    console.error("Request error:", err);
    server.close(() => process.exit(1));
  });
});
