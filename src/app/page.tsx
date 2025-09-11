import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center pt-20">
      <div className="text-center px-8">
        <h1 className="text-7xl md:text-8xl font-serif font-light text-white mb-6 tracking-wide">
          AdGenius AI
        </h1>
        <div className="w-24 h-0.5 bg-yellow-600 mx-auto mb-6"></div>
        <p className="text-xl md:text-2xl text-gray-300 font-light tracking-widest uppercase">
          Intelligence Meets Imagination
        </p>
        <Link href="/questionnaire">
          <button className="mt-12 px-8 py-4 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-lg tracking-wide">
            BEGIN JOURNEY
          </button>
        </Link>
      </div>
    </main>
  )
}