/**
 * middleware/requestLogger.js
 *
 * Lightweight request logger that prints each incoming request to stdout.
 * Format:  [ISO-timestamp] METHOD /path  →  STATUS  (Xms)
 *
 * This runs in all environments (development and production).
 * In production you could swap this out for a dedicated logger like morgan.
 */

function requestLogger(req, res, next) {
  const start = Date.now();

  // Wait until the response is finished to log the status code
  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    // Colour-code the status line for easy scanning in the terminal
    const colour =
      status >= 500
        ? "\x1b[31m" // red
        : status >= 400
        ? "\x1b[33m" // yellow
        : status >= 200
        ? "\x1b[32m" // green
        : "\x1b[36m"; // cyan

    const reset = "\x1b[0m";

    console.log(
      `[${new Date().toISOString()}] ${req.method.padEnd(7)} ${req.originalUrl.padEnd(40)} ${colour}${status}${reset}  (${duration}ms)`
    );
  });

  next();
}

module.exports = requestLogger;
