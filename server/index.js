import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Disable X-Powered-By header to prevent technology disclosure
app.disable("x-powered-by");

connectDB();

// Custom Security Headers Middleware (Defense in Depth)
app.use((req, res, next) => {
  // Prevent clickjacking attacks by ensuring pages cannot be framed by other sites
  res.setHeader("X-Frame-Options", "SAMEORIGIN");

  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Enable XSS protection filter in older browsers
  res.setHeader("X-XSS-Protection", "1; mode=block");

  // Prevent cross-origin leakage of sensitive referrer information
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Implement strict Content-Security-Policy (CSP) to mitigate XSS and injection risks.
  // Permitted sources:
  // - 'self': the origin of the server itself
  // - 'unsafe-inline': required for inline script and styles used in HMI static files
  // - https://unpkg.com: required to fetch Lucide icons
  // - https://fonts.googleapis.com & https://fonts.gstatic.com: required for Google Fonts
  // - data: required for inline assets
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://unpkg.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data:;"
  );

  next();
});

app.use(cors());
app.use(express.json());

// Serve Static Client HMI Files
app.use(express.static(path.join(__dirname, "../client/pages")));
app.use("/css", express.static(path.join(__dirname, "../client/css")));

// Routes
app.use("/api/users", userRoutes);

// Error handling middleware (must come after routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});