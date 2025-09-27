export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="font-display text-2xl font-bold hover:text-gray-600 transition-colors">AyurSutra</a>
          <div className="flex items-center space-x-6">
            <a href="/about" className="text-gray-600 hover:text-gray-900 px-4 py-2">About Us</a>
            <a href="/community" className="text-gray-600 hover:text-gray-900 px-4 py-2">Community</a>
            <a href="/discover" className="bg-black text-white px-4 py-2 rounded-full">Discover</a>
            <a href="/contact" className="text-gray-600 hover:text-gray-900 px-4 py-2">Contact Us</a>
            <a href="/signup" className="text-gray-600 hover:text-gray-900 px-4 py-2">Sign Up</a>
            <a href="/login" className="bg-black text-white px-4 py-2 rounded-full">Login</a>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-6">
              <span className="bg-green-100 px-6 py-2 rounded-full text-black">Learn & Discover -</span>
            </h1>
            <h2 className="text-5xl font-bold">
              Essential Panchakarma Resources
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Engage in dynamic networking, interactive workshops, and inspiring mentorship sessions designed to accelerate your growth.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Card - Abhyanga & Swedana */}
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl p-8 h-96">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Abhyanga & Swedana<br/>Workshop
              </h3>
              <div className="bg-pink-200 rounded-2xl h-48 mb-4 overflow-hidden">
                {/* Placeholder for massage image */}
                <div className="w-full h-full bg-gradient-to-br from-pink-200 to-pink-300"></div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Yaetyg Ramesh Kulkarni</div>
                  <div className="text-sm text-gray-500">Detailed notes on Ayurvedic oil massage and herbal steam, their benefits, and self-care adaptations at home. Ideal for daily rejuvenation and relaxation.</div>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">♥</span>
                  <span className="text-sm">4.9K</span>
                </div>
              </div>
            </div>

            {/* Middle Card - Introduction to Panchakarma */}
            <div className="bg-gradient-to-br from-yellow-100 to-orange-200 rounded-3xl p-8 h-96">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Introduction to<br/>Panchakarma
              </h3>
              <div className="bg-orange-200 rounded-2xl h-48 mb-4 overflow-hidden">
                {/* Placeholder for herbs/treatment image */}
                <div className="w-full h-full bg-gradient-to-br from-orange-200 to-yellow-300"></div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Dr. Anjali Mehra</div>
                  <div className="text-sm text-gray-600">10 Minutes Read</div>
                  <div className="text-sm text-gray-500 mt-2">A beginner-friendly guide to the philosophy and science of Ayurveda's cleansing therapies. Understand how Panchakarma restores balance and supports preventive health.</div>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">♥</span>
                  <span className="text-sm">1.2K</span>
                  <span className="text-gray-400 ml-2">likes</span>
                </div>
              </div>
            </div>

            {/* Right Card - Diet & Lifestyle */}
            <div className="bg-gradient-to-br from-teal-100 to-cyan-200 rounded-3xl p-8 h-96">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Diet & Lifestyle in<br/>Panchakarma
              </h3>
              <div className="bg-cyan-200 rounded-2xl h-48 mb-4 overflow-hidden">
                {/* Placeholder for food/bowl image */}
                <div className="w-full h-full bg-gradient-to-br from-cyan-200 to-teal-300"></div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">Dr. Kavita Sharma</div>
                  <div className="text-sm text-gray-600">5 Minutes Read</div>
                  <div className="text-sm text-gray-500 mt-2">Resource on Ayurvedic food principles, seasonal routines, and lifestyle habits that enhance Panchakarma's effectiveness. Includes simple diet guidelines.</div>
                </div>
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">♥</span>
                  <span className="text-sm">2.1K</span>
                  <span className="text-gray-400 ml-2">likes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}