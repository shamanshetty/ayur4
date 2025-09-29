'use client'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => window.location.href = '/'}
            className="text-black text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'serif' }}
          >
            AyurSutra
          </button>

          <div className="flex items-center gap-6">
            <button
              onClick={() => document.getElementById('science')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              About Us
            </button>
            <a href="/community" className="text-black text-sm font-medium hover:text-gray-600 transition-colors">
              Community
            </a>
            <a href="/discover" className="text-black text-sm font-medium hover:text-gray-600 transition-colors">
              Discover
            </a>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-black text-sm font-medium hover:text-gray-600 transition-colors"
            >
              Contact Us
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Sign Up Dropdown */}
            <div className="relative group">
              <button className="border border-black rounded-full px-4 py-2 text-black text-sm hover:bg-gray-100 transition-colors">
                Sign Up
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
                <a href="/signup/patient" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-md">Sign Up as Patient</a>
                <a href="/signup/doctor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 last:rounded-b-md">Sign Up as Doctor</a>
              </div>
            </div>

            {/* Login Dropdown */}
            <div className="relative group">
              <button className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors">
                Login
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
                <a href="/login/patient" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-md">Login as Patient</a>
                <a href="/login/doctor" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 last:rounded-b-md">Login as Doctor</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Background decorative elements */}
          <div className="absolute left-1/4 top-20 bg-[#f7b8c0] h-16 w-64 rounded-2xl opacity-60"></div>
          <div className="absolute left-1/3 top-32 bg-[#f7b8c0] h-16 w-56 rounded-2xl opacity-40"></div>

          <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-normal leading-tight text-black">
                  <span style={{ fontFamily: 'serif' }}>Your Journey to Health Begins with </span>
                  <span className="font-bold" style={{ fontFamily: 'serif' }}>AyurSutra.</span>
                </h1>
                <p className="text-xl leading-relaxed text-black max-w-2xl">
                  AyurSutra bridges traditional Panchakarma with smart, patient-centered technology.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="bg-[#c5a8ff] rounded-2xl">
                  <button
                    onClick={() => window.location.href = '/signup/patient'}
                    className="text-lg font-light text-black px-8 py-4 flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    Start Your <span className="font-medium">Healing</span>
                    <span className="text-sm">→</span>
                  </button>
                </div>
                <div className="bg-[#bee0c7] rounded-2xl">
                  <button
                    onClick={() => window.location.href = '/signup/doctor'}
                    className="text-lg font-light text-black px-8 py-4 flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    Join as <span className="font-medium">Practitioner</span>
                    <span className="text-sm">→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content - Stats and Images */}
            <div className="relative space-y-8">
              {/* Patient Stats with Avatars */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex -space-x-2 mr-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full border-2 border-white"></div>
                  <div className="w-12 h-12 bg-blue-300 rounded-full border-2 border-white"></div>
                  <div className="w-12 h-12 bg-green-300 rounded-full border-2 border-white"></div>
                  <div className="w-12 h-12 bg-pink-300 rounded-full border-2 border-white"></div>
                  <div className="w-14 h-14 bg-yellow-300 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xl font-medium text-black">4K+</span>
                  </div>
                </div>
                <div>
                  <p className="text-lg text-black font-medium">Patients Healed</p>
                </div>
              </div>

              {/* Image Cards Layout */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white w-full h-48 rounded-3xl shadow-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-orange-200 to-pink-200"></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#3ebdc4] h-20 rounded-3xl border-4 border-white flex flex-col items-center justify-center shadow-lg">
                    <div className="text-2xl font-medium text-black">200+</div>
                    <div className="text-sm text-black">Panchakarma Completed</div>
                  </div>
                  <div className="bg-white w-full h-40 rounded-3xl shadow-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-200 to-green-200"></div>
                  </div>
                </div>
              </div>

              {/* Testimonial Card */}
              <div className="bg-black rounded-3xl p-6 text-white max-w-sm mx-auto">
                <p className="text-lg leading-tight mb-3">
                  "AyurSutra made my Panchakarma journey effortless!"
                </p>
                <p className="text-[#bee0c7] text-sm mb-1">
                  – Ananya Mehta, Patient, 42
                </p>
                <p className="text-sm font-medium">
                  #HealTogether
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Care Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Left - Title */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-medium leading-tight">
                Smart <span className="text-[#3ebdc4]">Care & Healthier </span>Outcomes
              </h2>
            </div>

            {/* Center - Vertical Divider */}
            <div className="hidden lg:flex justify-center">
              <div className="w-px h-96 bg-white opacity-20"></div>
            </div>

            {/* Right - Two Columns Side by Side */}
            <div className="lg:col-span-1">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Personalized Healing */}
                <div className="border-l-4 border-[#bee0c7] pl-6">
                  <h3 className="text-xl font-medium text-[#bee0c7] mb-4">
                    Personalized Healing, Rooted in Ayurveda
                  </h3>
                  <div className="space-y-4 text-white text-sm">
                    <p>
                      <span className="font-medium">AyurSutra tailors every Panchakarma journey to your unique Prakriti.</span>
                    </p>
                    <p>
                      From <span className="font-medium">personalized onboarding, daily mindfulness prompts,</span> and <span className="font-medium">dosha-specific routines</span> to curated meal plans, exercises, and therapy guidance, every step is designed for maximum care and effectiveness.
                    </p>
                    <p>
                      <span className="font-medium">Empathetic notifications</span>, <span className="font-medium">adaptive UI, and progress tracking</span> ensure you stay supported and motivated throughout your healing journey.
                    </p>
                  </div>
                </div>

                {/* Right Column - Smart & Transparent Care */}
                <div className="border-l-4 border-[#f7b8c0] pl-6">
                  <h3 className="text-xl font-medium text-[#f7b8c0] mb-4">
                    Smart & Transparent Care
                  </h3>
                  <div className="space-y-4 text-white text-sm">
                    <p>
                      With automated therapy scheduling, real-time progress tracking, and seamless patient-practitioner communication, <span className="font-medium">AyurSutra makes Panchakarma management effortless and reliable.</span>
                    </p>
                    <p>
                      Features like <span className="font-medium">multilingual support, AI-powered guidance, feedback analytics, transparent cost guides</span>, and <span className="font-medium">community groups</span> ensure a safe, connected, and transparent experience for everyone involved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Science Section */}
      <section id="science" className="bg-[#bee0c7] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-medium leading-tight text-white mb-4">
            The <span className="text-black">Science</span> of Life
          </h2>
          <p className="text-xl font-medium text-black mb-12 max-w-4xl mx-auto">
            Ayurveda, literally meaning "knowledge of life," is the world's oldest holistic healing system, originating in India over 5,000 years ago.
          </p>

          <div className="space-y-8 max-w-5xl mx-auto">
            {/* Ancient Wisdom */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="w-full lg:w-64 text-left">
                <h3 className="text-xl font-bold text-black">Ancient Wisdom</h3>
              </div>
              <div className="hidden lg:block w-px h-16 bg-black opacity-20"></div>
              <div className="flex-1 text-left">
                <p className="text-lg text-black">
                  Developed by ancient sages through meditation and observation, Ayurveda recognizes that every individual is unique and requires personalized treatment approaches based on their constitutional type (Prakriti).
                </p>
              </div>
            </div>

            {/* Three Doshas */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="w-full lg:w-64 text-left">
                <h3 className="text-xl font-bold text-black">Three Doshas</h3>
              </div>
              <div className="hidden lg:block w-px h-16 bg-black opacity-20"></div>
              <div className="flex-1 text-left">
                <p className="text-lg text-black">
                  The foundation of Ayurveda lies in understanding the three biological energies - Vata (movement), Pitta (transformation), and Kapha (structure) - that govern all physiological and psychological functions.
                </p>
              </div>
            </div>

            {/* Panchakarma Detox */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="w-full lg:w-64 text-left">
                <h3 className="text-xl font-bold text-black text-center lg:text-left">Panchakarma Detox</h3>
              </div>
              <div className="hidden lg:block w-px h-16 bg-black opacity-20"></div>
              <div className="flex-1 text-left">
                <p className="text-lg text-black">
                  Panchakarma, meaning "five actions," is Ayurveda's premier detoxification and rejuvenation program that eliminates toxins, restores balance, and enhances vitality through specialized therapeutic procedures.
                </p>
              </div>
            </div>

            {/* Modern Relevance */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="w-full lg:w-64 text-left">
                <h3 className="text-xl font-bold text-black">Modern Relevance</h3>
              </div>
              <div className="hidden lg:block w-px h-16 bg-black opacity-20"></div>
              <div className="flex-1 text-left">
                <p className="text-lg text-black">
                  In our fast-paced world, Ayurveda's holistic approach to prevention and healing is more relevant than ever, offering sustainable solutions for chronic stress, lifestyle disorders, and overall wellness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-medium leading-tight mb-16">
            <span className="text-[#c5a8ff]">Healing,</span> Simplified<br/>
            with AyurSutra
          </h2>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* Left Arrow */}
            <button className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
              <span className="text-2xl">←</span>
            </button>

            {/* Testimonial Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl">
              {/* Card 1 - Doctor */}
              <div className="bg-white w-full rounded-lg shadow-lg p-6 text-left">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mb-6"></div>
                <div className="space-y-4">
                  <p className="text-[#c5a8ff] text-lg font-bold">"</p>
                  <p className="text-sm text-black leading-relaxed">
                    Managing multiple patients across centers has never been easier. <span className="font-medium">AyurSutra's scheduling and tracking system saves time, while the integrated feedback helps me tailor therapies effectively.</span> My patients appreciate the structured care and personalized attention.
                  </p>
                  <div className="text-center">
                    <p className="font-bold text-sm text-[#c5a8ff]">Dr. Rajiv Menon,</p>
                    <p className="text-black text-sm">Ayurvedic Practitioner</p>
                  </div>
                </div>
              </div>

              {/* Card 2 - Patient */}
              <div className="bg-white w-full rounded-lg shadow-lg p-6 text-left">
                <div className="w-16 h-16 bg-gradient-to-br from-green-200 to-blue-200 rounded-full mb-6"></div>
                <div className="space-y-4">
                  <p className="text-[#c5a8ff] text-lg font-bold">"</p>
                  <p className="text-sm text-black leading-relaxed">
                    <span className="font-medium">AyurSutra made my Panchakarma journey so smooth.</span> The automated reminders for pre- and post-therapy precautions were super helpful, and I always knew what to do next. Tracking my progress through milestones kept me motivated throughout my treatment.
                  </p>
                  <div className="text-center">
                    <p className="font-bold text-sm text-[#c5a8ff]">Priya Sharma,</p>
                    <p className="text-black text-sm">Wellness Enthusiast</p>
                  </div>
                </div>
              </div>

              {/* Card 3 - Instructor */}
              <div className="bg-white w-full rounded-lg shadow-lg p-6 text-left">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full mb-6"></div>
                <div className="space-y-4">
                  <p className="text-[#c5a8ff] text-lg font-bold">"</p>
                  <p className="text-sm text-black leading-relaxed">
                    <span className="font-medium">I love how AyurSutra keeps everything organized.</span> The notifications ensured I never missed a session, and the progress tracking gave me a clear view of my recovery milestones. It feels like having a personal guide throughout my Panchakarma treatment.
                  </p>
                  <div className="text-center">
                    <p className="font-bold text-sm text-[#c5a8ff]">Vikram Desai,</p>
                    <p className="text-black text-sm">Yoga Instructor</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Arrow */}
            <button className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow">
              <span className="text-2xl">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Horizontal separator line */}
          <div className="border-t border-white border-opacity-20 mb-12"></div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Column 1 - Company */}
            <div className="space-y-4">
              <div className="text-3xl font-bold" style={{ fontFamily: 'serif' }}>
                AyurSutra
              </div>
              <p className="text-lg text-white max-w-sm">
                Panchakarma, Reimagined for today
              </p>
            </div>

            {/* Column 2 - Empty spacer */}
            <div></div>

            {/* Column 3 - Quick Links */}
            <div className="space-y-4">
              <h4 className="text-[#bee0c7] text-xl font-normal">Quick Links</h4>
              <div className="space-y-2 text-sm text-white opacity-90">
                <div><a href="#" className="hover:text-[#bee0c7] transition-colors">How it works</a></div>
                <div><a href="#" className="hover:text-[#bee0c7] transition-colors">What we do</a></div>
                <div><a href="#" className="hover:text-[#bee0c7] transition-colors">Partnerships</a></div>
                <div><a href="#" className="hover:text-[#bee0c7] transition-colors">Privacy & Policy</a></div>
                <div><a href="#" className="hover:text-[#bee0c7] transition-colors">Terms & Condition</a></div>
              </div>
            </div>

            {/* Column 4 - Contact Us */}
            <div className="space-y-4">
              <h4 className="text-[#f7b8c0] text-xl font-normal">Contact Us</h4>
              <div className="space-y-2 text-sm text-white">
                <div>ayursutra@gov.in</div>
                <div>+91 3344976178</div>
                <div>FAQ</div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-3 mt-6">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-black text-xs font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-black text-xs font-bold">in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-6 border-t border-white border-opacity-20">
            <p className="text-sm text-white">
              ©2025 Aevo. All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}