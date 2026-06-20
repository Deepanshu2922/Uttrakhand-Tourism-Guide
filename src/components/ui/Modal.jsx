import { useEffect } from 'react'

/**
 * Modal component
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {string} [title] - Modal heading text
 * @param {React.ReactNode} children - Modal body content
 * @param {Function} onClose - Called when the overlay or close button is clicked
 */
function Modal({ isOpen, title, children, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-md sm:max-w-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-2xl shadow-xl p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          {title && (
            <h2 id="modal-title" className="text-lg sm:text-xl font-semibold text-forest-700 dark:text-forest-300">
              {title}
            </h2>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="ml-auto text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 text-xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="text-sm sm:text-base">{children}</div>
      </div>
    </div>
  )
}

export default Modal
