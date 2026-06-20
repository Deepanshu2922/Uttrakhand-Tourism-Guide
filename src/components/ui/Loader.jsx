/**
 * Loader component
 * @param {"sm" | "md" | "lg"} [size="md"] - Size of the spinner
 * @param {string} [label="Loading..."] - Accessible label for screen readers
 */
function Loader({ size = 'md', label = 'Loading...' }) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-[3px]',
    lg: 'h-12 w-12 border-4',
  }

  return (
    <div role="status" className="inline-flex items-center justify-center">
      <span
        className={`animate-spin rounded-full border-forest-200 border-t-forest-600 dark:border-gray-600 dark:border-t-forest-400 ${
          sizes[size] ?? sizes.md
        }`}
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}

export default Loader
