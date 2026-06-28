/**
 * src/services/api.js
 *
 * Centralised HTTP client for all calls to the Uttarakhand Tourism backend.
 *
 * All functions return a resolved value on success and throw an Error on
 * failure, so callers only need a try/catch (or .catch) to handle errors.
 *
 * Base URL is read from the Vite env variable VITE_API_BASE_URL.
 * If the variable is not set, it defaults to the local dev backend.
 * To customise: create a .env file in the frontend root with:
 *   VITE_API_BASE_URL=http://localhost:5000/api
 */

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// ─── Internal helper ──────────────────────────────────────────────────────────

/**
 * Wraps fetch with consistent error handling and JSON parsing.
 * @param {string} path     – path appended to BASE_URL
 * @param {RequestInit} [options] – fetch options (method, headers, body…)
 * @returns {Promise<any>}  – parsed JSON response data
 * @throws {Error}          – with a human-readable message on HTTP or network errors
 */
async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  const defaultHeaders = { "Content-Type": "application/json" };

  const response = await fetch(url, {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  });

  // Try to parse the body regardless of status so we can surface the API
  // error message to the caller
  let json;
  try {
    json = await response.json();
  } catch {
    // Response had no body or wasn't JSON (e.g. 204 No Content)
    json = null;
  }

  if (!response.ok) {
    const message =
      json?.message ||
      `Request failed with status ${response.status}`;
    const err = new Error(message);
    err.status = response.status;
    err.data = json;
    throw err;
  }

  return json;
}

// ─── Public API functions ─────────────────────────────────────────────────────

/**
 * Fetches all destinations.
 * @returns {Promise<{success: boolean, count: number, data: Array}>}
 */
export async function fetchDestinations() {
  return request("/destinations");
}

/**
 * Fetches a single destination by id.
 * @param {number|string} id
 * @returns {Promise<{success: boolean, data: Object}>}
 */
export async function fetchDestinationById(id) {
  return request(`/destinations/${id}`);
}

/**
 * Searches destinations by name, location, or description.
 * @param {string} query
 * @returns {Promise<{success: boolean, count: number, data: Array}>}
 */
export async function searchDestinations(query) {
  const encoded = encodeURIComponent(query.trim());
  return request(`/destinations/search?q=${encoded}`);
}

/**
 * Fetches destinations filtered by category.
 * @param {string} category
 * @returns {Promise<{success: boolean, count: number, data: Array}>}
 */
export async function fetchByCategory(category) {
  return request(`/destinations/category/${encodeURIComponent(category)}`);
}

/**
 * Creates a new destination.
 * @param {Object} payload – destination fields
 * @returns {Promise<{success: boolean, message: string, data: Object}>}
 */
export async function createDestination(payload) {
  return request("/destinations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * Updates an existing destination (partial or full update).
 * @param {number|string} id
 * @param {Object} payload – fields to update
 * @returns {Promise<{success: boolean, message: string, data: Object}>}
 */
export async function updateDestination(id, payload) {
  return request(`/destinations/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/**
 * Deletes a destination by id.
 * Returns null on success (server sends 204 No Content).
 * @param {number|string} id
 * @returns {Promise<null>}
 */
export async function deleteDestination(id) {
  return request(`/destinations/${id}`, { method: "DELETE" });
}

/**
 * Quick health-check to verify the backend is reachable.
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function healthCheck() {
  return request("/health");
}
