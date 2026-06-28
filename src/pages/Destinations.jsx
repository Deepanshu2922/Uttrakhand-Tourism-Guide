import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Loader } from "../components/ui";
import {
  fetchDestinations,
  searchDestinations,
  fetchByCategory,
} from "../services/api.js";

// ─── Category filter options ───────────────────────────────────────────────────
const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "hill-station", label: "Hill Stations" },
  { value: "pilgrimage", label: "Pilgrimage" },
  { value: "adventure", label: "Adventure" },
  { value: "wildlife", label: "Wildlife" },
  { value: "trekking", label: "Trekking" },
  { value: "spiritual", label: "Spiritual" },
];

// ─── Star rating display ───────────────────────────────────────────────────────
function StarRating({ rating }) {
  const stars = Math.round(rating);
  return (
    <span className="text-yellow-400 text-sm" aria-label={`Rating: ${rating} out of 5`}>
      {"★".repeat(stars)}{"☆".repeat(5 - stars)}
      <span className="ml-1 text-gray-500 dark:text-gray-400 text-xs">{rating}</span>
    </span>
  );
}

// ─── Destination card ──────────────────────────────────────────────────────────
function DestinationCard({ destination }) {
  const { name, location, category, description, image, rating, bestSeason } =
    destination;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-earth-100 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col">
      <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800";
          }}
          loading="lazy"
        />
        <span className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/80 text-forest-700 dark:text-forest-300 text-xs font-medium px-2 py-1 rounded-full capitalize">
          {category.replace("-", " ")}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-forest-700 dark:text-forest-300 mb-1">
          {name}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          📍 {location}
        </p>
        <StarRating rating={rating} />
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1 line-clamp-3">
          {description}
        </p>
        <p className="mt-3 text-xs text-forest-600 dark:text-forest-400 font-medium">
          🗓️ Best Season: {bestSeason}
        </p>
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ query }) {
  return (
    <div className="col-span-full text-center py-16">
      <p className="text-4xl mb-3">🔍</p>
      <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
        {query ? `No results for "${query}"` : "No destinations found"}
      </p>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
        Try a different search term or category.
      </p>
    </div>
  );
}

// ─── Error state ──────────────────────────────────────────────────────────────
function ErrorState({ message, onRetry }) {
  return (
    <div className="col-span-full text-center py-16">
      <p className="text-4xl mb-3">⚠️</p>
      <p className="text-red-600 dark:text-red-400 font-medium text-lg">{message}</p>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 mb-4">
        Make sure the backend is running on{" "}
        <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">
          http://localhost:5000
        </code>
      </p>
      <button
        onClick={onRetry}
        className="px-4 py-2 rounded-full bg-forest-600 text-white text-sm hover:bg-forest-700 transition-colors duration-200"
      >
        Retry
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchInput, setSearchInput] = useState("");

  // Fetch all destinations on first render
  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchDestinations();
      setDestinations(res.data);
    } catch (err) {
      setError(err.message || "Failed to load destinations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // Re-fetch when the active category changes
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      setSearchQuery("");
      setSearchInput("");
      try {
        const res =
          activeCategory === "all"
            ? await fetchDestinations()
            : await fetchByCategory(activeCategory);
        setDestinations(res.data);
      } catch (err) {
        setError(err.message || "Failed to load destinations");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [activeCategory]);

  // Search handler
  async function handleSearch(e) {
    e.preventDefault();
    if (!searchInput.trim()) {
      setActiveCategory("all");
      loadAll();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await searchDestinations(searchInput);
      setDestinations(res.data);
      setSearchQuery(searchInput);
      setActiveCategory("all");
    } catch (err) {
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  }

  function handleClearSearch() {
    setSearchInput("");
    setSearchQuery("");
    setActiveCategory("all");
    loadAll();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-14">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-forest-700 dark:text-forest-300 mb-2">
            Explore Destinations
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover {destinations.length > 0 ? destinations.length : ""}{" "}
            handpicked destinations across Uttarakhand.
          </p>
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="flex gap-2 mb-6"
          role="search"
        >
          <div className="flex-1 relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search destinations, locations…"
              aria-label="Search destinations"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-forest-600 text-white text-sm font-medium hover:bg-forest-700 transition-colors duration-200"
          >
            Search
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              Clear
            </button>
          )}
        </form>

        {/* Category filters */}
        {!searchQuery && (
          <div
            className="flex flex-wrap gap-2 mb-8"
            role="group"
            aria-label="Filter by category"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                  activeCategory === cat.value
                    ? "bg-forest-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Active search label */}
        {searchQuery && (
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Showing results for{" "}
            <strong className="text-forest-700 dark:text-forest-300">
              "{searchQuery}"
            </strong>{" "}
            — {destinations.length} found.
          </p>
        )}

        {/* Content area */}
        <div
          className={`grid gap-5 ${
            loading
              ? "grid-cols-1"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }`}
        >
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
              <Loader size="lg" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Loading destinations…
              </p>
            </div>
          ) : error ? (
            <ErrorState message={error} onRetry={loadAll} />
          ) : destinations.length === 0 ? (
            <EmptyState query={searchQuery} />
          ) : (
            destinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Destinations;
