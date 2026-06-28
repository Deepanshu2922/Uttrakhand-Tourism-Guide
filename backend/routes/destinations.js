/**
 * routes/destinations.js
 *
 * Maps HTTP method + path combinations to the correct controller functions.
 *
 * Base path mounted in server.js: /api/destinations
 *
 * IMPORTANT ordering note:
 *   Express matches routes top-to-bottom.  The static segments
 *   "/search" and "/category/:category" must be declared BEFORE the
 *   dynamic "/:id" segment, otherwise Express would interpret the word
 *   "search" as an id value and call getDestinationById instead.
 *
 * Full route table (relative to mount point):
 *   GET    /                          → getAllDestinations
 *   GET    /search?q=<query>          → searchDestinations
 *   GET    /category/:category        → getByCategory
 *   GET    /:id                       → getDestinationById
 *   POST   /                          → createDestination
 *   PUT    /:id                       → updateDestination
 *   DELETE /:id                       → deleteDestination
 */

const express = require("express");
const router = express.Router();

const {
  getAllDestinations,
  searchDestinations,
  getByCategory,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} = require("../controllers/destinationsController");

// ── Static routes first ────────────────────────────────────────────────────────
router.get("/search", searchDestinations);           // GET /search?q=
router.get("/category/:category", getByCategory);    // GET /category/adventure

// ── Collection routes ─────────────────────────────────────────────────────────
router.get("/", getAllDestinations);                  // GET /
router.post("/", createDestination);                 // POST /

// ── Single-resource routes ────────────────────────────────────────────────────
router.get("/:id", getDestinationById);              // GET /:id
router.put("/:id", updateDestination);               // PUT /:id
router.delete("/:id", deleteDestination);            // DELETE /:id

module.exports = router;
