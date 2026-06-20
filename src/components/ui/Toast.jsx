import { useEffect } from 'react'

/**
 * Toast component
 * @param {string} message - Text content shown in the toast
 * @param {"success" | "error"} [type="success"] - Visual style of the toast
 * @param {boolean} isVisible - Whether the toast is currently shown
 * @param {Function} [onHide] - Called automatically after the toast auto-hides (3s)
 */
function Toast({ message, type = 'success', isVisible, onHide }) {
  useEffect(() => {
    if (!isVisible) return undefined

    const timer = setTimeout(() => {
      onHide?.()
    }, 3000)

    return () => clearTimeout(timer)
  }, [isVisible, onHide])

  if (!isVisible) return null

  const styles = {
    success:
      'bg-forest-600 text-white dark:bg-forest-500 border border-forest-700/20',
    error: 'bg-red-600 text-white dark:bg-red-500 border border-red-700/20',
  }

  const icons = {
    success: '✓',
    error: '✕',
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-sm z-50 flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg text-sm sm:text-base ${
        styles[type] ?? styles.success
      }`}
    >
      <span aria-hidden="true" className="font-bold">
        {icons[type] ?? icons.success}
      </span>
      <span>{message}</span>
    </div>
  )
}

export default Toast
