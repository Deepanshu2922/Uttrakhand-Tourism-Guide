import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Loader } from "../components/ui";
import { fetchDestinations } from "../services/api.js";

function Dashboard() {
  const [destCount, setDestCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchDestinations();
        setDestCount(res.count);
      } catch (err) {
        setError("Backend offline – showing cached values");
        setDestCount("–");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const stats = [
    { label: "Live Destinations", value: loading ? null : destCount, icon: "📍" },
    { label: "Homestay Inquiries", value: "0", icon: "🏡" },
    { label: "AI Itineraries", value: "0", icon: "🤖" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-earth-100/40 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-forest-700 dark:text-forest-300 mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          Live stats are pulled from the backend API. Booking inquiries and AI
          itineraries will be connected in future weeks.
        </p>

        {error && (
          <div className="mb-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300 rounded-lg text-sm">
            ⚠️ {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-800 border border-earth-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm transition-colors duration-200"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-forest-50 dark:bg-gray-700 text-xl mb-3">
                <span aria-hidden="true">{stat.icon}</span>
              </div>
              {stat.value === null ? (
                <div className="mt-1"><Loader size="sm" /></div>
              ) : (
                <p className="text-2xl font-bold text-forest-700 dark:text-forest-300">
                  {stat.value}
                </p>
              )}
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
