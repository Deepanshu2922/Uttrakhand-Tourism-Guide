function Card({ icon, title, description }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-earth-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-forest-50 dark:bg-gray-700 text-2xl mb-4">
        <span aria-hidden="true">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-forest-700 dark:text-forest-300 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  )
}

export default Card
