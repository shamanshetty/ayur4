'use client'
import { useState, useEffect } from 'react'
import { AuthService, ConsultationService } from '@/lib/services'
import { getAyurvedaConsultation } from '@/lib/gemini'
import Chatbot, { ChatbotButton } from '@/components/Chatbot'

export default function AIConsultation() {
  const [userName, setUserName] = useState('User')
  const [currentPatient, setCurrentPatient] = useState(null)
  const [symptoms, setSymptoms] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [consultation, setConsultation] = useState('')
  const [error, setError] = useState('')
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  useEffect(() => {
    loadPatientData()
  }, [])

  const loadPatientData = async () => {
    try {
      const patient = await AuthService.getCurrentPatient()
      if (patient) {
        setCurrentPatient(patient)
        setUserName(patient.first_name || 'User')
      } else {
        // Fallback to localStorage for now
        const patientData = localStorage.getItem('patientData')
        if (patientData) {
          const data = JSON.parse(patientData)
          setCurrentPatient(data)
          setUserName(data.firstName || 'User')
        }
      }
    } catch (error) {
      console.error('Error loading patient data:', error)
      // Fallback to localStorage
      const patientData = localStorage.getItem('patientData')
      if (patientData) {
        const data = JSON.parse(patientData)
        setCurrentPatient(data)
        setUserName(data.firstName || 'User')
      }
    }
  }

  const handleConsultation = async () => {
    if (!symptoms.trim()) {
      setError('Please describe your symptoms or concerns')
      return
    }

    if (!currentPatient) {
      setError('Patient data not found. Please complete your profile first.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Get AI consultation from Gemini
      const aiRecommendations = await getAyurvedaConsultation(currentPatient, symptoms)
      setConsultation(aiRecommendations)

      // Save consultation to Supabase (if user is authenticated)
      try {
        const user = await AuthService.getCurrentUser()
        if (user) {
          await ConsultationService.createConsultation({
            patient_id: user.id,
            symptoms,
            ai_recommendations: aiRecommendations,
            prescribed_treatments: [],
            status: 'completed'
          })
        }
      } catch (dbError) {
        console.error('Error saving consultation to database:', dbError)
        // Continue with showing results even if DB save fails
      }

    } catch (error) {
      console.error('Error getting consultation:', error)
      setError('Failed to get AI consultation. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatConsultation = (text: string) => {
    // Simple formatting for better readability
    return text
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('##')) {
          return <h3 key={index} className="text-lg font-bold mt-4 mb-2 text-green-700">{line.replace('##', '').trim()}</h3>
        } else if (line.startsWith('#')) {
          return <h2 key={index} className="text-xl font-bold mt-6 mb-3 text-green-800">{line.replace('#', '').trim()}</h2>
        } else if (line.startsWith('*')) {
          return <li key={index} className="ml-4 mb-1">{line.replace('*', '').trim()}</li>
        } else if (line.trim() === '') {
          return <br key={index} />
        } else {
          return <p key={index} className="mb-2">{line}</p>
        }
      })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white flex flex-col">
        {/* Profile Section */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
            <div>
              <h3 className="font-semibold">Hii, {userName}!</h3>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            <a href="/dashboard/patient" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <span>Dashboard</span>
            </a>
            <a href="/calendar" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Calendar</span>
            </a>
            <a href="/consultation" className="flex items-center space-x-3 px-4 py-3 bg-white text-black rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              <span>AI Consultation</span>
            </a>
            <a href="/discover" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              <span>Discovery</span>
            </a>
            <a href="/community" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span>Community</span>
            </a>
            <button
              onClick={() => {
                localStorage.removeItem('patientData')
                window.location.href = '/'
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 rounded-lg text-left"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </nav>

        {/* AyurSutra Logo */}
        <div className="p-6 border-t border-gray-700">
          <span className="font-display text-xl font-bold cursor-pointer" onClick={() => window.location.href = '/'}>AyurSutra</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">AI-Powered Ayurveda Consultation</h1>
            <p className="text-gray-600">
              Get personalized Ayurvedic recommendations based on your health profile and current symptoms.
            </p>
          </div>

          {/* Consultation Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Describe Your Symptoms or Health Concerns</h2>

            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Please describe your current symptoms, health concerns, or specific areas you'd like guidance on. Be as detailed as possible to receive more accurate recommendations..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                💡 This consultation uses your health profile to provide personalized Ayurvedic recommendations.
              </div>
              <button
                onClick={handleConsultation}
                disabled={isLoading}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Getting Consultation...' : 'Get AI Consultation'}
              </button>
            </div>
          </div>

          {/* Consultation Results */}
          {consultation && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  🧘‍♀️
                </span>
                Your Personalized Ayurveda Consultation
              </h2>

              <div className="prose max-w-none">
                {formatConsultation(consultation)}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>Important:</strong> This AI consultation is for informational purposes only and should not replace professional medical advice.
                  Please consult with a qualified Ayurvedic practitioner or healthcare provider for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chatbot */}
      {!isChatbotOpen && <ChatbotButton onClick={() => setIsChatbotOpen(true)} />}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  )
}