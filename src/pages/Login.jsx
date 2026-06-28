import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-md mx-auto w-full px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-forest-700 dark:text-forest-300 mb-4">
          Login
        </h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          This is a placeholder login page. Authentication functionality
          (email/password, sessions, and user accounts) will be implemented
          in a later phase of this project.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-earth-100 dark:border-gray-700 shadow-sm p-6 space-y-4 transition-colors duration-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              disabled
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              disabled
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            />
          </div>
          <button
            disabled
            className="w-full rounded-lg bg-forest-300 dark:bg-gray-600 text-white py-2.5 text-sm font-medium cursor-not-allowed"
          >
            Login (coming soon)
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Login
