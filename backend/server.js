/**
 * server.js
 *
 * Entry point for the Uttarakhand Tourism Guide – Express REST API.
 *
 * Responsibilities:
 *  1. Load environment variables from .env
 *  2. Create and configure the Express application
 *  3. Register global middleware (CORS, JSON parsing, logger)
 *  4. Mount route handlers
 *  5. Register the 404 catch-all and global error handler
 *  6. Start listening on the configured port
 */

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const destinationsRouter = require("./routes/destinations");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");

// ─── App Initialisation ───────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;

// ─── CORS Configuration ───────────────────────────────────────────────────────
//  Allow the React dev server (Vite default: 5173) and any origin listed in
//  FRONTEND_ORIGIN so the browser doesn't block API responses.
const allowedOrigins = [
  "http://localhost:5173",  // Vite default
  "http://localhost:3000",  // CRA / alternate dev server
  process.env.FRONTEND_ORIGIN,
].filter(Boolean); // remove undefined if FRONTEND_ORIGIN is not set

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy: origin "${origin}" is not allowed`));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(cors(corsOptions));          // Handle cross-origin requests
app.use(express.json());             // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(requestLogger);              // Log every request to stdout

// ─── Health Check ─────────────────────────────────────────────────────────────
/**
 * GET /api/health
 * A quick endpoint to verify the server is running and the data layer works.
 */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Uttarakhand Tourism API is running 🏔️",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/destinations", destinationsRouter);

// ─── 404 Handler (unknown routes) ────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
// Must be mounted AFTER all routes – Express identifies it by the 4-argument
// signature (err, req, res, next).
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log("────────────────────────────────────────────────────");
  console.log("  🏔️  Uttarakhand Tourism Guide – Backend API");
  console.log("────────────────────────────────────────────────────");
  console.log(`  Status   : Running`);
  console.log(`  Port     : ${PORT}`);
  console.log(`  Env      : ${process.env.NODE_ENV || "development"}`);
  console.log(`  Base URL : http://localhost:${PORT}/api`);
  console.log("  Endpoints:");
  console.log(`    GET    /api/health`);
  console.log(`    GET    /api/destinations`);
  console.log(`    GET    /api/destinations/search?q=`);
  console.log(`    GET    /api/destinations/category/:category`);
  console.log(`    GET    /api/destinations/:id`);
  console.log(`    POST   /api/destinations`);
  console.log(`    PUT    /api/destinations/:id`);
  console.log(`    DELETE /api/destinations/:id`);
  console.log("────────────────────────────────────────────────────");
});

module.exports = app; // exported for potential future testing
