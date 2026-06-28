/**
 * Button component
 * @param {React.ReactNode} children - Button content
 * @param {"primary" | "secondary"} [variant="primary"] - Button style
 * @param {Function} [onClick] - Click handler
 * @param {boolean} [disabled=false] - Whether the button is disabled
 * @param {"button" | "submit" | "reset"} [type="button"] - Native button type
 * @param {string} [className] - Extra classes appended to the default styling
 */
function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}) {
  const base =
    'inline-flex items-center justify-center rounded-full font-medium text-sm sm:text-base px-4 py-2 sm:px-5 sm:py-2.5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-forest-600 text-white hover:bg-forest-700 focus-visible:ring-forest-500 dark:bg-forest-500 dark:hover:bg-forest-600',
    secondary:
      'bg-white text-forest-700 border border-forest-200 hover:bg-forest-50 focus-visible:ring-forest-300 dark:bg-gray-800 dark:text-forest-100 dark:border-gray-600 dark:hover:bg-gray-700',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
