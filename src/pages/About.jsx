import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-forest-700 dark:text-forest-300 mb-4">
          About This Project
        </h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          This is a placeholder description for the Uttarakhand Tourism Guide
          project. In future updates, this page will explain the platform's
          mission to connect travellers with authentic homestays, curated
          destinations, and AI-powered trip planning across Uttarakhand.
          Backend integration, real data, and AI recommendation logic will be
          added in upcoming development phases.
        </p>
      </main>

      <Footer />
    </div>
  )
}

export default About
