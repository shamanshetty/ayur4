export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="font-display text-2xl font-bold hover:text-gray-700 transition-colors">AyurSutra</a>
          <div className="flex items-center space-x-6">
            <a href="#science" className="text-gray-600 hover:text-gray-900 px-4 py-2">About Us</a>
            <a href="/community" className="text-gray-600 hover:text-gray-900 px-4 py-2">Community</a>
            <a href="/discover" className="bg-black text-white px-4 py-2 rounded-full">Discover</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 px-4 py-2">Contact Us</a>
            <div className="relative group">
              <button className="text-gray-600 hover:text-gray-900 px-4 py-2">Sign Up</button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <a href="/signup/patient" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Up as Patient</a>
                <a href="/signup/doctor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Up as Doctor</a>
              </div>
            </div>
            <div className="relative group">
              <button className="bg-black text-white px-4 py-2 rounded-full">Login</button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <a href="/login/patient" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login as Patient</a>
                <a href="/login/doctor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login as Doctor</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Your <span className="bg-gradient-to-r from-pink-300 to-orange-300 text-transparent bg-clip-text">Journey to Health Begins</span> with AyurSutra.
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  AyurSutra bridges traditional Panchakarma with smart, patient-centered technology.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-purple-600 text-white px-8 py-4 rounded-full font-medium hover:bg-purple-700 transition-colors">
                  Start Your Healing →
                </button>
                <button className="bg-teal-600 text-white px-8 py-4 rounded-full font-medium hover:bg-teal-700 transition-colors">
                  Join as Practitioner →
                </button>
              </div>
            </div>

            {/* Right Content - Images Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Top row */}
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-2xl shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                      <div>
                        <div className="font-bold text-2xl">4K+</div>
                        <div className="text-sm text-gray-600">Patients Healed</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-orange-100 p-6 rounded-2xl">
                    <div className="h-40 bg-orange-200 rounded-xl"></div>
                  </div>
                </div>

                <div className="space-y-4 pt-8">
                  <div className="bg-black text-white p-4 rounded-2xl">
                    <div className="text-center">
                      <div className="font-bold text-2xl">200+</div>
                      <div className="text-sm">Panchakarma Completed</div>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-6 rounded-2xl">
                    <div className="h-32 bg-gray-200 rounded-xl"></div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-lg">
                    <div className="text-sm text-gray-600">AyurSutra made my</div>
                    <div className="text-sm text-gray-600">Panchakarma journey</div>
                    <div className="text-sm text-gray-600">effortless!</div>
                    <div className="text-xs text-gray-400 mt-2">- Sarah Jones</div>
                    <div className="text-xs text-gray-400">#RealTogether</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Care Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">
                Smart <span className="text-teal-400">Care</span><br/>
                & <span className="text-teal-400">Healthier</span><br/>
                Outcomes
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-4 text-teal-400">Personalized Healing, Rooted in Ayurveda</h3>
                <p className="text-gray-300 text-sm">
                  AyurSutra tailors every Panchakarma journey to your unique Prakriti.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-teal-400">Smart & Transparent Care</h3>
                <p className="text-gray-300 text-sm">
                  With automated Prakriti scheduling, real-time progress tracking, and seamless patient-practitioner communication, AyurSutra makes holistic wellness a cohesive and reliable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section id="science" className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            The <span className="font-display italic">Science</span> of Life
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto">
            Ayurveda, literally meaning "knowledge of life," is the world's oldest holistic healing system, originating in India over 5,000 years ago.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-left">
              <h3 className="text-lg font-bold mb-2">Ancient Wisdom</h3>
              <p className="text-sm text-gray-600">
                Developed by ancient sages through meditation and observation, Ayurveda recognizes that every individual is unique and requires personalized care based on their constitution, age factors, health.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold mb-2">Three Doshas</h3>
              <p className="text-sm text-gray-600">
                The foundation of Ayurveda lies in understanding the three biological energies - Vata (movement), Pitta (transformation), and Kapha (structure) - that govern all physiological and psychological functions.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold mb-2">Panchakarma Detox</h3>
              <p className="text-sm text-gray-600">
                Panchakarma, meaning "five actions," is Ayurveda's premier detoxification and rejuvenation program that eliminates toxins, restores balance, and enhances vitality through specialized therapeutic procedures.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold mb-2">Modern Relevance</h3>
              <p className="text-sm text-gray-600">
                In our fast-paced world, Ayurveda's holistic approach to prevention and healing is more relevant than ever, offering sustainable solutions for chronic stress, lifestyle disorders, and overall wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-purple-600">Healing</span>, Simplified<br/>
            with AyurSutra
          </h2>

          <div className="flex items-center justify-center space-x-8 my-12">
            <button className="p-2 rounded-full bg-white shadow-lg">←</button>

            <div className="grid grid-cols-3 gap-8 max-w-4xl">
              {/* Testimonial Cards */}
              <div className="bg-white p-6 rounded-2xl shadow-lg text-left">
                <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
                <p className="text-sm text-gray-600 mb-4">
                  Managing multiple patients across special therapy need never been easier. AyurSutra's integrated feedback system saves time while delivering effective feedback and personalized attention.
                </p>
                <div className="font-medium">Ayurveda Practitioner</div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg text-left">
                <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
                <p className="text-sm text-gray-600 mb-4">
                  AyurSutra made my Panchakarma journey so smooth. The ayurvedic consultations, progress care and Feedback and I always what to do next. Tracking my progress became simple through the progressive tracking app.
                </p>
                <div className="font-medium">Wellness Enthusiast</div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg text-left">
                <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
                <p className="text-sm text-gray-600 mb-4">
                  I love how AyurSutra keeps everything organized. The platform brings structure to my healing journey and makes me a clear view of my progress, timeline, and body response throughout my Panchakarma treatment.
                </p>
                <div className="font-medium">Yoga Instructor</div>
              </div>
            </div>

            <button className="p-2 rounded-full bg-white shadow-lg">→</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="text-2xl font-display font-bold mb-4">AyurSutra</div>
              <p className="text-gray-400 mb-6 max-w-md">
                Panchakarma, Reimagined for today
              </p>
              <div className="text-sm text-gray-500">
                ©2025 Ayur. All rights reserved
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <div><a href="#" className="text-gray-400 hover:text-white">How it works</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white">What we do</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white">Practitioner</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white">Pricing</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white">Terms & Conditions</a></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2 text-sm">
                <div className="text-gray-400">ayursu@gmail.com</div>
                <div className="text-gray-400">+91 3344778179</div>
                <div className="text-gray-400">FAQ</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
