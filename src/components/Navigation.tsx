export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-deep-black/95 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        <div className="text-2xl font-serif text-off-white">
          AdGenius AI
        </div>
        <div className="flex gap-8">
          <button className="text-cream hover:text-gold transition-colors">
            How It Works
          </button>
          <button className="text-cream hover:text-gold transition-colors">
            Pricing
          </button>
          <button className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-deep-black transition-all duration-300">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}