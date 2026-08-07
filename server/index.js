import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import securityMiddleware from "./middleware/securityMiddleware.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Disable X-Powered-By at Express level for defense-in-depth
app.disable("x-powered-by");

connectDB();

// Apply security middleware early in the lifecycle
app.use(securityMiddleware);
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