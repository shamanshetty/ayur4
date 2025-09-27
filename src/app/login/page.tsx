export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Navigation */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <nav className="px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="font-display text-2xl font-bold text-white">AyurSutra</div>
            <div className="flex items-center space-x-6">
              <a href="/about" className="text-gray-300 hover:text-white px-4 py-2">About Us</a>
              <a href="/community" className="text-gray-300 hover:text-white px-4 py-2">Community</a>
              <a href="/events" className="text-gray-300 hover:text-white px-4 py-2">Events</a>
              <a href="/faqs" className="text-gray-300 hover:text-white px-4 py-2">FAQs</a>
              <a href="/contact" className="text-gray-300 hover:text-white px-4 py-2">Contact Us</a>
              <a href="/signup" className="text-gray-300 hover:text-white px-4 py-2">Sign Up</a>
              <a href="/login" className="bg-white text-black px-4 py-2 rounded-full">Login</a>
            </div>
          </div>
        </nav>
      </div>

      {/* Left Side - Form */}
      <div className="w-1/2 flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          {/* Progress Sidebar */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl p-8 text-black">
              <h2 className="text-3xl font-bold mb-4">Create Account</h2>
              <p className="text-teal-600 mb-8">Create your free AyurSutra account</p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">General Details</h3>
                    <p className="text-sm text-gray-600">Basic information to create your account and get started.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Additional Details</h3>
                    <p className="text-sm text-gray-600">Tells us more about yourself, your expectations and preferences.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">Already have an account? <a href="/login" className="text-teal-600 hover:underline">Log in now!</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Content */}
      <div className="w-1/2 bg-black flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-teal-400 mb-2">Personal Details</h2>
          </div>

          <form className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Age</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Age"
                  className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-400"
                />
              </div>
              <div>
                {/* This appears to be a duplicate age field in the mockup */}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-400"
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter a strong password"
                    className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-400"
                  />
                  <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    👁️
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Enter a strong password"
                  className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

            {/* Country and Gender */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Country of Residence</label>
                <select className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-400">
                  <option value="">Select Country</option>
                  <option value="india">India</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Preferred Gender</label>
                <div className="flex space-x-6 mt-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-white">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-white">Female</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-white">Other</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Panchakarma Experience */}
            <div>
              <label className="block text-sm font-medium text-white mb-4">Do you have any prior experience with Panchakarma?</label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input type="radio" name="experience" className="mr-2" />
                  <span className="text-white">Yes</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="experience" className="mr-2" defaultChecked />
                  <span className="text-white">No</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="bg-teal-500 text-white px-8 py-3 rounded-full font-medium hover:bg-teal-600 transition-colors flex items-center"
              >
                Next →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}