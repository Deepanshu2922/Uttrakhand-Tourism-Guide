import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/about', label: 'About' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/components', label: 'Components' },
  { to: '/login', label: 'Login' },
]

function Navbar() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <header className="sticky top-0 z-50 bg-forest-700 dark:bg-gray-900 text-white shadow-md transition-colors duration-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-y-2">
        <Link to="/" className="flex items-center gap-2 font-display text-lg sm:text-xl font-semibold tracking-wide">
          <span aria-hidden="true">🏔️</span>
          <span>Uttarakhand Tourism Guide</span>
        </Link>

        <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
          <ul className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm sm:text-base">
            {links.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`px-3 py-1.5 rounded-full transition-colors duration-200 ${
                      isActive
                        ? 'bg-white text-forest-700 dark:bg-forest-300 dark:text-gray-900 font-medium'
                        : 'hover:bg-forest-600 dark:hover:bg-gray-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
            className="ml-2 flex items-center justify-center w-9 h-9 rounded-full bg-forest-600 dark:bg-gray-700 hover:bg-forest-500 dark:hover:bg-gray-600 transition-colors duration-200 text-base"
          >
            <span aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
