function Footer() {
  return (
    <footer className="bg-forest-700 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <p>© {new Date().getFullYear()} Uttarakhand Tourism Guide. All rights reserved.</p>
        <p className="text-forest-100">Made with 🏔️ for travellers exploring Devbhoomi</p>
      </div>
    </footer>
  )
}

export default Footer
