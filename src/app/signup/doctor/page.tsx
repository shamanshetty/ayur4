'use client'
import { useState } from 'react'

export default function DoctorSignup() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Professional Details
    medicalRegistrationNumber: '',
    registrationCouncil: '',
    educationalQualification: '',
    yearsOfExperience: '',
    profilePhoto: null,

    // Profile Setup
    professionalBio: '',
    specializations: [],
  })

  const handleNext = () => setStep(step + 1)
  const handlePrev = () => setStep(step - 1)

  const handleSubmit = () => {
    // Redirect to doctor dashboard
    window.location.href = '/dashboard/doctor'
  }

  const handleSpecializationToggle = (specialization: string) => {
    setFormData({
      ...formData,
      specializations: formData.specializations.includes(specialization)
        ? formData.specializations.filter(s => s !== specialization)
        : [...formData.specializations, specialization]
    })
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-80 bg-white text-black p-8 flex flex-col">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Create Account</h1>
          <p className="text-cyan-500 text-lg">Create your free Evora account</p>
        </div>

        {/* Progress Steps */}
        <div className="flex-1">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Personal Details</h3>
                <p className="text-sm text-gray-600">Basic information to create your account and get started.</p>
              </div>
            </div>

            <div className="ml-3 w-0.5 h-12 bg-cyan-500"></div>

            <div className="flex items-center space-x-4">
              <div className={`w-6 h-6 ${step >= 2 ? 'bg-cyan-500' : 'bg-gray-300'} rounded-full flex items-center justify-center`}>
                {step >= 2 ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="font-semibold">Professional Details</h3>
                <p className="text-sm text-gray-600">Tells us more about your work and experience.</p>
              </div>
            </div>

            <div className="ml-3 w-0.5 h-12 bg-gray-300"></div>

            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold">Profile Details</h3>
                <p className="text-sm text-gray-600">Tells us more about yourself, your engagement and networking preferences.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login/doctor" className="text-cyan-500 hover:text-cyan-600">Log in now</a>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <a href="/" className="font-display text-2xl font-bold text-white">AyurSutra</a>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-white bg-white bg-opacity-20 px-4 py-2 rounded-full">About Us</a>
            <a href="#" className="text-white px-4 py-2">Community</a>
            <a href="#" className="text-white px-4 py-2">Events</a>
            <a href="#" className="text-white px-4 py-2">FAQs</a>
            <a href="#" className="text-white px-4 py-2">Contact Us</a>
            <div className="flex space-x-2">
              <button className="bg-white text-black px-4 py-2 rounded-full">Sign Up</button>
              <button className="bg-white text-black px-4 py-2 rounded-full">Login</button>
            </div>
          </div>
        </div>

        {/* Professional Details Form */}
        {step === 1 && (
          <div className="max-w-4xl">
            <h2 className="text-cyan-500 text-3xl font-bold mb-8">Professional Details</h2>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-white text-sm font-medium mb-3">Medical Registration Number</label>
                <input
                  type="text"
                  value={formData.medicalRegistrationNumber}
                  onChange={(e) => setFormData({...formData, medicalRegistrationNumber: e.target.value})}
                  className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  placeholder="Enter Registration Number"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">Registration Council</label>
                <select
                  value={formData.registrationCouncil}
                  onChange={(e) => setFormData({...formData, registrationCouncil: e.target.value})}
                  className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="" className="bg-black">Select Council</option>
                  <option value="medical-council-india" className="bg-black">Medical Council of India</option>
                  <option value="state-medical-council" className="bg-black">State Medical Council</option>
                  <option value="ayush-ministry" className="bg-black">AYUSH Ministry</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">Educational Qualification</label>
                <select
                  value={formData.educationalQualification}
                  onChange={(e) => setFormData({...formData, educationalQualification: e.target.value})}
                  className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="" className="bg-black">B.A.M.S.</option>
                  <option value="bams" className="bg-black">B.A.M.S.</option>
                  <option value="md-ayurveda" className="bg-black">MD (Ayurveda)</option>
                  <option value="phd-ayurveda" className="bg-black">PhD (Ayurveda)</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">Years Of Experience</label>
                <input
                  type="text"
                  value={formData.yearsOfExperience}
                  onChange={(e) => setFormData({...formData, yearsOfExperience: e.target.value})}
                  className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  placeholder=""
                />
              </div>
            </div>

            <div className="mt-8">
              <label className="block text-white text-sm font-medium mb-3">Profile Photo</label>
              <div className="w-full h-64 border-2 border-dashed border-gray-500 rounded-lg flex flex-col items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4"></div>
                  <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500">
                    Browse File
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleNext}
                className="bg-cyan-500 text-black px-8 py-3 rounded-lg font-medium hover:bg-cyan-400 flex items-center space-x-2"
              >
                <span>Next</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-4xl">
            <h2 className="text-cyan-500 text-3xl font-bold mb-8">Profile Set Up</h2>

            <div className="space-y-8">
              <div>
                <label className="block text-white text-sm font-medium mb-3">Professional Bio</label>
                <textarea
                  value={formData.professionalBio}
                  onChange={(e) => setFormData({...formData, professionalBio: e.target.value})}
                  className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none h-32"
                  placeholder="Enter brief introduction about their experience, treatment philosophy, and approach to patient care."
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-6">Specializations</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    'Stress & Anxiety Reduction',
                    'Pain Management',
                    'Detox & Skin Health',
                    'Neurological Disorders',
                    'Boost Energy & Vitality',
                    "Women's Health",
                    'Wellness & Rejuvenation',
                    'Metabolic & Lifestyle Disorders',
                    'Other'
                  ].map((specialization) => (
                    <button
                      key={specialization}
                      onClick={() => handleSpecializationToggle(specialization)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                        formData.specializations.includes(specialization)
                          ? specialization === 'Pain Management' || specialization === 'Detox & Skin Health' || specialization === 'Metabolic & Lifestyle Disorders'
                            ? 'bg-green-500 text-black border-green-500'
                            : 'bg-white text-black border-white'
                          : 'bg-transparent text-white border-gray-500 hover:border-white'
                      }`}
                    >
                      {specialization}
                      {formData.specializations.includes(specialization) && (
                        <span className="ml-2">×</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleSubmit}
                className="bg-cyan-500 text-black px-8 py-3 rounded-lg font-medium hover:bg-cyan-400 flex items-center space-x-2"
              >
                <span>Create Account</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}