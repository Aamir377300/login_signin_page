const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const signup = require("./routes/signup");
const login = require("./routes/login");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Debug incoming requests & cookies
app.use((req, res, next) => {
  console.log("➡️ Incoming request:", req.method, req.url);
  console.log("📩 Request cookies:", req.cookies);
  next();
});

// ✅ CORS setup (must come before routes)
app.use(
  cors({
    origin: "http://localhost:5173", // React frontend
    credentials: true, // allow sending cookies
  })
);

// ✅ Routes
app.use("/api/auth", signup);
app.use("/api/auth", login);

// ✅ Debug route to check cookies
app.get("/debug-cookies", (req, res) => {
  res.json({ cookies: req.cookies });
});

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// ✅ Server start
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
