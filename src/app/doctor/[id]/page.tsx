'use client'
import { useState, useEffect } from 'react'
import { DoctorService, ReviewService } from '@/lib/doctorServices'
import type { Practitioner, DoctorReview } from '@/lib/supabase'
import Chatbot, { ChatbotButton } from '@/components/Chatbot'

interface DoctorProfileProps {
  params: { id: string }
}

export default function DoctorProfile({ params }: DoctorProfileProps) {
  const [doctor, setDoctor] = useState<Practitioner | null>(null)
  const [reviews, setReviews] = useState<DoctorReview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    loadDoctorData()
  }, [params.id])

  const loadDoctorData = async () => {
    try {
      setIsLoading(true)

      // Load doctor details
      const doctorData = await DoctorService.getDoctorById(params.id)
      if (doctorData) {
        setDoctor(doctorData)

        // Load reviews
        const reviewsData = await ReviewService.getDoctorReviews(params.id, 10)
        setReviews(reviewsData || [])
      } else {
        // Fallback to sample data
        setDoctor(getSampleDoctor())
        setReviews(getSampleReviews())
      }
    } catch (error) {
      console.error('Error loading doctor data:', error)
      // Fallback to sample data
      setDoctor(getSampleDoctor())
      setReviews(getSampleReviews())
    } finally {
      setIsLoading(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Doctor Not Found</h1>
          <button
            onClick={() => window.location.href = '/find-doctors'}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Search
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span
            className="font-display text-2xl font-bold cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            AyurSutra
          </span>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/find-doctors'}
              className="text-gray-600 hover:text-gray-900 px-4 py-2"
            >
              ← Back to Search
            </button>
            <a href="/dashboard/patient" className="text-gray-600 hover:text-gray-900 px-4 py-2">Dashboard</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Doctor Header Card */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
            {/* Doctor Photo */}
            <div className="flex-shrink-0 mb-6 lg:mb-0">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                {doctor.profile_image_url ? (
                  <img
                    src={doctor.profile_image_url}
                    alt={`Dr. ${doctor.first_name} ${doctor.last_name}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <span className="text-white text-3xl font-bold">
                    {doctor.first_name.charAt(0)}{doctor.last_name.charAt(0)}
                  </span>
                )}
              </div>
            </div>

            {/* Doctor Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Dr. {doctor.first_name} {doctor.last_name}
                    {doctor.verified && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 ml-3">
                        ✓ Verified
                      </span>
                    )}
                  </h1>
                  <p className="text-lg text-gray-600 mb-2">
                    {doctor.specialization.join(', ')}
                  </p>
                  <p className="text-gray-500 mb-4">
                    {doctor.years_of_experience} years of experience
                  </p>
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center">
                      {renderStars(doctor.rating)}
                      <span className="ml-2 text-lg font-semibold text-gray-900">
                        {doctor.rating.toFixed(1)}
                      </span>
                      <span className="ml-1 text-gray-500">
                        ({doctor.total_reviews} reviews)
                      </span>
                    </div>
                  </div>
                  {doctor.location && (
                    <p className="text-gray-600 flex items-center mb-4">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {doctor.location}, {doctor.city}
                    </p>
                  )}
                </div>

                <div className="lg:text-right">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    ₹{doctor.consultation_fee}
                  </div>
                  <div className="text-gray-500 mb-4">per consultation</div>
                  <button
                    onClick={() => window.location.href = `/book-appointment/${doctor.id}`}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>

              {/* Consultation Types */}
              <div className="flex flex-wrap gap-3 mb-6">
                {doctor.online_consultation && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-blue-100 text-blue-800">
                    📹 Online Consultation
                  </span>
                )}
                {doctor.in_person_consultation && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-purple-100 text-purple-800">
                    🏥 In-person Consultation
                  </span>
                )}
                {doctor.languages && doctor.languages.length > 0 && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-800">
                    🗣️ {doctor.languages.join(', ')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'experience', label: 'Experience & Education' },
                { id: 'reviews', label: `Reviews (${doctor.total_reviews})` },
                { id: 'availability', label: 'Availability' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About Dr. {doctor.last_name}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {doctor.bio || `Dr. ${doctor.first_name} ${doctor.last_name} is an experienced Ayurvedic practitioner specializing in ${doctor.specialization.join(', ')}. With ${doctor.years_of_experience} years of experience, they have helped numerous patients achieve optimal health through traditional Ayurvedic treatments and modern healthcare approaches.`}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Specializations</h3>
                  <div className="flex flex-wrap gap-3">
                    {doctor.specialization.map((spec, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-green-100 text-green-800"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {doctor.clinic_name && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Clinic Information</h3>
                    <p className="text-gray-600">{doctor.clinic_name}</p>
                    <p className="text-gray-500">{doctor.address}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Experience</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">Ayurvedic Practitioner</h4>
                      <span className="text-sm text-gray-500">{doctor.years_of_experience} years</span>
                    </div>
                    <p className="text-gray-600">
                      Specialized practice in {doctor.specialization.join(', ')} with extensive experience in traditional Ayurvedic treatments and patient care.
                    </p>
                  </div>
                </div>

                {doctor.education && doctor.education.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
                    {doctor.education.map((edu, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6 mb-3">
                        <h4 className="font-medium text-gray-900">{edu}</h4>
                      </div>
                    ))}
                  </div>
                )}

                {doctor.license_number && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">License & Certifications</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <p className="text-gray-600">License Number: {doctor.license_number}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Patient Reviews</h3>
                  <div className="text-right">
                    <div className="flex items-center">
                      {renderStars(doctor.rating)}
                      <span className="ml-2 text-lg font-semibold text-gray-900">
                        {doctor.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{doctor.total_reviews} total reviews</p>
                  </div>
                </div>

                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center mb-1">
                              {renderStars(review.rating)}
                              <span className="ml-2 font-medium text-gray-900">
                                {review.is_anonymous ? 'Anonymous Patient' : `${review.patient?.first_name || 'Patient'}`}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">
                              {formatDate(review.created_at)}
                              {review.is_verified && (
                                <span className="ml-2 text-green-600">✓ Verified</span>
                              )}
                            </p>
                          </div>
                        </div>
                        {review.review_text && (
                          <p className="text-gray-600">{review.review_text}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No reviews yet. Be the first to review Dr. {doctor.last_name}!</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'availability' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Available Time Slots</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-medium text-blue-900">Book Your Appointment</h4>
                      <p className="text-blue-700">Click "Book Appointment" to view available time slots and schedule your consultation.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-3">Consultation Types</h4>
                    <div className="space-y-3">
                      {doctor.online_consultation && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Online Consultation</span>
                          <span className="font-medium">₹{doctor.consultation_fee}</span>
                        </div>
                      )}
                      {doctor.in_person_consultation && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">In-person Consultation</span>
                          <span className="font-medium">₹{doctor.consultation_fee}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-3">General Availability</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monday - Friday</span>
                        <span className="text-gray-900">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Saturday</span>
                        <span className="text-gray-900">9:00 AM - 2:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sunday</span>
                        <span className="text-gray-900">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => window.location.href = `/book-appointment/${doctor.id}`}
              className="bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              📅 Book Appointment
            </button>
            <button
              onClick={() => window.location.href = '/consultation'}
              className="bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              🤖 AI Consultation First
            </button>
            <button
              onClick={() => window.location.href = '/find-doctors'}
              className="bg-gray-600 text-white px-6 py-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              🔍 Find Other Doctors
            </button>
          </div>
        </div>
      </div>

      {/* Chatbot */}
      {!isChatbotOpen && <ChatbotButton onClick={() => setIsChatbotOpen(true)} />}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  )
}

// Sample data for fallback
function getSampleDoctor(): Practitioner {
  return {
    id: '1',
    email: 'dr.sharma@ayursutra.com',
    first_name: 'Rajesh',
    last_name: 'Sharma',
    specialization: ['Panchakarma Specialist', 'Ayurvedic Physician'],
    years_of_experience: 15,
    bio: 'Dr. Rajesh Sharma is a renowned Panchakarma specialist with over 15 years of experience in traditional Ayurvedic treatments. He has helped thousands of patients achieve optimal health through personalized detoxification programs and holistic wellness approaches.',
    consultation_fee: 2000,
    rating: 4.8,
    total_reviews: 127,
    location: 'Andheri West, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: '123 Wellness Center, Andheri West, Mumbai - 400058',
    clinic_name: 'Ayur Wellness Center',
    languages: ['Hindi', 'English', 'Marathi'],
    education: ['BAMS - Bachelor of Ayurvedic Medicine and Surgery', 'MD (Ayurveda) - Panchakarma'],
    license_number: 'MAH-AYU-2008-12345',
    online_consultation: true,
    in_person_consultation: true,
    verified: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  }
}

function getSampleReviews(): DoctorReview[] {
  return [
    {
      id: '1',
      practitioner_id: '1',
      patient_id: '1',
      rating: 5,
      review_text: 'Excellent treatment! Dr. Sharma\'s Panchakarma therapy helped me recover from chronic fatigue. Highly recommended!',
      is_anonymous: false,
      is_verified: true,
      helpful_votes: 12,
      created_at: '2024-03-15',
      updated_at: '2024-03-15',
      patient: { first_name: 'Priya', last_name: 'Kumar' }
    },
    {
      id: '2',
      practitioner_id: '1',
      patient_id: '2',
      rating: 4,
      review_text: 'Very knowledgeable doctor. The consultation was thorough and the treatment plan was effective.',
      is_anonymous: false,
      is_verified: true,
      helpful_votes: 8,
      created_at: '2024-03-10',
      updated_at: '2024-03-10',
      patient: { first_name: 'Amit', last_name: 'Singh' }
    }
  ]
}