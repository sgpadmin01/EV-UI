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

connectDB();

// Security Headers Middleware (Defense in Depth)
app.use((req, res, next) => {
  // Prevent MIME type sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  // Prevent clickjacking by restricting framing to same origin
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  // Enable browser XSS filtering
  res.setHeader("X-XSS-Protection", "1; mode=block");
  // Limit referrer information sent with requests
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  // Restrict sensitive browser features
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
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