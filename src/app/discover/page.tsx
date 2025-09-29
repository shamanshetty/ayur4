'use client'

const imgImage87 = "http://localhost:3845/assets/14ace00d356c7ee720f3bf927269e0608d77f8b3.png";
const imgImage147 = "http://localhost:3845/assets/4a348480a7472532fbf113183478801d147438f3.png";
const imgPurvakarma200220201133171 = "http://localhost:3845/assets/4a512845ebc3a2e0da42e480813cc1ca0b106aa7.png";

export default function DiscoverPage() {
  const articles = [
    {
      id: 1,
      title: 'Introduction to Panchakarma',
      author: 'Dr. Anjali Mehra',
      readTime: '10 Minutes Read',
      likes: '1.2K',
      description: 'A beginner-friendly guide to the philosophy and science of Ayurveda\'s cleansing therapies. Understand how Panchakarma restores balance and supports preventive health.',
      bgColor: '#f9eca8',
      textColor: 'text-black',
      url: 'https://example.com/introduction-panchakarma',
      image: imgPurvakarma200220201133171
    },
    {
      id: 2,
      title: 'Abhyanga & Swedana Workshop',
      author: 'Vaidya Ramesh Kulkarni',
      readTime: '7 Minutes Read',
      likes: '4.9K',
      description: 'Detailed notes on Ayurvedic oil massage and herbal steam, their benefits, and self-care adaptations at home. Ideal for daily rejuvenation and relaxation.',
      bgColor: '#f7b8c0',
      textColor: 'text-white',
      url: 'https://example.com/abhyanga-swedana-workshop',
      image: imgImage87
    },
    {
      id: 3,
      title: 'Diet & Lifestyle in Panchakarma',
      author: 'Dr. Kavita Sharma',
      readTime: '9 Minutes Read',
      likes: '2.1K',
      description: 'Resource on Ayurvedic food principles, seasonal routines, and lifestyle habits that enhance Panchakarma\'s effectiveness. Includes simple diet guidelines.',
      bgColor: '#3ebdc4',
      textColor: 'text-black',
      url: 'https://example.com/diet-lifestyle-panchakarma',
      image: imgImage147
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6">
        <button
          onClick={() => window.location.href = '/'}
          className="text-black text-3xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
          style={{ fontFamily: 'serif' }}
        >
          AyurSutra
        </button>

        <div className="flex items-center gap-8">
          <button
            onClick={() => window.location.href = '/about'}
            className="text-black text-lg hover:opacity-70 transition-opacity cursor-pointer"
          >
            About Us
          </button>
          <button
            onClick={() => window.location.href = '/community'}
            className="bg-black text-white px-6 py-2 rounded-full text-lg hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Community
          </button>
          <span className="text-black text-lg font-medium">Discover</span>
          <button
            onClick={() => window.location.href = '/contact'}
            className="text-black text-lg hover:opacity-70 transition-opacity cursor-pointer"
          >
            Contact Us
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="border border-black rounded-full px-6 py-2 text-black text-lg hover:bg-gray-100 transition-colors cursor-pointer">
              Sign Up
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
              <a href="/signup/patient" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Up as Patient</a>
              <a href="/signup/doctor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Up as Doctor</a>
            </div>
          </div>
          <div className="relative group">
            <button className="bg-black text-white px-6 py-2 rounded-full text-lg hover:bg-gray-800 transition-colors cursor-pointer">
              Login
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
              <a href="/login/patient" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login as Patient</a>
              <a href="/login/doctor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login as Doctor</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="text-center py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block relative">
            <div className="bg-[#bee0c7] px-8 py-6 rounded-3xl mb-4 inline-block">
              <h1 className="text-5xl font-bold text-black mb-2">
                Learn & Discover -
              </h1>
            </div>
            <h2 className="text-5xl font-bold text-black mb-8">
              Essential Panchakarma Resources
            </h2>
          </div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Engage in dynamic networking, interactive workshops, and inspiring mentorship sessions designed to accelerate your growth.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => window.open(article.url, '_blank')}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
                  {/* Header */}
                  <div
                    className="px-6 py-4 rounded-2xl mx-4 mt-4"
                    style={{ backgroundColor: article.bgColor }}
                  >
                    <h3 className={`text-2xl font-semibold ${article.textColor}`}>
                      {article.title}
                    </h3>
                  </div>

                  {/* Image */}
                  <div className="px-4 py-4">
                    <div className="w-full h-48 rounded-2xl overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-6 pb-6">
                    {/* Author and reading time */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {article.author}
                        </div>
                        <div className="text-xs text-gray-600">
                          {article.readTime}
                        </div>
                      </div>

                      {/* Likes */}
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-600 text-xs">♥</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-800">
                            {article.likes}
                          </div>
                          <div className="text-xs text-gray-600">likes</div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}