function Hero() {
  return (
    <section className="bg-gradient-to-b from-sky-50 to-earth-100/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
        <p className="inline-block text-forest-600 bg-forest-50 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4">
          Devbhoomi · Land of the Gods
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold text-forest-700 leading-tight">
          Uttarakhand Tourism Guide
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
          Discover homestays, destinations, trekking routes, and AI-powered
          travel recommendations for your perfect Uttarakhand trip.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button className="px-5 py-2.5 rounded-full bg-forest-600 text-white text-sm sm:text-base font-medium shadow hover:bg-forest-700 transition-colors duration-200">
            Explore Destinations
          </button>
          <button className="px-5 py-2.5 rounded-full bg-white text-forest-700 text-sm sm:text-base font-medium border border-forest-200 hover:bg-forest-50 transition-colors duration-200">
            Find a Homestay
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
