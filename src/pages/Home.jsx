import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Card from '../components/Card.jsx'
import Footer from '../components/Footer.jsx'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: '🗺️',
    title: 'Destination Explorer',
    description:
      'Browse hill stations, temples, lakes, and trekking spots across Uttarakhand, from Nainital to Valley of Flowers.',
  },
  {
    icon: '🏡',
    title: 'Homestay Listings',
    description:
      'Find verified local homestays with authentic Pahadi hospitality, photos, pricing, and availability.',
  },
  {
    icon: '🤖',
    title: 'AI Travel Planner',
    description:
      'Get smart, personalized itineraries based on your interests, budget, and travel dates.',
  },
  {
    icon: '📩',
    title: 'Booking Inquiry System',
    description:
      'Send inquiries directly to homestay owners and tour operators and track your booking requests.',
  },
]

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <Hero />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-forest-700 dark:text-forest-300 text-center mb-2">
          What You Can Do Here
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10">
          Everything you need to plan your Uttarakhand journey, in one place.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-600 text-white font-medium hover:bg-forest-700 dark:bg-forest-500 dark:hover:bg-forest-600 transition-colors duration-200"
          >
            🗺️ Browse All Destinations
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
