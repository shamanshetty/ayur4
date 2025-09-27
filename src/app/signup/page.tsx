'use client';

import { useState } from 'react';

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);

  if (currentStep === 1) {
    return <SignupStep1 onNext={() => setCurrentStep(2)} />;
  } else if (currentStep === 2) {
    return <SignupStep2 onNext={() => setCurrentStep(3)} onPrev={() => setCurrentStep(1)} />;
  } else if (currentStep === 3) {
    return <SignupStep3 onNext={() => setCurrentStep(4)} onPrev={() => setCurrentStep(2)} />;
  } else {
    return <SignupStep4 onPrev={() => setCurrentStep(3)} />;
  }
}

function SignupStep1({ onNext }: { onNext: () => void }) {
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
              <a href="/signup" className="bg-white text-black px-4 py-2 rounded-full">Sign Up</a>
              <a href="/login" className="text-gray-300 hover:text-white px-4 py-2">Login</a>
            </div>
          </div>
        </nav>
      </div>

      {/* Left Side - Progress */}
      <div className="w-1/2 flex items-center justify-center px-12">
        <div className="w-full max-w-md">
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

      {/* Right Side - Form */}
      <div className="w-1/2 bg-black flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-teal-400 mb-2">Personal Details</h2>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
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
                  placeholder="Age"
                  className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-400"
                />
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
                <div className="flex space-x-4 mt-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-white text-sm">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-white text-sm">Female</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-white text-sm">Other</span>
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

function SignupStep2({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
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
              <a href="/signup" className="bg-white text-black px-4 py-2 rounded-full">Sign Up</a>
              <a href="/login" className="text-gray-300 hover:text-white px-4 py-2">Login</a>
            </div>
          </div>
        </nav>
      </div>

      {/* Left Side - Progress */}
      <div className="w-1/2 flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl p-8 text-black">
            <h2 className="text-3xl font-bold mb-4">Create Account</h2>
            <p className="text-teal-600 mb-8">Create your free Evora account</p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold">Personal Details</h3>
                  <p className="text-sm text-gray-600">Basic information to create your account and get started.</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
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

      {/* Right Side - Form */}
      <div className="w-1/2 bg-black flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-teal-400 mb-2">Additional Details</h2>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
            {/* Dietary Habits */}
            <div>
              <label className="block text-sm font-medium text-white mb-4">Dietary Habits</label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" defaultChecked />
                  <span className="text-white">Vegetarian</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-white">Non-Vegetarian</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-white">Jain</span>
                </label>
              </div>
            </div>

            {/* Shared Calendar */}
            <div>
              <label className="block text-sm font-medium text-white mb-4">Shared Calendar</label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" defaultChecked />
                  <span className="text-white">Yes</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-white">No</span>
                </label>
              </div>
            </div>

            {/* Content Preference */}
            <div>
              <label className="block text-sm font-medium text-white mb-4">Content Preference</label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" defaultChecked />
                  <span className="text-white">Guided Meditations</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" />
                  <span className="text-white">Yoga & Exercises</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-3" defaultChecked />
                  <span className="text-white">Healthy Recipes</span>
                </label>
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-sm font-medium text-white mb-4">Activity Level</label>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="50"
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span className="text-teal-400">Low</span>
                  <span>Moderate</span>
                  <span className="text-teal-400">High</span>
                </div>
              </div>
            </div>

            {/* Ayurvedic Wisdom */}
            <div className="flex items-center justify-end">
              <label className="flex items-center">
                <input type="checkbox" className="mr-3" />
                <span className="text-white">Ayurvedic Wisdom</span>
              </label>
            </div>

            {/* Health Goals */}
            <div>
              <label className="block text-sm font-medium text-white mb-4">Health Goals (Upto 3)</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="bg-teal-600 text-white px-4 py-2 rounded-full text-sm">
                  Stress & Anxiety Reduction
                </button>
                <button type="button" className="bg-green-600 text-white px-4 py-2 rounded-full text-sm">
                  Improve Sleep Quality ✕
                </button>
                <button type="button" className="bg-green-600 text-white px-4 py-2 rounded-full text-sm">
                  Pain Management ✕
                </button>
                <button type="button" className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">
                  Boost Energy & Vitality
                </button>
                <button type="button" className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">
                  Boost Energy & Vitality
                </button>
                <button type="button" className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">
                  General Well-being
                </button>
                <button type="button" className="bg-gray-700 text-white px-4 py-2 rounded-full text-sm">
                  Detoxification & Cleansing
                </button>
                <button type="button" className="bg-green-600 text-white px-4 py-2 rounded-full text-sm">
                  Hormonal Balance ✕
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="bg-teal-500 text-white px-8 py-3 rounded-full font-medium hover:bg-teal-600 transition-colors flex items-center"
              >
                Create Account →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function SignupStep3({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
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
              <a href="/signup" className="bg-white text-black px-4 py-2 rounded-full">Sign Up</a>
              <a href="/login" className="text-gray-300 hover:text-white px-4 py-2">Login</a>
            </div>
          </div>
        </nav>
      </div>

      {/* Left Side - Progress */}
      <div className="w-1/2 flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl p-8 text-black">
            <h2 className="text-3xl font-bold mb-4">Create Account</h2>
            <p className="text-teal-600 mb-8">Create your free Evora account</p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold">Personal Details</h3>
                  <p className="text-sm text-gray-600">Basic information to create your account and get started.</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold">Additional Details</h3>
                  <p className="text-sm text-gray-600">Tells us more about yourself, your engagement and networking preferences.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">Already have an account? <a href="/login" className="text-teal-600 hover:underline">Log in now!</a></p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-1/2 bg-black flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-teal-400 mb-2">Additional Details</h2>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
            {/* Chronic Conditions */}
            <div>
              <label className="block text-sm font-medium text-white mb-4">Do you currently suffer from any chronic conditions ?</label>
              <div className="grid grid-cols-3 gap-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-white text-sm">Digestive</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-white text-sm">Respiratory</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-white text-sm">Skin</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-white text-sm">Joint Pain</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-white text-sm">Stress</span>
                </label>
              </div>
            </div>

            {/* Medications */}
            <div>
              <label className="block text-sm font-medium text-white mb-4">Are you currently taking any medications?</label>
              <div className="grid grid-cols-3 gap-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-white text-sm">Allopathic</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-white text-sm">Ayurvedic</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-white text-sm">Other</span>
                </label>
              </div>
            </div>

            {/* Stress and Mood */}
            <div>
              <label className="block text-sm font-medium text-white mb-4">Do you experience frequent stress, anxiety, or mood changes?</label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-white">Yes</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-white">No</span>
                </label>
              </div>
            </div>

            {/* Physical Symptoms */}
            <div>
              <label className="block text-sm font-medium text-white mb-4">You noticed any physical symptoms like skin breakouts, allergies, headaches, body aches, or weight changes recently?</label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-white">Yes</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-white">No</span>
                </label>
              </div>
            </div>

            {/* Expectations */}
            <div>
              <label className="block text-sm font-medium text-white mb-4">What do you expect from Panchakarma ?</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-white text-sm">Detox</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-white text-sm">Stress Reduction</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-white text-sm">General Wellness</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-white text-sm">Specific Health Relief</span>
                </label>
              </div>
            </div>

            {/* Consent */}
            <div className="space-y-4">
              <label className="flex items-start">
                <input type="checkbox" className="mr-3 mt-1" />
                <span className="text-white text-sm">I consent to share my questionnaire responses and results with my consulting doctor prior to any Panchkarma treatment.</span>
              </label>
              <label className="flex items-start">
                <input type="checkbox" className="mr-3 mt-1" />
                <span className="text-white text-sm">I agree to the Terms and Conditions and Privacy Policy.</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="bg-teal-500 text-white px-8 py-3 rounded-full font-medium hover:bg-teal-600 transition-colors flex items-center"
              >
                Create Account →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function SignupStep4({ onPrev }: { onPrev: () => void }) {
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
              <a href="/signup" className="bg-white text-black px-4 py-2 rounded-full">Sign Up</a>
              <a href="/login" className="text-gray-300 hover:text-white px-4 py-2">Login</a>
            </div>
          </div>
        </nav>
      </div>

      {/* Left Side - Progress */}
      <div className="w-1/2 flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl p-8 text-black">
            <h2 className="text-3xl font-bold mb-4">Create Account</h2>
            <p className="text-teal-600 mb-8">Create your free Evora account</p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold">Personal Details</h3>
                  <p className="text-sm text-gray-600">Basic information to create your account and get started.</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
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

      {/* Right Side - Form */}
      <div className="w-1/2 bg-black flex items-center justify-center px-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-teal-400 mb-2">Additional Details</h2>
          </div>

          <form className="space-y-6">
            {/* Panchakarma Experience */}
            <div>
              <label className="block text-sm font-medium text-white mb-4">Which Panchakarma therapy/therapies have you undergone before?</label>
              <div className="grid grid-cols-3 gap-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-white text-sm">Vamana</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-white text-sm">Virechana</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-white text-sm">Basti</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-white text-sm">Nasya</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-white text-sm">Raktamokshana</span>
                </label>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-white mb-4">What benefits did you notice after your previous Panchakarma?</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-white text-sm">Improved digestion</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-white text-sm">Better Energy</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-white text-sm">Clearer Skin</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-white text-sm">Mental Calmness</span>
                </label>
              </div>
            </div>

            {/* Side Effects */}
            <div>
              <label className="block text-sm font-medium text-white mb-4">Did you face any side effects or discomforts during or after the therapy?</label>
              <textarea
                placeholder="Enter Answer"
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-400"
                rows={4}
              />
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm font-medium text-white mb-4">Were you able to follow the pre-treatment and post-treatment instructions given by your doctor? If not why?</label>
              <textarea
                placeholder="Enter Answer"
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-400"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="bg-teal-500 text-white px-8 py-3 rounded-full font-medium hover:bg-teal-600 transition-colors flex items-center"
              >
                Create Account →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}