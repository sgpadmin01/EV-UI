import express from "express";

const router = express.Router();

// Example placeholder route
router.get("/", (req, res) => {
  res.json({ message: "User route working" });
});

export default router;
