export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="bg-black px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="font-display text-2xl font-bold text-white hover:text-gray-200 transition-colors">AyurSutra</a>
          <div className="flex items-center space-x-6">
            <a href="/about" className="text-gray-300 hover:text-white px-4 py-2">About Us</a>
            <a href="/community" className="bg-white text-black px-4 py-2 rounded-full">Community</a>
            <a href="/discover" className="text-gray-300 hover:text-white px-4 py-2">Discover</a>
            <a href="/contact" className="text-gray-300 hover:text-white px-4 py-2">Contact Us</a>
            <a href="/signup" className="text-gray-300 hover:text-white px-4 py-2">Sign Up</a>
            <a href="/login" className="bg-white text-black px-4 py-2 rounded-full">Login</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-6">
            AyurSutra Community, Heal<br/>
            Together.
          </h1>
          <p className="text-xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
            From gaming, to upskilling, to learning, there's a place for you. Connect with mentors and mentees worldwide, share
            insights, collaborate on challenges, and build lasting relationships in a supportive and engaging space.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Explore Communities"
              className="w-full bg-white text-black px-6 py-4 rounded-full text-lg pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Community Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Daily Wins Card */}
            <div className="bg-gradient-to-br from-teal-400 to-cyan-500 rounded-3xl p-8 text-black">
              <div className="mb-4">
                <span className="text-sm font-medium">Most Popular</span>
                <h2 className="text-4xl font-bold mt-2">DAILY WINS</h2>
              </div>
              <p className="text-black/80 mb-8 leading-relaxed">
                Celebrate the little victories that make a big difference. Every small step counts,
                share the moments that lifted your spirits today, from a restful night to a
                simple healthy choice.
              </p>
              <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                View Full Thread
              </button>
            </div>

            {/* Community Q&A Card */}
            <div className="bg-gradient-to-br from-green-300 to-emerald-400 rounded-3xl p-8 text-black">
              <div className="mb-4">
                <span className="text-sm font-medium">Relatable Topics</span>
                <h2 className="text-4xl font-bold mt-2">COMMUNITY Q&A</h2>
              </div>
              <div className="mb-8">
                <p className="font-medium mb-2">Ask what you're really wondering;</p>
                <p className="font-medium mb-4">others have answers.</p>
                <p className="text-black/80 leading-relaxed">
                  Post your questions, share experiences,
                  and learn from people walking the same
                  path.
                </p>
              </div>
              <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                View Full Thread
              </button>
            </div>

            {/* Coping Hacks Card */}
            <div className="bg-gradient-to-br from-purple-300 to-pink-400 rounded-3xl p-8 text-black">
              <div className="mb-4">
                <span className="text-sm font-medium">Experiences</span>
                <h2 className="text-4xl font-bold mt-2">COPING HACKS</h2>
              </div>
              <div className="mb-8">
                <p className="font-medium mb-2">Your ideas can make someone else's</p>
                <p className="font-medium mb-4">journey easier.</p>
                <p className="text-black/80 leading-relaxed">
                  From soothing teas to journaling rituals,
                  share the personal tricks that help you
                  navigate therapy.
                </p>
              </div>
              <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                View Full Thread
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-20"></div>
    </div>
  );
}