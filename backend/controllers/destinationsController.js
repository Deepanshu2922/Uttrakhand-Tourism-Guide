/**
 * controllers/destinationsController.js
 *
 * Business-logic layer for all destination-related HTTP handlers.
 * Each exported function maps 1:1 to an Express route callback.
 * Controllers call the data layer and never touch req/res directly
 * beyond reading input and writing the response.
 */

const db = require("../data/destinations");

// ─── Required fields for POST (create) requests ───────────────────────────────
const REQUIRED_FIELDS = [
  "name",
  "location",
  "category",
  "description",
  "image",
  "rating",
  "bestSeason",
];

// ─── Allowed categories ────────────────────────────────────────────────────────
const ALLOWED_CATEGORIES = [
  "hill-station",
  "pilgrimage",
  "adventure",
  "wildlife",
  "trekking",
  "spiritual",
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Validates the body of a create/update request.
 * Returns an array of error strings (empty = valid).
 * @param {Object} body
 * @param {boolean} requireAll – true for POST, false for PUT (partial ok)
 * @returns {string[]}
 */
function validateBody(body, requireAll = true) {
  const errors = [];

  if (requireAll) {
    REQUIRED_FIELDS.forEach((field) => {
      if (body[field] === undefined || body[field] === null || body[field] === "") {
        errors.push(`"${field}" is required`);
      }
    });
  }

  if (body.rating !== undefined) {
    const r = Number(body.rating);
    if (isNaN(r) || r < 1 || r > 5) {
      errors.push('"rating" must be a number between 1 and 5');
    }
  }

  if (body.category !== undefined) {
    if (!ALLOWED_CATEGORIES.includes(body.category)) {
      errors.push(
        `"category" must be one of: ${ALLOWED_CATEGORIES.join(", ")}`
      );
    }
  }

  return errors;
}

// ─── Controllers ──────────────────────────────────────────────────────────────

/**
 * GET /api/destinations
 * Returns all destinations.
 */
function getAllDestinations(req, res) {
  const data = db.getAll();
  res.status(200).json({
    success: true,
    count: data.length,
    data,
  });
}

/**
 * GET /api/destinations/search?q=<query>
 * Searches destinations by name, location, or description.
 *
 * NOTE: This route must be registered BEFORE /:id in the router
 * so Express does not treat "search" as an id parameter.
 */
function searchDestinations(req, res) {
  const { q } = req.query;

  if (!q || q.trim() === "") {
    return res.status(400).json({
      success: false,
      message: 'Query parameter "q" is required and must not be empty',
    });
  }

  const results = db.search(q);

  res.status(200).json({
    success: true,
    query: q,
    count: results.length,
    data: results,
  });
}

/**
 * GET /api/destinations/category/:category
 * Returns all destinations matching a given category.
 *
 * NOTE: Also registered before /:id to avoid routing collision.
 */
function getByCategory(req, res) {
  const { category } = req.params;

  if (!ALLOWED_CATEGORIES.includes(category.toLowerCase())) {
    return res.status(400).json({
      success: false,
      message: `Invalid category. Allowed values: ${ALLOWED_CATEGORIES.join(", ")}`,
    });
  }

  const results = db.getByCategory(category);

  res.status(200).json({
    success: true,
    category,
    count: results.length,
    data: results,
  });
}

/**
 * GET /api/destinations/:id
 * Returns a single destination by its numeric id.
 */
function getDestinationById(req, res) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Destination id must be a valid integer",
    });
  }

  const destination = db.getById(id);

  if (!destination) {
    return res.status(404).json({
      success: false,
      message: `Destination with id ${id} not found`,
    });
  }

  res.status(200).json({ success: true, data: destination });
}

/**
 * POST /api/destinations
 * Creates a new destination.
 * Body must include all required fields.
 */
function createDestination(req, res) {
  const errors = validateBody(req.body, true);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // Pick only the known fields to avoid storing arbitrary data
  const { name, location, category, description, image, rating, bestSeason } =
    req.body;

  const created = db.create({
    name: name.trim(),
    location: location.trim(),
    category: category.toLowerCase().trim(),
    description: description.trim(),
    image: image.trim(),
    rating: parseFloat(Number(rating).toFixed(1)),
    bestSeason: bestSeason.trim(),
  });

  res.status(201).json({
    success: true,
    message: "Destination created successfully",
    data: created,
  });
}

/**
 * PUT /api/destinations/:id
 * Updates an existing destination (partial or full body accepted).
 */
function updateDestination(req, res) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Destination id must be a valid integer",
    });
  }

  const existing = db.getById(id);

  if (!existing) {
    return res.status(404).json({
      success: false,
      message: `Destination with id ${id} not found`,
    });
  }

  // Partial validation – only validate the fields that are being sent
  const errors = validateBody(req.body, false);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // Sanitise incoming fields
  const allowed = [
    "name",
    "location",
    "category",
    "description",
    "image",
    "rating",
    "bestSeason",
  ];

  const updates = {};
  allowed.forEach((key) => {
    if (req.body[key] !== undefined) {
      updates[key] =
        key === "rating"
          ? parseFloat(Number(req.body[key]).toFixed(1))
          : typeof req.body[key] === "string"
          ? req.body[key].trim()
          : req.body[key];
    }
  });

  const updated = db.update(id, updates);

  res.status(200).json({
    success: true,
    message: "Destination updated successfully",
    data: updated,
  });
}

/**
 * DELETE /api/destinations/:id
 * Deletes a destination. Returns 204 No Content on success.
 */
function deleteDestination(req, res) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Destination id must be a valid integer",
    });
  }

  const existing = db.getById(id);

  if (!existing) {
    return res.status(404).json({
      success: false,
      message: `Destination with id ${id} not found`,
    });
  }

  db.remove(id);

  // 204 No Content – no body expected by HTTP spec
  res.status(204).send();
}

module.exports = {
  getAllDestinations,
  searchDestinations,
  getByCategory,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
};
