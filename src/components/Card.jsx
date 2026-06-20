function Card({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-earth-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-forest-50 text-2xl mb-4">
        <span aria-hidden="true">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-forest-700 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

export default Card
