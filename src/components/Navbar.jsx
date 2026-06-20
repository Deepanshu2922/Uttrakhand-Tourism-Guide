import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/login', label: 'Login' },
]

function Navbar() {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 bg-forest-700 text-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-y-2">
        <Link to="/" className="flex items-center gap-2 font-display text-lg sm:text-xl font-semibold tracking-wide">
          <span aria-hidden="true">🏔️</span>
          <span>Uttarakhand Tourism Guide</span>
        </Link>

        <ul className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm sm:text-base">
          {links.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`px-3 py-1.5 rounded-full transition-colors duration-200 ${
                    isActive
                      ? 'bg-white text-forest-700 font-medium'
                      : 'hover:bg-forest-600'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
