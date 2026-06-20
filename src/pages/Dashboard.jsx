import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-forest-700 mb-4">
          Dashboard
        </h1>
        <p className="text-gray-600 leading-relaxed">
          This is a placeholder dashboard page. In future updates, this
          screen will show saved destinations, homestay booking inquiries,
          AI-generated itineraries, and personalized travel recommendations
          once the backend and AI features are connected.
        </p>
      </main>

      <Footer />
    </div>
  )
}

export default Dashboard
