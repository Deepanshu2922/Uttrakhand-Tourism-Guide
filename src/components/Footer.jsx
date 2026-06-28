function Footer() {
  return (
    <footer className="bg-forest-700 dark:bg-gray-900 text-white mt-auto transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <p>© {new Date().getFullYear()} Uttarakhand Tourism Guide. All rights reserved.</p>
        <p className="text-forest-100 dark:text-gray-400">Made with 🏔️ for travellers exploring Devbhoomi</p>
      </div>
    </footer>
  )
}

export default Footer
