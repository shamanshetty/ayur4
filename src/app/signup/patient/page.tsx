'use client'
import { useState } from 'react'
import { AuthService, convertFormDataToPatient } from '@/lib/services'

export default function PatientSignup() {
  const [step, setStep] = useState(1)
  const [hasPanchakarmaExperience, setHasPanchakarmaExperience] = useState(null)
  const [formData, setFormData] = useState({
    // General Details
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    gender: '',
    priorPanchakarmaExperience: null,

    // Additional Details (for no experience)
    dietaryHabits: '',
    sharedCalendar: false,
    contentPreferences: [],
    activityLevel: 'moderate',
    healthGoals: [],
    chronicConditions: [],
    currentMedications: [],
    stressAnxiety: false,
    physicalSymptoms: false,
    panchkarmaExpectations: [],
    consentShare: false,
    agreeTerms: false,

    // Additional Details (for experience)
    previousTherapies: [],
    previousBenefits: [],
    sideEffects: '',
    followInstructions: ''
  })

  const handleNext = () => setStep(step + 1)
  const handlePrev = () => setStep(step - 1)

  const handleSubmit = async () => {
    try {
      // Store in localStorage as immediate fallback
      localStorage.setItem('patientData', JSON.stringify(formData))

      // Create a simple password from name + birth year for demo
      const password = `${formData.firstName.toLowerCase()}${new Date(formData.dateOfBirth).getFullYear()}`

      // Convert form data to patient format
      const patientData = convertFormDataToPatient(formData)

      // Sign up with Supabase
      const result = await AuthService.signUp(formData.email, password, patientData)
      console.log('Signup successful:', result)

      // Redirect to patient dashboard
      window.location.href = '/dashboard/patient'
    } catch (error) {
      console.error('Error during signup:', error)
      // Fallback to localStorage and continue - don't block user flow
      localStorage.setItem('patientData', JSON.stringify(formData))
      window.location.href = '/dashboard/patient'
    }
  }

  const handleArrayToggle = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: (formData[field as keyof typeof formData] as string[]).includes(value)
        ? (formData[field as keyof typeof formData] as string[]).filter(item => item !== value)
        : [...(formData[field as keyof typeof formData] as string[]), value]
    })
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-80 bg-white text-black p-8 flex flex-col">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Create Account</h1>
          <p className="text-cyan-500 text-lg">Create your free AyurSutra account</p>
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
                <h3 className="font-semibold">General Details</h3>
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
                <h3 className="font-semibold">Additional Details</h3>
                <p className="text-sm text-gray-600">Tells us more about yourself, your expectations and preferences.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login/patient" className="text-cyan-500 hover:text-cyan-600">Log in now</a>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <span className="font-display text-2xl font-bold text-white cursor-pointer" onClick={() => window.location.href = '/'}>AyurSutra</span>
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

        {/* Personal Details Form */}
        {step === 1 && (
          <div className="max-w-4xl">
            <h2 className="text-cyan-500 text-3xl font-bold mb-8">Personal Details</h2>

            <div className="grid grid-cols-3 gap-8 mb-8">
              <div>
                <label className="block text-white text-sm font-medium mb-3">Full Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  placeholder="First Name"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3 opacity-0">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  placeholder="Last Name"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">Age</label>
                <input
                  type="text"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  placeholder="Age"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-white text-sm font-medium mb-3">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-white text-sm font-medium mb-3">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none pr-12"
                    placeholder="Enter a strong password"
                  />
                  <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">Confirm Password</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                  placeholder="Enter a strong password"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-white text-sm font-medium mb-3">Country of Residence</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="" className="bg-black">Select Country</option>
                  <option value="india" className="bg-black">India</option>
                  <option value="usa" className="bg-black">United States</option>
                  <option value="uk" className="bg-black">United Kingdom</option>
                  <option value="canada" className="bg-black">Canada</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-3">Preferred Gender</label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.gender === 'male'}
                      onChange={(e) => setFormData({...formData, gender: e.target.checked ? 'male' : ''})}
                      className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-white">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.gender === 'female'}
                      onChange={(e) => setFormData({...formData, gender: e.target.checked ? 'female' : ''})}
                      className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-white">Female</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.gender === 'other'}
                      onChange={(e) => setFormData({...formData, gender: e.target.checked ? 'other' : ''})}
                      className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-white">Other</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-white text-sm font-medium mb-4">Do you have any prior experience with Panchakarma?</label>
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="panchakarmaExperience"
                    checked={formData.priorPanchakarmaExperience === true}
                    onChange={() => {
                      setFormData({...formData, priorPanchakarmaExperience: true})
                      setHasPanchakarmaExperience(true)
                    }}
                    className="w-4 h-4 text-cyan-500 border-gray-300 focus:ring-cyan-500"
                  />
                  <span className="ml-2 text-white">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="panchakarmaExperience"
                    checked={formData.priorPanchakarmaExperience === false}
                    onChange={() => {
                      setFormData({...formData, priorPanchakarmaExperience: false})
                      setHasPanchakarmaExperience(false)
                    }}
                    className="w-4 h-4 text-cyan-500 border-gray-300 focus:ring-cyan-500"
                  />
                  <span className="ml-2 text-white">No</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={formData.priorPanchakarmaExperience === null}
                className="bg-cyan-500 text-black px-8 py-3 rounded-lg font-medium hover:bg-cyan-400 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Additional Details for No Experience - Step 2a */}
        {step === 2 && !hasPanchakarmaExperience && (
          <div className="max-w-4xl">
            <h2 className="text-cyan-500 text-3xl font-bold mb-8">Additional Details</h2>

            <div className="space-y-8">
              {/* Dietary Habits */}
              <div>
                <label className="block text-white text-sm font-medium mb-4">Dietary Habits</label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.dietaryHabits === 'vegetarian'}
                      onChange={(e) => setFormData({...formData, dietaryHabits: e.target.checked ? 'vegetarian' : ''})}
                      className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-cyan-400">Vegetarian</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.dietaryHabits === 'non-vegetarian'}
                      onChange={(e) => setFormData({...formData, dietaryHabits: e.target.checked ? 'non-vegetarian' : ''})}
                      className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-white">Non-Vegetarian</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.dietaryHabits === 'jain'}
                      onChange={(e) => setFormData({...formData, dietaryHabits: e.target.checked ? 'jain' : ''})}
                      className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-white">Jain</span>
                  </label>
                </div>
              </div>

              {/* Shared Calendar */}
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <label className="block text-white text-sm font-medium mb-4">Shared Calendar</label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.sharedCalendar === true}
                        onChange={(e) => setFormData({...formData, sharedCalendar: e.target.checked})}
                        className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                      />
                      <span className="ml-2 text-cyan-400">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.sharedCalendar === false}
                        onChange={(e) => setFormData({...formData, sharedCalendar: !e.target.checked})}
                        className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                      />
                      <span className="ml-2 text-white">No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-4 opacity-0">Ayurvedic Wisdom</label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.contentPreferences.includes('ayurvedic-wisdom')}
                      onChange={() => handleArrayToggle('contentPreferences', 'ayurvedic-wisdom')}
                      className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-white">Ayurvedic Wisdom</span>
                  </label>
                </div>
              </div>

              {/* Content Preference */}
              <div>
                <label className="block text-white text-sm font-medium mb-4">Content Preference</label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.contentPreferences.includes('guided-meditations')}
                      onChange={() => handleArrayToggle('contentPreferences', 'guided-meditations')}
                      className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-cyan-400">Guided Meditations</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.contentPreferences.includes('yoga-exercises')}
                      onChange={() => handleArrayToggle('contentPreferences', 'yoga-exercises')}
                      className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-white">Yoga & Exercises</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.contentPreferences.includes('healthy-recipes')}
                      onChange={() => handleArrayToggle('contentPreferences', 'healthy-recipes')}
                      className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-cyan-400">Healthy Recipes</span>
                  </label>
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-white text-sm font-medium mb-4">Activity Level</label>
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`${formData.activityLevel === 'low' ? 'text-cyan-400' : 'text-gray-400'}`}>Low</span>
                    <span className={`${formData.activityLevel === 'moderate' ? 'text-white' : 'text-gray-400'}`}>Moderate</span>
                    <span className={`${formData.activityLevel === 'high' ? 'text-cyan-400' : 'text-gray-400'}`}>High</span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="1"
                      value={formData.activityLevel === 'low' ? 0 : formData.activityLevel === 'moderate' ? 1 : 2}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        const level = value === 0 ? 'low' : value === 1 ? 'moderate' : 'high';
                        setFormData({...formData, activityLevel: level});
                      }}
                      className="w-full h-2 bg-gray-600 rounded-full appearance-none slider"
                      style={{
                        background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${formData.activityLevel === 'low' ? '0' : formData.activityLevel === 'moderate' ? '50' : '100'}%, #4b5563 ${formData.activityLevel === 'low' ? '0' : formData.activityLevel === 'moderate' ? '50' : '100'}%, #4b5563 100%)`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Health Goals */}
              <div>
                <label className="block text-white text-sm font-medium mb-6">Health Goals (Upto 3)</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    'Stress & Anxiety Reduction',
                    'Improve Sleep Quality',
                    'Pain Management',
                    'Boost Energy & Vitality',
                    'General Well-being',
                    'Detoxification & Cleansing',
                    'Hormonal Balance'
                  ].map((goal) => (
                    <button
                      key={goal}
                      onClick={() => {
                        if (formData.healthGoals.length < 3 || formData.healthGoals.includes(goal)) {
                          handleArrayToggle('healthGoals', goal)
                        }
                      }}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                        formData.healthGoals.includes(goal)
                          ? goal === 'Improve Sleep Quality' || goal === 'Pain Management' || goal === 'Hormonal Balance'
                            ? 'bg-green-500 text-black border-green-500'
                            : 'bg-white text-black border-white'
                          : 'bg-transparent text-white border-gray-500 hover:border-white'
                      }`}
                    >
                      {goal}
                      {formData.healthGoals.includes(goal) && (
                        <span className="ml-2">×</span>
                      )}
                    </button>
                  ))}
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

        {/* Additional Details for No Experience - Step 3 (Final) */}
        {step === 3 && !hasPanchakarmaExperience && (
          <div className="max-w-4xl">
            <h2 className="text-cyan-500 text-3xl font-bold mb-8">Additional Details</h2>

            <div className="space-y-8">
              {/* Chronic Conditions */}
              <div>
                <label className="block text-white text-sm font-medium mb-4">Do you currently suffer from any chronic conditions ?</label>
                <div className="grid grid-cols-5 gap-4">
                  {['Digestive', 'Respiratory', 'Skin', 'Joint Pain', 'Stress'].map((condition) => (
                    <label key={condition} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.chronicConditions.includes(condition)}
                        onChange={() => handleArrayToggle('chronicConditions', condition)}
                        className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                      />
                      <span className={`ml-2 ${condition === 'Digestive' ? 'text-cyan-400' : 'text-white'}`}>{condition}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Current Medications */}
              <div>
                <label className="block text-white text-sm font-medium mb-4">Are you currently taking any medications?</label>
                <div className="flex space-x-8">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.currentMedications.includes('allopathic')}
                      onChange={() => handleArrayToggle('currentMedications', 'allopathic')}
                      className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-cyan-400">Allopathic</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.currentMedications.includes('ayurvedic')}
                      onChange={() => handleArrayToggle('currentMedications', 'ayurvedic')}
                      className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-white">Ayurvedic</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.currentMedications.includes('other')}
                      onChange={() => handleArrayToggle('currentMedications', 'other')}
                      className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-cyan-400">Other</span>
                  </label>
                </div>
              </div>

              {/* Stress, Anxiety, Mood Changes */}
              <div>
                <label className="block text-white text-sm font-medium mb-4">Do you experience frequent stress, anxiety, or mood changes?</label>
                <div className="flex space-x-8">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stressAnxiety"
                      checked={formData.stressAnxiety === true}
                      onChange={() => setFormData({...formData, stressAnxiety: true})}
                      className="w-4 h-4 text-cyan-500 border-gray-300 focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-white">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stressAnxiety"
                      checked={formData.stressAnxiety === false}
                      onChange={() => setFormData({...formData, stressAnxiety: false})}
                      className="w-4 h-4 text-cyan-500 border-gray-300 focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-cyan-400">No</span>
                  </label>
                </div>
              </div>

              {/* Physical Symptoms */}
              <div>
                <label className="block text-white text-sm font-medium mb-4">You noticed any physical symptoms like skin breakouts, allergies, headaches, body aches, or weight changes recently?</label>
                <div className="flex space-x-8">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="physicalSymptoms"
                      checked={formData.physicalSymptoms === true}
                      onChange={() => setFormData({...formData, physicalSymptoms: true})}
                      className="w-4 h-4 text-cyan-500 border-gray-300 focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-white">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="physicalSymptoms"
                      checked={formData.physicalSymptoms === false}
                      onChange={() => setFormData({...formData, physicalSymptoms: false})}
                      className="w-4 h-4 text-cyan-500 border-gray-300 focus:ring-cyan-500"
                    />
                    <span className="ml-2 text-cyan-400">No</span>
                  </label>
                </div>
              </div>

              {/* Panchakarma Expectations */}
              <div>
                <label className="block text-white text-sm font-medium mb-4">What do you expect from Panchakkarma ?</label>
                <div className="grid grid-cols-4 gap-4">
                  {['Detox', 'Stress Reduction', 'General Wellness', 'Specific Health Relief'].map((expectation) => (
                    <label key={expectation} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.panchkarmaExpectations.includes(expectation)}
                        onChange={() => handleArrayToggle('panchkarmaExpectations', expectation)}
                        className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                      />
                      <span className={`ml-2 ${expectation === 'Stress Reduction' ? 'text-cyan-400' : 'text-white'}`}>{expectation}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Consent Checkboxes */}
              <div className="space-y-4">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={formData.consentShare}
                    onChange={(e) => setFormData({...formData, consentShare: e.target.checked})}
                    className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500 mt-1"
                  />
                  <span className="ml-2 text-white text-sm">I consent to share my questionnaire responses and results with my consulting doctor prior to any Panchcharma treatment.</span>
                </label>

                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                    className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500 mt-1"
                  />
                  <span className="ml-2 text-white text-sm">I agree to the Terms and Conditions and Privacy Policy.</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!formData.consentShare || !formData.agreeTerms}
                className="bg-cyan-500 text-black px-8 py-3 rounded-lg font-medium hover:bg-cyan-400 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Create Account</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Additional Details for Experienced Users */}
        {step === 2 && hasPanchakarmaExperience && (
          <div className="max-w-4xl">
            <h2 className="text-cyan-500 text-3xl font-bold mb-8">Additional Details</h2>

            <div className="space-y-8">
              {/* Previous Therapies */}
              <div>
                <label className="block text-white text-sm font-medium mb-4">Which Panchakarma therapy/therapies have you undergone before?</label>
                <div className="grid grid-cols-5 gap-4">
                  {['Vamana', 'Virechana', 'Basti', 'Nasya', 'Raktamokshana'].map((therapy) => (
                    <label key={therapy} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.previousTherapies.includes(therapy)}
                        onChange={() => handleArrayToggle('previousTherapies', therapy)}
                        className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                      />
                      <span className={`ml-2 ${therapy === 'Vamana' || therapy === 'Nasya' ? 'text-cyan-400' : 'text-white'}`}>{therapy}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Benefits Noticed */}
              <div>
                <label className="block text-white text-sm font-medium mb-4">What benefits did you notice after your previous Panchakarma?</label>
                <div className="grid grid-cols-4 gap-4">
                  {['Improved digestion', 'Better Energy', 'Clearer Skin', 'Mental Calmness'].map((benefit) => (
                    <label key={benefit} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.previousBenefits.includes(benefit)}
                        onChange={() => handleArrayToggle('previousBenefits', benefit)}
                        className="w-4 h-4 text-cyan-500 border-gray-300 rounded focus:ring-cyan-500"
                      />
                      <span className={`ml-2 ${benefit === 'Improved digestion' || benefit === 'Clearer Skin' ? 'text-cyan-400' : 'text-white'}`}>{benefit}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Side Effects */}
              <div>
                <label className="block text-white text-sm font-medium mb-4">Did you face any side effects or discomforts during or after the therapy?</label>
                <textarea
                  value={formData.sideEffects}
                  onChange={(e) => setFormData({...formData, sideEffects: e.target.value})}
                  className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none h-32"
                  placeholder="Enter Answer"
                />
              </div>

              {/* Follow Instructions */}
              <div>
                <label className="block text-white text-sm font-medium mb-4">Were you able to follow the pre-treatment and post-treatment instructions given by your doctor? If not why?</label>
                <textarea
                  value={formData.followInstructions}
                  onChange={(e) => setFormData({...formData, followInstructions: e.target.value})}
                  className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none h-32"
                  placeholder="Enter Answer"
                />
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