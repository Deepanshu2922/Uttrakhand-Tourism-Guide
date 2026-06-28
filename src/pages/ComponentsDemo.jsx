import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Button, Input, Modal, Toast, Loader } from '../components/ui'
import { useTheme } from '../context/ThemeContext.jsx'

function ComponentsDemo() {
  const [name, setName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toast, setToast] = useState({ isVisible: false, type: 'success', message: '' })
  const { theme, toggleTheme } = useTheme()
  const isDarkMode = theme === 'dark'

  const showToast = (type) => {
    setToast({
      isVisible: true,
      type,
      message:
        type === 'success'
          ? 'Your homestay inquiry was sent successfully!'
          : 'Something went wrong. Please try again.',
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16 space-y-14">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-forest-700 dark:text-forest-300 mb-2">
              UI Component Library
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              A live preview of the shared, reusable components used across the
              Uttarakhand Tourism Guide platform.
            </p>
          </div>
          <Button variant="secondary" onClick={toggleTheme}>
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </Button>
        </div>

        {/* Buttons */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-forest-700 dark:text-forest-300 mb-4">
            Buttons
          </h2>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Button variant="primary" onClick={() => showToast('success')}>
              Primary Button
            </Button>
            <Button variant="secondary" onClick={() => showToast('error')}>
              Secondary Button
            </Button>
            <Button variant="primary" disabled>
              Disabled Button
            </Button>
          </div>
        </section>

        {/* Input */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-forest-700 dark:text-forest-300 mb-4">
            Input Field
          </h2>
          <div className="max-w-sm">
            <Input
              label="Your Name"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              name="demoName"
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              You typed: <span className="font-medium">{name || '(nothing yet)'}</span>
            </p>
          </div>
        </section>

        {/* Modal */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-forest-700 dark:text-forest-300 mb-4">
            Modal
          </h2>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Open Booking Modal
          </Button>

          <Modal
            isOpen={isModalOpen}
            title="Booking Inquiry"
            onClose={() => setIsModalOpen(false)}
          >
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              This is a placeholder modal for sending a homestay booking
              inquiry. Real submission logic will be added in a later phase.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsModalOpen(false)
                  showToast('success')
                }}
              >
                Send Inquiry
              </Button>
            </div>
          </Modal>
        </section>

        {/* Toast */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-forest-700 dark:text-forest-300 mb-4">
            Toast Notifications
          </h2>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Button variant="primary" onClick={() => showToast('success')}>
              Show Success Toast
            </Button>
            <Button variant="secondary" onClick={() => showToast('error')}>
              Show Error Toast
            </Button>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Toasts auto-hide after 3 seconds.
          </p>
        </section>

        {/* Loader */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-forest-700 dark:text-forest-300 mb-4">
            Loader
          </h2>
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Loader size="sm" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Small</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Loader size="md" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Medium</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Loader size="lg" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Large</span>
            </div>
          </div>
        </section>
      </main>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onHide={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />

      <Footer />
    </div>
  )
}

export default ComponentsDemo
