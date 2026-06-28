/**
 * middleware/errorHandler.js
 *
 * Centralised Express error-handling middleware.
 * Must have exactly four parameters (err, req, res, next) for Express to
 * recognise it as an error handler rather than a regular middleware.
 *
 * Usage: mount AFTER all routes in server.js
 *   app.use(errorHandler);
 *
 * To trigger from any route or controller:
 *   next(new Error("Something went wrong"));
 *   // or attach a status code:
 *   const err = new Error("Not found"); err.status = 404; next(err);
 */

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // Log full stack trace on the server for debugging
  console.error("─── Unhandled Error ───────────────────────────────");
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.error(err.stack || err.message);
  console.error("────────────────────────────────────────────────────");

  // Determine the status code:
  // • Use the code attached to the error object if it looks like a valid HTTP code
  // • Fall back to 500 Internal Server Error
  const statusCode =
    err.status && err.status >= 400 && err.status < 600 ? err.status : 500;

  const response = {
    success: false,
    message: err.message || "An unexpected error occurred",
  };

  // In development mode expose the stack trace; hide it in production
  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

module.exports = errorHandler;
